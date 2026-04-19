import { lazy, Suspense, useEffect, useRef } from 'react';
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
  const { user, setUser, setStats } = useStore();
  const lastRefresh = useRef(0);

  useEffect(() => {
    tg?.ready();
    tg?.expand();
    refreshUser(setUser, setStats);

    const handleVisibility = () => {
      if (!document.hidden) {
        const now = Date.now();
        // 30 sekundda bir — oddiy background/foreground uchun
        if (now - lastRefresh.current > 30000) {
          lastRefresh.current = now;
          refreshUser(setUser, setStats);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    if (tg) {
      // activated = foydalanuvchi botdan qaytdi
      // Bu holda HAR DOIM refresh — premium holati yangilansin
      tg.onEvent('activated', () => {
        lastRefresh.current = 0; // throttle reset
        refreshUser(setUser, setStats);
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
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#0f0f1a' }}>
      <span style={{ fontSize: 32 }}>🇰🇷</span>
    </div>
  );
}
