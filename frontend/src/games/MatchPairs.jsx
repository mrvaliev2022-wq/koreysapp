// MatchPairs.jsx — Korean word ↔ Uzbek meaning matching game
import { useState, useEffect } from 'react';

export default function MatchPairs({ vocabulary = [], onComplete }) {
  const [pairs, setPairs]     = useState([]);
  const [selected, setSelected] = useState(null); // { id, side }
  const [matched, setMatched]   = useState(new Set());
  const [errors, setErrors]     = useState(0);
  const [done, setDone]         = useState(false);

  useEffect(() => {
    // Pick 6 random words
    const words = [...vocabulary].sort(() => Math.random() - 0.5).slice(0, 6);
    setPairs(words);
    setMatched(new Set());
    setSelected(null);
    setErrors(0);
    setDone(false);
  }, [vocabulary]);

  function tap(id, side) {
    if (matched.has(id)) return;

    if (!selected) {
      setSelected({ id, side });
      return;
    }

    // Same card tapped again → deselect
    if (selected.id === id && selected.side === side) {
      setSelected(null);
      return;
    }

    // Must select opposite sides
    if (selected.side === side) {
      setSelected({ id, side });
      return;
    }

    // Check if IDs match
    if (selected.id === id) {
      const next = new Set([...matched, id]);
      setMatched(next);
      setSelected(null);
      if (next.size === pairs.length) {
        setDone(true);
        onComplete?.(Math.max(15 - errors * 2, 5)); // XP: 15 - penalty
      }
    } else {
      setErrors((e) => e + 1);
      setSelected(null);
    }
  }

  function isSelected(id, side) {
    return selected?.id === id && selected?.side === side;
  }

  const krCol  = [...pairs].sort(() => Math.random() - 0.5);
  const uzCol  = [...pairs].sort(() => Math.random() - 0.5);

  return (
    <div style={s.wrap}>
      <div style={s.header}>
        <span style={s.title}>🃏 Juftlikni toping</span>
        <span style={s.err}>❌ {errors}</span>
      </div>

      <div style={s.grid}>
        <div style={s.col}>
          {krCol.map((p) => (
            <button key={`kr-${p.kr}`}
              style={{ ...s.card,
                ...(matched.has(p.kr) ? s.cardMatched : {}),
                ...(isSelected(p.kr, 'kr') ? s.cardSelected : {}) }}
              onClick={() => tap(p.kr, 'kr')}>
              {p.kr}
            </button>
          ))}
        </div>

        <div style={s.col}>
          {uzCol.map((p) => (
            <button key={`uz-${p.kr}`}
              style={{ ...s.card,
                ...(matched.has(p.kr) ? s.cardMatched : {}),
                ...(isSelected(p.kr, 'uz') ? s.cardSelected : {}) }}
              onClick={() => tap(p.kr, 'uz')}>
              {p.uz}
            </button>
          ))}
        </div>
      </div>

      {done && (
        <div style={s.done}>
          🎉 Ajoyib! +{Math.max(15 - errors * 2, 5)} XP
        </div>
      )}
    </div>
  );
}

const s = {
  wrap:        { padding: '8px 0' },
  header:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title:       { fontSize: 15, fontWeight: 700 },
  err:         { fontSize: 14 },
  grid:        { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 },
  col:         { display: 'flex', flexDirection: 'column', gap: 8 },
  card:        { padding: '10px 8px', border: '1.5px solid #E0E0E0', borderRadius: 10,
                 background: '#fff', fontSize: 14, cursor: 'pointer', fontWeight: 500,
                 transition: 'all .15s', minHeight: 44 },
  cardSelected:{ border: '2px solid #1976D2', background: '#E3F2FD' },
  cardMatched: { border: '2px solid #2ECC71', background: '#E8F5E9', opacity: 0.6, cursor: 'default' },
  done:        { marginTop: 16, textAlign: 'center', fontSize: 16, fontWeight: 700, color: '#2E7D32' },
};
