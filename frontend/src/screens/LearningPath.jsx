import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { api } from '../api';

const STATUS_COLOR = {
  completed:   { bg: '#E8F5E9', border: '#A5D6A7', icon: '✅' },
  unlocked:    { bg: '#E3F2FD', border: '#90CAF9', icon: '▶' },
  in_progress: { bg: '#FFF8E1', border: '#FFE082', icon: '📖' },
  locked:      { bg: '#F5F5F5', border: '#E0E0E0', icon: '🔒' },
};

// Hangul harflari — animatsiya uchun
const HANGUL_CHARS = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅎ','ㅏ','ㅓ','ㅗ','ㅜ','ㅣ'];

export default function LearningPath() {
  const { track, lessons, setLessons, user } = useStore();
  const [loading, setLoading] = useState(!lessons.length);
  const nav = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.getLessons(track)
      .then(setLessons)
      .finally(() => setLoading(false));
  }, [track]);

  if (loading) return <div style={s.center}>Yuklanmoqda...</div>;

  // level === 0 bo'lgan kirish darsini ajratamiz
  const introLesson = lessons.find(l => l.level === 0);
  // Qolgan darslar
  const mainLessons = lessons.filter(l => l.level !== 0);

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.trackLabel}>{track === 'TOPIK' ? '📚 TOPIK' : '💼 EPS-TOPIK'}</div>
        <div style={s.count}>{mainLessons.filter(l => l.status === 'completed').length}/{mainLessons.length} dars</div>
      </div>

      {/* ── Alifbo kirish kartasi ── */}
      {introLesson && (
        <AlphabetCard lesson={introLesson} onClick={() => nav(`/lesson/${introLesson.id}`)} />
      )}

      {/* ── Asosiy darslar ro'yxati ── */}
      <div style={s.list}>
        {mainLessons.map((lesson, i) => {
          const st = STATUS_COLOR[lesson.status] || STATUS_COLOR.locked;
          const isLocked = lesson.status === 'locked' && !user?.is_premium && !lesson.is_free;

          return (
            <button
              key={lesson.id}
              style={{ ...s.card, background: st.bg, border: `1.5px solid ${st.border}`,
                       opacity: isLocked ? 0.6 : 1 }}
              onClick={() => !isLocked && nav(`/lesson/${lesson.id}`)}
            >
              <div style={s.num}>{i + 1}</div>
              <div style={s.info}>
                <div style={s.titleKr}>{lesson.title_kr}</div>
                <div style={s.titleUz}>{lesson.title_uz}</div>
              </div>
              <div style={s.statusIcon}>{st.icon}</div>
              {lesson.score != null && lesson.status === 'completed' && (
                <div style={s.score}>{lesson.score}%</div>
              )}
            </button>
          );
        })}
      </div>

      {!user?.is_premium && (
        <div style={s.premBanner}>
          🔒 <strong>127+ dars</strong> uchun Premium oling
          <button style={s.premBtn} onClick={() => nav('/premium')}>Premium →</button>
        </div>
      )}
    </div>
  );
}

// ── Alifbo kirish kartasi komponenti ──
function AlphabetCard({ lesson, onClick }) {
  const [charIdx, setCharIdx] = useState(0);

  // Har 800ms da bir Hangul harfi o'zgaradi
  useEffect(() => {
    const t = setInterval(() => {
      setCharIdx(i => (i + 1) % HANGUL_CHARS.length);
    }, 800);
    return () => clearInterval(t);
  }, []);

  const isDone = lesson?.status === 'completed';

  return (
    <button style={s.alphaCard} onClick={onClick}>
      {/* Chap: matn */}
      <div style={s.alphaLeft}>
        <div style={s.alphaBadge}>✨ Kirish darsi</div>
        <div style={s.alphaTitle}>Harflar</div>
        <div style={s.alphaSubtitle}>Koreys tilida</div>
        <div style={s.alphaDesc}>한글 · Hangul</div>
        <div style={s.alphaHint}>
          {isDone ? '✅ O\'tilgan' : '▶ Boshlash — bepul'}
        </div>
      </div>

      {/* O'ng: animatsiya */}
      <div style={s.alphaRight}>
        <div style={s.alphaCharBig}>{HANGUL_CHARS[charIdx]}</div>
        <div style={s.alphaCharRow}>
          {HANGUL_CHARS.slice(0, 5).map((c, i) => (
            <span key={i} style={{
              ...s.alphaCharSmall,
              opacity: i === charIdx % 5 ? 1 : 0.3,
              transform: i === charIdx % 5 ? 'scale(1.2)' : 'scale(1)',
            }}>{c}</span>
          ))}
        </div>
      </div>

      {/* Belgi */}
      {isDone && <div style={s.alphaDoneBadge}>✅</div>}
    </button>
  );
}

const s = {
  page:       { padding: '16px 16px 100px', minHeight: '100vh' },
  center:     { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' },
  header:     { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  trackLabel: { fontSize: 18, fontWeight: 700 },
  count:      { fontSize: 13, color: '#888' },

  // ── Alifbo kartasi ──
  alphaCard: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 60%, #1976D2 100%)',
    borderRadius: 18,
    padding: '20px 18px',
    marginBottom: 20,
    cursor: 'pointer',
    border: 'none',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(21,101,192,0.35)',
    textAlign: 'left',
  },
  alphaLeft:     { flex: 1 },
  alphaBadge:    { fontSize: 11, fontWeight: 700, color: '#90CAF9',
                   background: 'rgba(255,255,255,0.12)', borderRadius: 20,
                   padding: '3px 10px', display: 'inline-block', marginBottom: 8 },
  alphaTitle:    { fontSize: 26, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 },
  alphaSubtitle: { fontSize: 15, fontWeight: 600, color: '#90CAF9', marginTop: 2 },
  alphaDesc:     { fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 4 },
  alphaHint:     { fontSize: 12, color: '#A5D6A7', marginTop: 10, fontWeight: 600 },

  alphaRight:    { width: 90, display: 'flex', flexDirection: 'column',
                   alignItems: 'center', gap: 8 },
  alphaCharBig:  { fontSize: 52, color: '#fff', fontWeight: 800, lineHeight: 1,
                   transition: 'all 0.3s ease' },
  alphaCharRow:  { display: 'flex', gap: 5 },
  alphaCharSmall:{ fontSize: 14, color: '#90CAF9', fontWeight: 700,
                   transition: 'all 0.3s ease', display: 'inline-block' },
  alphaDoneBadge:{ position: 'absolute', top: 12, right: 12, fontSize: 20 },

  // ── Asosiy darslar ──
  list:       { display: 'flex', flexDirection: 'column', gap: 10 },
  card:       { display: 'flex', alignItems: 'center', gap: 12, borderRadius: 12,
                padding: '14px 16px', cursor: 'pointer', textAlign: 'left', width: '100%' },
  num:        { width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,0,0,.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, flexShrink: 0 },
  info:       { flex: 1 },
  titleKr:    { fontSize: 15, fontWeight: 600, color: '#1a1a1a' },
  titleUz:    { fontSize: 12, color: '#666', marginTop: 2 },
  statusIcon: { fontSize: 20 },
  score:      { fontSize: 11, color: '#2E7D32', fontWeight: 700, background: '#C8E6C9',
                borderRadius: 8, padding: '2px 6px' },
  premBanner: { position: 'fixed', bottom: 70, left: 12, right: 12, background: '#FFF9C4',
                border: '1px solid #F9E076', borderRadius: 12, padding: '12px 16px',
                fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 },
  premBtn:    { marginLeft: 'auto', background: '#F9A825', color: '#fff', border: 'none',
                borderRadius: 8, padding: '6px 12px', fontWeight: 600, cursor: 'pointer' },
};
