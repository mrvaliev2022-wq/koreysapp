import { useEffect, useState } from 'react';
import { useStore } from '../store';
import { api } from '../api';

export default function Leaderboard() {
  const { user } = useStore();
  const [type, setType] = useState('daily');
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getLeaderboard(type).then(setList).finally(() => setLoading(false));
  }, [type]);

  const myRank = list.findIndex((u) => u.telegram_id === user?.telegram_id) + 1;

  return (
    <div style={s.page}>
      <div style={s.tabs}>
        {['daily','global'].map((t) => (
          <button key={t} style={{ ...s.tab, ...(type===t ? s.tabActive : {}) }} onClick={() => setType(t)}>
            {t === 'daily' ? 'Kunlik' : 'Global'}
          </button>
        ))}
      </div>
      {myRank > 0 && <div style={s.myRank}>Sizning orniingiz: #{myRank}</div>}
      {loading ? <div style={s.center}>Yuklanmoqda...</div> : (
        <div style={s.list}>
          {list.map((u, i) => (
            <div key={i} style={{ ...s.row, ...(u.telegram_id === user?.telegram_id ? s.myRow : {}) }}>
              <span style={s.rank}>{i < 3 ? ['🥇','🥈','🥉'][i] : `#${i+1}`}</span>
              <span style={s.name}>{u.name || 'Foydalanuvchi'}</span>
              <span style={s.xp}>XP {u.xp}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
const s = {
  page:    { padding:'16px 16px 90px', minHeight:'100vh' },
  tabs:    { display:'flex', gap:8, marginBottom:16 },
  tab:     { flex:1, padding:'10px 0', border:'1.5px solid #E0E0E0', borderRadius:10, background:'#fff', fontSize:14, fontWeight:500, cursor:'pointer' },
  tabActive:{ background:'#1976D2', color:'#fff', borderColor:'#1976D2' },
  myRank:  { fontSize:13, color:'#1976D2', marginBottom:12, textAlign:'center' },
  center:  { textAlign:'center', padding:40, color:'#888' },
  list:    { display:'flex', flexDirection:'column', gap:8 },
  row:     { display:'flex', alignItems:'center', gap:12, padding:'12px 16px', background:'#FAFAFA', borderRadius:10 },
  myRow:   { background:'#E3F2FD', border:'1.5px solid #90CAF9' },
  rank:    { fontSize:18, minWidth:36 },
  name:    { flex:1, fontSize:15, fontWeight:500 },
  xp:      { fontSize:14, fontWeight:700, color:'#1565C0' },
};
