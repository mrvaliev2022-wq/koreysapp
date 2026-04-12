// backend/src/seeds/topik_level2.js
// TOPIK 2-daraja: 10 ta to'liq dars
// Usage: node src/seeds/topik_level2.js

require('dotenv').config({ path: '../../.env' });
const db = require('../db');

const LESSONS = [

  // ════════════════════════════════════════════
  // DARS 1: Sizlar bilan tanishganimdan xursandman
  // 여러분을 알게 되어 기쁩니다
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 2, order_in_level: 1,
    title_kr: '여러분을 알게 되어 기쁩니다',
    title_uz: 'Sizlar bilan tanishganimdan xursandman',
    is_free: true,
    content: {
      topic: {
        kr: '안녕하세요? 제 이름은 마리암입니다. 저는 우즈베키스탄에서 왔습니다. 1년 동안 한국어를 공부했어요. 아직 쓰기는 어렵지만 읽기와 듣기는 괜찮아요. 여러분을 알게 되어 기쁩니다.',
        uz: "Assalomu alaykum! Mening ismim Mariyam. Men O'zbekistondan keldim. Bir yil davomida koreys tilini o'rgandim. Hali yozish qiyin, lekin o'qish va tinglash yaxshi. Sizlar bilan tanishganimdan xursandman."
      },
      grammar: {
        explanation: `V-게 되다 — biror holatga kelib qolish / natijada shunday bo'lish.

"Endi shunday bo'ldim" yoki "shunday bo'lib qoldim" ma'nosini beradi.
O'z-o'zidan yuz bergan o'zgarishni ifodalaydi.

Tuzilish: [fe'l o'zagi + 게 되다]
• 알다 → 알게 되다 (bilib qoldim)
• 공부하다 → 공부하게 되다 (o'qiydigan bo'ldim)
• 살다 → 살게 되다 (yashaydigan bo'ldim)

N처럼 / N같이 — ...dek / ...day (o'xshash)
• 선생님처럼 말하고 싶어요. (O'qituvchidek gapirmoqchiman.)
• 친구같이 편하게 얘기해요. (Do'stday erkin gaplashadi.)`,
        examples: [
          { kr: '여러분을 알게 되어 기쁩니다.', uz: 'Sizlar bilan tanishganimdan xursandman.' },
          { kr: '저는 여기에서 공부하게 되었어요.', uz: "Men bu yerda o'qiydigan bo'ldim." },
          { kr: '저는 선생님처럼 말하고 싶어요.', uz: "Men o'qituvchidek gapirmoqchiman." },
          { kr: '한국어를 배우게 되어서 행복해요.', uz: 'Koreys tilini o'rganib qolganim uchun baxtliman.' },
          { kr: '친구처럼 편하게 얘기해요.', uz: "Do'stdek erkin gapiramiz." },
        ]
      },
      vocabulary: [
        { kr: '여러분', romanization: 'yeoreobun', uz: 'sizlar, hammangiz' },
        { kr: '알다', romanization: 'alda', uz: 'bilmoq, tanimoq' },
        { kr: '기쁘다', romanization: 'gippeuda', uz: 'xursand bo\'lmoq' },
        { kr: '반갑다', romanization: 'bangapda', uz: 'tanishganidan xursand' },
        { kr: '선생님', romanization: 'seonsaengnim', uz: "o'qituvchi" },
        { kr: '학생', romanization: 'haksaeng', uz: 'talaba, o\'quvchi' },
        { kr: '자기소개', romanization: 'jagisogae', uz: "o'zini tanishtirish" },
        { kr: '소개하다', romanization: 'sogaehada', uz: 'tanishtirmoq' },
        { kr: '처음', romanization: 'cheoeum', uz: 'birinchi marta' },
        { kr: '만나다', romanization: 'mannada', uz: 'uchrashmoq' },
        { kr: '수업', romanization: 'sueop', uz: 'dars' },
        { kr: '반', romanization: 'ban', uz: 'guruh, sinf' },
        { kr: '공부하다', romanization: 'gongbuhada', uz: "o'qimoq" },
        { kr: '배우다', romanization: 'baeuda', uz: "o'rganmoq" },
        { kr: '한국말', romanization: 'hangungmal', uz: 'koreys tili' },
        { kr: '경험', romanization: 'gyeongheom', uz: 'tajriba' },
        { kr: '실력', romanization: 'sillyeok', uz: "ko'nikma, daraja" },
        { kr: '아직', romanization: 'ajik', uz: 'hali' },
        { kr: '부족하다', romanization: 'bujokhada', uz: 'yetarli emas' },
        { kr: '열심히', romanization: 'yeolsimhi', uz: 'astoydil, g\'ayrat bilan' },
      ],
      examples: [
        { kr: '저는 1년 동안 한국어를 공부했어요. 여러분을 알게 되어 정말 기뻐요.', uz: "Men bir yil davomida koreys tilini o'rgandim. Sizlar bilan tanishganimdan juda xursandman." },
        { kr: '아직 잘 못하지만 열심히 하겠습니다.', uz: "Hali yaxshi bilmayman, lekin astoydil harakat qilaman." },
        { kr: '저는 선생님처럼 유창하게 말하고 싶어요.', uz: "Men o'qituvchidek ravon gapirmoqchiman." },
        { kr: '한국에 오게 되어서 정말 행복해요.', uz: "Koreyaga kelib qolganim uchun juda baxtliman." },
        { kr: '여러분과 함께 공부하게 되어 좋아요.', uz: "Sizlar bilan birga o'rganish yaxshi." },
      ],
      dialog: [
        { speaker: 'A', kr: '안녕하세요? 처음 뵙겠습니다. 저는 오이벡이에요.', uz: 'Assalomu alaykum! Birinchi marta uchrayapmiz. Men Oybekman.' },
        { speaker: 'B', kr: '안녕하세요! 저는 마리암이에요. 어디에서 왔어요?', uz: 'Salom! Men Mariyamman. Qayerdan keldingiz?' },
        { speaker: 'A', kr: '우즈베키스탄에서 왔어요. 마리암 씨도 우즈베키스탄이에요?', uz: "O'zbekistondan keldim. Mariyam ham O'zbekistondan?" },
        { speaker: 'B', kr: '네, 맞아요! 저도 우즈베키스탄 사람이에요. 한국어를 얼마나 공부했어요?', uz: "Ha, to'g'ri! Men ham o'zbekistonlikman. Koreys tilini qancha vaqtdan beri o'rganasiz?" },
        { speaker: 'A', kr: '6개월 됐어요. 아직 부족하지만 열심히 배우게 되었어요.', uz: "6 oy bo'ldi. Hali yetarli emas, lekin astoydil o'rganayapman." },
        { speaker: 'B', kr: '저도요! 여러분을 알게 되어 기쁩니다. 앞으로 잘 부탁해요.', uz: "Men ham! Sizlar bilan tanishganimdan xursandman. Bundan keyin yaxshi munosabatda bo'laylik." },
      ],
      notes: [
        "-게 되다: o'z-o'zidan yuz bergan o'zgarish: 알게 됐어요 (bilib qoldim), 살게 됐어요 (yashaydigan bo'ldim).",
        "처럼/같이: ikkalasi ham '...dek/...day' ma'nosida, 처럼 rasmiyroq.",
        "뵙겠습니다 — 보다 (ko'rmoq)ning juda hurmatli shakli: birinchi uchrashuvda ishlatiladi.",
        "앞으로 잘 부탁해요 — 'bundan keyin yaxshi munosabatda bo'laylik' — yangi tanishuvda aytiladi.",
        "동안 — davomida: 1년 동안 (bir yil davomida), 3시간 동안 (3 soat davomida).",
      ],
      games: {
        matchPairs: [
          { kr: '여러분', uz: 'sizlar' },
          { kr: '기쁘다', uz: 'xursand' },
          { kr: '처음', uz: 'birinchi marta' },
          { kr: '배우다', uz: "o'rganmoq" },
          { kr: '아직', uz: 'hali' },
          { kr: '열심히', uz: 'astoydil' },
        ],
        fillBlank: [
          { sentence: '여러분을 알___ 되어 기쁩니다.', answer: '게', options: ['게', '서', '고', '면'], uz: 'Sizlar bilan tanishganimdan xursandman.' },
          { sentence: '저는 선생님___ 말하고 싶어요.', answer: '처럼', options: ['처럼', '부터', '까지', '에서'], uz: "O'qituvchidek gapirmoqchiman." },
          { sentence: '아직 부족하지만 열심히 ___겠습니다.', answer: '하', options: ['하', '가', '오', '보'], uz: 'Hali yetarli emas, lekin astoydil harakat qilaman.' },
          { sentence: '저는 우즈베키스탄___왔어요.', answer: '에서', options: ['에서', '에게', '까지', '부터'], uz: "O'zbekistondan keldim." },
          { sentence: '1년 ___ 한국어를 공부했어요.', answer: '동안', options: ['동안', '후에', '전에', '부터'], uz: 'Bir yil davomida koreys tilini o\'rgandim.' },
        ],
        scramble: [
          { kr: '여러분', uz: 'sizlar' },
          { kr: '처음', uz: 'birinchi marta' },
          { kr: '배우다', uz: "o'rganmoq" },
          { kr: '아직', uz: 'hali' },
          { kr: '열심히', uz: 'astoydil' },
        ],
      },
    },
    quiz: [
      { question: "'여러분을 알게 되어 기쁩니다' nimani anglatadi?", options: ['Hammani bilaman', 'Sizlar bilan tanishganimdan xursandman', 'Hamma xursand', 'Sizlar yaxshisiz'], correct_index: 1 },
      { question: "'-게 되다' qanday ma'no ifodalaydi?", options: ['Buyruq', 'O\'z-o\'zidan yuz bergan o\'zgarish', 'Inkor', 'So\'roq'], correct_index: 1 },
      { question: "'선생님처럼' nimani anglatadi?", options: ["o'qituvchi bilan", "o'qituvchiga", "o'qituvchidek", "o'qituvchidan"], correct_index: 2 },
      { question: "'아직' nimani anglatadi?", options: ['allaqachon', 'hali', 'keyin', 'avval'], correct_index: 1 },
      { question: "'열심히' nimani anglatadi?", options: ["ba'zan", 'doimo', 'astoydil', 'sekin'], correct_index: 2 },
      { question: "'동안' nimani anglatadi?", options: ['keyin', 'davomida', 'oldin', 'gacha'], correct_index: 1 },
      { question: "'처음 뵙겠습니다' qachon aytiladi?", options: ['Xayrlashganda', 'Birinchi uchrashuvda', 'Rahmat aytganda', 'Kechirim so\'raganda'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 2: Shamollaganim uchun dars qoldirdim
  // 감기 때문에 결석했어요
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 2, order_in_level: 2,
    title_kr: '감기 때문에 결석했어요',
    title_uz: 'Shamollaganim uchun dars qoldirdim',
    is_free: true,
    content: {
      topic: {
        kr: '어제 감기 때문에 결석했어요. 열이 나고 기침이 많이 났어요. 병원에 가서 약을 받았어요. 약을 먹어서 조금 나아졌어요. 오늘은 괜찮아서 학교에 왔어요.',
        uz: "Kecha shamollaganim uchun dars qoldirdim. Isitmam ko'tarildi va yo'tal ko'p bo'ldi. Kasalxonaga borib dori oldim. Dori ichganimdan so'ng biroz yaxshilandim. Bugun yaxshi bo'lgani uchun maktabga keldim."
      },
      grammar: {
        explanation: `N 때문에 — ...sababli / ...uchun (sabab bildiradi, ko'pincha salbiy)

Tuzilish: [ot + 때문에]
• 감기 때문에 결석했어요. (Shamollash sababli dars qoldirdim.)
• 비 때문에 못 갔어요. (Yomg'ir sababli bora olmadim.)

-아/어서 — sabab va ketma-ketlik (ikki vazifa):
1) Sabab: 아파서 병원에 갔어요. (Kasal bo'lgani uchun kasalxonaga bordim.)
2) Ketma-ketlik: 집에 가서 밥을 먹었어요. (Uyga borib ovqat yedim.)

때문에 vs 아/어서 farqi:
• 때문에 — otdan keyin, sabab kuchliroq
• -아/어서 — fe'ldan keyin, tabiiy ketma-ketlik`,
        examples: [
          { kr: '감기 때문에 결석했어요.', uz: 'Shamollash sababli dars qoldirdim.' },
          { kr: '비 때문에 약속을 취소했어요.', uz: "Yomg'ir sababli uchrashuvni bekor qildim." },
          { kr: '아파서 병원에 갔어요.', uz: 'Kasal bo\'lgani uchun kasalxonaga bordim.' },
          { kr: '약을 먹어서 나아졌어요.', uz: 'Dori ichganimdan so\'ng yaxshilandim.' },
          { kr: '피곤해서 일찍 잠을 잤어요.', uz: 'Charchaganim uchun erta uxladim.' },
        ]
      },
      vocabulary: [
        { kr: '감기', romanization: 'gamgi', uz: 'shamollash' },
        { kr: '병', romanization: 'byeong', uz: 'kasallik' },
        { kr: '증상', romanization: 'jeungsang', uz: 'alomat' },
        { kr: '열', romanization: 'yeol', uz: 'isitma' },
        { kr: '기침', romanization: 'gichim', uz: "yo'tal" },
        { kr: '콧물', romanization: 'konmul', uz: 'burun oqishi' },
        { kr: '목', romanization: 'mok', uz: 'tomoq' },
        { kr: '머리', romanization: 'meori', uz: 'bosh' },
        { kr: '배', romanization: 'bae', uz: 'qorin' },
        { kr: '몸살', romanization: 'momsal', uz: 'badan og\'rig\'i' },
        { kr: '두통', romanization: 'dutong', uz: 'bosh og\'rig\'i' },
        { kr: '아프다', romanization: 'apeuda', uz: "og'rimoq, kasal bo'lmoq" },
        { kr: '낫다', romanization: 'natda', uz: 'tuzalmoq' },
        { kr: '결석하다', romanization: 'gyeolseokhada', uz: 'dars qoldirmoq' },
        { kr: '지각하다', romanization: 'jigakhada', uz: 'kech qolmoq' },
        { kr: '병원', romanization: 'byeongwon', uz: 'kasalxona' },
        { kr: '약', romanization: 'yak', uz: 'dori' },
        { kr: '약국', romanization: 'yakguk', uz: 'dorixona' },
        { kr: '의사', romanization: 'uisa', uz: 'shifokor' },
        { kr: '처방', romanization: 'cheoban', uz: 'retsept, buyruqnoma' },
      ],
      examples: [
        { kr: '어제 감기 때문에 학교에 못 갔어요. 열이 38도였어요.', uz: "Kecha shamollash sababli maktabga bora olmadim. Isitmam 38 daraja edi." },
        { kr: '목이 아파서 밥을 못 먹었어요. 물만 마셨어요.', uz: "Tomog'im og'rigani uchun ovqat yey olmadim. Faqat suv ichdim." },
        { kr: '병원에 가서 의사 선생님한테 진찰을 받았어요.', uz: "Kasalxonaga borib shifokordan ko'rikdan o'tdim." },
        { kr: '약을 먹고 나서 많이 나아졌어요. 내일은 학교에 갈 수 있을 것 같아요.', uz: "Dori ichgandan keyin ancha yaxshilandim. Ertaga maktabga bora olsam kerak." },
        { kr: '선생님, 감기 때문에 결석해서 죄송합니다.', uz: "O'qituvchi, shamollash sababli dars qoldirganim uchun uzr so'rayman." },
      ],
      dialog: [
        { speaker: 'A', kr: '오이벡 씨, 어제 왜 결석했어요?', uz: 'Oybek, kecha nega dars qoldirdingiz?' },
        { speaker: 'B', kr: '선생님, 감기 때문에 결석했어요. 죄송합니다.', uz: "O'qituvchi, shamollash sababli dars qoldirdim. Kechirasiz." },
        { speaker: 'A', kr: '많이 아팠어요? 지금은 괜찮아요?', uz: "Juda og'riganingizmi? Hozir yaxshimisiz?" },
        { speaker: 'B', kr: '네, 어제 병원에 가서 약을 받았어요. 약을 먹어서 좀 나아졌어요.', uz: "Ha, kecha kasalxonaga borib dori oldim. Dori ichganimdan so'ng biroz yaxshilandim." },
        { speaker: 'A', kr: '다행이에요. 오늘 수업 잘 따라올 수 있겠어요?', uz: "Yaxshi bo'libdi. Bugungi darsni yaxshi tushuna olasizmi?" },
        { speaker: 'B', kr: '네, 괜찮아요. 빠진 내용은 친구한테서 노트를 빌려서 공부할게요.', uz: "Ha, yaxshi. O'tkazib yuborgan narsalarni do'stimdan konspekt olib o'rganaman." },
      ],
      notes: [
        "때문에 — otdan keyin: 감기 때문에(shamollash sababli), 비 때문에(yomg'ir sababli).",
        "-아/어서 — sabab yoki ketma-ketlik: 아파서(kasal bo'lgani uchun), 가서(borib).",
        "때문에 vs 아/어서: 때문에 = kuchliroq sabab; 아/어서 = tabiiy sabab/ketma-ketlik.",
        "결석하다(dars qoldirmoq) vs 지각하다(kech qolmoq) — farqini bilish muhim.",
        "죄송합니다 — rasmiy kechirim; 미안해요 — norasmiy kechirim.",
      ],
      games: {
        matchPairs: [
          { kr: '감기', uz: 'shamollash' },
          { kr: '열', uz: 'isitma' },
          { kr: '기침', uz: "yo'tal" },
          { kr: '아프다', uz: "og'rimoq" },
          { kr: '낫다', uz: 'tuzalmoq' },
          { kr: '약', uz: 'dori' },
        ],
        fillBlank: [
          { sentence: '감기 ___ 에 결석했어요.', answer: '때문', options: ['때문', '사람', '이유', '까닭'], uz: 'Shamollash sababli dars qoldirdim.' },
          { sentence: '아파___ 병원에 갔어요.', answer: '서', options: ['서', '고', '지만', '면'], uz: 'Kasal bo\'lgani uchun kasalxonaga bordim.' },
          { sentence: '약을 먹어서 많이 ___아졌어요.', answer: '나', options: ['나', '가', '해', '되'], uz: 'Dori ichganimdan so\'ng yaxshilandim.' },
          { sentence: '병원에 ___ 약을 받았어요.', answer: '가서', options: ['가서', '오서', '있어서', '없어서'], uz: 'Kasalxonaga borib dori oldim.' },
          { sentence: '열이 ___ 기침도 해요.', answer: '나고', options: ['나고', '나서', '나면', '나지만'], uz: "Isitmam ko'tarilib, yo'tal ham bo'ldi." },
        ],
        scramble: [
          { kr: '감기', uz: 'shamollash' },
          { kr: '기침', uz: "yo'tal" },
          { kr: '병원', uz: 'kasalxona' },
          { kr: '결석', uz: 'dars qoldirish' },
          { kr: '처방', uz: 'retsept' },
        ],
      },
    },
    quiz: [
      { question: "'감기 때문에' nimani anglatadi?", options: ['shamollashdan keyin', 'shamollash sababli', 'shamollash uchun', 'shamollab'], correct_index: 1 },
      { question: "N 때문에 — qaysi gap qismi bilan ishlatiladi?", options: ['faqat fe\'l bilan', 'faqat ot bilan', 'sifat bilan', 'ravish bilan'], correct_index: 1 },
      { question: "'낫다' nimani anglatadi?", options: ["og'rimoq", 'kasallanmoq', 'tuzalmoq', 'uylamoq'], correct_index: 2 },
      { question: "'결석하다' nimani anglatadi?", options: ['kech qolmoq', 'dars qoldirmoq', 'kasalxonaga bormoq', 'dori ichmoq'], correct_index: 1 },
      { question: "'-아/어서' ning ikki vazifasi qaysi?", options: ['Inkor va so\'roq', 'Sabab va ketma-ketlik', 'Shart va natija', 'Zamon va shaxs'], correct_index: 1 },
      { question: "'두통' nimani anglatadi?", options: ['tomoq og\'rig\'i', 'qorin og\'rig\'i', 'bosh og\'rig\'i', 'bel og\'rig\'i'], correct_index: 2 },
      { question: "Rasmiy kechirim so'zash uchun qaysi so'z ishlatiladi?", options: ['미안해요', '괜찮아요', '죄송합니다', '고마워요'], correct_index: 2 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 3: Avtobusda yuborsa qancha vaqt ketadi?
  // 버스로 보내면 얼마나 걸립니까?
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 2, order_in_level: 3,
    title_kr: '버스로 보내면 얼마나 걸립니까?',
    title_uz: 'Avtobusda yuborsa qancha vaqt ketadi?',
    is_free: false,
    content: {
      topic: {
        kr: '우체국에서 소포를 보내려고 해요. 버스로 보내면 얼마나 걸립니까? 빠른 우편으로 보내면 이틀이면 도착해요. 택배로 보내면 더 빠르고 편해요.',
        uz: "Pochtada posilka yubormoqchiman. Avtobus bilan yuborsa qancha vaqt ketadi? Tezkor pochta bilan yuborsa ikki kunda yetib boradi. Kuryer bilan yuborsa tezroq va qulayroq."
      },
      grammar: {
        explanation: `-(으)면 — shart mayli: "agar ...bo'lsa / ...sa"

Tuzilish:
• Undosh bilan tugagan o'zak + 으면: 먹다 → 먹으면
• Unli bilan tugagan o'zak + 면: 가다 → 가면
• ㄹ bilan tugagan o'zak + 면: 알다 → 알면

Misollar:
• 버스로 가면 30분 걸려요. (Avtobus bilan borsa 30 daqiqa ketadi.)
• 비가 오면 집에 있을게요. (Yomg'ir yog'sa uyda turaman.)
• 돈이 있으면 여행할 거예요. (Pulim bo'lsa sayohat qilaman.)

얼마나 걸리다 — qancha vaqt ketadi:
• 얼마나 걸려요? (Qancha vaqt ketadi?)
• 30분 걸려요. (30 daqiqa ketadi.)`,
        examples: [
          { kr: '버스로 가면 얼마나 걸려요?', uz: 'Avtobus bilan borsa qancha vaqt ketadi?' },
          { kr: '비가 오면 택시를 탈 거예요.', uz: "Yomg'ir yog'sa taksi olaman." },
          { kr: '일찍 출발하면 막히지 않아요.', uz: "Erta jo'nasang tiqilinch bo'lmaydi." },
          { kr: '소포를 보내면 며칠 걸려요?', uz: 'Posilka yuborsa necha kun ketadi?' },
          { kr: '빠른 우편으로 보내면 이틀이면 도착해요.', uz: 'Tezkor pochta bilan yuborsa ikki kunda yetib boradi.' },
        ]
      },
      vocabulary: [
        { kr: '버스', romanization: 'beoseu', uz: 'avtobus' },
        { kr: '지하철', romanization: 'jihacheol', uz: 'metro' },
        { kr: '택시', romanization: 'taeksi', uz: 'taksi' },
        { kr: '기차', romanization: 'gicha', uz: 'poyezd' },
        { kr: '비행기', romanization: 'bihaenggi', uz: 'samolyot' },
        { kr: '보내다', romanization: 'bonaeda', uz: 'yubormoq' },
        { kr: '받다', romanization: 'batda', uz: 'olmoq' },
        { kr: '도착하다', romanization: 'dochakada', uz: 'yetib kelmoq' },
        { kr: '출발하다', romanization: 'chulbalhada', uz: "jo'namoq" },
        { kr: '배달하다', romanization: 'baedalhada', uz: 'yetkazib bermoq' },
        { kr: '우체국', romanization: 'ucheguk', uz: 'pochta' },
        { kr: '소포', romanization: 'sopo', uz: 'posilka' },
        { kr: '택배', romanization: 'taekbae', uz: 'kuryer, yetkazma' },
        { kr: '주소', romanization: 'juso', uz: 'manzil' },
        { kr: '걸리다', romanization: 'geollida', uz: 'ketmoq (vaqt)' },
        { kr: '얼마나', romanization: 'eolmana', uz: 'qancha (vaqt)' },
        { kr: '빠르다', romanization: 'ppareuda', uz: 'tez' },
        { kr: '느리다', romanization: 'neurida', uz: 'sekin' },
        { kr: '편하다', romanization: 'pyeonhada', uz: 'qulay' },
        { kr: '무겁다', romanization: 'mugeopda', uz: 'og\'ir' },
      ],
      examples: [
        { kr: '우체국까지 걸어가면 20분 걸려요. 버스로 가면 5분이에요.', uz: "Pochtaga piyoda borsa 20 daqiqa ketadi. Avtobus bilan borsa 5 daqiqa." },
        { kr: '이 소포를 부산까지 보내면 며칠 걸려요?', uz: "Bu posilkani Busangacha yuborsa necha kun ketadi?" },
        { kr: '빠른 우편으로 보내면 이틀, 일반 우편으로 보내면 일주일 걸려요.', uz: "Tezkor pochta bilan yuborsa ikki kun, oddiy pochta bilan yuborsa bir hafta ketadi." },
        { kr: '택배로 보내면 더 싸고 편해요.', uz: "Kuryer bilan yuborsa arzonroq va qulayroq." },
        { kr: '지하철로 가면 갈아타야 하지만 빠를 거예요.', uz: "Metro bilan borsa almashtirish kerak, lekin tezroq bo'ladi." },
      ],
      dialog: [
        { speaker: 'A', kr: '안녕하세요. 이 소포를 우즈베키스탄으로 보내고 싶어요.', uz: "Salom. Bu posilkani O'zbekistonga yubormoqchiman." },
        { speaker: 'B', kr: '네, 얼마나 빨리 도착해야 해요?', uz: "Ha, qancha tez yetib borishi kerak?" },
        { speaker: 'A', kr: '가능하면 빨리 보내고 싶어요. 빠른 우편으로 보내면 얼마나 걸려요?', uz: "Iloji boricha tez yubormoqchiman. Tezkor pochta bilan yuborsa qancha vaqt ketadi?" },
        { speaker: 'B', kr: '빠른 국제 우편으로 보내면 5~7일 걸려요.', uz: "Tezkor xalqaro pochta bilan yuborsa 5-7 kun ketadi." },
        { speaker: 'A', kr: '그럼 택배로 보내면요?', uz: "Unday bo'lsa kuryer bilan yuborsa-chi?" },
        { speaker: 'B', kr: '택배는 3~4일 걸리지만 요금이 좀 더 비싸요.', uz: "Kuryer 3-4 kun ketadi, lekin narxi biroz qimmatroq." },
      ],
      notes: [
        "-(으)면: undosh + 으면 (먹으면), unli + 면 (가면), ㄹ + 면 (알면).",
        "얼마나 걸려요? — vaqt so'rash: 30분 걸려요 (30 daqiqa ketadi).",
        "이틀(2 kun), 사흘(3 kun), 나흘(4 kun), 닷새(5 kun) — sof koreys sanoqlar.",
        "우편(pochta) turlari: 빠른 우편(tezkor), 일반 우편(oddiy), 국제 우편(xalqaro).",
        "막히다 — tiqilinch bo'lmoq: 길이 막혀요 (yo'l tiqilgan).",
      ],
      games: {
        matchPairs: [
          { kr: '보내다', uz: 'yubormoq' },
          { kr: '도착하다', uz: 'yetib kelmoq' },
          { kr: '걸리다', uz: 'ketmoq (vaqt)' },
          { kr: '빠르다', uz: 'tez' },
          { kr: '소포', uz: 'posilka' },
          { kr: '주소', uz: 'manzil' },
        ],
        fillBlank: [
          { sentence: '버스로 가___ 30분 걸려요.', answer: '면', options: ['면', '서', '고', '지만'], uz: 'Avtobus bilan borsa 30 daqiqa ketadi.' },
          { sentence: '소포를 ___ 며칠 걸려요?', answer: '보내면', options: ['보내면', '받으면', '가면', '오면'], uz: 'Posilka yuborsa necha kun ketadi?' },
          { sentence: '빠른 우편으로 ___ 이틀이면 도착해요.', answer: '보내면', options: ['보내면', '받으면', '오면', '가면'], uz: 'Tezkor pochta bilan yuborsa ikki kunda yetib boradi.' },
          { sentence: '얼마나 ___요?', answer: '걸려', options: ['걸려', '와', '가', '해'], uz: 'Qancha vaqt ketadi?' },
          { sentence: '지하철로 가___ 갈아타야 해요.', answer: '면', options: ['면', '서', '고', '도'], uz: 'Metro bilan borsa almashtirish kerak.' },
        ],
        scramble: [
          { kr: '소포', uz: 'posilka' },
          { kr: '주소', uz: 'manzil' },
          { kr: '택배', uz: 'kuryer' },
          { kr: '빠르다', uz: 'tez' },
          { kr: '도착', uz: 'yetib kelish' },
        ],
      },
    },
    quiz: [
      { question: "'버스로 가면 얼마나 걸려요?' nimani so'rayapti?", options: ['Avtobus qayerda?', 'Avtobus bilan borsa qancha vaqt?', 'Avtobus nechi?', 'Avtobus keldimi?'], correct_index: 1 },
      { question: "'-(으)면' qanday ma'noni ifodalaydi?", options: ['...moqchi', 'agar ...bo\'lsa', '...gani uchun', '...ga qaramasdan'], correct_index: 1 },
      { question: "Undosh bilan tugagan o'zakdan keyin qaysi shakl ishlatiladi?", options: ['면', '으면', '으로', '에서'], correct_index: 1 },
      { question: "'도착하다' nimani anglatadi?", options: ["jo'namoq", 'yubormoq', 'yetib kelmoq', 'kutmoq'], correct_index: 2 },
      { question: "'이틀' necha kun?", options: ['1 kun', '2 kun', '3 kun', '4 kun'], correct_index: 1 },
      { question: "'걸리다' nimani anglatadi?", options: ['yubormoq', 'olmoq', 'ketmoq (vaqt)', 'bormoq'], correct_index: 2 },
      { question: "'택배' nimani anglatadi?", options: ['pochta', 'kuryer/yetkazma', 'posilka', 'manzil'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 4: Baduk o'ynashni bilasizmi?
  // 바둑을 읽을 줄 알아요?
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 2, order_in_level: 4,
    title_kr: '바둑을 읽을 줄 알아요?',
    title_uz: 'Baduk o\'ynashni bilasizmi?',
    is_free: false,
    content: {
      topic: {
        kr: '바둑을 둘 줄 알아요? 저는 바둑을 둘 줄 몰라요. 하지만 체스는 둘 줄 알아요. 피아노를 칠 줄 알지만 기타는 칠 줄 몰라요. 운전할 줄 알지만 아직 잘 못해요.',
        uz: "Baduk o'ynashni bilasizmi? Men baduk o'ynashni bilmayman. Lekin shaxmat o'ynashni bilaman. Pianino chalishni bilaman, lekin gitara chalishni bilmayman. Haydashni bilaman, lekin hali yaxshi emasman."
      },
      grammar: {
        explanation: `V-(으)ㄹ 줄 알다/모르다 — qilishni bilmoq/bilmaslik (mahorat)

Tuzilish:
• Undosh bilan tugagan: + 을 줄 알다 (읽다→읽을 줄 알아요)
• Unli bilan tugagan: + ㄹ 줄 알다 (하다→할 줄 알아요)
• ㄹ bilan tugagan: + 줄 알다 (알다→알 줄 알아요)

V-ㄹ 줄 알다 — biror mahorat yoki usulni bilish
V-ㄹ 줄 모르다 — o'sha mahoratni bilmaslik

-지만 — lekin, ammo (qarama-qarshi fikr):
• 피아노를 칠 줄 알지만 기타는 몰라요. (Pianino chalishni bilaman, lekin gitara yo'q.)
• 한국어를 읽을 줄 알지만 쓰기는 어려워요. (O'qishni bilaman, lekin yozish qiyin.)`,
        examples: [
          { kr: '바둑을 둘 줄 알아요?', uz: 'Baduk o\'ynashni bilasizmi?' },
          { kr: '저는 피아노를 칠 줄 몰라요.', uz: 'Men pianino chalishni bilmayman.' },
          { kr: '한국 음식을 만들 줄 알아요.', uz: 'Koreys taomini tayyorlashni bilaman.' },
          { kr: '운전할 줄 알지만 아직 잘 못해요.', uz: 'Haydashni bilaman, lekin hali yaxshi emasman.' },
          { kr: '수영할 줄 알아요? 네, 조금 할 줄 알아요.', uz: 'Suzishni bilasizmi? Ha, ozroq bilaman.' },
        ]
      },
      vocabulary: [
        { kr: '바둑', romanization: 'baduk', uz: 'baduk (go o\'yini)' },
        { kr: '체스', romanization: 'cheseu', uz: 'shaxmat' },
        { kr: '게임', romanization: 'geim', uz: "o'yin" },
        { kr: '피아노', romanization: 'piano', uz: 'pianino' },
        { kr: '기타', romanization: 'gita', uz: 'gitara' },
        { kr: '노래', romanization: 'norae', uz: "qo'shiq" },
        { kr: '춤', romanization: 'chum', uz: 'raqs' },
        { kr: '요리', romanization: 'yori', uz: 'ovqat tayyorlash' },
        { kr: '수영', romanization: 'suyeong', uz: 'suzish' },
        { kr: '운전', romanization: 'unjeon', uz: 'haydash' },
        { kr: '컴퓨터', romanization: 'keompyuteo', uz: 'kompyuter' },
        { kr: '기술', romanization: 'gisul', uz: 'texnika, mahorat' },
        { kr: '능력', romanization: 'neungnyeok', uz: 'qobiliyat' },
        { kr: '두다', romanization: 'duda', uz: "o'ynamoq (baduk/shaxmat)" },
        { kr: '치다', romanization: 'chida', uz: 'chalmoq (musiqa asbobini)' },
        { kr: '부르다', romanization: 'bureuda', uz: 'kuylamoq' },
        { kr: '추다', romanization: 'chuda', uz: 'raqs tushmoq' },
        { kr: '만들다', romanization: 'mandeulda', uz: 'yasamoq, tayyorlamoq' },
        { kr: '배우다', romanization: 'baeuda', uz: "o'rganmoq" },
        { kr: '잘', romanization: 'jal', uz: 'yaxshi (ravish)' },
      ],
      examples: [
        { kr: '저는 기타를 칠 줄 알아요. 1년 동안 배웠어요.', uz: "Men gitara chalishni bilaman. Bir yil davomida o'rgandim." },
        { kr: '한국어를 읽을 줄 알지만 쓰는 건 아직 어려워요.', uz: "Koreyschani o'qishni bilaman, lekin yozish hali qiyin." },
        { kr: '요리할 줄 알아요? 네, 간단한 건 만들 줄 알아요.', uz: "Ovqat tayyorlashni bilasizmi? Ha, oddiy narsalarni tayyorlay olaman." },
        { kr: '수영할 줄 알지만 빨리 못 해요.', uz: "Suzishni bilaman, lekin tez suzolmayman." },
        { kr: '운전할 줄 아는 사람이 있어요? 네, 제가 할 줄 알아요.', uz: "Haydashni biladigan odam bormi? Ha, men bilaman." },
      ],
      dialog: [
        { speaker: 'A', kr: '오이벡 씨, 악기를 다룰 줄 알아요?', uz: "Oybek, musiqa asbobi chalishni bilasizmi?" },
        { speaker: 'B', kr: '네, 기타를 칠 줄 알아요. 마리암 씨는요?', uz: "Ha, gitara chalishni bilaman. Mariyam-chi?" },
        { speaker: 'A', kr: '저는 피아노를 조금 칠 줄 알아요. 하지만 잘 못해요.', uz: "Men pianino ozroq chalishni bilaman. Lekin yaxshi emasman." },
        { speaker: 'B', kr: '그래요? 언제부터 배웠어요?', uz: "Shundaymi? Qachondan beri o'rganyapsiz?" },
        { speaker: 'A', kr: '중학교 때부터 배웠어요. 지금은 거의 안 쳐요.', uz: "O'rta maktabdan beri o'rgandim. Hozir deyarli chalmayman." },
        { speaker: 'B', kr: '같이 밴드 해볼까요? 저는 기타, 마리암 씨는 피아노요.', uz: "Birga band yaratib ko'ramizmi? Men gitara, Mariyam pianino." },
      ],
      notes: [
        "-(으)ㄹ 줄 알다/모르다: mahorat yoki usulni bilish/bilmaslik.",
        "할 줄 알아요(bilaman) ≠ 할 수 있어요(qila olaman) — ikkalasi ham o'xshash, lekin 줄 알다 ko'proq mahoratni bildiradi.",
        "-지만: qarama-qarshi fikr: 알지만 (bilaman, lekin), 좋지만 (yaxshi, lekin).",
        "두다 — baduk/shaxmat uchun maxsus fe'l;치다 — musiqa asbobi uchun.",
        "잘 — yaxshi (ravish): 잘 해요(yaxshi qilaman), 잘 몰라요(yaxshi bilmayman).",
      ],
      games: {
        matchPairs: [
          { kr: '피아노', uz: 'pianino' },
          { kr: '기타', uz: 'gitara' },
          { kr: '수영', uz: 'suzish' },
          { kr: '운전', uz: 'haydash' },
          { kr: '노래', uz: "qo'shiq" },
          { kr: '춤', uz: 'raqs' },
        ],
        fillBlank: [
          { sentence: '바둑을 둘 ___ 알아요?', answer: '줄', options: ['줄', '것', '수', '만'], uz: 'Baduk o\'ynashni bilasizmi?' },
          { sentence: '피아노를 칠 줄 ___.', answer: '몰라요', options: ['몰라요', '알아요', '해요', '가요'], uz: 'Pianino chalishni bilmayman.' },
          { sentence: '운전할 줄 알___아직 잘 못해요.', answer: '지만', options: ['지만', '고', '서', '면'], uz: 'Haydashni bilaman, lekin hali yaxshi emasman.' },
          { sentence: '기타를 ___ 줄 알아요.', answer: '칠', options: ['칠', '둘', '볼', '갈'], uz: 'Gitara chalishni bilaman.' },
          { sentence: '한국어를 읽을 줄 알지만 쓰기는 ___.', answer: '어려워요', options: ['어려워요', '쉬워요', '좋아요', '싫어요'], uz: "O'qishni bilaman, lekin yozish qiyin." },
        ],
        scramble: [
          { kr: '피아노', uz: 'pianino' },
          { kr: '수영', uz: 'suzish' },
          { kr: '운전', uz: 'haydash' },
          { kr: '노래', uz: "qo'shiq" },
          { kr: '능력', uz: 'qobiliyat' },
        ],
      },
    },
    quiz: [
      { question: "'바둑을 둘 줄 알아요?' nimani so'rayapti?", options: ['Baduk nechchi?', 'Baduk o\'ynashni bilasizmi?', 'Baduk qayerda?', 'Baduk qachon?'], correct_index: 1 },
      { question: "'-(으)ㄹ 줄 알다' nimani ifodalaydi?", options: ['...ni yoqtirish', '...qilishni bilish (mahorat)', '...qilmoqchi bo\'lish', '...qilish kerak'], correct_index: 1 },
      { question: "'-지만' nimani anglatadi?", options: ['shuning uchun', 'va, ham', 'lekin, ammo', 'yoki'], correct_index: 2 },
      { question: "Musiqa asbobi chalish uchun qaysi fe'l ishlatiladi?", options: ['두다', '치다', '부르다', '추다'], correct_index: 1 },
      { question: "'수영할 줄 몰라요' nimani anglatadi?", options: ['Suzishni yoqtirmayman', 'Suzishni bilmayman', 'Suzolmayman', 'Suzmayman'], correct_index: 1 },
      { question: "Unli bilan tugagan o'zakdan keyin qaysi shakl?", options: ['을 줄 알다', 'ㄹ 줄 알다', '는 줄 알다', '은 줄 알다'], correct_index: 1 },
      { question: "'잘' nimani anglatadi?", options: ['ko\'p', 'tez', 'yaxshi', 'doimo'], correct_index: 2 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 5: Iltimos, biroz kutib turing
  // 잠깐만 기다려 주세요
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 2, order_in_level: 5,
    title_kr: '잠깐만 기다려 주세요',
    title_uz: 'Iltimos, biroz kutib turing',
    is_free: false,
    content: {
      topic: {
        kr: '좀 기다리세요. 잠깐만 기다려 주세요. 다시 말씀해 주세요. 천천히 말해 주세요. 잠시 후에 다시 전화해 주세요. 이런 표현은 일상생활에서 자주 사용합니다.',
        uz: "Biroz kuting. Iltimos, biroz kutib turing. Iltimos, qaytadan ayting. Iltimos, sekin gapiring. Bir ozdan keyin qayta qo'ng'iroq qiling. Bu iboralar kundalik hayotda tez-tez ishlatiladi."
      },
      grammar: {
        explanation: `-아/어 주세요 — iltimos qilib biror ishni so'rash

Tuzilish: [fe'l o'zagi + 아/어 주세요]
• 기다리다 → 기다려 주세요 (kutib bering/turing)
• 말하다 → 말해 주세요 (gapirib bering)
• 쓰다 → 써 주세요 (yozib bering)

-으세요/세요 — muloyim buyruq yoki tavsiya:
• 받침 bor + 으세요: 앉으세요 (o'tiring)
• 받침 yo'q + 세요: 오세요 (keling), 가세요 (boring)

-아/어 주세요 vs -으세요/세요 farqi:
• -아/어 주세요 = biror ishni "men uchun" qilishni so'rash
• -으세요 = umumiy iltimos/tavsiya/buyruq`,
        examples: [
          { kr: '잠깐만 기다려 주세요.', uz: 'Iltimos, biroz kutib turing.' },
          { kr: '다시 한번 말씀해 주세요.', uz: 'Iltimos, bir marta qayta ayting.' },
          { kr: '천천히 말해 주세요.', uz: 'Iltimos, sekin gapiring.' },
          { kr: '여기에 이름을 써 주세요.', uz: 'Bu yerga ismingizni yozib bering.' },
          { kr: '창문을 좀 열어 주세요.', uz: 'Derazani biroz ochib bering.' },
        ]
      },
      vocabulary: [
        { kr: '전화', romanization: 'jeonhwa', uz: "telefon, qo'ng'iroq" },
        { kr: '통화', romanization: 'tonghwa', uz: 'telefon suhbati' },
        { kr: '번호', romanization: 'beonho', uz: 'raqam' },
        { kr: '안내', romanization: 'annae', uz: "yo'riqnoma, ma'lumot" },
        { kr: '상담', romanization: 'sangdam', uz: 'maslahat, konsultatsiya' },
        { kr: '직원', romanization: 'jigwon', uz: 'xodim' },
        { kr: '고객', romanization: 'gogaek', uz: 'mijoz' },
        { kr: '사무실', romanization: 'samusil', uz: 'ofis' },
        { kr: '창구', romanization: 'changgu', uz: 'xizmat oynasi' },
        { kr: '부탁', romanization: 'butak', uz: 'iltimos, so\'rov' },
        { kr: '기다리다', romanization: 'gidarida', uz: 'kutmoq' },
        { kr: '설명하다', romanization: 'seolmyeonghada', uz: 'tushuntirmoq' },
        { kr: '말하다', romanization: 'malhada', uz: 'gapirmoq' },
        { kr: '다시', romanization: 'dasi', uz: 'yana, qayta' },
        { kr: '천천히', romanization: 'cheoncheonhi', uz: 'sekin-sekin' },
        { kr: '잠깐', romanization: 'jamkkan', uz: 'bir oz, sal' },
        { kr: '잠시', romanization: 'jamsi', uz: 'bir ozdan' },
        { kr: '조용히', romanization: 'joyonghi', uz: 'jimgina, sokin' },
        { kr: '도와주다', romanization: 'dowajuda', uz: 'yordam bermoq' },
        { kr: '연결하다', romanization: 'yeongyeolhada', uz: "ulash, bog'lamoq" },
      ],
      examples: [
        { kr: '잠깐만 기다려 주세요. 담당자를 연결해 드릴게요.', uz: "Biroz kutib turing. Mas'ul xodimni ulab beraman." },
        { kr: '죄송하지만 다시 한번 말씀해 주시겠어요?', uz: "Kechirasiz, bir marta qayta ayta olasizmi?" },
        { kr: '천천히 말씀해 주시면 이해할 수 있어요.', uz: "Sekin gapirsa tushuna olaman." },
        { kr: '여기에 성함과 전화번호를 써 주세요.', uz: "Bu yerga ism-familiyangiz va telefon raqamingizni yozib bering." },
        { kr: '잠시 후에 다시 전화해 주시겠어요?', uz: "Bir ozdan keyin qayta qo'ng'iroq qilasizmi?" },
      ],
      dialog: [
        { speaker: 'A', kr: '여보세요. 거기 한국어 학원이죠?', uz: "Allo. U yer koreys tili kurslari emasmi?" },
        { speaker: 'B', kr: '네, 맞습니다. 무엇을 도와드릴까요?', uz: "Ha, to'g'ri. Nima yordam bera olaman?" },
        { speaker: 'A', kr: '수업 등록에 대해 문의하고 싶어요.', uz: "Dars ro'yxatidan o'tish haqida so'ramoqchi edim." },
        { speaker: 'B', kr: '네, 잠깐만 기다려 주세요. 담당자를 바꿔 드릴게요.', uz: "Ha, biroz kutib turing. Mas'ul xodimga o'tkazib beraman." },
        { speaker: 'A', kr: '감사합니다. 그런데 좀 천천히 말씀해 주시겠어요?', uz: "Rahmat. Lekin biroz sekin gapira olasizmi?" },
        { speaker: 'B', kr: '물론이죠. 천천히 말씀드릴게요. 다시 한번 말씀해 주시겠어요?', uz: "Albatta. Sekin gapirib beraman. Bir marta qayta ayting." },
      ],
      notes: [
        "-아/어 주세요: 'men uchun qilib bering': 기다려 주세요, 말해 주세요, 써 주세요.",
        "-으세요/세요: umumiy iltimos: 앉으세요(o'tiring), 오세요(keling), 드세요(yeng).",
        "잠깐(bir oz, qisqa vaqt) vs 잠시(bir oz): ikkalasi ham o'xshash, 잠시 ozroq rasmiyroq.",
        "말씀해 주세요 — 말해 주세요 ning hurmatli shakli.",
        "죄송하지만 — 'kechirasiz, lekin...' — iltimos oldidan qo'yiladi.",
      ],
      games: {
        matchPairs: [
          { kr: '기다리다', uz: 'kutmoq' },
          { kr: '설명하다', uz: 'tushuntirmoq' },
          { kr: '천천히', uz: 'sekin-sekin' },
          { kr: '다시', uz: 'qayta' },
          { kr: '부탁', uz: 'iltimos' },
          { kr: '잠깐', uz: 'bir oz' },
        ],
        fillBlank: [
          { sentence: '잠깐만 기다려 ___.', answer: '주세요', options: ['주세요', '줘요', '주었어요', '줍니다'], uz: 'Iltimos, biroz kutib turing.' },
          { sentence: '천천히 말___ 주세요.', answer: '해', options: ['해', '씀해', '하', '히'], uz: 'Iltimos, sekin gapiring.' },
          { sentence: '다시 한번 말씀해 ___.', answer: '주시겠어요', options: ['주시겠어요', '주어요', '주세요', '줘요'], uz: 'Bir marta qayta ayta olasizmi?' },
          { sentence: '여기에 이름을 ___ 주세요.', answer: '써', options: ['써', '봐', '가', '해'], uz: 'Bu yerga ismingizni yozib bering.' },
          { sentence: '창문을 좀 ___ 주세요.', answer: '열어', options: ['열어', '닫아', '봐', '와'], uz: 'Derazani biroz ochib bering.' },
        ],
        scramble: [
          { kr: '전화', uz: 'telefon' },
          { kr: '잠깐', uz: 'bir oz' },
          { kr: '부탁', uz: 'iltimos' },
          { kr: '직원', uz: 'xodim' },
          { kr: '상담', uz: 'maslahat' },
        ],
      },
    },
    quiz: [
      { question: "'잠깐만 기다려 주세요' nimani anglatadi?", options: ['Tez keling', 'Iltimos, biroz kutib turing', 'Biroz gapiring', 'Sekin boring'], correct_index: 1 },
      { question: "'-아/어 주세요' qanday ma'no ifodalaydi?", options: ['Buyruq berish', '...ni yoqtiraman', 'Biror ishni men uchun qilishni so\'rash', 'Taklif berish'], correct_index: 2 },
      { question: "'천천히' nimani anglatadi?", options: ['tez-tez', 'sekin-sekin', 'doimo', 'hech qachon'], correct_index: 1 },
      { question: "'다시' nimani anglatadi?", options: ['avval', 'keyin', 'qayta, yana', 'hali'], correct_index: 2 },
      { question: "받침 bor so'zdan keyin qaysi shakl?", options: ['세요', '으세요', '아세요', '어세요'], correct_index: 1 },
      { question: "'고객' nimani anglatadi?", options: ['xodim', 'do\'st', 'mijoz', 'o\'qituvchi'], correct_index: 2 },
      { question: "'연결하다' nimani anglatadi?", options: ['tushuntirmoq', "ulash, bog'lamoq", 'kutmoq', 'gapirmoq'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 6: U kitob juda qiyin shekilli
  // 그 책은 너무 어려운 것 같아요
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 2, order_in_level: 6,
    title_kr: '그 책은 너무 어려운 것 같아요',
    title_uz: 'U kitob juda qiyin shekilli',
    is_free: false,
    content: {
      topic: {
        kr: '그 책은 너무 어려운 것 같아요. 오늘 날씨가 추운 것 같아요. 저 사람은 학생인 것 같아요. 이 음식은 맵지만 맛있는 것 같아요.',
        uz: "U kitob juda qiyin shekilli. Bugun ob-havo sovuq shekilli. U odam talaba shekilli. Bu ovqat achchiq, lekin mazali shekilli."
      },
      grammar: {
        explanation: `A/V + (으)ㄴ/는 것 같아요 — ...shekilli, ...ga o'xshaydi (taxmin)

Hozirgi zamon:
• Sifat + (으)ㄴ 것 같아요: 어렵다 → 어려운 것 같아요
• Fe'l + 는 것 같아요: 먹다 → 먹는 것 같아요

O'tgan zamon:
• Sifat/fe'l + (으)ㄴ 것 같아요: 먹다 → 먹은 것 같아요

Kelasi zamon (taxmin):
• Fe'l + (으)ㄹ 것 같아요: 비가 올 것 같아요 (yomg'ir yog'adi shekilli)

-지만 — qarama-qarshi: lekin/ammo
• 어렵지만 재미있어요. (Qiyin, lekin qiziqarli.)
• 비싸지만 맛있어요. (Qimmat, lekin mazali.)`,
        examples: [
          { kr: '그 책은 너무 어려운 것 같아요.', uz: 'U kitob juda qiyin shekilli.' },
          { kr: '오늘은 비가 올 것 같아요.', uz: "Bugun yomg'ir yog'adi shekilli." },
          { kr: '저 사람은 한국 사람인 것 같아요.', uz: 'U odam koreya shekilli.' },
          { kr: '이 음식은 맵지만 맛있는 것 같아요.', uz: 'Bu ovqat achchiq, lekin mazali shekilli.' },
          { kr: '그 영화는 재미있을 것 같아요.', uz: 'U film qiziqarli bo\'ladi shekilli.' },
        ]
      },
      vocabulary: [
        { kr: '생각', romanization: 'saenggak', uz: 'fikr' },
        { kr: '의견', romanization: 'uigyeon', uz: 'fikr, mulohaza' },
        { kr: '느낌', romanization: 'neukkim', uz: 'his, taassurot' },
        { kr: '추측', romanization: 'chucheuk', uz: 'taxmin' },
        { kr: '사실', romanization: 'sasil', uz: 'aslida, haqiqat' },
        { kr: '아마', romanization: 'ama', uz: 'ehtimol, balki' },
        { kr: '정말', romanization: 'jeongmal', uz: 'rostdan ham, juda' },
        { kr: '너무', romanization: 'neomu', uz: 'juda (ortiqcha)' },
        { kr: '조금', romanization: 'jogeum', uz: 'biroz' },
        { kr: '어렵다', romanization: 'eoryeopda', uz: 'qiyin' },
        { kr: '쉽다', romanization: 'swipda', uz: 'oson' },
        { kr: '재미있다', romanization: 'jaemiitda', uz: 'qiziqarli' },
        { kr: '재미없다', romanization: 'jaemieopda', uz: 'qiziqsiz' },
        { kr: '이상하다', romanization: 'isanghada', uz: "g'alati" },
        { kr: '피곤하다', romanization: 'pigonhada', uz: 'charchagan' },
        { kr: '바쁘다', romanization: 'bappeuda', uz: 'band' },
        { kr: '친절하다', romanization: 'chinjeolhada', uz: 'mehribon' },
        { kr: '불편하다', romanization: 'bulpyeonhada', uz: 'noqulay' },
        { kr: '복잡하다', romanization: 'bokjapada', uz: 'murakkab, chalkash' },
        { kr: '간단하다', romanization: 'gandanhada', uz: 'oddiy, sodda' },
      ],
      examples: [
        { kr: '저 학생은 한국어를 잘하는 것 같아요. 발음이 정말 좋아요.', uz: "O'sha talaba koreyschani yaxshi biladi shekilli. Talaffuzi juda yaxshi." },
        { kr: '오늘 선생님이 좀 피곤하신 것 같아요.', uz: "Bugun o'qituvchi biroz charchagan shekilli." },
        { kr: '이 문제는 어려운 것 같지만 사실 간단해요.', uz: "Bu masala qiyin shekilli, lekin aslida oddiy." },
        { kr: '내일 날씨가 좋을 것 같아요. 같이 공원에 갈까요?', uz: "Ertaga ob-havo yaxshi bo'ladi shekilli. Birga parkka boramizmi?" },
        { kr: '저 사람은 선생님인 것 같아요. 항상 책을 들고 다니거든요.', uz: "U odam o'qituvchi shekilli. Doimo kitob olib yuradi." },
      ],
      dialog: [
        { speaker: 'A', kr: '이 책 어때요? 재미있어요?', uz: 'Bu kitob qanday? Qiziqarlimi?' },
        { speaker: 'B', kr: '글쎄요... 내용은 좋은 것 같은데 좀 어려운 것 같아요.', uz: "Qani endi... mazmuni yaxshi shekilli, lekin biroz qiyin shekilli." },
        { speaker: 'A', kr: '한국어로 쓰여 있어요?', uz: "Koreyschada yozilganmi?" },
        { speaker: 'B', kr: '네. 한자도 많이 나와서 이해하기 힘든 것 같아요.', uz: "Ha. Xitoy iyerogliflari ham ko'p chiqadi, shuning uchun tushunish qiyin shekilli." },
        { speaker: 'A', kr: '그래요? 저한테는 너무 어려울 것 같아요.', uz: "Shundaymi? Men uchun juda qiyin bo'ladi shekilli." },
        { speaker: 'B', kr: '조금 더 공부하고 나면 읽을 수 있을 것 같아요!', uz: "Biroz ko'proq o'rgangandan keyin o'qiy olasiz shekilli!" },
      ],
      notes: [
        "것 같아요 — taxmin: 어려운 것 같아요(qiyin shekilli), 올 것 같아요(keladi shekilli).",
        "Hozirgi zamon: sifat + (으)ㄴ 것 같아요; fe'l + 는 것 같아요.",
        "Kelasi zamon/taxmin: + (으)ㄹ 것 같아요.",
        "너무 — juda (ortiqcha, ko'pincha salbiy): 너무 비싸요(juda qimmat).",
        "-지만 — qarama-qarshi: 어렵지만 재미있어요(qiyin, lekin qiziqarli).",
      ],
      games: {
        matchPairs: [
          { kr: '어렵다', uz: 'qiyin' },
          { kr: '쉽다', uz: 'oson' },
          { kr: '재미있다', uz: 'qiziqarli' },
          { kr: '피곤하다', uz: 'charchagan' },
          { kr: '친절하다', uz: 'mehribon' },
          { kr: '복잡하다', uz: 'murakkab' },
        ],
        fillBlank: [
          { sentence: '그 책은 너무 어려운 것 ___.', answer: '같아요', options: ['같아요', '봐요', '해요', '돼요'], uz: 'U kitob juda qiyin shekilli.' },
          { sentence: '오늘 비가 올 ___ 같아요.', answer: '것', options: ['것', '수', '줄', '만'], uz: "Bugun yomg'ir yog'adi shekilli." },
          { sentence: '이 음식은 맵___맛있는 것 같아요.', answer: '지만', options: ['지만', '고', '서', '면'], uz: 'Bu ovqat achchiq, lekin mazali shekilli.' },
          { sentence: '저 사람은 학생___ 것 같아요.', answer: '인', options: ['인', '는', '은', '이'], uz: 'U odam talaba shekilli.' },
          { sentence: '이 문제는 ___ 것 같지만 사실 간단해요.', answer: '어려운', options: ['어려운', '쉬운', '재미있는', '좋은'], uz: 'Bu masala qiyin shekilli, lekin aslida oddiy.' },
        ],
        scramble: [
          { kr: '어렵다', uz: 'qiyin' },
          { kr: '추측', uz: 'taxmin' },
          { kr: '사실', uz: 'aslida' },
          { kr: '복잡', uz: 'murakkab' },
          { kr: '느낌', uz: 'his' },
        ],
      },
    },
    quiz: [
      { question: "'너무 어려운 것 같아요' nimani anglatadi?", options: ['Juda qiyin emas', 'Juda qiyin shekilli', 'Biroz qiyin', 'Qiyin bo\'lmaydi'], correct_index: 1 },
      { question: "Hozirgi zamon sifatdan keyin qaysi shakl?", options: ['는 것 같아요', '(으)ㄴ 것 같아요', '(으)ㄹ 것 같아요', '은 것 같아요'], correct_index: 1 },
      { question: "Kelasi zamon taxmin uchun qaysi shakl?", options: ['는 것 같아요', '(으)ㄴ 것 같아요', '(으)ㄹ 것 같아요', '인 것 같아요'], correct_index: 2 },
      { question: "'너무' nimani anglatadi?", options: ['biroz', 'juda (ortiqcha)', 'hech', 'doimo'], correct_index: 1 },
      { question: "'-지만' nimani anglatadi?", options: ['shuning uchun', 'lekin, ammo', 'va', 'yoki'], correct_index: 1 },
      { question: "'간단하다' nimani anglatadi?", options: ['murakkab', 'qiyin', 'oddiy, sodda', 'qiziqarli'], correct_index: 2 },
      { question: "'아마' nimani anglatadi?", options: ['rostdan', 'hech qachon', 'ehtimol, balki', 'doimo'], correct_index: 2 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 7: Bu men bilgan eng katta bozor
  // 내 손에서 제일 큰 시장이에요
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 2, order_in_level: 7,
    title_kr: '내 손에서 제일 큰 시장이에요',
    title_uz: 'Bu men bilgan eng katta bozor',
    is_free: false,
    content: {
      topic: {
        kr: '이 시장이 제일 커요. 저 백화점보다 이 마트가 더 싸요. 이 동네에서 가장 유명한 식당이에요. 서울에서 제일 큰 시장에 가 봤어요?',
        uz: "Bu bozor eng katta. O'sha universmagdan bu market arzonroq. Bu mahallada eng mashhur restoran. Seulda eng katta bozorga borgansizmi?"
      },
      grammar: {
        explanation: `더 — taqqoslash: ...roq (ikki narsa taqqoslanadi)

Tuzilish: [A + 보다 + B + 가/이 + 더 + sifat]
• 이 마트가 저 마트보다 더 싸요. (Bu market o'sha marketdan arzonroq.)
• 버스보다 지하철이 더 빨라요. (Avtobusdan metro tezroq.)

제일 / 가장 — eng (uch va undan ko'p narsalar taqqoslanadi)
• 이 식당이 제일 맛있어요. (Bu restoran eng mazali.)
• 한국에서 가장 높은 산이에요. (Koreyadagi eng baland tog'.)

제일 = 가장 — ma'nosi bir xil, ikkalasini ham ishlatish mumkin.`,
        examples: [
          { kr: '이 마트가 저 마트보다 더 싸요.', uz: "Bu market o'sha marketdan arzonroq." },
          { kr: '버스보다 지하철이 더 빨라요.', uz: "Avtobusdan metro tezroq." },
          { kr: '이 동네에서 제일 유명한 식당이에요.', uz: 'Bu mahallada eng mashhur restoran.' },
          { kr: '한국에서 가장 큰 시장이 어디예요?', uz: "Koreyada eng katta bozor qayerda?" },
          { kr: '어느 계절이 제일 좋아요?', uz: 'Qaysi fasl eng yoqimli?' },
        ]
      },
      vocabulary: [
        { kr: '시장', romanization: 'sijang', uz: 'bozor' },
        { kr: '가게', romanization: 'gage', uz: "do'kon" },
        { kr: '백화점', romanization: 'baekhwajeom', uz: 'univermag, savdo markazi' },
        { kr: '마트', romanization: 'mateu', uz: 'market, supermarket' },
        { kr: '동네', romanization: 'dongne', uz: 'mahalla, atrof' },
        { kr: '도시', romanization: 'dosi', uz: 'shahar' },
        { kr: '공원', romanization: 'gongwon', uz: 'park' },
        { kr: '거리', romanization: 'geori', uz: "ko'cha" },
        { kr: '근처', romanization: 'geuncheo', uz: 'yaqin joy, atrof' },
        { kr: '지역', romanization: 'jiyeok', uz: 'hudud, rayon' },
        { kr: '크다', romanization: 'keuda', uz: 'katta' },
        { kr: '작다', romanization: 'jakda', uz: 'kichik' },
        { kr: '넓다', romanization: 'neolda', uz: 'keng' },
        { kr: '좁다', romanization: 'jopda', uz: 'tor' },
        { kr: '싸다', romanization: 'ssada', uz: 'arzon' },
        { kr: '비싸다', romanization: 'bissada', uz: 'qimmat' },
        { kr: '유명하다', romanization: 'yumyeonghada', uz: 'mashhur' },
        { kr: '편리하다', romanization: 'pyeollihada', uz: 'qulay' },
        { kr: '가깝다', romanization: 'gakkapda', uz: 'yaqin' },
        { kr: '멀다', romanization: 'meolda', uz: 'uzoq' },
      ],
      examples: [
        { kr: '서울에서 제일 큰 시장은 동대문 시장이에요.', uz: "Seuldagi eng katta bozor Dongdaemun bozori." },
        { kr: '이 커피숍이 근처에서 제일 맛있어요. 항상 사람이 많아요.', uz: "Bu qahvaxona atrofda eng mazali. Doimo odam ko'p." },
        { kr: '지하철이 버스보다 더 빠르지만 더 복잡해요.', uz: "Metro avtobusdan tezroq, lekin murakkabroq." },
        { kr: '이 동네에서 가장 오래된 식당이에요. 50년 됐어요.', uz: "Bu mahallada eng qadimiy restoran. 50 yil bo'ldi." },
        { kr: '어느 것이 더 좋아요? 이게 저것보다 훨씬 더 좋아요.', uz: "Qaysi biri yaxshiroq? Bu u narsadan ancha yaxshi." },
      ],
      dialog: [
        { speaker: 'A', kr: '이 근처에 좋은 시장이 있어요?', uz: 'Bu atrofda yaxshi bozor bormi?' },
        { speaker: 'B', kr: '네! 여기서 10분 걸으면 큰 재래시장이 있어요.', uz: "Ha! Bu yerdan 10 daqiqa yursang katta an'anaviy bozor bor." },
        { speaker: 'A', kr: '백화점보다 더 싸요?', uz: "Universmagdan arzonroqmi?" },
        { speaker: 'B', kr: '네, 훨씬 더 싸요. 신선한 채소랑 과일이 제일 싸요.', uz: "Ha, ancha arzon. Yangi sabzavot va meva eng arzon." },
        { speaker: 'A', kr: '이 동네에서 제일 큰 시장이에요?', uz: 'Bu mahallada eng katta bozormi?' },
        { speaker: 'B', kr: '네, 이 지역에서 가장 큰 시장이에요. 옷도 팔고 음식도 팔아요.', uz: "Ha, bu hududda eng katta bozor. Kiyim ham, ovqat ham sotiladi." },
      ],
      notes: [
        "보다 더: A보다 B가 더 + sifat = B, A dan ...roq.",
        "제일 = 가장 = 'eng' — ikkisi ham ishlatiladi, ma'no bir xil.",
        "훨씬 — ancha, juda ko'p: 훨씬 더 싸요 (ancha arzon).",
        "Taqqoslash: 이것보다 저것이 더 좋아요 (u narsadan bu narsa yaxshi).",
        "재래시장 — an'anaviy bozor; 전통시장 ham deyiladi.",
      ],
      games: {
        matchPairs: [
          { kr: '시장', uz: 'bozor' },
          { kr: '백화점', uz: 'univermag' },
          { kr: '유명하다', uz: 'mashhur' },
          { kr: '가깝다', uz: 'yaqin' },
          { kr: '넓다', uz: 'keng' },
          { kr: '편리하다', uz: 'qulay' },
        ],
        fillBlank: [
          { sentence: '이 마트가 저 마트보다 더 ___.', answer: '싸요', options: ['싸요', '커요', '좋아요', '비싸요'], uz: "Bu market o'sha marketdan arzonroq." },
          { sentence: '이 동네에서 ___ 유명한 식당이에요.', answer: '제일', options: ['제일', '조금', '너무', '아주'], uz: 'Bu mahallada eng mashhur restoran.' },
          { sentence: '버스___지하철이 더 빨라요.', answer: '보다', options: ['보다', '에서', '까지', '에게'], uz: "Avtobusdan metro tezroq." },
          { sentence: '한국에서 ___ 큰 시장이 어디예요?', answer: '가장', options: ['가장', '조금', '더', '아주'], uz: "Koreyada eng katta bozor qayerda?" },
          { sentence: '이게 저것보다 훨씬 더 ___.', answer: '좋아요', options: ['좋아요', '나빠요', '작아요', '멀어요'], uz: "Bu u narsadan ancha yaxshi." },
        ],
        scramble: [
          { kr: '시장', uz: 'bozor' },
          { kr: '동네', uz: 'mahalla' },
          { kr: '유명', uz: 'mashhur' },
          { kr: '넓다', uz: 'keng' },
          { kr: '가깝다', uz: 'yaqin' },
        ],
      },
    },
    quiz: [
      { question: "'이 마트가 저 마트보다 더 싸요' nimani anglatadi?", options: ["Bu market u marketdan qimmat", "Bu market u marketdan arzon", "Bu market u marketdan katta", "Ikkala market ham arzon"], correct_index: 1 },
      { question: "'보다 더' qanday ishlatiladi?", options: ['eng...', '...roq (ikki narsa)', '...shekilli', '...uchun'], correct_index: 1 },
      { question: "'제일' va '가장' ning ma'nosi qanday?", options: ['Har xil', 'Bir xil — eng', 'Biroz farqli', 'Qarama-qarshi'], correct_index: 1 },
      { question: "'멀다' nimani anglatadi?", options: ['yaqin', 'katta', 'uzoq', 'keng'], correct_index: 2 },
      { question: "'훨씬' nimani anglatadi?", options: ['biroz', 'ancha, juda ko\'p', 'doimo', 'hech qachon'], correct_index: 1 },
      { question: "'유명하다' nimani anglatadi?", options: ['qulay', 'mashhur', 'katta', 'yangi'], correct_index: 1 },
      { question: "'편리하다' nimani anglatadi?", options: ['qimmat', 'arzon', 'qulay', 'chiroyli'], correct_index: 2 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 8: Bu bolalar uchun emasmi?
  // 과자는 어린이지 않아요?
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 2, order_in_level: 8,
    title_kr: '과자는 어린이지 않아요?',
    title_uz: 'Bu bolalar uchun emasmi?',
    is_free: false,
    content: {
      topic: {
        kr: '이 과자는 어린이를 위한 거 아니에요? 이건 어른용이에요. 이 책은 초급용이 아니에요. 이 영화는 어린이한테 맞지 않아요. 이 내용은 중급 학생한테 맞아요.',
        uz: "Bu pechenye bolalar uchun emasmi? Bu kattalar uchun. Bu kitob boshlang'ich daraja uchun emas. Bu film bolalar uchun mos emas. Bu mazmun o'rta daraja talabalari uchun mos."
      },
      grammar: {
        explanation: `N이/가 아니에요 — ...emas (inkor)

Tuzilish:
• Undosh bilan tugagan ot + 이 아니에요: 학생이 아니에요
• Unli bilan tugagan ot + 가 아니에요: 의사가 아니에요

N이지 않아요? — ...emasmi? (so'roq inkor)
• 이거 어린이용이지 않아요? (Bu bolalar uchun emasmi?)

N에게/한테 맞다 — ...ga mos kelmoq
• 이 책은 초급 학생한테 맞아요. (Bu kitob boshlang'ich talabaga mos.)
• 이 수준이 저한테 맞아요. (Bu daraja menga mos.)

위한/용 — uchun/uchun mo'ljallangan:
• 어린이를 위한 책 (bolalar uchun kitob)
• 어린이용 과자 (bolalar uchun pechenye)`,
        examples: [
          { kr: '저는 선생님이 아니에요. 학생이에요.', uz: "Men o'qituvchi emasman. Talabaman." },
          { kr: '이 책은 초급용이 아니에요. 고급이에요.', uz: "Bu kitob boshlang'ich daraja uchun emas. Yuqori daraja uchun." },
          { kr: '이 영화는 어린이한테 맞지 않아요.', uz: 'Bu film bolalar uchun mos emas.' },
          { kr: '이 내용이 제 수준에 맞아요.', uz: "Bu mazmun mening darajamga mos." },
          { kr: '이거 어른용 아닌가요? 어린이용이에요.', uz: "Bu kattalar uchun emasmi? Bolalar uchun." },
        ]
      },
      vocabulary: [
        { kr: '어린이', romanization: 'eorini', uz: 'bola, bolalar' },
        { kr: '아이', romanization: 'ai', uz: 'bola' },
        { kr: '어른', romanization: 'eoreun', uz: 'katta odam' },
        { kr: '초급', romanization: 'chogeup', uz: "boshlang'ich daraja" },
        { kr: '중급', romanization: 'junggeup', uz: "o'rta daraja" },
        { kr: '고급', romanization: 'gogeup', uz: 'yuqori daraja' },
        { kr: '손님', romanization: 'sonnim', uz: 'mijoz, mehmon' },
        { kr: '대상', romanization: 'daesang', uz: "mo'ljal, target" },
        { kr: '과자', romanization: 'gwaja', uz: 'pechenye, shirinlik' },
        { kr: '장난감', romanization: 'jangnangam', uz: "o'yinchoq" },
        { kr: '만화', romanization: 'manhwa', uz: 'komiks, multfilm' },
        { kr: '내용', romanization: 'naeyong', uz: 'mazmun' },
        { kr: '수준', romanization: 'sujun', uz: 'daraja' },
        { kr: '맞다', romanization: 'matda', uz: 'mos kelmoq, to\'g\'ri' },
        { kr: '맞지 않다', romanization: 'matji anta', uz: 'mos kelmaslik' },
        { kr: '위하다', romanization: 'wihada', uz: '...uchun bo\'lmoq' },
        { kr: '적합하다', romanization: 'jeokhapada', uz: 'mos, muvofiq' },
        { kr: '적당하다', romanization: 'jeokdanghada', uz: 'mos, qulay' },
        { kr: '알맞다', romanization: 'almatda', uz: 'mos, muvofiq' },
        { kr: '문제', romanization: 'munje', uz: 'masala, savol, muammo' },
      ],
      examples: [
        { kr: '저는 한국어 선생님이 아니에요. 그냥 학생이에요.', uz: "Men koreys tili o'qituvchisi emasman. Oddiy talabaman." },
        { kr: '이 과자는 어린이용이에요. 어른한테는 너무 달아요.', uz: "Bu pechenye bolalar uchun. Kattalarga juda shirin." },
        { kr: '이 책이 초급 학생한테 맞아요? 좀 어려운 것 같아요.', uz: "Bu kitob boshlang'ich talabaga mosmi? Biroz qiyin shekilli." },
        { kr: '이 수업은 중급 학생을 위한 거예요.', uz: "Bu dars o'rta daraja talabalari uchun." },
        { kr: '이 영화는 어린이한테 맞지 않아요. 어른 영화예요.', uz: "Bu film bolalar uchun mos emas. Kattalar filmi." },
      ],
      dialog: [
        { speaker: 'A', kr: '이 책 어때요? 저한테 맞을까요?', uz: "Bu kitob qanday? Menga mosmi?" },
        { speaker: 'B', kr: '지금 레벨이 어떻게 되세요?', uz: "Hozir darajangiz qanday?" },
        { speaker: 'A', kr: '한국어 공부한 지 6개월 됐어요. 초급이에요.', uz: "Koreys tilini o'rganganim 6 oy bo'ldi. Boshlang'ich daraja." },
        { speaker: 'B', kr: '그럼 이 책은 맞지 않아요. 좀 어려워요.', uz: "Unday bo'lsa bu kitob mos emas. Biroz qiyin." },
        { speaker: 'A', kr: '이건 중급용이에요?', uz: "Bu o'rta daraja uchunmi?" },
        { speaker: 'B', kr: '네, 중급 이상이에요. 초급용은 저쪽에 있어요.', uz: "Ha, o'rta daraja va undan yuqori uchun. Boshlang'ich uchun u tomonda." },
      ],
      notes: [
        "이/가 아니에요: undosh + 이 아니에요, unli + 가 아니에요.",
        "한테/에게 맞다 — moslik: 저한테 맞아요(menga mos), 어린이한테 맞아요(bolalarga mos).",
        "-용 — uchun mo'ljallangan: 어린이용(bolalar uchun), 어른용(kattalar uchun), 초급용(boshlang'ich uchun).",
        "를 위한 — uchun: 어린이를 위한 책(bolalar uchun kitob).",
        "이상(va undan yuqori): 초급 이상(boshlang'ich va undan yuqori).",
      ],
      games: {
        matchPairs: [
          { kr: '어린이', uz: 'bola' },
          { kr: '어른', uz: 'katta odam' },
          { kr: '초급', uz: "boshlang'ich" },
          { kr: '중급', uz: "o'rta daraja" },
          { kr: '수준', uz: 'daraja' },
          { kr: '맞다', uz: 'mos kelmoq' },
        ],
        fillBlank: [
          { sentence: '저는 선생님이 ___.', answer: '아니에요', options: ['아니에요', '이에요', '해요', '돼요'], uz: "Men o'qituvchi emasman." },
          { sentence: '이 책은 초급___이 아니에요.', answer: '용', options: ['용', '을', '이', '의'], uz: "Bu kitob boshlang'ich daraja uchun emas." },
          { sentence: '이 수업은 중급 학생___위한 거예요.', answer: '을', options: ['을', '이', '가', '에'], uz: "Bu dars o'rta daraja talabalari uchun." },
          { sentence: '이 내용이 제 수준에 ___.', answer: '맞아요', options: ['맞아요', '몰라요', '알아요', '해요'], uz: "Bu mazmun mening darajamga mos." },
          { sentence: '이 영화는 어린이___맞지 않아요.', answer: '한테', options: ['한테', '에서', '까지', '부터'], uz: 'Bu film bolalar uchun mos emas.' },
        ],
        scramble: [
          { kr: '어린이', uz: 'bola' },
          { kr: '초급', uz: "boshlang'ich" },
          { kr: '수준', uz: 'daraja' },
          { kr: '내용', uz: 'mazmun' },
          { kr: '과자', uz: 'pechenye' },
        ],
      },
    },
    quiz: [
      { question: "'저는 학생이 아니에요' nimani anglatadi?", options: ['Men talabaman', 'Men talaba emasman', 'U talaba emas', 'Men o\'qituvchiman'], correct_index: 1 },
      { question: "N이/가 아니에요 — undosh bilan tugagan otdan keyin?", options: ['가 아니에요', '이 아니에요', '는 아니에요', '를 아니에요'], correct_index: 1 },
      { question: "'한테 맞다' nimani anglatadi?", options: ['...ni yoqtirish', '...ga mos kelmoq', '...dan yaxshi', '...uchun kerak'], correct_index: 1 },
      { question: "'-용' nimani ifodalaydi?", options: ['...dan keyin', '...uchun mo\'ljallangan', '...sababli', '...bilan'], correct_index: 1 },
      { question: "'고급' nimani anglatadi?", options: ["boshlang'ich", "o'rta daraja", 'yuqori daraja', 'maxsus daraja'], correct_index: 2 },
      { question: "'맞지 않다' nimani anglatadi?", options: ['mos kelmoq', 'mos kelmaslik', 'bilmaslik', 'yoqtirmaslik'], correct_index: 1 },
      { question: "'이상' nimani anglatadi?", options: ['va undan past', 'va undan yuqori', 'faqat shu', 'taxminan'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 9: Koreys tili kursiga ro'yxatdan o'tish uchun keldim
  // 한국어반에 등록을 하려고 왔어요
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 2, order_in_level: 9,
    title_kr: '한국어반에 등록을 하려고 왔어요',
    title_uz: "Koreys tili kursiga ro'yxatdan o'tish uchun keldim",
    is_free: false,
    content: {
      topic: {
        kr: '한국어반에 등록을 하려고 왔어요. 서류를 제출하러 왔어요. 등록금을 내려고 해요. 신청서를 작성하러 왔어요. 담당자를 만나러 왔어요.',
        uz: "Koreys tili kursiga ro'yxatdan o'tish uchun keldim. Hujjatlar topshirish uchun keldim. Kontrakt to'lamoqchiman. Ariza to'ldirish uchun keldim. Mas'ul xodim bilan ko'rishish uchun keldim."
      },
      grammar: {
        explanation: `V-(으)려고 — maqsad: ...qilish uchun, ...qilmoq niyatida

Tuzilish:
• Undosh bilan tugagan + 으려고: 먹다 → 먹으려고
• Unli bilan tugagan + 려고: 가다 → 가려고
• ㄹ bilan tugagan + 려고: 알다 → 알려고

Misol: 등록을 하려고 왔어요. (Ro'yxatdan o'tish uchun keldim.)

-러 오다/가다 — ...gani kelmoq/bormoq (faqat harakat fe'llari bilan):
• 서류를 제출하러 왔어요. (Hujjat topshirgani keldim.)
• 책을 빌리러 도서관에 가요. (Kitob olish uchun kutubxonaga boraman.)

-(으)려고 vs -러:
• -(으)려고 — barcha fe'llar, fikr-maqsad
• -러 — faqat harakat fe'llari (오다, 가다, 다니다 bilan)`,
        examples: [
          { kr: '한국어를 배우려고 왔어요.', uz: 'Koreys tilini o\'rganish uchun keldim.' },
          { kr: '등록을 하려고 해요.', uz: "Ro'yxatdan o'tmoqchiman." },
          { kr: '서류를 제출하러 왔어요.', uz: 'Hujjat topshirgani keldim.' },
          { kr: '책을 빌리러 도서관에 가요.', uz: 'Kitob olish uchun kutubxonaga boraman.' },
          { kr: '친구를 만나려고 일찍 왔어요.', uz: "Do'stni ko'rish uchun erta keldim." },
        ]
      },
      vocabulary: [
        { kr: '등록', romanization: 'deungnok', uz: "ro'yxatdan o'tish" },
        { kr: '등록하다', romanization: 'deungnokhada', uz: "ro'yxatdan o'tmoq" },
        { kr: '신청', romanization: 'sincheong', uz: 'ariza, murojaat' },
        { kr: '신청하다', romanization: 'sincheonghada', uz: 'ariza bermoq' },
        { kr: '접수', romanization: 'jeopsu', uz: 'qabul qilish' },
        { kr: '제출하다', romanization: 'jechulhada', uz: 'topshirmoq' },
        { kr: '작성하다', romanization: 'jakseonghada', uz: "to'ldirmoq, yozmoq" },
        { kr: '서류', romanization: 'seoryu', uz: 'hujjatlar' },
        { kr: '신청서', romanization: 'sincheongseo', uz: 'ariza formasi' },
        { kr: '등록금', romanization: 'deungnokgeum', uz: "kontrakt to'lovi" },
        { kr: '영수증', romanization: 'yeongsujeung', uz: 'chek' },
        { kr: '한국어반', romanization: 'hangugeoban', uz: 'koreys tili guruhi' },
        { kr: '학원', romanization: 'hagwon', uz: "o'quv markazi" },
        { kr: '교실', romanization: 'gyosil', uz: 'sinfxona' },
        { kr: '행정실', romanization: 'haengjeongsil', uz: "ma'muriy bo'lim" },
        { kr: '담당자', romanization: 'damdangja', uz: "mas'ul xodim" },
        { kr: '안내', romanization: 'annae', uz: "yo'riqnoma" },
        { kr: '절차', romanization: 'jeolcha', uz: 'tartib, jarayon' },
        { kr: '구비서류', romanization: 'gubiseoryu', uz: 'talab qilinadigan hujjatlar' },
        { kr: '기간', romanization: 'gigan', uz: 'muddat, davr' },
      ],
      examples: [
        { kr: '한국어반에 등록을 하려고 왔어요. 어디로 가면 돼요?', uz: "Koreys tili kursiga ro'yxatdan o'tish uchun keldim. Qayerga borish kerak?" },
        { kr: '신청서를 작성하러 행정실에 갔어요.', uz: "Ariza to'ldirish uchun ma'muriy bo'limga bordim." },
        { kr: '등록금을 내려고 하는데 계좌번호가 어떻게 돼요?', uz: "Kontrakt to'lamoqchiman, hisob raqami qanday?" },
        { kr: '구비서류가 뭐예요? 여권하고 사진이 필요해요.', uz: "Talab qilinadigan hujjatlar nima? Pasport va surat kerak." },
        { kr: '등록 기간이 언제까지예요? 이번 주 금요일까지예요.', uz: "Ro'yxatdan o'tish muddati qachongacha? Bu haftaning jumasigacha." },
      ],
      dialog: [
        { speaker: 'A', kr: '안녕하세요. 한국어반 등록을 하려고 왔어요.', uz: "Salom. Koreys tili kursiga ro'yxatdan o'tish uchun keldim." },
        { speaker: 'B', kr: '네, 어서 오세요. 초급반이에요, 중급반이에요?', uz: "Ha, xush kelibsiz. Boshlang'ich guruhmi, o'rta guruhmi?" },
        { speaker: 'A', kr: '처음이에요. 초급반에 등록하고 싶어요.', uz: "Birinchi marta. Boshlang'ich guruhga yozilmoqchiman." },
        { speaker: 'B', kr: '그럼 이 신청서를 작성해 주세요. 구비서류는 여권 사본이에요.', uz: "Unday bo'lsa bu arizani to'ldiring. Kerakli hujjat pasport nusxasi." },
        { speaker: 'A', kr: '등록금은 얼마예요? 그리고 어디에 내요?', uz: "Kontrakt qancha? Va qayerga to'layman?" },
        { speaker: 'B', kr: '한 달에 15만 원이에요. 저쪽 창구에서 내시면 돼요.', uz: "Bir oyda 150,000 won. U tomondagi xizmat oynasida to'lasangiz bo'ladi." },
      ],
      notes: [
        "-(으)려고: undosh + 으려고 (먹으려고), unli + 려고 (가려고).",
        "-러 오다/가다: faqat harakat fe'llari bilan: 먹으러(yegani), 보러(ko'rgani), 받으러(olgani).",
        "신청서 작성하다 — ariza to'ldirmoq; 서류 제출하다 — hujjat topshirmoq.",
        "사본 — nusxa: 여권 사본(pasport nusxasi).",
        "～ 까지 — gacha: 금요일까지(jumagacha), 이번 주까지(bu haftaga qadar).",
      ],
      games: {
        matchPairs: [
          { kr: '등록', uz: "ro'yxatdan o'tish" },
          { kr: '서류', uz: 'hujjatlar' },
          { kr: '제출하다', uz: 'topshirmoq' },
          { kr: '작성하다', uz: "to'ldirmoq" },
          { kr: '담당자', uz: "mas'ul xodim" },
          { kr: '절차', uz: 'tartib' },
        ],
        fillBlank: [
          { sentence: '한국어반에 등록을 하___ 왔어요.', answer: '려고', options: ['려고', '러', '면서', '고'], uz: "Koreys tili kursiga ro'yxatdan o'tish uchun keldim." },
          { sentence: '서류를 제출하___ 왔어요.', answer: '러', options: ['러', '려고', '면서', '고'], uz: 'Hujjat topshirgani keldim.' },
          { sentence: '신청서를 ___ 주세요.', answer: '작성해', options: ['작성해', '제출해', '받아', '내'], uz: 'Arizani to\'ldiring.' },
          { sentence: '등록금이 얼마___ 돼요?', answer: '나', options: ['나', '이', '가', '를'], uz: "Kontrakt qancha bo'ladi?" },
          { sentence: '이번 주 금요일___예요.', answer: '까지', options: ['까지', '부터', '에서', '한테'], uz: "Bu haftaning jumasigacha." },
        ],
        scramble: [
          { kr: '등록', uz: "ro'yxat" },
          { kr: '서류', uz: 'hujjat' },
          { kr: '신청', uz: 'ariza' },
          { kr: '절차', uz: 'tartib' },
          { kr: '기간', uz: 'muddat' },
        ],
      },
    },
    quiz: [
      { question: "'등록을 하려고 왔어요' nimani anglatadi?", options: ["Ro'yxatdan o'tib bo'ldim", "Ro'yxatdan o'tish uchun keldim", "Ro'yxat yo'q", "Ro'yxatdan o'tmayman"], correct_index: 1 },
      { question: "'-(으)려고' qanday ma'no ifodalaydi?", options: ['...sababli', '...qilish uchun (maqsad)', '...ga qaramasdan', '...da'], correct_index: 1 },
      { question: "'-러' faqat qaysi fe'llar bilan ishlatiladi?", options: ['Barcha fe'llar', 'Harakat fe'llari (오다, 가다)', 'Sifat fe'llar', 'Yordamchi fe'llar'], correct_index: 1 },
      { question: "'서류' nimani anglatadi?", options: ['ariza', 'hujjatlar', 'chek', 'pasport'], correct_index: 1 },
      { question: "'작성하다' nimani anglatadi?", options: ['topshirmoq', 'olmoq', "to'ldirmoq, yozmoq", 'kutmoq'], correct_index: 2 },
      { question: "'담당자' nimani anglatadi?", options: ['mijoz', "mas'ul xodim", 'o\'qituvchi', 'talaba'], correct_index: 1 },
      { question: "-(으)려고 da undosh bilan tugagan o'zakdan keyin?", options: ['려고', '으려고', '리려고', '을려고'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 10: Tez orada Seollal, tteokguk yeyish kerak
  // 곧 설날이었는데 떡국을 먹어야 해요
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 2, order_in_level: 10,
    title_kr: '곧 설날이었는데 떡국을 먹어야 해요',
    title_uz: 'Tez orada Seollal bo\'ladi, tteokguk yeyish kerak',
    is_free: false,
    content: {
      topic: {
        kr: '곧 설날이에요. 설날에는 떡국을 먹어야 해요. 가족들이 모여서 세배를 해야 해요. 새해 복 많이 받으세요. 한국의 전통 명절 문화를 배워요.',
        uz: "Tez orada Seollal. Seollalda tteokguk yeyish kerak. Oila a'zolari yig'ilib, ta'zim qilish kerak. Yangi yilda ko'p baxt tilayman. Koreya an'anaviy bayram madaniyatini o'rganamiz."
      },
      grammar: {
        explanation: `-아/어야 하다 — majburiyat yoki zaruratni bildirish: ...qilish kerak

Tuzilish: [fe'l o'zagi + 아야/어야 하다]
• 먹다 → 먹어야 해요 (yeyish kerak)
• 가다 → 가야 해요 (borish kerak)
• 하다 → 해야 해요 (qilish kerak)

-아야/어야 qoidasi:
• 아 yoki 오 bilan tugagan + 아야: 봐야(ko'rish kerak), 와야(kelish kerak)
• Boshqa + 어야: 먹어야(yeyish kerak), 배워야(o'rganish kerak)

-기도 하다 — ba'zan ...ham qiladi:
• 설날에는 차례를 지내기도 해요. (Seollalda ba'zan cherkov marosimi ham bo'ladi.)
• 선물을 주기도 해요. (Ba'zan sovg'a ham beriladi.)`,
        examples: [
          { kr: '설날에는 떡국을 먹어야 해요.', uz: 'Seollalda tteokguk yeyish kerak.' },
          { kr: '가족들이 모여야 해요.', uz: "Oila a'zolari yig'ilishi kerak." },
          { kr: '세배를 해야 해요.', uz: 'Ta\'zim qilish kerak.' },
          { kr: '내일까지 숙제를 해야 해요.', uz: 'Ertaga qadar uy vazifasini qilish kerak.' },
          { kr: '한국어를 매일 공부해야 해요.', uz: 'Koreys tilini har kuni o\'rganish kerak.' },
        ]
      },
      vocabulary: [
        { kr: '설날', romanization: 'seollal', uz: 'Seollal, Koreys Yangi yili' },
        { kr: '명절', romanization: 'myeongjeol', uz: 'bayram' },
        { kr: '전통', romanization: 'jeontong', uz: "an'ana" },
        { kr: '문화', romanization: 'munhwa', uz: 'madaniyat' },
        { kr: '친척', romanization: 'chincheok', uz: 'qarindoshlar' },
        { kr: '조상', romanization: 'josang', uz: 'ajdodlar' },
        { kr: '새해', romanization: 'saehae', uz: 'yangi yil' },
        { kr: '복', romanization: 'bok', uz: 'baxt, baraka' },
        { kr: '떡국', romanization: 'tteokguk', uz: "tteokguk (guruchli sho'rva)" },
        { kr: '만두', romanization: 'mandu', uz: 'manti, dumpling' },
        { kr: '전', romanization: 'jeon', uz: 'koreyscha quymoqsimon taom' },
        { kr: '세배', romanization: 'sebae', uz: 'yangi yil ta\'zimi' },
        { kr: '세배하다', romanization: 'sebaehada', uz: "ta'zim qilmoq (yangi yilda)" },
        { kr: '모이다', romanization: 'moida', uz: "yig'ilmoq" },
        { kr: '준비하다', romanization: 'junbihada', uz: 'tayyorlamoq' },
        { kr: '차례', romanization: 'charye', uz: 'ajdodlar ruhiga bag\'ishlangan marosim' },
        { kr: '한복', romanization: 'hanbok', uz: 'hanbok (koreyscha milliy kiyim)' },
        { kr: '세뱃돈', romanization: 'sebaetdon', uz: 'yangi yilda berilgan pul (kattalardan bolalarga)' },
        { kr: '추석', romanization: 'chuseok', uz: "Chuseok (kuz bayrami, O'rik o'rimi)" },
        { kr: '고향', romanization: 'gohyang', uz: 'tug\'ilgan joy, vatan' },
      ],
      examples: [
        { kr: '설날에는 온 가족이 모여야 해요. 그리고 어른들께 세배를 해야 해요.', uz: "Seollalda butun oila yig'ilishi kerak. Va kattalarga ta'zim qilish kerak." },
        { kr: '떡국을 먹으면 한 살 더 먹는다고 해요.', uz: "Tteokguk yesa bir yosh ulg'ayadi, deyishadi." },
        { kr: '설날에는 한복을 입기도 해요. 요즘은 잘 안 입지만요.', uz: "Seollalda hanbok kiyish ham bor. Hozirda kamroq kiyiladi-yu." },
        { kr: '고향에 가야 해서 기차표를 미리 예약했어요.', uz: "Tug'ilgan yerimga borish kerak bo'lgani uchun poyezd chiptasini oldindan bron qildim." },
        { kr: '추석에는 송편을 먹어야 해요. 설날에는 떡국이고요.', uz: "Chuseokda songpyeon yeyish kerak. Seollalda esa tteokguk." },
      ],
      dialog: [
        { speaker: 'A', kr: '설날에 뭐 해요? 고향에 가요?', uz: 'Seollalda nima qilasiz? Tug\'ilgan yeringizga borasizmi?' },
        { speaker: 'B', kr: '네, 가족들이 다 모여야 해서 고향에 가야 해요.', uz: "Ha, hammasi yig'ilishi kerak bo'lgani uchun tug'ilgan yerimga borish kerak." },
        { speaker: 'A', kr: '설날에 꼭 해야 하는 게 있어요?', uz: "Seollalda albatta qilish kerak bo'lgan narsalar bormi?" },
        { speaker: 'B', kr: '네, 어른들께 세배를 해야 해요. 그리고 떡국도 먹어야 해요.', uz: "Ha, kattalarga ta'zim qilish kerak. Va tteokguk ham yeyish kerak." },
        { speaker: 'A', kr: '떡국을 왜 먹어야 해요?', uz: 'Nima uchun tteokguk yeyish kerak?' },
        { speaker: 'B', kr: '떡국을 먹어야 한 살 더 먹는다고 해요. 전통이에요.', uz: "Tteokguk yesa bir yosh ulg'ayadi deyishadi. An'ana shu." },
      ],
      notes: [
        "-아/어야 하다/되다: majburiyat: 해야 해요(qilish kerak), 먹어야 해요(yeyish kerak).",
        "-기도 하다: ba'zan ham: 선물을 주기도 해요(ba'zan sovg'a ham beriladi).",
        "설날 — Seollal (Yangi yil): lunar calendar bo'yicha 1-oy 1-kuni.",
        "추석 — Chuseok: kuz o'rta oyi (8-oy 15-kuni) — ikkinchi yirik bayram.",
        "세뱃돈 — kattalar bolalarga beradigan yangi yil puli.",
      ],
      games: {
        matchPairs: [
          { kr: '설날', uz: 'Seollal (Yangi yil)' },
          { kr: '떡국', uz: "guruchli sho'rva" },
          { kr: '세배', uz: "yangi yil ta'zimi" },
          { kr: '전통', uz: "an'ana" },
          { kr: '명절', uz: 'bayram' },
          { kr: '고향', uz: "tug'ilgan joy" },
        ],
        fillBlank: [
          { sentence: '설날에는 떡국을 먹어___ 해요.', answer: '야', options: ['야', '서', '고', '면'], uz: 'Seollalda tteokguk yeyish kerak.' },
          { sentence: '가족들이 모여___ 해요.', answer: '야', options: ['야', '고', '서', '지만'], uz: "Oila a'zolari yig'ilishi kerak." },
          { sentence: '어른들께 세배를 ___야 해요.', answer: '해', options: ['해', '가', '봐', '와'], uz: "Kattalarga ta'zim qilish kerak." },
          { sentence: '한복을 입___ 해요.', answer: '어야', options: ['어야', '고', '서', '면'], uz: 'Hanbok kiyish kerak.' },
          { sentence: '설날에 선물을 주___ 해요.', answer: '기도', options: ['기도', '면서', '고도', '지도'], uz: "Seollalda sovg'a berilishi ham bor." },
        ],
        scramble: [
          { kr: '설날', uz: 'Seollal' },
          { kr: '떡국', uz: "tteokguk" },
          { kr: '명절', uz: 'bayram' },
          { kr: '전통', uz: "an'ana" },
          { kr: '고향', uz: "tug'ilgan joy" },
        ],
      },
    },
    quiz: [
      { question: "'떡국을 먹어야 해요' nimani anglatadi?", options: ['Tteokguk yeyapman', 'Tteokguk yeyish kerak', 'Tteokguk yemoqchiman', 'Tteokguk yedim'], correct_index: 1 },
      { question: "'-아/어야 하다' qanday ma'no ifodalaydi?", options: ['...qilmoqchi', '...qilish kerak (majburiyat)', '...qilish mumkin', '...qildim'], correct_index: 1 },
      { question: "'설날' nima?", options: ['Chuseok bayrami', 'Koreys Yangi yili', 'Milliy bayram', 'Yoz bayrami'], correct_index: 1 },
      { question: "'세배하다' nimani anglatadi?", options: ['ovqat tayyorlamoq', "sovg'a bermoq", "yangi yilda ta'zim qilmoq", "yig'ilmoq"], correct_index: 2 },
      { question: "'-기도 하다' nimani ifodalaydi?", options: ['...qilish kerak', "ba'zan ...ham qiladi", '...qilmoqchi', '...qilmaydi'], correct_index: 1 },
      { question: "'고향' nimani anglatadi?", options: ['shahar', "tug'ilgan joy", 'uy', 'maktab'], correct_index: 1 },
      { question: "'모이다' nimani anglatadi?", options: ['tarqalmoq', 'ketmoq', "yig'ilmoq", 'qolmoq'], correct_index: 2 },
    ]
  },

];

// ════════════════════════════════════════════
// DB ga saqlash
// ════════════════════════════════════════════
async function seed() {
  console.log('TOPIK 2-daraja seed boshlandi...\n');

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

  console.log('\n✅ TOPIK 2-daraja seed muvaffaqiyatli yakunlandi!');
  console.log(`   Jami: ${LESSONS.length} ta dars`);
  await db.end();
}

seed().catch(err => {
  console.error('❌ Xatolik:', err.message);
  process.exit(1);
});
