import { useEffect, useState } from 'react';
import { useStore } from '../store';
import { api } from '../api';

const MEDAL = ['\uD83E\uDD47', '\uD83E\uDD48', '\uD83E\uDD49'];
const TOP_COLORS = [
  { bg: 'rgba(254,243,199,0.85)', border: 'rgba(251,191,36,0.5)', num: '#b45309' },
  { bg: 'rgba(243,244,246,0.8)',  border: 'rgba(156,163,175,0.4)', num: '#4b5563' },
  { bg: 'rgba(255,237,213,0.8)',  border: 'rgba(249,115,22,0.35)', num: '#c2410c' },
];

export default function Leaderboard() {
  const { user } = useStore();
  const [type, setType]       = useState('daily');
  const [list, setList]       = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Faqat top 100 so'raymiz — backend limit=100 default
    api.getLeaderboard(type).then(setList).finally(() => setLoading(false));
  }, [type]);

  // Top 10 va user pozitsiyasi
  const top10  = list.slice(0, 10);
  const myIdx  = list.findIndex(u => u.telegram_id === user?.telegram_id);
  const myRank = myIdx >= 0 ? myIdx + 1 : 0;
  const myUser = myIdx >= 0 ? list[myIdx] : null;
  const isInTop10 = myRank > 0 && myRank <= 10;

  return (
    <div style={s.page}>
      <div style={s.orb1} /><div style={s.orb2} /><div style={s.orb3} />

      <div style={s.content}>
        {/* Header */}
        <div style={s.header}>
          <div style={s.title}>\uD83C\uDFC6 Reyting</div>
          {myRank > 0 && (
            <div style={s.myRankBadge}>
              Siz: #{myRank}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div style={s.tabs}>
          {[['daily', '\u2600\uFE0F Kunlik'], ['global', '\uD83C\uDF0D Global']].map(([val, lbl]) => (
            <button key={val}
              style={{ ...s.tab, ...(type === val ? s.tabActive : {}) }}
              onClick={() => setType(val)}>
              {lbl}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={s.center}><div style={s.loader} /></div>
        ) : list.length === 0 ? (
          <div style={s.empty}>
            <div style={s.emptyIco}>\uD83C\uDFC6</div>
            <div style={s.emptyTxt}>Hali hech kim yo'q</div>
            <div style={s.emptySub}>Birinchi bo'ling!</div>
          </div>
        ) : (
          <>
            {/* TOP 3 Podium */}
            {top10.length >= 3 && (
              <div style={s.podium}>
                {[top10[1], top10[0], top10[2]].map((u, idx) => {
                  const rank  = idx === 0 ? 1 : idx === 1 ? 0 : 2;
                  const col   = TOP_COLORS[rank];
                  const isMe  = u?.telegram_id === user?.telegram_id;
                  if (!u) return <div key={idx} style={{ flex: 1 }} />;
                  return (
                    <div key={rank} style={{
                      ...s.podCard,
                      background: isMe ? 'rgba(237,233,254,0.9)' : col.bg,
                      borderColor: isMe ? 'rgba(124,58,237,0.6)' : col.border,
                      transform: rank === 0 ? 'scale(1.06)' : 'scale(1)',
                    }}>
                      <div style={s.podOrb} />
                      <div style={s.podMedal}>{MEDAL[rank]}</div>
                      <div style={{ ...s.podAv, color: isMe ? '#7c3aed' : col.num }}>
                        {(u.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div style={s.podName}>{(u.name || 'User').split(' ')[0]}</div>
                      <div style={{ ...s.podXp, color: isMe ? '#7c3aed' : col.num }}>
                        \u26A1 {u.xp}
                      </div>
                      {isMe && <div style={s.podMeBadge}>Siz</div>}
                    </div>
                  );
                })}
              </div>
            )}

            {/* TOP 10 list (4-10) */}
            <div style={s.list}>
              {top10.slice(3).map((u, i) => {
                const rank = i + 4;
                const isMe = u.telegram_id === user?.telegram_id;
                return (
                  <div key={i} style={{ ...s.row, ...(isMe ? s.myRow : {}) }}>
                    <div style={{ ...s.rank, color: isMe ? '#7c3aed' : '#9ca3af' }}>
                      #{rank}
                    </div>
                    <div style={{
                      ...s.av,
                      background: isMe ? 'rgba(237,233,254,0.9)' : 'rgba(255,255,255,0.7)',
                      color: isMe ? '#7c3aed' : '#6b7280'
                    }}>
                      {(u.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div style={s.rowInfo}>
                      <div style={s.rowName}>{u.name || u.username || 'Foydalanuvchi'}</div>
                      {isMe && <span style={s.meBadge}>Siz</span>}
                    </div>
                    <div style={{ ...s.rowXp, color: isMe ? '#7c3aed' : '#6b7280' }}>
                      \u26A1 {u.xp}
                    </div>
                  </div>
                );
              })}

              {/* Divider + User o'rni (agar top 10 da bo'lmasa) */}
              {myUser && !isInTop10 && (
                <>
                  {/* Divider */}
                  <div style={s.divider}>
                    <div style={s.dividerLine} />
                    <div style={s.dividerTxt}>Sizning o'rningiz</div>
                    <div style={s.dividerLine} />
                  </div>

                  {/* User o'z reyting kartasi */}
                  <div style={s.mySpecialRow}>
                    <div style={s.mySpecialLeft}>
                      <div style={s.mySpecialRank}>#{myRank}</div>
                      <div style={s.mySpecialAv}>
                        {(myUser.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div style={s.mySpecialInfo}>
                        <div style={s.mySpecialName}>{myUser.name || 'Siz'}</div>
                        <div style={s.mySpecialSub}>Top {myRank} ga kirish uchun harakat qiling!</div>
                      </div>
                    </div>
                    <div style={s.mySpecialXp}>\u26A1 {myUser.xp}</div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const glass = {
  background: 'rgba(255,255,255,0.72)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(124,58,237,0.14)'
};

const s = {
  page: { fontFamily: "'Nunito',sans-serif", minHeight: '100vh', background: 'linear-gradient(160deg,#f8f7ff 0%,#eef2ff 35%,#f0f9ff 65%,#f5f3ff 100%)', position: 'relative', overflow: 'hidden', paddingBottom: 90 },
  orb1: { position: 'fixed', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.18),transparent)', top: -80, right: -60, pointerEvents: 'none', zIndex: 0 },
  orb2: { position: 'fixed', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(251,191,36,0.12),transparent)', top: 300, left: -60, pointerEvents: 'none', zIndex: 0 },
  orb3: { position: 'fixed', width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,139,250,0.2),transparent)', bottom: 180, right: -40, pointerEvents: 'none', zIndex: 0 },
  content: { position: 'relative', zIndex: 1, padding: '16px 16px 0' },
  center:  { display: 'flex', justifyContent: 'center', padding: 40 },
  loader:  { width: 36, height: 36, borderRadius: '50%', border: '3px solid rgba(124,58,237,0.15)', borderTopColor: '#7c3aed', animation: 'spin 0.8s linear infinite' },

  header:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  title:       { fontSize: 20, fontWeight: 900, color: '#1e1b4b' },
  myRankBadge: { ...glass, fontSize: 11, fontWeight: 700, color: '#7c3aed', padding: '5px 12px', borderRadius: 20 },

  tabs:      { display: 'flex', gap: 8, marginBottom: 16 },
  tab:       { flex: 1, padding: '10px 0', borderRadius: 13, background: 'rgba(255,255,255,0.6)', border: '1.5px solid rgba(124,58,237,0.12)', fontSize: 13, fontWeight: 700, cursor: 'pointer', color: '#6b7280' },
  tabActive: { background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', border: 'none', color: '#fff' },

  podium:     { display: 'flex', gap: 8, marginBottom: 14, alignItems: 'flex-end' },
  podCard:    { flex: 1, borderRadius: 16, padding: '12px 8px', textAlign: 'center', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1.5px solid', position: 'relative', overflow: 'hidden', transition: 'transform .2s' },
  podOrb:     { position: 'absolute', width: 55, height: 55, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.25),transparent)', top: -15, right: -10, pointerEvents: 'none' },
  podMedal:   { fontSize: 22, marginBottom: 4 },
  podAv:      { width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, margin: '0 auto 5px' },
  podName:    { fontSize: 10, fontWeight: 700, color: '#1e1b4b', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  podXp:      { fontSize: 11, fontWeight: 800 },
  podMeBadge: { fontSize: 8, fontWeight: 700, background: 'rgba(124,58,237,0.15)', color: '#7c3aed', padding: '2px 6px', borderRadius: 6, marginTop: 3, display: 'inline-block' },

  list:    { display: 'flex', flexDirection: 'column', gap: 7 },
  row:     { ...glass, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 13px', borderRadius: 14 },
  myRow:   { background: 'rgba(237,233,254,0.85)', border: '1.5px solid rgba(124,58,237,0.35)', boxShadow: '0 2px 12px rgba(124,58,237,0.12)' },
  rank:    { fontSize: 12, fontWeight: 800, minWidth: 28, textAlign: 'center' },
  av:      { width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 },
  rowInfo: { flex: 1, display: 'flex', alignItems: 'center', gap: 6 },
  rowName: { fontSize: 13, fontWeight: 700, color: '#1e1b4b' },
  meBadge: { fontSize: 9, fontWeight: 700, background: 'rgba(237,233,254,0.9)', color: '#7c3aed', padding: '2px 6px', borderRadius: 6 },
  rowXp:   { fontSize: 12, fontWeight: 700 },

  divider:     { display: 'flex', alignItems: 'center', gap: 8, margin: '10px 0 8px' },
  dividerLine: { flex: 1, height: 1, background: 'rgba(124,58,237,0.15)' },
  dividerTxt:  { fontSize: 10, fontWeight: 700, color: '#9ca3af', whiteSpace: 'nowrap' },

  mySpecialRow:  { background: 'linear-gradient(135deg,rgba(237,233,254,0.95),rgba(224,231,255,0.95))', border: '2px solid rgba(124,58,237,0.4)', borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 16px rgba(124,58,237,0.15)' },
  mySpecialLeft: { display: 'flex', alignItems: 'center', gap: 10 },
  mySpecialRank: { fontSize: 16, fontWeight: 900, color: '#7c3aed', minWidth: 36 },
  mySpecialAv:   { width: 38, height: 38, borderRadius: '50%', background: 'rgba(124,58,237,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: '#7c3aed' },
  mySpecialInfo: { display: 'flex', flexDirection: 'column', gap: 2 },
  mySpecialName: { fontSize: 14, fontWeight: 800, color: '#1e1b4b' },
  mySpecialSub:  { fontSize: 10, color: '#7c3aed', fontWeight: 600 },
  mySpecialXp:   { fontSize: 14, fontWeight: 900, color: '#7c3aed' },

  empty:    { textAlign: 'center', padding: '40px 20px' },
  emptyIco: { fontSize: 44, marginBottom: 10 },
  emptyTxt: { fontSize: 16, fontWeight: 700, color: '#1e1b4b', marginBottom: 4 },
  emptySub: { fontSize: 12, color: '#6b7280' },
};
