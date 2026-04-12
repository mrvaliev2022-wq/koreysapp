import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      user: null,
      stats: null,
      track: 'TOPIK',
      lessons: [],
      setUser:  (user)    => set({ user }),
      setStats: (stats)   => set({ stats }),
      setTrack: (track)   => set({ track }),
      setLessons: (lessons) => set({ lessons }),
      markCompleted: (lessonId, xpGain) => set((s) => ({
        lessons: s.lessons.map((l) =>
          l.id === lessonId ? { ...l, status: 'completed' } : l
        ),
        stats: s.stats
          ? { ...s.stats, xp: s.stats.xp + xpGain, lessons_done: s.stats.lessons_done + 1 }
          : s.stats,
      })),
      setPremium: (until) => set((s) => ({
        user: s.user ? { ...s.user, is_premium: true, premium_until: until } : s.user
      })),
    }),
    {
      name: 'koreysapp-store',
      partialize: (s) => ({ user: s.user, stats: s.stats, track: s.track }),
    }
  )
);
