import { useStore } from '../store';

const tg = window.Telegram?.WebApp;

export default function ShareCard() {
  const { user, stats } = useStore();
  if (!user) return null;

  const botUrl = 'https://t.me/koreystili_topikkaBot';
  const text =
    '\uD83C\uDDF0\uD83C\uDDF7 KoreysApp Test Natijam!\n\n' +
    '\uC548\uB155\uD558\uC138\uC694! \uD55C\uAD6D\uC5B4 \uD559\uC2B5\uC744 \uC2DC\uC791\uD588\uC5B4\uC694! \uD30C\uC774\uD305! \uD83D\uDCAA\n\n' +
    '\u26A1 +' + (stats?.xp_today ?? 0) + ' XP bugun\n' +
    '\uD83D\uDD25 ' + (stats?.streak ?? 0) + ' kunlik streak!\n' +
    '\uD83D\uDCDA ' + (stats?.lessons_done ?? 0) + ' ta dars tugatdim\n\n' +
    'Siz ham boshlang: ' + botUrl;

  function share() {
    if (tg?.openTelegramLink) {
      tg.openTelegramLink('https://t.me/share/url?url=' + encodeURIComponent(botUrl) + '&text=' + encodeURIComponent(text));
    }
  }

  function shareStory() {
    if (tg?.shareToStory) {
      tg.shareToStory('https://koreysapp-qql1.vercel.app/og-image.png', {
        text: '\uD83C\uDDF0\uD83C\uDDF7 KoreysApp \uD55C\uAD6D\uC5B4 \uD30C\uC774\uD305!',
        widget_link: { url: botUrl, name: 'KoreysApp' }
      });
    } else share();
  }

  function copy() {
    navigator.clipboard?.writeText(text);
    tg?.showAlert?.('Nusxa olindi!');
  }

  const STATS = [
    { ico: '⚡', val: '+' + (stats?.xp_today ?? 0), lbl: 'XP bugun',  col: '#fde047' },
    { ico: '🔥', val: stats?.streak ?? 0,            lbl: 'Streak',    col: '#fb923c' },
    { ico: '📚', val: stats?.lessons_done ?? 0,      lbl: 'Darslar',   col: '#34d399' },
  ];

  return (
    <div style={s.page}>
      <div style={s.orb1} /><div style={s.orb2} /><div style={s.orb3} />

      <div style={s.content}>
        <div style={s.pageTitle}>Natijani ulashing</div>
        <div style={s.pageSub}>Do'stlaringizni ham o'rganishga taklif qiling! 🚀</div>

        {/* Share card */}
        <div style={s.card}>
          <div style={s.cardStripe} />
          <div style={s.cardOrb1} /><div style={s.cardOrb2} />
          <div style={s.cardTop}>
            <div style={s.flag}>🇰🇷</div>
            <div>
              <div style={s.cardTitle}>KoreysApp</div>
              <div style={s.cardSub}>TOPIK · EPS-TOPIK</div>
            </div>
          </div>
          <div style={s.cardKr}>
            안녕하세요! 한국어 학습을 시작했어요! 파이팅! 💪
          </div>
          <div style={s.divider} />
          <div style={s.statsRow}>
            {STATS.map((item, i) => (
              <div key={i} style={s.statItem}>
                <div style={{ ...s.statIco, background: item.col + '22', border: '1px solid ' + item.col + '44' }}>
                  <span style={{ fontSize: 16 }}>{item.ico}</span>
                </div>
                <div style={s.statVal}>{item.val}</div>
                <div style={s.statLbl}>{item.lbl}</div>
              </div>
            ))}
          </div>
          <div style={s.divider} />
          <div style={s.cardCta}>O'rganmoqchimisiz?</div>
          <div style={s.cardLink}>t.me/koreystili_topikkaBot</div>
        </div>

        {/* User info */}
        <div style={s.userCard}>
          <div style={s.userAv}>{(user.name || 'U').charAt(0).toUpperCase()}</div>
          <div>
            <div style={s.userName}>{user.name}</div>
            {user.is_premium && <div style={s.userPrem}>👑 Premium</div>}
          </div>
        </div>

        {/* Buttons */}
        <button style={s.btnStory} onClick={shareStory}>
          📱 Story ga qo'yish
        </button>
        <div style={s.btnRow}>
          <button style={s.btnShare} onClick={share}>📤 Telegram</button>
          <button style={s.btnCopy} onClick={copy}>📋 Nusxa</button>
        </div>

        <div style={s.note}>
          Do'stingiz siz orqali Premium olsa, sizga ham bepul Premium beriladi! 🎁
        </div>
      </div>
    </div>
  );
}

const glass = { background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(124,58,237,0.14)' };

const s = {
  page: { fontFamily: "'Nunito',sans-serif", minHeight: '100vh', background: 'linear-gradient(160deg,#f8f7ff 0%,#eef2ff 35%,#f0f9ff 65%,#f5f3ff 100%)', position: 'relative', overflow: 'hidden', paddingBottom: 24 },
  orb1: { position: 'fixed', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.18),transparent)', top: -80, right: -60, pointerEvents: 'none', zIndex: 0 },
  orb2: { position: 'fixed', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.14),transparent)', bottom: 100, left: -60, pointerEvents: 'none', zIndex: 0 },
  orb3: { position: 'fixed', width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,139,250,0.2),transparent)', top: 200, left: -30, pointerEvents: 'none', zIndex: 0 },
  content: { position: 'relative', zIndex: 1, padding: '16px 16px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' },

  pageTitle: { fontSize: 20, fontWeight: 900, color: '#1e1b4b', marginBottom: 4, alignSelf: 'flex-start' },
  pageSub:   { fontSize: 12, color: '#6b7280', marginBottom: 18, alignSelf: 'flex-start' },

  card:      { width: '100%', maxWidth: 360, background: 'linear-gradient(135deg,rgba(109,40,217,0.86),rgba(37,99,235,0.82))', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 24, padding: '20px 20px 22px', position: 'relative', overflow: 'hidden', marginBottom: 12, boxShadow: '0 8px 32px rgba(124,58,237,0.22)' },
  cardStripe:{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#a78bfa,#60a5fa,#34d399)', borderRadius: '24px 24px 0 0' },
  cardOrb1:  { position: 'absolute', width: 110, height: 110, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.1),transparent)', top: -25, right: -15, pointerEvents: 'none' },
  cardOrb2:  { position: 'absolute', width: 75, height: 75, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,243,208,0.12),transparent)', bottom: -15, left: 30, pointerEvents: 'none' },

  cardTop:   { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, position: 'relative' },
  flag:      { fontSize: 38 },
  cardTitle: { fontSize: 24, fontWeight: 900, color: '#fff', lineHeight: 1 },
  cardSub:   { fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 3 },
  cardKr:    { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 10, lineHeight: 1.5, fontFamily: "'Noto Sans KR',sans-serif", position: 'relative' },
  divider:   { height: 1, background: 'rgba(255,255,255,0.15)', margin: '10px 0', position: 'relative' },

  statsRow:  { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, position: 'relative' },
  statItem:  { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 },
  statIco:   { width: 38, height: 38, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  statVal:   { fontSize: 16, fontWeight: 900, color: '#fff' },
  statLbl:   { fontSize: 9, color: 'rgba(255,255,255,0.6)' },

  cardCta:   { fontSize: 12, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginTop: 4, position: 'relative' },
  cardLink:  { fontSize: 13, fontWeight: 800, color: '#fff', textAlign: 'center', marginTop: 3, position: 'relative' },

  userCard: { ...glass, width: '100%', maxWidth: 360, borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 },
  userAv:   { width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', color: '#fff', fontSize: 15, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  userName: { fontSize: 13, fontWeight: 700, color: '#1e1b4b' },
  userPrem: { fontSize: 10, color: '#b45309', fontWeight: 600, marginTop: 1 },

  btnStory: { width: '100%', maxWidth: 360, padding: '13px 0', background: 'linear-gradient(90deg,#6d28d9,#7c3aed)', color: '#fff', border: 'none', borderRadius: 14, fontSize: 14, fontWeight: 800, cursor: 'pointer', marginBottom: 8, boxShadow: '0 4px 16px rgba(109,40,217,0.3)' },
  btnRow:   { display: 'flex', gap: 8, width: '100%', maxWidth: 360, marginBottom: 12 },
  btnShare: { flex: 3, padding: '12px 0', background: 'linear-gradient(90deg,#7c3aed,#3b82f6)', color: '#fff', border: 'none', borderRadius: 13, fontSize: 13, fontWeight: 800, cursor: 'pointer' },
  btnCopy:  { flex: 1, padding: '12px 0', ...glass, color: '#7c3aed', borderRadius: 13, fontSize: 13, fontWeight: 700, cursor: 'pointer' },

  note: { ...glass, width: '100%', maxWidth: 360, borderRadius: 13, padding: '10px 14px', fontSize: 11, color: '#4c1d95', textAlign: 'center', lineHeight: 1.5, background: 'rgba(237,233,254,0.6)', borderColor: 'rgba(124,58,237,0.2)' },
};
