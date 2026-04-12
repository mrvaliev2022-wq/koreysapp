import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
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

export default function App() {
  const { user, track } = useStore();

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/"            element={<Onboarding />} />
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
      <span style={{ fontSize:32 }}>🇰🇷</span>
    </div>
  );
}