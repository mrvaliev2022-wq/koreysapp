import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { api } from '../api';

export default function Home() {
  const { user, stats, track, setTrack } = useStore();
  const [topThree, setTopThree] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    api.getLeaderboard('daily').then((d) => setTopThree(d.slice(0, 3))).catch(() => {});
  }, []);

  if (!user) return null;

  const xpPct = Math.min((stats?.xp_today ?? 0) / 2, 100);

  return (
    <div style={s.page}>

      {/* Background bubbles */}
      <div style={{ ...s.bubble, width: 180, height: 180, top: -60, right: -50, background: 'radial-gradient(circle, rgba(147,197,253,0.3), transparent)' }} />
      <div style={{ ...s.bubble, width: 120, height: 120, top: 200, left: -40, background: 'radial-gradient(circle, rgba(134,239,172,0.25), transparent)' }} />
      <div style={{ ...s.bubble, width: 90, height: 90, top: 350, right: -20, background: 'radial-gradient(circle, rgba(196,181,253,0.2), transparent)' }} />

      {/* Header */}
      <div style={s.header}>
        <div>
          <div style={s.greeting}>Salom, {user.name?.split(' ')[0]}! 👋</div>
          <div style={s.greetingSub}>Bugun ham o'rganamizmi?</div>
        </div>
        <div style={s.streakBox}>
          <span style={s.streakFire}>🔥</span>
          <span style={s.streakNum}>{stats?.streak ?? 0}</span>
        </div>
      </div>

      {/* Hero card */}
      <div style={s.heroCard}>
        <div style={s.heroBubble1} />
        <div style={s.heroBubble2} />
        <div style={s.heroEmoji}>🍋</div>
        <div style={s.heroLabel}>KOREYS TILI</div>
        <div style={s.heroTitle}>
          {user.is_premium ? 'Premium faol — barcha darslar ochiq!' : '127+ dars sizni kutmoqda'}
        </div>

        {/* XP progress */}
        <div style={s.xpRow}>
          <span style={s.xpLabel}>Bugungi XP</span>
          <span style={s.xpVal}>⚡ {stats?.xp_today ?? 0}</span>
        </div>
        <div style={s.barBg}>
          <div style={{ ...s.barFill, width: xpPct + '%' }} />
        </div>

        <button style={s.startBtn} onClick={() => nav('/learn')}>
          Darsni boshlash →
        </button>
      </div>

      {/* Stats row */}
      <div style={s.statsRow}>
        <div style={{ ...s.statCard, borderColor: 'rgba(147,197,253,0.5)' }}>
          <div style={{ ...s.statNum, color: '#2563eb' }}>{stats?.lessons_done ?? 0}</div>
          <div style={s.statLbl}>Darslar</div>
        </div>
        <div style={{ ...s.statCard, borderColor: 'rgba(134,239,172,0.5)' }}>
          <div style={{ ...s.statNum, color: '#16a34a' }}>{stats?.xp ?? 0}</div>
          <div style={s.statLbl}>Jami XP</div>
        </div>
        <div style={{ ...s.statCard, borderColor: 'rgba(196,181,253,0.5)' }}>
          <div style={{ ...s.statNum, color: '#7c3aed' }}>{stats?.streak ?? 0}</div>
          <div style={s.statLbl}>Streak</div>
        </div>
      </div>

      {/* Track toggle */}
      <div style={s.sectionTitle}>TRACK TANLANG</div>
      <div style={s.trackRow}>
        {['TOPIK', 'EPS-TOPIK'].map((t) => (
          <button key={t}
            style={{ ...s.trackBtn, ...(track === t ? s.trackActive : {}) }}
            onClick={() => { setTrack(t); nav('/learn'); }}>
            <span style={s.trackIcon}>{t === 'TOPIK' ? '📚' : '💼'}</span>
            <span>{t}</span>
          </button>
        ))}
      </div>

      {/* Premium banner */}
      {!user.is_premium && (
        <div style={s.premBanner}>
          <div style={s.premBubble} />
          <div style={s.premLeft}>
            <div style={s.premTitle}>Premium oling!</div>
            <div style={s.premSub}>127+ dars, audio, grammatika</div>
          </div>
          <button style={s.premBtn} onClick={() => nav('/premium')}>
            Olish →
          </button>
        </div>
      )}

      {/* Leaderboard */}
      {topThree.length > 0 && (
        <div style={s.leaderCard}>
          <div style={s.leaderHeader}>
            <span style={s.leaderTitle}>🏆 Kunlik top 3</span>
            <button style={s.leaderMore} onClick={() => nav('/leaderboard')}>Barchasi →</button>
          </div>
          {topThree.map((u, i) => (
            <div key={i} style={s.leaderRow}>
              <span style={s.leaderRank}>{['🥇', '🥈', '🥉'][i]}</span>
              <span style={s.leaderName}>{u.name}</span>
              <span style={s.leaderXp}>⚡ {u.xp}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const glass = {
  background: 'rgba(255,255,255,0.65)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1.5px solid rgba(255,255,255,0.9)',
};

const s = {
  page: {
    padding: '16px 16px 100px',
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #f0f4ff 0%, #e8f4ff 50%, #f0f0ff 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  bubble: {
    position: 'absolute',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 0,
  },

  // Header
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    marginBottom: 16, position: 'relative', zIndex: 1,
  },
  greeting:    { fontSize: 20, fontWeight: 800, color: '#1e293b' },
  greetingSub: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  streakBox: {
    display: 'flex', alignItems: 'center', gap: 4,
    ...glass,
    borderRadius: 14, padding: '8px 14px',
  },
  streakFire: { fontSize: 18 },
  streakNum:  { fontSize: 18, fontWeight: 800, color: '#ea580c' },

  // Hero card
  heroCard: {
    ...glass,
    borderRadius: 22, padding: '16px 16px 18px',
    marginBottom: 14, position: 'relative', overflow: 'hidden', zIndex: 1,
  },
  heroBubble1: {
    position: 'absolute', width: 80, height: 80, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent)',
    top: -20, right: -10, pointerEvents: 'none',
  },
  heroBubble2: {
    position: 'absolute', width: 50, height: 50, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(74,222,128,0.15), transparent)',
    bottom: -10, right: 30, pointerEvents: 'none',
  },
  heroEmoji: { fontSize: 22, marginBottom: 6 },
  heroLabel: {
    fontSize: 9, fontWeight: 700, color: '#94a3b8',
    letterSpacing: '.4px', marginBottom: 4,
  },
  heroTitle: { fontSize: 14, fontWeight: 800, color: '#1e293b', marginBottom: 14 },

  xpRow:   { display: 'flex', justifyContent: 'space-between', marginBottom: 6 },
  xpLabel: { fontSize: 11, color: '#94a3b8' },
  xpVal:   { fontSize: 12, fontWeight: 700, color: '#2563eb' },
  barBg:   { height: 6, background: 'rgba(219,234,254,0.8)', borderRadius: 3, overflow: 'hidden', marginBottom: 14 },
  barFill: { height: '100%', background: 'linear-gradient(90deg, #3b82f6, #0ea5e9)', borderRadius: 3, transition: 'width .5s' },

  startBtn: {
    width: '100%', padding: '12px 0',
    background: 'linear-gradient(90deg, #3b82f6, #0ea5e9)',
    color: '#fff', border: 'none', borderRadius: 14,
    fontSize: 14, fontWeight: 800, cursor: 'pointer',
  },

  // Stats
  statsRow: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 8, marginBottom: 16, position: 'relative', zIndex: 1,
  },
  statCard: {
    ...glass, borderRadius: 14, padding: '10px 8px', textAlign: 'center',
  },
  statNum: { fontSize: 20, fontWeight: 800 },
  statLbl: { fontSize: 9, color: '#94a3b8', marginTop: 2 },

  // Track
  sectionTitle: {
    fontSize: 9, fontWeight: 700, color: '#94a3b8',
    letterSpacing: '.4px', marginBottom: 8, position: 'relative', zIndex: 1,
  },
  trackRow: {
    display: 'flex', gap: 8, marginBottom: 14,
    position: 'relative', zIndex: 1,
  },
  trackBtn: {
    flex: 1, padding: '12px 0', borderRadius: 14,
    background: 'rgba(255,255,255,0.65)',
    border: '1.5px solid rgba(255,255,255,0.9)',
    fontSize: 13, fontWeight: 700, cursor: 'pointer',
    color: '#64748b', display: 'flex', alignItems: 'center',
    justifyContent: 'center', gap: 6,
  },
  trackActive: {
    background: 'linear-gradient(135deg, #3b82f6, #0ea5e9)',
    border: '1.5px solid rgba(59,130,246,0.3)',
    color: '#fff',
  },
  trackIcon: { fontSize: 16 },

  // Premium banner
  premBanner: {
    ...glass, borderRadius: 16, padding: '12px 14px',
    marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10,
    position: 'relative', overflow: 'hidden', zIndex: 1,
    border: '1.5px solid rgba(253,224,71,0.4)',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(254,249,195,0.5))',
  },
  premBubble: {
    position: 'absolute', width: 60, height: 60, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(253,224,71,0.3), transparent)',
    right: -10, top: -10, pointerEvents: 'none',
  },
  premLeft:  { flex: 1 },
  premTitle: { fontSize: 13, fontWeight: 800, color: '#1e293b' },
  premSub:   { fontSize: 10, color: '#94a3b8', marginTop: 2 },
  premBtn: {
    padding: '8px 14px', background: 'linear-gradient(90deg, #3b82f6, #0ea5e9)',
    color: '#fff', border: 'none', borderRadius: 10,
    fontSize: 12, fontWeight: 800, cursor: 'pointer', flexShrink: 0,
  },

  // Leaderboard
  leaderCard: {
    ...glass, borderRadius: 16, padding: '12px 14px',
    position: 'relative', zIndex: 1,
  },
  leaderHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10,
  },
  leaderTitle: { fontSize: 13, fontWeight: 700, color: '#1e293b' },
  leaderMore:  { background: 'none', border: 'none', color: '#3b82f6', fontSize: 11, fontWeight: 600, cursor: 'pointer' },
  leaderRow: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.8)',
  },
  leaderRank: { fontSize: 18 },
  leaderName: { flex: 1, fontSize: 13, color: '#334155', fontWeight: 500 },
  leaderXp:   { fontSize: 12, fontWeight: 700, color: '#2563eb' },
};
