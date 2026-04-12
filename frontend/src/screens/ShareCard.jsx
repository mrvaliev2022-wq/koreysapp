import { useStore } from '../store';

const tg = window.Telegram?.WebApp;

export default function ShareCard() {
  const { user, stats } = useStore();
  if (!user) return null;

  const text =
    'Bugungi koreys tili natijam!\n' +
    'KoreysApp — TOPIK · EPS\n\n' +
    `XP +${stats?.xp_today ?? 0} bugun\n` +
    `🔥 ${stats?.streak ?? 0} kunlik streak!\n` +
    `📚 ${stats?.lessons_done ?? 0} ta dars\n\n` +
    'Men ham organmoqchimisiz?\n' +
    't.me/koreystili_topikkaBot';

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={{ fontSize:48, marginBottom:8 }}>🇰🇷</div>
        <div style={s.cardTitle}>KoreysApp</div>
        <div style={s.cardSub}>TOPIK · EPS-TOPIK</div>
        <div style={s.divider} />
        <div style={s.stat}>XP +{stats?.xp_today ?? 0} bugun</div>
        <div style={s.stat}>🔥 {stats?.streak ?? 0} kunlik streak</div>
        <div style={s.stat}>📚 {stats?.lessons_done ?? 0} ta dars</div>
        <div style={s.divider} />
        <div style={s.cta}>Organmoqchimisiz?</div>
        <div style={s.link}>t.me/koreystili_topikkaBot</div>
      </div>
      <button style={s.shareBtn}
        onClick={() => tg?.switchInlineQuery?.(text, ['users','chats','channels'])}>
        Telegram da ulashish
      </button>
      <button style={s.copyBtn}
        onClick={() => { navigator.clipboard?.writeText(text); tg?.showAlert?.('Nusxa olindi!'); }}>
        Nusxa olish
      </button>
    </div>
  );
}
const s = {
  page:    { padding:'24px 16px 40px', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', gap:16 },
  card:    { width:'100%', maxWidth:340, background:'linear-gradient(135deg,#0D47A1,#1976D2)', borderRadius:20, padding:28, color:'#fff', textAlign:'center' },
  cardTitle:{ fontSize:28, fontWeight:800, marginBottom:4 },
  cardSub: { fontSize:13, opacity:0.8, marginBottom:16 },
  divider: { height:1, background:'rgba(255,255,255,.2)', margin:'12px 0' },
  stat:    { fontSize:18, fontWeight:600, margin:'8px 0' },
  cta:     { fontSize:14, opacity:0.9, marginTop:12 },
  link:    { fontSize:16, fontWeight:700, marginTop:4 },
  shareBtn:{ width:'100%', maxWidth:340, padding:16, background:'#1976D2', color:'#fff', border:'none', borderRadius:14, fontSize:16, fontWeight:700, cursor:'pointer' },
  copyBtn: { width:'100%', maxWidth:340, padding:14, background:'#F5F5F5', color:'#333', border:'none', borderRadius:14, fontSize:15, cursor:'pointer' },
};
