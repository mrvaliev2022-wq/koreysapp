import { useNavigate, useLocation } from 'react-router-dom';

const NAV = [
  { path: '/home',        icon: '🏠', label: 'Bosh' },
  { path: '/learn',       icon: '📚', label: 'Darslar' },
  { path: null,           icon: null,  label: null, fab: true },
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
          <button key={i} style={s.fab} onClick={() => nav('/learn')}>
            <span style={s.fabIcon}>▶</span>
          </button>
        ) : (
          <button
            key={i}
            style={{ ...s.btn, ...(loc.pathname === item.path ? s.active : {}) }}
            onClick={() => nav(item.path)}>
            <span style={{
              ...s.iconWrap,
              ...(loc.pathname === item.path ? s.iconWrapActive : {})
            }}>
              <span style={s.icon}>{item.icon}</span>
            </span>
            <span style={{
              ...s.label,
              ...(loc.pathname === item.path ? s.labelActive : {})
            }}>
              {item.label}
            </span>
          </button>
        )
      )}
    </nav>
  );
}

const s = {
  nav: {
    position: 'fixed', bottom: 0, left: 0, right: 0, height: 68,
    background: 'rgba(240,244,255,0.88)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderTop: '1.5px solid rgba(255,255,255,0.9)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-around',
    zIndex: 100, padding: '0 8px',
    boxShadow: '0 -4px 20px rgba(99,139,255,0.08)',
  },
  btn: {
    flex: 1, display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 2,
    background: 'none', border: 'none',
    cursor: 'pointer', padding: '4px 0',
  },
  active: {},
  iconWrap: {
    width: 36, height: 26, borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all .2s',
  },
  iconWrapActive: {
    background: 'rgba(219,234,254,0.9)',
  },
  icon:       { fontSize: 20 },
  label:      { fontSize: 10, color: '#94a3b8', fontWeight: 500 },
  labelActive:{ color: '#2563eb', fontWeight: 700 },
  fab: {
    width: 52, height: 52, borderRadius: '50%',
    background: 'linear-gradient(135deg,#3b82f6,#0ea5e9)',
    color: '#fff', border: 'none', cursor: 'pointer',
    marginTop: -22, display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(59,130,246,0.4)',
  },
  fabIcon: { fontSize: 18 },
};
