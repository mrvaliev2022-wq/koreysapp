// FillBlank.jsx — Fill in the missing Korean word
import { useState, useEffect } from 'react';

export default function FillBlank({ examples = [], vocabulary = [], onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent]     = useState(0);
  const [input, setInput]         = useState('');
  const [result, setResult]       = useState(null); // 'correct' | 'wrong'
  const [score, setScore]         = useState(0);
  const [done, setDone]           = useState(false);

  useEffect(() => {
    // Build questions from examples: hide one word from each sentence
    const qs = examples.slice(0, 5).map((ex) => {
      const words = ex.kr.split(' ');
      const hideIdx = Math.floor(Math.random() * words.length);
      const answer  = words[hideIdx];
      const sentence = words.map((w, i) => i === hideIdx ? '___' : w).join(' ');

      // Distractors from vocabulary
      const distractors = vocabulary
        .filter((v) => v.kr !== answer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((v) => v.kr);

      const options = [...distractors, answer].sort(() => Math.random() - 0.5);
      return { sentence, answer, options, uz: ex.uz };
    });
    setQuestions(qs);
    setCurrent(0);
    setScore(0);
    setDone(false);
    setResult(null);
    setInput('');
  }, [examples, vocabulary]);

  function select(opt) {
    if (result) return;
    const q = questions[current];
    const correct = opt === q.answer;
    setResult(correct ? 'correct' : 'wrong');
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setDone(true);
        onComplete?.(score + (correct ? 1 : 0) >= questions.length * 0.6 ? 10 : 5);
      } else {
        setCurrent((c) => c + 1);
        setResult(null);
      }
    }, 900);
  }

  if (!questions.length) return <div style={s.center}>Yuklanmoqda...</div>;

  if (done) return (
    <div style={s.done}>
      <div style={s.doneIcon}>{score >= questions.length * 0.6 ? '🎉' : '😊'}</div>
      <div style={s.doneScore}>{score}/{questions.length} to'g'ri</div>
      <div style={s.doneXp}>+{score >= questions.length * 0.6 ? 10 : 5} XP</div>
    </div>
  );

  const q = questions[current];

  return (
    <div style={s.wrap}>
      <div style={s.header}>
        <span style={s.title}>✏️ Bo'sh joyni to'ldiring</span>
        <span style={s.progress}>{current + 1}/{questions.length}</span>
      </div>

      <div style={s.sentence}>{q.sentence}</div>
      <div style={s.uz}>{q.uz}</div>

      <div style={s.options}>
        {q.options.map((opt) => (
          <button key={opt}
            style={{ ...s.opt,
              ...(result && opt === q.answer ? s.optCorrect : {}),
              ...(result === 'wrong' && opt !== q.answer ? s.optWrong : {}) }}
            onClick={() => select(opt)}>
            {opt}
          </button>
        ))}
      </div>

      {result && (
        <div style={result === 'correct' ? s.feedGood : s.feedBad}>
          {result === 'correct' ? '✅ To\'g\'ri!' : `❌ Javob: ${q.answer}`}
        </div>
      )}
    </div>
  );
}

const s = {
  wrap:      { padding: '8px 0' },
  header:    { display: 'flex', justifyContent: 'space-between', marginBottom: 16 },
  title:     { fontSize: 15, fontWeight: 700 },
  progress:  { fontSize: 14, color: '#888' },
  sentence:  { fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 8,
               lineHeight: 1.5, textAlign: 'center', padding: '16px 0' },
  uz:        { fontSize: 13, color: '#777', textAlign: 'center', marginBottom: 20 },
  options:   { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  opt:       { padding: '14px 8px', border: '1.5px solid #E0E0E0', borderRadius: 10,
               background: '#fff', fontSize: 15, cursor: 'pointer', fontWeight: 600,
               transition: 'all .15s' },
  optCorrect:{ background: '#E8F5E9', border: '2px solid #2ECC71', color: '#2E7D32' },
  optWrong:  { opacity: 0.4 },
  feedGood:  { marginTop: 14, textAlign: 'center', color: '#2E7D32', fontWeight: 700, fontSize: 15 },
  feedBad:   { marginTop: 14, textAlign: 'center', color: '#C62828', fontWeight: 700, fontSize: 15 },
  center:    { textAlign: 'center', padding: 40 },
  done:      { textAlign: 'center', padding: 32 },
  doneIcon:  { fontSize: 56, marginBottom: 12 },
  doneScore: { fontSize: 24, fontWeight: 800 },
  doneXp:    { fontSize: 16, color: '#1976D2', fontWeight: 700, marginTop: 8 },
};
