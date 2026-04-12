// backend/src/seeds/eps_topik_level1.js
// EPS-TOPIK 1-daraja: 10 ta to'liq dars
// Manba: seed-topik-level1.js (yuklangan fayl) asosida
// Audio URL: {CDN_URL}/{lessonId}-{key}.mp3 — Edge TTS (ko-KR-SunHiNeural)
// PC / iOS / Android uchun to'liq ishlaydigan
// Usage: node src/seeds/eps_topik_level1.js

require('dotenv').config({ path: '../../.env' });
const db = require('../db');

// ────────────────────────────────────────────
// Audio URL builder — 37 ta key
// ────────────────────────────────────────────
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
  // DARS 1: O'zini tanishtirish | 자기소개
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 1, order_in_level: 1,
    title_kr: '자기소개 — 처음 만났을 때',
    title_uz: "O'zini tanishtirish — Birinchi uchrashuv",
    is_free: true,
    content: {
      topic: {
        kr: '안녕하세요? 저는 오이벡입니다. 저는 우즈베키스탄 사람입니다. 저는 공장에서 일합니다. 만나서 반갑습니다.',
        uz: "Assalomu alaykum? Men Oybekman. Men o'zbekistonlikman. Men zavodda ishlayman. Tanishganimdan xursandman."
      },
      grammar: {
        explanation: `입니다 / 입니까? — "...man" va "...misiz?"

입니다 = '...man / ...dir' — eng asosiy va hurmatli shakl.
입니까? = savol shakli.

📏 Qoida: Ot + 입니다 yoki Ot + 입니까?
• 저는 오이벡입니다. (Men Oybekman.)
• 직업이 무엇입니까? (Kasbingiz nima?)

은/는 — Mavzu ko'rsatkichi:
• Oxiri UNDOSH harf → 은 (예: 학생은)
• Oxiri UNLI harf → 는 (예: 저는)

💡 Eslab qolish: 저는 (men) — doim 는 bilan!`,
        examples: [
          { kr: '저는 오이벡입니다.',           uz: "Men Oybekman." },
          { kr: '저는 우즈베키스탄 사람입니다.', uz: "Men o'zbekistonlikman." },
          { kr: '어느 나라 사람입니까?',         uz: "Qaysi davlatdansiz?" },
          { kr: '직업이 무엇입니까?',            uz: "Kasbingiz nima?" },
          { kr: '만나서 반갑습니다.',            uz: "Tanishganimdan xursandman." },
        ]
      },
      vocabulary: [
        { kr: '저',          romanization: 'jeo',             uz: 'Men (hurmatli)' },
        { kr: '이름',        romanization: 'ireum',           uz: 'Ism' },
        { kr: '나라',        romanization: 'nara',            uz: 'Davlat / mamlakat' },
        { kr: '직업',        romanization: 'jigeop',          uz: 'Kasb' },
        { kr: '학생',        romanization: 'haksaeng',        uz: "Talaba / o'quvchi" },
        { kr: '선생님',      romanization: 'seonsaengnim',    uz: "O'qituvchi" },
        { kr: '회사원',      romanization: 'hoesawon',        uz: 'Ofis xodimi' },
        { kr: '의사',        romanization: 'uisa',            uz: 'Shifokor' },
        { kr: '한국',        romanization: 'hanguk',          uz: 'Koreya' },
        { kr: '우즈베키스탄',romanization: 'ujeubekiseutan',  uz: "O'zbekiston" },
        { kr: '안녕하세요',  romanization: 'annyeonghaseyo',  uz: 'Salom / Assalomu alaykum' },
        { kr: '반갑습니다',  romanization: 'bangapseumnida',  uz: 'Tanishganimdan xursandman' },
        { kr: '공장',        romanization: 'gongjang',        uz: 'Zavod, fabrika' },
        { kr: '일하다',      romanization: 'ilhada',          uz: 'Ishlash' },
        { kr: '근로자',      romanization: 'geulloja',        uz: 'Ishchi, xodim' },
        { kr: '외국인',      romanization: 'oegugin',         uz: 'Chet ellik' },
        { kr: '성함',        romanization: 'seongham',        uz: 'Ism-familiya (hurmatli)' },
        { kr: '출신',        romanization: 'chulsin',         uz: "Kelib chiqishi, yurti" },
        { kr: '처음',        romanization: 'cheoeum',         uz: 'Birinchi marta' },
        { kr: '잘 부탁합니다', romanization: 'jal butaghamnida', uz: 'Yaxshi munosabatda bo\'lishingizni so\'rayman' },
      ],
      examples: [
        { kr: '저는 오이벡이라고 합니다. 우즈베키스탄에서 왔습니다.', uz: "Mening ismim Oybek. O'zbekistondan keldim." },
        { kr: '저는 공장에서 일하는 근로자입니다.',                    uz: "Men zavodda ishlaydigan ishchiman." },
        { kr: '처음 뵙겠습니다. 잘 부탁합니다.',                       uz: "Birinchi marta ko'rishyapmiz. Yaxshi munosabatda bo'lishingizni so'rayman." },
        { kr: '제 이름은 마리암입니다. 어느 나라 사람이에요?',          uz: "Mening ismim Mariyam. Siz qaysi davlatdansiz?" },
        { kr: '저는 한국어를 공부하고 있습니다.',                       uz: "Men koreys tilini o'rganmoqdaman." },
      ],
      dialog: [
        { speaker: 'A', kr: '안녕하세요? 저는 김민준입니다.',                    uz: "Assalomu alaykum? Men Kim Minjunman." },
        { speaker: 'B', kr: '안녕하세요! 저는 오이벡이라고 합니다.',             uz: "Assalomu alaykum! Mening ismim Oybek." },
        { speaker: 'A', kr: '어느 나라에서 오셨어요?',                           uz: "Qaysi davlatdan keldingiz?" },
        { speaker: 'B', kr: '우즈베키스탄에서 왔습니다. 저는 이 공장에서 일해요.', uz: "O'zbekistondan keldim. Men bu zavodda ishlayman." },
        { speaker: 'A', kr: '반갑습니다! 직업이 무엇입니까?',                    uz: "Xursandman! Kasbingiz nima?" },
        { speaker: 'B', kr: '저는 생산직 근로자입니다. 잘 부탁합니다!',           uz: "Men ishlab chiqarish xodimiman. Yaxshi munosabatda bo'lishingizni so'rayman!" },
      ],
      notes: [
        "입니다 — rasmiy shakl: ish joyida doim shu shakl qo'llanadi.",
        "은/는 — mavzu: 저는(men), 이름은(ism), 직업은(kasb).",
        "공장 (zavod) — EPS-TOPIK da eng ko'p ishlatiladigan so'zlardan biri.",
        "잘 부탁합니다 — yangi ish joyida birinchi kuni albatta aytiladi.",
        "처음 뵙겠습니다 — 뵙다 = 보다 ning juda hurmatli shakli: birinchi uchrashuvda.",
      ],
      games: {
        matchPairs: [
          { kr: '직업',   uz: 'kasb' },
          { kr: '공장',   uz: 'zavod' },
          { kr: '근로자', uz: 'ishchi' },
          { kr: '처음',   uz: 'birinchi marta' },
          { kr: '출신',   uz: 'kelib chiqishi' },
          { kr: '외국인', uz: 'chet ellik' },
        ],
        fillBlank: [
          { sentence: '저는 오이벡___.', answer: '입니다', options: ['입니다','있어요','해요','가요'], uz: "Men Oybekman." },
          { sentence: '어느 나라 사람___?', answer: '입니까', options: ['입니까','예요','있어요','해요'], uz: "Qaysi davlatdansiz?" },
          { sentence: '저___우즈베키스탄 사람입니다.', answer: '는', options: ['는','은','이','가'], uz: "Men o'zbekistonlikman." },
          { sentence: '공장에서 일하는 ___ 입니다.', answer: '근로자', options: ['근로자','학생','의사','선생님'], uz: "Zavodda ishlaydigan ishchiman." },
          { sentence: '처음 뵙겠습니다. 잘 ___.', answer: '부탁합니다', options: ['부탁합니다','감사합니다','죄송합니다','반갑습니다'], uz: "Yaxshi munosabatda bo'lishingizni so'rayman." },
        ],
        scramble: [
          { kr: '직업',   uz: 'kasb' },
          { kr: '공장',   uz: 'zavod' },
          { kr: '이름',   uz: 'ism' },
          { kr: '한국',   uz: 'Koreya' },
          { kr: '근로자', uz: 'ishchi' },
        ],
      },
    },
    quiz: [
      { question: "'학생 (haksaeng)' nima degani?",           options: ['Shifokor','Talaba / o\'quvchi','Ishchi','O\'qituvchi'],    correct_index: 1 },
      { question: "'어느 나라 사람입니까?' nimani anglatadi?", options: ['Ismingiz nima?','Qayerda yashaysiz?','Qaysi davlatdansiz?','Kasbingiz nima?'], correct_index: 2 },
      { question: "'저는 오이벡_____' — Bo'sh joyga nima?",   options: ['이에요','입니다','있어요','했어요'],                        correct_index: 1 },
      { question: "'저는' — Nega '는' ishlatiladi?",           options: ['저 unli bilan tugaydi','저 undosh bilan tugaydi','Ixtiyoriy','Bu xato'], correct_index: 0 },
      { question: "'반갑습니다' nimani anglatadi?",             options: ['Salom','Tanishganimdan xursandman','Rahmat','Ko\'rishguncha'], correct_index: 1 },
      { question: "'공장' nimani anglatadi?",                  options: ['Ofis','Maktab','Zavod, fabrika','Kasalxona'],               correct_index: 2 },
      { question: "'잘 부탁합니다' qachon aytiladi?",           options: ['Xayrlashganda','Yangi ish joyida birinchi kuni','Rahmat aytganda','Kechirim so\'raganda'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 2: Oila | 가족
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 1, order_in_level: 2,
    title_kr: '가족 소개',
    title_uz: "Oilani tanishtirish",
    is_free: true,
    content: {
      topic: {
        kr: '저는 가족이 있습니다. 아버지, 어머니, 형, 그리고 저입니다. 우리 가족은 4명입니다. 저는 가족과 함께 삽니다. 한국에서 일하면서 가족에게 돈을 보냅니다.',
        uz: "Mening oilam bor. Ota, ona, aka va men. Bizning oilamiz 4 kishidan iborat. Men oilam bilan birga yashayman. Koreyada ishlay turib, oilaga pul jo'nataman."
      },
      grammar: {
        explanation: `이/가 있어요 / 없어요 — "bor" va "yo'q"

🟢 있어요 = BOR (mavjud)
🔴 없어요 = YO'Q (mavjud emas)

📏 Qoida:
• Oxiri UNDOSH → 이 있어요/없어요
• Oxiri UNLI   → 가 있어요/없어요

💡 Misol: 형이 있어요 | 친구가 있어요

와 / 과 / 하고 — "bilan / va":
• 와  = UNLI tugasa (아버지와)
• 과  = UNDOSH tugasa (가족과)
• 하고 = DOIM ishlaydi — eng oson! ⭐`,
        examples: [
          { kr: '저는 형이 있어요.',          uz: "Mening akam bor." },
          { kr: '저는 여동생이 없어요.',       uz: "Mening singlim yo'q." },
          { kr: '가족과 같이 살아요.',         uz: "Oilam bilan birga yashayman." },
          { kr: '아버지와 어머니가 있어요.',   uz: "Otam va onam bor." },
          { kr: '동생하고 연락해요.',          uz: "Uka/singil bilan aloqada bo'laman." },
        ]
      },
      vocabulary: [
        { kr: '가족',     romanization: 'gajok',        uz: 'Oila' },
        { kr: '아버지',   romanization: 'abeoji',       uz: 'Ota' },
        { kr: '어머니',   romanization: 'eomeoni',      uz: 'Ona' },
        { kr: '형',       romanization: 'hyeong',       uz: 'Aka (erkak aytadi)' },
        { kr: '누나',     romanization: 'nuna',         uz: 'Opa (erkak aytadi)' },
        { kr: '오빠',     romanization: 'oppa',         uz: 'Aka (qiz aytadi)' },
        { kr: '언니',     romanization: 'eonni',        uz: 'Opa (qiz aytadi)' },
        { kr: '남동생',   romanization: 'namdongsaeng', uz: 'Uka' },
        { kr: '여동생',   romanization: 'yeodongsaeng', uz: 'Singil' },
        { kr: '부모님',   romanization: 'bumonim',      uz: 'Ota-ona (hurmatli)' },
        { kr: '할아버지', romanization: 'harabeoji',    uz: 'Bobo' },
        { kr: '할머니',   romanization: 'halmeoni',     uz: 'Buvi' },
        { kr: '아내',     romanization: 'anae',         uz: 'Xotin' },
        { kr: '남편',     romanization: 'nampyeon',     uz: 'Er' },
        { kr: '아이',     romanization: 'ai',           uz: 'Bola' },
        { kr: '같이',     romanization: 'gachi',        uz: 'Birga' },
        { kr: '보내다',   romanization: 'bonaeda',      uz: "Jo'natmoq, yubormoq" },
        { kr: '연락하다', romanization: 'yeollakada',   uz: 'Aloqada bo\'lmoq' },
        { kr: '그리워하다',romanization: 'geuriowohada', uz: 'Sog\'inmoq' },
        { kr: '명',       romanization: 'myeong',       uz: 'Kishi (sanoq)' },
      ],
      examples: [
        { kr: '우리 가족은 4명입니다. 아버지, 어머니, 남동생, 저예요.', uz: "Bizning oilamiz 4 kishi. Ota, ona, uka va men." },
        { kr: '저는 한국에서 일하면서 가족에게 돈을 보냅니다.',         uz: "Men Koreyada ishlay turib, oilaga pul jo'nataman." },
        { kr: '저는 한 달에 한 번 가족과 영상통화를 해요.',             uz: "Men oyda bir marta oilam bilan video qo'ng'iroq qilaman." },
        { kr: '가족이 보고 싶어요. 어머니가 많이 그리워요.',            uz: "Oilam ko'rmoqchiman. Onamni juda sog'inaman." },
        { kr: '저는 아내와 아이 둘이 있어요.',                         uz: "Mening xotinim va ikki bolam bor." },
      ],
      dialog: [
        { speaker: 'A', kr: '가족이 몇 명이에요?',                           uz: "Oilangizda necha kishi bor?" },
        { speaker: 'B', kr: '우리 가족은 4명입니다. 부모님과 남동생이 있어요.', uz: "Bizning oilamiz 4 kishi. Ota-onam va ukam bor." },
        { speaker: 'A', kr: '가족이 한국에 같이 있어요?',                    uz: "Oilangiz Koreyada birga bormi?" },
        { speaker: 'B', kr: '아니요, 가족은 우즈베키스탄에 있어요. 저 혼자 왔어요.', uz: "Yo'q, oilam O'zbekistonda. Men yolg'iz keldim." },
        { speaker: 'A', kr: '가족이 보고 싶겠네요.',                         uz: "Oilangizni sog'inayotgan bo'lsangiz kerak." },
        { speaker: 'B', kr: '네, 그래서 매달 돈을 보내고 영상통화를 해요.',   uz: "Ha, shuning uchun har oy pul jo'nataman va video qo'ng'iroq qilaman." },
      ],
      notes: [
        "있어요/없어요 — EPS-TOPIK da eng asosiy fe'llar: 가족이 있어요(oilam bor).",
        "형/오빠 — erkak 형; qiz 오빠 deydi: bir xil ma'no, lekin gapiruvchi jinsiga qarab.",
        "명 — kishi sanoq birlig'i: 4명(4 kishi), 몇 명?(necha kishi?).",
        "한국에서 일하면서 — ishlash jarayonida; mehnat migratsiyasida keng ibora.",
        "영상통화 — video qo'ng'iroq: Koreyada ishlaydigan chet elliklar uchun juda muhim.",
      ],
      games: {
        matchPairs: [
          { kr: '아버지',   uz: 'ota' },
          { kr: '어머니',   uz: 'ona' },
          { kr: '형',       uz: 'aka (erkak aytadi)' },
          { kr: '남동생',   uz: 'uka' },
          { kr: '할아버지', uz: 'bobo' },
          { kr: '보내다',   uz: "jo'natmoq" },
        ],
        fillBlank: [
          { sentence: '저는 형이 ___.',              answer: '있어요', options: ['있어요','없어요','해요','가요'],   uz: "Mening akam bor." },
          { sentence: '가족과 ___ 살아요.',           answer: '같이',  options: ['같이','혼자','빨리','많이'],      uz: "Oilam bilan birga yashayman." },
          { sentence: '아버지___ 어머니',             answer: '와',    options: ['와','과','하고','이'],           uz: "Ota va ona." },
          { sentence: '우리 가족은 4 ___ 입니다.',    answer: '명',    options: ['명','개','마리','권'],           uz: "Bizning oilamiz 4 kishi." },
          { sentence: '가족에게 돈을 ___ 보내요.',     answer: '매달', options: ['매달','매주','매년','매시간'],    uz: "Har oy oilaga pul jo'nataman." },
        ],
        scramble: [
          { kr: '가족',   uz: 'oila' },
          { kr: '아버지', uz: 'ota' },
          { kr: '어머니', uz: 'ona' },
          { kr: '아내',   uz: 'xotin' },
          { kr: '보내다', uz: "jo'natmoq" },
        ],
      },
    },
    quiz: [
      { question: "'어머니 (eomeoni)' kim?",              options: ['Ota','Ona','Opa','Buvi'],                              correct_index: 1 },
      { question: "'오빠 (oppa)' kim aytadi?",            options: ['Erkak (aka)','Qiz (aka)','Qiz (opa)','Erkak (opa)'], correct_index: 1 },
      { question: "'저는 형이 있어요' nimani anglatadi?", options: ['Singlim yo\'q','Akam bor','Opam bor','Ukam yo\'q'],  correct_index: 1 },
      { question: "'아버지___어머니' — qaysi so'z?",      options: ['하고','와','과','에'],                                 correct_index: 1 },
      { question: "'부모님' nima degani?",                options: ['Aka-uka','Ota-ona','Opa-singil','Bobo-buvi'],         correct_index: 1 },
      { question: "'명' nima uchun ishlatiladi?",         options: ['Narsa sanoq','Kishi sanoq','Vaqt sanoq','Masofa'],   correct_index: 1 },
      { question: "'영상통화' nimani anglatadi?",          options: ['Telefon qo\'ng\'iroq','SMS','Video qo\'ng\'iroq','Email'], correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 3: Vaqt va sana | 시간과 날짜
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 1, order_in_level: 3,
    title_kr: '시간과 날짜 — 작업 일정',
    title_uz: "Vaqt va sana — Ish jadvali",
    is_free: false,
    content: {
      topic: {
        kr: '저는 아침 8시에 출근합니다. 오후 5시에 퇴근합니다. 오늘은 화요일입니다. 이번 주에 야근이 있습니다. 공장은 주 6일 일합니다.',
        uz: "Men ertalab soat 8 da ishga boraman. Tushdan keyin soat 5 da ishdan qaytaman. Bugun seshanba. Bu haftada qo'shimcha ish bor. Zavod haftada 6 kun ishlaydi."
      },
      grammar: {
        explanation: `에 — vaqt/joy ko'rsatkichi

• Vaqtda: 8시에 출근해요. (Soat 8 da ishga boraman.)
• Joyda (borish): 공장에 가요. (Zavodga boraman.)

에서 — harakat joyi:
• 공장에서 일해요. (Zavodda ishlayman.) — harakat!

-았/었어요 — o'tgan zamon:
• 가다 → 갔어요 (bordim)
• 먹다 → 먹었어요 (yedim)
• 일하다 → 일했어요 (ishladim)

💡 Ish joyida ko'p ishlatiladigan vaqt iboralari:
• 아침 교대 (ertalab smenasi)
• 저녁 교대 (kechki smenasi)
• 야근 (tungi/qo'shimcha ish)`,
        examples: [
          { kr: '저는 아침 8시에 출근합니다.',      uz: "Men ertalab soat 8 da ishga boraman." },
          { kr: '공장에서 하루 8시간 일해요.',      uz: "Zavodda kuniga 8 soat ishlayman." },
          { kr: '어제 야근을 했어요.',              uz: "Kecha qo'shimcha ish qildim." },
          { kr: '이번 주 화요일에 휴일이 있어요.',  uz: "Bu hafta seshanba kuni dam olish bor." },
          { kr: '다음 달에 월급을 받아요.',         uz: "Kelgusi oy maosh olaman." },
        ]
      },
      vocabulary: [
        { kr: '시간',   romanization: 'sigan',        uz: 'Vaqt / soat' },
        { kr: '날짜',   romanization: 'nalja',        uz: 'Sana' },
        { kr: '오늘',   romanization: 'oneul',        uz: 'Bugun' },
        { kr: '어제',   romanization: 'eoje',         uz: 'Kecha' },
        { kr: '내일',   romanization: 'naeil',        uz: 'Ertaga' },
        { kr: '이번 주',romanization: 'ibeonju',      uz: 'Bu hafta' },
        { kr: '월요일', romanization: 'woryoil',      uz: 'Dushanba' },
        { kr: '화요일', romanization: 'hwayoil',      uz: 'Seshanba' },
        { kr: '수요일', romanization: 'suyoil',       uz: 'Chorshanba' },
        { kr: '목요일', romanization: 'mogyoil',      uz: 'Payshanba' },
        { kr: '금요일', romanization: 'geumyoil',     uz: 'Juma' },
        { kr: '토요일', romanization: 'toyoil',       uz: 'Shanba' },
        { kr: '일요일', romanization: 'iryoil',       uz: 'Yakshanba' },
        { kr: '출근',   romanization: 'chulgeun',     uz: 'Ishga borish' },
        { kr: '퇴근',   romanization: 'toegeun',      uz: 'Ishdan qaytish' },
        { kr: '야근',   romanization: 'yageun',       uz: "Qo'shimcha/tungi ish" },
        { kr: '교대',   romanization: 'gyodae',       uz: 'Smenasi' },
        { kr: '월급',   romanization: 'wolgeup',      uz: 'Maosh, oylik' },
        { kr: '휴일',   romanization: 'hyuil',        uz: 'Dam olish kuni' },
        { kr: '주말',   romanization: 'jumal',        uz: 'Hafta oxiri' },
      ],
      examples: [
        { kr: '저는 아침 교대라서 새벽 6시에 일어나요.',  uz: "Men ertalab smenasida bo'lgani uchun tong 6 da turaman." },
        { kr: '이번 주에 야근이 3번 있어요.',             uz: "Bu haftada 3 marta qo'shimcha ish bor." },
        { kr: '월급날은 매달 25일이에요.',                uz: "Maosh kuni har oyning 25-si." },
        { kr: '오늘은 휴일이라서 공장에 가지 않아요.',    uz: "Bugun dam olish kuni bo'lgani uchun zavodga bormayman." },
        { kr: '어제 야근을 했어서 많이 피곤해요.',        uz: "Kecha qo'shimcha ish qilgani uchun juda charchadim." },
      ],
      dialog: [
        { speaker: 'A', kr: '몇 시에 출근해요?',                       uz: "Necha da ishga borasiz?" },
        { speaker: 'B', kr: '저는 아침 교대라서 8시에 출근해요.',       uz: "Men ertalab smenasida bo'lgani uchun soat 8 da ishga boraman." },
        { speaker: 'A', kr: '오늘 야근 있어요?',                       uz: "Bugun qo'shimcha ish bormi?" },
        { speaker: 'B', kr: '네, 오늘 저녁 10시까지 야근이 있어요.',    uz: "Ha, bugun kechki soat 10 gacha qo'shimcha ish bor." },
        { speaker: 'A', kr: '힘들겠네요. 이번 주에 휴일이 있어요?',    uz: "Og'ir bo'lsa kerak. Bu haftada dam olish kuni bormi?" },
        { speaker: 'B', kr: '일요일 하루 쉬어요. 그날 푹 쉴 거예요.', uz: "Yakshanbada bir kun dam olaman. O'sha kuni yaxshilab dam olaman." },
      ],
      notes: [
        "에 — vaqt: 8시에(soat 8 da), 화요일에(seshanba kuni), 내일에(ertaga).",
        "에서 — harakat joyi: 공장에서(zavodda), 식당에서(restorantda).",
        "야근 (qo'shimcha ish) — EPS-TOPIK imtihonida juda ko'p chiqadi: 야근 있어요?(qo'shimcha ish bormi?)",
        "교대 — smena tizimi: 아침 교대(ertalab), 저녁 교대(kechki), 야간 교대(tungi).",
        "월급날 — maosh kuni: 한국에서는 보통 매달 25일 (odatda har oyning 25-si).",
      ],
      games: {
        matchPairs: [
          { kr: '출근',   uz: 'ishga borish' },
          { kr: '퇴근',   uz: 'ishdan qaytish' },
          { kr: '야근',   uz: "qo'shimcha ish" },
          { kr: '월급',   uz: 'maosh' },
          { kr: '휴일',   uz: 'dam olish kuni' },
          { kr: '교대',   uz: 'smena' },
        ],
        fillBlank: [
          { sentence: '저는 아침 8시___ 출근합니다.',   answer: '에',    options: ['에','에서','를','이'],   uz: "Men soat 8 da ishga boraman." },
          { sentence: '공장___ 하루 8시간 일해요.',     answer: '에서',  options: ['에서','에','를','이'],   uz: "Zavodda kuniga 8 soat ishlayman." },
          { sentence: '어제 야근을 ___ 어요.',          answer: '했',    options: ['했','가','봤','먹었'],  uz: "Kecha qo'shimcha ish qildim." },
          { sentence: '화요일 (hwayoil) qaysi kun?',   answer: 'Seshanba', options: ['Seshanba','Dushanba','Chorshanba','Juma'], uz: "Seshanba." },
          { sentence: '월급날은 매달 ___일이에요.',      answer: '25',    options: ['25','1','10','30'],     uz: "Maosh kuni har oyning 25-si." },
        ],
        scramble: [
          { kr: '시간',   uz: 'vaqt' },
          { kr: '출근',   uz: 'ishga borish' },
          { kr: '야근',   uz: "qo'shimcha ish" },
          { kr: '월급',   uz: 'maosh' },
          { kr: '교대',   uz: 'smena' },
        ],
      },
    },
    quiz: [
      { question: "'화요일 (hwayoil)' qaysi kun?",      options: ['Dushanba','Seshanba','Shanba','Juma'],                     correct_index: 1 },
      { question: "'에' va '에서' farqi?",               options: ['Farqi yo\'q','에=vaqt/borish; 에서=harakat joyi','에서=borish; 에=harakat','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'갔어요' qaysi ma'no?",              options: ['Boraman','Bordim','Bormayman','Borar edim'],               correct_index: 1 },
      { question: "'야근' nimani anglatadi?",            options: ['Dam olish','Ertalab smena',"Qo'shimcha/tungi ish",'Maosh'], correct_index: 2 },
      { question: "'출근하다' nima degani?",             options: ['Ishdan qaytmoq','Ishga bormoq','Dam olmoq','Tushlik qilmoq'], correct_index: 1 },
      { question: "'월급' nimani anglatadi?",            options: ['Dam olish kuni','Hafta oxiri','Maosh, oylik','Smena'],     correct_index: 2 },
      { question: "'내일 (naeil)' nima degani?",         options: ['Kecha','Bugun','Ertaga','Hafta'],                         correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 4: Joy va joylashuv | 장소와 위치
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 1, order_in_level: 4,
    title_kr: '장소와 위치 — 공장 안에서',
    title_uz: "Joy va joylashuv — Zavod ichida",
    is_free: false,
    content: {
      topic: {
        kr: '공장 안에 여러 장소가 있습니다. 사무실은 1층에 있습니다. 탈의실은 2층에 있습니다. 식당은 지하 1층에 있습니다. 화장실은 어디에 있어요?',
        uz: "Zavod ichida bir necha joy bor. Ofis 1-qavatda joylashgan. Kiyinish xonasi 2-qavatda. Oshxona yer osti 1-qavatida. Hojatxona qayerda?"
      },
      grammar: {
        explanation: `있어요 + 위치 표현 — Joy + "qayerda"

위치 표현 (joylashuv ifodalari):
• 위 (uyi)  = ustida
• 아래 (arae) = ostida
• 앞 (ap)   = oldida
• 뒤 (dwi)  = orqasida
• 옆 (yeop) = yonida
• 안 (an)   = ichida
• 밖 (bak)  = tashqarida

Qoida: [joy] + 에 + [narsa] + 이/가 + 있어요
• 1층에 사무실이 있어요. (1-qavatda ofis bor.)
• 문 앞에 안전모가 있어요. (Eshik oldida xavfsizlik dubulg'asi bor.)

에 vs 에서:
• 식당에 가요.    (Oshxonaga boraman — borish)
• 식당에서 먹어요. (Oshxonada yeyman — harakat)`,
        examples: [
          { kr: '화장실이 어디에 있어요?',      uz: "Hojatxona qayerda?" },
          { kr: '사무실은 1층에 있어요.',        uz: "Ofis 1-qavatda." },
          { kr: '안전모는 문 옆에 있어요.',      uz: "Xavfsizlik dubulg'asi eshik yonida." },
          { kr: '소화기는 기계 뒤에 있어요.',    uz: "O't o'chiruvchi mashina orqasida." },
          { kr: '탈의실은 2층에 있어요.',        uz: "Kiyinish xonasi 2-qavatda." },
        ]
      },
      vocabulary: [
        { kr: '장소',   romanization: 'jangso',       uz: 'Joy' },
        { kr: '위치',   romanization: 'wichi',        uz: 'Joylashuv' },
        { kr: '사무실', romanization: 'samusil',      uz: 'Ofis' },
        { kr: '식당',   romanization: 'sikdang',      uz: 'Oshxona, kafe' },
        { kr: '화장실', romanization: 'hwajangsil',   uz: 'Hojatxona, tualet' },
        { kr: '탈의실', romanization: 'taleuisil',    uz: 'Kiyinish xonasi' },
        { kr: '창고',   romanization: 'changgo',      uz: 'Ombor' },
        { kr: '주차장', romanization: 'juchajang',    uz: 'Avtoturar joy' },
        { kr: '입구',   romanization: 'ipgu',         uz: 'Kirish' },
        { kr: '출구',   romanization: 'chulgu',       uz: 'Chiqish' },
        { kr: '층',     romanization: 'cheung',       uz: 'Qavat' },
        { kr: '엘리베이터', romanization: 'elribeito', uz: 'Lift' },
        { kr: '계단',   romanization: 'gyedan',       uz: "Zina, pillapoya" },
        { kr: '안전모', romanization: 'anjeonmo',     uz: "Xavfsizlik dubulg'asi" },
        { kr: '소화기', romanization: 'sohwagi',      uz: "O't o'chiruvchi" },
        { kr: '비상구', romanization: 'bisanggu',     uz: 'Favqulodda chiqish' },
        { kr: '휴게실', romanization: 'hyugesil',     uz: 'Dam olish xonasi' },
        { kr: '기계',   romanization: 'gigye',        uz: 'Mashina, mexanizm' },
        { kr: '어디',   romanization: 'eodi',         uz: 'Qayerda' },
        { kr: '여기',   romanization: 'yeogi',        uz: 'Bu yerda' },
      ],
      examples: [
        { kr: '비상구는 공장 끝에 있어요. 꼭 확인하세요.',         uz: "Favqulodda chiqish zavod oxirida. Albatta tekshiring." },
        { kr: '식당은 지하 1층에 있어요. 엘리베이터로 내려가세요.', uz: "Oshxona yer osti 1-qavatida. Lift bilan tushing." },
        { kr: '안전모와 장갑은 탈의실 옆에 있어요.',               uz: "Xavfsizlik dubulg'asi va qo'lqop kiyinish xonasi yonida." },
        { kr: '소화기는 어디에 있어요? 문 옆에 있어요.',            uz: "O't o'chiruvchi qayerda? Eshik yonida." },
        { kr: '휴게실에서 점심을 먹어요.',                         uz: "Dam olish xonasida tushlik qilaman." },
      ],
      dialog: [
        { speaker: 'A', kr: '실례합니다. 화장실이 어디에 있어요?',        uz: "Kechirasiz. Hojatxona qayerda?" },
        { speaker: 'B', kr: '화장실은 저쪽 복도 끝에 있어요.',            uz: "Hojatxona u tomondagi yo'lak oxirida." },
        { speaker: 'A', kr: '감사합니다. 그리고 식당은요?',               uz: "Rahmat. Va oshxona-chi?" },
        { speaker: 'B', kr: '식당은 지하 1층에 있어요. 저 계단으로 내려가세요.', uz: "Oshxona yer osti 1-qavatida. O'sha zinadan tushing." },
        { speaker: 'A', kr: '비상구는 어디 있어요?',                      uz: "Favqulodda chiqish qayerda?" },
        { speaker: 'B', kr: '비상구는 공장 왼쪽과 오른쪽에 있어요. 꼭 기억하세요!', uz: "Favqulodda chiqish zavod chap va o'ng tomonida. Albatta eslab qoling!" },
      ],
      notes: [
        "위치 표현: 위(ustida), 아래(ostida), 앞(oldida), 뒤(orqasida), 옆(yonida), 안(ichida).",
        "에 vs 에서: 식당에 가요(borish) vs 식당에서 먹어요(harakat).",
        "비상구 (favqulodda chiqish) — xavfsizlik uchun eng muhim: 항상 확인! (doim tekshiring!)",
        "층 — qavat: 1층(1-qavat), 2층(2-qavat), 지하 1층(yer osti 1-qavat).",
        "EPS-TOPIK imtihonida joy so'rash va ko'rsatish savollari ko'p chiqadi.",
      ],
      games: {
        matchPairs: [
          { kr: '사무실', uz: 'ofis' },
          { kr: '식당',   uz: 'oshxona' },
          { kr: '화장실', uz: 'hojatxona' },
          { kr: '비상구', uz: 'favqulodda chiqish' },
          { kr: '안전모', uz: "xavfsizlik dubulg'asi" },
          { kr: '창고',   uz: 'ombor' },
        ],
        fillBlank: [
          { sentence: '사무실은 1층___ 있어요.',        answer: '에',    options: ['에','에서','를','이'],       uz: "Ofis 1-qavatda." },
          { sentence: '식당___ 점심을 먹어요.',         answer: '에서',  options: ['에서','에','를','이'],       uz: "Oshxonada tushlik qilaman." },
          { sentence: '화장실이 ___ 있어요?',           answer: '어디에',options: ['어디에','무엇이','누가','언제'],uz: "Hojatxona qayerda?" },
          { sentence: '안전모는 문 ___ 에 있어요.',     answer: '옆',    options: ['옆','위','아래','앞'],       uz: "Xavfsizlik dubulg'asi eshik yonida." },
          { sentence: '비상구는 공장 ___ 에 있어요.',   answer: '끝',    options: ['끝','앞','뒤','안'],         uz: "Favqulodda chiqish zavod oxirida." },
        ],
        scramble: [
          { kr: '사무실', uz: 'ofis' },
          { kr: '식당',   uz: 'oshxona' },
          { kr: '입구',   uz: 'kirish' },
          { kr: '출구',   uz: 'chiqish' },
          { kr: '계단',   uz: "zina" },
        ],
      },
    },
    quiz: [
      { question: "'도서관 (doseogwan)' nima?",            options: ['Kasalxona','Kutubxona','Restoran','Bank'],          correct_index: 1 },
      { question: "'에' va '에서' farqi — to'g'ri javob?", options: ['Farqi yo\'q','에=joy/borish; 에서=harakat','에서=borish; 에=harakat','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'화장실이 어디에 있어요?' tarjimasi?",  options: ['Hojatxona katta','Hojatxona qayerda?','Hojatxona bor','Hojatxona yo\'q'], correct_index: 1 },
      { question: "'비상구' nima?",                        options: ['Kirish','Chiqish','Favqulodda chiqish','Lift'],     correct_index: 2 },
      { question: "'문 옆에' nimani anglatadi?",            options: ['Eshik ustida','Eshik ostida','Eshik yonida','Eshik oldida'], correct_index: 2 },
      { question: "'탈의실' nimani anglatadi?",             options: ['Ofis','Oshxona','Kiyinish xonasi','Ombor'],        correct_index: 2 },
      { question: "'여기' nima degani?",                   options: ['U yerda','Bu yerda','Qayerda','Anavi yerda'],      correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 5: Ovqat | 음식 — Zavod oshxonasida
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 1, order_in_level: 5,
    title_kr: '음식 — 구내식당에서',
    title_uz: "Ovqat — Zavod oshxonasida",
    is_free: false,
    content: {
      topic: {
        kr: '저는 점심시간에 구내식당에서 밥을 먹습니다. 오늘 메뉴는 김치찌개와 밥입니다. 식판에 받아서 먹습니다. 한국 음식은 매운 것이 많아요. 저는 매운 음식을 좋아해요.',
        uz: "Men tushlik vaqtida zavod oshxonasida ovqat yeyman. Bugungi menyu kimchi sho'rva va guruch. Likopchaga olib yeyman. Koreys taomlarida achchiq narsalar ko'p. Men achchiq taomlarni yoqtiraman."
      },
      grammar: {
        explanation: `을 / 를 — To'ldiruvchi "nimani?"

📏 Qoida:
• Oxiri UNDOSH → 을 (밥을 먹어요)
• Oxiri UNLI   → 를 (커피를 마셔요)

좋아해요 / 싫어해요 / -고 싶어요:
❤️ 좋아해요 = yoqtiraman
💔 싫어해요 = yoqtirmayman
✨ -고 싶어요 = ...moqchiman / xohlayman

💡 Qolip: ___를 먹고 싶어요 = ___yemoqchiman

Restoran/oshxonada muhim iboralar:
• 이거 주세요. (Buni bering.)
• 얼마예요? (Qancha?)
• 맛있어요! (Mazali!)`,
        examples: [
          { kr: '밥을 먹어요.',              uz: "Ovqat yeyman." },
          { kr: '물을 마셔요.',              uz: "Suv ichaman." },
          { kr: '김치를 좋아해요.',          uz: "Kimchini yoqtiraman." },
          { kr: '비빔밥을 먹고 싶어요.',     uz: "Bibimbap yemoqchiman." },
          { kr: '이 음식은 너무 매워요.',    uz: "Bu ovqat juda achchiq." },
        ]
      },
      vocabulary: [
        { kr: '밥',       romanization: 'bap',       uz: 'Guruch / ovqat' },
        { kr: '김치',     romanization: 'gimchi',    uz: 'Kimchi (achchiq sabzi)' },
        { kr: '비빔밥',   romanization: 'bibimbap',  uz: 'Bibimbap (aralash guruch)' },
        { kr: '불고기',   romanization: 'bulgogi',   uz: "Bulgogi (qovurilgan go'sht)" },
        { kr: '라면',     romanization: 'ramyeon',   uz: 'Ramen (qaynatma)' },
        { kr: '물',       romanization: 'mul',       uz: 'Suv' },
        { kr: '커피',     romanization: 'keopi',     uz: 'Qahva' },
        { kr: '먹다',     romanization: 'meokda',    uz: 'Yemoq' },
        { kr: '마시다',   romanization: 'masida',    uz: 'Ichmoq' },
        { kr: '맛있다',   romanization: 'masitda',   uz: 'Mazali' },
        { kr: '맵다',     romanization: 'maepda',    uz: 'Achchiq' },
        { kr: '구내식당', romanization: 'gunaesikdang', uz: 'Zavod/korporativ oshxona' },
        { kr: '점심',     romanization: 'jeomsim',   uz: 'Tushlik' },
        { kr: '식판',     romanization: 'sikpan',    uz: 'Ovqat lkopchasi (podnosda)' },
        { kr: '메뉴',     romanization: 'menyu',     uz: 'Menyu' },
        { kr: '반찬',     romanization: 'banchan',   uz: "Yonaki ovqat (qo'shimcha taomlar)" },
        { kr: '국',       romanization: 'guk',       uz: "Sho'rva" },
        { kr: '찌개',     romanization: 'jjigae',    uz: "Qalin sho'rva" },
        { kr: '짜다',     romanization: 'jjada',     uz: "Sho'r" },
        { kr: '달다',     romanization: 'dalda',     uz: 'Shirin' },
      ],
      examples: [
        { kr: '구내식당에서 점심을 먹어요. 오늘은 된장찌개예요.',     uz: "Zavod oshxonasida tushlik yeyman. Bugun soya pasta sho'rvasi." },
        { kr: '한국 음식이 매운 것도 있지만 맛있어요.',               uz: "Koreys taomlarida achchiq narsalar ham bor, lekin mazali." },
        { kr: '저는 라면을 좋아해요. 그런데 자주 먹으면 안 좋아요.', uz: "Men ramenni yoqtiraman. Lekin tez-tez yesang yaxshi emas." },
        { kr: '물을 많이 마셔야 해요. 공장은 덥거든요.',              uz: "Ko'p suv ichish kerak. Zavod issiq-da." },
        { kr: '점심 메뉴가 뭐예요? 오늘은 불고기하고 밥이에요.',      uz: "Tushlik menyusi nima? Bugun bulgogi va guruch." },
      ],
      dialog: [
        { speaker: 'A', kr: '오늘 점심 뭐 먹을 거예요?',                  uz: "Bugun tushlikda nima yeyasiz?" },
        { speaker: 'B', kr: '구내식당에서 먹을 거예요. 오늘 메뉴가 뭐예요?', uz: "Zavod oshxonasida yeyaman. Bugungi menyu nima?" },
        { speaker: 'A', kr: '김치찌개하고 밥이에요. 매운 거 좋아해요?',    uz: "Kimchi sho'rva va guruch. Achchiq narsani yoqtirasizmi?" },
        { speaker: 'B', kr: '네, 저는 매운 음식을 좋아해요!',              uz: "Ha, men achchiq taomlarni yoqtiraman!" },
        { speaker: 'A', kr: '그럼 같이 먹으러 갈까요?',                   uz: "Unday bo'lsa birga yegani boramizmi?" },
        { speaker: 'B', kr: '좋아요! 빨리 가요. 사람이 많아지기 전에.',    uz: "Yaxshi! Tez boring. Odamlar ko'payishidan oldin." },
      ],
      notes: [
        "을/를 — to'ldiruvchi: 밥을(undosh→을), 커피를(unli→를).",
        "구내식당 — zavod/korporativ oshxona: EPS da ishchilar ko'pincha shu yerda ovqatlanadi.",
        "반찬 — yonaki taomlar: Koreys ovqatida asosiy taom + bir necha yonaki taomlar beriladi.",
        "찌개 (qalin sho'rva) vs 국 (suyuq sho'rva): 김치찌개(kimchi), 된장찌개(soya pasta).",
        "한국 음식은 매운 것이 많아요 — Koreyada achchiq taomlar ko'p: 고추장(qizil qalampir pasta).",
      ],
      games: {
        matchPairs: [
          { kr: '밥',     uz: 'guruch / ovqat' },
          { kr: '김치',   uz: 'kimchi' },
          { kr: '물',     uz: 'suv' },
          { kr: '맵다',   uz: 'achchiq' },
          { kr: '맛있다', uz: 'mazali' },
          { kr: '점심',   uz: 'tushlik' },
        ],
        fillBlank: [
          { sentence: '밥___ 먹어요.',               answer: '을',     options: ['을','를','이','가'],    uz: "Ovqat yeyman." },
          { sentence: '커피___ 마셔요.',              answer: '를',     options: ['를','을','이','가'],    uz: "Qahva ichaman." },
          { sentence: '김치를 ___ 해요.',             answer: '좋아',   options: ['좋아','싫어','먹고싶','마시고싶'], uz: "Kimchini yoqtiraman." },
          { sentence: '비빔밥을 먹고 ___ 어요.',      answer: '싶',     options: ['싶','좋','싫','있'],   uz: "Bibimbap yemoqchiman." },
          { sentence: '오늘 점심 메뉴가 ___ 예요?',  answer: '뭐',     options: ['뭐','어디','언제','누가'], uz: "Bugungi tushlik menyusi nima?" },
        ],
        scramble: [
          { kr: '밥',   uz: 'guruch' },
          { kr: '물',   uz: 'suv' },
          { kr: '점심', uz: 'tushlik' },
          { kr: '메뉴', uz: 'menyu' },
          { kr: '국',   uz: "sho'rva" },
        ],
      },
    },
    quiz: [
      { question: "'물을 마셔요' — Nega '을'?",            options: ['물 undosh bilan tugaydi','물 unli bilan tugaydi','Ixtiyoriy','Bu xato'], correct_index: 0 },
      { question: "'좋아해요' nimani anglatadi?",           options: ['Yoqtirmayman','Yoqtiraman','Yeyman','Ichaman'],          correct_index: 1 },
      { question: "'비빔밥을 먹고 싶어요' tarjimasi?",      options: ['Bibimbap yeyman','Bibimbap yemoqchiman','Bibimbap yoqtiraman','Bibimbap bering'], correct_index: 1 },
      { question: "'구내식당' nima?",                       options: ['Restoran','Supermarket','Zavod/korporativ oshxona','Kafe'], correct_index: 2 },
      { question: "'맵다' nimani anglatadi?",               options: ['Mazali','Shirin','Achchiq',"Sho'r"],                     correct_index: 2 },
      { question: "'반찬' nimani anglatadi?",               options: ['Asosiy taom','Yonaki taomlar','Sho\'rva','Ichimlik'],    correct_index: 1 },
      { question: "'찌개' nimani anglatadi?",               options: ['Suyuq sho\'rva','Qalin sho\'rva','Salat','Guruch'],      correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 6: Xarid qilish | 쇼핑 — Hayotiy xaridlar
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 1, order_in_level: 6,
    title_kr: '쇼핑 — 생활용품 사기',
    title_uz: "Xarid qilish — Kundalik buyumlar sotib olish",
    is_free: false,
    content: {
      topic: {
        kr: '저는 편의점이나 마트에서 쇼핑합니다. 생활용품을 사러 갑니다. 이거 얼마예요? 너무 비싸요. 다른 것도 있어요? 계산해 주세요.',
        uz: "Men qo'shimcha do'kon yoki marketda xarid qilaman. Kundalik buyumlar sotib olish uchun boraman. Bu qancha? Juda qimmat. Boshqa narsa ham bormi? Hisob qiling."
      },
      grammar: {
        explanation: `이거 / 그거 / 저거 — Ko'rsatish olmoshlari

이거 = bu (yaqin)
그거 = u (o'rtacha uzoq)
저거 = ana u (uzoq)

얼마예요? — Qancha? (narx so'rash)
• 이거 얼마예요? (Bu qancha?)
• 1,000원이에요. (1,000 won.)

-고 싶어요 — ...moqchiman:
• 이거 사고 싶어요. (Buni sotib olmoqchiman.)

주세요 — "bering" (iltimos):
• 이거 주세요. (Buni bering.)
• 영수증 주세요. (Chek bering.)`,
        examples: [
          { kr: '이거 얼마예요?',          uz: "Bu qancha?" },
          { kr: '너무 비싸요.',            uz: "Juda qimmat." },
          { kr: '이거 사고 싶어요.',       uz: "Buni sotib olmoqchiman." },
          { kr: '큰 사이즈 있어요?',       uz: "Katta o'lcham bormi?" },
          { kr: '계산해 주세요.',          uz: "Hisob qiling / To'layman." },
        ]
      },
      vocabulary: [
        { kr: '쇼핑',     romanization: 'syoping',     uz: 'Xarid qilish' },
        { kr: '편의점',   romanization: 'pyeonuijeom', uz: "Qo'shimcha do'kon (편의점)" },
        { kr: '마트',     romanization: 'mateu',       uz: 'Market, supermarket' },
        { kr: '가격',     romanization: 'gagyeok',     uz: 'Narx' },
        { kr: '비싸다',   romanization: 'bissada',     uz: 'Qimmat' },
        { kr: '싸다',     romanization: 'ssada',       uz: 'Arzon' },
        { kr: '사다',     romanization: 'sada',        uz: 'Sotib olmoq' },
        { kr: '팔다',     romanization: 'palda',       uz: 'Sotmoq' },
        { kr: '영수증',   romanization: 'yeongsujeung', uz: 'Chek, kvitansiya' },
        { kr: '현금',     romanization: 'hyeongeum',   uz: 'Naqd pul' },
        { kr: '카드',     romanization: 'kadeu',       uz: "Plastik karta" },
        { kr: '원',       romanization: 'won',         uz: 'Von (Koreya puli)' },
        { kr: '생활용품', romanization: 'saengwaryongpum', uz: 'Kundalik buyumlar' },
        { kr: '옷',       romanization: 'ot',          uz: 'Kiyim' },
        { kr: '신발',     romanization: 'sinbal',      uz: 'Oyoq kiyim' },
        { kr: '색깔',     romanization: 'saekkal',     uz: 'Rang' },
        { kr: '사이즈',   romanization: 'saijeu',      uz: "O'lcham" },
        { kr: '다른',     romanization: 'dareun',      uz: 'Boshqa' },
        { kr: '계산',     romanization: 'gyesan',      uz: "Hisob, to'lov" },
        { kr: '할인',     romanization: 'harin',       uz: 'Chegirma' },
      ],
      examples: [
        { kr: '편의점에서 라면이랑 물을 샀어요.',          uz: "Qo'shimcha do'konda ramen va suv sotib oldim." },
        { kr: '이 작업복 얼마예요? 너무 비싸면 다른 것 주세요.', uz: "Bu ish kiyim qancha? Juda qimmat bo'lsa boshqasini bering." },
        { kr: '현금으로 계산할게요. 영수증 주세요.',        uz: "Naqd pul bilan to'layman. Chek bering." },
        { kr: '이 장갑 사이즈가 너무 작아요. 큰 거 있어요?', uz: "Bu qo'lqop o'lchami juda kichik. Kattasi bormi?" },
        { kr: '할인 있어요? 좀 깎아 주세요.',             uz: "Chegirma bormi? Biroz tushiring." },
      ],
      dialog: [
        { speaker: 'A', kr: '어서 오세요! 뭘 찾으세요?',                     uz: "Xush kelibsiz! Nima qidiryapsiz?" },
        { speaker: 'B', kr: '작업복하고 안전화를 사고 싶어요.',               uz: "Ish kiyim va xavfsizlik poyabzali sotib olmoqchiman." },
        { speaker: 'A', kr: '이쪽으로 오세요. 이게 제일 인기 있어요.',        uz: "Bu tomonga keling. Bu eng mashhuri." },
        { speaker: 'B', kr: '얼마예요? 좀 비싸네요. 할인 되요?',             uz: "Qancha? Biroz qimmatroq ekan. Chegirma bo'ladimi?" },
        { speaker: 'A', kr: '지금 10% 할인 중이에요.',                       uz: "Hozir 10% chegirma bor." },
        { speaker: 'B', kr: '그럼 이걸로 살게요. 카드 돼요?',                uz: "Unday bo'lsa buni olaman. Karta bo'ladimi?" },
      ],
      notes: [
        "편의점 — Koreyada 24 soat ochiq bo'lgan kichik do'kon: 7-Eleven, CU, GS25.",
        "원 (won) — Koreya puli: 1,000원 ≈ 1,000 so'm. Zavod maoshi: 200만원~250만원.",
        "작업복 (ish kiyim) va 안전화 (xavfsizlik poyabzali) — zavod ishchilari uchun muhim.",
        "현금 vs 카드: Koreyada karta bilan to'lash juda keng tarqalgan.",
        "할인 (chegirma): 쇼핑몰에서 자주 있어요 — savdo markazlarida tez-tez bo'ladi.",
      ],
      games: {
        matchPairs: [
          { kr: '비싸다', uz: 'qimmat' },
          { kr: '싸다',   uz: 'arzon' },
          { kr: '사다',   uz: 'sotib olmoq' },
          { kr: '영수증', uz: 'chek' },
          { kr: '할인',   uz: 'chegirma' },
          { kr: '현금',   uz: 'naqd pul' },
        ],
        fillBlank: [
          { sentence: '이거 ___ 예요?',            answer: '얼마', options: ['얼마','누구','어디','언제'],  uz: "Bu qancha?" },
          { sentence: '너무 비싸요. 다른 것 ___.', answer: '주세요', options: ['주세요','있어요','가요','해요'], uz: "Juda qimmat. Boshqasini bering." },
          { sentence: '이거 사고 ___ 어요.',        answer: '싶',   options: ['싶','좋','싫','있'],        uz: "Buni sotib olmoqchiman." },
          { sentence: '현금으로 계산할___ 요.',     answer: '게',   options: ['게','아','서','면'],        uz: "Naqd pul bilan to'layman." },
          { sentence: '지금 10% 할인 ___ 이에요.', answer: '중',   options: ['중','전','후','때'],        uz: "Hozir 10% chegirma bor." },
        ],
        scramble: [
          { kr: '가격',   uz: 'narx' },
          { kr: '쇼핑',   uz: 'xarid' },
          { kr: '현금',   uz: 'naqd pul' },
          { kr: '할인',   uz: 'chegirma' },
          { kr: '카드',   uz: 'karta' },
        ],
      },
    },
    quiz: [
      { question: "'얼마예요?' nimani anglatadi?",          options: ['Bu nima?','Bu qancha?','Bu qayerda?','Bu kimniki?'], correct_index: 1 },
      { question: "'사고 싶어요' nimani anglatadi?",         options: ['Ko\'rmoqchiman','Sotmoqchiman','Sotib olmoqchiman','Almashmoqchiman'], correct_index: 2 },
      { question: "'편의점' nima?",                         options: ['Supermarket','24 soat kichik do\'kon','Bozor','Kafe'], correct_index: 1 },
      { question: "'할인' nimani anglatadi?",               options: ['Narx','Chegirma','Chek','Karta'],                  correct_index: 1 },
      { question: "'계산해 주세요' tarjimasi?",             options: ['Menyu bering','Hisob qiling/to\'layman','Chegirma bormi?','Bu nima?'], correct_index: 1 },
      { question: "'영수증' nimani anglatadi?",             options: ['Naqd pul','Karta','Chek, kvitansiya','Chegirma'],  correct_index: 2 },
      { question: "'작업복' nimani anglatadi?",             options: ['Ish kiyim','Uy kiyimi','Sport kiyimi','Bayram kiyimi'], correct_index: 0 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 7: Kun tartibi | 하루 일과 — Ishchi kuni
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 1, order_in_level: 7,
    title_kr: '하루 일과 — 근로자의 하루',
    title_uz: "Kun tartibi — Ishchining kuni",
    is_free: false,
    content: {
      topic: {
        kr: '저는 아침 6시에 일어납니다. 씻고 밥을 먹습니다. 7시에 셔틀버스를 탑니다. 8시에 공장에 도착합니다. 오후 5시에 퇴근합니다. 집에 와서 쉽니다.',
        uz: "Men ertalab soat 6 da turaman. Yuvinib, ovqat yeyman. Soat 7 da servis avtobusga chiqaman. Soat 8 da zavodga yetib kelaman. Tushdan keyin soat 5 da ishdan qaytaman. Uyga kelib dam olaman."
      },
      grammar: {
        explanation: `-(스)ㅂ니다 — Rasmiy shakl (ish joyida juda muhim!)

-아요/어요 = oddiy (do'stona)
-(스)ㅂ니다 = rasmiy (ish joyida, hurmat bilan)

Qoida:
• Unli tugasa: 가다 → 갑니다
• Undosh tugasa: 먹다 → 먹습니다
• ㄹ tugasa: 알다 → 압니다

에 va 에서 (takrorlash):
• 공장에 가요.    (Zavodga boraman)
• 공장에서 일해요. (Zavodda ishlayman)

셔틀버스 — zavod servis avtobusi:
• 셔틀버스를 타요. (Servis avtobusga chiqaman.)`,
        examples: [
          { kr: '저는 6시에 일어납니다.',          uz: "Men soat 6 da turaman." },
          { kr: '공장에서 하루 8시간 일합니다.',    uz: "Zavodda kuniga 8 soat ishlayman." },
          { kr: '셔틀버스를 타고 출근합니다.',      uz: "Servis avtobusda ishga boraman." },
          { kr: '퇴근하고 나서 샤워를 합니다.',    uz: "Ishdan qaytgandan keyin dush qilaman." },
          { kr: '밤 11시에 잠을 잡니다.',          uz: "Kechasi soat 11 da uxlayman." },
        ]
      },
      vocabulary: [
        { kr: '일어나다', romanization: 'ireonada',  uz: "Turmoq, uyg'onmoq" },
        { kr: '씻다',     romanization: 'ssitda',    uz: 'Yuvinmoq' },
        { kr: '먹다',     romanization: 'meokda',    uz: 'Yemoq' },
        { kr: '출근하다', romanization: 'chulgeunada', uz: 'Ishga bormoq' },
        { kr: '퇴근하다', romanization: 'toegeunada', uz: 'Ishdan qaytmoq' },
        { kr: '일하다',   romanization: 'ilhada',    uz: 'Ishlash' },
        { kr: '쉬다',     romanization: 'swida',     uz: 'Dam olmoq' },
        { kr: '자다',     romanization: 'jada',      uz: 'Uxlamoq' },
        { kr: '샤워하다', romanization: 'syawohada', uz: 'Dush qilmoq' },
        { kr: '셔틀버스', romanization: 'syeoteulbeoseu', uz: 'Servis avtobus' },
        { kr: '도착하다', romanization: 'docakada',  uz: 'Yetib kelmoq' },
        { kr: '보통',     romanization: 'botong',    uz: 'Odatda' },
        { kr: '항상',     romanization: 'hangsang',  uz: 'Doim, har doim' },
        { kr: '가끔',     romanization: 'gakeum',    uz: "Ba'zan" },
        { kr: '먼저',     romanization: 'meonjeo',   uz: 'Avval, birinchi' },
        { kr: '그리고',   romanization: 'geurigo',   uz: 'Va, keyin' },
        { kr: '그 다음에',romanization: 'geu daeume', uz: 'Undan keyin' },
        { kr: '마지막으로', romanization: 'majimageuro', uz: 'Oxirida, nihoyat' },
        { kr: '아침',     romanization: 'achim',     uz: 'Ertalab' },
        { kr: '저녁',     romanization: 'jeonyeok',  uz: 'Kechqurun' },
      ],
      examples: [
        { kr: '저는 보통 아침 6시에 일어나서 씻고 밥을 먹습니다.', uz: "Men odatda ertalab soat 6 da turib, yuvinib, ovqat yeyman." },
        { kr: '7시에 셔틀버스를 타고 8시에 공장에 도착합니다.',   uz: "Soat 7 da servis avtobusga chiqib, soat 8 da zavodga yetaman." },
        { kr: '점심시간은 12시부터 1시까지입니다.',               uz: "Tushlik vaqti soat 12 dan 1 gacha." },
        { kr: '퇴근하고 나서 먼저 샤워를 하고 밥을 먹습니다.',    uz: "Ishdan qaytgandan keyin avval dush qilaman, so'ng ovqat yeyman." },
        { kr: '저는 항상 밤 11시에 잡니다. 내일 또 일해야 해요.', uz: "Men doim kechasi soat 11 da uxlayman. Ertaga yana ishlash kerak." },
      ],
      dialog: [
        { speaker: 'A', kr: '몇 시에 일어나요?',                          uz: "Nechada turasiz?" },
        { speaker: 'B', kr: '저는 6시에 일어나요. 셔틀버스가 7시에 와요.', uz: "Men soat 6 da turaman. Servis avtobus soat 7 da keladi." },
        { speaker: 'A', kr: '퇴근하고 나서 보통 뭐 해요?',               uz: "Ishdan qaytgandan keyin odatda nima qilasiz?" },
        { speaker: 'B', kr: '샤워하고 밥 먹고 쉬어요. 너무 피곤해요.',    uz: "Dush qilib, ovqat yeb, dam olaman. Juda charchayman." },
        { speaker: 'A', kr: '야근 있을 때는 더 힘들겠네요.',             uz: "Qo'shimcha ish bo'lganda yanada qiyin bo'lsa kerak." },
        { speaker: 'B', kr: '네, 야근할 때는 밤 12시에 집에 와요.',       uz: "Ha, qo'shimcha ish qilganda kechasi soat 12 da uyga kelaman." },
      ],
      notes: [
        "-(스)ㅂ니다: ish joyida DOIM shu shakl: 일합니다(ishlayman), 먹습니다(yeyman).",
        "셔틀버스 — EPS ishchilarining ko'plari foydalanadi: zavod bepul tashiydi.",
        "퇴근하고 나서 — ishdan qaytgandan keyin: vaqt ketma-ketligini bildiradi.",
        "한국 근로자 하루 — 8시간 일, 1시간 tushlik = jami 9 soat zavodda.",
        "피곤해요 (charchadim) — EPS ishchilarida eng ko'p aytilgan gap!",
      ],
      games: {
        matchPairs: [
          { kr: '일어나다', uz: "turmoq, uyg'onmoq" },
          { kr: '출근하다', uz: 'ishga bormoq' },
          { kr: '퇴근하다', uz: 'ishdan qaytmoq' },
          { kr: '쉬다',    uz: 'dam olmoq' },
          { kr: '도착하다', uz: 'yetib kelmoq' },
          { kr: '셔틀버스', uz: 'servis avtobus' },
        ],
        fillBlank: [
          { sentence: '저는 6시에 일어___니다.',      answer: '납',  options: ['납','합','갑','옵'],       uz: "Men soat 6 da turaman." },
          { sentence: '공장에서 8시간 일___니다.',    answer: '합',  options: ['합','갑','봅','옵'],       uz: "Zavodda 8 soat ishlayman." },
          { sentence: '셔틀버스를 타고 출근___니다.', answer: '합',  options: ['합','봅','갑','옵'],       uz: "Servis avtobusda ishga boraman." },
          { sentence: '퇴근하고 나서 먼저 샤워를 ___니다.', answer: '합', options: ['합','갑','봅','옵'], uz: "Ishdan qaytgandan keyin avval dush qilaman." },
          { sentence: '저는 보통 밤 11시에 ___니다.', answer: '잡',  options: ['잡','갑','봅','옵'],       uz: "Men odatda kechasi soat 11 da uxlayman." },
        ],
        scramble: [
          { kr: '출근',   uz: 'ishga borish' },
          { kr: '퇴근',   uz: 'ishdan qaytish' },
          { kr: '보통',   uz: 'odatda' },
          { kr: '항상',   uz: 'doim' },
          { kr: '먼저',   uz: 'avval' },
        ],
      },
    },
    quiz: [
      { question: "'일어나다 (ireonada)' nima?",            options: ['Uxlamoq','Turmoq / uyg\'onmoq','Ishlashmoq','Ovqat yemoq'],  correct_index: 1 },
      { question: "'-(스)ㅂ니다' qaysi shakl?",            options: ['Oddiy (do\'stona)','Rasmiy (ish joyida)','O\'tgan zamon','Istak'], correct_index: 1 },
      { question: "'셔틀버스' nima?",                       options: ['Taksi','Metro','Servis avtobus','Piyoda'],                    correct_index: 2 },
      { question: "'퇴근하다' nima degani?",               options: ['Ishga bormoq','Ishdan qaytmoq','Dam olmoq','Tushlik qilmoq'], correct_index: 1 },
      { question: "'보통' nimani anglatadi?",               options: ['Doim','Ba\'zan','Odatda','Hech qachon'],                     correct_index: 2 },
      { question: "'도착하다' nimani anglatadi?",           options: ["Jo'namoq",'Kutmoq','Yetib kelmoq','Qaytmoq'],               correct_index: 2 },
      { question: "'먼저' nimani anglatadi?",               options: ['Keyin','Birga','Avval, birinchi','Doim'],                   correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 8: Ob-havo va fasllar | 날씨와 계절
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 1, order_in_level: 8,
    title_kr: '날씨와 계절 — 한국의 기후',
    title_uz: "Ob-havo va fasllar — Koreya iqlimi",
    is_free: false,
    content: {
      topic: {
        kr: '한국은 사계절이 뚜렷합니다. 봄은 따뜻하고, 여름은 덥습니다. 가을은 시원하고, 겨울은 매우 춥습니다. 오늘 날씨가 어때요? 비가 와서 우산을 가져왔어요.',
        uz: "Koreyada to'rt fasl yaqqol bor. Bahor iliq, yoz issiq. Kuz salqin, qish juda sovuq. Bugun ob-havo qanday? Yomg'ir yog'gani uchun soyabon oldim."
      },
      grammar: {
        explanation: `-고 — "va, keyin" (ikki holat birlashtirish)

• 봄은 따뜻하고 여름은 더워요.
  (Bahor iliq va yoz issiq.)
• 씻고 밥을 먹어요.
  (Yuvinib ovqat yeyman.)

안 + fe'l — inkor shakli:
• 안 좋아해요. (Yoqtirmayman.)
• 오늘 비가 안 와요. (Bugun yomg'ir yog'madi.)

-아서/어서 — sabab:
• 비가 와서 우산을 가져왔어요.
  (Yomg'ir yog'gani uchun soyabon oldim.)

Ish joyi uchun muhim:
• 더울 때 물을 많이 마시세요. (Issiq paytda ko'p suv iching.)
• 미끄러우니까 조심하세요. (Sirpanchiq, ehtiyot bo'ling.)`,
        examples: [
          { kr: '오늘 날씨가 어때요?',       uz: "Bugun ob-havo qanday?" },
          { kr: '봄은 따뜻하고 좋아요.',     uz: "Bahor iliq va yaxshi." },
          { kr: '겨울은 너무 추워요.',        uz: "Qish juda sovuq." },
          { kr: '비가 와서 미끄러워요.',      uz: "Yomg'ir yog'gani uchun sirpanchiq." },
          { kr: '오늘 눈이 와서 조심하세요.', uz: "Bugun qor yog'yapti, ehtiyot bo'ling." },
        ]
      },
      vocabulary: [
        { kr: '날씨',   romanization: 'nalsi',      uz: 'Ob-havo' },
        { kr: '봄',     romanization: 'bom',        uz: 'Bahor' },
        { kr: '여름',   romanization: 'yeoreum',    uz: 'Yoz' },
        { kr: '가을',   romanization: 'gaeul',      uz: 'Kuz' },
        { kr: '겨울',   romanization: 'gyeoul',     uz: 'Qish' },
        { kr: '덥다',   romanization: 'deopda',     uz: 'Issiq bo\'lmoq' },
        { kr: '춥다',   romanization: 'chupda',     uz: 'Sovuq bo\'lmoq' },
        { kr: '따뜻하다',romanization:'ttatteutada',uz: 'Iliq bo\'lmoq' },
        { kr: '시원하다',romanization:'siwonhada',  uz: 'Salqin bo\'lmoq' },
        { kr: '비',     romanization: 'bi',         uz: "Yomg'ir" },
        { kr: '눈',     romanization: 'nun',        uz: 'Qor' },
        { kr: '바람',   romanization: 'baram',      uz: 'Shamol' },
        { kr: '우산',   romanization: 'usan',       uz: 'Soyabon' },
        { kr: '장갑',   romanization: 'jangap',     uz: "Qo'lqop" },
        { kr: '미끄럽다',romanization:'mikkeureopda',uz: 'Sirpanchiq' },
        { kr: '조심하다',romanization:'josimada',   uz: 'Ehtiyot bo\'lmoq' },
        { kr: '흐리다', romanization: 'heurida',    uz: 'Bulutli bo\'lmoq' },
        { kr: '맑다',   romanization: 'malkda',     uz: 'Ochiq (havo)' },
        { kr: '습하다', romanization: 'seupada',    uz: 'Nam bo\'lmoq' },
        { kr: '온도',   romanization: 'ondo',       uz: 'Harorat' },
      ],
      examples: [
        { kr: '여름에는 한국이 매우 덥고 습해요. 더울 때 물을 많이 마시세요.', uz: "Yozda Koreya juda issiq va nam. Issiq paytda ko'p suv iching." },
        { kr: '겨울에는 눈이 많이 오고 길이 미끄러워요. 조심하세요.',          uz: "Qishda qor ko'p yog'adi va yo'l sirpanchiq. Ehtiyot bo'ling." },
        { kr: '오늘 비가 와서 공장 밖이 미끄러워요.',                         uz: "Bugun yomg'ir yog'gani uchun zavod tashqarisi sirpanchiq." },
        { kr: '한국 겨울은 정말 춥습니다. -10도까지 내려가요.',                uz: "Koreya qishi juda sovuq. -10 darajagacha tushadi." },
        { kr: '봄과 가을은 일하기 좋은 날씨예요.',                           uz: "Bahor va kuz — ishlash uchun yaxshi ob-havo." },
      ],
      dialog: [
        { speaker: 'A', kr: '오늘 날씨 어때요?',                         uz: "Bugun ob-havo qanday?" },
        { speaker: 'B', kr: '비가 와요. 그리고 바람도 많이 불어요.',      uz: "Yomg'ir yog'yapti. Va shamol ham ko'p esmoqda." },
        { speaker: 'A', kr: '그럼 공장 밖이 미끄럽겠네요. 조심하세요.', uz: "Unday bo'lsa zavod tashqarisi sirpanchiq bo'lsa kerak. Ehtiyot bo'ling." },
        { speaker: 'B', kr: '네, 조심할게요. 한국 겨울이 정말 춥네요.', uz: "Ha, ehtiyot bo'laman. Koreya qishi juda sovuq ekan." },
        { speaker: 'A', kr: '우즈베키스탄은 어때요? 한국보다 춥나요?',   uz: "O'zbekiston qanday? Koreyadan sovuqroqmi?" },
        { speaker: 'B', kr: '아니요, 우즈베키스탄 겨울도 춥지만 한국이 더 춥고 눈이 많아요.', uz: "Yo'q, O'zbekiston qishi ham sovuq, lekin Koreya sovuqroq va qori ko'p." },
      ],
      notes: [
        "-고: 봄은 따뜻하고 여름은 더워요 (bahor iliq va yoz issiq).",
        "안 + fe'l: 안 추워요(sovuq emas), 안 가요(bormayman) — qisqa inkor shakli.",
        "미끄럽다 (sirpanchiq) — zavod xavfsizligida muhim: 비 올 때(yomg'ir paytda).",
        "Koreya iqlimi: bahor 봄(3-5 oy), yoz 여름(6-8 oy), kuz 가을(9-11 oy), qish 겨울(12-2 oy).",
        "EPS imtihonida: ob-havo + xavfsizlik mavzulari birgalikda chiqadi.",
      ],
      games: {
        matchPairs: [
          { kr: '봄',   uz: 'bahor' },
          { kr: '여름', uz: 'yoz' },
          { kr: '가을', uz: 'kuz' },
          { kr: '겨울', uz: 'qish' },
          { kr: '우산', uz: 'soyabon' },
          { kr: '조심', uz: 'ehtiyot' },
        ],
        fillBlank: [
          { sentence: '봄은 따뜻하___ 여름은 더워요.',   answer: '고', options: ['고','서','면','지만'],  uz: "Bahor iliq va yoz issiq." },
          { sentence: '비가 와___ 미끄러워요.',           answer: '서', options: ['서','고','면','지만'],  uz: "Yomg'ir yog'gani uchun sirpanchiq." },
          { sentence: '오늘 비가 ___ 와요.',              answer: '안', options: ['안','못','안되','잘'],  uz: "Bugun yomg'ir yog'maydi." },
          { sentence: '더울 때 물을 많이 ___ 세요.',      answer: '마시', options: ['마시','먹으','가','봐'], uz: "Issiq paytda ko'p suv iching." },
          { sentence: '눈이 와서 길이 ___ 어요.',         answer: '미끄럽', options: ['미끄럽','조심해','따뜻해','시원해'], uz: "Qor yog'gani uchun yo'l sirpanchiq." },
        ],
        scramble: [
          { kr: '날씨', uz: 'ob-havo' },
          { kr: '비',   uz: "yomg'ir" },
          { kr: '눈',   uz: 'qor' },
          { kr: '바람', uz: 'shamol' },
          { kr: '온도', uz: 'harorat' },
        ],
      },
    },
    quiz: [
      { question: "'봄 (bom)' qaysi fasl?",             options: ['Qish','Kuz','Bahor','Yoz'],                            correct_index: 2 },
      { question: "'덥다 (deopda)' nima?",              options: ['Sovuq bo\'lmoq','Issiq bo\'lmoq','Ochiq bo\'lmoq','Yomg\'irli bo\'lmoq'], correct_index: 1 },
      { question: "'안 좋아해요' nimani anglatadi?",    options: ['Juda yoqtiraman','Yoqtirmayman','Bilmayman','Ko\'rmayman'], correct_index: 1 },
      { question: "'비가 와서 미끄러워요' tarjimasi?",  options: ['Qor yog\'gani uchun sirpanchiq','Yomg\'ir yog\'gani uchun sirpanchiq','Shamol esgan uchun qiyin','Havo yaxshi uchun boraman'], correct_index: 1 },
      { question: "'조심하다' nimani anglatadi?",        options: ['Tezlashmoq','Ehtiyot bo\'lmoq','Ishlash','Dam olmoq'], correct_index: 1 },
      { question: "'습하다' nimani anglatadi?",          options: ['Issiq','Sovuq','Nam bo\'lmoq','Sirpanchiq'],           correct_index: 2 },
      { question: "Koreya qishi odatda necha darajagacha tushadi?", options: ['+10 daraja','0 daraja','-10 daraja','-30 daraja'], correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 9: Transport | 교통 — Zavod va shahar
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 1, order_in_level: 9,
    title_kr: '교통 — 공장과 도시 이동',
    title_uz: "Transport — Zavod va shahar ichida yurish",
    is_free: false,
    content: {
      topic: {
        kr: '저는 셔틀버스로 공장에 갑니다. 주말에는 버스나 지하철로 도시에 가요. 버스 정류장은 공장 앞에 있어요. 지하철역은 어떻게 가요? 걸어서 20분 걸려요.',
        uz: "Men servis avtobus bilan zavodga boraman. Dam olish kunlari avtobus yoki metro bilan shaharga boraman. Avtobus bekati zavod oldida. Metro stansiyasiga qanday boraman? Piyoda 20 daqiqa ketadi."
      },
      grammar: {
        explanation: `-(으)로 — Transport vositasi bilan

• 버스로 가요. (Avtobus bilan boraman.)
• 지하철로 가요. (Metro bilan boraman.)
• 걸어서 가요. (Piyoda boraman.)

-고 싶어요 vs -(으)러 가요:
• 집에 가고 싶어요. (Uyga bormoqchiman — istak)
• 쇼핑하러 가요. (Xarid qilish uchun boraman — maqsad)

얼마나 걸려요? — Qancha vaqt ketadi?:
• 20분 걸려요. (20 daqiqa ketadi.)
• 한 시간 걸려요. (Bir soat ketadi.)

교통 카드 (transport kartasi):
• T-money, cashbee — Koreyada avtobus/metro uchun`,
        examples: [
          { kr: '버스로 시내에 가요.',       uz: "Avtobus bilan shaharga boraman." },
          { kr: '지하철역이 어디에 있어요?', uz: "Metro stansiyasi qayerda?" },
          { kr: '걸어서 20분 걸려요.',       uz: "Piyoda 20 daqiqa ketadi." },
          { kr: '버스 정류장이 어디예요?',   uz: "Avtobus bekati qayerda?" },
          { kr: '다음 버스가 언제 와요?',    uz: "Keyingi avtobus qachon keladi?" },
        ]
      },
      vocabulary: [
        { kr: '버스',     romanization: 'beoseu',       uz: 'Avtobus' },
        { kr: '지하철',   romanization: 'jihacheol',    uz: 'Metro' },
        { kr: '택시',     romanization: 'taeksi',       uz: 'Taksi' },
        { kr: '기차',     romanization: 'gicha',        uz: 'Poyezd' },
        { kr: '자전거',   romanization: 'jajeongeo',    uz: 'Velosiped' },
        { kr: '걷다',     romanization: 'geotta',       uz: 'Piyoda yurmoq' },
        { kr: '타다',     romanization: 'tada',         uz: 'Minmoq, chiqmoq (transport)' },
        { kr: '내리다',   romanization: 'naerida',      uz: 'Tushmoq (transportdan)' },
        { kr: '갈아타다', romanization: 'garatada',     uz: 'Almashmoq (transport)' },
        { kr: '정류장',   romanization: 'jeongnyujang', uz: 'Avtobus bekati' },
        { kr: '지하철역', romanization: 'jihacheolyeok', uz: 'Metro stansiyasi' },
        { kr: '걸리다',   romanization: 'geollida',     uz: 'Ketmoq (vaqt)' },
        { kr: '교통 카드',romanization: 'gyotong kadeu', uz: 'Transport kartasi' },
        { kr: '요금',     romanization: 'yogeum',       uz: 'Narx, to\'lov' },
        { kr: '방향',     romanization: 'banghyang',    uz: "Yo'nalish" },
        { kr: '왼쪽',     romanization: 'oenjok',       uz: "Chap tomon" },
        { kr: '오른쪽',   romanization: 'oreunjok',     uz: "O'ng tomon" },
        { kr: '직진',     romanization: 'jikjin',       uz: 'To\'g\'ri boring' },
        { kr: '돌아가다', romanization: 'doragada',     uz: 'Burilmoq, aylanib ketmoq' },
        { kr: '셔틀버스', romanization: 'syeoteulbeoseu',uz: 'Servis avtobus' },
      ],
      examples: [
        { kr: '저는 셔틀버스를 타고 공장에 갑니다. 30분 걸려요.',          uz: "Men servis avtobusga chiqib zavodga boraman. 30 daqiqa ketadi." },
        { kr: '주말에는 지하철로 서울 시내에 가요. 1시간 걸려요.',          uz: "Dam olish kunlari metro bilan Seul shahriga boraman. 1 soat ketadi." },
        { kr: '교통 카드를 사서 버스와 지하철을 탈 수 있어요.',             uz: "Transport kartasini sotib olsangiz avtobus va metroda yurishingiz mumkin." },
        { kr: '버스 정류장이 어디예요? 공장에서 걸어서 5분이에요.',         uz: "Avtobus bekati qayerda? Zavoddan piyoda 5 daqiqa." },
        { kr: '지하철을 타고 2번째 역에서 내리세요. 거기서 걸어가면 돼요.', uz: "Metroga chiqib 2-stansiyada tushing. U yerdan piyoda borsangiz bo'ladi." },
      ],
      dialog: [
        { speaker: 'A', kr: '실례합니다. 지하철역이 어디에 있어요?',         uz: "Kechirasiz. Metro stansiyasi qayerda?" },
        { speaker: 'B', kr: '저쪽으로 직진하면 있어요. 걸어서 10분이에요.', uz: "U tomonga to'g'ri borsangiz bor. Piyoda 10 daqiqa." },
        { speaker: 'A', kr: '버스로도 갈 수 있어요?',                        uz: "Avtobus bilan ham borish mumkinmi?" },
        { speaker: 'B', kr: '네, 5번 버스 타시면 돼요. 정류장은 저기예요.',  uz: "Ha, 5-avtobus bilan borsangiz bo'ladi. Bekat u yerda." },
        { speaker: 'A', kr: '요금이 얼마예요?',                              uz: "Narxi qancha?" },
        { speaker: 'B', kr: '교통 카드로 1,250원이에요. 현금은 조금 더 비싸요.', uz: "Transport kartasi bilan 1,250 won. Naqd pul biroz qimmatroq." },
      ],
      notes: [
        "-(으)로 — transport: 버스로(avtobus bilan), 지하철로(metro bilan), 걸어서(piyoda).",
        "교통 카드 — T-money: Koreyada avtobus/metro uchun majburiy deyarli. Do'konda sotib olish mumkin.",
        "갈아타다 — almashmoq: 지하철 2호선에서 1호선으로 갈아타세요(2-liniyadan 1-liniyaga almashtiring).",
        "EPS imtihonida: yo'l so'rash va ko'rsatish savollari 100% chiqadi.",
        "셔틀버스 — ko'p zavodlar bepul tashiydi: mavzuini shartnoma vaqtida so'rash kerak.",
      ],
      games: {
        matchPairs: [
          { kr: '버스',     uz: 'avtobus' },
          { kr: '지하철',   uz: 'metro' },
          { kr: '타다',     uz: 'minmoq' },
          { kr: '내리다',   uz: 'tushmoq' },
          { kr: '갈아타다', uz: 'almashmoq' },
          { kr: '걸리다',   uz: 'ketmoq (vaqt)' },
        ],
        fillBlank: [
          { sentence: '버스___ 시내에 가요.',         answer: '로',    options: ['로','에','를','이'],         uz: "Avtobus bilan shaharga boraman." },
          { sentence: '걸어서 20분 ___ 요.',           answer: '걸려',  options: ['걸려','가','봐','해'],        uz: "Piyoda 20 daqiqa ketadi." },
          { sentence: '지하철역이 ___ 있어요?',        answer: '어디에',options: ['어디에','무엇이','누가','언제'],uz: "Metro stansiyasi qayerda?" },
          { sentence: '2번째 역에서 ___ 세요.',        answer: '내리',  options: ['내리','타','봐','가'],        uz: "2-stansiyada tushing." },
          { sentence: '교통 카드로 1,250___ 이에요.', answer: '원',    options: ['원','달러','엔','위안'],       uz: "Transport kartasi bilan 1,250 won." },
        ],
        scramble: [
          { kr: '버스',   uz: 'avtobus' },
          { kr: '지하철', uz: 'metro' },
          { kr: '택시',   uz: 'taksi' },
          { kr: '요금',   uz: "narx, to'lov" },
          { kr: '방향',   uz: "yo'nalish" },
        ],
      },
    },
    quiz: [
      { question: "'지하철 (jihacheol)' nima?",          options: ['Avtobus','Metro','Taksi','Samolyot'],                   correct_index: 1 },
      { question: "'버스로 가요' — '로' nima uchun?",    options: ['Joy uchun','Transport vositasi uchun','Vaqt uchun','Odam uchun'], correct_index: 1 },
      { question: "'얼마나 걸려요?' tarjimasi?",         options: ['Qancha turadi?','Qancha vaqt ketadi?','Qancha uzoq?','Qancha kishi?'], correct_index: 1 },
      { question: "'갈아타다' nimani anglatadi?",         options: ['Minmoq','Tushmoq','Almashmoq (transport)','Piyoda yurmoq'], correct_index: 2 },
      { question: "'교통 카드' nima?",                   options: ['Kredit karta','Transport kartasi','ID karta','Chegirma karta'], correct_index: 1 },
      { question: "'내리다' nimani anglatadi?",           options: ['Minmoq','Tushmoq (transportdan)','Kutmoq','Bormoq'],   correct_index: 1 },
      { question: "'직진' nimani anglatadi?",             options: ["Chap burilish","O'ng burilish","To'g'ri boring",'Orqaga'],  correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 10: Hobbi | 취미 — Dam olish
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 1, order_in_level: 10,
    title_kr: '취미와 여가 — 주말에 뭐 해요?',
    title_uz: "Hobbi va dam olish — Dam olish kuni nima qilasiz?",
    is_free: false,
    content: {
      topic: {
        kr: '저는 주말에 보통 휴식을 취합니다. 운동을 하거나 영화를 봅니다. 한국 드라마 보는 것을 좋아해요. 친구들과 함께 축구를 하기도 합니다. 가끔 한국 문화를 배우러 가요.',
        uz: "Men dam olish kunlari odatda dam olaman. Sport qilaman yoki kino ko'raman. Koreya seriallarini ko'rishni yoqtiraman. Do'stlar bilan birga futbol ham o'ynayman. Ba'zan Koreya madaniyatini o'rganishga boraman."
      },
      grammar: {
        explanation: `-는 것 — Fe'lni otlashtirish

✨ -는 것 = fe'lni 'OT'ga aylantiradi:
• 읽다 → 읽는 것 (o'qish)
• 보다 → 보는 것 (ko'rish)
• 운동하다 → 운동하는 것 (sport qilish)

💡 Qolip: ___는 것을 좋아해요 = ___ishni yoqtiraman

-(으)ㄹ까요? — Taklif qilish:
• 같이 운동할까요? (Birga sport qilamizmi?)
• 주말에 뭐 할까요? (Dam olish kunida nima qilamiz?)

-거나 — "yoki" (ikki tanlov):
• 운동을 하거나 영화를 봐요.
  (Sport qilaman yoki kino ko'raman.)`,
        examples: [
          { kr: '음악 듣는 것을 좋아해요.',      uz: "Musiqa tinglashni yoqtiraman." },
          { kr: '주말에 같이 운동할까요?',        uz: "Dam olish kuni birga sport qilamizmi?" },
          { kr: '영화를 보거나 운동을 해요.',     uz: "Kino ko'raman yoki sport qilaman." },
          { kr: '한국 문화를 배우는 것이 재미있어요.', uz: "Koreya madaniyatini o'rganish qiziq." },
          { kr: '쉬는 날에 뭐 하고 싶어요?',     uz: "Dam olish kunida nima qilmoqchisiz?" },
        ]
      },
      vocabulary: [
        { kr: '취미',     romanization: 'chwimi',      uz: 'Hobbi' },
        { kr: '음악',     romanization: 'eumak',       uz: 'Musiqa' },
        { kr: '영화',     romanization: 'yeonghwa',    uz: 'Kino' },
        { kr: '독서',     romanization: 'dokseo',      uz: "Kitob o'qish" },
        { kr: '운동',     romanization: 'undong',      uz: 'Sport / mashq' },
        { kr: '축구',     romanization: 'chukgu',      uz: 'Futbol' },
        { kr: '수영',     romanization: 'suyeong',     uz: 'Suzish' },
        { kr: '여행',     romanization: 'yeohaeng',    uz: 'Sayohat' },
        { kr: '요리',     romanization: 'yori',        uz: 'Pishirish' },
        { kr: '드라마',   romanization: 'deurama',     uz: 'Serial' },
        { kr: '재미있다', romanization: 'jaemiitda',   uz: 'Qiziq / zavqli' },
        { kr: '같이',     romanization: 'gachi',       uz: 'Birga' },
        { kr: '혼자',     romanization: 'honja',       uz: "Yolg'iz" },
        { kr: '주말',     romanization: 'jumal',       uz: 'Dam olish kunlari' },
        { kr: '휴식',     romanization: 'hyusik',      uz: 'Dam olish' },
        { kr: '쉬다',     romanization: 'swida',       uz: 'Dam olmoq' },
        { kr: '가끔',     romanization: 'gakeum',      uz: "Ba'zan" },
        { kr: '보통',     romanization: 'botong',      uz: 'Odatda' },
        { kr: '여가',     romanization: 'yeoga',       uz: 'Bo\'sh vaqt' },
        { kr: '스트레스 해소', romanization: 'seuteuleseu haeso', uz: 'Stressni chiqarish' },
      ],
      examples: [
        { kr: '저는 주말에 보통 운동을 하거나 한국 드라마를 봐요.',   uz: "Men dam olish kunlari odatda sport qilaman yoki Koreya seriali ko'raman." },
        { kr: '한국어 공부하는 것이 힘들지만 재미있어요.',            uz: "Koreys tilini o'rganish qiyin, lekin qiziqarli." },
        { kr: '같이 축구할까요? 스트레스 해소에 좋아요.',             uz: "Birga futbol o'ynaymizmi? Stressni chiqarishga yaxshi." },
        { kr: '저는 요리하는 것을 좋아해요. 한국 음식도 배워요.',     uz: "Men pishirishni yoqtiraman. Koreys taomlarini ham o'rganaman." },
        { kr: '여가 시간에 뭐 하세요? 저는 음악 듣거나 독서해요.',   uz: "Bo'sh vaqtda nima qilasiz? Men musiqa tinglaman yoki kitob o'qiyman." },
      ],
      dialog: [
        { speaker: 'A', kr: '주말에 뭐 해요?',                              uz: "Dam olish kunlari nima qilasiz?" },
        { speaker: 'B', kr: '보통 자거나 운동해요. 너무 피곤해서요.',        uz: "Odatda uxlayman yoki sport qilaman. Juda charchaganim uchun." },
        { speaker: 'A', kr: '한국 친구들하고 어울리는 거 어때요?',          uz: "Koreya do'stlari bilan muloqot qilish qanday?" },
        { speaker: 'B', kr: '좋아요. 같이 축구도 하고 밥도 먹어요.',        uz: "Yaxshi. Birga futbol ham o'ynaymiz, ovqat ham yeyamiz." },
        { speaker: 'A', kr: '한국 문화 배우는 것도 재미있겠네요.',          uz: "Koreya madaniyatini o'rganish ham qiziq bo'lsa kerak." },
        { speaker: 'B', kr: '네! 드라마 보면서 한국어도 늘고 재미있어요.', uz: "Ha! Serial ko'ra turib koreys tili ham oshadi, qiziqarli." },
      ],
      notes: [
        "-는 것: fe'lni ot qilish: 듣는 것(tinglash), 보는 것(ko'rish), 하는 것(qilish).",
        "-(으)ㄹ까요?: taklif: 할까요?(qilamizmi?), 갈까요?(boramizmi?), 먹을까요?(yeymizmi?).",
        "-거나: yoki: 운동하거나 쉬어요(sport qilaman yoki dam olaman).",
        "스트레스 해소 — stressni chiqarish: zavodda ishlagandan keyin muhim.",
        "한국 드라마 + 한국어 공부 — eng samarali koreys tilini o'rganish usuli.",
      ],
      games: {
        matchPairs: [
          { kr: '취미',   uz: 'hobbi' },
          { kr: '축구',   uz: 'futbol' },
          { kr: '독서',   uz: "kitob o'qish" },
          { kr: '여행',   uz: 'sayohat' },
          { kr: '휴식',   uz: 'dam olish' },
          { kr: '여가',   uz: "bo'sh vaqt" },
        ],
        fillBlank: [
          { sentence: '음악 듣는 것을 ___ 해요.',    answer: '좋아', options: ['좋아','싫어','먹고','마시고'], uz: "Musiqa tinglashni yoqtiraman." },
          { sentence: '같이 운동___ 까요?',           answer: '할',   options: ['할','먹을','갈','볼'],         uz: "Birga sport qilamizmi?" },
          { sentence: '영화를 보___ 운동을 해요.',    answer: '거나', options: ['거나','고','서','면'],          uz: "Kino ko'raman yoki sport qilaman." },
          { sentence: '재미있___ 도 재미있어요.',     answer: '지만', options: ['지만','고','서','면'],          uz: "Qiyin, lekin ham qiziqarli." },
          { sentence: '주말에 ___ 자거나 운동해요.', answer: '보통', options: ['보통','항상','가끔','절대'],    uz: "Dam olish kunlari odatda uxlayman yoki sport qilaman." },
        ],
        scramble: [
          { kr: '취미',   uz: 'hobbi' },
          { kr: '음악',   uz: 'musiqa' },
          { kr: '영화',   uz: 'kino' },
          { kr: '주말',   uz: 'dam olish kuni' },
          { kr: '여가',   uz: "bo'sh vaqt" },
        ],
      },
    },
    quiz: [
      { question: "'취미 (chwimi)' nima degani?",          options: ['Kasb','Hobbi','Sport','Ta\'lim'],                     correct_index: 1 },
      { question: "'-는 것' nimani bildiradi?",             options: ['Fe\'lni \'ish/ishni\' ma\'nosiga o\'tkazadi','Kelasi zamon','Inkor','Taklif'], correct_index: 0 },
      { question: "'같이 운동할까요?' nimani anglatadi?",   options: ['Men sport qilaman','Birga sport qilamizmi?','Sportni yoqtirasizmi?','Qachon sport qilasiz?'], correct_index: 1 },
      { question: "'-거나' nimani anglatadi?",              options: ['va','lekin','yoki','shuning uchun'],                   correct_index: 2 },
      { question: "'재미있어요' nima degani?",              options: ['Zerikarli','Qiziq / zavqli','Qiyin','Yoqimsiz'],      correct_index: 1 },
      { question: "'혼자' nimani anglatadi?",               options: ['Birga',"Yolg'iz",'Do\'stlar bilan','Oila bilan'],    correct_index: 1 },
      { question: "'스트레스 해소' nimani anglatadi?",      options: ['Stress olish','Stressni chiqarish','Dam olish','Sport qilish'], correct_index: 1 },
    ],
  },

];

// ────────────────────────────────────────────
// DB ga saqlash — audio_urls bilan
// ────────────────────────────────────────────
async function seed() {
  console.log('EPS-TOPIK 1-daraja seed boshlandi...\n');
  console.log('Track: EPS-TOPIK | Level: 1 | Darslar: 10 ta');
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

    const icons = ['👋','👨‍👩‍👧','🕒','📍','🍚','🛍️','⏰','🌤️','🚌','🎨'];
    console.log(`  ✅  ${icons[lessonData.order_in_level-1]} Dars ${lessonData.order_in_level}: ${lessonData.title_kr} (ID: ${saved.id})`);
  }

  console.log('\n═══════════════════════════════════════════════════');
  console.log('✅ EPS-TOPIK 1-daraja seed muvaffaqiyatli yakunlandi!');
  console.log('═══════════════════════════════════════════════════');
  console.log(`\n  📚 Darslar:    ${LESSONS.length} ta`);
  console.log(`  🎯 Quiz:       ${LESSONS.length * 7} ta (har darsga 7 ta)`);
  console.log(`  🔊 Audio keys: ${LESSONS.length * 37} ta (har darsga 37 ta)`);
  console.log(`  💼 Track:      EPS-TOPIK`);
  console.log('\n  📋 Darslar ro\'yxati:');
  console.log('  1️⃣  자기소개 — O\'zini tanishtirish');
  console.log('  2️⃣  가족 소개 — Oilani tanishtirish');
  console.log('  3️⃣  시간과 날짜 — Vaqt va sana (Ish jadvali)');
  console.log('  4️⃣  장소와 위치 — Joy va joylashuv (Zavod ichida)');
  console.log('  5️⃣  음식 — Ovqat (Zavod oshxonasida)');
  console.log('  6️⃣  쇼핑 — Xarid qilish (Kundalik buyumlar)');
  console.log('  7️⃣  하루 일과 — Kun tartibi (Ishchi kuni)');
  console.log('  8️⃣  날씨와 계절 — Ob-havo va fasllar');
  console.log('  9️⃣  교통 — Transport (Zavod va shahar)');
  console.log('  🔟 취미와 여가 — Hobbi va dam olish');
  console.log('\n📢 Keyingi qadam:');
  console.log('   node src/seeds/eps_topik_level2.js');
  console.log('   node src/scripts/generate-audio.js --track eps --level 1\n');

  await db.end();
}

seed().catch(err => {
  console.error('❌ Xatolik:', err.message);
  process.exit(1);
});
