import { useEffect, useState } from 'react';
import { useStore } from '../store';
import { api } from '../api';

const TOP_COLORS = [
  { bg: 'rgba(254,243,199,0.8)', border: 'rgba(251,191,36,0.4)', num: '#b45309', medal: '🥇' },
  { bg: 'rgba(243,244,246,0.7)', border: 'rgba(156,163,175,0.4)', num: '#4b5563', medal: '🥈' },
  { bg: 'rgba(255,237,213,0.7)', border: 'rgba(249,115,22,0.3)', num: '#c2410c', medal: '🥉' },
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

  const myRank    = list.findIndex(u => u.telegram_id === user?.telegram_id) + 1;
  const topThree  = list.slice(0, 3);
  const rest      = list.slice(3);

  return (
    <div style={s.page}>
      <div style={s.orb1} /><div style={s.orb2} /><div style={s.orb3} />

      <div style={s.content}>
        {/* Header */}
        <div style={s.header}>
          <div style={s.title}>🏆 Reyting</div>
          {myRank > 0 && <div style={s.myRankBadge}>Sizning o'rningiz: #{myRank}</div>}
        </div>

        {/* Tabs */}
        <div style={s.tabs}>
          {[['daily', '☀️ Kunlik'], ['global', '🌍 Global']].map(([val, lbl]) => (
            <button key={val} style={{ ...s.tab, ...(type === val ? s.tabActive : {}) }}
              onClick={() => setType(val)}>{lbl}</button>
          ))}
        </div>

        {loading ? (
          <div style={s.center}><div style={s.loader} /></div>
        ) : (
          <>
            {/* Podium top 3 */}
            {topThree.length > 0 && (
              <div style={s.podium}>
                {[topThree[1], topThree[0], topThree[2]].filter(Boolean).map((u, idx) => {
                  const rank = idx === 0 ? 1 : idx === 1 ? 0 : 2;
                  const col  = TOP_COLORS[rank];
                  const isMe = u?.telegram_id === user?.telegram_id;
                  if (!u) return <div key={idx} style={{ flex: 1 }} />;
                  return (
                    <div key={rank} style={{
                      ...s.podCard,
                      background: col.bg,
                      borderColor: isMe ? 'rgba(124,58,237,0.5)' : col.border,
                      transform: rank === 0 ? 'scale(1.06)' : 'scale(1)',
                    }}>
                      <div style={s.podOrb} />
                      <div style={s.podMedal}>{col.medal}</div>
                      <div style={{ ...s.podAv, color: col.num }}>
                        {(u.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div style={s.podName}>{(u.name || 'User').split(' ')[0]}</div>
                      <div style={{ ...s.podXp, color: col.num }}>⚡ {u.xp}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Rest */}
            <div style={s.list}>
              {rest.map((u, i) => {
                const isMe = u.telegram_id === user?.telegram_id;
                return (
                  <div key={i} style={{ ...s.row, ...(isMe ? s.myRow : {}) }}>
                    <div style={{ ...s.rank, color: isMe ? '#7c3aed' : '#9ca3af' }}>#{i + 4}</div>
                    <div style={{ ...s.av, background: isMe ? 'rgba(237,233,254,0.9)' : 'rgba(255,255,255,0.7)', color: isMe ? '#7c3aed' : '#6b7280' }}>
                      {(u.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div style={s.rowInfo}>
                      <div style={s.rowName}>{u.name || u.username || 'Foydalanuvchi'}</div>
                      {isMe && <span style={s.meBadge}>Siz</span>}
                    </div>
                    <div style={{ ...s.rowXp, color: isMe ? '#7c3aed' : '#6b7280' }}>⚡ {u.xp}</div>
                  </div>
                );
              })}

              {list.length === 0 && (
                <div style={s.empty}>
                  <div style={s.emptyIco}>🏆</div>
                  <div style={s.emptyTxt}>Hali hech kim yo'q</div>
                  <div style={s.emptySub}>Birinchi bo'ling!</div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const glass = { background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(124,58,237,0.14)' };

const s = {
  page: { fontFamily: "'Nunito',sans-serif", minHeight: '100vh', background: 'linear-gradient(160deg,#f8f7ff 0%,#eef2ff 35%,#f0f9ff 65%,#f5f3ff 100%)', position: 'relative', overflow: 'hidden', paddingBottom: 80 },
  orb1: { position: 'fixed', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.18),transparent)', top: -80, right: -60, pointerEvents: 'none', zIndex: 0 },
  orb2: { position: 'fixed', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(251,191,36,0.12),transparent)', top: 300, left: -60, pointerEvents: 'none', zIndex: 0 },
  orb3: { position: 'fixed', width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,139,250,0.2),transparent)', bottom: 180, right: -40, pointerEvents: 'none', zIndex: 0 },
  content: { position: 'relative', zIndex: 1, padding: '16px 16px 0' },
  center: { display: 'flex', justifyContent: 'center', padding: 40 },
  loader: { width: 36, height: 36, borderRadius: '50%', border: '3px solid rgba(124,58,237,0.15)', borderTopColor: '#7c3aed' },

  header:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  title:       { fontSize: 20, fontWeight: 900, color: '#1e1b4b' },
  myRankBadge: { ...glass, fontSize: 11, fontWeight: 700, color: '#7c3aed', padding: '5px 12px', borderRadius: 20 },

  tabs:      { display: 'flex', gap: 8, marginBottom: 16 },
  tab:       { flex: 1, padding: '10px 0', borderRadius: 13, background: 'rgba(255,255,255,0.6)', border: '1.5px solid rgba(124,58,237,0.12)', fontSize: 13, fontWeight: 700, cursor: 'pointer', color: '#6b7280' },
  tabActive: { background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', border: 'none', color: '#fff' },

  podium:  { display: 'flex', gap: 8, marginBottom: 14, alignItems: 'flex-end' },
  podCard: { flex: 1, borderRadius: 16, padding: '12px 8px', textAlign: 'center', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1.5px solid', position: 'relative', overflow: 'hidden', transition: 'transform .2s' },
  podOrb:  { position: 'absolute', width: 55, height: 55, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.25),transparent)', top: -15, right: -10, pointerEvents: 'none' },
  podMedal:{ fontSize: 22, marginBottom: 4 },
  podAv:   { width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, margin: '0 auto 5px' },
  podName: { fontSize: 10, fontWeight: 700, color: '#1e1b4b', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  podXp:   { fontSize: 11, fontWeight: 800 },

  list:  { display: 'flex', flexDirection: 'column', gap: 7 },
  row:   { ...glass, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 13px', borderRadius: 14 },
  myRow: { background: 'rgba(237,233,254,0.8)', border: '1.5px solid rgba(124,58,237,0.3)' },
  rank:  { fontSize: 12, fontWeight: 800, minWidth: 28, textAlign: 'center' },
  av:    { width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 },
  rowInfo: { flex: 1, display: 'flex', alignItems: 'center', gap: 6 },
  rowName: { fontSize: 13, fontWeight: 700, color: '#1e1b4b' },
  meBadge: { fontSize: 9, fontWeight: 700, background: 'rgba(237,233,254,0.9)', color: '#7c3aed', padding: '2px 6px', borderRadius: 6 },
  rowXp:   { fontSize: 12, fontWeight: 700 },

  empty:    { textAlign: 'center', padding: '40px 20px' },
  emptyIco: { fontSize: 44, marginBottom: 10 },
  emptyTxt: { fontSize: 16, fontWeight: 700, color: '#1e1b4b', marginBottom: 4 },
  emptySub: { fontSize: 12, color: '#6b7280' },
};
