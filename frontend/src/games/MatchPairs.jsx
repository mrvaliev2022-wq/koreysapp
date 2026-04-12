import { useState, useEffect } from 'react';

export default function MatchPairs({ vocabulary = [], onComplete }) {
  const [pairs, setPairs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [errors, setErrors] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const words = [...vocabulary].sort(() => Math.random() - 0.5).slice(0, 6);
    setPairs(words);
    setMatched(new Set());
    setSelected(null);
    setErrors(0);
    setDone(false);
  }, [vocabulary]);

  function tap(id, side) {
    if (matched.has(id)) return;
    if (!selected) { setSelected({ id, side }); return; }
    if (selected.id === id && selected.side === side) { setSelected(null); return; }
    if (selected.side === side) { setSelected({ id, side }); return; }
    if (selected.id === id) {
      const next = new Set([...matched, id]);
      setMatched(next);
      setSelected(null);
      if (next.size === pairs.length) { setDone(true); onComplete?.(Math.max(15 - errors * 2, 5)); }
    } else {
      setErrors((e) => e + 1);
      setSelected(null);
    }
  }

  const krCol = [...pairs].sort(() => Math.random() - 0.5);
  const uzCol = [...pairs].sort(() => Math.random() - 0.5);

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
        <span style={{ fontSize:15, fontWeight:700 }}>Juftlikni toping</span>
        <span>Xato: {errors}</span>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {krCol.map((p) => (
            <button key={kr-\}
              style={{ ...s.card, ...(matched.has(p.kr) ? s.matched : {}), ...(selected?.id===p.kr && selected?.side==='kr' ? s.sel : {}) }}
              onClick={() => tap(p.kr, 'kr')}>{p.kr}</button>
          ))}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {uzCol.map((p) => (
            <button key={uz-\}
              style={{ ...s.card, ...(matched.has(p.kr) ? s.matched : {}), ...(selected?.id===p.kr && selected?.side==='uz' ? s.sel : {}) }}
              onClick={() => tap(p.kr, 'uz')}>{p.uz}</button>
          ))}
        </div>
      </div>
      {done && <div style={{ marginTop:16, textAlign:'center', fontSize:16, fontWeight:700, color:'#2E7D32' }}>Ajoyib! +{Math.max(15-errors*2,5)} XP</div>}
    </div>
  );
}
const s = {
  card:    { padding:'10px 8px', border:'1.5px solid #E0E0E0', borderRadius:10, background:'#fff', fontSize:14, cursor:'pointer', fontWeight:500, minHeight:44 },
  sel:     { border:'2px solid #1976D2', background:'#E3F2FD' },
  matched: { border:'2px solid #2ECC71', background:'#E8F5E9', opacity:0.6, cursor:'default' },
};
