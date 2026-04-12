import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { api } from '../api';

export default function Onboarding() {
  const { setTrack, setUser, setStats } = useStore();
  const nav = useNavigate();

  async function choose(track) {
    setTrack(track);
    // Backend yo'q — test user
    setUser({ id: 1, name: 'Test User', telegram_id: 123, is_premium: false });
    setStats({ xp: 0, xp_today: 0, streak: 0, lessons_done: 0, freeze_days: 0 });
    nav('/learn');
  }

  return (
    <div style={s.page}>
      <div style={s.flag}>🇰🇷</div>
      <h1 style={s.title}>KoreysApp</h1>
      <p style={s.sub}>O'zingizga mos yo'nalishni tanlang</p>
      <div style={s.cards}>
        <button style={s.card} onClick={() => choose('TOPIK')}>
          <span style={s.cardIcon}>📚</span>
          <div style={s.cardTitle}>TOPIK</div>
          <div style={s.cardDesc}>Koreyada o'qish uchun</div>
          <div style={s.cardTag}>Grammatika · Lug'at · Test</div>
        </button>
        <button style={s.card} onClick={() => choose('EPS-TOPIK')}>
          <span style={s.cardIcon}>💼</span>
          <div style={s.cardTitle}>EPS-TOPIK</div>
          <div style={s.cardDesc}>Koreyada ishlash uchun</div>
          <div style={s.cardTag}>Ish · Xavfsizlik · Huquq</div>
        </button>
      </div>
      <div style={s.footer}>done by V.Oybek</div>
    </div>
  );
}

const s = {
  page:     { minHeight: '100vh', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', padding: 24, background: '#fff' },
  flag:     { fontSize: 64, marginBottom: 12 },
  title:    { fontSize: 32, fontWeight: 800, color: '#1a1a1a', marginBottom: 8 },
  sub:      { fontSize: 16, color: '#666', marginBottom: 40, textAlign: 'center' },
  cards:    { display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 360 },
  card:     { background: '#F8F9FF', border: '2px solid #E8EBFF', borderRadius: 16,
              padding: '24px 20px', cursor: 'pointer', textAlign: 'left', width: '100%' },
  cardIcon: { fontSize: 36, display: 'block', marginBottom: 8 },
  cardTitle:{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 },
  cardDesc: { fontSize: 14, color: '#444', marginBottom: 8 },
  cardTag:  { fontSize: 12, color: '#888', background: '#EFEFEF', borderRadius: 8,
              padding: '4px 8px', display: 'inline-block' },
  footer:   { position: 'fixed', bottom: 16, fontSize: 11, color: '#CCC' },
};
