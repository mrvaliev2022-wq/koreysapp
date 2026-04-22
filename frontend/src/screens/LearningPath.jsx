import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { api } from '../api';

const STATUS_STYLE = {
  completed:   { bg: 'rgba(209,250,229,0.6)', border: 'rgba(16,185,129,0.3)',  icon: '✅' },
  unlocked:    { bg: 'rgba(237,233,254,0.7)', border: 'rgba(124,58,237,0.3)',  icon: '▶' },
  in_progress: { bg: 'rgba(254,243,199,0.7)', border: 'rgba(251,191,36,0.35)', icon: '📖' },
  locked:      { bg: 'rgba(255,255,255,0.5)', border: 'rgba(124,58,237,0.1)',  icon: '🔒' },
};

export default function LearningPath() {
  const { track, setTrack, lessons, setLessons, user } = useStore();
  const [loading, setLoading] = useState(!lessons.length);
  const nav = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.getLessons(track).then(setLessons).finally(() => setLoading(false));
  }, [track, user?.is_premium]);

  if (loading) return (
    <div style={s.page}>
      <div style={s.center}><div style={s.loader} /></div>
    </div>
  );

  const intro  = lessons.find(l => l.level === 0);
  const main   = lessons.filter(l => l.level !== 0);
  const done   = main.filter(l => l.status === 'completed').length;
  const pct    = main.length ? Math.round(done / main.length * 100) : 0;
  const sections = track === 'TOPIK' ? buildTopik(main) : buildEps(main);

  return (
    <div style={s.page}>
      <div style={s.orb1} /><div style={s.orb2} /><div style={s.orb3} />

      <div style={s.content}>
        {/* Track switcher */}
        <div style={s.trackTabs}>
          <button
            style={{ ...s.trackTab, ...(track === 'TOPIK' ? s.trackTabActive : {}) }}
            onClick={() => { setTrack('TOPIK'); setLessons([]); }}>
            📚 TOPIK
          </button>
          <button
            style={{ ...s.trackTab, ...(track === 'EPS-TOPIK' ? s.trackTabActive : {}) }}
            onClick={() => { setTrack('EPS-TOPIK'); setLessons([]); }}>
            💼 EPS-TOPIK
          </button>
        </div>

        {/* Progress */}
        <div style={s.header}>
          <div style={s.trackSub}>{done}/{main.length} dars yakunlandi</div>
          <div style={s.pctCircle}><span style={s.pctTxt}>{pct}%</span></div>
        </div>

        {/* Progress */}
        <div style={s.progBg}><div style={{ ...s.progFill, width: pct + '%' }} /></div>

        {/* Intro lesson */}
        {intro && (
          <button style={s.introCard} onClick={() => nav('/lesson/' + intro.id)}>
            <div style={s.introOrb} />
            <div style={s.introLeft}>
              <div style={s.introBadge}>✨ Kirish darsi · Bepul</div>
              <div style={s.introTitle}>Harflar</div>
              <div style={s.introSub}>한글 · Hangul</div>
              <div style={s.introHint}>
                {intro.status === 'completed' ? '✓ Yakunlangan' : '▶ Bepul boshlash'}
              </div>
            </div>
            <div style={s.introChar}>한</div>
          </button>
        )}

        {/* Sections */}
        {sections.map(sec => (
          <div key={sec.title} style={s.section}>
            <div style={s.secHeader}>
              <div style={s.secTitle}>{sec.title}</div>
              <div style={s.secCount}>
                {sec.lessons.filter(l => l.status === 'completed').length}/{sec.lessons.length}
              </div>
            </div>
            <div style={s.list}>
              {sec.lessons.map((l, i) => {
                const st = STATUS_STYLE[l.status] || STATUS_STYLE.locked;
                const canAccess = l.is_free || user?.is_premium || l.status === 'completed';
                return (
                  <button key={l.id}
                    style={{ ...s.card, background: st.bg, borderColor: st.border, opacity: canAccess ? 1 : 0.6 }}
                    onClick={() => {
                      if (canAccess) nav('/lesson/' + l.id);
                      else nav('/premium');
                    }}>
                    <div style={{ ...s.cardNum, color: !canAccess ? '#9ca3af' : '#7c3aed' }}>
                      {sec.offset + i + 1}
                    </div>
                    <div style={s.cardInfo}>
                      <div style={s.cardKr}>{l.title_kr}</div>
                      <div style={s.cardUz}>{l.title_uz}</div>
                    </div>
                    <div style={s.cardIcon}>{st.icon}</div>
                    {l.score != null && l.status === 'completed' && (
                      <div style={s.scoreBadge}>{l.score}%</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {!user?.is_premium && (
          <button style={s.premBanner} onClick={() => nav('/premium')}>
            <div style={s.premOrb} />
            <div>
              <div style={s.premTitle}>👑 Premium oling</div>
              <div style={s.premSub}>127+ dars to'liq ochiladi</div>
            </div>
            <div style={s.premArr}>Olish &rarr;</div>
          </button>
        )}
      </div>
    </div>
  );
}

function buildTopik(lessons) {
  const secs = [];
  for (let lvl = 1; lvl <= 6; lvl++) {
    const grp = lessons.filter(l => l.level === lvl).sort((a, b) => {
      // Free lessons first, then by id
      if (a.is_free && !b.is_free) return -1;
      if (!a.is_free && b.is_free) return 1;
      return a.id - b.id;
    });
    if (grp.length) secs.push({ title: lvl + '-daraja', lessons: grp, offset: (lvl - 1) * 10 });
  }
  return secs;
}

function buildEps(lessons) {
  const b1 = lessons.filter(l => l.level >= 1  && l.level <= 30).sort((a, b) => a.level - b.level || a.id - b.id);
  const b2 = lessons.filter(l => l.level >= 31 && l.level <= 60).sort((a, b) => a.level - b.level || a.id - b.id);
  const secs = [];
  if (b1.length) secs.push({ title: 'EPS-TOPIK 1 (1-30 dars)', lessons: b1, offset: 0 });
  if (b2.length) secs.push({ title: 'EPS-TOPIK 2 (31-60 dars)', lessons: b2, offset: 30 });
  return secs;
}

const glass = { background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(124,58,237,0.14)' };

const s = {
  page: { fontFamily: "'Nunito',sans-serif", minHeight: '100vh', background: 'linear-gradient(160deg,#f8f7ff 0%,#eef2ff 35%,#f0f9ff 65%,#f5f3ff 100%)', position: 'relative', overflow: 'hidden', paddingBottom: 80 },
  orb1: { position: 'fixed', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.18),transparent)', top: -80, right: -60, pointerEvents: 'none', zIndex: 0 },
  orb2: { position: 'fixed', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.14),transparent)', top: 300, left: -60, pointerEvents: 'none', zIndex: 0 },
  orb3: { position: 'fixed', width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,139,250,0.2),transparent)', bottom: 180, right: -40, pointerEvents: 'none', zIndex: 0 },
  content: { position: 'relative', zIndex: 1, padding: '16px 16px 0' },
  center: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' },
  loader: { width: 36, height: 36, borderRadius: '50%', border: '3px solid rgba(124,58,237,0.15)', borderTopColor: '#7c3aed' },

  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  trackTabs:      { display: 'flex', gap: 8, marginBottom: 14 },
  trackTab:       { flex: 1, padding: '10px 0', borderRadius: 13, background: 'rgba(255,255,255,0.6)', border: '1.5px solid rgba(124,58,237,0.12)', fontSize: 13, fontWeight: 700, cursor: 'pointer', color: '#6b7280' },
  trackTabActive: { background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', border: 'none', color: '#fff' },
  trackSub:   { fontSize: 11, color: '#6b7280', marginTop: 2 },
  pctCircle:  { ...glass, width: 50, height: 50, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  pctTxt:     { fontSize: 12, fontWeight: 800, color: '#7c3aed' },

  progBg:   { height: 5, background: 'rgba(124,58,237,0.1)', borderRadius: 3, marginBottom: 16, overflow: 'hidden' },
  progFill: { height: '100%', background: 'linear-gradient(90deg,#7c3aed,#3b82f6)', borderRadius: 3, transition: 'width .3s' },

  introCard: { width: '100%', background: 'linear-gradient(135deg,rgba(109,40,217,0.82),rgba(37,99,235,0.78))', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: '16px', marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 6px 24px rgba(124,58,237,0.2)' },
  introOrb:  { position: 'absolute', width: 90, height: 90, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.1),transparent)', top: -20, right: -10, pointerEvents: 'none' },
  introLeft: { flex: 1 },
  introBadge:{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.12)', borderRadius: 20, padding: '3px 10px', display: 'inline-block', marginBottom: 6 },
  introTitle:{ fontSize: 22, fontWeight: 900, color: '#fff' },
  introSub:  { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  introHint: { fontSize: 11, color: 'rgba(167,243,208,0.9)', fontWeight: 700, marginTop: 10 },
  introChar: { fontSize: 52, color: '#fff', fontWeight: 900, opacity: 0.9, fontFamily: "'Noto Sans KR',sans-serif" },

  section:   { marginBottom: 20 },
  secHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9, paddingBottom: 8, borderBottom: '1.5px solid rgba(124,58,237,0.1)' },
  secTitle:  { fontSize: 13, fontWeight: 700, color: '#7c3aed' },
  secCount:  { fontSize: 11, color: '#6b7280', fontWeight: 600 },

  list: { display: 'flex', flexDirection: 'column', gap: 7 },
  card: { display: 'flex', alignItems: 'center', gap: 10, borderRadius: 14, padding: '11px 13px', cursor: 'pointer', textAlign: 'left', width: '100%', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1.5px solid', transition: 'opacity .2s', boxShadow: '0 1px 8px rgba(124,58,237,0.05)' },
  cardNum:  { width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 },
  cardInfo: { flex: 1 },
  cardKr:   { fontSize: 13, fontWeight: 700, color: '#1e1b4b', fontFamily: "'Noto Sans KR',sans-serif" },
  cardUz:   { fontSize: 11, color: '#6b7280', marginTop: 2 },
  cardIcon: { fontSize: 18 },
  scoreBadge: { fontSize: 10, color: '#065f46', fontWeight: 700, background: 'rgba(209,250,229,0.8)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 7, padding: '2px 7px' },

  premBanner: { width: '100%', background: 'linear-gradient(135deg,rgba(109,40,217,0.08),rgba(37,99,235,0.06))', border: '1.5px solid rgba(124,58,237,0.2)', borderRadius: 16, padding: '14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', position: 'relative', overflow: 'hidden' },
  premOrb:    { position: 'absolute', width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.12),transparent)', right: -15, top: -15, pointerEvents: 'none' },
  premTitle:  { fontSize: 13, fontWeight: 800, color: '#4c1d95' },
  premSub:    { fontSize: 10, color: '#6b7280', marginTop: 2 },
  premArr:    { marginLeft: 'auto', padding: '8px 14px', background: 'linear-gradient(90deg,#7c3aed,#3b82f6)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 12, fontWeight: 800, cursor: 'pointer', flexShrink: 0 },
};
