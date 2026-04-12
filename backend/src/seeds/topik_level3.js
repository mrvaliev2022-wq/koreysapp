// backend/src/seeds/topik_level3.js
// TOPIK 3-daraja: 10 ta to'liq dars
// Usage: node src/seeds/topik_level3.js

require('dotenv').config({ path: '../../.env' });
const db = require('../db');

const LESSONS = [

  // ════════════════════════════════════════════
  // DARS 1: Yangi talabalar uchun marosim
  // 신입생 환영회를 한다고 해요
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 3, order_in_level: 1,
    title_kr: '신입생 환영회를 한다고 해요',
    title_uz: "Yangi talabalar uchun kutib olish marosimi bo'ladi deyishyapti",
    is_free: true,
    content: {
      topic: {
        kr: '대학교 게시판에 공지가 있습니다. 신입생 환영회를 한다고 합니다. 금요일 저녁에 시작한다고 해요. 학생들이 많이 참여할 수 있다고 해요. 동아리에도 신청할 수 있다고 했어요.',
        uz: "Universitasning e'lon doskasida xabar bor. Yangi talabalar uchun kutib olish marosimi bo'ladi deyishyapti. Juma kechqurun boshlanadi deyishyapti. Ko'p talabalar qatnasha oladi deyishyapti. Studentlar to'garaklariga ham ariza topshirish mumkin dedi."
      },
      grammar: {
        explanation: `A/V-다고 하다 / N(이)라고 하다 — boshqa odamning gapini yetkazish (reported speech)

Tuzilish:
• Fe'l: 간다고 해요 (...boradi deyapti)
• Sifat: 좋다고 해요 (...yaxshi deyapti)
• Ot: 학생이라고 해요 (...talaba deyapti)

Zamon shakllari:
• Hozirgi: 간다고 해요 (boradi deyapti)
• O'tgan: 갔다고 해요 (bordi dedi)
• Kelasi: 갈 거라고 해요 (boradi dedi)

V-아/어야겠다 — o'z-o'ziga qaror qilish:
• 가야겠어요. (Borishim kerak / borishga qaror qildim.)
• 공부해야겠어요. (O'qishim kerak deb qaror qildim.)
• Tashqaridan majburiyat emas — ichki qaror!`,
        examples: [
          { kr: '비가 온다고 해요.', uz: "Yomg'ir yog'adi deyishyapti." },
          { kr: '친구가 한국에 간다고 해요.', uz: "Do'stim Koreyaga boradi deyapti." },
          { kr: '이 음식이 맛있다고 했어요.', uz: 'Bu ovqat mazali dedi.' },
          { kr: '신입생 환영회가 금요일에 있다고 해요.', uz: "Yangi talabalar marosimi juma kuni bo'ladi deyishyapti." },
          { kr: '내일 시험이 어렵다고 했어요. 공부해야겠어요.', uz: "Ertaga imtihon qiyin dedi. O'qishga qaror qildim." },
        ]
      },
      vocabulary: [
        { kr: '신입생', romanization: 'sinipssaeng', uz: 'yangi talaba' },
        { kr: '환영회', romanization: 'hwanyeonghoe', uz: 'kutib olish marosimi' },
        { kr: '게시판', romanization: 'gesiban', uz: "e'lon doskasi" },
        { kr: '동아리', romanization: 'dongari', uz: 'talabalar to\'garagi' },
        { kr: '참여하다', romanization: 'chamyeohada', uz: 'qatnashmoq' },
        { kr: '신청하다', romanization: 'sincheonghada', uz: 'ariza topshirmoq' },
        { kr: '기회', romanization: 'gihoe', uz: 'imkoniyat' },
        { kr: '축제', romanization: 'chukje', uz: 'festival' },
        { kr: '오리엔테이션', romanization: 'orieniteisyeon', uz: 'orientatsiya' },
        { kr: '공지', romanization: 'gongji', uz: "e'lon, xabar" },
        { kr: '강의', romanization: 'gangeui', uz: "ma'ruza, dars" },
        { kr: '수강하다', romanization: 'suganghada', uz: "darsga yozilmoq, qatnashmoq" },
        { kr: '동기', romanization: 'dongi', uz: 'kurs do\'sti' },
        { kr: '선배', romanization: 'seonbae', uz: 'katta kurs talabasi' },
        { kr: '후배', romanization: 'hubae', uz: 'kichik kurs talabasi' },
        { kr: '캠퍼스', romanization: 'kaempeos', uz: 'kampus' },
        { kr: '등록금', romanization: 'deungnokgeum', uz: "kontrakt to'lovi" },
        { kr: '장학금', romanization: 'janghakgeum', uz: 'stipendiya' },
        { kr: '과제', romanization: 'gwaje', uz: 'uy vazifasi, topshiriq' },
        { kr: '발표하다', romanization: 'balpyohada', uz: 'taqdimot qilmoq' },
      ],
      examples: [
        { kr: '교수님이 내일 수업이 없다고 하셨어요. 정말요?', uz: "Professor ertaga dars yo'q dedi. Rostdanmi?" },
        { kr: '친구가 환영회에 꼭 참여하라고 했어요.', uz: "Do'stim marosimga albatta qatnashishimni aytdi." },
        { kr: '게시판에 동아리 신청 마감이 이번 주라고 해요.', uz: "E'lon doskasida to'garakka ariza topshirish muddati bu hafta deyishyapti." },
        { kr: '선배가 이 강의가 어렵다고 했어요. 열심히 해야겠어요.', uz: "Katta kurs talabasi bu ma'ruza qiyin dedi. Astoydil ishlashim kerak." },
        { kr: '장학금 신청 기회가 있다고 들었어요. 신청해야겠어요.', uz: "Stipendiyaga ariza topshirish imkoniyati bor deb eshitdim. Topshirishga qaror qildim." },
      ],
      dialog: [
        { speaker: 'A', kr: '오이벡 씨, 신입생 환영회 들었어요?', uz: "Oybek, yangi talabalar marosimi haqida eshitdingizmi?" },
        { speaker: 'B', kr: '네! 게시판에서 봤어요. 금요일에 한다고 했죠?', uz: "Ha! E'lon doskasida ko'rdim. Juma kuni bo'ladi dedi-ku?" },
        { speaker: 'A', kr: '맞아요. 저는 꼭 참여해야겠어요. 동아리도 신청할 수 있다고 해요.', uz: "To'g'ri. Men albatta qatnashishim kerak. To'garaklarga ham ariza topshirish mumkin deyishyapti." },
        { speaker: 'B', kr: '어떤 동아리에 관심 있어요?', uz: "Qaysi to'garakka qiziqasiz?" },
        { speaker: 'A', kr: '한국어 스터디 동아리가 있다고 들었어요. 거기 들어가야겠어요.', uz: "Koreys tili o'rganish to'garagi bor deb eshitdim. U yerga kirishim kerak." },
        { speaker: 'B', kr: '저도 같이 신청해요! 선배들이 친절하다고 했어요.', uz: "Men ham birga ariza topshiraman! Katta kurs talabalari mehribon deyishdi." },
      ],
      notes: [
        "-다고 해요: hozirgi xabar yetkazish; -다고 했어요: o'tganda aytilgan.",
        "N이라고 해요: ot bilan; 학생이라고 해요 (talaba deyapti).",
        "-아/어야겠다: o'z-o'ziga qaror — kimdir majbur qilgani emas, shaxsiy qaror.",
        "선배(katta kurs) vs 후배(kichik kurs) — Korea madaniyatida muhim tushunchalar.",
        "참여하다 (rasmiy: qatnashmoq) vs 오다 (kelmoq) — kontekstga qarab.",
      ],
      games: {
        matchPairs: [
          { kr: '신입생', uz: 'yangi talaba' },
          { kr: '동아리', uz: "talabalar to'garagi" },
          { kr: '게시판', uz: "e'lon doskasi" },
          { kr: '참여하다', uz: 'qatnashmoq' },
          { kr: '기회', uz: 'imkoniyat' },
          { kr: '장학금', uz: 'stipendiya' },
        ],
        fillBlank: [
          { sentence: '신입생 환영회를 한___해요.', answer: '다고', options: ['다고', '서', '면서', '지만'], uz: "Yangi talabalar marosimi bo'ladi deyishyapti." },
          { sentence: '비가 온___해요.', answer: '다고', options: ['다고', '고', '서', '면'], uz: "Yomg'ir yog'adi deyishyapti." },
          { sentence: '열심히 공부해야___요.', answer: '겠어', options: ['겠어', '요', '해', '봐'], uz: "Astoydil o'qishga qaror qildim." },
          { sentence: '친구가 한국에 간___했어요.', answer: '다고', options: ['다고', '서', '고', '면'], uz: "Do'stim Koreyaga boradi dedi." },
          { sentence: '이 강의가 어렵___했어요.', answer: '다고', options: ['다고', '고', '지만', '서'], uz: "Bu ma'ruza qiyin dedi." },
        ],
        scramble: [
          { kr: '신입생', uz: 'yangi talaba' },
          { kr: '참여', uz: 'qatnashish' },
          { kr: '게시판', uz: "e'lon doskasi" },
          { kr: '기회', uz: 'imkoniyat' },
          { kr: '동기', uz: "kurs do'sti" },
        ],
      },
    },
    quiz: [
      { question: "'-다고 해요' qanday ma'no ifodalaydi?", options: ['Buyruq berish', 'Boshqa odamning gapini yetkazish', 'Shart bildirish', 'Inkor qilish'], correct_index: 1 },
      { question: "'비가 온다고 해요' nimani anglatadi?", options: ["Yomg'ir yog'moqda", "Yomg'ir yog'adi deyishyapti", "Yomg'ir yog'di", "Yomg'ir yog'maydi"], correct_index: 1 },
      { question: "Ot bilan '-라고 해요' ishlatiladi, misol?", options: ['좋다고 해요', '간다고 해요', '학생이라고 해요', '먹는다고 해요'], correct_index: 2 },
      { question: "'-아/어야겠다' qanday ma'no ifodalaydi?", options: ['Tashqaridan majburiyat', 'Ichki shaxsiy qaror', 'Taklif berish', 'Ruxsat so\'rash'], correct_index: 1 },
      { question: "'신입생' nimani anglatadi?", options: ['katta kurs talabasi', 'o\'qituvchi', 'yangi talaba', 'bitiruvchi'], correct_index: 2 },
      { question: "'게시판' nimani anglatadi?", options: ['dars', "e'lon doskasi", "to'garaklar", 'stipendiya'], correct_index: 1 },
      { question: "'공부해야겠어요' nimani anglatadi?", options: ["O'qituvchi o'qit dedi", "O'qishga qaror qildim", "O'qib bo'ldim", "O'qishim kerak emas"], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 2: Xonani almashtirib berishni so'rayapti
  // 방을 바꿔 달라고 해요
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 3, order_in_level: 2,
    title_kr: '방을 바꿔 달라고 해요',
    title_uz: "Xonani almashtirib berishni so'rayapti",
    is_free: true,
    content: {
      topic: {
        kr: '손님이 방을 바꿔 달라고 해요. 조용한 방으로 바꿔 달라고 했어요. 뜨거운 물이 안 나온다고 했어요. 빨리 고쳐 달라고 했어요. 프런트에서 최대한 빨리 처리하겠다고 했어요.',
        uz: "Mehmon xonani almashtirib berishni so'rayapti. Tinch xonaga o'zgartirip berishni so'radi. Issiq suv chiqmaydi dedi. Tezda tuzatib berishini so'radi. Resepsion iloji boricha tez hal qilamiz dedi."
      },
      grammar: {
        explanation: `V-아/어 달라고 하다 — boshqadan biror ish qilishni iltimos qilganini yetkazish

Tuzilish: [fe'l + 아/어 달라고 하다]
• 바꿔 달라고 해요. (Almashtirib berishni so'rayapti.)
• 고쳐 달라고 했어요. (Tuzatib berishni so'radi.)
• 말해 달라고 해요. (Aytib berishni so'rayapti.)

V-아/어 주다 vs 달다 farqi:
• 주다 — boshqaga nisbatan: 해 주세요 (qiling, bering)
• 달다 — o'zingiz uchun so'rash: 해 달라고 해요 (o'zi uchun so'rayapti)

Misol:
• 선생님이 설명해 주셨어요. (O'qituvchi tushuntirib berdi — boshqalarga)
• 설명해 달라고 했어요. (Tushuntirib berishini so'radi — o'zi uchun)`,
        examples: [
          { kr: '방을 바꿔 달라고 해요.', uz: "Xonani almashtirib berishni so'rayapti." },
          { kr: '천천히 말해 달라고 했어요.', uz: "Sekin gapirib berishini so'radi." },
          { kr: '문을 열어 달라고 해요.', uz: "Eshikni ochib berishni so'rayapti." },
          { kr: '영수증을 다시 보내 달라고 했어요.', uz: "Chekni qayta yuborib berishini so'radi." },
          { kr: '좀 더 조용한 방으로 바꿔 달라고 했어요.', uz: "Biroz tinchroq xonaga almashtirib berishini so'radi." },
        ]
      },
      vocabulary: [
        { kr: '방', romanization: 'bang', uz: 'xona' },
        { kr: '바꾸다', romanization: 'bakkuda', uz: "o'zgartirmoq" },
        { kr: '부탁하다', romanization: 'butakada', uz: 'iltimos qilmoq' },
        { kr: '프런트', romanization: 'peurenteu', uz: 'resepsion' },
        { kr: '불편하다', romanization: 'bulpyeonhada', uz: 'noqulay' },
        { kr: '조용하다', romanization: 'joyonghada', uz: 'tinch, sokin' },
        { kr: '시끄럽다', romanization: 'sikkeureopda', uz: 'shovqinli' },
        { kr: '예약하다', romanization: 'yeyakada', uz: 'bron qilmoq' },
        { kr: '가능하다', romanization: 'ganeunghada', uz: 'mumkin' },
        { kr: '고치다', romanization: 'gochida', uz: 'tuzatmoq' },
        { kr: '수리하다', romanization: 'surihada', uz: "ta'mirlash" },
        { kr: '에어컨', romanization: 'eeokon', uz: 'konditsioner' },
        { kr: '히터', romanization: 'hiteo', uz: 'isitgich' },
        { kr: '욕실', romanization: 'yoksil', uz: 'hammom' },
        { kr: '체크인', romanization: 'chekuin', uz: 'chegish' },
        { kr: '체크아웃', romanization: 'chekuaut', uz: 'chiqish' },
        { kr: '층', romanization: 'cheung', uz: 'qavat' },
        { kr: '전망', romanization: 'jeonmang', uz: 'manzara, ko\'rinish' },
        { kr: '처리하다', romanization: 'cheorhada', uz: 'hal qilmoq, ko\'rib chiqmoq' },
        { kr: '불만', romanization: 'bulman', uz: 'norozilik' },
      ],
      examples: [
        { kr: '손님이 에어컨이 고장났다고 빨리 고쳐 달라고 했어요.', uz: "Mehmon konditsioner buzildi, tezda tuzatib berishini so'radi." },
        { kr: '방이 너무 시끄럽다고 조용한 방으로 바꿔 달라고 해요.', uz: "Xona juda shovqinli, tinch xonaga o'zgartirip berishni so'rayapti." },
        { kr: '예약한 방이 다르다고 프런트에 이야기해 달라고 했어요.', uz: "Bron qilgan xona boshqa deb, resepsiondan gaplab berishini so'radi." },
        { kr: '욕실 물이 뜨겁지 않다고 수리해 달라고 했어요.', uz: "Hammomda suv issiq emas deb, ta'mirlab berishini so'radi." },
        { kr: '체크아웃을 늦게 해 달라고 부탁했어요.', uz: "Chiqishni kechroq qilib berishini iltimos qildi." },
      ],
      dialog: [
        { speaker: 'A', kr: '프런트죠? 저 502호인데요. 방이 너무 시끄러워요.', uz: 'Resepsionmi? Men 502-xona. Xona juda shovqinli.' },
        { speaker: 'B', kr: '죄송합니다. 어떻게 도와드릴까요?', uz: 'Kechirasiz. Qanday yordam bera olaman?' },
        { speaker: 'A', kr: '조용한 방으로 바꿔 달라고 하고 싶어요.', uz: "Tinch xonaga almashtirib berishingizni so'ramoqchiman." },
        { speaker: 'B', kr: '알겠습니다. 빈방을 확인해 드릴게요. 잠깐만 기다려 주세요.', uz: "Tushundim. Bo'sh xonani tekshirib beraman. Biroz kutib turing." },
        { speaker: 'A', kr: '그리고 히터도 안 된다고 수리해 달라고 했는데요.', uz: "Va isitgich ham ishlamayapti deb ta'mirlab berishini so'ragandim." },
        { speaker: 'B', kr: '네, 바로 기술팀에 연락하겠습니다. 최대한 빨리 처리해 드릴게요.', uz: "Ha, hoziroq texnik guruhiga xabar beraman. Iloji boricha tez hal qilaman." },
      ],
      notes: [
        "-아/어 달라고 하다: o'zi uchun biror narsa qilishni so'raganini yetkazish.",
        "주다 (boshqa biriga qilish) vs 달다 (o'zi uchun qildirib olish).",
        "고장나다 — buzilmoq: 에어컨이 고장났어요 (konditsioner buzildi).",
        "최대한 빨리 — 'iloji boricha tez': xizmat ko'rsatishda ko'p ishlatiladigan ibora.",
        "처리하다 — hal qilmoq, ko'rib chiqmoq: 빨리 처리하겠습니다 (tez hal qilaman).",
      ],
      games: {
        matchPairs: [
          { kr: '바꾸다', uz: "o'zgartirmoq" },
          { kr: '조용하다', uz: 'tinch' },
          { kr: '고치다', uz: 'tuzatmoq' },
          { kr: '불편하다', uz: 'noqulay' },
          { kr: '예약하다', uz: 'bron qilmoq' },
          { kr: '처리하다', uz: 'hal qilmoq' },
        ],
        fillBlank: [
          { sentence: '방을 바꿔 달___해요.', answer: '라고', options: ['라고', '고', '서', '면'], uz: "Xonani almashtirib berishni so'rayapti." },
          { sentence: '천천히 말해 ___라고 했어요.', answer: '달', options: ['달', '줄', '볼', '갈'], uz: "Sekin gapirib berishini so'radi." },
          { sentence: '에어컨이 고장___어요.', answer: '났', options: ['났', '했', '됐', '왔'], uz: 'Konditsioner buzildi.' },
          { sentence: '조용한 방으로 바꿔 달___고 해요.', answer: '라', options: ['라', '고', '서', '면'], uz: "Tinch xonaga almashtirib berishni so'rayapti." },
          { sentence: '최대한 빨리 처리해 ___.', answer: '드릴게요', options: ['드릴게요', '드려요', '드렸어요', '드립니다'], uz: "Iloji boricha tez hal qilaman." },
        ],
        scramble: [
          { kr: '방', uz: 'xona' },
          { kr: '조용', uz: 'tinch' },
          { kr: '예약', uz: 'bron' },
          { kr: '불만', uz: 'norozilik' },
          { kr: '처리', uz: 'hal qilish' },
        ],
      },
    },
    quiz: [
      { question: "'방을 바꿔 달라고 해요' nimani anglatadi?", options: ["Xonani o'zi almashtirdi", "Xonani almashtirib berishni so'rayapti", "Xona almashtirildi", "Xona yaxshi deyapti"], correct_index: 1 },
      { question: "'-아/어 달라고 하다' va '-아/어 주다' farqi?", options: ['Farq yo\'q', '달다 — o\'zi uchun so\'rash; 주다 — boshqaga berish', 'Ikkalasi ham buyruq', 'Ikkalasi ham ruxsat'], correct_index: 1 },
      { question: "'시끄럽다' nimani anglatadi?", options: ['tinch', 'shovqinli', 'katta', 'issiq'], correct_index: 1 },
      { question: "'고치다' nimani anglatadi?", options: ['sotib olmoq', 'almashmoq', 'tuzatmoq', 'kutmoq'], correct_index: 2 },
      { question: "'프런트' nimani anglatadi?", options: ['hammom', 'lift', 'resepsion', 'restoran'], correct_index: 2 },
      { question: "'최대한 빨리' nimani anglatadi?", options: ['biroz tez', 'iloji boricha tez', 'doimo tez', 'ba\'zan tez'], correct_index: 1 },
      { question: "'불만' nimani anglatadi?", options: ['xursandlik', 'norozilik', 'xizmat', 'iltimos'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 3: Yukimni saqlab bera olasizmi?
  // 짐을 맡아 주실 수 있어요?
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 3, order_in_level: 3,
    title_kr: '짐을 맡아 주실 수 있어요?',
    title_uz: 'Yukimni saqlab bera olasizmi?',
    is_free: false,
    content: {
      topic: {
        kr: '짐을 맡아 주실 수 있어요? 체크인 전에 짐을 맡아 주실 수 있어요? 조금 이따가 체크인하려고 해서요. 물론입니다. 맡겨 드릴 수 있어요.',
        uz: "Yukimni saqlab bera olasizmi? Chegishdan oldin yukimni saqlab bera olasizmi? Biroz keyin chegish qilmoqchiman. Albatta. Saqlap berishim mumkin."
      },
      grammar: {
        explanation: `-(으)ㄹ 수 있다 / 없다 — imkoniyat yoki qobiliyat

Tuzilish:
• Undosh + 을 수 있다: 먹을 수 있어요 (yey olaman)
• Unli/ㄹ + ㄹ 수 있다: 갈 수 있어요 (bora olaman)

Ijobiy: -(으)ㄹ 수 있어요 (mumkin, qila olaman)
Inkor: -(으)ㄹ 수 없어요 (mumkin emas, qila olmayman)

So'roq: -(으)ㄹ 수 있어요? (qila olasizmi? / mumkinmi?)

-아/어 주시다 — hurmat bilan so'rash:
• 주세요 (oddiy) → 주시겠어요? (hurmatli)
• 맡아 주실 수 있어요? (saqlab bera olasizmi? — juda hurmatli)`,
        examples: [
          { kr: '짐을 맡아 주실 수 있어요?', uz: 'Yukimni saqlab bera olasizmi?' },
          { kr: '한국어를 할 수 있어요?', uz: 'Koreys tilida gapira olasizmi?' },
          { kr: '내일까지 끝낼 수 있어요.', uz: 'Ertaga qadar tugatа olaman.' },
          { kr: '지금 바빠서 도와 드릴 수 없어요.', uz: "Hozir band bo'lgani uchun yordam bera olmayman." },
          { kr: '창문을 열어 주실 수 있으세요?', uz: 'Derazani ochib bera olasizmi?' },
        ]
      },
      vocabulary: [
        { kr: '짐', romanization: 'jim', uz: 'yuk, bagaj' },
        { kr: '맡다', romanization: 'matda', uz: 'saqlash uchun qabul qilmoq' },
        { kr: '맡기다', romanization: 'matkida', uz: 'saqlatib qo\'ymoq' },
        { kr: '보관하다', romanization: 'bogwanhada', uz: 'saqlash' },
        { kr: '가방', romanization: 'gabang', uz: 'sumka, çanta' },
        { kr: '캐리어', romanization: 'kaerieo', uz: 'chemodani' },
        { kr: '이따가', romanization: 'ittaga', uz: 'biroz keyin' },
        { kr: '물론', romanization: 'mullon', uz: 'albatta' },
        { kr: '서비스', romanization: 'seobiseu', uz: 'xizmat' },
        { kr: '도와주다', romanization: 'dowajuda', uz: 'yordam bermoq' },
        { kr: '가능하다', romanization: 'ganeunghada', uz: 'mumkin' },
        { kr: '불가능하다', romanization: 'bulganeunghada', uz: 'mumkin emas' },
        { kr: '확인하다', romanization: 'hwaginada', uz: 'tekshirmoq' },
        { kr: '준비하다', romanization: 'junbihada', uz: 'tayyorlamoq' },
        { kr: '안내하다', romanization: 'annaehada', uz: "yo'naltirib bermoq, tushuntirmoq" },
        { kr: '이용하다', romanization: 'iyonghada', uz: 'foydalanmoq' },
        { kr: '편의시설', romanization: 'pyeonuisigeol', uz: 'qulayliklar' },
        { kr: '도착하다', romanization: 'docakada', uz: 'yetib kelmoq' },
        { kr: '출발하다', romanization: 'chulbalhada', uz: "jo'namoq" },
        { kr: '오후', romanization: 'ohu', uz: 'tushdan keyin' },
      ],
      examples: [
        { kr: '체크인 전에 짐을 맡아 주실 수 있어요? 오후 2시에 올게요.', uz: "Chegishdan oldin yukimni saqlab bera olasizmi? Soat 2 da kelaman." },
        { kr: '네, 물론입니다. 이쪽에 맡겨 주시면 됩니다.', uz: "Ha, albatta. Bu tomonga qo'yib keting." },
        { kr: '내일 오전 10시 전에 찾을 수 있어요?', uz: "Ertaga ertalab soat 10 dan oldin ola olasizmi?" },
        { kr: '공항에서 짐이 너무 무거워서 택시를 탈 수밖에 없었어요.', uz: "Aeroportda yuk juda og'ir bo'lganidan taksi olishdan boshqa iloj yo'q edi." },
        { kr: '이 서비스는 모든 투숙객이 이용할 수 있어요.', uz: "Bu xizmatdan barcha mehmonlar foydalana oladi." },
      ],
      dialog: [
        { speaker: 'A', kr: '실례합니다. 체크인 전에 짐을 맡아 주실 수 있어요?', uz: 'Kechirasiz. Chegishdan oldin yukimni saqlab bera olasizmi?' },
        { speaker: 'B', kr: '네, 물론이죠. 짐이 몇 개예요?', uz: "Ha, albatta. Yukingiz nechta?" },
        { speaker: 'A', kr: '캐리어 하나랑 가방 하나예요. 오후 3시쯤 찾으러 올게요.', uz: "Bitta chemodani va bitta sumka. Taxminan soat 3 da olish uchun kelaman." },
        { speaker: 'B', kr: '알겠습니다. 보관증을 드릴게요. 찾으실 때 보여 주세요.', uz: "Tushundim. Saqlash cheki beraman. Olganda ko'rsating." },
        { speaker: 'A', kr: '감사합니다. 그리고 근처에 맛있는 식당을 알려 주실 수 있어요?', uz: "Rahmat. Va yaqin atrofda mazali restoranni aytib bera olasizmi?" },
        { speaker: 'B', kr: '네! 걸어서 5분 거리에 아주 좋은 한식당이 있어요.', uz: "Ha! Piyoda 5 daqiqa masofada juda yaxshi koreyscha restoran bor." },
      ],
      notes: [
        "-(으)ㄹ 수 있다: undosh + 을 수 있다; unli/ㄹ + ㄹ 수 있다.",
        "-(으)ㄹ 수밖에 없다 — ...dan boshqa iloj yo'q: 택시를 탈 수밖에 없었어요.",
        "맡기다 (saqlatmoq) — 주다 (bermoq)dan farqlash: 짐을 맡기다 (yukni saqlatmoq).",
        "물론이죠 — 'albatta' ning juda qulay, samimiy shakli.",
        "보관증 — saqlash cheki: joylab ketish uchun olingan tasdiqlash qog'ozi.",
      ],
      games: {
        matchPairs: [
          { kr: '짐', uz: 'yuk, bagaj' },
          { kr: '맡기다', uz: 'saqlatib qo\'ymoq' },
          { kr: '물론', uz: 'albatta' },
          { kr: '확인하다', uz: 'tekshirmoq' },
          { kr: '이따가', uz: 'biroz keyin' },
          { kr: '이용하다', uz: 'foydalanmoq' },
        ],
        fillBlank: [
          { sentence: '짐을 맡아 주실 수 ___?', answer: '있어요', options: ['있어요', '없어요', '해요', '돼요'], uz: 'Yukimni saqlab bera olasizmi?' },
          { sentence: '한국어를 할 수 ___.', answer: '있어요', options: ['있어요', '없어요', '해요', '가요'], uz: 'Koreys tilida gapira olaman.' },
          { sentence: '지금 바빠서 도와 드릴 수 ___.', answer: '없어요', options: ['없어요', '있어요', '해요', '돼요'], uz: "Hozir band bo'lgani uchun yordam bera olmayman." },
          { sentence: '오후 3시쯤 찾으___ 올게요.', answer: '러', options: ['러', '려고', '면서', '고'], uz: "Taxminan soat 3 da olish uchun kelaman." },
          { sentence: '이 서비스를 ___할 수 있어요.', answer: '이용', options: ['이용', '예약', '취소', '변경'], uz: "Bu xizmatdan foydalana olasiz." },
        ],
        scramble: [
          { kr: '짐', uz: 'yuk' },
          { kr: '물론', uz: 'albatta' },
          { kr: '확인', uz: 'tekshirish' },
          { kr: '서비스', uz: 'xizmat' },
          { kr: '도착', uz: 'yetib kelish' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄹ 수 있다' nimani ifodalaydi?", options: ['Majburiyat', 'Imkoniyat yoki qobiliyat', 'O\'tgan zamon', 'Shart'], correct_index: 1 },
      { question: "'짐을 맡아 주실 수 있어요?' nimani so'rayapti?", options: ['Yukimni ko\'tarasizmi?', 'Yukimni saqlab bera olasizmi?', 'Yuk qayerda?', 'Yuk nechta?'], correct_index: 1 },
      { question: "'물론이죠' nimani anglatadi?", options: ["mumkin emas", "bilmayman", "albatta", "ehtimol"], correct_index: 2 },
      { question: "Unli bilan tugagan o'zakdan keyin qaysi shakl?", options: ['을 수 있다', 'ㄹ 수 있다', '는 수 있다', '은 수 있다'], correct_index: 1 },
      { question: "'-(으)ㄹ 수밖에 없다' nimani anglatadi?", options: ['qila olaman', '...dan boshqa iloj yo\'q', 'qilmayman', 'qila olmayman'], correct_index: 1 },
      { question: "'이따가' nimani anglatadi?", options: ['kecha', 'ertaga', 'biroz keyin', 'hozir'], correct_index: 2 },
      { question: "'맡기다' nimani anglatadi?", options: ['saqlash uchun bermoq', 'sotib olmoq', 'almashmoq', 'yubormoq'], correct_index: 0 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 4: Bu kitob juda qiyin shekilli
  // 이 책은 너무 어려운 것 같아요
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 3, order_in_level: 4,
    title_kr: '이 책은 너무 어려운 것 같아요',
    title_uz: 'Bu kitob juda qiyin shekilli',
    is_free: false,
    content: {
      topic: {
        kr: '이 책은 너무 어려운 것 같아요. 저한테는 맞지 않는 것 같아요. 내용이 복잡하기 때문에 이해하기가 어려워요. 다른 책을 추천해 주시겠어요?',
        uz: "Bu kitob juda qiyin shekilli. Menga mos emas shekilli. Mazmuni murakkab bo'lgani uchun tushunish qiyin. Boshqa kitob tavsiya qilib bera olasizmi?"
      },
      grammar: {
        explanation: `-는 것 같다 / -(으)ㄴ 것 같다 / -(으)ㄹ 것 같다 — taxmin (3-daraja chuqur)

Hozirgi zamon:
• Fe'l + 는 것 같아요: 먹는 것 같아요 (yeyayotganday)
• Sifat + (으)ㄴ 것 같아요: 어려운 것 같아요 (qiyinday)

O'tgan zamon:
• Fe'l + (으)ㄴ 것 같아요: 먹은 것 같아요 (yegandek)
• Sifat + 았/었던 것 같아요: 어려웠던 것 같아요

Kelasi zamon (taxmin):
• +(으)ㄹ 것 같아요: 비가 올 것 같아요 (yomg'ir yog'adi shekilli)

-기 때문에 — ...bo'lgani uchun (rasmiy sabab):
• 내용이 복잡하기 때문에 어려워요. (Mazmuni murakkab bo'lgani uchun qiyin.)
• -아/어서 dan ko'ra rasmiyroq va kuchliroq!`,
        examples: [
          { kr: '이 책은 너무 어려운 것 같아요.', uz: 'Bu kitob juda qiyin shekilli.' },
          { kr: '저 사람은 한국 사람인 것 같아요.', uz: 'U odam koreyalik shekilli.' },
          { kr: '내일 비가 올 것 같아요.', uz: "Ertaga yomg'ir yog'adi shekilli." },
          { kr: '내용이 복잡하기 때문에 이해하기가 어려워요.', uz: "Mazmuni murakkab bo'lgani uchun tushunish qiyin." },
          { kr: '시간이 없기 때문에 빨리 해야 해요.', uz: "Vaqt yo'q bo'lgani uchun tez qilish kerak." },
        ]
      },
      vocabulary: [
        { kr: '내용', romanization: 'naeyong', uz: 'mazmun' },
        { kr: '복잡하다', romanization: 'bokjapada', uz: 'murakkab, chalkash' },
        { kr: '이해하다', romanization: 'ihaehada', uz: 'tushunmoq' },
        { kr: '추천하다', romanization: 'chucheonhada', uz: 'tavsiya qilmoq' },
        { kr: '의견', romanization: 'uigyeon', uz: 'fikr, mulohaza' },
        { kr: '느낌', romanization: 'neukkim', uz: 'his, taassurot' },
        { kr: '판단하다', romanization: 'pandanhada', uz: 'baho bermoq, xulosa chiqarmoq' },
        { kr: '생각하다', romanization: 'saenggakada', uz: "o'ylamoq" },
        { kr: '확실하다', romanization: 'hwaksilhada', uz: 'aniq, ishonchli' },
        { kr: '불확실하다', romanization: 'bulhwaksilhada', uz: "noaniq, ishonchsiz" },
        { kr: '수준', romanization: 'sujun', uz: 'daraja, sifat' },
        { kr: '어울리다', romanization: 'eoulrida', uz: 'mos kelmoq, yashashmoq' },
        { kr: '적합하다', romanization: 'jeokhapada', uz: 'mos, muvofiq' },
        { kr: '비교하다', romanization: 'bigyohada', uz: 'taqqoslamoq' },
        { kr: '다양하다', romanization: 'dayanghada', uz: 'xilma-xil, turli' },
        { kr: '중요하다', romanization: 'jungyohada', uz: 'muhim' },
        { kr: '필요하다', romanization: 'piryohada', uz: 'kerakli, zarur' },
        { kr: '적당하다', romanization: 'jeokdanghada', uz: 'mos, qulay' },
        { kr: '부족하다', romanization: 'bujokhada', uz: 'yetarli emas' },
        { kr: '충분하다', romanization: 'chungbunhada', uz: 'yetarli' },
      ],
      examples: [
        { kr: '이 책은 문법 설명이 부족하기 때문에 초급 학생한테는 어려운 것 같아요.', uz: "Bu kitobda grammatika izohi yetarli emas bo'lgani uchun boshlang'ich talabaga qiyin shekilli." },
        { kr: '저 사람이 피곤한 것 같아요. 눈이 빨개요.', uz: "U odam charchagan shekilli. Ko'zlari qizarib ketgan." },
        { kr: '선생님이 설명하신 내용이 복잡하기 때문에 다시 한번 들어야 할 것 같아요.', uz: "O'qituvchi tushuntirgan narsalar murakkab bo'lgani uchun bir marta yana eshitish kerak shekilli." },
        { kr: '이 문제는 생각보다 어려운 것 같아요. 시간이 좀 더 필요할 것 같아요.', uz: "Bu masala o'ylagandan qiyinroq shekilli. Biroz ko'proq vaqt kerak bo'ladi shekilli." },
        { kr: '요즘 날씨가 더 추워진 것 같아요. 옷을 따뜻하게 입어야겠어요.', uz: "Oxirgi paytlarda ob-havo sovuqroq bo'lib qolgan shekilli. Iliq kiyinish kerak." },
      ],
      dialog: [
        { speaker: 'A', kr: '이 책으로 TOPIK 준비하면 어떨까요?', uz: "Bu kitob bilan TOPIK tayyorlash qanday bo'lar?" },
        { speaker: 'B', kr: '글쎄요... 내용이 복잡하기 때문에 좀 어려운 것 같아요.', uz: "Qani endi... mazmuni murakkab bo'lgani uchun biroz qiyin shekilli." },
        { speaker: 'A', kr: '그래요? 제 수준에 안 맞는 것 같아요?', uz: "Shundaymi? Mening darajamga mos emas shekilli?" },
        { speaker: 'B', kr: '지금 수준이 어떻게 되세요? 한국어 공부한 지 얼마나 됐어요?', uz: "Hozir darajangiz qanday? Koreys tilini o'rganganingizga qancha bo'ldi?" },
        { speaker: 'A', kr: '1년 됐어요. 문법은 어느 정도 아는 것 같은데 어휘가 부족한 것 같아요.', uz: "1 yil bo'ldi. Grammatikani ma'lum darajada bilaman shekilli, lekin so'z boyligi yetarli emas shekilli." },
        { speaker: 'B', kr: '그럼 이 책보다는 이쪽이 더 적합한 것 같아요. 어휘 중심이거든요.', uz: "Unday bo'lsa bu kitobdan ko'ra u tomon mos keladi shekilli. So'z boyligi markazida." },
      ],
      notes: [
        "것 같아요: hozirgi sifat + (으)ㄴ 것 같아요; hozirgi fe'l + 는 것 같아요.",
        "Kelasi zamon taxmin: (으)ㄹ 것 같아요: 올 것 같아요, 어려울 것 같아요.",
        "-기 때문에 — rasmiy sabab: -아/어서 dan kuchliroq, rasmiy yozuvda ko'p ishlatiladi.",
        "문법 vs 어휘: 문법(grammatika), 어휘(so'z boyligi), 발음(talaffuz), 듣기(tinglash).",
        "생각보다 — o'ylagandan: 생각보다 어려워요 (o'ylagandan qiyinroq).",
      ],
      games: {
        matchPairs: [
          { kr: '복잡하다', uz: 'murakkab' },
          { kr: '이해하다', uz: 'tushunmoq' },
          { kr: '추천하다', uz: 'tavsiya qilmoq' },
          { kr: '충분하다', uz: 'yetarli' },
          { kr: '중요하다', uz: 'muhim' },
          { kr: '다양하다', uz: 'xilma-xil' },
        ],
        fillBlank: [
          { sentence: '이 책은 너무 어려운 것 ___.', answer: '같아요', options: ['같아요', '봐요', '해요', '돼요'], uz: 'Bu kitob juda qiyin shekilli.' },
          { sentence: '내용이 복잡하___어려워요.', answer: '기 때문에', options: ['기 때문에', '서', '고', '지만'], uz: "Mazmuni murakkab bo'lgani uchun qiyin." },
          { sentence: '내일 비가 올 것 ___.', answer: '같아요', options: ['같아요', '봐요', '해요', '싶어요'], uz: "Ertaga yomg'ir yog'adi shekilli." },
          { sentence: '저 사람이 피곤한 것 ___.', answer: '같아요', options: ['같아요', '봐요', '해요', '돼요'], uz: 'U odam charchagan shekilli.' },
          { sentence: '시간이 없___빨리 해야 해요.', answer: '기 때문에', options: ['기 때문에', '서', '지만', '면'], uz: "Vaqt yo'q bo'lgani uchun tez qilish kerak." },
        ],
        scramble: [
          { kr: '내용', uz: 'mazmun' },
          { kr: '복잡', uz: 'murakkab' },
          { kr: '수준', uz: 'daraja' },
          { kr: '필요', uz: 'zarur' },
          { kr: '충분', uz: 'yetarli' },
        ],
      },
    },
    quiz: [
      { question: "Hozirgi zamon sifatdan keyin qaysi shakl ishlatiladi?", options: ['는 것 같아요', '(으)ㄴ 것 같아요', '(으)ㄹ 것 같아요', '은 것 같아요'], correct_index: 1 },
      { question: "Kelasi zamon taxmin uchun qaysi shakl?", options: ['는 것 같아요', '(으)ㄴ 것 같아요', '(으)ㄹ 것 같아요', '았던 것 같아요'], correct_index: 2 },
      { question: "'-기 때문에' va '-아/어서' farqi?", options: ['Farq yo\'q', '-기 때문에 rasmiyroq va kuchliroq', '-아/어서 rasmiyroq', 'Ikkalasi ham norasmiy'], correct_index: 1 },
      { question: "'이해하다' nimani anglatadi?", options: ['o\'rganmoq', 'tushunmoq', 'yozmoq', 'o\'qimoq'], correct_index: 1 },
      { question: "'추천하다' nimani anglatadi?", options: ['so\'ramoq', 'tavsiya qilmoq', 'topshirmoq', 'ko\'rmoq'], correct_index: 1 },
      { question: "'생각보다' nimani anglatadi?", options: ["o'ylagandan", 'shu qadar', 'biroz', 'juda'], correct_index: 0 },
      { question: "'충분하다' nimani anglatadi?", options: ['yetarli emas', 'murakkab', 'yetarli', 'kerakli'], correct_index: 2 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 5: Bu do'kon yaxshiroqdek tuyuladi
  // 이 가게가 더 좋은 것 같아요
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 3, order_in_level: 5,
    title_kr: '이 가게가 더 좋은 것 같아요',
    title_uz: "Bu do'kon yaxshiroqdek tuyuladi",
    is_free: false,
    content: {
      topic: {
        kr: '이 가게가 저 가게보다 더 좋은 것 같아요. 가격도 더 싸고 물건도 더 다양한 것 같아요. 하지만 위치가 좀 불편한 것 같아요. 그래도 이쪽이 더 나은 것 같아요.',
        uz: "Bu do'kon u do'kondan yaxshiroqdek tuyuladi. Narxi ham arzonroq va mahsulotlar ham ko'proq xilma-xil shekilli. Lekin joylashuvi biroz noqulaydek tuyuladi. Shunday bo'lsa ham bu tomon yaxshiroqdek."
      },
      grammar: {
        explanation: `N보다 + 더 + A/V — taqqoslash: ...dan ...roq

Tuzilish: [A + 보다] + [B + 가/이] + 더 + [sifat/fe'l]
• 이 가게가 저 가게보다 더 싸요. (Bu do'kon u do'kondan arzon.)
• 버스보다 지하철이 더 빠른 것 같아요.

훨씬 — ancha, juda ko'p:
• 이쪽이 훨씬 더 좋아요. (Bu tomon ancha yaxshi.)

-는 것 같다 (taqqoslov kontekstda):
• 이 가게가 더 좋은 것 같아요. (Bu do'kon yaxshiroqdek.)
• 가격이 더 비싼 것 같아요. (Narxi qimmatroqdek shekilli.)

-기 때문에 (taqqoslash sababi):
• 가격이 싸기 때문에 이쪽을 추천해요. (Narxi arzon bo'lgani uchun bu tomoni tavsiya qilaman.)`,
        examples: [
          { kr: '이 가게가 저 가게보다 더 좋은 것 같아요.', uz: "Bu do'kon u do'kondan yaxshiroqdek tuyuladi." },
          { kr: '지하철이 버스보다 훨씬 빠른 것 같아요.', uz: "Metro avtobusdan ancha tezroqdek shekilli." },
          { kr: '이 옷이 저 옷보다 더 비싸기 때문에 저 옷을 살게요.', uz: "Bu kiyim u kiyimdan qimmatroq bo'lgani uchun u kiyimni olaman." },
          { kr: '봄이 여름보다 날씨가 더 좋은 것 같아요.', uz: "Bahor yozdan ob-havosi yaxshiroqdek shekilli." },
          { kr: '이 방법이 저 방법보다 더 간단한 것 같아요.', uz: "Bu usul u usuldan oddiyroqdek shekilli." },
        ]
      },
      vocabulary: [
        { kr: '비교하다', romanization: 'bigyohada', uz: 'taqqoslamoq' },
        { kr: '다양하다', romanization: 'dayanghada', uz: 'xilma-xil, turli' },
        { kr: '나은', romanization: 'naun', uz: 'yaxshiroq' },
        { kr: '훨씬', romanization: 'hwolssin', uz: 'ancha, juda ko\'proq' },
        { kr: '위치', romanization: 'wichi', uz: 'joylashuv, manzil' },
        { kr: '장점', romanization: 'jangjeom', uz: 'afzallik, yaxshi tomon' },
        { kr: '단점', romanization: 'danjeom', uz: "kamchilik, yomon tomon" },
        { kr: '품질', romanization: 'pumjil', uz: 'sifat' },
        { kr: '선택하다', romanization: 'seonteokada', uz: 'tanlash' },
        { kr: '결정하다', romanization: 'gyeoljeongada', uz: 'qaror qilmoq' },
        { kr: '고려하다', romanization: 'goryeohada', uz: "e'tiborga olmoq, hisobga olmoq" },
        { kr: '마음에 들다', romanization: 'maeume deulda', uz: 'yoqmoq, ma\'qul bo\'lmoq' },
        { kr: '비슷하다', romanization: 'biseutada', uz: "o'xshash, yaqin" },
        { kr: '차이', romanization: 'chai', uz: 'farq' },
        { kr: '종류', romanization: 'jongnyu', uz: 'tur, xil' },
        { kr: '인기있다', romanization: 'ingiitta', uz: 'mashhur, ommabop' },
        { kr: '특징', romanization: 'teukjing', uz: 'xususiyat, belgi' },
        { kr: '가성비', romanization: 'gaseongbi', uz: "narx-sifat nisbati (qo'y uchun sig'ir)" },
        { kr: '만족하다', romanization: 'manjokada', uz: 'qanoatlanmoq' },
        { kr: '불만족하다', romanization: 'bulmanjokada', uz: 'qanoatlanmaslik' },
      ],
      examples: [
        { kr: '두 가게를 비교해 보니까 이쪽이 가성비가 훨씬 좋은 것 같아요.', uz: "Ikki do'konni taqqoslab ko'rsam, bu tomon narx-sifat nisbati ancha yaxshi shekilli." },
        { kr: '이 핸드폰이 저것보다 기능이 많기 때문에 더 비싼 것 같아요.', uz: "Bu telefon u narsadan funksiyalari ko'p bo'lgani uchun qimmatroqdek shekilli." },
        { kr: '위치는 불편하지만 품질이 좋기 때문에 이쪽을 선택할 것 같아요.', uz: "Joylashuvi noqulay, lekin sifati yaxshi bo'lgani uchun bu tomoni tanlayman shekilli." },
        { kr: '가격 차이가 크기 때문에 싼 것을 고르는 게 나은 것 같아요.', uz: "Narx farqi katta bo'lgani uchun arzonini tanlash yaxshiroqdek shekilli." },
        { kr: '두 옷 다 마음에 들지만 이 옷이 좀 더 어울리는 것 같아요.', uz: "Ikki kiyim ham ma'qul, lekin bu kiyim biroz ko'proq yarashadek shekilli." },
      ],
      dialog: [
        { speaker: 'A', kr: '이 두 가방 중에서 어느 것이 더 좋아요?', uz: "Bu ikki sumkadan qaysi biri yaxshiroq?" },
        { speaker: 'B', kr: '글쎄요... 이쪽이 디자인은 더 예쁜 것 같아요.', uz: "Qani endi... bu tomon dizayni chiroyliroqdek shekilli." },
        { speaker: 'A', kr: '하지만 가격이 너무 비싸지 않아요?', uz: "Lekin narxi juda qimmat emasmi?" },
        { speaker: 'B', kr: '맞아요. 저쪽이 훨씬 더 싸기 때문에 가성비로는 저쪽이 나은 것 같아요.', uz: "To'g'ri. U tomon ancha arzon bo'lgani uchun narx-sifat jihatidan u tomon yaxshiroqdek shekilli." },
        { speaker: 'A', kr: '품질 차이는 있어요?', uz: "Sifat farqi bormi?" },
        { speaker: 'B', kr: '비슷한 것 같아요. 이 브랜드가 좀 더 인기 있기는 하지만요.', uz: "O'xshash shekilli. Bu brend biroz mashhurroq, lekin." },
      ],
      notes: [
        "보다 더: A보다 B가 더 + sifat = B, A dan ...roq.",
        "훨씬 — ancha, juda ko'proq: 훨씬 더 싸요 (ancha arzon).",
        "가성비 (価性比) — narx-sifat nisbati: zamonaviy koreys so'z boyligida keng ishlatiladi.",
        "마음에 들다 — yoqmoq, ma'qul bo'lmoq: 마음에 드세요? (yoqdimi?).",
        "장점/단점 — afzallik/kamchilik: 이 상품의 장점은... (bu mahsulotning afzalligi...).",
      ],
      games: {
        matchPairs: [
          { kr: '비교하다', uz: 'taqqoslamoq' },
          { kr: '훨씬', uz: 'ancha' },
          { kr: '장점', uz: 'afzallik' },
          { kr: '단점', uz: 'kamchilik' },
          { kr: '품질', uz: 'sifat' },
          { kr: '선택하다', uz: 'tanlash' },
        ],
        fillBlank: [
          { sentence: '이 가게가 저 가게___더 좋은 것 같아요.', answer: '보다', options: ['보다', '에서', '부터', '까지'], uz: "Bu do'kon u do'kondan yaxshiroqdek." },
          { sentence: '지하철이 버스보다 훨씬 ___것 같아요.', answer: '빠른', options: ['빠른', '느린', '큰', '작은'], uz: "Metro avtobusdan ancha tezroqdek." },
          { sentence: '품질이 좋___이쪽을 선택할 것 같아요.', answer: '기 때문에', options: ['기 때문에', '서', '고', '지만'], uz: "Sifati yaxshi bo'lgani uchun bu tomoni tanlayman." },
          { sentence: '두 옷 다 마음에 ___지만 이 옷이 더 좋아요.', answer: '들', options: ['들', '봐', '가', '와'], uz: "Ikki kiyim ham ma'qul, lekin bu kiyim yaxshiroq." },
          { sentence: '가격 차이가 크기 때문에 싼 것을 고르는 게 나은 것 ___.', answer: '같아요', options: ['같아요', '봐요', '돼요', '해요'], uz: "Narx farqi katta bo'lgani uchun arzonini tanlash yaxshiroqdek." },
        ],
        scramble: [
          { kr: '비교', uz: 'taqqoslash' },
          { kr: '장점', uz: 'afzallik' },
          { kr: '품질', uz: 'sifat' },
          { kr: '위치', uz: 'joylashuv' },
          { kr: '차이', uz: 'farq' },
        ],
      },
    },
    quiz: [
      { question: "'이 가게가 저 가게보다 더 좋아요' nimani anglatadi?", options: ["Bu do'kon u do'kondek yaxshi", "Bu do'kon u do'kondan yaxshiroq", "Ikkalasi ham yaxshi", "U do'kon yaxshiroq"], correct_index: 1 },
      { question: "'훨씬' nimani anglatadi?", options: ['biroz', 'ancha, juda ko\'proq', 'doimo', 'ba\'zan'], correct_index: 1 },
      { question: "'장점' nimani anglatadi?", options: ['kamchilik', 'afzallik', 'farq', 'sifat'], correct_index: 1 },
      { question: "'마음에 들다' nimani anglatadi?", options: ['xohlamoq', 'yoqmoq, ma\'qul bo\'lmoq', 'bilmoq', 'o\'rganmoq'], correct_index: 1 },
      { question: "'비슷하다' nimani anglatadi?", options: ['farqli', "o'xshash", 'yaxshi', 'yomon'], correct_index: 1 },
      { question: "'가성비' nimani anglatadi?", options: ['chegirma', 'chegirma narxi', 'narx-sifat nisbati', 'bepul xizmat'], correct_index: 2 },
      { question: "'결정하다' nimani anglatadi?", options: ['taqqoslamoq', 'tanlash', 'qaror qilmoq', 'tavsiya qilmoq'], correct_index: 2 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 6: Siz koreys taomini yeb ko'rganmisiz?
  // 한국 음식을 먹어 본 적이 있어요?
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 3, order_in_level: 6,
    title_kr: '한국 음식을 먹어 본 적이 있어요?',
    title_uz: "Siz koreys taomini yeb ko'rganmisiz?",
    is_free: false,
    content: {
      topic: {
        kr: '한국 음식을 먹어 본 적이 있어요? 네, 비빔밥을 먹어 본 적이 있어요. 처음에는 매워서 먹기가 힘들었어요. 하지만 먹어 보니까 정말 맛있었어요. 한번 꼭 먹어 보세요!',
        uz: "Koreys taomini yeb ko'rganmisiz? Ha, bibimbap yeb ko'rganman. Dastlab achchiq bo'lgani uchun yeyish qiyin edi. Lekin yeb ko'rganim uchun juda mazali edi. Bir marta albatta yeb ko'ring!"
      },
      grammar: {
        explanation: `V-아/어 본 적이 있다 / 없다 — tajriba: ...qilib ko'rganman / ko'rmaganman

Tuzilish: [fe'l + 아/어 본 적이 있다/없다]
• 먹어 본 적이 있어요. (Yeb ko'rganman.)
• 가 본 적이 없어요. (Bormaganman — tajriba yo'q.)

So'roq: -아/어 본 적이 있어요? (...qilib ko'rganmisiz?)

-아/어 보다 — tajriba ko'rish uchun urinish:
• 먹어 보세요. (Yeb ko'ring.)
• 입어 봐도 돼요? (Kiyib ko'rsam bo'ladimi?)
• 해 봤어요? (Qilib ko'rdingizmi?)

-아/어 보니까 — ...qilib ko'rib, natija:
• 먹어 보니까 맛있었어요. (Yeb ko'rganimda mazali edi.)`,
        examples: [
          { kr: '한국 음식을 먹어 본 적이 있어요?', uz: "Koreys taomini yeb ko'rganmisiz?" },
          { kr: '서울에 가 본 적이 없어요.', uz: "Seulga borganman — tajriba yo'q." },
          { kr: '한번 먹어 보세요! 정말 맛있어요.', uz: "Bir marta yeb ko'ring! Juda mazali." },
          { kr: '입어 봐도 돼요? 네, 피팅룸은 저쪽이에요.', uz: "Kiyib ko'rsam bo'ladimi? Ha, kiyinish xonasi u tomonda." },
          { kr: '먹어 보니까 처음 생각보다 맛있었어요.', uz: "Yeb ko'rganimda dastlabki o'ylagandan mazali edi." },
        ]
      },
      vocabulary: [
        { kr: '경험', romanization: 'gyeongheom', uz: 'tajriba' },
        { kr: '처음', romanization: 'cheoeum', uz: 'birinchi marta' },
        { kr: '처음에는', romanization: 'cheoeume-neun', uz: 'dastlab' },
        { kr: '나중에', romanization: 'najunge', uz: 'keyinchalik' },
        { kr: '익숙하다', romanization: 'iksukhada', uz: 'odatlanmoq, tanish bo\'lmoq' },
        { kr: '도전하다', romanization: 'dojeonhada', uz: 'qo\'rqmasdan urinmoq' },
        { kr: '시도하다', romanization: 'sidohada', uz: 'urinib ko\'rmoq' },
        { kr: '느끼다', romanization: 'neukida', uz: 'his qilmoq' },
        { kr: '신기하다', romanization: 'singihada', uz: 'ajib, g\'ayrioddiy' },
        { kr: '신선하다', romanization: 'sinseonhada', uz: 'yangi, toza' },
        { kr: '독특하다', romanization: 'dokteukada', uz: 'o\'ziga xos, noyob' },
        { kr: '문화', romanization: 'munhwa', uz: 'madaniyat' },
        { kr: '여행하다', romanization: 'yeohaenghada', uz: 'sayohat qilmoq' },
        { kr: '방문하다', romanization: 'bangmunhada', uz: 'tashrif buyurmoq' },
        { kr: '참여하다', romanization: 'chamyeohada', uz: 'qatnashmoq' },
        { kr: '즐기다', romanization: 'jeulgida', uz: 'zavq olmoq, bahramand bo\'lmoq' },
        { kr: '인상적이다', romanization: 'insangjeogida', uz: 'ta\'sirli, yodda qolarli' },
        { kr: '기억하다', romanization: 'gieokada', uz: 'eslamoq, eslab qolmoq' },
        { kr: '잊다', romanization: 'itda', uz: 'unutmoq' },
        { kr: '추천하다', romanization: 'chucheonhada', uz: 'tavsiya qilmoq' },
      ],
      examples: [
        { kr: '한복을 입어 본 적이 있어요? 네, 한국 여행 중에 입어 봤어요.', uz: "Hanbok kiyib ko'rganmisiz? Ha, Koreya safarida kiyib ko'rganman." },
        { kr: '매운 음식은 처음에는 힘들었지만 먹다 보니까 익숙해졌어요.', uz: "Achchiq taom dastlab qiyin edi, lekin yeyaverganim uchun odatlanib qoldim." },
        { kr: '한국에 가 본 적이 없어요. 언젠가 꼭 가 보고 싶어요.', uz: "Koreyaga borganman — tajriba yo'q. Qachondir albatta borib ko'rmoqchiman." },
        { kr: '이 드라마 봐 봤어요? 정말 재미있으니까 한번 봐 보세요.', uz: "Bu serialni ko'rib ko'rdingizmi? Juda qiziqarli, bir marta ko'rib ko'ring." },
        { kr: 'K-pop 콘서트에 가 본 적이 있어요? 없어요. 너무 가고 싶어요!', uz: "K-pop kontsertiga borguzmisiz? Yo'q. Juda bormoqchiman!" },
      ],
      dialog: [
        { speaker: 'A', kr: '오이벡 씨, 한국 음식 좋아해요?', uz: "Oybek, koreys taomini yoqtirasizmi?" },
        { speaker: 'B', kr: '네, 정말 좋아해요. 비빔밥이나 삼겹살을 먹어 본 적이 있어요?', uz: "Ha, juda yoqtiraman. Bibimbap yoki samgyeopsal yeb ko'rganmisiz?" },
        { speaker: 'A', kr: '비빔밥은 먹어 본 적이 있어요. 처음에는 매워서 힘들었어요.', uz: "Bibimbap yeb ko'rganman. Dastlab achchiq bo'lgani uchun qiyin edi." },
        { speaker: 'B', kr: '그래요? 먹다 보면 익숙해지고 맛있어요. 삼겹살은요?', uz: "Shundaymi? Yeyaversangiz odatlanasiz va mazali bo'ladi. Samgyeopsal-chi?" },
        { speaker: 'A', kr: '삼겹살은 아직 먹어 본 적이 없어요. 한번 먹어 보고 싶어요.', uz: "Samgyeopsal hali yeb ko'rmaganman. Bir marta yeb ko'rmoqchiman." },
        { speaker: 'B', kr: '그럼 같이 가요! 제가 맛있는 집 알아요. 먹어 보면 분명히 좋아할 거예요.', uz: "Unday bo'lsa birga boramiz! Men mazali joy bilaman. Yeb ko'rsangiz, albatta yoqadi." },
      ],
      notes: [
        "-아/어 본 적이 있다/없다: tajriba bor/yo'qligini ifodalash.",
        "-아/어 보다: biror narsani urinib ko'rish: 먹어 보세요(yeb ko'ring), 해 봐요(qilib ko'ring).",
        "-아/어 보니까: tajribadan keyin natija: 가 보니까 좋았어요(borib ko'rganimda yaxshi edi).",
        "먹다 보면: ...yeyaversangiz (takrorlanadigan harakatning natijasi).",
        "분명히 — albatta, shubhasiz: 분명히 좋아할 거예요 (albatta yoqadi).",
      ],
      games: {
        matchPairs: [
          { kr: '경험', uz: 'tajriba' },
          { kr: '도전하다', uz: "qo'rqmasdan urinmoq" },
          { kr: '익숙하다', uz: 'odatlanmoq' },
          { kr: '즐기다', uz: 'zavq olmoq' },
          { kr: '인상적이다', uz: "ta'sirli" },
          { kr: '추천하다', uz: 'tavsiya qilmoq' },
        ],
        fillBlank: [
          { sentence: '한국 음식을 먹어 본 적이 ___?', answer: '있어요', options: ['있어요', '없어요', '해요', '돼요'], uz: "Koreys taomini yeb ko'rganmisiz?" },
          { sentence: '서울에 가 본 적이 ___.', answer: '없어요', options: ['없어요', '있어요', '해요', '가요'], uz: "Seulga borganman — tajriba yo'q." },
          { sentence: '먹어 ___ 정말 맛있었어요.', answer: '보니까', options: ['보니까', '보면', '봤어요', '봤으니까'], uz: "Yeb ko'rganimda juda mazali edi." },
          { sentence: '한번 먹어 ___! 정말 맛있어요.', answer: '보세요', options: ['보세요', '봤어요', '볼게요', '봐요'], uz: "Bir marta yeb ko'ring! Juda mazali." },
          { sentence: '처음에는 힘들었지만 먹다 보면 ___.', answer: '익숙해져요', options: ['익숙해져요', '힘들어요', '어려워요', '없어요'], uz: "Dastlab qiyin edi, lekin yeyaversangiz odatlanasiz." },
        ],
        scramble: [
          { kr: '경험', uz: 'tajriba' },
          { kr: '처음', uz: 'birinchi' },
          { kr: '문화', uz: 'madaniyat' },
          { kr: '도전', uz: 'urinish' },
          { kr: '추천', uz: 'tavsiya' },
        ],
      },
    },
    quiz: [
      { question: "'-아/어 본 적이 있다' nimani ifodalaydi?", options: ['Majburiyat', 'Tajriba bor', 'Taxmin', 'So\'rash'], correct_index: 1 },
      { question: "'먹어 본 적이 없어요' nimani anglatadi?", options: ["Yeb ko'rganman", "Yeb ko'rmaganman", 'Yeyolmayman', 'Yemayman'], correct_index: 1 },
      { question: "'-아/어 보다' qanday ishlatiladi?", options: ['Tajriba yoki urinib ko\'rish', 'Majburiyat', 'Taxmin', 'Shart'], correct_index: 0 },
      { question: "'-아/어 보니까' nimani ifodalaydi?", options: ['Tajriba yo\'q', 'Tajribadan keyin natija', 'Urinib ko\'rish', 'So\'rash'], correct_index: 1 },
      { question: "'익숙하다' nimani anglatadi?", options: ['yangi', 'odatlanmoq, tanish', 'qiyin', 'ajib'], correct_index: 1 },
      { question: "'분명히' nimani anglatadi?", options: ["ba'zan", 'ehtimol', 'albatta, shubhasiz', 'hech qachon'], correct_index: 2 },
      { question: "'즐기다' nimani anglatadi?", options: ['azob chekmoq', 'zavq olmoq', "unutmoq", 'eslamoq'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 7: Bu men borgan joylar ichida eng katta bozor
  // 여기가 제가 가 본 곳 중에서 제일 큰 시장이에요
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 3, order_in_level: 7,
    title_kr: '여기가 제가 가 본 곳 중에서 제일 큰 시장이에요',
    title_uz: 'Bu men borgan joylar ichida eng katta bozor',
    is_free: false,
    content: {
      topic: {
        kr: '여기가 제가 가 본 곳 중에서 제일 큰 시장이에요. 이 시장이 서울에서 가장 유명한 곳 중의 하나예요. 여기서 파는 물건 중에서 의류가 제일 다양한 것 같아요.',
        uz: "Bu men borgan joylar ichida eng katta bozor. Bu bozor Seuldagi eng mashhur joylardan biri. Bu yerda sotilayotgan mahsulotlar orasida kiyimlar eng xilma-xildek shekilli."
      },
      grammar: {
        explanation: `N 중에서 제일 / 가장 — ...lar orasida eng...

Tuzilish: [N + 중에서] + [제일/가장] + [sifat]
• 가 본 곳 중에서 제일 좋아요. (Borgan joylarim orasida eng yaxshi.)
• 학생들 중에서 가장 열심히 해요. (Talabalar orasida eng astoydil.)

V-아/어 본 곳 중에서 — ...qilib ko'rgan joylar orasida:
• 제가 먹어 본 음식 중에서 김치가 제일 맛있어요.
• (Men yeb ko'rgan taomlar orasida kimchi eng mazali.)

중의 하나 — ...lardan biri:
• 서울에서 가장 유명한 곳 중의 하나예요. (Seuldagi eng mashhur joylardan biri.)

Review: -기 때문에 + 것 같다:
• 인기가 많기 때문에 항상 사람이 많은 것 같아요.`,
        examples: [
          { kr: '여기가 제가 가 본 곳 중에서 제일 큰 시장이에요.', uz: 'Bu men borgan joylar ichida eng katta bozor.' },
          { kr: '제가 먹어 본 음식 중에서 비빔밥이 가장 맛있어요.', uz: 'Men yeb ko\'rgan taomlar orasida bibimbap eng mazali.' },
          { kr: '이 식당은 서울에서 가장 유명한 곳 중의 하나예요.', uz: "Bu restoran Seuldagi eng mashhur joylardan biri." },
          { kr: '제가 배운 언어 중에서 한국어가 제일 어려운 것 같아요.', uz: "Men o'rgan tillar orasida koreys tili eng qiyindek shekilli." },
          { kr: '이번 여행이 지금까지 해 본 여행 중에서 가장 좋았어요.', uz: "Bu safari hozirgacha qilgan safarlarim orasida eng yaxshisi edi." },
        ]
      },
      vocabulary: [
        { kr: '중에서', romanization: 'jungeseo', uz: '...lar orasida' },
        { kr: '중의 하나', romanization: 'jungui hana', uz: '...lardan biri' },
        { kr: '여러', romanization: 'yeoreo', uz: 'bir necha, ko\'plab' },
        { kr: '다양하다', romanization: 'dayanghada', uz: 'xilma-xil' },
        { kr: '유명하다', romanization: 'yumyeonghada', uz: 'mashhur' },
        { kr: '특별하다', romanization: 'teukbyeolhada', uz: 'maxsus, alohida' },
        { kr: '인상적이다', romanization: 'insangjeogida', uz: "ta'sirli" },
        { kr: '최고', romanization: 'choego', uz: 'eng yaxshi, maksimal' },
        { kr: '최악', romanization: 'choeok', uz: 'eng yomon' },
        { kr: '손꼽히다', romanization: 'sonkkopida', uz: 'eng yaxshilardan sanalmoq' },
        { kr: '랭킹', romanization: 'raengking', uz: 'reytting' },
        { kr: '순위', romanization: 'sunwi', uz: "o'rin, reytting pozitsiyasi" },
        { kr: '가운데', romanization: 'gaunde', uz: 'orasida, markazida' },
        { kr: '관광지', romanization: 'gwangwangji', uz: 'turistik joy' },
        { kr: '명소', romanization: 'myeongso', uz: 'mashhur joy' },
        { kr: '풍경', romanization: 'punggyeong', uz: 'manzara' },
        { kr: '분위기', romanization: 'bunwigi', uz: "muhit, atmosfera" },
        { kr: '활기차다', romanization: 'hwalgichada', uz: "qaynoq, jonli, faol" },
        { kr: '한산하다', romanization: 'hansanhada', uz: "sokin, bo'sh" },
        { kr: '붐비다', romanization: 'bumbida', uz: "to'lib-toshmoq, gavjum" },
      ],
      examples: [
        { kr: '지금까지 가 본 나라 중에서 한국이 가장 인상적이었어요.', uz: "Hozirgacha borgan mamlakatlarim orasida Koreya eng ta'sirli edi." },
        { kr: '이 음식점은 제가 먹어 본 한식당 중에서 제일 맛있어요.', uz: "Bu restoran men yeb ko'rgan koreys restoranlari orasida eng mazali." },
        { kr: '동대문 시장은 서울에서 손꼽히는 쇼핑 명소 중의 하나예요.', uz: "Dongdaemun bozori Seuldagi eng mashhur xarid joylaridan biri." },
        { kr: '이번 여행에서 가 본 곳 중에서 경복궁이 가장 아름다웠어요.', uz: "Bu safarda borgan joylarim orasida Gyeongbokgung eng go'zal edi." },
        { kr: '제가 들어 본 음악 중에서 이 노래가 제일 좋아요.', uz: "Men eshitgan musiqalar orasida bu qo'shiq eng yaxshi." },
      ],
      dialog: [
        { speaker: 'A', kr: '동대문 시장에 와 본 적 있어요?', uz: 'Dongdaemun bozoriga kelgan bo\'lgansizmi?' },
        { speaker: 'B', kr: '네! 여기가 제가 가 본 시장 중에서 제일 큰 것 같아요.', uz: "Ha! Bu yerda men borgan bozorlar orasida eng katta shekilli." },
        { speaker: 'A', kr: '맞아요. 서울에서 가장 유명한 쇼핑 명소 중의 하나예요.', uz: "To'g'ri. Seuldagi eng mashhur xarid joylaridan biri." },
        { speaker: 'B', kr: '여기서 뭘 사는 게 제일 좋아요?', uz: "Bu yerdan nima sotib olish eng yaxshi?" },
        { speaker: 'A', kr: '제가 사 본 것 중에서 의류랑 액세서리가 제일 가성비가 좋았어요.', uz: "Men sotib olganlarim orasida kiyim va aksessuarlar narx-sifat nisbati eng yaxshi edi." },
        { speaker: 'B', kr: '그렇군요! 저도 여러 가게를 둘러봐야겠어요.', uz: "Shundaymi! Men ham bir necha do'konni ko'rib chiqishim kerak." },
      ],
      notes: [
        "중에서 — orasida: 가 본 곳 중에서(borgan joylarim orasida), 학생들 중에서(talabalar orasida).",
        "중의 하나 — ...lardan biri: 가장 유명한 곳 중의 하나(eng mashhur joylardan biri).",
        "최고 (eng yaxshi) ↔ 최악 (eng yomon) — qarama-qarshi juftlik.",
        "손꼽히다 — eng yaxshilardan sanalmoq: parmok bilan sanash qiymati.",
        "분위기 — muhit, atmosfera: 분위기가 좋아요 (muhiti yaxshi).",
      ],
      games: {
        matchPairs: [
          { kr: '중에서', uz: '...lar orasida' },
          { kr: '유명하다', uz: 'mashhur' },
          { kr: '특별하다', uz: 'maxsus' },
          { kr: '풍경', uz: 'manzara' },
          { kr: '분위기', uz: 'muhit' },
          { kr: '붐비다', uz: "gavjum, to'lib-toshmoq" },
        ],
        fillBlank: [
          { sentence: '여기가 제가 가 본 곳 ___ 제일 큰 시장이에요.', answer: '중에서', options: ['중에서', '에서', '부터', '까지'], uz: 'Bu men borgan joylar ichida eng katta bozor.' },
          { sentence: '이 식당은 서울에서 가장 유명한 곳 중의 ___.', answer: '하나예요', options: ['하나예요', '둘이에요', '셋이에요', '없어요'], uz: "Bu restoran Seuldagi eng mashhur joylardan biri." },
          { sentence: '제가 먹어 본 음식 ___ 비빔밥이 가장 맛있어요.', answer: '중에서', options: ['중에서', '에서', '에게', '한테'], uz: 'Men yeb ko\'rgan taomlar orasida bibimbap eng mazali.' },
          { sentence: '지금까지 가 본 나라 중에서 한국이 가장 ___.', answer: '인상적이었어요', options: ['인상적이었어요', '나빴어요', '작았어요', '멀었어요'], uz: "Hozirgacha borgan mamlakatlarim orasida Koreya eng ta'sirli edi." },
          { sentence: '이번 여행이 지금까지 해 본 여행 ___ 가장 좋았어요.', answer: '중에서', options: ['중에서', '에서', '부터', '이후'], uz: "Bu safari hozirgacha qilgan safarlarim orasida eng yaxshisi edi." },
        ],
        scramble: [
          { kr: '중에서', uz: 'orasida' },
          { kr: '명소', uz: 'mashhur joy' },
          { kr: '풍경', uz: 'manzara' },
          { kr: '분위기', uz: 'muhit' },
          { kr: '순위', uz: "o'rin" },
        ],
      },
    },
    quiz: [
      { question: "'가 본 곳 중에서 제일' nimani anglatadi?", options: ['Borgan joyda eng', 'Borgan joylar orasida eng', 'Bormoqchi bo\'lgan joy', 'Bormaganman'], correct_index: 1 },
      { question: "'중의 하나' nimani anglatadi?", options: ['hammasi', '...lardan biri', 'faqat bittasi', 'eng yaxshisi'], correct_index: 1 },
      { question: "'유명하다' nimani anglatadi?", options: ['yaqin', 'mashhur', 'katta', 'yangi'], correct_index: 1 },
      { question: "'분위기' nimani anglatadi?", options: ['manzara', 'narx', 'muhit, atmosfera', 'sifat'], correct_index: 2 },
      { question: "'붐비다' nimani anglatadi?", options: ["sokin, bo'sh", "gavjum, to'lib-toshmoq", 'katta', 'mashhur'], correct_index: 1 },
      { question: "'최고' nimani anglatadi?", options: ['eng yomon', 'eng yaxshi, maksimal', 'o\'rtacha', 'birinchi'], correct_index: 1 },
      { question: "'특별하다' nimani anglatadi?", options: ['oddiy', 'maxsus, alohida', 'mashhur', 'katta'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 8: Shirinliklar bolalarga yoqadi, to'g'rimi?
  // 과자는 어린이들이 좋아하는 것 아니에요?
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 3, order_in_level: 8,
    title_kr: '과자는 어린이들이 좋아하는 것 아니에요?',
    title_uz: "Shirinliklar bolalarga yoqadi, to'g'rimi?",
    is_free: false,
    content: {
      topic: {
        kr: '과자는 어린이들이 좋아하는 것 아니에요? 네, 맞아요. 어른들도 좋아하잖아요. 이 과자는 사실 어른용이에요. 그런데 아이들도 먹을 수 있지 않아요?',
        uz: "Shirinliklar bolalarga yoqadi, to'g'rimi? Ha, to'g'ri. Kattalar ham yoqtiradi-ku. Bu shirinlik aslida kattalar uchun. Lekin bolalar ham yey olmaydi, shundaymi?"
      },
      grammar: {
        explanation: `-지 않아요? — tasdiqlash so'rash: ...emas emasmi? / ...to'g'rimi?

Tuzilish: [fe'l/sifat + 지 않아요?]
• 과자를 좋아하지 않아요? (Shirinlikni yoqtirmaysizmi?)
• 맛있지 않아요? (Mazali emasmi?)

-잖아요 — siz ham biladigan narsani eslatish: "...ku, ...da"
• 어른들도 좋아하잖아요. (Kattalar ham yoqtiradi-ku.)
• 알잖아요. (Bilasiz-ku / Bilasiz-da.)
• Tinglovchi ham shu narsani biladi deb faraz qilinadi.

Conversation softening (yumshatish):
• 사실 (aslida) — fikrni yumshatib aytish
• 그런데 (lekin, ammo) — suhbatda fikr o'zgartirish
• 그래도 (shunday bo'lsa ham) — qarshi fikr bildirish`,
        examples: [
          { kr: '과자는 어린이들이 좋아하는 것 아니에요?', uz: "Shirinliklar bolalarga yoqadi, to'g'rimi?" },
          { kr: '어른들도 좋아하잖아요.', uz: 'Kattalar ham yoqtiradi-ku.' },
          { kr: '이미 알고 있잖아요.', uz: 'Allaqachon bilasiz-ku.' },
          { kr: '이 영화 재미있지 않아요?', uz: "Bu film qiziqarli emasmi?" },
          { kr: '사실 저도 그렇게 생각해요. 그런데 확실하지는 않아요.', uz: "Aslida men ham shunday o'ylayman. Lekin aniq emas." },
        ]
      },
      vocabulary: [
        { kr: '확인하다', romanization: 'hwaginada', uz: 'tasdiqlash, tekshirmoq' },
        { kr: '동의하다', romanization: 'donguihada', uz: 'rozi bo\'lmoq, kelishmoq' },
        { kr: '반대하다', romanization: 'bandaehada', uz: 'qarshi bo\'lmoq' },
        { kr: '사실', romanization: 'sasil', uz: 'aslida, haqiqat' },
        { kr: '솔직히', romanization: 'soljiki', uz: 'ochiqchasiga, rostini aytganda' },
        { kr: '사실은', romanization: 'sasireun', uz: 'aslida, to\'g\'risi' },
        { kr: '그런데', romanization: 'geureonde', uz: 'lekin, ammo, xo\'sh' },
        { kr: '그래도', romanization: 'geuraedo', uz: 'shunday bo\'lsa ham' },
        { kr: '어쨌든', romanization: 'eojjaetdeun', uz: 'qanday bo\'lmasin, har holda' },
        { kr: '그렇지 않아요?', romanization: 'geureoji anayo', uz: "to'g'rimi? shundaymi?" },
        { kr: '맞죠?', romanization: 'matjyo', uz: "to'g'ri-ku? shundaymi?" },
        { kr: '당연하다', romanization: 'dangyeonhada', uz: 'tabiiy, albatta' },
        { kr: '당연히', romanization: 'dangyeonhi', uz: 'albatta, tabiiy' },
        { kr: '예상하다', romanization: 'yesanghada', uz: 'kutmoq, taxmin qilmoq' },
        { kr: '기대하다', romanization: 'gidaehada', uz: 'kutish, umid qilmoq' },
        { kr: '실망하다', romanization: 'silmanghada', uz: 'hayal qolmoq, umidi puchga chiqmoq' },
        { kr: '놀라다', romanization: 'nollada', uz: 'hayron bo\'lmoq' },
        { kr: '이해하다', romanization: 'ihaehada', uz: 'tushunmoq' },
        { kr: '납득하다', romanization: 'napdeukada', uz: "ishontirmoq, ko'nmoq" },
        { kr: '의심하다', romanization: 'uisimhada', uz: 'shubhlanmoq' },
      ],
      examples: [
        { kr: '한국어 공부하는 거 힘들지 않아요? 힘들잖아요.', uz: "Koreys tili o'rganish qiyin emasmi? Qiyin-ku." },
        { kr: '사실은 저도 잘 모르겠어요. 솔직히 말씀드릴게요.', uz: "Aslida men ham yaxshi bilmayman. Rostini aytaman." },
        { kr: '이 방법이 더 빠르지 않아요? 맞아요. 훨씬 효율적이에요.', uz: "Bu usul tezroq emasmi? To'g'ri. Ancha samaraliroq." },
        { kr: '어린이들이 단 음식을 좋아하잖아요. 그래서 이런 과자가 인기 있어요.', uz: "Bolalar shirin taomlarni yoqtiradi-ku. Shuning uchun bunday shirinliklar ommabop." },
        { kr: '그렇게 생각하지 않아요? 저는 조금 다르게 생각해요.', uz: "Shunday o'ylamaysizmi? Men biroz boshqacha o'ylayman." },
      ],
      dialog: [
        { speaker: 'A', kr: '이 과자 먹어 봐요. 맛있지 않아요?', uz: "Bu shirinlikni yeb ko'ring. Mazali emasmi?" },
        { speaker: 'B', kr: '어? 이거 어린이용 과자 아니에요?', uz: "Eh? Bu bolalar uchun shirinlik emasmi?" },
        { speaker: 'A', kr: '어른들도 좋아하잖아요. 사실 어른용이에요.', uz: "Kattalar ham yoqtiradi-ku. Aslida kattalar uchun." },
        { speaker: 'B', kr: '그렇군요. 그런데 좀 달지 않아요?', uz: "Shundaymi. Lekin biroz shirin emasmi?" },
        { speaker: 'A', kr: '맞아요. 근데 그래도 맛있잖아요. 한 개 더 먹어요.', uz: "To'g'ri. Lekin shunday bo'lsa ham mazali-ku. Yana birini oling." },
        { speaker: 'B', kr: '하하. 당연히 맛있죠. 그래서 멈출 수가 없잖아요!', uz: "Haha. Albatta mazali-ku. Shuning uchun to'xtatib bo'lmaydi-da!" },
      ],
      notes: [
        "-지 않아요?: tasdiq so'rash: 맛있지 않아요?(mazali emasmi?), 알지 않아요?(bilasiz-ku?).",
        "-잖아요: tinglovchi ham biladi deb faraz qilinadi: 알잖아요(bilasiz-ku).",
        "사실/솔직히: suhbatda yumshatib gapirish uchun: 사실은 저도... (aslida men ham...).",
        "그래도 — shunday bo'lsa ham: fikrga qarshi chiqishda: 그래도 맛있어요 (shunday bo'lsa ham mazali).",
        "당연하다/당연히 — tabiiy/albatta: 당연히 맛있죠 (albatta mazali-ku).",
      ],
      games: {
        matchPairs: [
          { kr: '사실', uz: 'aslida' },
          { kr: '솔직히', uz: 'rostini aytganda' },
          { kr: '당연히', uz: 'albatta' },
          { kr: '동의하다', uz: 'rozi bo\'lmoq' },
          { kr: '반대하다', uz: 'qarshi bo\'lmoq' },
          { kr: '놀라다', uz: 'hayron bo\'lmoq' },
        ],
        fillBlank: [
          { sentence: '과자는 어린이들이 좋아하는 것 아니___?', answer: '에요', options: ['에요', '예요', '요', '야요'], uz: "Shirinliklar bolalarga yoqadi, to'g'rimi?" },
          { sentence: '어른들도 좋아하___요.', answer: '잖아', options: ['잖아', '지 않아', '겠어', '었어'], uz: 'Kattalar ham yoqtiradi-ku.' },
          { sentence: '이 방법이 더 빠르지 ___?', answer: '않아요', options: ['않아요', '있어요', '해요', '돼요'], uz: "Bu usul tezroq emasmi?" },
          { sentence: '사실___ 저도 잘 모르겠어요.', answer: '은', options: ['은', '이', '를', '에'], uz: "Aslida men ham yaxshi bilmayman." },
          { sentence: '그래도 맛있___요.', answer: '잖아', options: ['잖아', '지 않아', '었어', '겠어'], uz: "Shunday bo'lsa ham mazali-ku." },
        ],
        scramble: [
          { kr: '사실', uz: 'aslida' },
          { kr: '당연', uz: 'albatta' },
          { kr: '동의', uz: 'kelishish' },
          { kr: '반대', uz: 'qarshi' },
          { kr: '확인', uz: 'tasdiqlash' },
        ],
      },
    },
    quiz: [
      { question: "'-지 않아요?' qanday ishlatiladi?", options: ['Inkor gapi', 'Tasdiqlash so\'rash', 'Buyruq', 'Shart'], correct_index: 1 },
      { question: "'-잖아요' qanday ma'no ifodalaydi?", options: ['Yangi ma\'lumot berish', 'Tinglovchi ham biladigan narsani eslatish', 'So\'rash', 'Taklif'], correct_index: 1 },
      { question: "'솔직히' nimani anglatadi?", options: ["ba'zan", 'aslida', 'ochiqchasiga, rostini aytganda', 'doimo'], correct_index: 2 },
      { question: "'당연히' nimani anglatadi?", options: ["ba'zan", 'ehtimol', 'albatta, tabiiy', 'hech qachon'], correct_index: 2 },
      { question: "'그래도' nimani anglatadi?", options: ['shuning uchun', 'shunday bo\'lsa ham', 'lekin', 'va'], correct_index: 1 },
      { question: "'동의하다' nimani anglatadi?", options: ['qarshi bo\'lmoq', 'rozi bo\'lmoq', 'shubhlanmoq', 'hayron bo\'lmoq'], correct_index: 1 },
      { question: "'실망하다' nimani anglatadi?", options: ['xursand bo\'lmoq', 'hayron bo\'lmoq', 'umidi puchga chiqmoq', 'kutmoq'], correct_index: 2 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 9: Koreys tili kursiga ro'yxatdan o'tish uchun keldim
  // 한국어반에 등록을 하려고 왔어요
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 3, order_in_level: 9,
    title_kr: '한국어반에 등록을 하려고 왔어요',
    title_uz: "Koreys tili kursiga ro'yxatdan o'tish uchun keldim",
    is_free: false,
    content: {
      topic: {
        kr: '한국어반에 등록을 하려고 왔어요. 어떤 반에 등록하려고 해요? 중급반에 등록하려고 해요. 서류를 제출하러 왔어요. 등록금을 내러 왔어요.',
        uz: "Koreys tili kursiga ro'yxatdan o'tish uchun keldim. Qaysi guruhga yozilmoqchisiz? O'rta daraja guruhiga yozilmoqchiman. Hujjatlar topshirish uchun keldim. Kontrakt to'lash uchun keldim."
      },
      grammar: {
        explanation: `V-(으)려고 하다 — maqsad va niyat ifodalash (3-daraja chuqur)

Tuzilish:
• Undosh + 으려고 하다: 먹다 → 먹으려고 해요
• Unli/ㄹ + 려고 하다: 가다 → 가려고 해요

Zamonlar:
• Hozirgi: 가려고 해요 (bormoqchiman)
• O'tgan: 가려고 했어요 (bormoqchi edim — lekin...)
• Hozirgi davom: 가려고 하고 있어요 (borishni rejalashtiryapman)

-(으)러 가다/오다 — ...gani bormoq/kelmoq:
• 등록하러 왔어요. (Ro'yxatdan o'tgani keldim.)
• 책 빌리러 도서관에 가요. (Kitob olish uchun kutubxonaga boraman.)

MUHIM farq:
• (으)려고 — barcha fe'llar bilan, keng maqsad
• (으)러 — faqat harakat fe'llari: 가다, 오다, 다니다 bilan`,
        examples: [
          { kr: '한국어반에 등록하려고 왔어요.', uz: "Koreys tili kursiga ro'yxatdan o'tgani keldim." },
          { kr: '오늘 중에 끝내려고 해요.', uz: "Bugun ichida tugatmoqchiman." },
          { kr: '서류를 제출하러 왔어요.', uz: 'Hujjat topshirgani keldim.' },
          { kr: '책을 빌리러 도서관에 갔어요.', uz: 'Kitob olish uchun kutubxonaga bordim.' },
          { kr: '한국에 공부하러 왔어요.', uz: "O'qish uchun Koreyaga keldim." },
        ]
      },
      vocabulary: [
        { kr: '목적', romanization: 'mokjeok', uz: 'maqsad' },
        { kr: '계획', romanization: 'gyehoek', uz: 'reja' },
        { kr: '계획하다', romanization: 'gyehoekada', uz: 'rejalashmoq' },
        { kr: '준비하다', romanization: 'junbihada', uz: 'tayyorlamoq' },
        { kr: '신청하다', romanization: 'sincheonghada', uz: 'ariza bermoq' },
        { kr: '제출하다', romanization: 'jechulhada', uz: 'topshirmoq' },
        { kr: '등록하다', romanization: 'deungnokhada', uz: "ro'yxatdan o'tmoq" },
        { kr: '납부하다', romanization: 'napbuhada', uz: "to'lamoq (rasmiy)" },
        { kr: '확인하다', romanization: 'hwaginada', uz: 'tekshirmoq' },
        { kr: '완료하다', romanization: 'wallyohada', uz: 'yakunlamoq, tugatmoq' },
        { kr: '처리하다', romanization: 'cheorhada', uz: 'hal qilmoq' },
        { kr: '서류', romanization: 'seoryu', uz: 'hujjatlar' },
        { kr: '지원하다', romanization: 'jiwonhada', uz: "ariza topshirmoq (grant, o'qish uchun)" },
        { kr: '합격하다', romanization: 'hapgyeokada', uz: "o'tmoq (imtihon, tanlov)" },
        { kr: '불합격하다', romanization: 'bulhapgyeokada', uz: "o'tmaslik" },
        { kr: '장학금', romanization: 'janghakgeum', uz: 'stipendiya' },
        { kr: '기숙사', romanization: 'gisuksa', uz: 'yotoqxona' },
        { kr: '신분증', romanization: 'sinbunjeung', uz: 'shaxsiy guvohnoma' },
        { kr: '여권', romanization: 'yeogwon', uz: 'pasport' },
        { kr: '비자', romanization: 'bija', uz: 'viza' },
      ],
      examples: [
        { kr: '한국어 실력을 올리려고 매일 2시간씩 공부하고 있어요.', uz: "Koreys tili darajamni oshirish uchun har kuni 2 soatdan o'rganayapman." },
        { kr: '어제 도서관에 책 반납하러 갔다가 새 책을 발견했어요.', uz: "Kecha kutubxonaga kitob qaytarish uchun borganimda yangi kitob topdim." },
        { kr: '장학금에 지원하려고 서류를 준비하고 있어요.', uz: "Stipendiyaga ariza topshirish uchun hujjatlarni tayyorlayapman." },
        { kr: '내년에 한국에 유학 가려고 지금부터 준비하고 있어요.', uz: "Kelgusi yil Koreyaga o'qishga borish uchun hozirdan tayyorlanayapman." },
        { kr: '비자를 신청하러 대사관에 갔어요. 서류가 많이 필요했어요.', uz: "Viza olish uchun elchixonaga bordim. Ko'p hujjat kerak edi." },
      ],
      dialog: [
        { speaker: 'A', kr: '안녕하세요. 한국어반 등록을 하려고 왔어요.', uz: "Salom. Koreys tili kursiga ro'yxatdan o'tgani keldim." },
        { speaker: 'B', kr: '어떤 레벨에 등록하려고 하세요?', uz: "Qaysi darajaga yozilmoqchisiz?" },
        { speaker: 'A', kr: '중급반에 등록하려고 해요. 시험을 봐야 하나요?', uz: "O'rta daraja guruhiga yozilmoqchiman. Imtihon topshirish kerakmi?" },
        { speaker: 'B', kr: '네, 레벨 테스트가 있어요. 테스트 보러 오실 수 있어요?', uz: "Ha, daraja testi bor. Test topshirgani kela olasizmi?" },
        { speaker: 'A', kr: '물론이죠. 언제 테스트를 보러 오면 돼요?', uz: "Albatta. Qachon test topshirgani kelsam bo'ladi?" },
        { speaker: 'B', kr: '이번 주 목요일이나 금요일에 오시면 돼요. 서류도 챙겨 오세요.', uz: "Bu hafta payshanba yoki jumada kelsangiz bo'ladi. Hujjatlaringizni ham olib keling." },
      ],
      notes: [
        "-(으)려고 하다: niyat va reja: 가려고 해요(bormoqchiman), 공부하려고 해요(o'qimoqchiman).",
        "-(으)러 가다/오다: maqsadli harakat: 먹으러 가요(yegani boraman), 보러 왔어요(ko'rgani keldim).",
        "-(으)려고 했어요 — niyat bor edi (lekin bajarilmagan): 가려고 했는데 못 갔어요.",
        "지원하다 — grant, o'qish uchun ariza; 신청하다 — umumiy ariza/murojaat.",
        "합격/불합격 — test yoki tanlovdan o'tish/o'tmaslik: 합격했어요(o'tdim).",
      ],
      games: {
        matchPairs: [
          { kr: '목적', uz: 'maqsad' },
          { kr: '계획하다', uz: 'rejalashmoq' },
          { kr: '제출하다', uz: 'topshirmoq' },
          { kr: '합격하다', uz: "o'tmoq (imtihon)" },
          { kr: '장학금', uz: 'stipendiya' },
          { kr: '여권', uz: 'pasport' },
        ],
        fillBlank: [
          { sentence: '한국어반에 등록을 하___왔어요.', answer: '려고', options: ['려고', '러', '면서', '고'], uz: "Koreys tili kursiga ro'yxatdan o'tgani keldim." },
          { sentence: '서류를 제출하___ 왔어요.', answer: '러', options: ['러', '려고', '면서', '고'], uz: 'Hujjat topshirgani keldim.' },
          { sentence: '한국에 공부하___ 왔어요.', answer: '러', options: ['러', '려고', '면서', '고'], uz: "O'qish uchun Koreyaga keldim." },
          { sentence: '장학금에 지원하___ 서류를 준비하고 있어요.', answer: '려고', options: ['려고', '러', '면서', '고'], uz: "Stipendiyaga ariza topshirish uchun hujjatlarni tayyorlayapman." },
          { sentence: '내년에 한국에 유학 가___ 준비하고 있어요.', answer: '려고', options: ['려고', '러', '면서', '고'], uz: "Kelgusi yil Koreyaga o'qishga borish uchun tayyorlanayapman." },
        ],
        scramble: [
          { kr: '목적', uz: 'maqsad' },
          { kr: '계획', uz: 'reja' },
          { kr: '서류', uz: 'hujjat' },
          { kr: '여권', uz: 'pasport' },
          { kr: '비자', uz: 'viza' },
        ],
      },
    },
    quiz: [
      { question: "'등록하려고 왔어요' nimani anglatadi?", options: ["Ro'yxatdan o'tib bo'ldim", "Ro'yxatdan o'tgani keldim", "Ro'yxat yo'q", "Ro'yxatdan o'tmayman"], correct_index: 1 },
      { question: "'-(으)려고 하다' va '-(으)러 가다/오다' farqi?", options: ['Farq yo\'q', '(으)려고 — barcha fe\'llar; (으)러 — faqat harakat fe\'llari', '(으)러 — barcha fe\'llar', 'Ikkalasi ham bir xil'], correct_index: 1 },
      { question: "'합격하다' nimani anglatadi?", options: ["ariza bermoq", "to'lamoq", "o'tmoq (imtihon)", 'topshirmoq'], correct_index: 2 },
      { question: "'장학금' nimani anglatadi?", options: ["kontrakt to'lovi", 'stipendiya', 'ariza', 'hujjat'], correct_index: 1 },
      { question: "-(으)려고 했어요 nimani anglatadi?", options: ['Bajarildi', 'Niyat bor edi (lekin bajarilmadi)', 'Bajarilayapti', 'Hech qachon bajarilmagan'], correct_index: 1 },
      { question: "'여권' nimani anglatadi?", options: ['viza', 'pasport', 'shaxsiy guvohnoma', 'ariza'], correct_index: 1 },
      { question: "'비자' nimani anglatadi?", options: ['pasport', 'viza', 'ruxsatnoma', 'chek'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 10: Yaqinda Seollal, shuning uchun tteokguk yeyish kerak
  // 곧 설날인데 떡국을 먹어야 해요
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 3, order_in_level: 10,
    title_kr: '곧 설날인데 떡국을 먹어야 해요',
    title_uz: "Yaqinda Seollal bo'ladi, tteokguk yeyish kerak",
    is_free: false,
    content: {
      topic: {
        kr: '곧 설날인데 떡국을 먹어야 해요. 가족들이 모여야 해서 고향에 가야 해요. 세배를 안 해도 되지만 어른들한테는 하는 게 좋아요. 한국 전통 문화를 꼭 경험해 보세요.',
        uz: "Yaqinda Seollal, shuning uchun tteokguk yeyish kerak. Oila yig'ilishi uchun tug'ilgan yerimga borish kerak. Ta'zim qilmaslik ham mumkin, lekin kattalar uchun qilish yaxshi. Koreya an'anaviy madaniyatini albatta boshdan kechiring."
      },
      grammar: {
        explanation: `-아/어야 하다 / -아/어야 되다 — majburiyat (3-daraja chuqur)

-아/어야 하다: majburiyat yoki zaruratni bildirish
• 먹어야 해요. (Yeyish kerak.)
• 가야 해요. (Borish kerak.)

-지 않아도 되다 — ...maslik ham mumkin, ...qilish shart emas:
• 세배를 안 해도 돼요. (Ta'zim qilmaslik ham mumkin.)
• 오지 않아도 돼요. (Kelmaslik ham mumkin.)

-는데 — fon tushuntirish (background):
• 곧 설날인데 떡국을 먹어야 해요.
(Yaqinda Seollal, shuning uchun tteokguk yeyish kerak.)
• 배가 고픈데 밥을 먹을까요?
(Qorin och, ovqat yeymizmi?)

-는데 ikki vazifasi: 1) fon berish 2) qarama-qarshi fikr`,
        examples: [
          { kr: '곧 설날인데 떡국을 먹어야 해요.', uz: "Yaqinda Seollal, shuning uchun tteokguk yeyish kerak." },
          { kr: '내일까지 제출해야 해요.', uz: 'Ertaga qadar topshirish kerak.' },
          { kr: '세배를 안 해도 되지만 하는 게 예의 바릅니다.', uz: "Ta'zim qilmaslik ham mumkin, lekin qilish odobli." },
          { kr: '지금 바쁜데 나중에 얘기할게요.', uz: "Hozir band, keyinroq gaplashamiz." },
          { kr: '한국 문화를 배우고 싶은데 어떻게 시작할까요?', uz: "Koreya madaniyatini o'rganmoqchiman, qanday boshlasam bo'ladi?" },
        ]
      },
      vocabulary: [
        { kr: '전통', romanization: 'jeontong', uz: "an'ana" },
        { kr: '문화', romanization: 'munhwa', uz: 'madaniyat' },
        { kr: '풍습', romanization: 'pungseup', uz: "udum, an'anaviy odat" },
        { kr: '의식', romanization: 'uisik', uz: 'marosim, ritual' },
        { kr: '명절', romanization: 'myeongjeol', uz: 'bayram' },
        { kr: '설날', romanization: 'seollal', uz: 'Seollal (Koreys Yangi yili)' },
        { kr: '추석', romanization: 'chuseok', uz: "Chuseok (kuz bayrami)" },
        { kr: '세배', romanization: 'sebae', uz: "yangi yil ta'zimi" },
        { kr: '떡국', romanization: 'tteokguk', uz: "tteokguk (guruchli sho'rva)" },
        { kr: '한복', romanization: 'hanbok', uz: 'hanbok (milliy kiyim)' },
        { kr: '조상', romanization: 'josang', uz: 'ajdodlar' },
        { kr: '차례', romanization: 'charye', uz: 'ajdodlar uchun marosim' },
        { kr: '세뱃돈', romanization: 'sebaetdon', uz: 'yangi yil puli (kattalardan bolalarga)' },
        { kr: '고향', romanization: 'gohyang', uz: "tug'ilgan joy" },
        { kr: '모이다', romanization: 'moida', uz: "yig'ilmoq" },
        { kr: '예의', romanization: 'yeui', uz: 'odob, xulq' },
        { kr: '예의 바르다', romanization: 'yeui bareuda', uz: 'odobli bo\'lmoq' },
        { kr: '존중하다', romanization: 'jonjunghada', uz: 'hurmat qilmoq' },
        { kr: '계승하다', romanization: 'gyeseunghada', uz: "merosxo'rlik qilmoq, davom ettirmoq" },
        { kr: '보존하다', romanization: 'bojonhada', uz: "saqlamoq, yo'qolishiga yo'l qo'ymaslik" },
      ],
      examples: [
        { kr: '설날에는 온 가족이 모여야 해서 고향에 가는 사람이 많아요.', uz: "Seollalda butun oila yig'ilishi kerak bo'lgani uchun tug'ilgan joyga boruvchilar ko'p." },
        { kr: '한복을 꼭 입어야 하는 건 아닌데 입으면 분위기가 더 좋아요.', uz: "Hanbok albatta kiyish shart emas, lekin kiyilsa muhit yaxshiroq bo'ladi." },
        { kr: '어른들한테 세배를 안 해도 되지만 하는 게 예의 바른 행동이에요.', uz: "Kattalarga ta'zim qilmaslik ham mumkin, lekin qilish odobli harakat." },
        { kr: '이번 추석에는 고향에 못 가는데 영상통화로 가족들을 봤어요.', uz: "Bu Chuseokda tug'ilgan yerimga bora olmadim, video qo'ng'iroq orqali oilani ko'rdim." },
        { kr: '한국 전통 문화를 보존하고 계승해야 한다고 생각해요.', uz: "Koreya an'anaviy madaniyatini saqlab, davom ettirish kerak deb o'ylayman." },
      ],
      dialog: [
        { speaker: 'A', kr: '곧 설날이에요. 고향에 가요?', uz: "Yaqinda Seollal. Tug'ilgan yeringizga borasizmi?" },
        { speaker: 'B', kr: '네, 가야 해요. 온 가족이 모이는데 저도 가야죠.', uz: "Ha, borish kerak. Butun oila yig'iladi, men ham borish kerak-ku." },
        { speaker: 'A', kr: '설날에 뭘 해야 해요? 세배를 해야 하나요?', uz: "Seollalda nima qilish kerak? Ta'zim qilish kerakmi?" },
        { speaker: 'B', kr: '안 해도 되지만 어른들한테 세배를 하는 게 예의 바른 거잖아요.', uz: "Qilmaslik ham mumkin, lekin kattalarga ta'zim qilish odobli-ku." },
        { speaker: 'A', kr: '떡국도 꼭 먹어야 해요?', uz: "Tteokguk ham albatta yeyish kerakmi?" },
        { speaker: 'B', kr: '전통적으로는 먹어야 한다고 하는데요. 먹으면 한 살 더 먹는다고 해요!', uz: "An'anaviy tushunchada yeyish kerak deyishadi. Yesang bir yosh ulg'ayadi deyishadi!" },
      ],
      notes: [
        "-아/어야 하다/되다: ikkalasi ham majburiyat, 되다 biroz yumshoqroq: 가야 해요 = 가야 돼요.",
        "-지 않아도 되다: shart emas: 안 해도 돼요 (qilmaslik ham mumkin).",
        "-는데: fon berish yoki qarama-qarshi: 바쁜데(band, lekin...), 설날인데(Seollal, shuning uchun).",
        "설날(Yangi yil) vs 추석(Chuseok): ikkisi ham eng katta bayramlar.",
        "세뱃돈 — kattalar bolalarga beradigan yangi yil puli: muhim an'ana.",
      ],
      games: {
        matchPairs: [
          { kr: '전통', uz: "an'ana" },
          { kr: '설날', uz: 'Seollal' },
          { kr: '세배', uz: "ta'zim" },
          { kr: '한복', uz: 'milliy kiyim' },
          { kr: '예의', uz: 'odob' },
          { kr: '고향', uz: "tug'ilgan joy" },
        ],
        fillBlank: [
          { sentence: '곧 설날인데 떡국을 먹어___ 해요.', answer: '야', options: ['야', '서', '고', '면'], uz: "Yaqinda Seollal, tteokguk yeyish kerak." },
          { sentence: '세배를 안 해도 ___.', answer: '돼요', options: ['돼요', '해요', '가요', '봐요'], uz: "Ta'zim qilmaslik ham mumkin." },
          { sentence: '온 가족이 모이는___저도 가야죠.', answer: '데', options: ['데', '서', '고', '면'], uz: "Butun oila yig'iladi, men ham borish kerak-ku." },
          { sentence: '한복을 꼭 입어야 하는 건 아닌___.', answer: '데', options: ['데', '서', '고', '면'], uz: 'Hanbok albatta kiyish shart emas.' },
          { sentence: '전통 문화를 보존하고 ___ 한다고 생각해요.', answer: '계승해야', options: ['계승해야', '잊어야', '버려야', '바꿔야'], uz: "An'anaviy madaniyatni saqlab, davom ettirish kerak." },
        ],
        scramble: [
          { kr: '전통', uz: "an'ana" },
          { kr: '설날', uz: 'Seollal' },
          { kr: '한복', uz: 'milliy kiyim' },
          { kr: '고향', uz: "tug'ilgan joy" },
          { kr: '예의', uz: 'odob' },
        ],
      },
    },
    quiz: [
      { question: "'먹어야 해요' nimani anglatadi?", options: ['Yeyapman', 'Yeyish kerak', 'Yemoqchiman', 'Yedim'], correct_index: 1 },
      { question: "'-지 않아도 되다' nimani anglatadi?", options: ['...qilish kerak', '...qilmaslik ham mumkin', '...qilmayman', '...qilolmayman'], correct_index: 1 },
      { question: "'-는데' ning ikki vazifasi qaysi?", options: ['Sabab va natija', 'Fon berish va qarama-qarshi fikr', 'Shart va natija', 'Vaqt va joy'], correct_index: 1 },
      { question: "'세뱃돈' nimani anglatadi?", options: ['yangi yil kiyimi', 'yangi yil ovqati', 'kattalardan bolalarga beriladigan yangi yil puli', 'yangi yil marosimi'], correct_index: 2 },
      { question: "'-아/어야 하다' va '-아/어야 되다' farqi?", options: ['되다 kuchliroq', '하다 kuchliroq', '되다 biroz yumshoqroq, ammo ma\'no bir xil', 'Butunlay boshqa ma\'no'], correct_index: 2 },
      { question: "'예의 바르다' nimani anglatadi?", options: ['odob bilmaslik', 'odobli bo\'lmoq', 'hurmat qilmoq', 'qo\'rqmoq'], correct_index: 1 },
      { question: "'계승하다' nimani anglatadi?", options: ['unutmoq', "yo'qotmoq", "merosxo'rlik qilmoq, davom ettirmoq", 'o\'zgartirmoq'], correct_index: 2 },
    ]
  },

];

// ════════════════════════════════════════════
// DB ga saqlash
// ════════════════════════════════════════════
async function seed() {
  console.log('TOPIK 3-daraja seed boshlandi...\n');

  for (const lesson of LESSONS) {
    const { quiz, ...lessonData } = lesson;

    const { rows: [saved] } = await db.query(
      `INSERT INTO lessons (track, level, title_kr, title_uz, content, is_free)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT DO NOTHING
       RETURNING id`,
      [lessonData.track, lessonData.order_in_level, lessonData.title_kr,
       lessonData.title_uz, JSON.stringify(lessonData.content), lessonData.is_free]
    );

    if (!saved) {
      console.log(`  ⚠️  ${lessonData.title_kr} — allaqachon bor`);
      continue;
    }

    for (const q of quiz) {
      await db.query(
        `INSERT INTO quiz_questions (lesson_id, question, options, correct_index)
         VALUES ($1, $2, $3, $4)`,
        [saved.id, q.question, JSON.stringify(q.options), q.correct_index]
      );
    }

    console.log(`  ✅  Dars ${lessonData.order_in_level}: ${lessonData.title_kr} (ID: ${saved.id})`);
  }

  console.log('\n✅ TOPIK 3-daraja seed muvaffaqiyatli yakunlandi!');
  console.log(`   Jami: ${LESSONS.length} ta dars`);
  await db.end();
}

seed().catch(err => {
  console.error('❌ Xatolik:', err.message);
  process.exit(1);
});
