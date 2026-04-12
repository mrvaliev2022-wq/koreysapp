import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { api } from '../api';
import GamesStep from '../games/GamesStep';

const STEPS       = ['Mavzu','Matn','Grammatika',"Lug'at",'Misollar','Dialog','Eslatmalar',"O'yinlar",'Test'];
const ALPHA_STEPS = ['Kirish','Unlilar','Undoshlar','Kuchlilar',"Bo'g'in","So'zlar",'Eslatmalar',"O'yinlar",'Test'];

export default function Lesson() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useStore();
  const [lesson, setLesson] = useState(null);
  const [step, setStep] = useState(0);
  const touchX = useRef(null);

  useEffect(() => { api.getLesson(id).then(setLesson).catch(() => nav('/learn')); }, [id]);

  function next() { if (step < 8) setStep(s => s + 1); else nav(`/test/${id}`); }
  function prev() { if (step > 0) setStep(s => s - 1); else nav('/learn'); }
  function onTouchStart(e) { touchX.current = e.touches[0].clientX; }
  function onTouchEnd(e) {
    if (touchX.current === null) return;
    const dx = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) dx > 0 ? next() : prev();
    touchX.current = null;
  }

  if (!lesson) return <div style={s.center}>Yuklanmoqda...</div>;

  const isAlpha   = lesson.level === 0 || !!lesson.content?.alphabet_data;
  const stepNames = isAlpha ? ALPHA_STEPS : STEPS;

  return (
    <div style={s.page} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

      {isAlpha && (
        <div style={s.alphaHeader}>
          <span style={s.alphaHeaderIcon}>한글</span>
          <div style={{ flex: 1 }}>
            <div style={s.alphaHeaderTitle}>Harflar</div>
            <div style={s.alphaHeaderSub}>Koreys tilida</div>
          </div>
          <span style={s.alphaHeaderFree}>✨ Bepul</span>
        </div>
      )}

      <div style={s.progressBg}>
        <div style={{ ...s.progressFill, width: `${((step+1)/9)*100}%`,
          background: isAlpha ? '#0D47A1' : '#1976D2' }} />
      </div>

      <div style={s.pills}>
        {stepNames.map((name, i) => (
          <div key={i} title={name} onClick={() => setStep(i)}
            style={{ ...s.pill,
              ...(i === step ? (isAlpha ? s.pillActiveAlpha : s.pillActive) : {}),
              ...(i < step   ? s.pillDone : {}) }}>
            {i < step ? '✓' : i + 1}
          </div>
        ))}
      </div>

      <div style={{ ...s.stepTitle, color: isAlpha ? '#0D47A1' : '#1a1a1a' }}>
        {step + 1}. {stepNames[step]}
      </div>

      <div style={s.content}>
        {isAlpha
          ? <AlphabetStepContent step={step} lesson={lesson} />
          : <StepContent        step={step} lesson={lesson} />}
      </div>

      <div style={s.navRow}>
        <button style={s.prevBtn} onClick={prev}>← Orqaga</button>
        <button style={{ ...s.nextBtn, background: isAlpha ? '#0D47A1' : '#1976D2' }} onClick={next}>
          {step === 8 ? "✅ Testga o'tish" : 'Keyingi →'}
        </button>
      </div>
    </div>
  );
}

// ── Alifbo 9 bosqich ──────────────────────────────────
function AlphabetStepContent({ step, lesson }) {
  const c  = lesson.content || {};
  const ad = c.alphabet_data || {};

  switch (step) {
    case 0: return (
      <div>
        <div style={a.heroBanner}>
          <div style={a.heroChar}>한글</div>
          <div style={a.heroTitle}>Harflar — Koreys tilida</div>
          <div style={a.heroSub}>Hangul · 1443-yil · Sejong the Great</div>
        </div>
        <AudioText text={c.topic?.kr} audioUrl={lesson.audio_urls?.topic} />
        <div style={s.uzText}>{c.topic?.uz}</div>
        <div style={a.tipBox}>
          💡 Hangul dunyodagi eng ilmiy yozuv tizimlaridan biri. O'qilishi = yozilishi.
        </div>
      </div>
    );

    case 1: return (
      <div>
        <div style={a.secTitle}>🔤 Asosiy unlilar — 모음</div>
        <div style={a.charGrid}>
          {(ad.vowels_basic||[]).map((v,i) => (
            <CharCard key={i} data={v} audioUrl={lesson.audio_urls?.[`vocab_${i}`]} />
          ))}
        </div>
        <div style={a.secTitle}>➕ Qo'shma unlilar</div>
        <div style={a.charGrid}>
          {(ad.vowels_compound||[]).map((v,i) => (
            <CharCard key={i} data={v} audioUrl={lesson.audio_urls?.[`vocab_${6+i}`]} small />
          ))}
        </div>
      </div>
    );

    case 2: return (
      <div>
        <div style={a.secTitle}>🔤 Asosiy undoshlar — 자음</div>
        <div style={a.charGrid}>
          {(ad.consonants_basic||[]).map((v,i) => (
            <CharCard key={i} data={v} audioUrl={lesson.audio_urls?.[`grammar_${i}`]} />
          ))}
        </div>
        <div style={a.noteBox}>
          ⚠️ <strong>ㅇ</strong> so'z boshida o'qilmaydi: 아 = "a"<br/>
          So'z oxirida "ng" o'qiladi: 방 = "bang"
        </div>
      </div>
    );

    case 3: return (
      <div>
        <div style={a.secTitle}>💪 Kuchli undoshlar — 쌍자음</div>
        <div style={a.charGrid}>
          {(ad.consonants_strong||[]).map((v,i) => (
            <CharCard key={i} data={v} accent="#B71C1C" />
          ))}
        </div>
        <div style={a.noteBox}>
          ⚡ Kuchli undoshlar ikki marta bosim bilan aytiladi. 빵 (ppang) = non
        </div>
        <div style={a.secTitle}>💨 Aspiratsiyali — 거센소리</div>
        <div style={a.charGrid}>
          {(ad.consonants_aspirated||[]).map((v,i) => (
            <CharCard key={i} data={v} accent="#1565C0" />
          ))}
        </div>
        <div style={a.noteBox}>
          💨 Aspiratsiyali — nafas chiqarib aytiladi. 코 (kʰo) = burun
        </div>
      </div>
    );

    case 4: return (
      <div>
        <div style={a.secTitle}>🧩 Bo'g'in tizimi</div>
        <div style={a.syllableRule}>
          <span style={a.syllableBox}>자음</span>
          <span style={a.plus}>+</span>
          <span style={a.syllableBox}>모음</span>
          <span style={a.plus}>=</span>
          <span style={{ ...a.syllableBox, background: '#0D47A1', color: '#fff' }}>음절</span>
        </div>
        <div style={a.secTitle}>📌 Ochiq bo'g'inlar</div>
        <div style={a.syllableList}>
          {(ad.syllable_examples||[]).map((ex,i) => (
            <div key={i} style={a.syllableRow}>
              <span style={a.syllableBig}>{ex.syllable}</span>
              <span style={a.syllableBreak}>{ex.breakdown}</span>
              <span style={a.syllableSound}>{ex.sound}</span>
            </div>
          ))}
        </div>
        <div style={a.secTitle}>📌 받침 — Oxirgi undosh</div>
        <div style={a.batchimGrid}>
          {(ad.batchim_examples||[]).map((ex,i) => (
            <div key={i} style={a.batchimCard}>
              <div style={a.batchimWord}>{ex.word}</div>
              <div style={a.batchimSound}>{ex.sound}</div>
              <div style={a.batchimMeaning}>{ex.meaning}</div>
              <div style={a.batchimRule}>{ex.batchim}</div>
            </div>
          ))}
        </div>
      </div>
    );

    case 5: return (
      <div>
        <div style={a.secTitle}>📝 Asosiy so'zlar</div>
        {c.vocabulary?.map((v,i) => (
          <div key={i} style={s.vocRow}>
            <AudioText text={v.kr} audioUrl={lesson.audio_urls?.[`vocab_${i}`]} small />
            <div style={s.roman}>{v.romanization}</div>
            <div style={s.uzSmall}>{v.uz}</div>
          </div>
        ))}
      </div>
    );

    case 6: return (
      <div>
        <div style={a.secTitle}>💡 Muhim eslatmalar</div>
        {c.notes?.map((note,i) => (
          <div key={i} style={s.note}>💡 {note}</div>
        ))}
        <div style={a.tipBox}>
          🎯 Har kuni 10 daqiqa ovoz chiqarib o'qing. Tezlik emas — to'g'rilik muhim!
        </div>
      </div>
    );

    case 7: return <GamesStep lesson={lesson} />;

    case 8: return (
      <div style={s.testHint}>
        ✅ Hangul testiga tayyor!
        <span style={{ fontSize:14, color:'#555', fontWeight:400, marginTop:8, display:'block' }}>
          7 ta savol — Hangul asoslari
        </span>
      </div>
    );
    default: return null;
  }
}

// ── Harf kartochkasi ──────────────────────────────────
function CharCard({ data, audioUrl, accent = '#1565C0', small }) {
  function play() { if (audioUrl) new Audio(audioUrl).play().catch(()=>{}); }
  return (
    <div style={{ ...a.charCard, borderColor: accent + '44' }} onClick={play}>
      <div style={{ ...a.charMain, color: accent, fontSize: small ? 26 : 32 }}>{data.char}</div>
      <div style={a.charSound}>[{data.sound}]</div>
      <div style={a.charExample}>{data.example_kr}</div>
      <div style={a.charMeaning}>{data.example_uz}</div>
      {audioUrl && <div style={a.charAudio}>🔊</div>}
    </div>
  );
}

// ── Oddiy dars bosqichlari ────────────────────────────
function StepContent({ step, lesson }) {
  const c = lesson.content || {};
  switch (step) {
    case 0: return (
      <div>
        <div style={s.krText}>{lesson.title_kr}</div>
        <div style={s.uzText}>{lesson.title_uz}</div>
      </div>
    );
    case 1: return (
      <div>
        <AudioText text={c.topic?.kr} audioUrl={lesson.audio_urls?.topic} />
        <div style={s.uzText}>{c.topic?.uz}</div>
      </div>
    );
    case 2: return (
      <div>
        <div style={s.block}>
          <div style={s.label}>Grammatika</div>
          <div style={s.uzText}>{c.grammar?.explanation}</div>
        </div>
        {c.grammar?.examples?.map((ex,i) => (
          <div key={i} style={s.exRow}>
            <AudioText text={ex.kr} audioUrl={lesson.audio_urls?.[`grammar_${i}`]} />
            <div style={s.uzSmall}>{ex.uz}</div>
          </div>
        ))}
      </div>
    );
    case 3: return (
      <div>
        {c.vocabulary?.map((v,i) => (
          <div key={i} style={s.vocRow}>
            <AudioText text={v.kr} audioUrl={lesson.audio_urls?.[`vocab_${i}`]} small />
            <div style={s.roman}>{v.romanization}</div>
            <div style={s.uzSmall}>{v.uz}</div>
          </div>
        ))}
      </div>
    );
    case 4: return (
      <div>
        {c.examples?.map((ex,i) => (
          <div key={i} style={s.exRow}>
            <AudioText text={ex.kr} audioUrl={lesson.audio_urls?.[`example_${i}`]} />
            <div style={s.uzSmall}>{ex.uz}</div>
          </div>
        ))}
      </div>
    );
    case 5: return (
      <div>
        {c.dialog?.map((line,i) => (
          <div key={i} style={{ ...s.dialogLine, ...(i%2 ? s.dialogRight : {}) }}>
            <span style={s.speaker}>{line.speaker}</span>
            <AudioText text={line.kr} audioUrl={lesson.audio_urls?.[`dialog_${i}`]} />
            <div style={s.uzSmall}>{line.uz}</div>
          </div>
        ))}
      </div>
    );
    case 6: return (
      <div>{c.notes?.map((note,i) => <div key={i} style={s.note}>💡 {note}</div>)}</div>
    );
    case 7: return <GamesStep lesson={lesson} />;
    case 8: return <div style={s.testHint}>✅ Test tayyor — "Testga o'tish" tugmasini bosing</div>;
    default: return null;
  }
}

// ── AudioText ────────────────────────────────────────
function AudioText({ text, audioUrl, small }) {
  function play() { if (audioUrl) new Audio(audioUrl).play().catch(()=>{}); }
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8,
                  cursor: audioUrl ? 'pointer' : 'default' }} onClick={play}>
      <span style={{ ...s.krText, fontSize: small ? 15 : undefined }}>{text}</span>
      {audioUrl && <span style={s.playBtn}>🔊</span>}
    </div>
  );
}

// ── STYLES ───────────────────────────────────────────
const s = {
  page:            { padding:'12px 16px 90px', minHeight:'100vh', userSelect:'none' },
  center:          { display:'flex', alignItems:'center', justifyContent:'center', height:'100vh' },
  progressBg:      { height:4, background:'#EEE', borderRadius:2, margin:'0 0 12px' },
  progressFill:    { height:'100%', borderRadius:2, transition:'width .3s' },
  pills:           { display:'flex', gap:4, overflowX:'auto', paddingBottom:8, marginBottom:8 },
  pill:            { minWidth:28, height:28, borderRadius:'50%', background:'#EEE', color:'#999',
                     display:'flex', alignItems:'center', justifyContent:'center', fontSize:11,
                     fontWeight:700, flexShrink:0, cursor:'pointer' },
  pillActive:      { background:'#1976D2', color:'#fff' },
  pillActiveAlpha: { background:'#0D47A1', color:'#fff' },
  pillDone:        { background:'#2ECC71', color:'#fff' },
  stepTitle:       { fontSize:18, fontWeight:700, marginBottom:16 },
  content:         { minHeight:300 },
  krText:          { fontSize:20, fontWeight:600, color:'#1a1a1a', lineHeight:1.6 },
  uzText:          { fontSize:15, color:'#555', marginTop:8 },
  uzSmall:         { fontSize:13, color:'#777', marginTop:4 },
  roman:           { fontSize:12, color:'#999', fontStyle:'italic' },
  label:           { fontSize:11, fontWeight:700, color:'#1976D2',
                     textTransform:'uppercase', marginBottom:6 },
  block:           { background:'#F0F7FF', borderRadius:10, padding:14, marginBottom:12 },
  exRow:           { borderLeft:'3px solid #1976D2', paddingLeft:12, marginBottom:14 },
  vocRow:          { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8,
                     borderBottom:'1px solid #F0F0F0', padding:'10px 0' },
  dialogLine:      { background:'#F8F8F8', borderRadius:10, padding:12, marginBottom:8, maxWidth:'80%' },
  dialogRight:     { marginLeft:'auto', background:'#E3F2FD' },
  speaker:         { fontSize:11, fontWeight:700, color:'#1976D2', marginBottom:4, display:'block' },
  note:            { background:'#FFFDE7', borderRadius:10, padding:14, marginBottom:10,
                     fontSize:14, color:'#5D4037', lineHeight:1.6 },
  playBtn:         { fontSize:16, opacity:0.7 },
  testHint:        { textAlign:'center', padding:'60px 20px', fontSize:18,
                     color:'#2E7D32', fontWeight:600, lineHeight:1.8 },
  navRow:          { position:'fixed', bottom:0, left:0, right:0, display:'flex', gap:8,
                     padding:'12px 16px', background:'#fff', borderTop:'1px solid #EEE' },
  prevBtn:         { flex:1, padding:14, border:'1.5px solid #E0E0E0', borderRadius:12,
                     background:'#fff', fontSize:15, cursor:'pointer', fontWeight:500 },
  nextBtn:         { flex:2, padding:14, color:'#fff', border:'none',
                     borderRadius:12, fontSize:15, fontWeight:700, cursor:'pointer' },
  alphaHeader:     { display:'flex', alignItems:'center', gap:12,
                     background:'linear-gradient(135deg,#0D47A1,#1565C0)',
                     borderRadius:14, padding:'12px 16px', marginBottom:14 },
  alphaHeaderIcon: { fontSize:26, fontWeight:800, color:'#fff',
                     background:'rgba(255,255,255,.15)', borderRadius:10, padding:'4px 10px' },
  alphaHeaderTitle:{ fontSize:17, fontWeight:800, color:'#fff' },
  alphaHeaderSub:  { fontSize:12, color:'#90CAF9', marginTop:2 },
  alphaHeaderFree: { marginLeft:'auto', fontSize:12, color:'#A5D6A7', fontWeight:700,
                     background:'rgba(255,255,255,.1)', borderRadius:20, padding:'4px 10px' },
};

const a = {
  heroBanner:   { background:'linear-gradient(135deg,#0D47A1,#1565C0)',
                  borderRadius:16, padding:24, textAlign:'center', marginBottom:20 },
  heroChar:     { fontSize:52, fontWeight:900, color:'#fff', lineHeight:1 },
  heroTitle:    { fontSize:20, fontWeight:800, color:'#fff', marginTop:8 },
  heroSub:      { fontSize:13, color:'#90CAF9', marginTop:4 },
  tipBox:       { background:'#E3F2FD', borderRadius:12, padding:14, marginTop:16,
                  fontSize:14, color:'#0D47A1', lineHeight:1.6 },
  noteBox:      { background:'#FFF3E0', borderRadius:12, padding:14, marginTop:12,
                  fontSize:13, color:'#E65100', lineHeight:1.7 },
  secTitle:     { fontSize:14, fontWeight:700, color:'#0D47A1',
                  marginBottom:12, marginTop:16,
                  borderLeft:'4px solid #0D47A1', paddingLeft:10 },
  charGrid:     { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:8 },
  charCard:     { background:'#F8FBFF', border:'1.5px solid',
                  borderRadius:14, padding:'12px 8px', textAlign:'center',
                  cursor:'pointer', display:'flex', flexDirection:'column',
                  alignItems:'center', gap:3 },
  charMain:     { fontWeight:900, lineHeight:1 },
  charSound:    { fontSize:11, color:'#666', fontStyle:'italic' },
  charExample:  { fontSize:13, fontWeight:600, color:'#1a1a1a', marginTop:4 },
  charMeaning:  { fontSize:11, color:'#888' },
  charAudio:    { fontSize:14, marginTop:2, opacity:0.6 },
  syllableRule: { display:'flex', alignItems:'center', justifyContent:'center',
                  gap:8, marginBottom:20, marginTop:8 },
  syllableBox:  { background:'#E3F2FD', border:'2px solid #1565C0',
                  borderRadius:10, padding:'8px 14px', fontSize:16,
                  fontWeight:700, color:'#0D47A1' },
  plus:         { fontSize:20, fontWeight:700, color:'#888' },
  syllableList: { display:'flex', flexDirection:'column', gap:8, marginBottom:16 },
  syllableRow:  { display:'flex', alignItems:'center', gap:12,
                  background:'#F8FBFF', borderRadius:10, padding:'10px 14px' },
  syllableBig:  { fontSize:28, fontWeight:800, color:'#0D47A1', minWidth:36 },
  syllableBreak:{ fontSize:13, color:'#666', flex:1 },
  syllableSound:{ fontSize:14, fontWeight:700, color:'#1565C0',
                  background:'#E3F2FD', borderRadius:8, padding:'3px 10px' },
  batchimGrid:  { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 },
  batchimCard:  { background:'#FFF8E1', border:'1.5px solid #FFE08255',
                  borderRadius:12, padding:'12px 8px', textAlign:'center' },
  batchimWord:  { fontSize:28, fontWeight:800, color:'#1a1a1a' },
  batchimSound: { fontSize:13, color:'#555', fontStyle:'italic' },
  batchimMeaning:{ fontSize:12, color:'#888', marginTop:2 },
  batchimRule:  { fontSize:11, color:'#E65100', fontWeight:700,
                  background:'#FFF3E0', borderRadius:6, padding:'2px 6px',
                  marginTop:6, display:'inline-block' },
};
