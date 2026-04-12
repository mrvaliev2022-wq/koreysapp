// GamesStep.jsx — shown in lesson step 8
import { useState } from 'react';
import MatchPairs   from './MatchPairs';
import FillBlank    from './FillBlank';
import WordScramble from './WordScramble';

const GAMES = [
  { id: 'match',    label: '🃏 Juftlik',    icon: '🃏' },
  { id: 'fill',     label: '✏️ Bo\'sh joy', icon: '✏️' },
  { id: 'scramble', label: '🔀 So\'z',      icon: '🔀' },
];

export default function GamesStep({ lesson }) {
  const [active, setActive] = useState('match');
  const [xpEarned, setXpEarned] = useState({});

  const content = lesson?.content || {};

  function handleComplete(gameId, xp) {
    setXpEarned((prev) => ({ ...prev, [gameId]: xp }));
  }

  return (
    <div>
      {/* Game tabs */}
      <div style={s.tabs}>
        {GAMES.map((g) => (
          <button key={g.id}
            style={{ ...s.tab, ...(active === g.id ? s.tabActive : {}) }}
            onClick={() => setActive(g.id)}>
            {g.icon} {xpEarned[g.id] ? `+${xpEarned[g.id]}` : g.label.split(' ')[1]}
          </button>
        ))}
      </div>

      {/* Active game */}
      <div style={s.gameArea}>
        {active === 'match' && (
          <MatchPairs
            vocabulary={content.vocabulary || []}
            onComplete={(xp) => handleComplete('match', xp)}
          />
        )}
        {active === 'fill' && (
          <FillBlank
            examples={content.examples || []}
            vocabulary={content.vocabulary || []}
            onComplete={(xp) => handleComplete('fill', xp)}
          />
        )}
        {active === 'scramble' && (
          <WordScramble
            vocabulary={content.vocabulary || []}
            onComplete={(xp) => handleComplete('scramble', xp)}
          />
        )}
      </div>

      {/* Total XP earned */}
      {Object.keys(xpEarned).length > 0 && (
        <div style={s.totalXp}>
          ⚡ Jami: +{Object.values(xpEarned).reduce((a, b) => a + b, 0)} XP
        </div>
      )}
    </div>
  );
}

const s = {
  tabs:    { display: 'flex', gap: 6, marginBottom: 16 },
  tab:     { flex: 1, padding: '9px 0', border: '1.5px solid #E0E0E0', borderRadius: 10,
             background: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' },
  tabActive:{ background: '#1976D2', color: '#fff', borderColor: '#1976D2' },
  gameArea:{ minHeight: 300 },
  totalXp: { marginTop: 16, textAlign: 'center', fontSize: 16, fontWeight: 700,
             color: '#1976D2', background: '#E3F2FD', borderRadius: 10, padding: 12 },
};
