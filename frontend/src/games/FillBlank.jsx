import { useState, useEffect } from 'react';

export default function FillBlank({ examples = [], vocabulary = [], onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const qs = examples.slice(0, 5).map((ex) => {
      const words = ex.kr.split(' ');
      const hideIdx = Math.floor(Math.random() * words.length);
      const answer = words[hideIdx];
      const sentence = words.map((w, i) => i === hideIdx ? '___' : w).join(' ');
      const distractors = vocabulary.filter((v) => v.kr !== answer).sort(() => Math.random() - 0.5).slice(0, 3).map((v) => v.kr);
      const options = [...distractors, answer].sort(() => Math.random() - 0.5);
      return { sentence, answer, options, uz: ex.uz };
    });
    setQuestions(qs);
    setCurrent(0); setScore(0); setDone(false); setResult(null);
  }, [examples, vocabulary]);

  function select(opt) {
    if (result) return;
    const correct = opt === questions[current].answer;
    setResult(correct ? 'correct' : 'wrong');
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 >= questions.length) { setDone(true); onComplete?.(10); }
      else { setCurrent((c) => c + 1); setResult(null); }
    }, 900);
  }

  if (!questions.length) return <div style={{ textAlign:'center', padding:40 }}>Yuklanmoqda...</div>;
  if (done) return <div style={{ textAlign:'center', padding:32 }}><div style={{ fontSize:56 }}>🎉</div><div style={{ fontSize:24, fontWeight:800 }}>{score}/{questions.length}</div><div style={{ fontSize:16, color:'#1976D2', fontWeight:700 }}>+10 XP</div></div>;

  const q = questions[current];
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16 }}>
        <span style={{ fontSize:15, fontWeight:700 }}>Bosh joyni toldiring</span>
        <span style={{ fontSize:14, color:'#888' }}>{current+1}/{questions.length}</span>
      </div>
      <div style={{ fontSize:22, fontWeight:700, textAlign:'center', padding:'16px 0' }}>{q.sentence}</div>
      <div style={{ fontSize:13, color:'#777', textAlign:'center', marginBottom:20 }}>{q.uz}</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        {q.options.map((opt) => (
          <button key={opt}
            style={{ padding:'14px 8px', border:'1.5px solid #E0E0E0', borderRadius:10, background: result && opt===q.answer ? '#E8F5E9' : '#fff', fontSize:15, cursor:'pointer', fontWeight:600 }}
            onClick={() => select(opt)}>{opt}</button>
        ))}
      </div>
      {result && <div style={{ marginTop:14, textAlign:'center', fontWeight:700, fontSize:15, color: result==='correct' ? '#2E7D32' : '#C62828' }}>
        {result==='correct' ? 'Togri!' : Javob: \}
      </div>}
    </div>
  );
}
