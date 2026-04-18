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
    api.getCardInfo().then(setCardInfo).catch(() => setCardInfo({ number: '5614681264029681', owner: 'V***** O**** M.', bank: 'Uzcard', amount: '29 000' }));
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

  const tabs = ['card', 'stars', 'ref'];
  const tabLabels = ['💳 Karta', '⭐ Stars', '👥 Referral'];

  return (
    <div style={s.page}>
      <div style={s.bubble1} /><div style={s.bubble2} /><div style={s.bubble3} />

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroStripe} />
        <div style={s.heroBubble} />
        <div style={s.crown}>👑</div>
        <div style={s.heroTitle}>Premium oling!</div>
        <div style={s.heroSub}>127+ dars, audio, grammatika, streak freeze</div>
        <div style={s.heroPriceBadge}>
          <span style={s.heroPrice}>29 000 so'm</span>
          <span style={s.heroDuration}>4 oyga</span>
        </div>
        <div style={s.feats}>
          {[
            { dot: '#4ade80', text: '127+ dars — TOPIK va EPS-TOPIK' },
            { dot: '#fde047', text: 'Audio talaffuz — har bir so\'z' },
            { dot: '#c4b5fd', text: 'Grammatika tushuntirishlari' },
            { dot: '#93c5fd', text: 'Streak Freeze 10 kun' },
          ].map((f, i) => (
            <div key={i} style={s.feat}>
              <div style={{ ...s.featDot, background: f.dot }} />
              <span style={s.featText}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        {tabs.map((t, i) => (
          <button key={t} style={{ ...s.tab, ...(tab === t ? s.tabActive : {}) }} onClick={() => setTab(t)}>
            {tabLabels[i]}
          </button>
        ))}
      </div>

      {/* CARD TAB */}
      {tab === 'card' && (
        <div style={s.payCard}>
          <div style={s.payHead}>
            <div style={s.payIco}>💳</div>
            <div>
              <div style={s.payTitle}>Uzcard / Humo orqali</div>
              <div style={s.paySub}>Admin 5-30 daqiqada tasdiqlaydi</div>
            </div>
            <div style={s.payPrice}>{cardInfo?.amount || '29 000'} so'm</div>
          </div>

          {/* Bank card */}
          <div style={s.bankCard}>
            <div style={s.bankBubble} />
            <div style={s.bankName}>{cardInfo?.bank || 'Uzcard'}</div>
            <div style={s.bankNum}>{cardInfo?.number || '5614 6812 6402 9681'}</div>
            <div style={s.bankOwner}>{cardInfo?.owner || 'V***** O**** M.'}</div>
          </div>

          {/* Alert */}
          <div style={s.alert}>
            <div style={s.alertText}>Ushbu kartaga pulni o'tkazing va Screenshot jo'nating!</div>
          </div>

          <div style={s.steps}>
            {['Karta raqamini nusxalang', cardInfo?.amount + ' so\'m o\'tkazing', 'To\'lov chekini screenshot oling', 'Botga screenshot yuboring'].map((step, i) => (
              <div key={i} style={s.step}>
                <div style={s.stepNum}>{i + 1}</div>
                <div style={s.stepText}>{step}</div>
              </div>
            ))}
          </div>

          <button style={s.copyBtn} onClick={copyCard}>
            {copied ? '✓ Nusxalandi!' : '📋 Karta raqamini nusxalash'}
          </button>
          <button style={s.mainBtn} onClick={openBot}>📸 Screenshotni botga yuborish</button>
        </div>
      )}

      {/* STARS TAB */}
      {tab === 'stars' && (
        <div style={s.payCard}>
          <div style={{ ...s.starsHero, background: 'linear-gradient(135deg,rgba(253,224,71,0.15),rgba(245,158,11,0.1))' }}>
            <div style={s.starsIcon}>⭐</div>
            <div style={s.starsTitle}>Telegram Stars</div>
            <div style={s.starsPrice}>150 ⭐</div>
            <div style={s.starsSub}>To'lovdan so'ng Premium avtomatik faollashadi</div>
          </div>
          <button style={{ ...s.mainBtn, background: 'linear-gradient(90deg,#f59e0b,#fde047)', color: '#111' }} onClick={openBot}>
            ⭐ Botda Stars bilan to'lash
          </button>
        </div>
      )}

      {/* REFERRAL TAB */}
      {tab === 'ref' && (
        <div style={s.payCard}>
          <div style={s.refHero}>
            <div style={s.refIcon}>👥</div>
            <div style={s.refTitle}>3 do'st = Bepul Premium!</div>
            <div style={s.refSub}>Do'stlaringiz Premium sotib olsa, sizga 4 oylik Premium bepul beriladi</div>
          </div>
          <div style={s.refSteps}>
            {["Dostlaringizga link yuboring", "Ular Premium sotib olsin", "Sizga bepul Premium beriladi!"].map((t, i) => (
              <div key={i} style={s.refStep}>
                <div style={{ ...s.refStepNum, background: ['rgba(219,234,254,0.8)', 'rgba(220,252,231,0.8)', 'rgba(237,233,254,0.8)'][i], color: ['#2563eb', '#15803d', '#7c3aed'][i] }}>{i + 1}</div>
                <div style={s.refStepText}>{t}</div>
              </div>
            ))}
          </div>
          <button style={{ ...s.mainBtn, background: 'linear-gradient(90deg,#4ade80,#22c55e)', color: '#111' }} onClick={shareRef}>
            🔗 Havolani ulashish
          </button>
          <button style={s.copyBtn} onClick={openBot}>Botda holatni tekshirish</button>
        </div>
      )}
    </div>
  );
}

const glass = { background: 'rgba(255,255,255,0.62)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1.5px solid rgba(255,255,255,0.9)' };

const s = {
  page: { padding: '16px 16px 100px', minHeight: '100vh', background: 'linear-gradient(160deg,#f0f4ff,#e8f4ff 50%,#f0f0ff)', position: 'relative', overflow: 'hidden' },
  bubble1: { position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle,rgba(147,197,253,0.25),transparent)', top: -50, right: -50, pointerEvents: 'none' },
  bubble2: { position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle,rgba(134,239,172,0.2),transparent)', top: 300, left: -40, pointerEvents: 'none' },
  bubble3: { position: 'absolute', width: 90, height: 90, borderRadius: '50%', background: 'radial-gradient(circle,rgba(196,181,253,0.2),transparent)', bottom: 200, right: -20, pointerEvents: 'none' },

  hero: { borderRadius: 22, padding: '16px 16px 18px', marginBottom: 14, position: 'relative', overflow: 'hidden', zIndex: 1, background: 'linear-gradient(135deg,rgba(17,17,17,0.88),rgba(26,26,46,0.88))', border: '1.5px solid rgba(255,255,255,0.15)' },
  heroStripe: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#3b82f6,#4ade80,#fde047,#a78bfa)', borderRadius: '22px 22px 0 0' },
  heroBubble: { position: 'absolute', width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle,rgba(253,224,71,0.15),transparent)', top: -15, right: -15, pointerEvents: 'none' },
  crown: { fontSize: 26, marginBottom: 6 },
  heroTitle: { fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 3 },
  heroSub: { fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 10 },
  heroPriceBadge: { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg,rgba(253,224,71,0.25),rgba(163,230,53,0.2))', border: '1.5px solid rgba(253,224,71,0.4)', borderRadius: 12, padding: '8px 14px', marginTop: 4 },
  heroPrice: { fontSize: 20, fontWeight: 900, color: '#fde047', letterSpacing: '-0.5px' },
  heroDuration: { fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '3px 8px' },
  feats: { display: 'flex', flexDirection: 'column', gap: 6 },
  feat: { display: 'flex', alignItems: 'center', gap: 8 },
  featDot: { width: 7, height: 7, borderRadius: '50%', flexShrink: 0 },
  featText: { fontSize: 11, color: 'rgba(255,255,255,0.8)' },

  tabs: { display: 'flex', gap: 7, marginBottom: 12, position: 'relative', zIndex: 1 },
  tab: { flex: 1, padding: '9px 0', borderRadius: 12, background: 'rgba(255,255,255,0.55)', border: '1.5px solid rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 700, cursor: 'pointer', color: '#64748b' },
  tabActive: { background: 'linear-gradient(135deg,#3b82f6,#0ea5e9)', border: '1.5px solid rgba(59,130,246,0.3)', color: '#fff' },

  payCard: { ...glass, borderRadius: 18, padding: '14px', position: 'relative', zIndex: 1 },
  payHead: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 },
  payIco: { width: 34, height: 34, borderRadius: 10, background: 'rgba(219,234,254,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 },
  payTitle: { fontSize: 13, fontWeight: 700, color: '#1e293b' },
  paySub: { fontSize: 9, color: '#94a3b8', marginTop: 1 },
  payPriceWrap: { marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 },
  payPrice: { fontSize: 14, fontWeight: 900, color: '#2563eb' },
  payDuration: { fontSize: 9, fontWeight: 700, background: 'rgba(219,234,254,0.9)', color: '#2563eb', borderRadius: 6, padding: '2px 6px' },

  bankCard: { background: 'linear-gradient(135deg,#1d4ed8,#0ea5e9)', borderRadius: 14, padding: '13px 15px', marginBottom: 10, position: 'relative', overflow: 'hidden' },
  bankBubble: { position: 'absolute', width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', top: -15, right: -10, pointerEvents: 'none' },
  bankName: { fontSize: 9, color: 'rgba(255,255,255,0.55)', marginBottom: 8 },
  bankNum: { fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: 2, marginBottom: 6 },
  bankOwner: { fontSize: 10, color: 'rgba(255,255,255,0.75)' },

  alert: { background: 'linear-gradient(90deg,rgba(254,226,226,0.8),rgba(237,233,254,0.7))', border: '1.5px solid rgba(252,165,165,0.5)', borderRadius: 11, padding: '10px 12px', marginBottom: 12, textAlign: 'center' },
  alertText: { fontSize: 11, fontWeight: 700, color: '#be185d', lineHeight: 1.5 },

  steps: { display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 13 },
  step: { display: 'flex', alignItems: 'center', gap: 9 },
  stepNum: { width: 22, height: 22, borderRadius: '50%', background: 'rgba(219,234,254,0.8)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 },
  stepText: { fontSize: 11, color: '#475569' },

  copyBtn: { width: '100%', padding: '10px 0', background: 'rgba(219,234,254,0.8)', color: '#2563eb', border: '1.5px solid rgba(147,197,253,0.5)', borderRadius: 11, fontSize: 12, fontWeight: 700, cursor: 'pointer', marginBottom: 7 },
  mainBtn: { width: '100%', padding: '12px 0', background: 'linear-gradient(90deg,#3b82f6,#0ea5e9)', color: '#fff', border: 'none', borderRadius: 11, fontSize: 13, fontWeight: 800, cursor: 'pointer', marginBottom: 7 },

  starsHero: { borderRadius: 14, padding: 16, marginBottom: 14, textAlign: 'center', border: '1.5px solid rgba(253,224,71,0.3)' },
  starsIcon: { fontSize: 32, marginBottom: 6 },
  starsTitle: { fontSize: 15, fontWeight: 800, color: '#1e293b', marginBottom: 4 },
  starsPrice: { fontSize: 20, fontWeight: 900, color: '#b45309', marginBottom: 4 },
  starsSub: { fontSize: 11, color: '#94a3b8' },

  refHero: { textAlign: 'center', marginBottom: 14 },
  refIcon: { fontSize: 32, marginBottom: 6 },
  refTitle: { fontSize: 15, fontWeight: 800, color: '#1e293b', marginBottom: 4 },
  refSub: { fontSize: 11, color: '#94a3b8', lineHeight: 1.5 },
  refSteps: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 },
  refStep: { display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px', background: 'rgba(255,255,255,0.6)', borderRadius: 11, border: '1px solid rgba(255,255,255,0.9)' },
  refStepNum: { width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 },
  refStepText: { fontSize: 12, color: '#334155', fontWeight: 500 },
};
