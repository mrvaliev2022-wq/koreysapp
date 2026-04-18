import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { api } from '../api';

const HANGUL = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅎ','ㅏ','ㅓ','ㅗ','ㅜ','ㅣ'];

const STATUS = {
  completed:   { border: 'rgba(134,239,172,0.6)', bg: 'rgba(220,252,231,0.5)', icon: '✓' },
  unlocked:    { border: 'rgba(147,197,253,0.6)', bg: 'rgba(219,234,254,0.5)', icon: '▶' },
  in_progress: { border: 'rgba(253,224,71,0.6)',  bg: 'rgba(254,249,195,0.5)', icon: '📖' },
  locked:      { border: 'rgba(203,213,225,0.5)', bg: 'rgba(248,250,252,0.5)', icon: '🔒' },
};

export default function LearningPath() {
  const { track, lessons, setLessons, user } = useStore();
  const [loading, setLoading] = useState(!lessons.length);
  const nav = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.getLessons(track).then(setLessons).finally(() => setLoading(false));
  }, [track]);

  if (loading) return <div style={s.center}><div style={s.loader} /></div>;

  const introLesson = lessons.find(l => l.level === 0);
  const mainLessons = lessons.filter(l => l.level !== 0);
  const sections = track === 'TOPIK' ? buildTopik(mainLessons) : buildEps(mainLessons);
  const totalDone = mainLessons.filter(l => l.status === 'completed').length;

  return (
    <div style={s.page}>
      <div style={s.bubble1} /><div style={s.bubble2} /><div style={s.bubble3} />

      {/* Header */}
      <div style={s.header}>
        <div>
          <div style={s.trackLabel}>{track === 'TOPIK' ? '📚 TOPIK' : '💼 EPS-TOPIK'}</div>
          <div style={s.trackSub}>{totalDone}/{mainLessons.length} dars yakunlandi</div>
        </div>
        <div style={s.progressCircle}>
          <span style={s.progressPct}>{mainLessons.length ? Math.round(totalDone / mainLessons.length * 100) : 0}%</span>
        </div>
      </div>

      {/* Alphabet card */}
      {introLesson && <AlphabetCard lesson={introLesson} onClick={() => nav('/lesson/' + introLesson.id)} />}

      {/* Sections */}
      {sections.map((sec) => (
        <div key={sec.title} style={s.section}>
          <div style={s.secHeader}>
            <div style={s.secTitle}>{sec.title}</div>
            <div style={s.secCount}>
              {sec.lessons.filter(l => l.status === 'completed').length}/{sec.lessons.length}
            </div>
          </div>
          <div style={s.list}>
            {sec.lessons.map((lesson, i) => {
              const st = STATUS[lesson.status] || STATUS.locked;
              const isLocked = lesson.status === 'locked' && !user?.is_premium && !lesson.is_free;
              return (
                <button key={lesson.id}
                  style={{ ...s.card, background: st.bg, borderColor: st.border, opacity: isLocked ? 0.65 : 1 }}
                  onClick={() => !isLocked && nav('/lesson/' + lesson.id)}>
                  <div style={{ ...s.cardNum, color: isLocked ? '#94a3b8' : '#2563eb' }}>
                    {sec.offset + i + 1}
                  </div>
                  <div style={s.cardInfo}>
                    <div style={s.cardKr}>{lesson.title_kr}</div>
                    <div style={s.cardUz}>{lesson.title_uz}</div>
                  </div>
                  <div style={s.cardIcon}>{st.icon}</div>
                  {lesson.score != null && lesson.status === 'completed' && (
                    <div style={s.scoreBadge}>{lesson.score}%</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!user?.is_premium && (
        <div style={s.premBanner}>
          <div style={s.premBannerBubble} />
          <div>
            <div style={s.premBannerTitle}>🔒 Premium oling</div>
            <div style={s.premBannerSub}>127+ dars to'liq ochiladi</div>
          </div>
          <button style={s.premBannerBtn} onClick={() => nav('/premium')}>Olish →</button>
        </div>
      )}
    </div>
  );
}

function AlphabetCard({ lesson, onClick }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HANGUL.length), 800);
    return () => clearInterval(t);
  }, []);
  const done = lesson?.status === 'completed';
  return (
    <button style={s.alphaCard} onClick={onClick}>
      <div style={s.alphaBubble1} /><div style={s.alphaBubble2} />
      <div style={s.alphaLeft}>
        <div style={s.alphaBadge}>✨ Kirish darsi</div>
        <div style={s.alphaTitle}>Harflar</div>
        <div style={s.alphaSub}>한글 · Hangul</div>
        <div style={s.alphaHint}>{done ? '✓ O\'tilgan' : '▶ Bepul boshlash'}</div>
      </div>
      <div style={s.alphaRight}>
        <div style={s.alphaCharBig}>{HANGUL[idx]}</div>
        <div style={s.alphaCharRow}>
          {HANGUL.slice(0, 5).map((c, i) => (
            <span key={i} style={{ ...s.alphaCharSm, opacity: i === idx % 5 ? 1 : 0.3 }}>{c}</span>
          ))}
        </div>
      </div>
      {done && <div style={s.alphaDone}>✓</div>}
    </button>
  );
}

function buildTopik(lessons) {
  const sections = [];
  for (let lvl = 1; lvl <= 6; lvl++) {
    const group = lessons.filter(l => l.level === lvl);
    if (group.length) sections.push({ title: lvl + '-daraja', lessons: group, offset: (lvl - 1) * 10 });
  }
  return sections;
}

function buildEps(lessons) {
  const b1 = lessons.filter(l => l.level >= 1 && l.level <= 30).sort((a, b) => a.level - b.level);
  const b2 = lessons.filter(l => l.level >= 31 && l.level <= 60).sort((a, b) => a.level - b.level);
  const sections = [];
  if (b1.length) sections.push({ title: 'EPS-TOPIK 1 (1-30 dars)', lessons: b1, offset: 0 });
  if (b2.length) sections.push({ title: 'EPS-TOPIK 2 (31-60 dars)', lessons: b2, offset: 30 });
  return sections;
}

const glass = {
  background: 'rgba(255,255,255,0.62)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1.5px solid rgba(255,255,255,0.9)',
};

const s = {
  page: { padding: '16px 16px 100px', minHeight: '100vh', background: 'linear-gradient(160deg,#f0f4ff,#e8f4ff 50%,#f0f0ff)', position: 'relative', overflow: 'hidden' },
  center: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' },
  loader: { width: 36, height: 36, borderRadius: '50%', border: '3px solid #dbeafe', borderTopColor: '#3b82f6', animation: 'spin 0.8s linear infinite' },
  bubble1: { position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(147,197,253,0.25),transparent)', top: -60, right: -60, pointerEvents: 'none' },
  bubble2: { position: 'absolute', width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle,rgba(134,239,172,0.2),transparent)', top: 300, left: -50, pointerEvents: 'none' },
  bubble3: { position: 'absolute', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle,rgba(196,181,253,0.2),transparent)', top: 600, right: -20, pointerEvents: 'none' },

  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, position: 'relative', zIndex: 1 },
  trackLabel: { fontSize: 18, fontWeight: 800, color: '#1e293b' },
  trackSub: { fontSize: 11, color: '#94a3b8', marginTop: 2 },
  progressCircle: { ...glass, width: 50, height: 50, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  progressPct: { fontSize: 12, fontWeight: 800, color: '#2563eb' },

  alphaCard: {
    ...glass, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: 'linear-gradient(135deg,rgba(29,106,245,0.85),rgba(14,165,233,0.85))',
    border: '1.5px solid rgba(255,255,255,0.25)',
    borderRadius: 20, padding: '18px 16px', marginBottom: 16,
    cursor: 'pointer', textAlign: 'left', position: 'relative', overflow: 'hidden',
  },
  alphaBubble1: { position: 'absolute', width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.1),transparent)', top: -20, right: 20, pointerEvents: 'none' },
  alphaBubble2: { position: 'absolute', width: 50, height: 50, borderRadius: '50%', background: 'radial-gradient(circle,rgba(134,239,172,0.2),transparent)', bottom: -10, right: 80, pointerEvents: 'none' },
  alphaLeft: { flex: 1 },
  alphaBadge: { fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '3px 10px', display: 'inline-block', marginBottom: 7 },
  alphaTitle: { fontSize: 24, fontWeight: 800, color: '#fff', lineHeight: 1.1 },
  alphaSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 3 },
  alphaHint: { fontSize: 11, color: 'rgba(163,230,53,0.9)', marginTop: 10, fontWeight: 700 },
  alphaRight: { width: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 },
  alphaCharBig: { fontSize: 48, color: '#fff', fontWeight: 900, lineHeight: 1 },
  alphaCharRow: { display: 'flex', gap: 4 },
  alphaCharSm: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 700 },
  alphaDone: { position: 'absolute', top: 12, right: 12, fontSize: 18, color: '#a3e635' },

  section: { marginBottom: 20, position: 'relative', zIndex: 1 },
  secHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, paddingBottom: 8, borderBottom: '1.5px solid rgba(255,255,255,0.8)' },
  secTitle: { fontSize: 13, fontWeight: 700, color: '#2563eb' },
  secCount: { fontSize: 11, color: '#94a3b8', fontWeight: 600 },

  list: { display: 'flex', flexDirection: 'column', gap: 7 },
  card: {
    display: 'flex', alignItems: 'center', gap: 10, borderRadius: 14,
    padding: '11px 13px', cursor: 'pointer', textAlign: 'left', width: '100%',
    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
    border: '1.5px solid', transition: 'opacity .2s',
  },
  cardNum: { width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 },
  cardInfo: { flex: 1 },
  cardKr: { fontSize: 13, fontWeight: 700, color: '#1e293b' },
  cardUz: { fontSize: 11, color: '#64748b', marginTop: 2 },
  cardIcon: { fontSize: 18 },
  scoreBadge: { fontSize: 10, color: '#15803d', fontWeight: 700, background: 'rgba(220,252,231,0.8)', borderRadius: 7, padding: '2px 6px' },

  premBanner: {
    ...glass, borderRadius: 16, padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 10,
    position: 'relative', overflow: 'hidden', zIndex: 1,
    background: 'linear-gradient(135deg,rgba(255,255,255,0.7),rgba(254,249,195,0.5))',
    border: '1.5px solid rgba(253,224,71,0.4)',
  },
  premBannerBubble: { position: 'absolute', width: 60, height: 60, borderRadius: '50%', background: 'radial-gradient(circle,rgba(253,224,71,0.3),transparent)', right: -10, top: -10, pointerEvents: 'none' },
  premBannerTitle: { fontSize: 13, fontWeight: 800, color: '#1e293b' },
  premBannerSub: { fontSize: 10, color: '#94a3b8', marginTop: 2 },
  premBannerBtn: { marginLeft: 'auto', padding: '8px 14px', background: 'linear-gradient(90deg,#3b82f6,#0ea5e9)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 12, fontWeight: 800, cursor: 'pointer', flexShrink: 0 },
};
