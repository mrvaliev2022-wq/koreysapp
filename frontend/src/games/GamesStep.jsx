import { useState } from 'react';
import MatchPairs from './MatchPairs';
import FillBlank from './FillBlank';
import WordScramble from './WordScramble';

const GAMES = [
  { id:'match',    label:'Juftlik' },
  { id:'fill',     label:'Bosh joy' },
  { id:'scramble', label:'Soz' },
];

export default function GamesStep({ lesson }) {
  const [active, setActive] = useState('match');
  const [xpEarned, setXpEarned] = useState({});
  const c = lesson?.content || {};

  return (
    <div>
      <div style={{ display:'flex', gap:6, marginBottom:16 }}>
        {GAMES.map((g) => (
          <button key={g.id}
            style={{ flex:1, padding:'9px 0', border:'1.5px solid #E0E0E0', borderRadius:10,
                     background: active===g.id ? '#1976D2' : '#fff',
                     color: active===g.id ? '#fff' : '#333',
                     fontSize:13, fontWeight:500, cursor:'pointer' }}
            onClick={() => setActive(g.id)}>
            {xpEarned[g.id] ? +\ XP : g.label}
          </button>
        ))}
      </div>
      <div style={{ minHeight:300 }}>
        {active==='match'    && <MatchPairs   vocabulary={c.vocabulary||[]} onComplete={(xp)=>setXpEarned((p)=>({...p,match:xp}))} />}
        {active==='fill'     && <FillBlank    examples={c.examples||[]} vocabulary={c.vocabulary||[]} onComplete={(xp)=>setXpEarned((p)=>({...p,fill:xp}))} />}
        {active==='scramble' && <WordScramble vocabulary={c.vocabulary||[]} onComplete={(xp)=>setXpEarned((p)=>({...p,scramble:xp}))} />}
      </div>
      {Object.keys(xpEarned).length > 0 && (
        <div style={{ marginTop:16, textAlign:'center', fontSize:16, fontWeight:700, color:'#1976D2', background:'#E3F2FD', borderRadius:10, padding:12 }}>
          Jami: +{Object.values(xpEarned).reduce((a,b)=>a+b,0)} XP
        </div>
      )}
    </div>
  );
}
