// backend/src/seeds/eps_topik_level3.js
// EPS-TOPIK 3-daraja: 10 ta to'liq dars (Lesson 21-30)
// Manba: eps1.docx (21-30 mavzular)
// Audio URL: {CDN_URL}/{lessonId}-{key}.mp3 — Edge TTS (ko-KR-SunHiNeural)
// PC / iOS / Android — to'liq ishlaydigan
// Usage: node src/seeds/eps_topik_level3.js

require('dotenv').config({ path: '../../.env' });
const db = require('../db');

// ─────────────────────────────────────────
// Audio URL builder — 37 ta key
// ─────────────────────────────────────────
function buildAudioUrls(lessonDbId) {
  const base = process.env.R2_CDN_URL || 'https://audio.koreysapp.com';
  const keys = [
    'topic',
    ...Array.from({ length: 5  }, (_, i) => `grammar_${i}`),
    ...Array.from({ length: 20 }, (_, i) => `vocab_${i}`),
    ...Array.from({ length: 5  }, (_, i) => `example_${i}`),
    ...Array.from({ length: 6  }, (_, i) => `dialog_${i}`),
  ];
  const urls = {};
  keys.forEach(k => { urls[k] = `${base}/${lessonDbId}-${k}.mp3`; });
  return urls;
}

const LESSONS = [

  // ════════════════════════════════════════════
  // DARS 21: 병원 — Shifoxona
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 3, order_in_level: 1,
    title_kr: '병원 — 아플 때 어떻게 해요?',
    title_uz: "Shifoxona — Og'riganda nima qilasiz?",
    is_free: true,
    content: {
      topic: {
        kr: '어디가 아파요? 머리가 아파요. 열이 나요? 네, 열이 나요. 아프면 병원에 가야 해요. 의사 선생님이 약을 주셨어요. 운동하지 마세요. 충분히 쉬세요.',
        uz: "Qayeringiz og'riyapti? Boshim og'riyapti. Isitmangiz bormi? Ha, isitmam bor. Og'risa shifoxonaga borish kerak. Shifokor dori berdиlar. Sport qilmang. Yetarlicha dam oling."
      },
      grammar: {
        explanation: `-(으)면 — "agar" shart bildiradi

Tuzilish:
• Undosh → 으면
• Unli   → 면

• 아프면 병원에 가요    → Agar og'risa, shifoxonaga boraman
• 열이 나면 약을 먹어요 → Agar isitma chiqsa, dori ichaman
• 추우면 옷을 입으세요 → Agar sovuq bo'lsa, kiyim kiyingg

-지 마세요 — "qilmang" (muloyim taqiq)

Tuzilish: [fe'l] + 지 마세요

• 물을 마시지 마세요  → Suv ichmang
• 운동하지 마세요     → Sport qilmang
• 나가지 마세요       → Tashqariga chiqmang
• 걱정하지 마세요     → Xavotir olmang

💡 Farq:
-(으)세요   = "qiling" (buyruq/tavsiya)
-지 마세요  = "qilmang" (taqiq/tavsiya)`,
        examples: [
          { kr: '아프면 바로 병원에 가야 해요.',        uz: "Og'risa darhol shifoxonaga borish kerak." },
          { kr: '열이 나면 약을 먹고 쉬세요.',          uz: "Isitma chiqsa dori ichib dam oling." },
          { kr: '무거운 것을 들지 마세요. 허리가 아파요.', uz: "Og'ir narsa ko'tarmang. Belim og'riyapti." },
          { kr: '감기에 걸리면 따뜻하게 입으세요.',      uz: "Shamollab qolsangiz iliq kiyining." },
          { kr: '많이 아프면 혼자 오지 마세요.',         uz: "Juda og'risa yolg'iz kelmang." },
        ]
      },
      vocabulary: [
        { kr: '병원',     romanization: 'byeongwon',   uz: 'shifoxona' },
        { kr: '의사',     romanization: 'uisa',        uz: 'shifokor' },
        { kr: '간호사',   romanization: 'ganhosa',     uz: 'hamshira' },
        { kr: '약',       romanization: 'yak',         uz: 'dori' },
        { kr: '아프다',   romanization: 'apeuda',      uz: "og'rimoq" },
        { kr: '열이 나다',romanization: 'yeori nada',  uz: 'isitma chiqmoq' },
        { kr: '기침하다', romanization: 'gichimhada',  uz: "yo'talmoq" },
        { kr: '감기',     romanization: 'gamgi',       uz: 'shamollash' },
        { kr: '머리',     romanization: 'meori',       uz: 'bosh' },
        { kr: '배',       romanization: 'bae',         uz: 'qorin' },
        { kr: '목',       romanization: 'mok',         uz: 'bo\'g\'iz, bo\'yin' },
        { kr: '허리',     romanization: 'heori',       uz: 'bel' },
        { kr: '손',       romanization: 'son',         uz: "qo'l" },
        { kr: '발',       romanization: 'bal',         uz: 'oyoq' },
        { kr: '처방전',   romanization: 'cheobangjeon',uz: 'retsept' },
        { kr: '주사',     romanization: 'jusa',        uz: "ukol, in'yeksiya" },
        { kr: '수술',     romanization: 'susul',       uz: 'operatsiya' },
        { kr: '괜찮다',   romanization: 'gwaenchanta', uz: "yaxshi, muammo yo'q" },
        { kr: '쉬다',     romanization: 'swida',       uz: 'dam olmoq' },
        { kr: '입원하다', romanization: 'ibwonhada',   uz: 'kasalxonaga yotmoq' },
      ],
      examples: [
        { kr: '머리가 아파요. 열도 나요. 병원에 가야겠어요.',    uz: "Boshim og'riyapti. Isitmam ham bor. Shifoxonaga borish kerak." },
        { kr: '의사 선생님이 이틀간 쉬라고 하셨어요.',           uz: "Shifokor ikki kun dam olishimni aytdilar." },
        { kr: '감기에 걸리면 따뜻한 물을 많이 마시세요.',        uz: "Shamollab qolsangiz ko'p iliq suv iching." },
        { kr: '운동하지 마세요. 지금 몸 상태가 안 좋아요.',      uz: "Sport qilmang. Hozir ahvolim yaxshi emas." },
        { kr: '많이 아프지 않으면 약국에서 약을 사도 돼요.',     uz: "Juda og'rimasa dorixonadan dori sotib olib ham bo'ladi." },
      ],
      dialog: [
        { speaker: 'A', kr: '어디가 아파요?',                          uz: "Qayeringiz og'riyapti?" },
        { speaker: 'B', kr: '머리가 너무 아프고 열도 나요.',            uz: "Boshim juda og'riyapti va isitmam ham bor." },
        { speaker: 'A', kr: '언제부터 아팠어요?',                       uz: "Qachondan beri og'riyapti?" },
        { speaker: 'B', kr: '어제부터 아팠어요. 기침도 해요.',          uz: "Kechadan beri og'riyapti. Yo'talim ham bor." },
        { speaker: 'A', kr: '오늘은 일하지 마세요. 집에서 쉬세요.',    uz: "Bugun ishlamang. Uyda dam oling." },
        { speaker: 'B', kr: '알겠어요. 병원에 먼저 가려고 해요.',       uz: "Tushundim. Avval shifoxonaga bormoqchiman." },
      ],
      notes: [
        "-(으)면: shart: 아프면(og'risa), 춥면(sovuq bo'lsa), 좋으면(yaxshi bo'lsa).",
        "-지 마세요: muloyim taqiq: 마시지 마세요(ichmang), 가지 마세요(bormang).",
        "어디가 아파요? — 'Qayeringiz og'riyapti?' — shifoxonada birinchi savol.",
        "입원하다 (kasalxonaga yotmoq) vs 통원하다 (tashqi bemorga bormoq).",
        "Koreyada sug'urta (건강 보험) bor: EPS ishchilari ham undan foydalanishi mumkin.",
      ],
      games: {
        matchPairs: [
          { kr: '병원',   uz: 'shifoxona' },
          { kr: '의사',   uz: 'shifokor' },
          { kr: '간호사', uz: 'hamshira' },
          { kr: '감기',   uz: 'shamollash' },
          { kr: '처방전', uz: 'retsept' },
          { kr: '쉬다',   uz: 'dam olmoq' },
        ],
        fillBlank: [
          { sentence: '아프___ 병원에 가야 해요.',       answer: '면',    options: ['면','서','고','지만'],        uz: "Og'risa shifoxonaga borish kerak." },
          { sentence: '운동하___ 마세요.',               answer: '지',    options: ['지','고','서','면'],          uz: "Sport qilmang." },
          { sentence: '머리가 ___ 요.',                  answer: '아파',  options: ['아파','좋아','괜찮아','커'],  uz: "Boshim og'riyapti." },
          { sentence: '열이 나면 약을 먹___ 쉬세요.',    answer: '고',    options: ['고','서','면','지만'],        uz: "Isitma chiqsa dori ichib dam oling." },
          { sentence: '많이 아프면 혼자 오지 ___.',      answer: '마세요',options: ['마세요','세요','해요','봐요'],uz: "Juda og'risa yolg'iz kelmang." },
        ],
        scramble: [
          { kr: '병원',   uz: 'shifoxona' },
          { kr: '감기',   uz: 'shamollash' },
          { kr: '머리',   uz: 'bosh' },
          { kr: '약',     uz: 'dori' },
          { kr: '쉬다',   uz: 'dam olmoq' },
        ],
      },
    },
    quiz: [
      { question: "'아프면 병원에 가요' — '-(으)면' nima bildiradi?", options: ['natija','agar shart','lekin','shuning uchun'],             correct_index: 1 },
      { question: "'운동하지 마세요' tarjimasi?",                    options: ['Sport qiling','Sport qilmang','Sport qilyapman','Sport qildim'], correct_index: 1 },
      { question: "'열이 나다' nimani anglatadi?",                   options: ['isitma chiqmoq','bosh og\'rimoq','yo\'talmoq','shamollash'], correct_index: 0 },
      { question: "'괜찮다' nimani anglatadi?",                      options: ["og'riyapti","yaxshi, muammo yo'q",'dam olmoq','bormoq'],    correct_index: 1 },
      { question: "'입원하다' nimani anglatadi?",                    options: ['shifoxonaga bormoq','kasalxonaga yotmoq','dori ichmoq','dam olmoq'], correct_index: 1 },
      { question: "Undosh tugagan fe'lga '-(으)면' qanday?",        options: ['면','으면','이면','아면'],                                  correct_index: 1 },
      { question: "'처방전' nimani anglatadi?",                      options: ['dori','retsept','operatsiya','hamshira'],                   correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 22: 약국 — Dorixona
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 3, order_in_level: 2,
    title_kr: '약국 — 약을 사러 가요',
    title_uz: "Dorixona — Dori sotib olishga boraman",
    is_free: true,
    content: {
      topic: {
        kr: '어디가 아파요? 머리가 아파요. 왜 약을 사요? 아프니까 약을 사요. 약을 언제 먹어요? 밥을 먹은 후에 먹어요. 기침이 나니까 병원에 가요. 이 약을 하루에 세 번 드세요.',
        uz: "Qayeringiz og'riyapti? Boshim og'riyapti. Nega dori olasiz? Og'riyapti shuning uchun dori olaman. Dorini qachon ichasiz? Ovqatdan keyin ichaman. Yo'tal bor shuning uchun shifoxonaga boraman. Bu dorini kuniga uch marta iching."
      },
      grammar: {
        explanation: `-(으)니까 — "chunki / sababli" (sabab bildiradi)

Tuzilish:
• Undosh → 으니까
• Unli   → 니까

• 아프니까 약을 먹어요      → Og'riyapti, shuning uchun dori ichaman
• 기침이 나니까 병원에 가요  → Yo'tal bor, shuning uchun shifoxonaga boraman
• 바쁘니까 못 가요          → Bandman, shuning uchun bora olmayman

💡 Farq:
-아서/어서 — sabab (buyruq/tavsiya bilan ISHLATILMAYDI)
-(으)니까  — sabab (buyruq/tavsiyadan OLDIN ishlatiladi)

-(으)ㄴ 후에 — "...dan keyin"

Tuzilish: [fe'l + (으)ㄴ] + 후에
• Undosh → 은 후에
• Unli   → ㄴ 후에

• 약을 먹은 후에 쉬어요   → Dori ichgandan keyin dam olaman
• 밥을 먹은 후에 약을 먹어요 → Ovqatdan keyin dori ichaman
• 일한 후에 씻어요        → Ishlagandan keyin yuvinaman`,
        examples: [
          { kr: '머리가 아프니까 두통약을 주세요.',       uz: "Boshim og'riyapti, shuning uchun bosh og'riq dori bering." },
          { kr: '이 약은 밥을 먹은 후에 드세요.',         uz: "Bu dorini ovqatdan keyin iching." },
          { kr: '기침이 심하니까 병원에 가는 게 좋아요.',  uz: "Yo'tal kuchli shuning uchun shifoxonaga borish yaxshi." },
          { kr: '약을 받은 후에 복용법을 꼭 읽으세요.',   uz: "Dori olgandan keyin ishlatish yo'riqnomasini albatta o'qing." },
          { kr: '배가 아프니까 소화제가 있어요?',          uz: "Qorinim og'riyapti, hazm dori bormi?" },
        ]
      },
      vocabulary: [
        { kr: '약국',       romanization: 'yakguk',       uz: 'dorixona' },
        { kr: '약사',       romanization: 'yaksa',        uz: 'farmatsevt' },
        { kr: '약',         romanization: 'yak',          uz: 'dori' },
        { kr: '처방전',     romanization: 'cheobangjeon', uz: 'retsept' },
        { kr: '기침',       romanization: 'gichim',       uz: "yo'tal" },
        { kr: '두통',       romanization: 'dutong',       uz: "bosh og'rig'i" },
        { kr: '열',         romanization: 'yeol',         uz: 'isitma' },
        { kr: '콧물',       romanization: 'konmul',       uz: 'burun oqishi' },
        { kr: '두통약',     romanization: 'dutongyak',    uz: "bosh og'riq dorisi" },
        { kr: '소화제',     romanization: 'sohwaje',      uz: 'hazm dorisi' },
        { kr: '진통제',     romanization: 'jintonge',     uz: "og'riq qoldiruvchi" },
        { kr: '항생제',     romanization: 'hangsaengje',  uz: 'antibiotik' },
        { kr: '복용하다',   romanization: 'bogyonghada',  uz: 'dori ichmoq, qabul qilmoq' },
        { kr: '복용법',     romanization: 'bogyongbeop',  uz: "ishlatish yo'riqnomasi" },
        { kr: '하루에',     romanization: 'harue',        uz: 'kuniga' },
        { kr: '번',         romanization: 'beon',         uz: 'marta' },
        { kr: '식후',       romanization: 'sikhu',        uz: 'ovqatdan keyin' },
        { kr: '식전',       romanization: 'sikjeon',      uz: 'ovqatdan oldin' },
        { kr: '부작용',     romanization: 'bujagyong',    uz: "yon ta'sir" },
        { kr: '알레르기',   romanization: 'allereugi',    uz: 'allergiya' },
      ],
      examples: [
        { kr: '목이 아프니까 이 약을 드세요. 하루에 세 번, 식후에 드세요.',     uz: "Bo'g'zingiz og'riyapti, bu dorini iching. Kuniga uch marta, ovqatdan keyin." },
        { kr: '열이 많이 나니까 해열제를 먼저 드세요.',                        uz: "Isitma juda ko'p, shuning uchun avval isitma tushiruvchi dori iching." },
        { kr: '처방전 없이 살 수 있는 약이 있어요?',                           uz: "Retseptsiz sotib olsa bo'ladigan dori bormi?" },
        { kr: '약을 먹은 후에 알레르기 반응이 있으면 바로 알려주세요.',         uz: "Dori ichgandan keyin allergiya bo'lsa darhol xabar bering." },
        { kr: '이 약은 식전에 드셔야 해요. 빈속에 드세요.',                    uz: "Bu dorini ovqatdan oldin ichish kerak. Och qoringa iching." },
      ],
      dialog: [
        { speaker: 'A', kr: '어서 오세요. 어디가 불편하세요?',                uz: "Xush kelibsiz. Qayeringiz noqulay?" },
        { speaker: 'B', kr: '머리가 아프고 열이 나니까 약이 필요해요.',        uz: "Boshim og'riyapti va isitma bor, shuning uchun dori kerak." },
        { speaker: 'A', kr: '처방전 있으세요?',                               uz: "Retseptingiz bormi?" },
        { speaker: 'B', kr: '아니요, 없어요. 그냥 두통약 주세요.',            uz: "Yo'q, yo'q. Oddiy bosh og'riq dori bering." },
        { speaker: 'A', kr: '이 약 드세요. 식후에 하루 세 번 드시면 돼요.',   uz: "Bu dorini iching. Ovqatdan keyin kuniga uch marta ichsangiz bo'ladi." },
        { speaker: 'B', kr: '알겠어요. 부작용은 없어요?',                     uz: "Tushundim. Yon ta'siri yo'qmi?" },
      ],
      notes: [
        "-(으)니까: 아프니까(og'riyapti shuning uchun), 바쁘니까(bandman shuning uchun).",
        "-(으)ㄴ 후에: 먹은 후에(yegandan keyin), 일한 후에(ishlagandan keyin).",
        "식후 (ovqatdan keyin), 식전 (ovqatdan oldin), 식간 (ovqatlar orasida) — dori ichish vaqti.",
        "하루에 세 번 — kuniga uch marta: 아침, 점심, 저녁 (ertalab, tushlik, kechqurun).",
        "EPS ishchilari uchun 건강보험 (sog'lik sug'urtasi) — rasmiy ishlasangiz bepul davolanish.",
      ],
      games: {
        matchPairs: [
          { kr: '약국',   uz: 'dorixona' },
          { kr: '두통',   uz: "bosh og'rig'i" },
          { kr: '식후',   uz: 'ovqatdan keyin' },
          { kr: '식전',   uz: 'ovqatdan oldin' },
          { kr: '복용하다',uz: 'dori ichmoq' },
          { kr: '알레르기',uz: 'allergiya' },
        ],
        fillBlank: [
          { sentence: '아프___ 약을 사요.',              answer: '니까',  options: ['니까','면','서','고'],         uz: "Og'riyapti shuning uchun dori olaman." },
          { sentence: '밥을 먹___ 후에 약을 먹어요.',    answer: '은',    options: ['은','는','을','이'],           uz: "Ovqatdan keyin dori ichaman." },
          { sentence: '하루에 ___ 번 드세요.',           answer: '세',    options: ['세','두','한','네'],           uz: "Kuniga uch marta iching." },
          { sentence: '기침이 나___ 병원에 가요.',       answer: '니까',  options: ['니까','면','서','고'],         uz: "Yo'tal bor shuning uchun shifoxonaga boraman." },
          { sentence: '처방전 없이 살 수 ___ 약이 있어요?',answer:'있는',options: ['있는','없는','되는','하는'],    uz: "Retseptsiz sotib olsa bo'ladigan dori bormi?" },
        ],
        scramble: [
          { kr: '약국',   uz: 'dorixona' },
          { kr: '기침',   uz: "yo'tal" },
          { kr: '두통',   uz: "bosh og'rig'i" },
          { kr: '식후',   uz: 'ovqatdan keyin' },
          { kr: '약',     uz: 'dori' },
        ],
      },
    },
    quiz: [
      { question: "'아프니까 약을 먹어요' — '-(으)니까' nima bildiradi?", options: ['shart','sabab (chunki)','lekin','keyin'],                  correct_index: 1 },
      { question: "'밥을 먹은 후에' tarjimasi?",                          options: ['ovqat olgandan oldin','ovqat yeyish uchun','ovqatdan keyin','ovqat yeyayotganda'], correct_index: 2 },
      { question: "'두통약' nimani anglatadi?",                           options: ['hazm dorisi',"bosh og'riq dorisi",'antibiotik','isitma dorisi'], correct_index: 1 },
      { question: "'식전' nimani anglatadi?",                             options: ['ovqatdan keyin','ovqatdan oldin','ovqat vaqtida','har doim'], correct_index: 1 },
      { question: "'부작용' nimani anglatadi?",                           options: ['allergiya','retsept',"yon ta'sir",'antibiotik'],             correct_index: 2 },
      { question: "'-아서/어서' va '-(으)니까' farqi?",                  options: ['Farq yo\'q','아서=doim; 니까=buyruqdan oldin ham','니까=doim; 아서=buyruqdan oldin','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'복용하다' nimani anglatadi?",                         options: ['sotib olmoq','dori ichmoq, qabul qilmoq','bermoq','kutmoq'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 23: 우체국 — Pochta
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 3, order_in_level: 3,
    title_kr: '우체국 — 소포를 보내러 가요',
    title_uz: "Pochta — Posilka yuborishga boraman",
    is_free: false,
    content: {
      topic: {
        kr: '뭐 해요? 소포를 보내요. 편지를 보내는데 시간이 걸려요. 주소를 쓰는데 어려워요. 여기 우체국이지요? 네, 맞아요. 이 소포를 우즈베키스탄으로 보내고 싶어요.',
        uz: "Nima qilyapsiz? Posilka yuboryapman. Xat yuborish vaqt oladi. Manzil yozish qiyin. Bu pochta to'g'rimi? Ha, to'g'ri. Bu posilkani O'zbekistonga yubormoqchiman."
      },
      grammar: {
        explanation: `-는데 — holat tushuntirish / ma'lumot berish

Tuzilish: [fe'l/sifat] + 는데

Ishlatilishi:
1. Holat tushuntirish:
   • 편지를 보내는데 시간이 걸려요
     → Xat yuborish [holat ko'rsatmoqda] vaqt oladi

2. Qarama-qarshilik (lekin):
   • 집이 작은데 깨끗해요
     → Uy kichik, lekin toza

3. Tayyorgarlik:
   • 지금 바쁜데 나중에 가요
     → Hozir bandman, keyin boraman

-지요? (죠?) — "to'g'rimi? / shundaymi?"

Tuzilish: [gap] + 지요?
Qisqartmasi: 죠?

• 여기 우체국이지요?  → Bu pochta to'g'rimi?
• 이 주소 맞지요?    → Bu manzil to'g'rimi?
• 한국 사람이죠?     → Koreyalik to'g'rimi?`,
        examples: [
          { kr: '소포를 보내는데 가장 빠른 방법이 뭐예요?',   uz: "Posilka yuborishda eng tez usul qaysi?" },
          { kr: '주소를 쓰는데 영어로 써도 돼요?',            uz: "Manzil yozishda inglizcha yozsam ham bo'ladimi?" },
          { kr: '여기서 우즈베키스탄으로 보내지요?',          uz: "Bu yerdan O'zbekistonga yuboriladi to'g'rimi?" },
          { kr: '택배 요금이 비싼데 빠르게 가요.',             uz: "Yetkazib berish narxi qimmat, lekin tez boradi." },
          { kr: '무게가 5킬로인데 요금이 얼마예요?',          uz: "Og'irligi 5 kilo, to'lov qancha?" },
        ]
      },
      vocabulary: [
        { kr: '우체국',   romanization: 'ucheguk',      uz: 'pochta' },
        { kr: '편지',     romanization: 'pyeonji',      uz: 'xat' },
        { kr: '소포',     romanization: 'sopo',         uz: 'posilka' },
        { kr: '택배',     romanization: 'taekbae',      uz: 'yetkazib berish xizmati' },
        { kr: '주소',     romanization: 'juso',         uz: 'manzil' },
        { kr: '보내다',   romanization: 'bonaeda',      uz: 'yubormoq' },
        { kr: '받다',     romanization: 'batda',        uz: 'qabul qilmoq' },
        { kr: '쓰다',     romanization: 'sseuda',       uz: 'yozmoq' },
        { kr: '붙이다',   romanization: 'buchida',      uz: 'yopishtirmoq' },
        { kr: '이름',     romanization: 'ireum',        uz: 'ism' },
        { kr: '전화번호', romanization: 'jeonhwabeonho',uz: 'telefon raqami' },
        { kr: '요금',     romanization: 'yogeum',       uz: "to'lov, narx" },
        { kr: '무게',     romanization: 'muge',         uz: "og'irlik" },
        { kr: '국제',     romanization: 'gukje',        uz: 'xalqaro' },
        { kr: '항공',     romanization: 'hanggong',     uz: 'avia (havo orqali)' },
        { kr: '해상',     romanization: 'haesang',      uz: 'dengiz orqali' },
        { kr: '등기',     romanization: 'deunggi',      uz: 'ro\'yxatdan o\'tkazilgan xat' },
        { kr: '추적',     romanization: 'chujek',       uz: 'kuzatib borish (tracking)' },
        { kr: '신청서',   romanization: 'sincheongseo', uz: 'ariza blanki' },
        { kr: '확인하다', romanization: 'hwaginhada',   uz: 'tekshirmoq, tasdiqlash' },
      ],
      examples: [
        { kr: '가족에게 소포를 보내는데 무게 제한이 있어요?',      uz: "Oilaga posilka yuborishda og'irlik cheklovi bormi?" },
        { kr: '항공으로 보내는데 일주일 정도 걸려요.',              uz: "Avia orqali yuborishda taxminan bir hafta ketadi." },
        { kr: '주소를 정확히 써야 하는데 도와주실 수 있어요?',      uz: "Manzilni aniq yozish kerak, yordam bera olasizmi?" },
        { kr: '이거 우즈베키스탄으로 보내려고 하는데 얼마예요?',    uz: "Buni O'zbekistonga yubormoqchiman, qancha?" },
        { kr: '영수증 받으시죠? 분실 시 필요해요.',                 uz: "Chek olasiz to'g'rimi? Yo'qolsa kerak bo'ladi." },
      ],
      dialog: [
        { speaker: 'A', kr: '어서 오세요. 무엇을 도와드릴까요?',            uz: "Xush kelibsiz. Nima bilan yordam bera olaman?" },
        { speaker: 'B', kr: '우즈베키스탄으로 소포를 보내고 싶은데요.',      uz: "O'zbekistonga posilka yubormoqchiman." },
        { speaker: 'A', kr: '항공으로 보내세요, 해상으로 보내세요?',         uz: "Avia orqali yuboresizmi, dengiz orqali yuboresizmi?" },
        { speaker: 'B', kr: '빠른 게 좋은데 항공은 얼마예요?',              uz: "Tezi yaxshi, avia qancha?" },
        { speaker: 'A', kr: '5킬로면 3만원이에요. 영수증 드릴까요?',        uz: "5 kilo bo'lsa 30,000 won. Chek beraymi?" },
        { speaker: 'B', kr: '네, 주세요. 여기 우체국이지요? 맞게 왔죠?',    uz: "Ha, bering. Bu pochta to'g'rimi? To'g'ri keldimmi?" },
      ],
      notes: [
        "-는데: holat + ma'lumot: 보내는데(yuborayotganda), 바쁜데(bandman lekin).",
        "-지요?(죠?): tasdiq so'rash: 맞지요?(to'g'rimi?), 가죠?(boradi to'g'rimi?).",
        "항공 (avia) — tez, qimmat; 해상 (dengiz) — sekin, arzon — pochta tanlash.",
        "추적번호 (tracking raqami) — posilka jo'natilgandan keyin olish muhim.",
        "EPS ishchilari oilaga posilka: kiyim, non-perishable ovqatlar, dori yuborilishi mumkin.",
      ],
      games: {
        matchPairs: [
          { kr: '우체국',   uz: 'pochta' },
          { kr: '소포',     uz: 'posilka' },
          { kr: '주소',     uz: 'manzil' },
          { kr: '항공',     uz: 'avia' },
          { kr: '무게',     uz: "og'irlik" },
          { kr: '확인하다', uz: 'tasdiqlash' },
        ],
        fillBlank: [
          { sentence: '편지를 보내___ 시간이 걸려요.',      answer: '는데',  options: ['는데','서','고','면'],         uz: "Xat yuborish vaqt oladi." },
          { sentence: '여기 우체국이___?',                  answer: '지요',  options: ['지요','해요','가요','봐요'],   uz: "Bu pochta to'g'rimi?" },
          { sentence: '주소를 쓰는데 ___.',                 answer: '어려워요', options: ['어려워요','쉬워요','좋아요','빨라요'], uz: "Manzil yozish qiyin." },
          { sentence: '우즈베키스탄으로 ___ 싶어요.',      answer: '보내고', options: ['보내고','받고','쓰고','가고'],  uz: "O'zbekistonga yubormoqchiman." },
          { sentence: '영수증 받으시___?',                  answer: '죠',    options: ['죠','요','해','봐'],           uz: "Chek olasiz to'g'rimi?" },
        ],
        scramble: [
          { kr: '우체국', uz: 'pochta' },
          { kr: '편지',   uz: 'xat' },
          { kr: '소포',   uz: 'posilka' },
          { kr: '주소',   uz: 'manzil' },
          { kr: '요금',   uz: "to'lov" },
        ],
      },
    },
    quiz: [
      { question: "'-는데' ning asosiy vazifasi?",          options: ['buyruq','holat tushuntirish yoki qarama-qarshilik','savol','inkor'],  correct_index: 1 },
      { question: "'-지요?' qachon ishlatiladi?",           options: ['Buyruq berish',"To'g'rimi? tasdiq so'rash",'Inkor qilish','Kelajak'],correct_index: 1 },
      { question: "'소포' nimani anglatadi?",               options: ['xat','posilka','manzil','chek'],                                     correct_index: 1 },
      { question: "'항공' nimani anglatadi?",               options: ['dengiz orqali','avia (havo orqali)','avtomobil orqali','piyoda'],    correct_index: 1 },
      { question: "'무게' nimani anglatadi?",               options: ['narx','manzil',"og'irlik",'hajm'],                                  correct_index: 2 },
      { question: "'붙이다' nimani anglatadi?",              options: ['yozmoq','yubormoq','yopishtirmoq','qabul qilmoq'],                   correct_index: 2 },
      { question: "'등기' nimani anglatadi?",               options: ["yetkazib berish","ro'yxatdan o'tkazilgan xat",'tracking','ariza'],   correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 24: 은행 — Bank
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 3, order_in_level: 4,
    title_kr: '은행 — 계좌를 만들려고 해요',
    title_uz: "Bank — Hisob ochmoqchiman",
    is_free: false,
    content: {
      topic: {
        kr: '왜 은행에 가요? 계좌를 만들려고 가요. 어떻게 해야 해요? 신청하면 돼요. 돈을 보내려고 해요. 여기에서 하면 돼요. 비밀번호를 잊어버리면 어떻게 해요? 직원에게 물어보면 돼요.',
        uz: "Nega bankka borasiz? Hisob ochish uchun boraman. Qanday qilish kerak? Ariza topshirsangiz bo'ladi. Pul yubormoqchiman. Bu yerda qilsangiz bo'ladi. Parolni unutsam nima qilaman? Xodimga so'rasangiz bo'ladi."
      },
      grammar: {
        explanation: `-(으)려고 — "...uchun / maqsadida"

Tuzilish: [fe'l] + (으)려고
• Undosh → 으려고
• Unli   → 려고

• 계좌를 만들려고 은행에 가요 → Hisob ochish uchun bankka boraman
• 돈을 보내려고 해요           → Pul yubormoqchiman
• 카드를 쓰려고 해요           → Karta ishlatmoqchiman

💡 Farq:
-(으)러  = borish/kelish fe'li bilan: 사러 가요(sotib olish uchun boraman)
-(으)려고 = har qanday fe'l bilan: 만들려고 해요(qilmoqchiman)

-(으)면 되다 — "...sa bo'ladi / yetarli"

Tuzilish: [fe'l] + (으)면 되다

• 신청하면 돼요     → Ariza topshirsangiz bo'ladi
• 여기에서 하면 돼요 → Bu yerda qilsangiz bo'ladi
• 기다리면 돼요     → Kutsangiz bo'ladi

💡 Qoida: biror narsa qilish yetarli ekanini bildiradi`,
        examples: [
          { kr: '월급을 받으려고 계좌를 만들어야 해요.',          uz: "Maosh olish uchun hisob ochish kerak." },
          { kr: '외국인 등록증이 있으면 계좌를 만들 수 있어요.',   uz: "Chet ellik ro'yxatdan o'tish guvohnomasi bo'lsa hisob ocha olasiz." },
          { kr: '송금하려면 상대방 계좌번호를 알면 돼요.',         uz: "Pul yuborish uchun qarshi tomon hisob raqamini bilsangiz bo'ladi." },
          { kr: '인터넷 뱅킹을 쓰려고 하는데 어떻게 신청해요?',   uz: "Internet banking ishlatmoqchiman, qanday ariza beraman?" },
          { kr: '비밀번호를 잊으면 신분증을 가지고 오면 돼요.',    uz: "Parolni unutsangiz shaxsiy guvohnoma olib kelsangiz bo'ladi." },
        ]
      },
      vocabulary: [
        { kr: '은행',     romanization: 'eunhaeng',     uz: 'bank' },
        { kr: '계좌',     romanization: 'gyejwa',       uz: 'hisob (bank account)' },
        { kr: '돈',       romanization: 'don',          uz: 'pul' },
        { kr: '카드',     romanization: 'kadeu',        uz: 'karta' },
        { kr: '비밀번호', romanization: 'bimilbeonho',  uz: 'parol, PIN kod' },
        { kr: '입금하다', romanization: 'ipgeumhada',   uz: "pul qo'ymoq" },
        { kr: '출금하다', romanization: 'chulgeumhada', uz: 'pul yechmoq' },
        { kr: '송금하다', romanization: 'songgeumhada', uz: 'pul yubormoq (xalqaro)' },
        { kr: '이체하다', romanization: 'ichehada',     uz: 'pul o\'tkazmoq (ichki)' },
        { kr: '잔액',     romanization: 'jannaek',      uz: "qoldiq (hisobdagi pul)" },
        { kr: '수수료',   romanization: 'susuyo',       uz: 'komisyon, xizmat haqqi' },
        { kr: '환율',     romanization: 'hwannyul',     uz: 'valyuta kursi' },
        { kr: '신청서',   romanization: 'sincheongseo', uz: 'ariza blanki' },
        { kr: '신분증',   romanization: 'sinbunjeung',  uz: 'shaxsiy guvohnoma' },
        { kr: '외국인 등록증',romanization:'oegugin deungrokjeung',uz:"chet ellik ro'yxatdan o'tish guvohnomasi"},
        { kr: '번호',     romanization: 'beonho',       uz: 'raqam' },
        { kr: '영업시간', romanization: 'yeongeopsigan',uz: "ish soatlari" },
        { kr: '직원',     romanization: 'jigwon',       uz: 'xodim' },
        { kr: '창구',     romanization: 'changgu',      uz: 'kassa, xizmat oynachasi' },
        { kr: '대기',     romanization: 'daegi',        uz: 'kutish' },
      ],
      examples: [
        { kr: '처음에 한국에서 계좌를 만들려고 하면 외국인 등록증이 필요해요.',  uz: "Koreyada birinchi marta hisob ochmoqchi bo'lsangiz chet ellik guvohnoma kerak." },
        { kr: '매달 가족에게 송금하려고 해요. 수수료가 얼마예요?',               uz: "Har oy oilaga pul yubormoqchiman. Komisyon qancha?" },
        { kr: 'ATM에서 출금하면 돼요. 카드를 넣고 비밀번호를 누르면 돼요.',      uz: "ATM dan pul yechsangiz bo'ladi. Kartani kiritib PIN kodini bosing." },
        { kr: '환율이 좋을 때 송금하면 돼요. 매일 달라져요.',                   uz: "Valyuta kursi yaxshi bo'lganda pul yuborasangiz bo'ladi. Har kuni o'zgaradi." },
        { kr: '잔액이 부족하면 직원에게 물어보면 돼요.',                        uz: "Qoldiq yetishmasaa xodimga so'rasangiz bo'ladi." },
      ],
      dialog: [
        { speaker: 'A', kr: '안녕하세요. 뭘 도와드릴까요?',                   uz: "Salom. Nimada yordam bera olaman?" },
        { speaker: 'B', kr: '월급을 받으려고 계좌를 만들고 싶어요.',           uz: "Maosh olish uchun hisob ochmoqchiman." },
        { speaker: 'A', kr: '외국인 등록증 가지고 계세요?',                    uz: "Chet ellik guvohnomangiz bormi?" },
        { speaker: 'B', kr: '네, 있어요. 어떻게 하면 돼요?',                  uz: "Ha, bor. Qanday qilsam bo'ladi?" },
        { speaker: 'A', kr: '이 신청서를 쓰시면 돼요. 여기 앉으세요.',         uz: "Bu ariza blankini to'ldirsangiz bo'ladi. Mana o'tiring." },
        { speaker: 'B', kr: '송금도 할 수 있어요? 가족에게 보내려고요.',       uz: "Pul ham yuborib bo'ladimi? Oilaga yubormoqchiman." },
      ],
      notes: [
        "-(으)려고: maqsad: 만들려고(ochish uchun), 보내려고(yuborish uchun).",
        "-(으)면 되다: yetarli shart: 신청하면 돼요(ariza topsangiz bo'ladi).",
        "외국인 등록증 — chet ellik guvohnomasi: Koreyada 90 kundan ko'p turish uchun majburiy.",
        "송금 (xalqaro pul o'tkazish) vs 이체 (ichki, Koreya banklari orasida).",
        "환율 (valyuta kursi) — har kuni o'zgaradi: Western Union, Wise, bank — taqqoslang.",
      ],
      games: {
        matchPairs: [
          { kr: '계좌',     uz: 'hisob' },
          { kr: '입금',     uz: "pul qo'yish" },
          { kr: '출금',     uz: 'pul yechish' },
          { kr: '송금',     uz: 'pul yuborish' },
          { kr: '환율',     uz: 'valyuta kursi' },
          { kr: '수수료',   uz: 'komisyon' },
        ],
        fillBlank: [
          { sentence: '계좌를 만들___ 은행에 가요.',     answer: '려고',  options: ['려고','서','고','면'],         uz: "Hisob ochish uchun bankka boraman." },
          { sentence: '신청하___ 돼요.',                 answer: '면',    options: ['면','서','고','지만'],         uz: "Ariza topsangiz bo'ladi." },
          { sentence: '돈을 보내___ 해요.',              answer: '려고',  options: ['려고','서','고','면'],         uz: "Pul yubormoqchiman." },
          { sentence: 'ATM에서 출금하___ 돼요.',         answer: '면',    options: ['면','서','고','지만'],         uz: "ATM dan pul yechsangiz bo'ladi." },
          { sentence: '비밀번호를 잊으면 직원에게 ___.',  answer: '물어보면 돼요', options: ['물어보면 돼요','가면 돼요','쓰면 돼요','받으면 돼요'], uz: "Parolni unutsangiz xodimga so'rasangiz bo'ladi." },
        ],
        scramble: [
          { kr: '은행',   uz: 'bank' },
          { kr: '계좌',   uz: 'hisob' },
          { kr: '카드',   uz: 'karta' },
          { kr: '송금',   uz: 'pul yuborish' },
          { kr: '환율',   uz: 'valyuta kursi' },
        ],
      },
    },
    quiz: [
      { question: "'계좌를 만들려고 가요' — '-(으)려고' nima?",  options: ['shart','maqsad (uchun)','lekin','keyin'],                      correct_index: 1 },
      { question: "'신청하면 돼요' tarjimasi?",                   options: ['Ariza topshirish kerak','Ariza topsangiz bo\'ladi','Ariza topshirmang','Ariza topshirdim'], correct_index: 1 },
      { question: "'송금하다' nimani anglatadi?",                 options: ["pul qo'ymoq",'pul yechmoq','pul yubormoq (xalqaro)','pul o\'tkazmoq'], correct_index: 2 },
      { question: "'환율' nimani anglatadi?",                    options: ['komisyon','qoldiq','valyuta kursi','hisob'],                    correct_index: 2 },
      { question: "'외국인 등록증' nimani anglatadi?",            options: ['pasport','sog\'liq sug\'urtasi',"chet ellik ro'yxatdan o'tish guvohnomasi",'bank kartasi'], correct_index: 2 },
      { question: "'-(으)러' va '-(으)려고' farqi?",              options: ['Farq yo\'q','러=borish/kelish bilan; 려고=har qanday fe\'l bilan','려고=borish bilan','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'잔액' nimani anglatadi?",                    options: ['qaror','qoldiq (hisobdagi pul)','ariza','komisyon'],            correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 25: 외국인 근로자 지원 기관
  // Chet ellik ishchilarni qo'llab-quvvatlash markazi
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 3, order_in_level: 5,
    title_kr: '외국인 근로자 지원 기관',
    title_uz: "Chet ellik ishchilarni qo'llab-quvvatlash markazi",
    is_free: false,
    content: {
      topic: {
        kr: '왜 지원 기관에 가요? 상담하러 가요. 도움을 받으러 와요. 배우러 가요. 문제가 있기 때문에 가요. 도움이 필요하기 때문에 신청해요. 이 기관에서 법률, 의료, 언어 지원을 받을 수 있어요.',
        uz: "Nega yordam markaziga borasiz? Maslahat olish uchun boraman. Yordam olish uchun kelaman. O'rganish uchun boraman. Muammo bor shuning uchun boraman. Yordam kerak shuning uchun ariza beraman. Bu markazda huquqiy, tibbiy, til yordami olsa bo'ladi."
      },
      grammar: {
        explanation: `-(으)러 — "...gani / ...uchun" (harakat maqsadi)

Faqat borish/kelish fe'llari bilan:
-(으)러 + 가다/오다/다니다

• 상담하러 가요       → Maslahat olish uchun boraman
• 도움을 받으러 와요  → Yordam olish uchun kelaman
• 배우러 가요          → O'rganish uchun boraman

📏 Qoida:
• Undosh → 으러
• Unli   → 러

-기 때문에 — "chunki / sababli" (rasmiy)

Tuzilish: [fe'l/sifat] + 기 때문에

• 문제가 있기 때문에 가요      → Muammo bor, shuning uchun boraman
• 바쁘기 때문에 못 가요        → Bandman, shuning uchun bora olmayman
• 도움이 필요하기 때문에 신청해요 → Yordam kerak, shuning uchun ariza beraman

💡 Farq:
-아서/어서   = kundalik sabab
-기 때문에  = rasmiy, yozma sabab`,
        examples: [
          { kr: '한국어를 배우러 외국인 지원 센터에 다녀요.',       uz: "Koreys tilini o'rganish uchun chet elliklar markaziga boraman." },
          { kr: '임금 문제가 있기 때문에 상담을 신청했어요.',        uz: "Ish haqi muammosi bor shuning uchun maslahat oldim." },
          { kr: '의료 지원을 받으러 센터에 갔어요.',                uz: "Tibbiy yordam olish uchun markazga bordim." },
          { kr: '법률 상담이 필요하기 때문에 예약을 했어요.',        uz: "Huquqiy maslahat kerak shuning uchun uchrashuv belgilladim." },
          { kr: '정보를 얻으러 왔는데 어디에서 받을 수 있어요?',    uz: "Ma'lumot olish uchun keldim, qayerda ola olaman?" },
        ]
      },
      vocabulary: [
        { kr: '외국인',     romanization: 'oegugin',       uz: 'chet ellik' },
        { kr: '근로자',     romanization: 'geulloja',      uz: 'ishchi' },
        { kr: '지원',       romanization: 'jiwon',         uz: 'yordam, qo\'llab-quvvatlash' },
        { kr: '기관',       romanization: 'gigan',         uz: 'tashkilot, markaz' },
        { kr: '상담',       romanization: 'sangdam',       uz: 'maslahat' },
        { kr: '교육',       romanization: 'gyoyuk',        uz: "ta'lim" },
        { kr: '문제',       romanization: 'munje',         uz: 'muammo' },
        { kr: '도움',       romanization: 'doum',          uz: 'yordam' },
        { kr: '정보',       romanization: 'jeongbo',       uz: "ma'lumot" },
        { kr: '신청',       romanization: 'sincheon',      uz: 'ariza' },
        { kr: '법률',       romanization: 'beomnyul',      uz: 'huquqiy' },
        { kr: '의료',       romanization: 'uiryo',         uz: 'tibbiy' },
        { kr: '언어',       romanization: 'eoneo',         uz: 'til, lison' },
        { kr: '통역',       romanization: 'tongnyeok',     uz: 'tarjimonlik (og\'zaki)' },
        { kr: '임금',       romanization: 'imgeum',        uz: 'ish haqi' },
        { kr: '계약서',     romanization: 'gyeyakseo',     uz: 'shartnoma' },
        { kr: '비자',       romanization: 'bija',          uz: 'viza' },
        { kr: '체류',       romanization: 'cheryu',        uz: "turar joy, qolish huquqi" },
        { kr: '권리',       romanization: 'gwolli',        uz: 'huquq' },
        { kr: '무료',       romanization: 'muryo',         uz: 'bepul' },
      ],
      examples: [
        { kr: '외국인 근로자 지원 센터에서 무료로 법률 상담을 받을 수 있어요.',   uz: "Chet ellik ishchilar markazida bepul huquqiy maslahat olish mumkin." },
        { kr: '임금을 못 받았기 때문에 지원 센터에 신고했어요.',                 uz: "Ish haqi olmaganim sababli markazga shikoyat qildim." },
        { kr: '한국어를 배우러 센터에 다니는데 도움이 많이 돼요.',               uz: "Koreys tilini o'rganish uchun markazga boraman, juda foydali." },
        { kr: '계약서 내용을 이해하기 어렵기 때문에 통역 지원을 요청했어요.',     uz: "Shartnoma mazmunini tushunish qiyin shuning uchun tarjimonlik yordam so'radim." },
        { kr: '체류 기간이 끝나기 전에 비자 문제를 해결하러 왔어요.',            uz: "Yashash muddati tugashidan oldin viza muammosini hal qilish uchun keldim." },
      ],
      dialog: [
        { speaker: 'A', kr: '안녕하세요. 무슨 일로 오셨어요?',                 uz: "Salom. Qanday ish bilan keldingiz?" },
        { speaker: 'B', kr: '임금을 3달 동안 못 받았기 때문에 상담하러 왔어요.',uz: "3 oy ish haqi olmaganim sababli maslahat olish uchun keldim." },
        { speaker: 'A', kr: '힘드셨겠어요. 계약서 가지고 오셨어요?',            uz: "Qiyin bo'lgan ekan. Shartnomangizni olib keldingizmi?" },
        { speaker: 'B', kr: '네, 여기 있어요. 어떻게 하면 돼요?',              uz: "Ha, mana. Qanday qilsam bo'ladi?" },
        { speaker: 'A', kr: '법률 상담을 받으시면 돼요. 무료예요.',             uz: "Huquqiy maslahat olsangiz bo'ladi. Bepul." },
        { speaker: 'B', kr: '정말요? 감사해요. 통역도 있어요?',                uz: "Rostdanmi? Rahmat. Tarjimon ham bormi?" },
      ],
      notes: [
        "-(으)러 가다/오다: maqsad bilan borish/kelish: 배우러(o'rganish uchun), 받으러(olish uchun).",
        "-기 때문에: rasmiy sabab: 있기 때문에(bor shuning uchun), 필요하기 때문에(kerak shuning uchun).",
        "고용노동부 외국인력지원센터 — Koreya Mehnat Vazirligi chet elliklar markazi: 1350.",
        "무료 법률 상담 — bepul huquqiy maslahat: ish haqi, shartnoma, viza muammolari.",
        "권리 — huquq: EPS ishchilari ham Koreya mehnat qonunlari bilan himoyalangan.",
      ],
      games: {
        matchPairs: [
          { kr: '지원',   uz: "qo'llab-quvvatlash" },
          { kr: '상담',   uz: 'maslahat' },
          { kr: '임금',   uz: 'ish haqi' },
          { kr: '통역',   uz: 'tarjimonlik' },
          { kr: '권리',   uz: 'huquq' },
          { kr: '무료',   uz: 'bepul' },
        ],
        fillBlank: [
          { sentence: '상담하___ 가요.',                 answer: '러',    options: ['러','서','고','면'],           uz: "Maslahat olish uchun boraman." },
          { sentence: '문제가 있기 ___ 가요.',           answer: '때문에',options: ['때문에','서','고','면'],        uz: "Muammo bor shuning uchun boraman." },
          { sentence: '도움을 받으___ 와요.',            answer: '러',    options: ['러','서','고','면'],           uz: "Yordam olish uchun kelaman." },
          { sentence: '도움이 필요하기 때문에 ___.',    answer: '신청해요',options: ['신청해요','가요','봐요','해요'], uz: "Yordam kerak shuning uchun ariza beraman." },
          { sentence: '법률 상담은 ___ 예요.',           answer: '무료',  options: ['무료','비싸','좋은','작은'],   uz: "Huquqiy maslahat bepul." },
        ],
        scramble: [
          { kr: '외국인', uz: 'chet ellik' },
          { kr: '지원',   uz: 'yordam' },
          { kr: '상담',   uz: 'maslahat' },
          { kr: '임금',   uz: 'ish haqi' },
          { kr: '권리',   uz: 'huquq' },
        ],
      },
    },
    quiz: [
      { question: "'배우러 가요' — '-(으)러' nima?",         options: ['sabab','maqsad (borish/kelish bilan)','lekin','agar'],              correct_index: 1 },
      { question: "'-기 때문에' qaysi uslubda ko'p?",        options: ['og\'zaki suhbat','rasmiy, yozma','qo\'shiq','she\'r'],             correct_index: 1 },
      { question: "'임금' nimani anglatadi?",                options: ['ish joyi','ish haqi','ish vaqti','ish kiyimi'],                    correct_index: 1 },
      { question: "'통역' nimani anglatadi?",                options: ['yozma tarjima','og\'zaki tarjimonlik','til o\'rgatish','xat'],     correct_index: 1 },
      { question: "'무료' nimani anglatadi?",                options: ['qimmat','bepul','arzon','o\'rtacha'],                              correct_index: 1 },
      { question: "'계약서' nimani anglatadi?",              options: ['ariza','shartnoma','guvohnoma','retsept'],                         correct_index: 1 },
      { question: "'-(으)러' faqat qaysi fe'llar bilan?",    options: ['har qanday fe\'l bilan','borish/kelish/yurish fe\'llari bilan','sifatlar bilan','olmoshlar bilan'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 26: 한국의 주거 문화와 음식 문화
  // Koreyada yashash va ovqatlanish madaniyati
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 3, order_in_level: 6,
    title_kr: '한국의 주거 문화와 음식 문화',
    title_uz: "Koreyada yashash va ovqatlanish madaniyati",
    is_free: false,
    content: {
      topic: {
        kr: '한국 음식 어때요? 맛있는데 매워요. 한국 집은 어때요? 작지만 편해요. 여기에서 먹어도 돼요? 네, 먹어도 돼요. 앉아도 돼요. 한국 사람들은 보통 함께 식사해요. 김치는 거의 매일 먹어요.',
        uz: "Koreys ovqati qanday? Mazali, lekin achchiq. Koreya uylari qanday? Kichik, lekin qulay. Bu yerda ovqat yesam bo'ladimi? Ha, bo'ladi. O'tirishingiz mumkin. Koreyaliklar odatda birga ovqatlanadi. Kimchini deyarli har kuni yeydi."
      },
      grammar: {
        explanation: `-아도/어도 되다 — "mumkin / ruxsat bor"

Tuzilish: [fe'l] + 아도/어도 되다
• 아 → 아도 되다
• 어 → 어도 되다

• 먹어도 돼요   → Yeyishingiz mumkin
• 앉아도 돼요   → O'tirishingiz mumkin
• 써도 돼요     → Ishlatishingiz mumkin
• 가도 돼요     → Borsangiz bo'ladi

💡 Inkor: -으면 안 되다 (mumkin emas)
가면 안 돼요 = Borish mumkin emas

-는데 (qarama-qarshilik) — "lekin / ammo"

Tuzilish: [gap] + 는데 + [gap]

• 맛있는데 매워요     → Mazali, lekin achchiq
• 작은데 깨끗해요     → Kichik, lekin toza
• 좋은데 비싸요       → Yaxshi, lekin qimmat
• 바쁜데 가야 해요    → Bandman, lekin borish kerak`,
        examples: [
          { kr: '이 음식 먹어도 돼요? 네, 드세요!',            uz: "Bu ovqatdan yesam bo'ladimi? Ha, marhamat!" },
          { kr: '한국 집은 작은데 수납 공간이 많아요.',         uz: "Koreya uylari kichik, lekin saqlash joyi ko'p." },
          { kr: '신발을 벗어도 돼요? 네, 여기에 두세요.',       uz: "Oyoq kiyimini yechsam bo'ladimi? Ha, mana bu yerga qo'ying." },
          { kr: '한국 음식이 처음엔 매운데 익숙해지면 맛있어요.', uz: "Koreys ovqati dastlab achchiq, lekin ko'niksa mazali." },
          { kr: '한국 아파트는 작지만 난방 시스템이 잘 되어 있어요.', uz: "Koreya kvartirasi kichik, lekin isitish tizimi yaxshi." },
        ]
      },
      vocabulary: [
        { kr: '주거',     romanization: 'jugeo',       uz: 'yashash' },
        { kr: '문화',     romanization: 'munhwa',      uz: 'madaniyat' },
        { kr: '아파트',   romanization: 'apateu',      uz: 'kvartira' },
        { kr: '식사',     romanization: 'siksa',       uz: 'ovqatlanish' },
        { kr: '반찬',     romanization: 'banchan',     uz: 'garnir (yonaki taomlar)' },
        { kr: '김치',     romanization: 'gimchi',      uz: 'kimchi' },
        { kr: '된장',     romanization: 'doengjang',   uz: 'soya pasta' },
        { kr: '쌀',       romanization: 'ssal',        uz: 'guruch' },
        { kr: '온돌',     romanization: 'ondol',       uz: 'Koreya pol isitish tizimi' },
        { kr: '신발',     romanization: 'sinbal',      uz: 'oyoq kiyim' },
        { kr: '벗다',     romanization: 'beotda',      uz: 'yechmoq (kiyim/oyoq kiyim)' },
        { kr: '난방',     romanization: 'nanbang',     uz: 'isitish' },
        { kr: '냉방',     romanization: 'naengbang',   uz: 'sovitish' },
        { kr: '수납',     romanization: 'sunam',       uz: 'saqlash, joylashtirish' },
        { kr: '공유',     romanization: 'gongyou',     uz: 'birgalikda foydalanish' },
        { kr: '밥상',     romanization: 'bapsang',     uz: 'dasturxon' },
        { kr: '함께',     romanization: 'hamkke',      uz: 'birga' },
        { kr: '습관',     romanization: 'seupssgwan',  uz: 'odat' },
        { kr: '전통',     romanization: 'jeontong',    uz: "an'ana" },
        { kr: '익숙하다', romanization: 'iksukhada',   uz: 'ko\'nikgan, odatlangan' },
      ],
      examples: [
        { kr: '한국에서는 집에 들어올 때 신발을 벗어야 해요.',              uz: "Koreyada uyga kirganda oyoq kiyimini yechish kerak." },
        { kr: '한국 음식은 처음엔 맵지만 익숙해지면 정말 맛있어요.',       uz: "Koreys ovqati dastlab achchiq, lekin ko'niksa juda mazali." },
        { kr: '한국 아파트에는 온돌이 있어서 겨울에도 따뜻해요.',          uz: "Koreya kvartirasida ondol bor, shuning uchun qishda ham iliq." },
        { kr: '한국 사람들은 식사 때 밥과 국, 여러 반찬을 같이 먹어요.',   uz: "Koreyaliklar ovqatda guruch, sho'rva va bir necha garnir birga yeydi." },
        { kr: '이 식당에서 혼자 먹어도 돼요? 네, 혼자도 환영해요.',        uz: "Bu restoranda yolg'iz yesam bo'ladimi? Ha, yakka kishi ham xush kelibsiz." },
      ],
      dialog: [
        { speaker: 'A', kr: '한국 음식이 어때요?',                          uz: "Koreys ovqati qanday?" },
        { speaker: 'B', kr: '맛있는데 좀 매워요. 매운 게 많더라고요.',      uz: "Mazali, lekin biroz achchiq. Achchiq narsa ko'p ekan." },
        { speaker: 'A', kr: '익숙해지면 괜찮아요. 한국 사람들은 항상 매워요.', uz: "Ko'kniksa yaxshi bo'ladi. Koreyaliklar doim achchiq yeydi." },
        { speaker: 'B', kr: '그렇군요. 한국 집은 어때요? 다 작아요?',       uz: "Shundaymi. Koreya uylari qanday? Hammasi kichikmi?" },
        { speaker: 'A', kr: '좀 작은데 온돌이 있어서 겨울에 따뜻해요.',     uz: "Biroz kichik, lekin ondol bor shuning uchun qishda iliq." },
        { speaker: 'B', kr: '온돌이요? 들어가도 돼요?',                    uz: "Ondol? Kirsam bo'ladimi?" },
      ],
      notes: [
        "-아도/어도 되다: ruxsat: 먹어도 돼요(yesangiz bo'ladi), 앉아도 돼요(o'tirishingiz mumkin).",
        "-는데 (qarama-qarshi): 맛있는데 매워요(mazali lekin achchiq).",
        "온돌 — Koreya an'anaviy pol isitish: zamonaviy apartamentlarda ham bor.",
        "한국에서 신발 벗기 — uyga kirganda albatta oyoq kiyim yechiladi: madaniy qoida.",
        "반찬 (garnir) — Koreya ovqatining o'ziga xos xususiyati: 3-10 ta kichik taom.",
      ],
      games: {
        matchPairs: [
          { kr: '온돌',     uz: 'pol isitish tizimi' },
          { kr: '반찬',     uz: 'garnir' },
          { kr: '벗다',     uz: 'yechmoq' },
          { kr: '익숙하다', uz: 'ko\'nikgan' },
          { kr: '난방',     uz: 'isitish' },
          { kr: '함께',     uz: 'birga' },
        ],
        fillBlank: [
          { sentence: '먹___ 도 돼요.',                  answer: '어',    options: ['어','아','이','고'],           uz: "Yeyishingiz mumkin." },
          { sentence: '맛있___ 매워요.',                 answer: '는데',  options: ['는데','서','고','면'],         uz: "Mazali, lekin achchiq." },
          { sentence: '신발을 ___야 해요.',              answer: '벗어',  options: ['벗어','입어','신어','써'],     uz: "Oyoq kiyimini yechish kerak." },
          { sentence: '한국 집은 작___ 편해요.',         answer: '지만',  options: ['지만','고','서','면'],         uz: "Koreya uylari kichik, lekin qulay." },
          { sentence: '앉아도 ___ 요.',                  answer: '돼',    options: ['돼','해','가','봐'],           uz: "O'tirishingiz mumkin." },
        ],
        scramble: [
          { kr: '주거',   uz: 'yashash' },
          { kr: '식사',   uz: 'ovqatlanish' },
          { kr: '반찬',   uz: 'garnir' },
          { kr: '온돌',   uz: 'pol isitish' },
          { kr: '신발',   uz: 'oyoq kiyim' },
        ],
      },
    },
    quiz: [
      { question: "'먹어도 돼요' nimani anglatadi?",          options: ['Yeyishingiz shart','Yeyishingiz mumkin','Yeyishingiz mumkin emas','Yeyish kerak'], correct_index: 1 },
      { question: "'-는데' qarama-qarshilik sifatida?",      options: ['shuning uchun','va','lekin / ammo','agar'],                                     correct_index: 2 },
      { question: "'온돌' nimani anglatadi?",                options: ['sovitish','pol isitish tizimi','isitish radiatori','konditsioner'],               correct_index: 1 },
      { question: "'반찬' nimani anglatadi?",                options: ['asosiy ovqat','garnir (yonaki taomlar)','sho\'rva','guruch'],                     correct_index: 1 },
      { question: "'벗다' nimani anglatadi?",                options: ['kiymoq','yopishtirmoq','yechmoq','o\'tirmoq'],                                   correct_index: 2 },
      { question: "'-아도/어도 되다' ning inkori?",           options: ['-면 안 되다','-지 마세요','-지 않아도 되다','-고 싶지 않다'],                   correct_index: 0 },
      { question: "'익숙하다' nimani anglatadi?",            options: ['yangi','qiyin','ko\'nikgan, odatlangan','g\'alati'],                             correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 27: 한국의 기념일 — Koreya bayramlari
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 3, order_in_level: 7,
    title_kr: '한국의 기념일 — 한국 공휴일',
    title_uz: "Koreya bayramlari — Rasmiy dam olish kunlari",
    is_free: false,
    content: {
      topic: {
        kr: '한국 기념일에 뭐 해요? 가족이 모여요. 한국 음식을 먹어 봤어요? 네, 먹어 봤어요. 한복을 입는 사람이 있어요. 한국에서 먹는 음식이 달라요. 추석에는 송편을 만드는 편이에요.',
        uz: "Koreya bayramlarida nima qilasiz? Oila yig'iladi. Koreys ovqatini yeb ko'rganmisiz? Ha, yeb ko'rganman. Milliy kiyim kiyayotgan odamlar bor. Koreyada yeyiladigan ovqat boshqacha. Chuseokda song'pyeon yasaydigan tomonda."
      },
      grammar: {
        explanation: `-는 — hozirgi zamon sifatlovchi "...adigan / ...ayotgan"

Tuzilish: [fe'l] + 는 + [ot]

• 먹는 음식    → yeyiladigan ovqat
• 만나는 사람  → uchrashadigan odam
• 하는 일      → qilinadigan ish
• 입는 옷      → kiyiladigan kiyim

💡 Farq:
-는 = hozirgi zamon sifatlovchi (fe'l uchun)
-(으)ㄴ = o'tgan zamon sifatlovchi: 먹은 음식(yegan ovqat)

-아/어 봤다 — tajriba "qilib ko'rganman"

Tuzilish: [fe'l] + 아/어 봤다

• 먹어 봤어요   → Yeb ko'rganman
• 입어 봤어요   → Kiyib ko'rganman
• 가 봤어요     → Borib ko'rganman

💡 Farq:
-아/어 보다  = sinab ko'rmoq (hozir)
-아/어 봤다  = sinab ko'rganman (o'tmish tajriba)`,
        examples: [
          { kr: '한국에서 먹는 음식 중에 뭐가 제일 맛있어요?',     uz: "Koreyada yeyiladigan ovqatlar orasida qaysi eng mazali?" },
          { kr: '설날에 한복을 입어 봤는데 너무 예뻐요.',            uz: "Yangi yilda milliy kiyim kiyib ko'rdim, juda chiroyli." },
          { kr: '추석에 만드는 음식은 송편이에요.',                  uz: "Chuseokda yasaladigan ovqat song'pyeon." },
          { kr: '한국 명절에 가 봤어요? 정말 특별했어요.',           uz: "Koreya bayramida borib ko'rdingizmi? Juda o'ziga xos edi." },
          { kr: '지금 하는 일이 뭐예요? 음식 준비해요.',             uz: "Hozir qilayotgan ish nima? Ovqat tayyorlayapman." },
        ]
      },
      vocabulary: [
        { kr: '기념일',   romanization: 'ginyeomil',     uz: 'bayram, muhim kun' },
        { kr: '설날',     romanization: 'seollal',       uz: 'Yangi yil (oy taqvimi)' },
        { kr: '추석',     romanization: 'chusseok',      uz: 'hosil bayrami' },
        { kr: '어린이날', romanization: 'eorininal',     uz: 'bolalar kuni' },
        { kr: '광복절',   romanization: 'gwangbokjeol',  uz: 'mustaqillik kuni' },
        { kr: '한글날',   romanization: 'hangeunal',     uz: 'Hangul kuni' },
        { kr: '축하하다', romanization: 'chukahada',     uz: 'tabriklamoq' },
        { kr: '모이다',   romanization: 'moida',         uz: "yig'ilmoq" },
        { kr: '인사하다', romanization: 'insahada',      uz: 'salomlashmoq' },
        { kr: '한복',     romanization: 'hanbok',        uz: 'milliy kiyim' },
        { kr: '송편',     romanization: 'songpyeon',     uz: 'song\'pyeon (bayram pirog\'i)' },
        { kr: '떡국',     romanization: 'tteokguk',      uz: "tteokguk (yangi yil sho'rvasi)" },
        { kr: '세뱃돈',   romanization: 'sebaetdon',     uz: "yangi yil sovg'a puli" },
        { kr: '성묘',     romanization: 'seongmyo',      uz: 'ajdodlar qabrini ziyorat' },
        { kr: '차례',     romanization: 'chare',         uz: 'ajdodlarga qurbon uyushtirish' },
        { kr: '전통',     romanization: 'jeontong',      uz: "an'ana" },
        { kr: '공휴일',   romanization: 'gonghyuil',     uz: 'rasmiy dam olish kuni' },
        { kr: '연휴',     romanization: 'yeonhyu',       uz: "uzaytirilgan dam olish (ta'til)"},
        { kr: '특별하다', romanization: 'teukbyeolhada', uz: 'o\'ziga xos, maxsus' },
        { kr: '경험하다', romanization: 'gyeongheomhada',uz: 'boshdan kechirmoq' },
      ],
      examples: [
        { kr: '설날에 한국 사람들은 떡국을 먹어요. 새해 나이를 한 살 더 먹는다고 해요.', uz: "Yangi yilda koreyaliklar tteokguk yeydi. Yangi yosh bir yoshga oshadi deyishadi." },
        { kr: '추석은 한국의 가장 큰 명절이에요. 고향에 내려가는 사람이 많아요.',     uz: "Chuseok Koreyaning eng katta bayrami. Yurt-vataniga qaytadigan odamlar ko'p." },
        { kr: '한복을 입어 봤어요? 정말 아름다워요. 사진 찍기 좋아요.',              uz: "Milliy kiyim kiyib ko'rdingizmi? Juda chiroyli. Suratga olish yaxshi." },
        { kr: '한국의 공휴일에는 대부분의 가게가 문을 닫아요.',                       uz: "Koreya rasmiy dam olish kunlarida aksariyat do'konlar yopiq." },
        { kr: '추석에 먹는 송편을 직접 만들어 봤어요. 쉽지 않았지만 재미있었어요.',   uz: "Chuseokda yeyiladigan song'pyeonni o'zim yasab ko'rdim. Oson emas edi, lekin qiziqarli." },
      ],
      dialog: [
        { speaker: 'A', kr: '이번 추석에 뭐 해요?',                           uz: "Bu Chuseokda nima qilasiz?" },
        { speaker: 'B', kr: '가족이 모여서 송편을 만들고 성묘를 가요.',        uz: "Oila yig'ilib song'pyeon yasaymiz va ajdodlar qabrini ziyorat qilamiz." },
        { speaker: 'A', kr: '송편을 만들어 봤어요?',                          uz: "Song'pyeon yasab ko'rganmisiz?" },
        { speaker: 'B', kr: '네, 작년에 처음 만들어 봤어요. 어렵더라고요.',    uz: "Ha, o'tgan yil birinchi marta yasab ko'rdim. Qiyin ekan." },
        { speaker: 'A', kr: '한국 명절이 참 특별하죠? 이번에 같이 해요.',      uz: "Koreya bayrami juda o'ziga xos to'g'rimi? Bu safar birga qilamiz." },
        { speaker: 'B', kr: '정말요? 감사해요. 배우고 싶었어요.',              uz: "Rostdanmi? Rahmat. O'rganmoqchi edim." },
      ],
      notes: [
        "-는 sifatlovchi: 먹는 음식(yeyiladigan ovqat), 하는 일(qilayotgan ish).",
        "-아/어 봤다: tajriba o'tgan zamon: 먹어 봤어요(yeb ko'rganman).",
        "설날 vs 추석: ikkisi ham oilaviy bayram; 설날=Yangi yil (yanvar/fevral), 추석=hosil (sentyabr/oktyabr).",
        "세뱃돈 — yangi yil sovg'a puli: bolalar kattalardan pul oladi.",
        "연휴 (uzaytirilgan ta'til) — 추석 va 설날 atrofida: odatda 3-5 kun.",
      ],
      games: {
        matchPairs: [
          { kr: '설날',     uz: 'Yangi yil (oy taqvimi)' },
          { kr: '추석',     uz: 'hosil bayrami' },
          { kr: '한복',     uz: 'milliy kiyim' },
          { kr: '송편',     uz: "song'pyeon" },
          { kr: '공휴일',   uz: 'rasmiy dam olish kuni' },
          { kr: '세뱃돈',   uz: "yangi yil sovg'a puli" },
        ],
        fillBlank: [
          { sentence: '한국에서 먹___ 음식이 달라요.',      answer: '는',    options: ['는','은','을','이'],           uz: "Koreyada yeyiladigan ovqat boshqacha." },
          { sentence: '한복을 입어 ___ 어요.',              answer: '봤',    options: ['봤','봐','본','보'],           uz: "Milliy kiyim kiyib ko'rganman." },
          { sentence: '추석에 가족이 ___ 요.',              answer: '모여',  options: ['모여','가','봐','해'],         uz: "Chuseokda oila yig'iladi." },
          { sentence: '만드___ 음식은 송편이에요.',         answer: '는',    options: ['는','은','을','이'],           uz: "Yasaladigan ovqat song'pyeon." },
          { sentence: '특별한 경험을 해 ___ 어요.',         answer: '봤',    options: ['봤','봐','본','보'],           uz: "Maxsus tajriba boshdan kechirganman." },
        ],
        scramble: [
          { kr: '기념일', uz: 'bayram' },
          { kr: '설날',   uz: 'Yangi yil' },
          { kr: '추석',   uz: 'hosil bayrami' },
          { kr: '한복',   uz: 'milliy kiyim' },
          { kr: '전통',   uz: "an'ana" },
        ],
      },
    },
    quiz: [
      { question: "'먹는 음식' — '-는' nima vazifasi?",          options: ['o\'tgan zamon','hozirgi zamon sifatlovchi','kelajak','inkor'],  correct_index: 1 },
      { question: "'입어 봤어요' nimani anglatadi?",              options: ['Kiyib turaman','Kiyib ko\'rmoqchiman','Kiyib ko\'rganman','Kiyaman'], correct_index: 2 },
      { question: "'추석' nima?",                                 options: ['Yangi yil','Mustaqillik kuni','hosil bayrami','Bolalar kuni'],   correct_index: 2 },
      { question: "'세뱃돈' nimani anglatadi?",                   options: ['ish haqi',"yangi yil sovg'a puli",'bayram ovqati','milliy kiyim'], correct_index: 1 },
      { question: "'-는' va '-(으)ㄴ' sifatlovchi farqi?",       options: ['Farq yo\'q','는=hozirgi; ㄴ=o\'tgan','ㄴ=hozirgi; 는=o\'tgan','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'공휴일' nimani anglatadi?",                   options: ['hafta oxiri','dam olish kuni emas','rasmiy dam olish kuni','ish kuni'], correct_index: 2 },
      { question: "'한복' nimani anglatadi?",                     options: ['ish kiyimi','sport kiyimi','milliy kiyim','qishki kiyim'],     correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 28: 한국의 명절 — Koreya an'anaviy bayramlari
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 3, order_in_level: 8,
    title_kr: '한국의 명절 — 설날과 추석',
    title_uz: "Koreya an'anaviy bayramlari — Yangi yil va Chuseok",
    is_free: false,
    content: {
      topic: {
        kr: '명절에 뭐 해요? 가족이 모여요. 세배하고 나서 밥을 먹어요. 한복을 입을 줄 알아요? 네, 알아요. 한국 음식을 만들 줄 몰라요. 성묘를 하고 나서 차례를 지내요.',
        uz: "Bayramda nima qilasiz? Oila yig'iladi. Ta'zimdan keyin ovqat yeymiz. Milliy kiyim kiyishni bilasizmi? Ha, bilaman. Koreys ovqatini tayyorlashni bilmayman. Ajdodlar qabrini ziyorat qilib, qurbon uyushtiramiz."
      },
      grammar: {
        explanation: `-고 나서 — "...dan keyin" (ketma-ketlik)

Tuzilish: [fe'l] + 고 나서

• 밥을 먹고 나서 인사해요   → Ovqatdan keyin salomlashaman
• 세배하고 나서 밥을 먹어요 → Ta'zimdan keyin ovqat yeyman
• 일하고 나서 쉬어요         → Ishlagandan keyin dam olaman

💡 Farq:
-고 나서   = harakat tugagan keyin (ketma-ketlik)
-(으)ㄴ 후에 = harakat tugagan keyin (ikkalasi o'xshash, lekin)
-고 나서 = fe'lning to'liq tugashini ta'kidlaydi

-(으)ㄹ 줄 알다 / 모르다 — "bilaman / bilmayman (qila olish)"

Tuzilish:
• Undosh → 을 줄 알다
• Unli   → ㄹ 줄 알다

• 한복을 입을 줄 알아요   → Milliy kiyim kiyishni bilaman
• 만들 줄 몰라요          → Tayyorlashni bilmayman
• 한국어를 할 줄 알아요?  → Koreys tilida gapira olasizmi?`,
        examples: [
          { kr: '설날에는 어른들께 세배하고 나서 떡국을 먹어요.',       uz: "Yangi yilda kattalarga ta'zim qilib, tteokguk yeymiz." },
          { kr: '한복을 입을 줄 알아요? 혼자 입기 어려워요.',           uz: "Milliy kiyim kiyishni bilasizmi? Yolg'iz kiyish qiyin." },
          { kr: '추석에 송편 만들 줄 알면 가르쳐 주세요.',              uz: "Chuseokda song'pyeon yasashni bilsangiz o'rgatib bering." },
          { kr: '성묘하고 나서 온 가족이 모여서 식사해요.',              uz: "Qabrni ziyorat qilib, butun oila yig'ilib ovqatlanadi." },
          { kr: '한국 전통 게임인 윷놀이를 할 줄 알아요?',              uz: "Koreya an'anaviy o'yini yutnori o'ynashni bilasizmi?" },
        ]
      },
      vocabulary: [
        { kr: '명절',     romanization: 'myeongjeol',   uz: "an'anaviy bayram" },
        { kr: '설날',     romanization: 'seollal',      uz: 'Yangi yil (oy taqvimi)' },
        { kr: '추석',     romanization: 'chusseok',     uz: 'hosil bayrami' },
        { kr: '세배하다', romanization: 'sebaehada',    uz: "ta'zim qilmoq (yangi yilda)" },
        { kr: '인사하다', romanization: 'insahada',     uz: 'salomlashmoq' },
        { kr: '차례',     romanization: 'chare',        uz: 'ajdodlarga qurbon' },
        { kr: '성묘',     romanization: 'seongmyo',     uz: 'qabrni ziyorat' },
        { kr: '한복',     romanization: 'hanbok',       uz: 'milliy kiyim' },
        { kr: '전통',     romanization: 'jeontong',     uz: "an'ana" },
        { kr: '모이다',   romanization: 'moida',        uz: "yig'ilmoq" },
        { kr: '떡국',     romanization: 'tteokguk',     uz: "yangi yil sho'rvasi" },
        { kr: '송편',     romanization: 'songpyeon',    uz: "hosil bayrami pirog'i" },
        { kr: '윷놀이',   romanization: 'yutnolli',     uz: 'an\'anaviy o\'yin (yutnolli)' },
        { kr: '제사',     romanization: 'jesa',         uz: "ajdodlar ruhiga bag'ishlangan qurbon" },
        { kr: '고향',     romanization: 'gohyang',      uz: 'yurt, tug\'ilgan joy' },
        { kr: '귀성',     romanization: 'gwiseong',     uz: 'yurtga qaytish' },
        { kr: '귀성객',   romanization: 'gwiseonggaek', uz: 'yurtiga qaytayotgan odam' },
        { kr: '친척',     romanization: 'chincheok',    uz: 'qarindosh' },
        { kr: '어른',     romanization: 'oreun',        uz: 'katta odam' },
        { kr: '세뱃돈',   romanization: 'sebaetdon',    uz: "yangi yil sovg'a puli" },
      ],
      examples: [
        { kr: '설날 아침에 한복을 입고 어른들께 세배해요. 그러고 나서 세뱃돈을 받아요.', uz: "Yangi yil tongida milliy kiyim kiyib kattalarga ta'zim qilamiz. Shundan keyin sovg'a puli olamiz." },
        { kr: '추석에는 온 가족이 고향에 모여서 차례를 지내고 성묘를 해요.',            uz: "Chuseokda butun oila yurtga yig'ilib qurbon uyushtirib, qabrni ziyorat qiladi." },
        { kr: '한복을 입을 줄 아세요? 한복 입기가 쉽지 않아요.',                       uz: "Milliy kiyim kiyishni bilasizmi? Milliy kiyim kiyish oson emas." },
        { kr: '윷놀이를 할 줄 몰라요. 가르쳐 주실 수 있어요?',                         uz: "Yutnori o'ynashni bilmayman. O'rgatib bera olasizmi?" },
        { kr: '명절에 차례를 지내고 나서 온 가족이 함께 식사해요.',                    uz: "Bayramda qurbon uyushtirib, butun oila birga ovqatlanadi." },
      ],
      dialog: [
        { speaker: 'A', kr: '설날에 뭐 해요? 한국 명절이 궁금해요.',              uz: "Yangi yilda nima qilasiz? Koreya bayrami qiziq." },
        { speaker: 'B', kr: '아침에 세배를 하고 나서 떡국을 먹어요.',             uz: "Ertalab ta'zim qilib, tteokguk yeymiz." },
        { speaker: 'A', kr: '한복을 입을 줄 알아요?',                            uz: "Milliy kiyim kiyishni bilasizmi?" },
        { speaker: 'B', kr: '조금 알아요. 혼자는 어렵지만 도움을 받으면 괜찮아요.', uz: "Biroz bilaman. Yolg'iz qiyin, lekin yordam olsam yaxshi." },
        { speaker: 'A', kr: '세뱃돈도 받아요?',                                  uz: "Sovg'a puli ham olasizmi?" },
        { speaker: 'B', kr: '네, 어른들께 세배하고 나서 받아요. 한국 문화가 재미있어요!', uz: "Ha, kattalarga ta'zim qilib, olamiz. Koreya madaniyati qiziqarli!" },
      ],
      notes: [
        "-고 나서: ketma-ketlik: 먹고 나서(yeb bo'lgandan keyin), 일하고 나서(ishlagandan keyin).",
        "-(으)ㄹ 줄 알다/모르다: qobiliyat: 할 줄 알아요(qila olaman), 할 줄 몰라요(qila olmayman).",
        "세배 — yangi yildagi ta'zim: boshni egib ta'zim qilish; kattalarga ko'rsatiladi.",
        "설날 귀성객 — yurtiga qaytayotgan odamlar: Koreya yo'llari juda band bo'ladi.",
        "차례 vs 제사: 차례=bayramda; 제사=vafot sanasida — ikkalasi ajdodlar ruhiga bag'ishlanadi.",
      ],
      games: {
        matchPairs: [
          { kr: '명절',     uz: "an'anaviy bayram" },
          { kr: '세배하다', uz: "ta'zim qilmoq" },
          { kr: '성묘',     uz: 'qabrni ziyorat' },
          { kr: '고향',     uz: "yurt, tug'ilgan joy" },
          { kr: '친척',     uz: 'qarindosh' },
          { kr: '세뱃돈',   uz: "sovg'a puli" },
        ],
        fillBlank: [
          { sentence: '세배하고 나서 밥을 ___.',        answer: '먹어요', options: ['먹어요','가요','봐요','해요'],   uz: "Ta'zimdan keyin ovqat yeymiz." },
          { sentence: '한복을 입을 줄 ___.',            answer: '알아요', options: ['알아요','몰라요','해요','가요'], uz: "Milliy kiyim kiyishni bilaman." },
          { sentence: '만들 줄 ___.',                   answer: '몰라요', options: ['몰라요','알아요','해요','가요'], uz: "Tayyorlashni bilmayman." },
          { sentence: '일하___ 나서 쉬어요.',           answer: '고',     options: ['고','서','면','지만'],          uz: "Ishlagandan keyin dam olaman." },
          { sentence: '한국어를 할 줄 ___?',            answer: '알아요', options: ['알아요','몰라요','해요','봐요'], uz: "Koreys tilida gapira olasizmi?" },
        ],
        scramble: [
          { kr: '명절',   uz: "bayram" },
          { kr: '세배',   uz: "ta'zim" },
          { kr: '한복',   uz: 'milliy kiyim' },
          { kr: '고향',   uz: 'yurt' },
          { kr: '친척',   uz: 'qarindosh' },
        ],
      },
    },
    quiz: [
      { question: "'세배하고 나서' nimani anglatadi?",            options: ["ta'zim qilishdan oldin","ta'zim qilayotganda","ta'zimdan keyin","ta'zim qilish uchun"], correct_index: 2 },
      { question: "'할 줄 알아요' nimani anglatadi?",             options: ['qilaman','qila olaman (bilaman)','qilmoqchiman','qildim'],            correct_index: 1 },
      { question: "'세배하다' nimani anglatadi?",                 options: ['salomlashmoq','ovqatlanmoq',"ta'zim qilmoq (yangi yilda)",'sovg\'a bermoq'], correct_index: 2 },
      { question: "'-고 나서' va '-(으)ㄴ 후에' farqi?",          options: ['Farq yo\'q','고 나서=tugashni ta\'kidlaydi; ikkalasi o\'xshash','후에=ketma-ketlik','Ikkalasi farqli'], correct_index: 1 },
      { question: "'성묘' nimani anglatadi?",                     options: ['salomlashish','qabrni ziyorat','ovqat tayyorlash','sovg\'a berish'],  correct_index: 1 },
      { question: "'고향' nimani anglatadi?",                     options: ['ish joyi','shahri',"yurt, tug'ilgan joy",'mehmonxona'],              correct_index: 2 },
      { question: "'세뱃돈' qachon beriladi?",                   options: ['tug\'ilgan kunda','rasmiy bayramlarda',"yangi yil ta'zimidan keyin",'to\'yda'], correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 29: 한국의 예절 — Koreya odob-qoidalari
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 3, order_in_level: 9,
    title_kr: '한국의 예절 — 지켜야 할 규칙',
    title_uz: "Koreya odob-qoidalari — Rioya qilinishi kerak qoidalar",
    is_free: false,
    content: {
      topic: {
        kr: '한국 예절이 중요해요. 어른을 존중해야 해요. 할 수 있어요. 갈 수 없어요. 크게 말하면 안 돼요. 여기에서 담배를 피우면 안 돼요. 늦으면 안 돼요. 한국에서는 어른 앞에서 술을 마시면 안 돼요.',
        uz: "Koreya odobi muhim. Kattalarni hurmat qilish kerak. Qila olaman. Bora olmayman. Baland gapirish mumkin emas. Bu yerda chekish mumkin emas. Kech qolish mumkin emas. Koreyada kattalar oldida aroq ichish mumkin emas."
      },
      grammar: {
        explanation: `-(으)ㄹ 수 있다 / 없다 — "qila olaman / qila olmayman"

Tuzilish:
• Undosh → 을 수 있다
• Unli   → ㄹ 수 있다

• 할 수 있어요    → Qila olaman
• 갈 수 없어요    → Bora olmayman
• 먹을 수 있어요  → Yeya olaman
• 올 수 없어요    → Kela olmayman

💡 Farq:
못 + fe'l = qisqa inkor (못 가요)
-ㄹ 수 없다 = to'liq, aniq inkor (갈 수 없어요)

-(으)면 안 되다 — "mumkin emas / taqiqlangan"

Tuzilish: [fe'l] + (으)면 안 되다

• 늦으면 안 돼요            → Kech qolish mumkin emas
• 크게 말하면 안 돼요        → Baland gapirish mumkin emas
• 담배를 피우면 안 돼요     → Chekish mumkin emas`,
        examples: [
          { kr: '이 기계를 혼자 쓸 수 있어요? 아니요, 교육을 받아야 해요.', uz: "Bu mashinani yolg'iz ishlatsa bo'ladimi? Yo'q, ta'lim olish kerak." },
          { kr: '공장 안에서 담배를 피우면 안 돼요. 위험해요.',              uz: "Zavod ichida chekish mumkin emas. Xavfli." },
          { kr: '작업 중에 핸드폰을 쓰면 안 돼요.',                         uz: "Ish paytida telefon ishlatish mumkin emas." },
          { kr: '어른께 두 손으로 드리면 됩니다. 한 손으로 드리면 안 돼요.', uz: "Kattalarga ikki qo'l bilan bering. Bir qo'l bilan berish mumkin emas." },
          { kr: '이 구역에서는 사진을 찍을 수 없어요.',                      uz: "Bu hududda suratga olsa bo'lmaydi." },
        ]
      },
      vocabulary: [
        { kr: '예절',     romanization: 'yejeol',       uz: 'odob-qoidalar' },
        { kr: '인사',     romanization: 'insa',         uz: 'salomlashish' },
        { kr: '존중',     romanization: 'jonjung',      uz: 'hurmat' },
        { kr: '규칙',     romanization: 'gyuchik',      uz: 'qoida' },
        { kr: '지키다',   romanization: 'jikida',       uz: 'rioya qilmoq, saqlash' },
        { kr: '따르다',   romanization: 'ttareuda',     uz: 'amal qilmoq' },
        { kr: '어른',     romanization: 'oreun',        uz: 'katta odam' },
        { kr: '담배',     romanization: 'dambae',       uz: 'sigaret' },
        { kr: '피우다',   romanization: 'piuda',        uz: 'chekmoq' },
        { kr: '행동하다', romanization: 'haengdonghada',uz: 'harakat qilmoq' },
        { kr: '고개를 숙이다',romanization:'gogaereul sugida',uz: "boshni egib ta'zim qilmoq" },
        { kr: '두 손',    romanization: 'du son',       uz: "ikki qo'l" },
        { kr: '상대방',   romanization: 'sangdaebang',  uz: 'qarshi tomon, boshqasi' },
        { kr: '목소리',   romanization: 'moksori',      uz: 'ovoz' },
        { kr: '조용히',   romanization: 'joyonghi',     uz: 'jimgina, ohista' },
        { kr: '금지',     romanization: 'geumji',       uz: 'taqiq' },
        { kr: '허락',     romanization: 'heorak',       uz: 'ruxsat' },
        { kr: '무례하다', romanization: 'muryehada',    uz: 'bedodob, qo\'pol' },
        { kr: '공손하다', romanization: 'gongsonhada',  uz: 'odobi bor, muloyim' },
        { kr: '예의 바르다',romanization:'yeuibareuda', uz: 'odobli, tarbiyali' },
      ],
      examples: [
        { kr: '한국에서는 어른 앞에서 담배를 피우면 절대 안 돼요.',              uz: "Koreyada kattalar oldida chekish hech qachon mumkin emas." },
        { kr: '밥을 먹을 때 어른이 먼저 드실 때까지 기다려야 해요.',             uz: "Ovqat yeyishda kattalar avval yeyishi kerak, kutish kerak." },
        { kr: '처음 만난 사람에게는 명함을 두 손으로 드리면 됩니다.',             uz: "Birinchi uchrashganda vizit kartani ikki qo'l bilan bering." },
        { kr: '대중교통에서 크게 통화하면 안 돼요. 조용히 해야 해요.',            uz: "Jamoat transportida baland gapirish mumkin emas. Jim bo'lish kerak." },
        { kr: '공장에서는 안전 규칙을 반드시 지켜야 해요. 지키지 않으면 위험해요.', uz: "Zavodda xavfsizlik qoidasiga albatta rioya qilish kerak. Rioya qilmasang xavfli." },
      ],
      dialog: [
        { speaker: 'A', kr: '한국에서 꼭 알아야 할 예절이 있어요?',             uz: "Koreyada albatta bilish kerak bo'lgan odob bormi?" },
        { speaker: 'B', kr: '네, 많아요. 먼저 어른을 존중해야 해요.',           uz: "Ha, ko'p. Avvalo kattalarni hurmat qilish kerak." },
        { speaker: 'A', kr: '구체적으로 어떻게 해야 해요?',                    uz: "Aniqroq qanday qilish kerak?" },
        { speaker: 'B', kr: '두 손으로 드리고, 어른 앞에서 담배를 피우면 안 돼요.', uz: "Ikki qo'l bilan bering va kattalar oldida chekish mumkin emas." },
        { speaker: 'A', kr: '공장에서는 어떤 규칙이 있어요?',                  uz: "Zavodda qanday qoidalar bor?" },
        { speaker: 'B', kr: '작업 중에 핸드폰 쓰면 안 돼요. 그리고 안전모를 꼭 써야 해요.', uz: "Ish paytida telefon ishlatish mumkin emas. Va dubulg'ani albatta kiyish kerak." },
      ],
      notes: [
        "-(으)ㄹ 수 있다/없다: qobiliyat: 할 수 있어요(qila olaman), 갈 수 없어요(bora olmayman).",
        "-(으)면 안 되다: taqiq: 피우면 안 돼요(chekish mumkin emas).",
        "한국 예절 — Koreya odobi: kattalarga hurmat, ikki qo'l bilan berish, boshni egish.",
        "공장 안전 규칙 — zavod xavfsizlik qoidalari: EPS ishchilari uchun majburiy.",
        "절대 — hech qachon: 절대 안 돼요(hech qachon mumkin emas) — kuchli taqiq.",
      ],
      games: {
        matchPairs: [
          { kr: '예절',     uz: 'odob-qoidalar' },
          { kr: '존중',     uz: 'hurmat' },
          { kr: '지키다',   uz: 'rioya qilmoq' },
          { kr: '금지',     uz: 'taqiq' },
          { kr: '허락',     uz: 'ruxsat' },
          { kr: '공손하다', uz: 'muloyim' },
        ],
        fillBlank: [
          { sentence: '할 수 ___ 요.',                answer: '있어',  options: ['있어','없어','해','가'],       uz: "Qila olaman." },
          { sentence: '갈 수 ___ 요.',                answer: '없어',  options: ['없어','있어','해','가'],       uz: "Bora olmayman." },
          { sentence: '담배를 피우면 안 ___ 요.',     answer: '돼',    options: ['돼','해','가','봐'],           uz: "Chekish mumkin emas." },
          { sentence: '작업 중에 핸드폰 쓰면 ___ 요.',answer:'안 돼', options: ['안 돼','좋아','괜찮아','돼'],  uz: "Ish paytida telefon ishlatish mumkin emas." },
          { sentence: '두 손으로 드리___ 됩니다.',    answer: '면',    options: ['면','서','고','지만'],         uz: "Ikki qo'l bilan bersangiz bo'ladi." },
        ],
        scramble: [
          { kr: '예절',   uz: 'odob' },
          { kr: '존중',   uz: 'hurmat' },
          { kr: '규칙',   uz: 'qoida' },
          { kr: '금지',   uz: 'taqiq' },
          { kr: '허락',   uz: 'ruxsat' },
        ],
      },
    },
    quiz: [
      { question: "'할 수 있어요' nimani anglatadi?",              options: ['qilaman','qila olaman','qilmoqchiman','qilish kerak'],              correct_index: 1 },
      { question: "'담배를 피우면 안 돼요' tarjimasi?",             options: ['Chekish kerak','Chekish mumkin','Chekish mumkin emas','Chekaman'],  correct_index: 2 },
      { question: "'존중' nimani anglatadi?",                      options: ['qoida','taqiq','hurmat','ruxsat'],                                  correct_index: 2 },
      { question: "'지키다' nimani anglatadi?",                    options: ['taqiq','hurmat','amal qilmoq','rioya qilmoq, saqlash'],             correct_index: 3 },
      { question: "'못 가요' va '갈 수 없어요' farqi?",             options: ['Farq yo\'q','못=qisqa; 수 없다=to\'liq aniq inkor','수 없다=qisqa','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'공손하다' nimani anglatadi?",                  options: ['bedodob','muloyim, odobi bor','qo\'pol','g\'alati'],                correct_index: 1 },
      { question: "Zavod xavfsizlik qoidasini buzish nima olib keladi?",options: ['jirimana','xavf, baxtsiz hodisa','ruxsat','mukofot'],           correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 30: 한국의 대중문화 — Koreya ommaviy madaniyati
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 3, order_in_level: 10,
    title_kr: '한국의 대중문화 — K-POP과 드라마',
    title_uz: "Koreya ommaviy madaniyati — K-POP va seriallar",
    is_free: false,
    content: {
      topic: {
        kr: '한국 드라마 어때요? 재미있는 것 같아요. K-pop 음악을 좋아해요? 네, 좋아해요. 한국어 배우기 어때요? 어렵지만 재미있어요. 드라마를 보기 쉬워요. 노래를 외우기 어려워요. 한류가 세계적으로 유명한 것 같아요.',
        uz: "Koreya seriallari qanday? Qiziqarli ko'rinadi. K-pop musiqa yoqtirasizmi? Ha, yoqtiraman. Koreys tilini o'rganish qanday? Qiyin, lekin qiziqarli. Serialni ko'rish oson. Qo'shiqni yodlash qiyin. Hallyu dunyo bo'ylab mashhurdek ko'rinadi."
      },
      grammar: {
        explanation: `-는/(으)ㄴ 것 같다 — "...ga o'xshaydi / menimcha"

Fe'l bilan:
• 재미있는 것 같아요    → Qiziqarli ko'rinadi
• 비가 오는 것 같아요   → Yomg'ir yog'ayotganga o'xshaydi
• 좋아하는 것 같아요    → Yoqtiradiga o'xshaydi

Sifat bilan:
• 좋은 것 같아요        → Yaxshi ko'rinadi
• 비싼 것 같아요        → Qimmatga o'xshaydi
• 어려운 것 같아요      → Qiyindek ko'rinadi

-기 쉽다 / 어렵다 — "oson / qiyin"

Tuzilish: [fe'l] + 기 쉽다 / 어렵다

• 배우기 쉬워요        → O'rganish oson
• 이해하기 어려워요    → Tushunish qiyin
• 먹기 좋아요          → Yeyish qulay
• 쓰기 어려워요        → Yozish qiyin`,
        examples: [
          { kr: '한국 드라마가 요즘 세계에서 인기 있는 것 같아요.',      uz: "Koreya seriallari hozirda dunyo bo'ylab mashhurdek ko'rinadi." },
          { kr: 'K-pop 댄스를 따라하기 어렵지만 재미있어요.',             uz: "K-pop raqs takrorlash qiyin, lekin qiziqarli." },
          { kr: '드라마를 보면서 한국어를 배우기 쉬운 것 같아요.',        uz: "Serial ko'ra turib koreys tilini o'rganish oson ko'rinadi." },
          { kr: '한국 가수들이 정말 노래를 잘 하는 것 같아요.',           uz: "Koreya qo'shiqchilari juda yaxshi kuylaydigandek ko'rinadi." },
          { kr: '한글을 읽기는 쉬운데 말하기는 어려운 것 같아요.',        uz: "Hangulni o'qish oson, lekin gapirish qiyindek ko'rinadi." },
        ]
      },
      vocabulary: [
        { kr: '대중문화',   romanization: 'daejungmunhwa', uz: 'ommaviy madaniyat' },
        { kr: '음악',       romanization: 'eumak',         uz: 'musiqa' },
        { kr: '드라마',     romanization: 'deurama',       uz: 'serial' },
        { kr: '영화',       romanization: 'yeonghwa',      uz: 'film' },
        { kr: '가수',       romanization: 'gasu',          uz: "qo'shiqchi" },
        { kr: '배우',       romanization: 'baeu',          uz: 'aktyor' },
        { kr: '인기',       romanization: 'ingi',          uz: 'mashhurlik' },
        { kr: '유명하다',   romanization: 'yumyeonghada',  uz: 'mashhur' },
        { kr: '한류',       romanization: 'hallyu',        uz: "Hallyu (Koreya madaniyati to'lqini)" },
        { kr: '팬',         romanization: 'paen',          uz: 'muxlis, hayran' },
        { kr: '콘서트',     romanization: 'konseoteu',     uz: 'kontsert' },
        { kr: '앨범',       romanization: 'aelbeom',       uz: 'albom' },
        { kr: '댄스',       romanization: 'daenseu',       uz: 'raqs' },
        { kr: '노래',       romanization: 'norae',         uz: "qo'shiq" },
        { kr: '외우다',     romanization: 'oeuda',         uz: 'yodlamoq' },
        { kr: '따라하다',   romanization: 'ttarahada',     uz: 'taqlid qilmoq, takrorlash' },
        { kr: '촬영하다',   romanization: 'chwarnyeonghada',uz: 'suratga olmoq (video)' },
        { kr: '세계적이다', romanization: 'segyejeogida',  uz: 'global, dunyo miqyosidagi' },
        { kr: '영향',       romanization: 'yeonghyang',    uz: "ta'sir" },
        { kr: '문화',       romanization: 'munhwa',        uz: 'madaniyat' },
      ],
      examples: [
        { kr: 'K-pop이 전 세계에서 유명한 것 같아요. 다들 좋아하더라고요.',    uz: "K-pop butun dunyoda mashhurdek ko'rinadi. Hammasi yoqtirar ekan." },
        { kr: '한국 드라마를 보기 시작하면 멈추기 어려운 것 같아요.',          uz: "Koreya serialini ko'rishni boshlagach, to'xtatish qiyindek ko'rinadi." },
        { kr: 'BTS 노래를 외우기 어렵지만 한국어 공부에 도움이 돼요.',         uz: "BTS qo'shig'ini yodlash qiyin, lekin koreys tili o'rganishda yordam beradi." },
        { kr: '한국 음식과 드라마를 통해 한국에 관심이 생기는 것 같아요.',     uz: "Koreya ovqati va seriallar orqali Koreyaga qiziqish paydo bo'layotgandek ko'rinadi." },
        { kr: '한글은 배우기 쉬운 것 같아요. 발음은 연습하면 돼요.',           uz: "Hangul o'rganish oson ko'rinadi. Talaffuzni mashq qilsangiz bo'ladi." },
      ],
      dialog: [
        { speaker: 'A', kr: '한국 드라마 봐요? 재미있어요?',               uz: "Koreya seriali ko'rasizmi? Qiziqarlimi?" },
        { speaker: 'B', kr: '네, 정말 재미있는 것 같아요. 매일 봐요.',     uz: "Ha, juda qiziqarli ko'rinadi. Har kuni ko'raman." },
        { speaker: 'A', kr: '드라마 보면서 한국어가 늘어요?',               uz: "Serial ko'ra turib koreys tili oshayaptimi?" },
        { speaker: 'B', kr: '네! 보기는 쉬운데 말하기는 어려운 것 같아요.', uz: "Ha! Ko'rish oson, lekin gapirish qiyindek ko'rinadi." },
        { speaker: 'A', kr: 'K-pop도 좋아해요?',                          uz: "K-popni ham yoqtirasizmi?" },
        { speaker: 'B', kr: '네, 좋아요. 노래를 따라 부르기는 어렵지만 재미있는 것 같아요.', uz: "Ha, yaxshi. Qo'shiqni birga kuylash qiyin, lekin qiziqarli ko'rinadi." },
      ],
      notes: [
        "-는/(으)ㄴ 것 같다: taxmin: 재미있는 것 같아요(qiziqarli ko'rinadi).",
        "-기 쉽다/어렵다: oson/qiyin: 배우기 쉬워요(o'rganish oson), 말하기 어려워요(gapirish qiyin).",
        "한류 (Hallyu) — Koreya madaniyati to'lqini: K-pop, drama, film, ovqat, fashon.",
        "드라마로 한국어 배우기 — seriallar orqali koreys tilini o'rganish: EPS da eng foydali usul.",
        "BTS, BLACKPINK — eng mashhur K-pop guruhlari; dunyo bo'ylab muxlislar bor.",
      ],
      games: {
        matchPairs: [
          { kr: '대중문화', uz: 'ommaviy madaniyat' },
          { kr: '한류',     uz: "Koreya madaniyati to'lqini" },
          { kr: '팬',       uz: 'muxlis' },
          { kr: '외우다',   uz: 'yodlamoq' },
          { kr: '따라하다', uz: 'takrorlash' },
          { kr: '유명하다', uz: 'mashhur' },
        ],
        fillBlank: [
          { sentence: '재미있는 것 ___ 요.',          answer: '같아',  options: ['같아','해','봐','가'],          uz: "Qiziqarli ko'rinadi." },
          { sentence: '배우기 ___요.',                answer: '쉬워',  options: ['쉬워','어려워','좋아','해'],    uz: "O'rganish oson." },
          { sentence: '이해하기 ___요.',              answer: '어려워',options: ['어려워','쉬워','좋아','해'],    uz: "Tushunish qiyin." },
          { sentence: '한류가 세계적으로 유명한 것 같___ 요.', answer: '아', options: ['아','어','해','봐'], uz: "Hallyu dunyo bo'ylab mashhurdek ko'rinadi." },
          { sentence: 'K-pop 댄스를 따라하기 ___.',  answer: '어려워요', options: ['어려워요','쉬워요','좋아요','해요'], uz: "K-pop raqs takrorlash qiyin." },
        ],
        scramble: [
          { kr: '음악',   uz: 'musiqa' },
          { kr: '드라마', uz: 'serial' },
          { kr: '가수',   uz: "qo'shiqchi" },
          { kr: '인기',   uz: 'mashhurlik' },
          { kr: '한류',   uz: "Koreya to'lqini" },
        ],
      },
    },
    quiz: [
      { question: "'재미있는 것 같아요' nimani anglatadi?",         options: ['Qiziqarli','Qiziqarli ko\'rinadi','Qiziqarli emas','Juda qiziqarli'], correct_index: 1 },
      { question: "'배우기 쉬워요' tarjimasi?",                    options: ["O'rganish qiyin","O'rganish oson","O'rganaman","O'rgandim"],           correct_index: 1 },
      { question: "'-기 쉽다/어렵다' tuzilishi?",                  options: ['ot+기','fe\'l+기 쉽다/어렵다','sifat+기','olmosh+기'],               correct_index: 1 },
      { question: "'한류' nimani anglatadi?",                      options: ['Koreya taomi',"Koreya madaniyati to'lqini",'Koreya tili','Koreya tarixi'], correct_index: 1 },
      { question: "'팬' nimani anglatadi?",                        options: ['aktyor','qo\'shiqchi','muxlis, hayran','rejissyor'],                   correct_index: 2 },
      { question: "'외우다' nimani anglatadi?",                    options: ['tinglash','ko\'rish','yodlamoq','yozmoq'],                             correct_index: 2 },
      { question: "Koreya seriallarini ko'rish koreys tilini o'rganishga qanday ta'sir qiladi?", options: ['Ta\'sir qilmaydi','Yordami tegadi','Zarar qiladi','Vaqt yo\'qotish'], correct_index: 1 },
    ],
  },

];

// ─────────────────────────────────────────
// DB ga saqlash
// ─────────────────────────────────────────
async function seed() {
  console.log('EPS-TOPIK 3-daraja seed boshlandi...\n');
  console.log('Manba: eps1.docx — Darslar 21-30');
  console.log('Audio: {CDN_URL}/{lessonId}-{key}.mp3 — 37 ta key\n');

  for (const lesson of LESSONS) {
    const { quiz, ...lessonData } = lesson;

    const { rows: [saved] } = await db.query(
      `INSERT INTO lessons (track, level, title_kr, title_uz, content, is_free)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT DO NOTHING
       RETURNING id`,
      [
        lessonData.track,
        lessonData.order_in_level,
        lessonData.title_kr,
        lessonData.title_uz,
        JSON.stringify(lessonData.content),
        lessonData.is_free,
      ]
    );

    if (!saved) {
      console.log(`  ⚠️  Dars ${lessonData.order_in_level}: ${lessonData.title_kr} — allaqachon bor`);
      continue;
    }

    const audioUrls = buildAudioUrls(saved.id);
    await db.query(
      `UPDATE lessons SET audio_urls = $1 WHERE id = $2`,
      [JSON.stringify(audioUrls), saved.id]
    );

    for (const q of quiz) {
      await db.query(
        `INSERT INTO quiz_questions (lesson_id, question, options, correct_index)
         VALUES ($1, $2, $3, $4)`,
        [saved.id, q.question, JSON.stringify(q.options), q.correct_index]
      );
    }

    const icons = ['🏥','💊','📮','🏦','🏢','🏠','🎉','🎎','🙇','🎤'];
    console.log(`  ✅  ${icons[lessonData.order_in_level-1]} Dars ${lessonData.order_in_level}: ${lessonData.title_kr} (ID: ${saved.id})`);
  }

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('✅ EPS-TOPIK 3-daraja seed muvaffaqiyatli yakunlandi!');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`\n  📚 Darslar:    ${LESSONS.length} ta (21-30)`);
  console.log(`  🎯 Quiz:       ${LESSONS.length * 7} ta`);
  console.log(`  🔊 Audio keys: ${LESSONS.length * 37} ta`);
  console.log('\n  📋 Darslar ro\'yxati:');
  console.log('  1️⃣  병원     — Shifoxona (-(으)면, -지 마세요)');
  console.log('  2️⃣  약국     — Dorixona (-(으)니까, -(으)ㄴ 후에)');
  console.log('  3️⃣  우체국   — Pochta (-는데, -지요?)');
  console.log('  4️⃣  은행     — Bank (-(으)려고, -(으)면 되다)');
  console.log('  5️⃣  외국인 지원 기관 (-(으)러, -기 때문에)');
  console.log('  6️⃣  주거/음식 문화 (-아도/어도 되다, -는데)');
  console.log('  7️⃣  한국 기념일 (-는 sifatlovchi, -아/어 봤다)');
  console.log('  8️⃣  한국 명절 (-고 나서, -(으)ㄹ 줄 알다/모르다)');
  console.log('  9️⃣  한국 예절 (-(으)ㄹ 수 있다/없다, -(으)면 안 되다)');
  console.log('  🔟 대중문화  (-는 것 같다, -기 쉽다/어렵다)');
  console.log('\n📢 Keyingi qadam:');
  console.log('   eps1.docx darslar tugatildi (1-30)!');
  console.log('   Keyingi fayl: eps2.docx (31-60 mavzular)\n');

  await db.end();
}

seed().catch(err => {
  console.error('❌ Xatolik:', err.message);
  process.exit(1);
});
