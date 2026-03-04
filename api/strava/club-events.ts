/**
 * Vercel Serverless Function: Strava Club Events Proxy
 *
 * Handles OAuth token refresh and proxies requests to Strava's
 * undocumented /clubs/{id}/group_events endpoint.
 *
 * Environment variables required:
 * - STRAVA_CLIENT_ID: Your Strava API application client ID
 * - STRAVA_CLIENT_SECRET: Your Strava API application client secret
 * - STRAVA_REFRESH_TOKEN: Initial refresh token from OAuth authorization
 */

interface TokenResponse {
  token_type: string;
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
}

// In-memory cache (persists across warm invocations)
let cachedAccessToken: string | null = null;
let tokenExpiresAt = 0;
let currentRefreshToken: string | null = null;
// Cache resolved numeric club IDs
const clubIdCache: Record<string, number> = {};

/**
 * Resolve a club slug (e.g. "dbb-") to a numeric Strava club ID.
 * The /clubs/{slug}/group_events endpoint requires numeric IDs.
 */
async function resolveClubId(slugOrId: string, accessToken: string): Promise<string> {
  // If already numeric, return as-is
  if (/^\d+$/.test(slugOrId)) {
    return slugOrId;
  }

  // Check cache
  if (clubIdCache[slugOrId]) {
    console.log(`[Strava] Using cached numeric ID for "${slugOrId}": ${clubIdCache[slugOrId]}`);
    return String(clubIdCache[slugOrId]);
  }

  console.log(`[Strava] Resolving slug "${slugOrId}" to numeric club ID...`);

  const response = await fetch(`https://www.strava.com/api/v3/clubs/${slugOrId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[Strava] Failed to resolve club slug "${slugOrId}": ${response.status}`, errorText);
    throw new Error(`Club "${slugOrId}" not found on Strava (${response.status})`);
  }

  const club = await response.json();
  const numericId = club.id;

  console.log(`[Strava] Resolved "${slugOrId}" -> numeric ID ${numericId} (name: "${club.name}", member_count: ${club.member_count})`);

  clubIdCache[slugOrId] = numericId;
  return String(numericId);
}

async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  // Return cached token if still valid (with 5 min buffer)
  if (cachedAccessToken && tokenExpiresAt > now + 300) {
    console.log('[Strava] Using cached access token, expires at', new Date(tokenExpiresAt * 1000).toISOString());
    return cachedAccessToken;
  }

  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const refreshToken = currentRefreshToken || process.env.STRAVA_REFRESH_TOKEN;

  // Log which env vars are present (not their values!)
  console.log('[Strava] Token refresh - env check:', {
    hasClientId: !!clientId,
    clientIdLength: clientId?.length || 0,
    hasClientSecret: !!clientSecret,
    clientSecretLength: clientSecret?.length || 0,
    hasRefreshToken: !!refreshToken,
    refreshTokenLength: refreshToken?.length || 0,
    usingCachedRefreshToken: !!currentRefreshToken,
  });

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('STRAVA_NOT_CONFIGURED');
  }

  console.log('[Strava] Requesting token refresh from Strava OAuth...');

  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[Strava] Token refresh FAILED:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    });
    throw new Error(`Strava token refresh failed: ${response.status} ${errorText}`);
  }

  const data: TokenResponse = await response.json();

  console.log('[Strava] Token refresh SUCCESS:', {
    tokenType: data.token_type,
    expiresAt: new Date(data.expires_at * 1000).toISOString(),
    expiresIn: data.expires_in,
    hasNewRefreshToken: !!data.refresh_token,
  });

  // Cache the new tokens
  cachedAccessToken = data.access_token;
  tokenExpiresAt = data.expires_at;
  // Strava may return a new refresh token
  currentRefreshToken = data.refresh_token;

  return data.access_token;
}

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clubId = req.query.club_id || 'dbb-';

  // Diagnostic mode: ?debug=1 returns config check without calling Strava
  if (req.query.debug === '1') {
    return res.status(200).json({
      status: 'diagnostic',
      clubId,
      env: {
        hasClientId: !!process.env.STRAVA_CLIENT_ID,
        clientIdLength: process.env.STRAVA_CLIENT_ID?.length || 0,
        hasClientSecret: !!process.env.STRAVA_CLIENT_SECRET,
        clientSecretLength: process.env.STRAVA_CLIENT_SECRET?.length || 0,
        hasRefreshToken: !!process.env.STRAVA_REFRESH_TOKEN,
        refreshTokenLength: process.env.STRAVA_REFRESH_TOKEN?.length || 0,
      },
      cache: {
        hasCachedToken: !!cachedAccessToken,
        tokenExpiresAt: tokenExpiresAt ? new Date(tokenExpiresAt * 1000).toISOString() : null,
        hasCachedRefreshToken: !!currentRefreshToken,
      },
    });
  }

  try {
    console.log(`[Strava] Fetching club events for club: ${clubId}`);
    const accessToken = await getAccessToken();

    // Resolve slug to numeric ID (Strava group_events requires numeric ID)
    const numericClubId = await resolveClubId(clubId, accessToken);
    console.log(`[Strava] Using numeric club ID: ${numericClubId} (from: ${clubId})`);

    // Fetch all pages of events (Strava may paginate results)
    let allEvents: any[] = [];
    let page = 1;
    const perPage = 200; // Request maximum per page

    while (true) {
      const eventsUrl = `https://www.strava.com/api/v3/clubs/${numericClubId}/group_events?page=${page}&per_page=${perPage}`;
      console.log(`[Strava] Calling: ${eventsUrl}`);

      const stravaResponse = await fetch(eventsUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(`[Strava] Events response (page ${page}): ${stravaResponse.status} ${stravaResponse.statusText}`);

      if (!stravaResponse.ok) {
        const errorText = await stravaResponse.text();
        console.error(`[Strava] Events API error ${stravaResponse.status}:`, errorText);

        if (stravaResponse.status === 401 || stravaResponse.status === 403) {
          return res.status(stravaResponse.status).json({
            error: 'Strava authorization failed',
            message: 'Access token is invalid or expired. Check your Strava API credentials.',
            stravStatus: stravaResponse.status,
            details: errorText,
          });
        }

        if (stravaResponse.status === 404) {
          return res.status(404).json({
            error: 'Club not found',
            message: `Club "${clubId}" was not found on Strava. Verify the club ID.`,
            details: errorText,
          });
        }

        return res.status(stravaResponse.status).json({
          error: 'Strava API error',
          message: `Strava returned status ${stravaResponse.status}`,
          details: errorText,
        });
      }

      const events = await stravaResponse.json();
      const pageEvents = Array.isArray(events) ? events : [];
      console.log(`[Strava] Page ${page}: got ${pageEvents.length} events`);

      allEvents = allEvents.concat(pageEvents);

      // If we got fewer than perPage, we've reached the last page
      if (pageEvents.length < perPage) {
        break;
      }
      page++;

      // Safety limit
      if (page > 10) break;
    }

    console.log(`[Strava] SUCCESS: Got ${allEvents.length} total events for club ${clubId}`,
      allEvents.map((e: any) => ({ id: e.id, title: e.title, occurrences: e.upcoming_occurrences?.length || 0 }))
    );

    // Cache for 5 minutes
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

    return res.status(200).json(allEvents);
  } catch (error: any) {
    // If Strava is not configured, return a clear indicator (not empty array)
    if (error.message === 'STRAVA_NOT_CONFIGURED') {
      return res.status(200).json({
        status: 'not_configured',
        message: 'Strava API credentials are not set. Configure STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, and STRAVA_REFRESH_TOKEN.',
      });
    }
    console.error('Club events API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}
