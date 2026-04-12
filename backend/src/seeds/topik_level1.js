// backend/src/seeds/topik_level1.js
// TOPIK 1-daraja: 10 ta to'liq dars
// Usage: node src/seeds/topik_level1.js

require('dotenv').config({ path: '../../.env' });
const db = require('../db');

const LESSONS = [

  // ════════════════════════════════════════════
  // DARS 1: O'zini tanishtirish — 자기소개
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 1, order_in_level: 1,
    title_kr: '자기소개', title_uz: "O'zini tanishtirish", is_free: true,
    content: {
      topic: {
        kr: '이 단원에서는 자기소개를 배웁니다. 저는 오이벡입니다. 저는 우즈베키스탄 사람입니다. 저는 학생입니다. 처음 만난 사람에게 이름, 국적, 직업을 말하는 표현을 배웁니다.',
        uz: "Bu darsda o'zini tanishtirish o'rganiladi. Men Oybekman. Men o'zbekistonlikman. Men talabaman. Yangi tanishgan odamga ism, millat va kasbni aytish ifodalari o'rganiladi."
      },
      grammar: {
        explanation: `입니다 / 입니까? — Koreys tilining eng asosiy grammatik shakli.

입니다 — otdan keyin kelib, "...man / ...dir" degan ma'noni bildiradi. Rasmiy va hurmatli nutqda ishlatiladi.
입니까? — bu gapning so'roq shakli. Ism, kasb, millat so'rashda ishlatiladi.

은/는 — gapning mavzusini ko'rsatuvchi qo'shimcha.
• Undosh bilan tugagan otdan keyin: 은 (학생은)
• Unli bilan tugagan otdan keyin: 는 (저는)

Tuzilish: [Mavzu + 은/는] + [ot + 입니다]
Misol: 저는 학생입니다. = Men talabaman.`,
        examples: [
          { kr: '저는 오이벡입니다.', uz: 'Men Oybekman.' },
          { kr: '저는 우즈베키스탄 사람입니다.', uz: "Men o'zbekistonlikman." },
          { kr: '저는 학생입니다.', uz: 'Men talabaman.' },
          { kr: '어느 나라 사람입니까?', uz: 'Qaysi davlatdansiz?' },
          { kr: '직업이 무엇입니까?', uz: 'Kasbingiz nima?' },
        ]
      },
      vocabulary: [
        { kr: '저', romanization: 'jeo', uz: 'men (rasmiy)' },
        { kr: '이름', romanization: 'ireum', uz: 'ism' },
        { kr: '성함', romanization: 'seongham', uz: 'ism-familiya (hurmatli)' },
        { kr: '사람', romanization: 'saram', uz: 'odam / ...lik' },
        { kr: '나라', romanization: 'nara', uz: 'davlat, mamlakat' },
        { kr: '국적', romanization: 'gukjeok', uz: 'millat, fuqarolik' },
        { kr: '직업', romanization: 'jigeop', uz: 'kasb' },
        { kr: '학생', romanization: 'haksaeng', uz: 'talaba, o\'quvchi' },
        { kr: '선생님', romanization: 'seonsaengnim', uz: "o'qituvchi, ustoz" },
        { kr: '회사원', romanization: 'hoesawon', uz: 'ofis xodimi' },
        { kr: '의사', romanization: 'uisa', uz: 'shifokor' },
        { kr: '한국', romanization: 'hanguk', uz: 'Koreya' },
        { kr: '우즈베키스탄', romanization: 'ujeubekiseutan', uz: "O'zbekiston" },
        { kr: '중국', romanization: 'jungguk', uz: 'Xitoy' },
        { kr: '일본', romanization: 'ilbon', uz: 'Yaponiya' },
        { kr: '안녕하세요', romanization: 'annyeonghaseyo', uz: 'Assalomu alaykum' },
        { kr: '반갑습니다', romanization: 'bangapseumnida', uz: 'Tanishganimdan xursandman' },
        { kr: '네', romanization: 'ne', uz: 'ha' },
        { kr: '아니요', romanization: 'aniyo', uz: "yo'q" },
        { kr: '감사합니다', romanization: 'gamsahamnida', uz: 'rahmat' },
      ],
      examples: [
        { kr: '저는 오이벡입니다. 저는 우즈베키스탄 사람입니다.', uz: "Men Oybekman. Men o'zbekistonlikman." },
        { kr: '가: 어느 나라 사람입니까? 나: 저는 네팔 사람입니다.', uz: "A: Qaysi davlatdansiz? B: Men nepallikman." },
        { kr: '가: 직업이 뭐예요? 나: 저는 회사원입니다.', uz: "A: Kasbingiz nima? B: Men ofis xodimiman." },
        { kr: '이 사람은 제 친구입니다. 제 친구는 베트남 사람입니다.', uz: "Bu odam mening do'stim. Mening do'stim vyetnamlik." },
        { kr: '저는 한국어를 공부합니다. 저는 학생입니다.', uz: "Men koreys tilini o'rganaman. Men talabaman." },
      ],
      dialog: [
        { speaker: 'A', kr: '안녕하세요! 저는 민준입니다.', uz: 'Salom! Men Minjunman.' },
        { speaker: 'B', kr: '안녕하세요! 저는 오이벡입니다. 반갑습니다.', uz: "Salom! Men Oybekman. Xursandman." },
        { speaker: 'A', kr: '어느 나라 사람입니까?', uz: 'Qaysi davlatdansiz?' },
        { speaker: 'B', kr: '저는 우즈베키스탄 사람입니다. 민준 씨는요?', uz: "Men o'zbekistonlikman. Minjun-ssi-chi?" },
        { speaker: 'A', kr: '저는 한국 사람입니다. 직업이 뭐예요?', uz: 'Men koreyalikman. Kasbingiz nima?' },
        { speaker: 'B', kr: '저는 학생입니다. 한국어를 공부해요.', uz: "Men talabaman. Koreys tilini o'rganaman." },
      ],
      notes: [
        "저 (jeo) — 'men' ning rasmiy shakli. Do'stlar orasida 나 (na) ishlatiladi.",
        "입니다 jumlaning oxirida keladi va rasmiy nutqda ishlatiladi.",
        "은/는: undosh + 은 (학생은), unli + 는 (저는, 의사는).",
        "만나서 반갑습니다 — birinchi uchrashuvda aytiladi.",
        "씨 — ismdan keyin qo'yiladigan hurmat qo'shimchasi: 오이벡 씨.",
      ]
    },
    quiz: [
      { question: "'Men talabaman' koreyschada qanday?", options: ['저는 의사입니다', '저는 학생입니다', '저는 선생님입니다', '저는 회사원입니다'], correct_index: 1 },
      { question: "'어느 나라 사람입니까?' nimani anglatadi?", options: ['Ismingiz nima?', 'Kasbingiz nima?', 'Qaysi davlatdansiz?', 'Yoshingiz nechchi?'], correct_index: 2 },
      { question: "Rasmiy 'men' koreyschada qanday?", options: ['나', '저', '우리', '제'], correct_index: 1 },
      { question: "'반갑습니다' nimani anglatadi?", options: ['Salom', 'Xayr', 'Tanishganimdan xursandman', 'Rahmat'], correct_index: 2 },
      { question: "학생 + 입니다 = ?", options: ['학생는입니다', '학생은입니다', '학생입니다', '학생이입니다'], correct_index: 2 },
      { question: "'저는 ___입니다' qolipida bo'sh joyga nima keladi?", options: ['Faqat ism', 'Faqat kasb', 'Faqat millat', 'Ism, kasb yoki millat'], correct_index: 3 },
      { question: "Undosh bilan tugagan otdan keyin qaysi qo'shimcha keladi?", options: ['는', '은', '이', '가'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 2: Oila — 가족
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 1, order_in_level: 2,
    title_kr: '가족', title_uz: 'Oila', is_free: true,
    content: {
      topic: {
        kr: '이 단원에서는 가족에 대해 배웁니다. 우리 가족은 4명입니다. 아버지와 어머니가 계십니다. 저는 형이 있습니다. 동생은 학생입니다.',
        uz: "Bu darsda oila mavzusi o'rganiladi. Bizning oilamiz 4 kishidan iborat. Otam va onam bor. Mening akam bor. Ukam talaba."
      },
      grammar: {
        explanation: `이/가 있다 / 없다 — borlik va yo'qlik ifodalash.

있다 — bor (mavjud)
없다 — yo'q (mavjud emas)

Tuzilish: [ot + 이/가] + [있다 / 없다]
• Undosh bilan tugagan ot + 이: 형이 있어요
• Unli bilan tugagan ot + 가: 누나가 있어요

계시다 — "bor" ning hurmatli shakli (kattalar uchun)
: 아버지가 계십니다. (Otam bor — hurmat bilan)

명 — kishilar soni hisoblagichi:
1명 (il myeong), 2명 (i myeong), 3명 (sam myeong)...`,
        examples: [
          { kr: '저는 형이 있습니다.', uz: 'Mening akam bor.' },
          { kr: '저는 동생이 없습니다.', uz: "Mening ukam yo'q." },
          { kr: '아버지가 계십니다.', uz: 'Otam bor (hurmat bilan).' },
          { kr: '우리 가족은 5명입니다.', uz: 'Bizning oilamiz 5 kishidan iborat.' },
          { kr: '언니가 있어요? 네, 있어요.', uz: "Opangiz bormi? Ha, bor." },
        ]
      },
      vocabulary: [
        { kr: '가족', romanization: 'gajok', uz: 'oila' },
        { kr: '부모님', romanization: 'bumonim', uz: 'ota-ona' },
        { kr: '아버지', romanization: 'abeoji', uz: 'ota' },
        { kr: '어머니', romanization: 'eomeoni', uz: 'ona' },
        { kr: '형', romanization: 'hyeong', uz: 'aka (erkak aytadi)' },
        { kr: '누나', romanization: 'nuna', uz: 'opa (erkak aytadi)' },
        { kr: '오빠', romanization: 'oppa', uz: 'aka (qiz aytadi)' },
        { kr: '언니', romanization: 'eonni', uz: 'opa (qiz aytadi)' },
        { kr: '남동생', romanization: 'namdongsaeng', uz: 'uka' },
        { kr: '여동생', romanization: 'yeodongsaeng', uz: 'singil' },
        { kr: '할아버지', romanization: 'harabeoji', uz: 'bobo' },
        { kr: '할머니', romanization: 'halmeoni', uz: 'buvi' },
        { kr: '남편', romanization: 'nampyeon', uz: 'er' },
        { kr: '아내', romanization: 'anae', uz: 'xotin' },
        { kr: '아들', romanization: 'adeul', uz: "o'g'il" },
        { kr: '딸', romanization: 'ttal', uz: 'qiz (farzand)' },
        { kr: '있다', romanization: 'itda', uz: 'bor, mavjud' },
        { kr: '없다', romanization: 'eopda', uz: "yo'q, mavjud emas" },
        { kr: '명', romanization: 'myeong', uz: 'kishi (sanoq)' },
        { kr: '우리', romanization: 'uri', uz: 'bizning' },
      ],
      examples: [
        { kr: '우리 가족은 4명입니다. 아버지, 어머니, 저, 남동생이 있습니다.', uz: "Bizning oilamiz 4 kishi. Otam, onam, men va ukam bor." },
        { kr: '저는 누나가 있어요. 누나는 회사원이에요.', uz: "Mening opam bor. Opam ofis xodimi." },
        { kr: '할머니가 계십니다. 할아버지는 안 계십니다.', uz: "Buvim bor. Bobom yo'q." },
        { kr: '형제가 있어요? 아니요, 없어요. 저는 외동이에요.', uz: "Aka-ukangiz bormi? Yo'q, yo'q. Men yagona farzandman." },
        { kr: '우리 가족은 모두 건강합니다.', uz: "Bizning oilamiz hammasi sog'-salomat." },
      ],
      dialog: [
        { speaker: 'A', kr: '가족이 몇 명이에요?', uz: 'Oilangiz necha kishi?' },
        { speaker: 'B', kr: '우리 가족은 4명이에요. 부모님과 저, 그리고 남동생이 있어요.', uz: "Bizning oilamiz 4 kishi. Ota-onam, men va ukam." },
        { speaker: 'A', kr: '남동생은 뭐 해요?', uz: 'Ukangiz nima qiladi?' },
        { speaker: 'B', kr: '남동생은 학생이에요. 고등학생이에요.', uz: "Ukam talaba. U o'rta maktab o'quvchisi." },
        { speaker: 'A', kr: '형이나 누나도 있어요?', uz: 'Aka yoki opangiz ham bormi?' },
        { speaker: 'B', kr: '아니요, 없어요. 저는 장남이에요.', uz: "Yo'q, yo'q. Men katta o'g'ilman." },
      ],
      notes: [
        "Koreys tilida aka va opa so'zlari kimning aytayotganiga qarab farqlanadi: erkak aytsa 형/누나, qiz aytsa 오빠/언니.",
        "있다/없다 so'rash: 있어요? (bormi?), 없어요? (yo'qmi?)",
        "계시다 — kattalar (ota-ona, bobo-buvi) uchun hurmat shakli.",
        "명 — kishi sanoq so'zi: 한 명 (1 kishi), 두 명 (2 kishi), 세 명 (3 kishi).",
        "외동 — yagona farzand, 외동딸 — yagona qiz, 외동아들 — yagona o'g'il.",
      ]
    },
    quiz: [
      { question: "'Mening akam bor (erkak aytadi)' koreyschada?", options: ['누나가 있습니다', '오빠가 있습니다', '형이 있습니다', '언니가 있습니다'], correct_index: 2 },
      { question: "'없다' nimani anglatadi?", options: ['bor', "yo'q", 'katta', 'kichik'], correct_index: 1 },
      { question: "Otani hurmat bilan qanday aytiladi?", options: ['아버지가 있습니다', '아버지가 계십니다', '아버지가 있어요', '아버지가 없어요'], correct_index: 1 },
      { question: "'우리 가족은 4명입니다' nimani anglatadi?", options: ['Oilamda 4 xona bor', 'Oilamiz 4 kishidan iborat', 'Men 4-sinfda o\'qiyman', 'Oilamda 4 ta bolam bor'], correct_index: 1 },
      { question: "Qiz farzandni koreyschada nima deyiladi?", options: ['아들', '딸', '남동생', '형'], correct_index: 1 },
      { question: "'형제가 있어요?' nimani so'rayapti?", options: ['Oilangiz bormi?', 'Aka-ukangiz bormi?', 'Do\'stingiz bormi?', 'O\'qituvchingiz bormi?'], correct_index: 1 },
      { question: "Unli bilan tugagan otdan keyin qaysi qo'shimcha keladi?", options: ['이', '가', '은', '도'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 3: Vaqt va sana — 시간과 날짜
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 1, order_in_level: 3,
    title_kr: '시간과 날짜', title_uz: 'Vaqt va sana', is_free: false,
    content: {
      topic: {
        kr: '이 단원에서는 시간과 날짜를 배웁니다. 지금 몇 시예요? 오늘은 월요일이에요. 오늘은 5월 3일이에요. 저는 아침 7시에 일어나요.',
        uz: "Bu darsda vaqt va sana o'rganiladi. Hozir soat nechchi? Bugun dushanba. Bugun 3-may. Men ertalab soat 7 da turaman."
      },
      grammar: {
        explanation: `Vaqt ifodalash — 시 (soat) va 분 (daqiqa).

Koreys tilida vaqt uchun ikkita son tizimi ishlatiladi:
• Soat uchun — sino-koreys sonlar: 1시(il si), 2시(i si), 3시(sam si)...
• Daqiqa uchun — sof koreys sonlar: 한 시(1), 두 시(2), 세 시(3)...

Hafta kunlari (-요일):
월요일(dushanba), 화요일(seshanba), 수요일(chorshanba),
목요일(payshanba), 금요일(juma), 토요일(shanba), 일요일(yakshanba)

Oy va kun: [oy nomi + 월] + [kun + 일]
Misol: 5월 3일 = 3-may

-에 — vaqt ko'rsatuvchi qo'shimcha: 7시에 (soat 7 da)`,
        examples: [
          { kr: '지금 몇 시예요?', uz: 'Hozir soat nechchi?' },
          { kr: '지금 3시 30분이에요.', uz: 'Hozir soat 3:30.' },
          { kr: '오늘은 무슨 요일이에요?', uz: 'Bugun haftaning qaysi kuni?' },
          { kr: '오늘은 수요일이에요.', uz: 'Bugun chorshanba.' },
          { kr: '생일이 몇 월 며칠이에요?', uz: 'Tug\'ilgan kuningiz qaysi oyning nechinchisi?' },
        ]
      },
      vocabulary: [
        { kr: '시간', romanization: 'sigan', uz: 'vaqt' },
        { kr: '시', romanization: 'si', uz: 'soat' },
        { kr: '분', romanization: 'bun', uz: 'daqiqa' },
        { kr: '지금', romanization: 'jigeum', uz: 'hozir' },
        { kr: '아침', romanization: 'achim', uz: 'ertalab' },
        { kr: '점심', romanization: 'jeomsim', uz: 'tushlik payti' },
        { kr: '저녁', romanization: 'jeonyeok', uz: 'kechqurun' },
        { kr: '밤', romanization: 'bam', uz: 'tun' },
        { kr: '오전', romanization: 'ojeon', uz: 'tushgacha (AM)' },
        { kr: '오후', romanization: 'ohu', uz: 'tushdan keyin (PM)' },
        { kr: '오늘', romanization: 'oneul', uz: 'bugun' },
        { kr: '내일', romanization: 'naeil', uz: 'ertaga' },
        { kr: '어제', romanization: 'eoje', uz: 'kecha' },
        { kr: '월요일', romanization: 'woryoil', uz: 'dushanba' },
        { kr: '화요일', romanization: 'hwayoil', uz: 'seshanba' },
        { kr: '수요일', romanization: 'suyoil', uz: 'chorshanba' },
        { kr: '목요일', romanization: 'mogyoil', uz: 'payshanba' },
        { kr: '금요일', romanization: 'geumyoil', uz: 'juma' },
        { kr: '토요일', romanization: 'toyoil', uz: 'shanba' },
        { kr: '일요일', romanization: 'iryoil', uz: 'yakshanba' },
      ],
      examples: [
        { kr: '저는 아침 7시에 일어나요. 8시에 학교에 가요.', uz: "Men ertalab soat 7 da turaman. Soat 8 da maktabga boraman." },
        { kr: '오늘은 금요일이에요. 내일은 토요일이에요.', uz: "Bugun juma. Ertaga shanba." },
        { kr: '제 생일은 3월 15일이에요.', uz: "Mening tug'ilgan kunim 15-martda." },
        { kr: '수업이 오전 9시에 시작해요.', uz: "Dars ertalab soat 9 da boshlanadi." },
        { kr: '어제는 무슨 요일이었어요? 화요일이었어요.', uz: "Kecha haftaning qaysi kuni edi? Seshanba edi." },
      ],
      dialog: [
        { speaker: 'A', kr: '지금 몇 시예요?', uz: 'Hozir soat nechchi?' },
        { speaker: 'B', kr: '지금 오후 2시 30분이에요.', uz: 'Hozir tushdan keyin soat 2:30.' },
        { speaker: 'A', kr: '오늘 무슨 요일이에요?', uz: "Bugun haftaning qaysi kuni?" },
        { speaker: 'B', kr: '오늘 목요일이에요. 내일은 금요일이에요.', uz: "Bugun payshanba. Ertaga juma." },
        { speaker: 'A', kr: '수업이 몇 시에 끝나요?', uz: 'Dars soat nechchida tugaydi?' },
        { speaker: 'B', kr: '오후 5시에 끝나요.', uz: 'Soat 5 da tugaydi.' },
      ],
      notes: [
        "Koreys tilida soat uchun: 한 시(1), 두 시(2), 세 시(3), 네 시(4), 다섯 시(5)...",
        "Daqiqa uchun: 일 분(1), 이 분(2), 삼 분(3)... sino-koreys sonlar.",
        "Vaqt + 에: 7시에 (soat 7 da), 월요일에 (dushanbada).",
        "몇 시예요? = Soat nechchi? / 몇 월 며칠이에요? = Qaysi oyning nechinchisi?",
        "반 = yarim: 2시 반 = soat 2 yarim (2:30).",
      ]
    },
    quiz: [
      { question: "'지금 몇 시예요?' nimani so'rayapti?", options: ['Bugun necha-sanami?', 'Hozir soat nechchi?', 'Tug\'ilgan kuningiz qachon?', 'Dars qachon boshlanadi?'], correct_index: 1 },
      { question: "Juma koreyschada qanday?", options: ['목요일', '토요일', '금요일', '월요일'], correct_index: 2 },
      { question: "'오늘' nimani anglatadi?", options: ['kecha', 'ertaga', 'bugun', 'hozir'], correct_index: 2 },
      { question: "Vaqt ko'rsatuvchi qo'shimcha qaysi?", options: ['은/는', '이/가', '에', '을/를'], correct_index: 2 },
      { question: "'오후' nimani anglatadi?", options: ['ertalab', 'tushgacha', 'tushdan keyin', 'tunda'], correct_index: 2 },
      { question: "2시 반 = ?", options: ['Soat 2:15', 'Soat 2:30', 'Soat 2:45', 'Soat 2:00'], correct_index: 1 },
      { question: "Yakshanba koreyschada?", options: ['토요일', '일요일', '월요일', '수요일'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 4: Joy va joylashuv — 장소와 위치
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 1, order_in_level: 4,
    title_kr: '장소와 위치', title_uz: 'Joy va joylashuv', is_free: false,
    content: {
      topic: {
        kr: '이 단원에서는 장소와 위치에 대해 배웁니다. 학교에 가요. 방에 책상이 있어요. 화장실이 어디에 있어요? 가방이 의자 위에 있어요.',
        uz: "Bu darsda joy va joylashuv o'rganiladi. Maktabga boraman. Xonada stol bor. Hojatxona qayerda? Sumka stulning ustida."
      },
      grammar: {
        explanation: `에 vs 에서 — joy qo'shimchalari.

에 — mavjudlik joyi yoki harakat maqsadi:
• [joy + 에] + 있다/없다: 학교에 있어요 (maktabda bor)
• [joy + 에] + 가다/오다: 학교에 가요 (maktabga boraman)

에서 — harakat joyi:
• [joy + 에서] + fe'l: 학교에서 공부해요 (maktabda o'qiyman)

Joylashuv so'zlari:
위 (usti), 아래/밑 (osti), 앞 (oldi), 뒤 (orqasi),
옆 (yoni), 안 (ichida), 밖 (tashqarida), 사이 (orasida)`,
        examples: [
          { kr: '학교에 가요.', uz: 'Maktabga boraman.' },
          { kr: '도서관에서 공부해요.', uz: "Kutubxonada o'qiyman." },
          { kr: '화장실이 어디에 있어요?', uz: 'Hojatxona qayerda?' },
          { kr: '가방이 책상 위에 있어요.', uz: 'Sumka stolning ustida.' },
          { kr: '편의점이 학교 앞에 있어요.', uz: "Mini market maktabning oldida." },
        ]
      },
      vocabulary: [
        { kr: '장소', romanization: 'jangso', uz: 'joy' },
        { kr: '학교', romanization: 'hakgyo', uz: 'maktab' },
        { kr: '회사', romanization: 'hoesa', uz: 'ishxona' },
        { kr: '집', romanization: 'jip', uz: 'uy' },
        { kr: '방', romanization: 'bang', uz: 'xona' },
        { kr: '교실', romanization: 'gyosil', uz: 'sinfxona' },
        { kr: '도서관', romanization: 'doseogwan', uz: 'kutubxona' },
        { kr: '식당', romanization: 'sikdang', uz: 'restoran, oshxona' },
        { kr: '병원', romanization: 'byeongwon', uz: 'shifoxona' },
        { kr: '약국', romanization: 'yakguk', uz: 'dorixona' },
        { kr: '은행', romanization: 'eunhaeng', uz: 'bank' },
        { kr: '위', romanization: 'wi', uz: 'usti, ustida' },
        { kr: '아래', romanization: 'arae', uz: 'osti, ostida' },
        { kr: '앞', romanization: 'ap', uz: 'oldi, oldida' },
        { kr: '뒤', romanization: 'dwi', uz: 'orqasi, orqasida' },
        { kr: '옆', romanization: 'yeop', uz: 'yoni, yonida' },
        { kr: '안', romanization: 'an', uz: 'ichida' },
        { kr: '밖', romanization: 'bak', uz: 'tashqarida' },
        { kr: '어디', romanization: 'eodi', uz: 'qayerda' },
        { kr: '여기', romanization: 'yeogi', uz: 'bu yerda' },
      ],
      examples: [
        { kr: '저는 학교에 가요. 학교에서 한국어를 공부해요.', uz: "Men maktabga boraman. Maktabda koreys tilini o'rganaman." },
        { kr: '책이 책상 위에 있어요. 가방은 의자 아래에 있어요.', uz: "Kitob stolning ustida. Sumka stulning ostida." },
        { kr: '화장실이 어디에 있어요? 저기 왼쪽에 있어요.', uz: "Hojatxona qayerda? U yerda, chap tomonda." },
        { kr: '편의점이 학교 앞에 있어요.', uz: "Mini market maktabning oldida." },
        { kr: '집에서 학교까지 버스로 30분이에요.', uz: "Uydan maktabgacha avtobus bilan 30 daqiqa." },
      ],
      dialog: [
        { speaker: 'A', kr: '실례합니다. 은행이 어디에 있어요?', uz: 'Kechirasiz. Bank qayerda?' },
        { speaker: 'B', kr: '저기 편의점 옆에 있어요.', uz: "U yerda, mini marketning yonida." },
        { speaker: 'A', kr: '감사합니다. 도서관도 근처에 있어요?', uz: 'Rahmat. Kutubxona ham yaqinda bormi?' },
        { speaker: 'B', kr: '네, 학교 안에 있어요.', uz: "Ha, maktab ichida." },
        { speaker: 'A', kr: '학교가 여기서 멀어요?', uz: 'Maktab bu yerdan uzoqmi?' },
        { speaker: 'B', kr: '아니요, 가까워요. 걸어서 5분이에요.', uz: "Yo'q, yaqin. Piyoda 5 daqiqa." },
      ],
      notes: [
        "에 — borish yoki mavjudlik uchun: 학교에 가요 / 학교에 있어요.",
        "에서 — qayerda harakat qilish: 학교에서 공부해요.",
        "어디 = qayerda: 어디에 있어요? (qayerda?), 어디에서 왔어요? (qayerdan keldingiz?)",
        "여기(bu yerda), 거기(u yerda, yaqin), 저기(u yerda, uzoq).",
        "까지 — gacha: 학교까지 (maktabgacha).",
      ]
    },
    quiz: [
      { question: "'어디에 있어요?' nimani so'rayapti?", options: ['Nechchi kishi?', 'Qayerda?', 'Nima qilayapsiz?', 'Qachon?'], correct_index: 1 },
      { question: "Qayerda harakat qilishni ifodalovchi qo'shimcha?", options: ['에', '에서', '이/가', '을/를'], correct_index: 1 },
      { question: "'가방이 책상 위에 있어요' nimani anglatadi?", options: ['Sumka stulning ostida', 'Sumka stolning ustida', 'Sumka eshikning oldida', 'Sumka doskaning yonida'], correct_index: 1 },
      { question: "Kutubxona koreyschada qanday?", options: ['병원', '약국', '도서관', '식당'], correct_index: 2 },
      { question: "'앞' nimani anglatadi?", options: ['orqasi', 'yoni', 'usti', 'oldi'], correct_index: 3 },
      { question: "'집에서 학교까지' nimani anglatadi?", options: ['Maktabda uyga', 'Uydan maktabgacha', 'Uy yonida maktab', 'Maktab va uy'], correct_index: 1 },
      { question: "Shifoxona koreyschada?", options: ['은행', '약국', '병원', '회사'], correct_index: 2 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 5: Ovqat — 음식
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 1, order_in_level: 5,
    title_kr: '음식', title_uz: 'Ovqat', is_free: false,
    content: {
      topic: {
        kr: '이 단원에서는 음식에 대해 배웁니다. 저는 밥을 먹어요. 물을 마셔요. 김치를 좋아해요. 비빔밥을 먹고 싶어요. 커피를 마시지 않아요.',
        uz: "Bu darsda ovqat mavzusi o'rganiladi. Men guruch ovqat yeyman. Suv ichaman. Kimchini yoqtiraman. Bibimbap yemoqchi edim. Qahva ichmayman."
      },
      grammar: {
        explanation: `을/를 — to'ldiruvchi qo'shimchasi (object marker).

• Undosh bilan tugagan so'zdan keyin: 을 (밥을, 김치를)
• Unli bilan tugagan so'zdan keyin: 를 (물을, 차를)

좋아하다 / 싫어하다 — yoqtirmoq / yoqtirmaslik:
저는 김치를 좋아해요. (Men kimchini yoqtiraman.)
저는 커피를 싫어해요. (Men qahvani yoqtirmayman.)

-고 싶다 — ...moqchi, ...istaydi:
비빔밥을 먹고 싶어요. (Bibimbap yemoqchiman.)

안 / -지 않다 — inkor:
안 먹어요 = 먹지 않아요 (yemayman)`,
        examples: [
          { kr: '저는 밥을 먹어요.', uz: 'Men ovqat yeyaman.' },
          { kr: '물을 마셔요.', uz: 'Suv ichaman.' },
          { kr: '저는 김치를 좋아해요.', uz: 'Men kimchini yoqtiraman.' },
          { kr: '비빔밥을 먹고 싶어요.', uz: 'Bibimbap yemoqchiman.' },
          { kr: '커피를 마시지 않아요.', uz: 'Qahva ichmayman.' },
        ]
      },
      vocabulary: [
        { kr: '음식', romanization: 'eumsik', uz: 'ovqat' },
        { kr: '밥', romanization: 'bap', uz: 'guruch ovqat, taom' },
        { kr: '빵', romanization: 'ppang', uz: 'non' },
        { kr: '국', romanization: 'guk', uz: "sho'rva" },
        { kr: '김치', romanization: 'gimchi', uz: 'kimchi' },
        { kr: '비빔밥', romanization: 'bibimbap', uz: 'bibimbap' },
        { kr: '불고기', romanization: 'bulgogi', uz: 'bulgogi (qovurilgan go\'sht)' },
        { kr: '김밥', romanization: 'gimbap', uz: 'kimbap (suvsiz sushi)' },
        { kr: '라면', romanization: 'ramyeon', uz: 'ramen (lahm bozor)' },
        { kr: '물', romanization: 'mul', uz: 'suv' },
        { kr: '주스', romanization: 'juseu', uz: 'sharbat' },
        { kr: '커피', romanization: 'keopi', uz: 'qahva' },
        { kr: '차', romanization: 'cha', uz: 'choy' },
        { kr: '먹다', romanization: 'meokda', uz: 'yemoq' },
        { kr: '마시다', romanization: 'masida', uz: 'ichmoq' },
        { kr: '좋아하다', romanization: 'joahada', uz: 'yoqtirmoq' },
        { kr: '싫어하다', romanization: 'sireohada', uz: 'yoqtirmaslik' },
        { kr: '맛있다', romanization: 'masitda', uz: 'mazali' },
        { kr: '맛없다', romanization: 'maseobda', uz: 'mazasiz' },
        { kr: '주문하다', romanization: 'jumunhada', uz: 'buyurtma bermoq' },
      ],
      examples: [
        { kr: '저는 비빔밥을 좋아해요. 매운 음식도 좋아해요.', uz: "Men bibimbapni yoqtiraman. Achchiq ovqatni ham yoqtiraman." },
        { kr: '이 식당 김치찌개가 정말 맛있어요.', uz: "Bu restoranning kimchi sho'rvasi juda mazali." },
        { kr: '뭐 드시겠어요? 비빔밥 주세요.', uz: "Nima buyurtma qilasiz? Bibimbap bering." },
        { kr: '저는 고기를 안 먹어요. 채소를 좋아해요.', uz: "Men go'sht yemayman. Sabzavotlarni yoqtiraman." },
        { kr: '아침에 빵과 커피를 먹어요.', uz: "Ertalab non va qahva ichaman." },
      ],
      dialog: [
        { speaker: 'A', kr: '뭐 드시겠어요?', uz: 'Nima buyurtma qilasiz?' },
        { speaker: 'B', kr: '비빔밥 하나 주세요. 그리고 물도 주세요.', uz: "Bir dona bibimbap bering. Va suv ham bering." },
        { speaker: 'A', kr: '맵게 해드릴까요?', uz: "Achchiq qilaymi?" },
        { speaker: 'B', kr: '조금만 맵게 해주세요.', uz: "Biroz achchiq qiling." },
        { speaker: 'A', kr: '음식이 어때요? 맛있어요?', uz: "Ovqat qanday? Mazalimi?" },
        { speaker: 'B', kr: '네, 정말 맛있어요!', uz: "Ha, juda mazali!" },
      ],
      notes: [
        "을/를: undosh + 을 (밥을, 김치를), unli + 를 (물을, 주스를).",
        "주세요 = bering (do'stona buyurtma): 비빔밥 주세요 = bibimbap bering.",
        "-고 싶어요 = ...moqchiman: 먹고 싶어요 (yemoqchiman), 마시고 싶어요 (ichmoqchiman).",
        "맵다 = achchiq, 달다 = shirin, 짜다 = sho'r, 쓰다 = achchiq (ta'm).",
        "하나(1), 둘(2), 셋(3)... — buyurtmada sanoq uchun: 비빔밥 하나 주세요.",
      ]
    },
    quiz: [
      { question: "'저는 김치를 좋아해요' nimani anglatadi?", options: ['Men kimchini yemayman', 'Men kimchini yoqtiraman', 'Kimchi mazali', 'Men kimchi yasayman'], correct_index: 1 },
      { question: "Unli bilan tugagan so'zdan keyin qaysi qo'shimcha keladi?", options: ['을', '를', '이', '가'], correct_index: 1 },
      { question: "'맛있다' nimani anglatadi?", options: ['mazasiz', 'achchiq', 'mazali', 'shirin'], correct_index: 2 },
      { question: "'물을 마셔요' nimani anglatadi?", options: ['Suv ichaman', 'Suv yeyaman', 'Suv sotaman', 'Suv olib boraman'], correct_index: 0 },
      { question: "Qahva koreyschada qanday?", options: ['주스', '차', '물', '커피'], correct_index: 3 },
      { question: "'-고 싶어요' nimani ifodalaydi?", options: ['...ni yoqtiraman', '...moqchiman', '...mayman', '...dim'], correct_index: 1 },
      { question: "'주세요' nimani anglatadi?", options: ['rahmat', 'kechirasiz', 'bering', 'qancha?'], correct_index: 2 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 6: Xarid qilish — 쇼핑
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 1, order_in_level: 6,
    title_kr: '쇼핑', title_uz: 'Xarid qilish', is_free: false,
    content: {
      topic: {
        kr: '이 단원에서는 쇼핑에 대해 배웁니다. 이거 얼마예요? 이거 주세요. 검은색 있어요? 큰 사이즈 있어요? 좀 비싸요.',
        uz: "Bu darsda xarid qilish o'rganiladi. Bu necha pul? Buni bering. Qora rang bormi? Katta o'lcham bormi? Biroz qimmat."
      },
      grammar: {
        explanation: `얼마 — qancha narx? Narx so'rash.

이거 얼마예요? = Bu necha pul?
[narx] + 원이에요 = [...] so'm

Koreys sonlari (narx uchun):
천(1000), 이천(2000), 만(10000), 십만(100000)

이/그/저 — ko'rsatish olmoshlari:
이거 (bu narsa, yaqin), 그거 (o'sha narsa), 저거 (u narsa, uzoq)

-아/어 주세요 — qilib bering:
깎아 주세요 (arzonlatib bering)
보여 주세요 (ko'rsatib bering)

Ranglar: 빨간색(qizil), 파란색(ko'k), 노란색(sariq),
검은색(qora), 흰색(oq), 초록색(yashil)`,
        examples: [
          { kr: '이거 얼마예요?', uz: 'Bu necha pul?' },
          { kr: '이 옷 검은색 있어요?', uz: "Bu kiyimning qora rangi bormi?" },
          { kr: '큰 사이즈로 주세요.', uz: "Katta o'lchamda bering." },
          { kr: '좀 깎아 주세요.', uz: 'Biroz arzonlatib bering.' },
          { kr: '카드로 계산할게요.', uz: 'Karta bilan to\'layman.' },
        ]
      },
      vocabulary: [
        { kr: '쇼핑', romanization: 'syoping', uz: 'xarid qilish' },
        { kr: '가게', romanization: 'gage', uz: "do'kon" },
        { kr: '시장', romanization: 'sijang', uz: 'bozor' },
        { kr: '마트', romanization: 'mateu', uz: 'supermarket' },
        { kr: '물건', romanization: 'mulgeon', uz: 'buyum, narsa' },
        { kr: '가격', romanization: 'gagyeok', uz: 'narx' },
        { kr: '얼마', romanization: 'eolma', uz: 'qancha' },
        { kr: '원', romanization: 'won', uz: 'won (koreya puli)' },
        { kr: '비싸다', romanization: 'bissada', uz: 'qimmat' },
        { kr: '싸다', romanization: 'ssada', uz: 'arzon' },
        { kr: '크다', romanization: 'keuda', uz: 'katta' },
        { kr: '작다', romanization: 'jakda', uz: 'kichik' },
        { kr: '색깔', romanization: 'saekgal', uz: 'rang' },
        { kr: '검은색', romanization: 'geomeunsaek', uz: 'qora rang' },
        { kr: '흰색', romanization: 'huinsaek', uz: 'oq rang' },
        { kr: '빨간색', romanization: 'ppalgangsaek', uz: 'qizil rang' },
        { kr: '파란색', romanization: 'paransaek', uz: "ko'k rang" },
        { kr: '사이즈', romanization: 'saijeu', uz: "o'lcham" },
        { kr: '계산', romanization: 'gyesan', uz: "to'lov, hisob" },
        { kr: '영수증', romanization: 'yeongsujeung', uz: 'chek, kvitansiya' },
      ],
      examples: [
        { kr: '이 가방 얼마예요? 삼만 원이에요.', uz: "Bu sumka necha pul? 30,000 won." },
        { kr: '다른 색깔 있어요? 파란색으로 주세요.', uz: "Boshqa rang bormi? Ko'k rangda bering." },
        { kr: '조금 비싸요. 좀 깎아 주세요.', uz: "Biroz qimmat. Arzonlatib bering." },
        { kr: '이거 입어봐도 돼요? 네, 피팅룸은 저쪽이에요.', uz: "Buni kiyib ko'rsam bo'ladimi? Ha, kiyinish xonasi u tomonda." },
        { kr: '현금이에요, 카드예요? 카드로 할게요.', uz: "Naqd pulmi yoki karta? Karta bilan." },
      ],
      dialog: [
        { speaker: 'A', kr: '어서 오세요! 뭘 찾으세요?', uz: 'Xush kelibsiz! Nima qidirayapsiz?' },
        { speaker: 'B', kr: '이 티셔츠 얼마예요?', uz: 'Bu futbolka necha pul?' },
        { speaker: 'A', kr: '이만 오천 원이에요.', uz: '25,000 won.' },
        { speaker: 'B', kr: '좀 비싸요. 깎아 주세요.', uz: 'Biroz qimmat. Arzonlatib bering.' },
        { speaker: 'A', kr: '이만 원에 드릴게요.', uz: '20,000 vonga beraman.' },
        { speaker: 'B', kr: '그럼 이거 주세요. 카드 돼요?', uz: "Undoq bo'lsa, buni bering. Karta o'tadi?" },
      ],
      notes: [
        "원 — Koreya puli: 천 원 (1,000 won), 만 원 (10,000 won).",
        "이거/그거/저거: yaqin/o'rta/uzoq masofadagi narsalar.",
        "깎아 주세요 = arzonlatib bering (savdolashish).",
        "Ranglar: 빨간색(qizil), 파란색(ko'k), 노란색(sariq), 초록색(yashil), 검은색(qora), 흰색(oq).",
        "현금(naqd pul) vs 카드(karta) — to'lov usullari.",
      ]
    },
    quiz: [
      { question: "'이거 얼마예요?' nimani so'rayapti?", options: ["Bu qanday?", "Bu qayerda?", "Bu necha pul?", "Bu nima?"], correct_index: 2 },
      { question: "'비싸다' nimani anglatadi?", options: ['arzon', 'qimmat', 'katta', 'kichik'], correct_index: 1 },
      { question: "Qora rang koreyschada?", options: ['흰색', '빨간색', '검은색', '파란색'], correct_index: 2 },
      { question: "'좀 깎아 주세요' nimani anglatadi?", options: ['Ko\'proq bering', 'Biroz arzonlatib bering', 'Karta bilan to\'layman', 'Boshqa rang bering'], correct_index: 1 },
      { question: "10,000 won koreyschada?", options: ['천 원', '십만 원', '만 원', '백 원'], correct_index: 2 },
      { question: "'싸다' nimani anglatadi?", options: ['qimmat', 'arzon', 'katta', 'yangi'], correct_index: 1 },
      { question: "'현금' nimani anglatadi?", options: ['karta', 'chek', 'naqd pul', 'bank'], correct_index: 2 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 7: Kun tartibi — 하루 일과
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 1, order_in_level: 7,
    title_kr: '하루 일과', title_uz: 'Kun tartibi', is_free: false,
    content: {
      topic: {
        kr: '이 단원에서는 하루 일과에 대해 배웁니다. 저는 아침 7시에 일어납니다. 회사에서 일합니다. 저녁에 집에 갑니다. 밤 11시에 잡니다.',
        uz: "Bu darsda kun tartibi o'rganiladi. Men ertalab soat 7 da turaman. Ishxonada ishlayaman. Kechqurun uyga boraman. Kechasi soat 11 da uxlayman."
      },
      grammar: {
        explanation: `합니다체 — rasmiy va hurmatli nutq shakli.

Asosiy shakllar:
• fe'l + 합니다 (tasdiq): 먹습니다 (yeyapman)
• fe'l + 합니까? (so'roq): 먹습니까? (yeyapsizmi?)

Ertalabdan kechgacha kun tartibi:
일어나다(turmoq) → 씻다(yuvinmoq) → 먹다(yemoq) →
가다(bormoq) → 일하다(ishlamoq) → 오다(kelmoq) → 자다(uxlamoq)

-부터 -까지 — ...dan ...gacha:
아침부터 저녁까지 (ertalabdan kechgacha)
9시부터 6시까지 (9 dan 6 gacha)`,
        examples: [
          { kr: '저는 아침 7시에 일어납니다.', uz: 'Men ertalab soat 7 da turaman.' },
          { kr: '9시부터 6시까지 일합니다.', uz: 'Soat 9 dan 6 gacha ishlayman.' },
          { kr: '저녁에 운동을 합니다.', uz: 'Kechqurun sport qilaman.' },
          { kr: '밤 11시에 잠을 잡니다.', uz: 'Kechasi soat 11 da uxlayman.' },
          { kr: '점심은 회사 식당에서 먹습니다.', uz: 'Tushlikni ishxona oshxonasida yeyman.' },
        ]
      },
      vocabulary: [
        { kr: '일어나다', romanization: 'ireonada', uz: 'turmoq (uyqudan)' },
        { kr: '씻다', romanization: 'ssitda', uz: 'yuvinmoq' },
        { kr: '먹다', romanization: 'meokda', uz: 'yemoq' },
        { kr: '가다', romanization: 'gada', uz: 'bormoq' },
        { kr: '오다', romanization: 'oda', uz: 'kelmoq' },
        { kr: '일하다', romanization: 'ilhada', uz: 'ishlamoq' },
        { kr: '공부하다', romanization: 'gongbuhada', uz: "o'rganmoq, o'qimoq" },
        { kr: '운동하다', romanization: 'undonghada', uz: 'sport qilmoq' },
        { kr: '자다', romanization: 'jada', uz: 'uxlamoq' },
        { kr: '쉬다', romanization: 'swida', uz: 'dam olmoq' },
        { kr: '아침', romanization: 'achim', uz: 'ertalab / nonushta' },
        { kr: '점심', romanization: 'jeomsim', uz: 'tushlik' },
        { kr: '저녁', romanization: 'jeonyeok', uz: 'kechki ovqat / kechqurun' },
        { kr: '보통', romanization: 'botong', uz: 'odatda, odatiy' },
        { kr: '항상', romanization: 'hangsang', uz: 'doimo' },
        { kr: '가끔', romanization: 'gakkeum', uz: "ba'zan" },
        { kr: '먼저', romanization: 'meonjeo', uz: 'avval, birinchi' },
        { kr: '그 다음에', romanization: 'geu daeume', uz: 'keyin, undan so\'ng' },
        { kr: '마지막으로', romanization: 'majimageuro', uz: 'oxirida, eng so\'ngida' },
        { kr: '출근하다', romanization: 'chulgeunhada', uz: 'ishga bormoq' },
      ],
      examples: [
        { kr: '저는 보통 아침 6시 30분에 일어납니다. 먼저 씻고 아침을 먹습니다.', uz: "Men odatda ertalab soat 6:30 da turaman. Avval yuvinaman va nonushta qilaman." },
        { kr: '9시부터 6시까지 회사에서 일합니다. 점심은 12시에 먹습니다.', uz: "Soat 9 dan 6 gacha ishxonada ishlayman. Tushlikni soat 12 da yeyman." },
        { kr: '저녁에 집에 와서 운동을 합니다. 그 다음에 저녁을 먹습니다.', uz: "Kechqurun uyga kelib sport qilaman. Keyin kechki ovqat yeyman." },
        { kr: '밤에 보통 책을 읽습니다. 11시에 잠을 잡니다.', uz: "Kechasi odatda kitob o'qiyman. Soat 11 da uxlayman." },
        { kr: '주말에는 늦게 일어나요. 가끔 친구를 만나요.', uz: "Dam olish kunlari kech turaman. Ba'zan do'stim bilan uchrashamam." },
      ],
      dialog: [
        { speaker: 'A', kr: '보통 몇 시에 일어나요?', uz: 'Odatda soat nechchida turasiz?' },
        { speaker: 'B', kr: '아침 7시에 일어나요. 씻고 아침을 먹어요.', uz: 'Soat 7 da turaman. Yuvinib nonushta qilaman.' },
        { speaker: 'A', kr: '회사는 몇 시부터예요?', uz: 'Ish soat nechchidan boshlanadi?' },
        { speaker: 'B', kr: '9시부터 6시까지예요. 점심은 1시간 있어요.', uz: '9 dan 6 gacha. Tushlik uchun 1 soat bor.' },
        { speaker: 'A', kr: '저녁에는 뭐 해요?', uz: 'Kechqurun nima qilasiz?' },
        { speaker: 'B', kr: '운동하고 저녁 먹고 텔레비전 봐요. 11시쯤 자요.', uz: 'Sport qilaman, kechki ovqat yeyman va televizor ko\'raman. Taxminan 11 da uxlayman.' },
      ],
      notes: [
        "합니다체 — eng rasmiy nutq shakli: 먹습니다, 갑니다, 합니다.",
        "-부터 -까지: 9시부터 6시까지 (9 dan 6 gacha), 월요일부터 금요일까지.",
        "먼저(avval) → 그 다음에(keyin) → 마지막으로(oxirida) — ketma-ketlik.",
        "보통(odatda), 항상(doimo), 가끔(ba'zan), 자주(tez-tez).",
        "쯤 — taxminan: 11시쯤 (taxminan soat 11 da).",
      ]
    },
    quiz: [
      { question: "'일어나다' nimani anglatadi?", options: ['bormoq', 'uxlamoq', 'turmoq (uyqudan)', 'yemoq'], correct_index: 2 },
      { question: "'9시부터 6시까지' nimani anglatadi?", options: ['9 dan keyin 6 soat', 'Soat 9 va 6', '9 dan 6 gacha', '6 dan 9 gacha'], correct_index: 2 },
      { question: "'보통' nimani anglatadi?", options: ['doimo', "ba'zan", 'odatda', 'hech qachon'], correct_index: 2 },
      { question: "Kun tartibida birinchi nima keladi?", options: ['자다', '일하다', '일어나다', '먹다'], correct_index: 2 },
      { question: "'쉬다' nimani anglatadi?", options: ['ishlamoq', 'dam olmoq', 'o\'rganmoq', 'bormoq'], correct_index: 1 },
      { question: "'가끔' nimani anglatadi?", options: ['doimo', 'odatda', "ba'zan", 'hech qachon'], correct_index: 2 },
      { question: "합니다체 — qaysi nutq uchun ishlatiladi?", options: ['norasmiy', 'rasmiy va hurmatli', 'do\'stona', 'yozma emas'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 8: Ob-havo va fasllar — 날씨와 계절
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 1, order_in_level: 8,
    title_kr: '날씨와 계절', title_uz: 'Ob-havo va fasllar', is_free: false,
    content: {
      topic: {
        kr: '이 단원에서는 날씨와 계절에 대해 배웁니다. 오늘 날씨가 어때요? 오늘은 더워요. 겨울은 추워요. 저는 봄을 좋아해요. 비를 좋아하지 않아요.',
        uz: "Bu darsda ob-havo va fasllar o'rganiladi. Bugun ob-havo qanday? Bugun issiq. Qish sovuq. Men bahorni yoqtiraman. Yomg'irni yoqtirmayman."
      },
      grammar: {
        explanation: `Sifat fe'llari — ob-havo va holat ifodalash.

Ob-havo sifat fe'llari:
덥다(issiq) → 더워요, 추워요 → 춥다(sovuq)
따뜻하다(iliq) → 따뜻해요, 시원하다(salqin) → 시원해요

-고 연결 — ikki xususiyatni birlashtirish:
오늘은 춥고 흐려요. (Bugun sovuq va bulutli.)

날씨가 어때요? — ob-havo qanday?
어떻다 → 어때요 (qanday?)

계절 — fasllar:
봄(bahor), 여름(yoz), 가을(kuz), 겨울(qish)`,
        examples: [
          { kr: '오늘 날씨가 어때요?', uz: 'Bugun ob-havo qanday?' },
          { kr: '오늘은 맑고 따뜻해요.', uz: 'Bugun ochiq va iliq.' },
          { kr: '여름은 덥고 습해요.', uz: 'Yoz issiq va nam.' },
          { kr: '저는 시원한 가을을 좋아해요.', uz: 'Men salqin kuzni yoqtiraman.' },
          { kr: '내일 비가 올 것 같아요.', uz: "Ertaga yomg'ir yog'ishi mumkin." },
        ]
      },
      vocabulary: [
        { kr: '날씨', romanization: 'nalssi', uz: 'ob-havo' },
        { kr: '계절', romanization: 'gyejeol', uz: 'fasl' },
        { kr: '봄', romanization: 'bom', uz: 'bahor' },
        { kr: '여름', romanization: 'yeoreum', uz: 'yoz' },
        { kr: '가을', romanization: 'gaeul', uz: 'kuz' },
        { kr: '겨울', romanization: 'gyeoul', uz: 'qish' },
        { kr: '덥다', romanization: 'deopda', uz: 'issiq' },
        { kr: '춥다', romanization: 'chupda', uz: 'sovuq' },
        { kr: '따뜻하다', romanization: 'ttatteutada', uz: 'iliq' },
        { kr: '시원하다', romanization: 'siwonhada', uz: 'salqin' },
        { kr: '맑다', romanization: 'makda', uz: 'ochiq, tiniq' },
        { kr: '흐리다', romanization: 'heurida', uz: 'bulutli' },
        { kr: '비', romanization: 'bi', uz: "yomg'ir" },
        { kr: '눈', romanization: 'nun', uz: 'qor' },
        { kr: '바람', romanization: 'baram', uz: 'shamol' },
        { kr: '온도', romanization: 'ondo', uz: 'temperatura' },
        { kr: '습하다', romanization: 'seupada', uz: 'nam, namlik' },
        { kr: '건조하다', romanization: 'geonjohada', uz: 'quruq' },
        { kr: '기온', romanization: 'gion', uz: 'havo harorati' },
        { kr: '우산', romanization: 'usan', uz: 'soyabon' },
      ],
      examples: [
        { kr: '오늘 날씨가 맑고 따뜻해요. 산책하기 좋은 날이에요.', uz: "Bugun ob-havo ochiq va iliq. Sayr qilish uchun yaxshi kun." },
        { kr: '한국의 여름은 덥고 습해요. 비도 많이 와요.', uz: "Koreyadagi yoz issiq va nam. Yomg'ir ham ko'p yog'adi." },
        { kr: '저는 봄을 제일 좋아해요. 꽃이 피어서 예뻐요.', uz: "Men bahornni eng yoqtiraman. Gullar ochilgani uchun chiroyli." },
        { kr: '오늘 기온이 영하 10도예요. 정말 추워요.', uz: "Bugun harorat minus 10 daraja. Juda sovuq." },
        { kr: '내일 비가 온다고 해요. 우산을 가져가세요.', uz: "Ertaga yomg'ir yog'arkan. Soyabon olib boring." },
      ],
      dialog: [
        { speaker: 'A', kr: '오늘 날씨가 어때요?', uz: 'Bugun ob-havo qanday?' },
        { speaker: 'B', kr: '조금 추워요. 바람도 많이 불어요.', uz: 'Biroz sovuq. Shamol ham ko\'p esyapti.' },
        { speaker: 'A', kr: '한국 겨울은 많이 추워요?', uz: 'Koreya qishi juda sovuqmi?' },
        { speaker: 'B', kr: '네, 많이 춥고 건조해요. 영하로 내려가기도 해요.', uz: "Ha, juda sovuq va quruq. Minus darajaga tushishi ham mumkin." },
        { speaker: 'A', kr: '어느 계절을 좋아해요?', uz: 'Qaysi faslni yoqtirasiz?' },
        { speaker: 'B', kr: '저는 가을을 좋아해요. 시원하고 단풍이 예뻐요.', uz: 'Men kuzni yoqtiraman. Salqin va barglar chiroyli.' },
      ],
      notes: [
        "덥다→더워요, 춥다→추워요 — ㅂ o'zgarishi (biopsonos).",
        "-고: ikki xususiyatni birlashtirish: 맑고 따뜻해요 (ochiq va iliq).",
        "Harorat: 영상(musbat), 영하(manfiy): 영상 10도 (musbat 10 daraja).",
        "비가 오다 = yomg'ir yog'moq, 눈이 오다 = qor yog'moq.",
        "제일 / 가장 = eng: 제일 좋아해요 (eng yoqtiraman).",
      ]
    },
    quiz: [
      { question: "'날씨가 어때요?' nimani so'rayapti?", options: ['Fasl nomi?', 'Ob-havo qanday?', 'Harorat nechchi?', 'Shamol esyaptimi?'], correct_index: 1 },
      { question: "'춥다' nimani anglatadi?", options: ['issiq', 'iliq', 'sovuq', 'salqin'], correct_index: 2 },
      { question: "Bahor koreyschada qanday?", options: ['여름', '가을', '겨울', '봄'], correct_index: 3 },
      { question: "'맑다' nimani anglatadi?", options: ['bulutli', 'yomg\'irli', 'ochiq, tiniq', 'shamollik'], correct_index: 2 },
      { question: "'비가 와요' nimani anglatadi?", options: ["Qor yog'yapti", "Yomg'ir yog'yapti", 'Shamol esyapti', 'Issiq'], correct_index: 1 },
      { question: "Yoz koreyschada?", options: ['봄', '여름', '가을', '겨울'], correct_index: 1 },
      { question: "'따뜻하다' nimani anglatadi?", options: ['issiq', 'sovuq', 'iliq', 'salqin'], correct_index: 2 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 9: Transport — 교통
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 1, order_in_level: 9,
    title_kr: '교통', title_uz: 'Transport', is_free: false,
    content: {
      topic: {
        kr: '이 단원에서는 교통에 대해 배웁니다. 버스로 가요. 지하철을 타요. 학교까지 걸어가요. 택시를 타고 집에 가요. 어떻게 가요?',
        uz: "Bu darsda transport o'rganiladi. Avtobus bilan boraman. Metroga chiqaman. Maktabgacha piyoda boraman. Taksiga chiqib uyga boraman. Qanday borasan?"
      },
      grammar: {
        explanation: `(으)로 — transport vositasi bilan qo'shimchasi.

• Undosh bilan tugagan so'zdan keyin: 으로 (버스로, 택시로)
• Unli yoki ㄹ bilan tugagan so'zdan keyin: 로 (지하철로, 자전거로)

타다 — chiqmoq (transportga):
버스를 타요 (avtobusga chiqaman)
지하철을 타요 (metroga chiqaman)

내리다 — tushmoq:
버스에서 내려요 (avtobusdan tushaman)

-아/어서 — sabab yoki ketma-ketlik:
지하철을 타고 가요. = Metro bilan boraman.
(tago = ... bilan borib)

어떻게 — qanday: 어떻게 가요? (qanday borasan?)`,
        examples: [
          { kr: '버스로 학교에 가요.', uz: 'Avtobus bilan maktabga boraman.' },
          { kr: '지하철을 타요. 3호선을 타요.', uz: '3-liniya metrosiga chiqaman.' },
          { kr: '어떻게 가요? 걸어서 가요.', uz: 'Qanday borasan? Piyoda boraman.' },
          { kr: '집에서 회사까지 30분 걸려요.', uz: 'Uydan ishxonagacha 30 daqiqa ketadi.' },
          { kr: '다음 정류장에서 내리세요.', uz: 'Keyingi bekatda tushing.' },
        ]
      },
      vocabulary: [
        { kr: '교통', romanization: 'gyotong', uz: 'transport' },
        { kr: '버스', romanization: 'beoseu', uz: 'avtobus' },
        { kr: '지하철', romanization: 'jihacheol', uz: 'metro' },
        { kr: '택시', romanization: 'taeksi', uz: 'taksi' },
        { kr: '기차', romanization: 'gicha', uz: 'poyezd' },
        { kr: '비행기', romanization: 'bihaenggi', uz: 'samolyot' },
        { kr: '자전거', romanization: 'jajeongeo', uz: 'velosiped' },
        { kr: '자동차', romanization: 'jadongcha', uz: 'avtomobil' },
        { kr: '타다', romanization: 'tada', uz: 'chiqmoq (transportga)' },
        { kr: '내리다', romanization: 'naerida', uz: 'tushmoq (transportdan)' },
        { kr: '걷다', romanization: 'geotda', uz: 'piyoda yurmoq' },
        { kr: '걸어서', romanization: 'georeoseo', uz: 'piyoda (yurib)' },
        { kr: '정류장', romanization: 'jeongnyujang', uz: 'avtobus bekati' },
        { kr: '역', romanization: 'yeok', uz: 'metro/poyezd stantsiyasi' },
        { kr: '어떻게', romanization: 'eotteoke', uz: 'qanday' },
        { kr: '얼마나', romanization: 'eolmana', uz: 'qancha vaqt' },
        { kr: '걸리다', romanization: 'geollida', uz: 'ketmoq (vaqt)' },
        { kr: '갈아타다', romanization: 'garatada', uz: 'almashtirmoq (transport)' },
        { kr: '직진', romanization: 'jikjin', uz: "to'g'ri boring" },
        { kr: '환승', romanization: 'hwanseung', uz: 'transfer, almashtirish' },
      ],
      examples: [
        { kr: '저는 매일 지하철로 회사에 가요. 2호선을 타요.', uz: "Men har kuni metro bilan ishxonaga boraman. 2-liniyaga chiqaman." },
        { kr: '집에서 지하철역까지 걸어서 10분이에요.', uz: "Uydan metro stantsiyasigacha piyoda 10 daqiqa." },
        { kr: '어떻게 가요? 버스 타고 가다가 내려서 걸어가요.', uz: "Qanday borasan? Avtobus bilan borib, tushib piyoda boraman." },
        { kr: '서울역에서 부산까지 KTX로 2시간 반 걸려요.', uz: "Seul stantsiyasidan Busangacha KTX bilan 2,5 soat ketadi." },
        { kr: '가: 공항에 어떻게 가요? 나: 공항철도를 타세요.', uz: "A: Aeroportga qanday boraman? B: Aeroport poyezdiga chiqing." },
      ],
      dialog: [
        { speaker: 'A', kr: '실례합니다. 시청역에 어떻게 가요?', uz: "Kechirasiz. Shahar hokimiyati stantsiyasiga qanday boraman?" },
        { speaker: 'B', kr: '2호선 지하철을 타세요. 세 정거장이에요.', uz: "2-liniya metrosiga chiqing. Uch bekat." },
        { speaker: 'A', kr: '여기서 멀어요?', uz: 'Bu yerdan uzoqmi?' },
        { speaker: 'B', kr: '아니요, 10분쯤 걸려요.', uz: "Yo'q, taxminan 10 daqiqa." },
        { speaker: 'A', kr: '환승해야 해요?', uz: 'Almashtirishim kerakmi?' },
        { speaker: 'B', kr: '아니요, 바로 가요. 2호선이 직통이에요.', uz: "Yo'q, to'g'ridan-to'g'ri boradi. 2-liniya to'g'ri ketadi." },
      ],
      notes: [
        "(으)로: 버스로(avtobus bilan), 지하철로(metro bilan), 택시로(taksi bilan).",
        "타다 vs 걷다: 버스를 타요 (avtobusga chiqaman) vs 걸어가요 (piyoda boraman).",
        "걸리다 — vaqt ketmoq: 30분 걸려요 (30 daqiqa ketadi).",
        "갈아타다 — transport almashtirmoq: 2호선으로 갈아타세요.",
        "까지 — gacha: 학교까지 (maktabgacha), 서울까지 (Seulgacha).",
      ]
    },
    quiz: [
      { question: "'버스로 가요' nimani anglatadi?", options: ['Avtobus kutaman', 'Avtobus bilan boraman', 'Avtobusda oturaman', 'Avtobus sotaman'], correct_index: 1 },
      { question: "Transport vositasi bilan qaysi qo'shimcha ishlatiladi?", options: ['에', '에서', '(으)로', '까지'], correct_index: 2 },
      { question: "'타다' nimani anglatadi?", options: ['tushmoq', 'chiqmoq (transportga)', 'kutmoq', 'yurmoq'], correct_index: 1 },
      { question: "'어떻게 가요?' nimani so'rayapti?", options: ['Qayerga borasan?', 'Qachon borasan?', 'Qanday borasan?', 'Kim bilan borasan?'], correct_index: 2 },
      { question: "Metro koreyschada qanday?", options: ['버스', '기차', '지하철', '택시'], correct_index: 2 },
      { question: "'걸어서 가요' nimani anglatadi?", options: ['Avtobus bilan boraman', 'Piyoda boraman', 'Taksida boraman', 'Velosipedda boraman'], correct_index: 1 },
      { question: "'30분 걸려요' nimani anglatadi?", options: ['30 daqiqa kutaman', '30 daqiqa ketadi', '30 daqiqa uxlayman', '30 daqiqa ishlaydi'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 10: Hobbi — 취미
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 1, order_in_level: 10,
    title_kr: '취미', title_uz: 'Hobbi', is_free: false,
    content: {
      topic: {
        kr: '이 단원에서는 취미에 대해 배웁니다. 제 취미는 음악 듣기예요. 저는 축구를 좋아해요. 주말에 영화를 봐요. 같이 운동할까요? 책 읽는 것을 좋아해요.',
        uz: "Bu darsda hobbi mavzusi o'rganiladi. Mening hobbiyim musiqa tinglash. Men futbolni yoqtiraman. Dam olish kuni kino ko'raman. Birga sport qilamizmi? Kitob o'qishni yoqtiraman."
      },
      grammar: {
        explanation: `-(으)ㄹ까요? — taklif yoki fikr so'rash.

• 같이 영화 볼까요? (Birga kino ko'ramizmi?)
• 같이 운동할까요? (Birga sport qilamizmi?)

-는 것 — fe'lni otlashtirish (gerund):
• 읽다 → 읽는 것 (o'qish)
• 듣다 → 듣는 것 (tinglash)
• 보다 → 보는 것 (ko'rish)

제 취미는 ___예요/이에요 — hobbimni aytish:
제 취미는 음악 듣기예요. (Hobbiyim musiqa tinglash.)

저는 ___를/을 좋아해요 — yoqtirish:
저는 축구를 좋아해요. (Men futbolni yoqtiraman.)`,
        examples: [
          { kr: '제 취미는 음악 듣기예요.', uz: 'Mening hobbiyim musiqa tinglash.' },
          { kr: '저는 책 읽는 것을 좋아해요.', uz: "Men kitob o'qishni yoqtiraman." },
          { kr: '같이 영화 볼까요?', uz: 'Birga kino ko\'ramizmi?' },
          { kr: '주말에 뭐 해요?', uz: 'Dam olish kuni nima qilasiz?' },
          { kr: '저는 운동하는 것을 좋아해요. 특히 수영을 해요.', uz: 'Men sport qilishni yoqtiraman. Ayniqsa suzaman.' },
        ]
      },
      vocabulary: [
        { kr: '취미', romanization: 'chwimi', uz: 'hobbi' },
        { kr: '여가', romanization: 'yeoga', uz: "bo'sh vaqt" },
        { kr: '음악', romanization: 'eumak', uz: 'musiqa' },
        { kr: '영화', romanization: 'yeonghwa', uz: 'kino, film' },
        { kr: '책', romanization: 'chaek', uz: 'kitob' },
        { kr: '사진', romanization: 'sajin', uz: 'fotosurat' },
        { kr: '그림', romanization: 'geurim', uz: 'rasm' },
        { kr: '여행', romanization: 'yeohaeng', uz: 'sayohat' },
        { kr: '요리', romanization: 'yori', uz: 'ovqat pishirish' },
        { kr: '운동', romanization: 'undong', uz: 'sport' },
        { kr: '축구', romanization: 'chukgu', uz: 'futbol' },
        { kr: '농구', romanization: 'nonggu', uz: 'basketbol' },
        { kr: '수영', romanization: 'suyeong', uz: 'suzish' },
        { kr: '등산', romanization: 'deungsan', uz: 'tog\'ga chiqish' },
        { kr: '듣다', romanization: 'deutda', uz: 'tinglash' },
        { kr: '보다', romanization: 'boda', uz: "ko'rmoq" },
        { kr: '읽다', romanization: 'ikda', uz: "o'qimoq" },
        { kr: '그리다', romanization: 'geurida', uz: 'chizmoq' },
        { kr: '특히', romanization: 'teuki', uz: 'ayniqsa' },
        { kr: '주말', romanization: 'jumal', uz: 'dam olish kuni' },
      ],
      examples: [
        { kr: '제 취미는 사진 찍기예요. 주말마다 공원에서 사진을 찍어요.', uz: "Mening hobbiyim suratga olish. Har dam olish kuni parkda surat olaman." },
        { kr: '저는 음악 듣는 것을 좋아해요. 특히 K-pop을 좋아해요.', uz: "Men musiqa tinglashni yoqtiraman. Ayniqsa K-pop'ni yoqtiraman." },
        { kr: '가: 주말에 같이 등산할까요? 나: 좋아요. 같이 해요.', uz: "A: Dam olish kuni birga tog'ga chiqamizmi? B: Yaxshi. Birga qilamiz." },
        { kr: '저는 요리하는 것을 좋아해요. 한국 음식을 자주 만들어요.', uz: "Men ovqat pishirishni yoqtiraman. Koreys taomlarini tez-tez tayyorlayman." },
        { kr: '취미가 뭐예요? 저는 여행하는 것을 좋아해요.', uz: "Hobbiyingiz nima? Men sayohat qilishni yoqtiraman." },
      ],
      dialog: [
        { speaker: 'A', kr: '취미가 뭐예요?', uz: 'Hobbiyingiz nima?' },
        { speaker: 'B', kr: '제 취미는 음악 듣기예요. 그리고 영화 보는 것도 좋아해요.', uz: "Mening hobbiyim musiqa tinglash. Va kino ko'rishni ham yoqtiraman." },
        { speaker: 'A', kr: '운동도 좋아해요?', uz: 'Sportni ham yoqtirasizmi?' },
        { speaker: 'B', kr: '네, 축구를 좋아해요. 주말에 친구들하고 같이 해요.', uz: "Ha, futbolni yoqtiraman. Dam olish kunlari do'stlarim bilan birga o'ynayman." },
        { speaker: 'A', kr: '그럼 이번 주말에 같이 축구할까요?', uz: "Undoq bo'lsa, bu dam olish kuni birga futbol o'ynaymizmi?" },
        { speaker: 'B', kr: '좋아요! 같이 해요. 몇 시가 좋아요?', uz: "Yaxshi! Birga qilamiz. Soat nechchi qulay?" },
      ],
      notes: [
        "-(으)ㄹ까요?: taklif: 볼까요?(ko'ramizmi?), 갈까요?(boramizmi?), 할까요?(qilamizmi?)",
        "-는 것: 읽는 것(o'qish), 보는 것(ko'rish), 듣는 것(tinglash), 하는 것(qilish).",
        "취미가 뭐예요? — Hobbiyingiz nima? / 제 취미는 ___예요. — Hobbiyim ___.",
        "주말마다 — har dam olish kuni (마다 = har).",
        "특히 — ayniqsa: 특히 K-pop을 좋아해요.",
      ]
    },
    quiz: [
      { question: "'취미가 뭐예요?' nimani so'rayapti?", options: ['Isming nima?', 'Hobbiyingiz nima?', 'Kasbing nima?', 'Nima yoqtirasan?'], correct_index: 1 },
      { question: "'-(으)ㄹ까요?' qanday ma'noni ifodalaydi?", options: ['Taklif yoki fikr so\'rash', 'Inkor', 'O\'tgan zamon', 'Kelasi zamon'], correct_index: 0 },
      { question: "'책 읽는 것을 좋아해요' nimani anglatadi?", options: ["Kitob sotishni yoqtiraman", "Kitob o'qishni yoqtiraman", "Kitob yozishni yoqtiraman", "Kitob ko'rishni yoqtiraman"], correct_index: 1 },
      { question: "Futbol koreyschada qanday?", options: ['농구', '수영', '축구', '등산'], correct_index: 2 },
      { question: "'특히' nimani anglatadi?", options: ['odatda', "ba'zan", 'ayniqsa', 'doimo'], correct_index: 2 },
      { question: "'주말' nimani anglatadi?", options: ['ish kuni', 'dam olish kuni', 'ertalab', 'bayram'], correct_index: 1 },
      { question: "'같이 운동할까요?' nimani taklif qilyapti?", options: ['Birga ovqat yeymizmi?', 'Birga sport qilamizmi?', 'Birga boramizmi?', 'Birga o\'qiymizmi?'], correct_index: 1 },
    ]
  },
];

// ════════════════════════════════════════════
// DB ga saqlash
// ════════════════════════════════════════════
async function seed() {
  console.log('TOPIK 1-daraja seed boshlandi...\n');

  for (const lesson of LESSONS) {
    const { quiz, ...lessonData } = lesson;

    // 1. Darsni saqlash
    const { rows: [saved] } = await db.query(
      `INSERT INTO lessons (track, level, title_kr, title_uz, content, is_free)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT DO NOTHING
       RETURNING id`,
      [lessonData.track, lessonData.order_in_level, lessonData.title_kr,
       lessonData.title_uz, JSON.stringify(lessonData.content), lessonData.is_free]
    );

    if (!saved) {
      console.log(`  ⚠️  ${lessonData.title_kr} — allaqachon bor, o'tkazildi`);
      continue;
    }

    // 2. Quiz savollarini saqlash
    for (const q of quiz) {
      await db.query(
        `INSERT INTO quiz_questions (lesson_id, question, options, correct_index)
         VALUES ($1, $2, $3, $4)`,
        [saved.id, q.question, JSON.stringify(q.options), q.correct_index]
      );
    }

    console.log(`  ✅  Dars ${lessonData.order_in_level}: ${lessonData.title_kr} — ${lessonData.title_uz} (ID: ${saved.id})`);
  }

  console.log('\n✅ TOPIK 1-daraja seed muvaffaqiyatli yakunlandi!');
  console.log(`   Jami: ${LESSONS.length} ta dars`);
  await db.end();
}

seed().catch(err => {
  console.error('❌ Xatolik:', err.message);
  process.exit(1);
});
