// backend/src/seeds/intro_alphabet.js
// Hangul kirish darsi — TOPIK va EPS-TOPIK uchun ikkita alohida dars
// order_in_level: 0  →  har doim birinchi (level 1 dan oldin)
// is_free: true      →  hammaga ochiq
// Audio: 37 ta key   →  Edge TTS tomonidan generatsiya qilinadi
// Barcha platformalarda ishlaydi: PC / iOS / Android
// Usage: node src/seeds/intro_alphabet.js

require('dotenv').config({ path: '../../.env' });
const db = require('../db');

// ────────────────────────────────────────────
// Audio URL builder
// ────────────────────────────────────────────
function buildAudioUrls(lessonDbId) {
  const base = process.env.R2_CDN_URL || 'https://audio.koreysapp.com';
  const keys = [
    'topic',
    ...Array.from({ length: 5 }, (_, i) => `grammar_${i}`),
    ...Array.from({ length: 20 }, (_, i) => `vocab_${i}`),
    ...Array.from({ length: 5 }, (_, i) => `example_${i}`),
    ...Array.from({ length: 6 }, (_, i) => `dialog_${i}`),
  ];
  const urls = {};
  keys.forEach(k => { urls[k] = `${base}/${lessonDbId}-${k}.mp3`; });
  return urls;
}

// ────────────────────────────────────────────
// Shared content — ikkala track uchun bir xil
// ────────────────────────────────────────────
function buildAlphabetContent() {
  return {
    topic: {
      kr: '안녕하세요! 한국어 첫 번째 수업입니다. 한글은 1443년 세종대왕이 만든 한국의 고유 문자입니다. 한글은 배우기 쉽고 과학적인 문자 체계입니다. 모음과 자음을 합쳐서 하나의 음절 블록을 만듭니다.',
      uz: "Salom! Bu koreys tilining birinchi darsi. Hangul 1443-yilda Sejong the Great tomonidan yaratilgan Koreya yozuvidir. Hangul o'rganish oson va ilmiy yozuv tizimi. Unli va undoshlar birlashib bir bo'g'in blokini hosil qiladi."
    },

    // grammar bo'limida Hangul tizimi to'liq tushuntiriladi
    grammar: {
      explanation: `한글 (Hangul) — Koreys yozuvi tizimi

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔤 1. UNLILAR — 모음 (Vowels)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Asosiy unlilar:
  ㅏ (a)   — "aka" dagi a        → 사과 (sagwa) — olma
  ㅓ (ɔ)   — "ota" dagi o        → 어머니 (eomeoni) — ona
  ㅗ (o)   — "olma" dagi o       → 오이 (oi) — bodring
  ㅜ (u)   — "uzum" dagi u       → 우유 (uyu) — sut
  ㅡ (ɯ)   — i va u orasida      → 음악 (eumak) — musiqa
  ㅣ (i)   — "ilm" dagi i        → 이 (i) — tish

Ikki tovushli unlilar (ya, yo, yu, ye):
  ㅑ (ya)  → 약 (yak) — dori
  ㅕ (yɔ)  → 여자 (yeoja) — ayol
  ㅛ (yo)  → 요리 (yori) — ovqat
  ㅠ (yu)  → 유리 (yuri) — oyna

Qo'shma unlilar:
  ㅐ (e)   → 개 (gae) — it
  ㅔ (e)   → 세 (se) — uch
  ㅚ (oe)  → 외국 (oeguk) — chet davlat
  ㅟ (wi)  → 위 (wi) — yuqori
  ㅢ (ɯi)  → 의자 (uija) — stul

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔤 2. UNDOSHLAR — 자음 (Consonants)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Asosiy undoshlar:
  ㄱ (k/g) → 가방 (gabang) — sumka
  ㄴ (n)   → 나무 (namu) — daraxt
  ㄷ (t/d) → 다리 (dari) — oyoq
  ㄹ (r/l) → 라면 (ramyon) — ramen
  ㅁ (m)   → 물 (mul) — suv
  ㅂ (p/b) → 바다 (bada) — dengiz
  ㅅ (s)   → 사람 (saram) — odam
  ㅇ (ng)  → 공 (gong) — to'p [boshida o'qilmaydi]
  ㅈ (j)   → 집 (jip) — uy
  ㅎ (h)   → 학교 (hakgyo) — maktab

Kuchli undoshlar — 쌍자음 (ikki marta bosimli):
  ㄲ (kk) → 까치 (kkachi) — zag'izg'on
  ㄸ (tt) → 딸 (ttal) — qiz (farzand)
  ㅃ (pp) → 빵 (ppang) — non
  ㅆ (ss) → 쌀 (ssal) — guruch
  ㅉ (jj) → 짜다 (jjada) — sho'r

Aspiratsiyali undoshlar (nafas bilan):
  ㅋ (kʰ) → 코 (ko) — burun
  ㅌ (tʰ) → 토끼 (tokki) — quyon
  ㅍ (pʰ) → 피 (pi) — qon
  ㅊ (chʰ)→ 차 (cha) — mashina

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔤 3. BO'G'IN TIZIMI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Koreys tilida harflar BLOK bo'lib yoziladi:
  [undosh + unli] = ochiq bo'g'in
  [undosh + unli + undosh] = yopiq bo'g'in (받침)

Misollar:
  ㄱ + ㅏ = 가 (ga)
  ㄴ + ㅏ = 나 (na)
  ㅂ + ㅏ = 바 (ba)
  ㅎ + ㅏ + ㄴ = 한 (han)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔤 4.받침 — Oxirgi undosh
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Oxirgi undosh boshqacha eshitiladi:
  ㄱ → k  : 박 (bak)
  ㄷ → t  : 맏 (mat)
  ㅂ → p  : 밥 (bap) — ovqat

Muhim so'zlar:
  밥 (bap)  — ovqat    집 (jip) — uy
  책 (chaek)— kitob    손 (son) — qo'l
  눈 (nun)  — ko'z`,

      examples: [
        { kr: '가방 (gabang)', uz: 'sumka — ㄱ+ㅏ / ㅂ+ㅏ+ㅇ' },
        { kr: '사람 (saram)', uz: 'odam — ㅅ+ㅏ / ㄹ+ㅏ+ㅁ' },
        { kr: '학교 (hakgyo)', uz: 'maktab — ㅎ+ㅏ+ㄱ / ㄱ+ㅛ' },
        { kr: '한글 (hangeul)', uz: "Koreys yozuvi — ㅎ+ㅏ+ㄴ / ㄱ+ㅡ+ㄹ" },
        { kr: '친구 (chingu)', uz: "do'st — ㅊ+ㅣ+ㄴ / ㄱ+ㅜ" },
      ]
    },

    // 20 ta lug'at — alifbodan eng muhim, keng tarqalgan so'zlar
    vocabulary: [
      // Unlilar bilan so'zlar
      { kr: '아버지', romanization: 'abeoji', uz: 'ota' },
      { kr: '어머니', romanization: 'eomeoni', uz: 'ona' },
      { kr: '오빠', romanization: 'oppa', uz: 'aka (qiz aytadi)' },
      { kr: '이름', romanization: 'ireum', uz: 'ism' },
      { kr: '우리', romanization: 'uri', uz: 'biz, bizning' },
      // Undoshlar bilan so'zlar
      { kr: '가방', romanization: 'gabang', uz: 'sumka' },
      { kr: '나라', romanization: 'nara', uz: 'mamlakat' },
      { kr: '다리', romanization: 'dari', uz: 'oyoq; ko\'prik' },
      { kr: '물', romanization: 'mul', uz: 'suv' },
      { kr: '바다', romanization: 'bada', uz: 'dengiz' },
      // Kuchli undoshlar
      { kr: '빵', romanization: 'ppang', uz: 'non' },
      { kr: '쌀', romanization: 'ssal', uz: 'guruch' },
      { kr: '딸', romanization: 'ttal', uz: 'qiz (farzand)' },
      // Aspiratsiyali undoshlar
      { kr: '코', romanization: 'ko', uz: 'burun' },
      { kr: '토끼', romanization: 'tokki', uz: 'quyon' },
      // Bo'g'in tizimi
      { kr: '학교', romanization: 'hakgyo', uz: 'maktab' },
      { kr: '사람', romanization: 'saram', uz: 'odam' },
      { kr: '친구', romanization: 'chingu', uz: "do'st" },
      { kr: '가족', romanization: 'gajok', uz: 'oila' },
      { kr: '한국', romanization: 'hanguk', uz: 'Koreya' },
    ],

    examples: [
      { kr: '안녕하세요! 저는 오이벡이에요.', uz: "Salom! Men Oybekman. (ㅇ+ㅏ+ㄴ / ㄴ+ㅕ+ㅇ / ...)" },
      { kr: '한국어를 배우고 싶어요.', uz: "Koreys tilini o'rganmoqchiman." },
      { kr: '제 이름은 마리암이에요.', uz: "Mening ismim Mariyam. (이름 = ism)" },
      { kr: '가방이 있어요.', uz: "Sumkam bor. (가방 = sumka)" },
      { kr: '사과가 맛있어요.', uz: "Olma mazali. (사과 = olma, ㅏ unlisi)" },
    ],

    dialog: [
      { speaker: 'A', kr: '이게 뭐예요?', uz: "Bu nima? (이 = bu, ㅣ unlisi)" },
      { speaker: 'B', kr: '가방이에요. 가방!', uz: "Sumka. Sumka! (가방 = sumka)" },
      { speaker: 'A', kr: '어떻게 읽어요? 가방?', uz: "Qanday o'qiladi? Gabang?" },
      { speaker: 'B', kr: '맞아요! ㄱ+ㅏ = 가, ㅂ+ㅏ+ㅇ = 방.', uz: "To'g'ri! ㄱ+ㅏ = ga, ㅂ+ㅏ+ㅇ = bang." },
      { speaker: 'A', kr: '아, 이제 알겠어요! 한글이 쉬운 것 같아요!', uz: "A, endi tushundim! Hangul osonroq shekilli!" },
      { speaker: 'B', kr: '네! 연습하면 금방 배울 수 있어요!', uz: "Ha! Mashq qilsangiz tezda o'rgana olasiz!" },
    ],

    notes: [
      "Hangul 1443-yilda yaratilgan — dunyodagi eng ilmiy yozuv tizimlaridan biri.",
      "ㅇ harfi so'z boshida o'qilmaydi: 아 = a. So'z oxirida 'ng' o'qiladi: 방 = bang.",
      "Kuchli undoshlar (ㄲㄸㅃㅆㅉ) ikki marta bosim bilan talaffuz qilinadi: 빵 (ppang).",
      "Aspiratsiyali undoshlar (ㅋㅌㅍㅊ) nafas chiqarib talaffuz qilinadi: 코 (kʰo).",
      "Har kuni 10 daqiqa ovoz chiqarib o'qing — tezlik emas, to'g'rilik muhim.",
    ],

    // Alifbo uchun maxsus alphabet_data — frontend da vizual ko'rsatish uchun
    alphabet_data: {
      vowels_basic: [
        { char: 'ㅏ', sound: 'a',  example_kr: '사과', example_uz: 'olma',     romanization: 'sagwa' },
        { char: 'ㅓ', sound: 'ɔ',  example_kr: '어머니', example_uz: 'ona',    romanization: 'eomeoni' },
        { char: 'ㅗ', sound: 'o',  example_kr: '오이', example_uz: 'bodring',   romanization: 'oi' },
        { char: 'ㅜ', sound: 'u',  example_kr: '우유', example_uz: 'sut',       romanization: 'uyu' },
        { char: 'ㅡ', sound: 'ɯ',  example_kr: '음악', example_uz: 'musiqa',   romanization: 'eumak' },
        { char: 'ㅣ', sound: 'i',  example_kr: '이',   example_uz: 'tish',     romanization: 'i' },
      ],
      vowels_compound: [
        { char: 'ㅑ', sound: 'ya',  example_kr: '약',   example_uz: 'dori',    romanization: 'yak' },
        { char: 'ㅕ', sound: 'yɔ',  example_kr: '여자', example_uz: 'ayol',    romanization: 'yeoja' },
        { char: 'ㅛ', sound: 'yo',  example_kr: '요리', example_uz: 'ovqat',   romanization: 'yori' },
        { char: 'ㅠ', sound: 'yu',  example_kr: '유리', example_uz: 'oyna',    romanization: 'yuri' },
        { char: 'ㅐ', sound: 'e',   example_kr: '개',   example_uz: 'it',      romanization: 'gae' },
        { char: 'ㅔ', sound: 'e',   example_kr: '세',   example_uz: 'uch',     romanization: 'se' },
        { char: 'ㅚ', sound: 'oe',  example_kr: '외국', example_uz: 'chet davlat', romanization: 'oeguk' },
        { char: 'ㅟ', sound: 'wi',  example_kr: '위',   example_uz: 'yuqori',  romanization: 'wi' },
        { char: 'ㅢ', sound: 'ɯi', example_kr: '의자', example_uz: 'stul',     romanization: 'uija' },
      ],
      consonants_basic: [
        { char: 'ㄱ', sound: 'k/g', example_kr: '가방', example_uz: 'sumka',   romanization: 'gabang' },
        { char: 'ㄴ', sound: 'n',   example_kr: '나무', example_uz: 'daraxt',  romanization: 'namu' },
        { char: 'ㄷ', sound: 't/d', example_kr: '다리', example_uz: 'oyoq',    romanization: 'dari' },
        { char: 'ㄹ', sound: 'r/l', example_kr: '라면', example_uz: 'ramen',   romanization: 'ramyon' },
        { char: 'ㅁ', sound: 'm',   example_kr: '물',   example_uz: 'suv',     romanization: 'mul' },
        { char: 'ㅂ', sound: 'p/b', example_kr: '바다', example_uz: 'dengiz',  romanization: 'bada' },
        { char: 'ㅅ', sound: 's',   example_kr: '사람', example_uz: 'odam',    romanization: 'saram' },
        { char: 'ㅇ', sound: 'ng',  example_kr: '공',   example_uz: "to'p",    romanization: 'gong' },
        { char: 'ㅈ', sound: 'j',   example_kr: '집',   example_uz: 'uy',      romanization: 'jip' },
        { char: 'ㅎ', sound: 'h',   example_kr: '학교', example_uz: 'maktab',  romanization: 'hakgyo' },
      ],
      consonants_strong: [
        { char: 'ㄲ', sound: 'kk',  example_kr: '까치', example_uz: "zag'izg'on", romanization: 'kkachi' },
        { char: 'ㄸ', sound: 'tt',  example_kr: '딸',   example_uz: 'qiz (farzand)', romanization: 'ttal' },
        { char: 'ㅃ', sound: 'pp',  example_kr: '빵',   example_uz: 'non',     romanization: 'ppang' },
        { char: 'ㅆ', sound: 'ss',  example_kr: '쌀',   example_uz: 'guruch',  romanization: 'ssal' },
        { char: 'ㅉ', sound: 'jj',  example_kr: '짜다', example_uz: "sho'r",   romanization: 'jjada' },
      ],
      consonants_aspirated: [
        { char: 'ㅋ', sound: 'kʰ',  example_kr: '코',   example_uz: 'burun',   romanization: 'ko' },
        { char: 'ㅌ', sound: 'tʰ',  example_kr: '토끼', example_uz: 'quyon',   romanization: 'tokki' },
        { char: 'ㅍ', sound: 'pʰ',  example_kr: '피',   example_uz: 'qon',     romanization: 'pi' },
        { char: 'ㅊ', sound: 'chʰ', example_kr: '차',   example_uz: 'mashina', romanization: 'cha' },
      ],
      syllable_examples: [
        { syllable: '가', breakdown: 'ㄱ+ㅏ', sound: 'ga' },
        { syllable: '나', breakdown: 'ㄴ+ㅏ', sound: 'na' },
        { syllable: '다', breakdown: 'ㄷ+ㅏ', sound: 'da' },
        { syllable: '마', breakdown: 'ㅁ+ㅏ', sound: 'ma' },
        { syllable: '바', breakdown: 'ㅂ+ㅏ', sound: 'ba' },
        { syllable: '한', breakdown: 'ㅎ+ㅏ+ㄴ', sound: 'han' },
        { syllable: '글', breakdown: 'ㄱ+ㅡ+ㄹ', sound: 'geul' },
      ],
      batchim_examples: [
        { word: '밥', sound: 'bap',  meaning: 'ovqat',  batchim: 'ㅂ→p' },
        { word: '집', sound: 'jip',  meaning: 'uy',     batchim: 'ㅂ→p' },
        { word: '책', sound: 'chaek',meaning: 'kitob',  batchim: 'ㄱ→k' },
        { word: '손', sound: 'son',  meaning: "qo'l",   batchim: 'ㄴ→n' },
        { word: '눈', sound: 'nun',  meaning: "ko'z",   batchim: 'ㄴ→n' },
      ],
    },

    games: {
      matchPairs: [
        { kr: 'ㅏ',   uz: 'a' },
        { kr: 'ㅣ',   uz: 'i' },
        { kr: 'ㄱ',   uz: 'k/g' },
        { kr: 'ㅎ',   uz: 'h' },
        { kr: '가방', uz: 'sumka' },
        { kr: '학교', uz: 'maktab' },
      ],
      fillBlank: [
        {
          sentence: '가방 = ㄱ+ㅏ / ___+ㅏ+ㅇ',
          answer: 'ㅂ',
          options: ['ㅂ', 'ㅅ', 'ㄷ', 'ㅁ'],
          uz: "gabang = sumka"
        },
        {
          sentence: '안녕하세요 — birinchi harf ___',
          answer: 'ㅇ',
          options: ['ㅇ', 'ㄱ', 'ㄴ', 'ㅎ'],
          uz: "Salom — birinchi harf ㅇ (so'z boshida o'qilmaydi)"
        },
        {
          sentence: '빵 (non) — kuchli undosh: ___',
          answer: 'ㅃ',
          options: ['ㅃ', 'ㅂ', 'ㅍ', 'ㅁ'],
          uz: "ppang = non — kuchli ㅃ"
        },
        {
          sentence: '한글에서 ㅇ boshida ___',
          answer: "o'qilmaydi",
          options: ["o'qilmaydi", "'ng' deb o'qiladi", "'m' deb o'qiladi", "'n' deb o'qiladi"],
          uz: "ㅇ so'z boshida o'qilmaydi"
        },
        {
          sentence: '밥의 마지막 받침 ㅂ은 ___로 발음',
          answer: 'p',
          options: ['p', 'b', 'm', 'n'],
          uz: "밥 (bap) — oxirgi ㅂ → p deb o'qiladi"
        },
      ],
      scramble: [
        { kr: '가방', uz: 'sumka' },
        { kr: '학교', uz: 'maktab' },
        { kr: '사람', uz: 'odam' },
        { kr: '친구', uz: "do'st" },
        { kr: '한국', uz: 'Koreya' },
      ],
    },
  };
}

// ────────────────────────────────────────────
// Quiz — ikkala track uchun bir xil
// ────────────────────────────────────────────
function buildAlphabetQuiz() {
  return [
    {
      question: "Hangul qachon yaratilgan?",
      options: ['1234-yil', '1443-yil', '1776-yil', '1945-yil'],
      correct_index: 1
    },
    {
      question: "'ㅏ' harfi qanday talaffuz qilinadi?",
      options: ['i', 'u', 'a', 'o'],
      correct_index: 2
    },
    {
      question: "ㅇ harfi so'z BOSHIDA qanday o'qiladi?",
      options: ["'ng' deb", "'m' deb", "o'qilmaydi", "'n' deb"],
      correct_index: 2
    },
    {
      question: "Kuchli undoshlar qaysi? (쌍자음)",
      options: ['ㅋ, ㅌ, ㅍ, ㅊ', 'ㄲ, ㄸ, ㅃ, ㅆ, ㅉ', 'ㄱ, ㄴ, ㄷ, ㄹ', 'ㅏ, ㅓ, ㅗ, ㅜ'],
      correct_index: 1
    },
    {
      question: "'가방 (gabang)' nimani anglatadi?",
      options: ['maktab', 'uy', 'sumka', 'daraxt'],
      correct_index: 2
    },
    {
      question: "'밥 (bap)' oxirgi ㅂ qanday o'qiladi?",
      options: ['b', 'p', 'm', 'n'],
      correct_index: 1
    },
    {
      question: "Koreys bo'g'in tuzilishi qanday?",
      options: [
        'Faqat unlilar',
        'Undosh + Unli (+ Undosh)',
        'Faqat undoshlar',
        'Alohida harflar'
      ],
      correct_index: 1
    },
  ];
}

// ────────────────────────────────────────────
// Ikki track uchun darslar
// ────────────────────────────────────────────
const LESSONS = [
  {
    track: 'TOPIK',
    level: 0,               // level 0 = kirish darsi
    order_in_level: 0,      // eng birinchi
    title_kr: '한글 배우기 — 한국어 첫걸음',
    title_uz: "Hangul o'rganish — Koreys tiliga birinchi qadam",
    is_free: true,
    content: {
      ...buildAlphabetContent(),
      track_note: 'TOPIK (O\'qish, tinglash, grammatika yo\'nalishi) uchun kirish darsi.',
      learning_path: [
        'Hangul alifbosini o\'rganish',
        'Bo\'g\'in tizimini tushunish',
        'Oddiy so\'zlarni o\'qish',
        'TOPIK 1-darajaga o\'tish'
      ]
    },
    quiz: buildAlphabetQuiz(),
  },
  {
    track: 'EPS-TOPIK',
    level: 0,
    order_in_level: 0,
    title_kr: '한글 배우기 — 취업 한국어 첫걸음',
    title_uz: "Hangul o'rganish — Ish uchun koreys tiliga birinchi qadam",
    is_free: true,
    content: {
      ...buildAlphabetContent(),
      track_note: 'EPS-TOPIK (Mehnat migratsiyasi) uchun kirish darsi. Ishchi koreys tilini o\'rganish yo\'li.',
      learning_path: [
        'Hangul alifbosini o\'rganish',
        'Ish va xavfsizlik so\'zlarini o\'qish',
        'Oddiy ko\'rsatma va belgilarni tushunish',
        'EPS-TOPIK 1-darajaga o\'tish'
      ]
    },
    quiz: buildAlphabetQuiz(),
  },
];

// ────────────────────────────────────────────
// DB ga saqlash
// ────────────────────────────────────────────
async function seed() {
  console.log('Hangul kirish darslari seed boshlandi...\n');
  console.log('Tracks: TOPIK va EPS-TOPIK\n');

  for (const lesson of LESSONS) {
    const { quiz, ...lessonData } = lesson;

    // 1. DB ga saqlash
    const { rows: [saved] } = await db.query(
      `INSERT INTO lessons (track, level, title_kr, title_uz, content, is_free)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT DO NOTHING
       RETURNING id`,
      [
        lessonData.track,
        lessonData.order_in_level,   // level = 0
        lessonData.title_kr,
        lessonData.title_uz,
        JSON.stringify(lessonData.content),
        lessonData.is_free,
      ]
    );

    if (!saved) {
      console.log(`  ⚠️  [${lessonData.track}] ${lessonData.title_kr} — allaqachon bor`);
      continue;
    }

    // 2. Audio URL'lar
    const audioUrls = buildAudioUrls(saved.id);
    await db.query(
      `UPDATE lessons SET audio_urls = $1 WHERE id = $2`,
      [JSON.stringify(audioUrls), saved.id]
    );

    // 3. Quiz
    for (const q of quiz) {
      await db.query(
        `INSERT INTO quiz_questions (lesson_id, question, options, correct_index)
         VALUES ($1, $2, $3, $4)`,
        [saved.id, q.question, JSON.stringify(q.options), q.correct_index]
      );
    }

    console.log(`  ✅  [${lessonData.track}] ${lessonData.title_kr} (ID: ${saved.id})`);
    console.log(`       Level: 0 (Kirish) | is_free: true | Audio: 37 ta key`);
  }

  console.log('\n✅ Hangul kirish darslari muvaffaqiyatli yakunlandi!');
  console.log('\n📌 Frontend-da qo\'llash:');
  console.log('   — LearningPath.jsx: level === 0 bo\'lsa "Kirish darsi" belgisi ko\'rsating');
  console.log('   — Lesson.jsx: content.alphabet_data bor bo\'lsa alifbo paneli ko\'rsating');
  console.log('\n📢 Keyingi qadam:');
  console.log('   node src/scripts/generate-audio.js --lesson-id <TOPIK_ID> --level intro');
  console.log('   node src/scripts/generate-audio.js --lesson-id <EPS_ID>   --level intro');

  await db.end();
}

seed().catch(err => {
  console.error('❌ Xatolik:', err.message);
  process.exit(1);
});
