import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';

const BADGES = [
  { type: 'first_lesson',  icon: '🎯', label: 'Birinchi dars',  col: '#7c3aed', bg: 'rgba(237,233,254,0.8)' },
  { type: 'streak_7',      icon: '🔥', label: '7 kun streak',   col: '#ea580c', bg: 'rgba(255,237,213,0.8)' },
  { type: 'streak_30',     icon: '💥', label: '30 kun streak',  col: '#dc2626', bg: 'rgba(254,226,226,0.8)' },
  { type: 'perfect_score', icon: '💯', label: "To'liq ball",    col: '#059669', bg: 'rgba(209,250,229,0.8)' },
  { type: 'top_10',        icon: '🏆', label: 'Top 10',         col: '#b45309', bg: 'rgba(254,243,199,0.8)' },
  { type: '10_lessons',    icon: '📚', label: '10 dars',        col: '#3b82f6', bg: 'rgba(219,234,254,0.8)' },
  { type: '50_lessons',    icon: '🎓', label: '50 dars',        col: '#6d28d9', bg: 'rgba(237,233,254,0.8)' },
];

export default function Profile() {
  const { user, stats } = useStore();
  const nav = useNavigate();
  if (!user) return null;

  const initials = user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  const premUntil = user.premium_until
    ? new Date(user.premium_until).toLocaleDateString('uz-UZ')
    : null;

  return (
    <div style={s.page}>
      <div style={s.orb1} /><div style={s.orb2} /><div style={s.orb3} />

      <div style={s.content}>
        {/* Profile header */}
        <div style={s.profileHdr}>
          <div style={s.hdrOrb1} /><div style={s.hdrOrb2} />
          <div style={s.avatar}>{initials}</div>
          <div style={s.name}>{user.name}</div>
          {user.username && <div style={s.username}>@{user.username}</div>}
          {user.is_premium
            ? <div style={s.premPill}>👑 Premium · {premUntil || '4 oy'} gacha</div>
            : <div style={s.freePill}>Free foydalanuvchi</div>}
        </div>

        {/* Stats */}
        <div style={s.statsGrid}>
          <div style={{ ...s.statCard, background: 'rgba(237,233,254,0.7)', borderColor: 'rgba(124,58,237,0.2)' }}>
            <div style={s.statIco}>⚡</div>
            <div style={{ ...s.statNum, color: '#7c3aed' }}>{stats?.xp ?? 0}</div>
            <div style={s.statLbl}>Jami XP</div>
          </div>
          <div style={{ ...s.statCard, background: 'rgba(255,237,213,0.7)', borderColor: 'rgba(249,115,22,0.2)' }}>
            <div style={s.statIco}>🔥</div>
            <div style={{ ...s.statNum, color: '#ea580c' }}>{stats?.streak ?? 0}</div>
            <div style={s.statLbl}>Streak</div>
          </div>
          <div style={{ ...s.statCard, background: 'rgba(219,234,254,0.7)', borderColor: 'rgba(59,130,246,0.2)' }}>
            <div style={s.statIco}>📚</div>
            <div style={{ ...s.statNum, color: '#2563eb' }}>{stats?.lessons_done ?? 0}</div>
            <div style={s.statLbl}>Darslar</div>
          </div>
          <div style={{ ...s.statCard, background: 'rgba(209,250,229,0.7)', borderColor: 'rgba(16,185,129,0.2)' }}>
            <div style={s.statIco}>❄️</div>
            <div style={{ ...s.statNum, color: '#059669' }}>{stats?.freeze_days ?? 0}</div>
            <div style={s.statLbl}>Freeze</div>
          </div>
        </div>

        {/* Menu */}
        <div style={s.secTitle}>Profil</div>
        {[
          { ico: '📚', bg: 'rgba(219,234,254,0.8)', col: '#2563eb', border: 'rgba(59,130,246,0.2)', title: "O'rganish tarixi", sub: (stats?.lessons_done ?? 0) + ' dars yakunlandi', action: () => nav('/learn') },
          { ico: '👑', bg: 'rgba(237,233,254,0.8)', col: '#7c3aed', border: 'rgba(124,58,237,0.2)', title: 'Premium', sub: user.is_premium ? (premUntil || '4 oy') + ' gacha' : "Premium oling — 29 000 so'm", action: () => nav('/premium') },
          { ico: '👥', bg: 'rgba(209,250,229,0.8)', col: '#059669', border: 'rgba(16,185,129,0.2)', title: 'Referral', sub: "Do'stlarni taklif qiling", action: () => nav('/premium') },
          { ico: '🏆', bg: 'rgba(254,243,199,0.8)', col: '#b45309', border: 'rgba(251,191,36,0.25)', title: 'Reyting', sub: 'Top foydalanuvchilar', action: () => nav('/leaderboard') },
        ].map((row, i) => (
          <button key={i} style={{ ...s.menuRow, borderColor: row.border }} onClick={row.action}>
            <div style={{ ...s.menuIco, background: row.bg, color: row.col }}>{row.ico}</div>
            <div style={s.menuInfo}>
              <div style={s.menuTitle}>{row.title}</div>
              <div style={s.menuSub}>{row.sub}</div>
            </div>
            <div style={s.menuArr}>&rsaquo;</div>
          </button>
        ))}

        {/* Badges */}
        <div style={s.secTitle}>Yutuqlar 🏅</div>
        <div style={s.badgesGrid}>
          {BADGES.map(b => (
            <div key={b.type} style={{ ...s.badge, background: b.bg, borderColor: b.bg }}>
              <span style={s.badgeIco}>{b.icon}</span>
              <span style={{ ...s.badgeLbl, color: b.col }}>{b.label}</span>
            </div>
          ))}
        </div>

        {!user.is_premium && (
          <button style={s.premCta} onClick={() => nav('/premium')}>
            👑 Premium olish &rarr;
          </button>
        )}
      </div>
    </div>
  );
}

const glass = { background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(124,58,237,0.14)' };

const s = {
  page: { fontFamily: "'Nunito',sans-serif", minHeight: '100vh', background: 'linear-gradient(160deg,#f8f7ff 0%,#eef2ff 35%,#f0f9ff 65%,#f5f3ff 100%)', position: 'relative', overflow: 'hidden', paddingBottom: 80 },
  orb1: { position: 'fixed', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.18),transparent)', top: -80, right: -60, pointerEvents: 'none', zIndex: 0 },
  orb2: { position: 'fixed', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.14),transparent)', top: 300, left: -60, pointerEvents: 'none', zIndex: 0 },
  orb3: { position: 'fixed', width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,139,250,0.2),transparent)', bottom: 180, right: -40, pointerEvents: 'none', zIndex: 0 },
  content: { position: 'relative', zIndex: 1, padding: '16px 16px 0' },

  profileHdr: { background: 'linear-gradient(135deg,rgba(109,40,217,0.82),rgba(37,99,235,0.78))', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 22, padding: '22px 16px', marginBottom: 14, textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(124,58,237,0.2)' },
  hdrOrb1: { position: 'absolute', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.1),transparent)', top: -25, left: -20, pointerEvents: 'none' },
  hdrOrb2: { position: 'absolute', width: 70, height: 70, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,243,208,0.12),transparent)', bottom: -15, right: 20, pointerEvents: 'none' },
  avatar:  { width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', color: '#fff', fontSize: 24, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', border: '2.5px solid rgba(255,255,255,0.35)', position: 'relative' },
  name:    { fontSize: 20, fontWeight: 900, color: '#fff', marginBottom: 4, position: 'relative' },
  username:{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8, position: 'relative' },
  premPill:{ display: 'inline-block', fontSize: 11, fontWeight: 700, background: 'rgba(251,191,36,0.85)', color: '#1c1917', padding: '4px 14px', borderRadius: 20, position: 'relative' },
  freePill:{ display: 'inline-block', fontSize: 11, fontWeight: 600, background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', padding: '4px 14px', borderRadius: 20, position: 'relative' },

  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 },
  statCard:  { backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1.5px solid', borderRadius: 16, padding: '14px 10px', textAlign: 'center' },
  statIco:   { fontSize: 20, marginBottom: 4 },
  statNum:   { fontSize: 22, fontWeight: 900 },
  statLbl:   { fontSize: 10, color: '#6b7280', marginTop: 3 },

  secTitle: { fontSize: 11, fontWeight: 700, color: '#6b7280', letterSpacing: 0.4, marginBottom: 9, marginTop: 4 },
  menuRow:  { ...glass, width: '100%', borderRadius: 15, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 11, marginBottom: 7, cursor: 'pointer', textAlign: 'left', border: '1.5px solid' },
  menuIco:  { width: 36, height: 36, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 },
  menuInfo: { flex: 1 },
  menuTitle:{ fontSize: 13, fontWeight: 700, color: '#1e1b4b' },
  menuSub:  { fontSize: 10, color: '#6b7280', marginTop: 2 },
  menuArr:  { fontSize: 20, color: '#c4b5fd' },

  badgesGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 16 },
  badge:      { borderRadius: 13, padding: '10px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, border: '1.5px solid', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' },
  badgeIco:   { fontSize: 26 },
  badgeLbl:   { fontSize: 9, textAlign: 'center', fontWeight: 700 },

  premCta: { width: '100%', padding: '15px 0', background: 'linear-gradient(90deg,#7c3aed,#3b82f6)', color: '#fff', border: 'none', borderRadius: 16, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 20px rgba(124,58,237,0.35)' },
};
