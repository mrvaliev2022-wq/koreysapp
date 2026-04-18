import { useEffect, useState } from 'react';
import { useStore } from '../store';
import { api } from '../api';

const MEDALS = ['🥇', '🥈', '🥉'];
const TOP_COLORS = [
  { bg: 'rgba(254,249,195,0.7)', border: 'rgba(253,224,71,0.5)', num: '#b45309' },
  { bg: 'rgba(243,244,246,0.7)', border: 'rgba(209,213,219,0.5)', num: '#6b7280' },
  { bg: 'rgba(254,236,222,0.7)', border: 'rgba(253,186,116,0.5)', num: '#c2410c' },
];

export default function Leaderboard() {
  const { user } = useStore();
  const [type, setType] = useState('daily');
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getLeaderboard(type).then(setList).finally(() => setLoading(false));
  }, [type]);

  const myRank = list.findIndex(u => u.telegram_id === user?.telegram_id) + 1;
  const topThree = list.slice(0, 3);
  const rest = list.slice(3);

  return (
    <div style={s.page}>
      <div style={s.bubble1} /><div style={s.bubble2} /><div style={s.bubble3} />

      {/* Header */}
      <div style={s.header}>
        <div style={s.headerTitle}>🏆 Reyting</div>
        {myRank > 0 && (
          <div style={s.myRankBadge}>Sizning o'rningiz: #{myRank}</div>
        )}
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        {['daily', 'global'].map(t => (
          <button key={t}
            style={{ ...s.tab, ...(type === t ? s.tabActive : {}) }}
            onClick={() => setType(t)}>
            {t === 'daily' ? '☀️ Kunlik' : '🌍 Global'}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={s.center}><div style={s.loader} /></div>
      ) : (
        <>
          {/* Top 3 podium */}
          {topThree.length > 0 && (
            <div style={s.podium}>
              {topThree.map((u, i) => {
                const col = TOP_COLORS[i];
                const isMe = u.telegram_id === user?.telegram_id;
                return (
                  <div key={i} style={{
                    ...s.podiumCard,
                    background: col.bg,
                    borderColor: isMe ? 'rgba(59,130,246,0.5)' : col.border,
                    transform: i === 0 ? 'scale(1.05)' : 'scale(1)',
                    order: i === 0 ? 1 : i === 1 ? 0 : 2,
                  }}>
                    <div style={s.podiumBubble} />
                    <div style={s.podiumMedal}>{MEDALS[i]}</div>
                    <div style={s.podiumAv}>
                      {(u.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div style={s.podiumName}>
                      {(u.name || u.username || 'User').split(' ')[0]}
                    </div>
                    <div style={{ ...s.podiumXp, color: col.num }}>
                      ⚡ {u.xp}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Rest list */}
          <div style={s.list}>
            {rest.map((u, i) => {
              const isMe = u.telegram_id === user?.telegram_id;
              return (
                <div key={i} style={{
                  ...s.row,
                  ...(isMe ? s.myRow : {}),
                }}>
                  <div style={{ ...s.rowRank, color: isMe ? '#2563eb' : '#94a3b8' }}>
                    #{i + 4}
                  </div>
                  <div style={{ ...s.rowAv, background: isMe ? 'rgba(219,234,254,0.9)' : 'rgba(255,255,255,0.7)', color: isMe ? '#2563eb' : '#64748b' }}>
                    {(u.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div style={s.rowInfo}>
                    <div style={s.rowName}>{u.name || u.username || 'Foydalanuvchi'}</div>
                    {isMe && <div style={s.rowMe}>Siz</div>}
                  </div>
                  <div style={{ ...s.rowXp, color: isMe ? '#2563eb' : '#64748b' }}>
                    ⚡ {u.xp}
                  </div>
                </div>
              );
            })}

            {list.length === 0 && (
              <div style={s.empty}>
                <div style={s.emptyIcon}>🏆</div>
                <div style={s.emptyText}>Hali hech kim yo'q</div>
                <div style={s.emptySub}>Birinchi bo'ling!</div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

const glass = {
  background: 'rgba(255,255,255,0.62)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1.5px solid rgba(255,255,255,0.9)',
};

const s = {
  page: { padding: '16px 16px 100px', minHeight: '100vh', background: 'linear-gradient(160deg,#f0f4ff,#e8f4ff 50%,#f0f0ff)', position: 'relative', overflow: 'hidden' },
  bubble1: { position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle,rgba(253,224,71,0.2),transparent)', top: -50, right: -50, pointerEvents: 'none' },
  bubble2: { position: 'absolute', width: 130, height: 130, borderRadius: '50%', background: 'radial-gradient(circle,rgba(134,239,172,0.18),transparent)', top: 300, left: -40, pointerEvents: 'none' },
  bubble3: { position: 'absolute', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle,rgba(196,181,253,0.18),transparent)', bottom: 150, right: -20, pointerEvents: 'none' },

  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, position: 'relative', zIndex: 1 },
  headerTitle: { fontSize: 20, fontWeight: 800, color: '#1e293b' },
  myRankBadge: { ...glass, fontSize: 11, fontWeight: 700, color: '#2563eb', padding: '5px 12px', borderRadius: 20 },

  tabs: { display: 'flex', gap: 8, marginBottom: 16, position: 'relative', zIndex: 1 },
  tab: { flex: 1, padding: '10px 0', borderRadius: 12, background: 'rgba(255,255,255,0.6)', border: '1.5px solid rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#64748b' },
  tabActive: { background: 'linear-gradient(135deg,#3b82f6,#0ea5e9)', border: '1.5px solid rgba(59,130,246,0.3)', color: '#fff' },

  center: { display: 'flex', justifyContent: 'center', padding: 40 },
  loader: { width: 36, height: 36, borderRadius: '50%', border: '3px solid #dbeafe', borderTopColor: '#3b82f6' },

  podium: { display: 'flex', gap: 8, marginBottom: 14, alignItems: 'flex-end', position: 'relative', zIndex: 1 },
  podiumCard: {
    flex: 1, borderRadius: 16, padding: '12px 8px', textAlign: 'center',
    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
    border: '1.5px solid', position: 'relative', overflow: 'hidden',
    transition: 'transform .2s',
  },
  podiumBubble: { position: 'absolute', width: 50, height: 50, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.3),transparent)', top: -15, right: -10, pointerEvents: 'none' },
  podiumMedal: { fontSize: 22, marginBottom: 6 },
  podiumAv: { width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#1e293b', margin: '0 auto 6px' },
  podiumName: { fontSize: 10, fontWeight: 700, color: '#1e293b', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  podiumXp: { fontSize: 11, fontWeight: 800 },

  list: { display: 'flex', flexDirection: 'column', gap: 7, position: 'relative', zIndex: 1 },
  row: { ...glass, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 13 },
  myRow: { background: 'rgba(219,234,254,0.75)', border: '1.5px solid rgba(147,197,253,0.6)' },
  rowRank: { fontSize: 12, fontWeight: 700, minWidth: 28, textAlign: 'center' },
  rowAv: { width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 },
  rowInfo: { flex: 1, display: 'flex', alignItems: 'center', gap: 6 },
  rowName: { fontSize: 13, fontWeight: 600, color: '#1e293b' },
  rowMe: { fontSize: 9, fontWeight: 700, background: 'rgba(219,234,254,0.9)', color: '#2563eb', padding: '2px 6px', borderRadius: 6 },
  rowXp: { fontSize: 12, fontWeight: 700 },

  empty: { textAlign: 'center', padding: '40px 20px' },
  emptyIcon: { fontSize: 40, marginBottom: 10 },
  emptyText: { fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 4 },
  emptySub: { fontSize: 12, color: '#94a3b8' },
};
