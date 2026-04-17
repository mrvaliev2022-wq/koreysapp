import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { api } from '../api';

export default function LevelTest() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user, markCompleted } = useStore();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [nextLesson, setNextLesson] = useState(undefined);

  useEffect(() => {
    api.getLesson(id).then((l) => setQuestions(l.quiz || []));
    api.getNextLesson(id).then((data) => setNextLesson(data.next || null));
  }, [id]);

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
      <div style={s.scoreCircle}>
        <div style={{ ...s.scoreNum, color: result.passed ? '#2E7D32' : '#C62828' }}>
          {result.score}%
        </div>
        <div style={s.scoreLabel}>{result.correct}/{result.total} togri</div>
      </div>

      {result.passed ? (
        <div style={s.passBox}>
          <div style={s.passMsg}>Tabriklaymiz! Dars yakunlandi!</div>
          <div style={s.xpBadge}>+{result.score === 100 ? 30 : 20} XP</div>
          {nextLesson ? (
            <>
              <button style={s.btnGreen} onClick={() => nav('/lesson/' + nextLesson.id)}>
                Keyingi darsga otish &gt;
              </button>
              <button style={s.btnGray} onClick={() => nav('/learn')}>
                Darslar royxati
              </button>
            </>
          ) : (
            <>
              <div style={s.allDoneMsg}>Barcha darslarni tugatdingiz!</div>
              <button style={s.btnGreen} onClick={() => nav('/learn')}>
                Darslar royxati
              </button>
            </>
          )}
        </div>
      ) : (
        <div style={s.failBox}>
          <div style={s.failMsg}>Kamida 70% kerak!</div>
          <div style={s.failHint}>
            Yana {Math.ceil(questions.length * 0.7) - result.correct} ta togri javob kerak
          </div>
          <button style={s.btnBlue} onClick={() => nav('/lesson/' + id)}>
            Qayta oqush
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
        style={{ ...s.submitBtn, opacity: allAnswered ? 1 : 0.5 }}
        disabled={!allAnswered}
        onClick={submit}>
        Natijani korish
      </button>
    </div>
  );
}

const s = {
  page:         { padding: '16px 16px 100px', minHeight: '100vh' },
  center:       { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' },
  header:       { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  backBtn:      { fontSize: 13, color: '#888', background: 'none', border: 'none', cursor: 'pointer' },
  title:        { fontSize: 20, fontWeight: 700 },
  counter:      { fontSize: 14, color: '#888' },
  progressBg:   { height: 4, background: '#EEE', borderRadius: 2, marginBottom: 20 },
  progressFill: { height: '100%', background: '#1976D2', borderRadius: 2, transition: 'width .3s' },
  question:     { marginBottom: 24 },
  qText:        { fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#1a1a1a', lineHeight: 1.5 },
  options:      { display: 'flex', flexDirection: 'column', gap: 8 },
  option:       { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                  border: '1.5px solid #E0E0E0', borderRadius: 10, background: '#fff',
                  cursor: 'pointer', fontSize: 14, textAlign: 'left', width: '100%' },
  optSelected:  { border: '2px solid #1976D2', background: '#E3F2FD' },
  optLetter:    { width: 26, height: 26, borderRadius: '50%', background: '#EEE',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, flexShrink: 0 },
  optLetterSel: { background: '#1976D2', color: '#fff' },
  submitBtn:    { width: '100%', padding: 16, background: '#1976D2', color: '#fff',
                  border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700,
                  cursor: 'pointer', marginTop: 8 },
  resultPage:   { display: 'flex', flexDirection: 'column', alignItems: 'center',
                  padding: '40px 24px 100px', minHeight: '100vh', gap: 16 },
  scoreCircle:  { width: 160, height: 160, borderRadius: '50%', background: '#F5F5F5',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center' },
  scoreNum:     { fontSize: 42, fontWeight: 900, lineHeight: 1 },
  scoreLabel:   { fontSize: 14, color: '#888', marginTop: 4 },
  passBox:      { width: '100%', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' },
  passMsg:      { fontSize: 18, color: '#2E7D32', fontWeight: 700, textAlign: 'center' },
  xpBadge:      { fontSize: 14, color: '#1976D2', fontWeight: 700,
                  background: '#E3F2FD', borderRadius: 20, padding: '6px 20px' },
  allDoneMsg:   { fontSize: 15, color: '#F57F17', fontWeight: 600, textAlign: 'center',
                  background: '#FFF8E1', padding: '10px 20px', borderRadius: 10, width: '100%' },
  failBox:      { width: '100%', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' },
  failMsg:      { fontSize: 18, color: '#C62828', fontWeight: 700, textAlign: 'center' },
  failHint:     { fontSize: 13, color: '#888', textAlign: 'center' },
  btnGreen:     { width: '100%', padding: 16, background: '#2ECC71', color: '#fff',
                  border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: 'pointer' },
  btnBlue:      { width: '100%', padding: 16, background: '#1976D2', color: '#fff',
                  border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: 'pointer' },
  btnOrange:    { width: '100%', padding: 14, background: '#FF9800', color: '#fff',
                  border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 600, cursor: 'pointer' },
  btnGray:      { width: '100%', padding: 12, background: '#F5F5F5', color: '#666',
                  border: 'none', borderRadius: 14, fontSize: 14, cursor: 'pointer' },
};
