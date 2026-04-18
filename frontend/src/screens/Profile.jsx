import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';

const BADGES = [
  { type: 'first_lesson',  icon: '🎯', label: 'Birinchi dars',  color: 'rgba(219,234,254,0.8)', text: '#2563eb' },
  { type: 'streak_7',      icon: '🔥', label: '7 kun streak',   color: 'rgba(254,226,226,0.8)', text: '#dc2626' },
  { type: 'streak_30',     icon: '💥', label: '30 kun streak',  color: 'rgba(254,226,226,0.8)', text: '#dc2626' },
  { type: 'perfect_score', icon: '💯', label: "To'liq ball",    color: 'rgba(220,252,231,0.8)', text: '#15803d' },
  { type: 'top_10',        icon: '🏆', label: 'Top 10',         color: 'rgba(254,249,195,0.8)', text: '#b45309' },
  { type: '10_lessons',    icon: '📚', label: '10 dars',        color: 'rgba(237,233,254,0.8)', text: '#7c3aed' },
  { type: '50_lessons',    icon: '🎓', label: '50 dars',        color: 'rgba(237,233,254,0.8)', text: '#7c3aed' },
];

export default function Profile() {
  const { user, stats } = useStore();
  const nav = useNavigate();
  if (!user) return null;

  const initials = user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <div style={s.page}>
      <div style={s.bubble1} /><div style={s.bubble2} /><div style={s.bubble3} />

      {/* Profile header */}
      <div style={s.profileHdr}>
        <div style={s.hdrBubble} />
        <div style={s.avatar}>{initials}</div>
        <div style={s.name}>{user.name}</div>
        {user.username && <div style={s.username}>@{user.username}</div>}
        {user.is_premium
          ? <div style={s.premPill}>👑 Premium aktiv</div>
          : <div style={s.freePill}>Free</div>}
      </div>

      {/* Stats */}
      <div style={s.statsGrid}>
        <div style={{ ...s.statCard, borderColor: 'rgba(147,197,253,0.5)', background: 'rgba(219,234,254,0.6)' }}>
          <div style={{ ...s.statNum, color: '#2563eb' }}>⚡ {stats?.xp ?? 0}</div>
          <div style={s.statLbl}>Jami XP</div>
        </div>
        <div style={{ ...s.statCard, borderColor: 'rgba(252,165,165,0.5)', background: 'rgba(254,226,226,0.6)' }}>
          <div style={{ ...s.statNum, color: '#dc2626' }}>🔥 {stats?.streak ?? 0}</div>
          <div style={s.statLbl}>Streak</div>
        </div>
        <div style={{ ...s.statCard, borderColor: 'rgba(134,239,172,0.5)', background: 'rgba(220,252,231,0.6)' }}>
          <div style={{ ...s.statNum, color: '#15803d' }}>📚 {stats?.lessons_done ?? 0}</div>
          <div style={s.statLbl}>Darslar</div>
        </div>
        <div style={{ ...s.statCard, borderColor: 'rgba(196,181,253,0.5)', background: 'rgba(237,233,254,0.6)' }}>
          <div style={{ ...s.statNum, color: '#7c3aed' }}>❄️ {stats?.freeze_days ?? 0}</div>
          <div style={s.statLbl}>Freeze</div>
        </div>
      </div>

      {/* Menu rows */}
      <div style={s.sectionTitle}>Profil</div>
      {[
        { ico: '📚', bg: 'rgba(219,234,254,0.8)', title: "O'rganish tarixi", sub: (stats?.lessons_done ?? 0) + ' dars yakunlandi', border: 'rgba(147,197,253,0.4)', action: () => nav('/learn') },
        { ico: '💎', bg: 'rgba(220,252,231,0.8)', title: 'Premium', sub: user.is_premium ? '7 oy qoldi' : "Premium oling", border: 'rgba(134,239,172,0.4)', action: () => nav('/premium') },
        { ico: '👥', bg: 'rgba(237,233,254,0.8)', title: 'Referral', sub: "Do'stlarni taklif qiling", border: 'rgba(196,181,253,0.4)', action: () => nav('/premium') },
        { ico: '🏆', bg: 'rgba(254,249,195,0.8)', title: 'Reyting', sub: 'Top foydalanuvchilar', border: 'rgba(253,224,71,0.4)', action: () => nav('/leaderboard') },
      ].map((row, i) => (
        <button key={i} style={{ ...s.menuRow, borderColor: row.border }} onClick={row.action}>
          <div style={{ ...s.menuIco, background: row.bg }}>{row.ico}</div>
          <div style={s.menuInfo}>
            <div style={s.menuTitle}>{row.title}</div>
            <div style={s.menuSub}>{row.sub}</div>
          </div>
          <div style={s.menuArr}>›</div>
        </button>
      ))}

      {/* Badges */}
      <div style={s.sectionTitle}>Yutuqlar 🏅</div>
      <div style={s.badgesGrid}>
        {BADGES.map(b => (
          <div key={b.type} style={{ ...s.badge, background: b.color, borderColor: b.color }}>
            <span style={s.badgeIcon}>{b.icon}</span>
            <span style={{ ...s.badgeLbl, color: b.text }}>{b.label}</span>
          </div>
        ))}
      </div>

      {/* Premium CTA */}
      {!user.is_premium && (
        <button style={s.premCta} onClick={() => nav('/premium')}>
          💎 Premium olish →
        </button>
      )}
    </div>
  );
}

const glass = { background: 'rgba(255,255,255,0.62)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1.5px solid rgba(255,255,255,0.9)' };

const s = {
  page: { padding: '16px 16px 100px', minHeight: '100vh', background: 'linear-gradient(160deg,#f0f4ff,#e8f4ff 50%,#f0f0ff)', position: 'relative', overflow: 'hidden' },
  bubble1: { position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle,rgba(147,197,253,0.25),transparent)', top: -50, right: -50, pointerEvents: 'none' },
  bubble2: { position: 'absolute', width: 130, height: 130, borderRadius: '50%', background: 'radial-gradient(circle,rgba(134,239,172,0.2),transparent)', top: 350, left: -40, pointerEvents: 'none' },
  bubble3: { position: 'absolute', width: 90, height: 90, borderRadius: '50%', background: 'radial-gradient(circle,rgba(196,181,253,0.2),transparent)', bottom: 150, right: -20, pointerEvents: 'none' },

  profileHdr: { background: 'linear-gradient(135deg,rgba(59,130,246,0.82),rgba(139,92,246,0.78))', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: 22, padding: '20px 16px', marginBottom: 14, textAlign: 'center', position: 'relative', overflow: 'hidden', zIndex: 1 },
  hdrBubble: { position: 'absolute', width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.1),transparent)', top: -20, left: -15, pointerEvents: 'none' },
  avatar: { width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 22, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', border: '2px solid rgba(255,255,255,0.4)' },
  name: { fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 3 },
  username: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 6 },
  premPill: { display: 'inline-block', fontSize: 11, fontWeight: 700, background: 'rgba(253,224,71,0.9)', color: '#111', padding: '4px 14px', borderRadius: 20 },
  freePill: { display: 'inline-block', fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', padding: '4px 14px', borderRadius: 20 },

  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16, position: 'relative', zIndex: 1 },
  statCard: { backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1.5px solid', borderRadius: 14, padding: '12px 10px', textAlign: 'center' },
  statNum: { fontSize: 18, fontWeight: 800 },
  statLbl: { fontSize: 10, color: '#94a3b8', marginTop: 3 },

  sectionTitle: { fontSize: 11, fontWeight: 700, color: '#64748b', letterSpacing: '.4px', marginBottom: 9, marginTop: 4, position: 'relative', zIndex: 1 },

  menuRow: { ...glass, width: '100%', borderRadius: 14, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7, cursor: 'pointer', textAlign: 'left', border: '1.5px solid', position: 'relative', zIndex: 1 },
  menuIco: { width: 34, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 },
  menuInfo: { flex: 1 },
  menuTitle: { fontSize: 13, fontWeight: 700, color: '#1e293b' },
  menuSub: { fontSize: 10, color: '#94a3b8', marginTop: 2 },
  menuArr: { fontSize: 16, color: '#cbd5e1' },

  badgesGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 16, position: 'relative', zIndex: 1 },
  badge: { borderRadius: 12, padding: '10px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, border: '1.5px solid', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' },
  badgeIcon: { fontSize: 24 },
  badgeLbl: { fontSize: 9, textAlign: 'center', fontWeight: 600 },

  premCta: { width: '100%', padding: '14px 0', background: 'linear-gradient(90deg,#3b82f6,#0ea5e9)', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', position: 'relative', zIndex: 1 },
};
