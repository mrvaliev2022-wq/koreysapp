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

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <div style={s.greeting}>Salom, {user.name?.split(' ')[0]}! 👋</div>
          {user.is_premium && <span style={s.premBadge}>⭐ Premium</span>}
        </div>
        <div style={s.streakBox}>
          <span>🔥</span>
          <span style={s.streakNum}>{stats?.streak ?? 0}</span>
        </div>
      </div>

      <div style={s.xpCard}>
        <div style={s.xpRow}>
          <span style={s.xpLabel}>Bugungi XP</span>
          <span style={s.xpVal}>⚡ {stats?.xp_today ?? 0}</span>
        </div>
        <div style={s.barBg}>
          <div style={{ ...s.barFill, width: `${Math.min((stats?.xp_today ?? 0) / 2, 100)}%` }} />
        </div>
      </div>

      <div style={s.trackRow}>
        {['TOPIK', 'EPS-TOPIK'].map((t) => (
          <button key={t}
            style={{ ...s.trackBtn, ...(track === t ? s.trackActive : {}) }}
            onClick={() => { setTrack(t); nav('/learn'); }}>
            {t === 'TOPIK' ? '📚 TOPIK' : '💼 EPS-TOPIK'}
          </button>
        ))}
      </div>

      <button style={s.startBtn} onClick={() => nav('/learn')}>
        Darsni boshlash →
      </button>

      {topThree.length > 0 && (
        <div style={s.leaderCard}>
          <div style={s.leaderTitle}>🏆 Kunlik top 3</div>
          {topThree.map((u, i) => (
            <div key={i} style={s.leaderRow}>
              <span style={s.leaderRank}>{['🥇','🥈','🥉'][i]}</span>
              <span style={s.leaderName}>{u.name}</span>
              <span style={s.leaderXp}>⚡ {u.xp}</span>
            </div>
          ))}
          <button style={s.leaderMore} onClick={() => nav('/leaderboard')}>
            To'liq reyting →
          </button>
        </div>
      )}
    </div>
  );
}

const s = {
  page:       { padding: '16px 16px 90px', minHeight: '100vh', background: '#fff' },
  header:     { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  greeting:   { fontSize: 20, fontWeight: 600, color: '#1a1a1a' },
  premBadge:  { fontSize: 11, background: '#FFF3CD', color: '#856404', padding: '2px 8px', borderRadius: 12 },
  streakBox:  { display: 'flex', alignItems: 'center', gap: 4, background: '#FFF3E0', borderRadius: 12, padding: '6px 12px' },
  streakNum:  { fontSize: 18, fontWeight: 700, color: '#E65100' },
  xpCard:     { background: '#F0F7FF', borderRadius: 12, padding: 16, marginBottom: 16 },
  xpRow:      { display: 'flex', justifyContent: 'space-between', marginBottom: 8 },
  xpLabel:    { fontSize: 13, color: '#666' },
  xpVal:      { fontSize: 15, fontWeight: 700, color: '#1565C0' },
  barBg:      { height: 8, background: '#C9DEF4', borderRadius: 4, overflow: 'hidden' },
  barFill:    { height: '100%', background: '#1976D2', borderRadius: 4, transition: 'width .5s' },
  trackRow:   { display: 'flex', gap: 8, marginBottom: 16 },
  trackBtn:   { flex: 1, padding: '12px 0', border: '1.5px solid #E0E0E0', borderRadius: 12,
                background: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer', color: '#333' },
  trackActive:{ background: '#1976D2', color: '#fff', borderColor: '#1976D2' },
  startBtn:   { width: '100%', padding: 16, background: '#2ECC71', color: '#fff', border: 'none',
                borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 20 },
  leaderCard: { background: '#FAFAFA', border: '1px solid #EEE', borderRadius: 12, padding: 16 },
  leaderTitle:{ fontSize: 14, fontWeight: 600, marginBottom: 12 },
  leaderRow:  { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 },
  leaderRank: { fontSize: 20 },
  leaderName: { flex: 1, fontSize: 14, color: '#333' },
  leaderXp:   { fontSize: 13, fontWeight: 600, color: '#1565C0' },
  leaderMore: { marginTop: 8, width: '100%', padding: '8px 0', background: 'none', border: 'none',
                color: '#1976D2', fontSize: 13, cursor: 'pointer', fontWeight: 500 },
};
