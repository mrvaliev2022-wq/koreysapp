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

  useEffect(() => {
    api.getLesson(id).then((l) => setQuestions(l.quiz || []));
  }, [id]);

  function select(qi, oi) {
    if (result) return;
    setAnswers((a) => ({ ...a, [qi]: oi }));
  }

  async function submit() {
    const correct = questions.filter((q, i) => answers[i] === q.correct_index).length;
    const score = Math.round((correct / questions.length) * 100);
    const passed = score >= 70;
    setResult({ score, passed, correct, total: questions.length });
    if (passed) {
      markCompleted(Number(id), score === 100 ? 30 : 20);
      await api.completeLesson({ userId: user.id, lessonId: Number(id), score, isPerfect: score === 100 }).catch(console.error);
    }
  }

  if (!questions.length) return <div style={s.center}>Yuklanmoqda...</div>;

  if (result) return (
    <div style={s.resultPage}>
      <div style={{ fontSize:80 }}>{result.passed ? '🎉' : '😔'}</div>
      <div style={s.scoreText}>{result.score}%</div>
      <div style={s.scoreLabel}>{result.correct}/{result.total} togri javob</div>
      {result.passed ? (
        <>
          <div style={{ fontSize:16, color:'#2E7D32', fontWeight:600 }}>Tabriklaymiz! ✅</div>
          <button style={s.btnGreen} onClick={() => nav('/learn')}>Darslar royxatiga</button>
        </>
      ) : (
        <>
          <div style={{ fontSize:14, color:'#C62828', textAlign:'center', lineHeight:1.6 }}>Kamida 70% kerak!</div>
          <button style={s.btnBlue} onClick={() => nav(`/lesson/${id}`)}>Qayta oqish</button>
          <button style={s.btnGray} onClick={() => { setAnswers({}); setResult(null); }}>Qayta test</button>
        </>
      )}
    </div>
  );

  const allAnswered = questions.every((_, i) => answers[i] !== undefined);

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.title}>Test</div>
        <div style={{ fontSize:14, color:'#888' }}>{Object.keys(answers).length}/{questions.length}</div>
      </div>
      {questions.map((q, qi) => (
        <div key={qi} style={s.question}>
          <div style={s.qText}>{qi+1}. {q.question}</div>
          <div style={s.options}>
            {q.options.map((opt, oi) => (
              <button key={oi}
                style={{ ...s.option, ...(answers[qi]===oi ? s.optSelected : {}) }}
                onClick={() => select(qi, oi)}>
                <span style={s.optLetter}>{['A','B','C','D'][oi]}</span>
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button style={{ ...s.submitBtn, opacity: allAnswered ? 1 : 0.5 }}
        disabled={!allAnswered} onClick={submit}>
        Natijani korish
      </button>
    </div>
  );
}

const s = {
  page:       { padding:'16px 16px 100px', minHeight:'100vh' },
  center:     { display:'flex', alignItems:'center', justifyContent:'center', height:'100vh' },
  header:     { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 },
  title:      { fontSize:22, fontWeight:700 },
  question:   { marginBottom:24 },
  qText:      { fontSize:16, fontWeight:600, marginBottom:12, color:'#1a1a1a', lineHeight:1.5 },
  options:    { display:'flex', flexDirection:'column', gap:8 },
  option:     { display:'flex', alignItems:'center', gap:12, padding:'12px 14px',
                border:'1.5px solid #E0E0E0', borderRadius:10, background:'#fff',
                cursor:'pointer', fontSize:14, textAlign:'left' },
  optSelected:{ border:'2px solid #1976D2', background:'#E3F2FD' },
  optLetter:  { width:24, height:24, borderRadius:'50%', background:'#EEE',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:12, fontWeight:700, flexShrink:0 },
  submitBtn:  { width:'100%', padding:16, background:'#1976D2', color:'#fff',
                border:'none', borderRadius:14, fontSize:16, fontWeight:700, cursor:'pointer', marginTop:8 },
  resultPage: { display:'flex', flexDirection:'column', alignItems:'center',
                justifyContent:'center', minHeight:'100vh', padding:32, gap:12 },
  scoreText:  { fontSize:56, fontWeight:800, color:'#1a1a1a' },
  scoreLabel: { fontSize:16, color:'#666' },
  btnGreen:   { width:'100%', padding:16, background:'#2ECC71', color:'#fff', border:'none', borderRadius:14, fontSize:16, fontWeight:700, cursor:'pointer' },
  btnBlue:    { width:'100%', padding:16, background:'#1976D2', color:'#fff', border:'none', borderRadius:14, fontSize:16, fontWeight:700, cursor:'pointer' },
  btnGray:    { width:'100%', padding:14, background:'#F5F5F5', color:'#333', border:'none', borderRadius:14, fontSize:15, cursor:'pointer' },
};
