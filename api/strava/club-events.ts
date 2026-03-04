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

// In-memory token cache (persists across warm invocations)
let cachedAccessToken: string | null = null;
let tokenExpiresAt = 0;
let currentRefreshToken: string | null = null;

async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  // Return cached token if still valid (with 5 min buffer)
  if (cachedAccessToken && tokenExpiresAt > now + 300) {
    return cachedAccessToken;
  }

  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const refreshToken = currentRefreshToken || process.env.STRAVA_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('STRAVA_NOT_CONFIGURED');
  }

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
    throw new Error(`Strava token refresh failed: ${response.status} ${errorText}`);
  }

  const data: TokenResponse = await response.json();

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

  try {
    const accessToken = await getAccessToken();

    const stravaResponse = await fetch(
      `https://www.strava.com/api/v3/clubs/${clubId}/group_events`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!stravaResponse.ok) {
      const errorText = await stravaResponse.text();
      return res.status(stravaResponse.status).json({
        error: 'Strava API error',
        details: errorText,
      });
    }

    const events = await stravaResponse.json();

    // Cache for 5 minutes
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

    return res.status(200).json(events);
  } catch (error: any) {
    // If Strava is not configured, return empty array (not an error)
    if (error.message === 'STRAVA_NOT_CONFIGURED') {
      return res.status(200).json([]);
    }
    console.error('Club events API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}
