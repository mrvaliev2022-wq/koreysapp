// backend/src/seeds/eps_topik_level4.js
// EPS-TOPIK 4-daraja: 10 ta to'liq dars (Lesson 31-40)
// Manba: Eps-Topik_2_.docx (31-40 mavzular)
// Audio URL: {CDN_URL}/{lessonId}-{key}.mp3 — Edge TTS (ko-KR-SunHiNeural)
// PC / iOS / Android — to'liq ishlaydigan
// Usage: node src/seeds/eps_topik_level4.js

require('dotenv').config({ path: '../../.env' });
const db = require('../db');

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
  // DARS 31: 복장과 근무 태도 — Ish kiyimi va munosabat
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 4, order_in_level: 1,
    title_kr: '복장과 근무 태도',
    title_uz: 'Ish kiyimi va ishga munosabat',
    is_free: true,
    content: {
      topic: {
        kr: '새 작업복이 마음에 들어요? 네, 예전보다 가벼워서 좋아요. 지퍼를 목까지 올릴 수 있어서 안전해요. 지퍼를 올리는 게 안전하고 단정해 보여요. 성실하게 일하고 존댓말을 사용해야 해요.',
        uz: "Yangi ish kiyimi yoqdimi? Ha, eskisidan yengilroq, yaxshi. Zipni oxirigacha yopsa xavfsiz. Yopilgan holat xavfsiz va ozoda ko'rinadi. Mehnatsevarlik bilan ishlab, hurmatli nutq ishlatish kerak."
      },
      grammar: {
        explanation: `-아/어 보이다 — "...dek ko'rinadi" (ko'rinish/taxmin)

Tuzilish: sifat + 아/어 보이다

• 작업복이 작아 보여요   → Ish kiyimi kichik ko'rinadi
• 음식이 맛있어 보여요  → Ovqat mazali ko'rinadi
• 단정해 보여요          → Ozoda ko'rinadi
• 피곤해 보여요          → Charchagandek ko'rinadi

💡 -아/어 보이다 vs -는 것 같다:
보이다  = ko'rinish asosida (vizual)
것 같다 = taxmin, fikr asosida

-게 — harakat usuli "...qilib, ...cha"

Tuzilish: sifat + 게

• 성실하게 일해요   → Mehnatsevarlik bilan ishlaydi
• 맛있게 먹어요    → Mazali qilib yeydi
• 안전하게 해요    → Xavfsiz qilib qiladi
• 빠르게 해요      → Tez qilib qiladi`,
        examples: [
          { kr: '유니폼이 파란색이라서 시원해 보여요.',      uz: "Uniforma ko'k rangda bo'lgani uchun salqin ko'rinadi." },
          { kr: '작업복의 지퍼를 올리면 안전하고 단정해 보여요.', uz: "Ish kiyim zipni yopsangiz xavfsiz va ozoda ko'rinadi." },
          { kr: '성실하게 일하는 직원이 회사에서 인정받아요.', uz: "Mehnatsevarlik bilan ishlaydigan xodim korxonada tan olinadi." },
          { kr: '새 작업복이 예전 것보다 가볍고 편하게 보여요.', uz: "Yangi ish kiyimi eski kiyimdan yengilroq va qulaydek ko'rinadi." },
          { kr: '항상 존댓말을 사용하고 예의 바르게 행동하세요.', uz: "Doim hurmatli nutq ishlatib, odobli harakat qiling." },
        ]
      },
      vocabulary: [
        { kr: '작업복',       romanization: 'jageobbok',     uz: 'ish kiyimi' },
        { kr: '유니폼',       romanization: 'yunipom',       uz: 'uniforma' },
        { kr: '정장',         romanization: 'jeongjang',     uz: 'rasmiy kiyim' },
        { kr: '갈아입다',     romanization: 'garaipda',      uz: 'kiyim almashtirmoq' },
        { kr: '벗다',         romanization: 'beotda',        uz: 'yechmoq' },
        { kr: '단추를 잠그다',romanization: 'danchureul jamgeuda', uz: 'tugmani yopmoq' },
        { kr: '지퍼를 올리다',romanization: 'jipeoreul ollida', uz: 'zipni yopmoq' },
        { kr: '지퍼를 내리다',romanization: 'jipeoreul naerida', uz: 'zipni ochmoq' },
        { kr: '넥타이를 매다',romanization: 'nektaireul maeda', uz: 'galstuk taqmoq' },
        { kr: '단정하다',     romanization: 'danjeonghada',  uz: 'ozoda' },
        { kr: '성실하다',     romanization: 'seongssilhada', uz: 'mehnatkash' },
        { kr: '존댓말',       romanization: 'jondaetmal',    uz: 'hurmatli nutq' },
        { kr: '반말',         romanization: 'banmal',        uz: 'oddiy (hurmatsiz) nutq' },
        { kr: '칭찬하다',     romanization: 'chingchanhada', uz: 'maqtamoq' },
        { kr: '존중하다',     romanization: 'jonjunghada',   uz: 'hurmat qilmoq' },
        { kr: '배려하다',     romanization: 'baeryeohada',   uz: "e'tiborli bo'lmoq" },
        { kr: '긍정적이다',   romanization: 'geungjeongjeogida', uz: 'ijobiy' },
        { kr: '무시하다',     romanization: 'musihada',      uz: 'mensimaslik' },
        { kr: '예의가 있다',  romanization: 'yeuiga itda',   uz: 'odobli' },
        { kr: '안전하다',     romanization: 'anjeonhada',    uz: 'xavfsiz' },
      ],
      examples: [
        { kr: '반장님, 새 작업복이 예전 것보다 가벼워서 좋아요.',       uz: "Brigadir, yangi ish kiyimi eskisidan yengilroq, yaxshi." },
        { kr: '지퍼를 목까지 올리면 안전하고 단정해 보여요.',            uz: "Zipni to'liq yopsangiz xavfsiz va ozoda ko'rinadi." },
        { kr: '직장에서는 항상 존댓말을 사용해야 해요.',                 uz: "Ish joyida doim hurmatli nutq ishlatish kerak." },
        { kr: '성실하게 일하는 사람이 항상 인정받아요.',                  uz: "Mehnatsevarlik bilan ishlaydigan odam doim tan olinadi." },
        { kr: '감사합니다, 죄송합니다, 부탁드립니다 — 항상 기억하세요.', uz: "Rahmat, uzr, iltimos — doim esda tuting." },
      ],
      dialog: [
        { speaker: '반장님', kr: '칼로 씨, 새 작업복이 마음에 들어요?',                uz: "Karlo, yangi ish kiyimi yoqdimi?" },
        { speaker: '칼로',   kr: '네, 반장님. 새 작업복이 예전보다 가벼워서 좋아요.',  uz: "Ha, brigadir. Yangi ish kiyimi eskisidan yengilroq, yaxshi." },
        { speaker: '반장님', kr: '그리고 지퍼를 목까지 올릴 수 있어서 안전해요.',      uz: "Va zipni oxirigacha yopsa xavfsiz bo'ladi." },
        { speaker: '칼로',   kr: '그런데 지퍼를 조금만 내려도 돼요? 불편해서요.',      uz: "Lekin zipni biroz ochsam bo'ladimi? Noqulay." },
        { speaker: '반장님', kr: '지퍼를 올리는 게 안전하고 단정해 보여요.',           uz: "Yopilgan holat xavfsiz va ozoda ko'rinadi." },
        { speaker: '칼로',   kr: '네, 알겠습니다. 앞으로 성실하게 일하겠습니다.',     uz: "Tushundim. Bundan keyin mehnatsevarlik bilan ishlayman." },
      ],
      notes: [
        "-아/어 보이다: ko'rinish: 작아 보여요(kichik ko'rinadi), 피곤해 보여요(charchaganek ko'rinadi).",
        "-게: usul: 성실하게(mehnatsevarlik bilan), 안전하게(xavfsiz tarzda), 빠르게(tez).",
        "직장 언어 예절: 부장님/과장님/반장님 — rahbarlarga; 이름+씨 — hamkasblarga.",
        "존댓말 (hurmatli nutq) — Koreyada ish joyida majburiy: -요/-ㅂ니다 shakli.",
        "작업복 + 안전모 + 안전화 — EPS ishchisi uchun majburiy 3 ta xavfsizlik atributi.",
      ],
      games: {
        matchPairs: [
          { kr: '작업복',   uz: 'ish kiyimi' },
          { kr: '단정하다', uz: 'ozoda' },
          { kr: '성실하다', uz: 'mehnatkash' },
          { kr: '존댓말',   uz: 'hurmatli nutq' },
          { kr: '칭찬하다', uz: 'maqtamoq' },
          { kr: '배려하다', uz: "e'tiborli bo'lmoq" },
        ],
        fillBlank: [
          { sentence: '작업복이 작아 ___ 요.',             answer: '보여',  options: ['보여','해','가','봐'],           uz: "Ish kiyimi kichik ko'rinadi." },
          { sentence: '성실하___ 일해요.',                 answer: '게',    options: ['게','고','서','면'],             uz: "Mehnatsevarlik bilan ishlaydi." },
          { sentence: '지퍼를 올리면 안전하고 단정해 ___.',answer: '보여요',options: ['보여요','해요','가요','봐요'],    uz: "Zipni yopsangiz xavfsiz va ozoda ko'rinadi." },
          { sentence: '항상 ___ 을 사용해야 해요.',        answer: '존댓말',options: ['존댓말','반말','한국어','영어'],  uz: "Doim hurmatli nutq ishlatish kerak." },
          { sentence: '안전하___ 작업하세요.',             answer: '게',    options: ['게','고','서','면'],             uz: "Xavfsiz tarzda ishlang." },
        ],
        scramble: [
          { kr: '작업복', uz: 'ish kiyimi' },
          { kr: '유니폼', uz: 'uniforma' },
          { kr: '단정',   uz: 'ozoda' },
          { kr: '성실',   uz: 'mehnatkash' },
          { kr: '존중',   uz: 'hurmat' },
        ],
      },
    },
    quiz: [
      { question: "'작아 보여요' — '-아/어 보이다' nima bildiradi?", options: ['haqiqiy holat','ko\'rinish asosida taxmin','o\'tgan tajriba','shart'],   correct_index: 1 },
      { question: "'성실하게' — '-게' nima vazifa bajaradi?",         options: ['sifat yasaydi','harakat usuli bildiradi','sabab bildiradi','lekin'],    correct_index: 1 },
      { question: "'존댓말' nimani anglatadi?",                        options: ['oddiy nutq','hurmatli nutq','Koreys tili','ish joyida gapirish'],       correct_index: 1 },
      { question: "'단정하다' nimani anglatadi?",                      options: ['xavfli','mehnatkash','ozoda','ijobiy'],                                 correct_index: 2 },
      { question: "'칭찬하다' nimani anglatadi?",                      options: ['maqtamoq','hurmat qilmoq','mensimaslik',"e'tibor bermoq"],              correct_index: 0 },
      { question: "Ish joyida rahbarga qanday murojaat qilinadi?",     options: ['이름만','씨','부장님/반장님 kabi unvon bilan','반말 bilan'],             correct_index: 2 },
      { question: "'-아/어 보이다' va '-는 것 같다' farqi?",           options: ['Farq yo\'q','보이다=vizual; 것 같다=fikr asosida','것 같다=vizual','Ikkalasi bir xil'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 32: 회사 시설 이용 — Kompaniya jihozlari
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 4, order_in_level: 2,
    title_kr: '회사 시설 이용',
    title_uz: "Kompaniya jihozlaridan foydalanish",
    is_free: true,
    content: {
      topic: {
        kr: '기숙사는 불편하지요? 불편하지는 않지만 지켜야 되는 규칙이 있어요. 기숙사에서는 여러 사람이 함께 생활하잖아요, 그래서 조용히 해야 해요. 음식을 준비해 놓았어요. 구내식당 음식이 괜찮고 가격도 싸요.',
        uz: "Yotoqxona noqulaymi? Noqulay emas, lekin amal qilinishi kerak qoidalar bor. Yotoqxonada ko'p odam yashaydi-ku, shuning uchun jim bo'lish kerak. Ovqatni tayyorlab qo'ydim. Korxona oshxonasi ovqati yaxshi va arzon."
      },
      grammar: {
        explanation: `-잖아요 — "axir..., bilasiz-ku" (ma'lum narsani eslatish)

• 기숙사에서는 여러 사람이 같이 생활하잖아요
  → Yotoqxonada ko'p odam yashaydi-ku
• 규칙을 지켜야 하잖아요
  → Qoidalarga amal qilish kerak-ku
• 한국말 어렵잖아요
  → Koreys tili qiyin-ku

💡 -잖아요: ikkala taraf biladigan ma'lumotni eslatadi.
Og'zaki nutqda juda ko'p ishlatiladi.

-아/어 놓다 — "oldindan qilib qo'yish" (natija saqlanadi)

• 문을 열어 놓았어요     → Eshikni ochib qo'ydim
• 음식을 준비해 놓았어요 → Ovqatni tayyorlab qo'ydim
• 자료를 인쇄해 놓았어요 → Hujjatni bosib qo'ydim

💡 Farq:
-아/어 두다  = saqlab qo'yish (o'xshash ma'no)
-아/어 놓다  = qilib qo'yish, natija qoladi`,
        examples: [
          { kr: '기숙사에서는 여러 사람이 생활하잖아요. 그러니 시끄럽게 하면 안 돼요.', uz: "Yotoqxonada ko'p odam yashaydi-ku. Shuning uchun shovqin qilish mumkin emas." },
          { kr: '내일 일찍 출근해야 하잖아요. 일찍 자야 해요.',                        uz: "Ertaga erta ishga borish kerak-ku. Erta uxlash kerak." },
          { kr: '오늘 아침에 식사를 미리 준비해 놓았어요.',                             uz: "Bugun ertalab ovqatni oldindan tayyorlab qo'ydim." },
          { kr: '내일 쓸 작업복을 세탁해 놓았어요.',                                   uz: "Ertaga kiyiladigan ish kiyimini yuvintirib qo'ydim." },
          { kr: '구내식당에서는 식권을 받아서 줄을 서야 해요.',                         uz: "Korxona oshxonasida ovqat talonini olib navbatda turish kerak." },
        ]
      },
      vocabulary: [
        { kr: '기숙사',     romanization: 'gisuska',       uz: 'yotoqxona' },
        { kr: '규칙',       romanization: 'gyuchik',       uz: 'qoida' },
        { kr: '같이 생활하다',romanization:'gachi saenghwalhada',uz: 'birga yashamoq' },
        { kr: '청소하다',   romanization: 'cheongsohada',  uz: 'tozalamoq' },
        { kr: '정리하다',   romanization: 'jeongrihada',   uz: 'tartibga keltirmoq' },
        { kr: '시끄럽다',   romanization: 'sikkeureopda',  uz: 'shovqinli' },
        { kr: '조용하다',   romanization: 'joyonghada',    uz: 'tinch' },
        { kr: '구내식당',   romanization: 'gunaesikdang',  uz: 'korxona oshxonasi' },
        { kr: '식권',       romanization: 'sikgwon',       uz: 'ovqat taloni' },
        { kr: '줄을 서다',  romanization: 'jureul seoda',  uz: 'navbatda turmoq' },
        { kr: '반찬',       romanization: 'banchan',       uz: 'garnir' },
        { kr: '남기다',     romanization: 'namgida',       uz: 'qoldirmoq' },
        { kr: '치우다',     romanization: 'chiuda',        uz: "yig'ishtirmoq" },
        { kr: '불편하다',   romanization: 'bulpyeonhada',  uz: 'noqulay' },
        { kr: '편하다',     romanization: 'pyeonhada',     uz: 'qulay' },
        { kr: '지키다',     romanization: 'jikida',        uz: 'rioya qilmoq' },
        { kr: '금지',       romanization: 'geumji',        uz: 'taqiq' },
        { kr: '이용하다',   romanization: 'iyonghada',     uz: 'foydalanmoq' },
        { kr: '방해하다',   romanization: 'banghaehada',   uz: 'xalaqit bermoq' },
        { kr: '서로',       romanization: 'seoro',         uz: 'bir-biriga' },
      ],
      examples: [
        { kr: '기숙사에서는 밤 11시 이후에 큰 소리를 내면 안 돼요.',      uz: "Yotoqxonada kechasi soat 11 dan keyin baland ovoz chiqarish mumkin emas." },
        { kr: '구내식당을 이용할 때는 식권을 미리 준비해 놓아야 해요.',   uz: "Korxona oshxonasidan foydalanganda ovqat talonini oldindan tayyorlab qo'yish kerak." },
        { kr: '기숙사 공용 시설을 사용한 후에는 항상 정리해 놓으세요.',   uz: "Yotoqxona umumiy jihozlaridan foydalangandan keyin doim tartiblab qo'ying." },
        { kr: '음식을 남기지 않고 먹는 것이 예의잖아요.',                  uz: "Ovqatni qoldirmasdan yeyish odoblilik-ku." },
        { kr: '기숙사 생활은 불편할 수도 있지만 서로 배려하면 괜찮아요.', uz: "Yotoqxona hayoti noqulay bo'lishi mumkin, lekin bir-biriga e'tibor qilsa yaxshi." },
      ],
      dialog: [
        { speaker: 'A', kr: '기숙사는 불편하지요?',                                    uz: "Yotoqxona noqulaymi?" },
        { speaker: 'B', kr: '불편하지는 않지만 지켜야 되는 규칙이 있어요.',            uz: "Noqulay emas, lekin amal qilinishi kerak qoidalar bor." },
        { speaker: 'A', kr: '어떤 규칙이 있어요?',                                     uz: "Qanday qoidalar bor?" },
        { speaker: 'B', kr: '기숙사에서는 여러 사람이 함께 생활하잖아요, 조용히 해야 해요.', uz: "Yotoqxonada ko'p odam yashaydi-ku, jim bo'lish kerak." },
        { speaker: 'A', kr: '구내식당은 어때요?',                                      uz: "Korxona oshxonasi qanday?" },
        { speaker: 'B', kr: '음식이 괜찮고 가격도 싸요. 식권을 미리 사 놓아야 해요.', uz: "Ovqat yaxshi va arzon. Ovqat talonini oldindan sotib qo'yish kerak." },
      ],
      notes: [
        "-잖아요: eslatish: 생활하잖아요(yashaydi-ku), 어렵잖아요(qiyin-ku).",
        "-아/어 놓다: oldindan qilish: 준비해 놓다(tayyorlab qo'yish), 열어 놓다(ochib qo'yish).",
        "기숙사 qoidalari: soat 11 dan keyin jim; tozalik; umumiy joylarni saqlash.",
        "구내식당 tartibi: 식권 → 줄을 서다 → 식판 → ovqatlanish → 치우다.",
        "서로 배려하다 — bir-biriga e'tibor qilish: yotoqxona hayotining muhim qoidasi.",
      ],
      games: {
        matchPairs: [
          { kr: '기숙사', uz: 'yotoqxona' },
          { kr: '식권',   uz: 'ovqat taloni' },
          { kr: '조용하다',uz: 'tinch' },
          { kr: '치우다', uz: "yig'ishtirmoq" },
          { kr: '방해하다',uz: 'xalaqit bermoq' },
          { kr: '서로',   uz: 'bir-biriga' },
        ],
        fillBlank: [
          { sentence: '여러 사람이 같이 생활하___요.',         answer: '잖아',  options: ['잖아','지만','서','면'],         uz: "Ko'p odam birga yashaydi-ku." },
          { sentence: '음식을 준비해 ___ 어요.',               answer: '놓았',  options: ['놓았','봤','왔','갔'],           uz: "Ovqatni tayyorlab qo'ydim." },
          { sentence: '구내식당에서 ___ 를 받아야 해요.',       answer: '식권',  options: ['식권','작업복','돈','약'],       uz: "Korxona oshxonasida ovqat talonini olish kerak." },
          { sentence: '기숙사에서는 ___ 해야 해요.',           answer: '조용히',options: ['조용히','빠르게','크게','많이'], uz: "Yotoqxonada jim bo'lish kerak." },
          { sentence: '문을 열어 ___ 어요.',                   answer: '놓았',  options: ['놓았','봤','왔','갔'],           uz: "Eshikni ochib qo'ydim." },
        ],
        scramble: [
          { kr: '기숙사', uz: 'yotoqxona' },
          { kr: '규칙',   uz: 'qoida' },
          { kr: '식권',   uz: 'talon' },
          { kr: '청소',   uz: 'tozalash' },
          { kr: '조용',   uz: 'jim' },
        ],
      },
    },
    quiz: [
      { question: "'-잖아요' nimani anglatadi?",                options: ['savol','axir..., bilasiz-ku (eslatish)','buyruq','inkor'],              correct_index: 1 },
      { question: "'-아/어 놓다' nimani bildiradi?",             options: ['hozir qilmoq','tajriba','oldindan qilib qo\'yish','keyin qilmoq'],    correct_index: 2 },
      { question: "'식권' nimani anglatadi?",                    options: ['ish kiyimi','ovqat taloni','transport kartasi','bank kartasi'],         correct_index: 1 },
      { question: "'줄을 서다' nimani anglatadi?",               options: ['tartiblamoq','navbatda turmoq','yig\'ishtirmoq','kechikmoq'],          correct_index: 1 },
      { question: "'방해하다' nimani anglatadi?",                options: ['yordam bermoq','xalaqit bermoq','qo\'llab-quvvatlash','tushunmoq'],    correct_index: 1 },
      { question: "Yotoqxona asosiy qoidasi qaysi?",             options: ['erkin bo\'lish','tinch bo\'lish va boshqalarga xalaqit bermaslik','doim ovqat pishirish','kechgacha o\'tirish'], correct_index: 1 },
      { question: "'-아/어 놓다' va '-아/어 두다' farqi?",       options: ['Katta farq bor','O\'xshash ma\'no, ikkalasi ham qilib qo\'yish','두다 = hozir qilish','놓다 = o\'tmish'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 33: 동료와의 관계 — Hamkasblar bilan munosabat
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 4, order_in_level: 3,
    title_kr: '동료와의 관계',
    title_uz: "Hamkasblar bilan munosabat",
    is_free: false,
    content: {
      topic: {
        kr: '회사 분위기가 어때요? 우리 회사 분위기는 좋은 편이에요. 동료들과는 잘 지내요? 네, 다들 친절하고 서로 도와주거든요. 갈등은 없어요? 가끔 있지만 잘 해결해요. 저는 조용한 편이에요.',
        uz: "Ish joyingiz muhiti qanday? Bizning korxona muhiti odatda yaxshi. Hamkasblaringiz bilan yaxshi chiqishasizmi? Ha, hammasi mehribon va bir-biriga yordam beradi. Muammolar yo'qmi? Ba'zida bo'ladi, lekin yaxshi hal qilamiz. Men odatda jimman."
      },
      grammar: {
        explanation: `-는/(으)ㄴ 편이다 — "odatda..., ko'proq... tomonga" (tendensiya)

Fe'l bilan: -는 편이다
• 저는 일찍 자는 편이에요   → Men odatda erta uxlayman

Sifat bilan: -(으)ㄴ 편이다
• 저는 조용한 편이에요        → Men odatda jimman
• 우리 회사 분위기는 좋은 편이에요 → Bizning korxona muhiti odatda yaxshi

💡 -편이다: mutlaq emas, nisbatan/odatda shunday degani
Inglizcha: "tend to", "rather"

-거든요 — sababni yumshoq tushuntirish

• 일이 많아서 바쁘거든요    → Ish ko'p bo'lgani uchun bandman
• 그 사람은 친절하거든요   → U odam mehribon (shuning uchun...)
• 날씨가 추워서 힘들거든요  → Havo sovuq bo'lgani uchun qiyin

💡 -거든요: qo'shimcha ma'lumot bera turib sabab tushuntirish;
birinchi aytilmagan narsani tushuntiradi`,
        examples: [
          { kr: '저는 내성적인 편이라서 처음에는 친해지기 어려워요.',       uz: "Men odatda uyatchanroqman, shuning uchun dastlab do'stlashish qiyin." },
          { kr: '우리 팀 분위기는 좋은 편이에요. 다들 서로 도와줘요.',      uz: "Bizning jamoa muhiti odatda yaxshi. Hammasi bir-biriga yordam beradi." },
          { kr: '그 동료가 잘 도와주거든요. 그래서 고마워요.',               uz: "O'sha hamkasb yaxshi yordam beradi. Shuning uchun minnatdorman." },
          { kr: '저는 말이 적은 편이지만 일은 성실하게 해요.',               uz: "Men odatda kamgapman, lekin mehnat qilishda mehnatkashman." },
          { kr: '갈등이 생기면 대화로 해결하는 편이에요.',                   uz: "Muammo chiqsa suhbat orqali hal qilish tomondaman." },
        ]
      },
      vocabulary: [
        { kr: '동료',     romanization: 'dongyo',       uz: 'hamkasb' },
        { kr: '분위기',   romanization: 'bunwigi',      uz: 'muhit, atmosfera' },
        { kr: '친하다',   romanization: 'chinhada',     uz: 'yaqin (do\'stona)' },
        { kr: '도와주다', romanization: 'dowajuda',     uz: 'yordam bermoq' },
        { kr: '협력하다', romanization: 'hyeomnyeokhada',uz: 'hamkorlik qilmoq' },
        { kr: '이해하다', romanization: 'ihaehada',     uz: 'tushunmoq' },
        { kr: '갈등',     romanization: 'galdeung',     uz: 'kelishmovchilik' },
        { kr: '싸우다',   romanization: 'ssauda',       uz: 'janjallashmoq' },
        { kr: '해결하다', romanization: 'haegyeolhada', uz: 'hal qilmoq' },
        { kr: '자유롭다', romanization: 'jayuropda',    uz: 'erkin' },
        { kr: '엄격하다', romanization: 'eomgyeokhada', uz: "qat'iy" },
        { kr: '편하다',   romanization: 'pyeonhada',    uz: 'qulay, erkin' },
        { kr: '내성적이다',romanization:'naeseongjeoghida',uz: 'uyatchan, ichki' },
        { kr: '적극적이다',romanization:'jeokgeukjeoghida',uz: 'faol, tashabbuskor' },
        { kr: '회식',     romanization: 'hoesik',       uz: 'jamoaviy ovqatlanish' },
        { kr: '야근',     romanization: 'yageun',       uz: "qo'shimcha ish (kechqurun)" },
        { kr: '팀워크',   romanization: 'timwokeu',     uz: 'jamoa ishi' },
        { kr: '소통하다', romanization: 'sotonghada',   uz: 'muloqot qilmoq' },
        { kr: '존중하다', romanization: 'jonjunghada',  uz: 'hurmat qilmoq' },
        { kr: '칭찬하다', romanization: 'chingchanhada',uz: 'maqtamoq' },
      ],
      examples: [
        { kr: '저는 조용한 편이지만 필요할 때는 적극적으로 말해요.',      uz: "Men odatda jimman, lekin kerak bo'lganda faol gapiraman." },
        { kr: '우리 팀은 서로 도와주거든요. 그래서 일이 잘 돼요.',        uz: "Bizning jamoamiz bir-biriga yordam beradi. Shuning uchun ish yaxshi ketadi." },
        { kr: '한국에서는 회식 문화가 있어서 같이 밥을 먹는 편이에요.',   uz: "Koreyada jamoaviy ovqatlanish madaniyati bor, shuning uchun birga ovqat yeydigan tomonda." },
        { kr: '갈등이 생기면 직접 대화로 해결하는 편이 좋아요.',           uz: "Kelishmovchilik chiqsa bevosita suhbat orqali hal qilish tomoni yaxshi." },
        { kr: '저는 새 동료들과 빨리 친해지는 편이에요.',                  uz: "Men yangi hamkasblar bilan tez do'stlashadigan tomondaman." },
      ],
      dialog: [
        { speaker: 'A', kr: '회사 분위기가 어때요?',                        uz: "Ish joyingiz muhiti qanday?" },
        { speaker: 'B', kr: '우리 회사 분위기는 좋은 편이에요.',             uz: "Bizning korxona muhiti odatda yaxshi." },
        { speaker: 'A', kr: '동료들과는 잘 지내요?',                        uz: "Hamkasblaringiz bilan yaxshi chiqishasizmi?" },
        { speaker: 'B', kr: '네, 다들 친절하고 서로 도와주거든요.',          uz: "Ha, hammasi mehribon va bir-biriga yordam beradi." },
        { speaker: 'A', kr: '갈등은 없어요?',                               uz: "Muammolar yo'qmi?" },
        { speaker: 'B', kr: '가끔 있지만 잘 해결하는 편이에요.',             uz: "Ba'zida bo'ladi, lekin odatda yaxshi hal qilamiz." },
      ],
      notes: [
        "-는/(으)ㄴ 편이다: tendensiya: 조용한 편(odatda jim), 좋은 편(odatda yaxshi).",
        "-거든요: yumshoq sabab: 친절하거든요(mehribon-da, shuning uchun...).",
        "회식 — Koreyada jamoaviy ovqatlanish: hamkasblar bilan birga tushlik/kechki ovqat.",
        "갈등 해결 (muammo hal qilish): bevosita suhbat yaxshiroq; do'konchilikdan saqlanish.",
        "내성적 vs 적극적: ishda ikkalasi ham kerak — vaziyatga qarab tanlash.",
      ],
      games: {
        matchPairs: [
          { kr: '동료',     uz: 'hamkasb' },
          { kr: '분위기',   uz: 'muhit' },
          { kr: '갈등',     uz: 'kelishmovchilik' },
          { kr: '협력',     uz: 'hamkorlik' },
          { kr: '해결하다', uz: 'hal qilmoq' },
          { kr: '회식',     uz: 'jamoaviy ovqatlanish' },
        ],
        fillBlank: [
          { sentence: '우리 회사 분위기는 좋은 ___ 이에요.',  answer: '편',    options: ['편','쪽','것','만'],            uz: "Bizning korxona muhiti odatda yaxshi." },
          { sentence: '저는 조용한 ___ 이에요.',              answer: '편',    options: ['편','것','쪽','만'],            uz: "Men odatda jimman." },
          { sentence: '다들 친절하고 도와주___ 요.',          answer: '거든',  options: ['거든','잖아','는데','지만'],    uz: "Hammasi mehribon va yordam beradi-da." },
          { sentence: '갈등이 생기면 대화로 해결하는 ___.',   answer: '편이에요',options: ['편이에요','것이에요','만이에요','뿐이에요'],uz:"Kelishmovchilik chiqsa suhbat orqali hal qiladigan tomondaman."},
          { sentence: '서로 ___ 하면 팀워크가 좋아져요.',    answer: '협력',  options: ['협력','갈등','싸움','무시'],    uz: "Bir-biriga hamkorlik qilsa jamoa ishi yaxshilanadi." },
        ],
        scramble: [
          { kr: '동료',   uz: 'hamkasb' },
          { kr: '분위기', uz: 'muhit' },
          { kr: '갈등',   uz: 'muammo' },
          { kr: '협력',   uz: 'hamkorlik' },
          { kr: '회식',   uz: 'jamoaviy ovqat' },
        ],
      },
    },
    quiz: [
      { question: "'-는/(으)ㄴ 편이다' nimani bildiradi?",      options: ['mutlaq holat','odatda/ko\'proq shunday (tendensiya)','o\'tgan zamon','kelajak'],  correct_index: 1 },
      { question: "'-거든요' qanday vazifasi bor?",              options: ['savol','buyruq','sababni yumshoq tushuntirish','inkor'],                           correct_index: 2 },
      { question: "'갈등' nimani anglatadi?",                   options: ['hamkorlik','do\'stlik','kelishmovchilik','muhit'],                                 correct_index: 2 },
      { question: "'회식' nimani anglatadi?",                   options: ['ish kiyimi','jamoaviy ovqatlanish','qo\'shimcha ish','suhbat'],                   correct_index: 1 },
      { question: "'협력하다' nimani anglatadi?",               options: ['janjallashmoq','hal qilmoq','hamkorlik qilmoq','tushunmoq'],                      correct_index: 2 },
      { question: "'내성적이다' nimani anglatadi?",             options: ['faol','mehribon','uyatchan, ichki','qat\'iy'],                                    correct_index: 2 },
      { question: "Koreyada 회식 madaniyatining maqsadi?",      options: ['faqat ovqatlanish','jamoani mustahkamlash va hamkasblar bilan yaqinlashish','tezlik','ish muhokamasi'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 34: 성희롱 및 성추행 예방
  // Jinsiy zo'ravonlikning oldini olish
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 4, order_in_level: 4,
    title_kr: '성희롱 및 성추행 예방',
    title_uz: "Jinsiy zo'ravonlikning oldini olish",
    is_free: false,
    content: {
      topic: {
        kr: '회사에서 성희롱 예방 교육을 받았어요? 네, 어제 받았어요. 내용이 중요하던데요. 문제가 생기면 어떻게 해야 해요? 바로 신고하라고 했어요. 모든 직원은 서로 존중받아야 해요.',
        uz: "Korxonada jinsiy bezorilik oldini olish treningini oldingizmi? Ha, kecha oldim. Mazmuni muhim ekan. Muammo bo'lsa nima qilish kerak? Darhol xabar berish kerak deyishdi. Barcha xodimlar bir-birini hurmat qilishi kerak."
      },
      grammar: {
        explanation: `-던데요 — kuzatish + hayrat / fikr bildirish

Tuzilish: [fe'l/sifat] + 던데요

• 내용이 중요하던데요       → Mazmuni muhim ekan (ko'rdim/eshitdim)
• 그 사람이 친절하던데요   → U odam mehribon ekan
• 회사 규칙이 엄격하던데요 → Korxona qoidalari qat'iy ekan

💡 -던데요 = o'tgan kuzatish asosida hayrat/ma'lumot bildirish
"Ko'rib edim, ... ekan"

-(느)ㄴ다고/다고 하다 — boshqa gapni yetkazish (reported speech)

Fe'l: -ㄴ다고/는다고 하다
Sifat: -(으)ㄴ다고 하다
Buyruq: -(으)라고 하다

• 바로 신고하라고 했어요   → Darhol xabar berish kerak deyishdi
• 조심하라고 했어요        → Ehtiyot bo'lishni aytdi
• 교육을 받아야 한다고 합니다→ Trening olish kerak deyishdi`,
        examples: [
          { kr: '어제 성희롱 예방 교육을 받았는데 내용이 정말 중요하던데요.',   uz: "Kecha jinsiy bezorilik oldini olish treningini oldim, mazmuni juda muhim ekan." },
          { kr: '상사가 문제가 생기면 바로 신고하라고 했어요.',                 uz: "Rahbar muammo bo'lsa darhol xabar berishni aytdi." },
          { kr: '인사팀에서 모든 직원은 서로 존중해야 한다고 했어요.',           uz: "Kadrlar bo'limidan barcha xodimlar bir-birini hurmat qilishi kerak deyishdi." },
          { kr: '그 상황이 불편하던데요. 바로 말하는 것이 좋아요.',              uz: "O'sha holat noqulay ekan. Darhol aytish yaxshiroq." },
          { kr: '성희롱 피해자는 도움을 요청할 권리가 있다고 했어요.',           uz: "Jinsiy bezorilik jabrlanuvchisi yordam so'rash huquqi bor deyishdi." },
        ]
      },
      vocabulary: [
        { kr: '성희롱',     romanization: 'seonghilong',     uz: 'jinsiy bezorilik' },
        { kr: '성추행',     romanization: 'seongchusaeng',   uz: 'jinsiy tajovuz' },
        { kr: '피해자',     romanization: 'pihaeja',         uz: 'jabrlanuvchi' },
        { kr: '가해자',     romanization: 'gahaeja',         uz: 'aybdor' },
        { kr: '신고하다',   romanization: 'singohada',       uz: 'xabar bermoq' },
        { kr: '불쾌하다',   romanization: 'bulkwaehada',     uz: 'noqulay his qilmoq' },
        { kr: '예방하다',   romanization: 'yebanghada',      uz: 'oldini olmoq' },
        { kr: '주의하다',   romanization: 'juuihada',        uz: "ehtiyot bo'lmoq" },
        { kr: '교육',       romanization: 'gyoyuk',          uz: 'trening, ta\'lim' },
        { kr: '상담',       romanization: 'sangdam',         uz: 'maslahat' },
        { kr: '도움을 요청하다',romanization:'doumul yocheonghada',uz: 'yordam so\'ramoq' },
        { kr: '조치를 취하다',romanization:'jochireul chwihada',uz: 'choralar ko\'rmoq' },
        { kr: '인사팀',     romanization: 'insatim',         uz: 'kadrlar bo\'limi (HR)' },
        { kr: '권리',       romanization: 'gwolli',          uz: 'huquq' },
        { kr: '의무',       romanization: 'uimu',            uz: 'majburiyat' },
        { kr: '존중하다',   romanization: 'jonjunghada',     uz: 'hurmat qilmoq' },
        { kr: '보호하다',   romanization: 'bohohada',        uz: 'himoya qilmoq' },
        { kr: '위반하다',   romanization: 'wibanhada',       uz: 'buzmoq (qoida)' },
        { kr: '처벌하다',   romanization: 'cheobeolhada',    uz: 'jazolamoq' },
        { kr: '증거',       romanization: 'jeungeo',         uz: 'dalil' },
      ],
      examples: [
        { kr: '회사에서 성희롱 예방 교육은 모든 직원이 반드시 받아야 한다고 했어요.',  uz: "Korxonada jinsiy bezorilik oldini olish treningini barcha xodimlar albatta olishi kerak deyishdi." },
        { kr: '불편한 상황이 생기면 바로 인사팀에 신고하라고 했어요.',               uz: "Noqulay holat yuzaga kelsa darhol kadrlar bo'limiga xabar berish kerak deyishdi." },
        { kr: '그 직원이 갑자기 그런 말을 했던데요. 불쾌했어요.',                   uz: "O'sha xodim to'satdan shunday gap aytgan ekan. Noqulay bo'ldi." },
        { kr: '모든 직원은 상호 존중하는 분위기를 만들어야 한다고 했어요.',           uz: "Barcha xodimlar o'zaro hurmat muhitini yaratishi kerak deyishdi." },
        { kr: '성희롱 피해가 있으면 증거를 모아서 신고하라고 했어요.',               uz: "Jinsiy bezorilik bo'lsa dalillarni yig'ib xabar berish kerak deyishdi." },
      ],
      dialog: [
        { speaker: 'A', kr: '회사에서 성희롱 예방 교육을 받았어요?',             uz: "Korxonada jinsiy bezorilik oldini olish treningini oldingizmi?" },
        { speaker: 'B', kr: '네, 어제 받았어요. 내용이 중요하던데요.',            uz: "Ha, kecha oldim. Mazmuni muhim ekan." },
        { speaker: 'A', kr: '어떤 내용이었어요?',                               uz: "Qanday mazmun edi?" },
        { speaker: 'B', kr: '문제가 생기면 바로 신고하라고 했어요.',              uz: "Muammo bo'lsa darhol xabar berish kerak deyishdi." },
        { speaker: 'A', kr: '누구에게 신고해야 해요?',                           uz: "Kimga xabar berish kerak?" },
        { speaker: 'B', kr: '인사팀에 신고하면 된다고 했어요. 권리를 지켜야 해요.', uz: "Kadrlar bo'limiga xabar bersangiz bo'ladi deyishdi. Huquqni himoya qilish kerak." },
      ],
      notes: [
        "-던데요: o'tgan kuzatish: 중요하던데요(muhim ekan), 친절하던데요(mehribon ekan).",
        "-(으)라고 하다: buyruqni yetkazish: 신고하라고 했어요(xabar berish kerak deyishdi).",
        "성희롱 (jinsiy bezorilik) — Koreyada qonuniy jihatdan qat'iyan taqiqlangan.",
        "인사팀 (HR bo'limi) — muammo bo'lsa birinchi murojaat joyi.",
        "EPS ishchilari ham Koreya mehnat qonunlari bilan himoyalangan — bu huquqni bilish muhim.",
      ],
      games: {
        matchPairs: [
          { kr: '피해자',   uz: 'jabrlanuvchi' },
          { kr: '가해자',   uz: 'aybdor' },
          { kr: '신고하다', uz: 'xabar bermoq' },
          { kr: '예방하다', uz: 'oldini olmoq' },
          { kr: '권리',     uz: 'huquq' },
          { kr: '증거',     uz: 'dalil' },
        ],
        fillBlank: [
          { sentence: '내용이 중요하___ 요.',               answer: '던데',  options: ['던데','겠','는데','지만'],      uz: "Mazmuni muhim ekan." },
          { sentence: '바로 신고하___ 고 했어요.',           answer: '라',    options: ['라','면','고','서'],            uz: "Darhol xabar berish kerak deyishdi." },
          { sentence: '교육을 받아야 한___ 고 합니다.',      answer: '다',    options: ['다','면','고','서'],            uz: "Trening olish kerak deyishdi." },
          { sentence: '불편한 상황이 생기면 ___ 에 신고하세요.',answer:'인사팀',options:['인사팀','구내식당','기숙사','창고'],uz:"Noqulay holat yuzaga kelsa HR ga xabar bering."},
          { sentence: '모든 직원은 서로 ___ 해야 해요.',    answer: '존중',  options: ['존중','무시','싸움','방해'],    uz: "Barcha xodimlar bir-birini hurmat qilishi kerak." },
        ],
        scramble: [
          { kr: '예방',   uz: 'oldini olish' },
          { kr: '신고',   uz: 'xabar berish' },
          { kr: '권리',   uz: 'huquq' },
          { kr: '존중',   uz: 'hurmat' },
          { kr: '교육',   uz: 'trening' },
        ],
      },
    },
    quiz: [
      { question: "'-던데요' nimani bildiradi?",                   options: ['kelajak','o\'tgan kuzatish asosida hayrat/ma\'lumot','savol','buyruq'],   correct_index: 1 },
      { question: "'신고하라고 했어요' nimani anglatadi?",          options: ['Xabar bermoqchiman','Xabar berish kerak deyishdi','Xabar berdim','Xabar bering'], correct_index: 1 },
      { question: "'피해자' nimani anglatadi?",                    options: ['aybdor','guvoh','jabrlanuvchi','xodim'],                                  correct_index: 2 },
      { question: "'인사팀' nimani anglatadi?",                    options: ['ishlab chiqarish bo\'limi','kadrlar bo\'limi (HR)','xavfsizlik bo\'limi','oshxona'], correct_index: 1 },
      { question: "'성희롱 예방 교육' nima?",                      options: ['ish kiyimi haqida','jinsiy bezorilik oldini olish treningi','xavfsizlik treningi','til darslari'], correct_index: 1 },
      { question: "Muammo yuzaga kelganda nima qilish kerak?",     options: ['jim turish','o\'zi hal qilish','darhol HR ga xabar berish','do\'stlarga aytish'], correct_index: 2 },
      { question: "-(느)ㄴ다고 하다 qanday vazifasi bor?",          options: ['tasdiqlash','boshqa gapni yetkazish (reported speech)','inkor','savol'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 35: 작업장 관리 — Ish joyini boshqarish
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 4, order_in_level: 5,
    title_kr: '작업장 관리',
    title_uz: "Ish joyini boshqarish",
    is_free: false,
    content: {
      topic: {
        kr: '작업장을 깨끗하게 관리합시다. 사용할 자재는 창고에 잘 정리해 놓으세요. 위험한 물건은 따로 보관합시다. 안전 규칙을 지킵시다. 정리할 물건이 많아요. 같이 청소합시다.',
        uz: "Ish joyini toza saqlaylik. Ishlatiladigan materiallarni omborga tartibli joylashtiring. Xavfli narsalarni alohida saqlaylik. Xavfsizlik qoidalariga amal qilaylik. Tartibga solinadigan narsalar ko'p. Birga tozalaylik."
      },
      grammar: {
        explanation: `-(으)ㅂ시다 — "keling...qilaylik" (taklif/birgalikda qilish)

Tuzilish: [fe'l] + (으)ㅂ시다
• Undosh → 읍시다
• Unli   → ㅂ시다

• 같이 청소합시다          → Keling birga tozalaylik
• 안전 규칙을 지킵시다    → Xavfsizlik qoidalariga amal qilaylik
• 빨리 시작합시다           → Keling tez boshlaymiz
• 조심합시다               → Ehtiyot bo'laylik

💡 Rasmiy taklif shakli. Og'zaki nutqda ko'p.
비격식: 같이 하자 (do'stona)
격식: 같이 합시다 (rasmiy/ish joyi)

-(으)ㄹ — kelasi zamon/reja sifatlovchi (future modifier)

• 사용할 자재   → Ishlatiladigan material (reja)
• 정리할 물건   → Tartibga solinadigan buyumlar
• 먹을 음식     → Yeyiladigan ovqat

💡 -는 = hozir; -(으)ㄹ = kelajak/reja`,
        examples: [
          { kr: '작업 시작 전에 작업장을 함께 점검합시다.',         uz: "Ish boshlanishdan oldin ish joyini birga tekshiraylik." },
          { kr: '오늘 사용할 자재를 창고에서 미리 꺼내 놓았어요.',  uz: "Bugun ishlatiladigan materiallarni ombordan oldindan olib qo'ydim." },
          { kr: '위험 물질은 반드시 따로 보관합시다.',              uz: "Xavfli moddalarni albatta alohida saqlaylik." },
          { kr: '정리할 물건이 많으니 같이 합시다.',                uz: "Tartibga solinadigan narsalar ko'p, keling birga qilaylik." },
          { kr: '퇴근하기 전에 항상 작업장을 청소합시다.',           uz: "Ishdan chiqishdan oldin doim ish joyini tozalaylik." },
        ]
      },
      vocabulary: [
        { kr: '작업장',   romanization: 'jageobjang',    uz: 'ish joyi' },
        { kr: '환경',     romanization: 'hwangyeong',    uz: 'muhit' },
        { kr: '관리하다', romanization: 'gwallihada',    uz: 'boshqarmoq' },
        { kr: '청소하다', romanization: 'cheongsohada',  uz: 'tozalamoq' },
        { kr: '정리하다', romanization: 'jeongrihada',   uz: 'tartibga solmoq' },
        { kr: '점검하다', romanization: 'jeomgeonhada',  uz: 'tekshirmoq' },
        { kr: '유지하다', romanization: 'yujihada',      uz: 'saqlash, tutib turmoq' },
        { kr: '안전하다', romanization: 'anjeonhada',    uz: 'xavfsiz' },
        { kr: '위험하다', romanization: 'wiheomhada',    uz: 'xavfli' },
        { kr: '자재',     romanization: 'jajae',         uz: 'material, xom ashyo' },
        { kr: '창고',     romanization: 'changgo',       uz: 'ombor' },
        { kr: '보관하다', romanization: 'bogwanhada',    uz: 'saqlash' },
        { kr: '쌓다',     romanization: 'ssatda',        uz: 'taxlamoq' },
        { kr: '운반하다', romanization: 'unbanhada',     uz: 'tashimoq' },
        { kr: '확인하다', romanization: 'hwaginhada',    uz: 'tekshirmoq' },
        { kr: '주의하다', romanization: 'juuihada',      uz: "ehtiyot bo'lmoq" },
        { kr: '따로',     romanization: 'ttaro',         uz: 'alohida' },
        { kr: '미리',     romanization: 'miri',          uz: 'oldindan, avvaldan' },
        { kr: '정기적으로',romanization: 'jeonggijeogeuro', uz: 'muntazam ravishda' },
        { kr: '5S',       romanization: 'oeseu',         uz: "5S — ish joyi tartib tizimi" },
      ],
      examples: [
        { kr: '매일 아침 작업장 점검을 합시다. 안전이 최우선이에요.',            uz: "Har kuni ertalab ish joyi tekshiruvini qilaylik. Xavfsizlik birinchi o'rinda." },
        { kr: '사용하지 않는 자재는 창고에 정리해 놓으세요.',                   uz: "Ishlatilmayotgan materiallarni omborga tartiblab qo'ying." },
        { kr: '위험한 화학 물질은 반드시 잠금장치가 있는 곳에 따로 보관합시다.', uz: "Xavfli kimyoviy moddalarni albatta qulf bor joyda alohida saqlaylik." },
        { kr: '작업장에서는 항상 안전 규칙을 지키는 것이 중요합니다.',           uz: "Ish joyida doim xavfsizlik qoidalariga amal qilish muhim." },
        { kr: '5S 원칙(정리, 정돈, 청소, 청결, 생활화)을 실천합시다.',          uz: "5S tamoyilini (tartib, joylashtirish, tozalash, gigiyena, odatlantirish) amalga oshiraylik." },
      ],
      dialog: [
        { speaker: 'A', kr: '작업장을 깨끗하게 관리합시다.',                    uz: "Ish joyini toza saqlaylik." },
        { speaker: 'B', kr: '네, 알겠습니다.',                                 uz: "Tushundim." },
        { speaker: 'A', kr: '사용할 자재는 창고에 잘 정리해 놓으세요.',         uz: "Ishlatiladigan materiallarni omborga tartibli joylashtiring." },
        { speaker: 'B', kr: '네, 어디에 보관할까요?',                          uz: "Qayerga qo'yay?" },
        { speaker: 'A', kr: '위험한 물건은 따로 보관합시다.',                  uz: "Xavfli narsalarni alohida saqlaylik." },
        { speaker: 'B', kr: '네, 주의하겠습니다. 같이 청소합시다.',            uz: "Xo'p, ehtiyot bo'laman. Birga tozalaylik." },
      ],
      notes: [
        "-(으)ㅂ시다: birgalikda taklif: 청소합시다(tozalaylik), 지킵시다(amal qilaylik).",
        "-(으)ㄹ sifatlovchi: 사용할(ishlatiladigan), 정리할(tartibga solinadigan).",
        "5S — Yaponiyadan kelgan ish joyi tartib tizimi: Sort, Set in order, Shine, Standardize, Sustain.",
        "자재 창고 — material ombori: EPS zavodlarida doim tartibli bo'lishi kerak.",
        "위험 물질 alohida saqlash — kimyoviy, yonuvchi, portlovchi moddalar belgisi bilan.",
      ],
      games: {
        matchPairs: [
          { kr: '작업장', uz: 'ish joyi' },
          { kr: '창고',   uz: 'ombor' },
          { kr: '자재',   uz: 'material' },
          { kr: '따로',   uz: 'alohida' },
          { kr: '미리',   uz: 'oldindan' },
          { kr: '점검',   uz: 'tekshiruv' },
        ],
        fillBlank: [
          { sentence: '같이 청소___시다.',                  answer: '합',    options: ['합','갑','봅','옵'],            uz: "Birga tozalaylik." },
          { sentence: '안전 규칙을 지___시다.',              answer: '킵',    options: ['킵','갑','봅','합'],            uz: "Xavfsizlik qoidalariga amal qilaylik." },
          { sentence: '사용___ 자재를 창고에 넣으세요.',    answer: '할',    options: ['할','한','하는','하던'],        uz: "Ishlatiladigan materiallarni omborga joylashtiring." },
          { sentence: '위험한 물건은 ___ 보관합시다.',      answer: '따로',  options: ['따로','같이','빨리','천천히'],  uz: "Xavfli narsalarni alohida saqlaylik." },
          { sentence: '퇴근하기 전에 항상 ___ 합시다.',    answer: '청소',  options: ['청소','요리','쇼핑','운동'],    uz: "Ishdan chiqishdan oldin doim tozalaylik." },
        ],
        scramble: [
          { kr: '작업장', uz: 'ish joyi' },
          { kr: '창고',   uz: 'ombor' },
          { kr: '자재',   uz: 'material' },
          { kr: '청소',   uz: 'tozalash' },
          { kr: '안전',   uz: 'xavfsizlik' },
        ],
      },
    },
    quiz: [
      { question: "'같이 청소합시다' — '-(으)ㅂ시다' nima?",      options: ['buyruq','birgalikda taklif (keling qilaylik)','inkor','savol'],         correct_index: 1 },
      { question: "'사용할 자재' — '-(으)ㄹ' nima?",               options: ['o\'tgan zamon sifatlovchi','hozirgi sifatlovchi','kelasi zamon/reja sifatlovchi','inkor'], correct_index: 2 },
      { question: "'창고' nimani anglatadi?",                      options: ['ish joyi','ombor','mashina','kiyinish xonasi'],                          correct_index: 1 },
      { question: "'따로' nimani anglatadi?",                      options: ['birga','tez','alohida','oldindan'],                                      correct_index: 2 },
      { question: "'5S' nima?",                                    options: ['5 ta xavfsizlik qoidasi','ish joyi tartib tizimi','5 ta mashina','5 ta material'], correct_index: 1 },
      { question: "Ish joyida xavfli narsalar qanday saqlanadi?", options: ['hammasi birgalikda','alohida, belgilangan joyda','oshxonada','kiyinish xonasida'], correct_index: 1 },
      { question: "'-(으)ㅂ시다' ning do\'stona shakli?",          options: ['합시다','하자','하세요','해요'],                                         correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 36: 출하 관리 — Yuk jo'natish boshqaruvi
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 4, order_in_level: 6,
    title_kr: '출하 관리',
    title_uz: "Yuk jo'natish boshqaruvi",
    is_free: false,
    content: {
      topic: {
        kr: '포장 작업은 다 끝났습니까? 네, 포장한 상자를 창고에 옮겼습니다. 제품 상태는 괜찮습니까? 네, 검사한 결과 문제가 없었습니다. 출하 준비는 언제 끝나겠습니까? 오늘 안에 끝나겠습니다.',
        uz: "Qadoqlash tugadimi? Ha, qadoqlangan qutilarni omborga ko'chirdim. Mahsulot holati yaxshimi? Ha, tekshiruvdan keyin muammo yo'q. Jo'natish tayyorligi qachon tugaydi? Bugun ichida tugaydi."
      },
      grammar: {
        explanation: `-(으)ㄴ — o'tgan zamon sifatlovchi "...gan / ...ilgan"

Tuzilish: [fe'l + (으)ㄴ] + ot
• Undosh → 은 + ot
• Unli   → ㄴ + ot

• 포장한 상자     → Qadoqlangan quti
• 검사한 제품     → Tekshirilgan mahsulot
• 만든 음식       → Tayyorlangan ovqat

💡 Farq:
-(으)ㄴ = o'tgan zamon (qadoqlangan — allaqachon)
-는      = hozir (qadoqlayotgan — hozir)
-(으)ㄹ  = kelajak (qadoqlanadigan — keyinroq)

-겠- — taxmin / niyat / rasmiy kelajak

• 곧 도착하겠습니다   → Tez orada yetib boraman
• 문제가 없겠습니다   → Muammo bo'lmaydi
• 오늘 끝나겠습니다  → Bugun tugaydi

💡 Rasmiy ish muhitida -겠습니다 juda ko'p ishlatiladi.
Fikr bildirish: 어렵겠어요(qiyin bo'lsa kerak)`,
        examples: [
          { kr: '포장한 상자를 트럭에 적재했습니다.',               uz: "Qadoqlangan qutilarni yuk mashinaga yukdim." },
          { kr: '검사한 결과 모든 제품이 기준에 맞았습니다.',        uz: "Tekshiruv natijasida barcha mahsulotlar standartga mos keldi." },
          { kr: '오늘 안에 출하 작업을 완료하겠습니다.',             uz: "Bugun ichida jo'natish ishini tugataman." },
          { kr: '파손된 제품은 교체했으니 문제없겠습니다.',           uz: "Shikastlangan mahsulot almashtirilgani uchun muammo bo'lmaydi." },
          { kr: '배송 지연 없이 내일 도착하겠습니다.',               uz: "Kechikmasdan ertaga yetib boradi." },
        ]
      },
      vocabulary: [
        { kr: '포장',     romanization: 'pojang',       uz: 'qadoqlash' },
        { kr: '상자',     romanization: 'sangja',       uz: 'quti' },
        { kr: '포장하다', romanization: 'pojanghada',   uz: 'qadoqlamoq' },
        { kr: '적재하다', romanization: 'jeokjaehada',  uz: 'yuklamoq' },
        { kr: '쌓다',     romanization: 'ssatda',       uz: 'taxlamoq' },
        { kr: '옮기다',   romanization: 'omgida',       uz: "ko'chirmoq" },
        { kr: '고정하다', romanization: 'gojeongahda',  uz: 'mahkamlash' },
        { kr: '보호하다', romanization: 'bohohada',     uz: 'himoya qilmoq' },
        { kr: '출하',     romanization: 'chulha',       uz: "jo'natish" },
        { kr: '배송',     romanization: 'baesong',      uz: 'yetkazib berish' },
        { kr: '확인하다', romanization: 'hwaginhada',   uz: 'tekshirmoq' },
        { kr: '검사하다', romanization: 'geomsahada',   uz: 'tekshirmoq (nazorat)' },
        { kr: '상태',     romanization: 'sangtae',      uz: 'holat' },
        { kr: '보고하다', romanization: 'bogohada',     uz: 'hisobot bermoq' },
        { kr: '지연되다', romanization: 'jiyeondweda',  uz: 'kechikmoq' },
        { kr: '완료하다', romanization: 'wanlohada',    uz: 'tugatmoq' },
        { kr: '파손되다', romanization: 'pasondweda',   uz: 'shikastlanmoq' },
        { kr: '교체하다', romanization: 'gyochaehada',  uz: 'almashtirmoq' },
        { kr: '기준',     romanization: 'gijun',        uz: 'standart, mezon' },
        { kr: '납품하다', romanization: 'napumhada',    uz: "buyurtmachiga yetkazib bermoq" },
      ],
      examples: [
        { kr: '오늘 포장한 제품을 내일 출하할 예정입니다.',           uz: "Bugun qadoqlangan mahsulotni ertaga jo'natish rejalashtirilgan." },
        { kr: '검사한 결과 불량 제품이 발견되어 교체했습니다.',        uz: "Tekshiruv natijasida nuqsonli mahsulot topildi va almashtirdim." },
        { kr: '포장 상태가 좋지 않으면 재포장해야 하겠습니다.',        uz: "Qadoqlash holati yaxshi bo'lmasa qayta qadoqlash kerak bo'ladi." },
        { kr: '오늘 출하 일정이 바뀌었는데 바로 보고하겠습니다.',      uz: "Bugun jo'natish jadvali o'zgargan, darhol hisobot beraman." },
        { kr: '납품 기한이 내일이라서 오늘 안에 완료하겠습니다.',      uz: "Yetkazib berish muddati ertaga bo'lgani uchun bugun ichida tugatayman." },
      ],
      dialog: [
        { speaker: 'A', kr: '포장 작업은 다 끝났습니까?',                     uz: "Qadoqlash tugadimi?" },
        { speaker: 'B', kr: '네, 포장한 상자를 창고에 옮겼습니다.',            uz: "Ha, qadoqlangan qutilarni omborga ko'chirdim." },
        { speaker: 'A', kr: '제품 상태는 괜찮습니까?',                        uz: "Mahsulot holati yaxshimi?" },
        { speaker: 'B', kr: '네, 검사한 결과 문제가 없었습니다.',              uz: "Ha, tekshiruvdan keyin muammo yo'q edi." },
        { speaker: 'A', kr: '출하 준비는 언제 끝나겠습니까?',                 uz: "Jo'natish tayyorligi qachon tugaydi?" },
        { speaker: 'B', kr: '오늘 안에 모두 끝나겠습니다. 걱정하지 마세요.',  uz: "Bugun ichida hammasi tugaydi. Xavotir olmang." },
      ],
      notes: [
        "-(으)ㄴ sifatlovchi: 포장한 상자(qadoqlangan quti), 검사한 제품(tekshirilgan mahsulot).",
        "-겠-: rasmiy kelajak/taxmin: 끝나겠습니다(tugaydi), 도착하겠습니다(yetib boraman).",
        "출하 jarayoni: 검사 → 포장 → 적재 → 출하 → 배송 — tartib muhim.",
        "납품기한 — buyurtmachiga yetkazib berish muddati: Koreyada vaqtga aniqlik juda muhim.",
        "보고하다 — hisobot bermoq: ish joyida muammo bo'lsa darhol yuqoriga xabar berish kerak.",
      ],
      games: {
        matchPairs: [
          { kr: '포장',     uz: 'qadoqlash' },
          { kr: '출하',     uz: "jo'natish" },
          { kr: '배송',     uz: 'yetkazib berish' },
          { kr: '파손되다', uz: 'shikastlanmoq' },
          { kr: '완료하다', uz: 'tugatmoq' },
          { kr: '기준',     uz: 'standart' },
        ],
        fillBlank: [
          { sentence: '포장___ 상자를 창고에 옮겼습니다.',   answer: '한',    options: ['한','할','하는','하던'],        uz: "Qadoqlangan qutilarni omborga ko'chirdim." },
          { sentence: '오늘 안에 끝나___습니다.',             answer: '겠',    options: ['겠','았','었','ㄹ'],            uz: "Bugun ichida tugaydi." },
          { sentence: '검사___ 결과 문제가 없었습니다.',      answer: '한',    options: ['한','할','하는','하던'],        uz: "Tekshiruv natijasida muammo yo'q edi." },
          { sentence: '배송이 ___ 면 바로 보고하세요.',       answer: '지연되',options: ['지연되','완료되','시작되','끝나'],uz:"Jo'natish kechiksa darhol hisobot bering."},
          { sentence: '곧 도착하___습니다.',                  answer: '겠',    options: ['겠','았','었','ㄹ'],            uz: "Tez orada yetib boraman." },
        ],
        scramble: [
          { kr: '포장',   uz: 'qadoqlash' },
          { kr: '출하',   uz: "jo'natish" },
          { kr: '검사',   uz: 'tekshiruv' },
          { kr: '배송',   uz: 'yetkazib berish' },
          { kr: '상태',   uz: 'holat' },
        ],
      },
    },
    quiz: [
      { question: "'포장한 상자' — '-(으)ㄴ' nima?",              options: ['hozirgi sifatlovchi','o\'tgan zamon sifatlovchi','kelasi sifatlovchi','inkor'], correct_index: 1 },
      { question: "'-겠-' ning ish joyidagi asosiy vazifasi?",     options: ['o\'tgan zamon','rasmiy kelajak/taxmin/niyat','savol','inkor'],                correct_index: 1 },
      { question: "'출하' nimani anglatadi?",                      options: ['qadoqlash','yetkazib berish',"jo'natish",'tekshiruv'],                        correct_index: 2 },
      { question: "'파손되다' nimani anglatadi?",                  options: ['tayyor bo\'lmoq','shikastlanmoq','kechikmoq','tugatmoq'],                     correct_index: 1 },
      { question: "'납품하다' nimani anglatadi?",                  options: ['saqlamoq','qadoqlamoq',"buyurtmachiga yetkazib bermoq",'tekshirmoq'],         correct_index: 2 },
      { question: "Jo'natish jarayoni to'g'ri tartibi?",           options: ['배송→검사→포장→출하','검사→포장→적재→출하→배송','포장→검사→배송','적재→포장→검사'], correct_index: 1 },
      { question: "'-는' va '-(으)ㄴ' sifatlovchi farqi?",        options: ['Farq yo\'q','는=hozir; ㄴ=o\'tgan','ㄴ=hozir; 는=o\'tgan','Ikkalasi o\'tgan'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 37: 기계 가공 — Mashina bilan ishlov berish
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 4, order_in_level: 7,
    title_kr: '기계 가공',
    title_uz: "Mashina bilan ishlov berish",
    is_free: false,
    content: {
      topic: {
        kr: '이 기계는 어떻게 작동합니까? 전원을 켜고 버튼을 누르면 작동합니다. 고장이 나면 어떻게 해야 합니까? 바로 멈추고 점검해야 합니다. 같이 점검하자고 합니다. 바빠도 해야 합니다.',
        uz: "Bu mashina qanday ishlaydi? Tokni yoqib, tugmani bossangiz ishlaydi. Nosozlik bo'lsa nima qilish kerak? Darhol to'xtatib tekshirish kerak. Birga tekshiraylik deyapti. Band bo'lsa ham qilish kerak."
      },
      grammar: {
        explanation: `-아도/어도 — "...bo'lsa ham" (qaramasdan)

Tuzilish: [fe'l/sifat] + 아도/어도

• 바빠도 해야 합니다       → Band bo'lsa ham qilish kerak
• 어려워도 해 보세요        → Qiyin bo'lsa ham qilib ko'ring
• 피곤해도 쉬면 안 돼요   → Charchagan bo'lsa ham dam olish mumkin emas
• 비가 와도 일해야 해요    → Yomg'ir yog'sa ham ishlash kerak

💡 -아도/어도 va -(으)면:
-(으)면   = agar (shartni bildiradi)
-아도/어도 = bo'lsa ham (qaramasdan, istisno)

-자고 하다 — taklifni yetkazish "keling...dedi"

Tuzilish: [fe'l] + 자고 하다

• 같이 점검하자고 합니다  → Birga tekshiraylik deyapti
• 일찍 오자고 했어요       → Erta kelaylik dedi
• 같이 먹자고 했어요       → Birga yeymiz dedi`,
        examples: [
          { kr: '전원을 켜도 작동하지 않으면 바로 신고하세요.',        uz: "Tokni yoqsa ham ishlamasa darhol xabar bering." },
          { kr: '고장이 나면 절대 혼자 수리하려고 하지 마세요.',        uz: "Nosozlik bo'lsa hech qachon yolg'iz ta'mir qilishga urinmang." },
          { kr: '팀장이 기계를 같이 점검하자고 했어요.',                uz: "Jamoa boshlig'i mashinani birga tekshiraylik dedi." },
          { kr: '아무리 바빠도 안전 점검은 꼭 해야 합니다.',             uz: "Qanchalik band bo'lsa ham xavfsizlik tekshiruvi albatta qilinishi kerak." },
          { kr: '기계 조작이 어려워도 포기하지 마세요. 연습하면 돼요.', uz: "Mashina boshqarish qiyin bo'lsa ham taslim bo'lmang. Mashq qilsangiz bo'ladi." },
        ]
      },
      vocabulary: [
        { kr: '기계',     romanization: 'gigye',        uz: 'mashina, mexanizm' },
        { kr: '작동하다', romanization: 'jakdonghada',  uz: 'ishlash, harakat qilish' },
        { kr: '멈추다',   romanization: 'meomchuda',    uz: "to'xtamoq" },
        { kr: '켜다',     romanization: 'kyeoda',       uz: 'yoqmoq (elektr)' },
        { kr: '끄다',     romanization: 'kkeuda',       uz: "o'chirmoq (elektr)" },
        { kr: '조작하다', romanization: 'jojakada',     uz: 'boshqarmoq' },
        { kr: '점검하다', romanization: 'jeomgeonhada', uz: 'tekshirmoq' },
        { kr: '고장',     romanization: 'gojang',       uz: 'nosozlik' },
        { kr: '수리하다', romanization: 'surihada',     uz: "ta'mirlamoq" },
        { kr: '전원',     romanization: 'jeonwon',      uz: 'tok, elektr manbai' },
        { kr: '버튼',     romanization: 'beoteun',      uz: 'tugma' },
        { kr: '스위치',   romanization: 'seuwichi',     uz: 'kalit, o\'chirqich' },
        { kr: '기구',     romanization: 'gigu',         uz: 'asbob, qurilma' },
        { kr: '공구',     romanization: 'gonggu',       uz: 'ish quroli' },
        { kr: '용도',     romanization: 'yongdo',       uz: 'vazifa, maqsad' },
        { kr: '교체하다', romanization: 'gyochaehada',  uz: 'almashtirmoq' },
        { kr: '설치하다', romanization: 'seolchihada',  uz: "o'rnatmoq" },
        { kr: '제거하다', romanization: 'jegeohada',    uz: 'olib tashlamoq' },
        { kr: '연결하다', romanization: 'yeongyeolhada',uz: 'ulamoq' },
        { kr: '위험 구역',romanization: 'wiheom gunyeok',uz: 'xavfli hudud' },
      ],
      examples: [
        { kr: '기계를 켜기 전에 반드시 안전 점검을 해야 합니다.',       uz: "Mashinani yoqishdan oldin albatta xavfsizlik tekshiruvi qilinishi kerak." },
        { kr: '아무리 급해도 기계가 고장나면 바로 멈춰야 합니다.',       uz: "Qanchalik shoshilsa ham mashina nosoz bo'lsa darhol to'xtatish kerak." },
        { kr: '기계 점검을 같이 하자고 했는데 지금 시작합시다.',         uz: "Mashina tekshiruvini birga qilaylik dedingiz, hozir boshlaymiz." },
        { kr: '혼자 수리가 어려워도 시도하지 마세요. 전문가를 부르세요.', uz: "Yolg'iz ta'mirlash qiyin bo'lsa ham urinmang. Mutaxassis chaqiring." },
        { kr: '기계 오작동이 발생하면 위험 구역에서 즉시 대피하세요.', uz: "Mashina noto'g'ri ishlasa xavfli hududdan darhol qoching." },
      ],
      dialog: [
        { speaker: 'A', kr: '이 기계는 어떻게 작동합니까?',                  uz: "Bu mashina qanday ishlaydi?" },
        { speaker: 'B', kr: '전원을 켜고 버튼을 누르면 작동합니다.',          uz: "Tokni yoqib, tugmani bossangiz ishlaydi." },
        { speaker: 'A', kr: '고장이 나면 어떻게 해야 합니까?',               uz: "Nosozlik bo'lsa nima qilish kerak?" },
        { speaker: 'B', kr: '바로 멈추고 점검해야 합니다.',                  uz: "Darhol to'xtatib tekshirish kerak." },
        { speaker: 'A', kr: '같이 점검하자고 합니다.',                       uz: "Birga tekshiraylik deyapti." },
        { speaker: 'B', kr: '네, 바빠도 안전이 먼저니까 같이 합시다.',       uz: "Ha, band bo'lsa ham xavfsizlik birinchi bo'lgani uchun birga qilaylik." },
      ],
      notes: [
        "-아도/어도: qaramasdan: 바빠도(band bo'lsa ham), 어려워도(qiyin bo'lsa ham).",
        "-자고 하다: taklifni yetkazish: 점검하자고 합니다(tekshiraylik deyapti).",
        "고장 났을 때: 1) 멈추다 2) 신고하다 3) 수리 대기 — bu tartibni bilish majburiy.",
        "전원 차단 (tokni o'chirish) — mashina to'xtatilganda doim amalga oshirilishi kerak.",
        "Xavfli mashina boshqarishda OJT (On-the-Job Training) majburiy.",
      ],
      games: {
        matchPairs: [
          { kr: '기계',     uz: 'mashina' },
          { kr: '고장',     uz: 'nosozlik' },
          { kr: '전원',     uz: 'tok' },
          { kr: '수리하다', uz: "ta'mirlamoq" },
          { kr: '켜다',     uz: 'yoqmoq' },
          { kr: '끄다',     uz: "o'chirmoq" },
        ],
        fillBlank: [
          { sentence: '바빠___ 해야 합니다.',                 answer: '도',    options: ['도','면','서','지만'],           uz: "Band bo'lsa ham qilish kerak." },
          { sentence: '같이 점검하자___ 합니다.',             answer: '고',    options: ['고','서','면','지만'],           uz: "Birga tekshiraylik deyapti." },
          { sentence: '전원을 ___ 고 버튼을 눌러요.',         answer: '켜',    options: ['켜','끄','봐','가'],             uz: "Tokni yoqib tugmani bosing." },
          { sentence: '고장이 나면 바로 ___ 야 합니다.',      answer: '멈춰',  options: ['멈춰','시작해','계속해','봐'],   uz: "Nosozlik bo'lsa darhol to'xtatish kerak." },
          { sentence: '어려워___ 포기하지 마세요.',           answer: '도',    options: ['도','면','서','지만'],           uz: "Qiyin bo'lsa ham taslim bo'lmang." },
        ],
        scramble: [
          { kr: '기계',   uz: 'mashina' },
          { kr: '고장',   uz: 'nosozlik' },
          { kr: '전원',   uz: 'tok' },
          { kr: '점검',   uz: 'tekshiruv' },
          { kr: '수리',   uz: "ta'mirlash" },
        ],
      },
    },
    quiz: [
      { question: "'-아도/어도' nimani bildiradi?",              options: ['agar','...bo\'lsa ham (qaramasdan)','shuning uchun','natijasida'],          correct_index: 1 },
      { question: "'-자고 하다' nimani anglatadi?",              options: ['buyruq berish','taklifni yetkazish (keling...dedi)','so\'rash','inkor'],    correct_index: 1 },
      { question: "'고장' nimani anglatadi?",                   options: ['xavfsizlik','tekshiruv','nosozlik','mashina'],                               correct_index: 2 },
      { question: "Mashina nosoz bo'lganda birinchi nima?",     options: ['davom ettirish','darhol to\'xtatish','ta\'mirlash','uyga ketish'],            correct_index: 1 },
      { question: "'켜다' nimani anglatadi?",                    options: ["o'chirmoq",'boshqarmoq','yoqmoq','ulamoq'],                                 correct_index: 2 },
      { question: "'-아도/어도' va '-(으)면' farqi?",            options: ['Farq yo\'q','아도=qaramasdan; 면=agar shartli','면=qaramasdan','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'전원' nimani anglatadi?",                    options: ['tugma','mashina','tok, elektr manbai','asbob'],                              correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 38: 기계 조립 — Mashina qismlarini yig'ish
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 4, order_in_level: 8,
    title_kr: '기계 조립',
    title_uz: "Mashina qismlarini yig'ish",
    is_free: false,
    content: {
      topic: {
        kr: '지금 뭐 하고 있어요? 기계를 조립하는 중입니다. 이 공구는 어떻게 사용합니까? 볼트를 조이면서 사용합니다. 조립 순서를 확인했어요? 네, 설명서를 보면서 작업하고 있습니다.',
        uz: "Hozir nima qilyapsiz? Mashinani yig'ayapman. Bu asbob qanday ishlatiladi? Boltni siqib ishlatiladi. Yig'ish tartibini tekshirdingizmi? Ha, qo'llanmani ko'rib ishlayapman."
      },
      grammar: {
        explanation: `-(으)면서 — "...bilan birga / ...qilib turib" (ekvivalo't harakat)

Tuzilish: [fe'l] + (으)면서
• Undosh → 으면서
• Unli   → 면서

• 설명하면서 작업합니다    → Tushuntirib turib ishlaydi
• 음악을 들으면서 일해요  → Musiqa tinglab ishlaydi
• 볼트를 조이면서 사용합니다→ Boltni siqib ishlatiladi

💡 -(으)면서: ikkala harakat bir vaqtda bajariladi
-고: harakat ketma-ket

-는 중이다 — "...qilayotgan jarayonda" (hozirgi davom)

Tuzilish: [fe'l] + 는 중이다

• 조립하는 중입니다       → Hozir yig'ayapman
• 점검하는 중이에요       → Tekshirayotgan edim
• 회의하는 중입니다       → Yig'ilish bo'layotgan jarayonda

💡 -는 중이다 vs -고 있다:
이다 = rasmiyroq, ishda ko'p
있다 = kundalik`,
        examples: [
          { kr: '설명서를 보면서 조립하는 중입니다.',                   uz: "Qo'llanmani ko'rib yig'ayotgan jarayondaman." },
          { kr: '아직 조립하는 중이니까 조금만 기다려 주세요.',          uz: "Hali yig'ayotgan jarayonda, biroz kuting." },
          { kr: '볼트를 조이면서 동시에 렌치를 사용합니다.',             uz: "Boltni siqib turib bir vaqtda kalit ishlatiladi." },
          { kr: '팀장이 설명하면서 보여주는 것을 잘 보세요.',             uz: "Jamoa boshlig'i tushuntirib ko'rsatayotganini yaxshi kuting." },
          { kr: '조립 순서를 확인하면서 천천히 작업하세요.',              uz: "Yig'ish tartibini tekshirib asta-sekin ishlang." },
        ]
      },
      vocabulary: [
        { kr: '부품',     romanization: 'bupum',        uz: 'detal, qism' },
        { kr: '공구',     romanization: 'gonggu',       uz: 'asbob' },
        { kr: '드라이버', romanization: 'deuraibeom',   uz: 'otvertka' },
        { kr: '렌치',     romanization: 'renchi',       uz: 'kalit (wrench)' },
        { kr: '볼트',     romanization: 'boltu',        uz: 'bolt' },
        { kr: '너트',     romanization: 'neotseu',      uz: 'gayka' },
        { kr: '조이다',   romanization: 'joida',        uz: 'siqmoq (mahkamlash)' },
        { kr: '풀다',     romanization: 'pulda',        uz: "bo'shatmoq" },
        { kr: '조립하다', romanization: 'joliphada',    uz: "yig'moq" },
        { kr: '연결하다', romanization: 'yeongyeolhada',uz: 'ulash' },
        { kr: '설치하다', romanization: 'seolchihada',  uz: "o'rnatmoq" },
        { kr: '분해하다', romanization: 'bunhaehada',   uz: 'ajratmoq' },
        { kr: '고정하다', romanization: 'gojeongahda',  uz: 'mahkamlash' },
        { kr: '확인하다', romanization: 'hwaginhada',   uz: 'tekshirmoq' },
        { kr: '순서',     romanization: 'sunseo',       uz: 'tartib' },
        { kr: '설명서',   romanization: 'seolmyeongseo',uz: "qo'llanma" },
        { kr: '방법',     romanization: 'bangbeop',     uz: 'usul' },
        { kr: '전동 공구',romanization: 'jeondong gonggu',uz: 'elektr asbob' },
        { kr: '수동 공구',romanization: 'sudong gonggu', uz: 'qo\'l asbob' },
        { kr: '토크',     romanization: 'tokeu',        uz: 'tortish kuchi (torque)' },
      ],
      examples: [
        { kr: '기계 조립을 처음 하는 경우 설명서를 꼭 보면서 하세요.',   uz: "Mashina yig'ishni birinchi marta qilsangiz qo'llanmani albatta ko'rib qiling." },
        { kr: '볼트를 너무 세게 조이면 파손될 수 있으니 주의하세요.',    uz: "Boltni juda kuchli siqsangiz shikastlanishi mumkin, ehtiyot bo'ling." },
        { kr: '조립하는 중에 문제가 생기면 즉시 멈추고 보고하세요.',     uz: "Yig'ayotgan jarayonda muammo chiqsa darhol to'xtatib hisobot bering." },
        { kr: '두 사람이 서로 소통하면서 함께 조립하면 더 빨리 돼요.',   uz: "Ikki kishi bir-biriga muloqot qilib birga yig'sa tezroq bo'ladi." },
        { kr: '렌치를 사용하는 중이니까 잠깐만 기다려 주세요.',          uz: "Kalit ishlatayotgan jarayondaman, biroz kuting." },
      ],
      dialog: [
        { speaker: 'A', kr: '지금 뭐 하고 있어요?',                      uz: "Hozir nima qilyapsiz?" },
        { speaker: 'B', kr: '기계를 조립하는 중입니다.',                  uz: "Mashinani yig'ayotgan jarayondaman." },
        { speaker: 'A', kr: '이 공구는 어떻게 사용합니까?',               uz: "Bu asbob qanday ishlatiladi?" },
        { speaker: 'B', kr: '볼트를 조이면서 사용합니다.',                uz: "Boltni siqib ishlatiladi." },
        { speaker: 'A', kr: '조립 순서를 확인했어요?',                    uz: "Yig'ish tartibini tekshirdingizmi?" },
        { speaker: 'B', kr: '네, 설명서를 보면서 천천히 작업하고 있습니다.', uz: "Ha, qo'llanmani ko'rib asta-sekin ishlayapman." },
      ],
      notes: [
        "-(으)면서: ekvivalo't: 보면서(ko'rib turib), 들으면서(tinglab), 조이면서(siqib).",
        "-는 중이다: hozirgi jarayon: 조립하는 중(yig'ayotgan jarayonda) — rasmiy shakl.",
        "조립 순서 — yig'ish tartibi: qo'llanma bo'yicha qat'iy amal qilish kerak.",
        "드라이버(otvertka), 렌치(kalit), 볼트(bolt), 너트(gayka) — asosiy asboblar.",
        "안전 수칙: qo'lqop kiyish, ko'zoynak taqish, ish joyini tartibda saqlash.",
      ],
      games: {
        matchPairs: [
          { kr: '부품',     uz: 'detal' },
          { kr: '드라이버', uz: 'otvertka' },
          { kr: '볼트',     uz: 'bolt' },
          { kr: '너트',     uz: 'gayka' },
          { kr: '조이다',   uz: 'siqmoq' },
          { kr: '설명서',   uz: "qo'llanma" },
        ],
        fillBlank: [
          { sentence: '기계를 조립하는 ___ 입니다.',         answer: '중',    options: ['중','것','만','편'],            uz: "Mashinani yig'ayotgan jarayondaman." },
          { sentence: '설명서를 보___서 작업해요.',           answer: '면',    options: ['면','고','아','어'],            uz: "Qo'llanmani ko'rib ishlayapman." },
          { sentence: '볼트를 조이면___ 사용합니다.',         answer: '서',    options: ['서','고','면','지만'],           uz: "Boltni siqib ishlatiladi." },
          { sentence: '점검하는 ___ 이에요.',                 answer: '중',    options: ['중','것','만','편'],            uz: "Tekshirayotgan jarayondaman." },
          { sentence: '볼트를 너무 세게 ___ 마세요.',        answer: '조이지',options: ['조이지','풀지','연결하지','설치하지'],uz:"Boltni juda kuchli siqmang."},
        ],
        scramble: [
          { kr: '조립',   uz: "yig'ish" },
          { kr: '볼트',   uz: 'bolt' },
          { kr: '렌치',   uz: 'kalit' },
          { kr: '순서',   uz: 'tartib' },
          { kr: '설명서', uz: "qo'llanma" },
        ],
      },
    },
    quiz: [
      { question: "'-(으)면서' nimani bildiradi?",               options: ['ketma-ket','ikkala harakat bir vaqtda','sabab','shart'],                   correct_index: 1 },
      { question: "'-는 중이다' va '-고 있다' farqi?",            options: ['Farq yo\'q','중이다=rasmiyroq; 있다=kundalik','있다=rasmiy','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'부품' nimani anglatadi?",                    options: ['asbob','mashina','detal, qism','bolt'],                                     correct_index: 2 },
      { question: "'풀다' yig'ish kontekstida?",                 options: ['siqmoq',"bo'shatmoq",'ulamoq','qo\'ymoq'],                                 correct_index: 1 },
      { question: "'설명서' nimani anglatadi?",                  options: ['tartib','usul',"qo'llanma",'asbob'],                                        correct_index: 2 },
      { question: "'조이다' nimani anglatadi?",                  options: ["bo'shatmoq",'ulamoq','siqmoq (mahkamlash)','olib tashlamoq'],               correct_index: 2 },
      { question: "Mashina yig'ishda eng muhim qoida?",          options: ['tez qilish','qo\'llanmaga amal qilish va tartibni saqlash','kuchli siqish','ko\'p bolt ishlatish'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 39: 금속 가공 — Metallga ishlov berish
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 4, order_in_level: 9,
    title_kr: '금속 가공',
    title_uz: "Metallga ishlov berish",
    is_free: false,
    content: {
      topic: {
        kr: '이 공구는 무엇입니까? 그라인더입니다. 금속을 절단할 때 사용합니다. 사용하기 전에 무엇을 해야 합니까? 안전 장비를 착용하라고 했습니다. 용접하기 전에 준비해야 합니다. 점검하기 전에 시작하면 안 됩니다.',
        uz: "Bu asbob nima? Grinder. Metall kesishda ishlatiladi. Ishlatishdan oldin nima qilish kerak? Himoya vositalarini kiyish kerak deyishdi. Payvandlashdan oldin tayyorlanish kerak. Tekshirishdan oldin boshlash mumkin emas."
      },
      grammar: {
        explanation: `-(으)라고 하다 — buyruq/ko'rsatmani yetkazish

Tuzilish: [buyruq fe'l] + (으)라고 하다

• 조심하라고 했어요            → Ehtiyot bo'lishni aytdi
• 안전 장비를 착용하라고 합니다 → Himoya vositalarini kiyishni aytyapti
• 보고하라고 했어요             → Hisobot berishni aytdi

💡 Farq (reported speech):
- 하라고 했어요   = buyruq yetkazish
- 한다고 했어요   = holat yetkazish
- 하자고 했어요   = taklif yetkazish

-기 전에 — "...dan oldin"

Tuzilish: [fe'l] + 기 전에

• 작업하기 전에 점검하세요     → Ish boshlashdan oldin tekshiring
• 용접하기 전에 준비해야 합니다 → Payvandlashdan oldin tayyorlanish kerak
• 퇴근하기 전에 청소합시다     → Ishdan chiqishdan oldin tozalaylik`,
        examples: [
          { kr: '금속 절단 작업을 시작하기 전에 반드시 보호 장비를 착용하라고 했어요.', uz: "Metall kesish ishini boshlashdan oldin albatta himoya vositalarini kiyish kerak deyishdi." },
          { kr: '그라인더를 사용하기 전에 절단 부위를 확인해야 합니다.',               uz: "Grinderni ishlatishdan oldin kesiladigan joyni tekshirish kerak." },
          { kr: '용접하기 전에 용접 부위를 깨끗이 청소하라고 했어요.',                 uz: "Payvandlashdan oldin payvandlash joyini toza tozalashni aytdi." },
          { kr: '이 구역에서는 불꽃이 튀기 때문에 방화복을 착용하라고 합니다.',        uz: "Bu hududda uchqun uchgani uchun yong'inga qarshi kiyim kiyishni aytyapti." },
          { kr: '작업을 완료하기 전에 품질 검사를 하라고 했어요.',                    uz: "Ishni tugatishdan oldin sifat tekshiruvini qilishni aytdi." },
        ]
      },
      vocabulary: [
        { kr: '공구',     romanization: 'gonggu',        uz: 'asbob' },
        { kr: '망치',     romanization: 'mangchi',       uz: "bolg'a" },
        { kr: '드릴',     romanization: 'deuril',        uz: "burg'ulash asbobi" },
        { kr: '그라인더', romanization: 'geuraindeom',   uz: 'silliqlovchi asbob (grinder)' },
        { kr: '절단기',   romanization: 'jeoldanggi',    uz: 'kesish uskunasi' },
        { kr: '용접기',   romanization: 'yongjeokgi',    uz: 'payvandlash apparati' },
        { kr: '보호 장비',romanization: 'boho jangbi',   uz: 'himoya vositalari' },
        { kr: '절단하다', romanization: 'jeoldanhada',   uz: 'kesmoq' },
        { kr: '자르다',   romanization: 'jareuda',       uz: 'kesmoq, qirqmoq' },
        { kr: '용접하다', romanization: 'yongjeokada',   uz: 'payvandlamoq' },
        { kr: '불꽃',     romanization: 'bulkkot',       uz: 'uchqun, alanga' },
        { kr: '금속',     romanization: 'geumsok',       uz: 'metall' },
        { kr: '녹이다',   romanization: 'nogida',        uz: 'eritmoq' },
        { kr: '붙이다',   romanization: 'buchida',       uz: 'biriktirmoq' },
        { kr: '착용하다', romanization: 'chagyonghada',  uz: 'kiymoq (xavfsizlik uchun)' },
        { kr: '보호 안경',romanization: 'boho angyeong', uz: 'himoya ko\'zoynagi' },
        { kr: '장갑',     romanization: 'jangap',        uz: "qo'lqop" },
        { kr: '방화복',   romanization: 'banghwabok',    uz: "yong'inga qarshi kiyim" },
        { kr: '열',       romanization: 'yeol',          uz: 'issiqlik, harorat' },
        { kr: '강도',     romanization: 'gangdo',        uz: "mustahkamlik, kuch" },
      ],
      examples: [
        { kr: '금속 가공 작업 전에는 반드시 보호 안경과 장갑을 착용하라고 했어요.',   uz: "Metall ishlov berishdan oldin albatta himoya ko'zoynagi va qo'lqop kiyishni aytdi." },
        { kr: '그라인더 사용하기 전에 날을 점검하라고 했습니다.',                    uz: "Grinderni ishlatishdan oldin pichoqni tekshirishni aytdi." },
        { kr: '용접 작업은 환기가 잘 되는 장소에서 해야 합니다.',                   uz: "Payvandlash ishini shamollatish yaxshi joyda qilish kerak." },
        { kr: '절단하기 전에 치수를 정확히 측정하라고 했어요.',                     uz: "Kesishdan oldin o'lchamni aniq o'lchashni aytdi." },
        { kr: '금속을 용접할 때는 불꽃이 튀니까 주변 정리를 미리 하라고 했어요.',   uz: "Metall payvandlashda uchqun uchgani uchun atrofni oldindan tartiblab qo'yishni aytdi." },
      ],
      dialog: [
        { speaker: 'A', kr: '이 공구는 무엇입니까?',                           uz: "Bu asbob nima?" },
        { speaker: 'B', kr: '그라인더입니다. 금속을 절단할 때 사용합니다.',     uz: "Grinder. Metall kesishda ishlatiladi." },
        { speaker: 'A', kr: '사용하기 전에 무엇을 해야 합니까?',               uz: "Ishlatishdan oldin nima qilish kerak?" },
        { speaker: 'B', kr: '안전 장비를 착용하라고 했습니다.',                 uz: "Himoya vositalarini kiyish kerak deyishdi." },
        { speaker: 'A', kr: '용접 작업은 언제 시작합니까?',                    uz: "Payvandlash qachon boshlanadi?" },
        { speaker: 'B', kr: '점검하기 전에 시작하면 안 됩니다. 준비됐습니까?', uz: "Tekshirishdan oldin boshlash mumkin emas. Tayyormisiz?" },
      ],
      notes: [
        "-(으)라고 하다: buyruq yetkazish: 착용하라고 했습니다(kiyishni aytdi).",
        "-기 전에: oldin: 작업하기 전에(ishdan oldin), 용접하기 전에(payvandlashdan oldin).",
        "그라인더 xavfsizligi: himoya ko'zoynagi + qo'lqop + uchqun maydonini tozalash.",
        "용접 (payvandlash) xavfsizligi: shamollatish, yong'inga qarshi kiyim, ko'zoynagi.",
        "금속 가공 — metall ishlov: EPS da elektronika, avtomobil, qurilish zavodlarida muhim.",
      ],
      games: {
        matchPairs: [
          { kr: '망치',     uz: "bolg'a" },
          { kr: '드릴',     uz: "burg'ulash asbobi" },
          { kr: '그라인더', uz: 'grinder' },
          { kr: '용접기',   uz: 'payvandlash apparati' },
          { kr: '불꽃',     uz: 'uchqun' },
          { kr: '장갑',     uz: "qo'lqop" },
        ],
        fillBlank: [
          { sentence: '안전 장비를 착용하___고 했습니다.',      answer: '라',    options: ['라','면','고','서'],             uz: "Himoya vositalarini kiyish kerak deyishdi." },
          { sentence: '작업하기 ___ 에 점검하세요.',            answer: '전',    options: ['전','후','중','동안'],           uz: "Ish boshlashdan oldin tekshiring." },
          { sentence: '용접하기 전에 ___ 해야 합니다.',         answer: '준비',  options: ['준비','청소','요리','운동'],     uz: "Payvandlashdan oldin tayyorlanish kerak." },
          { sentence: '조심하___ 고 했어요.',                   answer: '라',    options: ['라','면','고','서'],             uz: "Ehtiyot bo'lishni aytdi." },
          { sentence: '금속을 절단할 때 ___ 를 사용합니다.',    answer: '그라인더',options: ['그라인더','망치','렌치','드라이버'],uz:"Metall kesishda grinder ishlatiladi."},
        ],
        scramble: [
          { kr: '금속',   uz: 'metall' },
          { kr: '용접',   uz: 'payvandlash' },
          { kr: '절단',   uz: 'kesish' },
          { kr: '장갑',   uz: "qo'lqop" },
          { kr: '불꽃',   uz: 'uchqun' },
        ],
      },
    },
    quiz: [
      { question: "'안전 장비를 착용하라고 했어요' — '-(으)라고 하다' nima?", options: ['taklif yetkazish','buyruq yetkazish','savol yetkazish','holat yetkazish'], correct_index: 1 },
      { question: "'-기 전에' nimani anglatadi?",               options: ['...dan keyin','...qilayotganda','...dan oldin','...uchun'],                   correct_index: 2 },
      { question: "'그라인더' nima?",                           options: ["bolg'a",'silliqlovchi asbob (grinder)',"burg'ulash asbobi",'kalit'],          correct_index: 1 },
      { question: "'불꽃' nimani anglatadi?",                   options: ['issiqlik','metall','uchqun, alanga','asbob'],                                   correct_index: 2 },
      { question: "'착용하다' nimani anglatadi?",               options: ['yechmoq','kiymoq (xavfsizlik uchun)','almashtirmoq','saqlash'],               correct_index: 1 },
      { question: "Grinder ishlatishdan oldin nima kerak?",     options: ['hech narsa','faqat qo\'lqop','himoya ko\'zoynagi, qo\'lqop va joy tozalash','faqat ko\'zoynagi'], correct_index: 2 },
      { question: "'-자고 하다', '-(으)라고 하다', '-ㄴ다고 하다' farqi?", options: ['Farq yo\'q','자고=taklif; 라고=buyruq; ㄴ다고=holat yetkazish','라고=taklif','Ikkalasi bir xil'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 40: 플라스틱·고무 성형 — Plastmassa va rezina
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 4, order_in_level: 10,
    title_kr: '플라스틱·고무 성형',
    title_uz: "Plastmassa va rezina mahsulot ishlab chiqarish",
    is_free: false,
    content: {
      topic: {
        kr: '혼합 작업은 어떻게 합니까? 재료를 정확한 비율로 섞어야 합니다. 제품에 문제가 생겼어요? 네, 불량 제품이 발생했나 봐요. 어떻게 해야 합니까? 기계를 사용하는 대신에 손으로 확인해요. 비율이 틀린가 봐요.',
        uz: "Aralashtirish qanday qilinadi? Materiallar aniq nisbatda aralashtiriladi. Mahsulotda muammo chiqdi-mi? Ha, nuqsonli mahsulot chiqqanga o'xshaydi. Nima qilish kerak? Mashina o'rniga qo'l bilan tekshiramiz. Nisbat noto'g'ri shekilli."
      },
      grammar: {
        explanation: `-는 대신에 — "...o'rniga" (alternativa)

Tuzilish: [fe'l] + 는 대신에 / Ot + 대신에

• 기계를 사용하는 대신에 손으로 했어요
  → Mashina o'rniga qo'l bilan qildim
• 설탕 대신에 소금을 넣었어요
  → Shakar o'rniga tuz solindi
• 버스 대신에 지하철을 타요
  → Avtobus o'rniga metroga chiqaman

💡 대신에: almashtirish, muqobil tanlash

-나/(으)ㄴ가 보다 — taxmin "shekilli, o'xshaydi"

Fe'l: -나 보다 (hozirgi)
Sifat: -(으)ㄴ가 보다

• 제품에 문제가 있나 봐요   → Mahsulotda muammo bor shekilli
• 비율이 틀린가 봐요        → Nisbat noto'g'ri shekilli
• 비가 오나 봐요             → Yomg'ir yog'ayotgan shekilli

💡 -나 보다 vs -는 것 같다:
비슷한 의미지만 나 보다 = 약간 더 주관적`,
        examples: [
          { kr: '재료 비율이 틀렸나 봐요. 제품이 이상하게 나왔어요.',               uz: "Material nisbati noto'g'ri shekilli. Mahsulot g'alati chiqdi." },
          { kr: '자동 혼합기 대신에 수동으로 섞는 방법을 사용했어요.',               uz: "Avtomat aralashtirgich o'rniga qo'lda aralashtirish usuli ishlatildi." },
          { kr: '불량 제품이 많이 발생하나 봐요. 원인을 찾아야 해요.',               uz: "Nuqsonli mahsulotlar ko'p chiqayotgan shekilli. Sababini topish kerak." },
          { kr: '기계가 고장났나 봐요. 소리가 이상해요.',                           uz: "Mashina nosoz shekilli. Ovoz g'alati." },
          { kr: '오늘 작업이 늦게 끝나나 봐요. 추가 인력이 필요할 것 같아요.',      uz: "Bugun ish kech tugayotgan shekilli. Qo'shimcha ishchi kuchi kerak bo'lsa kerak." },
        ]
      },
      vocabulary: [
        { kr: '혼합하다', romanization: 'honhaphada',   uz: 'aralashtirmoq' },
        { kr: '측정하다', romanization: 'cheukjeonghada',uz: "o'lchamoq" },
        { kr: '비율',     romanization: 'biryu',        uz: 'nisbat' },
        { kr: '양',       romanization: 'yang',         uz: 'miqdor' },
        { kr: '정확하다', romanization: 'jeonghwakada', uz: 'aniq' },
        { kr: '재료',     romanization: 'jaeyo',        uz: 'material, xom ashyo' },
        { kr: '넣다',     romanization: 'neota',        uz: 'solmoq' },
        { kr: '섞다',     romanization: 'seokda',       uz: 'aralashtirmoq' },
        { kr: '불량',     romanization: 'bullyang',     uz: 'nuqson' },
        { kr: '제품',     romanization: 'jepum',        uz: 'mahsulot' },
        { kr: '검사하다', romanization: 'geomsahada',   uz: 'tekshirmoq' },
        { kr: '원인',     romanization: 'wonin',        uz: 'sabab' },
        { kr: '해결하다', romanization: 'haegyeolhada', uz: 'hal qilmoq' },
        { kr: '교체하다', romanization: 'gyochaehada',  uz: 'almashtirmoq' },
        { kr: '폐기하다', romanization: 'pyegihada',    uz: 'yo\'q qilmoq (utilizatsiya)' },
        { kr: '성형하다', romanization: 'seonghyeonghada',uz: 'shakl bermoq (molding)' },
        { kr: '금형',     romanization: 'geumhyeong',   uz: 'qolip (mold)' },
        { kr: '온도',     romanization: 'ondo',         uz: 'harorat' },
        { kr: '압력',     romanization: 'amnyeok',      uz: 'bosim' },
        { kr: '수동',     romanization: 'sudong',       uz: "qo'l bilan (manual)" },
      ],
      examples: [
        { kr: '플라스틱 성형 시 온도와 압력을 정확히 조절해야 합니다.',             uz: "Plastmassa shakllashtirishda harorat va bosimni aniq tartibga solish kerak." },
        { kr: '불량 제품이 발생했나 봐요. 즉시 원인을 파악해야 합니다.',            uz: "Nuqsonli mahsulot chiqdi shekilli. Darhol sababini aniqlash kerak." },
        { kr: '자동 혼합 대신에 수동으로 비율을 확인하면서 섞었어요.',              uz: "Avtomat aralashtirish o'rniga qo'lda nisbatni tekshirib aralashtirildi." },
        { kr: '비율이 틀린가 봐요. 색이 이상해게 나왔어요.',                       uz: "Nisbat noto'g'ri shekilli. Rang g'alati chiqdi." },
        { kr: '불량품은 즉시 폐기하는 대신에 원인을 먼저 파악해야 해요.',           uz: "Nuqsonli mahsulotni darhol yo'q qilish o'rniga avval sababini aniqlash kerak." },
      ],
      dialog: [
        { speaker: 'A', kr: '혼합 작업은 어떻게 합니까?',                          uz: "Aralashtirish qanday qilinadi?" },
        { speaker: 'B', kr: '재료를 정확한 비율로 섞어야 합니다.',                  uz: "Materiallar aniq nisbatda aralashtiriladi." },
        { speaker: 'A', kr: '제품에 문제가 생겼어요?',                             uz: "Mahsulotda muammo chiqdi-mi?" },
        { speaker: 'B', kr: '네, 불량 제품이 발생했나 봐요. 비율이 틀린가 봐요.',  uz: "Ha, nuqsonli mahsulot chiqqan shekilli. Nisbat noto'g'ri shekilli." },
        { speaker: 'A', kr: '어떻게 해야 합니까?',                                uz: "Nima qilish kerak?" },
        { speaker: 'B', kr: '기계 대신에 직접 확인하고 다시 만들어야 겠어요.',     uz: "Mashina o'rniga o'z qo'li bilan tekshirib, qayta yaratish kerak bo'ladi." },
      ],
      notes: [
        "-는 대신에: almashtirish: 기계 대신에(mashina o'rniga), 버스 대신에(avtobus o'rniga).",
        "-나/(으)ㄴ가 보다: taxmin: 있나 봐요(bor shekilli), 틀린가 봐요(noto'g'ri shekilli).",
        "불량품 (nuqsonli mahsulot) — 폐기(yo'q qilish) yoki 재작업(qayta ishlash).",
        "비율 (nisbat) — plastmassa va rezinada aniq bo'lishi muhim: oz farq ham nuqson berishi mumkin.",
        "온도 va 압력 — plastmassa shakllashtirishda asosiy parametrlar.",
      ],
      games: {
        matchPairs: [
          { kr: '혼합',     uz: 'aralashtirish' },
          { kr: '비율',     uz: 'nisbat' },
          { kr: '불량',     uz: 'nuqson' },
          { kr: '폐기하다', uz: "yo'q qilmoq" },
          { kr: '원인',     uz: 'sabab' },
          { kr: '압력',     uz: 'bosim' },
        ],
        fillBlank: [
          { sentence: '기계를 사용하는 대신에 손으로 ___.',          answer: '했어요', options: ['했어요','갔어요','봤어요','왔어요'], uz: "Mashina o'rniga qo'l bilan qildim." },
          { sentence: '제품에 문제가 있___ 봐요.',                   answer: '나',     options: ['나','으면','는','을'],              uz: "Mahsulotda muammo bor shekilli." },
          { sentence: '재료를 정확한 ___ 로 섞어야 합니다.',         answer: '비율',   options: ['비율','색깔','크기','무게'],        uz: "Materiallar aniq nisbatda aralashtiriladi." },
          { sentence: '비율이 틀린___ 봐요.',                        answer: '가',     options: ['가','나','면','서'],                uz: "Nisbat noto'g'ri shekilli." },
          { sentence: '불량 제품은 즉시 ___ 해야 합니다.',           answer: '폐기',   options: ['폐기','포장','배송','청소'],        uz: "Nuqsonli mahsulot darhol yo'q qilinishi kerak." },
        ],
        scramble: [
          { kr: '혼합',   uz: 'aralashtirish' },
          { kr: '비율',   uz: 'nisbat' },
          { kr: '불량',   uz: 'nuqson' },
          { kr: '원인',   uz: 'sabab' },
          { kr: '온도',   uz: 'harorat' },
        ],
      },
    },
    quiz: [
      { question: "'-는 대신에' nimani anglatadi?",               options: ['shuning uchun','...o\'rniga (alternativa)','lekin','keyin'],               correct_index: 1 },
      { question: "'-나/(으)ㄴ가 보다' nimani bildiradi?",         options: ['aniq ma\'lumot','taxmin (shekilli, o\'xshaydi)','buyruq','savol'],         correct_index: 1 },
      { question: "'불량' nimani anglatadi?",                     options: ['sifat','standart','nuqson','mahsulot'],                                     correct_index: 2 },
      { question: "'폐기하다' nimani anglatadi?",                 options: ['almashtirmoq','saqlash',"yo'q qilmoq (utilizatsiya)",'tekshirmoq'],         correct_index: 2 },
      { question: "'비율' nimani anglatadi?",                     options: ['miqdor','og\'irlik','nisbat','harorat'],                                    correct_index: 2 },
      { question: "Nuqsonli mahsulot chiqganda birinchi nima?",   options: ['darhol yo\'q qilish','darhol sababini aniqlash','davom ettirish','ukol qilish'], correct_index: 1 },
      { question: "'-나 보다' va '-는 것 같다' farqi?",            options: ['Katta farq bor','O\'xshash ma\'no; 나 보다 biroz subjektivroq','것 같다=aniq','나 보다=kelajak'], correct_index: 1 },
    ],
  },

];

// ─────────────────────────────────────────
// DB ga saqlash
// ─────────────────────────────────────────
async function seed() {
  console.log('EPS-TOPIK 4-daraja seed boshlandi...\n');
  console.log('Manba: Eps-Topik_2_.docx — Darslar 31-40');
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

    const icons = ['👔','🏢','🤝','🚨','🏭','📦','⚙️','🔧','🔩','🏗️'];
    console.log(`  ✅  ${icons[lessonData.order_in_level-1]} Dars ${lessonData.order_in_level}: ${lessonData.title_kr} (ID: ${saved.id})`);
  }

  console.log('\n════════════════════════════════════════════════════════');
  console.log('✅ EPS-TOPIK 4-daraja seed muvaffaqiyatli yakunlandi!');
  console.log('════════════════════════════════════════════════════════');
  console.log(`\n  📚 Darslar:    ${LESSONS.length} ta (31-40)`);
  console.log(`  🎯 Quiz:       ${LESSONS.length * 7} ta`);
  console.log(`  🔊 Audio keys: ${LESSONS.length * 37} ta`);
  console.log('\n  📋 Darslar ro\'yxati:');
  console.log('  1️⃣  복장/근무 태도  — Ish kiyimi (-아/어 보이다, -게)');
  console.log('  2️⃣  회사 시설 이용  — Korxona jihozlari (-잖아요, -아/어 놓다)');
  console.log('  3️⃣  동료와의 관계   — Hamkasblar (-는 편이다, -거든요)');
  console.log('  4️⃣  성희롱 예방     — Jinsiy bezorilik (-던데요, -다고 하다)');
  console.log('  5️⃣  작업장 관리    — Ish joyi (-(으)ㅂ시다, -(으)ㄹ)');
  console.log('  6️⃣  출하 관리      — Jo\'natish (-(으)ㄴ, -겠-)');
  console.log('  7️⃣  기계 가공      — Mashina (-아도/어도, -자고 하다)');
  console.log('  8️⃣  기계 조립      — Yig\'ish (-(으)면서, -는 중이다)');
  console.log('  9️⃣  금속 가공      — Metall (-(으)라고 하다, -기 전에)');
  console.log('  🔟 플라스틱/고무   — Plastmassa (-는 대신에, -나 보다)');
  console.log('\n📢 Jami EPS-TOPIK holati:');
  console.log('   eps_topik_level1.js → 10 dars (1-10) ✅');
  console.log('   eps_topik_level2.js → 10 dars (11-20) ✅');
  console.log('   eps_topik_level3.js → 10 dars (21-30) ✅');
  console.log('   eps_topik_level4.js → 10 dars (31-40) ✅');
  console.log('   Keyingi: eps_topik_level5.js → 10 dars (41-50)\n');

  await db.end();
}

seed().catch(err => {
  console.error('❌ Xatolik:', err.message);
  process.exit(1);
});
