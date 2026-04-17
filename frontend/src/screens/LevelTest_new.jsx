import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { api } from '../api';

export default function LevelTest() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user, markCompleted, lessons } = useStore();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [nextLessonId, setNextLessonId] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  useEffect(() => {
    api.getLesson(id).then((l) => {
      setQuestions(l.quiz || []);
      setCurrentLesson(l);
    });
  }, [id]);

  // Keyingi darsni topish
  useEffect(() => {
    if (!currentLesson || !lessons.length) return;

    // Bir xil track dagi darslarni level va id bo'yicha tartiblash
    const trackLessons = lessons
      .filter(l => l.track === currentLesson.track && l.level !== 0)
      .sort((a, b) => a.level !== b.level ? a.level - b.level : a.id - b.id);

    const currentIdx = trackLessons.findIndex(l => l.id === Number(id));
    if (currentIdx !== -1 && currentIdx < trackLessons.length - 1) {
      setNextLessonId(trackLessons[currentIdx + 1].id);
    }
  }, [currentLesson, lessons, id]);

  function select(qIdx, optIdx) {
    if (result) return;
    setAnswers((a) => ({ ...a, [qIdx]: optIdx }));
  }

  async function submit() {
    const correct = questions.filter((q, i) => answers[i] === q.correct_index).length;
    const score = Math.round((correct / questions.length) * 100);
    const passed = score >= 70;

    setResult({ score, passed, correct, total: questions.length });

    if (passed) {
      markCompleted(Number(id), score === 100 ? 30 : 20);
      await api.completeLesson({
        userId: user?.id,
        lessonId: Number(id),
        score,
        isPerfect: score === 100,
      }).catch(console.error);
    }
  }

  if (!questions.length) return <div style={s.center}>Yuklanmoqda...</div>;

  if (result) return (
    <div style={s.resultPage}>
      <div style={s.emoji}>{result.passed ? 'OK' : '...'}</div>
      <div style={s.scoreText}>{result.score}%</div>
      <div style={s.scoreLabel}>{result.correct}/{result.total} to'g'ri javob</div>

      {result.passed ? (
        <div style={s.passBox}>
          <div style={s.passMsg}>Tabriklaymiz! Dars yakunlandi!</div>
          <div style={s.passXp}>+{result.score === 100 ? 30 : 20} XP</div>

          {nextLessonId ? (
            <button style={s.btnGreen} onClick={() => nav('/lesson/' + nextLessonId)}>
              Keyingi darsga o'tish &gt;
            </button>
          ) : (
            <button style={s.btnGreen} onClick={() => nav('/learn')}>
              Barcha darslar &gt;
            </button>
          )}

          <button style={s.btnGray} onClick={() => nav('/learn')}>
            Darslar ro'yxati
          </button>
        </div>
      ) : (
        <div style={s.failBox}>
          <div style={s.failMsg}>Kamida 70% kerak. Yana urinib ko'ring!</div>
          <div style={s.failHint}>
            {result.score}% — {Math.ceil((questions.length * 0.7) - result.correct)} ta savol yetmadi
          </div>
          <button style={s.btnBlue} onClick={() => nav('/lesson/' + id)}>
            Qayta o'qish
          </button>
          <button style={s.btnOrange} onClick={() => { setAnswers({}); setResult(null); }}>
            Qayta test
          </button>
        </div>
      )}
    </div>
  );

  const allAnswered = questions.every((_, i) => answers[i] !== undefined);
  const answeredCount = Object.keys(answers).length;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => nav('/lesson/' + id)}>Orqaga</button>
        <div style={s.title}>Test</div>
        <div style={s.counter}>{answeredCount}/{questions.length}</div>
      </div>

      <div style={s.progressBg}>
        <div style={{ ...s.progressFill, width: (answeredCount / questions.length * 100) + '%' }} />
      </div>

      {questions.map((q, qi) => (
        <div key={qi} style={s.question}>
          <div style={s.qText}>{qi + 1}. {q.question}</div>
          <div style={s.options}>
            {q.options.map((opt, oi) => (
              <button key={oi}
                style={{ ...s.option, ...(answers[qi] === oi ? s.optSelected : {}) }}
                onClick={() => select(qi, oi)}>
                <span style={{
                  ...s.optLetter,
                  ...(answers[qi] === oi ? s.optLetterSelected : {})
                }}>
                  {['A', 'B', 'C', 'D'][oi]}
                </span>
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        style={{ ...s.submitBtn, opacity: allAnswered ? 1 : 0.5 }}
        disabled={!allAnswered}
        onClick={submit}>
        Natijani ko'rish
      </button>
    </div>
  );
}

const s = {
  page:       { padding: '16px 16px 100px', minHeight: '100vh' },
  center:     { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' },
  header:     { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  backBtn:    { fontSize: 13, color: '#888', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' },
  title:      { fontSize: 20, fontWeight: 700 },
  counter:    { fontSize: 14, color: '#888' },
  progressBg: { height: 4, background: '#EEE', borderRadius: 2, marginBottom: 20 },
  progressFill:{ height: '100%', background: '#1976D2', borderRadius: 2, transition: 'width .3s' },
  question:   { marginBottom: 24 },
  qText:      { fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#1a1a1a', lineHeight: 1.5 },
  options:    { display: 'flex', flexDirection: 'column', gap: 8 },
  option:     { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                border: '1.5px solid #E0E0E0', borderRadius: 10, background: '#fff',
                cursor: 'pointer', fontSize: 14, textAlign: 'left', width: '100%' },
  optSelected:{ border: '2px solid #1976D2', background: '#E3F2FD' },
  optLetter:  { width: 26, height: 26, borderRadius: '50%', background: '#EEE',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, flexShrink: 0 },
  optLetterSelected: { background: '#1976D2', color: '#fff' },
  submitBtn:  { width: '100%', padding: 16, background: '#1976D2', color: '#fff',
                border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700,
                cursor: 'pointer', marginTop: 8 },

  resultPage: { display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '40px 24px 100px', minHeight: '100vh', gap: 8 },
  emoji:      { fontSize: 60, marginBottom: 8 },
  scoreText:  { fontSize: 64, fontWeight: 900, color: '#1a1a1a', lineHeight: 1 },
  scoreLabel: { fontSize: 16, color: '#888', marginBottom: 16 },

  passBox:    { width: '100%', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' },
  passMsg:    { fontSize: 18, color: '#2E7D32', fontWeight: 700, textAlign: 'center' },
  passXp:     { fontSize: 14, color: '#1976D2', fontWeight: 600,
                background: '#E3F2FD', borderRadius: 20, padding: '4px 16px' },

  failBox:    { width: '100%', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' },
  failMsg:    { fontSize: 16, color: '#C62828', fontWeight: 600, textAlign: 'center' },
  failHint:   { fontSize: 13, color: '#888', textAlign: 'center' },

  btnGreen:   { width: '100%', padding: 16, background: '#2ECC71', color: '#fff',
                border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: 'pointer' },
  btnBlue:    { width: '100%', padding: 16, background: '#1976D2', color: '#fff',
                border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: 'pointer' },
  btnOrange:  { width: '100%', padding: 14, background: '#FF9800', color: '#fff',
                border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 600, cursor: 'pointer' },
  btnGray:    { width: '100%', padding: 12, background: '#F5F5F5', color: '#666',
                border: 'none', borderRadius: 14, fontSize: 14, cursor: 'pointer' },
};
