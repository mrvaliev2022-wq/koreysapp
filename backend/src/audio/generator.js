// backend/src/audio/generator.js
// Generates Korean audio via Microsoft Edge TTS and uploads to Cloudflare R2

const { S3Client, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// R2 client
const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT, // https://ACCOUNT_ID.r2.cloudflarestorage.com
  credentials: {
    accessKeyId:     process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

const BUCKET  = process.env.R2_BUCKET  || 'koreysapp-audio';
const CDN_URL = process.env.R2_CDN_URL || 'https://audio.koreysapp.com'; // Custom domain or R2 public URL
const VOICE   = 'ko-KR-SunHiNeural'; // Korean female voice

/**
 * Clean Korean text — remove punctuation that TTS reads aloud
 */
function cleanText(text) {
  return text
    .replace(/[.,!?;:"""''()[\]{}<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Generate MP3 for Korean text using edge-tts CLI
 * Returns local file path
 */
async function generateMP3(text, outputPath) {
  const cleaned = cleanText(text);
  // edge-tts must be installed: pip install edge-tts
  execSync(
    `edge-tts --voice "${VOICE}" --text "${cleaned.replace(/"/g, '\\"')}" --write-media "${outputPath}"`,
    { timeout: 30_000 }
  );
  return outputPath;
}

/**
 * Upload file to R2
 */
async function uploadToR2(localPath, r2Key) {
  const fileBuffer = fs.readFileSync(localPath);
  await r2.send(new PutObjectCommand({
    Bucket:      BUCKET,
    Key:         r2Key,
    Body:        fileBuffer,
    ContentType: 'audio/mpeg',
    CacheControl: 'public, max-age=31536000', // 1 year cache
  }));
  return `${CDN_URL}/${r2Key}`;
}

/**
 * Check if audio already exists in R2
 */
async function existsInR2(r2Key) {
  try {
    await r2.send(new HeadObjectCommand({ Bucket: BUCKET, Key: r2Key }));
    return true;
  } catch {
    return false;
  }
}

/**
 * Main: generate audio for a lesson
 * lessonId: DB lesson ID
 * content:  lesson content JSON
 * Returns:  audio_urls object { key: cdnUrl }
 */
async function generateLessonAudio(lessonId, content) {
  const audioUrls = {};
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'koreysapp-'));

  const tasks = [];

  // Topic text
  if (content.topic?.kr) {
    tasks.push({ key: 'topic', text: content.topic.kr });
  }

  // Grammar examples
  content.grammar?.examples?.forEach((ex, i) => {
    if (ex.kr) tasks.push({ key: `grammar_${i}`, text: ex.kr });
  });

  // Vocabulary (Korean only, no romanization)
  content.vocabulary?.forEach((v, i) => {
    if (v.kr) tasks.push({ key: `vocab_${i}`, text: v.kr });
  });

  // Example sentences
  content.examples?.forEach((ex, i) => {
    if (ex.kr) tasks.push({ key: `example_${i}`, text: ex.kr });
  });

  // Dialog lines
  content.dialog?.forEach((line, i) => {
    if (line.kr) tasks.push({ key: `dialog_${i}`, text: line.kr });
  });

  console.log(`Generating ${tasks.length} audio files for lesson ${lessonId}...`);

  for (const task of tasks) {
    const r2Key    = `${lessonId}-${task.key}.mp3`;
    const localPath = path.join(tmpDir, `${task.key}.mp3`);

    // Skip if already exists
    if (await existsInR2(r2Key)) {
      audioUrls[task.key] = `${CDN_URL}/${r2Key}`;
      console.log(`  ✓ ${r2Key} (cached)`);
      continue;
    }

    try {
      await generateMP3(task.text, localPath);
      const url = await uploadToR2(localPath, r2Key);
      audioUrls[task.key] = url;
      console.log(`  ✓ ${r2Key}`);
    } catch (err) {
      console.error(`  ✗ ${r2Key}: ${err.message}`);
    } finally {
      if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
    }
  }

  // Cleanup tmp dir
  fs.rmdirSync(tmpDir, { recursive: true });

  return audioUrls;
}

module.exports = { generateLessonAudio };
