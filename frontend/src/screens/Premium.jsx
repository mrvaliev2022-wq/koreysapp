import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

const tg = window.Telegram?.WebApp;

export default function Premium() {
  const { user } = useStore();
  const nav = useNavigate();

  return (
    <div style={s.page}>
      <div style={{ fontSize:60, marginBottom:8 }}>👑</div>
      <h1 style={s.title}>Premium</h1>
      <p style={s.sub}>Barcha imkoniyatlarni oching</p>
      <div style={s.features}>
        {['127+ dars','Kuniga 6 ta dars','Streak Freeze 10 kun','Barcha tracklar'].map((f) => (
          <div key={f} style={s.feature}>✅ {f}</div>
        ))}
      </div>
      <div style={s.method}>
        <div style={s.methodHeader}>
          <span style={{ fontSize:28 }}>⭐</span>
          <div><div style={s.methodTitle}>Telegram Stars</div><div style={s.methodSub}>Darhol faollashadi</div></div>
          <div style={s.methodPrice}>150 Stars</div>
        </div>
        <button style={s.btnStar}>Stars bilan tolash</button>
      </div>
      <div style={s.method}>
        <div style={s.methodHeader}>
          <span style={{ fontSize:28 }}>💳</span>
          <div><div style={s.methodTitle}>Uzcard / Humo</div><div style={s.methodSub}>Admin tasdiqlaydi</div></div>
          <div style={s.methodPrice}>29 000 som</div>
        </div>
        <div style={s.cardInfo}>Telegram ID: {user?.telegram_id}</div>
        <button style={s.btnCard}
          onClick={() => tg?.openTelegramLink('https://t.me/koreystili_topikkaBot')}>
          Adminga yozish
        </button>
      </div>
      <div style={s.method}>
        <div style={s.methodHeader}>
          <span style={{ fontSize:28 }}>👥</span>
          <div><div style={s.methodTitle}>Referral</div><div style={s.methodSub}>3 ta dost = 1 oy bepul</div></div>
          <div style={s.methodPrice}>Bepul</div>
        </div>
        <button style={s.btnRef}
          onClick={() => tg?.switchInlineQuery?.('KoreysApp bilan koreys tili organamiz!')}>
          Havola yuborish
        </button>
      </div>
    </div>
  );
}
const s = {
  page:       { padding:'24px 16px 40px', minHeight:'100vh', textAlign:'center' },
  title:      { fontSize:28, fontWeight:800, color:'#1a1a1a' },
  sub:        { fontSize:15, color:'#666', marginBottom:20 },
  features:   { display:'flex', flexDirection:'column', gap:8, marginBottom:24, textAlign:'left' },
  feature:    { fontSize:15, color:'#333', padding:'6px 0' },
  method:     { border:'1.5px solid #E8EBFF', borderRadius:14, padding:16, marginBottom:14, textAlign:'left' },
  methodHeader:{ display:'flex', alignItems:'center', gap:12, marginBottom:12 },
  methodTitle:{ fontSize:15, fontWeight:700 },
  methodSub:  { fontSize:12, color:'#888' },
  methodPrice:{ marginLeft:'auto', fontSize:15, fontWeight:700, color:'#1976D2' },
  cardInfo:   { fontSize:13, color:'#555', background:'#F5F5F5', borderRadius:8, padding:'10px 12px', marginBottom:10 },
  btnStar:    { width:'100%', padding:14, background:'#FFB300', color:'#fff', border:'none', borderRadius:12, fontSize:15, fontWeight:700, cursor:'pointer' },
  btnCard:    { width:'100%', padding:14, background:'#1976D2', color:'#fff', border:'none', borderRadius:12, fontSize:15, fontWeight:700, cursor:'pointer' },
  btnRef:     { width:'100%', padding:14, background:'#2ECC71', color:'#fff', border:'none', borderRadius:12, fontSize:15, fontWeight:700, cursor:'pointer' },
};
