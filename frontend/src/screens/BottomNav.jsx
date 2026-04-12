import { useNavigate, useLocation } from 'react-router-dom';

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

  return (
    <nav style={s.nav}>
      {NAV.map((item, i) =>
        item.fab ? (
          <button key={i} style={s.fab} onClick={() => nav('/learn')}>▶</button>
        ) : (
          <button key={i}
            style={{ ...s.btn, ...(loc.pathname === item.path ? s.active : {}) }}
            onClick={() => nav(item.path)}>
            <span style={s.icon}>{item.icon}</span>
            <span style={s.label}>{item.label}</span>
          </button>
        )
      )}
    </nav>
  );
}

const s = {
  nav:    { position: 'fixed', bottom: 0, left: 0, right: 0, height: 64,
            background: '#fff', borderTop: '1px solid #EEE',
            display: 'flex', alignItems: 'center', justifyContent: 'space-around',
            zIndex: 100, padding: '0 4px' },
  btn:    { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 2, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' },
  active: { color: '#1976D2' },
  icon:   { fontSize: 22 },
  label:  { fontSize: 10, color: '#888' },
  fab:    { width: 52, height: 52, borderRadius: '50%', background: '#2ECC71',
            color: '#fff', fontSize: 20, border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(46,204,113,0.4)', marginTop: -20 },
};
