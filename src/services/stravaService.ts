/**
 * Strava API integration service
 * Fetches club events from Strava via serverless proxy
 */

// Strava Group Event response shape (undocumented endpoint)
export interface StravaGroupEvent {
  id: number;
  title: string;
  description: string;
  club_id: number;
  organizing_athlete: {
    firstname: string;
    lastname: string;
  };
  activity_type: string; // "Ride", "Run", etc.
  created_at: string;
  route_id: number | null;
  woman_only: boolean;
  private: boolean;
  skill_levels: number; // 0=casual, 1=tempo, 2=hammerfest, 4=any
  terrain: number; // 0=road, 1=trail, 2=any
  upcoming_occurrences: string[]; // ISO date strings
  address: string;
  joined: boolean;
}

// Mapped event for app consumption
export interface ClubEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  type: 'race' | 'granfondo' | 'group-ride';
  distanceOptions?: string[];
  status: 'upcoming' | 'sold-out' | 'canceled';
  isSaved?: boolean;
  // Strava-specific fields
  description?: string;
  organizer?: string;
  activityType?: string;
  stravaEventId?: number;
  isFromStrava?: boolean;
}

const STRAVA_CLUB_ID = 'dbb-';
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

function mapSkillToType(skillLevels: number): 'race' | 'granfondo' | 'group-ride' {
  // 2 = hammerfest (race-like), 1 = tempo (gran fondo), 0 = casual (group ride)
  if (skillLevels === 2) return 'race';
  if (skillLevels === 1) return 'granfondo';
  return 'group-ride';
}

function formatTime(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function mapStravaEventToClubEvent(event: StravaGroupEvent): ClubEvent[] {
  const now = new Date();

  // Each upcoming occurrence becomes a separate event entry
  const upcomingDates = (event.upcoming_occurrences || [])
    .filter((dateStr) => new Date(dateStr) >= now)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // If no upcoming dates, use the event as-is with created_at
  if (upcomingDates.length === 0) {
    return [];
  }

  return upcomingDates.map((dateStr, index) => ({
    id: `strava-${event.id}-${index}`,
    name: event.title,
    date: new Date(dateStr).toISOString().split('T')[0],
    time: formatTime(dateStr),
    location: event.address || 'See Strava for details',
    type: mapSkillToType(event.skill_levels),
    status: 'upcoming' as const,
    isSaved: false,
    description: event.description,
    organizer: `${event.organizing_athlete.firstname} ${event.organizing_athlete.lastname}`,
    activityType: event.activity_type,
    stravaEventId: event.id,
    isFromStrava: true,
  }));
}

export async function fetchClubEvents(): Promise<ClubEvent[]> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE}/strava/club-events?club_id=${STRAVA_CLUB_ID}`);
  } catch (err) {
    throw new Error(
      'Cannot connect to Strava API. Check that the API server is running and VITE_API_BASE_URL is configured.'
    );
  }

  if (!response.ok) {
    let details = '';
    try {
      const body = await response.json();
      details = body.message || body.error || '';
    } catch {
      // ignore parse errors
    }
    throw new Error(
      `Strava API error (${response.status})${details ? ': ' + details : ''}`
    );
  }

  const body = await response.json();

  // Check if API returned a "not configured" indicator
  if (body && body.status === 'not_configured') {
    throw new Error(
      'Strava API is not configured. Set STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, and STRAVA_REFRESH_TOKEN.'
    );
  }

  const stravaEvents: StravaGroupEvent[] = Array.isArray(body) ? body : [];

  // Map and flatten all upcoming occurrences
  const clubEvents = stravaEvents.flatMap(mapStravaEventToClubEvent);

  // Sort by date
  return clubEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
