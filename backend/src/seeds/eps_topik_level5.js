// backend/src/seeds/eps_topik_level5.js
// EPS-TOPIK 5-daraja: 10 ta to'liq dars (Lesson 41-50)
// Manba: Eps-Topik2_41-60.docx
// Audio URL: {CDN_URL}/{lessonId}-{key}.mp3 — Edge TTS (ko-KR-SunHiNeural)
// Usage: node src/seeds/eps_topik_level5.js

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
  // DARS 41: 섬유 제조 — To'qimachilik
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 5, order_in_level: 1,
    title_kr: '섬유 제조 — 원사 보관과 염색',
    title_uz: "To'qimachilik — Ip saqlash va bo'yash",
    is_free: true,
    content: {
      topic: {
        kr: '원사는 어떻게 보관합니까? 습기가 없는 곳에 보관해야 합니다. 염색 작업은 어떻게 합니까? 원단을 약품에 담그거나 기계로 처리합니다. 온도를 잘 조절해야 합니다. 약품을 정확하게 사용해야 합니다.',
        uz: "Ip qanday saqlanadi? Namliksiz joyda saqlash kerak. Bo'yash qanday qilinadi? Mato kimyoga botiriladi yoki mashinada ishlanadi. Haroratni yaxshi nazorat qilish kerak. Kimyoviy moddani aniq ishlatish kerak."
      },
      grammar: {
        explanation: `-거나 — "...yoki" (tanlov, alternativa)

Tuzilish: [fe'l/sifat] + 거나

• 원사를 정리하거나 보관해야 합니다
  → Ipni tartibga solish yoki saqlash kerak
• 기계로 처리하거나 손으로 합니다
  → Mashinada yoki qo'l bilan qilinadi
• 빨리 가거나 택시를 타세요
  → Tez boring yoki taksi oling

💡 -거나: ikki imkoniyatdan biri

-아야/어야 — "...kerak / shart" (majburiyat)

Tuzilish: [fe'l] + 아야/어야 (doim -해요 shaklida: 아야 해요/어야 해요)

• 습기를 조절해야 합니다   → Namlikni nazorat qilish kerak
• 약품을 정확하게 사용해야 합니다→ Kimyoviy moddani aniq ishlatish kerak
• 온도를 확인해야 합니다   → Haroratni tekshirish kerak`,
        examples: [
          { kr: '원사를 습기가 없는 곳에 보관하거나 건조한 창고에 넣어야 합니다.', uz: "Ipni namliksiz joyda saqlash yoki quruq omborga qo'yish kerak." },
          { kr: '염색하기 전에 원단의 상태를 확인해야 합니다.',                     uz: "Bo'yashdan oldin matoning holatini tekshirish kerak." },
          { kr: '약품 사용 시 반드시 보호 장갑을 착용하거나 마스크를 써야 합니다.',  uz: "Kimyo ishlatganda albatta himoya qo'lqop kiyish yoki niqob taqish kerak." },
          { kr: '온도를 일정하게 유지해야 염색이 균일하게 됩니다.',                  uz: "Haroratni bir xil ushlab turish kerak, bo'yash bir tekis chiqadi." },
          { kr: '원단을 담그거나 기계로 처리하면 색상이 균일해집니다.',              uz: "Mato botirilsa yoki mashinada ishlanilsa rang bir xil chiqadi." },
        ]
      },
      vocabulary: [
        { kr: '원사',     romanization: 'wonsa',         uz: 'ip (xom ashyo)' },
        { kr: '보관하다', romanization: 'bogwanhada',    uz: 'saqlamoq' },
        { kr: '관리하다', romanization: 'gwallihada',    uz: 'boshqarmoq' },
        { kr: '습기',     romanization: 'seupgi',        uz: 'namlik' },
        { kr: '온도',     romanization: 'ondo',          uz: 'harorat' },
        { kr: '건조하다', romanization: 'geonjohada',    uz: 'quruq' },
        { kr: '보관 장소',romanization: 'bogwan jangso', uz: 'saqlash joyi' },
        { kr: '정리하다', romanization: 'jeongrihada',   uz: 'tartibga solmoq' },
        { kr: '염색',     romanization: 'yeomsaek',      uz: "bo'yash" },
        { kr: '원단',     romanization: 'wondan',        uz: 'mato' },
        { kr: '색상',     romanization: 'saeksang',      uz: 'rang' },
        { kr: '약품',     romanization: 'yakpum',        uz: 'kimyoviy modda' },
        { kr: '공정',     romanization: 'gongjeong',     uz: 'jarayon' },
        { kr: '담그다',   romanization: 'damgeuda',      uz: 'botirmoq' },
        { kr: '말리다',   romanization: 'mallida',       uz: 'quritmoq' },
        { kr: '처리하다', romanization: 'cheoihada',     uz: 'ishlov bermoq' },
        { kr: '균일하다', romanization: 'gyunilhada',    uz: 'bir tekis, bir xil' },
        { kr: '조절하다', romanization: 'jojeolhada',    uz: 'nazorat qilmoq, sozlamoq' },
        { kr: '섬유',     romanization: 'seomyu',        uz: "to'qimachilik, tolali" },
        { kr: '마스크',   romanization: 'maseukheu',     uz: 'niqob, maska' },
      ],
      examples: [
        { kr: '원사는 햇빛이 없는 건조한 창고에 보관해야 합니다.',           uz: "Ip quyosh tegmaydigan quruq omborga saqlanishi kerak." },
        { kr: '염색 약품을 다룰 때는 반드시 보호 장갑을 착용해야 합니다.',   uz: "Bo'yash kimyosini ishlatganda albatta himoya qo'lqop kiyish kerak." },
        { kr: '원단을 약품에 30분 동안 담그거나 기계로 처리합니다.',         uz: "Mato 30 daqiqa kimyoga botiriladi yoki mashinada ishlanadi." },
        { kr: '온도를 정확히 조절해야 색상이 원하는 대로 나옵니다.',          uz: "Haroratni aniq sozlash kerak, shunda rang keraklicha chiqadi." },
        { kr: '작업 후에는 반드시 손을 씻거나 보호 크림을 발라야 합니다.',    uz: "Ishdan keyin albatta qo'l yuvish yoki himoya krem surish kerak." },
      ],
      dialog: [
        { speaker: 'A', kr: '원사는 어떻게 보관합니까?',                uz: "Ip qanday saqlanadi?" },
        { speaker: 'B', kr: '습기가 없는 곳에 보관해야 합니다.',          uz: "Namliksiz joyda saqlash kerak." },
        { speaker: 'A', kr: '염색 작업은 어떻게 합니까?',                uz: "Bo'yash qanday qilinadi?" },
        { speaker: 'B', kr: '원단을 약품에 담그거나 기계로 처리합니다.',   uz: "Mato kimyoga botiriladi yoki mashinada ishlanadi." },
        { speaker: 'A', kr: '주의할 점은 무엇입니까?',                   uz: "Nimaga e'tibor berish kerak?" },
        { speaker: 'B', kr: '온도를 잘 조절해야 합니다. 약품도 정확하게 사용해야 합니다.', uz: "Haroratni yaxshi nazorat qilish kerak. Kimyoni ham aniq ishlatish kerak." },
      ],
      notes: [
        "-거나: yoki: 담그거나 처리합니다(botiriladi yoki ishlanadi).",
        "-아야/어야 해요: majburiyat: 보관해야(saqlash kerak), 조절해야(nazorat kerak).",
        "섬유 (to'qimachilik) — Koreya eksporti uchun muhim sanoat tarmoqlaridan biri.",
        "습기 boshqarish — ip saqlaganda namlik ko'paysa sifat pasayadi.",
        "Kimyoviy moddalar bilan ishlashda: qo'lqop + niqob + shamollatish — majburiy.",
      ],
      games: {
        matchPairs: [
          { kr: '원사',     uz: 'ip (xom ashyo)' },
          { kr: '염색',     uz: "bo'yash" },
          { kr: '습기',     uz: 'namlik' },
          { kr: '원단',     uz: 'mato' },
          { kr: '담그다',   uz: 'botirmoq' },
          { kr: '조절하다', uz: 'sozlamoq' },
        ],
        fillBlank: [
          { sentence: '원단을 약품에 담그___ 기계로 처리합니다.', answer: '거나',   options: ['거나','서','고','면'],      uz: "Mato kimyoga botiriladi yoki mashinada ishlanadi." },
          { sentence: '습기를 조절해___ 합니다.',                 answer: '야',     options: ['야','서','고','면'],       uz: "Namlikni nazorat qilish kerak." },
          { sentence: '원사는 ___ 가 없는 곳에 보관해야 합니다.', answer: '습기',   options: ['습기','온도','색상','약품'], uz: "Ip namliksiz joyda saqlanishi kerak." },
          { sentence: '약품을 정확하게 사용해___ 합니다.',         answer: '야',     options: ['야','서','고','면'],       uz: "Kimyoviy moddani aniq ishlatish kerak." },
          { sentence: '염색 후에 원단을 ___ 니다.',               answer: '말립',   options: ['말립','보관합','담급','처리합'], uz: "Bo'yashdan keyin mato quritiladi." },
        ],
        scramble: [
          { kr: '원사',   uz: 'ip' },
          { kr: '염색',   uz: "bo'yash" },
          { kr: '습기',   uz: 'namlik' },
          { kr: '온도',   uz: 'harorat' },
          { kr: '원단',   uz: 'mato' },
        ],
      },
    },
    quiz: [
      { question: "'-거나' nimani anglatadi?",                  options: ['va, keyin','yoki (tanlov)','shuning uchun','lekin'],                    correct_index: 1 },
      { question: "'-아야/어야 해요' nimani bildiradi?",         options: ['istak','ehtimol','majburiyat (kerak)','taklif'],                        correct_index: 2 },
      { question: "'습기' nimani anglatadi?",                   options: ['harorat','namlik','rang','jarayon'],                                    correct_index: 1 },
      { question: "'담그다' nimani anglatadi?",                  options: ['quritmoq','tartiblamoq','botirmoq','saqlamoq'],                         correct_index: 2 },
      { question: "'원단' nimani anglatadi?",                   options: ['ip','mato','rang','kimyo'],                                             correct_index: 1 },
      { question: "Ip saqlashda eng muhim shart?",             options: ['yorug\' joy','nam joy','namliksiz, quruq joy','issiq joy'],              correct_index: 2 },
      { question: "'조절하다' nimani anglatadi?",               options: ['saqlash','bo\'yamoq','sozlamoq, nazorat qilmoq','tekshirmoq'],          correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 42: 가구 제작 — Mebel ishlab chiqarish
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 5, order_in_level: 2,
    title_kr: '가구 제작 — 연마와 도장',
    title_uz: "Mebel ishlab chiqarish — Silliqlash va bo'yash",
    is_free: true,
    content: {
      topic: {
        kr: '가구 제작은 어떻게 준비합니까? 재료를 측정하고 목재를 자릅니다. 연마 작업은 왜 필요합니까? 표면이 거칠까 봐 연마합니다. 도장은 언제 합니까? 연마가 끝난 후에 한다고 했습니다.',
        uz: "Mebel ishlab chiqarish qanday tayyorlanadi? Material o'lchanadi va yog'och kesiladi. Silliqlash nega kerak? Sirt qo'pol bo'lib qolmasin deb silliqlanadi. Bo'yash qachon? Silliqlash tugagandan keyin deyishdi."
      },
      grammar: {
        explanation: `-(으)ㄹ까 봐 — "...bo'lishidan qo'rqib / ehtiyot bo'lib"

Tuzilish: [fe'l/sifat] + (으)ㄹ까 봐

• 제품이 망가질까 봐 조심합니다
  → Mahsulot buzilib qolmasin deb ehtiyot bo'laman
• 다칠까 봐 보호 장비를 착용합니다
  → Jarohatlanib qolmaslik uchun himoya kiyaman
• 표면이 거칠까 봐 연마합니다
  → Sirt qo'pol bo'lib qolmasin deb silliqlanadi

💡 -(으)ㄹ까 봐: salbiy natijadan qo'rqib ehtiyot chorasi

-느냐고/(으)냐고 하다 — savolni yetkazish (reported question)

• 언제 시작하느냐고 물었습니다
  → Qachon boshlashini so'radim
• 어떻게 하느냐고 했어요
  → Qanday qilishni so'radi
• 얼마냐고 물었어요
  → Qancha ekanini so'rdim`,
        examples: [
          { kr: '목재가 뒤틀릴까 봐 온도와 습도를 조절합니다.',            uz: "Yog'och burilib ketmasin deb harorat va namlikni sozlaydi." },
          { kr: '표면이 거칠까 봐 연마기로 꼼꼼히 작업합니다.',            uz: "Sirt qo'pol bo'lib qolmasin deb silliqlovchi asbob bilan ehtiyotkorlik bilan ishlaydi." },
          { kr: '도장이 벗겨질까 봐 여러 번 칠합니다.',                   uz: "Bo'yoq to'kilib qolmasin deb bir necha marta bo'yaladi." },
          { kr: '가구 크기가 맞는지 어떻게 재느냐고 물었어요.',            uz: "Mebel o'lchamini qanday o'lchashini so'rdim." },
          { kr: '연마가 끝나면 표면이 매끄러워지고 도장이 잘 됩니다.',     uz: "Silliqlash tugasa sirt silliqlashadi va bo'yash yaxshi chiqadi." },
        ]
      },
      vocabulary: [
        { kr: '가구',     romanization: 'gagu',          uz: 'mebel' },
        { kr: '제작하다', romanization: 'jejakada',      uz: 'ishlab chiqarmoq' },
        { kr: '설계',     romanization: 'seolgye',       uz: 'dizayn, reja' },
        { kr: '목재',     romanization: 'mokjae',        uz: "yog'och" },
        { kr: '자르다',   romanization: 'jareuda',       uz: 'kesmoq' },
        { kr: '측정하다', romanization: 'cheukjeonghada',uz: "o'lchamoq" },
        { kr: '준비하다', romanization: 'junbihada',     uz: 'tayyorlamoq' },
        { kr: '연마하다', romanization: 'yeonmahada',    uz: 'silliqlamoq' },
        { kr: '도장하다', romanization: 'dojanghada',    uz: "bo'yamoq" },
        { kr: '표면',     romanization: 'pyomyeon',      uz: 'sirt' },
        { kr: '거칠다',   romanization: 'geochilda',     uz: "qo'pol" },
        { kr: '매끄럽다', romanization: 'maekkeureupda', uz: 'silliq' },
        { kr: '칠하다',   romanization: 'chilhada',      uz: "bo'yamoq" },
        { kr: '건조하다', romanization: 'geonjohada',    uz: 'qurimoq' },
        { kr: '마르다',   romanization: 'mareuda',       uz: 'qurimoq' },
        { kr: '샌드페이퍼',romanization:'saendeupeipeo', uz: 'zımpara qog\'ozi' },
        { kr: '페인트',   romanization: 'peinteu',       uz: "bo'yoq" },
        { kr: '광택',     romanization: 'gwangtaek',     uz: 'jilo, parlamoq' },
        { kr: '사포',     romanization: 'sapo',          uz: 'silliqlovchi qog\'oz' },
        { kr: '망가지다', romanization: 'manggajida',    uz: 'buzilib qolmoq' },
      ],
      examples: [
        { kr: '가구 제작 전에 설계도를 꼼꼼히 확인해야 합니다.',            uz: "Mebel ishlab chiqarishdan oldin loyihani ehtiyotkorlik bilan tekshirish kerak." },
        { kr: '목재를 자를 때 측정을 정확히 해야 합니다.',                  uz: "Yog'och kesishda o'lchamni aniq qilish kerak." },
        { kr: '표면이 거칠까 봐 연마를 충분히 해야 합니다.',                uz: "Sirt qo'pol bo'lib qolmasin deb silliqlash yetarlicha qilinishi kerak." },
        { kr: '도장하기 전에 연마가 끝났느냐고 확인했습니다.',              uz: "Bo'yashdan oldin silliqlash tugaganini so'rib tekshirdim." },
        { kr: '마지막 도장이 마를 때까지 건드리면 안 됩니다.',              uz: "Oxirgi bo'yoq qurigunga qadar tegish mumkin emas." },
      ],
      dialog: [
        { speaker: 'A', kr: '가구 제작은 어떻게 준비합니까?',              uz: "Mebel ishlab chiqarish qanday tayyorlanadi?" },
        { speaker: 'B', kr: '재료를 측정하고 목재를 자릅니다.',             uz: "Material o'lchanadi va yog'och kesiladi." },
        { speaker: 'A', kr: '연마 작업은 왜 필요합니까?',                  uz: "Silliqlash nega kerak?" },
        { speaker: 'B', kr: '표면이 거칠까 봐 연마합니다.',                 uz: "Sirt qo'pol bo'lib qolmasin deb silliqlanadi." },
        { speaker: 'A', kr: '도장은 언제 합니까?',                         uz: "Bo'yash qachon qilinadi?" },
        { speaker: 'B', kr: '연마가 끝난 후에 한다고 했습니다.',            uz: "Silliqlash tugagandan keyin qilinadi deyishdi." },
      ],
      notes: [
        "-(으)ㄹ까 봐: ehtiyot: 거칠까 봐 연마(qo'pol bo'lmasin deb silliqlash), 망가질까 봐 조심(buzilmasin deb ehtiyot).",
        "-느냐고 하다: savol yetkazish: 언제 하느냐고(qachon qilishini so'radi).",
        "Mebel ishlab chiqarish bosqichlari: 설계→측정→절단→연마→도장→건조.",
        "연마 (silliqlash) — sifatli mebel uchun eng muhim bosqich.",
        "한국 빌트인 가구 — Koreya uylarida ichki o'rnatilgan mebel keng tarqalgan.",
      ],
      games: {
        matchPairs: [
          { kr: '목재',     uz: "yog'och" },
          { kr: '연마하다', uz: 'silliqlamoq' },
          { kr: '표면',     uz: 'sirt' },
          { kr: '거칠다',   uz: "qo'pol" },
          { kr: '매끄럽다', uz: 'silliq' },
          { kr: '망가지다', uz: 'buzilib qolmoq' },
        ],
        fillBlank: [
          { sentence: '표면이 거칠___ 봐 연마합니다.',            answer: '까',    options: ['까','고','서','면'],            uz: "Sirt qo'pol bo'lib qolmasin deb silliqlanadi." },
          { sentence: '언제 시작하___ 고 물었습니다.',            answer: '느냐',  options: ['느냐','는다','라','자'],        uz: "Qachon boshlashini so'radim." },
          { sentence: '재료를 ___ 하고 목재를 자릅니다.',         answer: '측정',  options: ['측정','연마','도장','청소'],    uz: "Material o'lchanadi va yog'och kesiladi." },
          { sentence: '도장이 벗겨질까 봐 여러 번 ___ 니다.',    answer: '칩',    options: ['칩','끊','봅','갑'],            uz: "Bo'yoq to'kilib qolmasin deb bir necha marta bo'yaladi." },
          { sentence: '연마가 끝나면 표면이 ___ 워집니다.',       answer: '매끄럽',options: ['매끄럽','거칠','작','크'],       uz: "Silliqlash tugasa sirt silliqlashadi." },
        ],
        scramble: [
          { kr: '가구',   uz: 'mebel' },
          { kr: '목재',   uz: "yog'och" },
          { kr: '연마',   uz: 'silliqlash' },
          { kr: '도장',   uz: "bo'yash" },
          { kr: '표면',   uz: 'sirt' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄹ까 봐' nimani bildiradi?",           options: ['istak','...bo\'lishidan qo\'rqib (ehtiyot)','taklif','savol'],          correct_index: 1 },
      { question: "'-느냐고 하다' qanday vazifasi bor?",         options: ['buyruq yetkazish','taklif yetkazish','savolni yetkazish','holat'],      correct_index: 2 },
      { question: "'연마하다' nimani anglatadi?",               options: ["bo'yamoq",'kesmoq','silliqlamoq','o\'lchamoq'],                          correct_index: 2 },
      { question: "'거칠다' nimani anglatadi?",                 options: ['silliq','chiroyli',"qo'pol",'katta'],                                    correct_index: 2 },
      { question: "Mebel ishlab chiqarish qaysi bosqichdan keyin bo'yaladi?", options: ['kesishdan','o\'lchashdan','silliqlashdan','quritishdan'],   correct_index: 2 },
      { question: "'목재' nimani anglatadi?",                   options: ['mebel','asbob',"yog'och",'material'],                                   correct_index: 2 },
      { question: "'망가지다' nimani anglatadi?",               options: ['tayyorlanmoq','silliqlanmoq','buzilib qolmoq','qurimoq'],                correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 43: 건축 시공 — Qurilish ishlari
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 5, order_in_level: 3,
    title_kr: '건축 시공 — 철근과 거푸집',
    title_uz: "Qurilish ishlari — Armatura va qolip",
    is_free: false,
    content: {
      topic: {
        kr: '철근은 어떻게 결속합니까? 철근을 단단히 묶어서 고정합니다. 왜 그렇게 해야 합니까? 구조를 지지해야 할 텐데요. 거푸집은 언제 설치합니까? 콘크리트를 붓기 전에 설치할걸요.',
        uz: "Armatura qanday bog'lanadi? Armaturani mahkam bog'lab mustahkamlaymiz. Nega shunday qilish kerak? Tuzilmani ushlab turish kerak bo'ladi. Qolip qachon o'rnatiladi? Beton quyishdan oldin o'rnatiladi shekilli."
      },
      grammar: {
        explanation: `-(으)ㄹ 텐데 — taxmin + keyingi fikr

"...bo'lsa kerak, shuning uchun..."

• 작업이 어려울 텐데 조심하세요
  → Ish qiyin bo'lsa kerak, ehtiyot bo'ling
• 시간이 부족할 텐데 빨리 합시다
  → Vaqt kam bo'lsa kerak, tezroq qilaylik
• 구조를 지지해야 할 텐데요
  → Tuzilmani ushlab turish kerak bo'ladi

💡 -(으)ㄹ 텐데 = taxmin qilib, keyingi gapga o'tish

-(으)ㄹ걸요 — taxmin / muloyim fikr

• 문제가 없을걸요      → Muammo bo'lmasa kerak
• 내일 비가 올걸요     → Ertaga yomg'ir yog'sa kerak
• 설치할걸요           → O'rnatiladi shekilli

💡 -(으)ㄹ걸요: aniq bo'lmagan, muloyim taxmin`,
        examples: [
          { kr: '철근 작업이 힘들 텐데 천천히 하세요.',              uz: "Armatura ishi og'ir bo'lsa kerak, sekin qiling." },
          { kr: '거푸집 설치가 복잡할 텐데 도와드릴까요?',             uz: "Qolip o'rnatish murakkab bo'lsa kerak, yordam beraymi?" },
          { kr: '콘크리트가 굳었을걸요. 이제 거푸집을 해체해도 돼요.', uz: "Beton qotdi shekilli. Endi qolipni olib tashlasa bo'ladi." },
          { kr: '철근을 단단히 묶어야 구조가 튼튼해집니다.',            uz: "Armaturani mahkam bog'lash kerak, shunda tuzilma mustahkam bo'ladi." },
          { kr: '오늘 안에 거푸집 설치가 끝날걸요.',                   uz: "Bugun ichida qolip o'rnatish tugasa kerak." },
        ]
      },
      vocabulary: [
        { kr: '철근',     romanization: 'cheolgeun',    uz: 'armatura' },
        { kr: '결속하다', romanization: 'gyeolsokhada', uz: "bog'lamoq" },
        { kr: '묶다',     romanization: 'mukda',        uz: "bog'lamoq" },
        { kr: '고정하다', romanization: 'gojeongahda',  uz: 'mahkamlash' },
        { kr: '설치하다', romanization: 'seolchihada',  uz: "o'rnatmoq" },
        { kr: '구조',     romanization: 'gujo',         uz: 'tuzilma' },
        { kr: '지지하다', romanization: 'jijihada',     uz: "qo'llab-quvvatlamoq" },
        { kr: '거푸집',   romanization: 'geoupjip',     uz: 'qolip (forma)' },
        { kr: '해체하다', romanization: 'haechaehada',  uz: 'olib tashlamoq' },
        { kr: '콘크리트', romanization: 'konkeuriteu',  uz: 'beton' },
        { kr: '부어 넣다',romanization: 'bueo neota',   uz: 'quyib solmoq' },
        { kr: '굳다',     romanization: 'gutda',        uz: 'qotmoq' },
        { kr: '확인하다', romanization: 'hwaginhada',   uz: 'tekshirmoq' },
        { kr: '튼튼하다', romanization: 'teunteunhada', uz: 'mustahkam' },
        { kr: '기초',     romanization: 'gicho',        uz: 'poydevor' },
        { kr: '벽',       romanization: 'byeok',        uz: 'devor' },
        { kr: '기둥',     romanization: 'gidung',       uz: 'ustun' },
        { kr: '보',       romanization: 'bo',           uz: 'to\'sin (balka)' },
        { kr: '시공하다', romanization: 'sigonghada',   uz: 'qurilish qilmoq' },
        { kr: '공사',     romanization: 'gongsa',       uz: 'qurilish ishlari' },
      ],
      examples: [
        { kr: '철근을 단단히 묶어서 고정해야 콘크리트를 부을 수 있습니다.',   uz: "Armaturani mahkam bog'lab mahkamlash kerak, shunda beton quysa bo'ladi." },
        { kr: '거푸집 설치가 잘 됐는지 콘크리트를 붓기 전에 확인합시다.',    uz: "Qolip yaxshi o'rnatilganini beton quyishdan oldin tekshiraylik." },
        { kr: '작업이 많을 텐데 팀으로 나눠서 하면 빠를 거예요.',            uz: "Ish ko'p bo'lsa kerak, jamoaga bo'lib qilsak tez bo'ladi." },
        { kr: '콘크리트가 굳은 다음에 거푸집을 조심스럽게 해체합니다.',       uz: "Beton qotgandan keyin qolipni ehtiyotkorlik bilan olib tashlanadi." },
        { kr: '오늘 날씨가 추울 텐데 콘크리트가 잘 굳을지 걱정돼요.',        uz: "Bugun havo sovuq bo'lsa kerak, beton yaxshi qotadimi deb xavotirman." },
      ],
      dialog: [
        { speaker: 'A', kr: '철근은 어떻게 결속합니까?',                uz: "Armatura qanday bog'lanadi?" },
        { speaker: 'B', kr: '철근을 단단히 묶어서 고정합니다.',           uz: "Armaturani mahkam bog'lab mustahkamlaymiz." },
        { speaker: 'A', kr: '왜 그렇게 해야 합니까?',                   uz: "Nega shunday qilish kerak?" },
        { speaker: 'B', kr: '구조를 지지해야 할 텐데요.',                uz: "Tuzilmani ushlab turish kerak bo'ladi." },
        { speaker: 'A', kr: '거푸집은 언제 설치합니까?',                 uz: "Qolip qachon o'rnatiladi?" },
        { speaker: 'B', kr: '콘크리트를 붓기 전에 설치할걸요.',          uz: "Beton quyishdan oldin o'rnatiladi shekilli." },
      ],
      notes: [
        "-(으)ㄹ 텐데: taxmin + qo'shimcha fikr: 어려울 텐데(qiyin bo'lsa kerak, shuning uchun...).",
        "-(으)ㄹ걸요: muloyim taxmin: 설치할걸요(o'rnatiladi shekilli), 굳었을걸요(qotdi shekilli).",
        "철근콘크리트 — armaturali beton: zamonaviy qurilishda asosiy material.",
        "거푸집 (qolip/forma): beton qotgunga qadar o'rnatiladi, keyin olib tashlanadi.",
        "Xavfsizlik: qurilishda kran, ekskavator va boshqa og'ir texnika qo'llaniladi.",
      ],
      games: {
        matchPairs: [
          { kr: '철근',     uz: 'armatura' },
          { kr: '거푸집',   uz: 'qolip' },
          { kr: '콘크리트', uz: 'beton' },
          { kr: '굳다',     uz: 'qotmoq' },
          { kr: '지지하다', uz: "qo'llash" },
          { kr: '튼튼하다', uz: 'mustahkam' },
        ],
        fillBlank: [
          { sentence: '작업이 어려울 ___ 조심하세요.',              answer: '텐데',  options: ['텐데','걸요','거든요','는데'],   uz: "Ish qiyin bo'lsa kerak, ehtiyot bo'ling." },
          { sentence: '문제가 없을 ___ 요.',                        answer: '걸',    options: ['걸','텐데','거든','는데'],       uz: "Muammo bo'lmasa kerak." },
          { sentence: '철근을 단단히 묶어서 ___ 합니다.',           answer: '고정',  options: ['고정','청소','연마','도장'],     uz: "Armaturani mahkam bog'lab mahkamlaydi." },
          { sentence: '콘크리트를 붓기 ___ 거푸집을 설치합니다.',  answer: '전에',  options: ['전에','후에','중에','동안에'],   uz: "Beton quyishdan oldin qolip o'rnatiladi." },
          { sentence: '오늘 안에 설치가 끝날 ___ 요.',              answer: '걸',    options: ['걸','텐데','거든','는데'],       uz: "Bugun ichida o'rnatish tugasa kerak." },
        ],
        scramble: [
          { kr: '철근',   uz: 'armatura' },
          { kr: '거푸집', uz: 'qolip' },
          { kr: '구조',   uz: 'tuzilma' },
          { kr: '기초',   uz: 'poydevor' },
          { kr: '공사',   uz: 'qurilish' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄹ 텐데' nimani bildiradi?",           options: ['aniq ma\'lumot','taxmin + keyingi fikr','buyruq','inkor'],              correct_index: 1 },
      { question: "'-(으)ㄹ걸요' nimani bildiradi?",            options: ['aniq buyruq','muloyim taxmin','savol','ehtiyot'],                       correct_index: 1 },
      { question: "'철근' nimani anglatadi?",                   options: ['beton','qolip','armatura','tuzilma'],                                   correct_index: 2 },
      { question: "'굳다' nimani anglatadi?",                   options: ['oqmoq','qotmoq',"bog'lamoq",'o\'rnatmoq'],                              correct_index: 1 },
      { question: "'거푸집' nima?",                             options: ['armatura','beton','qolip (forma)',"yog'och"],                           correct_index: 2 },
      { question: "Beton qachon qolip olib tashlanadi?",        options: ['darhol','qotishidan oldin','qotgandan keyin','o\'rnatishdan oldin'],    correct_index: 2 },
      { question: "'시공하다' nimani anglatadi?",               options: ['loyiha qilmoq','saqlash','qurilish qilmoq','tekshirmoq'],               correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 44: 토목 시공 — Infratuzilma qurilishi
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 5, order_in_level: 4,
    title_kr: '토목 시공 — 준설과 상하수도',
    title_uz: "Infratuzilma qurilishi — Daryo tozalash va suv tizimi",
    is_free: false,
    content: {
      topic: {
        kr: '준설 작업은 어떻게 합니까? 흙과 모래를 파서 제거합니다. 작업할 때 주의해야겠습니다. 상하수도는 어떻게 설치합니까? 물이 잘 흐르도록 배관을 연결합니다. 안전하게 작업하도록 합니다.',
        uz: "Daryo tozalash qanday amalga oshiriladi? Tuproq va qum qazilib olib tashlanadi. Ish vaqtida xavfsiz ishlashim kerak. Suv tizimi qanday o'rnatiladi? Suv yaxshi oqishi uchun quvurlar ulanadi. Xavfsiz ishlashga harakat qilamiz."
      },
      grammar: {
        explanation: `-아야겠/어야겠- — "...qilishim kerak" (zarurat + qaror)

Tuzilish: [fe'l] + 아야겠/어야겠 + 습니다/어요

• 빨리 작업해야겠습니다     → Tez ishlashim kerak
• 점검해야겠어요             → Tekshirishim kerak
• 안전하게 해야겠습니다     → Xavfsiz qilishim kerak

💡 -아야겠-: -아야 해요보다 강한 결심
O'z-o'ziga va boshqalarga aytish uchun

-도록 — "...qilib, ...uchun, ...shunday"

• 안전하게 작업하도록 합니다
  → Xavfsiz ishlashga harakat qilamiz
• 물이 잘 흐르도록 설치합니다
  → Suv yaxshi oqishi uchun o'rnatiladi
• 늦지 않도록 빨리 합시다
  → Kechikmaslik uchun tezroq qilaylik`,
        examples: [
          { kr: '강이 얕아져서 준설 작업을 해야겠습니다.',             uz: "Daryo sayozlashib ketgani uchun tozalash ishi qilishim kerak." },
          { kr: '배관이 막히지 않도록 정기적으로 점검합니다.',          uz: "Quvur tiqilib qolmasligi uchun muntazam tekshiriladi." },
          { kr: '물이 깨끗하게 흐르도록 관리해야겠습니다.',             uz: "Suv toza oqishi uchun boshqarishim kerak." },
          { kr: '하천 바닥에 쌓인 흙과 모래를 파내야겠습니다.',        uz: "Daryo tubida yig'ilgan tuproq va qumni qaziib olishim kerak." },
          { kr: '안전하게 작업하도록 모든 장비를 점검합시다.',          uz: "Xavfsiz ishlashga harakat qilib barcha uskunalarni tekshiraylik." },
        ]
      },
      vocabulary: [
        { kr: '준설',     romanization: 'junseol',      uz: "daryo tozalash (qazish)" },
        { kr: '하천',     romanization: 'hacheon',      uz: 'daryo' },
        { kr: '흙',       romanization: 'heuk',         uz: 'tuproq' },
        { kr: '모래',     romanization: 'morae',        uz: 'qum' },
        { kr: '파다',     romanization: 'pada',         uz: 'qazimoq' },
        { kr: '제거하다', romanization: 'jegeohada',    uz: 'olib tashlamoq' },
        { kr: '장비',     romanization: 'jangbi',       uz: 'uskunalar' },
        { kr: '운반하다', romanization: 'unbanhada',    uz: 'tashimoq' },
        { kr: '상수도',   romanization: 'sangsudo',     uz: 'ichimlik suvi tizimi' },
        { kr: '하수도',   romanization: 'hasudo',       uz: 'kanalizatsiya' },
        { kr: '배관',     romanization: 'baegwan',      uz: 'quvurlar' },
        { kr: '설치하다', romanization: 'seolchihada',  uz: "o'rnatmoq" },
        { kr: '연결하다', romanization: 'yeongyeolhada',uz: 'ulash' },
        { kr: '흐르다',   romanization: 'heureurda',    uz: 'oqmoq' },
        { kr: '점검하다', romanization: 'jeomgeonhada', uz: 'tekshirmoq' },
        { kr: '유지하다', romanization: 'yujihada',     uz: 'saqlamoq' },
        { kr: '굴착기',   romanization: 'gulchakgi',    uz: 'ekskavator' },
        { kr: '댐',       romanization: 'daem',         uz: 'to\'g\'on' },
        { kr: '터널',     romanization: 'teonel',       uz: 'tunnel' },
        { kr: '도로',     romanization: 'doro',         uz: "yo'l" },
      ],
      examples: [
        { kr: '준설 장비인 굴착기를 사용해서 하천 바닥을 청소합니다.',    uz: "Ekskavator kabi tozalash uskunasidan foydalanib daryo tubini tozalaymiz." },
        { kr: '상수도 배관이 막히지 않도록 정기적으로 점검해야겠어요.',   uz: "Ichimlik suvi quvurlari tiqilib qolmasligi uchun muntazam tekshirishim kerak." },
        { kr: '하수도를 설치할 때는 물이 잘 흐르도록 경사를 맞춥니다.', uz: "Kanalizatsiya o'rnatishda suv yaxshi oqishi uchun qiyalik to'g'rilanadi." },
        { kr: '큰 도로 공사할 때는 안전하게 작업하도록 교통을 통제합니다.', uz: "Katta yo'l qurilishida xavfsiz ishlash uchun transportni nazorat qilamiz." },
        { kr: '터널 공사가 복잡해서 빨리 끝내야겠습니다.',               uz: "Tunnel qurilishi murakkab, tez tugatishim kerak." },
      ],
      dialog: [
        { speaker: 'A', kr: '준설 작업은 어떻게 합니까?',               uz: "Daryo tozalash qanday amalga oshiriladi?" },
        { speaker: 'B', kr: '흙과 모래를 파서 제거합니다.',              uz: "Tuproq va qum qazilib olib tashlanadi." },
        { speaker: 'A', kr: '작업할 때 무엇을 주의해야 합니까?',         uz: "Ish vaqtida nimaga e'tibor berish kerak?" },
        { speaker: 'B', kr: '안전하게 작업해야겠습니다.',                uz: "Xavfsiz ishlashim kerak." },
        { speaker: 'A', kr: '상하수도는 어떻게 설치합니까?',             uz: "Suv tizimi qanday o'rnatiladi?" },
        { speaker: 'B', kr: '물이 잘 흐르도록 배관을 연결합니다.',       uz: "Suv yaxshi oqishi uchun quvurlar ulanadi." },
      ],
      notes: [
        "-아야겠-: kuchli qaror: 해야겠습니다(qilishim kerak), 점검해야겠어요(tekshirishim kerak).",
        "-도록: maqsad: 흐르도록(oqishi uchun), 늦지 않도록(kechikmaslik uchun).",
        "상수도 (ichimlik suvi) vs 하수도 (kanalizatsiya) — ikki xil tizim.",
        "준설 (daryo tozalash) — daryo sayozlashganda yoki toshib ketmasligi uchun.",
        "토목 공사 — infratuzilma: ko'prik, yo'l, suv tizimi, tunnel.",
      ],
      games: {
        matchPairs: [
          { kr: '준설',   uz: 'daryo tozalash' },
          { kr: '하천',   uz: 'daryo' },
          { kr: '배관',   uz: 'quvurlar' },
          { kr: '상수도', uz: 'ichimlik suvi' },
          { kr: '하수도', uz: 'kanalizatsiya' },
          { kr: '흐르다', uz: 'oqmoq' },
        ],
        fillBlank: [
          { sentence: '안전하게 작업해야겠___ 니다.',                    answer: '습',    options: ['습','아','어','었'],            uz: "Xavfsiz ishlashim kerak." },
          { sentence: '물이 잘 흐르___ 배관을 연결합니다.',              answer: '도록',  options: ['도록','거나','아서','지만'],    uz: "Suv yaxshi oqishi uchun quvurlar ulanadi." },
          { sentence: '흙과 모래를 파서 ___ 합니다.',                   answer: '제거',  options: ['제거','설치','연결','확인'],    uz: "Tuproq va qum qazilib olib tashlanadi." },
          { sentence: '점검해야겠___ 요.',                               answer: '어',    options: ['어','아','았','었'],            uz: "Tekshirishim kerak." },
          { sentence: '늦지 않___ 빨리 합시다.',                        answer: '도록',  options: ['도록','거나','아서','지만'],    uz: "Kechikmaslik uchun tezroq qilaylik." },
        ],
        scramble: [
          { kr: '준설',   uz: 'daryo tozalash' },
          { kr: '배관',   uz: 'quvurlar' },
          { kr: '하천',   uz: 'daryo' },
          { kr: '모래',   uz: 'qum' },
          { kr: '도로',   uz: "yo'l" },
        ],
      },
    },
    quiz: [
      { question: "'-아야겠-' nimani bildiradi?",               options: ['istak','kuchli qaror (zarurat)','taklif','savol'],                     correct_index: 1 },
      { question: "'-도록' nimani anglatadi?",                  options: ['sababli','lekin','...qilib, ...uchun (maqsad)','natijasida'],           correct_index: 2 },
      { question: "'준설' nimani anglatadi?",                   options: ['suv tizimi','quvur','daryo tozalash (qazish)','beton'],                 correct_index: 2 },
      { question: "'상수도' va '하수도' farqi?",                options: ['Farq yo\'q','상=ichimlik; 하=kanalizatsiya','하=ichimlik; 상=kanalizatsiya','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'배관' nimani anglatadi?",                   options: ['daryo','tuproq','quvurlar','uskunalar'],                                correct_index: 2 },
      { question: "'파다' nimani anglatadi?",                   options: ['oqmoq','tashimoq','qazimoq','ulash'],                                  correct_index: 2 },
      { question: "토목 공사 misollari?",                       options: ['mebel, libos','ko\'prik, yo\'l, suv tizimi, tunnel','mato, bo\'yash','armatura, beton'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 45: 농작물 재배 — Ekin yetishtirish
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 5, order_in_level: 5,
    title_kr: '농작물 재배 — 씨앗과 수확',
    title_uz: "Ekin yetishtirish — Urug' va hosil yig'ish",
    is_free: false,
    content: {
      topic: {
        kr: '어떤 농작물을 재배합니까? 채소를 재배합니다. 언제 씨앗을 심습니까? 다음 주에 심을까 합니다. 작업 중 주의할 점은 무엇입니까? 농약을 많이 쓰지 말고 안전하게 사용해야 합니다.',
        uz: "Qanday ekin yetishtirasiz? Sabzavot yetishtiraman. Qachon urug' ekasiz? Keyingi hafta ekmoqchiman. Ish paytida nimaga e'tibor berish kerak? Dorini ko'p ishlatmasdan, xavfsiz ishlatish kerak."
      },
      grammar: {
        explanation: `-(으)ㄹ까 하다 — "...qilmoqchiman" (reja / niyat)

Tuzilish: [fe'l] + (으)ㄹ까 하다

• 내일 씨앗을 심을까 합니다  → Ertaga urug' ekmoqchiman
• 비료를 뿌릴까 합니다        → O'g'it sepmoqchiman
• 내년에 바꿀까 해요          → Keyingi yil o'zgartirmoqchiman

💡 -(으)ㄹ까 하다 vs -(으)려고 하다:
려고 하다 = aniq niyat
ㄹ까 하다 = hali aniq bo'lmagan, muloyim reja

-지 말고 — "...qilma, balki ...qil"

• 혼자 하지 말고 같이 하세요
  → Yolg'iz qilma, birga qil
• 농약을 많이 쓰지 말고 적당히 사용하세요
  → Dorini ko'p ishlatma, me'yorida ishlat
• 서두르지 말고 천천히 하세요
  → Shoshilma, sekin qil`,
        examples: [
          { kr: '봄에 씨앗을 심을까 하는데 어떤 채소가 좋을까요?',         uz: "Bahorda urug' ekmoqchiman, qanday sabzavot yaxshi bo'ladi?" },
          { kr: '농약을 너무 쓰지 말고 자연 방제 방법을 써보세요.',         uz: "Dorini juda ko'p ishlatmang, tabiiy nazorat usulini ishlab ko'ring." },
          { kr: '수확하기 전에 비료를 뿌릴까 합니다.',                      uz: "Hosil yig'ishdan oldin o'g'it sepmoqchiman." },
          { kr: '혼자 다 하려고 하지 말고 팀원과 나눠서 하세요.',            uz: "Hammasini yolg'iz qilishga urinmang, jamoa a'zolari bilan bo'ling." },
          { kr: '날이 더울 때 일하지 말고 시원할 때 하세요.',               uz: "Issiq paytda ishlamang, salqin paytda qiling." },
        ]
      },
      vocabulary: [
        { kr: '농작물',   romanization: 'nongjakul',    uz: 'qishloq xo\'jaligi mahsuloti' },
        { kr: '재배하다', romanization: 'jaebaehada',   uz: 'yetishtirmoq' },
        { kr: '씨앗',     romanization: 'ssiat',        uz: "urug'" },
        { kr: '심다',     romanization: 'simda',        uz: 'ekmoq' },
        { kr: '물을 주다',romanization: 'mureul juda',  uz: "sug'ormoq" },
        { kr: '자라다',   romanization: 'jarada',       uz: "o'smoq" },
        { kr: '수확하다', romanization: 'suhwakada',    uz: 'hosil yig\'moq' },
        { kr: '관리하다', romanization: 'gwallihada',   uz: 'parvarish qilmoq' },
        { kr: '과수',     romanization: 'gwasu',        uz: 'mevali daraxt' },
        { kr: '열매',     romanization: 'yeolmae',      uz: 'meva' },
        { kr: '가지',     romanization: 'gaji',         uz: 'shox' },
        { kr: '비료',     romanization: 'biryo',        uz: "o'g'it" },
        { kr: '뿌리다',   romanization: 'ppurida',      uz: 'sepmoq' },
        { kr: '병충해',   romanization: 'byeongchunghae',uz: 'zararkunanda, kasallik' },
        { kr: '방지하다', romanization: 'bangjihada',   uz: 'oldini olmoq' },
        { kr: '농약',     romanization: 'nongyak',      uz: 'pestitsid, ekin dorisi' },
        { kr: '채소',     romanization: 'chaeso',       uz: 'sabzavot' },
        { kr: '텃밭',     romanization: 'teutbat',      uz: "bog'cha, kichik dalasi" },
        { kr: '밭',       romanization: 'bat',          uz: 'dala, ekin maydoni' },
        { kr: '스마트팜', romanization: 'seumateupaem', uz: 'aqlli qishloq xo\'jaligi' },
      ],
      examples: [
        { kr: '봄에 상추와 토마토를 심을까 합니다. 도와주실 수 있어요?', uz: "Bahorda salat va pomidor ekmoqchiman. Yordam bera olasizmi?" },
        { kr: '농약을 많이 쓰지 말고 천연 비료를 사용하는 것이 좋아요.', uz: "Pestitsidni ko'p ishlatmasdan tabiiy o'g'it ishlatish yaxshi." },
        { kr: '비가 오는 날에 씨앗을 심으면 잘 자랄걸요.',             uz: "Yomg'irli kunda urug' eksangiz yaxshi o'sadi shekilli." },
        { kr: '수확하기 전날 물을 주지 말고 다음 날 수확하세요.',       uz: "Hosil yig'ishdan bir kun oldin sug'ormang, keyingi kuni yig'ing." },
        { kr: '병충해를 예방하지 않으면 작물이 상할 수 있어요.',        uz: "Zararkunandaning oldini olmasangiz ekin buzilishi mumkin." },
      ],
      dialog: [
        { speaker: 'A', kr: '어떤 농작물을 재배합니까?',                  uz: "Qanday ekin yetishtirasiz?" },
        { speaker: 'B', kr: '채소를 재배합니다.',                         uz: "Sabzavot yetishtiraman." },
        { speaker: 'A', kr: '언제 씨앗을 심습니까?',                     uz: "Qachon urug' ekasiz?" },
        { speaker: 'B', kr: '다음 주에 심을까 합니다.',                   uz: "Keyingi hafta ekmoqchiman." },
        { speaker: 'A', kr: '작업할 때 주의할 점은 무엇입니까?',          uz: "Ish paytida nimaga e'tibor berish kerak?" },
        { speaker: 'B', kr: '농약을 많이 쓰지 말고 안전하게 사용해야 합니다.', uz: "Dorini ko'p ishlatmasdan, xavfsiz ishlatish kerak." },
      ],
      notes: [
        "-(으)ㄹ까 하다: muloyim reja: 심을까 합니다(ekmoqchiman, hali aniq emas).",
        "-지 말고: ...qilma, balki...: 많이 쓰지 말고(ko'p ishlatma), 혼자 하지 말고(yolg'iz qilma).",
        "스마트팜 — aqlli qishloq xo'jaligi: harorat, namlik, sug'orish avtomatik.",
        "농약 (pestitsid) — foydalanish qoidalari: me'yorida, xavfsizlik jihozlari bilan.",
        "Koreya qishloq xo'jaligi: sabzavot, guruch, meva — asosiy mahsulotlar.",
      ],
      games: {
        matchPairs: [
          { kr: '씨앗',   uz: "urug'" },
          { kr: '심다',   uz: 'ekmoq' },
          { kr: '수확',   uz: 'hosil yig\'ish' },
          { kr: '비료',   uz: "o'g'it" },
          { kr: '농약',   uz: 'pestitsid' },
          { kr: '채소',   uz: 'sabzavot' },
        ],
        fillBlank: [
          { sentence: '다음 주에 씨앗을 심을까 ___.',             answer: '합니다', options: ['합니다','봐요','해요','가요'],  uz: "Keyingi hafta urug' ekmoqchiman." },
          { sentence: '농약을 많이 쓰지 말___ 안전하게 사용하세요.',answer: '고',   options: ['고','서','면','지만'],          uz: "Dorini ko'p ishlatmasdan xavfsiz ishlating." },
          { sentence: '혼자 하지 말___ 같이 하세요.',             answer: '고',    options: ['고','서','면','지만'],           uz: "Yolg'iz qilmang, birga qiling." },
          { sentence: '씨앗을 심으면 잘 자랄___ 요.',            answer: '걸',    options: ['걸','텐데','거든','는데'],        uz: "Urug' eksangiz yaxshi o'sadi shekilli." },
          { sentence: '봄에 채소를 재배할까 ___ 니다.',           answer: '합',    options: ['합','봅','갑','옵'],             uz: "Bahorda sabzavot yetishtirishni o'ylayapman." },
        ],
        scramble: [
          { kr: '씨앗',   uz: "urug'" },
          { kr: '수확',   uz: 'hosil yig\'ish' },
          { kr: '비료',   uz: "o'g'it" },
          { kr: '채소',   uz: 'sabzavot' },
          { kr: '밭',     uz: 'dala' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄹ까 하다' va '-(으)려고 하다' farqi?", options: ['Farq yo\'q','ㄹ까=muloyim reja; 려고=aniq niyat','려고=muloyim','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'-지 말고' nimani anglatadi?",               options: ['...qilgandan keyin','...qilma, balki...qil','...qilish uchun','...qilsa ham'], correct_index: 1 },
      { question: "'씨앗' nimani anglatadi?",                   options: ['hosil','sabzavot',"urug'",'o\'g\'it'],                                          correct_index: 2 },
      { question: "'수확하다' nimani anglatadi?",               options: ['ekmoq','sug\'ormoq','hosil yig\'moq','parvarish qilmoq'],                      correct_index: 2 },
      { question: "'농약' nimani anglatadi?",                   options: ["o'g'it",'suv','pestitsid, ekin dorisi','urug\''],                               correct_index: 2 },
      { question: "'스마트팜' nima?",                           options: ['oddiy ferma','aqlli qishloq xo\'jaligi (texnologiya bilan)','mevali bog\'','chorvachilik'], correct_index: 1 },
      { question: "'뿌리다' nimani anglatadi?",                 options: ['ekmoq','o\'stirmoq','sepmoq','yig\'moq'],                                       correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 46: 사육 관리 — Chorvachilik boshqaruvi
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 5, order_in_level: 6,
    title_kr: '사육 관리 — 사료와 축사 청소',
    title_uz: "Chorvachilik — Ozuqa berish va fermani tozalash",
    is_free: false,
    content: {
      topic: {
        kr: '사료는 어떻게 급여합니까? 정해진 시간에 규칙적으로 먹입니다. 축사는 어떻게 청소합니까? 먼저 오염을 제거하고 물로 씻습니다. 청소한 적이 있습니까? 네, 여러 번 한 적이 있습니다.',
        uz: "Ozuqa qanday beriladi? Belgilangan vaqtda muntazam beriladi. Ferma qanday tozalanadi? Avval ifloslik olib tashlanadi, keyin yuviladi. Oldin tozalaganmisiz? Ha, bir necha marta qilganman."
      },
      grammar: {
        explanation: `-(으)ㄴ 적이 있다 / 없다 — tajriba bildirish

"...qilganman / qilmaganman"

Tuzilish: [fe'l + (으)ㄴ] + 적이 있다/없다

• 사료를 준 적이 있습니다       → Ozuqa berganman
• 축사를 청소한 적이 없습니다   → Fermani tozalaganim yo'q
• 한국에 가 본 적이 있어요?     → Koreyaga borib ko'rganmisiz?

💡 -아/어 본 적이 있다 = tajriba (sinab ko'rish)
-(으)ㄴ 적이 있다   = tajriba (umuman)

-게 하다 — "...qilishga sabab bo'lmoq / majbur qilmoq"

• 동물을 쉬게 합니다          → Hayvonni dam oldiradi
• 깨끗하게 유지하게 합니다    → Toza saqlashga majbur qiladi
• 아이를 공부하게 합니다      → Bolani o'qitadi (o'qishiga sabab bo'ladi)`,
        examples: [
          { kr: '이 농장에서 소를 키운 적이 있습니까?',                uz: "Bu fermada mol boqqanmisiz?" },
          { kr: '사료를 하루에 두 번 규칙적으로 급여한 적이 있어요.',   uz: "Ozuqani kuniga ikki marta muntazam berganman." },
          { kr: '팀장이 동물들을 충분히 쉬게 합니다.',                  uz: "Jamoa boshlig'i hayvonlarni yetarlicha dam oldiradi." },
          { kr: '축사를 소독한 적이 없어서 방법을 배워야겠어요.',        uz: "Fermani dezinfeksiya qilmaganim, usulini o'rganishim kerak." },
          { kr: '동물이 건강하게 자라도록 사료 양을 조절하게 합니다.', uz: "Hayvon sog'lom o'sishi uchun ozuqa miqdorini sozlashga majbur qiladi." },
        ]
      },
      vocabulary: [
        { kr: '사료',     romanization: 'saryo',         uz: 'ozuqa' },
        { kr: '급여하다', romanization: 'geupyeohada',   uz: 'bermoq (oziqlantirmoq)' },
        { kr: '먹이다',   romanization: 'meogida',       uz: 'yedirmoq' },
        { kr: '규칙적으로',romanization:'gyuchikjeogeuro', uz: 'muntazam ravishda' },
        { kr: '건강',     romanization: 'geongang',      uz: "sog'liq" },
        { kr: '확인하다', romanization: 'hwaginhada',    uz: 'tekshirmoq' },
        { kr: '축사',     romanization: 'chuksa',        uz: 'ferma (hayvonlar joyi)' },
        { kr: '청소하다', romanization: 'cheongsohada',  uz: 'tozalamoq' },
        { kr: '오염',     romanization: 'oyeom',         uz: 'ifloslanish' },
        { kr: '제거하다', romanization: 'jegeohada',     uz: 'olib tashlamoq' },
        { kr: '소독하다', romanization: 'sodokhada',     uz: 'dezinfeksiya qilmoq' },
        { kr: '순서',     romanization: 'sunseo',        uz: 'tartib' },
        { kr: '관리하다', romanization: 'gwallihada',    uz: 'boshqarmoq' },
        { kr: '소',       romanization: 'so',            uz: 'mol, sigir' },
        { kr: '돼지',     romanization: 'dwaeji',        uz: "cho'chqa" },
        { kr: '닭',       romanization: 'dak',           uz: 'tovuq' },
        { kr: '여물',     romanization: 'yeomul',        uz: 'em (hayvon uchun)' },
        { kr: '수의사',   romanization: 'suyisa',        uz: 'veterinar' },
        { kr: '예방 접종',romanization: 'yebang jeopsong',uz: "emlash (profilaktika qo'yuv)" },
        { kr: '백신',     romanization: 'baeksin',       uz: 'vaksina' },
      ],
      examples: [
        { kr: '소에게 사료를 하루 세 번 규칙적으로 준 적이 있습니다.',    uz: "Molga ozuqani kuniga uch marta muntazam berganman." },
        { kr: '축사 청소는 먼저 분뇨를 제거하고 물로 씻은 후 소독합니다.', uz: "Ferma tozalashda avval go'ng olib tashlanadi, yuvilib, dezinfeksiya qilinadi." },
        { kr: '팀장이 모든 동물에게 정기적으로 예방 접종을 맞게 합니다.', uz: "Jamoa boshlig'i barcha hayvonlarga muntazam emlashni qildiradi." },
        { kr: '닭을 키운 적이 없어서 처음에 어려웠습니다.',              uz: "Tovuq boqqanim yo'q, dastlab qiyin bo'ldi." },
        { kr: '동물들이 건강하게 지내도록 매일 상태를 확인하게 합니다.', uz: "Hayvonlar sog'lom bo'lishi uchun har kuni holatini tekshirishga majbur qiladi." },
      ],
      dialog: [
        { speaker: 'A', kr: '사료는 어떻게 급여합니까?',                uz: "Ozuqa qanday beriladi?" },
        { speaker: 'B', kr: '정해진 시간에 규칙적으로 먹입니다.',        uz: "Belgilangan vaqtda muntazam beriladi." },
        { speaker: 'A', kr: '축사는 어떻게 청소합니까?',                uz: "Ferma qanday tozalanadi?" },
        { speaker: 'B', kr: '먼저 오염을 제거하고 물로 씻습니다.',       uz: "Avval ifloslik olib tashlanadi, keyin yuviladi." },
        { speaker: 'A', kr: '청소한 적이 있습니까?',                    uz: "Oldin tozalaganmisiz?" },
        { speaker: 'B', kr: '네, 여러 번 한 적이 있습니다.',             uz: "Ha, bir necha marta qilganman." },
      ],
      notes: [
        "-(으)ㄴ 적이 있다/없다: tajriba: 청소한 적이 있습니다(tozalaganman), 한 적이 없습니다(qilmaganman).",
        "-게 하다: sabab: 쉬게 합니다(dam oldiradi), 먹게 합니다(yediradi).",
        "Ozuqa berish tartibi: muntazam vaqt, to'g'ri miqdor — hayvon sog'lig'i uchun muhim.",
        "축사 tozalash tartibi: 1) olib tashlash 2) suvda yuvish 3) dezinfeksiya.",
        "예방 접종 (emlash) — hayvon kasalliklarining oldini olish uchun.",
      ],
      games: {
        matchPairs: [
          { kr: '사료',     uz: 'ozuqa' },
          { kr: '축사',     uz: 'ferma' },
          { kr: '소독하다', uz: 'dezinfeksiya qilmoq' },
          { kr: '규칙적으로',uz: 'muntazam' },
          { kr: '수의사',   uz: 'veterinar' },
          { kr: '백신',     uz: 'vaksina' },
        ],
        fillBlank: [
          { sentence: '사료를 준 적이 ___ 습니다.',              answer: '있',    options: ['있','없','했','갔'],            uz: "Ozuqa berganman." },
          { sentence: '동물을 쉬___ 합니다.',                    answer: '게',    options: ['게','서','고','면'],            uz: "Hayvonni dam oldiradi." },
          { sentence: '먼저 오염을 제거하고 물로 ___ 습니다.',   answer: '씻',    options: ['씻','먹','봅','갑'],            uz: "Avval ifloslik olib, keyin yuviladi." },
          { sentence: '규칙적으___ 사료를 급여합니다.',           answer: '로',    options: ['로','에','를','가'],            uz: "Muntazam ravishda ozuqa beriladi." },
          { sentence: '청소한 적이 ___ 어요.',                   answer: '없',    options: ['없','있','했','갔'],            uz: "Tozalaganim yo'q." },
        ],
        scramble: [
          { kr: '사료',   uz: 'ozuqa' },
          { kr: '축사',   uz: 'ferma' },
          { kr: '청소',   uz: 'tozalash' },
          { kr: '건강',   uz: "sog'liq" },
          { kr: '소독',   uz: 'dezinfeksiya' },
        ],
      },
    },
    quiz: [
      { question: "'청소한 적이 있습니다' — '-(으)ㄴ 적이 있다' nima?", options: ['istak','tajriba bildirish','kelajak','shart'],                    correct_index: 1 },
      { question: "'-게 하다' nimani bildiradi?",                        options: ['o\'z-o\'ziga','...qilishga sabab bo\'lmoq / majbur qilmoq','inkor','savol'], correct_index: 1 },
      { question: "'축사' nimani anglatadi?",                            options: ['oshxona','ombor','ferma (hayvonlar joyi)','zavod'],                correct_index: 2 },
      { question: "'소독하다' nimani anglatadi?",                        options: ['tozalamoq','yuvmoq','dezinfeksiya qilmoq','tekshirmoq'],          correct_index: 2 },
      { question: "'규칙적으로' nimani anglatadi?",                      options: ['tez-tez','doim','muntazam ravishda','ba\'zan'],                   correct_index: 2 },
      { question: "Ferma tozalash to'g'ri tartibi?",                    options: ['dezinfeksiya→yuvish→olib tashlash','olib tashlash→yuvish→dezinfeksiya','yuvish→olib tashlash','dezinfeksiya→olib tashlash'], correct_index: 1 },
      { question: "'수의사' nimani anglatadi?",                          options: ['ferma boshlig\'i','ozuqa beruvchi','veterinar','qo\'riqchi'],      correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 47: 연안 어업과 양식 — Baliqchilik
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 5, order_in_level: 7,
    title_kr: '연안 어업과 양식',
    title_uz: "Baliqchilik va akvakultura",
    is_free: false,
    content: {
      topic: {
        kr: '어업 작업은 어떻게 합니까? 그물을 던지고 물고기를 잡습니다. 양식장은 어떻게 관리합니까? 수질을 유지하면서 먹이를 공급합니다. 작업하는 동안에 안전을 지키기로 했습니다.',
        uz: "Baliq ovlash qanday qilinadi? To'r tashlab baliq tutamiz. Baliq yetishtirish joyi qanday boshqariladi? Suv sifati saqlanadi va ozuqa beriladi. Ish davomida xavfsizlikka amal qilishga qaror qildik."
      },
      grammar: {
        explanation: `-는 동안에 — "...davomida" (jarayon ichida)

Tuzilish: [fe'l] + 는 동안에

• 작업하는 동안에 조심하세요
  → Ish davomida ehtiyot bo'ling
• 물고기가 자라는 동안에 관리해야 합니다
  → Baliq o'sish jarayonida boshqarish kerak
• 일하는 동안에 핸드폰을 보지 마세요
  → Ishlash davomida telefon ko'rmang

💡 -는 동안에 vs -(으)면서:
동안에 = belgilangan vaqt ichida (muddatli)
면서   = bir vaqtda (ayni paytda)

-기로 하다 — qaror qilish

• 내일부터 시작하기로 했습니다  → Ertadan boshlashga qaror qildik
• 안전을 지키기로 했습니다       → Xavfsizlikka amal qilishga qaror qildik
• 같이 하기로 했어요             → Birga qilishga qaror qildik`,
        examples: [
          { kr: '그물을 끌어올리는 동안에 균형을 잘 잡아야 합니다.',          uz: "To'rni tortib chiqarish davomida muvozanatni yaxshi saqlamoq kerak." },
          { kr: '양식장 물고기가 자라는 동안에 수질을 매일 확인합니다.',      uz: "Baliq yetishtirish joyida baliq o'sish davomida har kuni suv sifati tekshiriladi." },
          { kr: '올해부터 양식 규모를 두 배로 늘리기로 했습니다.',            uz: "Bu yildan baliq yetishtirish hajmini ikki baravarga ko'paytirishga qaror qildik." },
          { kr: '배를 타는 동안에 구명조끼를 반드시 착용하기로 했습니다.',    uz: "Qayiqda turish davomida albatta qutqaruv vositasi kiyishga qaror qildik." },
          { kr: '수질이 나빠지는 동안에 빨리 조치를 취해야 합니다.',         uz: "Suv sifati yomonlashish davomida tezda choralar ko'rish kerak." },
        ]
      },
      vocabulary: [
        { kr: '어구',     romanization: 'eogu',          uz: 'baliq ovlash jihozi' },
        { kr: '그물',     romanization: 'geumul',        uz: "to'r" },
        { kr: '낚시',     romanization: 'naksi',         uz: 'qarmoq' },
        { kr: '배',       romanization: 'bae',           uz: 'qayiq, kema' },
        { kr: '잡다',     romanization: 'japda',         uz: 'tutmoq' },
        { kr: '던지다',   romanization: 'deonjida',      uz: 'uloqtirmoq, tashlamoq' },
        { kr: '끌어올리다',romanization:'kkeureo ollida', uz: 'tortib chiqarmoq' },
        { kr: '수확하다', romanization: 'suhwakada',     uz: "yig'ib olmoq" },
        { kr: '양식',     romanization: 'yangsik',       uz: 'baliq yetishtirish' },
        { kr: '수조',     romanization: 'sujo',          uz: 'suv havzasi' },
        { kr: '먹이',     romanization: 'meogi',         uz: 'ozuqa' },
        { kr: '공급하다', romanization: 'gonggeubhada',  uz: "ta'minlamoq" },
        { kr: '관리하다', romanization: 'gwallihada',    uz: 'boshqarmoq' },
        { kr: '성장하다', romanization: 'seongjangada',  uz: "o'smoq" },
        { kr: '수질',     romanization: 'suil',          uz: 'suv sifati' },
        { kr: '유지하다', romanization: 'yujihada',      uz: 'saqlamoq' },
        { kr: '구명조끼', romanization: 'gumyeongjoyki', uz: 'qutqaruv vositasi (life jacket)' },
        { kr: '물고기',   romanization: 'mulgogi',       uz: 'baliq' },
        { kr: '어선',     romanization: 'eoseon',        uz: 'baliqchilik kemasi' },
        { kr: '항구',     romanization: 'hanggu',        uz: 'port, qo\'ltuq' },
      ],
      examples: [
        { kr: '그물을 바다에 던지고 30분 기다린 후 끌어올립니다.',            uz: "To'rni dengizga tashlab 30 daqiqa kutib, tortib chiqariladi." },
        { kr: '양식장 수질이 나빠지는 동안에 즉시 산소를 공급해야 합니다.',   uz: "Baliq yetishtirish joyida suv sifati yomonlashish davomida darhol kislorod berilishi kerak." },
        { kr: '이번 시즌에 생산량을 20% 늘리기로 했습니다.',                  uz: "Bu mavsumda ishlab chiqarishni 20% oshirishga qaror qildik." },
        { kr: '배에 탑승하는 동안에는 항상 구명조끼를 착용하기로 했습니다.',  uz: "Qayiqqa chiqish davomida doim qutqaruv vositasini kiyishga qaror qildik." },
        { kr: '물고기가 잘 자라도록 수온을 일정하게 유지합니다.',             uz: "Baliq yaxshi o'sishi uchun suv haroratini bir xil ushlab turiladi." },
      ],
      dialog: [
        { speaker: 'A', kr: '어업 작업은 어떻게 합니까?',                    uz: "Baliq ovlash qanday qilinadi?" },
        { speaker: 'B', kr: '그물을 던지고 물고기를 잡습니다.',               uz: "To'r tashlab baliq tutamiz." },
        { speaker: 'A', kr: '양식장은 어떻게 관리합니까?',                   uz: "Baliq yetishtirish joyi qanday boshqariladi?" },
        { speaker: 'B', kr: '수질을 유지하면서 먹이를 공급합니다.',           uz: "Suv sifati saqlanadi va ozuqa beriladi." },
        { speaker: 'A', kr: '작업하는 동안에 주의할 점은 무엇입니까?',       uz: "Ish davomida nimaga e'tibor berish kerak?" },
        { speaker: 'B', kr: '안전을 지키기로 했습니다.',                      uz: "Xavfsizlikka amal qilishga qaror qildik." },
      ],
      notes: [
        "-는 동안에: jarayon: 작업하는 동안에(ish davomida), 자라는 동안에(o'sish davomida).",
        "-기로 하다: qaror: 시작하기로 했어요(boshlashga qaror qildik), 지키기로(amal qilishga).",
        "구명조끼 (life jacket) — qayiqda ishlashda majburiy.",
        "수질 boshqarish — baliq yetishtirish sifati uchun: kislorod, harorat, pH.",
        "Koreya dengiz mahsulotlari: keng iste'mol qilinadi; akvakultura rivojlangan.",
      ],
      games: {
        matchPairs: [
          { kr: '그물',     uz: "to'r" },
          { kr: '양식',     uz: 'baliq yetishtirish' },
          { kr: '수질',     uz: 'suv sifati' },
          { kr: '끌어올리다',uz: 'tortib chiqarmoq' },
          { kr: '구명조끼', uz: 'qutqaruv vositasi' },
          { kr: '항구',     uz: 'port' },
        ],
        fillBlank: [
          { sentence: '작업하는 동안___ 조심하세요.',             answer: '에',    options: ['에','서','를','이'],            uz: "Ish davomida ehtiyot bo'ling." },
          { sentence: '내일부터 시작하기로 ___.',                  answer: '했습니다',options: ['했습니다','합니다','봅니다','갑니다'],uz:"Ertadan boshlashga qaror qildik."},
          { sentence: '그물을 바다에 ___ 니다.',                  answer: '던집',  options: ['던집','잡습','먹습','갑'],      uz: "To'rni dengizga tashlaymiz." },
          { sentence: '수질을 유지하면서 먹이를 ___ 니다.',       answer: '공급합',options: ['공급합','먹습','잡습','봅'],     uz: "Suv sifatini saqlab ozuqa beriladi." },
          { sentence: '규모를 늘리기로 ___ 습니다.',              answer: '했',    options: ['했','합','봤','갔'],            uz: "Hajmni ko'paytirishga qaror qildik." },
        ],
        scramble: [
          { kr: '그물',   uz: "to'r" },
          { kr: '양식',   uz: 'baliq yetishtirish' },
          { kr: '수질',   uz: 'suv sifati' },
          { kr: '먹이',   uz: 'ozuqa' },
          { kr: '항구',   uz: 'port' },
        ],
      },
    },
    quiz: [
      { question: "'-는 동안에' nimani anglatadi?",             options: ['...dan keyin','...dan oldin','...davomida','...uchun'],                  correct_index: 2 },
      { question: "'-기로 하다' nimani bildiradi?",             options: ['istak','taxmin','qaror qilish','buyruq'],                               correct_index: 2 },
      { question: "'그물' nimani anglatadi?",                   options: ['qarmoq','qayiq',"to'r",'baliq'],                                        correct_index: 2 },
      { question: "'수질' nimani anglatadi?",                   options: ['suv miqdori','suv sifati','suv harorati','suv bosimi'],                  correct_index: 1 },
      { question: "'구명조끼' nima?",                           options: ['ish kiyimi','qo\'lqop','qutqaruv vositasi (life jacket)','dubulg\'a'],  correct_index: 2 },
      { question: "'-는 동안에' va '-(으)면서' farqi?",         options: ['Farq yo\'q','동안에=muddatli; 면서=bir vaqtda','면서=muddatli','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'끌어올리다' nimani anglatadi?",             options: ['tashlamoq','tutmoq','tortib chiqarmoq','yubormoq'],                     correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 48: 선체 건조 — Kema qurish
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 5, order_in_level: 8,
    title_kr: '선체 건조 — 도장과 비계',
    title_uz: "Kema qurish — Bo'yash va konstruksiya",
    is_free: false,
    content: {
      topic: {
        kr: '선박 도장은 어떻게 합니까? 먼저 녹을 제거하고 페인트를 칠합니다. 왜 그렇게 합니까? 표면이 깨끗해지고 보호할 수 있습니다. 점검한 덕분에 문제가 없었네요. 비계는 구조를 연결해서 안전하게 설치합니다.',
        uz: "Kema qanday bo'yaladi? Avval zang olib tashlanadi, keyin bo'yoq surtiladi. Nega shunday? Sirt toza bo'ladi va himoya qilinadi. Tekshiruv tufayli muammo yo'q. Scaffold tuzilma ulanib xavfsiz o'rnatiladi."
      },
      grammar: {
        explanation: `-아지다/어지다 — holat o'zgarishi "...bo'lib qolmoq"

Tuzilish: sifat + 아/어지다

• 표면이 깨끗해집니다       → Sirt toza bo'lib qoladi
• 작업이 쉬워집니다          → Ish osonlashadi
• 날씨가 추워졌어요          → Havo sovib qoldi
• 상황이 좋아졌어요          → Holat yaxshilandi

💡 -아/어지다: sifat → o'zgarish jarayoni bildiradi

-(으)ㄴ/는 덕분에 — "...tufayli" (ijobiy sabab)

• 노력한 덕분에 성공했습니다
  → Harakat qilganim tufayli muvaffaqiyatga erishdim
• 점검한 덕분에 문제가 없었습니다
  → Tekshirganimiz tufayli muammo bo'lmadi
• 팀의 도움 덕분에 빨리 끝났습니다
  → Jamoa yordami tufayli tez tugadi`,
        examples: [
          { kr: '녹을 제거하면 표면이 깨끗해지고 도장이 잘 됩니다.',          uz: "Zangni olib tashlansa sirt tozalanadi va bo'yash yaxshi chiqadi." },
          { kr: '비계를 제대로 설치한 덕분에 작업이 안전해졌습니다.',          uz: "Scaffoldni to'g'ri o'rnatganimiz tufayli ish xavfsiz bo'ldi." },
          { kr: '정기적으로 유지보수를 한 덕분에 선박 상태가 좋아졌습니다.',   uz: "Muntazam texnik xizmat ko'rsatganimiz tufayli kema holati yaxshilandi." },
          { kr: '안전 교육을 받은 덕분에 사고가 줄어들었습니다.',             uz: "Xavfsizlik ta'limini olganimiz tufayli baxtsiz hodisalar kamaydi." },
          { kr: '날씨가 좋아진 덕분에 야외 도장 작업이 가능해졌어요.',        uz: "Havo yaxshilanganligi tufayli tashqi bo'yash ishi mumkin bo'ldi." },
        ]
      },
      vocabulary: [
        { kr: '선박',     romanization: 'seonbak',       uz: 'kema' },
        { kr: '도장하다', romanization: 'dojanghada',    uz: "bo'yamoq" },
        { kr: '페인트',   romanization: 'peinteu',       uz: "bo'yoq" },
        { kr: '칠하다',   romanization: 'chilhada',      uz: "bo'yamoq, surmoq" },
        { kr: '표면',     romanization: 'pyomyeon',      uz: 'sirt' },
        { kr: '녹',       romanization: 'nok',           uz: 'zang' },
        { kr: '제거하다', romanization: 'jegeohada',     uz: 'olib tashlamoq' },
        { kr: '보호하다', romanization: 'bohohada',      uz: 'himoya qilmoq' },
        { kr: '강관',     romanization: 'gangwan',       uz: 'metall quvur' },
        { kr: '비계',     romanization: 'bigye',         uz: 'qurilish tayanchi (scaffold)' },
        { kr: '구조',     romanization: 'gujo',          uz: 'tuzilma' },
        { kr: '설치하다', romanization: 'seolchihada',   uz: "o'rnatmoq" },
        { kr: '고정하다', romanization: 'gojeongahda',   uz: 'mahkamlash' },
        { kr: '연결하다', romanization: 'yeongyeolhada', uz: 'ulash' },
        { kr: '지지하다', romanization: 'jijihada',      uz: "qo'llab-quvvatlash" },
        { kr: '안전하다', romanization: 'anjeonhada',    uz: 'xavfsiz' },
        { kr: '조선소',   romanization: 'joseonSo',      uz: 'kema qurilish zavodi' },
        { kr: '용접하다', romanization: 'yongjeokada',   uz: 'payvandlamoq' },
        { kr: '강철',     romanization: 'gangcheol',     uz: "po'lat" },
        { kr: '선체',     romanization: 'seonche',       uz: 'kema korpusi' },
      ],
      examples: [
        { kr: '선박 표면의 녹을 그라인더로 제거하면 깨끗해집니다.',            uz: "Kema sirtidagi zangni grinder bilan olib tashlansa tozalanadi." },
        { kr: '도장 작업 전 표면을 깨끗이 처리한 덕분에 도장이 잘 됐습니다.', uz: "Bo'yashdan oldin sirtni toza qilganimiz tufayli bo'yash yaxshi chiqdi." },
        { kr: '비계를 안전하게 설치한 덕분에 높은 곳 작업이 가능해졌습니다.', uz: "Scaffoldni xavfsiz o'rnatganimiz tufayli baland joyda ish mumkin bo'ldi." },
        { kr: '꼼꼼하게 검사한 덕분에 출항 전에 문제를 발견했습니다.',         uz: "Ehtiyotkorlik bilan tekshirganimiz tufayli jo'nashdan oldin muammoni topdik." },
        { kr: '작업이 끝나면서 선박이 새것처럼 좋아졌습니다.',                uz: "Ish tugatilishi bilan kema yangidek yaxshilandi." },
      ],
      dialog: [
        { speaker: 'A', kr: '선박 도장은 어떻게 합니까?',                 uz: "Kema qanday bo'yaladi?" },
        { speaker: 'B', kr: '먼저 녹을 제거하고 페인트를 칠합니다.',       uz: "Avval zang olib tashlanadi, keyin bo'yoq surtiladi." },
        { speaker: 'A', kr: '왜 그렇게 해야 합니까?',                    uz: "Nega shunday qilinadi?" },
        { speaker: 'B', kr: '표면이 깨끗해지고 보호할 수 있습니다.',       uz: "Sirt tozalanadi va himoya qilinadi." },
        { speaker: 'A', kr: '비계는 어떻게 설치합니까?',                  uz: "Scaffold qanday o'rnatiladi?" },
        { speaker: 'B', kr: '구조를 연결해서 안전하게 설치합니다. 점검한 덕분에 문제가 없었습니다.', uz: "Tuzilma ulanib xavfsiz o'rnatiladi. Tekshiruv tufayli muammo bo'lmadi." },
      ],
      notes: [
        "-아/어지다: holat o'zgarishi: 깨끗해집니다(tozalanadi), 쉬워집니다(osonlashadi).",
        "-(으)ㄴ 덕분에: ijobiy sabab: 점검한 덕분에(tekshirganimiz tufayli).",
        "Kema bo'yash jarayoni: 1) zang olib tashlash 2) gruntlash 3) bo'yash.",
        "비계 (scaffold) — baland joylarda ishlash uchun: xavfsizlik tekshiruvi majburiy.",
        "한국 조선업 — Koreya kema qurish sanoati: dunyodagi yetakchulardan biri.",
      ],
      games: {
        matchPairs: [
          { kr: '선박',   uz: 'kema' },
          { kr: '녹',     uz: 'zang' },
          { kr: '비계',   uz: 'scaffold' },
          { kr: '강철',   uz: "po'lat" },
          { kr: '조선소', uz: 'kema zavodi' },
          { kr: '선체',   uz: 'kema korpusi' },
        ],
        fillBlank: [
          { sentence: '표면이 깨끗해___ 니다.',                    answer: '집',    options: ['집','봅','갑','옵'],            uz: "Sirt tozalanadi." },
          { sentence: '점검한 덕분___ 문제가 없었습니다.',          answer: '에',    options: ['에','서','로','이'],            uz: "Tekshiruv tufayli muammo bo'lmadi." },
          { sentence: '먼저 ___ 을 제거하고 페인트를 칠합니다.',   answer: '녹',    options: ['녹','흙','먼지','물'],           uz: "Avval zang olib tashlanadi, keyin bo'yoq surtiladi." },
          { sentence: '노력한 덕분에 성공___ 어요.',               answer: '했',    options: ['했','봤','갔','왔'],            uz: "Harakat qilganim tufayli muvaffaqiyatga erishdim." },
          { sentence: '작업이 ___ 워졌어요.',                      answer: '쉬',    options: ['쉬','어렵','크','작'],          uz: "Ish osonlashdi." },
        ],
        scramble: [
          { kr: '선박',   uz: 'kema' },
          { kr: '도장',   uz: "bo'yash" },
          { kr: '녹',     uz: 'zang' },
          { kr: '비계',   uz: 'scaffold' },
          { kr: '표면',   uz: 'sirt' },
        ],
      },
    },
    quiz: [
      { question: "'-아/어지다' nimani bildiradi?",             options: ['o\'z-o\'ziga qilmoq','holat o\'zgarishi (bo\'lib qolmoq)','majbur qilmoq','tajriba'],correct_index: 1 },
      { question: "'-(으)ㄴ 덕분에' nimani anglatadi?",         options: ['...sababli (salbiy)','...tufayli (ijobiy)','lekin','shuning uchun'],     correct_index: 1 },
      { question: "'녹' nimani anglatadi?",                    options: ["bo'yoq",'zang','sirt','tuzilma'],                                         correct_index: 1 },
      { question: "'비계' nima?",                              options: ['kema','quvur','qurilish tayanchi (scaffold)','armatura'],                 correct_index: 2 },
      { question: "Kema bo'yashdan oldin birinchi nima?",      options: ["bo'yoq surish",'gruntlash','zang olib tashlash','quritish'],              correct_index: 2 },
      { question: "'조선소' nimani anglatadi?",                options: ['baliqchilik zavodi','kema qurilish zavodi','metallurgiya zavodi','to\'qimachilik zavodi'], correct_index: 1 },
      { question: "'깨끗해집니다' — '-아/어지다' shakli?",       options: ['깨끗 + 하다','깨끗하 + 아/어지다','깨끗 + 지다','깨끗해 + 하다'],      correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 49: 광물 자원 개발 — Konchilik
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 5, order_in_level: 9,
    title_kr: '광물 자원 개발 생산',
    title_uz: "Konchilik va mineral resurslarni qazib olish",
    is_free: false,
    content: {
      topic: {
        kr: '갱도 시설은 어떻게 관리합니까? 환기 시설을 점검하고 유지합니다. 채광 작업은 어떻게 합니까? 광석을 채광하고 장비로 운반합니다. 왜 작업이 늦어졌습니까? 점검하느라고 시간이 부족했습니다.',
        uz: "Shaxta qanday boshqariladi? Shamollatish tizimi tekshiriladi va saqlanadi. Qazib olish qanday? Ruda qazib olinib uskunalar bilan tashiladi. Nega ish kechikdi? Tekshiruv sabab vaqt yetmadi."
      },
      grammar: {
        explanation: `-던 — o'tgan holatni eslash / davom etgan ish

Tuzilish: [fe'l/sifat] + 던 + ot

• 사용하던 장비     → Ishlatib turgan uskunalar (o'tmishda)
• 일하던 장소       → Ishlab turgan joy (o'tmishda)
• 자주 가던 곳      → Tez-tez boradigan joy (o'tmishda)

💡 -던 vs -(으)ㄴ:
던 = o'tmishda davom etgan ish (tugallanmagan)
ㄴ = o'tmishda tugallanib bitgan ish

-느라고 — sabab (salbiy natija bilan)

Tuzilish: [fe'l] + 느라고

• 작업하느라고 피곤합니다   → Ish qilganim uchun charchadim
• 점검하느라고 시간이 부족했습니다 → Tekshiruv sabab vaqt yetmadi
• 공부하느라고 잠을 못 잤어요 → O'qiganim uchun uxlay olmadim

💡 -느라고: asosiy harakat → salbiy natija`,
        examples: [
          { kr: '예전에 사용하던 장비를 새 장비로 교체했습니다.',            uz: "Oldin ishlatib turgan uskunalar yangi uskunaga almashtirildi." },
          { kr: '갱도를 점검하느라고 출근이 늦었습니다.',                    uz: "Shaxtani tekshirganim uchun ishga kech qoldim." },
          { kr: '환기 시스템이 잘 작동하던 곳에 새 팬을 설치했습니다.',     uz: "Shamollatish tizimi yaxshi ishlagan joyga yangi ventilyator o'rnatildi." },
          { kr: '광석을 운반하느라고 시간이 많이 걸렸습니다.',               uz: "Rudani tashish ko'p vaqt oldi." },
          { kr: '자주 사용하던 장비가 고장나서 수리 중입니다.',              uz: "Tez-tez ishlatib turgan uskunalar nosoz bo'lib, ta'mirlanmoqda." },
        ]
      },
      vocabulary: [
        { kr: '갱도',     romanization: 'gaengdo',       uz: 'shaxta yo\'li' },
        { kr: '시설',     romanization: 'siseol',        uz: 'inshoot, tizim' },
        { kr: '지하',     romanization: 'jiha',          uz: 'yer osti' },
        { kr: '설치하다', romanization: 'seolchihada',   uz: "o'rnatmoq" },
        { kr: '유지하다', romanization: 'yujihada',      uz: 'saqlamoq' },
        { kr: '환기',     romanization: 'hwangi',        uz: 'shamollatish' },
        { kr: '안전',     romanization: 'anjeon',        uz: 'xavfsizlik' },
        { kr: '점검하다', romanization: 'jeomgeonhada',  uz: 'tekshirmoq' },
        { kr: '채광',     romanization: 'chaegwang',     uz: 'qazib olish' },
        { kr: '광석',     romanization: 'gwangsseok',    uz: 'ruda' },
        { kr: '운반하다', romanization: 'unbanhada',     uz: 'tashimoq' },
        { kr: '장비',     romanization: 'jangbi',        uz: 'uskunalar' },
        { kr: '싣다',     romanization: 'sitda',         uz: 'yuklamoq' },
        { kr: '내리다',   romanization: 'naerida',       uz: 'tushirmoq' },
        { kr: '작업하다', romanization: 'jageobada',     uz: 'ishlamoq' },
        { kr: '관리하다', romanization: 'gwallihada',    uz: 'boshqarmoq' },
        { kr: '폭발물',   romanization: 'pogbalul',      uz: 'portlovchi modda' },
        { kr: '지지대',   romanization: 'jijidae',       uz: 'tayanch, tirgovuch' },
        { kr: '광산',     romanization: 'gwangsan',      uz: 'kon, shaxta' },
        { kr: '굴착',     romanization: 'gulchak',       uz: 'qazish' },
      ],
      examples: [
        { kr: '지하 갱도의 환기 시설을 매일 점검하고 유지해야 합니다.',        uz: "Yer osti shaxta yo'lidagi shamollatish tizimini har kuni tekshirib saqlash kerak." },
        { kr: '예전에 쓰던 굴착 장비를 최신 장비로 바꿨습니다.',              uz: "Oldin ishlatib turgan qazish uskunasi eng yangi uskunaga almashtirildi." },
        { kr: '광석을 분류하느라고 퇴근이 늦어졌습니다.',                     uz: "Rudani saralash sabab ishdan chiqish kechikdi." },
        { kr: '안전 교육을 받느라고 오늘 현장에 늦게 왔습니다.',              uz: "Xavfsizlik ta'limini olganimiz uchun bugun ishga kech keldik." },
        { kr: '지하 작업 중에는 항상 헬멧과 산소 마스크를 착용해야 합니다.', uz: "Yer osti ishida doim dubulg'a va kislorod niqob kiyish kerak." },
      ],
      dialog: [
        { speaker: 'A', kr: '갱도 시설은 어떻게 관리합니까?',               uz: "Shaxta qanday boshqariladi?" },
        { speaker: 'B', kr: '환기 시설을 점검하고 유지합니다.',              uz: "Shamollatish tizimi tekshiriladi va saqlanadi." },
        { speaker: 'A', kr: '채광 작업은 어떻게 합니까?',                   uz: "Qazib olish qanday amalga oshiriladi?" },
        { speaker: 'B', kr: '광석을 채광하고 장비로 운반합니다.',            uz: "Ruda qazib olinib, uskunalar bilan tashiladi." },
        { speaker: 'A', kr: '왜 작업이 늦어졌습니까?',                      uz: "Nega ish kechikdi?" },
        { speaker: 'B', kr: '점검하느라고 시간이 부족했습니다.',             uz: "Tekshiruv sabab vaqt yetmadi." },
      ],
      notes: [
        "-던: o'tmishda davom etgan: 사용하던(ishlatib turgan), 자주 가던(tez-tez boradigan).",
        "-느라고: salbiy natijali sabab: 점검하느라고(tekshiruv sabab), 바쁘느라고(band bo'lgani uchun).",
        "환기 — shamollatish: yer osti shaxtasida kislorod ta'minoti hayot uchun zarur.",
        "갱도 xavfsizligi: dubulg'a, kislorod niqob, portlovchi materiallar protokoli.",
        "-던 vs -(으)ㄴ: 사용하던 장비(ishlating turgan — hali tugallanmagan) vs 사용한 장비(ishlatgan — tugallangan).",
      ],
      games: {
        matchPairs: [
          { kr: '갱도',   uz: 'shaxta yo\'li' },
          { kr: '환기',   uz: 'shamollatish' },
          { kr: '채광',   uz: 'qazib olish' },
          { kr: '광석',   uz: 'ruda' },
          { kr: '광산',   uz: 'kon, shaxta' },
          { kr: '폭발물', uz: 'portlovchi modda' },
        ],
        fillBlank: [
          { sentence: '사용하___ 장비를 새것으로 바꿨습니다.',            answer: '던',    options: ['던','는','은','을'],            uz: "Ishlatib turgan uskunalar yangilariga almashtirildi." },
          { sentence: '점검하___ 시간이 부족했습니다.',                  answer: '느라고',options: ['느라고','서','고','면'],          uz: "Tekshiruv sabab vaqt yetmadi." },
          { sentence: '광석을 채광하고 장비로 ___ 합니다.',              answer: '운반',  options: ['운반','설치','청소','점검'],     uz: "Ruda qazib olinib uskunalar bilan tashiladi." },
          { sentence: '환기 시설을 매일 ___ 니다.',                      answer: '점검합',options: ['점검합','청소합','운반합','설치합'],uz:"Shamollatish tizimi har kuni tekshiriladi."},
          { sentence: '작업하느라고 ___ 합니다.',                        answer: '피곤',  options: ['피곤','좋아','빨라','크'],       uz: "Ish qilganim uchun charchadim." },
        ],
        scramble: [
          { kr: '갱도',   uz: 'shaxta' },
          { kr: '환기',   uz: 'shamollatish' },
          { kr: '광석',   uz: 'ruda' },
          { kr: '채광',   uz: 'qazib olish' },
          { kr: '장비',   uz: 'uskunalar' },
        ],
      },
    },
    quiz: [
      { question: "'-던' nimani bildiradi?",                    options: ['kelajak','hozir','o\'tmishda davom etgan holat','buyruq'],                correct_index: 2 },
      { question: "'-느라고' nimani anglatadi?",               options: ['maqsad uchun','salbiy natijali sabab','taxmin','taklif'],                  correct_index: 1 },
      { question: "'갱도' nimani anglatadi?",                   options: ['kon zavodi','shaxta yo\'li','uskunalar','ruda'],                           correct_index: 1 },
      { question: "'환기' nimani anglatadi?",                   options: ['xavfsizlik','ruda','shamollatish','qazish'],                               correct_index: 2 },
      { question: "'-던' va '-(으)ㄴ' farqi?",                  options: ['Farq yo\'q','던=tugallanmagan o\'tmish; ㄴ=tugallangan o\'tmish','ㄴ=tugallanmagan','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'채광' nimani anglatadi?",                   options: ['tashimoq','saqlash','qazib olish','tekshirmoq'],                           correct_index: 2 },
      { question: "Yer osti shaxtasida majburiy xavfsizlik vositasi?", options: ['faqat qo\'lqop','dubulg\'a va kislorod niqob','faqat ko\'zoynagi','hech narsa'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 50: 산림 자원 조성 — O'rmon xo'jaligi
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 5, order_in_level: 10,
    title_kr: '산림 자원 조성 — 묘목과 벌목',
    title_uz: "O'rmon xo'jaligi — Ko'chat ekish va daraxt kesish",
    is_free: false,
    content: {
      topic: {
        kr: '묘목은 어떻게 심습니까? 흙을 파고 묘목을 심은 후 덮습니다. 벌목 작업은 어떻게 합니까? 나무를 자르고 운반합니다. 작업 중에 무엇을 주의해야 합니까? 위험할 수 있으니까 조심하래요.',
        uz: "Ko'chat qanday ekiladi? Tuproq qazilib, ko'chat ekilib, yopiladi. Daraxt kesish qanday? Daraxt kesilib, tashiladi. Ish paytida nimaga e'tibor? Xavfli bo'lishi mumkin, ehtiyot bo'l dedi."
      },
      grammar: {
        explanation: `-다가 — "...qilayotib" (jarayon o'zgarishi)

Tuzilish: [fe'l] + 다가

• 작업하다가 쉬었습니다
  → Ish qilayotib dam oldim
• 나무를 자르다가 멈췄습니다
  → Daraxt kesayotib to'xtadim
• 걷다가 넘어졌어요
  → Yurayotib yiqilib qoldim

💡 -다가: birinchi harakat davomida ikkinchi harakat boshlanadi
Ko'pincha kutilmagan holat

간접 인용의 축약형 — qisqartirilgan indirect speech

• 빨리 하래요 (= 하라고 해요)   → Tezroq qil dedi
• 조심하래요 (= 조심하라고 해요) → Ehtiyot bo'l dedi
• 오래요 (= 오라고 해요)         → Kel dedi
• 가래요 (= 가라고 해요)         → Bor dedi`,
        examples: [
          { kr: '묘목을 심다가 비가 와서 작업을 멈췄습니다.',              uz: "Ko'chat ekayotib yomg'ir yog'ib ish to'xtatildi." },
          { kr: '나무를 자르다가 날이 어두워져서 내일 계속하기로 했습니다.',uz: "Daraxt kesayotib qorong'ilashdi, ertaga davom etishga qaror qildik." },
          { kr: '팀장이 안전 규칙을 꼭 지키래요.',                         uz: "Jamoa boshlig'i xavfsizlik qoidalarini albatta bajarishni aytdi." },
          { kr: '작업하다가 장비가 고장나면 즉시 신고하세요.',              uz: "Ishla turib uskunalar nosoz bo'lsa darhol xabar bering." },
          { kr: '감독관이 헬멧을 쓰래요. 반드시 착용해야 합니다.',          uz: "Nazoratchi dubulg'a kiyishni aytdi. Albatta kiyish kerak." },
        ]
      },
      vocabulary: [
        { kr: '굴취',     romanization: 'gulchwi',       uz: 'qazib olish (ko\'chat)' },
        { kr: '묘목',     romanization: 'myomok',        uz: "ko'chat" },
        { kr: '심다',     romanization: 'simda',         uz: 'ekmoq' },
        { kr: '흙',       romanization: 'heuk',          uz: 'tuproq' },
        { kr: '덮다',     romanization: 'deopda',        uz: 'yopmoq' },
        { kr: '고정하다', romanization: 'gojeongahda',   uz: 'mahkamlash' },
        { kr: '관리하다', romanization: 'gwallihada',    uz: 'parvarish qilmoq' },
        { kr: '보호하다', romanization: 'bohohada',      uz: 'himoya qilmoq' },
        { kr: '벌목',     romanization: 'beolmok',       uz: 'daraxt kesish' },
        { kr: '나무',     romanization: 'namu',          uz: 'daraxt' },
        { kr: '자르다',   romanization: 'jareuda',       uz: 'kesmoq' },
        { kr: '운반하다', romanization: 'unbanhada',     uz: 'tashimoq' },
        { kr: '정리하다', romanization: 'jeongrihada',   uz: 'tartibga solmoq' },
        { kr: '장비',     romanization: 'jangbi',        uz: 'uskunalar' },
        { kr: '안전하다', romanization: 'anjeonhada',    uz: 'xavfsiz' },
        { kr: '주의하다', romanization: 'juuihada',      uz: "ehtiyot bo'lmoq" },
        { kr: '조림',     romanization: 'jorim',         uz: 'daraxt ekish (o\'rmon yaratish)' },
        { kr: '산림',     romanization: 'salim',         uz: "o'rmon" },
        { kr: '목재',     romanization: 'mokjae',        uz: "yog'och material" },
        { kr: '감독관',   romanization: 'gamdokgwan',    uz: 'nazoratchi, inspektor' },
      ],
      examples: [
        { kr: '봄에 묘목을 심다가 날이 더워지면 물을 많이 줘야 합니다.',    uz: "Bahorda ko'chat ekayotib havo issib ketsa ko'p suv berish kerak." },
        { kr: '나무를 자르다가 주변 나무에 부딪히지 않도록 조심하세요.',    uz: "Daraxt kesayotib atrofdagi daraxqlarga tegib ketmaslik uchun ehtiyot bo'ling." },
        { kr: '감독관이 헬멧과 보호 장비를 반드시 착용하래요.',             uz: "Nazoratchi dubulg'a va himoya vositalarini albatta kiyishni aytdi." },
        { kr: '묘목을 심은 후에는 뿌리가 잘 자리 잡도록 물을 충분히 줍니다.', uz: "Ko'chat ekingandan keyin ildiz yaxshi o'rnashishi uchun yetarlicha suv beriladi." },
        { kr: '벌목 작업하다가 장비가 이상하면 바로 멈추고 신고하세요.',    uz: "Daraxt kesayotib uskunalar g'alati bo'lsa darhol to'xtatib xabar bering." },
      ],
      dialog: [
        { speaker: 'A', kr: '묘목은 어떻게 심습니까?',                     uz: "Ko'chat qanday ekiladi?" },
        { speaker: 'B', kr: '흙을 파고 묘목을 심은 후 덮습니다.',           uz: "Tuproq qazilib, ko'chat ekilib, yopiladi." },
        { speaker: 'A', kr: '벌목 작업은 어떻게 합니까?',                  uz: "Daraxt kesish qanday amalga oshiriladi?" },
        { speaker: 'B', kr: '나무를 자르고 운반합니다.',                    uz: "Daraxt kesilib, tashiladi." },
        { speaker: 'A', kr: '작업 중에 무엇을 주의해야 합니까?',            uz: "Ish paytida nimaga e'tibor berish kerak?" },
        { speaker: 'B', kr: '위험할 수 있으니까 조심하래요.',               uz: "Xavfli bo'lishi mumkin, ehtiyot bo'l dedi." },
      ],
      notes: [
        "-다가: jarayon o'zgarishi: 작업하다가 쉬었습니다(ish qilayotib dam oldim).",
        "간접 인용 축약형: 조심하래요 = 조심하라고 해요(ehtiyot bo'l dedi).",
        "벌목 xavfsizligi: dubulg'a, qo'lqop, ko'zoynagi; daraxt qaysi tomonga yiqilishini hisoblash.",
        "조림 (daraxt ekish) — Koreya o'rmon siyosati: har yili daraxt ekish kampaniyalari.",
        "나무를 자를 때: atrofdagi kishilar va narsalarni hisobga olish — muhim xavfsizlik chorasi.",
      ],
      games: {
        matchPairs: [
          { kr: '묘목',   uz: "ko'chat" },
          { kr: '벌목',   uz: 'daraxt kesish' },
          { kr: '산림',   uz: "o'rmon" },
          { kr: '조림',   uz: "daraxt ekish" },
          { kr: '목재',   uz: "yog'och material" },
          { kr: '감독관', uz: 'nazoratchi' },
        ],
        fillBlank: [
          { sentence: '작업하___ 가 쉬었습니다.',               answer: '다',    options: ['다','서','고','면'],            uz: "Ish qilayotib dam oldim." },
          { sentence: '조심하___ 요. (= 조심하라고 해요)',       answer: '래',    options: ['래','는다','겠','었'],          uz: "Ehtiyot bo'l dedi." },
          { sentence: '흙을 파고 묘목을 심은 후 ___ 니다.',     answer: '덮습',  options: ['덮습','파습','심습','봅'],      uz: "Tuproq qazilib, ko'chat ekilib, yopiladi." },
          { sentence: '나무를 자르___ 멈췄습니다.',              answer: '다가',  options: ['다가','서','고','면'],          uz: "Daraxt kesayotib to'xtadim." },
          { sentence: '빨리 하___ 요. (= 빨리 하라고 해요)',    answer: '래',    options: ['래','는다','겠','었'],          uz: "Tezroq qil dedi." },
        ],
        scramble: [
          { kr: '묘목',   uz: "ko'chat" },
          { kr: '산림',   uz: "o'rmon" },
          { kr: '벌목',   uz: 'daraxt kesish' },
          { kr: '흙',     uz: 'tuproq' },
          { kr: '나무',   uz: 'daraxt' },
        ],
      },
    },
    quiz: [
      { question: "'-다가' nimani bildiradi?",                  options: ['maqsad','jarayon o\'zgarishi (qilayotib)','taklif','inkor'],              correct_index: 1 },
      { question: "'조심하래요' ning to'liq shakli?",           options: ['조심하자고 해요','조심하라고 해요','조심한다고 해요','조심하느냐고 해요'], correct_index: 1 },
      { question: "'묘목' nimani anglatadi?",                   options: ['daraxt',"ko'chat",'o\'rmon',"yog'och"],                                   correct_index: 1 },
      { question: "'벌목' nimani anglatadi?",                   options: ["ko'chat ekish",'daraxt kesish',"o'rmon yaratish",'tuproq qazish'],         correct_index: 1 },
      { question: "'조림' nimani anglatadi?",                   options: ['daraxt kesish','daraxt ekish (o\'rmon yaratish)','ko\'chat','shox'],       correct_index: 1 },
      { question: "Daraxt kesishda xavfsizlik uchun nima?",     options: ['hech narsa','faqat ko\'zoynagi','dubulg\'a, qo\'lqop, ko\'zoynagi va atrofni hisobga olish','faqat dubulg\'a'], correct_index: 2 },
      { question: "'-다가' va '-고 나서' farqi?",               options: ['Farq yo\'q','다가=jarayon o\'zgarishi; 고 나서=tugalib keyin','고 나서=o\'zgarish','Ikkalasi bir xil'], correct_index: 1 },
    ],
  },

];

// ─────────────────────────────────────────
// DB ga saqlash
// ─────────────────────────────────────────
async function seed() {
  console.log('EPS-TOPIK 5-daraja seed boshlandi...\n');
  console.log('Manba: Eps-Topik2_41-60.docx — Darslar 41-50');
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

    const icons = ['🧵','🪑','🏗️','🌊','🌾','🐄','🐟','⚓','⛏️','🌲'];
    console.log(`  ✅  ${icons[lessonData.order_in_level-1]} Dars ${lessonData.order_in_level}: ${lessonData.title_kr} (ID: ${saved.id})`);
  }

  console.log('\n════════════════════════════════════════════════════════');
  console.log('✅ EPS-TOPIK 5-daraja seed muvaffaqiyatli yakunlandi!');
  console.log('════════════════════════════════════════════════════════');
  console.log(`\n  📚 Darslar:    ${LESSONS.length} ta (41-50)`);
  console.log(`  🎯 Quiz:       ${LESSONS.length * 7} ta`);
  console.log(`  🔊 Audio keys: ${LESSONS.length * 37} ta`);
  console.log('\n  📋 Darslar ro\'yxati:');
  console.log("  1️⃣  섬유 제조    — To'qimachilik (-거나, -아야/어야)");
  console.log("  2️⃣  가구 제작    — Mebel (-(으)ㄹ까 봐, -느냐고 하다)");
  console.log("  3️⃣  건축 시공    — Qurilish (-(으)ㄹ 텐데, -(으)ㄹ걸요)");
  console.log("  4️⃣  토목 시공    — Infratuzilma (-아야겠-, -도록)");
  console.log("  5️⃣  농작물 재배  — Ekin (-(으)ㄹ까 하다, -지 말고)");
  console.log("  6️⃣  사육 관리    — Chorvachilik (-(으)ㄴ 적이 있다, -게 하다)");
  console.log("  7️⃣  연안 어업    — Baliqchilik (-는 동안에, -기로 하다)");
  console.log("  8️⃣  선체 건조    — Kema qurish (-아/어지다, -(으)ㄴ 덕분에)");
  console.log("  9️⃣  광물 자원    — Konchilik (-던, -느라고)");
  console.log("  🔟 산림 자원    — O'rmon (-다가, 간접 인용 축약형)");
  console.log('\n📢 Jami EPS-TOPIK holati:');
  console.log('   eps_topik_level1.js → 10 dars (1-10)   ✅');
  console.log('   eps_topik_level2.js → 10 dars (11-20)  ✅');
  console.log('   eps_topik_level3.js → 10 dars (21-30)  ✅');
  console.log('   eps_topik_level4.js → 10 dars (31-40)  ✅');
  console.log('   eps_topik_level5.js → 10 dars (41-50)  ✅');
  console.log('   Keyingi: eps_topik_level6.js → 10 dars (51-60)\n');

  await db.end();
}

seed().catch(err => {
  console.error('❌ Xatolik:', err.message);
  process.exit(1);
});
