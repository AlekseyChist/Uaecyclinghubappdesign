import { supabase } from '../lib/supabase'

type SupabaseTrackRow = {
  id: string
  legacy_id: string | null
  name: string
  region: string
  distance_km: number
  elevation_m: number
  difficulty: 'easy' | 'medium' | 'hard'
  surface: 'road' | 'gravel' | 'mixed'
  thumbnail_url: string | null
  coordinates: { lat: number; lng: number } | null
  description: string | null
  safety_notes: string | null
  estimated_time: string | null
  photos: string[] | null
  start_point: { lat: number; lng: number } | null
  end_point: { lat: number; lng: number } | null
  gpx_file_name: string | null
  route_points: Array<{ lat: number; lng: number }> | null
  is_published: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

function mapTrackRow(row: SupabaseTrackRow) {
  return {
    uuid: row.id,
    id: row.legacy_id ?? row.id,
    name: row.name,
    region: row.region,
    distance: row.distance_km,
    elevation: row.elevation_m,
    difficulty: row.difficulty,
    surface: row.surface,
    thumbnail: row.thumbnail_url,
    thumbnailUrl: row.thumbnail_url,
    coordinates: row.coordinates,
    description: row.description,
    safetyNotes: row.safety_notes,
    estimatedTime: row.estimated_time,
    photos: row.photos ?? [],
    startPoint: row.start_point,
    endPoint: row.end_point,
    gpxFileName: row.gpx_file_name,
    route: row.route_points ?? [],
    isPublished: row.is_published,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export const trackService = {
  async getTracks(region?: string) {
    let query = supabase
      .from('tracks')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })

    if (region) {
      query = query.eq('region', region)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return (data ?? []).map((row) => mapTrackRow(row as SupabaseTrackRow))
  },

  async getTrackDetail(legacyId: string) {
    const { data, error } = await supabase
      .from('tracks')
      .select('*')
      .eq('legacy_id', legacyId)
      .single()

    if (error) {
      throw error
    }

    return mapTrackRow(data as SupabaseTrackRow)
  },

  getGpxDownloadUrl(fileName: string) {
    const { data } = supabase.storage
      .from('gpx-files')
      .getPublicUrl(fileName)

    return data.publicUrl
  },
}