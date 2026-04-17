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
  const [activeTab, setActiveTab] = useState('card');

  useEffect(() => {
    api.getCardInfo().then(setCardInfo).catch(() => {
      setCardInfo({
        number: '8600 1234 5678 9012',
        owner: 'Valiev M.',
        bank: 'Humo / Uzcard',
        amount: '29 000',
      });
    });
  }, []);

  function copyCard() {
    const num = cardInfo?.number || '';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(num.replace(/\s/g, ''));
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function openBot() {
    const botUrl = 'https://t.me/koreystili_topikkaBot';
    if (tg?.openTelegramLink) {
      tg.openTelegramLink(botUrl);
    } else {
      window.open(botUrl, '_blank');
    }
  }

  function shareReferral() {
    const refLink = 'https://t.me/koreystili_topikkaBot?start=ref_' + (user?.telegram_id || '');
    const text = "KoreysApp bilan koreys tilini organamiz! Siz ham boshlang: " + refLink;
    if (tg?.openTelegramLink) {
      tg.openTelegramLink('https://t.me/share/url?url=' + encodeURIComponent(refLink) + '&text=' + encodeURIComponent(text));
    }
  }

  return (
    <div style={s.page}>
      <div style={s.crown}>👑</div>
      <div style={s.title}>Premium</div>
      <div style={s.sub}>Barcha imkoniyatlarni oching</div>

      <div style={s.features}>
        {['127+ dars — TOPIK va EPS-TOPIK', 'Audio talaffuz — har bir so\'z', 'Grammatika tushuntirishlari', 'Streak Freeze 10 kun'].map((f) => (
          <div key={f} style={s.feature}>✅ {f}</div>
        ))}
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        <button style={{ ...s.tab, ...(activeTab === 'card' ? s.tabActive : {}) }}
          onClick={() => setActiveTab('card')}>💳 Karta</button>
        <button style={{ ...s.tab, ...(activeTab === 'stars' ? s.tabActive : {}) }}
          onClick={() => setActiveTab('stars')}>⭐ Stars</button>
        <button style={{ ...s.tab, ...(activeTab === 'ref' ? s.tabActive : {}) }}
          onClick={() => setActiveTab('ref')}>👥 Referral</button>
      </div>

      {/* KARTA TO'LOV */}
      {activeTab === 'card' && (
        <div style={s.method}>
          <div style={s.methodHeader}>
            <div style={s.methodTitle}>Uzcard / Humo orqali</div>
            <div style={s.methodPrice}>{cardInfo?.amount || '29 000'} so'm</div>
          </div>

          {/* Karta */}
          <div style={s.card}>
            <div style={s.cardBank}>{cardInfo?.bank || 'Humo / Uzcard'}</div>
            <div style={s.cardNumber}>{cardInfo?.number || '8600 •••• •••• ••••'}</div>
            <div style={s.cardOwner}>{cardInfo?.owner || 'Karta egasi'}</div>
          </div>

          {/* Nusxalash tugmasi */}
          <button style={s.copyBtn} onClick={copyCard}>
            {copied ? '✅ Nusxalandi!' : '📋 Karta raqamini nusxalash'}
          </button>

          {/* Ko'rsatma */}
          <div style={s.instruction}>
            <div style={s.instrTitle}>📌 Qanday to'lash kerak?</div>
            <div style={s.instrStep}>1️⃣ Yuqoridagi karta raqamini nusxalang</div>
            <div style={s.instrStep}>2️⃣ Humo yoki Click/Payme orqali <strong>{cardInfo?.amount || '29 000'} so'm</strong> o'tkazing</div>
            <div style={s.instrStep}>3️⃣ To'lov chekining screenshotini oling</div>
            <div style={s.instrStep}>4️⃣ Botga screenshotni yuboring</div>
          </div>

          {/* Asosiy tugma */}
          <div style={s.alertBox}>
            <div style={s.alertText}>
              Ushbu kartaga pulni o'tkazing va Screenshot jo'nating!
            </div>
          </div>

          <button style={s.btnCard} onClick={openBot}>
            📸 Screenshotni botga yuborish
          </button>

          <div style={s.note}>Admin 5-30 daqiqa ichida Premium ochadi</div>
        </div>
      )}

      {/* TELEGRAM STARS */}
      {activeTab === 'stars' && (
        <div style={s.method}>
          <div style={s.methodHeader}>
            <div style={s.methodTitle}>Telegram Stars</div>
            <div style={s.methodPrice}>150 ⭐</div>
          </div>
          <div style={s.starsInfo}>
            Telegram Stars orqali to'lash — darhol faollashadi, admin kutish shart emas!
          </div>
          <button style={s.btnStar} onClick={openBot}>
            ⭐ Botda Stars bilan to'lash
          </button>
          <div style={s.note}>To'lovdan so'ng Premium avtomatik faollashadi</div>
        </div>
      )}

      {/* REFERRAL */}
      {activeTab === 'ref' && (
        <div style={s.method}>
          <div style={s.methodHeader}>
            <div style={s.methodTitle}>Do'stlarni taklif qiling</div>
            <div style={s.methodPrice}>Bepul!</div>
          </div>
          <div style={s.refInfo}>
            <div style={s.refStep}>👥 3 ta do'stingizni taklif qiling</div>
            <div style={s.refStep}>💳 Ular Premium sotib olsin</div>
            <div style={s.refStep}>🎁 Sizga 7 oy bepul Premium!</div>
          </div>
          <button style={s.btnRef} onClick={shareReferral}>
            🔗 Do'stlarga havola yuborish
          </button>
          <div style={s.note}>Botda /referral — holatingizni koring</div>
        </div>
      )}
    </div>
  );
}

const s = {
  page:       { padding: '20px 16px 60px', minHeight: '100vh', textAlign: 'center' },
  crown:      { fontSize: 50, marginBottom: 6 },
  title:      { fontSize: 26, fontWeight: 800, color: '#1a1a1a', marginBottom: 4 },
  sub:        { fontSize: 14, color: '#666', marginBottom: 16 },
  features:   { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20, textAlign: 'left',
                background: '#F8F9FF', borderRadius: 12, padding: '12px 14px' },
  feature:    { fontSize: 14, color: '#333' },

  tabs:       { display: 'flex', gap: 8, marginBottom: 16 },
  tab:        { flex: 1, padding: '10px 0', border: '1.5px solid #E0E0E0', borderRadius: 10,
                background: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#666' },
  tabActive:  { background: '#1976D2', color: '#fff', border: '1.5px solid #1976D2' },

  method:     { border: '1.5px solid #E8EBFF', borderRadius: 14, padding: 16, textAlign: 'left' },
  methodHeader:{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  methodTitle:{ fontSize: 15, fontWeight: 700, color: '#1a1a1a' },
  methodPrice:{ fontSize: 15, fontWeight: 700, color: '#1976D2' },

  card:       { background: 'linear-gradient(135deg, #1565C0, #0D47A1)',
                borderRadius: 14, padding: '18px 20px', marginBottom: 12, color: '#fff' },
  cardBank:   { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 12, fontWeight: 600 },
  cardNumber: { fontSize: 20, fontWeight: 800, letterSpacing: 2, marginBottom: 12 },
  cardOwner:  { fontSize: 13, color: 'rgba(255,255,255,0.8)' },

  copyBtn:    { width: '100%', padding: '11px 0', background: '#E3F2FD', color: '#1565C0',
                border: '1.5px solid #90CAF9', borderRadius: 10, fontSize: 14,
                fontWeight: 600, cursor: 'pointer', marginBottom: 14 },

  instruction:{ background: '#FFF8E1', borderRadius: 10, padding: '12px 14px', marginBottom: 14 },
  instrTitle: { fontSize: 13, fontWeight: 700, color: '#F57F17', marginBottom: 8 },
  instrStep:  { fontSize: 13, color: '#555', padding: '3px 0', lineHeight: 1.5 },

  alertBox:   { background: '#FFEBEE', border: '1.5px solid #EF9A9A', borderRadius: 10,
                padding: '12px 14px', marginBottom: 12, textAlign: 'center' },
  alertText:  { fontSize: 14, fontWeight: 700, color: '#C62828', lineHeight: 1.5 },

  btnCard:    { width: '100%', padding: 14, background: '#1976D2', color: '#fff',
                border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
                cursor: 'pointer', marginBottom: 8 },
  btnStar:    { width: '100%', padding: 14, background: '#FFB300', color: '#fff',
                border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
                cursor: 'pointer', marginBottom: 8 },
  btnRef:     { width: '100%', padding: 14, background: '#2ECC71', color: '#fff',
                border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
                cursor: 'pointer', marginBottom: 8 },

  note:       { fontSize: 12, color: '#999', textAlign: 'center' },

  starsInfo:  { fontSize: 13, color: '#555', background: '#FFF8E1', borderRadius: 8,
                padding: '10px 12px', marginBottom: 14, lineHeight: 1.6 },

  refInfo:    { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 },
  refStep:    { fontSize: 14, color: '#333', padding: '6px 10px',
                background: '#F0F7FF', borderRadius: 8 },
};
