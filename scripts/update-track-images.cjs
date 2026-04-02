/**
 * Updates thumbnail_url and photos for all tracks in Supabase
 * based on route name → image mapping.
 *
 * Usage:
 *   node scripts/update-track-images.cjs
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load env
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
for (const line of envContent.split(/\r?\n/)) {
  const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (match) env[match[1]] = match[2].trim();
}

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const IMG_BASE = '/routes_images';

// Map route name prefix → { thumbnail (Icon), photo (DBB banner) }
function getImagesForTrack(name) {
  // Coffee Ride — match version number for icon
  const crMatch = name.match(/^DBB CR (\d)/);
  if (crMatch) {
    const version = crMatch[1];
    return {
      thumbnail: `${IMG_BASE}/Icon Coffee ${version}.x.png`,
      photos: [`${IMG_BASE}/DBB Coffee.png`],
    };
  }

  // Dark-On-Ride (evening workout)
  if (name.startsWith('DBB DOR')) {
    return {
      thumbnail: `${IMG_BASE}/Icon Dark.png`,
      photos: [`${IMG_BASE}/DBB Dark.png`],
    };
  }

  // Dark-On-Draft (evening social)
  if (name.startsWith('DBB DOD')) {
    return {
      thumbnail: `${IMG_BASE}/Icon Dark.png`,
      photos: [`${IMG_BASE}/DBB Dark.png`],
    };
  }

  // Sun rides
  if (name.startsWith('DBB Sun')) {
    return {
      thumbnail: `${IMG_BASE}/Icon Sun.png`,
      photos: [`${IMG_BASE}/DBB Sun.png`],
    };
  }

  // Long-distance: Belgrade—Leskovac
  if (name.includes('Belgrade') && name.includes('Leskovac')) {
    return {
      thumbnail: `${IMG_BASE}/Icon Belgrade-Leskovac.png`,
      photos: [`${IMG_BASE}/DBB+ Belgrade-Leskovac.png`],
    };
  }

  // Long-distance: Belgrade—Miroc
  if (name.includes('Belgrade') && name.includes('Miroc')) {
    return {
      thumbnail: `${IMG_BASE}/Icon Belgrade-Miroc.png`,
      photos: [`${IMG_BASE}/DBB+ Belgrade-Miroc.png`],
    };
  }

  // Long-distance: Belgrade—Sarajevo
  if (name.includes('Belgrade') && name.includes('Sarajevo')) {
    return {
      thumbnail: `${IMG_BASE}/Icon Belgrade-Sarajevo.png`,
      photos: [`${IMG_BASE}/DBB+ Belgrade-Sarajevo.png`],
    };
  }

  // Gravel: Golija
  if (name.includes('Golija')) {
    return {
      thumbnail: `${IMG_BASE}/Icon Golija Gravel.png`,
      photos: [`${IMG_BASE}/DBB+ Golija  Gravel.png`],
    };
  }

  // Gravel: Tara
  if (name.includes('Tara')) {
    return {
      thumbnail: `${IMG_BASE}/Icon Tara Gravel.png`,
      photos: [`${IMG_BASE}/DBB+ Tara Gravel.png`],
    };
  }

  // Burekfast / Rekafary / other misc
  if (name.startsWith('DBB Burekfast') || name.startsWith('DBB Rekafary')) {
    return {
      thumbnail: `${IMG_BASE}/Icon Misc.png`,
      photos: [`${IMG_BASE}/DBB Misc.png`],
    };
  }

  // Fallback for any other DBB route
  return {
    thumbnail: `${IMG_BASE}/Icon Misc.png`,
    photos: [`${IMG_BASE}/DBB Misc.png`],
  };
}

async function main() {
  console.log('Fetching all tracks from Supabase...\n');

  const { data: tracks, error } = await supabase
    .from('tracks')
    .select('id, name, thumbnail_url, photos');

  if (error) {
    console.error('Failed to fetch tracks:', error.message);
    process.exit(1);
  }

  console.log(`Found ${tracks.length} tracks. Updating images...\n`);

  let updated = 0;
  let failed = 0;

  for (const track of tracks) {
    const images = getImagesForTrack(track.name);

    const { error: updateError } = await supabase
      .from('tracks')
      .update({
        thumbnail_url: images.thumbnail,
        photos: images.photos,
      })
      .eq('id', track.id);

    if (updateError) {
      console.error(`  FAIL  ${track.name}: ${updateError.message}`);
      failed++;
    } else {
      console.log(`  OK    ${track.name}  →  ${images.thumbnail}`);
      updated++;
    }
  }

  console.log(`\nDone! Updated: ${updated}, Failed: ${failed}`);
}

main().catch((err) => {
  console.error('Script failed:', err);
  process.exit(1);
});
