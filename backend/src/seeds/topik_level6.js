// backend/src/seeds/topik_level6.js
// TOPIK 6-daraja: 10 ta to'liq dars — TOPIK eng yuqori daraja
// Audio URL: {CDN_URL}/{lessonId}-{key}.mp3 — Edge TTS tomonidan generatsiya
// PC / iOS / Android uchun to'liq ishlaydigan
// Usage: node src/seeds/topik_level6.js

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

  // ════════════════════════════════════════════════════
  // DARS 1: Globallashuv va madaniy identitet
  // 세계화와 문화 정체성
  // ════════════════════════════════════════════════════
  {
    track: 'TOPIK', level: 6, order_in_level: 1,
    title_kr: '세계화와 문화 정체성',
    title_uz: 'Globallashuv va madaniy identitet',
    is_free: true,
    content: {
      topic: {
        kr: '세계화는 경제를 발전시키는 데다가 문화에도 깊은 영향을 미칩니다. 하지만 문화는 변할지언정 사라져서는 안 됩니다. 전통 문화가 약화되면 정체성을 잃는 셈입니다. 다양성을 유지하면서 세계화의 흐름에 적응하는 균형이 필요합니다.',
        uz: "Globallashuv iqtisodiyotni rivojlantirishga qo'shimcha madaniyatga ham chuqur ta'sir ko'rsatadi. Lekin madaniyat o'zgarishi mumkin bo'lsa-da yo'qolib ketmasligi kerak. An'anaviy madaniyat zaiflashsa, identitetni yo'qotgan hisoblanadi. Xilma-xillikni saqlab, globallashuv oqimiga moslashish balansi zarur."
      },
      grammar: {
        explanation: `-(으)ㄴ/는 데다가 — ustiga-ustak, buning ustiga (ikkinchi holat qo'shiladi)

Tuzilish: [fe'l/sifat + (으)ㄴ/는 데다가]
• 경제를 발전시키는 데다가 문화에도 영향을 준다.
  (Iqtisodiyotni rivojlantiradi, buning ustiga madaniyatga ham ta'sir qiladi.)
• 가격이 비싼 데다가 품질도 나쁘다.
  (Narxi qimmat, ustiga-ustak sifati ham yomon.)

-(으)ㄹ지언정 — hatto ...bo'lsa ham, ...bo'lishi mumkin, lekin (kuchli qarama-qarshi)

• 문화는 변할지언정 사라져서는 안 된다.
  (Madaniyat o'zgarishi mumkin, lekin yo'qolib ketmasligi kerak.)
• 힘들지언정 포기해서는 안 된다.
  (Qiyin bo'lsa ham, taslim bo'lmaslik kerak.)

MUHIM: -지언정 juda rasmiy, asosan yozma nutq va akademik esseda.

-(으)ㄴ/는 셈이다 — ...ga teng, ...hisoblanadi:
• 정체성을 잃는 셈이다. (Identitetni yo'qotgan hisoblanadi.)`,
        examples: [
          { kr: '세계화는 경제를 발전시키는 데다가 문화 교류도 활발하게 만든다.', uz: "Globallashuv iqtisodiyotni rivojlantiradi, buning ustiga madaniy almashinuvni ham faollashtiradi." },
          { kr: '언어는 사라질지언정 그 민족의 정신은 남아 있다.', uz: "Til yo'qolib ketishi mumkin, lekin o'sha xalqning ruhi qoladi." },
          { kr: '전통을 버리는 것은 정체성을 포기하는 셈이다.', uz: "An'anadan voz kechish identitetdan voz kechgan hisoblanadi." },
          { kr: '경제적 이익을 얻는 데다가 문화적 다양성도 증가했다.', uz: "Iqtisodiy foyda oldi, buning ustiga madaniy xilma-xillik ham oshdi." },
          { kr: '힘들지언정 전통 문화를 보존해야 한다는 것이 전문가들의 의견이다.', uz: "Qiyin bo'lsa ham an'anaviy madaniyatni saqlab qolish kerak, deydi mutaxassislar." },
        ]
      },
      vocabulary: [
        { kr: '세계화',     romanization: 'segyehwa',        uz: 'globallashuv' },
        { kr: '정체성',     romanization: 'jeongcheseong',   uz: 'identitet, o\'z-o\'zlik hissi' },
        { kr: '다양성',     romanization: 'dayangseong',     uz: 'xilma-xillik' },
        { kr: '전통',       romanization: 'jeontong',        uz: "an'ana" },
        { kr: '보존',       romanization: 'bojon',           uz: 'saqlash, muhofaza' },
        { kr: '영향',       romanization: 'yeonghyang',      uz: "ta'sir" },
        { kr: '변화',       romanization: 'byeonhwa',        uz: "o'zgarish" },
        { kr: '충돌',       romanization: 'chungdol',        uz: "to'qnashuv, ziddiyat" },
        { kr: '동화',       romanization: 'donghwa',         uz: 'assimilyatsiya' },
        { kr: '약화되다',   romanization: 'yakwadweda',      uz: 'zaiflashmoq' },
        { kr: '유지하다',   romanization: 'yujihada',        uz: 'saqlab qolmoq' },
        { kr: '위협하다',   romanization: 'wihyeopada',      uz: 'tahdid qilmoq' },
        { kr: '공존하다',   romanization: 'gongjsonhada',    uz: 'birga yashamoq' },
        { kr: '확산되다',   romanization: 'hwaksandweda',    uz: 'tarqalmoq' },
        { kr: '균형',       romanization: 'gyunhyeong',      uz: 'muvozanat' },
        { kr: '문화 교류',  romanization: 'munhwa gyoryu',   uz: 'madaniy almashinuv' },
        { kr: '민족',       romanization: 'minjok',          uz: 'xalq, millat' },
        { kr: '고유성',     romanization: 'goyuseong',       uz: "o'ziga xoslik" },
        { kr: '상징',       romanization: 'sangjing',        uz: 'ramz, belgi' },
        { kr: '계승하다',   romanization: 'gyeseunghada',    uz: "merosxo'rlik qilmoq" },
      ],
      examples: [
        { kr: '세계화가 진행되는 데다가 인터넷이 발달하면서 문화 경계가 점점 사라지고 있다.', uz: "Globallashuv davom etishiga qo'shimcha internet rivojlanib, madaniy chegara tobora yo'qolmoqda." },
        { kr: '전통 문화가 사라질지언정 그 가치는 후대에 전달되어야 한다.', uz: "An'anaviy madaniyat yo'qolib ketishi mumkin, lekin uning qimmati avlodlarga yetkazilishi kerak." },
        { kr: '타 문화를 수용하는 것은 자국 문화를 포기하는 셈이 아니다.', uz: "Boshqa madaniyatni qabul qilish o'z madaniyatidan voz kechgan hisoblanavermaydi." },
        { kr: '다양한 문화가 공존하는 데다가 서로 영향을 주고받으면서 발전한다.', uz: "Xilma-xil madaniyatlar birga yashashiga qo'shimcha bir-biriga ta'sir etib rivojlanadi." },
        { kr: '힘들지언정 문화 정체성을 지키려는 노력이 사회 전반에서 이루어져야 한다.', uz: "Qiyin bo'lsa ham madaniy identitetni himoya qilishga harakat butun jamiyatda amalga oshirilishi kerak." },
      ],
      dialog: [
        { speaker: 'A', kr: '세계화로 인해 전통 문화가 위협받고 있다는 주장에 대해 어떻게 생각해요?', uz: "Globallashuv tufayli an'anaviy madaniyat tahdid ostida degan fikrga qanday qaraysiz?" },
        { speaker: 'B', kr: '일정 부분 동의해요. 경제적 이익을 추구하는 데다가 외래 문화가 무분별하게 유입되니까요.', uz: "Bir qismiga rozi bo'laman. Iqtisodiy foyda izlashiga qo'shimcha xorijiy madaniyat uyushsiz kirib kelmoqda." },
        { speaker: 'A', kr: '하지만 문화는 변할지언정 완전히 사라지지는 않는다고 봐요.', uz: "Lekin madaniyat o'zgarishi mumkin bo'lsa-da butunlay yo'qolib ketmaydi deb o'ylayman." },
        { speaker: 'B', kr: '맞아요. 오히려 다양한 문화와의 접촉이 자국 문화를 풍부하게 하는 셈이에요.', uz: "To'g'ri. Aksincha, xilma-xil madaniyatlar bilan aloqa o'z madaniyatini boyitgan hisoblanadi." },
        { speaker: 'A', kr: '그렇다면 세계화 자체가 문제가 아니라 대응 방식이 문제인 거네요.', uz: "Unday bo'lsa globallashuvning o'zi emas, balki unga munosabat tarzi muammo ekan." },
        { speaker: 'B', kr: '정확해요. 전통을 지키는 데다가 세계화에 적응하는 균형이 필요해요.', uz: "Aniq. An'anani saqlashga qo'shimcha globallashuvga moslashish balansi zarur." },
      ],
      notes: [
        "-는 데다가: ikki holat ustma-ust qo'shiladi, ikkalasi ham bir tomonga: 비싼 데다가 나쁘다(qimmat, ustiga yomon).",
        "-ㄹ지언정: kuchli qarama-qarshi, rasmiy: 변할지언정(o'zgarishi mumkin, lekin). Og'zaki nutqda kamroq.",
        "셈이다: ...ga teng: 잃는 셈이다(yo'qotgan hisoblanadi).",
        "세계화 (globallashuv) ↔ 지역화 (lokalizatsiya) — TOPIK 6 esseylarida tez-tez keladigan qarama-qarshi juftlik.",
        "정체성 (identitet) — milliy, madaniy, shaxsiy — 6-daraja akademik yozuvda markaziy tushuncha.",
      ],
      games: {
        matchPairs: [
          { kr: '세계화',   uz: 'globallashuv' },
          { kr: '정체성',   uz: 'identitet' },
          { kr: '다양성',   uz: 'xilma-xillik' },
          { kr: '공존하다', uz: 'birga yashamoq' },
          { kr: '계승하다', uz: "merosxo'rlik qilmoq" },
          { kr: '균형',     uz: 'muvozanat' },
        ],
        fillBlank: [
          { sentence: '경제를 발전시키는 데다가 문화에도 영향을 ___.',      answer: '미친다',      options: ['미친다','준다','없다','한다'],          uz: "Iqtisodiyotni rivojlantiradi, buning ustiga madaniyatga ham ta'sir qiladi." },
          { sentence: '문화는 변할___사라져서는 안 된다.',                   answer: '지언정',      options: ['지언정','지만','더라도','아도'],           uz: "Madaniyat o'zgarishi mumkin, lekin yo'qolib ketmasligi kerak." },
          { sentence: '전통을 버리는 것은 정체성을 포기하는 ___.',           answer: '셈이다',      options: ['셈이다','뿐이다','따름이다','것이다'],      uz: "An'anadan voz kechish identitetdan voz kechgan hisoblanadi." },
          { sentence: '경제적 이익을 얻는 ___ 문화적 다양성도 증가했다.',   answer: '데다가',      options: ['데다가','반면에','때문에','대신에'],         uz: "Iqtisodiy foyda oldi, buning ustiga madaniy xilma-xillik ham oshdi." },
          { sentence: '다양한 문화와의 접촉이 자국 문화를 풍부하게 하는 ___.',answer:'셈이에요',   options: ['셈이에요','뿐이에요','따름이에요','것이에요'],uz: "Xilma-xil madaniyatlar bilan aloqa o'z madaniyatini boyitgan hisoblanadi." },
        ],
        scramble: [
          { kr: '세계화', uz: 'globallashuv' },
          { kr: '정체성', uz: 'identitet' },
          { kr: '전통',   uz: "an'ana" },
          { kr: '균형',   uz: 'muvozanat' },
          { kr: '민족',   uz: 'millat' },
        ],
      },
    },
    quiz: [
      { question: "'-는 데다가' nimani anglatadi?",                    options: ['lekin','ustiga-ustak, qo\'shimcha ravishda','sababli','natijasida'],           correct_index: 1 },
      { question: "'-(으)ㄹ지언정' qachon ishlatiladi?",               options: ['Kundalik suhbatda','Rasmiy yozma nutq, kuchli qarama-qarshi','So\'rash uchun','Inkor uchun'], correct_index: 1 },
      { question: "'정체성' nimani anglatadi?",                        options: ['xilma-xillik','globallashuv','identitet, o\'z-o\'zlik hissi','an\'ana'],        correct_index: 2 },
      { question: "'공존하다' nimani anglatadi?",                      options: ['yo\'qolmoq','tarqalmoq','birga yashamoq','o\'zgarmoq'],                         correct_index: 2 },
      { question: "'셈이다'ning ma'nosi?",                             options: ['faqat xolos','...ga teng, hisoblanadi','lekin','shuning uchun'],                 correct_index: 1 },
      { question: "'고유성' nimani anglatadi?",                        options: ['an\'ana','identitet',"o'ziga xoslik",'xilma-xillik'],                          correct_index: 2 },
      { question: "'계승하다' nimani anglatadi?",                      options: ['yo\'qotmoq','saqlash',"merosxo'rlik qilmoq",'tarqalmoq'],                      correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════════════
  // DARS 2: Iqtisodiy tengsizlik va ijtimoiy tuzilma
  // 경제 불평등과 사회 구조
  // ════════════════════════════════════════════════════
  {
    track: 'TOPIK', level: 6, order_in_level: 2,
    title_kr: '경제 불평등과 사회 구조',
    title_uz: 'Iqtisodiy tengsizlik va ijtimoiy tuzilma',
    is_free: true,
    content: {
      topic: {
        kr: '자산이 소수에게 집중된 탓에 경제적 불평등이 심화되고 있습니다. 이는 개인의 문제가 아니라 구조적 문제일 따름입니다. 부유한 계층은 자산이 증가하는 반면에 저소득층은 더 어려워지고 있습니다. 격차가 커질수록 사회 갈등도 심화되는 경향이 있습니다.',
        uz: "Boylik ozchilikning qo'lida to'planganligi sababli iqtisodiy tengsizlik chuqurlashmoqda. Bu shaxsning emas, balki tizimning muammosi xolos. Badavlat qatlam boyligi oshayotgan holda, past daromadlilarga tobora qiyinlashmoqda. Farq ortgan sari ijtimoiy ziddiyat ham kuchayish tendensiyasida."
      },
      grammar: {
        explanation: `-(으)ㄴ/는 탓에 — ...sababli (SALBIY natija, ayblash ifodasida)

Tuzilish: [fe'l/sifat + (으)ㄴ/는 탓에]
• 자산이 집중된 탓에 불평등이 심화됐다. (Boylik to'planganligi sababli tengsizlik chuqurlashdi.)
• 경기가 나쁜 탓에 실업률이 높아졌다. (Iqtisodiyot yomon bo'lganligi sababli ishsizlik oshdi.)

MUHIM: 탓에 vs 덕분에:
  탓에   → SALBIY natija (ayb, muammo)
  덕분에 → IJOBIY natija (minnatdorlik)

-(으)ㄹ 따름이다 — faqat ...xolos (rasmiy, ob'ektiv tone):
• 구조적 문제일 따름이다. (Tizimning muammosi xolos.)
• 기다릴 따름이에요. (Kutish xolos.)

-(으)ㄴ/는 반면에 + -(으)ㄹ수록 (논리 확장):
• 부자는 더 부유해지는 반면에 빈자는 더 가난해지는 경향이 있다.`,
        examples: [
          { kr: '구조적 문제가 심화된 탓에 계층 간 이동이 어려워졌다.',    uz: "Tizimli muammo chuqurlashganligi sababli qatlamlar orasida harakatlanish qiyinlashdi." },
          { kr: '이는 단순한 개인의 실패가 아니라 구조적 문제일 따름이다.', uz: "Bu oddiy shaxsiy muvaffaqiyatsizlik emas, balki tizimning muammosi xolos." },
          { kr: '고소득층은 자산이 늘어나는 반면에 저소득층은 부채가 증가한다.', uz: "Yuqori daromadlilar boyligi oshayotgan holda, past daromadlilar qarzi oshmoqda." },
          { kr: '불평등이 심화될수록 사회적 신뢰도 낮아지는 경향이 있다.',   uz: "Tengsizlik chuqurlashgan sari ijtimoiy ishonch ham pasayish tendensiyasi bor." },
          { kr: '기회가 불평등한 탓에 능력 있는 사람도 성공하기 어렵다.',    uz: "Imkoniyat tengsiz bo'lganligi sababli qobiliyatli odam ham muvaffaq bo'lishi qiyin." },
        ]
      },
      vocabulary: [
        { kr: '불평등',       romanization: 'bulpyeongdeung',  uz: 'tengsizlik' },
        { kr: '소득',         romanization: 'soduk',           uz: 'daromad' },
        { kr: '자산',         romanization: 'jasan',           uz: 'aktiv, boylik' },
        { kr: '분배',         romanization: 'bunbae',          uz: 'taqsimot' },
        { kr: '빈곤',         romanization: 'bingon',          uz: "kambag'allik" },
        { kr: '계층',         romanization: 'gyecheung',       uz: 'ijtimoiy qatlam' },
        { kr: '구조적 문제',  romanization: 'gujojjeok munje', uz: 'tizimli muammo' },
        { kr: '기회 불평등',  romanization: 'gihoe bulpyeongdeung', uz: 'imkoniyat tengsizligi' },
        { kr: '양극화',       romanization: 'yanggeukwa',      uz: 'qutblanish, polarizatsiya' },
        { kr: '집중되다',     romanization: 'jibungdweda',     uz: "to'planmoq, jamlashmoq" },
        { kr: '배분하다',     romanization: 'baebunhada',      uz: 'taqsimlamoq' },
        { kr: '악순환',       romanization: 'aksunhwan',       uz: "yomon sikl, yomonlik halqasi" },
        { kr: '부채',         romanization: 'buchae',          uz: 'qarz, majburiyat' },
        { kr: '재분배',       romanization: 'jaebunbae',       uz: "qayta taqsimlash" },
        { kr: '세금',         romanization: 'segeum',          uz: 'soliq' },
        { kr: '복지 정책',    romanization: 'bokji jeongchaek',uz: 'ijtimoiy ta\'minot siyosati' },
        { kr: '계층 이동',    romanization: 'gyecheung idong', uz: 'ijtimoiy ko\'tarilish' },
        { kr: '사회적 신뢰',  romanization: 'sahoejjeok sinrwe',uz: 'ijtimoiy ishonch' },
        { kr: '격차',         romanization: 'gyeokcha',        uz: 'farq, tafovut' },
        { kr: '취약 계층',    romanization: 'chwyak gyecheung',uz: 'zaif qatlam' },
      ],
      examples: [
        { kr: '소득 불평등이 심화된 탓에 중산층이 줄어들고 있다는 연구 결과가 나왔다.', uz: "Daromad tengsizligi chuqurlashganligi sababli o'rta qatlam kamaymoqda, degan tadqiqot natijasi chiqdi." },
        { kr: '빈곤은 개인의 노력 부족이 아니라 구조적 문제일 따름이라는 시각이 주목받고 있다.', uz: "Qashshoqlik shaxsiy harakat yetishmasligining emas, tizimning muammosi xolos, degan nuqtai nazar e'tiborga olinmoqda." },
        { kr: '상위 1%는 자산이 급격히 증가하는 반면에 하위 50%는 거의 변화가 없다.', uz: "Yuqori 1% boyligi keskin oshayotgan holda, quyi 50% deyarli o'zgarmasdan qolmoqda." },
        { kr: '교육 기회가 불평등한 탓에 계층 이동이 어려운 악순환이 계속되고 있다.', uz: "Ta'lim imkoniyati tengsiz bo'lganligi sababli ijtimoiy ko'tarilish qiyin bo'lgan yomonlik halqasi davom etmoqda." },
        { kr: '불평등이 심화될수록 사회 통합이 어려워지는 경향이 있어 정책적 개입이 필요하다.', uz: "Tengsizlik chuqurlashgan sari ijtimoiy integratsiya qiyinlashish tendensiyasi bor, shuning uchun siyosat aralashuvi zarur." },
      ],
      dialog: [
        { speaker: 'A', kr: '현대 사회의 빈부 격차가 점점 심해지는 것 같아요.',                  uz: "Zamonaviy jamiyatda boy-kambag'al farqi tobora kuchaymoqda shekilli." },
        { speaker: 'B', kr: '맞아요. 자산이 소수에게 집중된 탓에 기회 불평등도 심화되고 있어요.', uz: "To'g'ri. Boylik ozchilik qo'lida to'planganligi sababli imkoniyat tengsizligi ham kuchaymoqda." },
        { speaker: 'A', kr: '이걸 개인의 노력으로 해결하기는 어렵겠죠?',                         uz: "Buni shaxsiy harakat bilan hal qilish qiyin bo'lsa kerak?" },
        { speaker: 'B', kr: '그렇죠. 이는 구조적 문제일 따름이라 정부 차원의 정책이 필요해요.', uz: "Shunday. Bu tizimning muammosi xolos, shuning uchun hukumat darajasidagi siyosat zarur." },
        { speaker: 'A', kr: '구체적으로 어떤 정책이 효과적일까요?',                              uz: "Aniqroq qaysi siyosat samarali bo'lishi mumkin?" },
        { speaker: 'B', kr: '재분배 정책이 강화되는 반면에 기회 균등을 위한 교육 투자도 늘어야 해요.', uz: "Qayta taqsimlash siyosati kuchaytirilgan holda imkoniyat tengligi uchun ta'lim sarmoyasi ham oshishi kerak." },
      ],
      notes: [
        "탓에 — SALBIY sabab: 비가 온 탓에(yomg'ir yoqqanligi sababli). Ijobiy uchun 덕분에 ishlatiladi.",
        "따름이다 — rasmiy, ob'ektiv tone: 구조적 문제일 따름이다(tizimning muammosi xolos).",
        "양극화 (polarizatsiya) — TOPIK 6 esseylarida tez-tez keladigan atama.",
        "악순환 (yomonlik halqasi) — muammo o'z-o'zini kuchaytiradi: 빈곤 → 교육 부족 → 빈곤.",
        "재분배 정책 — qayta taqsimlash siyosati: progressiv soliq, subsidiyalar, kafolatlangan daromad.",
      ],
      games: {
        matchPairs: [
          { kr: '불평등',   uz: 'tengsizlik' },
          { kr: '양극화',   uz: 'polarizatsiya' },
          { kr: '빈곤',     uz: "kambag'allik" },
          { kr: '악순환',   uz: 'yomonlik halqasi' },
          { kr: '격차',     uz: 'farq, tafovut' },
          { kr: '재분배',   uz: 'qayta taqsimlash' },
        ],
        fillBlank: [
          { sentence: '자산이 집중된 ___ 불평등이 심화됐다.',                answer: '탓에',      options: ['탓에','덕분에','때문에','바람에'],       uz: "Boylik to'planganligi sababli tengsizlik chuqurlashdi." },
          { sentence: '이는 구조적 문제일 ___.',                             answer: '따름이다',  options: ['따름이다','뿐이다','셈이다','것이다'],   uz: "Bu tizimning muammosi xolos." },
          { sentence: '부유층은 자산이 늘어나는 ___ 저소득층은 더 어려워진다.',answer: '반면에',  options: ['반면에','대신에','데다가','탓에'],       uz: "Badavlatlar boyligi oshayotgan holda kambag'allarga qiyinlashmoqda." },
          { sentence: '불평등이 심화될___사회 갈등도 커진다.',                answer: '수록',      options: ['수록','때문에','대신에','반면에'],       uz: "Tengsizlik chuqurlashgan sari ijtimoiy ziddiyat ham ortadi." },
          { sentence: '교육 투자가 늘어나는 ___ 기회 균등도 개선돼야 한다.',  answer: '데다가',   options: ['데다가','탓에','반면에','때문에'],        uz: "Ta'lim sarmoyasi oshishiga qo'shimcha imkoniyat tengligi ham yaxshilanishi kerak." },
        ],
        scramble: [
          { kr: '불평등', uz: 'tengsizlik' },
          { kr: '계층',   uz: 'qatlam' },
          { kr: '빈곤',   uz: "kambag'allik" },
          { kr: '격차',   uz: 'farq' },
          { kr: '세금',   uz: 'soliq' },
        ],
      },
    },
    quiz: [
      { question: "'-는 탓에' qachon ishlatiladi?",                  options: ['Ijobiy natijada','Salbiy natija, ayblash ifodasida','Taklif uchun','Savol uchun'], correct_index: 1 },
      { question: "'탓에' va '덕분에' farqi?",                       options: ['Farq yo\'q','탓에 salbiy; 덕분에 ijobiy','덕분에 salbiy','Ikkalasi salbiy'],         correct_index: 1 },
      { question: "'양극화' nimani anglatadi?",                       options: ['tengsizlik','qutblanish, polarizatsiya','farq','muammo'],                           correct_index: 1 },
      { question: "'악순환' nimani anglatadi?",                       options: ['yaxshi sikl',"yomonlik halqasi",'taqsimot','soliq'],                               correct_index: 1 },
      { question: "'재분배' nimani anglatadi?",                       options: ['taqsimot','soliq','qayta taqsimlash','sarmoya'],                                   correct_index: 2 },
      { question: "'따름이다' qaysi uslubda ishlatiladi?",            options: ['norasmiy','rasmiy, ob\'ektiv','do\'stona','so\'roq'],                              correct_index: 1 },
      { question: "'계층 이동' nimani anglatadi?",                    options: ['qatlam tuzilishi','ijtimoiy ko\'tarilish','daromad taqsimoti','tizimli muammo'],   correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════════════
  // DARS 3: Sun'iy intellekt va etika
  // 인공지능과 윤리
  // ════════════════════════════════════════════════════
  {
    track: 'TOPIK', level: 6, order_in_level: 3,
    title_kr: '인공지능과 윤리',
    title_uz: "Sun'iy intellekt va etika",
    is_free: false,
    content: {
      topic: {
        kr: '인공지능 기술이 빠르게 발전하면서 새로운 윤리적 문제가 제기되고 있습니다. 알고리즘이 편향된 판단을 내릴 가능성이 있습니다. 인간의 역할이 줄어들 수밖에 없다는 점에서 새로운 대책이 필요합니다. AI가 사회 전반에 영향을 미치는 셈이므로 책임 소재를 명확히 해야 합니다.',
        uz: "Sun'iy intellekt texnologiyasi tezda rivojlanib, yangi etik muammolar ko'tarilmoqda. Algoritm noto'g'ri tarafkash qaror chiqarishi mumkinligi bor. Inson roli kamayadigan nuqtai nazardan yangi choralar zarur. AI jamiyat bo'ylab ta'sir ko'rsatayotgan hisoblanganidan mas'uliyat manbasini aniqlashtirish kerak."
      },
      grammar: {
        explanation: `-(으)ㄹ 수밖에 없다 — ...dan boshqa iloj yo'q, muqarrar (6-daraja chuqur)

Akademik ishlatish:
• 인간의 역할이 줄어들 수밖에 없다. (Inson roli kamayadigan muqarrar.)
• 새로운 윤리 규범을 만들 수밖에 없다. (Yangi etik normalar yaratishdan boshqa iloj yo'q.)

-(으)ㄴ/는다는 점에서 — ...jihatidan, ...nuqtai nazardan

• 인간의 역할이 줄어든다는 점에서 대책이 필요하다.
  (Inson roli kamayadigan nuqtai nazardan choralar zarur.)
• AI가 독립적으로 판단한다는 점에서 윤리 문제가 생긴다.
  (AI mustaqil qaror qiladigan jihatidan etik muammo paydo bo'ladi.)

-(으)ㄹ 가능성이 있다 — ...ehtimoli/imkoniyati bor:
• 편향된 결과가 나올 가능성이 있다. (Tarafkash natija chiqish ehtimoli bor.)

-(으)ㄴ/는 셈이므로 — ...hisoblanganidan (sabab + xulosa):
• AI가 사회에 영향을 미치는 셈이므로 책임이 중요하다.`,
        examples: [
          { kr: 'AI 발전을 완전히 막을 수밖에 없다는 주장은 현실적이지 않다.',     uz: "AI rivojlanishini to'liq to'xtatishdan boshqa iloj yo'q, degan da'vo realistik emas." },
          { kr: 'AI가 스스로 판단한다는 점에서 책임 소재 문제가 복잡해진다.',      uz: "AI o'zi qaror qiladigan nuqtai nazardan mas'uliyat manbasining masalasi murakkablashadi." },
          { kr: '알고리즘이 편향된 데이터를 학습할 가능성이 있어 주의가 필요하다.',  uz: "Algoritm tarafkash ma'lumot o'rganishi ehtimoli bo'lgani uchun ehtiyot bo'lish zarur." },
          { kr: 'AI가 의료 진단에 사용되는 셈이므로 정확성이 생명과 직결된다.',     uz: "AI tibbiy tashxisda ishlatiladigan hisoblanganidan aniqlik hayot bilan to'g'ridan to'g'ri bog'liq." },
          { kr: '인간이 AI를 통제해야 한다는 점에서 윤리 규범 마련이 시급하다.',    uz: "Inson AI ni nazorat qilishi kerakligi nuqtai nazardan etik normalar ishlab chiqish shoshilinch." },
        ]
      },
      vocabulary: [
        { kr: '인공지능',   romanization: 'ingongjineung',  uz: "sun'iy intellekt (AI)" },
        { kr: '윤리',       romanization: 'yulli',          uz: 'etika' },
        { kr: '책임',       romanization: 'chaegim',        uz: 'mas\'uliyat' },
        { kr: '판단',       romanization: 'pandan',         uz: 'qaror, hukm' },
        { kr: '통제',       romanization: 'tongje',         uz: 'nazorat' },
        { kr: '위험',       romanization: 'wihum',          uz: 'xavf' },
        { kr: '자율성',     romanization: 'jayulseong',     uz: 'mustaqillik, avtonom' },
        { kr: '알고리즘',   romanization: 'algollijeum',    uz: 'algoritm' },
        { kr: '편향',       romanization: 'pyeonhyang',     uz: 'tarafkashlik, bias' },
        { kr: '의존하다',   romanization: 'uijonhada',      uz: "bog'liq bo'lmoq" },
        { kr: '대체하다',   romanization: 'daecheehada',    uz: 'almashtirmoq' },
        { kr: '한계',       romanization: 'hangye',         uz: 'cheklov, chegara' },
        { kr: '책임 소재',  romanization: 'chaegim sojae',  uz: 'mas\'uliyat manbasi' },
        { kr: '규범',       romanization: 'gyubom',         uz: 'norma, qoida' },
        { kr: '투명성',     romanization: 'tumyeongseong',  uz: 'shaffoflik' },
        { kr: '데이터',     romanization: 'deiteo',         uz: "ma'lumot, data" },
        { kr: '딥러닝',     romanization: 'dipeoning',      uz: 'chuqur o\'rganish (deep learning)' },
        { kr: '설명 가능성',romanization: 'seolmyeong ganeungseong', uz: 'tushuntirish imkoni (explainability)' },
        { kr: '감시',       romanization: 'gamsi',          uz: 'kuzatish, nazorat' },
        { kr: '신뢰성',     romanization: 'sinrweseong',    uz: 'ishonchlilik' },
      ],
      examples: [
        { kr: 'AI가 의사 결정에 관여할수록 윤리적 기준이 필요하다는 공감대가 형성되고 있다.',  uz: "AI qaror qabul qilishda ishtirok etgan sari etik me'yorlar zarur, degan umumiy fikr shakllanmoqda." },
        { kr: '편향된 학습 데이터 탓에 AI가 특정 집단에 불리한 결정을 내릴 가능성이 있다.',   uz: "Tarafkash o'rganish ma'lumotlari sababli AI muayyan guruh uchun noqulay qaror qilishi ehtimoli bor." },
        { kr: '인간이 모든 AI 결정을 감독할 수밖에 없다는 점에서 기술 이해 능력이 중요해진다.',uz: "Inson barcha AI qarorlarini nazorat qilishi muqarrar nuqtai nazardan texnologiyani tushunish qobiliyati muhimlashadi." },
        { kr: 'AI가 법적 판단에도 활용되는 셈이므로 투명성과 설명 가능성이 핵심이다.',        uz: "AI huquqiy hukmlarda ham qo'llaniladigan hisoblanganidan shaffoflik va tushuntirish imkoni asosiy masala." },
        { kr: '자율 주행 자동차가 사고를 낼 경우 책임 소재를 명확히 할 수밖에 없다.',         uz: "Avtonom avtomobil avariya qilgan taqdirda mas'uliyat manbasini aniqlashtirish muqarrar." },
      ],
      dialog: [
        { speaker: 'A', kr: 'AI가 의료 진단에 활용되면 의사의 역할이 줄어들 수밖에 없겠네요.', uz: "AI tibbiy tashxisda qo'llanilsa shifokorning roli kamayadigan muqarrar ekan." },
        { speaker: 'B', kr: '그렇습니다. 하지만 AI가 독립적으로 판단한다는 점에서 책임 문제가 남아요.', uz: "Shunday. Lekin AI mustaqil qaror qiladigan nuqtai nazardan mas'uliyat masalasi qoladi." },
        { speaker: 'A', kr: '알고리즘이 편향된 결과를 낼 가능성도 있잖아요.',                  uz: "Algoritm tarafkash natija chiqarishi ehtimoli ham borku." },
        { speaker: 'B', kr: '맞아요. 그래서 AI 개발자와 사용자 모두 윤리적 책임을 져야 하는 셈이에요.', uz: "To'g'ri. Shuning uchun AI ishlab chiquvchi ham foydalanuvchi ham etik mas'uliyat ko'tarishi kerak hisoblanadi." },
        { speaker: 'A', kr: '그렇다면 AI 규범을 법적으로 제정할 필요가 있겠죠?',               uz: "Unday bo'lsa AI normalarini qonuniy jihatdan belgilash zarurati bor-ku?" },
        { speaker: 'B', kr: '네, 기술 발전을 막을 수는 없으니 규범을 만들 수밖에 없어요.',      uz: "Ha, texnologiya rivojlanishini to'xtatib bo'lmasa ham normalar yaratishdan boshqa iloj yo'q." },
      ],
      notes: [
        "수밖에 없다 (6-daraja): akademik esseyda muqarrarlik ifodalash uchun: 막을 수밖에 없다.",
        "-다는 점에서: nuqtai nazar ko'rsatish: 줄어든다는 점에서(kamayadigan nuqtai nazardan).",
        "가능성이 있다: ehtimol bildirish: 낼 가능성이 있다(chiqarishi ehtimoli bor).",
        "설명 가능성 (explainability) — AI etikasida muhim tushuncha: AI nima uchun shunday qaror qildi?",
        "책임 소재 (mas'uliyat manbasi) — AI voqealarida kim aybdor: ishlab chiquvchi, foydalanuvchi, yoki AI o'zi?",
      ],
      games: {
        matchPairs: [
          { kr: '윤리',     uz: 'etika' },
          { kr: '판단',     uz: 'qaror' },
          { kr: '편향',     uz: 'tarafkashlik' },
          { kr: '투명성',   uz: 'shaffoflik' },
          { kr: '자율성',   uz: 'mustaqillik' },
          { kr: '한계',     uz: 'cheklov' },
        ],
        fillBlank: [
          { sentence: '인간의 역할이 줄어들 수밖에 ___.',                          answer: '없다',      options: ['없다','있다','된다','한다'],           uz: "Inson roli kamayadigan muqarrar." },
          { sentence: 'AI가 판단한다는 ___ 책임 문제가 생긴다.',                    answer: '점에서',    options: ['점에서','탓에','반면에','데다가'],      uz: "AI qaror qiladigan nuqtai nazardan mas'uliyat muammosi paydo bo'ladi." },
          { sentence: '알고리즘이 편향된 결과를 낼 가능성이 ___.',                  answer: '있다',      options: ['있다','없다','된다','한다'],           uz: "Algoritm tarafkash natija chiqarishi ehtimoli bor." },
          { sentence: 'AI가 의료에 쓰이는 셈이므로 정확성이 생명과 ___.',           answer: '직결된다',  options: ['직결된다','관련있다','중요하다','필요하다'],uz:"AI tibbiyotda ishlatiladigan hisoblanganidan aniqlik hayot bilan to'g'ridan-to'g'ri bog'liq."},
          { sentence: '규범을 마련할 수밖에 없다는 ___ 입법이 시급하다.',            answer: '점에서',    options: ['점에서','탓에','반면에','데다가'],      uz: "Normalar yaratish muqarrar nuqtai nazardan qonunchilik shoshilinch." },
        ],
        scramble: [
          { kr: '인공지능', uz: "sun'iy intellekt" },
          { kr: '윤리',     uz: 'etika' },
          { kr: '편향',     uz: 'tarafkashlik' },
          { kr: '규범',     uz: 'norma' },
          { kr: '감시',     uz: 'nazorat' },
        ],
      },
    },
    quiz: [
      { question: "'-다는 점에서' nimani anglatadi?",                options: ['sababli','...jihatidan, nuqtai nazardan','lekin','shuning uchun'],          correct_index: 1 },
      { question: "'편향' nimani anglatadi?",                        options: ['mustaqillik','shaffoflik','tarafkashlik, bias','mas\'uliyat'],               correct_index: 2 },
      { question: "'투명성' nimani anglatadi?",                      options: ['ishonchlilik','etika','shaffoflik','nazorat'],                               correct_index: 2 },
      { question: "'책임 소재' nimani anglatadi?",                   options: ['mas\'uliyat','etika',"mas'uliyat manbasi",'nazorat'],                       correct_index: 2 },
      { question: "'설명 가능성' nima?",                             options: ['bashorat qilish','tushuntirish imkoni (explainability)','aniqlik','nazorat'],correct_index: 1 },
      { question: "'자율성' nimani anglatadi?",                      options: ['nazorat','mas\'uliyat','mustaqillik, avtonom','cheklov'],                   correct_index: 2 },
      { question: "'-을 수밖에 없다' 6-darajada qanday ishlatiladi?",options: ['oddiy inkor','akademik esseyda muqarrarlik ifodalash','savol','taklif'],    correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════════════
  // DARS 4: Atrof-muhit inqirozi va barqarorlik
  // 환경 위기와 지속 가능성
  // ════════════════════════════════════════════════════
  {
    track: 'TOPIK', level: 6, order_in_level: 4,
    title_kr: '환경 위기와 지속 가능성',
    title_uz: 'Atrof-muhit inqirozi va barqarorlik',
    is_free: false,
    content: {
      topic: {
        kr: '환경 문제는 심각할 뿐만 아니라 장기적인 영향을 미칩니다. 산업화의 결과 환경 오염이 심화됐습니다. 지구 온도가 상승한 것으로 나타났으며, 이를 해결하기 위해 국제적 협력을 강화할 수밖에 없습니다. 지속 가능한 발전이 인류의 과제입니다.',
        uz: "Atrof-muhit muammolari jiddiy bo'lishidan tashqari, uzoq muddatli ta'sir ko'rsatadi. Sanoatlashtirish natijasida atrof-muhit ifloslangan. Yer harorati ko'tarilganligi ma'lum bo'ldi, buni hal qilish uchun xalqaro hamkorlikni kuchaytirish muqarrar. Barqaror rivojlanish insoniyatning vazifasi."
      },
      grammar: {
        explanation: `-(으)ㄹ 뿐만 아니라 — nafaqat ..., balki ... ham (6-daraja chuqur)

Essay uslubida:
• 환경 문제는 심각할 뿐만 아니라 장기적 영향을 미친다.
  (Atrof-muhit muammolari nafaqat jiddiy, balki uzoq muddatli ta'sir ham ko'rsatadi.)
• 경제적 손실이 발생할 뿐만 아니라 생태계도 파괴된다.

-(으)ㄴ 결과 — ...natijasida (rasmiy, akademik):
• 산업화의 결과 오염이 심해졌다. (Sanoatlashtirish natijasida ifloslanish kuchaydi.)
• 연구한 결과 사실이 밝혀졌다. (Tadqiqot natijasida haqiqat aniqlandi.)

-(으)ㄹ 수밖에 없다 (정책 맥락):
• 국제 협력을 강화할 수밖에 없다. (Xalqaro hamkorlikni kuchaytirish muqarrar.)

-(으)ㄴ/는 것으로 나타났다 (데이터):
• 기온이 1.5도 상승한 것으로 나타났다. (Harorat 1.5 daraja ko'tarilganligi aniqlandi.)`,
        examples: [
          { kr: '기후 변화는 생태계를 파괴할 뿐만 아니라 인간의 생존도 위협한다.',    uz: "Iqlim o'zgarishi nafaqat ekotizimni vayron qiladi, balki inson yashashini ham tahdid qiladi." },
          { kr: '지속적인 개발의 결과 자원이 빠르게 고갈되고 있다.',                  uz: "Uzluksiz rivojlanish natijasida resurslar tezda tugamoqda." },
          { kr: '탄소 배출량이 지속적으로 증가한 것으로 나타났다.',                   uz: "Karbon chiqindilari uzluksiz oshganligi ma'lum bo'ldi." },
          { kr: '재생 에너지로의 전환을 서두를 수밖에 없는 상황이다.',                 uz: "Qayta tiklanadigan energiyaga o'tishni tezlashtirishdan boshqa iloj yo'q bo'lgan holat." },
          { kr: '기후 협약을 이행하지 않으면 더 큰 재앙이 올 수밖에 없다.',           uz: "Iqlim kelishuvini bajarmasa, kattaroq falokat muqarrar keladi." },
        ]
      },
      vocabulary: [
        { kr: '환경',           romanization: 'hwangyeong',      uz: 'atrof-muhit' },
        { kr: '오염',           romanization: 'oyeom',           uz: 'ifloslanish' },
        { kr: '자원',           romanization: 'jawon',           uz: 'resurs' },
        { kr: '고갈',           romanization: 'gogal',           uz: 'tugash, qurish' },
        { kr: '보호',           romanization: 'boho',            uz: 'himoya' },
        { kr: '개발',           romanization: 'gaebal',          uz: 'rivojlanish, o\'zlashtirish' },
        { kr: '지속 가능성',    romanization: 'jisok ganeungseong', uz: 'barqarorlik' },
        { kr: '기후 변화',      romanization: 'gihu byeonhwa',   uz: "iqlim o'zgarishi" },
        { kr: '배출',           romanization: 'baechul',         uz: 'chiqarish, emissiya' },
        { kr: '규제',           romanization: 'gyuje',           uz: 'tartibga solish, nazorat' },
        { kr: '정책',           romanization: 'jeongchaek',      uz: 'siyosat' },
        { kr: '재생 에너지',    romanization: 'jaesaeng eneoji', uz: 'qayta tiklanadigan energiya' },
        { kr: '생태계',         romanization: 'saengtaegye',     uz: 'ekotizim' },
        { kr: '탄소 중립',      romanization: 'tanso jungnip',   uz: 'karbon neytralligi' },
        { kr: '기후 협약',      romanization: 'gihu hyeobak',    uz: 'iqlim kelishuvi' },
        { kr: '재앙',           romanization: 'jaeang',          uz: 'falokat, ofat' },
        { kr: '생물 다양성',    romanization: 'saengmul dayang-seong', uz: 'biologik xilma-xillik' },
        { kr: '온실 가스',      romanization: 'onsil gaseu',     uz: 'issiqxona gazlari' },
        { kr: '기온 상승',      romanization: 'giyon sangseung', uz: 'harorat ko\'tarilishi' },
        { kr: '국제 협력',      romanization: 'gukje hyeomnyeok',uz: 'xalqaro hamkorlik' },
      ],
      examples: [
        { kr: '환경 오염은 인간의 건강을 해칠 뿐만 아니라 경제적 손실도 유발한다.',     uz: "Atrof-muhit iflosligi nafaqat inson salomatligiga zarar keltiradi, balki iqtisodiy zarar ham qo'zg'atadi." },
        { kr: '수십 년의 산업화의 결과 대기 오염이 심각한 수준에 이르렀다.',            uz: "O'nlab yillik sanoatlashtirish natijasida havo iflosligi jiddiy darajaga yetdi." },
        { kr: '해수면이 지속적으로 상승하고 있는 것으로 나타났다.',                     uz: "Dengiz sathining uzluksiz ko'tarilayotganligi ma'lum bo'ldi." },
        { kr: '파리 기후 협약에 따라 탄소 배출을 줄일 수밖에 없는 국제적 의무가 생겼다.',uz: "Parij iqlim kelishuviga ko'ra karbon chiqindisini kamaytirish muqarrar xalqaro majburiyat paydo bo'ldi." },
        { kr: '경제 성장과 환경 보호를 동시에 달성하는 것은 어렵지만 불가능하지만은 않다.',uz:"Iqtisodiy o'sish va atrof-muhitni himoya qilishni bir vaqtda erishish qiyin, lekin imkonsiz emas." },
      ],
      dialog: [
        { speaker: 'A', kr: '기후 변화가 지금보다 더 심각해질 것 같아요.',              uz: "Iqlim o'zgarishi hozirdan ham og'irroq bo'lishi mumkin shekilli." },
        { speaker: 'B', kr: '네, 기온 상승이 가속화되고 있는 것으로 나타났거든요.',      uz: "Ha, harorat ko'tarilishi tezlashayotganligi ma'lum bo'ldi." },
        { speaker: 'A', kr: '그러면 국제 사회가 적극적으로 나설 수밖에 없겠네요.',       uz: "Unday bo'lsa xalqaro hamjamiyat faol chiqishi muqarrar ekan." },
        { speaker: 'B', kr: '맞아요. 기후 협약을 준수하는 것이 경제에 부담이 될 뿐만 아니라 기회도 된다고 봐요.', uz: "To'g'ri. Iqlim kelishuviga amal qilish iqtisodga bosim bo'lishidan tashqari imkoniyat ham bo'ladi deb o'ylayman." },
        { speaker: 'A', kr: '재생 에너지 산업이 발전한 결과 일자리도 늘어나고 있죠?',    uz: "Qayta tiklanadigan energiya sanoati rivojlangan natijasida ish o'rinlari ham ko'paymoqda-ku?" },
        { speaker: 'B', kr: '정확해요. 지속 가능한 성장이 결국 모두에게 이익인 셈이에요.', uz: "Aniq. Barqaror o'sish oxir-oqibat hammaga foyda bo'lgan hisoblanadi." },
      ],
      notes: [
        "뿐만 아니라 (6-daraja essay): nafaqat A, balki B ham — argumentni kuchaytiradi.",
        "-(으)ㄴ 결과: rasmiy sabab-natija: 산업화의 결과(sanoatlashtirish natijasida).",
        "것으로 나타났다: ilmiy/statistik ma'lumot: 상승한 것으로 나타났다(ko'tarilganligi aniqlandi).",
        "탄소 중립 (net zero) — 2050-yilga qadar ko'p mamlakat maqsadi: chiqindi = yutib olish.",
        "지속 가능한 발전 (SDG) — BM maqsadlari 17 ta: iqtisod, ijtimoiy, ekologiya muvozanati.",
      ],
      games: {
        matchPairs: [
          { kr: '고갈',       uz: 'tugash' },
          { kr: '배출',       uz: 'emissiya' },
          { kr: '탄소 중립',  uz: 'karbon neytralligi' },
          { kr: '재앙',       uz: 'falokat' },
          { kr: '규제',       uz: 'nazorat' },
          { kr: '온실 가스',  uz: 'issiqxona gazlari' },
        ],
        fillBlank: [
          { sentence: '환경 문제는 심각할 뿐만 아니라 장기적 영향을 ___.',         answer: '미친다',    options: ['미친다','있다','된다','한다'],         uz: "Atrof-muhit muammolari nafaqat jiddiy, balki uzoq muddatli ta'sir ham ko'rsatadi." },
          { sentence: '산업화의 ___ 오염이 심해졌다.',                              answer: '결과',      options: ['결과','탓에','덕분에','반면에'],        uz: "Sanoatlashtirish natijasida ifloslanish kuchaydi." },
          { sentence: '기온이 상승한 것으로 ___.',                                  answer: '나타났다',  options: ['나타났다','보인다','있다','된다'],       uz: "Harorat ko'tarilganligi aniqlandi." },
          { sentence: '국제 협력을 강화할 수밖에 ___ 상황이다.',                    answer: '없는',      options: ['없는','있는','되는','하는'],           uz: "Xalqaro hamkorlikni kuchaytirish muqarrar bo'lgan holat." },
          { sentence: '지속 가능한 성장이 모두에게 이익인 ___.',                    answer: '셈이에요',  options: ['셈이에요','뿐이에요','따름이에요','것이에요'],uz:"Barqaror o'sish hammaga foyda bo'lgan hisoblanadi."},
        ],
        scramble: [
          { kr: '환경',   uz: 'atrof-muhit' },
          { kr: '오염',   uz: 'ifloslanish' },
          { kr: '배출',   uz: 'emissiya' },
          { kr: '규제',   uz: 'nazorat' },
          { kr: '재앙',   uz: 'falokat' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄹ 뿐만 아니라' essay uslubida qanday rolni bajaradi?", options: ['Sabab bildiradi','Argumentni kuchaytiradi (nafaqat A, balki B ham)','Inkor qiladi','Savol qo\'yadi'], correct_index: 1 },
      { question: "'산업화의 결과' nimani anglatadi?",                           options: ['sanoatlashtirish uchun','sanoatlashtirish sababli','sanoatlashtirish natijasida','sanoatlashtirish holida'], correct_index: 2 },
      { question: "'고갈' nimani anglatadi?",                                    options: ['ifloslanish','himoya','tugash, qurish','rivojlanish'],                correct_index: 2 },
      { question: "'탄소 중립' nimani anglatadi?",                               options: ['karbon chiqindisi','issiqxona gazi','karbon neytralligi','iqlim kelishuvi'], correct_index: 2 },
      { question: "'지속 가능성' nimani anglatadi?",                             options: ['rivojlanish','barqarorlik','ekotizim','siyosat'],                     correct_index: 1 },
      { question: "'온실 가스' nimani anglatadi?",                               options: ['havo iflosligi','issiqxona gazlari','emissiya','karbon'],             correct_index: 1 },
      { question: "'것으로 나타났다' qaysi uslubda ishlatiladi?",                options: ['norasmiy suhbat','ilmiy/statistik ma\'lumot berish','buyruq','so\'rash'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════════════
  // DARS 5: Ta'lim tizimining muammolari
  // 교육 시스템의 문제와 개선 방안
  // ════════════════════════════════════════════════════
  {
    track: 'TOPIK', level: 6, order_in_level: 5,
    title_kr: '교육 시스템의 문제와 개선 방안',
    title_uz: "Ta'lim tizimining muammolari va yaxshilash yo'llari",
    is_free: false,
    content: {
      topic: {
        kr: '경쟁이 심해질수록 학생들의 스트레스도 증가하는 것으로 나타났습니다. 과거에 비해 입시 경쟁이 더 치열해졌습니다. 교육 방식이 창의성을 억제하고 있는 것으로 보입니다. 교육 시스템을 개선할 필요가 있습니다.',
        uz: "Raqobat kuchaygan sari o'quvchilar stressi oshganligi ma'lum bo'ldi. O'tmishga nisbatan imtihon raqobati yanada keskinlashdi. Ta'lim tarzi kreativlikni bostirmoqdek ko'rinmoqda. Ta'lim tizimini yaxshilash zaruriyati bor."
      },
      grammar: {
        explanation: `-(으)ㄹ수록 — qanchalik ...bo'lsa, shunchalik ... (6-daraja qo'llash)

Essay uslubida:
• 경쟁이 심화될수록 창의성은 감소한다. (Raqobat kuchaygan sari kreativlik kamayadi.)
• 교육에 투자할수록 미래가 밝아진다. (Ta'limga sarmoya kiritgan sari kelajak yorqinlashadi.)

-(으)ㄴ/는 데 비해 — ...ga nisbatan, ...ga qaraganda (taqqoslash):
• 투자액에 비해 교육의 질이 낮다. (Sarmoyaga nisbatan ta'lim sifati past.)
• 과거에 비해 학업 부담이 커졌다. (O'tmishga nisbatan o'quv yuki ortdi.)

-(으)ㄴ/는 것으로 보이다 — ...ko'rinmoqda (kuzatish asosida):
• 교육 방식이 창의성을 억제하는 것으로 보인다.

-(으)ㄹ 필요가 있다 — ...zaruriyati bor:
• 평가 방식을 다양화할 필요가 있다. (Baholash tizimini xilma-xillashtirish zaruriyati bor.)`,
        examples: [
          { kr: '입시 경쟁이 치열해질수록 학생들의 정신 건강이 악화된다.',        uz: "Imtihon raqobati keskinlashgan sari o'quvchilar ruhiy salomatligi yomonlashadi." },
          { kr: '교육에 투자하는 비용에 비해 실질적인 교육의 질은 낮은 편이다.',   uz: "Ta'limga sarflangan xarajatga nisbatan haqiqiy ta'lim sifati past tomonda." },
          { kr: '현행 교육 시스템이 암기 위주로 운영되는 것으로 보인다.',          uz: "Amaldagi ta'lim tizimi yodlashga asoslanib ishlayotgandek ko'rinmoqda." },
          { kr: '창의적 사고를 함양할 수 있는 새로운 교육 방식을 도입할 필요가 있다.',uz:"Ijodiy fikrlashni rivojlantira oladigan yangi ta'lim usulini joriy etish zaruriyati bor." },
          { kr: '학습 시간이 길어질수록 학업 성취도가 반드시 높아지는 것은 아니다.',uz:"O'qish vaqti uzaygani sari o'quv natijalari albatta oshavermaydi." },
        ]
      },
      vocabulary: [
        { kr: '교육',       romanization: 'gyoyuk',      uz: "ta'lim" },
        { kr: '경쟁',       romanization: 'gyeongjaeng', uz: 'raqobat' },
        { kr: '성적',       romanization: 'seongjeok',   uz: 'baho, natija' },
        { kr: '시험',       romanization: 'siheom',      uz: 'imtihon' },
        { kr: '부담',       romanization: 'budam',       uz: 'bosim, yuk' },
        { kr: '창의성',     romanization: 'changeuiseong',uz: 'kreativlik' },
        { kr: '입시 중심',  romanization: 'ipsi jungsim',uz: 'imtihonga yo\'naltirilgan' },
        { kr: '평가 방식',  romanization: 'pyeongga bangsik', uz: 'baholash tizimi' },
        { kr: '암기 위주',  romanization: 'amgi wiju',   uz: 'yodlashga asoslangan' },
        { kr: '사고력',     romanization: 'sagoryeok',   uz: 'fikrlash qobiliyati' },
        { kr: '개선하다',   romanization: 'gaeseonhada', uz: 'yaxshilamoq' },
        { kr: '효율성',     romanization: 'hyoyulseong', uz: 'samaradorlik' },
        { kr: '학업 부담',  romanization: 'hakup budam', uz: "o'quv yuki" },
        { kr: '자기 주도',  romanization: 'jagi judo',   uz: 'mustaqil o\'qish' },
        { kr: '함양하다',   romanization: 'hamyanghada', uz: 'rivojlantirmoq, tarbiyalamoq' },
        { kr: '도입하다',   romanization: 'doiphada',    uz: 'joriy etmoq, kiritmoq' },
        { kr: '학습 동기',  romanization: 'haksup dongi',uz: "o'qish motivatsiyasi" },
        { kr: '비판적 사고',romanization: 'bipanjeok sago', uz: 'tanqidiy fikrlash' },
        { kr: '실질적이다', romanization: 'siljiljeogida',uz: 'haqiqiy, amaliy' },
        { kr: '다양화하다', romanization: 'dayanghwahada',uz: 'xilma-xillashtirmoq' },
      ],
      examples: [
        { kr: '학업 경쟁이 심화될수록 학생들의 정신 건강이 악화되는 것으로 나타났다.', uz: "O'quv raqobati kuchaygan sari o'quvchilar ruhiy salomatligi yomonlashganligi ma'lum bo'ldi." },
        { kr: '교육 투자액에 비해 학업 성취도가 낮다는 연구 결과가 발표됐다.',         uz: "Ta'lim sarmoyasiga nisbatan o'quv natijalari past, degan tadqiqot natijasi e'lon qilindi." },
        { kr: '현재 교육 시스템이 학생들의 잠재력을 충분히 발휘하지 못하게 하는 것으로 보인다.', uz: "Hozirgi ta'lim tizimi o'quvchilar salohiyatini yetarli namoyon qilishiga to'sqinlik qilayotgandek ko'rinmoqda." },
        { kr: '입시 위주의 교육에서 벗어나 창의적 교육으로 전환할 필요가 있다.',         uz: "Imtihonga yo'naltirilgan ta'limdan chiqib ijodiy ta'limga o'tish zaruriyati bor." },
        { kr: '교사의 역할을 재정의할수록 학생 중심의 교육이 가능해진다.',               uz: "O'qituvchi rolini qayta aniqlagan sari o'quvchi markazli ta'lim amalga oshadi." },
      ],
      dialog: [
        { speaker: 'A', kr: '한국 교육 시스템에서 가장 큰 문제가 뭐라고 생각해요?',             uz: "Koreya ta'lim tizimidagi eng katta muammo nima deb o'ylaysiz?" },
        { speaker: 'B', kr: '과도한 입시 경쟁인 것 같아요. 경쟁이 심해질수록 창의성이 억제되거든요.', uz: "Haddan tashqari imtihon raqobati shekilli. Raqobat kuchaygan sari kreativlik bostirilaveradi." },
        { speaker: 'A', kr: '다른 나라에 비해 학업 스트레스가 더 심한 편이죠?',                 uz: "Boshqa mamlakatlarga nisbatan o'quv stressi ko'proq tomonda-ku?" },
        { speaker: 'B', kr: '네. 교육 투자에 비해 학생들의 행복도는 낮은 것으로 나타났어요.',    uz: "Ha. Ta'lim sarmoyasiga nisbatan o'quvchilar baxti past ekanligi ma'lum bo'ldi." },
        { speaker: 'A', kr: '그렇다면 어떤 방향으로 개선할 필요가 있을까요?',                   uz: "Unday bo'lsa qaysi yo'nalishda yaxshilash zaruriyati bor?" },
        { speaker: 'B', kr: '평가 방식을 다양화하고 자기 주도 학습을 강화할 필요가 있어요.',     uz: "Baholash tizimini xilma-xillashtirish va mustaqil o'qishni kuchaytirish zaruriyati bor." },
      ],
      notes: [
        "-(으)ㄹ수록 (6-daraja): kuchli mantiqiy aloqa: 심해질수록 악화된다(kuchaygan sari yomonlashadi).",
        "-(으)ㄴ/는 데 비해: aniq taqqoslash: 투자에 비해(sarmoyaga nisbatan).",
        "것으로 보이다: kuzatish asosida: 억제하는 것으로 보인다(bostirmoqdek ko'rinmoqda).",
        "필요가 있다: zaruriyat: 도입할 필요가 있다(joriy etish zaruriyati bor).",
        "사고력 (fikrlash qobiliyati) — TOPIK 6 ta'lim esseylarida markaziy tushuncha: 비판적 사고(tanqidiy fikrlash), 창의적 사고(ijodiy fikrlash).",
      ],
      games: {
        matchPairs: [
          { kr: '창의성',   uz: 'kreativlik' },
          { kr: '사고력',   uz: 'fikrlash qobiliyati' },
          { kr: '부담',     uz: 'bosim, yuk' },
          { kr: '함양하다', uz: 'rivojlantirmoq' },
          { kr: '도입하다', uz: 'joriy etmoq' },
          { kr: '다양화',   uz: 'xilma-xillashtirish' },
        ],
        fillBlank: [
          { sentence: '경쟁이 심해질___스트레스도 증가한다.',                    answer: '수록',      options: ['수록','대신에','반면에','때문에'],      uz: "Raqobat kuchaygan sari stress ham oshadi." },
          { sentence: '투자에 ___ 교육의 질이 낮다.',                            answer: '비해',      options: ['비해','탓에','덕분에','데다가'],         uz: "Sarmoyaga nisbatan ta'lim sifati past." },
          { sentence: '교육 방식이 창의성을 억제하는 것으로 ___.',               answer: '보인다',    options: ['보인다','나타났다','있다','된다'],        uz: "Ta'lim tarzi kreativlikni bostirmoqdek ko'rinmoqda." },
          { sentence: '새로운 교육 방식을 도입할 필요가 ___.',                   answer: '있다',      options: ['있다','없다','된다','한다'],             uz: "Yangi ta'lim usulini joriy etish zaruriyati bor." },
          { sentence: '교육에 투자할수록 미래가 ___.',                           answer: '밝아진다',  options: ['밝아진다','어두워진다','변한다','없어진다'],uz:"Ta'limga sarmoya kiritgan sari kelajak yorqinlashadi."},
        ],
        scramble: [
          { kr: '교육',   uz: "ta'lim" },
          { kr: '경쟁',   uz: 'raqobat' },
          { kr: '창의성', uz: 'kreativlik' },
          { kr: '부담',   uz: 'yuk' },
          { kr: '개선',   uz: 'yaxshilash' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄹ수록' qanday mantiqiy aloqa bildiradi?",      options: ['Sabab-natija','Qanchalik...shunchalik...','Lekin','Shuning uchun'],           correct_index: 1 },
      { question: "'-(으)ㄴ/는 데 비해' nimani anglatadi?",               options: ['natijasida','...ga nisbatan, ...ga qaraganda','sababli','holda'],             correct_index: 1 },
      { question: "'창의성' nimani anglatadi?",                           options: ['fikrlash','raqobat','kreativlik','imtihon'],                                   correct_index: 2 },
      { question: "'함양하다' nimani anglatadi?",                         options: ['joriy etmoq','yaxshilamoq','rivojlantirmoq, tarbiyalamoq','o\'rganmoq'],       correct_index: 2 },
      { question: "'암기 위주' nimani anglatadi?",                        options: ["ijodiy o'qish","yodlashga asoslangan",'tanqidiy fikrlash','mustaqil o\'qish'], correct_index: 1 },
      { question: "'사고력' nimani anglatadi?",                           options: ['raqobat','yuk','fikrlash qobiliyati','ta\'lim sifati'],                        correct_index: 2 },
      { question: "'필요가 있다' nimani anglatadi?",                      options: ['imkon bor','muqarrar','zaruriyati bor','mumkin emas'],                         correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════════════
  // DARS 6: Raqamli jamiyat va insoniy munosabatlar
  // 디지털 사회와 인간 관계
  // ════════════════════════════════════════════════════
  {
    track: 'TOPIK', level: 6, order_in_level: 6,
    title_kr: '디지털 사회와 인간 관계',
    title_uz: 'Raqamli jamiyat va insoniy munosabatlar',
    is_free: false,
    content: {
      topic: {
        kr: '디지털 기술의 발달로 인해 소통은 늘었지만 인간 관계의 질이 낮아질 수도 있습니다. 온라인 소통이 증가하는 반면에 실제 대면 관계는 줄어드는 경향이 있습니다. 이는 단순한 연결일 뿐이며 깊은 관계로 발전하기 어렵습니다. 기술 발전의 결과 관계 방식 자체가 변화하고 있습니다.',
        uz: "Raqamli texnologiya rivojlanishi tufayli aloqa ko'paydi, lekin insoniy munosabatlar sifati pasayishi ham mumkin. Onlayn muloqot oshib borayotgan holda, haqiqiy yuzma-yuz munosabat kamayish tendensiyasi bor. Bu oddiy bog'lanish xolos va chuqur munosabatga rivojlanishi qiyin. Texnologiya rivoji natijasida munosabat tarzi o'zgarmoqda."
      },
      grammar: {
        explanation: `-(으)ㄹ 수도 있다 — ...ham mumkin (qo'shimcha ehtimol, neytral ton)

• 관계가 약해질 수도 있다. (Munosabat zaiflashishi ham mumkin.)
• 기술이 도움이 될 수도 있다. (Texnologiya yordam ham bera oladi.)

FARQ: -(으)ㄹ 수도 있다 vs -(으)ㄹ 수 있다
• 수도 있다 — ehtimol, aniq emas (neutral)
• 수 있다   — qobiliyat yoki imkoniyat (aniq)

-(으)ㄴ/는 반면에 (6-daraja chuqur):
• 소통량은 증가하는 반면에 관계의 깊이는 감소하고 있다.

-(으)ㄹ 뿐이다 — faqat ... xolos (cheklov):
• 이것은 단순한 연결일 뿐이다. (Bu oddiy bog'lanish xolos.)

-(으)ㄴ 결과:
• 기술 발전의 결과 관계 방식이 변했다.`,
        examples: [
          { kr: '과도한 SNS 사용이 고립감을 증가시킬 수도 있다.',       uz: "Haddan tashqari SNS ishlatish yolg'izlik hissini oshirishi ham mumkin." },
          { kr: '디지털 소통이 편리한 반면에 감정 전달은 제한적이다.',    uz: "Raqamli muloqot qulay bo'lgan holda his-tuyg'u yetkazish cheklangan." },
          { kr: '온라인 인맥은 늘었지만 진정한 친밀감은 얻기 어려울 뿐이다.',uz:"Onlayn tanishlar ko'paydi, lekin haqiqiy yaqinlik qozonish qiyin xolos." },
          { kr: '디지털화의 결과 인간 관계의 형태가 근본적으로 달라졌다.',  uz: "Raqamlashish natijasida insoniy munosabatlar shakli tubdan o'zgardi." },
          { kr: '기술이 인간 관계를 보완할 수도 있지만 대체할 수는 없다.', uz: "Texnologiya insoniy munosabatlarni to'ldirishi ham mumkin, lekin almashtirolmaydi." },
        ]
      },
      vocabulary: [
        { kr: '디지털',     romanization: 'dijiteol',   uz: 'raqamli' },
        { kr: '관계',       romanization: 'gwangye',    uz: 'munosabat' },
        { kr: '소통',       romanization: 'sotong',     uz: 'aloqa, muloqot' },
        { kr: '연결',       romanization: 'yeongyeol',  uz: "bog'lanish" },
        { kr: '거리',       romanization: 'geori',      uz: 'masofa, chegara' },
        { kr: '변화',       romanization: 'byeonhwa',   uz: "o'zgarish" },
        { kr: '의존하다',   romanization: 'uijonhada',  uz: "bog'liq bo'lmoq" },
        { kr: '단절',       romanization: 'danjeol',    uz: 'uzilish, aloqasizlik' },
        { kr: '고립',       romanization: 'gorip',      uz: "yolg'izlik, izolyatsiya" },
        { kr: '상호작용',   romanization: 'sanghojakyong', uz: 'interaksiya' },
        { kr: '피상적',     romanization: 'pisangjeok', uz: 'yuzaki, chuqur bo\'lmagan' },
        { kr: '심화되다',   romanization: 'simwadweda', uz: 'chuqurlashmoq' },
        { kr: '친밀감',     romanization: 'chinmilgam', uz: 'yaqinlik hissi' },
        { kr: '대면',       romanization: 'daemyeon',   uz: 'yuzma-yuz' },
        { kr: '비대면',     romanization: 'bidaemyeon', uz: 'yuzma-yuzsiz, masofaviy' },
        { kr: '온라인 인맥',romanization: 'onlain inmek',uz: 'onlayn tanishlar' },
        { kr: '감정 전달',  romanization: 'gamjeong jeondal', uz: "his-tuyg'u yetkazish" },
        { kr: '보완하다',   romanization: 'bowanhada',  uz: "to'ldirmoq, qo'shimcha qilmoq" },
        { kr: '고립감',     romanization: 'goripsam',   uz: "yolg'izlik, izolatsiya hissi" },
        { kr: '형태',       romanization: 'hyeongtae',  uz: 'shakl, forma' },
      ],
      examples: [
        { kr: 'SNS가 인간 관계를 풍부하게 만들 수도 있지만 오히려 고립감을 증가시킬 수도 있다.', uz: "SNS insoniy munosabatlarni boyitishi ham mumkin, lekin aksincha yolg'izlik hissini oshirishi ham mumkin." },
        { kr: '비대면 소통이 증가하는 반면에 공감 능력은 감소하는 경향이 있다.',              uz: "Masofaviy muloqot oshib borayotgan holda empatiya qobiliyati kamayish tendensiyasi bor." },
        { kr: '온라인 관계는 어디까지나 피상적일 뿐이라는 비판도 있다.',                     uz: "Onlayn munosabat qanday bo'lmasin yuzaki xolos, degan tanqid ham bor." },
        { kr: '디지털 기술의 발전의 결과 인간 관계의 시간적 공간적 제약이 사라졌다.',         uz: "Raqamli texnologiya rivojlanishi natijasida insoniy munosabatdagi vaqt va makon cheklovlari yo'qoldi." },
        { kr: '기술이 인간을 더 가깝게 연결할 수도 있지만 더 멀게 만들 수도 있다.',          uz: "Texnologiya odamlarni yaqinroq bog'lashi ham mumkin, lekin uzoqroq ham qilishi mumkin." },
      ],
      dialog: [
        { speaker: 'A', kr: 'SNS 덕분에 관계가 더 풍부해졌다고 생각해요?',                    uz: "SNS tufayli munosabatlar boyiroq bo'ldi deb o'ylaysizmi?" },
        { speaker: 'B', kr: '꼭 그렇지는 않아요. 온라인 소통이 증가하는 반면에 깊은 관계는 오히려 줄어드는 것 같아요.', uz: "Albatta shunday emas. Onlayn muloqot oshib borayotgan holda chuqur munosabat aksincha kamaymoqdek ko'rinadi." },
        { speaker: 'A', kr: '그럼 SNS가 관계에 부정적인 영향만 미친다고 보세요?',              uz: "Unday bo'lsa SNS munosabatga faqat salbiy ta'sir ko'rsatadi deb o'ylaysizmi?" },
        { speaker: 'B', kr: '아니요. 장거리 관계를 유지하는 데 도움이 될 수도 있어요. 하지만 그것만으로는 부족할 뿐이에요.', uz: "Yo'q. Uzoq masofali munosabatni saqlab qolishga yordam berishi ham mumkin. Lekin faqat shu yetarli xolos." },
        { speaker: 'A', kr: '그렇군요. 디지털 소통은 어디까지나 보완적인 도구일 뿐이군요.',    uz: "Shundaymi. Raqamli muloqot qanday bo'lmasin to'ldiruvchi vosita xolos ekan." },
        { speaker: 'B', kr: '정확해요. 디지털화의 결과 소통 방식은 변했지만 관계의 본질은 변하지 않아요.', uz: "Aniq. Raqamlashuv natijasida muloqot tarzi o'zgardi, lekin munosabatning mohiyati o'zgarmaydi." },
      ],
      notes: [
        "수도 있다 (neytral ehtimol) vs 수 있다 (aniq imkoniyat): 약해질 수도 있다(zaiflashishi ham mumkin).",
        "뿐이다: cheklov, boshqa narsa yo'q: 연결일 뿐이다(bog'lanish xolos).",
        "피상적 (yuzaki) — chuqur munosabatning aksi: 피상적 관계(yuzaki munosabat).",
        "대면 (yuzma-yuz) vs 비대면 (masofaviy) — COVID-19 dan keyin keng tarqalgan juftlik.",
        "고립감 (yolg'izlik hissi) — zamonaviy jamiyat muammosi: SNS paradoksi — ko'p ulanish, lekin yolg'izroq.",
      ],
      games: {
        matchPairs: [
          { kr: '단절',     uz: 'uzilish' },
          { kr: '고립',     uz: "yolg'izlik" },
          { kr: '피상적',   uz: 'yuzaki' },
          { kr: '친밀감',   uz: 'yaqinlik hissi' },
          { kr: '대면',     uz: 'yuzma-yuz' },
          { kr: '보완하다', uz: "to'ldirmoq" },
        ],
        fillBlank: [
          { sentence: '관계가 약해질 수도 ___.',                             answer: '있다',     options: ['있다','없다','된다','한다'],           uz: "Munosabat zaiflashishi ham mumkin." },
          { sentence: '소통은 늘었지만 관계의 질이 낮아질 수도 ___.',         answer: '있다',     options: ['있다','없다','된다','한다'],           uz: "Muloqot ko'paydi, lekin munosabatlar sifati pasayishi ham mumkin." },
          { sentence: '온라인 소통이 증가하는 반면에 대면 관계는 ___.',        answer: '줄어든다', options: ['줄어든다','늘어난다','변한다','없어진다'],uz:"Onlayn muloqot oshib borayotgan holda yuzma-yuz munosabat kamayadi."},
          { sentence: '이것은 단순한 연결일 ___.',                            answer: '뿐이다',   options: ['뿐이다','따름이다','셈이다','것이다'],   uz: "Bu oddiy bog'lanish xolos." },
          { sentence: '디지털화의 ___ 관계 방식이 변했다.',                   answer: '결과',     options: ['결과','탓에','덕분에','반면에'],         uz: "Raqamlashuv natijasida munosabat tarzi o'zgardi." },
        ],
        scramble: [
          { kr: '소통', uz: 'muloqot' },
          { kr: '관계', uz: 'munosabat' },
          { kr: '단절', uz: 'uzilish' },
          { kr: '고립', uz: "yolg'izlik" },
          { kr: '형태', uz: 'shakl' },
        ],
      },
    },
    quiz: [
      { question: "'수도 있다' va '수 있다' farqi?",                     options: ['Farq yo\'q','수도 있다 neytral ehtimol; 수 있다 aniq imkoniyat','수 있다 ehtimol','Ikkalasi ham aniq'], correct_index: 1 },
      { question: "'피상적' nimani anglatadi?",                          options: ['chuqur','yuzaki, chuqur bo\'lmagan','yaqin','real'],             correct_index: 1 },
      { question: "'단절' nimani anglatadi?",                            options: ['bog\'lanish','yaqinlik','uzilish, aloqasizlik','muloqot'],        correct_index: 2 },
      { question: "'비대면' nimani anglatadi?",                          options: ['yuzma-yuz','onlayn','yuzma-yuzsiz, masofaviy','raqamli'],        correct_index: 2 },
      { question: "'친밀감' nimani anglatadi?",                          options: ['aloqa','yaqinlik hissi','muloqot','bog\'lanish'],                 correct_index: 1 },
      { question: "'뿐이다' nimani anglatadi?",                          options: ['...ga teng','...faqat ...xolos, cheklov','ehtimol','muqarrar'],  correct_index: 1 },
      { question: "'보완하다' nimani anglatadi?",                        options: ['almashtirmoq','yo\'qotmoq',"to'ldirmoq, qo'shimcha qilmoq",'o\'zgartirmoq'], correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════════════
  // DARS 7: Qariyalaşayotgan jamiyat va ijtimoiy ta'minot
  // 고령화 사회와 복지 정책
  // ════════════════════════════════════════════════════
  {
    track: 'TOPIK', level: 6, order_in_level: 7,
    title_kr: '고령화 사회와 복지 정책',
    title_uz: "Qariyalaşayotgan jamiyat va ijtimoiy ta'minot siyosati",
    is_free: false,
    content: {
      topic: {
        kr: '고령 인구가 빠르게 증가할 것으로 예상됩니다. 고령 인구가 증가할수록 복지 부담도 커집니다. 저출산 문제에도 불구하고 수명 연장으로 인해 고령화가 가속화되고 있습니다. 지속 가능한 복지 정책 마련이 시급한 과제입니다.',
        uz: "Qariyalar soni tezda ko'payishi kutilmoqda. Qariyalar soni oshgan sari ijtimoiy ta'minot yuki ham ortadi. Past tug'ilish muammosiga qaramasdan, umr ko'rish uzayishi sababli qariyalaşish tezlashmoqda. Barqaror ijtimoiy ta'minot siyosatini ishlab chiqish shoshilinch vazifa."
      },
      grammar: {
        explanation: `-(으)ㄹ 것으로 예상되다 — kutilmoqda, bashorat qilinmoqda (rasmiy bashorat)

Tuzilish: [fe'l + (으)ㄹ 것으로 예상되다]
• 고령 인구가 증가할 것으로 예상된다. (Qariyalar soni ko'payishi kutilmoqda.)
• 비용이 늘어날 것으로 예상된다. (Xarajat oshishi bashorat qilinmoqda.)

-(으)ㄹ수록 (사회 구조 논리):
• 고령 인구가 증가할수록 사회 보장 비용도 늘어난다.
  (Qariyalar soni oshgan sari ijtimoiy ta'minot xarajati ham ortadi.)

-에도 불구하고 — ...ga qaramasdan (kutilmagan ziddiyat):
• 저출산에도 불구하고 고령화는 계속되고 있다.
  (Past tug'ilishga qaramasdan, qariyalaşish davom etmoqda.)
• 어려움에도 불구하고 성공했다. (Qiyinchiliklarga qaramasdan muvaffaq bo'ldi.)`,
        examples: [
          { kr: '2040년에는 노인 인구가 전체의 40%를 차지할 것으로 예상된다.',      uz: "2040-yilda keksalar aholining 40%ini tashkil qilishi kutilmoqda." },
          { kr: '노인 인구가 늘어날수록 연금 재정 압박도 증가한다.',                  uz: "Keksalar soni ko'paygani sari pensiya moliyaviy bosimi ham oshadi." },
          { kr: '출생률 감소에도 불구하고 평균 수명 연장으로 고령화가 가속화됐다.',   uz: "Tug'ilish darajasi pasayishiga qaramasdan, o'rtacha umr uzayishi tufayli qariyalaşish tezlashdi." },
          { kr: '복지 지출이 증가할 것으로 예상되는 만큼 세수 확보가 시급하다.',      uz: "Ijtimoiy ta'minot xarajati oshishi kutilganligi uchun soliq daromadi ta'minlash shoshilinch." },
          { kr: '재정 압박에도 불구하고 노인 복지 서비스를 축소할 수는 없다.',        uz: "Moliyaviy bosimga qaramasdan, keksalar ijtimoiy xizmatini qisqartirish mumkin emas." },
        ]
      },
      vocabulary: [
        { kr: '고령화',       romanization: 'goryanghwa',        uz: 'qariyalaşish' },
        { kr: '출생률',       romanization: 'chulssaengnyul',    uz: "tug'ilish darajasi" },
        { kr: '평균 수명',    romanization: 'pyeonggyun sumyeong',uz: "o'rtacha umr ko'rish" },
        { kr: '노동력',       romanization: 'nodongnyeok',       uz: 'mehnat kuchi' },
        { kr: '연금',         romanization: 'yeongyeum',         uz: 'pensiya' },
        { kr: '복지',         romanization: 'bokji',             uz: "ijtimoiy ta'minot, ne'mat" },
        { kr: '부양 부담',    romanization: 'buyang budam',       uz: 'boqish yuki' },
        { kr: '사회 보장',    romanization: 'sahoe bojang',       uz: "ijtimoiy ta'minot" },
        { kr: '재정 압박',    romanization: 'jaejeong apbak',     uz: 'moliyaviy bosim' },
        { kr: '의료 인프라',  romanization: 'uiryo inpeura',      uz: 'tibbiy infratuzilma' },
        { kr: '세대 간 갈등', romanization: 'sede gan galdeung',  uz: 'avlodlar orasidagi ziddiyat' },
        { kr: '수명 연장',    romanization: 'sumyeong yeonjang',  uz: 'umr uzayishi' },
        { kr: '저출산',       romanization: 'jeochulsan',        uz: 'past tug\'ilish' },
        { kr: '노인 빈곤',    romanization: 'noin bingon',        uz: 'keksalar qashshoqligi' },
        { kr: '세수',         romanization: 'sesu',               uz: 'soliq daromadi' },
        { kr: '지속 가능하다',romanization: 'jisok ganeunghada',  uz: 'barqaror bo\'lmoq' },
        { kr: '고령 친화적',  romanization: 'goryang chinwajjeok',uz: 'keksalar uchun qulay' },
        { kr: '의존율',       romanization: 'uijonnyul',          uz: "bog'liqlik darajasi" },
        { kr: '재원',         romanization: 'jaewon',             uz: 'moliyaviy manba' },
        { kr: '정년',         romanization: 'jeongnyeon',         uz: 'pensiya yoshi, ishdagi oxirgi yosh' },
      ],
      examples: [
        { kr: '한국의 고령화 속도는 세계에서 가장 빠를 것으로 예상된다.',             uz: "Koreyadagi qariyalaşish tezligi dunyodagi eng tez bo'lishi kutilmoqda." },
        { kr: '고령 인구가 늘어날수록 젊은 세대의 세금 부담도 증가할 수밖에 없다.',   uz: "Keksalar soni ko'paygani sari yosh avlod soliq yuki ham muqarrar oshadi." },
        { kr: '저출산 문제에도 불구하고 정부의 출산 장려 정책이 성과를 거두지 못했다.',uz:"Past tug'ilish muammosiga qaramasdan, hukumatning tug'ilishni rag'batlantirish siyosati natija bermadi." },
        { kr: '노인 빈곤율이 OECD 국가 중 가장 높은 것으로 나타났다.',               uz: "Keksalar qashshoqlik darajasi OECD mamlakatlari orasida eng yuqori ekanligi ma'lum bo'ldi." },
        { kr: '재정 압박에도 불구하고 지속 가능한 복지 시스템을 구축해야 한다.',       uz: "Moliyaviy bosimga qaramasdan, barqaror ijtimoiy ta'minot tizimini qurishga to'g'ri keladi." },
      ],
      dialog: [
        { speaker: 'A', kr: '고령화 사회가 경제에 어떤 영향을 미칠까요?',                   uz: "Qariyalaşayotgan jamiyat iqtisodga qanday ta'sir qiladi?" },
        { speaker: 'B', kr: '노동력이 감소할 것으로 예상되고, 복지 비용은 증가할 것으로 예상돼요.', uz: "Mehnat kuchi kamayishi kutilmoqda va ijtimoiy ta'minot xarajati oshishi ham bashorat qilinmoqda." },
        { speaker: 'A', kr: '저출산에도 불구하고 고령화가 계속되는 이유가 뭐예요?',            uz: "Past tug'ilishga qaramasdan qariyalaşish davom etayotganning sababi nima?" },
        { speaker: 'B', kr: '평균 수명이 늘어날수록 고령 인구가 증가하기 때문이에요.',          uz: "O'rtacha umr uzaygani sari keksalar soni ko'payadigan bo'lgani uchun." },
        { speaker: 'A', kr: '그렇다면 어떤 정책이 필요할까요?',                               uz: "Unday bo'lsa qanday siyosat zarur?" },
        { speaker: 'B', kr: '정년 연장, 이민 정책 개선, 지속 가능한 연금 시스템 구축이 필요할 것으로 예상돼요.', uz: "Pensiya yoshini uzaytirish, immigratsiya siyosatini yaxshilash, barqaror pensiya tizimini qurish zarur bo'lishi kutilmoqda." },
      ],
      notes: [
        "-(으)ㄹ 것으로 예상되다: rasmiy bashorat: 증가할 것으로 예상된다(oshishi kutilmoqda).",
        "-에도 불구하고: kutilmagan holat: 어려움에도 불구하고(qiyinchiliklarga qaramasdan).",
        "고령화 (qariyalaşish) — Koreya eng tez qariyalaşayotgan mamlakatlardan biri.",
        "저출산 (past tug'ilish) — 한국 합계 출산율 0.72 (2023) — dunyodagi eng past ko'rsatkich.",
        "부양 부담 (boqish yuki) — ishlaydiganlar / ishlayolmaydiganlar nisbati.",
      ],
      games: {
        matchPairs: [
          { kr: '고령화',   uz: 'qariyalaşish' },
          { kr: '저출산',   uz: "past tug'ilish" },
          { kr: '연금',     uz: 'pensiya' },
          { kr: '복지',     uz: "ijtimoiy ta'minot" },
          { kr: '수명 연장',uz: 'umr uzayishi' },
          { kr: '세수',     uz: 'soliq daromadi' },
        ],
        fillBlank: [
          { sentence: '노인 인구가 40%를 차지할 것으로 ___.',                   answer: '예상된다',  options: ['예상된다','나타났다','보인다','있다'],     uz: "Keksalar 40%ini tashkil qilishi kutilmoqda." },
          { sentence: '고령 인구가 늘어날___복지 부담도 증가한다.',              answer: '수록',      options: ['수록','때문에','대신에','반면에'],         uz: "Keksalar soni ko'paygani sari ijtimoiy ta'minot yuki oshadi." },
          { sentence: '저출산___고령화는 계속되고 있다.',                         answer: '에도 불구하고', options: ['에도 불구하고','덕분에','탓에','때문에'],uz:"Past tug'ilishga qaramasdan qariyalaşish davom etmoqda."},
          { sentence: '재정 압박___지속 가능한 복지를 구축해야 한다.',            answer: '에도 불구하고', options: ['에도 불구하고','덕분에','탓에','반면에'],uz:"Moliyaviy bosimga qaramasdan barqaror ijtimoiy ta'minot qurilishi kerak."},
          { sentence: '복지 지출이 증가할 것으로 예상되는 만큼 세수 확보가 ___.',answer: '시급하다',  options: ['시급하다','좋다','없다','된다'],           uz: "Xarajat oshishi kutilganligi uchun soliq daromadi ta'minlash shoshilinch." },
        ],
        scramble: [
          { kr: '고령화', uz: 'qariyalaşish' },
          { kr: '연금',   uz: 'pensiya' },
          { kr: '복지',   uz: "ijtimoiy ta'minot" },
          { kr: '세수',   uz: 'soliq' },
          { kr: '부양',   uz: 'boqish' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄹ 것으로 예상되다' qanday ma'no bildiradi?",   options: ['ehtimol bor','kutilmoqda, bashorat qilinmoqda','muqarrar','mumkin emas'],  correct_index: 1 },
      { question: "'-에도 불구하고' nimani anglatadi?",                   options: ['sababli','tufayli','...ga qaramasdan','shuning uchun'],                     correct_index: 2 },
      { question: "'저출산' nimani anglatadi?",                           options: ['yuqori tug\'ilish','keksalar soni',"past tug'ilish",'pensiya yoshi'],         correct_index: 2 },
      { question: "'부양 부담' nimani anglatadi?",                        options: ['pensiya','soliq','boqish yuki',"ijtimoiy ta'minot"],                         correct_index: 2 },
      { question: "'세수' nimani anglatadi?",                             options: ['xarajat','nafaqa','soliq daromadi','moliyaviy bosim'],                       correct_index: 2 },
      { question: "'수명 연장' nimani anglatadi?",                        options: ['umr qisqarishi','umr uzayishi','tug\'ilish oshishi','pensiya yoshi'],        correct_index: 1 },
      { question: "'지속 가능하다' nimani anglatadi?",                    options: ['qimmat','barqaror bo\'lmoq','samarali','shoshilinch'],                       correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════════════
  // DARS 8: OAV roli va mas'uliyati
  // 미디어의 역할과 책임
  // ════════════════════════════════════════════════════
  {
    track: 'TOPIK', level: 6, order_in_level: 8,
    title_kr: '미디어의 역할과 책임',
    title_uz: "OAV roli va mas'uliyati",
    is_free: false,
    content: {
      topic: {
        kr: '미디어는 자극적인 내용을 강조하는 경향이 있습니다. 가짜 뉴스로 인해 사회적 혼란이 발생하고 있습니다. 미디어가 공정성을 유지하는 한 신뢰를 얻을 수 있습니다. 언론 자유는 보장되는 것으로 알려져 있지만 책임도 함께 따릅니다.',
        uz: "OAV da'vogar mazmunni ta'kidlash tendensiyasi bor. Soxta yangiliklar tufayli ijtimoiy tartibsizlik yuzaga kelmoqda. OAV adolatlilikni saqlagan taqdirda ishonch qozonishi mumkin. Matbuot erkinligi kafolatlangandir, lekin mas'uliyat ham birga keladi."
      },
      grammar: {
        explanation: `-(으)ㄴ/는 경향이 있다 — ...tendensiyasi bor, ...moyilligi bor

• 미디어는 자극적인 내용을 강조하는 경향이 있다.
  (OAV da'vogar mazmunni ta'kidlash tendensiyasi bor.)
• 사람들은 확증 편향을 보이는 경향이 있다.
  (Odamlar tasdiqlash tarafkashligini ko'rsatish tendensiyasi bor.)

-(으)로 인해 — ...tufayli, ...sabab (rasmiy sabab, asosan salbiy):
• 가짜 뉴스로 인해 혼란이 발생했다. (Soxta yangiliklar tufayli tartibsizlik yuzaga keldi.)

-(으)ㄴ/는 한 — ...qachonki, ...taqdirda (shart):
• 공정성을 유지하는 한 신뢰를 얻을 수 있다. (Adolatlilikni saqlaganda ishonch qozonish mumkin.)
• 노력하는 한 성공할 수 있다. (Harakat qilgan taqdirda muvaffaq bo'lish mumkin.)

-(으)ㄴ/는 것으로 알려져 있다 — ...deb ma'lum, ...deb tanilgan:
• 언론 자유가 보장된 것으로 알려져 있다. (Matbuot erkinligi kafolatlangandir deb ma'lum.)`,
        examples: [
          { kr: '온라인 미디어는 자극적인 제목을 사용하는 경향이 있어 비판적 수용이 필요하다.', uz: "Onlayn OAV da'vogar sarlavha ishlatish tendensiyasi bor, shuning uchun tanqidiy qabul zarur." },
          { kr: '허위 정보의 확산으로 인해 사회적 불신이 심화됐다.',                         uz: "Noto'g'ri ma'lumot tarqalishi tufayli ijtimoiy ishonchsizlik chuqurlashdi." },
          { kr: '미디어가 다양한 관점을 반영하는 한 민주주의에 기여할 수 있다.',               uz: "OAV xilma-xil nuqtai nazarni aks ettirganda demokratiyaga hissa qo'shishi mumkin." },
          { kr: '한국의 언론 자유 수준이 세계 50위권인 것으로 알려져 있다.',                   uz: "Koreya matbuot erkinligi darajasi dunyo 50-ligida ekanligi ma'lum." },
          { kr: '미디어 리터러시 교육이 강화되지 않는 한 가짜 뉴스 문제는 해결되기 어렵다.',    uz: "Media savodxonlik ta'limi kuchaytirilmagan taqdirda soxta yangilik muammosi hal bo'lishi qiyin." },
        ]
      },
      vocabulary: [
        { kr: '미디어',     romanization: 'midio',             uz: 'OAV, media' },
        { kr: '여론',       romanization: 'yeoron',            uz: 'jamoatchilik fikri' },
        { kr: '편향',       romanization: 'pyeonhyang',        uz: 'tarafkashlik' },
        { kr: '가짜 뉴스',  romanization: 'gajja nyuseu',      uz: 'soxta yangilik' },
        { kr: '신뢰성',     romanization: 'sinrweseong',       uz: 'ishonchlilik' },
        { kr: '책임',       romanization: 'chaegim',           uz: "mas'uliyat" },
        { kr: '여론 조작',  romanization: 'yeoron jojak',      uz: 'jamoat fikrini manipulyatsiya' },
        { kr: '언론 자유',  romanization: 'eollon jayu',       uz: 'matbuot erkinligi' },
        { kr: '정보 격차',  romanization: 'jeongbo gyeokcha',  uz: 'axborot tengsizligi' },
        { kr: '확산되다',   romanization: 'hwaksandweda',      uz: 'tarqalmoq' },
        { kr: '검증하다',   romanization: 'geomjeunghada',     uz: "tekshirmoq, tasdiqlamoq" },
        { kr: '공익',       romanization: 'gongik',            uz: 'jamoat manfaati' },
        { kr: '공정성',     romanization: 'gongjeongseoong',   uz: 'adolatlilik' },
        { kr: '확증 편향',  romanization: 'hwakjeung pyeonhyang',uz: 'tasdiqlash tarafkashligi' },
        { kr: '미디어 리터러시', romanization: 'midio ritoerosi',uz: 'media savodxonlik' },
        { kr: '허위 정보',  romanization: 'heowi jeongbo',     uz: "noto'g'ri ma'lumot" },
        { kr: '알고리즘 거품', romanization: 'algollijeum geopeom',uz: 'algoritm pufakchasi (filter bubble)' },
        { kr: '민주주의',   romanization: 'minjujuui',         uz: 'demokratiya' },
        { kr: '비판적 수용',romanization: 'bipanjeok suyong',  uz: 'tanqidiy qabul qilish' },
        { kr: '자극적',     romanization: 'jagujeok',          uz: "da'vogar, stimullovchi" },
      ],
      examples: [
        { kr: '소셜 미디어는 사용자의 선호를 강화하는 경향이 있어 알고리즘 거품이 우려된다.',  uz: "Ijtimoiy media foydalanuvchi xohishini kuchaytirish tendensiyasi bor, shuning uchun algoritm pufakchasi xavotir tug'diradi." },
        { kr: '허위 정보의 확산으로 인해 민주주의적 의사 결정이 위협받고 있다.',              uz: "Noto'g'ri ma'lumot tarqalishi tufayli demokratik qaror qabul qilish tahdid ostida." },
        { kr: '미디어가 다양한 관점을 균형 있게 제시하는 한 건전한 여론 형성이 가능하다.',     uz: "OAV xilma-xil nuqtai nazarni muvozanatli taqdim etganda sog'lom jamoat fikri shakllanishi mumkin." },
        { kr: '가짜 뉴스가 실제 뉴스보다 더 빨리 퍼지는 것으로 알려져 있다.',               uz: "Soxta yangiliklar haqiqiy yangilikdan tezroq tarqalishi ma'lum." },
        { kr: '미디어 리터러시 교육이 강화되는 한 정보 격차 문제도 줄어들 수 있다.',          uz: "Media savodxonlik ta'limi kuchaytirilganda axborot tengsizligi muammosi ham kamayishi mumkin." },
      ],
      dialog: [
        { speaker: 'A', kr: '요즘 가짜 뉴스 문제가 심각한데 어떻게 대처해야 할까요?',         uz: "Hozirda soxta yangilik muammosi jiddiy, qanday kurashish kerak?" },
        { speaker: 'B', kr: '먼저 미디어 리터러시 교육을 강화할 필요가 있어요. 사람들은 자신이 믿고 싶은 것을 믿는 경향이 있으니까요.', uz: "Avvalo media savodxonlik ta'limini kuchaytirish zarur. Odamlar o'zi ishonmoqchi narsani ishonish tendensiyasi borku." },
        { speaker: 'A', kr: '미디어 자체의 책임도 크지 않나요?',                              uz: "OAVning o'z mas'uliyati ham katta emasmi?" },
        { speaker: 'B', kr: '네. 미디어가 공익을 우선시하는 한 신뢰를 유지할 수 있어요.',      uz: "Ha. OAV jamoat manfaatini birinchi o'ringa qo'yganda ishonchni saqlab qolishi mumkin." },
        { speaker: 'A', kr: '그런데 클릭 수에 따라 수익이 결정되는 구조로 인해 자극적 콘텐츠가 늘고 있잖아요.', uz: "Lekin klik soniga qarab daromad belgilanadigan tuzilma tufayli da'vogar kontent ko'paymoqda-ku." },
        { speaker: 'B', kr: '바로 그게 문제예요. 구조 개혁 없이는 미디어 윤리를 기대하기 어렵다는 것으로 알려져 있어요.', uz: "Ayni shu muammo. Tuzilmaviy islohot bo'lmasdan OAV etikasini kutish qiyin deb ma'lum." },
      ],
      notes: [
        "-는 경향이 있다: tendensiya: 강조하는 경향이 있다(ta'kidlash tendensiyasi bor).",
        "-(으)로 인해: rasmiy sabab, asosan salbiy: 가짜 뉴스로 인해(soxta yangiliklar tufayli). 덕분에 ijobiy uchun.",
        "-(으)ㄴ/는 한: shart: 유지하는 한(saqlagan taqdirda), 노력하는 한(harakat qilganda).",
        "것으로 알려져 있다: umumiy ma'lumot: 알려져 있다(ma'lum, tanilgan).",
        "알고리즘 거품 (filter bubble) — foydalanuvchi faqat o'zi yoqtirganini ko'rib, boshqa nuqtai nazarlardan ajralib qolish holati.",
      ],
      games: {
        matchPairs: [
          { kr: '여론',     uz: 'jamoatchilik fikri' },
          { kr: '편향',     uz: 'tarafkashlik' },
          { kr: '공정성',   uz: 'adolatlilik' },
          { kr: '검증하다', uz: 'tekshirmoq' },
          { kr: '공익',     uz: 'jamoat manfaati' },
          { kr: '자극적',   uz: "da'vogar" },
        ],
        fillBlank: [
          { sentence: '미디어는 자극적인 내용을 강조하는 경향이 ___.',                  answer: '있다',      options: ['있다','없다','된다','한다'],            uz: "OAV da'vogar mazmunni ta'kidlash tendensiyasi bor." },
          { sentence: '가짜 뉴스로 ___ 사회 혼란이 발생했다.',                          answer: '인해',      options: ['인해','탓에','덕분에','인하여'],         uz: "Soxta yangiliklar tufayli ijtimoiy tartibsizlik yuzaga keldi." },
          { sentence: '공정성을 유지하는 ___ 신뢰를 얻을 수 있다.',                     answer: '한',        options: ['한','수록','데다가','반면에'],           uz: "Adolatlilikni saqlagan taqdirda ishonch qozonish mumkin." },
          { sentence: '언론 자유가 보장된 것으로 알려져 ___.',                          answer: '있다',      options: ['있다','없다','된다','보인다'],           uz: "Matbuot erkinligi kafolatlangandir deb ma'lum." },
          { sentence: '미디어 리터러시 교육이 강화되지 않는 ___ 문제는 해결되기 어렵다.',answer: '한',       options: ['한','수록','데다가','반면에'],           uz: "Ta'lim kuchaytirilmagan taqdirda muammo hal bo'lishi qiyin." },
        ],
        scramble: [
          { kr: '미디어', uz: 'OAV' },
          { kr: '편향',   uz: 'tarafkashlik' },
          { kr: '신뢰',   uz: 'ishonch' },
          { kr: '검증',   uz: 'tekshirish' },
          { kr: '공익',   uz: 'jamoat manfaati' },
        ],
      },
    },
    quiz: [
      { question: "'-는 경향이 있다' nimani anglatadi?",               options: ['muqarrar','...tendensiyasi bor, moyilligi bor','mumkin','kerak'],                correct_index: 1 },
      { question: "'-(으)로 인해' va '덕분에' farqi?",                  options: ['Farq yo\'q','인해 asosan salbiy; 덕분에 ijobiy','덕분에 salbiy','Ikkalasi salbiy'], correct_index: 1 },
      { question: "'-(으)ㄴ/는 한' nimani anglatadi?",                  options: ['sababli','...qachonki, ...taqdirda (shart)','lekin','natijasida'],                correct_index: 1 },
      { question: "'가짜 뉴스' nimani anglatadi?",                      options: ['qiziqarli yangilik','tarafkash yangilik','soxta yangilik','og\'ir yangilik'],     correct_index: 2 },
      { question: "'공정성' nimani anglatadi?",                         options: ['ishonchlilik','jamoat manfaati','adolatlilik','mas\'uliyat'],                     correct_index: 2 },
      { question: "'알고리즘 거품' nima?",                              options: ['raqamli muammo','soxta yangilik','algoritm pufakchasi (filter bubble)','OAV tarafkashligi'], correct_index: 2 },
      { question: "'것으로 알려져 있다' nimani anglatadi?",             options: ['kutilmoqda','ko\'rinmoqda','...deb ma\'lum, tanilgan','aniqlandi'],               correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════════════
  // DARS 9: Ko'p madaniyatli jamiyat va ijtimoiy integratsiya
  // 다문화 사회와 사회 통합
  // ════════════════════════════════════════════════════
  {
    track: 'TOPIK', level: 6, order_in_level: 9,
    title_kr: '다문화 사회와 사회 통합',
    title_uz: "Ko'p madaniyatli jamiyat va ijtimoiy integratsiya",
    is_free: false,
    content: {
      topic: {
        kr: '다양한 문화가 공존하는 만큼 갈등이 발생할 가능성도 큽니다. 사회 통합을 이루려면 상호 이해와 존중이 필요합니다. 다문화 정책을 수립하는 데 있어서 소수 집단의 의견을 반영해야 합니다. 통합은 동화가 아니라 공존을 의미하는 셈입니다.',
        uz: "Xilma-xil madaniyatlar birga yashagani uchun ziddiyat yuzaga kelish ehtimoli ham katta. Ijtimoiy integratsiyaga erishish uchun o'zaro tushunish va hurmat zarur. Ko'p madaniyatli siyosat ishlab chiqishda ozchiliklarning fikrlari aks ettirilishi kerak. Integratsiya assimilyatsiya emas, balki birga yashashni bildirgan hisoblanadi."
      },
      grammar: {
        explanation: `-(으)ㄴ/는 만큼 — ...qadар, ...darajada, ...bo'lgani uchun (6-daraja chuqur)

• 다양한 문화가 공존하는 만큼 갈등 가능성도 크다.
  (Xilma-xil madaniyatlar birga yashagani uchun ziddiyat ehtimoli ham katta.)
• 노력한 만큼 성과가 나온다. (Harakat qilgan qadar natija chiqadi.)

-(으)려면 — ...qilmoqchi bo'lsa, ...uchun zarur bo'lsa:
• 사회 통합을 이루려면 상호 이해가 필요하다.
  (Ijtimoiy integratsiyaga erishmoqchi bo'lsa o'zaro tushunish zarur.)
• 성공하려면 포기하지 말아야 한다. (Muvaffaq bo'lmoqchi bo'lsa taslim bo'lmaslik kerak.)

-(으)ㄴ/는 데 있어서 — ...jihatida, ...bo'yicha (rasmiy ko'rsatkich):
• 정책을 수립하는 데 있어서 소수 의견을 반영해야 한다.
  (Siyosat ishlab chiqish jihatida ozchilik fikri aks ettirilishi kerak.)

-(으)ㄴ/는 반면에 (심화):
• 경제 발전을 이룬 반면에 사회 통합은 미흡하다.`,
        examples: [
          { kr: '이민자가 증가하는 만큼 사회 통합 정책의 중요성도 커지고 있다.',         uz: "Immigrantlar ko'paygani uchun ijtimoiy integratsiya siyosatining ahamiyati ham ortmoqda." },
          { kr: '진정한 다문화 사회를 만들려면 제도적 지원이 필요하다.',                 uz: "Haqiqiy ko'p madaniyatli jamiyat yaratmoqchi bo'lsa institutsional qo'llab-quvvatlash zarur." },
          { kr: '다문화 교육을 실시하는 데 있어서 교사의 역량이 핵심이다.',              uz: "Ko'p madaniyatli ta'lim o'tkazish jihatida o'qituvchi qobiliyati markaziy masala." },
          { kr: '이민자가 늘어나는 반면에 사회적 수용 능력이 뒤처지고 있다.',            uz: "Immigrantlar ko'payib borayotgan holda ijtimoiy qabul qilish qobiliyati orqada qolmoqda." },
          { kr: '문화적 다양성을 인정하는 만큼 사회의 창의성도 높아진다.',               uz: "Madaniy xilma-xillikni tan olgani uchun jamiyatning kreativligi ham oshadi." },
        ]
      },
      vocabulary: [
        { kr: '다문화',     romanization: 'damunhwa',        uz: "ko'p madaniyatli" },
        { kr: '이민',       romanization: 'imin',            uz: 'immigratsiya' },
        { kr: '통합',       romanization: 'tonghap',         uz: 'integratsiya' },
        { kr: '차별',       romanization: 'chabyeol',        uz: 'kamsitish, diskriminatsiya' },
        { kr: '공존',       romanization: 'gongjson',        uz: 'birga yashash' },
        { kr: '갈등',       romanization: 'galdeung',        uz: 'ziddiyat, konflikt' },
        { kr: '상호 이해',  romanization: 'sangho ihae',     uz: "o'zaro tushunish" },
        { kr: '문화 충격',  romanization: 'munhwa chunggyeok', uz: 'madaniy shok' },
        { kr: '포용하다',   romanization: 'poyonghada',      uz: 'qabul qilmoq, bag\'riga olmoq' },
        { kr: '배타적',     romanization: 'baetajjeok',      uz: 'eksklyuziv, rad etuvchi' },
        { kr: '동화 정책',  romanization: 'donghwa jeongchaek', uz: 'assimilyatsiya siyosati' },
        { kr: '문화적 다양성',romanization:'munhwajjeok dayang-seong',uz: 'madaniy xilma-xillik' },
        { kr: '소수 집단',  romanization: 'sosu jibdan',     uz: 'ozchilik guruhi' },
        { kr: '상호 존중',  romanization: 'sangho jonjung',  uz: "o'zaro hurmat" },
        { kr: '제도적 지원',romanization: 'jedojjeok jiwon', uz: 'institutsional qo\'llab-quvvatlash' },
        { kr: '수용 능력',  romanization: 'suyong neungnyeok',uz: 'qabul qilish qobiliyati' },
        { kr: '역량',       romanization: 'yeongnyak',       uz: 'qobiliyat, kompetensiya' },
        { kr: '보편적',     romanization: 'bopyeonjjeok',    uz: 'universal, umumiy' },
        { kr: '다양성 존중',romanization: 'dayangseong jonjung',uz: 'xilma-xillikni hurmat qilish' },
        { kr: '사회적 수용',romanization: 'sahoejjeok suyong',uz: 'ijtimoiy qabul qilish' },
      ],
      examples: [
        { kr: '한국 사회의 다문화 가정이 증가하는 만큼 지원 정책도 강화해야 한다.',    uz: "Koreya jamiyatidagi ko'p madaniyatli oilalar ko'paygani uchun qo'llab-quvvatlash siyosati ham kuchaytirilishi kerak." },
        { kr: '진정한 다문화 사회를 만들려면 제도적 지원과 시민 의식 변화가 함께 이루어져야 한다.', uz: "Haqiqiy ko'p madaniyatli jamiyat yaratmoqchi bo'lsa institutsional qo'llab-quvvatlash va fuqarolik ongi o'zgarishi birga amalga oshishi kerak." },
        { kr: '이민자 수용 정책을 수립하는 데 있어서 사회 통합 비용도 고려해야 한다.',  uz: "Immigrantlarni qabul qilish siyosati ishlab chiqish jihatida ijtimoiy integratsiya xarajati ham hisobga olinishi kerak." },
        { kr: '다양성을 존중하는 반면에 사회적 결속을 유지하는 것이 과제다.',           uz: "Xilma-xillikni hurmat qilib, ijtimoiy birlikni saqlab qolish vazifa." },
        { kr: '문화적 차이가 갈등을 유발하는 만큼 상호 이해 교육이 절실하다.',          uz: "Madaniy farq ziddiyat keltirgani uchun o'zaro tushunish ta'limi juda zarur." },
      ],
      dialog: [
        { speaker: 'A', kr: '한국이 진정한 다문화 사회가 되려면 무엇이 필요할까요?',             uz: "Koreya haqiqiy ko'p madaniyatli jamiyat bo'lishi uchun nima zarur?" },
        { speaker: 'B', kr: '제도적 지원도 중요하지만 시민들의 인식 변화가 더 필요한 것 같아요.', uz: "Institutsional qo'llab-quvvatlash ham muhim, lekin fuqarolarning ongi o'zgarishi ko'proq zarurroqdek ko'rinadi." },
        { speaker: 'A', kr: '이민자가 증가하는 만큼 갈등도 늘어나는 건 아닐까요?',               uz: "Immigrantlar ko'paygani uchun ziddiyat ham ko'paymaydimi?" },
        { speaker: 'B', kr: '그럴 수도 있어요. 하지만 통합 정책을 잘 수립하려면 소수 집단의 목소리도 반영해야 해요.', uz: "Shunday bo'lishi ham mumkin. Lekin integratsiya siyosatini yaxshi ishlab chiqmoqchi bo'lsa ozchilik guruhining ovozi ham aks ettirilishi kerak." },
        { speaker: 'A', kr: '동화보다는 공존 중심의 정책이 더 효과적이겠죠?',                    uz: "Assimilyatsiyadan ko'ra birga yashashga asoslangan siyosat samaraliroq bo'lsa kerak?" },
        { speaker: 'B', kr: '맞아요. 다양성을 인정하는 만큼 사회가 더 풍요로워지는 셈이니까요.', uz: "To'g'ri. Xilma-xillikni tan olgani uchun jamiyat boyiroq bo'lgan hisoblanadi." },
      ],
      notes: [
        "-(으)ㄴ/는 만큼: ...qadар, ...bo'lgani uchun — sabab + miqdor bildirish: 증가하는 만큼(ko'paygani uchun).",
        "-(으)려면: maqsad uchun zarur shart: 이루려면(erishmoqchi bo'lsa).",
        "-(으)ㄴ/는 데 있어서: rasmiy nuqtai nazar: 수립하는 데 있어서(ishlab chiqish jihatida).",
        "동화 (assimilyatsiya) vs 통합 (integratsiya): 동화 — o'z madaniyatini yo'qotish; 통합 — o'zini saqlab birga yashash.",
        "소수 집단 (ozchilik guruhi) — irq, din, til asosida — ijtimoiy siyosatda muhim tushuncha.",
      ],
      games: {
        matchPairs: [
          { kr: '통합',     uz: 'integratsiya' },
          { kr: '차별',     uz: 'kamsitish' },
          { kr: '공존',     uz: 'birga yashash' },
          { kr: '갈등',     uz: 'ziddiyat' },
          { kr: '포용하다', uz: 'qabul qilmoq' },
          { kr: '역량',     uz: 'qobiliyat' },
        ],
        fillBlank: [
          { sentence: '다양한 문화가 공존하는 ___ 갈등도 발생할 수 있다.',              answer: '만큼',      options: ['만큼','수록','반면에','데다가'],         uz: "Xilma-xil madaniyatlar birga yashagani uchun ziddiyat ham yuzaga kelishi mumkin." },
          { sentence: '사회 통합을 이루___ 상호 이해가 필요하다.',                       answer: '려면',      options: ['려면','고 싶으면','지만','면서'],         uz: "Ijtimoiy integratsiyaga erishmoqchi bo'lsa o'zaro tushunish zarur." },
          { sentence: '정책을 수립하는 데 있어서 소수 의견을 ___.',                      answer: '반영해야 한다',options: ['반영해야 한다','무시해야 한다','없애야 한다','바꿔야 한다'],uz:"Siyosat ishlab chiqishda ozchilik fikri aks ettirilishi kerak."},
          { sentence: '이민자가 증가하는 반면에 사회적 수용 능력이 ___.',               answer: '뒤처지고 있다',options: ['뒤처지고 있다','늘고 있다','좋아지고 있다','없어지고 있다'],uz:"Immigrantlar ko'payib borayotgan holda ijtimoiy qabul qilish qobiliyati orqada qolmoqda."},
          { sentence: '다양성을 인정하는 만큼 사회가 풍요로워지는 ___.',                 answer: '셈이에요',  options: ['셈이에요','뿐이에요','따름이에요','것이에요'],uz:"Xilma-xillikni tan olgani uchun jamiyat boyiroq bo'lgan hisoblanadi."},
        ],
        scramble: [
          { kr: '통합', uz: 'integratsiya' },
          { kr: '차별', uz: 'kamsitish' },
          { kr: '공존', uz: 'birga yashash' },
          { kr: '갈등', uz: 'ziddiyat' },
          { kr: '역량', uz: 'qobiliyat' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄴ/는 만큼' (6-daraja) nimani anglatadi?",     options: ['lekin','...qadар, ...bo\'lgani uchun','shuning uchun','taqdirda'],              correct_index: 1 },
      { question: "'-(으)려면' nimani anglatadi?",                        options: ['...sababli','...qilmoqchi bo\'lsa, ...uchun zarur','...holda','natijasida'],   correct_index: 1 },
      { question: "'동화' va '통합' farqi?",                              options: ['Farq yo\'q','동화 — o\'z madaniyatini yo\'qotish; 통합 — birga yashash','통합 — yo\'qotish','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'갈등' nimani anglatadi?",                             options: ['birga yashash','integratsiya','ziddiyat, konflikt','kamsitish'],               correct_index: 2 },
      { question: "'포용하다' nimani anglatadi?",                         options: ['rad etmoq','kamsitmoq','qabul qilmoq, bag\'riga olmoq','o\'zgartirmoq'],      correct_index: 2 },
      { question: "'소수 집단' nimani anglatadi?",                        options: ['ko\'pchilik guruhi','ozchilik guruhi','davlat tashkiloti','din guruh'],        correct_index: 1 },
      { question: "'-(으)ㄴ/는 데 있어서' nimani anglatadi?",             options: ['sababli','...jihatida, ...bo\'yicha (rasmiy)','lekin','natijasida'],          correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════════════
  // DARS 10: Fan-texnologiya va inson kelajagi
  // 과학 기술과 인간의 미래
  // ════════════════════════════════════════════════════
  {
    track: 'TOPIK', level: 6, order_in_level: 10,
    title_kr: '과학 기술과 인간의 미래',
    title_uz: 'Fan-texnologiya va inson kelajagi',
    is_free: false,
    content: {
      topic: {
        kr: '기술이 발전하면 발전할수록 윤리적 문제도 복잡해집니다. 인공지능 기술이 발전하는 이상 인간은 적응하지 않을 수 없습니다. 기술은 삶을 편리하게 할 뿐만 아니라 인류의 한계를 극복하게 합니다. 결국 기술이 인간을 위해 존재하는 셈이므로 인간 중심적 가치가 중요합니다.',
        uz: "Texnologiya rivojlangan sari etik muammolar ham murakkablashadi. Sun'iy intellekt rivojlanayotgan taqdirda inson moslashishdan boshqa iloji yo'q. Texnologiya hayotni qulaylashtirishi bilan birga insoniyat chegarasini engib o'tishiga yordam beradi. Oxir-oqibat texnologiya insoniyat uchun mavjud bo'lgan hisoblanadi, shuning uchun inson markazli qadriyat muhim."
      },
      grammar: {
        explanation: `-(으)면 -(으)ㄹ수록 — qanchalik ...bo'lsa, shunchalik ... (kuchaytirilgan shakl)

Tuzilish: [-(으)면 + -(으)ㄹ수록]
• 기술이 발전하면 발전할수록 문제도 복잡해진다.
  (Texnologiya rivojlangan sari muammolar murakkablashadi — kuchaytirilgan shakl.)
• 생각하면 생각할수록 어렵다. (O'ylagan sari qiyinlashadi.)

-(으)ㄴ/는 이상 — ...taqdirda, ...qachonki (qabul qilingan shart):
• AI가 발전하는 이상 인간은 적응해야 한다.
  (AI rivojlanayotgan taqdirda inson moslashishi kerak.)
• 기술을 사용하는 이상 책임도 따른다.

-(으)ㄹ 뿐만 아니라 (심화) + -(으)ㄴ/는 셈이다 (심화):
두 가지 이상의 효과를 나열하고 최종 의미를 정리하는 고급 에세이 패턴:
• 기술은 삶을 편리하게 할 뿐만 아니라 한계를 극복하게 한다.
  그러므로 기술은 인류의 가능성을 확장하는 셈이다.`,
        examples: [
          { kr: '기술이 발전하면 발전할수록 인간의 삶은 더욱 편리해지지만 의존도도 높아진다.', uz: "Texnologiya rivojlangan sari inson hayoti qulayvroq bo'ladi, lekin bog'liqlik ham ortadi." },
          { kr: 'AI 기술이 발전하는 이상 재교육과 적응이 불가피하다.',                       uz: "AI texnologiyasi rivojlanayotgan taqdirda qayta ta'lim va moslashish muqarrar." },
          { kr: '기술은 의료 수준을 높일 뿐만 아니라 수명도 연장시키고 있다.',                uz: "Texnologiya nafaqat tibbiy darajani oshiradi, balki umr uzaytirmoqda ham." },
          { kr: '결국 기술이 인간의 삶을 풍요롭게 하는 셈이므로 규제보다는 활용이 중요하다.',  uz: "Oxir-oqibat texnologiya insoniyat hayotini boyitgan hisoblanganidan nazoratdan ko'ra qo'llash muhimroq." },
          { kr: '기술 발전이 빠르면 빠를수록 사회의 적응 속도도 그에 맞게 빨라져야 한다.',    uz: "Texnologiya rivojlanishi tez bo'lgan sari jamiyatning moslashish tezligi ham shunga mos tezlashishi kerak." },
        ]
      },
      vocabulary: [
        { kr: '과학 기술',  romanization: 'gwahak gisul',     uz: 'fan-texnologiya' },
        { kr: '혁신',       romanization: 'hyeoksin',         uz: 'innovatsiya' },
        { kr: '첨단',       romanization: 'cheomdан',         uz: "ilg'or, yuqori texnologiya" },
        { kr: '부작용',     romanization: 'bujagyong',        uz: "salbiy ta'sir, yon ta'sir" },
        { kr: '침해',       romanization: 'chimhae',          uz: 'buzish, tajovuz qilish' },
        { kr: '발전',       romanization: 'baljeon',          uz: 'rivojlanish' },
        { kr: '유전자 편집',romanization: 'yujeonja pyeonhyang',uz: 'gen tahrirlash' },
        { kr: '개인 정보',  romanization: 'gaein jeongbo',    uz: "shaxsiy ma'lumot" },
        { kr: '감시 사회',  romanization: 'gamsi sahoe',      uz: 'nazorat jamiyati' },
        { kr: '기술 격차',  romanization: 'gisul gyeokcha',   uz: 'texnologik farq' },
        { kr: '생명 윤리',  romanization: 'saengmyeong yulli',uz: 'bioetika' },
        { kr: '지속 가능하다',romanization:'jisok ganeunghada',uz: 'barqaror bo\'lmoq' },
        { kr: '한계 극복',  romanization: 'hangye geukbok',   uz: 'chegara engib o\'tish' },
        { kr: '인간 중심',  romanization: 'ingan jungsim',    uz: 'inson markazli' },
        { kr: '재교육',     romanization: 'jaekyoyuk',        uz: "qayta ta'lim" },
        { kr: '불가피하다', romanization: 'bulgapihada',      uz: 'muqarrar, oldini olish mumkin emas' },
        { kr: '자동화',     romanization: 'jadongghwa',       uz: 'avtomatlashtirish' },
        { kr: '규제',       romanization: 'gyuje',            uz: 'nazorat, cheklash' },
        { kr: '활용하다',   romanization: 'hwarionghada',     uz: 'qo\'llash, foydalanmoq' },
        { kr: '확장하다',   romanization: 'hwakjanghada',     uz: 'kengaytirmoq, rivojlantirmoq' },
      ],
      examples: [
        { kr: '유전자 편집 기술이 발전하면 발전할수록 생명 윤리 논쟁도 심화된다.',          uz: "Gen tahrirlash texnologiyasi rivojlangan sari bioetika bahsi ham kuchayadi." },
        { kr: '기술 혁신이 가속화되는 이상 교육 시스템도 변화해야 한다.',                   uz: "Texnologiya innovatsiyasi tezlashayotgan taqdirda ta'lim tizimi ham o'zgarishi kerak." },
        { kr: '기술은 의료 한계를 극복할 뿐만 아니라 삶의 질도 획기적으로 향상시키고 있다.',uz: "Texnologiya tibbiy chegarani engib o'tish bilan birga hayot sifatini ham keskin yaxshilamoqda." },
        { kr: '결국 기술 발전이 인류에게 이익이 되는 셈이므로 두려워하기보다 활용하는 것이 현명하다.', uz: "Oxir-oqibat texnologiya rivojlanishi insoniyatga foydali bo'lgan hisoblanganidan qo'rqishdan ko'ra qo'llash oqilona." },
        { kr: '기술 격차가 커지면 커질수록 사회적 불평등도 심화될 가능성이 있다.',           uz: "Texnologik farq kattalashgan sari ijtimoiy tengsizlik ham chuqurlashishi ehtimoli bor." },
      ],
      dialog: [
        { speaker: 'A', kr: '과학 기술의 발전이 인류에게 축복인가요, 재앙인가요?',                   uz: "Fan-texnologiya rivojlanishi insoniyat uchun ne'matmi yoki falokat?" },
        { speaker: 'B', kr: '두 가지 다라고 생각해요. 기술이 발전하면 발전할수록 혜택도 크지만 위험도 커지거든요.', uz: "Ikkalasi ham deb o'ylayman. Texnologiya rivojlangan sari foyda ham katta, lekin xavf ham ortadi." },
        { speaker: 'A', kr: 'AI가 계속 발전하는 이상 인간의 역할이 줄어들 수밖에 없지 않나요?',          uz: "AI davom etib rivojlanayotgan taqdirda insonning roli muqarrar kamaymaydimi?" },
        { speaker: 'B', kr: '반드시 그렇지는 않아요. 기술은 삶을 편리하게 할 뿐만 아니라 인간의 가능성을 확장하는 셈이에요.', uz: "Albatta shunday emas. Texnologiya hayotni qulaylashtirishi bilan birga inson imkoniyatlarini kengaytirgan hisoblanadi." },
        { speaker: 'A', kr: '그렇다면 결국 기술을 어떻게 활용하느냐가 핵심이겠군요.',                   uz: "Unday bo'lsa oxir-oqibat texnologiyani qanday qo'llash markaziy masala ekan." },
        { speaker: 'B', kr: '정확해요. 기술이 인간을 위해 존재하는 셈이므로 인간 중심적 가치를 놓치지 않아야 해요.', uz: "Aniq. Texnologiya insoniyat uchun mavjud bo'lgan hisoblanganidan inson markazli qadriyatni yo'qotmaslik kerak." },
      ],
      notes: [
        "-(으)면 -(으)ㄹ수록: kuchaytirilgan '더욱...': 발전하면 발전할수록(rivojlangan sari tobora).",
        "-(으)ㄴ/는 이상: qabul qilingan shart: 발전하는 이상(rivojlanayotgan taqdirda) — o'zgartirish mumkin emas.",
        "뿐만 아니라 + 셈이다: 6-daraja essay finallashtirish uslubi.",
        "유전자 편집 (gen tahrirlash) — CRISPR texnologiyasi: zamonaviy bioetikaning markazi.",
        "감시 사회 (nazorat jamiyati) — George Orwell '1984' konseptsiyasi: texnologiya orqali kuzatish.",
      ],
      games: {
        matchPairs: [
          { kr: '혁신',     uz: 'innovatsiya' },
          { kr: '부작용',   uz: "salbiy ta'sir" },
          { kr: '침해',     uz: 'tajovuz qilish' },
          { kr: '재교육',   uz: "qayta ta'lim" },
          { kr: '활용하다', uz: 'qo\'llash' },
          { kr: '불가피하다',uz: 'muqarrar' },
        ],
        fillBlank: [
          { sentence: '기술이 발전하면 발전할___문제도 복잡해진다.',               answer: '수록',      options: ['수록','때문에','대신에','반면에'],          uz: "Texnologiya rivojlangan sari muammolar murakkablashadi." },
          { sentence: 'AI가 발전하는 ___ 인간은 적응해야 한다.',                   answer: '이상',      options: ['이상','한','만큼','반면에'],                uz: "AI rivojlanayotgan taqdirda inson moslashishi kerak." },
          { sentence: '기술은 삶을 편리하게 할 뿐만 아니라 한계를 극복하게 ___.',  answer: '한다',      options: ['한다','없다','된다','있다'],                uz: "Texnologiya hayotni qulaylashtirishi bilan birga chegarani engib o'tishga yordam beradi." },
          { sentence: '결국 기술이 인류에게 이익이 되는 셈이므로 ___ 것이 현명하다.',answer:'활용하는',  options: ['활용하는','두려워하는','거부하는','피하는'],  uz: "Oxir-oqibat texnologiya foydali bo'lgan hisoblanganidan qo'llash oqilona." },
          { sentence: '기술 격차가 커지면 커질수록 불평등도 심화될 가능성이 ___.',  answer: '있다',      options: ['있다','없다','된다','한다'],                uz: "Texnologik farq kattalashgan sari tengsizlik chuqurlashishi ehtimoli bor." },
        ],
        scramble: [
          { kr: '기술',   uz: 'texnologiya' },
          { kr: '혁신',   uz: 'innovatsiya' },
          { kr: '미래',   uz: 'kelajak' },
          { kr: '한계',   uz: 'chegara' },
          { kr: '규제',   uz: 'nazorat' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)면 -(으)ㄹ수록' nimani bildiradi?",                  options: ['oddiy sabab','kuchaytirilgan: qanchalik...tobora...','inkor','shart'],         correct_index: 1 },
      { question: "'-(으)ㄴ/는 이상' nimani anglatadi?",                       options: ['sababli','...taqdirda (qabul qilingan shart)','lekin','natijasida'],            correct_index: 1 },
      { question: "'부작용' nimani anglatadi?",                                options: ['asosiy ta\'sir','innovatsiya',"salbiy ta'sir, yon ta'sir",'rivojlanish'],        correct_index: 2 },
      { question: "'불가피하다' nimani anglatadi?",                            options: ['qo\'rqinchli','muqarrar, oldini olish mumkin emas','qiyin','zarur'],             correct_index: 1 },
      { question: "'유전자 편집' nimani anglatadi?",                           options: ['nazorat jamiyati','bioetika','gen tahrirlash','shaxsiy ma\'lumot'],              correct_index: 2 },
      { question: "'활용하다' nimani anglatadi?",                              options: ['cheklash','qo\'llash, foydalanmoq','yo\'qotmoq','o\'zgartirmoq'],               correct_index: 1 },
      { question: "6-daraja essay finallashtirish uslubi qaysi?",              options: ['기 때문에 + 지만','뿐만 아니라 + 셈이다','수록 + 반면에','탓에 + 따름이다'],  correct_index: 1 },
    ],
  },

];

// ────────────────────────────────────────────
// DB ga saqlash
// ────────────────────────────────────────────
async function seed() {
  console.log('TOPIK 6-daraja seed boshlandi...\n');
  console.log('Audio URL pattern: {CDN_URL}/{lessonId}-{key}.mp3');
  console.log('Keys: topic + grammar_0..4 + vocab_0..19 + example_0..4 + dialog_0..5 = 37 ta\n');

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

    console.log(`  ✅  Dars ${lessonData.order_in_level}: ${lessonData.title_kr} (ID: ${saved.id})`);
  }

  console.log('\n✅ TOPIK 6-daraja seed muvaffaqiyatli yakunlandi!');
  console.log(`   Jami: ${LESSONS.length} ta dars | 6-daraja (eng yuqori)`);
  console.log('\n📢 Audio generatsiya:');
  console.log('   node src/scripts/generate-audio.js --level 6');
  console.log('\n📊 Barcha seed fayllar:');
  console.log('   intro_alphabet.js  → 2 dars  (TOPIK + EPS-TOPIK kirish)');
  console.log('   topik_level1.js    → 10 dars (1-daraja)');
  console.log('   topik_level2.js    → 10 dars (2-daraja)');
  console.log('   topik_level3.js    → 10 dars (3-daraja)');
  console.log('   topik_level4.js    → 10 dars (4-daraja)');
  console.log('   topik_level5.js    → 10 dars (5-daraja)');
  console.log('   topik_level6.js    → 10 dars (6-daraja) ← yangi');
  console.log('   ─────────────────────────────────────────');
  console.log('   Jami: 62 ta dars | ~7,600+ qator');

  await db.end();
}

seed().catch(err => {
  console.error('❌ Xatolik:', err.message);
  process.exit(1);
});
