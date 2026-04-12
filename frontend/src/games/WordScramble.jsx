import { useState, useEffect } from 'react';

export default function WordScramble({ vocabulary = [], onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [tiles, setTiles] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const qs = vocabulary.filter((v) => v.kr.length >= 2 && v.kr.length <= 5).sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(qs);
    if (qs.length) load(qs, 0);
    setScore(0); setDone(false);
  }, [vocabulary]);

  function load(qs, idx) {
    if (idx >= qs.length) return;
    setTiles([...qs[idx].kr].sort(() => Math.random() - 0.5));
    setAnswer([]); setResult(null); setCurrent(idx);
  }

  function pickTile(i) {
    if (result) return;
    setAnswer((a) => [...a, tiles[i]]);
    setTiles((t) => t.filter((_, j) => j !== i));
  }

  function removeTile(i) {
    if (result) return;
    setTiles((t) => [...t, answer[i]]);
    setAnswer((a) => a.filter((_, j) => j !== i));
  }

  function check() {
    const correct = answer.join('') === questions[current].kr;
    setResult(correct ? 'correct' : 'wrong');
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      const next = current + 1;
      if (next >= questions.length) { setDone(true); onComplete?.(15); }
      else load(questions, next);
    }, 1000);
  }

  if (!questions.length) return <div style={{ textAlign:'center', padding:40 }}>Yuklanmoqda...</div>;
  if (done) return <div style={{ textAlign:'center', padding:32 }}><div style={{ fontSize:56 }}>🎉</div><div style={{ fontSize:24, fontWeight:800 }}>{score}/{questions.length}</div><div style={{ fontSize:16, color:'#1976D2', fontWeight:700 }}>+15 XP</div></div>;

  const q = questions[current];
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
        <span style={{ fontSize:15, fontWeight:700 }}>Sozni yiging</span>
        <span style={{ fontSize:14, color:'#888' }}>{current+1}/{questions.length}</span>
      </div>
      <div style={{ fontSize:18, fontWeight:600, textAlign:'center', marginBottom:4 }}>{q.uz}</div>
      <div style={{ minHeight:56, display:'flex', alignItems:'center', justifyContent:'center', gap:6, background:'#F0F7FF', borderRadius:12, padding:'8px 12px', marginBottom:16, flexWrap:'wrap' }}>
        {answer.length === 0 && <span style={{ color:'#AAA', fontSize:14 }}>Bosh joy</span>}
        {answer.map((tile, i) => (
          <button key={i} style={{ padding:'10px 14px', background:'#1976D2', color:'#fff', border:'none', borderRadius:8, fontSize:20, fontWeight:700, cursor:'pointer' }} onClick={() => removeTile(i)}>{tile}</button>
        ))}
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center', marginBottom:20 }}>
        {tiles.map((tile, i) => (
          <button key={i} style={{ padding:'12px 16px', background:'#fff', border:'2px solid #1976D2', borderRadius:8, fontSize:22, fontWeight:700, cursor:'pointer', color:'#1976D2' }} onClick={() => pickTile(i)}>{tile}</button>
        ))}
      </div>
      {answer.length === [...q.kr].length && !result && (
        <button style={{ width:'100%', padding:14, background:'#2ECC71', color:'#fff', border:'none', borderRadius:12, fontSize:16, fontWeight:700, cursor:'pointer' }} onClick={check}>Tekshirish</button>
      )}
      {result && <div style={{ marginTop:12, textAlign:'center', fontWeight:700, fontSize:15, color: result==='correct' ? '#2E7D32' : '#C62828' }}>
        {result==='correct' ? 'Togri!' : Javob: \}
      </div>}
    </div>
  );
}
