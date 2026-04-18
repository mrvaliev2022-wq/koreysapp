import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { api } from '../api';

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
    } catch (e) { console.error(e); }
    nav('/home');
  }

  return (
    <div style={s.page}>
      <div style={s.orb1} /><div style={s.orb2} /><div style={s.orb3} /><div style={s.orb4} />

      <div style={s.inner}>
        {/* Logo */}
        <div style={s.logoWrap}>
          <div style={s.logoCircle}>
            <span style={s.logoFlag}>🇰🇷</span>
          </div>
          <div style={s.logoTitle}>KoreysApp</div>
          <div style={s.logoSub}>TOPIK · EPS-TOPIK</div>
        </div>

        <div style={s.sub}>O'zingizga mos yo'nalishni tanlang</div>

        {/* Cards */}
        <div style={s.cards}>
          {/* TOPIK */}
          <button
            style={{
              ...s.card,
              ...(selected === 'TOPIK' ? s.cardSel : {}),
              opacity: loading && selected !== 'TOPIK' ? 0.5 : 1,
            }}
            onClick={() => !loading && choose('TOPIK')}>
            <div style={s.cardInnerOrb} />
            <div style={s.cardTop}>
              <div style={s.cardIco}><span style={s.cardIcoTxt}>T</span></div>
              <div style={s.badge}>Akademik</div>
            </div>
            <div style={s.cardTitle}>TOPIK</div>
            <div style={s.cardDesc}>Koreyada o'qish va yashash uchun</div>
            <div style={s.cardTags}>
              {["Grammatika", "Lug'at", "Test", "6 daraja"].map(t => (
                <span key={t} style={s.tag}>{t}</span>
              ))}
            </div>
            <div style={s.cardArrow}>Boshlash &rarr;</div>
          </button>

          {/* EPS-TOPIK */}
          <button
            style={{
              ...s.card,
              ...s.cardEps,
              ...(selected === 'EPS-TOPIK' ? s.cardSel : {}),
              opacity: loading && selected !== 'EPS-TOPIK' ? 0.5 : 1,
            }}
            onClick={() => !loading && choose('EPS-TOPIK')}>
            <div style={{ ...s.cardInnerOrb, background: 'radial-gradient(circle,rgba(16,185,129,0.15),transparent)' }} />
            <div style={s.cardTop}>
              <div style={{ ...s.cardIco, background: 'rgba(16,185,129,0.1)', border: '1.5px solid rgba(16,185,129,0.25)' }}>
                <span style={{ ...s.cardIcoTxt, color: '#059669' }}>E</span>
              </div>
              <div style={{ ...s.badge, background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.25)' }}>Mehnat</div>
            </div>
            <div style={s.cardTitle}>EPS-TOPIK</div>
            <div style={s.cardDesc}>Koreyada ishlash va mehnat visa uchun</div>
            <div style={s.cardTags}>
              {['Ish', 'Xavfsizlik', 'Huquq', '60 dars'].map(t => (
                <span key={t} style={{ ...s.tag, background: 'rgba(16,185,129,0.08)', color: '#059669', borderColor: 'rgba(16,185,129,0.2)' }}>{t}</span>
              ))}
            </div>
            <div style={{ ...s.cardArrow, color: '#059669' }}>Boshlash &rarr;</div>
          </button>
        </div>

        {/* Stats */}
        <div style={s.statsRow}>
          {[['127+', 'Darslar'], ['4500+', 'Audiolar'], ['847', 'Testlar']].map(([num, lbl]) => (
            <div key={lbl} style={s.statBox}>
              <div style={s.statNum}>{num}</div>
              <div style={s.statLbl}>{lbl}</div>
            </div>
          ))}
        </div>

        <div style={s.footer}>KoreysApp 2026</div>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: '100vh', background: 'linear-gradient(160deg,#f8f7ff 0%,#eef2ff 35%,#f0f9ff 65%,#f5f3ff 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 20px 80px', position: 'relative', overflow: 'hidden', fontFamily: "'Nunito',sans-serif" },
  orb1: { position: 'absolute', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.18),transparent)', top: -80, right: -60, pointerEvents: 'none' },
  orb2: { position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.14),transparent)', top: 200, left: -60, pointerEvents: 'none' },
  orb3: { position: 'absolute', width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,139,250,0.2),transparent)', bottom: 160, right: -40, pointerEvents: 'none' },
  orb4: { position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle,rgba(96,165,250,0.12),transparent)', bottom: 80, left: 20, pointerEvents: 'none' },
  inner: { position: 'relative', zIndex: 1, width: '100%', maxWidth: 380, display: 'flex', flexDirection: 'column', alignItems: 'center' },

  logoWrap:   { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 8 },
  logoCircle: { width: 76, height: 76, borderRadius: '50%', background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(124,58,237,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, boxShadow: '0 4px 24px rgba(124,58,237,0.12)' },
  logoFlag:   { fontSize: 38 },
  logoTitle:  { fontSize: 30, fontWeight: 900, color: '#1e1b4b', letterSpacing: -0.5 },
  logoSub:    { fontSize: 11, color: '#6b7280', fontWeight: 600, marginTop: 3, letterSpacing: 0.3 },

  sub: { fontSize: 14, color: '#6b7280', marginBottom: 20, textAlign: 'center' },

  cards: { display: 'flex', flexDirection: 'column', gap: 12, width: '100%', marginBottom: 18 },
  card: {
    background: 'rgba(255,255,255,0.72)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1.5px solid rgba(124,58,237,0.15)',
    borderRadius: 20, padding: '18px 18px 14px',
    cursor: 'pointer', textAlign: 'left', width: '100%',
    position: 'relative', overflow: 'hidden',
    boxShadow: '0 2px 16px rgba(124,58,237,0.08)',
  },
  cardEps: { background: 'rgba(240,253,244,0.7)', border: '1.5px solid rgba(16,185,129,0.18)' },
  cardSel: { border: '2px solid rgba(124,58,237,0.5)', transform: 'scale(0.98)' },
  cardInnerOrb: { position: 'absolute', width: 90, height: 90, borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.1),transparent)', top: -20, right: -15, pointerEvents: 'none' },

  cardTop:    { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cardIco:    { width: 42, height: 42, borderRadius: 13, background: 'rgba(124,58,237,0.1)', border: '1.5px solid rgba(124,58,237,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardIcoTxt: { fontSize: 17, fontWeight: 900, color: '#7c3aed' },
  badge:      { fontSize: 10, fontWeight: 700, background: 'rgba(124,58,237,0.09)', color: '#7c3aed', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 20, padding: '4px 11px' },

  cardTitle:  { fontSize: 22, fontWeight: 900, color: '#1e1b4b', marginBottom: 4 },
  cardDesc:   { fontSize: 12, color: '#6b7280', marginBottom: 10 },
  cardTags:   { display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 },
  tag:        { fontSize: 10, fontWeight: 600, background: 'rgba(124,58,237,0.07)', color: '#7c3aed', border: '1px solid rgba(124,58,237,0.15)', borderRadius: 8, padding: '3px 8px' },
  cardArrow:  { fontSize: 12, fontWeight: 800, color: '#7c3aed' },

  statsRow: { display: 'flex', gap: 8, width: '100%', marginBottom: 16 },
  statBox:  { flex: 1, background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(124,58,237,0.12)', borderRadius: 14, padding: '10px 8px', textAlign: 'center' },
  statNum:  { fontSize: 16, fontWeight: 800, color: '#7c3aed' },
  statLbl:  { fontSize: 9, color: '#6b7280', marginTop: 2 },

  footer: { fontSize: 10, color: '#d1d5db', fontWeight: 500 },
};
