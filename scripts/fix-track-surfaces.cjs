/**
 * Fixes the `surface` field for all tracks in Supabase.
 * Routes with "Gravel" or "(gravel)" in the name → 'gravel'
 * Routes with "mixed" in name or gravel long-distance routes → 'mixed'
 * Everything else stays 'road'.
 *
 * Usage:
 *   node scripts/fix-track-surfaces.cjs
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
for (const line of envContent.split(/\r?\n/)) {
  const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (match) env[match[1]] = match[2].trim();
}

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

function getSurface(name) {
  const lower = name.toLowerCase();

  // Explicit gravel routes: "Tara Gravel", "Golija Gravel", "(gravel)" suffix
  if (lower.includes('tara gravel') || lower.includes('golija gravel')) {
    return 'gravel';
  }

  // Routes marked with (gravel) — these are gravel variants of otherwise road rides
  if (lower.includes('(gravel)')) {
    return 'gravel';
  }

  // Belgrade—Miroc gravel variants
  if (lower.includes('miroc') && lower.includes('gravel')) {
    return 'gravel';
  }

  // Belgrade—Miroc without explicit type — multi-day with mixed terrain
  // Belgrade—Sarajevo — long bikepacking, mixed surfaces
  if (lower.includes('belgrade') && lower.includes('sarajevo')) {
    return 'mixed';
  }

  return 'road';
}

async function main() {
  console.log('Fetching all tracks...\n');

  const { data: tracks, error } = await supabase
    .from('tracks')
    .select('id, name, surface');

  if (error) {
    console.error('Failed to fetch:', error.message);
    process.exit(1);
  }

  let updated = 0;
  let skipped = 0;

  for (const track of tracks) {
    const newSurface = getSurface(track.name);

    if (newSurface === track.surface) {
      skipped++;
      continue;
    }

    const { error: updateError } = await supabase
      .from('tracks')
      .update({ surface: newSurface })
      .eq('id', track.id);

    if (updateError) {
      console.error(`  FAIL  ${track.name}: ${updateError.message}`);
    } else {
      console.log(`  ${track.surface} → ${newSurface}  ${track.name}`);
      updated++;
    }
  }

  console.log(`\nDone! Updated: ${updated}, Skipped (already correct): ${skipped}`);
}

main().catch((err) => {
  console.error('Script failed:', err);
  process.exit(1);
});
