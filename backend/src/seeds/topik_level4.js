// backend/src/seeds/topik_level4.js
// TOPIK 4-daraja: 10 ta to'liq dars
// Usage: node src/seeds/topik_level4.js

require('dotenv').config({ path: '../../.env' });
const db = require('../db');

const LESSONS = [

  // ════════════════════════════════════════════
  // DARS 1: Qobiliyat va kasb tanlash
  // 적성과 진로
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 4, order_in_level: 1,
    title_kr: '적성과 진로',
    title_uz: 'Qobiliyat va kasb tanlash',
    is_free: true,
    content: {
      topic: {
        kr: '자신의 적성에 맞는 진로를 선택하는 것이 중요합니다. 흥미와 능력을 고려하여 목표를 정해야 합니다. 노력 없이는 성공하기 어려운 편입니다. 돈을 버는 대신에 경험을 얻는 것이 더 중요할 때도 있습니다.',
        uz: "O'z qobiliyatiga mos kasb yo'lini tanlash muhim. Qiziqish va imkoniyatlarni hisobga olib maqsad belgilash kerak. Harakat qilmasdan muvaffaqiyatga erishish qiyin bo'lish tomonida. Pul topish o'rniga tajriba orttirish muhimroq bo'lgan paytlar ham bor."
      },
      grammar: {
        explanation: `A/V-(으)ㄴ/는 편이다 — nisbatan, ...tomonida, odatda shunday

Ma'no: "to'liq emas, lekin shunday yo'nalishda"
• 저는 조용한 편이에요. (Men nisbatan sokinman.)
• 이 일은 어려운 편이에요. (Bu ish nisbatan qiyin.)
• 일찍 일어나는 편이에요. (Odatda erta turaman.)

V-는 대신에 — ...o'rniga, ...evaziga
• 돈을 버는 대신에 경험을 얻었어요. (Pul o'rniga tajriba oldim.)
• 공부하는 대신에 일을 해요. (O'qish o'rniga ishlaydi.)

N은/는 A-다는 것이다 — asosiy fikrni bildirish:
• 중요한 것은 포기하지 않는다는 것이다. (Muhim narsa — taslim bo'lmaslik.)`,
        examples: [
          { kr: '저는 수학보다 언어에 적성이 있는 편이에요.', uz: "Men matematikadan ko'ra tilga qobiliyatliroqman." },
          { kr: '이 직업은 급여가 낮은 대신에 자유 시간이 많아요.', uz: "Bu kasb ish haqi past o'rniga bo'sh vaqt ko'p." },
          { kr: '중요한 것은 자신의 흥미를 따른다는 것이다.', uz: "Muhim narsa — o'z qiziqishiga ergashish." },
          { kr: '노력하는 편이지만 결과가 항상 좋은 건 아니에요.', uz: "Nisbatan harakat qilamanku, lekin natija doim yaxshi emas." },
          { kr: '적성에 맞는 직업을 찾는 대신에 안정적인 직업을 선택했어요.', uz: "Qobiliyatga mos ish o'rniga barqaror ish tanladim." },
        ]
      },
      vocabulary: [
        { kr: '적성', romanization: 'jeokseong', uz: 'qobiliyat, layoqat' },
        { kr: '진로', romanization: 'jillo', uz: "kasb yo'li" },
        { kr: '선택하다', romanization: 'seonteokada', uz: 'tanlash' },
        { kr: '결정하다', romanization: 'gyeoljeongada', uz: 'qaror qilmoq' },
        { kr: '능력', romanization: 'neungnyeok', uz: 'qobiliyat, imkoniyat' },
        { kr: '흥미', romanization: 'heungmi', uz: 'qiziqish' },
        { kr: '경험', romanization: 'gyeongheom', uz: 'tajriba' },
        { kr: '목표', romanization: 'mokpyo', uz: 'maqsad' },
        { kr: '노력', romanization: 'noryeok', uz: 'harakat, sa\'y-harakat' },
        { kr: '성공', romanization: 'seonggong', uz: 'muvaffaqiyat' },
        { kr: '실패', romanization: 'silpae', uz: 'muvaffaqiyatsizlik' },
        { kr: '직업', romanization: 'jigeop', uz: 'kasb, ish' },
        { kr: '급여', romanization: 'geubyeo', uz: 'ish haqi' },
        { kr: '전문가', romanization: 'jeonmunga', uz: 'mutaxassis' },
        { kr: '개발하다', romanization: 'gaebolhada', uz: 'rivojlantirmoq' },
        { kr: '포기하다', romanization: 'pogihada', uz: 'taslim bo\'lmoq, voz kechmoq' },
        { kr: '도전하다', romanization: 'dojeonhada', uz: "qo'rqmasdan urinmoq" },
        { kr: '안정적이다', romanization: 'anjeongjeogida', uz: 'barqaror' },
        { kr: '보람있다', romanization: 'boramistta', uz: "mazmunli, qoniqarli" },
        { kr: '자아실현', romanization: 'jaasilhyeon', uz: 'o\'zini namoyon qilish' },
      ],
      examples: [
        { kr: '적성 검사를 받아 보면 자신에게 맞는 직업을 찾는 데 도움이 돼요.', uz: "Qobiliyat testini topshirib ko'rish o'zingizga mos ish topishda yordam beradi." },
        { kr: '돈보다 보람을 중요시하는 편이라 사회복지사가 됐어요.', uz: "Puldan ko'ra mazmunni muhim deb hisoblash tomonidaligim uchun ijtimoiy xodim bo'ldim." },
        { kr: '대학교에서 전공을 선택하는 대신에 복수전공을 했어요.', uz: "Universitetda bitta yo'nalish tanlash o'rniga ikki yo'nalish tanladim." },
        { kr: '중요한 것은 어떤 직업이 아니라 그 일을 얼마나 좋아하느냐는 것이다.', uz: "Muhim narsa qaysi kasb emas, balki u ishni qanchalik yoqtirishing." },
        { kr: '젊을 때 다양한 경험을 쌓는 편이 나중에 도움이 많이 돼요.', uz: "Yoshligida xilma-xil tajriba to'plash keyinchalik ko'proq foyda beradi." },
      ],
      dialog: [
        { speaker: 'A', kr: '진로를 어떻게 결정했어요? 많이 고민했겠어요.', uz: "Kasb yo'lini qanday belgiladingiz? Ko'p o'ylagansiz." },
        { speaker: 'B', kr: '네, 고민 많이 했어요. 저는 글 쓰는 걸 좋아하는 편이라 기자를 선택했어요.', uz: "Ha, ko'p o'yladim. Men yozishni yoqtirish tomonidaligim uchun jurnalist tanladim." },
        { speaker: 'A', kr: '수입이 낮은 편 아닌가요? 걱정되지 않아요?', uz: "Daromad nisbatan past emasmi? Xavotirlanmaysizmi?" },
        { speaker: 'B', kr: '돈을 많이 버는 대신에 하고 싶은 일을 하는 게 더 중요한 것 같아요.', uz: "Ko'p pul topish o'rniga xohlagan ishni qilish muhimroqdek ko'rinadi." },
        { speaker: 'A', kr: '그런 생각을 가지고 있다는 게 대단한 것 같아요.', uz: "Bunday fikrga egalik qilish ajoyib shekilli." },
        { speaker: 'B', kr: '중요한 건 후회하지 않는 선택을 한다는 거라고 생각해요.', uz: "Muhimi — afsus qilmaydigan tanlov qilish deb o'ylayman." },
      ],
      notes: [
        "-(으)ㄴ/는 편이다: to'liq emas, lekin shu yo'nalishda: 조용한 편(nisbatan sokin).",
        "-는 대신에: A o'rniga B: 공부하는 대신에 일해요(o'qish o'rniga ishlaydi).",
        "-다는 것이다: asosiy xulosa: 중요한 것은...다는 것이다 (muhim narsa — ...).",
        "보람있다 — mazmunli, qoniqarli: ish yoki harakatning natijasidan mamnun bo'lish.",
        "자아실현 — o'zini namoyon qilish: zamonaviy jamiyatda muhim tushuncha.",
      ],
      games: {
        matchPairs: [
          { kr: '적성', uz: 'qobiliyat' },
          { kr: '진로', uz: "kasb yo'li" },
          { kr: '목표', uz: 'maqsad' },
          { kr: '노력', uz: 'harakat' },
          { kr: '포기하다', uz: 'taslim bo\'lmoq' },
          { kr: '보람있다', uz: 'mazmunli' },
        ],
        fillBlank: [
          { sentence: '저는 수학보다 언어에 적성이 있는 ___.', answer: '편이에요', options: ['편이에요', '것이에요', '수있어요', '만해요'], uz: "Men matematikadan ko'ra tilga qobiliyatliroqman." },
          { sentence: '이 직업은 급여가 낮은 대신에 자유 시간이 ___.', answer: '많아요', options: ['많아요', '없어요', '적어요', '커요'], uz: "Bu kasb ish haqi past o'rniga bo'sh vaqt ko'p." },
          { sentence: '중요한 것은 포기하지 않는___것이다.', answer: '다는', options: ['다는', '고', '서', '면'], uz: "Muhim narsa — taslim bo'lmaslik." },
          { sentence: '노력하는 편이지만 결과가 항상 좋은 건 ___.', answer: '아니에요', options: ['아니에요', '맞아요', '해요', '돼요'], uz: "Nisbatan harakat qilaman, lekin natija doim yaxshi emas." },
          { sentence: '적성에 맞는 직업을 찾는 ___ 안정적인 직업을 선택했어요.', answer: '대신에', options: ['대신에', '때문에', '위해서', '위하여'], uz: "Qobiliyatga mos ish o'rniga barqaror ish tanladim." },
        ],
        scramble: [
          { kr: '적성', uz: 'qobiliyat' },
          { kr: '목표', uz: 'maqsad' },
          { kr: '성공', uz: 'muvaffaqiyat' },
          { kr: '노력', uz: 'harakat' },
          { kr: '진로', uz: "kasb yo'li" },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄴ/는 편이다' qanday ma'no ifodalaydi?", options: ['To\'liq shunday', 'Nisbatan, shu yo\'nalishda', 'Hech qachon shunday emas', 'Doim shunday'], correct_index: 1 },
      { question: "'돈을 버는 대신에' nimani anglatadi?", options: ['Pul topganda', 'Pul topish o\'rniga', 'Pul topolmasa', 'Pul topib bo\'lgach'], correct_index: 1 },
      { question: "'적성' nimani anglatadi?", options: ['maqsad', 'harakat', 'qobiliyat, layoqat', 'tajriba'], correct_index: 2 },
      { question: "'포기하다' nimani anglatadi?", options: ['harakat qilmoq', 'taslim bo\'lmoq', 'tanlash', 'rivojlantirmoq'], correct_index: 1 },
      { question: "'-다는 것이다' qanday ishlatiladi?", options: ['Savol berish', 'Asosiy fikrni bildirish', 'Inkor qilish', 'Shart bildirish'], correct_index: 1 },
      { question: "'보람있다' nimani anglatadi?", options: ['qiyin', 'mazmunli, qoniqarli', 'barqaror', 'muhim'], correct_index: 1 },
      { question: "'안정적이다' nimani anglatadi?", options: ['xilma-xil', 'qiyin', 'barqaror', 'katta'], correct_index: 2 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 2: Sog'lom hayot
  // 건강한 삶
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 4, order_in_level: 2,
    title_kr: '건강한 삶',
    title_uz: "Sog'lom hayot",
    is_free: true,
    content: {
      topic: {
        kr: '건강한 삶을 위해서는 규칙적인 운동과 균형 잡힌 식사가 필요합니다. 운동할수록 몸이 더 건강해집니다. 스트레스를 잘 관리하는 것도 건강에 중요합니다. 건강은 나빠지기 때문에 미리 관리해야 합니다.',
        uz: "Sog'lom hayot uchun muntazam jismoniy mashq va muvozanatli ovqatlanish zarur. Mashq qilgan sari tana sog'lomroq bo'ladi. Stressni yaxshi boshqarish ham sog'lik uchun muhim. Sog'lik yomonlashadigan bo'lgani uchun oldindan parvarishlash kerak."
      },
      grammar: {
        explanation: `-(으)ㄹ수록 — ...sari, ...gan sari (miqdor oshgan sari natija o'zgaradi)

Tuzilish: [fe'l/sifat o'zagi + (으)ㄹ수록]
• 운동할수록 건강해져요. (Mashq qilgan sari sog'lom bo'ladi.)
• 공부할수록 더 어려워요. (O'qigan sari qiyinlashadi.)
• 나이가 들수록 지혜로워져요. (Katta bo'lgan sari donoroq bo'ladi.)

-아/어지다 — holat o'zgarishi (tobora...bo'lmoq):
• 좋아지다 (yaxshilanmoq)
• 나빠지다 (yomonlashmoq)
• 건강해지다 (sog'lomroq bo'lmoq)
• 어려워지다 (qiyinlashmoq)

-기 때문에 — rasmiy sabab (4-daraja darajasida):
• 건강은 중요하기 때문에 관리해야 해요.`,
        examples: [
          { kr: '운동할수록 몸이 더 건강해집니다.', uz: "Mashq qilgan sari tana sog'lomroq bo'ladi." },
          { kr: '스트레스를 받을수록 건강이 나빠지는 편이에요.', uz: "Stress qilgan sari sog'liq yomonlashadigan tomonida." },
          { kr: '건강에 좋은 음식을 먹기 때문에 몸 상태가 좋아졌어요.', uz: "Sog'likka foydali ovqat yegani uchun ahvol yaxshilandi." },
          { kr: '나이가 들수록 건강 관리가 더 중요해집니다.', uz: "Katta bo'lgan sari sog'lik parvarishi muhimroq bo'ladi." },
          { kr: '규칙적으로 운동할수록 체력이 강해져요.', uz: "Muntazam mashq qilgan sari jismoniy kuch oshadi." },
        ]
      },
      vocabulary: [
        { kr: '건강', romanization: 'geongang', uz: "sog'liq" },
        { kr: '운동', romanization: 'undong', uz: 'jismoniy mashq' },
        { kr: '식사', romanization: 'siksa', uz: 'ovqatlanish' },
        { kr: '균형', romanization: 'gyunhyeong', uz: 'muvozanat' },
        { kr: '규칙적이다', romanization: 'gyuchikjeogida', uz: 'muntazam' },
        { kr: '스트레스', romanization: 'seutteuleseu', uz: 'stress' },
        { kr: '관리하다', romanization: 'gwallihada', uz: 'boshqarmoq, parvarish qilmoq' },
        { kr: '체력', romanization: 'cheryeok', uz: 'jismoniy kuch' },
        { kr: '면역력', romanization: 'myeonyeongnyeok', uz: 'immunitet' },
        { kr: '수면', romanization: 'sumyeon', uz: 'uyqu' },
        { kr: '휴식', romanization: 'hyusik', uz: 'dam olish' },
        { kr: '식습관', romanization: 'sikseupssgwan', uz: 'ovqatlanish odati' },
        { kr: '비만', romanization: 'biman', uz: 'semizlik' },
        { kr: '다이어트', romanization: 'daieoteu', uz: 'parhez, dieta' },
        { kr: '정신 건강', romanization: 'jeongshin geongang', uz: "ruhiy sog'liq" },
        { kr: '예방하다', romanization: 'yebanghada', uz: 'oldini olmoq' },
        { kr: '치료하다', romanization: 'chiryohada', uz: 'davolash' },
        { kr: '증상', romanization: 'jeungsang', uz: 'belgi, alomat' },
        { kr: '회복하다', romanization: 'hoebokhada', uz: 'tuzalmoq, tiklanmoq' },
        { kr: '습관', romanization: 'seupssgwan', uz: 'odat' },
      ],
      examples: [
        { kr: '건강한 식습관을 가질수록 병에 걸릴 확률이 낮아집니다.', uz: "Sog'lom ovqatlanish odatiga ega bo'lgan sari kasallangan ehtimol kamayadi." },
        { kr: '충분한 수면을 취하기 때문에 피부가 좋아졌어요.', uz: "Yetarli uyqu olgani uchun teri yaxshilandi." },
        { kr: '스트레스를 많이 받을수록 면역력이 떨어지는 편이에요.', uz: "Ko'p stress qilgan sari immunitet pasayadigan tomonda." },
        { kr: '운동과 올바른 식사를 통해 건강을 회복했어요.', uz: "Mashq va to'g'ri ovqatlanish orqali sog'ligimni tikaldim." },
        { kr: '나쁜 습관을 버릴수록 삶의 질이 높아집니다.', uz: "Yomon odatlardan qutilgan sari hayot sifati oshadi." },
      ],
      dialog: [
        { speaker: 'A', kr: '요즘 건강 관리 어떻게 해요?', uz: "Hozirda sog'lik parvarishini qanday qilyapsiz?" },
        { speaker: 'B', kr: '매일 30분씩 걷는 편이에요. 운동할수록 기분이 좋아지더라고요.', uz: "Har kuni 30 daqiqa piyoda yuradigan tomondaman. Mashq qilgan sari kayfiyat yaxshilanayapti." },
        { speaker: 'A', kr: '식사는요? 다이어트 중이에요?', uz: "Ovqatlanish-chi? Parhezdasizmi?" },
        { speaker: 'B', kr: '균형 잡힌 식사를 하려고 노력해요. 채소를 많이 먹기 때문에 체중이 줄었어요.', uz: "Muvozanatli ovqatlanishga harakat qilaman. Ko'p sabzavot yegani uchun vazn kamaydi." },
        { speaker: 'A', kr: '스트레스는 어떻게 관리해요? 저는 스트레스받을수록 더 먹게 되더라고요.', uz: "Stressni qanday boshqarasiz? Men stress qilgan sari ko'proq yeydigan bo'lib qolayapman." },
        { speaker: 'B', kr: '저는 음악 듣거나 산책하면서 스트레스를 풀어요. 그게 더 건강한 방법인 것 같아요.', uz: "Men musiqa tinglash yoki sayr qilish orqali stressni chiqaraman. Bu sog'lomroq usul shekilli." },
      ],
      notes: [
        "-(으)ㄹ수록: undosh + 을수록 (먹을수록), unli/ㄹ + ㄹ수록 (갈수록, 할수록).",
        "-아/어지다: holat o'zgarishi: 좋아지다(yaxshilanmoq), 나빠지다(yomonlashmoq).",
        "갈수록 (tobora) — '가다 + ㄹ수록' ning mustaqil ravish shakli: 갈수록 어려워요.",
        "규칙적이다 (muntazam) vs 불규칙적이다 (tartibsiz) — sog'lik mavzusida muhim.",
        "면역력 (immunitet) — so'zma-so'z: himoya kuchi.",
      ],
      games: {
        matchPairs: [
          { kr: '건강', uz: "sog'liq" },
          { kr: '균형', uz: 'muvozanat' },
          { kr: '수면', uz: 'uyqu' },
          { kr: '면역력', uz: 'immunitet' },
          { kr: '예방하다', uz: 'oldini olmoq' },
          { kr: '회복하다', uz: 'tiklanmoq' },
        ],
        fillBlank: [
          { sentence: '운동할___몸이 더 건강해집니다.', answer: '수록', options: ['수록', '때문에', '면서', '고'], uz: "Mashq qilgan sari tana sog'lomroq bo'ladi." },
          { sentence: '스트레스를 받을수록 건강이 ___.', answer: '나빠져요', options: ['나빠져요', '좋아져요', '커져요', '없어져요'], uz: "Stress qilgan sari sog'liq yomonlashadi." },
          { sentence: '채소를 많이 먹기 때문에 체중이 ___.', answer: '줄었어요', options: ['줄었어요', '늘었어요', '커졌어요', '없어졌어요'], uz: "Ko'p sabzavot yegani uchun vazn kamaydi." },
          { sentence: '나쁜 습관을 버릴수록 삶의 질이 ___.', answer: '높아집니다', options: ['높아집니다', '낮아집니다', '없어집니다', '생겨납니다'], uz: "Yomon odatlardan qutilgan sari hayot sifati oshadi." },
          { sentence: '충분한 수면을 취하기 ___ 피부가 좋아졌어요.', answer: '때문에', options: ['때문에', '대신에', '위해서', '통해서'], uz: "Yetarli uyqu olgani uchun teri yaxshilandi." },
        ],
        scramble: [
          { kr: '건강', uz: "sog'liq" },
          { kr: '운동', uz: 'mashq' },
          { kr: '수면', uz: 'uyqu' },
          { kr: '습관', uz: 'odat' },
          { kr: '균형', uz: 'muvozanat' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄹ수록' qanday ma'no ifodalaydi?", options: ['...sababli', '...sari (miqdor oshgan sari)', '...o\'rniga', '...uchun'], correct_index: 1 },
      { question: "'좋아지다' nimani anglatadi?", options: ['yomonlashmoq', 'o\'zgarmoq', 'yaxshilanmoq', 'kichraymoq'], correct_index: 2 },
      { question: "'면역력' nimani anglatadi?", options: ['jismoniy kuch', 'immunitet', "sog'liq", 'oziq-ovqat'], correct_index: 1 },
      { question: "'균형' nimani anglatadi?", options: ['harakat', 'muvozanat', 'odat', 'parhez'], correct_index: 1 },
      { question: "'규칙적이다' nimani anglatadi?", options: ['tartibsiz', 'muntazam', 'sog\'lom', 'foydali'], correct_index: 1 },
      { question: "'예방하다' nimani anglatadi?", options: ['davolash', 'oldini olmoq', 'tiklanmoq', 'tekshirmoq'], correct_index: 1 },
      { question: "갈수록 어려워요 nimani anglatadi?", options: ['Tobora qiyinlashadi', 'Ba\'zan qiyin', 'Biroz qiyin', 'Qiyin emas'], correct_index: 0 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 3: Sport dunyosi
  // 스포츠의 세계
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 4, order_in_level: 3,
    title_kr: '스포츠의 세계',
    title_uz: 'Sport dunyosi',
    is_free: false,
    content: {
      topic: {
        kr: '스포츠는 단순한 경기 그 이상입니다. 훈련하는 만큼 실력이 향상됩니다. 결승전에서 질 뻔했지만 마지막 순간에 역전했습니다. 운동하기 때문에 집중력이 향상되는 편이에요.',
        uz: "Sport oddiy musobaqadan ko'proq narsa. Mashq qilgancha mahorat oshadi. Final o'yinda yutqazib qo'ya yozdim, lekin so'nggi daqiqada o'z o'rnimga qaytdim. Mashq qilgani uchun diqqat-e'tibor oshadi."
      },
      grammar: {
        explanation: `-(으)ㄹ 뻔하다 — sal bo'ldi, yoqizay qoldi (bajarilmagan yaqin holat)

Tuzilish: [fe'l + (으)ㄹ 뻔했어요]
• 넘어질 뻔했어요. (Yiqilib qolay yozdim.)
• 질 뻔했어요. (Yutqazib qo'ya yozdim.)
• 늦을 뻔했어요. (Kech qolayozdim.)

-(으)ㄴ/는 만큼 — ...qadar, ...miqdorida, ...darajada
• 훈련하는 만큼 실력이 올라요. (Mashq qilgan qadar mahorat oshadi.)
• 노력한 만큼 성과가 나와요. (Harakat qilgan qadar natija chiqadi.)

-(으)니까 vs -기 때문에:
• -(으)니까 — og'zaki, buyruq/tavsiya oldida ko'p: 운동하니까 건강해요.
• -기 때문에 — yozma, rasmiy sabab: 운동하기 때문에 건강합니다.`,
        examples: [
          { kr: '결승전에서 질 뻔했지만 기적적으로 이겼어요.', uz: "Final o'yinda yutqazib qo'ya yozdim, lekin mo'jizakor g'alaba qozondim." },
          { kr: '훈련하는 만큼 실력이 향상됩니다.', uz: "Mashq qilgan qadar mahorat oshadi." },
          { kr: '운동을 꾸준히 하니까 체력이 많이 좋아졌어요.', uz: "Muntazam mashq qilgani uchun jismoniy kuch ko'p yaxshilandi." },
          { kr: '긴장해서 실수할 뻔했어요. 다행히 괜찮았어요.', uz: "Hayajonlanib xato qilay yozdim. Yaxshiyamki yaxshi bo'ldi." },
          { kr: '노력한 만큼 좋은 결과가 나오는 편이에요.', uz: "Harakat qilgan qadar yaxshi natija chiqadigan tomonda." },
        ]
      },
      vocabulary: [
        { kr: '스포츠', romanization: 'seupocheu', uz: 'sport' },
        { kr: '경기', romanization: 'gyeonggi', uz: 'musobaqa, o\'yin' },
        { kr: '선수', romanization: 'seonsu', uz: 'sportchi' },
        { kr: '훈련', romanization: 'hullyeon', uz: "mashg'ulot" },
        { kr: '실력', romanization: 'sillyeok', uz: 'mahorat' },
        { kr: '향상되다', romanization: 'hyangsangdweda', uz: 'oshmoq, rivojlanmoq' },
        { kr: '실패', romanization: 'silpae', uz: 'muvaffaqiyatsizlik' },
        { kr: '노력하다', romanization: 'noryeokhada', uz: 'harakat qilmoq' },
        { kr: '결과', romanization: 'gyeolgwa', uz: 'natija' },
        { kr: '긴장하다', romanization: 'ginjanghada', uz: 'hayajonlanmoq' },
        { kr: '집중력', romanization: 'jibungngyeok', uz: "diqqat-e'tibor" },
        { kr: '역전하다', romanization: 'yeokjeonhada', uz: "o'z o'rniga qaytmoq, vaziyatni o'zgartirmoq" },
        { kr: '우승하다', romanization: 'useonghada', uz: 'g\'alaba qozonmoq, birinchi o\'rinni egallash' },
        { kr: '패배하다', romanization: 'paebahada', uz: 'yutqazmoq, mag\'lub bo\'lmoq' },
        { kr: '응원하다', romanization: 'eungwonhada', uz: 'qo\'llab-quvvatlamoq' },
        { kr: '협동심', romanization: 'hyeobdongsim', uz: 'jamoaviylik ruhi' },
        { kr: '경쟁', romanization: 'gyeongjaeng', uz: 'raqobat' },
        { kr: '인내심', romanization: 'innaesim', uz: 'sabr, chidamlilik' },
        { kr: '목표', romanization: 'mokpyo', uz: 'maqsad' },
        { kr: '성취감', romanization: 'seongtwiugam', uz: 'muvaffaqiyat hissi' },
      ],
      examples: [
        { kr: '올림픽 결승전에서 금메달을 딸 뻔했는데 마지막에 실수를 했어요.', uz: "Olimpiya finalida oltin medal ola yozdim, lekin oxirida xato qildim." },
        { kr: '연습하는 만큼 실력이 쌓이니까 꾸준히 훈련하는 게 중요해요.', uz: "Mashq qilgan qadar mahorat to'planadi, shuning uchun muntazam trenirovka muhim." },
        { kr: '팀원들과 협동하기 때문에 어려운 경기에서도 이길 수 있었어요.', uz: "Jamoa a'zolari bilan hamkorlik qilgani uchun qiyin o'yinda ham g'alaba qozona oldik." },
        { kr: '경기에서 질 뻔했지만 포기하지 않아서 역전에 성공했어요.', uz: "O'yinda yutqazib qo'ya yozdim, lekin taslim bo'lmaganim uchun vaziyatni o'zgartirishga muvaffaq bo'ldim." },
        { kr: '노력한 만큼 성취감을 느끼는 편이에요.', uz: "Harakat qilgan qadar muvaffaqiyat hissi sezadigan tomondaman." },
      ],
      dialog: [
        { speaker: 'A', kr: '어제 경기 봤어요? 정말 긴장됐겠어요.', uz: "Kecha o'yinni ko'rdingizmi? Juda hayajonlangan bo'lsa kerak." },
        { speaker: 'B', kr: '네! 처음에는 질 뻔했어요. 3대 0으로 지고 있었거든요.', uz: "Ha! Dastlab yutqazib qo'ya yozdim. 3-0 yutqazib turar edim." },
        { speaker: 'A', kr: '어떻게 역전했어요? 기적 같았는데.', uz: "Vaziyatni qanday o'zgartirdingiz? Mo'jizaga o'xshar edi." },
        { speaker: 'B', kr: '팀워크가 좋았기 때문에 가능했어요. 훈련한 만큼 실력이 나온 거죠.', uz: "Jamoaviylik yaxshi bo'lgani uchun mumkin bo'ldi. Mashq qilgan qadar mahorat namoyon bo'ldi." },
        { speaker: 'A', kr: '그렇군요. 스포츠는 노력한 만큼 결과가 나오는 것 같아요.', uz: "Shundaymi. Sport harakat qilgan qadar natija beradigan narsaga o'xshaydi." },
        { speaker: 'B', kr: '맞아요. 포기하지 않는 정신이 제일 중요한 것 같아요.', uz: "To'g'ri. Taslim bo'lmaslik ruhi eng muhim shekilli." },
      ],
      notes: [
        "-(으)ㄹ 뻔하다: yaqindan bajarilmagan holat: 넘어질 뻔했어요(yiqilib qolay yozdim).",
        "-(으)ㄴ/는 만큼: ...qadar, ...miqdorida: 노력한 만큼(harakat qilgan qadar).",
        "-(으)니까 — og'zaki sabab; -기 때문에 — rasmiy yozma sabab.",
        "역전하다 — vaziyatni o'zgartirmoq: 스포츠에서 역전승 (sportda mo'jizakor g'alaba).",
        "협동심 (jamoaviylik) vs 경쟁심 (raqobatchilik) — sport falsafasida muhim juftlik.",
      ],
      games: {
        matchPairs: [
          { kr: '경기', uz: 'musobaqa' },
          { kr: '훈련', uz: "mashg'ulot" },
          { kr: '우승하다', uz: 'g\'alaba qozonmoq' },
          { kr: '응원하다', uz: 'qo\'llab-quvvatlamoq' },
          { kr: '인내심', uz: 'sabr' },
          { kr: '성취감', uz: 'muvaffaqiyat hissi' },
        ],
        fillBlank: [
          { sentence: '결승전에서 질 뻔___지만 이겼어요.', answer: '했', options: ['했', '해', '할', '하'], uz: "Final o'yinda yutqazib qo'ya yozdim, lekin g'alaba qozondim." },
          { sentence: '훈련하는 ___실력이 향상됩니다.', answer: '만큼', options: ['만큼', '대신에', '때문에', '편이'], uz: "Mashq qilgan qadar mahorat oshadi." },
          { sentence: '운동하___체력이 좋아졌어요.', answer: '니까', options: ['니까', '기 때문에', '는 대신에', '는 만큼'], uz: "Mashq qilgani uchun jismoniy kuch yaxshilandi." },
          { sentence: '긴장해서 실수할 뻔___어요.', answer: '했', options: ['했', '해', '할', '하'], uz: "Hayajonlanib xato qilay yozdim." },
          { sentence: '노력한 만큼 좋은 결과가 나오는 ___.', answer: '편이에요', options: ['편이에요', '것이에요', '중이에요', '만해요'], uz: "Harakat qilgan qadar yaxshi natija chiqadigan tomonda." },
        ],
        scramble: [
          { kr: '경기', uz: 'musobaqa' },
          { kr: '선수', uz: 'sportchi' },
          { kr: '훈련', uz: "mashg'ulot" },
          { kr: '목표', uz: 'maqsad' },
          { kr: '경쟁', uz: 'raqobat' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄹ 뻔하다' nimani anglatadi?", options: ['Bajarildi', 'Sal bo\'ldi, yoqizay qoldi', 'Doim shunday', 'Hech qachon bajarilmaydi'], correct_index: 1 },
      { question: "'훈련하는 만큼' nimani anglatadi?", options: ['Mashq qilish uchun', 'Mashq qilgan qadar', 'Mashq qilmasdan', 'Mashq qilganda'], correct_index: 1 },
      { question: "'역전하다' nimani anglatadi?", options: ['yutqazmoq', "o'z o'rniga qaytmoq", 'o\'qitmoq', 'o\'rganmoq'], correct_index: 1 },
      { question: "-(으)니까 vs -기 때문에 farqi?", options: ['Farq yo\'q', '니까 og\'zaki; 기 때문에 rasmiy yozma', '기 때문에 og\'zaki', 'Ikkalasi ham og\'zaki'], correct_index: 1 },
      { question: "'협동심' nimani anglatadi?", options: ['raqobat', 'sabr', 'jamoaviylik ruhi', 'g\'alaba'], correct_index: 2 },
      { question: "'우승하다' nimani anglatadi?", options: ['yutqazmoq', "g'alaba qozonmoq", 'qatnashmoq', 'mashq qilmoq'], correct_index: 1 },
      { question: "'인내심' nimani anglatadi?", options: ['diqqat', 'muvaffaqiyat hissi', 'sabr, chidamlilik', 'raqobat'], correct_index: 2 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 4: Erkaklar va ayollar
  // 남자와 여자
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 4, order_in_level: 4,
    title_kr: '남자와 여자',
    title_uz: "Erkaklar va ayollar (jamiyatdagi rol va o'zgarishlar)",
    is_free: false,
    content: {
      topic: {
        kr: '현대 사회에서 남녀의 역할이 많이 변화했습니다. 과거에는 남자가 일하는 반면에 여자는 주로 가정을 돌봤습니다. 요즘은 남녀 평등이 실현될 뿐만 아니라 여성의 사회 참여도 활발해졌습니다.',
        uz: "Zamonaviy jamiyatda erkak va ayolning roli ko'p o'zgardi. Ilgari erkak ishlaydigan bo'lsa, ayol asosan uyni parvarish qilgan. Hozirda erkak va ayol tengligi amalga oshirilishi bilan birga, ayollarning jamiyatda ishtirokida ham faollashdi."
      },
      grammar: {
        explanation: `-(으)ㄹ 뿐만 아니라 — ...dan tashqari ham, ...bilan birga

Tuzilish: [fe'l/sifat + (으)ㄹ 뿐만 아니라]
• 영어를 할 뿐만 아니라 한국어도 해요. (Ingliz tilidan tashqari koreycha ham biladi.)
• 가격이 쌀 뿐만 아니라 품질도 좋아요. (Narxi arzon bo'lishi bilan birga sifati ham yaxshi.)

-(으)ㄴ/는 반면에 — ...dagi holda, ...ga qarshi

• 남자는 힘이 센 반면에 여자는 섬세한 편이에요.
• 가격이 비싼 반면에 품질이 좋아요.

-(으)ㄹ수록 — ...sari (4-daraja darajasida):
사회가 발전할수록 평등 의식이 높아집니다.`,
        examples: [
          { kr: '여성의 사회 참여가 늘어날 뿐만 아니라 리더십도 강해졌어요.', uz: "Ayollarning jamiyat ishtirokining ortishi bilan birga, yetakchilik ham kuchaydi." },
          { kr: '이 직장은 급여가 높은 반면에 업무량이 많아요.', uz: "Bu ish joyi maoshi yuqori bo'lsa-da, ish hajmi ko'p." },
          { kr: '현대에는 남녀 역할의 경계가 모호해질 뿐만 아니라 다양해졌어요.', uz: "Zamonaviy davrda erkak va ayol rollarining chegarasi noaniq bo'lishi bilan birga, xilma-xillashdi." },
          { kr: '과거에는 여성이 집에 있는 반면에 남성은 사회에서 활동했어요.', uz: "Ilgari ayollar uyda bo'lgan holda, erkaklar jamiyatda faoliyat ko'rsatgan." },
          { kr: '평등 의식이 높아질수록 사회가 더 발전하는 편이에요.', uz: "Tenglik ongi oshgan sari jamiyat ko'proq rivojlanadigan tomonda." },
        ]
      },
      vocabulary: [
        { kr: '역할', romanization: 'yeokhal', uz: 'rol' },
        { kr: '차이', romanization: 'chai', uz: 'farq' },
        { kr: '평등', romanization: 'pyeongdeung', uz: 'tenglik' },
        { kr: '전통', romanization: 'jeontong', uz: "an'ana" },
        { kr: '변화', romanization: 'byeonhwa', uz: "o'zgarish" },
        { kr: '사회', romanization: 'sahoe', uz: 'jamiyat' },
        { kr: '인식', romanization: 'insik', uz: 'qarash, ong' },
        { kr: '책임', romanization: 'chaegim', uz: "mas'uliyat" },
        { kr: '참여하다', romanization: 'chamyeohada', uz: 'qatnashmoq' },
        { kr: '활발하다', romanization: 'hwalbalhada', uz: 'faol' },
        { kr: '권리', romanization: 'gwolli', uz: 'huquq' },
        { kr: '차별', romanization: 'chabyeol', uz: 'kamsitish, diskriminatsiya' },
        { kr: '다양성', romanization: 'dayangsseong', uz: 'xilma-xillik' },
        { kr: '가정', romanization: 'gajeong', uz: 'oila, uy' },
        { kr: '육아', romanization: 'yuga', uz: 'bola tarbiyasi' },
        { kr: '경력', romanization: 'gyeongnyeok', uz: 'martaba, karyera' },
        { kr: '취업', romanization: 'chwieop', uz: 'ishga joylashish' },
        { kr: '승진하다', romanization: 'seungjinhada', uz: "lavozim oshmoq, ko'tarilmoq" },
        { kr: '복지', romanization: 'bokji', uz: 'farovonlik, ijtimoiy ta\'minot' },
        { kr: '균형', romanization: 'gyunhyeong', uz: "ish-hayot muvozanati" },
      ],
      examples: [
        { kr: '현대 여성들은 가정을 돌볼 뿐만 아니라 전문적인 경력도 쌓고 있어요.', uz: "Zamonaviy ayollar uyni parvarish qilish bilan birga, kasbiy karyera ham qilayaptilar." },
        { kr: '남성들도 육아에 참여하는 반면에 여성들은 사회에서 더 활발해졌어요.', uz: "Erkaklar ham bola tarbiyasida qatnashadigan bo'lsa-da, ayollar jamiyatda faollashdi." },
        { kr: '교육 수준이 높아질수록 성 평등 의식도 높아지는 편이에요.', uz: "Ta'lim darajasi oshgan sari jins tengligi ongi ham oshib boradigan tomonda." },
        { kr: '직장에서의 성별 차별이 줄어들 뿐만 아니라 여성 리더도 증가했어요.', uz: "Ish joyidagi jins kamsitishining kamayishi bilan birga, ayol rahbarlar soni ham oshdi." },
        { kr: '과거와 달리 현대에는 남녀 역할의 경계가 점점 없어지고 있어요.', uz: "O'tmishdan farqli o'laroq, hozirda erkak va ayol rollari chegarasi tobora yo'qolmoqda." },
      ],
      dialog: [
        { speaker: 'A', kr: '요즘 한국 사회에서 남녀 평등이 많이 발전한 것 같아요.', uz: "Hozirda Koreya jamiyatida erkak va ayol tengligi ko'p rivojlangan shekilli." },
        { speaker: 'B', kr: '맞아요. 예전에는 여성이 주로 집에 있는 반면에 남성이 일했는데, 이제는 많이 달라졌어요.', uz: "To'g'ri. Ilgari ayol asosan uyda bo'lgan holda erkak ishlagan, endi ko'p o'zgardi." },
        { speaker: 'A', kr: '그래도 아직 차별이 있지 않아요?', uz: "Lekin hali ham kamsitish bor emasmi?" },
        { speaker: 'B', kr: '물론 아직 개선해야 할 부분이 있어요. 그렇지만 여성들이 사회에서 활발해질 뿐만 아니라 고위직도 많아졌어요.', uz: "Albatta hali yaxshilanishi kerak qismlar bor. Lekin ayollar jamiyatda faollashishi bilan birga, yuqori lavozimlar ham ko'paydi." },
        { speaker: 'A', kr: '이 문제는 사회가 발전할수록 더 좋아지는 편 아닐까요?', uz: "Bu masala jamiyat rivojlangan sari yaxshilanadigan tomonda emasmi?" },
        { speaker: 'B', kr: '그렇게 생각해요. 인식이 변할수록 실제 평등도 실현될 것 같아요.', uz: "Shunday o'ylayman. Qarash o'zgargan sari haqiqiy tenglik ham amalga oshadik shekilli." },
      ],
      notes: [
        "-(으)ㄹ 뿐만 아니라: ...dan tashqari ham: 영어를 할 뿐만 아니라 한국어도 해요.",
        "-(으)ㄴ/는 반면에: qarama-qarshi holat: 비싼 반면에 좋아요(qimmat bo'lsa-da yaxshi).",
        "성별 차별 (jins kamsitishi) — muhim ijtimoiy mavzu.",
        "육아 (bola tarbiyasi) — hozirda erkaklar ham baham ko'rmoqda.",
        "고위직 — yuqori lavozim: 고위직에 오르다 (yuqori lavozimga ko'tarilmoq).",
      ],
      games: {
        matchPairs: [
          { kr: '평등', uz: 'tenglik' },
          { kr: '차별', uz: 'kamsitish' },
          { kr: '권리', uz: 'huquq' },
          { kr: '활발하다', uz: 'faol' },
          { kr: '승진하다', uz: "lavozim oshmoq" },
          { kr: '균형', uz: 'muvozanat' },
        ],
        fillBlank: [
          { sentence: '여성의 사회 참여가 늘어날 뿐만 아니라 리더십도 ___.', answer: '강해졌어요', options: ['강해졌어요', '약해졌어요', '없어졌어요', '변했어요'], uz: "Ayollarning jamiyat ishtirokining ortishi bilan birga, yetakchilik ham kuchaydi." },
          { sentence: '이 직장은 급여가 높은 반면에 업무량이 ___.', answer: '많아요', options: ['많아요', '적어요', '없어요', '좋아요'], uz: "Bu ish joyi maoshi yuqori bo'lsa-da, ish hajmi ko'p." },
          { sentence: '사회가 발전할___평등 의식이 높아집니다.', answer: '수록', options: ['수록', '때문에', '대신에', '반면에'], uz: "Jamiyat rivojlangan sari tenglik ongi oshadi." },
          { sentence: '과거에는 여성이 집에 있는 ___ 남성은 일했어요.', answer: '반면에', options: ['반면에', '대신에', '때문에', '만큼'], uz: "Ilgari ayollar uyda bo'lgan holda erkaklar ishlagan." },
          { sentence: '현대 여성들은 가정을 돌볼 뿐만 아니라 경력도 ___.', answer: '쌓고 있어요', options: ['쌓고 있어요', '없어요', '포기해요', '그만둬요'], uz: "Zamonaviy ayollar uyni parvarish qilish bilan birga, karyera ham qilayaptilar." },
        ],
        scramble: [
          { kr: '평등', uz: 'tenglik' },
          { kr: '역할', uz: 'rol' },
          { kr: '변화', uz: "o'zgarish" },
          { kr: '사회', uz: 'jamiyat' },
          { kr: '권리', uz: 'huquq' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄹ 뿐만 아니라' nimani anglatadi?", options: ['...o\'rniga', '...dan tashqari ham', '...sababli', '...qadar'], correct_index: 1 },
      { question: "'-(으)ㄴ/는 반면에' qanday ishlatiladi?", options: ['Sabab bildirish', 'Qarama-qarshi holat bildirish', 'Taklif berish', 'Taxmin bildirish'], correct_index: 1 },
      { question: "'평등' nimani anglatadi?", options: ['farq', 'tenglik', 'rol', 'huquq'], correct_index: 1 },
      { question: "'차별' nimani anglatadi?", options: ['tenglik', 'farq', 'kamsitish', 'o\'zgarish'], correct_index: 2 },
      { question: "'활발하다' nimani anglatadi?", options: ['tinch', 'faol', 'barqaror', 'katta'], correct_index: 1 },
      { question: "'승진하다' nimani anglatadi?", options: ['ishga kirmoq', "lavozim oshmoq", 'ishdan chiqmoq', 'o\'tkazmoq'], correct_index: 1 },
      { question: "'육아' nimani anglatadi?", options: ['ta\'lim', 'bola tarbiyasi', 'ovqatlanish', 'dam olish'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 5: Maqollar va iboralar
  // 속담과 관용어
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 4, order_in_level: 5,
    title_kr: '속담과 관용어',
    title_uz: 'Maqollar va iboralar (idiomlar)',
    is_free: false,
    content: {
      topic: {
        kr: '한국어에는 독특한 속담과 관용어가 많습니다. 관용어는 단어의 원래 의미와 다른 뜻으로 사용됩니다. 속담을 알면 알수록 한국 문화를 더 잘 이해할 수 있습니다. 관용어를 사용하다 보니 자연스럽게 한국어 실력이 늘었어요.',
        uz: "Koreys tilida o'ziga xos maqollar va iboralar ko'p. Iboralar so'zlarning asl ma'nosidan boshqa ma'noda ishlatiladi. Maqollarni bilgan sari Koreya madaniyatini yaxshiroq tushunish mumkin. Iboralarni ishlatib borishim natijasida koreys tili darajam o'z-o'zidan oshib ketdi."
      },
      grammar: {
        explanation: `-는 셈이다 — ...hisoblanadi, ...ga teng, deyarli ...

• 매일 조금씩 공부하면 많이 배우는 셈이에요. (Har kuni biroz o'rgansa, ko'p o'rgangani hisoblanadi.)
• 10년 동안 살았으니 한국 사람인 셈이에요. (10 yil yashaganim uchun koreyalik hisoblanadi.)

-다 보니 — ...qilaverib, natija o'z-o'zidan kelib chiqdi:
• 계속 연습하다 보니 잘하게 됐어요. (Doim mashq qilaverib, yaxshi bo'lib qoldim.)
• 매일 읽다 보니 이해가 돼요. (Har kuni o'qiyaverib, tushuna boshladim.)

-게 마련이다 — tabiiy ravishda shunday bo'ladi, muqarrar:
• 노력하면 실력이 늘게 마련이에요. (Harakat qilsa, mahorat oshishi muqarrar.)`,
        examples: [
          { kr: '속담을 알면 알수록 한국 문화를 이해하는 셈이에요.', uz: "Maqollarni bilgan sari Koreya madaniyatini tushungani hisoblanadi." },
          { kr: '관용어를 사용하다 보니 자연스럽게 실력이 늘었어요.', uz: "Iboralarni ishlatib boraverib, tabiiy ravishda mahorat oshdi." },
          { kr: '언어를 배우다 보면 실수를 하게 마련이에요.', uz: "Til o'rganib boraversangiz, xato qilish muqarrar." },
          { kr: '한국어를 오래 공부한 셈인데 아직 속담이 어려워요.', uz: "Koreys tilini uzoq o'rgangan hisoblanaman, lekin hali maqollar qiyin." },
          { kr: '자주 들으면 들을수록 이해가 잘 되는 편이에요.', uz: "Tez-tez eshitgan sari tushunish yaxshilanadigan tomonda." },
        ]
      },
      vocabulary: [
        { kr: '속담', romanization: 'sokdam', uz: 'maqol' },
        { kr: '관용어', romanization: 'gwanyongeo', uz: 'ibora (idiom)' },
        { kr: '의미', romanization: 'uimi', uz: "ma'no" },
        { kr: '표현', romanization: 'pyohyeon', uz: 'ifoda' },
        { kr: '상황', romanization: 'sanghwang', uz: 'vaziyat' },
        { kr: '사용하다', romanization: 'sayonghada', uz: 'ishlatmoq' },
        { kr: '이해하다', romanization: 'ihaehada', uz: 'tushunmoq' },
        { kr: '해석하다', romanization: 'haeseokhada', uz: 'talqin qilmoq' },
        { kr: '손이 크다', romanization: 'soni keuda', uz: 'saxiy (so\'zma-so\'z: qo\'li katta)' },
        { kr: '발이 넓다', romanization: 'bari neolda', uz: "tanishi ko'p (so'zma-so'z: oyog'i keng)" },
        { kr: '눈이 높다', romanization: 'nuni nopda', uz: 'talab yuqori (so\'zma-so\'z: ko\'zi baland)' },
        { kr: '귀가 얇다', romanization: 'gwiga yalda', uz: 'tez ishonadi (so\'zma-so\'z: qulog\'i yupqa)' },
        { kr: '입이 무겁다', romanization: 'ibi mugeopda', uz: 'sir saqlaydi (so\'zma-so\'z: og\'zi og\'ir)' },
        { kr: '배가 아프다', romanization: 'baega apeuda', uz: 'havas qiladi, hasad qiladi' },
        { kr: '발이 묶이다', romanization: 'bari mugida', uz: 'ketolmay qolmoq, to\'silib qolmoq' },
        { kr: '눈코 뜰 새 없다', romanization: 'nunkho tteul sae eopda', uz: "vaqt yo'q, juda band" },
        { kr: '독특하다', romanization: 'dokteukada', uz: "o'ziga xos, noyob" },
        { kr: '자연스럽다', romanization: 'jayeonseureopda', uz: 'tabiiy' },
        { kr: '문화적이다', romanization: 'munhwajeogida', uz: 'madaniy' },
        { kr: '맥락', romanization: 'maengnak', uz: 'kontekst, bog\'liqlik' },
      ],
      examples: [
        { kr: '"손이 크다"는 음식을 많이 만드는 사람을 칭찬할 때 쓰는 관용어예요.', uz: '"손이 크다" — ovqatni ko\'p qiladigan odamni maqtayganda ishlatiladigan ibora.' },
        { kr: '"발이 넓다"는 사람들과 인간관계가 좋다는 뜻의 관용어예요.', uz: '"발이 넓다" — odamlar bilan munosabati yaxshi degani iborada.' },
        { kr: '속담을 배우다 보니 한국 사람들의 사고방식을 이해하게 됐어요.', uz: "Maqollarni o'rganib boraverib, koreyaliklar fikrlash tarzini tushunib qoldim." },
        { kr: '관용어를 모르면 한국 영화를 이해하기 어려운 셈이에요.', uz: "Iboralarni bilmasangiz, Koreya filmlarini tushunish qiyin hisoblanadi." },
        { kr: '언어를 배우면 배울수록 그 나라 문화가 보이게 마련이에요.', uz: "Til o'rgangan sari o'sha mamlakat madaniyati ko'rina boshlashi muqarrar." },
      ],
      dialog: [
        { speaker: 'A', kr: '"눈이 높다"가 무슨 뜻이에요?', uz: '"눈이 높다" qanday ma\'no anglatadi?' },
        { speaker: 'B', kr: '좋은 것만 원한다는 뜻이에요. 기준이 높다고 할 수 있죠.', uz: "Faqat yaxshisini istaydi degani. Talabi yuqori deyish mumkin." },
        { speaker: 'A', kr: '아, 그렇군요. 한국 관용어가 많은 셈이네요.', uz: "A, shundaymi. Koreys iboralari ko'p hisoblanadi-ku." },
        { speaker: 'B', kr: '맞아요. 하지만 자주 사용하다 보니 점점 익숙해지는 편이에요.', uz: "To'g'ri. Lekin tez-tez ishlatib boraverib, tobora odatlanib bormoqda." },
        { speaker: 'A', kr: '저도 관용어를 더 공부해야겠어요. 모르면 대화할 때 어려운 게 마련이잖아요.', uz: "Men ham iboralarni ko'proq o'rganishim kerak. Bilmasangiz suhbatda qiyin bo'lishi muqarrar-ku." },
        { speaker: 'B', kr: '한국 드라마를 보다 보면 자연스럽게 배우게 마련이에요. 저도 그렇게 배웠거든요.', uz: "Koreya seriallarini ko'rib boraverib, tabiiy ravishda o'rgangan bo'lasiz. Men ham shunday o'rgandim." },
      ],
      notes: [
        "-는 셈이다: ...ga teng, deyarli: 10년 살았으니 한국 사람인 셈이에요.",
        "-다 보니: ...qilaverib, natija: 공부하다 보니 잘하게 됐어요(o'rganaverib yaxshilashdim).",
        "-게 마련이다: muqarrar tabiiy holat: 노력하면 늘게 마련이에요(harakat qilsa oshadi).",
        "관용어 (idiom) — so'zma-so'z ma'nodan farqli: 손이 크다 ≠ qo'li katta.",
        "속담 (maqol) — xalq donoligi: 가는 말이 고와야 오는 말이 곱다 (yaxshi so'z yaxshi javob oladi).",
      ],
      games: {
        matchPairs: [
          { kr: '손이 크다', uz: 'saxiy' },
          { kr: '발이 넓다', uz: "tanishi ko'p" },
          { kr: '눈이 높다', uz: 'talab yuqori' },
          { kr: '귀가 얇다', uz: 'tez ishonadi' },
          { kr: '입이 무겁다', uz: 'sir saqlaydi' },
          { kr: '배가 아프다', uz: 'hasad qiladi' },
        ],
        fillBlank: [
          { sentence: '속담을 알면 알수록 한국 문화를 이해하는 ___.', answer: '셈이에요', options: ['셈이에요', '것이에요', '편이에요', '만해요'], uz: "Maqollarni bilgan sari Koreya madaniyatini tushungani hisoblanadi." },
          { sentence: '관용어를 사용하다 ___ 실력이 늘었어요.', answer: '보니', options: ['보니', '면', '서', '고'], uz: "Iboralarni ishlatib boraverib, mahorat oshdi." },
          { sentence: '언어를 배우면 실수하게 ___.', answer: '마련이에요', options: ['마련이에요', '편이에요', '수 있어요', '것이에요'], uz: "Til o'rgansangiz, xato qilish muqarrar." },
          { sentence: '관용어를 모르면 대화하기 어려운 ___.', answer: '셈이에요', options: ['셈이에요', '편이에요', '것이에요', '만해요'], uz: "Iboralarni bilmasangiz, suhbat qiyin hisoblanadi." },
          { sentence: '자주 들으면 들을___이해가 잘 되는 편이에요.', answer: '수록', options: ['수록', '때문에', '대신에', '반면에'], uz: "Tez-tez eshitgan sari tushunish yaxshilana boradi." },
        ],
        scramble: [
          { kr: '속담', uz: 'maqol' },
          { kr: '의미', uz: "ma'no" },
          { kr: '표현', uz: 'ifoda' },
          { kr: '맥락', uz: 'kontekst' },
          { kr: '상황', uz: 'vaziyat' },
        ],
      },
    },
    quiz: [
      { question: "'-는 셈이다' nimani anglatadi?", options: ['...ni xohlash', '...ga teng, hisoblanadi', '...o\'rniga', '...uchun'], correct_index: 1 },
      { question: "'-다 보니' qanday ishlatiladi?", options: ['Shart bildirish', '...qilaverib, natija o\'z-o\'zidan keldi', 'Buyruq berish', 'Taxmin bildirish'], correct_index: 1 },
      { question: "'-게 마련이다' nimani anglatadi?", options: ['Mumkin emas', 'Muqarrar, tabiiy ravishda shunday bo\'ladi', 'Hech qachon shunday emas', 'Ba\'zan shunday'], correct_index: 1 },
      { question: "'손이 크다' iborasining ma'nosi?", options: ['qo\'li katta', 'saxiy', 'kuchli', 'mahoratli'], correct_index: 1 },
      { question: "'귀가 얇다' iborasining ma'nosi?", options: ['eshitmaydi', 'tez ishonadi', 'sir saqlaydi', 'gapirmaydi'], correct_index: 1 },
      { question: "'발이 넓다' iborasining ma'nosi?", options: ["oyog'i katta", "tanishi ko'p", 'tez yuradi', 'tajribali'], correct_index: 1 },
      { question: "'독특하다' nimani anglatadi?", options: ['oddiy', "o'ziga xos, noyob", 'tabiiy', 'mashhur'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 6: Konsertlar va festivallar
  // 공연과 축제
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 4, order_in_level: 6,
    title_kr: '공연과 축제',
    title_uz: 'Konsertlar va festivallar',
    is_free: false,
    content: {
      topic: {
        kr: '한국에는 다양한 공연과 축제가 있습니다. 공연을 보고 보니 한국 문화에 대한 이해가 깊어졌어요. 이 축제는 볼 만할 뿐만 아니라 경험할 만한 행사예요. 공연을 관람하는 편이 스트레스 해소에 도움이 됩니다.',
        uz: "Koreyada xilma-xil konsertlar va festivallar bor. Konsertni ko'rib bo'lgach, Koreya madaniyatiga tushunishim chuqurlashdi. Bu festival ko'rasa arziydi, bundan tashqari boshdan kechirib ko'rsa arziydigan tadbir. Konsert tomosha qilish tomoni stressni chiqarishga yordam beradi."
      },
      grammar: {
        explanation: `-(으)ㄹ 만하다 — ...ga arziydi, ...qilish mumkin, ...qilsa bo'ladi

Tuzilish: [fe'l + (으)ㄹ 만하다]
• 볼 만해요. (Ko'rsa arziydi / ko'rish mumkin.)
• 먹을 만해요. (Yesa bo'ladi / yaxshi.)
• 갈 만한 곳이에요. (Borsa arziydigan joy.)

-고 보니 — ...qilib bo'lgach ko'rdimki, ...qilib ko'rsa (natija keyin ma'lum bo'ldi):
• 먹고 보니 맛있었어요. (Yeb bo'lgach mazali ekan.)
• 해 보고 보니 생각보다 쉬웠어요. (Qilib bo'lgach, o'ylagandan oson ekan.)

-(으)ㄴ/는 편이다 (ko'rib chiqish + baho berish):
• 이 공연은 재미있는 편이에요. (Bu konsert nisbatan qiziqarli.)`,
        examples: [
          { kr: '이 뮤지컬은 정말 볼 만해요. 꼭 추천해요.', uz: "Bu myuzikl juda ko'rsa arziydi. Albatta tavsiya qilaman." },
          { kr: '공연을 보고 보니 한국 예술에 대한 생각이 달라졌어요.', uz: "Konsertni ko'rib bo'lgach, Koreya san'atiga qarashim o'zgardi." },
          { kr: '이 축제는 참여할 만할 뿐만 아니라 정말 감동적이에요.', uz: "Bu festival ishtirok etsa arziydidan tashqari, juda ta'sirli." },
          { kr: '한번 경험해 보고 보니 왜 유명한지 알겠더라고요.', uz: "Bir marta boshdan kechirip bo'lgach, nima uchun mashhur ekanini tushundim." },
          { kr: '가격이 비싼 편이지만 공연의 수준은 정말 높아요.', uz: "Narxi nisbatan qimmat, lekin konsert darajasi juda yuqori." },
        ]
      },
      vocabulary: [
        { kr: '공연', romanization: 'gongnyeon', uz: 'konsert, sahna chiqishi' },
        { kr: '축제', romanization: 'chukje', uz: 'festival' },
        { kr: '관람하다', romanization: 'gwallamnada', uz: 'tomosha qilmoq' },
        { kr: '참여하다', romanization: 'chamyeohada', uz: 'qatnashmoq' },
        { kr: '분위기', romanization: 'bunwigi', uz: 'muhit, atmosfera' },
        { kr: '감동적이다', romanization: 'gamdonjjeogida', uz: "ta'sirli" },
        { kr: '재미있다', romanization: 'jaemiitda', uz: 'qiziqarli' },
        { kr: '지루하다', romanization: 'jiruhada', uz: 'zerikarli' },
        { kr: '수준', romanization: 'sujun', uz: 'daraja' },
        { kr: '다양하다', romanization: 'dayanghada', uz: 'xilma-xil' },
        { kr: '전통적이다', romanization: 'jeontongjeogida', uz: "an'anaviy" },
        { kr: '현대적이다', romanization: 'hyeondaejeogida', uz: 'zamonaviy' },
        { kr: '입장료', romanization: 'ipjangnyo', uz: 'kirish narxi' },
        { kr: '예매하다', romanization: 'yemaehada', uz: 'oldindan sotib olmoq (chipta)' },
        { kr: '공연장', romanization: 'gongnyeonjang', uz: 'konsert zali' },
        { kr: '연주하다', romanization: 'yeonjuhada', uz: 'ijro etmoq (musiqa)' },
        { kr: '감상하다', romanization: 'gamsanghada', uz: 'bahramand bo\'lmoq, his qilmoq' },
        { kr: '인기있다', romanization: 'ingiitta', uz: 'mashhur' },
        { kr: '한류', romanization: 'hallyu', uz: 'Hallyu (Koreya madaniyat to\'lqini)' },
        { kr: '문화생활', romanization: 'munhwasaengghwal', uz: 'madaniy hayot' },
      ],
      examples: [
        { kr: '서울 국제 영화제는 꼭 참여할 만한 행사예요.', uz: "Seul xalqaro kinofestivali albatta qatnashsa arziydigan tadbir." },
        { kr: '이 뮤지컬은 티켓이 비쌌지만 보고 보니 그 돈이 아깝지 않았어요.', uz: "Bu myuzikl chiptasi qimmat edi, lekin ko'rib bo'lgach o'sha pul afsusga arzimadi." },
        { kr: '전통 공연을 볼 만한 장소를 알려 주실 수 있어요?', uz: "An'anaviy konsert ko'rsa arziydigan joyni aytib bera olasizmi?" },
        { kr: '축제 분위기가 너무 좋아서 매년 오는 편이에요.', uz: "Festival muhiti juda yaxshi bo'lgani uchun har yili keladigan tomondaman." },
        { kr: '한류 덕분에 한국 공연과 축제가 세계적으로 인기가 높아졌어요.', uz: "Hallyu tufayli Koreya konsertlari va festivallari global miqyosda mashhurroq bo'ldi." },
      ],
      dialog: [
        { speaker: 'A', kr: '지난 주말에 뮤지컬 봤어요? 어땠어요?', uz: "O'tgan hafta oxiri myuzikl ko'rdingizmi? Qanday edi?" },
        { speaker: 'B', kr: '정말 볼 만했어요! 처음에는 한국어라 어렵겠다고 생각했는데 보고 보니 다 이해됐어요.', uz: "Juda ko'rsa arzidi! Dastlab koreyacha bo'lgani uchun qiyin bo'ladi deb o'yladim, lekin ko'rib bo'lgach hammasi tushunildi." },
        { speaker: 'A', kr: '그렇군요! 저도 가 보고 싶은데 표가 있을까요?', uz: "Shundaymi! Men ham borib ko'rmoqchiman, chipta bormikan?" },
        { speaker: 'B', kr: '인기가 많아서 미리 예매해야 해요. 볼 만할 뿐만 아니라 감동적이기도 해요.', uz: "Mashhur bo'lgani uchun oldindan sotib olish kerak. Ko'rsa arziydidan tashqari, ta'sirli ham." },
        { speaker: 'A', kr: '가격은 어때요? 비싼 편이에요?', uz: "Narxi qanday? Nisbatan qimmat tomonidami?" },
        { speaker: 'B', kr: '조금 비싼 편이지만 그만한 가치가 있어요. 충분히 볼 만해요!', uz: "Biroz qimmat tomonda, lekin o'shanga arziydi. Yetarli darajada ko'rsa arziydi!" },
      ],
      notes: [
        "-(으)ㄹ 만하다: arziydigan, qilsa bo'ladigan: 볼 만해요(ko'rsa arziydi), 먹을 만해요(yesa bo'ladi).",
        "-고 보니: ...qilib bo'lgach ko'rdimki: 먹고 보니(yeb bo'lgach), 해 보고 보니(qilib bo'lgach).",
        "한류 (Hallyu) — Koreya madaniyati to'lqini: K-pop, drama, kino, taom.",
        "예매하다 — oldindan chipta sotib olmoq: 인기 공연은 미리 예매해야 해요.",
        "입장료 (kirish narxi) vs 티켓 값 (chipta narxi) — ikkalasi ham ishlatiladi.",
      ],
      games: {
        matchPairs: [
          { kr: '공연', uz: 'konsert' },
          { kr: '축제', uz: 'festival' },
          { kr: '감동적이다', uz: "ta'sirli" },
          { kr: '예매하다', uz: 'oldindan sotib olmoq' },
          { kr: '한류', uz: 'Koreya madaniyat to\'lqini' },
          { kr: '감상하다', uz: 'bahramand bo\'lmoq' },
        ],
        fillBlank: [
          { sentence: '이 뮤지컬은 정말 볼 ___.', answer: '만해요', options: ['만해요', '수있어요', '것이에요', '편이에요'], uz: "Bu myuzikl juda ko'rsa arziydi." },
          { sentence: '공연을 보고 ___ 한국 예술이 좋아졌어요.', answer: '보니', options: ['보니', '나서', '서', '면서'], uz: "Konsertni ko'rib bo'lgach, Koreya san'atini yaxshi ko'rib qoldim." },
          { sentence: '이 축제는 참여할 만할 ___ 감동적이에요.', answer: '뿐만 아니라', options: ['뿐만 아니라', '대신에', '때문에', '반면에'], uz: "Bu festival ishtirok etsa arziydidan tashqari ta'sirli." },
          { sentence: '가격이 비싼 편이지만 그만한 ___ 있어요.', answer: '가치가', options: ['가치가', '시간이', '문제가', '이유가'], uz: "Narxi nisbatan qimmat, lekin o'shanga arziydi." },
          { sentence: '인기가 많아서 미리 ___해야 해요.', answer: '예매', options: ['예매', '취소', '확인', '변경'], uz: "Mashhur bo'lgani uchun oldindan sotib olish kerak." },
        ],
        scramble: [
          { kr: '공연', uz: 'konsert' },
          { kr: '축제', uz: 'festival' },
          { kr: '수준', uz: 'daraja' },
          { kr: '분위기', uz: 'muhit' },
          { kr: '한류', uz: 'Hallyu' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄹ 만하다' nimani anglatadi?", options: ['...qilmaslik kerak', '...ga arziydi, qilsa bo\'ladi', '...qilish mumkin emas', '...muqarrar'], correct_index: 1 },
      { question: "'-고 보니' qanday ishlatiladi?", options: ['Shart bildirish', '...qilib bo\'lgach natija ma\'lum bo\'ldi', 'Taklif berish', 'Sabab bildirish'], correct_index: 1 },
      { question: "'감동적이다' nimani anglatadi?", options: ['zerikarli', 'qiziqarli', "ta'sirli", 'mashhur'], correct_index: 2 },
      { question: "'예매하다' nimani anglatadi?", options: ['kechroq sotib olmoq', 'oldindan sotib olmoq', 'qaytarib bermoq', 'bekor qilmoq'], correct_index: 1 },
      { question: "'한류' nimani anglatadi?", options: ['Koreya ovqati', 'Koreya madaniyat to\'lqini', 'Koreya tarixi', 'Koreya tili'], correct_index: 1 },
      { question: "'지루하다' nimani anglatadi?", options: ["ta'sirli", 'qiziqarli', 'zerikarli', 'hayajonli'], correct_index: 2 },
      { question: "'입장료' nimani anglatadi?", options: ['transport narxi', 'kirish narxi', 'ovqat narxi', 'kiyim narxi'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 7: To'g'ri va noto'g'ri
  // 옳고 그름
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 4, order_in_level: 7,
    title_kr: '옳고 그름',
    title_uz: "To'g'ri va noto'g'ri (axloqiy qarorlar)",
    is_free: false,
    content: {
      topic: {
        kr: '인생에서 옳고 그름을 판단하는 것은 쉽지 않습니다. 그럴 리가 없는 일도 실제로 일어나는 편입니다. 상황에 따라 옳다고 생각한 일이 나중에 잘못된 것으로 밝혀질지도 모릅니다. 책임있는 행동을 할 텐데 왜 그런 결과가 나왔을까요?',
        uz: "Hayotda to'g'ri va noto'g'rini baholash oson emas. Bo'lishi mumkin emas degan narsalar ham aslida bo'ladigan tomonda. Vaziyatga qarab to'g'ri deb o'ylagan narsa keyinchalik noto'g'ri ekani ma'lum bo'lishi mumkin. Mas'uliyatli harakat qiladi shekilli, nega bunday natija chiqdi?"
      },
      grammar: {
        explanation: `-(으)ㄹ 리가 없다 — ...bo'lishi mumkin emas, albatta bunday emas

Tuzilish: [fe'l/sifat + (으)ㄹ 리가 없다]
• 그럴 리가 없어요. (Bunday bo'lishi mumkin emas.)
• 모를 리가 없어요. (Bilmasi mumkin emas — biladi.)
• 늦을 리가 없어요. (Kech qolishi mumkin emas.)

-(으)ㄹ지도 모르다 — ...bo'lishi ham mumkin, bilmaysan

• 실수를 했을지도 몰라요. (Xato qilgan bo'lishi ham mumkin.)
• 늦을지도 몰라요. (Kech qolishi ham mumkin.)

-(으)ㄹ 텐데 — ...bo'lsa kerak, ...bo'lishi kerak (taxmin + shart):
• 힘들 텐데 어떻게 버텼어요? (Qiyin bo'lsa kerak, qanday chiqqansiz?)`,
        examples: [
          { kr: '그가 거짓말을 할 리가 없어요. 항상 정직하거든요.', uz: "U yolg'on gapirishi mumkin emas. Doim halol-ku." },
          { kr: '이 결정이 잘못됐을지도 몰라요. 다시 생각해 볼게요.', uz: "Bu qaror noto'g'ri bo'lgan bo'lishi ham mumkin. Qaytadan o'ylab ko'raman." },
          { kr: '책임있는 행동을 했을 텐데 왜 비판을 받는 걸까요?', uz: "Mas'uliyatli harakat qildi shekilli, nega tanqid qilinmoqda?" },
          { kr: '그럴 리가 없는 일이 실제로 일어났어요.', uz: "Bo'lishi mumkin emas degan narsa aslida ro'y berdi." },
          { kr: '도덕적으로 옳은 행동이 항상 법적으로 옳을 리가 없어요.', uz: "Axloqan to'g'ri harakat har doim qonuniy bo'lishi mumkin emas." },
        ]
      },
      vocabulary: [
        { kr: '옳다', romanization: 'olta', uz: "to'g'ri" },
        { kr: '그르다', romanization: 'geureuda', uz: "noto'g'ri" },
        { kr: '판단', romanization: 'pandan', uz: 'qaror, hukm' },
        { kr: '선택', romanization: 'seonteok', uz: 'tanlov' },
        { kr: '책임', romanization: 'chaegim', uz: "mas'uliyat" },
        { kr: '도덕', romanization: 'dodeok', uz: 'axloq' },
        { kr: '행동', romanization: 'haengdong', uz: 'harakat, xulq' },
        { kr: '결과', romanization: 'gyeolgwa', uz: 'natija' },
        { kr: '영향', romanization: 'yeonghyang', uz: "ta'sir" },
        { kr: '판단하다', romanization: 'pandanhada', uz: 'baholamoq' },
        { kr: '비판하다', romanization: 'bipanhada', uz: 'tanqid qilmoq' },
        { kr: '존중하다', romanization: 'jonjunghada', uz: 'hurmat qilmoq' },
        { kr: '고려하다', romanization: 'goryeohada', uz: 'hisobga olmoq' },
        { kr: '정직하다', romanization: 'jeonjikhada', uz: 'halol, to\'g\'ri' },
        { kr: '공정하다', romanization: 'gongjeonghada', uz: 'adolatli' },
        { kr: '부당하다', romanization: 'budanghada', uz: 'adolatsiz, asossiz' },
        { kr: '합리적이다', romanization: 'hamnijeogida', uz: 'mantiqli, asosli' },
        { kr: '윤리', romanization: 'yulli', uz: 'etika, ma\'naviyat' },
        { kr: '가치', romanization: 'gachi', uz: 'qadriyat, qiymat' },
        { kr: '원칙', romanization: 'wonchik', uz: 'tamoyil, prinsip' },
      ],
      examples: [
        { kr: '그 사람이 그런 행동을 할 리가 없어요. 항상 도덕적이거든요.', uz: "O'sha odam bunday harakat qilishi mumkin emas. Doim axloqli-ku." },
        { kr: '상황에 따라 판단이 달라질지도 몰라요. 다양한 관점을 고려해야 해요.', uz: "Vaziyatga qarab baholash o'zgarishi mumkin. Xilma-xil nuqtai nazarni hisobga olish kerak." },
        { kr: '그것이 옳은 판단이었을 텐데 결과가 나쁘게 나왔네요.', uz: "Bu to'g'ri baho bo'lgan bo'lsa kerak, lekin natija yomon chiqdi-ku." },
        { kr: '책임있는 선택을 하는 것이 쉬울 리가 없어요.', uz: "Mas'uliyatli tanlov qilish oson bo'lishi mumkin emas." },
        { kr: '옳고 그름을 판단할 때 감정보다 이성을 사용하는 편이 좋아요.', uz: "To'g'ri va noto'g'rini baholashda his-tuyg'udan ko'ra aql-idrokni ishlatish tomoni yaxshi." },
      ],
      dialog: [
        { speaker: 'A', kr: '그 회사가 직원들을 그렇게 대우할 리가 없어요. 평판이 좋은데.', uz: "O'sha kompaniya xodimlarini shunday muomala qilishi mumkin emas. Obro'si yaxshi-ku." },
        { speaker: 'B', kr: '그렇게 생각했는데, 사실이라고 하더라고요. 믿을 수가 없어요.', uz: "Shunday deb o'ylagan edim, lekin haqiqat ekan. Ishona olmayapman." },
        { speaker: 'A', kr: '이유가 있었을지도 몰라요. 한쪽 이야기만 들으면 판단하기 어렵잖아요.', uz: "Sababi bo'lgan bo'lishi ham mumkin. Bir tomoning gapini eshitib baholash qiyin-ku." },
        { speaker: 'B', kr: '맞아요. 공정하게 판단하려면 양쪽 이야기를 다 들어야 할 텐데요.', uz: "To'g'ri. Adolatli baholash uchun ikki tomoning ham gapini eshitish kerak bo'lsa kerak." },
        { speaker: 'A', kr: '어쨌든 옳고 그름을 판단하는 건 항상 어려운 것 같아요.', uz: "Qanday bo'lmasin, to'g'ri va noto'g'rini baholash har doim qiyin shekilli." },
        { speaker: 'B', kr: '맞아요. 윤리적 판단은 항상 복잡한 편이에요.', uz: "To'g'ri. Etik baho har doim murakkab tomonda." },
      ],
      notes: [
        "-(으)ㄹ 리가 없다: ishonch bilan inkor: 그럴 리가 없어요(bunday bo'lishi mumkin emas).",
        "-(으)ㄹ지도 모르다: ehtimol: 늦을지도 몰라요(kech qolishi ham mumkin).",
        "-(으)ㄹ 텐데: taxmin + shart: 힘들 텐데(qiyin bo'lsa kerak), 알 텐데(biladi shekilli).",
        "도덕 vs 윤리: 도덕 (axloq, shaxsiy) vs 윤리 (etika, professional).",
        "공정하다 (adolatli) — muhim qadriyat: 공정한 사회(adolatli jamiyat).",
      ],
      games: {
        matchPairs: [
          { kr: '옳다', uz: "to'g'ri" },
          { kr: '그르다', uz: "noto'g'ri" },
          { kr: '책임', uz: "mas'uliyat" },
          { kr: '공정하다', uz: 'adolatli' },
          { kr: '정직하다', uz: 'halol' },
          { kr: '원칙', uz: 'tamoyil' },
        ],
        fillBlank: [
          { sentence: '그가 거짓말을 할 리가 ___.', answer: '없어요', options: ['없어요', '있어요', '해요', '돼요'], uz: "U yolg'on gapirishi mumkin emas." },
          { sentence: '이 결정이 잘못됐을지도 ___.', answer: '몰라요', options: ['몰라요', '알아요', '해요', '봐요'], uz: "Bu qaror noto'g'ri bo'lgan bo'lishi ham mumkin." },
          { sentence: '책임있는 행동을 했을 ___ 왜 비판받아요?', answer: '텐데', options: ['텐데', '때문에', '대신에', '반면에'], uz: "Mas'uliyatli harakat qildi shekilli, nega tanqid qilinmoqda?" },
          { sentence: '옳고 그름을 판단할 때 이성을 사용하는 편이 ___.', answer: '좋아요', options: ['좋아요', '나빠요', '어려워요', '싫어요'], uz: "To'g'ri va noto'g'rini baholashda aql-idrokni ishlatish tomoni yaxshi." },
          { sentence: '공정하게 판단하려면 양쪽 이야기를 들어야 할 ___.', answer: '텐데', options: ['텐데', '때문에', '대신에', '반면에'], uz: "Adolatli baholash uchun ikki tomoning gapini eshitish kerak bo'lsa kerak." },
        ],
        scramble: [
          { kr: '판단', uz: 'qaror' },
          { kr: '책임', uz: "mas'uliyat" },
          { kr: '도덕', uz: 'axloq' },
          { kr: '원칙', uz: 'tamoyil' },
          { kr: '가치', uz: 'qadriyat' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄹ 리가 없다' nimani anglatadi?", options: ['...bo\'lishi mumkin', '...bo\'lishi mumkin emas', '...bo\'ladi', '...bo\'lmasligi kerak'], correct_index: 1 },
      { question: "'-(으)ㄹ지도 모르다' nimani anglatadi?", options: ['aniq shunday', '...bo\'lishi ham mumkin (ehtimol)', 'hech qachon', 'doimo'], correct_index: 1 },
      { question: "'-(으)ㄹ 텐데' nimani anglatadi?", options: ['aniq shart', '...bo\'lsa kerak (taxmin + shart)', 'inkor', 'savol'], correct_index: 1 },
      { question: "'정직하다' nimani anglatadi?", options: ['adolatli', 'halol', 'mas\'uliyatli', 'mantiqli'], correct_index: 1 },
      { question: "'공정하다' nimani anglatadi?", options: ['halol', 'adolatli', 'mantiqli', 'axloqli'], correct_index: 1 },
      { question: "'윤리' nimani anglatadi?", options: ['axloq (shaxsiy)', 'etika, ma\'naviyat (professional)', 'huquq', 'qonun'], correct_index: 1 },
      { question: "'부당하다' nimani anglatadi?", options: ['adolatli', 'halol', 'adolatsiz, asossiz', 'mantiqli'], correct_index: 2 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 8: Qiziqarli dunyo
  // 흥미로운 세상
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 4, order_in_level: 8,
    title_kr: '흥미로운 세상',
    title_uz: 'Qiziqarli dunyo (turli hodisalar va sabablar)',
    is_free: false,
    content: {
      topic: {
        kr: '현대 세계에서는 다양한 흥미로운 현상이 일어납니다. 기술이 발전하는 데다가 생활 방식도 바뀌고 있어요. 이런 변화를 이해할 수밖에 없는 시대가 됐습니다. 정보가 빠르게 확산되는 반면에 거짓 정보도 늘어나는 편이에요.',
        uz: "Zamonaviy dunyoda xilma-xil qiziqarli hodisalar ro'y bermoqda. Texnologiya rivojlanishi bilan birga, hayot tarzi ham o'zgarmoqda. Bunday o'zgarishlarni tushunishdan boshqa iloj yo'q bo'lgan davr keldi. Ma'lumotlar tezda tarqaladigan bo'lsa-da, soxta ma'lumotlar ham ko'payadigan tomonda."
      },
      grammar: {
        explanation: `-(으)ㄹ 수밖에 없다 — ...dan boshqa iloj yo'q, muqarrar shunday

Tuzilish: [fe'l + (으)ㄹ 수밖에 없다]
• 인정할 수밖에 없어요. (Tan olishdan boshqa iloj yo'q.)
• 기다릴 수밖에 없었어요. (Kutishdan boshqa iloj yo'q edi.)

-(으)ㄴ/는 데다가 — ...ga qo'shimcha ravishda, ...bilan birga (ikkinchi fakt)

• 가격이 싼 데다가 품질도 좋아요. (Narxi arzon bo'lishi bilan birga sifati ham yaxshi.)
• 비가 오는 데다가 바람도 불어요. (Yomg'ir yog'ishiga qo'shimcha shamol ham esmoqda.)

-(으)ㄴ/는 반면에 (chuqur ishlatish):
• 기술이 발전하는 반면에 환경 문제도 심각해졌어요.`,
        examples: [
          { kr: '이 상황에서는 포기할 수밖에 없었어요.', uz: "Bu vaziyatda taslim bo'lishdan boshqa iloj yo'q edi." },
          { kr: '기술이 발전하는 데다가 인공지능까지 등장했어요.', uz: "Texnologiya rivojlanishiga qo'shimcha sun'iy intellekt ham paydo bo'ldi." },
          { kr: '정보가 빠른 반면에 거짓 정보도 빠르게 퍼지는 편이에요.', uz: "Ma'lumotlar tez bo'lgan holda, soxta ma'lumotlar ham tezda tarqaladigan tomonda." },
          { kr: '비용이 많이 드는 데다가 시간도 오래 걸려서 포기했어요.', uz: "Xarajat ko'p bo'lishiga qo'shimcha vaqt ham ko'p ketgani uchun voz kechdim." },
          { kr: '이 문제를 해결하지 않을 수밖에 없는 상황이에요.', uz: "Bu muammoni hal qilishdan boshqa iloj yo'q bo'lgan vaziyat." },
        ]
      },
      vocabulary: [
        { kr: '현상', romanization: 'hyeonsang', uz: 'hodisa' },
        { kr: '원인', romanization: 'wonin', uz: 'sabab' },
        { kr: '결과', romanization: 'gyeolgwa', uz: 'natija' },
        { kr: '변화', romanization: 'byeonhwa', uz: "o'zgarish" },
        { kr: '증가', romanization: 'jeungga', uz: 'oshish' },
        { kr: '감소', romanization: 'gamso', uz: 'kamayish' },
        { kr: '영향', romanization: 'yeonghyang', uz: "ta'sir" },
        { kr: '문제', romanization: 'munje', uz: 'muammo' },
        { kr: '해결', romanization: 'haegyeol', uz: 'yechim' },
        { kr: '급격히', romanization: 'geupgyeoki', uz: 'keskin, tezda' },
        { kr: '지속되다', romanization: 'jisoktdweda', uz: 'davom etmoq' },
        { kr: '발생하다', romanization: 'balsaenghada', uz: 'yuz bermoq, kelib chiqmoq' },
        { kr: '확대되다', romanization: 'hwakdaedweda', uz: 'kengaymoq' },
        { kr: '감소하다', romanization: 'gamsohada', uz: 'kamaymoq' },
        { kr: '인공지능', romanization: 'ingongjineung', uz: 'sun\'iy intellekt' },
        { kr: '기술', romanization: 'gisul', uz: 'texnologiya, mahorat' },
        { kr: '정보', romanization: 'jeongbo', uz: "ma'lumot" },
        { kr: '확산되다', romanization: 'hwaksandweda', uz: 'tarqalmoq' },
        { kr: '분석하다', romanization: 'bunseokhada', uz: 'tahlil qilmoq' },
        { kr: '예측하다', romanization: 'yecheukada', uz: 'bashorat qilmoq' },
      ],
      examples: [
        { kr: '기후 변화 문제는 전 세계가 함께 해결할 수밖에 없어요.', uz: "Iqlim o'zgarishi muammosi butun dunyo birgalikda hal qilishdan boshqa iloj yo'q." },
        { kr: '인터넷이 발달한 데다가 스마트폰까지 보급되어 정보 접근이 쉬워졌어요.', uz: "Internet rivojlanishiga qo'shimcha smartfonlar ham tarqalib, ma'lumotga kirish osonlashdi." },
        { kr: '현대인들은 정보가 너무 많은 반면에 진짜 정보를 찾기 어려운 편이에요.', uz: "Zamonaviy odamlar ma'lumot juda ko'p bo'lgan holda, haqiqiy ma'lumot topish qiyinadigan tomonda." },
        { kr: '이 현상은 사회가 발전할수록 더 복잡해질 수밖에 없어요.', uz: "Bu hodisa jamiyat rivojlangan sari murakkabroq bo'lishdan boshqa iloj yo'q." },
        { kr: '경제가 성장하는 데다가 기술도 발전해서 생활이 편리해졌어요.', uz: "Iqtisodiyot o'sishiga qo'shimcha texnologiya ham rivojlanib, hayot qulaylashdi." },
      ],
      dialog: [
        { speaker: 'A', kr: '요즘 가짜 뉴스 문제가 심각한 것 같아요.', uz: "Hozirda soxta yangiliklar muammosi jiddiy shekilli." },
        { speaker: 'B', kr: '맞아요. 인터넷이 발달한 데다가 SNS까지 있으니 거짓 정보가 빠르게 퍼질 수밖에 없어요.', uz: "To'g'ri. Internet rivojlanishiga qo'shimcha SNS ham bor, shuning uchun soxta ma'lumotlar tez tarqalishdan boshqa iloj yo'q." },
        { speaker: 'A', kr: '그걸 어떻게 해결해야 할까요?', uz: "Buni qanday hal qilish kerak?" },
        { speaker: 'B', kr: '미디어 리터러시 교육이 필요한 데다가 개인도 정보를 비판적으로 볼 수밖에 없어요.', uz: "Media savodxonlik ta'limi zarur bo'lishiga qo'shimcha shaxs ham ma'lumotni tanqidiy ko'rishdan boshqa iloj yo'q." },
        { speaker: 'A', kr: '기술이 발전하는 반면에 그에 따른 문제도 생기는 것 같아요.', uz: "Texnologiya rivojlanib borayotgan holda, unga mos muammolar ham kelib chiqmoqda shekilli." },
        { speaker: 'B', kr: '그래서 우리가 더 현명하게 기술을 사용할 수밖에 없는 시대예요.', uz: "Shuning uchun biz texnologiyani yanada dono ishlatishdan boshqa iloj yo'q bo'lgan davrda yashamoqdamiz." },
      ],
      notes: [
        "-(으)ㄹ 수밖에 없다: muqarrar: 기다릴 수밖에 없어요(kutishdan boshqa iloj yo'q).",
        "-(으)ㄴ/는 데다가: qo'shimcha holat: 가격이 싼 데다가(narxi arzon bo'lishiga qo'shimcha).",
        "인공지능 (AI) — sun'iy intellekt: zamonaviy mavzuda muhim so'z.",
        "미디어 리터러시 — media savodxonlik: soxta yangiliklarga qarshi muhim ko'nikma.",
        "확산되다 (tarqalmoq) vs 확대되다 (kengaymoq) — farqini bilish muhim.",
      ],
      games: {
        matchPairs: [
          { kr: '현상', uz: 'hodisa' },
          { kr: '원인', uz: 'sabab' },
          { kr: '증가', uz: 'oshish' },
          { kr: '감소', uz: 'kamayish' },
          { kr: '확산되다', uz: 'tarqalmoq' },
          { kr: '분석하다', uz: 'tahlil qilmoq' },
        ],
        fillBlank: [
          { sentence: '이 상황에서는 포기할 수밖에 ___.', answer: '없었어요', options: ['없었어요', '있었어요', '해요', '돼요'], uz: "Bu vaziyatda taslim bo'lishdan boshqa iloj yo'q edi." },
          { sentence: '기술이 발전하는 데다가 인공지능까지 ___.', answer: '등장했어요', options: ['등장했어요', '사라졌어요', '줄었어요', '멈췄어요'], uz: "Texnologiya rivojlanishiga qo'shimcha sun'iy intellekt ham paydo bo'ldi." },
          { sentence: '정보가 빠른 반면에 거짓 정보도 빠르게 ___.', answer: '퍼지는 편이에요', options: ['퍼지는 편이에요', '없어지는 편이에요', '줄어드는 편이에요', '좋아지는 편이에요'], uz: "Ma'lumotlar tez bo'lgan holda, soxta ma'lumotlar ham tezda tarqaladigan tomonda." },
          { sentence: '비용이 많이 드는 ___ 시간도 오래 걸려요.', answer: '데다가', options: ['데다가', '대신에', '반면에', '때문에'], uz: "Xarajat ko'p bo'lishiga qo'shimcha vaqt ham ko'p ketadi." },
          { sentence: '기후 변화 문제는 전 세계가 함께 해결할 수밖에 ___.', answer: '없어요', options: ['없어요', '있어요', '해요', '돼요'], uz: "Iqlim o'zgarishi muammosi butun dunyo birgalikda hal qilishdan boshqa iloj yo'q." },
        ],
        scramble: [
          { kr: '현상', uz: 'hodisa' },
          { kr: '원인', uz: 'sabab' },
          { kr: '결과', uz: 'natija' },
          { kr: '기술', uz: 'texnologiya' },
          { kr: '정보', uz: "ma'lumot" },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄹ 수밖에 없다' nimani anglatadi?", options: ['...qilmaslik mumkin', '...dan boshqa iloj yo\'q', '...qilish mumkin', '...qilmayman'], correct_index: 1 },
      { question: "'-(으)ㄴ/는 데다가' qanday ishlatiladi?", options: ['Sabab bildirish', 'Qo\'shimcha holat bildirish', 'Shart bildirish', 'Inkor bildirish'], correct_index: 1 },
      { question: "'현상' nimani anglatadi?", options: ['sabab', 'natija', 'hodisa', "o'zgarish"], correct_index: 2 },
      { question: "'확산되다' nimani anglatadi?", options: ['kengaymoq', 'tarqalmoq', 'kamaymoq', 'rivojlanmoq'], correct_index: 1 },
      { question: "'인공지능' nimani anglatadi?", options: ['sun\'iy ko\'z', 'sun\'iy intellekt', 'kompyuter', 'robot'], correct_index: 1 },
      { question: "'급격히' nimani anglatadi?", options: ["asta-sekin", 'doimo', 'keskin, tezda', "ba'zan"], correct_index: 2 },
      { question: "'예측하다' nimani anglatadi?", options: ['tahlil qilmoq', 'tushunmoq', 'bashorat qilmoq', "o'rganmoq"], correct_index: 2 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 9: Koreya ommaviy madaniyati
  // 한국의 대중문화
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 4, order_in_level: 9,
    title_kr: '한국의 대중문화',
    title_uz: "Koreya ommaviy madaniyati (K-pop, drama, kino)",
    is_free: false,
    content: {
      topic: {
        kr: 'K-pop과 한국 드라마가 세계적으로 인기를 끌고 있습니다. 한류가 확산되는 듯하며 그 영향력도 커지고 있어요. 한국 문화를 즐기는 사람들이 늘어날 정도로 영향력이 강해졌어요. 이런 현상이 계속될지도 모르겠어요.',
        uz: "K-pop va Koreya dramalari global miqyosda mashhurlik qozonmoqda. Hallyu tarqalayotgandek, uning ta'siri ham oshmoqda. Koreya madaniyatini zavqlanadigan odamlar ko'payadigan darajada ta'sir kuchaydi. Bu hodisa davom etishi ham mumkin."
      },
      grammar: {
        explanation: `-(으)ㄴ/는 듯하다 — ...ga o'xshaydi, ...dek ko'rinadi (taxmin)

Tuzilish:
• 현재: V + 는 듯해요: 좋아하는 듯해요 (yoqtiradek ko'rinadi)
• 과거: V + (으)ㄴ 듯해요: 갔을 듯해요 (borgandek ko'rinadi)
• 사/형용사: A + (으)ㄴ 듯해요: 비싼 듯해요 (qimmatligi yabi ko'rinadi)

-(으)ㄹ 정도로 — ...darajada, ...qadar (miqdor ko'rsatish)

• 말할 수 없을 정도로 감동적이에요. (So'z bilan ifodlab bo'lmaydigan darajada ta'sirli.)
• 눈물이 날 정도로 아름다운 음악이에요. (Ko'z yoshi keladigan darajada go'zal musiqa.)

-(으)ㄴ/는 대신에 (chuqur ishlatish):
• K-pop이 유행하는 대신에 전통 음악은 줄어드는 편이에요.`,
        examples: [
          { kr: 'K-pop이 전 세계적으로 인기를 끄는 듯해요.', uz: "K-pop butun dunyoda mashhurlik qozonayotgandek ko'rinadi." },
          { kr: '한국 드라마가 믿을 수 없을 정도로 인기가 높아졌어요.', uz: "Koreya dramalari ishonib bo'lmaydigan darajada mashhur bo'ldi." },
          { kr: '한류의 영향으로 한국어를 배우는 사람이 늘어난 듯해요.', uz: "Hallyu ta'sirida koreys tili o'rganuvchilar ko'payganday ko'rinadi." },
          { kr: 'K-드라마가 인기를 끄는 대신에 외국 드라마는 관심이 줄어든 편이에요.', uz: "K-drama mashhurlik qozongan holda, xorijiy dramalar qiziqish kamaygan tomonda." },
          { kr: '이 가수는 노래를 잘할 정도로 훈련을 많이 받은 듯해요.', uz: "Bu qo'shiqchi yaxshi kuylaydiganday ko'cha'a etishgan bo'lib ko'rinadi." },
        ]
      },
      vocabulary: [
        { kr: '대중문화', romanization: 'daejungmunhwa', uz: 'ommaviy madaniyat' },
        { kr: '인기', romanization: 'ingi', uz: 'mashhurlik' },
        { kr: '영향', romanization: 'yeonghyang', uz: "ta'sir" },
        { kr: '확산', romanization: 'hwaksan', uz: 'tarqalish' },
        { kr: '콘텐츠', romanization: 'kontencheu', uz: 'kontent' },
        { kr: '특징', romanization: 'teukjing', uz: 'xususiyat' },
        { kr: '매력', romanization: 'maeryeok', uz: 'joziba' },
        { kr: '글로벌', romanization: 'geulllobeol', uz: 'global' },
        { kr: '발전하다', romanization: 'baljeonhada', uz: 'rivojlanmoq' },
        { kr: '소비하다', romanization: 'sobihada', uz: "iste'mol qilmoq" },
        { kr: '긍정적이다', romanization: 'geungjjeongjeogida', uz: 'ijobiy' },
        { kr: '부정적이다', romanization: 'bujeongjeogida', uz: 'salbiy' },
        { kr: '팬덤', romanization: 'paendeom', uz: 'hayranlar jamiyati (fandom)' },
        { kr: '스트리밍', romanization: 'seuteuriming', uz: 'streaming' },
        { kr: '유행하다', romanization: 'yuhaenghada', uz: 'moda bo\'lmoq, tarqalmoq' },
        { kr: '문화 교류', romanization: 'munhwa gyoryu', uz: 'madaniy almashish' },
        { kr: '영향력', romanization: 'yeonghyangnnyeok', uz: "ta'sir kuchi" },
        { kr: '세계화', romanization: 'segyehwa', uz: 'globallashuv' },
        { kr: '수출하다', romanization: 'suchulhada', uz: 'eksport qilmoq' },
        { kr: '이미지', romanization: 'imiji', uz: 'imij, obraz' },
      ],
      examples: [
        { kr: 'BTS의 영향으로 한국어를 배우려는 사람이 크게 늘어난 듯해요.', uz: "BTS ta'sirida koreys tili o'rganmoqchi bo'lganlar sezilarli darajada ko'payganday ko'rinadi." },
        { kr: '한국 드라마는 감동적일 정도로 이야기가 좋은 편이에요.', uz: "Koreya dramalari ta'sirli bo'ladigan darajada syujet yaxshi tomonda." },
        { kr: '한류가 확산되는 듯하며 이제는 전 세계에서 즐기고 있어요.', uz: "Hallyu tarqalayotgandek, endi butun dunyoda zavqlanmoqda." },
        { kr: 'K-pop이 인기를 끄는 대신에 전통 음악은 덜 알려지는 편이에요.', uz: "K-pop mashhurlik qozongan holda, an'anaviy musiqa kamroq tanilgan tomonda." },
        { kr: '한국 음식이 세계화될 정도로 인기가 높아진 듯해요.', uz: "Koreya ovqatlari globallashtiriladigan darajada mashhurlik oshganday ko'rinadi." },
      ],
      dialog: [
        { speaker: 'A', kr: '요즘 K-pop이 정말 전 세계적으로 인기를 끄는 것 같아요.', uz: "Hozirda K-pop juda butun dunyoda mashhurlik qozonayotgandek ko'rinadi." },
        { speaker: 'B', kr: '맞아요. 믿기 어려울 정도로 빠르게 확산된 듯해요. 10년 전만 해도 이럴 줄 몰랐잖아요.', uz: "To'g'ri. Ishonib bo'lmaydigan darajada tez tarqalganday ko'rinadi. 10 yil oldin bunday bo'lishini bilmaganmiz-ku." },
        { speaker: 'A', kr: '한국어를 배우는 사람도 많이 늘어난 듯하더라고요.', uz: "Koreys tilini o'rganuvchilar ham ko'p ko'payganday ko'rinadi." },
        { speaker: 'B', kr: '네, 한류의 긍정적인 영향인 것 같아요. 문화 교류도 활발해진 편이에요.', uz: "Ha, Hallyuning ijobiy ta'siri shekilli. Madaniy almashish ham faollashgan tomonda." },
        { speaker: 'A', kr: '반면에 부정적인 면도 있지 않을까요?', uz: "Lekin salbiy jihatlari ham bormasmikan?" },
        { speaker: 'B', kr: '물론이죠. 전통 문화가 덜 주목받는 대신에 K-pop이 주목을 받는 편이에요. 균형이 중요한 것 같아요.', uz: "Albatta. An'anaviy madaniyat kamroq e'tibor oladigan holda K-pop e'tibor qozongan tomonda. Muvozanat muhim shekilli." },
      ],
      notes: [
        "-(으)ㄴ/는 듯하다: taxmin yoki ko'rinish: 좋아하는 듯해요(yoqtiradek ko'rinadi).",
        "-(으)ㄹ 정도로: ...darajada: 믿을 수 없을 정도로(ishonib bo'lmaydigan darajada).",
        "한류 (Hallyu) — so'zma-so'z: 'Koreya to'lqini' — K-pop, drama, kino, ovqat, ko'rinish.",
        "팬덤 (fandom) — hayranlar jamiyati: BTS팬덤 = ARMY.",
        "세계화 (globallashuv) — madaniyat ham globallashadi: 한국 문화의 세계화.",
      ],
      games: {
        matchPairs: [
          { kr: '대중문화', uz: 'ommaviy madaniyat' },
          { kr: '팬덤', uz: 'hayranlar jamiyati' },
          { kr: '영향력', uz: "ta'sir kuchi" },
          { kr: '세계화', uz: 'globallashuv' },
          { kr: '긍정적이다', uz: 'ijobiy' },
          { kr: '부정적이다', uz: 'salbiy' },
        ],
        fillBlank: [
          { sentence: 'K-pop이 전 세계적으로 인기를 끄는 ___.', answer: '듯해요', options: ['듯해요', '것이에요', '편이에요', '만해요'], uz: "K-pop butun dunyoda mashhurlik qozonayotgandek ko'rinadi." },
          { sentence: '한국 드라마가 믿을 수 없을 ___ 인기가 높아졌어요.', answer: '정도로', options: ['정도로', '대신에', '때문에', '반면에'], uz: "Koreya dramalari ishonib bo'lmaydigan darajada mashhur bo'ldi." },
          { sentence: '한류의 영향으로 한국어를 배우는 사람이 늘어난 ___.', answer: '듯해요', options: ['듯해요', '것이에요', '편이에요', '만해요'], uz: "Hallyu ta'sirida koreys tili o'rganuvchilar ko'payganday ko'rinadi." },
          { sentence: 'K-pop이 인기를 끄는 ___ 전통 음악은 덜 알려지는 편이에요.', answer: '대신에', options: ['대신에', '데다가', '때문에', '반면에'], uz: "K-pop mashhurlik qozongan holda, an'anaviy musiqa kamroq tanilgan tomonda." },
          { sentence: '한국 음식이 세계화될 ___ 인기가 높아진 듯해요.', answer: '정도로', options: ['정도로', '대신에', '때문에', '반면에'], uz: "Koreya ovqatlari globallashtiriladigan darajada mashhurlik oshganday ko'rinadi." },
        ],
        scramble: [
          { kr: '인기', uz: 'mashhurlik' },
          { kr: '영향', uz: "ta'sir" },
          { kr: '확산', uz: 'tarqalish' },
          { kr: '매력', uz: 'joziba' },
          { kr: '콘텐츠', uz: 'kontent' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄴ/는 듯하다' nimani anglatadi?", options: ['aniq shunday', '...ga o\'xshaydi, ...dek ko\'rinadi', 'hech qachon shunday emas', 'albatta shunday'], correct_index: 1 },
      { question: "'-(으)ㄹ 정도로' qanday ishlatiladi?", options: ['Sabab bildirish', '...darajada, miqdor ko\'rsatish', 'Shart bildirish', 'Inkor bildirish'], correct_index: 1 },
      { question: "'한류' nimani anglatadi?", options: ['Koreya ovqati', 'Koreya madaniyat to\'lqini', 'Koreya tili', 'Koreya tarixi'], correct_index: 1 },
      { question: "'팬덤' nimani anglatadi?", options: ['musiqa', 'konsert', 'hayranlar jamiyati', 'kino'], correct_index: 2 },
      { question: "'긍정적이다' nimani anglatadi?", options: ['salbiy', 'ijobiy', 'neytral', 'muhim'], correct_index: 1 },
      { question: "'세계화' nimani anglatadi?", options: ['Koreya tarixi', 'globallashuv', 'madaniy almashish', 'eksport'], correct_index: 1 },
      { question: "'유행하다' nimani anglatadi?", options: ['yo\'qolmoq', 'moda bo\'lmoq, tarqalmoq', 'o\'zgarmoq', 'rivojlanmoq'], correct_index: 1 },
    ]
  },

  // ════════════════════════════════════════════
  // DARS 10: Atrof-muhit muammolari va yechimlar
  // 환경 문제와 해결 방안
  // ════════════════════════════════════════════
  {
    track: 'TOPIK', level: 4, order_in_level: 10,
    title_kr: '환경 문제와 해결 방안',
    title_uz: 'Atrof-muhit muammolari va yechimlar',
    is_free: false,
    content: {
      topic: {
        kr: '환경 문제는 점점 심각해지는 것으로 보입니다. 이 문제는 해결해야 할 필요가 있습니다. 재활용을 하는 편이 환경에 도움이 됩니다. 환경 오염이 심해질수록 우리가 더 적극적으로 행동해야 해요.',
        uz: "Atrof-muhit muammolari tobora og'irroq bo'layotganday ko'rinmoqda. Bu muammoni hal qilish zaruriyati bor. Qayta ishlash tomoni atrof-muhitga yordam beradi. Atrof-muhit ifloslangan sari biz yanada faolroq harakat qilishimiz kerak."
      },
      grammar: {
        explanation: `-(으)ㄴ/는 것으로 보이다 — ...dek ko'rinmoqda (kuzatish asosida taxmin)

Tuzilish:
• 현재: V + 는 것으로 보입니다: 심각해지는 것으로 보입니다
• 과거: V + (으)ㄴ 것으로 보입니다: 증가한 것으로 보입니다

-(으)ㄹ 필요가 있다 — ...zaruriyati bor, ...kerak

• 이 문제를 해결할 필요가 있어요. (Bu muammoni hal qilish zaruriyati bor.)
• 더 많은 연구가 필요한 편이에요. (Ko'proq tadqiqot zarur tomonda.)

-(으)ㄴ/는 편이다 (논리 연결 — mantiqiy bog'lash):
환경을 보호하는 편이 장기적으로 더 이익인 셈이에요.`,
        examples: [
          { kr: '환경 문제가 점점 심각해지는 것으로 보입니다.', uz: "Atrof-muhit muammolari tobora og'irroq bo'layotganday ko'rinmoqda." },
          { kr: '재생에너지를 활용할 필요가 있어요.', uz: "Qayta tiklanadigan energiyadan foydalanish zaruriyati bor." },
          { kr: '탄소 배출이 증가한 것으로 보여 대책이 필요해요.', uz: "Karbon chiqindilari oshganday ko'rinib, chora kerak." },
          { kr: '환경을 보호하는 편이 미래 세대를 위해 중요한 셈이에요.', uz: "Atrof-muhitni himoya qilish tomoni kelajak avlodlar uchun muhim hisoblanadi." },
          { kr: '개인의 작은 실천이 쌓일수록 큰 변화가 나타나는 것으로 보입니다.', uz: "Shaxsning kichik amaliyoti to'plangan sari katta o'zgarish namoyon bo'ladigan ko'rinmoqda." },
        ]
      },
      vocabulary: [
        { kr: '환경 문제', romanization: 'hwangyeong munje', uz: 'ekologik muammo' },
        { kr: '오염', romanization: 'oyeom', uz: 'ifloslanish' },
        { kr: '자원', romanization: 'jawon', uz: 'resurs' },
        { kr: '부족', romanization: 'bujok', uz: 'yetishmovchilik' },
        { kr: '해결 방안', romanization: 'haegyeol bangan', uz: 'yechim' },
        { kr: '보호하다', romanization: 'bohohada', uz: 'himoya qilmoq' },
        { kr: '줄이다', romanization: 'jurida', uz: 'kamaytirmoq' },
        { kr: '재활용', romanization: 'jaehwalyong', uz: 'qayta ishlash' },
        { kr: '책임', romanization: 'chaegim', uz: "mas'uliyat" },
        { kr: '심각하다', romanization: 'simgakada', uz: 'jiddiy' },
        { kr: '개선하다', romanization: 'gaeseonhada', uz: 'yaxshilamoq' },
        { kr: '정책', romanization: 'jeongchaek', uz: 'siyosat' },
        { kr: '실천하다', romanization: 'silcheonhada', uz: 'amalga oshirmoq' },
        { kr: '탄소', romanization: 'tanso', uz: 'karbon' },
        { kr: '배출하다', romanization: 'baechulhada', uz: 'chiqarmoq, chiqindi chiqarmoq' },
        { kr: '재생에너지', romanization: 'jaesaengeneoji', uz: 'qayta tiklanadigan energiya' },
        { kr: '기후 변화', romanization: 'gihu byeonhwa', uz: "iqlim o'zgarishi" },
        { kr: '생태계', romanization: 'saengtaegye', uz: 'ekotizim' },
        { kr: '지속가능하다', romanization: 'jisokganeunghada', uz: 'barqaror, davomli' },
        { kr: '미래 세대', romanization: 'mirae sede', uz: 'kelajak avlod' },
      ],
      examples: [
        { kr: '기후 변화로 인해 자연재해가 증가하는 것으로 보여요.', uz: "Iqlim o'zgarishi tufayli tabiiy ofatlar ko'payayotganday ko'rinmoqda." },
        { kr: '플라스틱 사용을 줄일 필요가 있어요. 바다 오염이 심각하거든요.', uz: "Plastik ishlatishni kamaytirish zaruriyati bor. Okean ifloslangani jiddiy-ku." },
        { kr: '환경 보호는 개인과 정부 모두의 책임인 것으로 보입니다.', uz: "Atrof-muhitni himoya qilish shaxs va hukumat ikkalasining mas'uliyatidek ko'rinmoqda." },
        { kr: '재생에너지를 더 많이 사용할수록 탄소 배출이 줄어드는 편이에요.', uz: "Qayta tiklanadigan energiyani ko'proq ishlatgan sari karbon chiqindilari kamayidigan tomonda." },
        { kr: '지속가능한 개발이 필요한 데다가 미래 세대를 위한 책임도 있어요.', uz: "Barqaror rivojlanish zarur bo'lishiga qo'shimcha kelajak avlodlar uchun mas'uliyat ham bor." },
      ],
      dialog: [
        { speaker: 'A', kr: '요즘 환경 문제가 정말 심각해지는 것 같아요.', uz: "Hozirda atrof-muhit muammolari juda og'irlashayotgandek ko'rinadi." },
        { speaker: 'B', kr: '맞아요. 데이터를 보면 기온이 계속 상승하는 것으로 보여요.', uz: "To'g'ri. Ma'lumotlarga qaraganda, harorat doim ko'tarilayotganday ko'rinmoqda." },
        { speaker: 'A', kr: '개인이 할 수 있는 일이 있을까요?', uz: "Shaxs qila oladigan narsalar bormi?" },
        { speaker: 'B', kr: '물론이죠. 재활용을 하고 대중교통을 이용할 필요가 있어요. 작은 실천도 큰 변화를 만들 수 있는 편이에요.', uz: "Albatta. Qayta ishlash va jamoat transportidan foydalanish zaruriyati bor. Kichik amaliyot ham katta o'zgarish yaratishi mumkin tomonda." },
        { speaker: 'A', kr: '정부의 정책도 중요하지 않나요?', uz: "Hukumat siyosati ham muhim emasmi?" },
        { speaker: 'B', kr: '당연히 중요해요. 하지만 개인의 인식이 바뀔수록 더 좋은 정책이 나오는 것으로 보여요.', uz: "Albatta muhim. Lekin shaxsning ongi o'zgargan sari yaxshiroq siyosat paydo bo'ladigan ko'rinmoqda." },
      ],
      notes: [
        "-(으)ㄴ/는 것으로 보이다: kuzatish asosida taxmin: 심각해지는 것으로 보입니다.",
        "-(으)ㄹ 필요가 있다: zaruriyat: 줄일 필요가 있어요(kamaytirish zaruriyati bor).",
        "지속가능한 개발 (barqaror rivojlanish) — SDG: sustainable development.",
        "재생에너지 (qayta tiklanadigan energiya): quyosh, shamol, suv energiyasi.",
        "탄소 중립 (karbon neytrallik) — zamonaviy ekologik maqsad.",
      ],
      games: {
        matchPairs: [
          { kr: '오염', uz: 'ifloslanish' },
          { kr: '재활용', uz: 'qayta ishlash' },
          { kr: '보호하다', uz: 'himoya qilmoq' },
          { kr: '심각하다', uz: 'jiddiy' },
          { kr: '실천하다', uz: 'amalga oshirmoq' },
          { kr: '지속가능하다', uz: 'barqaror' },
        ],
        fillBlank: [
          { sentence: '환경 문제가 점점 심각해지는 것으로 ___.', answer: '보입니다', options: ['보입니다', '해요', '돼요', '봐요'], uz: "Atrof-muhit muammolari tobora og'irroq bo'layotganday ko'rinmoqda." },
          { sentence: '재생에너지를 활용할 필요가 ___.', answer: '있어요', options: ['있어요', '없어요', '해요', '돼요'], uz: "Qayta tiklanadigan energiyadan foydalanish zaruriyati bor." },
          { sentence: '재생에너지를 더 많이 사용할수록 탄소 배출이 줄어드는 ___.', answer: '편이에요', options: ['편이에요', '것이에요', '만이에요', '수이에요'], uz: "Qayta tiklanadigan energiyani ko'proq ishlatgan sari karbon chiqindilari kamayidigan tomonda." },
          { sentence: '환경을 보호하는 편이 미래 세대를 위해 중요한 ___.', answer: '셈이에요', options: ['셈이에요', '편이에요', '것이에요', '만해요'], uz: "Atrof-muhitni himoya qilish tomoni kelajak avlodlar uchun muhim hisoblanadi." },
          { sentence: '지속가능한 개발이 필요한 ___ 미래 세대를 위한 책임도 있어요.', answer: '데다가', options: ['데다가', '대신에', '반면에', '때문에'], uz: "Barqaror rivojlanish zarur bo'lishiga qo'shimcha kelajak avlodlar uchun mas'uliyat ham bor." },
        ],
        scramble: [
          { kr: '환경', uz: 'atrof-muhit' },
          { kr: '오염', uz: 'ifloslanish' },
          { kr: '자원', uz: 'resurs' },
          { kr: '정책', uz: 'siyosat' },
          { kr: '실천', uz: 'amaliyot' },
        ],
      },
    },
    quiz: [
      { question: "'-(으)ㄴ/는 것으로 보이다' nimani anglatadi?", options: ['aniq shunday', 'kuzatish asosida shunday dek ko\'rinmoqda', 'hech qachon shunday emas', 'buyruq berish'], correct_index: 1 },
      { question: "'-(으)ㄹ 필요가 있다' nimani anglatadi?", options: ['...mumkin', '...zaruriyati bor, kerak', '...mumkin emas', '...shart emas'], correct_index: 1 },
      { question: "'재활용' nimani anglatadi?", options: ['qayta sotish', 'qayta ishlash', 'qayta sotib olish', 'qayta topish'], correct_index: 1 },
      { question: "'지속가능하다' nimani anglatadi?", options: ['qisqa muddatli', 'barqaror, davomli', 'qimmat', 'yangi'], correct_index: 1 },
      { question: "'탄소' nimani anglatadi?", options: ['kislorod', 'karbon', 'suv', 'havo'], correct_index: 1 },
      { question: "'심각하다' nimani anglatadi?", options: ['oson', 'jiddiy', 'oddiy', 'kichik'], correct_index: 1 },
      { question: "'실천하다' nimani anglatadi?", options: ["o'rganmoq", 'o\'ylamoq', 'amalga oshirmoq', 'tavsiya qilmoq'], correct_index: 2 },
    ]
  },

];

// ════════════════════════════════════════════
// DB ga saqlash
// ════════════════════════════════════════════
async function seed() {
  console.log('TOPIK 4-daraja seed boshlandi...\n');

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

  console.log('\n✅ TOPIK 4-daraja seed muvaffaqiyatli yakunlandi!');
  console.log(`   Jami: ${LESSONS.length} ta dars`);
  await db.end();
}

seed().catch(err => {
  console.error('❌ Xatolik:', err.message);
  process.exit(1);
});
