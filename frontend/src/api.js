const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const tg = window.Telegram?.WebApp;

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-telegram-init-data': tg?.initData || '',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  login:          ()       => request('/api/auth/login', { method: 'POST' }),
  getLessons:     (track)  => request(`/api/lessons?track=${track}`),
  getLesson:      (id)     => request(`/api/lessons/${id}`),
  completeLesson: (body)   => request('/api/progress/complete', { method: 'POST', body }),
  getLeaderboard: (type)   => request(`/api/leaderboard?type=${type}`),
  getStats:       (userId) => request(`/api/stats/${userId}`),
  activatePremium:(body)   => request('/api/premium/activate', { method: 'POST', body }),
  confirmStars:   (body)   => request('/api/premium/stars', { method: 'POST', body }),
};