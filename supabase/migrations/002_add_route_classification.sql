-- Step 1: Drop old difficulty CHECK constraint and add expanded one
ALTER TABLE public.tracks DROP CONSTRAINT IF EXISTS tracks_difficulty_check;
ALTER TABLE public.tracks
  ADD CONSTRAINT tracks_difficulty_check
  CHECK (difficulty IN ('easy', 'norm', 'long', 'hard', 'epic'));

-- Step 2: Update existing rows that used 'medium' → 'norm'
UPDATE public.tracks SET difficulty = 'norm' WHERE difficulty = 'medium';

-- Step 3: Add route_category column (DBB Ride type)
ALTER TABLE public.tracks
  ADD COLUMN IF NOT EXISTS route_category text
  CHECK (route_category IN ('coffee', 'dark', 'sun', 'plus', 'misc'));

-- Step 4: Add route_format column (Loop vs A→B)
ALTER TABLE public.tracks
  ADD COLUMN IF NOT EXISTS route_format text
  CHECK (route_format IN ('loop', 'point_to_point'));

-- Step 5: Indexes for new columns
CREATE INDEX IF NOT EXISTS idx_tracks_route_category ON public.tracks(route_category);
CREATE INDEX IF NOT EXISTS idx_tracks_route_format ON public.tracks(route_format);
CREATE INDEX IF NOT EXISTS idx_tracks_surface ON public.tracks(surface);
