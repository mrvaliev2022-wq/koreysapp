import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { api } from '../api';

export default function Home() {
  const { user, stats, track, lessons, setLessons } = useStore();
  const nav = useNavigate();
  const [nextLesson, setNextLesson] = useState(null);

  useEffect(() => {
    if (track) api.getLessons(track).then(setLessons).catch(console.error);
  }, [track]);

  useEffect(() => {
    if (lessons?.length) {
      const inProgress = lessons.find(l => l.status === 'in_progress' || l.status === 'unlocked');
      setNextLesson(inProgress || lessons.find(l => l.is_free));
    }
  }, [lessons]);

  const done   = lessons?.filter(l => l.status === 'completed').length || 0;
  const total  = lessons?.length || 0;
  const pct    = total ? Math.round(done / total * 100) : 0;
  const name   = user?.name?.split(' ')[0] || 'Salom';

  return (
    <div style={s.page}>
      <div style={s.orb1} /><div style={s.orb2} /><div style={s.orb3} /><div style={s.orb4} />

      <div style={s.content}>
        {/* Header */}
        <div style={s.header}>
          <div>
            <div style={s.greeting}>Xush kelibsiz 👋</div>
            <div style={s.name}>{name}</div>
            <div style={s.pills}>
              <span style={s.pillPurple}>⚡ {stats?.xp || 0} XP</span>
              <span style={s.pillOrange}>🔥 {stats?.streak || 0} kun</span>
              {user?.is_premium && <span style={s.pillGold}>👑 Premium</span>}
            </div>
          </div>
          <div style={s.avatar}>
            {name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Hero card */}
        {nextLesson && (
          <div style={s.heroCard}>
            <div style={s.heroOrb1} /><div style={s.heroOrb2} />
            <div style={s.heroSub}>Davom etish</div>
            <div style={s.heroTitle}>{nextLesson.title_kr}</div>
            <div style={s.heroDesc}>{nextLesson.title_uz}</div>
            <div style={s.progBg}>
              <div style={{ ...s.progFill, width: pct + '%' }} />
            </div>
            <div style={s.progRow}>
              <span style={s.progPct}>{pct}% bajarildi</span>
              <span style={s.progCount}>{done}/{total} dars</span>
            </div>
            <button style={s.heroBtn} onClick={() => nav('/lesson/' + nextLesson.id)}>
              ▶ Darsni boshlash
            </button>
          </div>
        )}

        {/* Stats */}
        <div style={s.statsGrid}>
          {[
            { ico: '📚', num: done, lbl: 'Darslar' },
            { ico: '⚡', num: stats?.xp || 0, lbl: 'XP' },
            { ico: '🔥', num: stats?.streak || 0, lbl: 'Streak' },
          ].map((item, i) => (
            <div key={i} style={s.statCard}>
              <div style={s.statIco}>{item.ico}</div>
              <div style={s.statNum}>{item.num}</div>
              <div style={s.statLbl}>{item.lbl}</div>
            </div>
          ))}
        </div>

        {/* Lesson list */}
        <div style={s.secTitle}>📖 Darslar</div>
        {lessons?.map((l, i) => {
          const isDone   = l.status === 'completed';
          const isActive = l.status === 'unlocked' || l.status === 'in_progress';
          const canAccess = l.is_free || user?.is_premium || isDone || isActive;
          return (
            <button key={l.id}
              style={{ ...s.lessonRow, ...(isActive ? s.lessonActive : {}), opacity: canAccess ? 1 : 0.6 }}
              onClick={() => canAccess ? nav('/lesson/' + l.id) : nav('/premium')}>
              <div style={{ ...s.lessonIco, ...(isActive ? s.lessonIcoActive : isDone ? s.lessonIcoDone : {}) }}>
                {isDone ? '✅' : !canAccess ? '🔒' : isActive ? '📖' : '📘'}
              </div>
              <div style={s.lessonInfo}>
                <div style={s.lessonKr}>{l.title_kr}</div>
                <div style={s.lessonUz}>{l.title_uz} · {i + 1}-dars</div>
              </div>
              {l.is_free && !isDone && <span style={s.badgeFree}>Bepul</span>}
              {isDone && <span style={s.badgeDone}>{l.score || 0}%</span>}
              {isActive && !isDone && <span style={s.badgeGo}>▶</span>}
            </button>
          );
        })}

        {!user?.is_premium && (
          <button style={s.premBanner} onClick={() => nav('/premium')}>
            <div style={s.premBannerOrb} />
            <div>
              <div style={s.premBannerTitle}>👑 Premium oling</div>
              <div style={s.premBannerSub}>127+ dars · 4 oy · 29 000 so'm</div>
            </div>
            <div style={s.premBannerArr}>&rarr;</div>
          </button>
        )}
      </div>

      {/* Bottom nav */}
      <nav style={s.nav}>
        <button style={s.navItem} onClick={() => nav('/home')}>
          <span style={{ ...s.navIco, opacity: 1 }}>🏠</span>
          <span style={{ ...s.navLbl, color: '#7c3aed', fontWeight: 700 }}>Bosh</span>
        </button>
        <button style={s.navItem} onClick={() => nav('/learn')}>
          <span style={s.navIco}>📚</span><span style={s.navLbl}>Darslar</span>
        </button>
        <button style={s.navFab} onClick={() => nextLesson && nav('/lesson/' + nextLesson.id)}>▶</button>
        <button style={s.navItem} onClick={() => nav('/leaderboard')}>
          <span style={s.navIco}>🏆</span><span style={s.navLbl}>Reyting</span>
        </button>
        <button style={s.navItem} onClick={() => nav('/profile')}>
          <span style={s.navIco}>👤</span><span style={s.navLbl}>Profil</span>
        </button>
      </nav>
    </div>
  );
}

const glass = { background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(124,58,237,0.14)', boxShadow: '0 2px 16px rgba(124,58,237,0.07)' };

const s = {
  page: { fontFamily: "'Nunito',sans-serif", minHeight: '100vh', background: 'linear-gradient(160deg,#f8f7ff 0%,#eef2ff 35%,#f0f9ff 65%,#f5f3ff 100%)', position: 'relative', overflow: 'hidden', paddingBottom: 80 },
  orb1: { position: 'fixed', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.18),transparent)', top: -80, right: -60, pointerEvents: 'none', zIndex: 0 },
  orb2: { position: 'fixed', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.14),transparent)', top: 240, left: -60, pointerEvents: 'none', zIndex: 0 },
  orb3: { position: 'fixed', width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,139,250,0.2),transparent)', bottom: 180, right: -40, pointerEvents: 'none', zIndex: 0 },
  orb4: { position: 'fixed', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle,rgba(96,165,250,0.12),transparent)', bottom: 100, left: 20, pointerEvents: 'none', zIndex: 0 },
  content: { position: 'relative', zIndex: 1, padding: '16px 16px 0' },

  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  greeting: { fontSize: 12, color: '#6b7280', fontWeight: 500 },
  name: { fontSize: 22, fontWeight: 900, color: '#1e1b4b', marginTop: 2 },
  pills: { display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' },
  pillPurple: { fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: 'rgba(124,58,237,0.1)', color: '#7c3aed', border: '1px solid rgba(124,58,237,0.2)' },
  pillOrange: { fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: 'rgba(249,115,22,0.1)', color: '#ea580c', border: '1px solid rgba(249,115,22,0.2)' },
  pillGold:   { fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: 'rgba(251,191,36,0.15)', color: '#b45309', border: '1px solid rgba(251,191,36,0.3)' },
  avatar: { width: 46, height: 46, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', color: '#fff', fontSize: 18, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(124,58,237,0.3)' },

  heroCard: { background: 'linear-gradient(135deg,rgba(109,40,217,0.85),rgba(37,99,235,0.8))', borderRadius: 22, padding: 18, marginBottom: 14, position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(124,58,237,0.22)' },
  heroOrb1: { position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.1),transparent)', top: -30, right: -20, pointerEvents: 'none' },
  heroOrb2: { position: 'absolute', width: 70, height: 70, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,243,208,0.15),transparent)', bottom: -10, left: 20, pointerEvents: 'none' },
  heroSub:  { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4, position: 'relative' },
  heroTitle:{ fontSize: 20, fontWeight: 900, color: '#fff', position: 'relative', fontFamily: "'Noto Sans KR',sans-serif" },
  heroDesc: { fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2, marginBottom: 10, position: 'relative' },
  progBg:   { height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, position: 'relative' },
  progFill: { height: '100%', background: 'linear-gradient(90deg,#a78bfa,#60a5fa)', borderRadius: 2 },
  progRow:  { display: 'flex', justifyContent: 'space-between', marginTop: 5, marginBottom: 12, position: 'relative' },
  progPct:  { fontSize: 10, color: 'rgba(255,255,255,0.65)' },
  progCount:{ fontSize: 10, color: 'rgba(255,255,255,0.65)' },
  heroBtn:  { background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 12, padding: '9px 18px', color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer', position: 'relative' },

  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 16 },
  statCard:  { ...glass, borderRadius: 14, padding: '12px 8px', textAlign: 'center' },
  statIco:   { fontSize: 18, marginBottom: 4 },
  statNum:   { fontSize: 18, fontWeight: 800, color: '#4c1d95' },
  statLbl:   { fontSize: 9, color: '#6b7280', marginTop: 2 },

  secTitle: { fontSize: 13, fontWeight: 700, color: '#4c1d95', marginBottom: 10 },

  lessonRow: { ...glass, display: 'flex', alignItems: 'center', gap: 10, padding: '11px 13px', borderRadius: 14, marginBottom: 7, cursor: 'pointer', width: '100%', textAlign: 'left' },
  lessonActive: { background: 'rgba(237,233,254,0.8)', border: '1.5px solid rgba(124,58,237,0.25)' },
  lessonIco: { width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 },
  lessonIcoActive: { background: 'rgba(124,58,237,0.12)' },
  lessonIcoDone:   { background: 'rgba(167,243,208,0.4)' },
  lessonInfo: { flex: 1 },
  lessonKr:   { fontSize: 14, fontWeight: 700, color: '#1e1b4b', fontFamily: "'Noto Sans KR',sans-serif" },
  lessonUz:   { fontSize: 10, color: '#6b7280', marginTop: 2 },
  badgeDone:  { fontSize: 10, fontWeight: 700, background: 'rgba(167,243,208,0.6)', color: '#065f46', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 8, padding: '2px 8px' },
  badgeGo:    { fontSize: 14, color: '#7c3aed' },
  badgeFree:  { fontSize: 9, fontWeight: 700, background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 8, padding: '2px 7px' },

  premBanner: { width: '100%', background: 'linear-gradient(135deg,rgba(109,40,217,0.08),rgba(37,99,235,0.06))', border: '1.5px solid rgba(124,58,237,0.2)', borderRadius: 16, padding: '13px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginTop: 8, position: 'relative', overflow: 'hidden' },
  premBannerOrb: { position: 'absolute', width: 70, height: 70, borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.12),transparent)', right: -15, top: -15, pointerEvents: 'none' },
  premBannerTitle: { fontSize: 13, fontWeight: 800, color: '#4c1d95' },
  premBannerSub:   { fontSize: 10, color: '#6b7280', marginTop: 2 },
  premBannerArr:   { marginLeft: 'auto', fontSize: 18, color: '#7c3aed', fontWeight: 800 },

  nav:     { position: 'fixed', bottom: 0, left: 0, right: 0, height: 68, background: 'rgba(248,247,255,0.94)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderTop: '1px solid rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-around', zIndex: 100, padding: '0 8px 8px' },
  navItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: 1, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' },
  navIco:  { fontSize: 22, opacity: 0.45 },
  navLbl:  { fontSize: 9, color: '#6b7280', fontWeight: 500 },
  navFab:  { width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 20, marginTop: -20, boxShadow: '0 4px 20px rgba(124,58,237,0.45)', flexShrink: 0 },
};
