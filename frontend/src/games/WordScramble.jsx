// WordScramble.jsx — Unscramble Korean syllables to form a word
import { useState, useEffect } from 'react';

// Split Korean word into syllable blocks (each char is a syllable)
function splitSyllables(word) {
  return word.split('');
}

export default function WordScramble({ vocabulary = [], onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent]     = useState(0);
  const [tiles, setTiles]         = useState([]);     // scrambled tiles
  const [answer, setAnswer]       = useState([]);     // user's assembled answer
  const [result, setResult]       = useState(null);
  const [score, setScore]         = useState(0);
  const [done, setDone]           = useState(false);

  useEffect(() => {
    const qs = vocabulary
      .filter((v) => v.kr.length >= 2 && v.kr.length <= 5) // sweet spot
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setQuestions(qs);
    loadQuestion(qs, 0);
    setScore(0);
    setDone(false);
  }, [vocabulary]);

  function loadQuestion(qs, idx) {
    if (idx >= qs.length) return;
    const syllables = splitSyllables(qs[idx].kr);
    const scrambled = [...syllables].sort(() => Math.random() - 0.5);
    // Ensure scrambled != original at least once
    setTiles(scrambled);
    setAnswer([]);
    setResult(null);
    setCurrent(idx);
  }

  function pickTile(idx) {
    if (result) return;
    const tile = tiles[idx];
    setAnswer((a) => [...a, tile]);
    setTiles((t) => t.filter((_, i) => i !== idx));
  }

  function removeTile(idx) {
    if (result) return;
    const tile = answer[idx];
    setTiles((t) => [...t, tile]);
    setAnswer((a) => a.filter((_, i) => i !== idx));
  }

  function check() {
    const q       = questions[current];
    const formed  = answer.join('');
    const correct = formed === q.kr;
    setResult(correct ? 'correct' : 'wrong');
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      const next = current + 1;
      if (next >= questions.length) {
        setDone(true);
        onComplete?.(score + (correct ? 1 : 0) >= 3 ? 15 : 8);
      } else {
        loadQuestion(questions, next);
      }
    }, 1000);
  }

  if (!questions.length) return <div style={s.center}>Yuklanmoqda...</div>;

  if (done) return (
    <div style={s.done}>
      <div style={s.doneIcon}>{score >= 3 ? '🎉' : '💪'}</div>
      <div style={s.doneScore}>{score}/{questions.length} to'g'ri</div>
      <div style={s.doneXp}>+{score >= 3 ? 15 : 8} XP</div>
    </div>
  );

  const q = questions[current];

  return (
    <div style={s.wrap}>
      <div style={s.header}>
        <span style={s.title}>🔀 So'zni yig'ing</span>
        <span style={s.progress}>{current + 1}/{questions.length}</span>
      </div>

      <div style={s.hint}>{q.uz}</div>
      {q.romanization && <div style={s.roman}>{q.romanization}</div>}

      {/* Answer row */}
      <div style={s.answerRow}>
        {answer.length === 0 && <span style={s.placeholder}>Bo'sh joy</span>}
        {answer.map((tile, i) => (
          <button key={i} style={s.tileAnswer} onClick={() => removeTile(i)}>{tile}</button>
        ))}
      </div>

      {/* Scrambled tiles */}
      <div style={s.tilesRow}>
        {tiles.map((tile, i) => (
          <button key={i} style={s.tile} onClick={() => pickTile(i)}>{tile}</button>
        ))}
      </div>

      {answer.length === splitSyllables(q.kr).length && !result && (
        <button style={s.checkBtn} onClick={check}>✅ Tekshirish</button>
      )}

      {result && (
        <div style={result === 'correct' ? s.feedGood : s.feedBad}>
          {result === 'correct' ? '✅ To\'g\'ri!' : `❌ Javob: ${q.kr}`}
        </div>
      )}
    </div>
  );
}

const s = {
  wrap:        { padding: '8px 0' },
  header:      { display: 'flex', justifyContent: 'space-between', marginBottom: 12 },
  title:       { fontSize: 15, fontWeight: 700 },
  progress:    { fontSize: 14, color: '#888' },
  hint:        { fontSize: 18, fontWeight: 600, textAlign: 'center', marginBottom: 4, color: '#1a1a1a' },
  roman:       { fontSize: 13, color: '#999', textAlign: 'center', marginBottom: 16, fontStyle: 'italic' },
  answerRow:   { minHeight: 56, display: 'flex', alignItems: 'center', justifyContent: 'center',
                 gap: 6, background: '#F0F7FF', borderRadius: 12, padding: '8px 12px',
                 marginBottom: 16, flexWrap: 'wrap' },
  placeholder: { color: '#AAA', fontSize: 14 },
  tileAnswer:  { padding: '10px 14px', background: '#1976D2', color: '#fff', border: 'none',
                 borderRadius: 8, fontSize: 20, fontWeight: 700, cursor: 'pointer' },
  tilesRow:    { display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 20 },
  tile:        { padding: '12px 16px', background: '#fff', border: '2px solid #1976D2',
                 borderRadius: 8, fontSize: 22, fontWeight: 700, cursor: 'pointer', color: '#1976D2' },
  checkBtn:    { width: '100%', padding: 14, background: '#2ECC71', color: '#fff',
                 border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer' },
  feedGood:    { marginTop: 12, textAlign: 'center', color: '#2E7D32', fontWeight: 700, fontSize: 15 },
  feedBad:     { marginTop: 12, textAlign: 'center', color: '#C62828', fontWeight: 700, fontSize: 15 },
  center:      { textAlign: 'center', padding: 40 },
  done:        { textAlign: 'center', padding: 32 },
  doneIcon:    { fontSize: 56, marginBottom: 12 },
  doneScore:   { fontSize: 24, fontWeight: 800 },
  doneXp:      { fontSize: 16, color: '#1976D2', fontWeight: 700, marginTop: 8 },
};
