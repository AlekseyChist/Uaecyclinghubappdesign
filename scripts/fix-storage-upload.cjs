/**
 * Fix script: re-uploads GPX files to Supabase Storage with sanitized filenames,
 * and updates the gpx_file_name in the tracks table to match.
 *
 * Usage: node scripts/fix-storage-upload.cjs [/path/to/gpx/folder]
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load env
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
for (const line of envContent.split('\n')) {
  const match = line.match(/^(\w+)=(.*)$/);
  if (match) env[match[1]] = match[2].trim();
}

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const gpxDir = process.argv[2] || path.join(__dirname, '..', 'public', 'gpx');

// Sanitize filename for Supabase Storage (only ASCII, no special chars)
function sanitizeFileName(name) {
  return name
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/·/g, '-')        // middle dot → hyphen
    .replace(/—/g, '-')        // em dash → hyphen
    .replace(/–/g, '-')        // en dash → hyphen
    .replace(/×/g, 'x')        // multiplication sign → x
    .replace(/\+/g, 'plus')    // plus sign
    .replace(/\(/g, '_')       // parens
    .replace(/\)/g, '_')
    .replace(/\s+/g, '_')      // spaces → underscore
    .replace(/[^a-zA-Z0-9_.\-]/g, '') // remove remaining special chars
    .replace(/_+/g, '_')       // collapse multiple underscores
    .replace(/_\./g, '.')      // clean up before extension
    .replace(/^_|_$/g, '');    // trim leading/trailing underscores
}

async function fix() {
  const gpxFiles = fs.readdirSync(gpxDir).filter(f => f.toLowerCase().endsWith('.gpx'));
  console.log(`Found ${gpxFiles.length} GPX files\n`);

  let okCount = 0;
  let failCount = 0;

  for (const originalName of gpxFiles) {
    const safeName = sanitizeFileName(originalName);
    const filePath = path.join(gpxDir, originalName);
    const fileBuffer = fs.readFileSync(filePath);

    // Upload with sanitized name
    const { error: uploadError } = await supabase.storage
      .from('gpx-files')
      .upload(safeName, fileBuffer, {
        contentType: 'application/gpx+xml',
        upsert: true,
      });

    if (uploadError) {
      console.log(`  FAIL ${originalName} → ${safeName}: ${uploadError.message}`);
      failCount++;
      continue;
    }

    // Update gpx_file_name in tracks table to the safe storage name
    const legacyId = originalName.replace('.gpx', '').replace(/[^a-zA-Z0-9_.-]/g, '_');

    const { error: dbError } = await supabase
      .from('tracks')
      .update({ gpx_file_name: safeName })
      .eq('legacy_id', legacyId);

    if (dbError) {
      console.log(`  OK   ${safeName} (upload ok, DB update failed: ${dbError.message})`);
    } else {
      console.log(`  OK   ${originalName} → ${safeName}`);
    }
    okCount++;
  }

  console.log(`\nDone! ${okCount} uploaded, ${failCount} failed.`);
}

fix().catch(err => {
  console.error('Fix failed:', err);
  process.exit(1);
});
