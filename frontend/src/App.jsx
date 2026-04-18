import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import { api } from './api';
import BottomNav from './screens/BottomNav';

const Onboarding   = lazy(() => import('./screens/Onboarding'));
const Home         = lazy(() => import('./screens/Home'));
const LearningPath = lazy(() => import('./screens/LearningPath'));
const Lesson       = lazy(() => import('./screens/Lesson'));
const LevelTest    = lazy(() => import('./screens/LevelTest'));
const Leaderboard  = lazy(() => import('./screens/Leaderboard'));
const ShareCard    = lazy(() => import('./screens/ShareCard'));
const Profile      = lazy(() => import('./screens/Profile'));
const Premium      = lazy(() => import('./screens/Premium'));

const tg = window.Telegram?.WebApp;

async function refreshUser(setUser, setStats) {
  try {
    const u = await api.login();
    setUser(u);
    if (u?.id) {
      const stats = await api.getStats(u.id);
      setStats(stats);
    }
  } catch(e) {
    console.error('refresh error:', e);
  }
}

export default function App() {
  const { user, setUser, setStats, setLessons } = useStore();

  useEffect(() => {
    tg?.ready();
    tg?.expand();

    // Initial login
    refreshUser(setUser, setStats);

    // Refresh when Mini App becomes visible again (user returns from bot)
    const handleVisibility = () => {
      if (!document.hidden) {
        refreshUser(setUser, setStats);
        setLessons([]); // force lessons reload
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Telegram specific: app activated event
    if (tg) {
      tg.onEvent('activated', () => {
        refreshUser(setUser, setStats);
        setLessons([]);
      });
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/"            element={user ? <Navigate to="/home" /> : <Onboarding />} />
          <Route path="/home"        element={<Home />} />
          <Route path="/learn"       element={<LearningPath />} />
          <Route path="/lesson/:id"  element={<Lesson />} />
          <Route path="/test/:id"    element={<LevelTest />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/share"       element={<ShareCard />} />
          <Route path="/profile"     element={<Profile />} />
          <Route path="/premium"     element={<Premium />} />
        </Routes>
      </Suspense>
      {user && <BottomNav />}
    </BrowserRouter>
  );
}

function Loader() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh' }}>
      <span style={{ fontSize: 32 }}>🇰🇷</span>
    </div>
  );
}
