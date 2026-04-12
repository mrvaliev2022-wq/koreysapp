import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, stats } = useStore();
  const nav = useNavigate();
  if (!user) return null;
  const initials = user.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0,2)
    : '??';

  return (
    <div style={s.page}>
      <div style={s.avatar}>{initials}</div>
      <div style={s.name}>{user.name}</div>
      {user.username && <div style={s.username}>@{user.username}</div>}
      {user.is_premium && <div style={s.premBadge}>⭐ Premium</div>}
      <div style={s.grid}>
        <div style={s.statCard}>
          <div style={s.statVal}>{'⚡ ' + (stats ? stats.xp : 0)}</div>
          <div style={s.statLabel}>Jami XP</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statVal}>{'🔥 ' + (stats ? stats.streak : 0)}</div>
          <div style={s.statLabel}>Streak</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statVal}>{'📚 ' + (stats ? stats.lessons_done : 0)}</div>
          <div style={s.statLabel}>Darslar</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statVal}>{'❄️ ' + (stats ? stats.freeze_days : 0)}</div>
          <div style={s.statLabel}>Freeze</div>
        </div>
      </div>
      {!user.is_premium && (
        <button style={s.premBtn} onClick={() => nav('/premium')}>
          💎 Premium olish
        </button>
      )}
    </div>
  );
}

const s = {
  page:      { padding:'24px 16px 100px', minHeight:'100vh', textAlign:'center' },
  avatar:    { width:72, height:72, borderRadius:'50%', background:'#1976D2', color:'#fff',
               fontSize:26, fontWeight:700, display:'flex', alignItems:'center',
               justifyContent:'center', margin:'0 auto 12px' },
  name:      { fontSize:22, fontWeight:700, color:'#1a1a1a' },
  username:  { fontSize:14, color:'#888', marginTop:4 },
  premBadge: { display:'inline-block', marginTop:8, fontSize:12, background:'#FFF3CD',
               color:'#856404', padding:'4px 12px', borderRadius:20 },
  grid:      { display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, margin:'20px 0' },
  statCard:  { background:'#F8F9FF', borderRadius:12, padding:'14px 0' },
  statVal:   { fontSize:20, fontWeight:700, color:'#1a1a1a' },
  statLabel: { fontSize:11, color:'#888', marginTop:4 },
  premBtn:   { width:'100%', padding:16, background:'#1976D2', color:'#fff',
               border:'none', borderRadius:14, fontSize:16, fontWeight:700, cursor:'pointer' },
};