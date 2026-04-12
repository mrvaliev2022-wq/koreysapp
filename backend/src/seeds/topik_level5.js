// backend/src/seeds/topik_level5.js
// TOPIK 5-daraja: 10 ta to'liq dars (Lesson 11-20)
// Audio URL structure: {lesson_id}-{key}.mp3 — Edge TTS tomonidan generatsiya qilinadi
// PC / iOS / Android uchun to'liq ishlaydigan
// Usage: node src/seeds/topik_level5.js

require('dotenv').config({ path: '../../.env' });
const db = require('../db');

// Audio URL pattern: CDN_URL/{lessonId}-{key}.mp3
// Keys: topic, grammar_0..4, vocab_0..19, example_0..4, dialog_0..5
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

const LESSONS = [

  // ════════════════════════════════════════════
  // DARS 11 (L5-1): Til va hayot
  // 언어와 생활
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 5, order_in_level: 1,
    title_kr: '언어와 생활',
    title_uz: 'Til va hayot',
    is_free: true,
    content: {
      topic: {
        kr: '언어는 단순한 의사소통 수단이 아닙니다. 언어는 우리의 생각과 감정을 표현하며 문화를 전달합니다. 언어를 잘 사용하는 사람치고 인간관계가 나쁜 경우는 드문 편입니다. 같은 말도 어떻게 전달하느냐에 따라 의미가 달라질 수 있다라고요.',
        uz: "Til oddiy muloqot vositasi emas. Til bizning fikr va his-tuyg'ularimizni ifodalab, madaniyatni yetkazadi. Tilni yaxshi ishlatadiganlar ichida insoniy munosabatlari yomon bo'lganlari kam. Bir xil gapning ham qanday yetkazilishiga qarab ma'nosi farqlanishi mumkin deyishadi."
      },
      grammar: {
        explanation: `A/V-다라고(요) — boshqaning gapini yumshoq yoki hayron bo'lib yetkazish

Tuzilish: [gap + 다라고(요)]
• 맛있다라고요? (Mazali deyishyaptimi? — hayron)
• 내일 온다라고 했어요. (Ertaga keladi deb aytdi.)
• 힘들다라고요? 정말요? (Qiyin deyishyaptimi? Rostdanmi?)

N치고 — ...lar orasida (qoidadan mustasno, kutilmagan holat):
• 외국인치고 한국어를 정말 잘 하네요. (Chet elliklar orasida koreyschani juda yaxshi biladi-ku.)
• 초보치고 실력이 좋은 편이에요. (Yangi boshlaganlar orasida darajasi yaxshi tomonda.)

A/V-(으)ㄴ/는 편이다 (확장 — kengaytirilgan):
• 언어 실력이 좋은 편이에요. (Til darajasi yaxshi tomonda.)
• 말을 잘 하는 편이라 오해가 적은 편이에요.`,
        examples: [
          { kr: '그 사람이 한국어를 유창하게 한다라고요? 정말요?', uz: "U odam koreyschani ravon gapiradi deyishyaptimi? Rostdanmi?" },
          { kr: '외국인치고 발음이 정말 좋은 편이에요.', uz: "Chet elliklar orasida talaffuzi juda yaxshi tomonda." },
          { kr: '언어는 문화를 반영한다라고 하더라고요.', uz: "Til madaniyatni aks ettiradi deb aytishardi." },
          { kr: '초급치고 문법을 잘 이해하는 편이에요.', uz: "Boshlang'ichlar orasida grammatikani yaxshi tushungan tomonda." },
          { kr: '의사소통이 잘 되는 편이라 오해가 적어요.', uz: "Muloqot yaxshi bo'lgan tomoni sababli noto'g'ri tushunishlar kam." },
        ]
      },
      vocabulary: [
        { kr: '언어', romanization: 'eoneo', uz: 'til' },
        { kr: '의사소통', romanization: 'uisasotong', uz: 'muloqot' },
        { kr: '표현', romanization: 'pyohyeon', uz: 'ifoda' },
        { kr: '의미', romanization: 'uimi', uz: "ma'no" },
        { kr: '문화', romanization: 'munhwa', uz: 'madaniyat' },
        { kr: '영향', romanization: 'yeonghyang', uz: "ta'sir" },
        { kr: '전달하다', romanization: 'jeondalhada', uz: 'yetkazmoq' },
        { kr: '이해하다', romanization: 'ihaehada', uz: 'tushunmoq' },
        { kr: '관계', romanization: 'gwangye', uz: 'munosabat' },
        { kr: '오해', romanization: 'ohae', uz: "noto'g'ri tushunish" },
        { kr: '정확하다', romanization: 'jeonghwakada', uz: 'aniq' },
        { kr: '다양하다', romanization: 'dayanghada', uz: 'xilma-xil' },
        { kr: '습관', romanization: 'seupssgwan', uz: 'odat' },
        { kr: '태도', romanization: 'taedo', uz: 'munosabat, tutum' },
        { kr: '유창하다', romanization: 'yuchanghada', uz: 'ravon, fluent' },
        { kr: '모국어', romanization: 'mogugeo', uz: 'ona tili' },
        { kr: '방언', romanization: 'bangyeon', uz: 'sheva, lahjа' },
        { kr: '번역하다', romanization: 'beonyeokhada', uz: 'tarjima qilmoq' },
        { kr: '통역하다', romanization: 'tongyeokhada', uz: 'og\'zaki tarjima qilmoq' },
        { kr: '외국어', romanization: 'oegueo', uz: 'xorijiy til' },
      ],
      examples: [
        { kr: '언어치고 배우기 쉬운 것은 없는 편이에요. 모두 노력이 필요해요.', uz: "Tillar orasida o'rganishi oson bo'lganlari yo'q tomonda. Hammasi harakat talab qiladi." },
        { kr: '같은 말도 어떤 상황에서 하느냐에 따라 의미가 달라지는 편이에요.', uz: "Bir xil gap ham qaysi vaziyatda aytilganiga qarab ma'nosi farqlanadigan tomonda." },
        { kr: '외국어를 배울수록 자국 문화에 대한 이해도 깊어지는 편이에요.', uz: "Xorijiy til o'rgangan sari o'z madaniyatiga tushunish ham chuqurlashadigan tomonda." },
        { kr: '그가 내일 떠난다라고요? 갑작스럽네요.', uz: "U ertaga ketadi deyishyaptimi? Kutilmagan ekan." },
        { kr: '초보치고 한국어 실력이 놀라울 정도로 좋은 편이에요.', uz: "Yangi boshlaganlar orasida koreys tili darajasi hayratlanarli darajada yaxshi tomonda." },
      ],
      dialog: [
        { speaker: 'A', kr: '한국어를 배운 지 얼마나 됐어요?', uz: 'Koreys tilini o\'rganganingizga qancha bo\'ldi?' },
        { speaker: 'B', kr: '2년 됐어요. 초보치고는 좀 잘 하는 편인 것 같아요.', uz: "2 yil bo'ldi. Yangi boshlaganlar orasida biroz yaxshi tomonda shekilli." },
        { speaker: 'A', kr: '정말요? 발음도 좋다라고 선생님이 칭찬했다라고요?', uz: "Rostdanmi? Talaffuzi ham yaxshi deb o'qituvchi maqtadi deyishyaptimi?" },
        { speaker: 'B', kr: '네, 그렇게 말씀해 주셨어요. 의사소통이 잘 되는 편이라 행복해요.', uz: "Ha, shunday dedilar. Muloqot yaxshi bo'lgan tomoni uchun baxtliman." },
        { speaker: 'A', kr: '비결이 뭐예요? 어떻게 그렇게 빨리 배웠어요?', uz: "Siri nima? Qanday shuncha tez o'rgandingiz?" },
        { speaker: 'B', kr: '매일 한국어로 일기를 쓰는 편이에요. 그리고 한국 드라마를 많이 보는 편이고요.', uz: "Har kuni koreyacha kundalik yozadigan tomondaman. Va Koreya seriallarini ko'p ko'radigan tomondaman." },
      ],
      notes: [
        "-다라고(요): hayron yoki qayta so'rash: 맛있다라고요?(mazali deyishyaptimi?).",
        "N치고: ...lar orasida kutilmagan yaxshi holat: 초보치고(yangi boshlaganlar orasida).",
        "유창하다 — ravon gapirmoq: 한국어를 유창하게 해요 (koreyschani ravon gapiradi).",
        "모국어 (ona tili) vs 외국어 (xorijiy til) vs 제2언어 (ikkinchi til).",
        "통역 (og'zaki tarjima) vs 번역 (yozma tarjima) — muhim farq.",
      ],
      games: {
        matchPairs: [
          { kr: '언어', uz: 'til' },
          { kr: '의사소통', uz: 'muloqot' },
          { kr: '오해', uz: "noto'g'ri tushunish" },
          { kr: '유창하다', uz: 'ravon' },
          { kr: '번역하다', uz: 'tarjima qilmoq' },
          { kr: '모국어', uz: 'ona tili' },
        ],
        fillBlank: [
          { sentence: '그 사람이 한국어를 유창하게 한다___? 정말요?', answer: '라고요', options: ['라고요', '고요', '서요', '면요'], uz: "U odam koreyschani ravon gapiradi deyishyaptimi?" },
          { sentence: '외국인___한국어를 정말 잘 하네요.', answer: '치고', options: ['치고', '마다', '에게', '에서'], uz: "Chet elliklar orasida koreyschani juda yaxshi biladi-ku." },
          { sentence: '의사소통이 잘 되는 편이라 오해가 ___.', answer: '적어요', options: ['적어요', '많아요', '없어요', '커요'], uz: "Muloqot yaxshi bo'lgani uchun noto'g'ri tushunishlar kam." },
          { sentence: '초보___발음이 좋은 편이에요.', answer: '치고', options: ['치고', '마다', '부터', '에서'], uz: "Yangi boshlaganlar orasida talaffuzi yaxshi tomonda." },
          { sentence: '언어는 문화를 반영한다___하더라고요.', answer: '라고', options: ['라고', '고', '서', '면'], uz: "Til madaniyatni aks ettiradi deb aytishardi." },
        ],
        scramble: [
          { kr: '언어', uz: 'til' },
          { kr: '오해', uz: "noto'g'ri tushunish" },
          { kr: '번역', uz: 'tarjima' },
          { kr: '습관', uz: 'odat' },
          { kr: '태도', uz: 'tutum' },
        ],
      },
    },
    quiz: [
      { question: "'-다라고(요)' qanday ma'no ifodalaydi?", options: ['Buyruq', 'Hayron yoki qayta so\'rash bilan yetkazish', 'Shart', 'Inkor'], correct_index: 1 },
      { question: "'N치고' qanday ishlatiladi?", options: ['...sababli', '...lar orasida kutilmagan yaxshi holat', '...ga qaramasdan', '...o\'rniga'], correct_index: 1 },
      { question: "'유창하다' nimani anglatadi?", options: ['qiyin', 'ravon, fluent', 'sekin', 'aniq'], correct_index: 1 },
      { question: "'오해' nimani anglatadi?", options: ['tushunish', "noto'g'ri tushunish", 'muloqot', 'ifoda'], correct_index: 1 },
      { question: "'통역하다' va '번역하다' farqi?", options: ['Farq yo\'q', '통역 — og\'zaki, 번역 — yozma tarjima', '통역 — yozma, 번역 — og\'zaki', 'Ikkalasi ham yozma'], correct_index: 1 },
      { question: "'모국어' nimani anglatadi?", options: ['xorijiy til', 'ona tili', 'ikkinchi til', 'rasmiy til'], correct_index: 1 },
      { question: "'외국인치고' nimani anglatadi?", options: ['Chet elliklar uchun', 'Chet elliklar orasida (kutilmagan)', 'Chet ellik bo\'lgani uchun', 'Chet ellikdan'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 12 (L5-2): Qadrli atrof-muhit
  // 소중한 환경
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 5, order_in_level: 2,
    title_kr: '소중한 환경',
    title_uz: 'Qadrli atrof-muhit',
    is_free: true,
    content: {
      topic: {
        kr: '환경 문제는 우리 모두가 함께 해결해야 할 과제입니다. 기후 변화가 가속화될지도 모르는 상황에서 적극적인 행동이 필요합니다. 환경을 보호하지 않으면 어떤 결과가 올지도 모릅니다. 자원이 부족한지 모르지만 낭비를 줄이는 것이 중요합니다.',
        uz: "Atrof-muhit muammolari barchamiz birgalikda hal qilishimiz kerak bo'lgan vazifa. Iqlim o'zgarishi tezlashishi mumkin bo'lgan vaziyatda faol harakat zarur. Atrof-muhitni himoya qilmasak qanday natija kelishi mumkinligini bilmaymiz. Resurslar yetishmasligi ham mumkin, lekin isrofgarchilikni kamaytirish muhim."
      },
      grammar: {
        explanation: `-(으)ㄹ지도 모르다 (심화) — ...bo'lishi ham mumkin (qo'shimcha ehtimol)

Tuzilish: [fe'l/sifat + (으)ㄹ지도 모르다]
• 비가 올지도 몰라요. (Yomg'ir yog'ishi ham mumkin.)
• 결과가 좋을지도 모릅니다. (Natija yaxshi bo'lishi ham mumkin.)
• 이미 알고 있을지도 몰라요. (Allaqachon biladigan bo'lishi ham mumkin.)

-(으)ㄴ/는지 모르다 — ...ekanligini bilmaslik:
• 얼마나 심각한지 모르겠어요. (Qanchalik jiddiy ekanini bilmayapman.)
• 어디서 왔는지 모르겠어요. (Qayerdan kelganini bilmayapman.)

-(으)ㄹ 수밖에 없다 (복습 + 강화):
• 환경을 보호할 수밖에 없는 시대입니다. (Atrof-muhitni himoya qilishdan boshqa iloj yo'q bo'lgan davr.)`,
        examples: [
          { kr: '기후 변화가 더 심각해질지도 몰라요.', uz: "Iqlim o'zgarishi yanada og'irlashishi ham mumkin." },
          { kr: '환경 오염이 얼마나 심각한지 모르는 사람이 많아요.', uz: "Atrof-muhit ifloslangani qanchalik jiddiy ekanini bilmaydigan odamlar ko'p." },
          { kr: '지금 행동하지 않으면 나중에 후회할 수밖에 없을 거예요.', uz: "Hozir harakat qilmasak, keyinchalik afsuslanishdan boshqa iloj yo'q bo'ladi." },
          { kr: '이 지역의 생태계가 이미 파괴됐을지도 몰라요.', uz: "Bu hududning ekotizimi allaqachon buzilgan bo'lishi ham mumkin." },
          { kr: '자원이 얼마나 남았는지 모르는 상황에서 낭비할 수 없어요.', uz: "Qancha resurs qolganini bilmagan vaziyatda isrof qilib bo'lmaydi." },
        ]
      },
      vocabulary: [
        { kr: '환경', romanization: 'hwangyeong', uz: 'atrof-muhit' },
        { kr: '오염', romanization: 'oyeom', uz: 'ifloslanish' },
        { kr: '보호', romanization: 'boho', uz: 'himoya' },
        { kr: '자원', romanization: 'jawon', uz: 'resurs' },
        { kr: '부족', romanization: 'bujok', uz: 'yetishmovchilik' },
        { kr: '기후 변화', romanization: 'gihu byeonhwa', uz: "iqlim o'zgarishi" },
        { kr: '심각하다', romanization: 'simgakada', uz: 'jiddiy' },
        { kr: '해결하다', romanization: 'haegyeolhada', uz: 'yechmoq' },
        { kr: '지속되다', romanization: 'jisoktdweda', uz: 'davom etmoq' },
        { kr: '증가하다', romanization: 'jeunggahada', uz: 'oshmoq' },
        { kr: '감소하다', romanization: 'gamsohada', uz: 'kamaymoq' },
        { kr: '원인', romanization: 'wonin', uz: 'sabab' },
        { kr: '결과', romanization: 'gyeolgwa', uz: 'natija' },
        { kr: '정책', romanization: 'jeongchaek', uz: 'siyosat' },
        { kr: '낭비하다', romanization: 'nangbihada', uz: 'isrof qilmoq' },
        { kr: '재활용', romanization: 'jaehwalyong', uz: 'qayta ishlash' },
        { kr: '탄소 배출', romanization: 'tanso baechul', uz: 'karbon chiqindilari' },
        { kr: '생태계', romanization: 'saengtaegye', uz: 'ekotizim' },
        { kr: '파괴되다', romanization: 'pagwedweda', uz: 'buzilmoq, vayron bo\'lmoq' },
        { kr: '회복하다', romanization: 'hoebokhada', uz: 'tiklanmoq' },
      ],
      examples: [
        { kr: '전문가들도 기후 변화가 얼마나 빠르게 진행될지 모르는 상황이에요.', uz: "Mutaxassislar ham iqlim o'zgarishi qanchalik tez kechishini bilmagan holat." },
        { kr: '지금 당장 행동하지 않으면 생태계가 파괴될지도 모릅니다.', uz: "Hoziroq harakat qilmasak, ekotizim buzilishi ham mumkin." },
        { kr: '탄소 배출을 줄이는 정책을 실시할 수밖에 없는 상황이에요.', uz: "Karbon chiqindilari kamaytiradigan siyosatni amalga oshirishdan boshqa iloj yo'q holat." },
        { kr: '이 환경 문제가 얼마나 오래 지속될지 모르는 상황에서 준비해야 해요.', uz: "Bu atrof-muhit muammosi qancha davom etishini bilmagan holda tayyorlanish kerak." },
        { kr: '자원 부족 문제가 생각보다 더 심각할지도 모릅니다.', uz: "Resurs yetishmovchilik muammosi o'ylagandan jiddiyroq bo'lishi ham mumkin." },
      ],
      dialog: [
        { speaker: 'A', kr: '요즘 환경 문제에 대해 어떻게 생각해요?', uz: "Hozirda atrof-muhit muammolariga qanday qaraysiz?" },
        { speaker: 'B', kr: '정말 걱정돼요. 기후 변화가 더 심각해질지도 몰라요.', uz: "Juda xavotirlanaman. Iqlim o'zgarishi yanada og'irlashishi ham mumkin." },
        { speaker: 'A', kr: '맞아요. 얼마나 빨리 변할지 모르는 상황이에요.', uz: "To'g'ri. Qanchalik tez o'zgarishi noma'lum holat." },
        { speaker: 'B', kr: '개인이 할 수 있는 일이 있을까요?', uz: "Shaxs qila oladigan narsalar bormi?" },
        { speaker: 'A', kr: '재활용하고 에너지를 아끼는 것부터 시작할 수밖에 없어요.', uz: "Qayta ishlash va energiya tejashdan boshlashdan boshqa iloj yo'q." },
        { speaker: 'B', kr: '작은 실천이 모이면 큰 변화가 생길지도 모르죠. 함께 노력해요!', uz: "Kichik amaliyotlar yig'ilsa katta o'zgarish bo'lishi ham mumkin-ku. Birga harakat qilaylik!" },
      ],
      notes: [
        "-(으)ㄹ지도 모르다: ehtimol qo'shimcha: 올지도 몰라요(kelishi ham mumkin).",
        "-(으)ㄴ/는지 모르다: bilmaslik: 얼마나 심각한지 몰라요(qanchalik jiddiy ekanini bilmayman).",
        "기후 변화 — iqlim o'zgarishi: CO2 oshishi, harorat ko'tarilishi, dengiz sathining ko'tarilishi.",
        "탄소 중립 (net zero) — 2050-yilga qadar ko'p mamlakatlar maqsad qilgan.",
        "생태계 파괴 — ekotizim buzilishi: biodiversity loss bilan bog'liq.",
      ],
      games: {
        matchPairs: [
          { kr: '오염', uz: 'ifloslanish' },
          { kr: '자원', uz: 'resurs' },
          { kr: '낭비하다', uz: 'isrof qilmoq' },
          { kr: '재활용', uz: 'qayta ishlash' },
          { kr: '파괴되다', uz: 'buzilmoq' },
          { kr: '회복하다', uz: 'tiklanmoq' },
        ],
        fillBlank: [
          { sentence: '기후 변화가 더 심각해질___몰라요.', answer: '지도', options: ['지도', '수도', '것도', '만도'], uz: "Iqlim o'zgarishi yanada og'irlashishi ham mumkin." },
          { sentence: '얼마나 심각한___모르는 사람이 많아요.', answer: '지', options: ['지', '것을', '수를', '만을'], uz: "Qanchalik jiddiy ekanini bilmaydigan odamlar ko'p." },
          { sentence: '지금 행동하지 않으면 후회할 수밖에 없을 ___.', answer: '거예요', options: ['거예요', '것이에요', '거란요', '것라요'], uz: "Hozir harakat qilmasak, afsuslanishdan boshqa iloj yo'q bo'ladi." },
          { sentence: '자원 부족 문제가 생각보다 더 심각할___모릅니다.', answer: '지도', options: ['지도', '수도', '것도', '만도'], uz: "Resurs yetishmovchilik muammosi o'ylagandan jiddiyroq bo'lishi ham mumkin." },
          { sentence: '환경을 보호할 수밖에 ___ 시대입니다.', answer: '없는', options: ['없는', '있는', '되는', '하는'], uz: "Atrof-muhitni himoya qilishdan boshqa iloj yo'q bo'lgan davr." },
        ],
        scramble: [
          { kr: '환경', uz: 'atrof-muhit' },
          { kr: '보호', uz: 'himoya' },
          { kr: '자원', uz: 'resurs' },
          { kr: '정책', uz: 'siyosat' },
          { kr: '원인', uz: 'sabab' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄹ지도 모르다' va '-(으)ㄴ/는지 모르다' farqi?", options: ['Farq yo\'q', 'ㄹ지도 — kelajak ehtimol; ㄴ/는지 — bilmaslik holati', 'ㄴ/는지 — kelajak', 'Ikkalasi ham buyruq'], correct_index: 1 },
      { question: "'낭비하다' nimani anglatadi?", options: ['tejash', 'isrof qilmoq', 'kamaytirmoq', 'ko\'paytirmoq'], correct_index: 1 },
      { question: "'파괴되다' nimani anglatadi?", options: ['tiklanmoq', 'himoya qilmoq', 'buzilmoq, vayron bo\'lmoq', 'o\'smoq'], correct_index: 2 },
      { question: "'탄소 배출' nimani anglatadi?", options: ['energiya tejash', 'karbon chiqindilari', 'qayta ishlash', 'iqlim o\'zgarishi'], correct_index: 1 },
      { question: "'생태계' nimani anglatadi?", options: ['tabiat', 'ekotizim', 'muhit', 'landshaft'], correct_index: 1 },
      { question: "'기후 변화' nimani anglatadi?", options: ['ob-havo o\'zgarishi', "iqlim o'zgarishi", 'fasl o\'zgarishi', 'harorat'], correct_index: 1 },
      { question: "'회복하다' nimani anglatadi?", options: ['buzmoq', 'tiklanmoq', 'kamaymoq', 'oshmoq'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 13 (L5-3): Sayohatning zavqi
  // 여행의 즐거움
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 5, order_in_level: 3,
    title_kr: '여행의 즐거움',
    title_uz: 'Sayohatning zavqi',
    is_free: false,
    content: {
      topic: {
        kr: '여행은 새로운 문화와 사람들을 만나는 소중한 기회입니다. 여행 덕분에 세상을 넓게 보는 눈이 생겼어요. 길을 잃을 뻔했지만 친절한 현지인 덕분에 무사히 돌아왔어요. 여행하고 나서 인생관이 많이 달라지는 편이에요.',
        uz: "Sayohat yangi madaniyat va odamlar bilan uchrashadigan qimmatli imkoniyat. Sayohat tufayli dunyoga keng nazar soladigan ko'z paydo bo'ldi. Yo'l adashib qolay yozdim, lekin mehribon mahalliy aholining yordami tufayli xavfsiz qaytdim. Sayohat qilib bo'lgandan keyin hayotga munosabat ko'p o'zgaradigan tomonda."
      },
      grammar: {
        explanation: `-(으)ㄴ 덕분에 — ...tufayli (IJOBIY natija, minnatdorlik bilan)

Tuzilish: [ot + 덕분에 / fe'l + (으)ㄴ 덕분에]
• 선생님 덕분에 합격했어요. (O'qituvchi tufayli o'tdim.)
• 열심히 공부한 덕분에 성공했어요. (Astoydil o'rganganimiz tufayli muvaffaq bo'ldik.)
• 여행한 덕분에 많이 배웠어요. (Sayohat qilganimiz tufayli ko'p o'rgandim.)

MUHIM: 덕분에 — FAQAT ijobiy natijada. Salbiy uchun: 바람에, 때문에.

-(으)ㄹ 뻔하다 (복습 + 감정):
• 감동받아서 울 뻔했어요. (Ta'sirlanib yig'labroq qoldim.)
• 너무 아름다워서 말을 잃을 뻔했어요. (Juda go'zal, so'z topay yozdim.)

-고 나서 — ...qilib bo'lgandan keyin (ketma-ketlik):
• 여행하고 나서 일상이 소중해졌어요.`,
        examples: [
          { kr: '현지인 덕분에 길을 찾을 수 있었어요.', uz: "Mahalliy aholi tufayli yo'l topa oldim." },
          { kr: '너무 아름다운 풍경에 말을 잃을 뻔했어요.', uz: "Juda go'zal manzara ko'rib so'z topay yozdim." },
          { kr: '여행하고 나서 다른 문화에 대한 이해가 깊어졌어요.', uz: "Sayohat qilib bo'lgandan keyin boshqa madaniyatga tushunish chuqurlashdi." },
          { kr: '여행한 덕분에 언어 실력이 훨씬 좋아진 편이에요.', uz: "Sayohat qilganimiz tufayli til darajasi ancha yaxshilangan tomonda." },
          { kr: '비행기를 놓칠 뻔했지만 다행히 시간에 맞게 탔어요.', uz: "Samolyotni o'tkazib qolay yozdim, lekin yaxshiyamki o'z vaqtida chiqdim." },
        ]
      },
      vocabulary: [
        { kr: '여행', romanization: 'yeohaeng', uz: 'sayohat' },
        { kr: '경험', romanization: 'gyeongheom', uz: 'tajriba' },
        { kr: '기억', romanization: 'gieok', uz: 'xotira' },
        { kr: '풍경', romanization: 'punggyeong', uz: 'manzara' },
        { kr: '감정', romanization: 'gamjeong', uz: 'his-tuyg\'u' },
        { kr: '즐겁다', romanization: 'jeulgeopda', uz: 'zavqli' },
        { kr: '인상적이다', romanization: 'insangjeogida', uz: 'esda qolarli' },
        { kr: '특별하다', romanization: 'teukbyeolhada', uz: 'maxsus, alohida' },
        { kr: '다양하다', romanization: 'dayanghada', uz: 'xilma-xil' },
        { kr: '계획하다', romanization: 'gyehoekada', uz: 'rejalashtirmoq' },
        { kr: '방문하다', romanization: 'bangmunhada', uz: 'tashrif buyurmoq' },
        { kr: '느끼다', romanization: 'neukida', uz: 'his qilmoq' },
        { kr: '배우다', romanization: 'baeuda', uz: "o'rganmoq" },
        { kr: '남다', romanization: 'namda', uz: 'qolmoq (xotirada)' },
        { kr: '현지인', romanization: 'hyeonjiin', uz: 'mahalliy aholi' },
        { kr: '길을 잃다', romanization: 'gireul ita', uz: "yo'l adashmoq" },
        { kr: '일상', romanization: 'ilsang', uz: 'kundalik hayot' },
        { kr: '인생관', romanization: 'insaengwan', uz: 'hayotga munosabat, dunyoqarash' },
        { kr: '감동받다', romanization: 'gamdonbatda', uz: "ta'sirlanmoq" },
        { kr: '소중하다', romanization: 'sojunghada', uz: 'qadrli, qimmatli' },
      ],
      examples: [
        { kr: '그 나라에서 친구를 사귄 덕분에 지금도 연락하고 있어요.', uz: "O'sha mamlakatda do'st orttirgan tufayli hozir ham aloqada turibmiz." },
        { kr: '일몰을 보고 너무 감동받아서 눈물이 날 뻔했어요.', uz: "Quyosh botishini ko'rib juda ta'sirlanib ko'zyosh kela yozdim." },
        { kr: '여행하고 나서 일상의 작은 것들이 소중하게 느껴지는 편이에요.', uz: "Sayohat qilib bo'lgandan keyin kundalik hayotning kichik narsalari qadrli sezila boshlaydi." },
        { kr: '현지인 덕분에 관광책에 없는 숨겨진 명소를 발견했어요.', uz: "Mahalliy aholi tufayli sayohatnomalarda bo'lmagan yashirin joyni topdim." },
        { kr: '언어 장벽에 길을 잃을 뻔했지만 결국 목적지에 도착했어요.', uz: "Til to'sig'i sababli yo'l adashib qolay yozdim, lekin oxir-oqibat manzilga yetib keldim." },
      ],
      dialog: [
        { speaker: 'A', kr: '지난 여행에서 가장 기억에 남는 경험이 뭐예요?', uz: "O'tgan sayohatingizda eng esda qolgan tajriba nima edi?" },
        { speaker: 'B', kr: '길을 잃을 뻔했는데 현지인 덕분에 무사히 숙소를 찾았어요.', uz: "Yo'l adashib qolay yozdim, lekin mahalliy aholi tufayli xavfsiz yotoqxona topdim." },
        { speaker: 'A', kr: '다행이었겠어요. 언어 소통은 어떻게 했어요?', uz: "Yaxshi bo'libdi. Til muloqotini qanday qildingiz?" },
        { speaker: 'B', kr: '번역 앱 덕분에 의사소통할 수 있었어요. 그게 없었으면 어떻게 됐을지 모르겠어요.', uz: "Tarjima ilovasi tufayli muloqot qila oldim. U bo'lmaganida nima bo'lishini bilmayapman." },
        { speaker: 'A', kr: '여행하고 나서 어떤 점이 달라졌어요?', uz: "Sayohat qilib bo'lgandan keyin qanday jihatlar o'zgardi?" },
        { speaker: 'B', kr: '다른 문화를 경험한 덕분에 세상을 보는 눈이 넓어진 편이에요.', uz: "Boshqa madaniyatni boshdan kechirganim tufayli dunyoga nazar kenglashgan tomonda." },
      ],
      notes: [
        "덕분에 — FAQAT ijobiy natijada: 선생님 덕분에(o'qituvchi tufayli), 도움 덕분에(yordam tufayli).",
        "바람에 — salbiy natijada: 비 바람에 취소됐어요 (yomg'ir sababli bekor bo'ldi).",
        "-고 나서: ...qilib bo'lgandan keyin: 먹고 나서(yeb bo'lgandan keyin), 자고 나서(uyqdan turgandan keyin).",
        "현지인 (mahalliy aholi) — sayohatda eng muhim yordam beruvchi.",
        "인생관 — hayotga munosabat: 여행은 인생관을 바꾼다 (sayohat hayotga munosabatni o'zgartiradi).",
      ],
      games: {
        matchPairs: [
          { kr: '풍경', uz: 'manzara' },
          { kr: '현지인', uz: 'mahalliy aholi' },
          { kr: '인생관', uz: 'dunyoqarash' },
          { kr: '소중하다', uz: 'qadrli' },
          { kr: '감동받다', uz: "ta'sirlanmoq" },
          { kr: '일상', uz: 'kundalik hayot' },
        ],
        fillBlank: [
          { sentence: '현지인 ___ 길을 찾을 수 있었어요.', answer: '덕분에', options: ['덕분에', '때문에', '바람에', '때문에'], uz: "Mahalliy aholi tufayli yo'l topa oldim." },
          { sentence: '너무 아름다워서 말을 잃을 ___ 했어요.', answer: '뻔', options: ['뻔', '수', '줄', '만'], uz: "Juda go'zal ko'rib so'z topay yozdim." },
          { sentence: '여행하고 ___ 인생관이 달라졌어요.', answer: '나서', options: ['나서', '서', '면서', '고'], uz: "Sayohat qilib bo'lgandan keyin hayotga munosabat o'zgardi." },
          { sentence: '열심히 공부한 ___ 합격했어요.', answer: '덕분에', options: ['덕분에', '바람에', '때문에', '대신에'], uz: "Astoydil o'rganimiz tufayli o'tdim." },
          { sentence: '비행기를 놓칠 뻔했지만 다행히 시간에 맞게 ___.', answer: '탔어요', options: ['탔어요', '놓쳤어요', '못 탔어요', '가요'], uz: "Samolyotni o'tkazib qolay yozdim, lekin yaxshiyamki o'z vaqtida chiqdim." },
        ],
        scramble: [
          { kr: '여행', uz: 'sayohat' },
          { kr: '풍경', uz: 'manzara' },
          { kr: '기억', uz: 'xotira' },
          { kr: '일상', uz: 'kundalik' },
          { kr: '감정', uz: 'his' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄴ 덕분에' qachon ishlatiladi?", options: ['Salbiy natija uchun', 'Ijobiy natija uchun (minnatdorlik bilan)', 'Inkor uchun', 'Savol uchun'], correct_index: 1 },
      { question: "'길을 잃을 뻔했어요' nimani anglatadi?", options: ["Yo'l yo'qoldi", "Yo'l adashib qolay yozdim", "Yo'l topdim", "Yo'l qiyin edi"], correct_index: 1 },
      { question: "'-고 나서' nimani ifodalaydi?", options: ['Bir vaqtda', '...qilib bo\'lgandan keyin', 'Sababli', 'Holda'], correct_index: 1 },
      { question: "'현지인' nimani anglatadi?", options: ['sayohatchi', 'mahalliy aholi', 'yo\'lboshchi', "do'st"], correct_index: 1 },
      { question: "'인생관' nimani anglatadi?", options: ['hayot tarixi', 'hayotga munosabat, dunyoqarash', 'hayot sifati', 'hayot qoidasi'], correct_index: 1 },
      { question: "'소중하다' nimani anglatadi?", options: ['katta', 'qadrli, qimmatli', 'yangi', 'ajoyib'], correct_index: 1 },
      { question: "'덕분에' va '때문에' farqi?", options: ['Farq yo\'q', '덕분에 — ijobiy; 때문에 — neytral yoki salbiy', '때문에 — ijobiy', 'Ikkalasi ham salbiy'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 14 (L5-4): Raqamlar va ma'lumotlar dunyosi
  // 숫자의 세계
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 5, order_in_level: 4,
    title_kr: '숫자의 세계',
    title_uz: "Raqamlar va ma'lumotlar dunyosi",
    is_free: false,
    content: {
      topic: {
        kr: '통계와 숫자는 사회를 이해하는 데 중요한 도구입니다. 지난해에 비해 올해 경제 성장률이 높아진 것으로 나타났습니다. 예상한 것에 비해 실제 결과는 달랐습니다. 수치가 증가하는 만큼 문제의 심각성도 커지는 편이에요.',
        uz: "Statistika va raqamlar jamiyatni tushunishda muhim vosita. O'tgan yilga nisbatan bu yil iqtisodiy o'sish darajasi oshganligi ma'lum bo'ldi. Kutilganga nisbatan haqiqiy natija boshqacha chiqdi. Ko'rsatgich oshgan qadar muammo jiddiyligi ham ortadigan tomonda."
      },
      grammar: {
        explanation: `-(으)ㄴ/는 데 비해 — ...ga nisbatan, ...ga qaraganda (rasmiy taqqoslash)

Tuzilish: [ot + 에 비해 / fe'l + (으)ㄴ/는 데 비해]
• 작년에 비해 올해가 더 좋아요. (O'tgan yilga nisbatan bu yil yaxshiroq.)
• 예상한 것에 비해 결과가 좋았어요. (Kutilganga nisbatan natija yaxshi chiqdi.)
• 가격에 비해 품질이 좋은 편이에요. (Narxga nisbatan sifati yaxshi tomonda.)

-(으)ㄴ/는 만큼 (rasmiy yozuvda):
• 노력한 만큼 결과가 나오게 마련이에요. (Harakat qilgan qadar natija chiqishi muqarrar.)

-(으)ㄴ/는 것으로 나타났다 — ma'lumotlar shuni ko'rsatdi, ...ekanligi aniqlandi:
• 실업률이 증가한 것으로 나타났습니다. (Ishsizlik darajasi oshganligi aniqlandi.)
• 건강이 개선된 것으로 나타났다. (Sog'liq yaxshilanganligi ma'lum bo'ldi.)`,
        examples: [
          { kr: '작년에 비해 올해 수출이 15% 증가한 것으로 나타났습니다.', uz: "O'tgan yilga nisbatan bu yil eksport 15% oshganligi ma'lum bo'ldi." },
          { kr: '예상한 것에 비해 실제 결과가 훨씬 좋은 편이에요.', uz: "Kutilganga nisbatan haqiqiy natija ancha yaxshi tomonda." },
          { kr: '투자한 만큼 수익이 나오지 않는 것으로 나타났어요.', uz: "Qo'yilgan investitsiya qadar daromad chiqmayotganligi ma'lum bo'ldi." },
          { kr: '성별에 비해 나이의 영향이 더 큰 것으로 나타났습니다.', uz: "Jinsga nisbatan yoshning ta'siri kattaroq ekanligi aniqlandi." },
          { kr: '비용에 비해 효과가 낮은 편이라 재검토가 필요해요.', uz: "Xarajatga nisbatan samarasi past tomoni bo'lgani uchun qayta ko'rib chiqish kerak." },
        ]
      },
      vocabulary: [
        { kr: '숫자', romanization: 'sutja', uz: 'raqam' },
        { kr: '비율', romanization: 'biryal', uz: 'nisbat, foiz' },
        { kr: '증가', romanization: 'jeungga', uz: 'oshish' },
        { kr: '감소', romanization: 'gamso', uz: 'kamayish' },
        { kr: '비교', romanization: 'bigyo', uz: 'taqqoslash' },
        { kr: '차이', romanization: 'chai', uz: 'farq' },
        { kr: '변화', romanization: 'byeonhwa', uz: "o'zgarish" },
        { kr: '평균', romanization: 'pyeongyun', uz: "o'rtacha" },
        { kr: '통계', romanization: 'tongkye', uz: 'statistika' },
        { kr: '급격히', romanization: 'geupgyeoki', uz: 'keskin, tezda' },
        { kr: '서서히', romanization: 'seoeohi', uz: 'asta-sekin' },
        { kr: '지속되다', romanization: 'jisoktdweda', uz: 'davom etmoq' },
        { kr: '높다', romanization: 'nopda', uz: 'yuqori' },
        { kr: '낮다', romanization: 'natda', uz: 'past' },
        { kr: '수치', romanization: 'suchi', uz: "ko'rsatgich" },
        { kr: '조사하다', romanization: 'josahada', uz: "o'rganmoq, tekshirmoq" },
        { kr: '분석하다', romanization: 'bunseokhada', uz: 'tahlil qilmoq' },
        { kr: '예측하다', romanization: 'yecheukada', uz: 'bashorat qilmoq' },
        { kr: '수출', romanization: 'suchul', uz: 'eksport' },
        { kr: '수입', romanization: 'suip', uz: 'import; daromad' },
      ],
      examples: [
        { kr: '조사 결과에 따르면 응답자의 70%가 찬성한 것으로 나타났습니다.', uz: "Tadqiqot natijalariga ko'ra, respondentlarning 70% qo'llab-quvvatlaganligi ma'lum bo'ldi." },
        { kr: '5년 전에 비해 스마트폰 사용자가 두 배 증가한 것으로 나타났어요.', uz: "5 yil oldiniga nisbatan smartfon foydalanuvchilar ikki baravar oshganligi aniqlandi." },
        { kr: '투입한 비용에 비해 기대만큼의 성과가 나오지 않는 편이에요.', uz: "Kiritilgan xarajatga nisbatan kutilgan darajada natija chiqmadigan tomonda." },
        { kr: '교육 수준이 높아질수록 소득도 증가하는 것으로 나타났습니다.', uz: "Ta'lim darajasi oshgan sari daromad ham oshishi ma'lum bo'ldi." },
        { kr: '예상한 수치에 비해 실제 결과가 낮은 것으로 분석됐어요.', uz: "Kutilgan ko'rsatkichga nisbatan haqiqiy natija past ekanligi tahlil qilindi." },
      ],
      dialog: [
        { speaker: 'A', kr: '이번 분기 실적이 어때요?', uz: "Bu chorak natijalar qanday?" },
        { speaker: 'B', kr: '지난 분기에 비해 매출이 20% 증가한 것으로 나타났어요.', uz: "O'tgan chorakka nisbatan savdo 20% oshganligi ma'lum bo'ldi." },
        { speaker: 'A', kr: '예상한 것에 비해 더 좋은 결과네요.', uz: "Kutilganga nisbatan yaxshiroq natija ekan." },
        { speaker: 'B', kr: '네, 노력한 만큼 결과가 나온 것 같아요.', uz: "Ha, harakat qilgan qadar natija chiqqan shekilli." },
        { speaker: 'A', kr: '다음 분기 목표는 어떻게 세웠어요?', uz: "Keyingi chorak uchun maqsad qanday belgilandi?" },
        { speaker: 'B', kr: '이번 성과에 비해 10% 더 높은 목표를 세웠어요. 달성 가능한 것으로 보입니다.', uz: "Bu chorak natijasiga nisbatan 10% yuqori maqsad belgilandi. Erishish mumkin ko'rinmoqda." },
      ],
      notes: [
        "-(으)ㄴ/는 데 비해: rasmiy taqqoslash: 작년에 비해(o'tgan yilga nisbatan).",
        "-(으)ㄴ/는 것으로 나타났다: akademik/yangilik uslubida: ...ekanligi aniqlandi/ma'lum bo'ldi.",
        "비율 (nisbat/foiz): 10% — 십 퍼센트, 1/3 — 3분의 1.",
        "수치 가 증가/감소했다 (ko'rsatgich oshdi/kamaydi) — ma'lumot tahlilida ko'p ishlatiladi.",
        "분기 (chorak): 1분기 (yanvar-mart), 2분기 (aprel-iyun)...",
      ],
      games: {
        matchPairs: [
          { kr: '통계', uz: 'statistika' },
          { kr: '수치', uz: "ko'rsatgich" },
          { kr: '분석하다', uz: 'tahlil qilmoq' },
          { kr: '예측하다', uz: 'bashorat qilmoq' },
          { kr: '수출', uz: 'eksport' },
          { kr: '평균', uz: "o'rtacha" },
        ],
        fillBlank: [
          { sentence: '작년에 비해 올해 수출이 증가한 것으로 ___.', answer: '나타났습니다', options: ['나타났습니다', '보입니다', '같아요', '돼요'], uz: "O'tgan yilga nisbatan bu yil eksport oshganligi ma'lum bo'ldi." },
          { sentence: '예상한 것___ 비해 결과가 좋았어요.', answer: '에', options: ['에', '이', '를', '가'], uz: "Kutilganga nisbatan natija yaxshi chiqdi." },
          { sentence: '투자한 ___ 수익이 나오지 않아요.', answer: '만큼', options: ['만큼', '대신에', '때문에', '반면에'], uz: "Qo'yilgan investitsiya qadar daromad chiqmayapti." },
          { sentence: '교육 수준이 높아질수록 소득도 증가하는 것으로 ___.', answer: '나타났습니다', options: ['나타났습니다', '봐요', '같아요', '해요'], uz: "Ta'lim darajasi oshgan sari daromad ham oshishi ma'lum bo'ldi." },
          { sentence: '비용에 비해 효과가 낮은 편이라 재검토가 ___.', answer: '필요해요', options: ['필요해요', '필요없어요', '좋아요', '돼요'], uz: "Xarajatga nisbatan samarasi past tomoni bo'lgani uchun qayta ko'rib chiqish kerak." },
        ],
        scramble: [
          { kr: '통계', uz: 'statistika' },
          { kr: '비율', uz: 'nisbat' },
          { kr: '증가', uz: 'oshish' },
          { kr: '감소', uz: 'kamayish' },
          { kr: '평균', uz: "o'rtacha" },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄴ/는 데 비해' nimani anglatadi?", options: ['...sababli', '...ga nisbatan, ...ga qaraganda', '...tufayli', '...dan boshqa iloj yo\'q'], correct_index: 1 },
      { question: "'-(으)ㄴ/는 것으로 나타났다' qanday uslubda ishlatiladi?", options: ['norasmiy', 'akademik va yangilik uslubida', 'og\'zaki', 'do\'stona'], correct_index: 1 },
      { question: "'수치' nimani anglatadi?", options: ['raqam', "ko'rsatgich", 'statistika', 'taqqoslash'], correct_index: 1 },
      { question: "'급격히' nimani anglatadi?", options: ['asta-sekin', 'doimo', 'keskin, tezda', "ba'zan"], correct_index: 2 },
      { question: "'수출' nimani anglatadi?", options: ['import', 'eksport', 'daromad', 'xarajat'], correct_index: 1 },
      { question: "'분기' nimani anglatadi?", options: ['yil', 'oy', 'chorak', 'hafta'], correct_index: 2 },
      { question: "'분석하다' nimani anglatadi?", options: ["o'rganmoq", 'bashorat qilmoq', 'tahlil qilmoq', 'hisoblash'], correct_index: 2 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 15 (L5-5): Hayvonlar va o'simliklar
  // 동물과 식물
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 5, order_in_level: 5,
    title_kr: '동물과 식물',
    title_uz: "Hayvonlar va o'simliklar",
    is_free: false,
    content: {
      topic: {
        kr: '자연계에서 동물과 식물은 서로 긴밀하게 연결되어 있습니다. 눈을 뜬 채로 잠을 자는 동물도 있습니다. 환경 변화의 결과로 많은 종이 멸종 위기에 처했습니다. 노력한 결과 일부 멸종 위기 종이 회복되고 있을 뿐입니다.',
        uz: "Tabiat olamida hayvonlar va o'simliklar bir-biri bilan chambarchas bog'liq. Ko'zini ochgan holda uyquga ketadigan hayvonlar ham bor. Muhit o'zgarishi natijasida ko'plab turlar qirilib ketish xavfiga duch keldi. Harakat qilingan natijada ba'zi qirilib ketish xavfidagi turlar tiklanib kelmoqda xolos."
      },
      grammar: {
        explanation: `-(으)ㄴ 채로 — ...holda, ...holatida (oldingi holat o'zgarmasdan davom etmoqda)

Tuzilish: [fe'l + (으)ㄴ 채로]
• 눈을 뜬 채로 잠을 자요. (Ko'zini ochgan holda uxlaydi.)
• 옷을 입은 채로 수영했어요. (Kiyim kiygan holda suzdi.)
• 창문을 열어 놓은 채로 나갔어요. (Deraza ochiq qolgan holda chiqib ketdi.)

-(으)ㄹ 뿐이다 — ...xolos, faqat ... (boshqa narsa yo'q, shu qadar):
• 기다릴 뿐이에요. (Kutish xolos / faqat kutayapman.)
• 연구할 뿐입니다. (Tadqiqot qilish xolos.)
• 알 수 없을 뿐이에요. (Bilishning iloji yo'q xolos.)

-(으)ㄴ 결과 — ...natijasida, ...qilingan natijada:
• 연구한 결과 새로운 사실이 밝혀졌어요. (Tadqiqot natijasida yangi haqiqat ochildi.)`,
        examples: [
          { kr: '어떤 새는 한쪽 눈을 뜬 채로 잠을 자는 것으로 나타났어요.', uz: "Ba'zi qushlar bir ko'zini ochgan holda uxlashi ma'lum bo'ldi." },
          { kr: '우리가 할 수 있는 건 환경을 보호할 뿐이에요.', uz: "Biz qila oladigan narsa atrof-muhitni himoya qilish xolos." },
          { kr: '오랜 연구한 결과 새로운 치료법이 개발됐어요.', uz: "Uzoq tadqiqot natijasida yangi davolash usuli ishlab chiqildi." },
          { kr: '얼어 있는 채로 수백 년 된 동물이 발견됐어요.', uz: "Muzlagan holda yuzlab yillik hayvon topildi." },
          { kr: '보호 정책을 실시한 결과 일부 멸종 위기 종이 회복됐어요.', uz: "Himoya siyosatini amalga oshirgan natijada ba'zi qirilib ketish xavfidagi turlar tiklandi." },
        ]
      },
      vocabulary: [
        { kr: '동물', romanization: 'dongmul', uz: 'hayvon' },
        { kr: '식물', romanization: 'singmul', uz: "o'simlik" },
        { kr: '생태계', romanization: 'saengtaegye', uz: 'ekotizim' },
        { kr: '환경', romanization: 'hwangyeong', uz: 'muhit' },
        { kr: '성장', romanization: 'seongjang', uz: "o'sish" },
        { kr: '변화', romanization: 'byeonhwa', uz: "o'zgarish" },
        { kr: '먹이', romanization: 'meogi', uz: 'ozuqa' },
        { kr: '생존', romanization: 'saengjon', uz: 'yashab qolish' },
        { kr: '보호', romanization: 'boho', uz: 'himoya' },
        { kr: '적응하다', romanization: 'jeogeunghada', uz: 'moslashmoq' },
        { kr: '번식하다', romanization: 'beonsikhada', uz: "ko'paymoq" },
        { kr: '멸종하다', romanization: 'myeoljonghada', uz: "yo'qolib ketmoq" },
        { kr: '유지되다', romanization: 'yujidweda', uz: 'saqlanmoq' },
        { kr: '영향을 받다', romanization: 'yeonghyange batta', uz: "ta'sir olmoq" },
        { kr: '포식자', romanization: 'posikja', uz: "yirtqich, tabiiy dushman" },
        { kr: '먹이 사슬', romanization: 'meogi sasil', uz: 'oziq-ovqat zanjiri' },
        { kr: '서식지', romanization: 'seositkji', uz: "yashash joyi (habitat)" },
        { kr: '종', romanization: 'jong', uz: 'tur (biologik)' },
        { kr: '회복되다', romanization: 'hoeboktdweda', uz: 'tiklanmoq' },
        { kr: '멸종 위기', romanization: 'myeoljong wigi', uz: 'qirilib ketish xavfi' },
      ],
      examples: [
        { kr: '기후 변화의 결과로 많은 동물이 서식지를 잃어가고 있어요.', uz: "Iqlim o'zgarishi natijasida ko'plab hayvonlar yashash joyini yo'qotib bormoqda." },
        { kr: '이 식물은 혹독한 환경에 적응한 채로 수천 년을 살아왔어요.', uz: "Bu o'simlik og'ir muhitga moslashgan holda minglab yillar yashab kelgan." },
        { kr: '멸종 위기 동물을 보호할 뿐만 아니라 서식지도 복원해야 해요.', uz: "Qirilib ketish xavfidagi hayvonlarni himoya qilish bilan birga yashash joyini ham tiklash kerak." },
        { kr: '10년간 연구한 결과 이 종이 새로운 환경에 잘 적응하는 것으로 나타났어요.', uz: "10 yil tadqiqot qilgan natijada bu tur yangi muhitga yaxshi moslashishi ma'lum bo'ldi." },
        { kr: '식물은 이산화탄소를 흡수한 채로 산소를 배출하는 과정을 계속해요.', uz: "O'simlik karbon ikki oksidini yutgan holda kislorod chiqarish jarayonini davom ettiradi." },
      ],
      dialog: [
        { speaker: 'A', kr: '요즘 멸종 위기 동물에 대해 공부하고 있어요.', uz: "Hozirda qirilib ketish xavfidagi hayvonlarni o'rganmoqdaman." },
        { speaker: 'B', kr: '어떤 동물이요? 판다 같은 동물이요?', uz: "Qanday hayvon? Panda kabi hayvonlarmi?" },
        { speaker: 'A', kr: '네, 판다도 있고요. 오랜 보호 노력을 한 결과 조금 회복됐어요.', uz: "Ha, panda ham bor. Uzoq himoya harakati qilgan natijada biroz tiklandi." },
        { speaker: 'B', kr: '그렇군요. 서식지를 보호하는 것이 중요하겠네요.', uz: "Shundaymi. Yashash joyini himoya qilish muhim bo'lsa kerak." },
        { speaker: 'A', kr: '맞아요. 서식지가 파괴된 채로는 아무리 노력해도 회복하기 어려울 뿐이에요.', uz: "To'g'ri. Yashash joyi buzilgan holda qanchalik harakat qilsa ham tiklanish qiyin xolos." },
        { speaker: 'B', kr: '우리가 할 수 있는 건 환경 보호에 참여할 뿐이네요.', uz: "Biz qila oladigan narsa atrof-muhit himoyasida ishtirok etish xolos." },
      ],
      notes: [
        "-(으)ㄴ 채로: oldingi holat davom etmoqda: 눈 뜬 채로(ko'z ochiq holda), 신발 신은 채로(oyoq kiyim kiygan holda).",
        "-(으)ㄹ 뿐이다: faqat shu, boshqa narsa yo'q: 기다릴 뿐이에요(kutish xolos).",
        "-(으)ㄴ 결과: ...natijasida: 연구한 결과(tadqiqot natijasida), 노력한 결과(harakat natijasida).",
        "멸종 위기 (qirilib ketish xavfi): IUCN (Xalqaro Tabiatni Muhofaza qilish Ittifoqi) tomonidan belgilanadi.",
        "먹이 사슬 (oziq-ovqat zanjiri): o'tlar → o'txo'rlar → yirtqichlar.",
      ],
      games: {
        matchPairs: [
          { kr: '적응하다', uz: 'moslashmoq' },
          { kr: '번식하다', uz: "ko'paymoq" },
          { kr: '멸종하다', uz: "yo'qolib ketmoq" },
          { kr: '서식지', uz: 'yashash joyi' },
          { kr: '종', uz: 'tur (biologik)' },
          { kr: '먹이 사슬', uz: 'oziq-ovqat zanjiri' },
        ],
        fillBlank: [
          { sentence: '어떤 새는 한쪽 눈을 뜬 ___ 잠을 자요.', answer: '채로', options: ['채로', '대로', '뿐으로', '결과로'], uz: "Ba'zi qushlar bir ko'zini ochgan holda uxlaydi." },
          { sentence: '우리가 할 수 있는 건 환경을 보호할 ___.', answer: '뿐이에요', options: ['뿐이에요', '수있어요', '것이에요', '만해요'], uz: "Biz qila oladigan narsa atrof-muhitni himoya qilish xolos." },
          { sentence: '오랜 연구한 ___ 새로운 치료법이 개발됐어요.', answer: '결과', options: ['결과', '덕분에', '대신에', '때문에'], uz: "Uzoq tadqiqot natijasida yangi davolash usuli ishlab chiqildi." },
          { sentence: '서식지가 파괴된 채로는 회복하기 어려울 ___.', answer: '뿐이에요', options: ['뿐이에요', '것이에요', '편이에요', '만해요'], uz: "Yashash joyi buzilgan holda tiklanish qiyin xolos." },
          { sentence: '기후 변화의 결과로 많은 동물이 서식지를 ___.', answer: '잃어가고 있어요', options: ['잃어가고 있어요', '찾고 있어요', '늘어가고 있어요', '좋아지고 있어요'], uz: "Iqlim o'zgarishi natijasida ko'plab hayvonlar yashash joyini yo'qotib bormoqda." },
        ],
        scramble: [
          { kr: '동물', uz: 'hayvon' },
          { kr: '생존', uz: 'yashab qolish' },
          { kr: '보호', uz: 'himoya' },
          { kr: '종', uz: 'tur' },
          { kr: '성장', uz: "o'sish" },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄴ 채로' nimani anglatadi?", options: ['...qilib bo\'lgandan keyin', '...holda, holatida (davom etib)', 'sababli', '...o\'rniga'], correct_index: 1 },
      { question: "'-(으)ㄹ 뿐이다' nimani anglatadi?", options: ['...ham mumkin', '...xolos, faqat shu', '...kerak', '...mumkin emas'], correct_index: 1 },
      { question: "'-(으)ㄴ 결과' nimani anglatadi?", options: ['...tufayli', '...natijasida', '...holda', '...o\'rniga'], correct_index: 1 },
      { question: "'멸종하다' nimani anglatadi?", options: ['ko\'paymoq', 'moslashmoq', "yo'qolib ketmoq", 'tiklanmoq'], correct_index: 2 },
      { question: "'서식지' nimani anglatadi?", options: ['ozuqa', 'yashash joyi (habitat)', 'tur', 'zanjir'], correct_index: 1 },
      { question: "'번식하다' nimani anglatadi?", options: ["yo'qolib ketmoq", 'moslashmoq', "ko'paymoq", 'tiklanmoq'], correct_index: 2 },
      { question: "'먹이 사슬' nimani anglatadi?", options: ['ovqatlanish odati', 'oziq-ovqat zanjiri', 'tabiiy dushman', 'yashash joyi'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 16 (L5-6): Ilm-fan mo'jizalari
  // 과학의 신비
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 5, order_in_level: 6,
    title_kr: '과학의 신비',
    title_uz: "Ilm-fan mo'jizalari",
    is_free: false,
    content: {
      topic: {
        kr: '과학은 우리가 모르는 자연의 신비를 밝혀내는 학문입니다. 오랜 실험한 결과 새로운 사실이 증명됐습니다. 아직 밝혀지지 않은 것들이 있을 따름입니다. 연구가 진행될수록 더 많은 것이 발견될 것으로 보입니다.',
        uz: "Ilm-fan bizga noma'lum tabiat sirlarini ochib beradigan fan. Uzoq tajriba o'tkazilgan natijada yangi haqiqat isbotlandi. Hali aniqlanmagan narsalar bor xolos. Tadqiqot davom etgan sari ko'proq narsalar topilishi ko'rinmoqda."
      },
      grammar: {
        explanation: `-(으)ㄹ 따름이다 — ...xolos, faqat ... (rasmiy, akademik uslub)

Tuzilish: [fe'l + (으)ㄹ 따름이다]
• 연구할 따름입니다. (Tadqiqot qilish xolos — boshqa imkoniyat yo'q.)
• 기다릴 따름이에요. (Kutish xolos — biron narsa qilib bo'lmaydi.)
• 놀랄 따름입니다. (Hayron bo'lish xolos — juda hayratlanarli.)

-(으)ㄹ 뿐이다 vs -(으)ㄹ 따름이다:
뿐이다 — kundalik suhbat
따름이다 — rasmiy, akademik, yozma nutq

-(으)ㄴ 결과 (rasmiy yozuvda):
• 실험한 결과 새로운 원리가 발견됐습니다.

-(으)ㄹ 것으로 보이다:
• 앞으로 더 발전할 것으로 보입니다.`,
        examples: [
          { kr: '현재로서는 그저 놀랄 따름입니다.', uz: "Hozircha hayron bo'lish xolos." },
          { kr: '실험한 결과 예상했던 것과는 다른 결과가 나왔어요.', uz: "Tajriba o'tkazilgan natijada kutilgandan farqli natija chiqdi." },
          { kr: '앞으로 기술이 더 발전할 것으로 보입니다.', uz: "Bundan keyin texnologiya yanada rivojlanishi ko'rinmoqda." },
          { kr: '우주의 신비는 연구할 따름이에요. 아직 모르는 게 너무 많아요.', uz: "Koinot sirlarini tadqiqot qilish xolos. Hali bilmagan narsa juda ko'p." },
          { kr: '수십 년간 연구한 결과 암 치료에 새로운 가능성이 발견된 것으로 보입니다.', uz: "O'nlab yillar tadqiqot qilingan natijada saraton davolashda yangi imkoniyat topilgani ko'rinmoqda." },
        ]
      },
      vocabulary: [
        { kr: '과학', romanization: 'gwahak', uz: 'ilm-fan' },
        { kr: '연구', romanization: 'yeongu', uz: 'tadqiqot' },
        { kr: '실험', romanization: 'sirheom', uz: "tajriba (ilmiy)" },
        { kr: '결과', romanization: 'gyeolgwa', uz: 'natija' },
        { kr: '원리', romanization: 'wolli', uz: 'prinsip, qonuniyat' },
        { kr: '발견', romanization: 'balgyeon', uz: 'kashfiyot' },
        { kr: '기술', romanization: 'gisul', uz: 'texnologiya' },
        { kr: '발전', romanization: 'baljeon', uz: 'rivojlanish' },
        { kr: '이론', romanization: 'illyeon', uz: 'nazariya' },
        { kr: '분석하다', romanization: 'bunseokhada', uz: 'tahlil qilmoq' },
        { kr: '설명하다', romanization: 'seolmyeonghada', uz: 'tushuntirmoq' },
        { kr: '예측하다', romanization: 'yecheukada', uz: 'bashorat qilmoq' },
        { kr: '증명하다', romanization: 'jeungmyeonghada', uz: 'isbotlamoq' },
        { kr: '관찰하다', romanization: 'gwanchalada', uz: 'kuzatmoq' },
        { kr: '우주', romanization: 'uju', uz: 'koinot, fazо' },
        { kr: '생물학', romanization: 'saengmulhak', uz: 'biologiya' },
        { kr: '물리학', romanization: 'mulihak', uz: 'fizika' },
        { kr: '화학', romanization: 'hwahak', uz: 'kimyo' },
        { kr: '신비', romanization: 'sinbi', uz: "sir, mo'jiza" },
        { kr: '가설', romanization: 'gasseol', uz: 'gipoteza, faraziya' },
      ],
      examples: [
        { kr: '수십 년간 관찰한 결과 이 현상의 원인이 밝혀졌습니다.', uz: "O'nlab yillar kuzatilgan natijada bu hodisaning sababi aniqlandi." },
        { kr: '과학자들은 놀랄 따름인 새로운 사실들을 계속 발견하고 있어요.', uz: "Olimlar hayron bo'lish xolos bo'lgan yangi haqiqatlarni davom ettirib topmoqda." },
        { kr: '기술이 발전할수록 더 많은 우주의 신비가 밝혀질 것으로 보입니다.', uz: "Texnologiya rivojlangan sari koinotning ko'proq sirlari ochilishi ko'rinmoqda." },
        { kr: '실험한 결과 이 가설이 맞는 것으로 나타났습니다.', uz: "Tajriba o'tkazilgan natijada bu gipoteza to'g'ri ekanligi aniqlandi." },
        { kr: '현재 기술로는 증명할 따름이지 완전히 이해할 수는 없어요.', uz: "Hozirgi texnologiya bilan isbotlash xolos, to'liq tushunib bo'lmaydi." },
      ],
      dialog: [
        { speaker: 'A', kr: '요즘 어떤 연구를 하고 있어요?', uz: "Hozirda qanday tadqiqot qilyapsiz?" },
        { speaker: 'B', kr: '우주의 생성 원리에 대해 연구하고 있어요. 놀랄 따름인 발견들이 계속 나오고 있어요.', uz: "Koinotning yaralish qonuniyatlari haqida tadqiqot qilyapman. Hayron bo'lish xolos bo'lgan kashfiyotlar davom etib chiqmoqda." },
        { speaker: 'A', kr: '구체적으로 어떤 결과가 나왔어요?', uz: "Aniqroq qanday natijalar chiqdi?" },
        { speaker: 'B', kr: '10년 연구한 결과 새로운 유형의 별이 발견된 것으로 보입니다.', uz: "10 yil tadqiqot qilingan natijada yangi tur yulduz topilgani ko'rinmoqda." },
        { speaker: 'A', kr: '대단하네요! 앞으로 어떻게 발전할 것으로 보여요?', uz: "Ajoyib! Bundan keyin qanday rivojlanishi ko'rinmoqda?" },
        { speaker: 'B', kr: '아직은 연구할 따름이에요. 10년 후에는 더 많은 게 밝혀질 것으로 보입니다.', uz: "Hozircha tadqiqot qilish xolos. 10 yildan keyin ko'proq narsalar aniqlanishi ko'rinmoqda." },
      ],
      notes: [
        "-(으)ㄹ 따름이다: rasmiy uslub, yozma nutq: 연구할 따름입니다(tadqiqot qilish xolos).",
        "뿐이다 vs 따름이다: 뿐이다 — kundalik; 따름이다 — rasmiy, akademik.",
        "-(으)ㄴ 결과: tadqiqot yoki harakatning aniq natijasi.",
        "가설 (gipoteza) → 실험 (tajriba) → 결과 (natija) → 이론 (nazariya) — ilmiy jarayon.",
        "우주 (koinot/fazo): 우주 비행사(astronavt), 우주선(kosmik kema), 우주 정거장(kosmik stansiya).",
      ],
      games: {
        matchPairs: [
          { kr: '연구', uz: 'tadqiqot' },
          { kr: '가설', uz: 'gipoteza' },
          { kr: '증명하다', uz: 'isbotlamoq' },
          { kr: '관찰하다', uz: 'kuzatmoq' },
          { kr: '우주', uz: 'koinot' },
          { kr: '발견', uz: 'kashfiyot' },
        ],
        fillBlank: [
          { sentence: '현재로서는 그저 놀랄 ___.', answer: '따름입니다', options: ['따름입니다', '뿐이에요', '것이에요', '만해요'], uz: "Hozircha hayron bo'lish xolos." },
          { sentence: '실험한 ___ 예상과는 다른 결과가 나왔어요.', answer: '결과', options: ['결과', '덕분에', '때문에', '대신에'], uz: "Tajriba o'tkazilgan natijada kutilgandan farqli natija chiqdi." },
          { sentence: '기술이 발전할수록 더 많은 신비가 밝혀질 것으로 ___.', answer: '보입니다', options: ['보입니다', '있어요', '해요', '같아요'], uz: "Texnologiya rivojlangan sari ko'proq sirlar ochilishi ko'rinmoqda." },
          { sentence: '아직은 연구할 ___ 이에요. 모르는 게 많아요.', answer: '따름', options: ['따름', '뿐', '수', '만'], uz: "Hozircha tadqiqot qilish xolos. Bilmagan narsa ko'p." },
          { sentence: '실험한 결과 이 가설이 맞는 것으로 ___.', answer: '나타났습니다', options: ['나타났습니다', '보입니다', '같아요', '해요'], uz: "Tajriba natijasida bu gipoteza to'g'ri ekanligi aniqlandi." },
        ],
        scramble: [
          { kr: '과학', uz: 'ilm-fan' },
          { kr: '연구', uz: 'tadqiqot' },
          { kr: '발견', uz: 'kashfiyot' },
          { kr: '우주', uz: 'koinot' },
          { kr: '이론', uz: 'nazariya' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄹ 따름이다' qaysi uslubda ishlatiladi?", options: ['norasmiy, og\'zaki', 'rasmiy, akademik, yozma', 'do\'stona', 'badiiy'], correct_index: 1 },
      { question: "'-(으)ㄹ 뿐이다' va '-(으)ㄹ 따름이다' farqi?", options: ['Farq yo\'q', '뿐이다 — kundalik; 따름이다 — rasmiy', '따름이다 — kundalik', 'Ikkalasi ham rasmiy'], correct_index: 1 },
      { question: "'가설' nimani anglatadi?", options: ['nazariya', 'gipoteza, faraziya', 'kashfiyot', 'natija'], correct_index: 1 },
      { question: "'증명하다' nimani anglatadi?", options: ['tahlil qilmoq', 'kuzatmoq', 'isbotlamoq', 'bashorat qilmoq'], correct_index: 2 },
      { question: "'신비' nimani anglatadi?", options: ['kashfiyot', "sir, mo'jiza", 'tadqiqot', 'nazariya'], correct_index: 1 },
      { question: "'물리학' nimani anglatadi?", options: ['kimyo', 'biologiya', 'fizika', 'matematika'], correct_index: 2 },
      { question: "'관찰하다' nimani anglatadi?", options: ['tahlil qilmoq', 'isbotlamoq', 'kuzatmoq', 'bashorat qilmoq'], correct_index: 2 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 17 (L5-7): Uchrashuv va ayriliq
  // 만남과 헤어짐
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 5, order_in_level: 7,
    title_kr: '만남과 헤어짐',
    title_uz: 'Uchrashuv va ayriliq',
    is_free: false,
    content: {
      topic: {
        kr: '인생에서 만남과 헤어짐은 피할 수 없는 편입니다. 오랫동안 보고 싶었던 친구를 만난 적이 있었는데 그 기분은 말할 수 없을 따름이었어요. 눈물을 참은 채로 헤어졌어요. 소중한 사람과 헤어질 수밖에 없는 상황에서 느끼는 감정은 복잡해요.',
        uz: "Hayotda uchrashuv va ayriliq muqarrar tomonda. Uzoq vaqt ko'rmoqchi bo'lgan do'stim bilan uchrashgan payt bo'lgan, o'shanda his-tuyg'uni aytib bo'lmaydigan xolos edi. Ko'z yoshini tutgan holda xayrlashdim. Qadrli insondan ajralishdan boshqa iloj yo'q bo'lgan vaziyatda his qilinadigan his-tuyg'ular murakkab."
      },
      grammar: {
        explanation: `-(으)ㄹ 수밖에 없다 (감정 강조) — emotsional kontekstda "...dan boshqa iloj yo'q"

Tuzilish: [fe'l + (으)ㄹ 수밖에 없다]
• 헤어질 수밖에 없었어요. (Ajralishdan boshqa iloj yo'q edi.)
• 울 수밖에 없었어요. (Yig'lashdan boshqa iloj yo'q edi.)
• 그리워할 수밖에 없어요. (Sog'inishdan boshqa iloj yo'q.)

-(으)ㄴ 적이 있다 (심화) — tajriba: ...qilgan payt bo'lgan

• 그 사람을 만난 적이 있어요. (O'sha odamni uchrashgan payt bo'lgan.)
• 외롭다고 느낀 적이 있어요? (Yolg'iz deb his qilgan payt bo'lganmi?)

-(으)ㄴ 채로 (감정 상태):
• 눈물을 참은 채로 웃었어요. (Ko'z yoshini tutgan holda kuldi.)`,
        examples: [
          { kr: '그 사람과 헤어질 수밖에 없는 상황이었어요.', uz: "O'sha odam bilan ajralishdan boshqa iloj yo'q bo'lgan vaziyat edi." },
          { kr: '처음 해외에서 혼자 살아본 적이 있는데 정말 외로웠어요.', uz: "Birinchi marta xorijda yolg'iz yashab ko'rgan payt bo'lgan, juda yolg'iz edi." },
          { kr: '감정을 숨긴 채로 웃으며 작별 인사를 했어요.', uz: "His-tuyg'ularni yashirgan holda kulib xayrlashdim." },
          { kr: '오래된 친구와 다시 만난 적이 있는데 시간이 멈춘 것 같았어요.', uz: "Eski do'st bilan yana uchrashgan payt bo'lgan, vaqt to'xtab qolganday edi." },
          { kr: '그리운 마음을 억제할 수밖에 없을 따름이에요.', uz: "Sog'inch hissini jilovlashdan boshqa iloj yo'q xolos." },
        ]
      },
      vocabulary: [
        { kr: '만남', romanization: 'mannam', uz: 'uchrashuv' },
        { kr: '헤어짐', romanization: 'heeoijim', uz: 'ayriliq' },
        { kr: '관계', romanization: 'gwangye', uz: 'munosabat' },
        { kr: '감정', romanization: 'gamjeong', uz: 'his-tuyg\'u' },
        { kr: '기억', romanization: 'gieok', uz: 'xotira' },
        { kr: '슬프다', romanization: 'seulpeuda', uz: 'xafa, g\'amgin' },
        { kr: '기쁘다', romanization: 'gippeuda', uz: 'xursand' },
        { kr: '그립다', romanization: 'geuriopda', uz: 'sog\'inmoq' },
        { kr: '소중하다', romanization: 'sojunghada', uz: 'qadrli' },
        { kr: '잊다', romanization: 'itda', uz: 'unutmoq' },
        { kr: '남다', romanization: 'namda', uz: 'qolmoq (xotirada)' },
        { kr: '떠나다', romanization: 'tteonada', uz: 'ketmoq, jo\'namoq' },
        { kr: '유지하다', romanization: 'yujihada', uz: 'saqlamoq, davom ettirmoq' },
        { kr: '변화하다', romanization: 'byeonhwahada', uz: "o'zgarmoq" },
        { kr: '그리워하다', romanization: 'geuriowohada', uz: 'sog\'inmoq' },
        { kr: '외롭다', romanization: 'oeropta', uz: 'yolg\'iz, tanho' },
        { kr: '보고 싶다', romanization: 'bogo sipda', uz: "ko'rgim kelyapti" },
        { kr: '작별하다', romanization: 'jakbyeolhada', uz: 'xayrlashmoq' },
        { kr: '인연', romanization: 'inyeon', uz: "taqdir, aloqa (koreyachada o'ziga xos so'z)" },
        { kr: '추억', romanization: 'chueok', uz: 'esga tushirish, nostalgiya' },
      ],
      examples: [
        { kr: '가장 친한 친구가 다른 나라로 떠날 수밖에 없었을 때 정말 슬펐어요.', uz: "Eng yaqin do'stim boshqa mamlakatga ketishdan boshqa iloj yo'q bo'lganida juda xafa bo'ldim." },
        { kr: '처음으로 진심으로 누군가를 사랑해 본 적이 있나요?', uz: "Birinchi marta chin dildan biror kishini sevib ko'rgan payt bo'lganmi?" },
        { kr: '슬픔을 감춘 채로 밝게 웃으며 배웅했어요.', uz: "G'amginlikni yashirgan holda yorqin kulib kuzatib qo'ydim." },
        { kr: '그 사람과의 추억은 영원히 기억 속에 남을 수밖에 없어요.', uz: "O'sha odam bilan bo'lgan esdaliklar abadiy xotirada qolishdan boshqa iloj yo'q." },
        { kr: '한번 끊어진 인연은 다시 잇기 어려운 편이에요.', uz: "Bir marta uzilgan aloqa yana ulash qiyin tomonda." },
      ],
      dialog: [
        { speaker: 'A', kr: '오랫동안 연락 못한 친구를 다시 만난 적이 있어요?', uz: "Uzoq vaqt aloqada bo'lmagan do'stingiz bilan yana uchrashgan payt bo'lganmi?" },
        { speaker: 'B', kr: '네, 10년 만에 만난 적이 있어요. 말할 수 없을 따름인 감동이었어요.', uz: "Ha, 10 yildan keyin uchrashgan payt bo'lgan. Aytib bo'lmaydigan xolos bo'lgan ta'sirlanish edi." },
        { speaker: 'A', kr: '그렇군요. 오랫동안 보고 싶었겠어요.', uz: "Shundaymi. Uzoq vaqt ko'rgingiz kelgansiz." },
        { speaker: 'B', kr: '네. 감정을 숨긴 채로 만났지만 결국 눈물이 났어요.', uz: "Ha. His-tuyg'ularni yashirgan holda uchrashdim, lekin oxir-oqibat ko'z yoshim keldi." },
        { speaker: 'A', kr: '헤어질 때는 어땠어요?', uz: "Xayrlashganda qanday edi?" },
        { speaker: 'B', kr: '또 헤어질 수밖에 없었는데, 그 슬픔은 억제할 수밖에 없을 따름이었어요.', uz: "Yana ajralishdan boshqa iloj yo'q edi, o'sha g'amginlikni jilovlashdan boshqa iloj yo'q xolos edi." },
      ],
      notes: [
        "-(으)ㄹ 수밖에 없다 emotsional: 울 수밖에 없었어요(yig'lashdan boshqa iloj yo'q edi).",
        "-(으)ㄴ 적이 있다: o'tgan tajriba: 만난 적이 있어요(uchrashgan payt bo'lgan).",
        "인연 — taqdir/aloqa: koreyaliklar uchun muhim tushuncha, kishilar o'rtasidagi 'belgilangan uchrashuv'.",
        "추억 (nostalgi/esdalik) vs 기억 (xotira): 추억 — iliq his bilan eslash.",
        "보고 싶다 — ko'rgim kelyapti: hissiy ifoda, o'zbek tilida ko'pincha sog'inishni ifodalaydi.",
      ],
      games: {
        matchPairs: [
          { kr: '그립다', uz: 'sog\'inmoq' },
          { kr: '외롭다', uz: 'yolg\'iz' },
          { kr: '작별하다', uz: 'xayrlashmoq' },
          { kr: '인연', uz: 'taqdir, aloqa' },
          { kr: '추억', uz: 'nostalgiya, esdalik' },
          { kr: '떠나다', uz: 'ketmoq' },
        ],
        fillBlank: [
          { sentence: '그 사람과 헤어질 수밖에 ___상황이었어요.', answer: '없는', options: ['없는', '있는', '되는', '하는'], uz: "O'sha odam bilan ajralishdan boshqa iloj yo'q bo'lgan vaziyat edi." },
          { sentence: '처음 해외에서 혼자 살아본 ___있는데 외로웠어요.', answer: '적이', options: ['적이', '수가', '만큼이', '채로가'], uz: "Birinchi marta xorijda yolg'iz yashab ko'rgan payt bo'lgan, yolg'iz edi." },
          { sentence: '감정을 숨긴 ___ 웃으며 작별 인사를 했어요.', answer: '채로', options: ['채로', '결과로', '뿐으로', '대신에'], uz: "His-tuyg'ularni yashirgan holda kulib xayrlashdim." },
          { sentence: '그 사람과의 추억은 영원히 기억 속에 남을 수밖에 ___.', answer: '없어요', options: ['없어요', '있어요', '해요', '돼요'], uz: "O'sha odam bilan esdaliklar abadiy xotirada qolishdan boshqa iloj yo'q." },
          { sentence: '한번 끊어진 인연은 다시 잇기 어려운 ___.', answer: '편이에요', options: ['편이에요', '것이에요', '만해요', '따름이에요'], uz: "Bir marta uzilgan aloqa yana ulash qiyin tomonda." },
        ],
        scramble: [
          { kr: '만남', uz: 'uchrashuv' },
          { kr: '감정', uz: 'his' },
          { kr: '추억', uz: 'esdalik' },
          { kr: '인연', uz: 'taqdir' },
          { kr: '관계', uz: 'munosabat' },
        ],
      },
    },
    quiz: [
      { question: "'헤어질 수밖에 없었어요' nimani anglatadi?", options: ['Ajralishni xohladim', 'Ajralishdan boshqa iloj yo\'q edi', 'Ajralishdan qo\'rqdim', 'Ajralmadim'], correct_index: 1 },
      { question: "'만난 적이 있어요' nimani anglatadi?", options: ["Uchrashmoqchiman", "Uchrashgan payt bo'lgan", "Uchrashmadim", "Uchrashaolaman"], correct_index: 1 },
      { question: "'눈물을 참은 채로' nimani anglatadi?", options: ['Ko\'z yoshi to\'kilgandan keyin', 'Ko\'z yoshini tutgan holda', 'Ko\'z yoshi bo\'lmagan', 'Ko\'z yoshini tozalab'], correct_index: 1 },
      { question: "'그립다' nimani anglatadi?", options: ['xursand', 'xafa', 'sog\'inmoq', 'unutmoq'], correct_index: 2 },
      { question: "'인연' nimani anglatadi?", options: ['uchrashuv', "taqdir, belgilangan aloqa", 'do\'stlik', 'sevgi'], correct_index: 1 },
      { question: "'추억' nimani anglatadi?", options: ['xotira (oddiy)', 'nostalgiya, iliq esdalik', 'unutish', 'o\'tmish'], correct_index: 1 },
      { question: "'외롭다' nimani anglatadi?", options: ['quvnoq', 'g\'amgin', "yolg'iz, tanho", 'xavotirli'], correct_index: 2 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 18 (L5-8): Heungbu va Nolbu hikoyasi
  // 흥부와 놀부 이야기
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 5, order_in_level: 8,
    title_kr: '흥부와 놀부 이야기',
    title_uz: '"Heungbu va Nolbu" hikoyasi (axloqiy dars)',
    is_free: false,
    content: {
      topic: {
        kr: '흥부와 놀부는 한국의 대표적인 전래동화입니다. 욕심을 부린 바람에 놀부는 모든 것을 잃었습니다. 착한 일을 한 김에 흥부는 복을 받았어요. 이야기는 착한 대로 복을 받고 나쁜 대로 벌을 받는다는 교훈을 줍니다.',
        uz: "Heungbu va Nolbu Koreya an'anaviy ertaklarining namoyandasi. Ochko'zlik qilgan sababli Nolbu hamma narsasini yo'qotdi. Yaxshi ish qilgan chog'ida Heungbu baxt topdi. Hikoya yaxshi bo'lgancha baxt oladi, yomon bo'lgancha jazo oladi degan saboq beradi."
      },
      grammar: {
        explanation: `-(으)ㄴ/는 바람에 — ...sababli (kutilmagan SALBIY natija)

Tuzilish: [fe'l + (으)ㄴ/는 바람에]
• 비가 오는 바람에 행사가 취소됐어요. (Yomg'ir yog'gani sababli tadbir bekor bo'ldi.)
• 욕심을 부린 바람에 모든 것을 잃었어요. (Ochko'zlik qilgani sababli hamma narsasini yo'qotdi.)
• 늦잠을 잔 바람에 지각했어요. (Uxlab qolgani sababli kech qoldim.)

MUHIM: 바람에 — FAQAT SALBIY natijada, 덕분에 — ijobiy.

-(으)ㄴ 김에 — ...qilgan chog'ida, o'sha fursat bo'lgani uchun:
• 시장에 간 김에 야채도 샀어요. (Bozorga borganimda sabzavot ham sotib oldim.)

-(으)ㄴ/는 대로 — ...bo'lgancha, ...ga ko'ra:
• 들은 대로 했어요. (Eshitganimcha qildim.)
• 착한 대로 복을 받아요. (Yaxshi bo'lgancha baxt oladi.)`,
        examples: [
          { kr: '욕심을 부린 바람에 모든 것을 잃었어요.', uz: "Ochko'zlik qilgani sababli hamma narsasini yo'qotdi." },
          { kr: '병원에 간 김에 건강 검진도 받았어요.', uz: "Kasalxonaga borganimda tekshiruvdan ham o'tdim." },
          { kr: '선생님이 가르쳐 준 대로 하면 돼요.', uz: "O'qituvchi ko'rsatganicha qilsangiz bo'ladi." },
          { kr: '갑자기 비가 내리는 바람에 우산이 없어서 다 젖었어요.', uz: "To'satdan yomg'ir yoqqani sababli soyabon bo'lmagani uchun hamma ho'l bo'ldim." },
          { kr: '도서관에 온 김에 오래된 책도 찾아봤어요.', uz: "Kutubxonaga kelganimda eski kitobni ham qidirip ko'rdim." },
        ]
      },
      vocabulary: [
        { kr: '이야기', romanization: 'iyagi', uz: 'hikoya' },
        { kr: '형', romanization: 'hyeong', uz: 'aka (erkak aytadi)' },
        { kr: '동생', romanization: 'dongsaeng', uz: 'uka/singil' },
        { kr: '욕심', romanization: 'yoksim', uz: "ochko'zlik, tamahkorlik" },
        { kr: '친절', romanization: 'chinjeol', uz: 'mehribonlik' },
        { kr: '벌', romanization: 'beol', uz: 'jazo' },
        { kr: '보상', romanization: 'bosang', uz: 'mukofot' },
        { kr: '행동', romanization: 'haengdong', uz: 'harakat, xulq' },
        { kr: '결과', romanization: 'gyeolgwa', uz: 'natija' },
        { kr: '도와주다', romanization: 'dowajuda', uz: 'yordam bermoq' },
        { kr: '얻다', romanization: 'eotda', uz: 'olmoq, qozonmoq' },
        { kr: '잃다', romanization: 'irda', uz: "yo'qotmoq" },
        { kr: '변하다', romanization: 'byeonhada', uz: "o'zgarmoq" },
        { kr: '깨닫다', romanization: 'kkaedatda', uz: 'anglab yetmoq' },
        { kr: '전래동화', romanization: 'jeollaedonghwa', uz: "an'anaviy ertak" },
        { kr: '교훈', romanization: 'gyohun', uz: 'saboq, hikmat' },
        { kr: '착하다', romanization: 'chakada', uz: 'yaxshi, mehribon (xulq-atvor)' },
        { kr: '나쁘다', romanization: 'nappeuda', uz: 'yomon' },
        { kr: '복', romanization: 'bok', uz: 'baxt, omad' },
        { kr: '욕심쟁이', romanization: 'yoksimjaengi', uz: "ochko'z odam" },
      ],
      examples: [
        { kr: '흥부는 친절을 베푼 덕분에 박 속에서 금을 얻었어요.', uz: "Heungbu mehribonlik qilgani tufayli qo'qoq ichida oltin topdi." },
        { kr: '놀부는 욕심을 부린 바람에 모든 재산을 잃고 말았어요.', uz: "Nolbu ochko'zlik qilgani sababli hamma mol-mulkini yo'qotib qo'ydi." },
        { kr: '마을을 지나는 김에 굶주린 제비를 돌봐 준 것이 흥부의 행운의 시작이었어요.', uz: "Qishloqdan o'tgan chog'ida och yutqaychani parvarish qilgani Heungbuning omad boshlanishi edi." },
        { kr: '이야기가 가르치는 대로 착하게 살면 복을 받는 편이에요.', uz: "Hikoya o'rgatganicha yaxshi yashasangiz baxt oladigan tomonda." },
        { kr: '욕심을 부리는 바람에 이웃에게 피해를 준 놀부는 결국 벌을 받았어요.', uz: "Ochko'zlik qilgani sababli qo'shniga zarar bergan Nolbu oxir-oqibat jazo oldi." },
      ],
      dialog: [
        { speaker: 'A', kr: '흥부와 놀부 이야기 알아요?', uz: '"Heungbu va Nolbu" hikoyasini bilasizmi?' },
        { speaker: 'B', kr: '네, 어릴 때 들은 적이 있어요. 착한 형제가 복을 받는 이야기죠?', uz: "Ha, yoshligimda eshitgan payt bo'lgan. Yaxshi aka-uka baxt oladigan hikoya-ku?" },
        { speaker: 'A', kr: '맞아요. 놀부는 욕심을 부린 바람에 모든 것을 잃었어요.', uz: "To'g'ri. Nolbu ochko'zlik qilgani sababli hamma narsasini yo'qotdi." },
        { speaker: 'B', kr: '반면에 흥부는 착한 행동을 한 김에 큰 복을 받았죠.', uz: "Buning aksiga o'laroq, Heungbu yaxshi ish qilgan chog'ida katta baxt oldi-ku." },
        { speaker: 'A', kr: '이 이야기가 가르치는 대로 살면 좋겠어요.', uz: "Bu hikoya o'rgatganicha yashasangiz yaxshi bo'lardi." },
        { speaker: 'B', kr: '그렇죠. 욕심은 결국 손해를 볼 수밖에 없다는 교훈이에요.', uz: "Shunday. Ochko'zlik oxir-oqibat zarar ko'rishdan boshqa iloj yo'q degan saboq." },
      ],
      notes: [
        "-(으)ㄴ/는 바람에: SALBIY natija: 비 오는 바람에(yomg'ir yoqqani sababli), 늦잠 잔 바람에(uxlab qolgani sababli).",
        "-(으)ㄴ 김에: o'sha fursat bo'lganda: 시장에 간 김에(bozorga borganimda).",
        "-(으)ㄴ/는 대로: ...bo'lgancha, ...ga ko'ra: 가르쳐 준 대로(o'rgatganicha).",
        "흥부와 놀부 — Koreya xalq ertagi: yaxshilik va yomonlik, ochko'zlik va saxiylik.",
        "전래동화 (an'anaviy ertak): 신데렐라 (Zolushka) kabi universal saboqlar.",
      ],
      games: {
        matchPairs: [
          { kr: '욕심', uz: "ochko'zlik" },
          { kr: '친절', uz: 'mehribonlik' },
          { kr: '교훈', uz: 'saboq' },
          { kr: '착하다', uz: 'yaxshi (xulq)' },
          { kr: '복', uz: 'baxt' },
          { kr: '깨닫다', uz: 'anglab yetmoq' },
        ],
        fillBlank: [
          { sentence: '욕심을 부린 ___ 모든 것을 잃었어요.', answer: '바람에', options: ['바람에', '덕분에', '때문에', '김에'], uz: "Ochko'zlik qilgani sababli hamma narsasini yo'qotdi." },
          { sentence: '병원에 간 ___ 건강 검진도 받았어요.', answer: '김에', options: ['김에', '바람에', '채로', '결과에'], uz: "Kasalxonaga borganimda tekshiruvdan ham o'tdim." },
          { sentence: '선생님이 가르쳐 준 ___ 하면 돼요.', answer: '대로', options: ['대로', '채로', '뿐으로', '결과로'], uz: "O'qituvchi ko'rsatganicha qilsangiz bo'ladi." },
          { sentence: '갑자기 비가 내리는 ___ 다 젖었어요.', answer: '바람에', options: ['바람에', '덕분에', '김에', '채로'], uz: "To'satdan yomg'ir yoqqani sababli hamma ho'l bo'ldim." },
          { sentence: '착하게 살면 복을 받는 ___ 이야기예요.', answer: '대로라는', options: ['대로라는', '채로라는', '결과라는', '바람에라는'], uz: "Yaxshi yashasangiz baxt oladigan hikoya." },
        ],
        scramble: [
          { kr: '욕심', uz: "ochko'zlik" },
          { kr: '교훈', uz: 'saboq' },
          { kr: '행동', uz: 'harakat' },
          { kr: '결과', uz: 'natija' },
          { kr: '이야기', uz: 'hikoya' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄴ/는 바람에' qachon ishlatiladi?", options: ['Ijobiy natija uchun', 'Salbiy natija uchun', 'Neytral natija uchun', 'Savol uchun'], correct_index: 1 },
      { question: "'-(으)ㄴ 김에' nimani anglatadi?", options: ['sababli', '...qilgan chog\'ida, o\'sha fursatda', '...holda', '...natijasida'], correct_index: 1 },
      { question: "'-(으)ㄴ/는 대로' nimani anglatadi?", options: ['...ga qaramasdan', '...bo\'lgancha, ...ga ko\'ra', '...holda', '...tufayli'], correct_index: 1 },
      { question: "'교훈' nimani anglatadi?", options: ['ertak', 'saboq, hikmat', 'jazo', 'mukofot'], correct_index: 1 },
      { question: "'욕심' nimani anglatadi?", options: ['mehribonlik', "ochko'zlik, tamahkorlik", 'jazo', 'saxiylik'], correct_index: 1 },
      { question: "'착하다' nimani anglatadi?", options: ['yomon', 'yaxshi (xulq-atvor)', 'tamahkor', 'g\'amgin'], correct_index: 1 },
      { question: "'전래동화' nimani anglatadi?", options: ['zamonaviy roman', "an'anaviy ertak", 'badiiy film', 'she\'r'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 19 (L5-9): Zamonaviy jamiyat muammolari
  // 현대 사회 문제와 해결 방안
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 5, order_in_level: 9,
    title_kr: '현대 사회 문제와 해결 방안',
    title_uz: 'Zamonaviy jamiyat muammolari va yechimlar',
    is_free: false,
    content: {
      topic: {
        kr: '현대 사회에는 다양한 문제가 있습니다. 경제가 발전하는 반면에 불평등도 심화되고 있어요. 기술이 발전한다고 해서 모든 문제가 해결되는 것은 아닙니다. 사회 문제가 해결될 가능성이 있는 만큼 적극적인 참여가 필요해요.',
        uz: "Zamonaviy jamiyatda xilma-xil muammolar mavjud. Iqtisodiyot rivojlanib borayotgan holda tengsizlik ham chuqurlashmoqda. Texnologiya rivojlanadi deb barcha muammolar hal bo'lavermaydi. Ijtimoiy muammolar hal bo'lishi mumkinligi bo'lgani uchun faol ishtirok zarur."
      },
      grammar: {
        explanation: `-(으)ㄴ/는 반면에 (ADVANCED) — bir tomondan..., boshqa tomondan... (murakkab taqqoslash)

Tuzilish: [gap + 는 반면에 / (으)ㄴ 반면에]
• 경제가 발전하는 반면에 빈부 격차는 커지고 있어요.
(Iqtisodiyot rivojlanadigan holda boy-kambag'al farqi kattalashmoqda.)
• 기술은 편리한 반면에 의존도가 높아졌어요.

-(으)ㄹ 가능성이 있다 — ...imkoniyati bor, ...ehtimoli bor:
• 해결될 가능성이 있어요. (Hal bo'lishi imkoniyati bor.)
• 더 나빠질 가능성이 있습니다. (Yomonlashishi ehtimoli bor.)

-(으)ㄴ/는다고 해서 — ...deb, ...degan sababli (lekin shu yetarli emas):
• 기술이 발전한다고 해서 행복해지는 건 아니에요.
(Texnologiya rivojlanadi deb baxtli bo'lavermaydi.)`,
        examples: [
          { kr: '소득이 증가하는 반면에 삶의 만족도는 낮아지는 추세예요.', uz: "Daromad oshib borayotgan holda hayotdan qoniqish darajasi pasayish tendensiyasida." },
          { kr: '이 정책이 효과가 있을 가능성이 있어요.', uz: "Bu siyosat samarali bo'lishi imkoniyati bor." },
          { kr: '경제가 성장한다고 해서 모든 사람이 혜택을 받는 건 아니에요.', uz: "Iqtisodiyot o'sadi deb hamma odam foyda ko'ravermaydi." },
          { kr: '도시 인구가 증가하는 반면에 농촌은 점점 줄어드는 편이에요.', uz: "Shahar aholisi oshib borayotgan holda qishloq tomoni tobora kamayib boradigan tomonda." },
          { kr: '이 문제가 해결될 가능성이 있는 만큼 포기하지 말아야 해요.', uz: "Bu muammo hal bo'lishi imkoniyati bo'lgani uchun taslim bo'lmaslik kerak." },
        ]
      },
      vocabulary: [
        { kr: '사회 문제', romanization: 'sahoe munje', uz: 'ijtimoiy muammo' },
        { kr: '실업', romanization: 'sireop', uz: 'ishsizlik' },
        { kr: '스트레스', romanization: 'seutteuleseu', uz: 'stress' },
        { kr: '경쟁', romanization: 'gyeongjaeng', uz: 'raqobat' },
        { kr: '해결', romanization: 'haegyeol', uz: 'yechim' },
        { kr: '정책', romanization: 'jeongchaek', uz: 'siyosat' },
        { kr: '지원', romanization: 'jiwon', uz: "qo'llab-quvvatlash" },
        { kr: '증가', romanization: 'jeungga', uz: 'oshish' },
        { kr: '감소', romanization: 'gamso', uz: 'kamayish' },
        { kr: '원인', romanization: 'wonin', uz: 'sabab' },
        { kr: '결과', romanization: 'gyeolgwa', uz: 'natija' },
        { kr: '영향', romanization: 'yeonghyang', uz: "ta'sir" },
        { kr: '개선하다', romanization: 'gaeseonhada', uz: 'yaxshilamoq' },
        { kr: '필요하다', romanization: 'piryohada', uz: 'zarur' },
        { kr: '불평등', romanization: 'bulpyeongdeung', uz: 'tengsizlik' },
        { kr: '빈부 격차', romanization: 'binbu gyeokcha', uz: 'boy-kambag\'al farqi' },
        { kr: '참여하다', romanization: 'chamyeohada', uz: 'qatnashmoq' },
        { kr: '제도', romanization: 'jedo', uz: 'tizim, tartib' },
        { kr: '의식', romanization: 'uisik', uz: 'ong, munosabat' },
        { kr: '가능성', romanization: 'ganeungseong', uz: 'imkoniyat, ehtimol' },
      ],
      examples: [
        { kr: '기술이 발전하는 반면에 일자리를 잃는 사람도 늘어나는 것으로 나타났어요.', uz: "Texnologiya rivojlanib borayotgan holda ish o'rni yo'qotayotganlar ham ko'payayotganligi ma'lum bo'ldi." },
        { kr: '경제가 성장한다고 해서 빈부 격차가 줄어드는 건 아니에요.', uz: "Iqtisodiyot o'sadi deb boy-kambag'al farqi kamayavermaydi." },
        { kr: '이 정책이 실업률을 줄일 가능성이 있는 만큼 적극적으로 검토해야 해요.', uz: "Bu siyosat ishsizlik darajasini kamaytirish imkoniyati bo'lgani uchun faol ko'rib chiqish kerak." },
        { kr: '교육 수준이 높아지는 반면에 취업 경쟁도 치열해지는 추세예요.', uz: "Ta'lim darajasi oshib borayotgan holda ish joyi raqobati ham kuchayish tendensiyasida." },
        { kr: '개인의 노력만으로 사회 문제를 해결할 수 있다고 해서 다 해결되는 건 아니에요.', uz: "Shaxsiy harakat bilan ijtimoiy muammoni hal qilish mumkin deb hammasi hal bo'lavermaydi." },
      ],
      dialog: [
        { speaker: 'A', kr: '요즘 사회 문제 중에서 가장 심각한 게 뭐라고 생각해요?', uz: "Hozirda ijtimoiy muammolar orasida eng jiddiyi qaysi deb o'ylaysiz?" },
        { speaker: 'B', kr: '저는 빈부 격차라고 생각해요. 경제가 성장하는 반면에 불평등은 심화되는 것 같아요.', uz: "Men boy-kambag'al farqi deb o'ylayman. Iqtisodiyot o'sib borayotgan holda tengsizlik chuqurlashmoqdek ko'rinadi." },
        { speaker: 'A', kr: '맞아요. 기술이 발전한다고 해서 모든 게 해결되진 않죠.', uz: "To'g'ri. Texnologiya rivojlanadi deb hammasi hal bo'lavermaydi-ku." },
        { speaker: 'B', kr: '그래도 해결될 가능성이 있는 만큼 포기하면 안 된다고 생각해요.', uz: "Shunga qaramay, hal bo'lishi imkoniyati bo'lgani uchun taslim bo'lmaslik kerak deb o'ylayman." },
        { speaker: 'A', kr: '어떤 해결책이 있을까요?', uz: "Qanday yechim bo'lishi mumkin?" },
        { speaker: 'B', kr: '정책도 중요하지만 시민들의 의식이 변하는 게 더 근본적인 해결 방안인 것 같아요.', uz: "Siyosat ham muhim, lekin fuqarolarning ongi o'zgarishi yanada tubdan yechim bo'ladiga ko'rinadi." },
      ],
      notes: [
        "반면에 advanced: 기술은 편리한 반면에 의존도가 높아졌어요 — murakkab taqqoslash.",
        "-(으)ㄹ 가능성이 있다: imkoniyat: 해결될 가능성이 있어요(hal bo'lishi imkoniyati bor).",
        "-(으)ㄴ/는다고 해서: ...deb (lekin yetarli emas): 공부한다고 해서 다 성공하진 않아요.",
        "빈부 격차 (boy-kambag'al farqi) — global muammo: Gini koeffitsienti bilan o'lchanadi.",
        "취업 경쟁 (ish joyi raqobati) — zamonaviy jamiyatda stress manbai.",
      ],
      games: {
        matchPairs: [
          { kr: '실업', uz: 'ishsizlik' },
          { kr: '불평등', uz: 'tengsizlik' },
          { kr: '가능성', uz: 'imkoniyat' },
          { kr: '의식', uz: 'ong, munosabat' },
          { kr: '제도', uz: 'tizim' },
          { kr: '개선하다', uz: 'yaxshilamoq' },
        ],
        fillBlank: [
          { sentence: '소득이 증가하는 ___ 만족도는 낮아지는 추세예요.', answer: '반면에', options: ['반면에', '대신에', '때문에', '덕분에'], uz: "Daromad oshib borayotgan holda qoniqish darajasi pasayish tendensiyasida." },
          { sentence: '이 정책이 효과가 있을 ___ 이 있어요.', answer: '가능성', options: ['가능성', '필요성', '중요성', '위험성'], uz: "Bu siyosat samarali bo'lishi imkoniyati bor." },
          { sentence: '기술이 발전한___해서 모든 문제가 해결되는 건 아니에요.', answer: '다고', options: ['다고', '기', '아서', '면서'], uz: "Texnologiya rivojlanadi deb barcha muammolar hal bo'lavermaydi." },
          { sentence: '해결될 가능성이 있는 ___ 포기하지 말아야 해요.', answer: '만큼', options: ['만큼', '대신에', '반면에', '때문에'], uz: "Hal bo'lishi imkoniyati bo'lgani uchun taslim bo'lmaslik kerak." },
          { sentence: '도시 인구가 증가하는 반면에 농촌은 점점 줄어드는 ___.', answer: '편이에요', options: ['편이에요', '것이에요', '만해요', '따름이에요'], uz: "Shahar aholisi oshib borayotgan holda qishloq tomoni tobora kamayib boradigan tomonda." },
        ],
        scramble: [
          { kr: '실업', uz: 'ishsizlik' },
          { kr: '경쟁', uz: 'raqobat' },
          { kr: '정책', uz: 'siyosat' },
          { kr: '원인', uz: 'sabab' },
          { kr: '해결', uz: 'yechim' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄴ/는다고 해서' nimani anglatadi?", options: ['...sababli, natija ijobiy', '...deb, lekin shu yetarli emas', '...tufayli', '...holda'], correct_index: 1 },
      { question: "'-(으)ㄹ 가능성이 있다' nimani anglatadi?", options: ['...mumkin emas', '...imkoniyati/ehtimoli bor', '...kerak', '...muqarrar'], correct_index: 1 },
      { question: "'불평등' nimani anglatadi?", options: ['tenglik', 'tengsizlik', 'farq', 'muammo'], correct_index: 1 },
      { question: "'빈부 격차' nimani anglatadi?", options: ['shahar-qishloq farqi', 'boy-kambag\'al farqi', 'ta\'lim darajasi farqi', 'yosh farqi'], correct_index: 1 },
      { question: "'의식' nimani anglatadi?", options: ['ish', 'ong, munosabat', 'tizim', 'siyosat'], correct_index: 1 },
      { question: "'개선하다' nimani anglatadi?", options: ['yomonlashtirmoq', 'o\'zgarmoq', 'yaxshilamoq', 'o\'rganmoq'], correct_index: 2 },
      { question: "'지원' nimani anglatadi?", options: ['raqobat', "qo'llab-quvvatlash", 'jazo', 'mukofot'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 20 (L5-10): Texnologiya rivoji va inson kelajagi
  // 기술 발전과 인간의 미래
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 5, order_in_level: 10,
    title_kr: '기술 발전과 인간의 미래',
    title_uz: 'Texnologiya rivoji va inson kelajagi',
    is_free: false,
    content: {
      topic: {
        kr: '인공지능과 자동화 기술이 빠르게 발전하고 있습니다. 조사에 따르면 많은 직업이 대체될 가능성이 있는 것으로 나타났습니다. 기술이 발전하는 반면에 새로운 문제도 생겨나는 것으로 보입니다. 기술의 혜택을 누릴 수 있는 반면에 의존도도 높아질 수 있습니다.',
        uz: "Sun'iy intellekt va avtomatlashtirish texnologiyalari tezda rivojlanmoqda. Tekshiruvlarga ko'ra ko'plab kasblar almashtirilishi mumkinligi ma'lum bo'ldi. Texnologiya rivojlanib borayotgan holda yangi muammolar ham paydo bo'layotgandek ko'rinmoqda. Texnologiya ne'matlaridan foydalana oladigan holda unga bog'liqlik ham ortishi mumkin."
      },
      grammar: {
        explanation: `-(으)ㄴ/는 반면에 (논술 확장) — yozma essay va akademik uslubda murakkab ishlatish

Misol (essay paragraph):
인공지능은 효율성을 높이는 반면에 일자리를 줄일 수 있습니다.
그러나 새로운 직업이 생겨날 가능성도 있습니다.

-(으)ㄹ 뿐만 아니라 (ADVANCED WRITING) — yozma nutqda kuchliroq ishlatish:
• 기술은 생산성을 높일 뿐만 아니라 삶의 질도 향상시켰습니다.

-(으)ㄴ/는 것으로 나타났다 (DATA + ESSAY):
조사 결과, 응답자의 60%가 AI를 긍정적으로 평가하는 것으로 나타났습니다.

-(으)ㄹ 수 있다 vs -(으)ㄹ 수도 있다:
• -(으)ㄹ 수 있다 — mumkin (aniq imkoniyat)
• -(으)ㄹ 수도 있다 — ...ham mumkin (qo'shimcha ehtimol)`,
        examples: [
          { kr: '인공지능이 많은 직업을 대체할 수 있는 반면에 새로운 직업도 창출할 수 있습니다.', uz: "Sun'iy intellekt ko'plab kasblarni almashtira oladigan holda yangi kasblar ham yarata oladi." },
          { kr: '기술이 발전할 뿐만 아니라 사람들의 생활 방식도 크게 변하고 있습니다.', uz: "Texnologiya rivojlanishi bilan birga odamlarning hayot tarzi ham katta o'zgarmoqda." },
          { kr: '설문 조사 결과, 응답자의 70%가 AI 발전을 긍정적으로 보는 것으로 나타났습니다.', uz: "So'rovnoma natijasiga ko'ra, respondentlarning 70% AI rivojlanishini ijobiy ko'rishganligi ma'lum bo'ldi." },
          { kr: '기술 의존도가 높아질 수도 있어 비판적 사고 능력이 더욱 중요해질 것입니다.', uz: "Texnologiyaga bog'liqlik ortishi ham mumkin bo'lgani uchun tanqidiy fikrlash qobiliyati yanada muhimlashadi." },
          { kr: '자동화 기술이 효율성을 높이는 반면에 실업 문제가 심화될 가능성도 있습니다.', uz: "Avtomatlashtirish texnologiyasi samaradorlikni oshirib borayotgan holda ishsizlik muammosi chuqurlashishi ehtimoli ham bor." },
        ]
      },
      vocabulary: [
        { kr: '기술', romanization: 'gisul', uz: 'texnologiya' },
        { kr: '발전', romanization: 'baljeon', uz: 'rivojlanish' },
        { kr: '미래', romanization: 'mirae', uz: 'kelajak' },
        { kr: '영향', romanization: 'yeonghyang', uz: "ta'sir" },
        { kr: '자동화', romanization: 'jadongghwa', uz: 'avtomatlashtirish' },
        { kr: '효율성', romanization: 'hyoyulseong', uz: 'samaradorlik' },
        { kr: '문제점', romanization: 'munjejeom', uz: 'muammo' },
        { kr: '장점', romanization: 'jangjeom', uz: 'afzallik' },
        { kr: '단점', romanization: 'danjeom', uz: 'kamchilik' },
        { kr: '대체하다', romanization: 'daecheehada', uz: 'almashtirmoq' },
        { kr: '의존하다', romanization: 'uijonhada', uz: "bog'liq bo'lmoq, tayanmoq" },
        { kr: '발전하다', romanization: 'baljeonhada', uz: 'rivojlanmoq' },
        { kr: '변화하다', romanization: 'byeonhwahada', uz: "o'zgarmoq" },
        { kr: '증가하다', romanization: 'jeunggahada', uz: 'oshmoq' },
        { kr: '인공지능', romanization: 'ingongjineung', uz: 'sun\'iy intellekt (AI)' },
        { kr: '빅데이터', romanization: 'bikdeiteo', uz: 'katta ma\'lumotlar (Big Data)' },
        { kr: '혁신', romanization: 'hyeoksin', uz: 'innovatsiya' },
        { kr: '창의성', romanization: 'changeuiseong', uz: 'ijodkorlik' },
        { kr: '비판적', romanization: 'bipanjeok', uz: 'tanqidiy' },
        { kr: '윤리', romanization: 'yulli', uz: 'etika, ma\'naviyat' },
      ],
      examples: [
        { kr: '인공지능 기술은 의료 분야에서 혁신을 가져올 뿐만 아니라 진단 정확도도 높이고 있습니다.', uz: "Sun'iy intellekt texnologiyasi tibbiyot sohasida innovatsiya olib kelishi bilan birga, tashxis aniqligi ham oshirmoqda." },
        { kr: '자동화 기술이 일자리를 줄이는 반면에 더 창의적인 직업이 늘어날 수도 있습니다.', uz: "Avtomatlashtirish texnologiyasi ish o'rinlarini kamaytirgan holda yanada ijodiy kasblar ko'payishi ham mumkin." },
        { kr: '설문 결과, AI를 두려워하는 사람이 많다는 것으로 나타났습니다.', uz: "So'rovnoma natijasiga ko'ra, AI dan qo'rquvchi odamlar ko'p ekanligi ma'lum bo'ldi." },
        { kr: '기술이 발전할수록 AI 윤리 문제가 더 중요해질 것으로 보입니다.', uz: "Texnologiya rivojlangan sari AI etikasi masalasi yanada muhimlashishi ko'rinmoqda." },
        { kr: '디지털 격차 문제가 해결되지 않을 가능성도 있는 반면에 적절한 정책으로 줄일 수도 있습니다.', uz: "Raqamli tafovut muammosi hal bo'lmasligi ham mumkin bo'lgan holda to'g'ri siyosat bilan kamaytirilishi ham mumkin." },
      ],
      dialog: [
        { speaker: 'A', kr: 'AI 발전에 대해 어떻게 생각해요?', uz: "AI rivojlanishiga qanday qaraysiz?" },
        { speaker: 'B', kr: '긍정적인 면도 있는 반면에 우려되는 점도 있어요. 일자리 문제가 가장 걱정돼요.', uz: "Ijobiy tomonlari bo'lgan holda xavotirli jihatlar ham bor. Ish joyi muammosi eng ko'p tashvish beradi." },
        { speaker: 'A', kr: '맞아요. 통계에 따르면 많은 직업이 대체될 가능성이 있는 것으로 나타났어요.', uz: "To'g'ri. Statistikaga ko'ra, ko'plab kasblar almashtirilishi imkoniyati borligini ko'rsatdi." },
        { speaker: 'B', kr: '그렇지만 기술이 발전할 뿐만 아니라 새로운 직업도 생겨날 수도 있잖아요.', uz: "Lekin texnologiya rivojlanishi bilan birga yangi kasblar ham paydo bo'lishi ham mumkin-ku." },
        { speaker: 'A', kr: '그래서 창의성과 비판적 사고가 더 중요해질 것 같아요.', uz: "Shuning uchun ijodkorlik va tanqidiy fikrlash yanada muhimlashadi shekilli." },
        { speaker: 'B', kr: '맞아요. 그리고 AI 윤리 문제도 함께 논의해야 할 것으로 보입니다.', uz: "To'g'ri. Va AI etikasi masalasini ham birga muhokama qilish kerak bo'ladi ko'rinmoqda." },
      ],
      notes: [
        "반면에 (essay uslubi): har bir fikrni qarama-qarshi bilan kuchaytirish uchun.",
        "뿐만 아니라 (advanced writing): A ham, B ham — kuchaytiruvchi birlashtirish.",
        "것으로 나타났다 — ma'lumot asosida xulosa: 조사 결과(tadqiqot natijasiga ko'ra).",
        "-(으)ㄹ 수도 있다: ...ham mumkin — qo'shimcha ehtimol, -(으)ㄹ 수 있다dan yumshoqroq.",
        "AI etikasi — 개인 정보 보호(shaxsiy ma'lumotlar himoyasi), 알고리즘 편향(algoritm noto'g'ri yo'nalishlari).",
      ],
      games: {
        matchPairs: [
          { kr: '자동화', uz: 'avtomatlashtirish' },
          { kr: '효율성', uz: 'samaradorlik' },
          { kr: '대체하다', uz: 'almashtirmoq' },
          { kr: '창의성', uz: 'ijodkorlik' },
          { kr: '혁신', uz: 'innovatsiya' },
          { kr: '윤리', uz: 'etika' },
        ],
        fillBlank: [
          { sentence: '인공지능이 직업을 대체할 수 있는 ___ 새로운 직업도 창출할 수 있어요.', answer: '반면에', options: ['반면에', '대신에', '때문에', '덕분에'], uz: "Sun'iy intellekt kasblarni almashtira oladigan holda yangi kasblar ham yarata oladi." },
          { sentence: '기술이 발전할 뿐만 아니라 생활 방식도 크게 ___.', answer: '변하고 있습니다', options: ['변하고 있습니다', '좋아졌습니다', '나빠졌습니다', '없어졌습니다'], uz: "Texnologiya rivojlanishi bilan birga hayot tarzi ham katta o'zgarmoqda." },
          { sentence: '응답자의 70%가 AI 발전을 긍정적으로 보는 것으로 ___.', answer: '나타났습니다', options: ['나타났습니다', '보입니다', '같아요', '해요'], uz: "Respondentlarning 70% AI rivojlanishini ijobiy ko'rishganligi ma'lum bo'ldi." },
          { sentence: '기술 의존도가 높아질 수___있어 비판적 사고가 중요해질 거예요.', answer: '도', options: ['도', '만', '는', '를'], uz: "Texnologiyaga bog'liqlik ortishi ham mumkin bo'lgani uchun tanqidiy fikrlash muhimlashadi." },
          { sentence: '기술이 발전할수록 AI 윤리 문제가 더 중요해질 것으로 ___.', answer: '보입니다', options: ['보입니다', '있어요', '해요', '같아요'], uz: "Texnologiya rivojlangan sari AI etikasi masalasi yanada muhimlashishi ko'rinmoqda." },
        ],
        scramble: [
          { kr: '기술', uz: 'texnologiya' },
          { kr: '미래', uz: 'kelajak' },
          { kr: '혁신', uz: 'innovatsiya' },
          { kr: '윤리', uz: 'etika' },
          { kr: '창의성', uz: 'ijodkorlik' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄹ 수도 있다' va '-(으)ㄹ 수 있다' farqi?", options: ['Farq yo\'q', '수도 있다 — qo\'shimcha ehtimol (yumshoqroq)', '수도 있다 — aniq imkoniyat', '수 있다 — ehtimol'], correct_index: 1 },
      { question: "Essay uslubida 반면에 qanday rolni bajaradi?", options: ['Sabab bildiradi', 'Ikki tomonni qarama-qarshi taqqoslaydi', 'Xulosa chiqaradi', 'Misol keltiradi'], correct_index: 1 },
      { question: "'자동화' nimani anglatadi?", options: ['sun\'iy intellekt', 'avtomatlashtirish', 'raqamlashtirish', 'robotlashtirish'], correct_index: 1 },
      { question: "'창의성' nimani anglatadi?", options: ['samaradorlik', 'ijodkorlik', 'tanqidiy fikrlash', 'innovatsiya'], correct_index: 1 },
      { question: "'대체하다' nimani anglatadi?", options: ['rivojlantirmoq', 'almashtirmoq', 'o\'rganmoq', 'yaratmoq'], correct_index: 1 },
      { question: "'혁신' nimani anglatadi?", options: ['tadqiqot', 'kashfiyot', 'innovatsiya', 'texnologiya'], correct_index: 2 },
      { question: "'윤리' nimani anglatadi?", options: ['huquq', 'axloq', "etika, ma'naviyat", 'qonun'], correct_index: 2 },
    ]
  },

];

// ════════════════════════════════════════════
// DB ga saqlash — audio_urls bilan
// ════════════════════════════════════════════
async function seed() {
  console.log('TOPIK 5-daraja seed boshlandi...\n');
  console.log('Audio URL pattern: {CDN_URL}/{lessonId}-{key}.mp3\n');

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
      console.log(`  ⚠️  ${lessonData.title_kr} — allaqachon bor`);
      continue;
    }

    // 2. Audio URL'larni generatsiya qilish va saqlash
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
    console.log(`       Audio keys: topic + 5 grammar + 20 vocab + 5 example + 6 dialog = 37 ta`);
  }

  console.log('\n✅ TOPIK 5-daraja seed muvaffaqiyatli yakunlandi!');
  console.log(`   Jami: ${LESSONS.length} ta dars`);
  console.log('\n📢 Keyingi qadam: Audio generatsiya');
  console.log('   cd backend && pip install edge-tts --break-system-packages');
  console.log('   node src/scripts/generate-audio.js --level 5');
  await db.end();
}

seed().catch(err => {
  console.error('❌ Xatolik:', err.message);
  process.exit(1);
});
