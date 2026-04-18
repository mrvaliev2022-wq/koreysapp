import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { api } from '../api';

const tg = window.Telegram?.WebApp;

export default function LevelTest() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user, markCompleted } = useStore();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [nextLesson, setNextLesson] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getLesson(id)
      .then(l => {
        const quiz = l.quiz || l.questions || [];
        setQuestions(quiz);
      })
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false));

    api.getNextLesson(id)
      .then(d => {
        if (d?.requiresPremium) {
          setNextLesson('premium'); // signal: needs premium
        } else {
          setNextLesson(d?.next || null);
        }
      })
      .catch(() => setNextLesson(null));
  }, [id]);

  function select(qi, oi) {
    if (result) return;
    setAnswers(a => ({ ...a, [qi]: oi }));
  }

  async function submit() {
    const correct = questions.filter((q, i) => answers[i] === q.correct_index).length;
    const score = questions.length > 0 ? Math.round(correct / questions.length * 100) : 0;
    const passed = score >= 70;
    setResult({ score, passed, correct, total: questions.length });
    if (passed) {
      if (markCompleted) markCompleted(Number(id), score === 100 ? 30 : 20);
      await api.completeLesson({ userId: user?.id, lessonId: Number(id), score, isPerfect: score === 100 }).catch(() => {});
    }
  }

  function share() {
    const botUrl = 'https://t.me/koreystili_topikkaBot';
    const text =
      '\uD83C\uDDF0\uD83C\uDDF7 KoreysApp Test Natijam!\n\n' +
      '\uC548\uB155\uD558\uC138\uC694! \uD55C\uAD6D\uC5B4 \uD559\uC2B5\uC744 \uC2DC\uC791\uD588\uC5B4\uC694! \uD30C\uC774\uD305! \uD83D\uDCAA\n\n' +
      'Natija: ' + (result?.score || 0) + '%\n' +
      "To'g'ri: " + (result?.correct || 0) + '/' + (result?.total || 0) + '\n\n' +
      'Siz ham boshlang: ' + botUrl;
    if (tg?.openTelegramLink) {
      tg.openTelegramLink('https://t.me/share/url?url=' + encodeURIComponent(botUrl) + '&text=' + encodeURIComponent(text));
    }
  }

  function shareStory() {
    const botUrl = 'https://t.me/koreystili_topikkaBot';
    if (tg?.shareToStory) {
      tg.shareToStory('https://koreysapp-qql1.vercel.app/og-image.png', {
        text: 'KoreysApp: ' + (result?.score || 0) + '% - \uD55C\uAD6D\uC5B4 \uD559\uC2B5 \uD30C\uC774\uD305!',
        widget_link: { url: botUrl, name: 'KoreysApp' }
      });
    } else {
      share();
    }
  }

  // Loading
  if (loading) return (
    <div style={s.page}>
      <div style={s.center}><div style={s.loader} /></div>
    </div>
  );

  // No questions
  if (!questions.length) return (
    <div style={s.page}>
      <div style={s.center}>
        <div style={s.emptyBox}>
          <div style={s.emptyIcon}>?</div>
          <div style={s.emptyTitle}>Testlar topilmadi</div>
          <div style={s.emptySub}>Bu dars uchun test mavjud emas</div>
          <button style={s.emptyBtn} onClick={() => nav('/learn')}>Darslarga qaytish</button>
        </div>
      </div>
    </div>
  );

  // Result screen
  if (result) return (
    <div style={s.page}>
      <div style={s.bubble1} /><div style={s.bubble2} />
      <div style={s.resultWrap}>
        <div style={s.circleOuter}>
          <div style={{ ...s.circleInner, background: result.passed ? 'linear-gradient(135deg,#3b82f6,#0ea5e9,#22d3ee)' : 'linear-gradient(135deg,#fb923c,#ef4444)' }}>
            <div style={s.scorePct}>{result.score}%</div>
            <div style={s.scoreFrac}>{result.correct}/{result.total}</div>
          </div>
        </div>

        <div style={s.resultTitle}>{result.passed ? 'Tabriklaymiz!' : 'Qayta urining!'}</div>
        <div style={s.resultSub}>{result.passed ? 'Dars muvaffaqiyatli yakunlandi' : 'Kamida 70% kerak edi'}</div>

        <div style={{ ...s.xpPill, ...(result.passed ? s.xpPass : s.xpFail) }}>
          {result.passed ? '+' + (result.score === 100 ? 30 : 20) + ' XP qoshildi' : 'Kamida ' + Math.ceil(questions.length * 0.7) + ' ta togri javob kerak'}
        </div>

        <div style={s.statsBox}>
          <div style={{ ...s.stCell, background: 'rgba(219,234,254,0.8)' }}>
            <div style={{ ...s.stNum, color: '#2563eb' }}>{result.correct}/{result.total}</div>
            <div style={s.stLbl}>Togri</div>
          </div>
          <div style={{ ...s.stCell, background: result.passed ? 'rgba(220,252,231,0.8)' : 'rgba(254,226,226,0.8)' }}>
            <div style={{ ...s.stNum, color: result.passed ? '#15803d' : '#dc2626' }}>{result.score}%</div>
            <div style={s.stLbl}>Ball</div>
          </div>
          <div style={{ ...s.stCell, background: 'rgba(237,233,254,0.8)' }}>
            <div style={{ ...s.stNum, color: '#7c3aed' }}>{result.passed ? '+7' : '0'}</div>
            <div style={s.stLbl}>Streak</div>
          </div>
        </div>

        {result.passed ? (
          <>
            {nextLesson === 'premium' ? (
              <button style={{ ...s.btnMain, background: 'linear-gradient(90deg,#f59e0b,#eab308)' }}
                onClick={() => nav('/premium')}>
                Keyingi dars Premium! Premium oling &rarr;
              </button>
            ) : nextLesson ? (
              <button style={s.btnMain} onClick={() => nav('/lesson/' + nextLesson.id)}>
                Keyingi darsga otish &rarr;
              </button>
            ) : (
              <button style={s.btnMain} onClick={() => nav('/learn')}>Barcha darslar &rarr;</button>
            )}
            <button style={s.btnSec} onClick={() => nav('/learn')}>Darslar royxati</button>
            <button style={s.btnStory} onClick={shareStory}>Story ga qoyish</button>
            <button style={s.btnShare} onClick={share}>Natijani ulashish</button>
          </>
        ) : (
          <>
            <button style={{ ...s.btnMain, background: 'linear-gradient(90deg,#fb923c,#ef4444)' }}
              onClick={() => { setAnswers({}); setResult(null); }}>
              Qayta test &rarr;
            </button>
            <button style={s.btnSec} onClick={() => nav('/lesson/' + id)}>Qayta oqush</button>
            <button style={s.btnShare} onClick={share}>Natijani ulashish</button>
          </>
        )}
      </div>
    </div>
  );

  const answered = Object.keys(answers).length;
  const allDone = questions.every((_, i) => answers[i] !== undefined);

  // Test screen
  return (
    <div style={s.page}>
      <div style={s.bubble1} /><div style={s.bubble2} />

      <div style={s.header}>
        <button style={s.backBtn} onClick={() => nav('/lesson/' + id)}>&larr; Orqaga</button>
        <div style={s.title}>Test</div>
        <div style={s.counter}>{answered}/{questions.length}</div>
      </div>

      <div style={s.progBg}>
        <div style={{ ...s.progFill, width: (answered / questions.length * 100) + '%' }} />
      </div>

      {questions.map((q, qi) => (
        <div key={qi} style={s.qBlock}>
          <div style={s.qText}>{qi + 1}. {q.question}</div>
          <div style={s.opts}>
            {(q.options || []).map((opt, oi) => (
              <button key={oi}
                style={{ ...s.opt, ...(answers[qi] === oi ? s.optSel : {}) }}
                onClick={() => select(qi, oi)}>
                <span style={{ ...s.optLetter, ...(answers[qi] === oi ? s.optLetterSel : {}) }}>
                  {['A', 'B', 'C', 'D'][oi]}
                </span>
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        style={{ ...s.submitBtn, opacity: allDone ? 1 : 0.5 }}
        disabled={!allDone}
        onClick={submit}>
        Natijani korish
      </button>
    </div>
  );
}

const glass = {
  background: 'rgba(255,255,255,0.62)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1.5px solid rgba(255,255,255,0.9)',
};

const s = {
  page:      { padding: '16px 16px 100px', minHeight: '100vh', background: 'linear-gradient(160deg,#f0f4ff,#e8f4ff 50%,#f0f0ff)', position: 'relative', overflow: 'hidden' },
  bubble1:   { position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle,rgba(147,197,253,0.25),transparent)', top: -50, right: -50, pointerEvents: 'none' },
  bubble2:   { position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle,rgba(134,239,172,0.2),transparent)', bottom: 200, left: -40, pointerEvents: 'none' },
  center:    { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' },
  loader:    { width: 36, height: 36, borderRadius: '50%', border: '3px solid #dbeafe', borderTopColor: '#3b82f6' },

  emptyBox:   { ...glass, borderRadius: 20, padding: 32, textAlign: 'center', maxWidth: 300 },
  emptyIcon:  { fontSize: 48, fontWeight: 900, color: '#94a3b8', marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: 700, color: '#1e293b', marginBottom: 6 },
  emptySub:   { fontSize: 13, color: '#64748b', marginBottom: 20 },
  emptyBtn:   { padding: '12px 24px', background: 'linear-gradient(90deg,#3b82f6,#0ea5e9)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' },

  header:    { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, position: 'relative', zIndex: 1 },
  backBtn:   { fontSize: 12, color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px' },
  title:     { fontSize: 18, fontWeight: 800, color: '#1e293b' },
  counter:   { fontSize: 12, color: '#94a3b8', fontWeight: 600 },
  progBg:    { height: 5, background: 'rgba(219,234,254,0.8)', borderRadius: 3, marginBottom: 18, overflow: 'hidden', position: 'relative', zIndex: 1 },
  progFill:  { height: '100%', background: 'linear-gradient(90deg,#3b82f6,#0ea5e9)', borderRadius: 3, transition: 'width .3s' },

  qBlock:    { marginBottom: 20, position: 'relative', zIndex: 1 },
  qText:     { fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 10, lineHeight: 1.5 },
  opts:      { display: 'flex', flexDirection: 'column', gap: 7 },
  opt:       { ...glass, display: 'flex', alignItems: 'center', gap: 10, padding: '11px 13px', borderRadius: 12, cursor: 'pointer', fontSize: 13, textAlign: 'left', width: '100%' },
  optSel:    { background: 'rgba(219,234,254,0.85)', border: '1.5px solid rgba(59,130,246,0.5)' },
  optLetter: { width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 },
  optLetterSel: { background: '#3b82f6', color: '#fff' },
  submitBtn: { width: '100%', padding: 15, background: 'linear-gradient(90deg,#3b82f6,#0ea5e9)', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', position: 'relative', zIndex: 1 },

  resultWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', position: 'relative', zIndex: 1 },
  circleOuter:{ width: 120, height: 120, borderRadius: '50%', background: 'rgba(219,234,254,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, border: '2px solid rgba(255,255,255,0.8)' },
  circleInner:{ width: 96, height: 96, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.4)' },
  scorePct:  { fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1 },
  scoreFrac: { fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  resultTitle:{ fontSize: 20, fontWeight: 800, color: '#1e293b', marginBottom: 4 },
  resultSub: { fontSize: 12, color: '#64748b', marginBottom: 12 },
  xpPill:    { fontSize: 11, fontWeight: 700, borderRadius: 20, padding: '5px 16px', marginBottom: 14 },
  xpPass:    { background: 'rgba(220,252,231,0.9)', border: '1.5px solid rgba(134,239,172,0.6)', color: '#15803d' },
  xpFail:    { background: 'rgba(254,226,226,0.9)', border: '1.5px solid rgba(252,165,165,0.5)', color: '#dc2626' },
  statsBox:  { ...glass, borderRadius: 14, padding: 10, width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7, marginBottom: 14 },
  stCell:    { borderRadius: 10, padding: '8px 4px', textAlign: 'center' },
  stNum:     { fontSize: 16, fontWeight: 800 },
  stLbl:     { fontSize: 8, color: '#94a3b8', marginTop: 1 },

  btnMain:   { width: '100%', padding: 13, background: 'linear-gradient(90deg,#3b82f6,#0ea5e9)', color: '#fff', border: 'none', borderRadius: 13, fontSize: 13, fontWeight: 800, cursor: 'pointer', marginBottom: 7 },
  btnSec:    { width: '100%', padding: 11, background: 'rgba(219,234,254,0.8)', color: '#2563eb', border: '1.5px solid rgba(147,197,253,0.5)', borderRadius: 13, fontSize: 12, fontWeight: 700, cursor: 'pointer', marginBottom: 7 },
  btnStory:  { width: '100%', padding: 11, background: 'linear-gradient(90deg,#7c3aed,#a855f7)', color: '#fff', border: 'none', borderRadius: 13, fontSize: 12, fontWeight: 700, cursor: 'pointer', marginBottom: 7 },
  btnShare:  { width: '100%', padding: 10, background: 'rgba(255,255,255,0.7)', color: '#64748b', border: '1.5px solid rgba(255,255,255,0.9)', borderRadius: 13, fontSize: 11, fontWeight: 600, cursor: 'pointer' },
};
