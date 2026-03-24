import { supabase } from '../lib/supabase'

type RouteCatalogRow = {
  id: string
  route: string
  length_km: number | null
  elev_gain_m: number | null
  time_h: number | null
  difficulty: string | null
  surface: string | null
  ride_family: string | null
  route_type: string | null
  place: string | null
  about: string | null
  gpx_file_name: string | null
  route_points: Array<{ lat: number; lng: number }> | null
  start_point: { lat: number; lng: number } | null
  end_point: { lat: number; lng: number } | null
  coordinates: { lat: number; lng: number } | null
  thumbnail_url: string | null
  photos: string[] | null
  is_published: boolean
  sort_order: number
  created_at: string
}

function normalizeDifficulty(raw: string | null): 'easy' | 'norm' | 'long' | 'hard' | 'epic' {
  if (!raw) return 'norm'
  const lower = raw.toLowerCase().trim()
  if (lower === 'easy') return 'easy'
  if (lower === 'norm') return 'norm'
  if (lower === 'long') return 'long'
  if (lower === 'hard') return 'hard'
  if (lower === 'epic') return 'epic'
  // Legacy mapping
  if (lower === 'medium') return 'norm'
  return 'norm'
}

function normalizeSurface(raw: string | null): 'road' | 'gravel' | 'mixed' {
  if (!raw) return 'road'
  const lower = raw.toLowerCase().trim()
  if (lower === 'road') return 'road'
  if (lower === 'gravel') return 'gravel'
  if (lower === 'mixed') return 'mixed'
  return 'road'
}

function normalizeRideFamily(raw: string | null): 'coffee' | 'dark' | 'sun' | 'plus' | 'misc' | null {
  if (!raw) return null
  const lower = raw.toLowerCase().trim()
  if (lower === 'coffee') return 'coffee'
  if (lower === 'dark') return 'dark'
  if (lower === 'sun') return 'sun'
  if (lower === 'plus') return 'plus'
  if (lower === 'misc') return 'misc'
  return null
}

function normalizeRouteType(raw: string | null): 'loop' | 'point_to_point' | null {
  if (!raw) return null
  const lower = raw.toLowerCase().trim()
  if (lower.includes('loop')) return 'loop'
  if (lower.includes('a to b') || lower.includes('a→b') || lower.includes('↦')) return 'point_to_point'
  return null
}

function mapCatalogRow(row: RouteCatalogRow) {
  return {
    uuid: row.id,
    id: row.id,
    name: row.route,
    region: row.place || 'Serbia',
    distance: Number(row.length_km) || 0,
    elevation: row.elev_gain_m || 0,
    difficulty: normalizeDifficulty(row.difficulty),
    surface: normalizeSurface(row.surface),
    rideFamily: normalizeRideFamily(row.ride_family),
    routeType: normalizeRouteType(row.route_type),
    thumbnail: row.thumbnail_url ?? '',
    coordinates: row.coordinates,
    description: row.about,
    safetyNotes: null as string | null,
    estimatedTime: row.time_h ? `${row.time_h}h` : null,
    photos: row.photos ?? [],
    startPoint: row.start_point,
    endPoint: row.end_point,
    gpxFileName: row.gpx_file_name,
    route: row.route_points ?? [],
    isPublished: row.is_published,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.created_at,
  }
}

export const trackService = {
  async getTracks(_region?: string) {
    const { data, error } = await supabase
      .from('routes_catalog')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })

    if (error) {
      throw error
    }

    return (data ?? []).map((row) => mapCatalogRow(row as RouteCatalogRow))
  },

  async getTrackDetail(trackId: string) {
    const { data, error } = await supabase
      .from('routes_catalog')
      .select('*')
      .eq('id', trackId)
      .single()

    if (error) {
      throw error
    }

    return mapCatalogRow(data as RouteCatalogRow)
  },

  getGpxDownloadUrl(fileName: string) {
    const { data } = supabase.storage
      .from('gpx-files')
      .getPublicUrl(fileName)

    return data.publicUrl
  },
}
