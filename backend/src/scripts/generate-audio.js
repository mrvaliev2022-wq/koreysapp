require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const { generateLessonAudio } = require('../audio/generator');
const db = require('../db');

const args = process.argv.slice(2);
const levelArg = args.includes('--level') ? args[args.indexOf('--level') + 1] : null;
const trackArg = args.includes('--track') ? args[args.indexOf('--track') + 1] : null;

async function main() {
  console.log('Audio generatsiya boshlandi...\n');
  let query = 'SELECT id, title_kr, level, track, content FROM lessons';
  const params = [];
  const conditions = [];
  if (trackArg) { conditions.push('track = $' + (params.length + 1)); params.push(trackArg); }
  if (levelArg) { conditions.push('level = $' + (params.length + 1)); params.push(parseInt(levelArg)); }
  if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
  query += ' ORDER BY track, level, id';
  const { rows: lessons } = await db.query(query, params);
  console.log('Jami darslar: ' + lessons.length + ' ta\n');
  let total = 0;
  for (const lesson of lessons) {
    console.log('Dars ' + lesson.id + ': ' + lesson.title_kr);
    const content = typeof lesson.content === 'string' ? JSON.parse(lesson.content) : lesson.content;
    try {
      const audioUrls = await generateLessonAudio(lesson.id, content);
      const urlCount = Object.keys(audioUrls).length;
      if (urlCount > 0) {
        await db.query('UPDATE lessons SET audio_urls = $1 WHERE id = $2', [JSON.stringify(audioUrls), lesson.id]);
        console.log('  OK: ' + urlCount + ' ta audio\n');
      }
      total += urlCount;
    } catch (err) { console.error('  XATO: ' + err.message + '\n'); }
  }
  console.log('Jami audio: ' + total + ' ta mp3');
  await db.end();
}
main().catch(err => { console.error('XATO:', err.message); process.exit(1); });
