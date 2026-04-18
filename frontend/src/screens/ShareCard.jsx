import { useStore } from '../store';

const tg = window.Telegram?.WebApp;

export default function ShareCard() {
  const { user, stats } = useStore();
  if (!user) return null;

  const text =
    `Bugungi koreys tili natijam!\n` +
    `KoreysApp — TOPIK · EPS\n\n` +
    `+${stats?.xp_today ?? 0} XP bugun\n` +
    `${stats?.streak ?? 0} kunlik streak!\n` +
    `${stats?.lessons_done ?? 0} ta dars tugatdim\n\n` +
    `Men ham organmoqchimisiz?\n` +
    `t.me/koreystili_topikkaBot`;

  function share() {
    tg?.switchInlineQuery?.(text, ['users', 'chats', 'channels']);
  }

  function copy() {
    navigator.clipboard?.writeText(text);
    tg?.showAlert?.('Nusxa olindi!');
  }

  const statItems = [
    { icon: '⚡', val: '+' + (stats?.xp_today ?? 0), lbl: 'XP bugun', color: '#fde047' },
    { icon: '🔥', val: stats?.streak ?? 0,            lbl: 'Streak',   color: '#fb923c' },
    { icon: '📚', val: stats?.lessons_done ?? 0,      lbl: 'Darslar',  color: '#4ade80' },
  ];

  return (
    <div style={s.page}>
      <div style={s.bubble1} /><div style={s.bubble2} /><div style={s.bubble3} />

      <div style={s.pageTitle}>Natijani ulashing</div>
      <div style={s.pageSub}>Do'stlaringizni ham o'rganishga taklif qiling!</div>

      {/* Share card preview */}
      <div style={s.card}>
        <div style={s.cardBubble1} /><div style={s.cardBubble2} />
        <div style={s.cardStripe} />

        <div style={s.cardTop}>
          <div style={s.flag}>🇰🇷</div>
          <div>
            <div style={s.cardTitle}>KoreysApp</div>
            <div style={s.cardSub}>TOPIK · EPS-TOPIK</div>
          </div>
        </div>

        <div style={s.cardDivider} />

        <div style={s.cardStats}>
          {statItems.map((item, i) => (
            <div key={i} style={s.cardStat}>
              <div style={{ ...s.cardStatIco, background: item.color + '22', border: '1px solid ' + item.color + '44' }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
              </div>
              <div style={s.cardStatNum}>{item.val}</div>
              <div style={s.cardStatLbl}>{item.lbl}</div>
            </div>
          ))}
        </div>

        <div style={s.cardDivider} />

        <div style={s.cardCta}>O'rganmoqchimisiz?</div>
        <div style={s.cardLink}>t.me/koreystili_topikkaBot</div>
      </div>

      {/* User info mini */}
      <div style={s.userCard}>
        <div style={s.userAv}>
          {(user.name || 'U').charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={s.userName}>{user.name}</div>
          {user.is_premium && <div style={s.userPrem}>👑 Premium</div>}
        </div>
      </div>

      <div style={s.btnRow}>
        <button style={s.shareBtn} onClick={share}>
          📤 Telegram'da ulashish
        </button>
        <button style={s.copyBtn} onClick={copy}>
          📋 Nusxa
        </button>
      </div>

      <div style={s.note}>
        Do'stingiz siz orqali Premium olsa, sizga ham bepul Premium beriladi!
      </div>
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
  page: { padding: '16px 16px 100px', minHeight: '100vh', background: 'linear-gradient(160deg,#f0f4ff,#e8f4ff 50%,#f0f0ff)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  bubble1: { position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(147,197,253,0.25),transparent)', top: -60, right: -60, pointerEvents: 'none' },
  bubble2: { position: 'absolute', width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle,rgba(134,239,172,0.2),transparent)', bottom: 150, left: -50, pointerEvents: 'none' },
  bubble3: { position: 'absolute', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle,rgba(196,181,253,0.2),transparent)', top: 200, left: -30, pointerEvents: 'none' },

  pageTitle: { fontSize: 20, fontWeight: 800, color: '#1e293b', marginBottom: 4, position: 'relative', zIndex: 1, alignSelf: 'flex-start' },
  pageSub: { fontSize: 12, color: '#94a3b8', marginBottom: 18, position: 'relative', zIndex: 1, alignSelf: 'flex-start' },

  card: {
    width: '100%', maxWidth: 340,
    background: 'linear-gradient(135deg,rgba(29,78,216,0.88),rgba(14,165,233,0.85))',
    border: '1.5px solid rgba(255,255,255,0.2)',
    borderRadius: 24, padding: '20px 20px 22px',
    position: 'relative', overflow: 'hidden', zIndex: 1, marginBottom: 12,
  },
  cardBubble1: { position: 'absolute', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.1),transparent)', top: -25, right: -15, pointerEvents: 'none' },
  cardBubble2: { position: 'absolute', width: 70, height: 70, borderRadius: '50%', background: 'radial-gradient(circle,rgba(134,239,172,0.15),transparent)', bottom: -15, left: 30, pointerEvents: 'none' },
  cardStripe: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#4ade80,#fde047,#a78bfa)', borderRadius: '24px 24px 0 0' },

  cardTop: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 },
  flag: { fontSize: 36 },
  cardTitle: { fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1 },
  cardSub: { fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 3 },
  cardDivider: { height: 1, background: 'rgba(255,255,255,0.15)', margin: '12px 0' },

  cardStats: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 },
  cardStat: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 },
  cardStatIco: { width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardStatNum: { fontSize: 16, fontWeight: 800, color: '#fff' },
  cardStatLbl: { fontSize: 9, color: 'rgba(255,255,255,0.6)' },

  cardCta: { fontSize: 12, color: 'rgba(255,255,255,0.75)', textAlign: 'center', marginTop: 4 },
  cardLink: { fontSize: 13, fontWeight: 700, color: '#fff', textAlign: 'center', marginTop: 3 },

  userCard: { ...glass, width: '100%', maxWidth: 340, borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, position: 'relative', zIndex: 1 },
  userAv: { width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#0ea5e9)', color: '#fff', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  userName: { fontSize: 13, fontWeight: 700, color: '#1e293b' },
  userPrem: { fontSize: 10, color: '#b45309', fontWeight: 600, marginTop: 1 },

  btnRow: { display: 'flex', gap: 8, width: '100%', maxWidth: 340, marginBottom: 12, position: 'relative', zIndex: 1 },
  shareBtn: { flex: 3, padding: '13px 0', background: 'linear-gradient(90deg,#3b82f6,#0ea5e9)', color: '#fff', border: 'none', borderRadius: 13, fontSize: 13, fontWeight: 800, cursor: 'pointer' },
  copyBtn: { flex: 1, padding: '13px 0', ...glass, color: '#2563eb', borderRadius: 13, fontSize: 13, fontWeight: 700, cursor: 'pointer' },

  note: { ...glass, width: '100%', maxWidth: 340, borderRadius: 12, padding: '10px 14px', fontSize: 11, color: '#64748b', textAlign: 'center', lineHeight: 1.5, position: 'relative', zIndex: 1, background: 'rgba(254,249,195,0.5)', borderColor: 'rgba(253,224,71,0.3)' },
};
