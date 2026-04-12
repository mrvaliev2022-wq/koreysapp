// backend/src/seeds/eps_topik_level2.js
// EPS-TOPIK 2-daraja: 10 ta to'liq dars (Lesson 11-20)
// Manba: eps1.docx (11-20 mavzular)
// Audio URL: {CDN_URL}/{lessonId}-{key}.mp3 — Edge TTS (ko-KR-SunHiNeural)
// PC / iOS / Android — to'liq ishlaydigan
// Usage: node src/seeds/eps_topik_level2.js

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
  // DARS 11: 집안일 — Uy ishlari
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 2, order_in_level: 1,
    title_kr: '집안일 — 해야 할 일들',
    title_uz: "Uy ishlari — Qilish kerak bo'lgan ishlar",
    is_free: true,
    content: {
      topic: {
        kr: '한국에서 생활하면서 집안일을 해야 합니다. 청소해야 돼요, 빨래해야 돼요, 설거지해야 돼요. 제가 할게요! 지금 뭐 해요? 지금 빨래하고 있어요. 집을 깨끗하게 유지하는 것이 중요합니다.',
        uz: "Koreyada yashab, uy ishlarini qilish kerak. Tozalash kerak, kir yuvish kerak, idish yuvish kerak. Men qilaman! Hozir nima qilyapsiz? Hozir kir yuvayapman. Uyni toza saqlash muhim."
      },
      grammar: {
        explanation: `-아야/어야 되다 — "kerak / majbur"

Ma'nosi: biror ishni qilish majburiyligi
Tuzilish: [fe'l] + 아야/어야 되다

• 청소해야 돼요  → Tozalash kerak
• 공부해야 돼요  → O'qish kerak
• 일해야 돼요   → Ishlash kerak
• 먹어야 돼요   → Yeyish kerak

💡 Eslab qolish:
하다 fe'llari → 해야 돼요
아/오 unlisi tugasa → 아야 돼요
Boshqa → 어야 돼요

-(으)ㄹ게요 — "qilaman" (va'da / qaror)

Tuzilish:
• undosh → 을게요
• unli   → ㄹ게요

• 제가 할게요    → Men qilaman
• 청소할게요     → Tozalayman
• 도와줄게요     → Yordam beraman

💡 Farq: 할 거예요 (reja) vs 할게요 (va'da/qaror)`,
        examples: [
          { kr: '오늘 집을 청소해야 돼요.',        uz: "Bugun uyni tozalash kerak." },
          { kr: '빨래를 해야 돼요. 옷이 없어요.',   uz: "Kir yuvish kerak. Kiyim yo'q." },
          { kr: '걱정하지 마세요. 제가 할게요.',    uz: "Xavotir olmang. Men qilaman." },
          { kr: '설거지는 제가 할게요.',             uz: "Idish yuvishni men qilaman." },
          { kr: '지금 뭐 해요? 청소하고 있어요.',   uz: "Hozir nima qilyapsiz? Tozalayapman." },
        ]
      },
      vocabulary: [
        { kr: '청소하다',       romanization: 'cheongsohada',    uz: 'tozalamoq' },
        { kr: '빨래하다',       romanization: 'pallaehada',      uz: 'kir yuvmoq' },
        { kr: '요리하다',       romanization: 'yorihada',        uz: 'ovqat pishirmoq' },
        { kr: '설거지하다',     romanization: 'seolgeojihada',   uz: 'idish yuvmoq' },
        { kr: '쓰레기를 버리다',romanization: 'sseuregireul beorida', uz: 'axlat tashlamoq' },
        { kr: '정리하다',       romanization: 'jeongrihada',     uz: 'tartibga keltirmoq' },
        { kr: '집',             romanization: 'jip',             uz: 'uy' },
        { kr: '방',             romanization: 'bang',            uz: 'xona' },
        { kr: '부엌',           romanization: 'bueok',           uz: 'oshxona (uy)' },
        { kr: '화장실',         romanization: 'hwajangsil',      uz: 'hojatxona' },
        { kr: '해야 돼요',      romanization: 'haeya dwaeyo',    uz: 'qilish kerak' },
        { kr: '할게요',         romanization: 'halgeyo',         uz: 'qilaman (va\'da)' },
        { kr: '지금',           romanization: 'jigeum',          uz: 'hozir' },
        { kr: '깨끗하다',       romanization: 'kkaekeutada',     uz: 'toza' },
        { kr: '더럽다',         romanization: 'deoreopda',       uz: 'iflos' },
        { kr: '도와주다',       romanization: 'dowajuda',        uz: 'yordam bermoq' },
        { kr: '같이',           romanization: 'gachi',           uz: 'birga' },
        { kr: '먼저',           romanization: 'meonjeo',         uz: 'avval' },
        { kr: '나중에',         romanization: 'najunge',         uz: 'keyinroq' },
        { kr: '유지하다',       romanization: 'yujihada',        uz: 'saqlash, tutib turmoq' },
      ],
      examples: [
        { kr: '누가 청소해야 돼요? 제가 할게요!',          uz: "Kim tozalashi kerak? Men qilaman!" },
        { kr: '오늘 쓰레기를 버려야 돼요. 잊지 마세요.',   uz: "Bugun axlat tashlanishi kerak. Unutmang." },
        { kr: '요리는 제가 할게요. 설거지는 당신이 해요.', uz: "Ovqatni men pishiraman. Idish yuvishni siz qiling." },
        { kr: '집이 너무 더러워요. 지금 바로 청소해야 돼요.', uz: "Uy juda iflos. Hozir shu zahoti tozalash kerak." },
        { kr: '제가 도와줄게요. 같이 합시다.',             uz: "Men yordam beraman. Birga qilaylik." },
      ],
      dialog: [
        { speaker: 'A', kr: '오늘 뭐 해야 돼요?',              uz: "Bugun nima qilish kerak?" },
        { speaker: 'B', kr: '집을 청소해야 돼요. 너무 더러워요.', uz: "Uyni tozalash kerak. Juda iflos." },
        { speaker: 'A', kr: '같이 할까요? 제가 도와줄게요.',    uz: "Birga qilamizmi? Men yordam beraman." },
        { speaker: 'B', kr: '정말요? 감사해요! 저는 요리할게요, 당신은 청소해요.', uz: "Rostdanmi? Rahmat! Men ovqat pishiraman, siz tozalaysiz." },
        { speaker: 'A', kr: '좋아요. 설거지는 누가 해야 돼요?', uz: "Yaxshi. Idish yuvishni kim qilishi kerak?" },
        { speaker: 'B', kr: '그건 나중에 같이 해요!',           uz: "Uni keyinroq birga qilamiz!" },
      ],
      notes: [
        "-아야/어야 되다: majburiyat: 청소해야 돼요(tozalash kerak), 먹어야 돼요(yeyish kerak).",
        "-(으)ㄹ게요: va'da/qaror: 할게요(qilaman), 도와줄게요(yordam beraman).",
        "집안일 (uy ishlari) — Koreyada ko'pincha birgalikda qilinadi.",
        "쓰레기 버리기 — axlat tashlab turish: Koreyada alohida qoidalari bor (ranglar bo'yicha ajratish).",
        "지금 바로 — hozir shu zahoti: urgency bildiradi: '바로' = darhol.",
      ],
      games: {
        matchPairs: [
          { kr: '청소하다',   uz: 'tozalamoq' },
          { kr: '빨래하다',   uz: 'kir yuvmoq' },
          { kr: '설거지하다', uz: 'idish yuvmoq' },
          { kr: '도와주다',   uz: 'yordam bermoq' },
          { kr: '깨끗하다',   uz: 'toza' },
          { kr: '유지하다',   uz: 'saqlash' },
        ],
        fillBlank: [
          { sentence: '오늘 집을 청소해야 ___.',      answer: '돼요',  options: ['돼요','해요','가요','봐요'],   uz: "Bugun uyni tozalash kerak." },
          { sentence: '걱정하지 마세요. 제가 ___게요.',answer: '할',    options: ['할','먹을','갈','볼'],         uz: "Xavotir olmang. Men qilaman." },
          { sentence: '빨래를 해야 돼요. 옷이 ___.',  answer: '없어요',options: ['없어요','있어요','해요','가요'],uz: "Kir yuvish kerak. Kiyim yo'q." },
          { sentence: '집이 더러워요. ___ 청소해야 돼요.',answer:'지금',options: ['지금','나중에','어제','내일'],  uz: "Uy iflos. Hozir tozalash kerak." },
          { sentence: '제가 도와___ 게요.',            answer: '줄',    options: ['줄','할','먹을','볼'],         uz: "Men yordam beraman." },
        ],
        scramble: [
          { kr: '청소',   uz: 'tozalash' },
          { kr: '빨래',   uz: 'kir yuvish' },
          { kr: '요리',   uz: 'ovqat pishirish' },
          { kr: '지금',   uz: 'hozir' },
          { kr: '같이',   uz: 'birga' },
        ],
      },
    },
    quiz: [
      { question: "'청소해야 돼요' nimani anglatadi?",           options: ['Tozalayapman','Tozalash kerak','Tozalayman','Tozaladim'],          correct_index: 1 },
      { question: "'제가 할게요' qaysi ma'no?",                  options: ['Men qildim','Men qilaman (va\'da)','Men qilmadim','Men qilaman (reja)'], correct_index: 1 },
      { question: "'설거지하다' nimani anglatadi?",               options: ['kir yuvmoq','tozalamoq','idish yuvmoq','axlat tashlamoq'],         correct_index: 2 },
      { question: "'깨끗하다' nimani anglatadi?",                options: ['iflos','qimmat','toza','katta'],                                    correct_index: 2 },
      { question: "'도와주다' nimani anglatadi?",                options: ['so\'ramoq','yordam bermoq','kutmoq','ketmoq'],                      correct_index: 1 },
      { question: "하다 fe'li + 아야/어야 되다 → ?",             options: ['하야 돼요','해야 돼요','하어야 돼요','하아야 돼요'],                 correct_index: 1 },
      { question: "'지금 바로' nimani anglatadi?",               options: ['keyinroq','kecha','hozir shu zahoti','ertaga'],                     correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 12: 대중교통 — Jamoat transporti
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 2, order_in_level: 2,
    title_kr: '대중교통 — 버스와 지하철',
    title_uz: "Jamoat transporti — Avtobus va metro",
    is_free: true,
    content: {
      topic: {
        kr: '한국에서는 대중교통이 아주 발달했습니다. 버스로 가요, 지하철로 가요. 왜 지하철로 가요? 빨라서 좋아요. 오늘 왜 못 와요? 바빠서 못 와요. 어떻게 가요? 버스로 가요.',
        uz: "Koreyada jamoat transporti juda rivojlangan. Avtobus bilan boraman, metro bilan boraman. Nega metro bilan borasiz? Tez bo'lgani uchun yaxshi. Bugun nega kela olmaysiz? Bandman, shuning uchun kela olmayman. Qanday borasiz? Avtobus bilan boraman."
      },
      grammar: {
        explanation: `(으)로 — transport vositasi / yo'nalish

Transport vositasi: "...bilan / ...orqali"
• 버스로 가요    → Avtobus bilan boraman
• 지하철로 가요  → Metro bilan boraman
• 택시로 와요    → Taksi bilan kelaman

Yo'nalish: "...ga / ...tomonga"
• 오른쪽으로 가세요  → O'ngga boring
• 앞으로 가세요      → Oldinga boring

📏 Qoida:
• Undosh tugasa → 으로
• Unli / ㄹ tugasa → 로

-아서/어서 — sabab "chunki / sababli"

• 바빠서 못 가요   → Bandman, bora olmayman
• 빨라서 좋아요    → Tez, shuning uchun yaxshi
• 늦어서 죄송해요  → Kech qoldim, uzr`,
        examples: [
          { kr: '버스로 회사에 가요.',                uz: "Avtobus bilan ishga boraman." },
          { kr: '왜 지하철로 가요? 빨라서 좋아요.',   uz: "Nega metro bilan borasiz? Tez bo'lgani uchun yaxshi." },
          { kr: '바빠서 오늘 못 가요. 죄송해요.',     uz: "Bandman, bugun bora olmayman. Uzr." },
          { kr: '비가 와서 택시로 왔어요.',            uz: "Yomg'ir yog'gani uchun taksi bilan keldim." },
          { kr: '지하철이 빨라서 자주 이용해요.',      uz: "Metro tez bo'lgani uchun tez-tez foydalanaman." },
        ]
      },
      vocabulary: [
        { kr: '버스',     romanization: 'beoseu',       uz: 'avtobus' },
        { kr: '지하철',   romanization: 'jihacheol',    uz: 'metro' },
        { kr: '택시',     romanization: 'taeksi',       uz: 'taksi' },
        { kr: '기차',     romanization: 'gicha',        uz: 'poyezd' },
        { kr: '타다',     romanization: 'tada',         uz: 'minmoq, chiqmoq' },
        { kr: '내리다',   romanization: 'naerida',      uz: 'tushmoq (transportdan)' },
        { kr: '가다',     romanization: 'gada',         uz: 'bormoq' },
        { kr: '오다',     romanization: 'oda',          uz: 'kelmoq' },
        { kr: '정류장',   romanization: 'jeongnyujang', uz: 'bekat' },
        { kr: '역',       romanization: 'yeok',         uz: 'stansiya' },
        { kr: '표',       romanization: 'pyo',          uz: 'chipta' },
        { kr: '빠르다',   romanization: 'ppareuda',     uz: 'tez' },
        { kr: '느리다',   romanization: 'neuida',       uz: 'sekin' },
        { kr: '바쁘다',   romanization: 'bappeuda',     uz: 'band' },
        { kr: '못',       romanization: 'mot',          uz: 'qila olmaslik' },
        { kr: '죄송해요', romanization: 'jwesonghaeyo', uz: 'uzr, kechirasiz' },
        { kr: '어떻게',   romanization: 'eotteoke',     uz: 'qanday' },
        { kr: '왜',       romanization: 'wae',          uz: 'nega' },
        { kr: '이용하다', romanization: 'iyonghada',    uz: 'foydalanmoq' },
        { kr: '자주',     romanization: 'jaju',         uz: 'tez-tez' },
      ],
      examples: [
        { kr: '저는 매일 지하철로 출근해요. 빠르고 편리해요.',       uz: "Men har kuni metro bilan ishga boraman. Tez va qulay." },
        { kr: '오늘 버스가 늦어서 지각했어요. 죄송합니다.',          uz: "Bugun avtobus kech qolgani uchun kechikdim. Kechirasiz." },
        { kr: '회사가 멀어서 택시로 왔어요. 조금 비쌌어요.',         uz: "Ish joyi uzoq bo'lgani uchun taksi bilan keldim. Biroz qimmat edi." },
        { kr: '비가 와서 지하철로 가는 것이 좋아요.',                uz: "Yomg'ir yog'gani uchun metro bilan borish yaxshi." },
        { kr: '어떻게 공장에 가요? 셔틀버스로 가요. 무료예요.',       uz: "Zavodga qanday borasiz? Servis avtobus bilan boraman. Bepul." },
      ],
      dialog: [
        { speaker: 'A', kr: '어떻게 회사에 가요?',                      uz: "Qanday ishga borasiz?" },
        { speaker: 'B', kr: '지하철로 가요. 빠르고 편해서 좋아요.',     uz: "Metro bilan boraman. Tez va qulay bo'lgani uchun yaxshi." },
        { speaker: 'A', kr: '얼마나 걸려요?',                            uz: "Qancha vaqt ketadi?" },
        { speaker: 'B', kr: '30분 걸려요. 버스는 더 오래 걸려요.',       uz: "30 daqiqa ketadi. Avtobus ko'proq vaqt oladi." },
        { speaker: 'A', kr: '오늘 왜 못 왔어요?',                        uz: "Bugun nega kela olmadingiz?" },
        { speaker: 'B', kr: '버스가 안 와서 못 왔어요. 죄송해요.',       uz: "Avtobus kelmagan uchun kela olmadim. Uzr." },
      ],
      notes: [
        "(으)로 transport: 버스로(avtobus bilan), 지하철로(metro bilan), 걸어서(piyoda).",
        "-아서/어서 sabab: 바빠서(band bo'lgani uchun), 빨라서(tez bo'lgani uchun).",
        "못 + fe'l: qila olmaslik: 못 가요(bora olmayman), 못 와요(kela olmayman).",
        "Koreya metrosi: T-money karti bilan foydalanish qulay va arzon.",
        "셔틀버스 — ko'p zavodlar tomonidan bepul taqdim etiladi.",
      ],
      games: {
        matchPairs: [
          { kr: '버스',   uz: 'avtobus' },
          { kr: '지하철', uz: 'metro' },
          { kr: '타다',   uz: 'minmoq' },
          { kr: '내리다', uz: 'tushmoq' },
          { kr: '빠르다', uz: 'tez' },
          { kr: '자주',   uz: 'tez-tez' },
        ],
        fillBlank: [
          { sentence: '버스___ 회사에 가요.',         answer: '로',    options: ['로','에','를','이'],          uz: "Avtobus bilan ishga boraman." },
          { sentence: '바빠서 오늘 못 ___.',          answer: '가요',  options: ['가요','와요','해요','봐요'],  uz: "Bandman, bugun bora olmayman." },
          { sentence: '지하철이 빨라___ 좋아요.',     answer: '서',    options: ['서','고','면','지만'],        uz: "Metro tez bo'lgani uchun yaxshi." },
          { sentence: '비가 와___ 택시로 왔어요.',   answer: '서',    options: ['서','고','면','지만'],        uz: "Yomg'ir yog'gani uchun taksi bilan keldim." },
          { sentence: '어떻게 가요? ___로 가요.',    answer: '지하철',options: ['지하철','집','방','부엌'],    uz: "Qanday borasiz? Metro bilan boraman." },
        ],
        scramble: [
          { kr: '버스',   uz: 'avtobus' },
          { kr: '지하철', uz: 'metro' },
          { kr: '택시',   uz: 'taksi' },
          { kr: '정류장', uz: 'bekat' },
          { kr: '빠르다', uz: 'tez' },
        ],
      },
    },
    quiz: [
      { question: "'버스로 가요' — '로' nima uchun?",      options: ['Joy','Transport vositasi','Vaqt','Odam'],                    correct_index: 1 },
      { question: "'바빠서 못 가요' tarjimasi?",           options: ['Boraman','Bandman shuning uchun bora olmayman','Ketaman','Bora olaman'], correct_index: 1 },
      { question: "'빠르다' nimani anglatadi?",            options: ['sekin','band','tez','uzoq'],                                 correct_index: 2 },
      { question: "'내리다' nimani anglatadi?",            options: ['minmoq','tushmoq','kutmoq','bormoq'],                        correct_index: 1 },
      { question: "'죄송해요' nimani anglatadi?",          options: ['rahmat','salom','uzr, kechirasiz','xayr'],                   correct_index: 2 },
      { question: "Unli tugagan so'zga '(으)로' qanday qo'shiladi?", options: ['으로','로','에','를'],                             correct_index: 1 },
      { question: "'이용하다' nimani anglatadi?",          options: ['bormoq','kelmoq','foydalanmoq','minmoq'],                    correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 13: 주말 활동 — Dam olish kunlari
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 2, order_in_level: 3,
    title_kr: '주말 활동 — 주말 계획',
    title_uz: "Dam olish kunlari — Hafta oxiri rejalari",
    is_free: false,
    content: {
      topic: {
        kr: '주말에 뭐 할 거예요? 친구를 만날 거예요. 영화를 볼 거예요. 왜 못 가요? 바빠서 못 가요. 피곤해서 쉴 거예요. 주말에 보통 뭐 해요? 주말에는 운동하거나 영화를 봐요.',
        uz: "Dam olish kunlari nima qilasiz? Do'st bilan uchrashamanman. Kino ko'raman. Nega bora olmaysiz? Bandman, bora olmayman. Charchaganim uchun dam olaman. Dam olish kunlari odatda nima qilasiz? Dam olish kunlari sport qilaman yoki kino ko'raman."
      },
      grammar: {
        explanation: `-(으)ㄹ 거예요 — kelajak zamon "qilaman"

Tuzilish:
• Undosh tugasa → 을 거예요
• Unli tugasa  → ㄹ 거예요

• 갈 거예요     → boraman
• 먹을 거예요   → yeyman
• 만날 거예요   → uchrashaman
• 쉴 거예요     → dam olaman

💡 Farq:
-(으)ㄹ 거예요 = kelajak reja
-(으)ㄹ게요    = va'da/qaror

못 + fe'l — "qila olmayman"

Tuzilish: 못 + fe'l
• 못 가요   → bora olmayman
• 못 먹어요 → yeya olmayman
• 못 와요   → kela olmayman

안 vs 못:
• 안 가요 → bormayman (xohlamay)
• 못 가요 → bora olmayman (imkoni yo'q)`,
        examples: [
          { kr: '주말에 친구를 만날 거예요.',        uz: "Dam olish kunlari do'st bilan uchrasham." },
          { kr: '피곤해서 오늘 집에서 쉴 거예요.',   uz: "Charchaganim uchun bugun uyda dam olaman." },
          { kr: '바빠서 주말에도 못 쉬어요.',        uz: "Bandman, dam olish kunlari ham dam ola olmayman." },
          { kr: '내일 영화를 볼 거예요. 같이 갈래요?', uz: "Ertaga kino ko'raman. Birga borasizmi?" },
          { kr: '왜 못 와요? 회사 일이 있어서요.',   uz: "Nega kela olmaysiz? Ish joyi ishi bor." },
        ]
      },
      vocabulary: [
        { kr: '여행하다',   romanization: 'yeohaenghada', uz: 'sayohat qilmoq' },
        { kr: '영화 보다',  romanization: 'yeonghwa boda', uz: 'film ko\'rmoq' },
        { kr: '쇼핑하다',   romanization: 'syopinghada',  uz: 'xarid qilmoq' },
        { kr: '운동하다',   romanization: 'undonghada',   uz: 'sport qilmoq' },
        { kr: '친구를 만나다', romanization: 'chingureul mannada', uz: "do'st bilan uchrashmoq" },
        { kr: '쉬다',       romanization: 'swida',        uz: 'dam olmoq' },
        { kr: '바쁘다',     romanization: 'bappeuda',     uz: 'band' },
        { kr: '피곤하다',   romanization: 'pigonhada',    uz: 'charchagan' },
        { kr: '즐겁다',     romanization: 'jeulgeopda',   uz: 'quvnoq' },
        { kr: '재미있다',   romanization: 'jaemiitda',    uz: 'qiziqarli' },
        { kr: '주말',       romanization: 'jumal',        uz: 'hafta oxiri, dam olish kunlari' },
        { kr: '계획',       romanization: 'gyehoek',      uz: 'reja' },
        { kr: '보통',       romanization: 'botong',       uz: 'odatda' },
        { kr: '항상',       romanization: 'hangsang',     uz: 'doim' },
        { kr: '가끔',       romanization: 'gakeum',       uz: "ba'zan" },
        { kr: '혼자',       romanization: 'honja',        uz: "yolg'iz" },
        { kr: '같이',       romanization: 'gachi',        uz: 'birga' },
        { kr: '재미없다',   romanization: 'jaemieoptda',  uz: 'qiziqsiz' },
        { kr: '다음 주',    romanization: 'daeum ju',     uz: 'keyingi hafta' },
        { kr: '이번 주',    romanization: 'ibeonju',      uz: 'bu hafta' },
      ],
      examples: [
        { kr: '이번 주말에 가족과 여행할 거예요. 정말 기대돼요.',   uz: "Bu hafta oila bilan sayohat qilaman. Juda kutilmoqda." },
        { kr: '너무 피곤해서 이번 주말에는 집에서 쉴 거예요.',      uz: "Juda charchaganim uchun bu hafta uyda dam olaman." },
        { kr: '주말에 쇼핑하러 갈 거예요. 같이 갈래요?',            uz: "Dam olish kuni xarid qilgani boraman. Birga borasizmi?" },
        { kr: '바빠서 이번에는 못 가요. 다음에 갈게요.',             uz: "Bandman, bu safar bora olmayman. Keyingi safar boraman." },
        { kr: '주말에 보통 운동하거나 친구를 만나요.',               uz: "Dam olish kunlari odatda sport qilaman yoki do'st bilan uchrasham." },
      ],
      dialog: [
        { speaker: 'A', kr: '이번 주말에 뭐 할 거예요?',             uz: "Bu hafta nima qilasiz?" },
        { speaker: 'B', kr: '친구를 만날 거예요. 같이 영화를 볼 거예요.', uz: "Do'st bilan uchrasham. Birga kino ko'ramiz." },
        { speaker: 'A', kr: '재미있겠네요! 저도 같이 갈 수 있어요?', uz: "Qiziqarli ekan! Men ham birga bora olamanmi?" },
        { speaker: 'B', kr: '물론이죠! 같이 가요.',                   uz: "Albatta! Birga boramiz." },
        { speaker: 'A', kr: '그런데 저는 오전에는 못 가요. 일이 있어서요.', uz: "Lekin men tushgacha bora olmayman. Ishim bor." },
        { speaker: 'B', kr: '괜찮아요. 오후에 만날 거예요.',          uz: "Yaxshi. Tushdan keyin uchrashamiz." },
      ],
      notes: [
        "-(으)ㄹ 거예요: 갈 거예요(boraman), 먹을 거예요(yeyman), 쉴 거예요(dam olaman).",
        "못 vs 안: 못 가요(bora olmayman — imkoni yo'q), 안 가요(bormayman — xohlamasdan).",
        "주말 faoliyatlari: 여행(sayohat), 영화(kino), 쇼핑(xarid), 운동(sport).",
        "물론이죠! — Albatta! Ko'p ishlatiladigan qo'shilish iborasi.",
        "기대돼요 — kutilmoqda, sabrsizlik bilan kutilmoqda: juda ijobiy his.",
      ],
      games: {
        matchPairs: [
          { kr: '여행하다',   uz: 'sayohat qilmoq' },
          { kr: '쉬다',       uz: 'dam olmoq' },
          { kr: '피곤하다',   uz: 'charchagan' },
          { kr: '주말',       uz: 'hafta oxiri' },
          { kr: '보통',       uz: 'odatda' },
          { kr: '계획',       uz: 'reja' },
        ],
        fillBlank: [
          { sentence: '주말에 친구를 만날 ___ 예요.',    answer: '거',    options: ['거','것','수','만'],           uz: "Dam olish kunlari do'st bilan uchrasham." },
          { sentence: '바빠서 오늘 못 ___.',             answer: '가요',  options: ['가요','와요','해요','봐요'],   uz: "Bandman, bugun bora olmayman." },
          { sentence: '피곤해___ 집에서 쉴 거예요.',    answer: '서',    options: ['서','고','면','지만'],         uz: "Charchaganim uchun uyda dam olaman." },
          { sentence: '주말에 ___ 운동하거나 영화를 봐요.', answer: '보통', options: ['보통','항상','가끔','지금'], uz: "Dam olish kunlari odatda sport qilaman yoki kino ko'raman." },
          { sentence: '같이 갈래요? — 물론___!',        answer: '이죠',  options: ['이죠','아요','해요','가요'],   uz: "Birga borasizmi? — Albatta!" },
        ],
        scramble: [
          { kr: '여행',   uz: 'sayohat' },
          { kr: '주말',   uz: 'hafta oxiri' },
          { kr: '계획',   uz: 'reja' },
          { kr: '운동',   uz: 'sport' },
          { kr: '보통',   uz: 'odatda' },
        ],
      },
    },
    quiz: [
      { question: "'만날 거예요' nimani anglatadi?",         options: ['Uchrashdim','Uchrashaman','Uchrashayapman','Uchrashdim'],    correct_index: 1 },
      { question: "'못 가요' va '안 가요' farqi?",           options: ['Farq yo\'q','못=imkoni yo\'q; 안=xohlamasdan','안=imkoni yo\'q','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'피곤하다' nimani anglatadi?",            options: ['band','quvnoq','charchagan','qiziqarli'],                    correct_index: 2 },
      { question: "Unli so'zga '-(으)ㄹ 거예요' qanday?",  options: ['을 거예요','ㄹ 거예요','이 거예요','가 거예요'],              correct_index: 1 },
      { question: "'물론이죠!' nimani anglatadi?",           options: ['Bilmayman','Albatta!','Xayr!','Rahmat!'],                   correct_index: 1 },
      { question: "'재미있다' nimani anglatadi?",            options: ['qiziqsiz','zerikarli','qiziqarli','qiyin'],                 correct_index: 2 },
      { question: "'이번 주' nimani anglatadi?",             options: ['o\'tgan hafta','keyingi hafta','bu hafta','har hafta'],     correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 14: 길 찾기 — Yo'l so'rash
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 2, order_in_level: 4,
    title_kr: '길 찾기 — 어디에 있어요?',
    title_uz: "Yo'l so'rash — Qayerda?",
    is_free: false,
    content: {
      topic: {
        kr: '은행이 어디에 있어요? 오른쪽으로 가세요. 병원이 어디예요? 왼쪽으로 가세요. 역이 멀어요? 아니요, 가까워요. 앞으로 가세요. 가르쳐 주세요. 이 길이 맞아요?',
        uz: "Bank qayerda? O'ngga boring. Shifoxona qayerda? Chapga boring. Stansiya uzoqmi? Yo'q, yaqin. Oldinga boring. Ko'rsatib bering. Bu yo'l to'g'rimi?"
      },
      grammar: {
        explanation: `(으)로 — yo'nalish "...ga / ...tomonga"

• 오른쪽으로 가세요  → O'ngga boring
• 왼쪽으로 가세요   → Chapga boring
• 앞으로 가세요     → Oldinga boring
• 뒤로 가세요       → Orqaga boring

📏 Qoida:
• Undosh → 으로  (왼쪽으로)
• Unli/ㄹ → 로   (앞으로)

-(으)세요 — buyruq / muloyim tavsiya

Tuzilish:
• Undosh → 으세요
• Unli   → 세요

• 가세요    → boring
• 오세요    → keling
• 보세요    → ko'ring
• 기다리세요 → kuting

💡 "(으)세요" — iltimos shaklida buyruq, hurmatli va muloyim`,
        examples: [
          { kr: '오른쪽으로 가면 은행이 있어요.',           uz: "O'ngga borsangiz bank bor." },
          { kr: '저기서 왼쪽으로 도세요.',                  uz: "U yerda chapga buriling." },
          { kr: '앞으로 쭉 가세요. 오른쪽에 있어요.',        uz: "Oldinga to'g'ri boring. O'ng tomonda bor." },
          { kr: '역이 멀어요? 아니요, 걸어서 5분이에요.',   uz: "Stansiya uzoqmi? Yo'q, piyoda 5 daqiqa." },
          { kr: '이 길로 가세요. 곧 보여요.',               uz: "Bu yo'ldan boring. Tez ko'rinadi." },
        ]
      },
      vocabulary: [
        { kr: '길',       romanization: 'gil',        uz: "yo'l" },
        { kr: '오른쪽',   romanization: 'oreunjok',   uz: "o'ng" },
        { kr: '왼쪽',     romanization: 'oenjok',     uz: 'chap' },
        { kr: '앞',       romanization: 'ap',         uz: 'oldi' },
        { kr: '뒤',       romanization: 'dwi',        uz: 'orqa' },
        { kr: '옆',       romanization: 'yeop',       uz: 'yon' },
        { kr: '근처',     romanization: 'geuncheo',   uz: 'yaqin joy' },
        { kr: '돌다',     romanization: 'dolda',      uz: 'burilmoq' },
        { kr: '건너다',   romanization: 'geonneoda',  uz: "kesib o'tmoq" },
        { kr: '찾다',     romanization: 'chatda',     uz: 'topmoq, qidirmoq' },
        { kr: '은행',     romanization: 'eunhaeng',   uz: 'bank' },
        { kr: '병원',     romanization: 'byeongwon',  uz: 'shifoxona' },
        { kr: '역',       romanization: 'yeok',       uz: 'stansiya' },
        { kr: '가게',     romanization: 'gage',       uz: "do'kon" },
        { kr: '가깝다',   romanization: 'gakkapda',   uz: 'yaqin' },
        { kr: '멀다',     romanization: 'meolda',     uz: 'uzoq' },
        { kr: '쭉',       romanization: 'jjuk',       uz: "to'g'ri, to'xtovsiz" },
        { kr: '거기',     romanization: 'geogi',      uz: 'u yerda' },
        { kr: '저기',     romanization: 'jeogi',      uz: 'ana u yerda' },
        { kr: '맞다',     romanization: 'matda',      uz: "to'g'ri" },
      ],
      examples: [
        { kr: '실례합니다. 가장 가까운 지하철역이 어디에 있어요?', uz: "Kechirasiz. Eng yaqin metro stansiyasi qayerda?" },
        { kr: '앞으로 쭉 가다가 오른쪽으로 도세요.',              uz: "Oldinga to'g'ri borib, o'ngga buriling." },
        { kr: '은행은 편의점 옆에 있어요. 걸어서 3분이에요.',     uz: "Bank qo'shimcha do'kon yonida. Piyoda 3 daqiqa." },
        { kr: '이 길이 맞아요? 네, 맞아요. 쭉 가세요.',           uz: "Bu yo'l to'g'rimi? Ha, to'g'ri. To'g'ri boring." },
        { kr: '병원이 멀어요. 버스를 타세요.',                    uz: "Shifoxona uzoq. Avtobusga chiqing." },
      ],
      dialog: [
        { speaker: 'A', kr: '저기요, 가장 가까운 은행이 어디에 있어요?',          uz: "Hey, eng yaqin bank qayerda?" },
        { speaker: 'B', kr: '저 사거리에서 오른쪽으로 돌면 있어요.',              uz: "Ana o'sha to'rt yo'lda o'ngga bursangiz bor." },
        { speaker: 'A', kr: '걸어서 얼마나 걸려요?',                              uz: "Piyoda qancha vaqt ketadi?" },
        { speaker: 'B', kr: '5분 정도 걸려요. 신호등 건너서 쭉 가세요.',          uz: "5 daqiqa atrofida ketadi. Svetofordan o'tib to'g'ri boring." },
        { speaker: 'A', kr: '감사합니다. 그 옆에 병원도 있어요?',                uz: "Rahmat. Uning yonida shifoxona ham bormi?" },
        { speaker: 'B', kr: '네, 은행 바로 옆에 있어요. 찾기 쉬워요.',            uz: "Ha, bank bilan yonma-yon. Topish oson." },
      ],
      notes: [
        "(으)로 yo'nalish: 오른쪽으로(o'ngga), 왼쪽으로(chapga), 앞으로(oldinga).",
        "-(으)세요: muloyim buyruq: 가세요(boring), 오세요(keling), 기다리세요(kuting).",
        "쭉 — to'g'ri, to'xtovsiz: 앞으로 쭉 가세요(oldinga to'g'ri boring).",
        "사거리 (to'rt yo'l kesishuvi) — yo'l ko'rsatishda muhim joy nomi.",
        "실례합니다 — kechirasiz (yo'l so'rashda birinchi aytiladi).",
      ],
      games: {
        matchPairs: [
          { kr: '오른쪽', uz: "o'ng" },
          { kr: '왼쪽',   uz: 'chap' },
          { kr: '앞',     uz: 'oldi' },
          { kr: '뒤',     uz: 'orqa' },
          { kr: '가깝다', uz: 'yaqin' },
          { kr: '멀다',   uz: 'uzoq' },
        ],
        fillBlank: [
          { sentence: '오른쪽___ 가세요.',           answer: '으로',  options: ['으로','에','를','이'],          uz: "O'ngga boring." },
          { sentence: '앞으로 쭉 ___ 세요.',         answer: '가',    options: ['가','와','봐','해'],            uz: "Oldinga to'g'ri boring." },
          { sentence: '역이 멀어요? 아니요, ___.',   answer: '가까워요', options: ['가까워요','멀어요','커요','없어요'], uz: "Stansiya uzoqmi? Yo'q, yaqin." },
          { sentence: '신호등 건너서 ___ 가세요.',   answer: '쭉',    options: ['쭉','빨리','천천히','같이'],    uz: "Svetofordan o'tib to'g'ri boring." },
          { sentence: '이 길이 ___? 네, 맞아요.',   answer: '맞아요', options: ['맞아요','없어요','커요','가요'],uz: "Bu yo'l to'g'rimi? Ha, to'g'ri."},
        ],
        scramble: [
          { kr: '오른쪽', uz: "o'ng" },
          { kr: '왼쪽',   uz: 'chap' },
          { kr: '근처',   uz: 'yaqin joy' },
          { kr: '은행',   uz: 'bank' },
          { kr: '병원',   uz: 'shifoxona' },
        ],
      },
    },
    quiz: [
      { question: "'오른쪽으로 가세요' tarjimasi?",          options: ["Chapga boring","O'ngga boring","Oldinga boring","Orqaga boring"], correct_index: 1 },
      { question: "'왼쪽으로' — '으로' nega?",               options: ['Unli tugagan','Undosh tugagan','ㄹ tugagan','Ixtiyoriy'],         correct_index: 1 },
      { question: "'멀다' nimani anglatadi?",                options: ['yaqin','katta','uzoq','kichik'],                                  correct_index: 2 },
      { question: "'쭉' nimani anglatadi?",                  options: ["tez","to'g'ri, to'xtovsiz","sekin","birga"],                      correct_index: 1 },
      { question: "'-(으)세요' qanday shakl?",               options: ['Savol','Muloyim buyruq/tavsiya','Inkor','Kelajak'],               correct_index: 1 },
      { question: "'찾다' nimani anglatadi?",                options: ['bormoq','kelmoq','topmoq, qidirmoq','kutmoq'],                    correct_index: 2 },
      { question: "'실례합니다' qachon aytiladi?",           options: ['Xayrlashganda',"Yo'l so'rashdan oldin","Ovqat yeyishda",'Uxlashdan oldin'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 15: 옷차림 — Kiyim
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 2, order_in_level: 5,
    title_kr: '옷차림 — 뭐 입고 있어요?',
    title_uz: "Kiyim — Nima kiyib turibsiz?",
    is_free: false,
    content: {
      topic: {
        kr: '뭐 입고 있어요? 셔츠를 입고 있어요. 무슨 색 옷이에요? 검은색 옷이에요. 빨간 셔츠를 입고 있는 사람이 누구예요? 저예요. 오늘 작업복을 입어야 돼요.',
        uz: "Nima kiyib turibsiz? Ko'ylak kiyib turibman. Qanday rang kiyim? Qora kiyim. Qizil ko'ylak kiyib turgan odam kim? Menman. Bugun ish kiyim kiyish kerak."
      },
      grammar: {
        explanation: `-고 있다 — davomiy harakat "...yapman / ...yapti"

Tuzilish: [fe'l] + 고 있다

• 옷을 입고 있어요   → Kiyim kiyib turibman
• 모자를 쓰고 있어요  → Shapka kiyib turibman
• 일하고 있어요       → Ishlab turibman
• 먹고 있어요         → Yeyapman

💡 Kiyim uchun 3 ta fe'l:
• 입다 → kiymoq (kiyim: 옷, 셔츠, 바지)
• 쓰다 → kiymoq (bosh: 모자, 헬멧)
• 신다 → kiymoq (oyoq: 신발, 안전화)

-(으)ㄴ — sifatlovchi (qanday? qaysi?)

• 큰 옷        → katta kiyim
• 작은 신발    → kichik oyoq kiyim
• 예쁜 셔츠   → chiroyli ko'ylak
• 빨간 모자   → qizil shapka`,
        examples: [
          { kr: '지금 무슨 옷을 입고 있어요?',           uz: "Hozir qanday kiyim kiyib turibsiz?" },
          { kr: '파란 셔츠를 입고 안전모를 쓰고 있어요.', uz: "Ko'k ko'ylak kiyib xavfsizlik dubulg'asini kiyib turibman." },
          { kr: '오늘 날씨가 추워서 두꺼운 옷을 입었어요.', uz: "Bugun havo sovuq bo'lgani uchun qalin kiyim kiyidim." },
          { kr: '작업복을 입고 안전화를 신어야 해요.',      uz: "Ish kiyim kiyib xavfsizlik poyabzali kiyish kerak." },
          { kr: '그 사람 빨간 모자 쓰고 있는 사람이에요.', uz: "O'sha odam qizil shapka kiyib turgan odam." },
        ]
      },
      vocabulary: [
        { kr: '옷',       romanization: 'ot',         uz: 'kiyim' },
        { kr: '셔츠',     romanization: 'syeocheu',   uz: "ko'ylak" },
        { kr: '바지',     romanization: 'baji',       uz: 'shim' },
        { kr: '치마',     romanization: 'chima',      uz: 'yubka' },
        { kr: '코트',     romanization: 'koteu',      uz: 'palto' },
        { kr: '신발',     romanization: 'sinbal',     uz: 'oyoq kiyim' },
        { kr: '모자',     romanization: 'moja',       uz: 'bosh kiyim, shapka' },
        { kr: '빨간색',   romanization: 'ppalgansaek', uz: 'qizil' },
        { kr: '파란색',   romanization: 'paransaek',  uz: "ko'k" },
        { kr: '검은색',   romanization: 'geomeunsaek',uz: 'qora' },
        { kr: '흰색',     romanization: 'huinsaek',   uz: 'oq' },
        { kr: '노란색',   romanization: 'noransaek',  uz: 'sariq' },
        { kr: '입다',     romanization: 'ipda',       uz: 'kiymoq (kiyim)' },
        { kr: '쓰다',     romanization: 'sseuda',     uz: 'kiymoq (bosh)' },
        { kr: '신다',     romanization: 'sinda',      uz: 'kiymoq (oyoq)' },
        { kr: '작업복',   romanization: 'jageobbok',  uz: 'ish kiyimi' },
        { kr: '안전모',   romanization: 'anjeonmo',   uz: "xavfsizlik dubulg'asi" },
        { kr: '안전화',   romanization: 'anjeonhwa',  uz: 'xavfsizlik poyabzali' },
        { kr: '두껍다',   romanization: 'dukeopda',   uz: 'qalin' },
        { kr: '얇다',     romanization: 'yalda',      uz: 'yupqa' },
      ],
      examples: [
        { kr: '공장에서는 항상 작업복을 입고 안전화를 신어야 해요.',    uz: "Zavodda doim ish kiyim kiyib xavfsizlik poyabzali kiyish kerak." },
        { kr: '저 빨간 셔츠를 입고 있는 사람이 우리 팀장이에요.',       uz: "Ana qizil ko'ylak kiyib turgan odam bizning jamoa boshlig'i." },
        { kr: '오늘 날씨가 추워서 두꺼운 코트를 입었어요.',             uz: "Bugun havo sovuq bo'lgani uchun qalin palto kiyidim." },
        { kr: '무슨 색 모자를 쓰고 있어요? 노란색 안전모예요.',          uz: "Qanday rang shapka kiyib turibsiz? Sariq xavfsizlik dubulg'asi." },
        { kr: '이 옷이 작아요. 큰 사이즈로 바꿔 주세요.',               uz: "Bu kiyim kichik. Katta o'lchamga almashtiring." },
      ],
      dialog: [
        { speaker: 'A', kr: '지금 뭐 입고 있어요?',                       uz: "Hozir nima kiyib turibsiz?" },
        { speaker: 'B', kr: '파란 셔츠에 검은 바지를 입고 있어요.',        uz: "Ko'k ko'ylak va qora shim kiyib turibman." },
        { speaker: 'A', kr: '오늘 작업복 입어야 되지 않아요?',             uz: "Bugun ish kiyim kiyish kerak emasmi?" },
        { speaker: 'B', kr: '아, 맞아요! 잊었어요. 지금 바로 입을게요.',   uz: "A, to'g'ri! Unutdim. Hozir shu zahoti kiyaman." },
        { speaker: 'A', kr: '안전모도 써야 돼요. 중요해요.',               uz: "Xavfsizlik dubulg'asini ham kiyish kerak. Muhim." },
        { speaker: 'B', kr: '네, 알겠어요. 항상 안전이 먼저예요.',         uz: "Ha, tushundim. Doim xavfsizlik birinchi o'rinda." },
      ],
      notes: [
        "-고 있다: davomiy harakat: 입고 있어요(kiyib turibman), 쓰고 있어요(kiyib turibman).",
        "3 ta 'kiymoq': 입다(kiyim), 쓰다(bosh kiyim), 신다(oyoq kiyim) — farqini bilish muhim!",
        "작업복 (ish kiyimi), 안전모 (dubulg'a), 안전화 (xavfsizlik poyabzali) — EPS da majburiy.",
        "-(으)ㄴ sifatlovchi: 빨간 셔츠(qizil ko'ylak), 큰 옷(katta kiyim).",
        "안전이 먼저예요 — Xavfsizlik birinchi o'rinda: zavod muhitida eng muhim ibora.",
      ],
      games: {
        matchPairs: [
          { kr: '셔츠',   uz: "ko'ylak" },
          { kr: '바지',   uz: 'shim' },
          { kr: '신발',   uz: 'oyoq kiyim' },
          { kr: '빨간색', uz: 'qizil' },
          { kr: '검은색', uz: 'qora' },
          { kr: '작업복', uz: 'ish kiyimi' },
        ],
        fillBlank: [
          { sentence: '셔츠를 입고 ___ 어요.',           answer: '있',    options: ['있','없','해','가'],           uz: "Ko'ylak kiyib turibman." },
          { sentence: '모자를 ___ 고 있어요.',            answer: '쓰',    options: ['쓰','입','신','해'],           uz: "Shapka kiyib turibman." },
          { sentence: '안전화를 ___ 어야 해요.',          answer: '신',    options: ['신','쓰','입','해'],           uz: "Xavfsizlik poyabzali kiyish kerak." },
          { sentence: '빨간 ___ 를 입고 있어요.',         answer: '셔츠',  options: ['셔츠','바지','신발','모자'],   uz: "Qizil ko'ylak kiyib turibman." },
          { sentence: '항상 안전이 ___ 예요.',            answer: '먼저',  options: ['먼저','나중에','같이','항상'], uz: "Doim xavfsizlik birinchi o'rinda." },
        ],
        scramble: [
          { kr: '옷',     uz: 'kiyim' },
          { kr: '셔츠',   uz: "ko'ylak" },
          { kr: '모자',   uz: 'shapka' },
          { kr: '신발',   uz: 'oyoq kiyim' },
          { kr: '색깔',   uz: 'rang' },
        ],
      },
    },
    quiz: [
      { question: "'입고 있어요' nimani anglatadi?",       options: ['kiyaman','kiyidim','kiyib turibman','kiymoqchiman'],              correct_index: 2 },
      { question: "Bosh kiyim uchun qaysi fe'l?",         options: ['입다','신다','쓰다','하다'],                                       correct_index: 2 },
      { question: "Oyoq kiyim uchun qaysi fe'l?",         options: ['입다','신다','쓰다','하다'],                                       correct_index: 1 },
      { question: "'빨간색' nimani anglatadi?",            options: ["ko'k",'qizil','qora','sariq'],                                    correct_index: 1 },
      { question: "'작업복' nimani anglatadi?",            options: ['sport kiyim','uy kiyimi','ish kiyimi','bayram kiyimi'],           correct_index: 2 },
      { question: "'-(으)ㄴ' qanday vazifa bajaradi?",    options: ['fe\'l yasaydi','sifatlovchi yasaydi','inkor yasaydi','savol yasaydi'], correct_index: 1 },
      { question: "'안전이 먼저예요' nimani anglatadi?",   options: ['Tezlik muhim','Xavfsizlik birinchi o\'rinda','Kiyim muhim','Ovqat muhim'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 16: 집 구하기 — Uy topish
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 2, order_in_level: 6,
    title_kr: '집 구하기 — 어떤 집을 찾아요?',
    title_uz: "Uy topish — Qanday uy qidiryapsiz?",
    is_free: false,
    content: {
      topic: {
        kr: '어떤 집을 찾고 있어요? 작은 원룸을 구하고 싶어요. 이 집 어때요? 깨끗하지만 비싸요. 어디에 살고 싶어요? 공장 근처에 살고 싶어요. 방이 작지만 조용해요.',
        uz: "Qanday uy qidiryapsiz? Kichik bir xonali uy topmoqchiman. Bu uy qanday? Toza, lekin qimmat. Qayerda yashamoqchisiz? Zavod yaqinida yashamoqchiman. Xona kichik, lekin tinch."
      },
      grammar: {
        explanation: `-고 싶다 — "xohlayman"

Tuzilish: [fe'l] + 고 싶다

• 집을 구하고 싶어요  → Uy topmoqchiman
• 이사하고 싶어요     → Ko'chmoqchiman
• 살고 싶어요         → Yashamoqchiman
• 먹고 싶어요         → Yemoqchiman

💡 Farq:
-고 싶다    = xohlash (shaxsiy istak)
-(으)ㄹ 거예요 = reja (kelajak harakat)

-지만 — "lekin"

Tuzilish: [gap] + 지만 + [gap]

• 집이 크지만 비싸요   → Uy katta, lekin qimmat
• 방이 작지만 깨끗해요 → Xona kichik, lekin toza
• 조용하지만 멀어요    → Tinch, lekin uzoq
• 싸지만 좀 오래됐어요 → Arzon, lekin biroz eski`,
        examples: [
          { kr: '공장 근처에 작은 원룸을 구하고 싶어요.',       uz: "Zavod yaqinida kichik bir xonali uy topmoqchiman." },
          { kr: '이 집은 깨끗하지만 월세가 너무 비싸요.',       uz: "Bu uy toza, lekin oylik ijarasi juda qimmat." },
          { kr: '기숙사에 살고 싶어요. 편리하고 저렴해요.',     uz: "Yotoqxonada yashamoqchiman. Qulay va arzon." },
          { kr: '방이 작지만 조용하고 교통이 편해요.',          uz: "Xona kichik, lekin tinch va transport qulay." },
          { kr: '이사하고 싶어요. 지금 집이 너무 멀어요.',      uz: "Ko'chmoqchiman. Hozirgi uy juda uzoq." },
        ]
      },
      vocabulary: [
        { kr: '집',       romanization: 'jip',          uz: 'uy' },
        { kr: '아파트',   romanization: 'apateu',       uz: 'kvartira' },
        { kr: '방',       romanization: 'bang',          uz: 'xona' },
        { kr: '원룸',     romanization: 'wonnum',        uz: 'bir xonali uy' },
        { kr: '기숙사',   romanization: 'gisuska',       uz: 'yotoqxona' },
        { kr: '크다',     romanization: 'keuda',         uz: 'katta' },
        { kr: '작다',     romanization: 'jakda',         uz: 'kichik' },
        { kr: '깨끗하다', romanization: 'kkaekeutada',   uz: 'toza' },
        { kr: '조용하다', romanization: 'joyonghada',    uz: 'tinch' },
        { kr: '편하다',   romanization: 'pyeonhada',     uz: 'qulay' },
        { kr: '구하다',   romanization: 'guhada',        uz: 'qidirmoq, topmoq' },
        { kr: '살다',     romanization: 'salda',         uz: 'yashamoq' },
        { kr: '이사하다', romanization: 'isahada',       uz: "ko'chmoq" },
        { kr: '월세',     romanization: 'wolse',         uz: 'oylik ijara' },
        { kr: '보증금',   romanization: 'bojeunggeum',   uz: 'garov puli' },
        { kr: '관리비',   romanization: 'gwallubi',      uz: 'kommunal to\'lov' },
        { kr: '저렴하다', romanization: 'jeoryeomhada',  uz: 'arzon' },
        { kr: '오래되다', romanization: 'oraedweda',     uz: 'eski, qari' },
        { kr: '새로운',   romanization: 'saeroun',       uz: 'yangi' },
        { kr: '근처',     romanization: 'geuncheo',      uz: 'yaqin joy, atrofi' },
      ],
      examples: [
        { kr: '공장 근처에 원룸을 구하고 싶어요. 월세는 얼마예요?', uz: "Zavod yaqinida bir xonali uy topmoqchiman. Oylik ijarasi qancha?" },
        { kr: '이 아파트는 넓고 깨끗하지만 월세가 너무 비싸요.',    uz: "Bu kvartira keng va toza, lekin oylik ijarasi juda qimmat." },
        { kr: '기숙사에서 사는 것이 제일 편리해요. 공장 안에 있어서요.', uz: "Yotoqxonada yashash eng qulay. Zavod ichida bo'lgani uchun." },
        { kr: '방이 좀 작지만 조용하고 깨끗해서 마음에 들어요.',     uz: "Xona biroz kichik, lekin tinch va toza bo'lgani uchun yoqdim." },
        { kr: '보증금 없이 월세만 내는 집을 구하고 싶어요.',         uz: "Garovsiz faqat oylik ijara to'laydigan uy topmoqchiman." },
      ],
      dialog: [
        { speaker: 'A', kr: '어떤 집을 구하고 싶어요?',                    uz: "Qanday uy topmoqchisiz?" },
        { speaker: 'B', kr: '공장에서 가깝고 조용한 원룸을 구하고 싶어요.', uz: "Zavodga yaqin va tinch bir xonali uy topmoqchiman." },
        { speaker: 'A', kr: '월세는 얼마 정도 생각하고 있어요?',            uz: "Oylik ijarani qancha deb o'ylayapsiz?" },
        { speaker: 'B', kr: '30만원 이하로 구하고 싶어요.',                 uz: "300,000 wondan kam bo'lishini xohlayman." },
        { speaker: 'A', kr: '이 방은 어때요? 작지만 깨끗하고 저렴해요.',   uz: "Bu xona qanday? Kichik, lekin toza va arzon." },
        { speaker: 'B', kr: '마음에 들어요! 바로 계약할게요.',              uz: "Yoqdi! Hozir shu zahoti shartnoma tuzaman." },
      ],
      notes: [
        "-고 싶다: xohlash: 살고 싶어요(yashamoqchiman), 구하고 싶어요(topmoqchiman).",
        "-지만: qarama-qarshi: 크지만 비싸요(katta lekin qimmat), 작지만 깨끗해요(kichik lekin toza).",
        "월세 (oylik ijara) vs 전세 (to'liq depozit): Koreyada ikki xil ijara tizimi.",
        "보증금 (garov puli) — ko'pincha bir necha oy ijarasi miqdorida.",
        "마음에 들어요 — yoqdim, ko'nglimga to'g'ri keldi: keng ishlatiladigan ijobiy ifoda.",
      ],
      games: {
        matchPairs: [
          { kr: '아파트',   uz: 'kvartira' },
          { kr: '원룸',     uz: 'bir xonali uy' },
          { kr: '기숙사',   uz: 'yotoqxona' },
          { kr: '월세',     uz: 'oylik ijara' },
          { kr: '조용하다', uz: 'tinch' },
          { kr: '이사하다', uz: "ko'chmoq" },
        ],
        fillBlank: [
          { sentence: '공장 근처에 살고 ___ 어요.',      answer: '싶',    options: ['싶','있','없','해'],           uz: "Zavod yaqinida yashamoqchiman." },
          { sentence: '집이 크___ 비싸요.',              answer: '지만',  options: ['지만','고','서','면'],         uz: "Uy katta, lekin qimmat." },
          { sentence: '방이 작___ 깨끗해요.',            answer: '지만',  options: ['지만','고','서','면'],         uz: "Xona kichik, lekin toza." },
          { sentence: '이 집이 ___ 에 들어요.',          answer: '마음',  options: ['마음','생각','눈','귀'],       uz: "Bu uy yoqdi." },
          { sentence: '기숙사에서 사는 것이 제일 ___.',   answer: '편리해요', options: ['편리해요','비싸요','멀어요','커요'], uz: "Yotoqxonada yashash eng qulay." },
        ],
        scramble: [
          { kr: '집',     uz: 'uy' },
          { kr: '방',     uz: 'xona' },
          { kr: '월세',   uz: 'oylik ijara' },
          { kr: '조용',   uz: 'tinch' },
          { kr: '근처',   uz: 'yaqin joy' },
        ],
      },
    },
    quiz: [
      { question: "'살고 싶어요' nimani anglatadi?",       options: ['yashadim','yashamoqchiman','yashayman','yashamayapman'],          correct_index: 1 },
      { question: "'-지만' nimani anglatadi?",             options: ['shuning uchun','va','lekin','chunki'],                            correct_index: 2 },
      { question: "'원룸' nimani anglatadi?",              options: ['kvartira','yotoqxona','bir xonali uy','ikki xonali uy'],          correct_index: 2 },
      { question: "'월세' nimani anglatadi?",              options: ['garov puli','oylik ijara','kommunal to\'lov','shartnoma'],        correct_index: 1 },
      { question: "'마음에 들어요' nimani anglatadi?",     options: ['yomon','qimmat','yoqdim, ko\'nglimga to\'g\'ri keldi','katta'], correct_index: 2 },
      { question: "'-고 싶다' va '-(으)ㄹ 거예요' farqi?", options: ['Farq yo\'q','싶다=istak; 거예요=reja','거예요=istak','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'저렴하다' nimani anglatadi?",          options: ['qimmat','eski','arzon','kichik'],                                 correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 17: 휴가 — Ta'til
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 2, order_in_level: 7,
    title_kr: '휴가 — 어디에 가려고 해요?',
    title_uz: "Ta'til — Qayerga bormoqchisiz?",
    is_free: false,
    content: {
      topic: {
        kr: '휴가에 뭐 할 거예요? 여행하려고 해요. 어디에 가려고 해요? 바다에 가려고 해요. 여행할 때 뭐 해요? 사진을 찍어요. 쉴 때 음악을 들어요. 휴가가 기다려져요!',
        uz: "Ta'til paytida nima qilasiz? Sayohat qilmoqchiman. Qayerga bormoqchisiz? Dengizga bormoqchiman. Sayohat qilganda nima qilasiz? Suratga olaman. Dam olayotganda musiqa tinglayman. Ta'til kutilmoqda!"
      },
      grammar: {
        explanation: `-(으)ㄹ 때 — "...paytda / ...vaqtida"

Tuzilish:
• Undosh → 을 때
• Unli   → ㄹ 때

• 여행할 때    → Sayohat qilganda
• 쉴 때        → Dam olayotganda
• 먹을 때      → Yeyayotganda
• 일할 때      → Ishlaganda

-(으)려고 하다 — "niyat qilmoq / rejalamoq"

Tuzilish: [fe'l] + (으)려고 하다
• Undosh → 으려고 하다
• Unli   → 려고 하다

• 여행하려고 해요   → Sayohat qilmoqchiman
• 쉬려고 해요       → Dam olmoqchiman
• 바다에 가려고 해요 → Dengizga bormoqchiman

💡 Farq:
-고 싶다     = oddiy istak ("xohlayman")
-(으)려고 하다 = aniq niyat/reja ("qilmoqchiman")`,
        examples: [
          { kr: '휴가 때 바다에 가려고 해요.',           uz: "Ta'til paytida dengizga bormoqchiman." },
          { kr: '여행할 때 항상 사진을 많이 찍어요.',    uz: "Sayohat qilganda doim ko'p suratga olaman." },
          { kr: '쉴 때 뭐 해요? 음악을 듣거나 자요.',   uz: "Dam olayotganda nima qilasiz? Musiqa tinglayman yoki uxlayman." },
          { kr: '다음 달에 제주도에 가려고 해요.',       uz: "Keyingi oy Jeju oroliga bormoqchiman." },
          { kr: '비행기를 타려고 예약했어요.',            uz: "Samolyotga chiqish uchun band qildim." },
        ]
      },
      vocabulary: [
        { kr: '휴가',     romanization: 'hyuga',       uz: "ta'til" },
        { kr: '여행',     romanization: 'yeohaeng',    uz: 'sayohat' },
        { kr: '바다',     romanization: 'bada',        uz: 'dengiz' },
        { kr: '산',       romanization: 'san',         uz: "tog'" },
        { kr: '호텔',     romanization: 'hotel',       uz: 'mehmonxona' },
        { kr: '비행기',   romanization: 'bihaenggi',   uz: 'samolyot' },
        { kr: '기다리다', romanization: 'gidarida',    uz: 'kutmoq' },
        { kr: '쉬다',     romanization: 'swida',       uz: 'dam olmoq' },
        { kr: '놀다',     romanization: 'nolda',       uz: 'hordiq chiqarmoq' },
        { kr: '구경하다', romanization: 'gugyeonghada',uz: 'tomosha qilmoq' },
        { kr: '찍다',     romanization: 'jikda',       uz: 'suratga olmoq' },
        { kr: '예약하다', romanization: 'yeyakhada',   uz: 'band qilmoq, bron qilmoq' },
        { kr: '출발하다', romanization: 'chulbalhada', uz: "jo'namoq" },
        { kr: '도착하다', romanization: 'docakada',    uz: 'yetib kelmoq' },
        { kr: '짐',       romanization: 'jim',         uz: 'yuk, bagaj' },
        { kr: '여권',     romanization: 'yeogwon',     uz: 'pasport' },
        { kr: '기념품',   romanization: 'ginyeompum',  uz: 'sovg\'a, suvenir' },
        { kr: '풍경',     romanization: 'punggyeong',  uz: 'manzara' },
        { kr: '즐기다',   romanization: 'jeulgida',    uz: 'zavqlanmoq, bahramand bo\'lmoq' },
        { kr: '피로',     romanization: 'piro',        uz: 'charchoq, holsizlik' },
      ],
      examples: [
        { kr: '이번 휴가에 제주도에 가려고 해요. 비행기 예약했어요.',   uz: "Bu ta'tilda Jeju oroliga bormoqchiman. Samolyot band qildim." },
        { kr: '여행할 때 현지 음식을 먹어 보는 것을 좋아해요.',         uz: "Sayohat qilganda mahalliy taomni yeb ko'rishni yoqtiraman." },
        { kr: '쉴 때 산에 올라가려고 해요. 신선한 공기가 좋아요.',      uz: "Dam olayotganda tog'ga chiqmoqchiman. Toza havo yaxshi." },
        { kr: '휴가 때 피로를 풀고 새로운 에너지를 얻으려고 해요.',     uz: "Ta'til paytida charchoqni chiqarib yangi kuch olmoqchiman." },
        { kr: '가족에게 줄 기념품을 사려고 해요.',                     uz: "Oila uchun sovg'a sotib olmoqchiman." },
      ],
      dialog: [
        { speaker: 'A', kr: '이번 휴가에 뭐 하려고 해요?',              uz: "Bu ta'tilda nima qilmoqchisiz?" },
        { speaker: 'B', kr: '바다에 가려고 해요. 오랫동안 쉬고 싶어요.', uz: "Dengizga bormoqchiman. Uzoq vaqt dam olmoqchiman." },
        { speaker: 'A', kr: '언제 출발해요?',                           uz: "Qachon jo'naysiz?" },
        { speaker: 'B', kr: '다음 주 금요일에 출발하려고 해요.',         uz: "Keyingi hafta juma kuni jo'namoqchiman." },
        { speaker: 'A', kr: '숙소는 예약했어요?',                       uz: "Turar joy band qildingizmi?" },
        { speaker: 'B', kr: '네, 바다 근처 호텔을 예약했어요. 기대돼요!', uz: "Ha, dengiz yaqinida mehmonxona band qildim. Kutilmoqda!" },
      ],
      notes: [
        "-(으)ㄹ 때: payt: 여행할 때(sayohat qilganda), 쉴 때(dam olayotganda).",
        "-(으)려고 하다: aniq niyat: 가려고 해요(bormoqchiman), 쉬려고 해요(dam olmoqchiman).",
        "기다려져요 — kutilmoqda (passiv istak): juda sog'inch bilan kutishni bildiradi.",
        "제주도 — Jeju oroli: Koreya eng mashhur ta'til joyi.",
        "기념품 (sovg'a/suvenir) — Koreyada oilaga, do'stlarga sovg'a olib borish odatiy.",
      ],
      games: {
        matchPairs: [
          { kr: '휴가',     uz: "ta'til" },
          { kr: '여행',     uz: 'sayohat' },
          { kr: '예약하다', uz: 'band qilmoq' },
          { kr: '출발하다', uz: "jo'namoq" },
          { kr: '기념품',   uz: 'sovg\'a' },
          { kr: '즐기다',   uz: 'zavqlanmoq' },
        ],
        fillBlank: [
          { sentence: '바다에 가___ 고 해요.',             answer: '려',    options: ['려','서','고','면'],           uz: "Dengizga bormoqchiman." },
          { sentence: '여행할 ___ 사진을 찍어요.',         answer: '때',    options: ['때','곳','것','만'],           uz: "Sayohat qilganda suratga olaman." },
          { sentence: '쉴 때 음악을 ___ 어요.',            answer: '들',    options: ['들','가','봐','먹'],           uz: "Dam olayotganda musiqa tinglayman." },
          { sentence: '호텔을 예약___ 어요.',               answer: '했',    options: ['했','가','봤','먹'],           uz: "Mehmonxona band qildim." },
          { sentence: '휴가가 ___ 져요!',                  answer: '기다려',options: ['기다려','재미있어','좋아','가고싶어'],uz:"Ta'til kutilmoqda!"},
        ],
        scramble: [
          { kr: '휴가',   uz: "ta'til" },
          { kr: '여행',   uz: 'sayohat' },
          { kr: '바다',   uz: 'dengiz' },
          { kr: '비행기', uz: 'samolyot' },
          { kr: '호텔',   uz: 'mehmonxona' },
        ],
      },
    },
    quiz: [
      { question: "'가려고 해요' nimani anglatadi?",       options: ['bordim','boraman(reja)','bormoqchiman(niyat)','boraman(va\'da)'],  correct_index: 2 },
      { question: "'여행할 때' nimani anglatadi?",         options: ['sayohat qilgandan keyin','sayohat qilganda','sayohat qilish uchun','sayohat qilgunga qadar'], correct_index: 1 },
      { question: "'예약하다' nimani anglatadi?",          options: ["jo'namoq",'yetib kelmoq','band qilmoq, bron qilmoq','kutmoq'],   correct_index: 2 },
      { question: "'-고 싶다' va '-(으)려고 하다' farqi?", options: ['Farq yo\'q','싶다=oddiy istak; 려고=aniq niyat','려고=oddiy istak','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'출발하다' nimani anglatadi?",          options: ['yetib kelmoq','kutmoq',"jo'namoq",'dam olmoq'],                  correct_index: 2 },
      { question: "'풍경' nimani anglatadi?",              options: ['sayohat','sovg\'a','manzara','mehmonxona'],                       correct_index: 2 },
      { question: "'기대돼요' nimani anglatadi?",          options: ['charchadim','kutilmoqda, sabrsizlik bilan kutilmoqda','qo\'rqyapman','xursandman'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 18: 취미 — Hobbi
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 2, order_in_level: 8,
    title_kr: '취미 — 뭐 하는 것을 좋아해요?',
    title_uz: "Hobbi — Nima qilishni yoqtirasiz?",
    is_free: false,
    content: {
      topic: {
        kr: '취미가 뭐예요? 음악 듣는 것을 좋아해요. 책 읽는 것도 좋아해요. 같이 운동할까요? 네, 좋아요! 뭐 하는 것을 싫어해요? 게임하는 것을 별로 좋아하지 않아요.',
        uz: "Hobbingiz nima? Musiqa tinglashni yoqtiraman. Kitob o'qishni ham yoqtiraman. Birga sport qilamizmi? Ha, yaxshi! Nima qilishni yoqtirmaysiz? O'yin o'ynashni uncha yoqtirmayman."
      },
      grammar: {
        explanation: `-는 것 — fe'lni "narsa"ga aylantiradi (...qilish)

Tuzilish: [fe'l] + 는 것

• 운동하는 것  → sport qilish
• 음악 듣는 것 → musiqa tinglash
• 책 읽는 것   → kitob o'qish
• 요리하는 것  → ovqat pishirish

💡 Qolip:
___는 것을 좋아해요 = ___ishni yoqtiraman
___는 것을 싫어해요 = ___ishni yoqtirmayman

-(으)ㄹ까요? — taklif / fikr so'rash

Tuzilish:
• Undosh → 을까요?
• Unli   → ㄹ까요?

• 같이 갈까요?   → Birga boramizmi?
• 영화를 볼까요? → Film ko'ramizmi?
• 운동할까요?    → Sport qilamizmi?

Javob: 네, 좋아요! / 아니요, 못 해요`,
        examples: [
          { kr: '음악 듣는 것을 정말 좋아해요.',          uz: "Musiqa tinglashni juda yoqtiraman." },
          { kr: '주말에 같이 영화를 볼까요?',              uz: "Dam olish kuni birga kino ko'ramizmi?" },
          { kr: '요리하는 것을 배우고 싶어요.',            uz: "Ovqat pishirishni o'rganmoqchiman." },
          { kr: '운동하는 것이 건강에 좋아요.',            uz: "Sport qilish sog'lik uchun yaxshi." },
          { kr: '책 읽는 것보다 영화 보는 것을 더 좋아해요.', uz: "Kitob o'qishdan ko'ra kino ko'rishni ko'proq yoqtiraman." },
        ]
      },
      vocabulary: [
        { kr: '취미',     romanization: 'chwimi',      uz: 'hobbi' },
        { kr: '운동',     romanization: 'undong',      uz: 'sport' },
        { kr: '음악',     romanization: 'eumak',       uz: 'musiqa' },
        { kr: '영화',     romanization: 'yeonghwa',    uz: 'film, kino' },
        { kr: '독서',     romanization: 'dokseo',      uz: "kitob o'qish" },
        { kr: '게임',     romanization: 'geim',        uz: "o'yin" },
        { kr: '좋아하다', romanization: 'joahada',     uz: 'yoqtirmoq' },
        { kr: '싫어하다', romanization: 'sireohada',   uz: 'yoqtirmaslik' },
        { kr: '재미있다', romanization: 'jaemiitda',   uz: 'qiziqarli' },
        { kr: '어렵다',   romanization: 'eoryeopda',   uz: 'qiyin' },
        { kr: '듣다',     romanization: 'deutda',      uz: 'tinglash' },
        { kr: '읽다',     romanization: 'ikda',        uz: "o'qimoq" },
        { kr: '배우다',   romanization: 'baeuda',      uz: "o'rganmoq" },
        { kr: '하다',     romanization: 'hada',        uz: 'qilmoq' },
        { kr: '보다',     romanization: 'boda',        uz: "ko'rmoq" },
        { kr: '별로',     romanization: 'byeollo',     uz: 'uncha, alohida emas' },
        { kr: '정말',     romanization: 'jeongmal',    uz: 'rostdan, juda' },
        { kr: '건강',     romanization: 'geongang',    uz: "sog'liq" },
        { kr: '스트레스', romanization: 'seutteuleseu',uz: 'stress' },
        { kr: '즐겁다',   romanization: 'jeulgeopda',  uz: 'quvnoq, zavqli' },
      ],
      examples: [
        { kr: '제 취미는 음악 듣는 것이에요. 매일 들어요.',               uz: "Mening hobbim musiqa tinglash. Har kuni tinglayman." },
        { kr: '요리하는 것이 재미있지만 어려워요.',                       uz: "Ovqat pishirish qiziqarli, lekin qiyin." },
        { kr: '주말에 같이 수영할까요? 운동이 스트레스 해소에 좋아요.',    uz: "Dam olish kuni birga suzamizmi? Sport stressni chiqarishga yaxshi." },
        { kr: '책 읽는 것을 좋아하는 사람들이 많아요. 저도 좋아해요.',    uz: "Kitob o'qishni yoqtiradiganlar ko'p. Men ham yoqtiraman." },
        { kr: '게임하는 것을 별로 좋아하지 않아요. 운동이 더 좋아요.',    uz: "O'yin o'ynashni uncha yoqtirmayman. Sport ko'proq yoqadi." },
      ],
      dialog: [
        { speaker: 'A', kr: '취미가 뭐예요?',                              uz: "Hobbingiz nima?" },
        { speaker: 'B', kr: '음악 듣는 것을 좋아해요. 특히 K-POP을 좋아해요.', uz: "Musiqa tinglashni yoqtiraman. Ayniqsa K-POP ni yoqtiraman." },
        { speaker: 'A', kr: '그렇군요! 같이 콘서트에 갈까요?',             uz: "Shundaymi! Birga kontsertga boramizmi?" },
        { speaker: 'B', kr: '좋아요! 언제 가려고 해요?',                   uz: "Yaxshi! Qachon bormoqchisiz?" },
        { speaker: 'A', kr: '다음 달에 콘서트가 있어요. 같이 예약할까요?', uz: "Keyingi oy kontsert bor. Birga band qilamizmi?" },
        { speaker: 'B', kr: '네, 너무 좋아요! 정말 기대돼요.',             uz: "Ha, juda yaxshi! Rostdan kutilmoqda." },
      ],
      notes: [
        "-는 것: 운동하는 것(sport qilish), 듣는 것(tinglash), 읽는 것(o'qish).",
        "-(으)ㄹ까요?: taklif: 갈까요?(boramizmi?), 먹을까요?(yeymizmi?), 할까요?(qilamizmi?).",
        "별로 + 안/못: 별로 좋아하지 않아요(uncha yoqtirmayman) — yumshoq inkor.",
        "스트레스 해소 (stress chiqarish) — zavodda ishlagandan keyin hobbi muhim.",
        "K-POP — Koreya pop musiqasi: dunyo bo'yicha mashhur, Koreyada juda sevimli.",
      ],
      games: {
        matchPairs: [
          { kr: '취미',     uz: 'hobbi' },
          { kr: '좋아하다', uz: 'yoqtirmoq' },
          { kr: '싫어하다', uz: 'yoqtirmaslik' },
          { kr: '듣다',     uz: 'tinglash' },
          { kr: '읽다',     uz: "o'qimoq" },
          { kr: '별로',     uz: 'uncha, alohida emas' },
        ],
        fillBlank: [
          { sentence: '음악 듣는 ___ 을 좋아해요.',      answer: '것',    options: ['것','때','곳','만'],           uz: "Musiqa tinglashni yoqtiraman." },
          { sentence: '같이 운동할___요?',                answer: '까',    options: ['까','게','거','서'],           uz: "Birga sport qilamizmi?" },
          { sentence: '게임하는 것을 별로 좋아하지 ___.',answer: '않아요',options: ['않아요','해요','가요','봐요'],  uz: "O'yin o'ynashni uncha yoqtirmayman." },
          { sentence: '운동이 스트레스 ___ 에 좋아요.',  answer: '해소',  options: ['해소','관리','공부','일'],     uz: "Sport stressni chiqarishga yaxshi." },
          { sentence: '취미가 ___예요?',                  answer: '뭐',    options: ['뭐','어디','언제','누가'],     uz: "Hobbingiz nima?" },
        ],
        scramble: [
          { kr: '취미',   uz: 'hobbi' },
          { kr: '음악',   uz: 'musiqa' },
          { kr: '운동',   uz: 'sport' },
          { kr: '영화',   uz: 'kino' },
          { kr: '독서',   uz: "kitob o'qish" },
        ],
      },
    },
    quiz: [
      { question: "'음악 듣는 것' — '-는 것' nima qiladi?",  options: ['inkor yasaydi','fe\'lni ot sifatida ishlatadi','savol yasaydi','kelajak yasaydi'], correct_index: 1 },
      { question: "'같이 갈까요?' tarjimasi?",               options: ['Birga boraman','Birga boramizmi?','Birga borgim keladi','Birga bordik'], correct_index: 1 },
      { question: "'싫어하다' nimani anglatadi?",            options: ['yoqtirmoq','bilmoq','yoqtirmaslik','o\'rganmoq'],                    correct_index: 2 },
      { question: "'별로' qanday ishlatiladi?",              options: ['kuchli tasdiqlash','yumshoq inkor','savol','buyruq'],                 correct_index: 1 },
      { question: "'재미있다' nimani anglatadi?",            options: ['qiyin','qiziqarli','charchagan','band'],                             correct_index: 1 },
      { question: "'건강' nimani anglatadi?",                options: ['charchoq','stress',"sog'liq",'dam olish'],                           correct_index: 2 },
      { question: "Unli tugagan fe'lga '-(으)ㄹ까요?' qanday?", options: ['을까요','ㄹ까요','이까요','까요'],                                correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 19: 요리 — Ovqat tayyorlash
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 2, order_in_level: 9,
    title_kr: '요리 — 어떻게 만들어요?',
    title_uz: "Ovqat tayyorlash — Qanday qilasiz?",
    is_free: false,
    content: {
      topic: {
        kr: '뭐 만들어요? 음식을 만들고 있어요. 어떻게 요리해요? 재료를 넣어서 끓여요. 이 음식 어때요? 맛있어요! 한번 먹어 봐요. 직접 만들어 봐요. 요리는 생각보다 쉬워요.',
        uz: "Nima tayyorlayapsiz? Ovqat tayyorlayapman. Qanday pishirasiz? Ingredientlarni solib qaynataman. Bu ovqat qanday? Mazali! Bir marta yeb ko'ring. O'zingiz tayyorlab ko'ring. Ovqat pishirish o'ylagandan osonroq."
      },
      grammar: {
        explanation: `-아/어 보다 — "sinab ko'rmoq"

Tuzilish: [fe'l] + 아/어 보다

• 먹어 봐요   → Yeb ko'ring
• 만들어 봐요 → Tayyorlab ko'ring
• 해 봐요     → Qilib ko'ring
• 가 봐요     → Borib ko'ring
• 입어 봐요   → Kiyib ko'ring

💡 -(으)세요 vs -아/어 봐요:
가세요       = boring (buyruq)
가 봐요      = borib ko'ring (tavsiya, yumshoq)

-아서/어서 (ketma-ketlik) — "va keyin"

• 야채를 썰어서 넣어요   → Sabzavotni kesib solaman
• 물을 넣어서 끓여요     → Suv solib qaynataman
• 재료를 준비해서 요리해요 → Ingredientlarni tayyorlab pishiraman`,
        examples: [
          { kr: '이 김치찌개 정말 맛있어요. 한번 먹어 봐요!',     uz: "Bu kimchi sho'rva juda mazali. Bir marta yeb ko'ring!" },
          { kr: '야채를 먼저 썰어서 넣고 끓여요.',                uz: "Sabzavotni avval kesib solib qaynataman." },
          { kr: '한국 요리는 처음에는 어렵지만 해 보면 재미있어요.', uz: "Koreys oshpazlik dastlab qiyin, lekin qilib ko'rsangiz qiziqarli." },
          { kr: '직접 만들어 보세요. 더 맛있어요.',               uz: "O'zingiz tayyorlab ko'ring. Yanada mazali." },
          { kr: '재료를 준비해서 같이 요리해 봐요.',              uz: "Ingredientlarni tayyorlab birga pishirib ko'raylik." },
        ]
      },
      vocabulary: [
        { kr: '요리',     romanization: 'yori',        uz: 'ovqat tayyorlash' },
        { kr: '음식',     romanization: 'eumsik',      uz: 'ovqat' },
        { kr: '재료',     romanization: 'jaeryo',      uz: 'ingredient' },
        { kr: '고기',     romanization: 'gogi',        uz: "go'sht" },
        { kr: '야채',     romanization: 'yachae',      uz: 'sabzavot' },
        { kr: '물',       romanization: 'mul',         uz: 'suv' },
        { kr: '소금',     romanization: 'sogeum',      uz: 'tuz' },
        { kr: '맛있다',   romanization: 'masitda',     uz: 'mazali' },
        { kr: '맛없다',   romanization: 'masnopda',    uz: 'mazasiz' },
        { kr: '짜다',     romanization: 'jjada',       uz: "sho'r" },
        { kr: '달다',     romanization: 'dalda',       uz: 'shirin' },
        { kr: '맵다',     romanization: 'maepda',      uz: 'achchiq' },
        { kr: '만들다',   romanization: 'mandeulda',   uz: 'tayyorlamoq, yasasamoq' },
        { kr: '썰다',     romanization: 'sseolda',     uz: 'kesmoq, to\'g\'ramoq' },
        { kr: '넣다',     romanization: 'neota',       uz: 'solmoq' },
        { kr: '끓이다',   romanization: 'kkeulida',    uz: 'qaynatmoq' },
        { kr: '볶다',     romanization: 'bokda',       uz: "qovurmoq (yog'da)" },
        { kr: '씻다',     romanization: 'ssitda',      uz: 'yuvmoq' },
        { kr: '준비하다', romanization: 'junbihada',   uz: 'tayyorlamoq (oldindan)' },
        { kr: '직접',     romanization: 'jikjeop',     uz: "o'z qo'li bilan, bevosita" },
      ],
      examples: [
        { kr: '한국 된장찌개를 만들어 봤어요. 생각보다 쉬웠어요.',      uz: "Koreys soya pasta sho'rvasini tayyorlab ko'rdim. O'ylagandan oson edi." },
        { kr: '야채를 깨끗이 씻어서 썰고, 물에 넣어서 끓여요.',          uz: "Sabzavotni toza yuvib, kesib, suvga solib qaynataman." },
        { kr: '소금을 너무 많이 넣으면 짜요. 조금씩 넣어 봐요.',          uz: "Tuz juda ko'p solsangiz sho'r bo'ladi. Ozroqdan solib ko'ring." },
        { kr: '한국 음식 중에 김치찌개가 제일 쉽게 만들 수 있어요.',      uz: "Koreys taomlari orasida kimchi sho'rvani eng oson tayyorlab bo'ladi." },
        { kr: '요리는 직접 해 봐야 늘어요. 오늘부터 시작해 봐요!',        uz: "Ovqat pishirish o'z qo'li bilan qilib ko'rganingizda oshadi. Bugundan boshlab ko'ring!" },
      ],
      dialog: [
        { speaker: 'A', kr: '지금 뭐 만들어요?',                           uz: "Hozir nima tayyorlayapsiz?" },
        { speaker: 'B', kr: '김치찌개를 만들고 있어요. 한번 먹어 봐요!',    uz: "Kimchi sho'rva tayyorlayapman. Bir marta yeb ko'ring!" },
        { speaker: 'A', kr: '맛있어 보여요! 어떻게 만들어요?',              uz: "Mazali ko'rinmoqda! Qanday tayyorlaysiz?" },
        { speaker: 'B', kr: '먼저 야채를 썰어서 넣고, 그다음 고기를 넣어요. 그리고 물을 넣어서 끓여요.', uz: "Avval sabzavotni kesib solaman, keyin go'sht solaman. So'ng suv solib qaynataman." },
        { speaker: 'A', kr: '어렵지 않아요? 저도 만들어 볼 수 있을까요?',   uz: "Qiyin emasmi? Men ham tayyorlab ko'ra olamanmi?" },
        { speaker: 'B', kr: '물론이죠! 같이 만들어 봐요. 생각보다 쉬워요.', uz: "Albatta! Birga tayyorlab ko'raylik. O'ylagandan oson." },
      ],
      notes: [
        "-아/어 봐요: yumshoq tavsiya: 먹어 봐요(yeb ko'ring), 해 봐요(qilib ko'ring).",
        "-아서/어서 ketma-ketlik: 썰어서 넣어요(kesib solaman), 넣어서 끓여요(solib qaynataman).",
        "짜다(sho'r), 달다(shirin), 맵다(achchiq), 시다(nordon) — ta'm ifodalari.",
        "직접 — o'z qo'li bilan: 직접 만들어 봐요(o'zingiz tayyorlab ko'ring).",
        "한국 요리 asoslari: 김치찌개(kimchi sho'rva), 된장찌개(soya pasta sho'rva), 비빔밥(aralash guruch).",
      ],
      games: {
        matchPairs: [
          { kr: '재료',   uz: 'ingredient' },
          { kr: '만들다', uz: 'tayyorlamoq' },
          { kr: '썰다',   uz: 'kesmoq' },
          { kr: '끓이다', uz: 'qaynatmoq' },
          { kr: '맵다',   uz: 'achchiq' },
          { kr: '직접',   uz: "o'z qo'li bilan" },
        ],
        fillBlank: [
          { sentence: '한번 먹어 ___요.',                  answer: '봐',    options: ['봐','가','해','와'],           uz: "Bir marta yeb ko'ring." },
          { sentence: '야채를 썰어___ 넣어요.',            answer: '서',    options: ['서','고','면','지만'],         uz: "Sabzavotni kesib solaman." },
          { sentence: '물을 넣어서 ___여요.',              answer: '끓이',  options: ['끓이','볶','만들','써'],       uz: "Suv solib qaynataman." },
          { sentence: '소금을 너무 많이 넣으면 ___ 요.',  answer: '짜',    options: ['짜','달','매워','시'],         uz: "Tuz juda ko'p solsangiz sho'r bo'ladi." },
          { sentence: '요리는 ___ 해 봐야 늘어요.',       answer: '직접',  options: ['직접','빨리','나중에','같이'], uz: "Ovqat pishirish o'z qo'li bilan qilganingizda oshadi." },
        ],
        scramble: [
          { kr: '요리',   uz: 'ovqat pishirish' },
          { kr: '재료',   uz: 'ingredient' },
          { kr: '고기',   uz: "go'sht" },
          { kr: '야채',   uz: 'sabzavot' },
          { kr: '맛있다', uz: 'mazali' },
        ],
      },
    },
    quiz: [
      { question: "'먹어 봐요' nimani anglatadi?",          options: ['Yeyman','Yedim','Yeb ko\'ring','Yeya olmayman'],                   correct_index: 2 },
      { question: "'-아/어 봐요' vs '-(으)세요' farqi?",   options: ['Farq yo\'q','봐요=yumshoq tavsiya; 세요=buyruq','세요=tavsiya','Ikkalasi buyruq'], correct_index: 1 },
      { question: "'끓이다' nimani anglatadi?",             options: ['kesmoq','solmoq','qaynatmoq','yuvinmoq'],                          correct_index: 2 },
      { question: "'맵다' nimani anglatadi?",               options: ["sho'r",'shirin','nordon','achchiq'],                               correct_index: 3 },
      { question: "'직접' nimani anglatadi?",               options: ['birga','tez',"o'z qo'li bilan","ba'zan"],                          correct_index: 2 },
      { question: "'썰다' nimani anglatadi?",               options: ['solmoq','qaynatmoq','kesmoq, to\'g\'ramoq','qovurmoq'],           correct_index: 2 },
      { question: "'생각보다 쉬워요' tarjimasi?",           options: ['O\'ylagandan qiyin','O\'ylagandan oson','Juda qiyin','Juda oson'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 20: 인터넷과 스마트폰 — Internet va smartfon
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 2, order_in_level: 10,
    title_kr: '인터넷과 스마트폰 — 디지털 생활',
    title_uz: "Internet va smartfon — Raqamli hayot",
    is_free: false,
    content: {
      topic: {
        kr: '지금 뭐 하고 있어요? 메시지를 보내고 있어요. 영상을 보고 있어요. 지금 뭐 볼래요? 동영상을 볼래요. 사진 찍을래요? 네, 찍을래요. 한국에서는 스마트폰이 생활의 일부예요.',
        uz: "Hozir nima qilyapsiz? Xabar yuboryapman. Video ko'ryapman. Hozir nima ko'rmoqchisiz? Video ko'rmoqchiman. Suratga olmoqchimisiz? Ha, olmoqchiman. Koreyada smartfon hayotning bir qismi."
      },
      grammar: {
        explanation: `-고 있다 (davomiy harakat) — "...yapman / ...yapti"

Tuzilish: [fe'l] + 고 있다

• 메시지를 보내고 있어요  → Xabar yuboryapman
• 영상을 보고 있어요       → Video ko'ryapman
• 사진을 찍고 있어요       → Suratga olayapman
• 일하고 있어요            → Ishlab turibman

💡 Hozirgi davomiy: -고 있다
Oddiy hozirgi: -아요/어요

-(으)ㄹ래요 — "xohlayman / qilmoqchiman" (tanlov)

Tuzilish:
• Undosh → 을래요
• Unli   → ㄹ래요

• 볼래요    → Ko'rmoqchiman
• 먹을래요  → Yemoqchiman
• 갈래요    → Bormoqchiman

💡 -(으)ㄹ래요 vs -고 싶다:
둘 다 xohlashni bildiradi, lekin
래요 = ko'proq taklif/so'rash kontekstida`,
        examples: [
          { kr: '지금 뭐 하고 있어요? 인터넷 검색하고 있어요.',         uz: "Hozir nima qilyapsiz? Internet qidiryapman." },
          { kr: '오늘 저녁에 뭐 볼래요? 한국 드라마 볼래요.',            uz: "Bu kechqurun nima ko'rmoqchisiz? Koreya seriali ko'rmoqchiman." },
          { kr: '가족에게 사진을 보내고 있어요. 그리워요.',               uz: "Oilaga rasm yuboryapman. Sog'inadigan bo'ldim." },
          { kr: '앱을 사용해서 한국어를 배우고 있어요.',                 uz: "Ilova orqali koreys tilini o'rganayapman." },
          { kr: '지금 바쁜데 나중에 통화할래요?',                        uz: "Hozir bandman, keyinroq suhbatlashamizmi?" },
        ]
      },
      vocabulary: [
        { kr: '인터넷',   romanization: 'inteonet',    uz: 'internet' },
        { kr: '스마트폰', romanization: 'seumateuppon',uz: 'smartfon' },
        { kr: '앱',       romanization: 'aep',         uz: 'ilova (app)' },
        { kr: '메시지',   romanization: 'mesiji',      uz: 'xabar' },
        { kr: '사진',     romanization: 'sajin',       uz: 'rasm, surat' },
        { kr: '동영상',   romanization: 'dongyeongsang',uz: 'video' },
        { kr: '사용하다', romanization: 'sayonghada',  uz: 'foydalanmoq' },
        { kr: '보내다',   romanization: 'bonaeda',     uz: 'yubormoq' },
        { kr: '받다',     romanization: 'batda',       uz: 'qabul qilmoq' },
        { kr: '보다',     romanization: 'boda',        uz: "ko'rmoq" },
        { kr: '찍다',     romanization: 'jikda',       uz: 'suratga olmoq' },
        { kr: '검색하다', romanization: 'geomseokhada',uz: 'qidirmoq (internet)' },
        { kr: '통화하다', romanization: 'tonghwahada', uz: 'telefon orqali gaplashmoq' },
        { kr: '충전하다', romanization: 'chungjeonhada',uz: 'zaryadlamoq' },
        { kr: '연결하다', romanization: 'yeongyeolhada',uz: "ulamoq, bog'lamoq" },
        { kr: '다운로드', romanization: 'daunlodeu',   uz: 'yuklab olmoq (download)' },
        { kr: '업로드',   romanization: 'eomllodeu',   uz: 'yuklash (upload)' },
        { kr: '비밀번호', romanization: 'bimilbeonho', uz: 'parol, shifr' },
        { kr: '와이파이', romanization: 'waipai',      uz: 'wi-fi' },
        { kr: '배터리',   romanization: 'baeteoli',    uz: 'batareya' },
      ],
      examples: [
        { kr: '한국에서는 와이파이가 어디서나 잘 됩니다.',                  uz: "Koreyada wi-fi hamma joyda yaxshi ishlaydi." },
        { kr: '지금 가족과 영상통화를 하고 있어요. 잠깐만요.',              uz: "Hozir oila bilan video qo'ng'iroq qilyapman. Bir daqiqa." },
        { kr: '이 앱을 사용하면 번역을 쉽게 할 수 있어요.',                 uz: "Bu ilovadan foydalansangiz tarjimani oson qilish mumkin." },
        { kr: '스마트폰 배터리가 없어요. 충전기 있어요?',                   uz: "Smartfon batareyasi yo'q. Zaryadlovchi bormi?" },
        { kr: '인터넷으로 한국어 공부를 하고 있어요. 정말 편리해요.',        uz: "Internet orqali koreys tilini o'rganayapman. Juda qulay." },
      ],
      dialog: [
        { speaker: 'A', kr: '지금 뭐 하고 있어요?',                          uz: "Hozir nima qilyapsiz?" },
        { speaker: 'B', kr: '가족에게 영상을 보내고 있어요. 보고 싶어서요.', uz: "Oilaga video yuboryapman. Sog'inganimdan." },
        { speaker: 'A', kr: '자주 연락해요?',                                uz: "Tez-tez aloqada bo'lasizmi?" },
        { speaker: 'B', kr: '네, 매일 메시지를 보내고 가끔 영상통화를 해요.', uz: "Ha, har kuni xabar yuboraman va ba'zan video qo'ng'iroq qilaman." },
        { speaker: 'A', kr: '한국 생활이 많이 달라요?',                      uz: "Koreya hayoti juda farq qiladimi?" },
        { speaker: 'B', kr: '네, 하지만 스마트폰 덕분에 가족과 가까이 있는 것 같아요.', uz: "Ha, lekin smartfon tufayli oilam bilan yaqin turgandek his qilaman." },
      ],
      notes: [
        "-고 있다: hozirgi davomiy: 보내고 있어요(yuboryapman), 보고 있어요(ko'ryapman).",
        "-(으)ㄹ래요: tanlov/so'rash: 볼래요(ko'rmoqchiman), 갈래요(bormoqchiman).",
        "영상통화 (video qo'ng'iroq) — EPS ishchilari oilasi bilan bog'lanishning eng muhim usuli.",
        "와이파이 (wi-fi) — Koreyada jamoat joylarida, kafe, metro, zavod hammoyida bepul.",
        "스마트폰 덕분에 — smartfon tufayli: EPS ishchilari uchun smartfon eng muhim vosita.",
      ],
      games: {
        matchPairs: [
          { kr: '메시지',   uz: 'xabar' },
          { kr: '사진',     uz: 'rasm' },
          { kr: '검색하다', uz: 'qidirmoq' },
          { kr: '충전하다', uz: 'zaryadlamoq' },
          { kr: '와이파이', uz: 'wi-fi' },
          { kr: '배터리',   uz: 'batareya' },
        ],
        fillBlank: [
          { sentence: '메시지를 보내고 ___ 어요.',      answer: '있',    options: ['있','없','해','가'],           uz: "Xabar yuboryapman." },
          { sentence: '동영상을 볼___요.',               answer: '래',    options: ['래','게','거','서'],           uz: "Video ko'rmoqchiman." },
          { sentence: '사진을 찍고 ___ 어요.',           answer: '있',    options: ['있','없','해','가'],           uz: "Suratga olayapman." },
          { sentence: '스마트폰 ___ 가 없어요.',         answer: '배터리',options: ['배터리','와이파이','앱','메시지'],uz: "Smartfon batareyasi yo'q." },
          { sentence: '스마트폰 ___ 에 가족과 가까이 있어요.', answer: '덕분',options: ['덕분','탓','이유','때문'],uz:"Smartfon tufayli oilam bilan yaqinman."},
        ],
        scramble: [
          { kr: '인터넷', uz: 'internet' },
          { kr: '사진',   uz: 'rasm' },
          { kr: '메시지', uz: 'xabar' },
          { kr: '앱',     uz: 'ilova' },
          { kr: '검색',   uz: 'qidirish' },
        ],
      },
    },
    quiz: [
      { question: "'보내고 있어요' nimani anglatadi?",      options: ['yubordim','yuboryapman','yuboraman','yuboray'],                   correct_index: 1 },
      { question: "'볼래요' nimani anglatadi?",             options: ['ko\'rdim','ko\'rayapman','ko\'rmoqchiman','ko\'raman(reja)'],     correct_index: 2 },
      { question: "'-고 있다' vs '-아요/어요' farqi?",      options: ['Farq yo\'q','고 있다=davomiy; 아요=oddiy','아요=davomiy','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'검색하다' nimani anglatadi?",           options: ['yubormoq','qabul qilmoq','qidirmoq (internet)','yuklash'],       correct_index: 2 },
      { question: "'충전하다' nimani anglatadi?",           options: ['ulamoq','zaryadlamoq','qidirmoq','ko\'rmoq'],                    correct_index: 1 },
      { question: "'와이파이' nimani anglatadi?",           options: ['ilova','batareya','wi-fi','parol'],                              correct_index: 2 },
      { question: "'스마트폰 덕분에' nimani anglatadi?",    options: ['smartfon sababli (salbiy)','smartfon tufayli (ijobiy)','smartfon bilan','smartfon uchun'], correct_index: 1 },
    ],
  },

];

// ─────────────────────────────────────────
// DB ga saqlash — audio_urls bilan
// ─────────────────────────────────────────
async function seed() {
  console.log('EPS-TOPIK 2-daraja seed boshlandi...\n');
  console.log('Manba: eps1.docx — Darslar 11-20');
  console.log('Audio: {CDN_URL}/{lessonId}-{key}.mp3 — 37 ta key har darsda\n');

  for (const lesson of LESSONS) {
    const { quiz, ...lessonData } = lesson;

    // 1. Darsni saqlash
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

    // 2. Audio URL'larni DB ga yozish
    const audioUrls = buildAudioUrls(saved.id);
    await db.query(
      `UPDATE lessons SET audio_urls = $1 WHERE id = $2`,
      [JSON.stringify(audioUrls), saved.id]
    );

    // 3. Quiz savollarini saqlash
    for (const q of quiz) {
      await db.query(
        `INSERT INTO quiz_questions (lesson_id, question, options, correct_index)
         VALUES ($1, $2, $3, $4)`,
        [saved.id, q.question, JSON.stringify(q.options), q.correct_index]
      );
    }

    const icons = ['🏠','🚌','📅','🗺️','👕','🏡','🏖️','🎯','🍳','📱'];
    console.log(`  ✅  ${icons[lessonData.order_in_level-1]} Dars ${lessonData.order_in_level}: ${lessonData.title_kr} (ID: ${saved.id})`);
  }

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('✅ EPS-TOPIK 2-daraja seed muvaffaqiyatli yakunlandi!');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`\n  📚 Darslar:    ${LESSONS.length} ta (11-20)`);
  console.log(`  🎯 Quiz:       ${LESSONS.length * 7} ta (har darsga 7 ta)`);
  console.log(`  🔊 Audio keys: ${LESSONS.length * 37} ta (har darsga 37 ta)`);
  console.log(`  💼 Track:      EPS-TOPIK | Level: 2`);
  console.log('\n  📋 Darslar ro\'yxati:');
  console.log('  1️⃣  집안일      — Uy ishlari (-아야/어야 되다, -(으)ㄹ게요)');
  console.log('  2️⃣  대중교통    — Jamoat transporti ((으)로, -아서/어서)');
  console.log('  3️⃣  주말 활동   — Dam olish kunlari (-(으)ㄹ 거예요, 못)');
  console.log('  4️⃣  길 찾기     — Yo\'l so\'rash ((으)로 yo\'nalish, -(으)세요)');
  console.log('  5️⃣  옷차림      — Kiyim (-고 있다, -(으)ㄴ sifatlovchi)');
  console.log('  6️⃣  집 구하기   — Uy topish (-고 싶다, -지만)');
  console.log('  7️⃣  휴가        — Ta\'til (-(으)ㄹ 때, -(으)려고 하다)');
  console.log('  8️⃣  취미        — Hobbi (-는 것, -(으)ㄹ까요?)');
  console.log('  9️⃣  요리        — Ovqat tayyorlash (-아/어 보다, -아서/어서)');
  console.log('  🔟 인터넷/스마트폰 — Internet (-고 있다, -(으)ㄹ래요)');
  console.log('\n📢 Keyingi qadam:');
  console.log('   node src/seeds/eps_topik_level3.js');
  console.log('   node src/scripts/generate-audio.js --track eps --level 2\n');

  await db.end();
}

seed().catch(err => {
  console.error('❌ Xatolik:', err.message);
  process.exit(1);
});
