import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { api } from '../api';
import { useState } from 'react';

export default function Onboarding() {
  const { setTrack, setUser, setStats } = useStore();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  async function choose(track) {
    setSelected(track);
    setLoading(true);
    setTrack(track);
    try {
      const user = await api.login();
      setUser(user);
      const stats = await api.getStats(user.id);
      setStats(stats);
    } catch (e) {
      console.error(e);
    }
    nav('/home');
  }

  return (
    <div style={s.page}>
      <div style={s.bubble1} />
      <div style={s.bubble2} />
      <div style={s.bubble3} />

      {/* Logo */}
      <div style={s.logoWrap}>
        <div style={s.logoCircle}>
          <div style={s.logoKr}>KR</div>
        </div>
        <div style={s.logoTitle}>KoreysApp</div>
        <div style={s.logoBadge}>TOPIK · EPS-TOPIK</div>
      </div>

      <div style={s.sub}>O'zingizga mos yo'nalishni tanlang</div>

      {/* Cards */}
      <div style={s.cards}>

        {/* TOPIK */}
        <button
          style={{
            ...s.card,
            ...(selected === 'TOPIK' ? s.cardSelected : {}),
            opacity: loading && selected !== 'TOPIK' ? 0.5 : 1,
          }}
          onClick={() => !loading && choose('TOPIK')}>
          <div style={s.cardBubble} />
          <div style={s.cardTop}>
            <div style={s.cardIcoWrap}>
              <div style={s.cardIcoText}>T</div>
            </div>
            <div style={s.cardBadge}>Akademik</div>
          </div>
          <div style={s.cardTitle}>TOPIK</div>
          <div style={s.cardDesc}>Koreyada o'qish va yashash uchun</div>
          <div style={s.cardTags}>
            {['Grammatika', "Lug'at", 'Test', '6 daraja'].map(t => (
              <span key={t} style={s.cardTag}>{t}</span>
            ))}
          </div>
          <div style={s.cardArrow}>Boshlash &rarr;</div>
        </button>

        {/* EPS-TOPIK */}
        <button
          style={{
            ...s.card,
            ...s.cardEps,
            ...(selected === 'EPS-TOPIK' ? s.cardSelected : {}),
            opacity: loading && selected !== 'EPS-TOPIK' ? 0.5 : 1,
          }}
          onClick={() => !loading && choose('EPS-TOPIK')}>
          <div style={{ ...s.cardBubble, background: 'radial-gradient(circle,rgba(134,239,172,0.15),transparent)' }} />
          <div style={s.cardTop}>
            <div style={{ ...s.cardIcoWrap, background: 'rgba(220,252,231,0.8)', border: '1.5px solid rgba(134,239,172,0.5)' }}>
              <div style={{ ...s.cardIcoText, color: '#15803d' }}>E</div>
            </div>
            <div style={{ ...s.cardBadge, background: 'rgba(220,252,231,0.8)', color: '#15803d', borderColor: 'rgba(134,239,172,0.5)' }}>Mehnat</div>
          </div>
          <div style={s.cardTitle}>EPS-TOPIK</div>
          <div style={s.cardDesc}>Koreyada ishlash va mehnat visa uchun</div>
          <div style={s.cardTags}>
            {['Ish', 'Xavfsizlik', 'Huquq', '60 dars'].map(t => (
              <span key={t} style={{ ...s.cardTag, background: 'rgba(220,252,231,0.7)', color: '#15803d', borderColor: 'rgba(134,239,172,0.4)' }}>{t}</span>
            ))}
          </div>
          <div style={{ ...s.cardArrow, color: '#15803d' }}>Boshlash &rarr;</div>
        </button>
      </div>

      {/* Stats */}
      <div style={s.statsRow}>
        {[
          { num: '127+', lbl: 'Darslar' },
          { num: '4500+', lbl: 'Audiolar' },
          { num: '847', lbl: 'Testlar' },
        ].map((item, i) => (
          <div key={i} style={s.statItem}>
            <div style={s.statNum}>{item.num}</div>
            <div style={s.statLbl}>{item.lbl}</div>
          </div>
        ))}
      </div>

      <div style={s.footer}>KoreysApp 2026</div>
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
  page: {
    minHeight: '100vh',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '24px 20px 100px',
    background: 'linear-gradient(160deg,#f0f4ff 0%,#e8f4ff 40%,#f0f0ff 100%)',
    position: 'relative', overflow: 'hidden',
  },
  bubble1: { position: 'absolute', width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle,rgba(147,197,253,0.28),transparent)', top: -80, right: -60, pointerEvents: 'none' },
  bubble2: { position: 'absolute', width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle,rgba(134,239,172,0.22),transparent)', bottom: 80, left: -50, pointerEvents: 'none' },
  bubble3: { position: 'absolute', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle,rgba(196,181,253,0.2),transparent)', top: 120, left: -20, pointerEvents: 'none' },

  logoWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 6, position: 'relative', zIndex: 1 },
  logoCircle: {
    ...glass,
    width: 80, height: 80, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
    boxShadow: '0 8px 32px rgba(99,139,255,0.15)',
  },
  logoKr:    { fontSize: 22, fontWeight: 900, color: '#2563eb' },
  logoTitle: { fontSize: 32, fontWeight: 900, color: '#1e293b', letterSpacing: -0.5 },
  logoBadge: { fontSize: 11, color: '#94a3b8', fontWeight: 600, marginTop: 3 },

  sub: { fontSize: 14, color: '#64748b', marginBottom: 24, textAlign: 'center', position: 'relative', zIndex: 1 },

  cards: { display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 360, position: 'relative', zIndex: 1, marginBottom: 20 },

  card: {
    ...glass,
    borderRadius: 20, padding: '18px 18px 14px',
    cursor: 'pointer', textAlign: 'left', width: '100%',
    position: 'relative', overflow: 'hidden',
    border: '1.5px solid rgba(255,255,255,0.9)',
  },
  cardEps: {
    background: 'rgba(240,253,244,0.65)',
    border: '1.5px solid rgba(134,239,172,0.35)',
  },
  cardSelected: {
    border: '2px solid rgba(59,130,246,0.5)',
    background: 'rgba(219,234,254,0.7)',
    transform: 'scale(0.98)',
  },
  cardBubble: { position: 'absolute', width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle,rgba(147,197,253,0.15),transparent)', top: -15, right: -15, pointerEvents: 'none' },

  cardTop:    { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  cardIcoWrap:{ width: 44, height: 44, borderRadius: 14, background: 'rgba(219,234,254,0.8)', border: '1.5px solid rgba(147,197,253,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardIcoText:{ fontSize: 18, fontWeight: 900, color: '#2563eb' },
  cardBadge:  { fontSize: 10, fontWeight: 700, background: 'rgba(219,234,254,0.8)', color: '#2563eb', border: '1px solid rgba(147,197,253,0.4)', borderRadius: 20, padding: '4px 10px' },

  cardTitle:  { fontSize: 22, fontWeight: 800, color: '#1e293b', marginBottom: 4 },
  cardDesc:   { fontSize: 12, color: '#64748b', marginBottom: 10 },
  cardTags:   { display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 },
  cardTag:    { fontSize: 10, fontWeight: 600, background: 'rgba(219,234,254,0.7)', color: '#2563eb', border: '1px solid rgba(147,197,253,0.4)', borderRadius: 8, padding: '3px 8px' },
  cardArrow:  { fontSize: 12, fontWeight: 800, color: '#2563eb' },

  statsRow:   { display: 'flex', gap: 10, width: '100%', maxWidth: 360, position: 'relative', zIndex: 1, marginBottom: 12 },
  statItem:   { ...glass, flex: 1, borderRadius: 14, padding: '10px 8px', textAlign: 'center' },
  statNum:    { fontSize: 16, fontWeight: 800, color: '#2563eb' },
  statLbl:    { fontSize: 9, color: '#94a3b8', marginTop: 2 },

  footer: { position: 'fixed', bottom: 14, fontSize: 10, color: '#cbd5e1', fontWeight: 500 },
};
