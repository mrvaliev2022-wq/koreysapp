import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../store';

const NAV = [
  { path: '/home',        icon: '🏠', label: 'Bosh' },
  { path: '/learn',       icon: '📚', label: 'Darslar' },
  { path: null,           fab: true },
  { path: '/leaderboard', icon: '🏆', label: 'Reyting' },
  { path: '/profile',     icon: '👤', label: 'Profil' },
];

export default function BottomNav() {
  const nav = useNavigate();
  const loc = useLocation();
  const { lessons } = useStore();

  function handleFab() {
    const lessonMatch = loc.pathname.match(/\/lesson\/(\d+)/);
    const testMatch   = loc.pathname.match(/\/test\/(\d+)/);
    if (lessonMatch || testMatch) {
      window.dispatchEvent(new CustomEvent('fab_next'));
      return;
    }
    nav('/learn');
  }

  const active = (path) => loc.pathname === path;

  return (
    <nav style={s.nav}>
      {NAV.map((item, i) => item.fab ? (
        <button key={i} style={s.fab} onClick={handleFab}>▶</button>
      ) : (
        <button key={i} style={s.item} onClick={() => nav(item.path)}>
          <div style={{ ...s.iconWrap, ...(active(item.path) ? s.iconWrapActive : {}) }}>
            <span style={{ fontSize: 22, opacity: active(item.path) ? 1 : 0.45 }}>{item.icon}</span>
          </div>
          <span style={{ ...s.lbl, ...(active(item.path) ? s.lblActive : {}) }}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

const s = {
  nav:  { position: 'fixed', bottom: 0, left: 0, right: 0, height: 68, background: 'rgba(248,247,255,0.94)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderTop: '1px solid rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-around', zIndex: 100, padding: '0 8px 8px', fontFamily: "'Nunito',sans-serif" },
  item: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: 1, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' },
  iconWrap:       { width: 38, height: 26, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' },
  iconWrapActive: { background: 'rgba(124,58,237,0.1)' },
  lbl:       { fontSize: 9, color: '#6b7280', fontWeight: 500 },
  lblActive: { color: '#7c3aed', fontWeight: 700 },
  fab:  { width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 20, marginTop: -20, boxShadow: '0 4px 20px rgba(124,58,237,0.45)', flexShrink: 0 },
};
