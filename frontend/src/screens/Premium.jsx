import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { useEffect, useState } from 'react';
import { api } from '../api';

const tg = window.Telegram?.WebApp;

export default function Premium() {
  const { user } = useStore();
  const nav = useNavigate();
  const [cardInfo, setCardInfo] = useState(null);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState('card');

  useEffect(() => {
    api.getCardInfo().then(setCardInfo).catch(() =>
      setCardInfo({ number: '5614681264029681', owner: 'V***** O**** M.', bank: 'Uzcard', amount: '29 000' })
    );
  }, []);

  function copyCard() {
    if (navigator.clipboard) navigator.clipboard.writeText((cardInfo?.number || '').replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function openBot() {
    const url = 'https://t.me/koreystili_topikkaBot';
    if (tg?.openTelegramLink) tg.openTelegramLink(url);
    else window.open(url, '_blank');
  }

  function shareRef() {
    const link = 'https://t.me/koreystili_topikkaBot?start=ref_' + (user?.telegram_id || '');
    if (tg?.openTelegramLink) tg.openTelegramLink('https://t.me/share/url?url=' + encodeURIComponent(link));
  }

  const TABS = [['card', "💳 Karta"], ['stars', "⭐ Stars"], ['ref', "👥 Referral"]];
  const FEATS = [
    { ico: '📚', txt: '127+ dars — TOPIK va EPS-TOPIK', col: '#7c3aed' },
    { ico: '🔊', txt: "Audio talaffuz — har bir so'z",   col: '#3b82f6' },
    { ico: '🧠', txt: 'Grammatika tushuntirishlari',    col: '#6d28d9' },
    { ico: '❄️', txt: 'Streak Freeze 10 kun',           col: '#0ea5e9' },
  ];

  return (
    <div style={s.page}>
      <div style={s.orb1} /><div style={s.orb2} /><div style={s.orb3} />

      <div style={s.content}>
        {/* Hero */}
        <div style={s.hero}>
          <div style={s.heroStripe} />
          <div style={s.heroOrb1} /><div style={s.heroOrb2} />
          <div style={s.crown}>👑</div>
          <div style={s.heroTitle}>Premium oling!</div>
          <div style={s.heroSub}>127+ dars, audio, grammatika, streak freeze</div>
          <div style={s.heroPriceBadge}>
            <span style={s.heroPrice}>29 000 so'm</span>
            <span style={s.heroDuration}>4 oyga</span>
          </div>
          <div style={s.feats}>
            {FEATS.map((f, i) => (
              <div key={i} style={s.feat}>
                <div style={{ ...s.featDot, background: f.col }} />
                <span style={s.featTxt}>{f.ico} {f.txt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={s.tabs}>
          {TABS.map(([val, lbl]) => (
            <button key={val} style={{ ...s.tab, ...(tab === val ? s.tabActive : {}) }}
              onClick={() => setTab(val)}>{lbl}</button>
          ))}
        </div>

        {/* CARD */}
        {tab === 'card' && (
          <div style={s.panel}>
            <div style={s.panelHead}>
              <div style={s.panelIco}>💳</div>
              <div>
                <div style={s.panelTitle}>Uzcard / Humo orqali</div>
                <div style={s.panelSub}>Admin 5-30 daqiqada tasdiqlaydi</div>
              </div>
              <div style={s.panelPriceWrap}>
                <div style={s.panelPrice}>{cardInfo?.amount || '29 000'} so'm</div>
                <div style={s.panelPeriod}>4 oyga</div>
              </div>
            </div>

            <div style={s.bankCard}>
              <div style={s.bankOrb} />
              <div style={s.bankName}>{cardInfo?.bank || 'Uzcard'}</div>
              <div style={s.bankNum}>{cardInfo?.number || '5614 6812 6402 9681'}</div>
              <div style={s.bankOwner}>{cardInfo?.owner || 'V***** O**** M.'}</div>
            </div>

            <div style={s.alert}>
              Ushbu kartaga pulni o'tkazing va <b>Screenshot</b> jo'nating!
            </div>

            <div style={s.steps}>
              {['Karta raqamini nusxalang', (cardInfo?.amount || '29 000') + " so'm o'tkazing", "To'lov chekini screenshot oling", 'Botga screenshot yuboring'].map((st, i) => (
                <div key={i} style={s.step}>
                  <div style={s.stepNum}>{i + 1}</div>
                  <div style={s.stepTxt}>{st}</div>
                </div>
              ))}
            </div>

            <button style={s.btnGhost} onClick={copyCard}>
              {copied ? '✓ Nusxalandi!' : '📋 Karta raqamini nusxalash'}
            </button>
            <button style={s.btnMain} onClick={openBot}>📸 Screenshotni botga yuborish</button>
          </div>
        )}

        {/* STARS */}
        {tab === 'stars' && (
          <div style={s.panel}>
            <div style={s.starsBox}>
              <div style={s.starsIco}>⭐</div>
              <div style={s.starsTitle}>Telegram Stars</div>
              <div style={s.starsPrice}>150 ⭐</div>
              <div style={s.starsSub}>To'lovdan so'ng Premium avtomatik faollashadi</div>
            </div>
            <button style={{ ...s.btnMain, background: 'linear-gradient(90deg,#f59e0b,#fbbf24)', color: '#1c1917' }} onClick={openBot}>
              ⭐ Botda Stars bilan to'lash
            </button>
          </div>
        )}

        {/* REFERRAL */}
        {tab === 'ref' && (
          <div style={s.panel}>
            <div style={s.refHero}>
              <div style={s.refIco}>👥</div>
              <div style={s.refTitle}>3 do'st = Bepul Premium!</div>
              <div style={s.refSub}>Do'stlaringiz Premium sotib olsa, sizga 4 oylik Premium bepul beriladi</div>
            </div>
            <div style={s.refSteps}>
              {["Do'stlaringizga link yuboring", 'Ular Premium sotib olsin', 'Sizga bepul Premium beriladi!'].map((t, i) => (
                <div key={i} style={s.refStep}>
                  <div style={{ ...s.refStepNum, background: ['rgba(237,233,254,0.9)', 'rgba(209,250,229,0.9)', 'rgba(254,243,199,0.9)'][i], color: ['#7c3aed', '#059669', '#b45309'][i] }}>{i + 1}</div>
                  <div style={s.refStepTxt}>{t}</div>
                </div>
              ))}
            </div>
            <button style={{ ...s.btnMain, background: 'linear-gradient(90deg,#10b981,#059669)' }} onClick={shareRef}>
              🔗 Havolani ulashish
            </button>
            <button style={s.btnGhost} onClick={openBot}>Botda holatni tekshirish</button>
          </div>
        )}
      </div>
    </div>
  );
}

const glass = { background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(124,58,237,0.14)', boxShadow: '0 2px 16px rgba(124,58,237,0.07)' };

const s = {
  page: { fontFamily: "'Nunito',sans-serif", minHeight: '100vh', background: 'linear-gradient(160deg,#f8f7ff 0%,#eef2ff 35%,#f0f9ff 65%,#f5f3ff 100%)', position: 'relative', overflow: 'hidden', paddingBottom: 24 },
  orb1: { position: 'fixed', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.18),transparent)', top: -80, right: -60, pointerEvents: 'none', zIndex: 0 },
  orb2: { position: 'fixed', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.14),transparent)', top: 300, left: -60, pointerEvents: 'none', zIndex: 0 },
  orb3: { position: 'fixed', width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,139,250,0.2),transparent)', bottom: 100, right: -40, pointerEvents: 'none', zIndex: 0 },
  content: { position: 'relative', zIndex: 1, padding: '16px 16px 0' },

  hero:       { background: 'linear-gradient(135deg,rgba(109,40,217,0.86),rgba(37,99,235,0.82))', borderRadius: 22, padding: '16px 16px 18px', marginBottom: 14, position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(124,58,237,0.22)' },
  heroStripe: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#a78bfa,#60a5fa,#34d399)', borderRadius: '22px 22px 0 0' },
  heroOrb1:   { position: 'absolute', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.1),transparent)', top: -25, right: -20, pointerEvents: 'none' },
  heroOrb2:   { position: 'absolute', width: 70, height: 70, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,243,208,0.12),transparent)', bottom: -10, left: 20, pointerEvents: 'none' },
  crown:      { fontSize: 28, marginBottom: 6, position: 'relative' },
  heroTitle:  { fontSize: 20, fontWeight: 900, color: '#fff', marginBottom: 3, position: 'relative' },
  heroSub:    { fontSize: 11, color: 'rgba(255,255,255,0.55)', marginBottom: 10, position: 'relative' },
  heroPriceBadge: { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.14)', border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: 12, padding: '7px 14px', marginBottom: 12, position: 'relative' },
  heroPrice:  { fontSize: 20, fontWeight: 900, color: '#fde047', letterSpacing: -0.3 },
  heroDuration:{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.1)', borderRadius: 7, padding: '2px 8px' },
  feats:      { display: 'flex', flexDirection: 'column', gap: 7, position: 'relative' },
  feat:       { display: 'flex', alignItems: 'center', gap: 8 },
  featDot:    { width: 7, height: 7, borderRadius: '50%', flexShrink: 0 },
  featTxt:    { fontSize: 11, color: 'rgba(255,255,255,0.82)' },

  tabs:      { display: 'flex', gap: 7, marginBottom: 12 },
  tab:       { flex: 1, padding: '9px 0', borderRadius: 12, background: 'rgba(255,255,255,0.6)', border: '1.5px solid rgba(124,58,237,0.12)', fontSize: 11, fontWeight: 700, cursor: 'pointer', color: '#6b7280' },
  tabActive: { background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', border: 'none', color: '#fff' },

  panel: { ...glass, borderRadius: 18, padding: 14 },

  panelHead:      { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 },
  panelIco:       { width: 36, height: 36, borderRadius: 11, background: 'rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 },
  panelTitle:     { fontSize: 13, fontWeight: 700, color: '#1e1b4b' },
  panelSub:       { fontSize: 9, color: '#6b7280', marginTop: 1 },
  panelPriceWrap: { marginLeft: 'auto', textAlign: 'right' },
  panelPrice:     { fontSize: 14, fontWeight: 900, color: '#7c3aed' },
  panelPeriod:    { fontSize: 9, fontWeight: 700, background: 'rgba(124,58,237,0.1)', color: '#7c3aed', borderRadius: 6, padding: '1px 6px', marginTop: 2, display: 'inline-block' },

  bankCard:  { background: 'linear-gradient(135deg,#5b21b6,#1d4ed8)', borderRadius: 16, padding: '14px 16px', marginBottom: 10, position: 'relative', overflow: 'hidden', boxShadow: '0 4px 20px rgba(91,33,182,0.3)' },
  bankOrb:   { position: 'absolute', width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', top: -20, right: -15, pointerEvents: 'none' },
  bankName:  { fontSize: 9, color: 'rgba(255,255,255,0.5)', marginBottom: 8 },
  bankNum:   { fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: 2, marginBottom: 6 },
  bankOwner: { fontSize: 10, color: 'rgba(255,255,255,0.7)' },

  alert: { background: 'rgba(237,233,254,0.8)', border: '1.5px solid rgba(124,58,237,0.2)', borderRadius: 12, padding: '10px 12px', marginBottom: 12, fontSize: 11, color: '#4c1d95', textAlign: 'center', lineHeight: 1.5 },

  steps:   { display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 13 },
  step:    { display: 'flex', alignItems: 'center', gap: 9 },
  stepNum: { width: 22, height: 22, borderRadius: '50%', background: 'rgba(124,58,237,0.1)', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 },
  stepTxt: { fontSize: 11, color: '#4b5563' },

  btnMain:  { width: '100%', padding: '13px 0', background: 'linear-gradient(90deg,#7c3aed,#3b82f6)', color: '#fff', border: 'none', borderRadius: 13, fontSize: 13, fontWeight: 800, cursor: 'pointer', marginBottom: 7, boxShadow: '0 4px 16px rgba(124,58,237,0.3)' },
  btnGhost: { width: '100%', padding: '11px 0', background: 'rgba(124,58,237,0.08)', color: '#7c3aed', border: '1.5px solid rgba(124,58,237,0.2)', borderRadius: 13, fontSize: 12, fontWeight: 700, cursor: 'pointer', marginBottom: 7 },

  starsBox:   { background: 'rgba(254,243,199,0.7)', border: '1.5px solid rgba(251,191,36,0.3)', borderRadius: 14, padding: 16, marginBottom: 14, textAlign: 'center' },
  starsIco:   { fontSize: 36, marginBottom: 6 },
  starsTitle: { fontSize: 15, fontWeight: 800, color: '#1e1b4b', marginBottom: 4 },
  starsPrice: { fontSize: 22, fontWeight: 900, color: '#b45309', marginBottom: 4 },
  starsSub:   { fontSize: 11, color: '#6b7280' },

  refHero:    { textAlign: 'center', marginBottom: 14 },
  refIco:     { fontSize: 36, marginBottom: 6 },
  refTitle:   { fontSize: 15, fontWeight: 800, color: '#1e1b4b', marginBottom: 4 },
  refSub:     { fontSize: 11, color: '#6b7280', lineHeight: 1.5 },
  refSteps:   { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 },
  refStep:    { display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px', background: 'rgba(255,255,255,0.65)', borderRadius: 12, border: '1px solid rgba(124,58,237,0.1)' },
  refStepNum: { width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 },
  refStepTxt: { fontSize: 12, color: '#374151', fontWeight: 500 },
};
