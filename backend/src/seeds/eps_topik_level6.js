// backend/src/seeds/eps_topik_level6.js
// EPS-TOPIK 6-daraja: 10 ta to'liq dars (Lesson 51-60)
// Manba: Eps-Topik2_41-60.docx (51-60 mavzular)
// Audio URL: {CDN_URL}/{lessonId}-{key}.mp3 — Edge TTS (ko-KR-SunHiNeural)
// PC / iOS / Android — to'liq ishlaydigan
// Usage: node src/seeds/eps_topik_level6.js

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
  // DARS 51: 숙박 서비스 — Mehmonxona xizmati
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 6, order_in_level: 1,
    title_kr: '숙박 서비스 — 객실 정비',
    title_uz: "Mehmonxona xizmati — Xona tayyorlash",
    is_free: true,
    content: {
      topic: {
        kr: '객실 정비는 다 했어요? 네, 청소했다가 침대를 정리했습니다. 문제는 없었어요? 에어컨이 고장 나서 보고했습니다. 수건과 이불을 교체했습니다. 손님이 오기 전에 모두 확인해야 합니다.',
        uz: "Xonani tayyorlab bo'ldingizmi? Ha, tozalab, keyin karavotni tartibga keltirdim. Muammo yo'qmi? Konditsioner buzilgan edi, xabar berdim. Sochiq va ko'rpa almashtirildi. Mehmon kelishidan oldin hammasi tekshirilishi kerak."
      },
      grammar: {
        explanation: `-았다가/었다가 — "...qilib, keyin ..." (ketma-ket harakat, ba'zan o'zgarish)

Tuzilish: [fe'l + 았다가/었다가] + [keyingi fe'l]

• 청소했다가 쉬었습니다
  → Tozalab, keyin dam oldim
• 확인했다가 보고했습니다
  → Tekshirib, keyin xabar berdim
• 앉았다가 일어났습니다
  → O'tirib, keyin turdim

💡 -았다가/었다가 vs -고 나서:
고 나서  = tartibli ketma-ketlik
았다가   = ko'pincha birinchi holat o'zgarishi bilan

반말 (norasmiy nutq) — do'stona gapirish

존댓말 → 반말:
• 갑니다 → 가
• 먹었어요 → 먹었어
• 뭐 해요? → 뭐 해?
• 괜찮아요 → 괜찮아

💡 반말: yosh tengdoshlar, yaqin do'stlar orasida
Ish joyida: HAMMA VAQT 존댓말 ishlatiladi`,
        examples: [
          { kr: '청소했다가 시트를 교체했습니다.',                    uz: "Tozalab, keyin choyshabni almashtirgim." },
          { kr: '비품을 확인했다가 부족한 것을 보고했습니다.',         uz: "Jihozlarni tekshirib, yetishmayotganini xabar berdim." },
          { kr: '방을 정리했다가 고장 난 에어컨을 발견했습니다.',      uz: "Xonani tartibga keltirardim, nosoz konditsionerni topdim." },
          { kr: '수건을 교체했다가 세면도구도 새것으로 바꿨습니다.',    uz: "Sochiqni almashtirib, gigiyena vositalarini ham yangisiga o'zgartirdim." },
          { kr: '문제가 생겼다가 바로 프런트에 알렸습니다.',           uz: "Muammo yuzaga kelib, darhol resepsiyonga xabar berdim." },
        ]
      },
      vocabulary: [
        { kr: '호텔',     romanization: 'hotel',         uz: 'mehmonxona' },
        { kr: '비품',     romanization: 'bipum',         uz: 'jihozlar, buyumlar' },
        { kr: '수건',     romanization: 'sugeon',        uz: 'sochiq' },
        { kr: '침대',     romanization: 'chimdae',       uz: 'karavot' },
        { kr: '이불',     romanization: 'ibul',          uz: "ko'rpa" },
        { kr: '베개',     romanization: 'begae',         uz: 'yostiq' },
        { kr: '세면도구', romanization: 'semyeondogu',   uz: 'gigiyena vositalari' },
        { kr: '교체하다', romanization: 'gyochaehada',   uz: 'almashtirmoq' },
        { kr: '객실',     romanization: 'gaeksil',       uz: 'xona (mehmonxonada)' },
        { kr: '정비하다', romanization: 'jeongbihada',   uz: 'tartibga keltirmoq' },
        { kr: '청소하다', romanization: 'cheongsohada',  uz: 'tozalamoq' },
        { kr: '정리하다', romanization: 'jeongrihada',   uz: "yig'ishtirmoq" },
        { kr: '확인하다', romanization: 'hwaginhada',    uz: 'tekshirmoq' },
        { kr: '고장',     romanization: 'gojang',        uz: 'nosozlik' },
        { kr: '보고하다', romanization: 'bogohada',      uz: 'xabar bermoq' },
        { kr: '프런트',   romanization: 'peurenteu',     uz: 'resepsiya' },
        { kr: '체크인',   romanization: 'chekein',       uz: 'check-in' },
        { kr: '체크아웃', romanization: 'chekaut',       uz: 'check-out' },
        { kr: '손님',     romanization: 'sonnim',        uz: 'mehmon' },
        { kr: '시트',     romanization: 'siteu',         uz: 'choyshab' },
      ],
      examples: [
        { kr: '객실 청소를 마쳤다가 새 수건과 이불을 교체했습니다.',       uz: "Xonani tozalashni tugatiib, yangi sochiq va ko'rpa almashtiribdim." },
        { kr: '에어컨을 확인했다가 고장난 것을 발견해서 바로 보고했습니다.', uz: "Konditsionerni tekshirardim, nosozligini topib darhol xabar berdim." },
        { kr: '손님이 오기 전에 객실 상태를 모두 점검해야 합니다.',         uz: "Mehmon kelishidan oldin xona holati to'liq tekshirilishi kerak." },
        { kr: '세면도구가 부족했다가 비품실에서 가져와서 보충했습니다.',    uz: "Gigiyena vositalari yetishmasdi, jihozlar xonasidan olib to'ldirdim." },
        { kr: '체크아웃 후에는 즉시 객실 정비를 시작해야 합니다.',         uz: "Check-out dan keyin darhol xona tayyorlash boshlanishi kerak." },
      ],
      dialog: [
        { speaker: 'A', kr: '객실 정비는 다 했어요?',                    uz: "Xonani tayyorlab bo'ldingizmi?" },
        { speaker: 'B', kr: '네, 청소했다가 침대를 정리했습니다.',        uz: "Ha, tozalab, keyin karavotni tartibga keltirdim." },
        { speaker: 'A', kr: '비품은 다 교체했어요?',                     uz: "Jihozlar almastirildi-mi?" },
        { speaker: 'B', kr: '수건이랑 이불은 교체했다가 세면도구도 확인했습니다.', uz: "Sochiq va ko'rpa almashtirib, gigiyena vositalarini ham tekshirdim." },
        { speaker: 'A', kr: '문제는 없었어요?',                          uz: "Muammo yo'qmi?" },
        { speaker: 'B', kr: '에어컨이 고장 나서 바로 보고했습니다.',      uz: "Konditsioner nosoz bo'lgani uchun darhol xabar berdim." },
      ],
      notes: [
        "-았다가/었다가: ketma-ket harakat: 청소했다가 정리했습니다(tozalab, tartibladim).",
        "반말 faqat tengdosh yoki yaqin do'stlar orasida; ish joyida 존댓말 majburiy.",
        "객실 정비 tartibi: 체크아웃 → 청소 → 이불/수건 교체 → 비품 확인 → 보고.",
        "고장 났을 때: darhol 프런트 yoki 관리자 ga xabar berish — mehmonxona qoidasi.",
        "한국 관광 sanoati: xizmat sifati va tozalik birinchi o'rinda.",
      ],
      games: {
        matchPairs: [
          { kr: '수건',   uz: 'sochiq' },
          { kr: '침대',   uz: 'karavot' },
          { kr: '이불',   uz: "ko'rpa" },
          { kr: '객실',   uz: 'xona' },
          { kr: '고장',   uz: 'nosozlik' },
          { kr: '프런트', uz: 'resepsiya' },
        ],
        fillBlank: [
          { sentence: '청소했다___ 침대를 정리했습니다.',          answer: '가',    options: ['가','서','고','면'],             uz: "Tozalab, karavotni tartibladim." },
          { sentence: '에어컨이 고장 나서 바로 ___ 했습니다.',     answer: '보고',  options: ['보고','청소','교체','정리'],     uz: "Konditsioner nosoz, darhol xabar berdim." },
          { sentence: '수건이랑 이불을 ___ 했습니다.',             answer: '교체',  options: ['교체','청소','보고','확인'],     uz: "Sochiq va ko'rpani almashtiirdim." },
          { sentence: '확인했다가 ___ 도 새것으로 바꿨습니다.',    answer: '세면도구',options: ['세면도구','침대','호텔','손님'], uz: "Tekshirib, gigiyena vositalarini ham yangisiga o'zgartirdim." },
          { sentence: '손님이 오기 ___ 에 확인해야 합니다.',       answer: '전',    options: ['전','후','중','동안'],           uz: "Mehmon kelishidan oldin tekshirish kerak." },
        ],
        scramble: [
          { kr: '수건',   uz: 'sochiq' },
          { kr: '침대',   uz: 'karavot' },
          { kr: '객실',   uz: 'xona' },
          { kr: '비품',   uz: 'jihozlar' },
          { kr: '청소',   uz: 'tozalash' },
        ],
      },
    },
    quiz: [
      { question: "'-았다가/었다가' nimani bildiradi?",          options: ['bir vaqtda','...qilib keyin... (ketma-ket)','sababli','lekin'],          correct_index: 1 },
      { question: "'반말' qachon ishlatiladi?",                 options: ['ish joyida hamisha','katta yoshlilarga','tengdosh/yaqin do\'st orasida','rahbarlarga'], correct_index: 2 },
      { question: "'비품' nimani anglatadi?",                   options: ['sochiq','karavot','jihozlar, buyumlar','xona'],                           correct_index: 2 },
      { question: "'교체하다' nimani anglatadi?",               options: ['tekshirmoq','xabar bermoq','almashtirmoq','tozalamoq'],                   correct_index: 2 },
      { question: "Xona nosozligi topilganda nima qilish kerak?", options: ['jim turish','o\'zi tuzatish','darhol resepsiyonga xabar berish','mehmonni kutish'], correct_index: 2 },
      { question: "'프런트' nimani anglatadi?",                 options: ['xona','ombor','resepsiya','lift'],                                        correct_index: 2 },
      { question: "Xona tayyorlash tartibi to'g'ri qaysi?",    options: ['tayyorlash→tozalash→almashtirish','tozalash→almashtirish→tekshirish→xabar','almashtirish→tozalash','tekshirish→tozalash'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 52: 음식 조리 — Ovqat tayyorlash
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 6, order_in_level: 2,
    title_kr: '음식 조리 — 식자재 관리와 위생',
    title_uz: "Ovqat tayyorlash — Oziq-ovqat boshqaruvi va gigiyena",
    is_free: true,
    content: {
      topic: {
        kr: '식자재는 어떻게 관리합니까? 신선하게 보관하고 유통기한을 확인합니다. 유통기한을 확인했어야 했는데 놓쳤습니다. 냉장고에 넣은 지 이틀 됐습니다. 요리를 시작한 지 1년 됐습니다.',
        uz: "Oziq-ovqat qanday boshqariladi? Yangi holda saqlanadi va muddati tekshiriladi. Muddatni tekshirishim kerak edi, o'tkazib yubordim. Muzlatkichga qo'yilganiga 2 kun bo'ldi. Ovqat tayyorlay boshlaganimga 1 yil bo'ldi."
      },
      grammar: {
        explanation: `-았어야/었어야 했는데 — "...qilish kerak edi (lekin qilmadim)"

O'kinch / afsuski bildiradi

• 미리 준비했어야 했는데
  → Oldindan tayyorlashim kerak edi (lekin qilmadim)
• 확인했어야 했는데 잊었습니다
  → Tekshirishim kerak edi, lekin unutdim
• 일찍 갔어야 했는데 늦었습니다
  → Erta borish kerak edi, lekin kech qoldim

💡 -았어야 했는데: o'tmishdagi xato uchun pushaymonlik

-(으)ㄴ 지 — "...bo'lganiga (qancha vaqt)"

Tuzilish: [fe'l + (으)ㄴ 지] + [vaqt] + 됐다/지났다

• 요리를 시작한 지 1년 됐습니다
  → Ovqat tayyorlay boshlaganimga 1 yil bo'ldi
• 냉장고에 넣은 지 이틀 됐습니다
  → Muzlatkichga qo'yilganiga 2 kun bo'ldi
• 한국에 온 지 6개월 됐어요
  → Koreyaga kelganimga 6 oy bo'ldi`,
        examples: [
          { kr: '유통기한을 미리 확인했어야 했는데 그냥 지나쳤습니다.',     uz: "Muddatni oldindan tekshirishim kerak edi, lekin e'tibor bermaadim." },
          { kr: '음식을 버리기 전에 확인했어야 했는데 실수했습니다.',        uz: "Ovqatni tashlamasdan oldin tekshirishim kerak edi, lekin xato qildim." },
          { kr: '이 식당에서 일한 지 2년 됐습니다. 많이 배웠어요.',         uz: "Bu restoranda ishlaganimga 2 yil bo'ldi. Ko'p narsani o'rgandim." },
          { kr: '냉동실에서 꺼낸 지 30분 됐으니까 이제 사용할 수 있어요.', uz: "Muzlatgichdan chiqarganiga 30 daqiqa bo'ldi, endi ishlatsa bo'ladi." },
          { kr: '손을 씻지 않았어야 했는데 — 아니, 반드시 씻어야 합니다!', uz: "Qo'l yuvmaslik kerak edi — yo'q, albatta yuvish kerak!" },
        ]
      },
      vocabulary: [
        { kr: '식자재',   romanization: 'sikjajae',      uz: 'oziq-ovqat mahsulotlari' },
        { kr: '관리하다', romanization: 'gwallihada',    uz: 'boshqarmoq' },
        { kr: '신선하다', romanization: 'sinseonhada',   uz: 'yangi (fresh)' },
        { kr: '보관하다', romanization: 'bogwanhada',    uz: 'saqlamoq' },
        { kr: '냉장고',   romanization: 'naengjangg',    uz: 'muzlatkich' },
        { kr: '유통기한', romanization: 'yutongihan',    uz: 'amal qilish muddati (exp. date)' },
        { kr: '확인하다', romanization: 'hwaginhada',    uz: 'tekshirmoq' },
        { kr: '버리다',   romanization: 'beorida',       uz: 'tashlamoq' },
        { kr: '위생',     romanization: 'wiisaeng',      uz: 'gigiyena' },
        { kr: '청결',     romanization: 'cheonggye',     uz: 'tozalik' },
        { kr: '손을 씻다',romanization: 'soneul ssitda', uz: "qo'l yuvmoq" },
        { kr: '조리하다', romanization: 'jorihada',      uz: 'pishirmoq' },
        { kr: '익히다',   romanization: 'ikhida',        uz: 'pishirmoq (qovurib/pishirib)' },
        { kr: '오염',     romanization: 'oyeom',         uz: 'ifloslanish' },
        { kr: '방지하다', romanization: 'bangjihada',    uz: 'oldini olmoq' },
        { kr: '냉동',     romanization: 'naengdong',     uz: 'muzlatish' },
        { kr: '해동하다', romanization: 'haedonghada',   uz: "muzdan chiqarmoq (defrost)" },
        { kr: '섭씨',     romanization: 'seopssi',       uz: 'Selsiy darajasi' },
        { kr: '식품',     romanization: 'sikpum',        uz: 'oziq-ovqat mahsuloti' },
        { kr: '조리도구', romanization: 'joridogu',      uz: 'oshpazlik asboblari' },
      ],
      examples: [
        { kr: '유통기한이 지난 식자재는 바로 버려야 합니다.',              uz: "Muddati o'tgan oziq-ovqatni darhol tashlash kerak." },
        { kr: '냉장고에 보관할 때 온도를 4도 이하로 유지했어야 했는데.',   uz: "Muzlatkichda saqlashda harorat 4 darajadan past bo'lishi kerak edi." },
        { kr: '이 직업을 시작한 지 6개월이 됐는데 아직 배울 게 많아요.',  uz: "Bu kasbni boshlaganimga 6 oy bo'ldi, hali o'rganadigan narsalar ko'p." },
        { kr: '음식 조리 전에 반드시 손을 씻었어야 했는데 잊었습니다.',    uz: "Ovqat tayyorlashdan oldin albatta qo'l yuvishim kerak edi, unutdim." },
        { kr: '냉동식품을 꺼낸 지 2시간이 지났으니 해동이 됐을 거예요.', uz: "Muzlatilgan ovqatni chiqarganiga 2 soat o'tdi, erigan bo'lsa kerak." },
      ],
      dialog: [
        { speaker: 'A', kr: '식자재는 어떻게 관리합니까?',                uz: "Oziq-ovqat qanday boshqariladi?" },
        { speaker: 'B', kr: '신선하게 보관하고 유통기한을 확인합니다.',    uz: "Yangi holda saqlanadi va muddati tekshiriladi." },
        { speaker: 'A', kr: '문제가 생긴 적이 있습니까?',                  uz: "Muammo bo'lganmi?" },
        { speaker: 'B', kr: '유통기한을 확인했어야 했는데 놓쳤습니다.',    uz: "Muddatni tekshirishim kerak edi, lekin o'tkazib yubordim." },
        { speaker: 'A', kr: '음식은 얼마나 보관합니까?',                   uz: "Ovqat qancha vaqt saqlanadi?" },
        { speaker: 'B', kr: '냉장고에 넣은 지 이틀 됐습니다.',             uz: "Muzlatkichga qo'yilganiga 2 kun bo'ldi." },
      ],
      notes: [
        "-았어야 했는데: o'kinch: 확인했어야 했는데(tekshirishim kerak edi), 갔어야 했는데(borish kerak edi).",
        "-(으)ㄴ 지: vaqt o'tishi: 한국에 온 지(Koreyaga kelganimga), 시작한 지(boshlaganimga).",
        "유통기한 (muddati) — ovqat saqlashda ENG muhim: o'tgan muddatli ovqat xavfli.",
        "Gigiyena qoidalari: qo'l yuvish, tozalik, to'g'ri harorat — oziq-ovqat xavfsizligi.",
        "K-푸드 sanoati — Koreys taomlari dunyo bo'ylab mashhur; gigiyena standartlari yuqori.",
      ],
      games: {
        matchPairs: [
          { kr: '식자재', uz: 'oziq-ovqat mahsulotlari' },
          { kr: '유통기한',uz: 'amal qilish muddati' },
          { kr: '냉장고', uz: 'muzlatkich' },
          { kr: '위생',   uz: 'gigiyena' },
          { kr: '해동하다',uz: "muzdan chiqarmoq" },
          { kr: '신선하다',uz: 'yangi (fresh)' },
        ],
        fillBlank: [
          { sentence: '유통기한을 확인했어야 했___ 놓쳤습니다.',    answer: '는데',  options: ['는데','서','고','면'],           uz: "Muddatni tekshirishim kerak edi, lekin o'tkazib yubordim." },
          { sentence: '냉장고에 넣은 ___ 이틀 됐습니다.',           answer: '지',    options: ['지','후','전','동안'],           uz: "Muzlatkichga qo'yilganiga 2 kun bo'ldi." },
          { sentence: '요리를 시작한 지 1년 ___ 습니다.',            answer: '됐',    options: ['됐','갔','봤','왔'],             uz: "Ovqat tayyorlay boshlaganimga 1 yil bo'ldi." },
          { sentence: '손을 씻지 않았어야 했는데 — 아니, ___ 씻어야 합니다!', answer: '반드시', options: ['반드시','나중에','천천히','가끔'], uz: "Albatta yuvish kerak!" },
          { sentence: '유통기한이 지난 식자재는 바로 ___ 야 합니다.',answer: '버려', options: ['버려','먹어','보관해','확인해'],   uz: "Muddati o'tgan oziq-ovqatni darhol tashlamoq kerak." },
        ],
        scramble: [
          { kr: '식자재', uz: 'oziq-ovqat' },
          { kr: '위생',   uz: 'gigiyena' },
          { kr: '냉장고', uz: 'muzlatkich' },
          { kr: '유통기한',uz: 'muddat' },
          { kr: '청결',   uz: 'tozalik' },
        ],
      },
    },
    quiz: [
      { question: "'-았어야 했는데' nimani bildiradi?",          options: ['kelajak reja','...qilish kerak edi (o\'kinch)','taklif','buyruq'],      correct_index: 1 },
      { question: "'냉장고에 넣은 지 이틀 됐습니다' — '-(으)ㄴ 지' nima?", options: ['maqsad','vaqt o\'tishi','sabab','shart'],              correct_index: 1 },
      { question: "'유통기한' nimani anglatadi?",               options: ['narx','og\'irlik','amal qilish muddati','saqlash joyi'],               correct_index: 2 },
      { question: "'신선하다' nimani anglatadi?",               options: ['muzlatilgan','yangi (fresh)','pishgan','iflos'],                        correct_index: 1 },
      { question: "'해동하다' nimani anglatadi?",               options: ['muzlatmoq',"muzdan chiqarmoq (defrost)",'pishirmoq','saqlash'],         correct_index: 1 },
      { question: "Ovqat saqlashda eng muhim qoida?",           options: ['arzon saqlash','muddatni tekshirib yangi holda saqlash','ko\'p saqlash','tez tashlamoq'], correct_index: 1 },
      { question: "'-(으)ㄴ 지' + '됐다' bilan nima ifodalanadi?", options: ['kelajak','o\'tmish tajriba','vaqt o\'tishi','shart'],              correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 53: 산업 안전 및 보건 표지 — Xavfsizlik belgilari
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 6, order_in_level: 3,
    title_kr: '산업 안전 및 보건 표지',
    title_uz: "Sanoat xavfsizligi belgilari",
    is_free: false,
    content: {
      topic: {
        kr: '이 표지는 무슨 뜻입니까? 출입 금지 표지입니다. 왜 표지가 붙어 있습니까? 위험한 곳이라서 붙어 있습니다. 경고 표지를 봤습니까? 네, 확인했더니 고온 주의라고 되어 있습니다.',
        uz: "Bu belgi nimani anglatadi? Kirish taqiqlangan belgisi. Nega belgi qo'yilgan? Xavfli joy bo'lgani uchun qo'yilgan. Ogohlantiruvchi belgini ko'rdingizmi? Ha, tekshirsam 'yuqori harorat' deb yozilgan."
      },
      grammar: {
        explanation: `-았더니/었더니 — "...qilib ko'rdim, natijada..."

O'z tajribasi asosida natijani bildiradi

• 버튼을 눌렀더니 기계가 작동했습니다
  → Tugmani bossam mashina ishladi
• 확인했더니 문제가 있었습니다
  → Tekshirib ko'rsam muammo bor ekan
• 약을 먹었더니 나았습니다
  → Dori ichsam tuzaldim

💡 -았더니 vs -았는데:
았더니 = o'z harakati → natija (men qildim, natijada...)
았는데 = fon/holat bildirish

-아/어 있다 — natija holati (hozirgi holat davom etmoqda)

• 문이 열려 있습니다    → Eshik ochiq turibdi
• 표지가 붙어 있습니다  → Belgi yopishtirilgan (turibdi)
• 의자에 앉아 있어요   → Stulda o'tiribdi
• 꺼져 있어요          → O'chirilgan holda turibdi`,
        examples: [
          { kr: '경고 표지를 확인했더니 감전 위험이라고 적혀 있었습니다.',  uz: "Ogohlantiruvchi belgini tekshirsam 'tok urishi xavfi' deb yozilgan ekan." },
          { kr: '출입 금지 구역에 들어갔더니 경비원이 막았습니다.',         uz: "Kirish taqiqlangan hududga kirsam xavfsizlik xodimi to'sdi." },
          { kr: '벽에 여러 안전 표지가 붙어 있습니다.',                    uz: "Devorga bir necha xavfsizlik belgilari yopishtirilgan turibdi." },
          { kr: '소화기가 문 옆에 놓여 있습니다. 만지지 마세요.',           uz: "O't o'chirgich eshik yonida qo'yilgan. Tegmang." },
          { kr: '금지 표지가 있는 곳에서는 절대 작업하면 안 됩니다.',       uz: "Taqiq belgisi bor joyda hech qachon ish qilib bo'lmaydi." },
        ]
      },
      vocabulary: [
        { kr: '경고',     romanization: 'gyeonggo',      uz: 'ogohlantirish' },
        { kr: '표지',     romanization: 'pyoji',         uz: 'belgi' },
        { kr: '위험',     romanization: 'wiheom',        uz: 'xavf' },
        { kr: '주의',     romanization: 'juui',          uz: 'ehtiyot' },
        { kr: '고온',     romanization: 'goon',          uz: 'yuqori harorat' },
        { kr: '감전',     romanization: 'gamjeon',       uz: 'tok urishi' },
        { kr: '화재',     romanization: 'hwajae',        uz: "yong'in" },
        { kr: '폭발',     romanization: 'pokbal',        uz: 'portlash' },
        { kr: '금지',     romanization: 'geumji',        uz: 'taqiqlash' },
        { kr: '출입 금지',romanization: 'chulip geumji', uz: 'kirish taqiqlangan' },
        { kr: '흡연 금지',romanization: 'heubyeon geumji',uz: 'chekish taqiqlangan' },
        { kr: '접근 금지',romanization: 'jeokgeun geumji',uz: 'yaqinlashish taqiqlangan' },
        { kr: '만지지 마시오',romanization:'manjiji masio', uz: 'tegmang' },
        { kr: '들어가지 마시오',romanization:'deureogaji masio',uz: 'kirmang' },
        { kr: '안전 표지',romanization: 'anjeon pyoji',  uz: 'xavfsizlik belgisi' },
        { kr: '의무',     romanization: 'uimu',          uz: 'majburiyat' },
        { kr: '지시',     romanization: 'jisi',          uz: "ko'rsatma" },
        { kr: '비상',     romanization: 'bisang',        uz: 'favqulodda' },
        { kr: '대피',     romanization: 'daepi',         uz: 'evakuatsiya' },
        { kr: '부착하다', romanization: 'buchakada',     uz: "yopishtirmoq, o\'rnatmoq" },
      ],
      examples: [
        { kr: '작업장 곳곳에 경고 표지가 붙어 있으니 반드시 읽어야 합니다.', uz: "Ish joyi hamma yerida ogohlantiruvchi belgilar bor, albatta o'qish kerak." },
        { kr: '감전 위험 표지가 있는 장비는 절대 만지지 마세요.',            uz: "Tok urishi xavfi belgisi bor uskunaga hech qachon tegmang." },
        { kr: '출입 금지 구역에 표지가 붙어 있는데도 들어갔더니 경보가 울렸습니다.', uz: "Kirish taqiqlangan hududga belgi bor bo'lsa ham kirsam signal chalindi." },
        { kr: '화재 경고 표지를 확인했더니 근처에 가연성 물질이 있었습니다.', uz: "Yong'in ogohlantirish belgisini tekshirsam yaqinida yonuvchi moddalar bor ekan." },
        { kr: '모든 안전 표지의 의미를 알고 있어야 합니다. 시험에도 나와요.', uz: "Barcha xavfsizlik belgilari ma'nosini bilish kerak. Imtihonda ham chiqadi." },
      ],
      dialog: [
        { speaker: 'A', kr: '이 표지는 무슨 뜻입니까?',                    uz: "Bu belgi nimani anglatadi?" },
        { speaker: 'B', kr: '출입 금지 표지입니다.',                       uz: "Kirish taqiqlangan belgisi." },
        { speaker: 'A', kr: '왜 이렇게 되어 있습니까?',                   uz: "Nega shunday yozilgan?" },
        { speaker: 'B', kr: '위험한 곳이라서 표지가 붙어 있습니다.',        uz: "Xavfli joy bo'lgani uchun belgi qo'yilgan." },
        { speaker: 'A', kr: '경고 표지를 봤습니까?',                       uz: "Ogohlantiruvchi belgini ko'rdingizmi?" },
        { speaker: 'B', kr: '네, 확인했더니 고온 주의라고 되어 있습니다.',  uz: "Ha, tekshirsam 'yuqori harorat ehtiyoti' deb yozilgan." },
      ],
      notes: [
        "-았더니/었더니: o'z tajriba natijasi: 확인했더니(tekshirsam), 눌렀더니(bossam).",
        "-아/어 있다: natija holati: 붙어 있습니다(yopishtirilgan), 열려 있어요(ochiq turibdi).",
        "Xavfsizlik belgilari 4 xil: 경고(sariq-qizil), 금지(qizil), 지시(ko'k), 안내(yashil).",
        "감전 위험 — eng xavfli belgilardan biri: elektr jihozlar yaqinida doim.",
        "EPS-TOPIK imtihonida belgilar mavzusi 100% chiqadi — barcha belgilarni o'rganish shart.",
      ],
      games: {
        matchPairs: [
          { kr: '경고',     uz: 'ogohlantirish' },
          { kr: '금지',     uz: 'taqiqlash' },
          { kr: '감전',     uz: 'tok urishi' },
          { kr: '화재',     uz: "yong'in" },
          { kr: '폭발',     uz: 'portlash' },
          { kr: '대피',     uz: 'evakuatsiya' },
        ],
        fillBlank: [
          { sentence: '표지가 붙어 ___ 습니다.',                   answer: '있',    options: ['있','없','해','가'],             uz: "Belgi yopishtirilgan turibdi." },
          { sentence: '확인했___ 니 문제가 있었습니다.',             answer: '더',    options: ['더','는','던','았'],             uz: "Tekshirsam muammo bor ekan." },
          { sentence: '출입 ___ 표지가 있는 곳에 들어가지 마세요.',answer: '금지',  options: ['금지','경고','주의','지시'],     uz: "Kirish taqiqlangan belgi bor joyga kirmang." },
          { sentence: '문이 열려 ___ 습니다.',                      answer: '있',    options: ['있','없','해','가'],             uz: "Eshik ochiq turibdi." },
          { sentence: '이 표지는 감전 ___ 경고입니다.',             answer: '위험',  options: ['위험','주의','금지','지시'],     uz: "Bu belgi tok urishi xavfi ogohlantirishidir." },
        ],
        scramble: [
          { kr: '경고',   uz: 'ogohlantirish' },
          { kr: '표지',   uz: 'belgi' },
          { kr: '금지',   uz: 'taqiqlash' },
          { kr: '위험',   uz: 'xavf' },
          { kr: '안전',   uz: 'xavfsizlik' },
        ],
      },
    },
    quiz: [
      { question: "'-았더니/었더니' nimani bildiradi?",          options: ['kelajak','o\'z harakati natijasini bildirish','taklif','inkor'],       correct_index: 1 },
      { question: "'-아/어 있다' nimani anglatadi?",             options: ['harakat','natija holati (hozir davom etmoqda)','o\'tmish','kelajak'], correct_index: 1 },
      { question: "'감전' nimani anglatadi?",                   options: ["yong'in",'portlash','tok urishi','yuqori harorat'],                    correct_index: 2 },
      { question: "'출입 금지' nimani anglatadi?",              options: ['chekish taqiqlangan','kirish taqiqlangan','tegmang','kirmang'],         correct_index: 1 },
      { question: "Ogohlantiruvchi belgi qanday rang?",         options: ['ko\'k','yashil','sariq-qizil','oq'],                                   correct_index: 2 },
      { question: "'표지' nimani anglatadi?",                   options: ['xavf','taqiqlash','belgi','ehtiyot'],                                  correct_index: 2 },
      { question: "'-았더니' va '-았는데' farqi?",              options: ['Farq yo\'q','았더니=o\'z harakati natijasi; 았는데=holat fon','았는데=natija','Ikkalasi bir xil'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 54: 산업 안전 및 보건 수칙 — Xavfsizlik qoidalari
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 6, order_in_level: 4,
    title_kr: '산업 안전 및 보건 수칙',
    title_uz: "Sanoat xavfsizligi va sog'liq qoidalari",
    is_free: false,
    content: {
      topic: {
        kr: '안전 수칙을 지키고 있습니까? 네, 항상 보호 장비를 착용하도록 합니다. 산업 재해를 예방하려면 어떻게 해야 합니까? 위험 요소를 제거하고 점검해야 합니다. 왜 교육이 필요합니까? 사고를 예방하기 위해 필요합니다.',
        uz: "Xavfsizlik qoidalariga amal qilyapsizmi? Ha, har doim himoya vositasini kiyaman. Baxtsiz hodisani oldini olish uchun nima qilish kerak? Xavf omillarini yo'qotib, tekshirish kerak. Nega trening kerak? Baxtsiz hodisani oldini olish uchun kerak."
      },
      grammar: {
        explanation: `-도록 하다 — "...qilishga harakat qilmoq / shunday qilaylik"

-도록 hada = maqsad + harakat/ta'lim

• 안전 규칙을 지키도록 합시다
  → Xavfsizlik qoidalariga amal qilaylik
• 항상 보호 장비를 착용하도록 하세요
  → Har doim himoya vositasini kiyishga harakat qiling
• 시간을 지키도록 하겠습니다
  → Vaqtga rioya qilishga harakat qilaman

💡 -도록 (dars 44) vs -도록 하다:
물이 흐르도록 설치 = natija maqsadi (oqishi uchun)
착용하도록 하세요  = harakat buyruq/tavsiya (kiyishga harakat)

-기 위해 — "...uchun" (maqsad)

Tuzilish: [fe'l] + 기 위해(서)

• 사고를 예방하기 위해 교육을 합니다
  → Baxtsiz hodisani oldini olish uchun trening qilinadi
• 안전을 지키기 위해 점검합니다
  → Xavfsizlik uchun tekshiriladi
• 건강을 위해 운동합니다
  → Sog'liq uchun sport qilinadi`,
        examples: [
          { kr: '모든 작업자가 안전모를 착용하도록 합시다.',              uz: "Barcha ishchilar dubulg'a kiyishiga erishaylik." },
          { kr: '화재를 예방하기 위해 소화기를 항상 점검합니다.',          uz: "Yong'inni oldini olish uchun o't o'chirgich doim tekshiriladi." },
          { kr: '사고를 방지하기 위해 위험 구역에 표지를 붙입니다.',       uz: "Baxtsiz hodisaning oldini olish uchun xavfli hududga belgi qo'yiladi." },
          { kr: '건강을 보호하기 위해 마스크를 착용하도록 합니다.',        uz: "Sog'liqni himoya qilish uchun niqob kiyishga harakat qiladi." },
          { kr: '안전 교육을 받도록 하는 것이 회사의 의무입니다.',         uz: "Xavfsizlik treningini olishga erishish korxonaning majburiyatidir." },
        ]
      },
      vocabulary: [
        { kr: '안전',     romanization: 'anjeon',        uz: 'xavfsizlik' },
        { kr: '보건',     romanization: 'bogeon',        uz: "sog'liq" },
        { kr: '수칙',     romanization: 'suchik',        uz: 'qoida' },
        { kr: '준수하다', romanization: 'junsuahda',     uz: 'rioya qilmoq' },
        { kr: '보호하다', romanization: 'bohohada',      uz: 'himoya qilmoq' },
        { kr: '장비',     romanization: 'jangbi',        uz: 'uskunalar, jihozlar' },
        { kr: '착용하다', romanization: 'chagyonghada',  uz: 'kiyib olmoq' },
        { kr: '점검하다', romanization: 'jeomgeonhada',  uz: 'tekshirmoq' },
        { kr: '산업 재해',romanization: 'saneobjahae',   uz: 'ishlab chiqarishdagi baxtsiz hodisa' },
        { kr: '예방하다', romanization: 'yebanghada',    uz: 'oldini olmoq' },
        { kr: '위험 요소',romanization: 'wiheom yoso',   uz: 'xavf omillari' },
        { kr: '제거하다', romanization: 'jegeohada',     uz: "yo'qotmoq, olib tashlamoq" },
        { kr: '교육',     romanization: 'gyoyuk',        uz: "trening, ta\'lim" },
        { kr: '훈련',     romanization: 'hullyeon',      uz: "mashg'ulot" },
        { kr: '관리하다', romanization: 'gwallihada',    uz: 'boshqarmoq' },
        { kr: '의무',     romanization: 'uimu',          uz: 'majburiyat' },
        { kr: '대피로',   romanization: 'daepiro',       uz: "evakuatsiya yo\'li" },
        { kr: '비상구',   romanization: 'bisanggu',      uz: 'favqulodda chiqish' },
        { kr: '소화기',   romanization: 'sohwagi',       uz: "o't o'chirgich" },
        { kr: '방호복',   romanization: 'banghoobok',    uz: 'himoya kiyimi' },
      ],
      examples: [
        { kr: '안전 수칙을 준수하기 위해 매일 아침 점검을 합니다.',         uz: "Xavfsizlik qoidalariga rioya qilish uchun har kuni ertalab tekshiruv qilinadi." },
        { kr: '위험 요소를 미리 제거하도록 하여 사고를 예방합니다.',        uz: "Xavf omillarini oldindan yo'qotishga erishib, baxtsiz hodisa oldini olinadi." },
        { kr: '모든 직원이 안전 교육을 받도록 해야 합니다.',               uz: "Barcha xodimlar xavfsizlik treningini olishiga erishish kerak." },
        { kr: '화재 예방을 위해 소화기의 위치를 모두 알아야 합니다.',       uz: "Yong'in oldini olish uchun o't o'chirgich joylashuvini hammasi bilishi kerak." },
        { kr: '비상구를 막아 놓으면 안 됩니다. 항상 열려 있도록 하세요.', uz: "Favqulodda chiqishni to'sib qo'yish mumkin emas. Doim ochiq bo'lishiga erishib." },
      ],
      dialog: [
        { speaker: 'A', kr: '안전 수칙을 지키고 있습니까?',               uz: "Xavfsizlik qoidalariga amal qilyapsizmi?" },
        { speaker: 'B', kr: '네, 항상 보호 장비를 착용하도록 합니다.',     uz: "Ha, har doim himoya vositasini kiyishga harakat qilaman." },
        { speaker: 'A', kr: '산업 재해를 예방하려면 어떻게 해야 합니까?', uz: "Baxtsiz hodisani oldini olish uchun nima qilish kerak?" },
        { speaker: 'B', kr: '위험 요소를 제거하고 점검해야 합니다.',       uz: "Xavf omillarini yo'qotib, tekshirish kerak." },
        { speaker: 'A', kr: '왜 교육이 필요합니까?',                      uz: "Nega trening kerak?" },
        { speaker: 'B', kr: '사고를 예방하기 위해 필요합니다.',            uz: "Baxtsiz hodisani oldini olish uchun kerak." },
      ],
      notes: [
        "-도록 하다: harakat/ta'lim: 착용하도록 합시다(kiyishga erishaylik), 지키도록 하세요(rioya qilishga).",
        "-기 위해: maqsad: 예방하기 위해(oldini olish uchun), 안전을 위해(xavfsizlik uchun).",
        "산업 재해 oldini olish: 위험 요소 제거 → 보호 장비 착용 → 교육 → 점검.",
        "대피로 (evakuatsiya yo'li) — doim bo'sh va ochiq bo'lishi shart; to'sib qo'yish mumkin emas.",
        "Koreya xavfsizlik qonuni: barcha ish joylari xavfsizlik qoidalarini bajarishi majburiy.",
      ],
      games: {
        matchPairs: [
          { kr: '수칙',     uz: 'qoida' },
          { kr: '산업 재해',uz: 'baxtsiz hodisa' },
          { kr: '예방하다', uz: 'oldini olmoq' },
          { kr: '비상구',   uz: 'favqulodda chiqish' },
          { kr: '소화기',   uz: "o't o'chirgich" },
          { kr: '대피로',   uz: "evakuatsiya yo\'li" },
        ],
        fillBlank: [
          { sentence: '보호 장비를 착용하도록 ___.',                answer: '합시다',options: ['합시다','갑시다','봅시다','옵시다'], uz: "Himoya vositasini kiyishga erishaylik." },
          { sentence: '사고를 예방하기 ___ 교육을 합니다.',          answer: '위해',  options: ['위해','위한','위하여','위하고'], uz: "Baxtsiz hodisani oldini olish uchun trening qilinadi." },
          { sentence: '위험 요소를 ___ 합니다.',                    answer: '제거',  options: ['제거','청소','점검','보고'],     uz: "Xavf omillarini yo'qotadi." },
          { sentence: '안전 수칙을 지키도록 ___ 겠습니다.',          answer: '하',    options: ['하','봐','가','봅'],             uz: "Xavfsizlik qoidalariga rioya qilishga harakat qilaman." },
          { sentence: '비상구를 막아 놓으면 ___ 됩니다.',           answer: '안',    options: ['안','잘','꼭','빨리'],           uz: "Favqulodda chiqishni to'sib qo'yish mumkin emas." },
        ],
        scramble: [
          { kr: '안전',   uz: 'xavfsizlik' },
          { kr: '수칙',   uz: 'qoida' },
          { kr: '예방',   uz: 'oldini olish' },
          { kr: '교육',   uz: 'trening' },
          { kr: '비상구', uz: 'favqulodda chiqish' },
        ],
      },
    },
    quiz: [
      { question: "'-도록 하다' nima bildiradi?",               options: ['inkor','...qilishga harakat qilmoq / ta\'lim','savol','taxmin'],       correct_index: 1 },
      { question: "'-기 위해' nima bildiradi?",                 options: ['sabab','...uchun (maqsad)','lekin','natija'],                          correct_index: 1 },
      { question: "'산업 재해' nimani anglatadi?",               options: ['ish vaqti','ish joyi','ishlab chiqarishdagi baxtsiz hodisa','ish qoidasi'], correct_index: 2 },
      { question: "'준수하다' nimani anglatadi?",               options: ['tekshirmoq','himoya qilmoq','rioya qilmoq','tashlamoq'],               correct_index: 2 },
      { question: "'비상구' nimani anglatadi?",                 options: ['favqulodda chiqish','oshxona','kiyinish xonasi','lift'],                correct_index: 0 },
      { question: "Baxtsiz hodisa oldini olish tartibi?",       options: ['trening→tekshirish','xavf olib tashlash→himoya kiyim→trening→tekshirish','faqat trening','faqat tekshirish'], correct_index: 1 },
      { question: "'-도록 하다' va '-도록' farqi?",             options: ['Farq yo\'q','도록=natija maqsadi; 도록 하다=harakat buyruq','도록 하다=natija','Ikkalasi bir xil'], correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 55: 산업 안전 및 위생 장비 — Xavfsizlik jihozlari
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 6, order_in_level: 5,
    title_kr: '산업 안전 및 위생 장비',
    title_uz: "Sanoat xavfsizligi va gigiyena jihozlari",
    is_free: false,
    content: {
      topic: {
        kr: '이 작업에 어떤 보호구가 필요합니까? 안전모와 장갑이 필요합니다. 왜 착용해야 합니까? 위험할 테니까 반드시 착용해야 합니다. 작업이 끝나면 어떻게 합니까? 끝나는 대로 장비를 정리합니다.',
        uz: "Bu ish uchun qanday himoya vositalari kerak? Dubulg'a va qo'lqop kerak. Nega kiyish kerak? Xavfli bo'lishi mumkin, shuning uchun albatta kiyish kerak. Ish tugagach nima qilasiz? Tugashi bilan jihozlarni yig'ishtiraman."
      },
      grammar: {
        explanation: `-는 대로 — "...bilan darhol / ...tugashi bilan"

Tuzilish: [fe'l] + 는 대로

• 작업이 끝나는 대로 보고하세요
  → Ish tugashi bilan xabar bering
• 확인하는 대로 알려 주세요
  → Tekshirishingiz bilan xabar bering
• 오는 대로 연락해요
  → Kelishingiz bilan muloqot qiling

💡 -는 대로: birinchi harakat tugashi bilanoq, kechiktirmasdan
-자마자 bilan o'xshash lekin:
-는 대로 = ko'proq reja/buyruq kontekstida

-(으)ㄹ 테니까 — "...bo'ladi, shuning uchun..."

Taxmin + sababli buyruq/tavsiya

• 위험할 테니까 조심하세요
  → Xavfli bo'ladi, shuning uchun ehtiyot bo'ling
• 필요할 테니까 준비하세요
  → Kerak bo'ladi, shuning uchun tayyorlang
• 늦을 테니까 빨리 갑시다
  → Kech qoladi, shuning uchun tezroq boraylik`,
        examples: [
          { kr: '교육이 끝나는 대로 보호구를 착용하고 작업을 시작하세요.',   uz: "Trening tugashi bilan himoya vositalarini kiyib ish boshling." },
          { kr: '장비 점검이 끝나는 대로 팀장님께 보고하겠습니다.',          uz: "Jihozlar tekshiruvi tugashi bilan jamoa boshlig'iga xabar beraman." },
          { kr: '화학물질을 다루니까 위험할 테니까 반드시 장갑을 끼세요.',   uz: "Kimyoviy moddalarni ishlatayapsiz, xavfli bo'ladi shuning uchun albatta qo'lqop kiyib." },
          { kr: '작업이 길어질 테니까 여분의 보호구를 준비했습니다.',        uz: "Ish uzayadi shuning uchun qo'shimcha himoya vositalarini tayyorladim." },
          { kr: '확인하는 대로 결과를 바로 알려 주시기 바랍니다.',           uz: "Tekshirishingiz bilan natijani darhol xabar berishingizni so'rayman." },
        ]
      },
      vocabulary: [
        { kr: '보호구',   romanization: 'bohoogu',       uz: 'himoya vositasi' },
        { kr: '안전모',   romanization: 'anjeonmo',      uz: "kaska, dubulg\'a" },
        { kr: '보호 안경',romanization: 'boho angyeong', uz: "himoya ko\'zoynagi" },
        { kr: '장갑',     romanization: 'jangap',        uz: "qo'lqop" },
        { kr: '마스크',   romanization: 'maseukheu',     uz: 'niqob, maska' },
        { kr: '안전화',   romanization: 'anjeonhwa',     uz: 'xavfsizlik oyoq kiyimi' },
        { kr: '착용하다', romanization: 'chagyonghada',  uz: 'kiyib olmoq' },
        { kr: '사용하다', romanization: 'sayonghada',    uz: 'foydalanmoq' },
        { kr: '필요하다', romanization: 'piryohada',     uz: "kerak bo\'lmoq" },
        { kr: '준비하다', romanization: 'junbihada',     uz: 'tayyorlamoq' },
        { kr: '점검하다', romanization: 'jeomgeonhada',  uz: 'tekshirmoq' },
        { kr: '유지하다', romanization: 'yujihada',      uz: 'saqlamoq' },
        { kr: '교체하다', romanization: 'gyochaehada',   uz: 'almashtirmoq' },
        { kr: '방열 장갑',romanization: 'bangyeol jangap',uz: "issiqlikga chidamli qo\'lqop" },
        { kr: '귀마개',   romanization: 'gwimae',        uz: 'quloq sumbati' },
        { kr: '안전벨트', romanization: 'anjeonbelteu',  uz: 'xavfsizlik kamari' },
        { kr: '방진 마스크',romanization:'bangjin maseukheu',uz: 'changdan himoya niqob' },
        { kr: '착용 의무',romanization: 'chagyong uimu', uz: 'kiyish majburiyati' },
        { kr: '정리하다', romanization: 'jeongrihada',   uz: "yig'ishtirmoq, tartiblamoq" },
        { kr: '보관하다', romanization: 'bogwanhada',    uz: 'saqlamoq' },
      ],
      examples: [
        { kr: '현장에 도착하는 대로 안전모와 안전화를 착용하세요.',          uz: "Maydonga kelishingiz bilan dubulg'a va xavfsizlik poyabzali kiyib." },
        { kr: '화학물질 작업은 위험할 테니까 방독 마스크를 꼭 써야 해요.', uz: "Kimyoviy moddalar ishi xavfli bo'ladi, shuning uchun gaz niqobi albatta kiyish kerak." },
        { kr: '작업이 끝나는 대로 모든 보호구를 정해진 곳에 보관하세요.',   uz: "Ish tugashi bilan barcha himoya vositalarini belgilangan joyga saqlang." },
        { kr: '소음이 클 테니까 귀마개를 착용하도록 하세요.',               uz: "Shovqin katta bo'ladi, shuning uchun quloq sumbati kiyishga harakat qiling." },
        { kr: '안전벨트는 높은 곳에서 작업할 때 반드시 착용해야 합니다.', uz: "Xavfsizlik kamari baland joyda ishlashda albatta kiyilishi kerak." },
      ],
      dialog: [
        { speaker: 'A', kr: '이 작업에 어떤 보호구가 필요합니까?',          uz: "Bu ish uchun qanday himoya vositalari kerak?" },
        { speaker: 'B', kr: '안전모와 장갑이 필요합니다.',                   uz: "Dubulg'a va qo'lqop kerak." },
        { speaker: 'A', kr: '왜 착용해야 합니까?',                          uz: "Nega kiyish kerak?" },
        { speaker: 'B', kr: '위험할 테니까 반드시 착용해야 합니다.',         uz: "Xavfli bo'ladi, shuning uchun albatta kiyish kerak." },
        { speaker: 'A', kr: '작업이 끝나면 어떻게 합니까?',                 uz: "Ish tugagach nima qilasiz?" },
        { speaker: 'B', kr: '끝나는 대로 장비를 정리하고 보관합니다.',      uz: "Tugashi bilan jihozlarni yig'ishtiraman va saqlayman." },
      ],
      notes: [
        "-는 대로: darhol: 끝나는 대로(tugashi bilan), 오는 대로(kelishi bilan).",
        "-(으)ㄹ 테니까: taxmin+sababli tavsiya: 위험할 테니까 조심(xavfli bo'ladi ehtiyot).",
        "Himoya vositalari to'plami: 안전모+안전화+장갑+보호안경+마스크 — ish turiga qarab.",
        "귀마개 (quloq sumbati) — shovqinli zavodlarda majburiy; eshitishni himoya qilish.",
        "안전벨트 (xavfsizlik kamari) — 2m dan baland joylarda ishlashda majburiy Koreyada.",
      ],
      games: {
        matchPairs: [
          { kr: '안전모',   uz: "kaska, dubulg'a" },
          { kr: '장갑',     uz: "qo'lqop" },
          { kr: '마스크',   uz: 'niqob' },
          { kr: '귀마개',   uz: 'quloq sumbati' },
          { kr: '안전벨트', uz: 'xavfsizlik kamari' },
          { kr: '보호구',   uz: 'himoya vositasi' },
        ],
        fillBlank: [
          { sentence: '작업이 끝나는 ___ 로 정리합니다.',             answer: '대',    options: ['대','곳','것','만'],             uz: "Ish tugashi bilan yig'ishtiraman." },
          { sentence: '위험할 테니___ 조심하세요.',                   answer: '까',    options: ['까','서','고','면'],             uz: "Xavfli bo'ladi, ehtiyot bo'ling." },
          { sentence: '안전모와 ___ 이 필요합니다.',                  answer: '장갑',  options: ['장갑','이불','수건','침대'],     uz: "Dubulg'a va qo'lqop kerak." },
          { sentence: '확인하는 대로 ___ 알려 주세요.',               answer: '바로',  options: ['바로','나중에','천천히','혼자'],  uz: "Tekshirishingiz bilan darhol xabar bering." },
          { sentence: '소음이 클 테니까 ___ 를 착용하세요.',          answer: '귀마개',options: ['귀마개','장갑','마스크','안전모'],uz: "Shovqin katta bo'ladi, quloq sumbati kiyib."},
        ],
        scramble: [
          { kr: '안전모', uz: "dubulg'a" },
          { kr: '장갑',   uz: "qo'lqop" },
          { kr: '마스크', uz: 'niqob' },
          { kr: '안전화', uz: 'xavfsizlik poyabzali' },
          { kr: '보호구', uz: 'himoya vositasi' },
        ],
      },
    },
    quiz: [
      { question: "'-는 대로' nimani anglatadi?",               options: ['...dan keyin','...bilan darhol (kechiktirmasdan)','...uchun','...sababli'], correct_index: 1 },
      { question: "'-(으)ㄹ 테니까' nimani bildiradi?",          options: ['taklif','...bo\'ladi shuning uchun (taxmin+tavsiya)','inkor','savol'],     correct_index: 1 },
      { question: "'귀마개' nimani anglatadi?",                 options: ['niqob',"qo'lqop",'quloq sumbati','dubulg\'a'],                             correct_index: 2 },
      { question: "'착용하다' nimani anglatadi?",               options: ['saqlash','tekshirmoq','kiyib olmoq','almashtirmoq'],                        correct_index: 2 },
      { question: "'안전벨트' qachon majburiy?",                options: ['hamma vaqt','faqat avtomobilda','2m dan baland joylarda ishlashda','hech qachon'], correct_index: 2 },
      { question: "'-는 대로' va '-자마자' farqi?",             options: ['Farq yo\'q','대로=reja/buyruq; 자마자=tasvir','자마자=buyruq','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'방진 마스크' nimani anglatadi?",            options: ['gaz niqobi','changdan himoya niqob','issiqlik niqobi','suv niqobi'],        correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 56: 산업 재해 및 응급 처치 — Baxtsiz hodisa va birinchi yordam
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 6, order_in_level: 6,
    title_kr: '산업 재해 및 응급 처치',
    title_uz: "Ishdagi baxtsiz hodisa va birinchi yordam",
    is_free: false,
    content: {
      topic: {
        kr: '사고가 발생하면 어떻게 해야 합니까? 즉시 신고하고 도움을 요청해야 합니다. 다친 사람이 있으면 어떻게 합니까? 응급 처치를 하고 병원으로 옮깁니다. 위험한 상황이 있었습니까? 네, 사고가 날 뻔했습니다.',
        uz: "Baxtsiz hodisa bo'lsa nima qilish kerak? Darhol xabar berib, yordam so'rash kerak. Jarohatlangan bo'lsa nima? Birinchi yordam ko'rsatib, kasalxonaga olib boriladi. Xavfli holat bo'lganmi? Ha, baxtsiz hodisa bo'lishiga oz qoldi."
      },
      grammar: {
        explanation: `-(으)ㄹ 뻔하다 — "...bo'lishiga sal qoldi / deyarli"

Tuzilish: [fe'l] + (으)ㄹ 뻔하다

• 사고가 날 뻔했습니다       → Baxtsiz hodisa bo'lishiga oz qoldi
• 넘어질 뻔했어요             → Yiqilib ketishimga sal qoldi
• 놓칠 뻔했습니다             → O'tkazib yuborishimga oz qoldi
• 다칠 뻔했어요               → Jarohatlanishimga sal qoldi

💡 -(으)ㄹ 뻔하다: yomonlik sodir bo'lishiga juda yaqin keldi,
lekin oxir-oqibat bo'lmadi.

-자마자 — "...bilanoq / darhol"

Tuzilish: [fe'l] + 자마자

• 사고가 나자마자 신고했습니다
  → Hodisa bo'lishi bilanoq xabar berdim
• 병원에 가자마자 치료를 받았습니다
  → Kasalxonaga borishi bilanoq davolandim
• 출근하자마자 점검을 시작했습니다
  → Ishga kelishi bilanoq tekshiruv boshlandi`,
        examples: [
          { kr: '미끄러운 바닥에서 넘어질 뻔했는데 동료가 잡아 줬어요.',      uz: "Silliq yerda yiqilib ketishimga oz qoldi, hamkasb ushlab qoldi." },
          { kr: '기계에 손이 끼일 뻔했습니다. 정말 위험했어요.',               uz: "Mashinaga qo'l ilinib qolishiga sal qoldi. Juda xavfli edi." },
          { kr: '사고가 나자마자 즉시 119에 신고했습니다.',                    uz: "Hodisa bo'lishi bilanoq darhol 119 ga xabar berdim." },
          { kr: '다친 사람을 발견하자마자 응급 처치를 시작했습니다.',           uz: "Jarohatlangan odamni topishi bilanoq birinchi yordam ko'rsatila boshlandi." },
          { kr: '화재 경보가 울리자마자 모든 직원이 대피했습니다.',            uz: "Yong'in signali chalishi bilanoq barcha xodimlar evakuatsiya qildi." },
        ]
      },
      vocabulary: [
        { kr: '소방 장비', romanization: 'sobangjangbi',  uz: "yong'in jihozlari" },
        { kr: '소화기',   romanization: 'sohwagi',        uz: "o't o'chirgich" },
        { kr: '화재',     romanization: 'hwajae',         uz: "yong'in" },
        { kr: '경보',     romanization: 'gyeongbo',       uz: 'signal, ogohlantirish' },
        { kr: '비상구',   romanization: 'bisanggu',       uz: 'favqulodda chiqish' },
        { kr: '대피하다', romanization: 'daepihada',      uz: 'evakuatsiya qilmoq' },
        { kr: '응급 상황',romanization: 'eunggeup sanghwang',uz: 'favqulodda holat' },
        { kr: '사고',     romanization: 'sago',           uz: 'baxtsiz hodisa' },
        { kr: '다치다',   romanization: 'dachida',        uz: 'jarohatlanmoq' },
        { kr: '치료하다', romanization: 'chirohada',      uz: 'davolamoq' },
        { kr: '신고하다', romanization: 'singohada',      uz: 'xabar bermoq' },
        { kr: '응급 처치',romanization: 'eunggeup cheochi',uz: 'birinchi yordam' },
        { kr: '119',      romanization: 'iru ilgu',       uz: '119 (tez yordam raqami)' },
        { kr: '넘어지다', romanization: 'neomeoijida',    uz: 'yiqilmoq' },
        { kr: '미끄럽다', romanization: 'mikkeureopda',   uz: 'silliq, sirpanchiq' },
        { kr: '끼이다',   romanization: 'kkiida',         uz: 'ilinib qolmoq (mashinaga)' },
        { kr: '골절',     romanization: 'goljeol',        uz: 'suyak sinishi' },
        { kr: '화상',     romanization: 'hwasang',        uz: 'kuyish' },
        { kr: 'CPR',      romanization: 'si-pi-ar',       uz: "sun\'iy nafas berish" },
        { kr: '구급차',   romanization: 'gugeupcha',      uz: 'tez yordam mashinasi' },
      ],
      examples: [
        { kr: '사다리에서 떨어질 뻔했는데 안전벨트 덕분에 괜찮았습니다.',    uz: "Narvondan tushib ketishimga oz qoldi, xavfsizlik kamari tufayli yaxshi bo'ldi." },
        { kr: '불이 나자마자 소화기를 들고 즉시 진화에 나섰습니다.',          uz: "O't tutoshi bilanoq o't o'chirgichni olib darhol o'chirish uchun chiqildi." },
        { kr: '동료가 다치자마자 119에 전화하고 응급 처치를 시작했습니다.',   uz: "Hamkasb jarohatlanishi bilanoq 119 ga qo'ng'iroq qilib birinchi yordam boshlandi." },
        { kr: '화학물질을 흡입할 뻔했습니다. 마스크가 없었으면 큰일 났어요.', uz: "Kimyoviy moddani yutib yuborishimga oz qoldi. Niqob bo'lmaganda katta ish bo'lardi." },
        { kr: '비상구를 평소에 잘 알아두어야 빨리 대피할 수 있습니다.',      uz: "Favqulodda chiqishni oldindan yaxshi bilsangiz tez evakuatsiya qila olasiz." },
      ],
      dialog: [
        { speaker: 'A', kr: '사고가 발생하면 어떻게 해야 합니까?',             uz: "Baxtsiz hodisa bo'lsa nima qilish kerak?" },
        { speaker: 'B', kr: '즉시 신고하고 도움을 요청해야 합니다.',           uz: "Darhol xabar berib, yordam so'rash kerak." },
        { speaker: 'A', kr: '다친 사람이 있으면 어떻게 합니까?',               uz: "Jarohatlangan bo'lsa nima qilinadi?" },
        { speaker: 'B', kr: '응급 처치를 하고 병원으로 옮깁니다.',             uz: "Birinchi yordam ko'rsatib, kasalxonaga olib boriladi." },
        { speaker: 'A', kr: '위험한 상황이 있었습니까?',                       uz: "Xavfli holat bo'lganmi?" },
        { speaker: 'B', kr: '네, 사고가 날 뻔했습니다. 다행히 괜찮았습니다.', uz: "Ha, baxtsiz hodisa bo'lishiga oz qoldi. Yaxshiyamki, yaxshi bo'ldi." },
      ],
      notes: [
        "-(으)ㄹ 뻔하다: yaqin o'tib ketgan xavf: 넘어질 뻔(yiqilishiga oz qoldi), 날 뻔(bo'lishiga oz).",
        "-자마자: darhol: 사고가 나자마자(hodisa bo'lishi bilanoq), 울리자마자(chalishi bilanoq).",
        "119 — Koreya tez yordam raqami: yong'in + tibbiy yordam + politsiya.",
        "응급 처치 (birinchi yordam): CPR, qon to'xtatish, suyak sinishida harakatlanmaslik.",
        "화재 tartibi: 경보 → 대피 → 119 → o't o'chirish (faqat mumkin bo'lsa).",
      ],
      games: {
        matchPairs: [
          { kr: '소화기',   uz: "o't o'chirgich" },
          { kr: '비상구',   uz: 'favqulodda chiqish' },
          { kr: '응급 처치',uz: 'birinchi yordam' },
          { kr: '119',      uz: 'tez yordam raqami' },
          { kr: '구급차',   uz: 'tez yordam mashinasi' },
          { kr: '다치다',   uz: 'jarohatlanmoq' },
        ],
        fillBlank: [
          { sentence: '사고가 날 ___ 했습니다.',                  answer: '뻔',    options: ['뻔','수','것','만'],             uz: "Baxtsiz hodisa bo'lishiga oz qoldi." },
          { sentence: '사고가 나___ 마자 신고했습니다.',           answer: '자',    options: ['자','서','고','면'],             uz: "Hodisa bo'lishi bilanoq xabar berdim." },
          { sentence: '즉시 신고하고 도움을 ___ 야 합니다.',       answer: '요청해',options: ['요청해','청소해','교체해','점검해'],uz:"Darhol xabar berib, yordam so'rash kerak."},
          { sentence: '다친 사람을 발견하자마자 ___ 처치를 시작했습니다.',answer:'응급',options:['응급','안전','청소','교육'],uz:"Jarohatlanganni topishi bilanoq birinchi yordam boshlandi."},
          { sentence: '넘어질 뻔했는데 동료가 ___ 줬어요.',        answer: '잡아',  options: ['잡아','도와','먹어','가'],       uz: "Yiqilishimga oz qoldi, hamkasb ushlab qoldi." },
        ],
        scramble: [
          { kr: '사고',   uz: 'baxtsiz hodisa' },
          { kr: '응급',   uz: 'favqulodda' },
          { kr: '신고',   uz: 'xabar berish' },
          { kr: '대피',   uz: 'evakuatsiya' },
          { kr: '119',    uz: 'tez yordam' },
        ],
      },
    },
    quiz: [
      { question: "'사고가 날 뻔했습니다' — '-(으)ㄹ 뻔하다' nima?", options: ['sodir bo\'ldi','...bo\'lishiga oz qoldi (deyarli)','taxmin','istak'], correct_index: 1 },
      { question: "'-자마자' nimani anglatadi?",                options: ['...dan keyin','...bilanoq (darhol)','...uchun','...davomida'],               correct_index: 1 },
      { question: "Koreyada tez yordam raqami?",                options: ['112','110','119','911'],                                                     correct_index: 2 },
      { question: "'응급 처치' nimani anglatadi?",              options: ['kasalxona','birinchi yordam','evakuatsiya','signal'],                        correct_index: 1 },
      { question: "'대피하다' nimani anglatadi?",               options: ['davolamoq','xabar bermoq','evakuatsiya qilmoq','tekshirmoq'],               correct_index: 2 },
      { question: "Yong'in bo'lganda birinchi nima?",           options: ['o\'t o\'chirish','darhol evakuatsiya va 119 ga xabar','fotosurga olish','jim turish'], correct_index: 1 },
      { question: "'-(으)ㄹ 뻔하다' nima bildiradi?",           options: ['sodir bo\'ldi','sodir bo\'lmadi (lekin yaqin keldi)','kelajak','istak'],   correct_index: 1 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 57: 고용허가제 — EPS tizimi
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 6, order_in_level: 7,
    title_kr: '고용허가제 (EPS)',
    title_uz: "Ish ruxsati tizimi (EPS)",
    is_free: false,
    content: {
      topic: {
        kr: '고용허가제에 대해 알고 있습니까? 네, 외국인이 한국에서 일할 수 있는 제도입니다. 취업 절차는 어떻게 됩니까? 시험을 보고 합격하면 계약하게 됩니다. 절차가 복잡한 줄 몰랐습니다. 한국에서 일하게 되었습니다.',
        uz: "EPS tizimi haqida bilasizmi? Ha, bu chet elliklar Koreyada ishlashi mumkin bo'lgan tizim. Ishga joylashish jarayoni qanday? Imtihondan o'tib, shartnoma tuziladi. Jarayon murakkabligini bilmadim. Koreyada ishlaydigan bo'ldim."
      },
      grammar: {
        explanation: `-는/(으)ㄴ 줄 알았다, 몰랐다 — "...deb o'yladim / bilmadim"

Tuzilish:
Hozirgi: [fe'l] + 는 줄 알았다/몰랐다
O'tgan: [fe'l + (으)ㄴ] + 줄 알았다/몰랐다
Kelajak: [fe'l + (으)ㄹ] + 줄 알았다/몰랐다

• 시험이 쉬운 줄 알았습니다   → Imtihon oson deb o'yladim
• 절차가 복잡한 줄 몰랐습니다 → Jarayon murakkabligini bilmadim
• 일찍 끝날 줄 알았어요       → Erta tugaydi deb o'yladim

-게 되다 — "...bo'lib qolmoq / natijada..."

O'zgarish, tabiiy natijani bildiradi

• 한국에서 일하게 되었습니다   → Koreyada ishlaydigan bo'ldim
• 시험에 합격하게 되었습니다   → Imtihondan o'tdim (natijada)
• 한국어를 할 줄 알게 됐어요   → Koreys tilini biladigan bo'ldim`,
        examples: [
          { kr: '한국어 시험이 이렇게 어려운 줄 몰랐습니다.',               uz: "Koreys tili imtihoni shuncha qiyin ekanligini bilmadim." },
          { kr: 'EPS 절차가 이렇게 오래 걸리는 줄 알았으면 더 일찍 신청했을 텐데.', uz: "EPS jarayoni shuncha vaqt olishini bilsam erta ariza topshirgan bo'lardim." },
          { kr: '처음에는 한국 생활이 어렵다고 생각했지만 이제는 익숙하게 됐습니다.', uz: "Dastlab Koreya hayoti qiyin deb o'ylardim, lekin endi ko'nikib qoldim." },
          { kr: 'EPS 시험에 합격해서 이렇게 한국에서 일하게 됐습니다.',     uz: "EPS imtihonidan o'tib, shunday Koreyada ishlaydigan bo'ldim." },
          { kr: '계약이 이렇게 빨리 될 줄 몰랐는데 다행이에요.',            uz: "Shartnoma shuncha tez bo'lishini bilmadim, yaxshiyamki." },
        ]
      },
      vocabulary: [
        { kr: '고용허가제',romanization: 'goyongheogage', uz: 'ishga ruxsat tizimi (EPS)' },
        { kr: '업종',     romanization: 'eopjong',        uz: 'soha, tarmoq' },
        { kr: '제조업',   romanization: 'jejo-eop',       uz: 'ishlab chiqarish' },
        { kr: '건설업',   romanization: 'geonseol-eop',   uz: 'qurilish' },
        { kr: '농업',     romanization: 'nong-eop',       uz: "qishloq xo\'jaligi" },
        { kr: '어업',     romanization: 'eo-eop',         uz: 'baliqchilik' },
        { kr: '서비스업', romanization: 'seobiseu-eop',   uz: "xizmat ko\'rsatish" },
        { kr: '취업',     romanization: 'chwieo',         uz: 'ishga joylashish' },
        { kr: '절차',     romanization: 'jeolcha',        uz: 'jarayon, tartib' },
        { kr: '신청하다', romanization: 'sincheonghada',  uz: 'ariza topshirmoq' },
        { kr: '시험',     romanization: 'siheom',         uz: 'imtihon' },
        { kr: '합격하다', romanization: 'hapgyeokhada',   uz: "o'tmoq (imtihondan)" },
        { kr: '계약하다', romanization: 'gyeyakhada',     uz: 'shartnoma tuzmoq' },
        { kr: '입국하다', romanization: 'ipgukhada',      uz: 'mamlakatga kirish' },
        { kr: '근무하다', romanization: 'geunmuhada',     uz: 'ishlamoq (rasmiy)' },
        { kr: '체류 자격',romanization: 'cheryu jaggyeok',uz: 'yashash uchun ruxsat' },
        { kr: 'E-9 비자', romanization: 'igu bija',       uz: 'E-9 viza (EPS uchun)' },
        { kr: '갱신하다', romanization: 'gaengsinhada',   uz: 'yangilamoq' },
        { kr: '귀국하다', romanization: 'gwigukhada',     uz: 'vataniga qaytmoq' },
        { kr: '재입국',   romanization: 'jaeiipguk',      uz: 'qayta kirish' },
      ],
      examples: [
        { kr: 'EPS 시험이 이렇게 많은 주제를 다루는 줄 몰랐습니다.',          uz: "EPS imtihoni shuncha ko'p mavzuni qamrab olishini bilmadim." },
        { kr: '한국어를 열심히 공부해서 EPS 시험에 합격하게 됐습니다.',       uz: "Koreys tilini qattiq o'qib, EPS imtihonidan o'tdim." },
        { kr: '계약을 연장하게 되어서 한국에 더 오래 있을 수 있게 됐습니다.', uz: "Shartnoma uzaytirilgani uchun Koreyada uzoqroq qolish mumkin bo'ldi." },
        { kr: '처음에는 이렇게 오래 한국에 있게 될 줄 몰랐어요.',            uz: "Dastlab shuncha uzoq Koreyada qolishimni bilmadim." },
        { kr: 'E-9 비자로 최대 4년 10개월 동안 일할 수 있게 됩니다.',        uz: "E-9 viza bilan maksimal 4 yil 10 oy ishlash mumkin bo'ladi." },
      ],
      dialog: [
        { speaker: 'A', kr: '고용허가제에 대해 알고 있습니까?',              uz: "EPS tizimi haqida bilasizmi?" },
        { speaker: 'B', kr: '네, 외국인이 한국에서 일할 수 있는 제도입니다.', uz: "Ha, bu chet elliklar Koreyada ishlashi mumkin bo'lgan tizim." },
        { speaker: 'A', kr: '취업 절차는 어떻게 됩니까?',                    uz: "Ishga joylashish jarayoni qanday?" },
        { speaker: 'B', kr: '시험을 보고 합격하면 계약하게 됩니다.',          uz: "Imtihondan o'tib, shartnoma tuziladi." },
        { speaker: 'A', kr: '어떤 점이 어려웠습니까?',                       uz: "Qaysi jihat qiyin bo'ldi?" },
        { speaker: 'B', kr: '절차가 복잡한 줄 몰랐습니다. 하지만 합격하게 돼서 기뻐요.', uz: "Jarayon murakkabligini bilmadim. Lekin o'tganim uchun xursandman." },
      ],
      notes: [
        "-는 줄 알았다/몰랐다: kutilmagan bilim: 복잡한 줄 몰랐습니다(murakkabligini bilmadim).",
        "-게 되다: o'zgarish natijasi: 일하게 됐습니다(ishlaydigan bo'ldim), 합격하게 됐어요(o'tdim).",
        "EPS tizimi: E-9 viza, TOPIK imtihon, Koreya ishlash muddati maksimal 4 yil 10 oy.",
        "고용허가제 sohalari: 제조업, 건설업, 농업, 어업, 서비스업 — 5 ta asosiy soha.",
        "체류 자격 (yashash ruxsati) — E-9 viza bilan kelgan ishchilar uchun.",
      ],
      games: {
        matchPairs: [
          { kr: '고용허가제',uz: 'EPS tizimi' },
          { kr: '합격하다', uz: "o'tmoq (imtihondan)" },
          { kr: '취업',     uz: 'ishga joylashish' },
          { kr: '귀국하다', uz: 'vataniga qaytmoq' },
          { kr: 'E-9 비자', uz: 'E-9 viza' },
          { kr: '갱신하다', uz: 'yangilamoq' },
        ],
        fillBlank: [
          { sentence: '절차가 복잡한 줄 ___ 습니다.',               answer: '몰랐',  options: ['몰랐','알았','봤','갔'],         uz: "Jarayon murakkabligini bilmadim." },
          { sentence: '한국에서 일하게 ___ 습니다.',                 answer: '됐',    options: ['됐','있','갔','봤'],             uz: "Koreyada ishlaydigan bo'ldim." },
          { sentence: '시험에 ___ 하면 계약하게 됩니다.',            answer: '합격',  options: ['합격','실패','참가','준비'],     uz: "Imtihondan o'tsangiz shartnoma tuziladi." },
          { sentence: '이렇게 오래 걸리는 줄 ___ 어요.',            answer: '몰랐',  options: ['몰랐','알았','봤','갔'],         uz: "Shuncha vaqt olishini bilmadim." },
          { sentence: 'E-9 비자로 최대 4년 ___ 개월 일할 수 있습니다.',answer:'10',  options: ['10','6','3','12'],              uz: "E-9 viza bilan maksimal 4 yil 10 oy ishlash mumkin." },
        ],
        scramble: [
          { kr: '취업',   uz: 'ishga joylashish' },
          { kr: '시험',   uz: 'imtihon' },
          { kr: '계약',   uz: 'shartnoma' },
          { kr: '절차',   uz: 'jarayon' },
          { kr: '비자',   uz: 'viza' },
        ],
      },
    },
    quiz: [
      { question: "'절차가 복잡한 줄 몰랐습니다' — nima bildiradi?", options: ['jarayon murakkab','jarayon murakkabligini bilmadim (kutilmagan)','taklif','buyruq'], correct_index: 1 },
      { question: "'-게 되다' nimani anglatadi?",                options: ['istak','...bo\'lib qolmoq (tabiiy o\'zgarish natijasi)','inkor','savol'], correct_index: 1 },
      { question: "'합격하다' nimani anglatadi?",               options: ['ariza topshirmoq','shartnoma tuzmoq',"o'tmoq (imtihondan)",'vataniga qaytmoq'], correct_index: 2 },
      { question: "EPS ishchilar uchun qaysi viza?",            options: ['E-1','E-7','E-9','F-4'],                                                   correct_index: 2 },
      { question: "EPS qaysi sohalarda?",                       options: ['faqat fabrikada','ishlab chiqarish, qurilish, qishloq xo\'jaligi, baliqchilik, xizmat','faqat xizmat','faqat qurilish'], correct_index: 1 },
      { question: "'-는 줄 알았다' va '-는 줄 몰랐다' farqi?",   options: ['Farq yo\'q','알았다=o\'yladim; 몰랐다=bilmadim','몰랐다=o\'yladim','Ikkalasi bir xil'], correct_index: 1 },
      { question: "E-9 viza bilan maksimal qancha ishlash mumkin?", options: ['2 yil','3 yil','4 yil 10 oy','5 yil'],                                correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 58: 근로기준법 — Mehnat qonuni
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 6, order_in_level: 8,
    title_kr: '근로기준법 — 계약서와 급여',
    title_uz: "Mehnat qonuni — Shartnoma va maosh",
    is_free: false,
    content: {
      topic: {
        kr: '근로계약서를 확인했습니까? 네, 확인했습니다. 급여 명세서를 받았습니까? 네, 받았는데 이해가 잘 안 됩니다. 수당뿐만 아니라 공제도 설명해 주시면 좋겠습니다. 근로 시간이 짧으면 좋겠습니다.',
        uz: "Shartnomani tekshirdingizmi? Ha, tekshirdim. Maosh hujjatini oldingizmi? Ha, oldim, lekin tushunmadim. Nafaqat qo'shimcha to'lov, balki ushlab qolishlarni ham tushuntirsangiz yaxshi bo'lardi. Ish vaqti qisqa bo'lsa yaxshi bo'lardi."
      },
      grammar: {
        explanation: `뿐만 아니라 — "...nafaqat..., balki...ham"

Tuzilish: [ot/fe'l] + 뿐만 아니라 + [qo'shimcha]

• 임금뿐만 아니라 근로 조건도 중요합니다
  → Nafaqat maosh, balki ish shartlari ham muhim
• 휴식뿐만 아니라 안전도 중요합니다
  → Nafaqat dam olish, balki xavfsizlik ham muhim
• 한국어뿐만 아니라 문화도 배웠습니다
  → Nafaqat koreys tili, balki madaniyatini ham o'rgandim

-(으)면 좋겠다 — "...bo'lsa yaxshi bo'lardi" (istak)

• 근로 시간이 짧으면 좋겠습니다   → Ish vaqti qisqa bo'lsa yaxshi bo'lardi
• 급여가 높으면 좋겠습니다        → Maosh yuqori bo'lsa yaxshi bo'lardi
• 설명해 주시면 좋겠습니다        → Tushuntirsangiz yaxshi bo'lardi`,
        examples: [
          { kr: '근로계약서에는 임금뿐만 아니라 근무 시간과 휴일도 명시되어 있습니다.', uz: "Mehnat shartnomasi maoshdan tashqari ish vaqti va dam olish kunlari ham ko'rsatilgan." },
          { kr: '급여 명세서를 더 쉽게 설명해 주시면 좋겠습니다.',            uz: "Maosh hujjatini yanada soddароq tushuntirsangiz yaxshi bo'lardi." },
          { kr: '이번 달 수당뿐만 아니라 세금 공제도 확인해 주시겠어요?',     uz: "Bu oygi qo'shimcha to'lovdan tashqari soliq ushlab qolishini ham tekshirib bersangiz?" },
          { kr: '야근 수당뿐만 아니라 주휴 수당도 받을 수 있으면 좋겠습니다.', uz: "Qo'shimcha ish to'lovidan tashqari haftalik dam olish to'lovi ham olsa yaxshi bo'lardi." },
          { kr: '근로자는 임금뿐만 아니라 4대 보험 혜택도 받을 권리가 있습니다.', uz: "Ishchi maoshdan tashqari 4 ta sug'urta imtiyozini ham olish huquqiga ega." },
        ]
      },
      vocabulary: [
        { kr: '근로 조건', romanization: 'geunno jogeon', uz: 'ish shartlari' },
        { kr: '근로 시간', romanization: 'geunno sigan',  uz: 'ish vaqti' },
        { kr: '휴식',     romanization: 'hyusik',         uz: 'dam olish' },
        { kr: '휴일',     romanization: 'hyuil',          uz: 'dam olish kuni' },
        { kr: '임금',     romanization: 'imgeum',         uz: 'maosh' },
        { kr: '지급하다', romanization: 'jigeubhada',     uz: "to'lamoq" },
        { kr: '계약서',   romanization: 'gyeyakseo',      uz: 'shartnoma' },
        { kr: '서명하다', romanization: 'seomyeonghada',  uz: 'imzolamoq' },
        { kr: '급여 명세서',romanization: 'geupyeo myeongseseo',uz: 'maosh hujjati (payslip)' },
        { kr: '기본급',   romanization: 'gibongeup',      uz: 'asosiy maosh' },
        { kr: '수당',     romanization: 'sudang',         uz: "qo'shimcha to'lov" },
        { kr: '공제',     romanization: 'gongjae',        uz: 'ushlab qolish (maoshdan)' },
        { kr: '세금',     romanization: 'segeum',         uz: 'soliq' },
        { kr: '4대 보험', romanization: 'sadae boheon',   uz: "4 ta sug'urta (majburiy)" },
        { kr: '최저 임금',romanization: 'choejeoimgeum',  uz: 'minimal maosh' },
        { kr: '야근 수당',romanization: 'yageun sudang',  uz: "qo'shimcha ish to'lovi" },
        { kr: '주휴 수당',romanization: 'juhyu sudang',   uz: "haftalik dam olish to'lovi" },
        { kr: '퇴직금',   romanization: 'toejikgeum',     uz: 'ish tashlash kompensatsiyasi' },
        { kr: '연차',     romanization: 'yeoncha',        uz: "yillik ta\'til (paid leave)" },
        { kr: '통상 임금',romanization: 'tongsanggeum',   uz: "oddiy (asosiy) ish haqi" },
      ],
      examples: [
        { kr: '근로계약서에는 기본급뿐만 아니라 각종 수당과 공제 내역도 있습니다.', uz: "Mehnat shartnomasi asosiy maoshdan tashqari turli qo'shimcha to'lovlar va ushlab qolishlar ham bor." },
        { kr: '최저 임금 이상을 받으면 좋겠는데 그게 어렵네요.',               uz: "Minimal maoshdan ko'proq olsa yaxshi bo'lardi, lekin bu qiyin ekan." },
        { kr: '4대 보험에는 건강보험뿐만 아니라 고용보험도 포함됩니다.',         uz: "4 ta sug'urtada sog'liq sug'urtasidan tashqari ishchi sug'urtasi ham kiritilgan." },
        { kr: '급여 명세서를 매월 확인하는 습관을 가지면 좋겠습니다.',           uz: "Maosh hujjatini har oy tekshirish odatiga ega bo'lsa yaxshi bo'lardi." },
        { kr: '연차를 사용하려면 미리 신청해야 합니다.',                        uz: "Yillik ta'tildan foydalanish uchun oldindan ariza topshirish kerak." },
      ],
      dialog: [
        { speaker: 'A', kr: '근로계약서를 확인했습니까?',                      uz: "Shartnomani tekshirdingizmi?" },
        { speaker: 'B', kr: '네, 확인했습니다.',                               uz: "Ha, tekshirdim." },
        { speaker: 'A', kr: '급여 명세서를 받았습니까?',                       uz: "Maosh hujjatini oldingizmi?" },
        { speaker: 'B', kr: '네, 받았는데 이해가 잘 안 됩니다.',               uz: "Ha, oldim, lekin yaxshi tushunmadim." },
        { speaker: 'A', kr: '어떤 부분이 궁금합니까?',                         uz: "Qaysi qismi tushunarsiz?" },
        { speaker: 'B', kr: '수당뿐만 아니라 공제도 설명해 주시면 좋겠습니다.', uz: "Nafaqat qo'shimcha to'lov, balki ushlab qolishlarni ham tushuntirsangiz yaxshi bo'lardi." },
      ],
      notes: [
        "뿐만 아니라: 임금뿐만 아니라 조건도(nafaqat maosh, balki shartlar ham).",
        "-(으)면 좋겠다: istak: 높으면 좋겠습니다(yuqori bo'lsa yaxshi bo'lardi).",
        "4대 보험 — majburiy 4 ta sug'urta: 건강(sog'liq), 고용(ishchi), 연금(pensiya), 산재(ishlab chiqarish).",
        "급여 명세서 tarkibi: 기본급 + 수당 - 공제(세금+보험) = 실수령액.",
        "최저 임금 (minimal maosh) — Koreya hukumati har yili belgilaydi; 2025 yilda ~9,860 won/soat.",
      ],
      games: {
        matchPairs: [
          { kr: '임금',   uz: 'maosh' },
          { kr: '수당',   uz: "qo'shimcha to'lov" },
          { kr: '공제',   uz: 'ushlab qolish' },
          { kr: '연차',   uz: "yillik ta\'til" },
          { kr: '퇴직금', uz: 'ish tashlash kompensatsiyasi' },
          { kr: '세금',   uz: 'soliq' },
        ],
        fillBlank: [
          { sentence: '임금___ 아니라 근로 조건도 중요합니다.',           answer: '뿐만',  options: ['뿐만','도','만','은'],           uz: "Nafaqat maosh, balki ish shartlari ham muhim." },
          { sentence: '근로 시간이 짧으면 ___ 겠습니다.',                answer: '좋',    options: ['좋','없','해','가'],             uz: "Ish vaqti qisqa bo'lsa yaxshi bo'lardi." },
          { sentence: '급여 ___ 서를 매월 확인하세요.',                   answer: '명세',  options: ['명세','계약','신청','관리'],     uz: "Maosh hujjatini har oy tekshiring." },
          { sentence: '수당뿐만 아니라 ___ 도 설명해 주세요.',            answer: '공제',  options: ['공제','임금','세금','기본급'],   uz: "Qo'shimcha to'lovdan tashqari ushlab qolishini ham tushuntiring." },
          { sentence: '4대 보험에는 건강보험뿐만 아니라 ___ 보험도 있어요.',answer:'고용', options: ['고용','자동차','여행','생명'],   uz: "4 ta sug'urtada sog'liqdan tashqari ishchi sug'urtasi ham bor." },
        ],
        scramble: [
          { kr: '임금',   uz: 'maosh' },
          { kr: '계약서', uz: 'shartnoma' },
          { kr: '수당',   uz: "qo'shimcha to'lov" },
          { kr: '세금',   uz: 'soliq' },
          { kr: '연차',   uz: "yillik ta\'til" },
        ],
      },
    },
    quiz: [
      { question: "'뿐만 아니라' nimani anglatadi?",             options: ['lekin','shuning uchun','nafaqat..., balki...ham','...uchun'],           correct_index: 2 },
      { question: "'-(으)면 좋겠다' nimani bildiradi?",           options: ['buyruq','...bo\'lsa yaxshi bo\'lardi (istak)','taxmin','inkor'],       correct_index: 1 },
      { question: "'공제' nimani anglatadi?",                    options: ["qo'shimcha to'lov",'asosiy maosh','ushlab qolish','soliq'],             correct_index: 2 },
      { question: "'4대 보험' nimini o'z ichiga oladi?",         options: ['faqat sog\'liq','sog\'liq, ishchi, pensiya, ishlab chiqarish','faqat pensiya','faqat ishchi'], correct_index: 1 },
      { question: "'급여 명세서' nimani anglatadi?",             options: ['shartnoma','ariza','maosh hujjati (payslip)','retsept'],                correct_index: 2 },
      { question: "'연차' nimani anglatadi?",                    options: ['haftalik dam olish','qo\'shimcha ish','yillik ta\'til (paid leave)','minimal maosh'], correct_index: 2 },
      { question: "Maosh hujjatida 실수령액 = ?",               options: ['기본급 + 수당','기본급 - 공제','기본급 + 수당 - 공제','faqat 기본급'],   correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 59: 출입국 관리법 — Migratsiya qonuni
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 6, order_in_level: 9,
    title_kr: '출입국 관리법 — 등록과 체류 연장',
    title_uz: "Migratsiya qonuni — Ro'yxat va muddat uzaytirish",
    is_free: false,
    content: {
      topic: {
        kr: '외국인 등록은 어떻게 합니까? 서류를 준비해서 신청합니다. 체류 기간은 언제까지입니까? 곧 만료될 것 같습니다. 연장은 어떻게 합니까? 기간이 끝나기 전에 신청해야 합니다. 가능한지 확인해야 합니다.',
        uz: "Chet elliklar ro'yxatdan qanday o'tadi? Hujjatlar tayyorlanib, ariza topshiriladi. Yashash muddati qachongacha? Tez orada tugaydi shekilli. Uzaytirish qanday? Muddat tugashidan oldin ariza topshirish kerak. Mumkinligini tekshirish kerak."
      },
      grammar: {
        explanation: `-더라도 — "...bo'lsa ham" (qaramasdan, kuchli)

Tuzilish: [fe'l/sifat] + 더라도

• 어려워도 계속해야 합니다
  → Qiyin bo'lsa ham davom ettirish kerak
• 시간이 없더라도 신청해야 합니다
  → Vaqt bo'lmasa ham ariza topshirish kerak
• 비싸더라도 해야 합니다
  → Qimmat bo'lsa ham qilish kerak

💡 -더라도 vs -아도/어도:
아도/어도 = oddiy "bo'lsa ham"
더라도    = kuchliroq ta'kid, hayoliy holat

-는지/(으)ㄴ지 — "...mi yo'qmi" (bilmaslik, ehtimol)

• 신청이 가능한지 확인하세요
  → Ariza topshirish mumkinmi tekshiring
• 기간이 끝났는지 모르겠습니다
  → Muddat tugaganmi bilmayman
• 서류가 맞는지 확인해 주세요
  → Hujjatlar to'g'rimi tekshirib bering`,
        examples: [
          { kr: '바쁘더라도 외국인 등록은 입국 후 90일 이내에 해야 합니다.',   uz: "Band bo'lsa ham chet ellik ro'yxati kirish muddatidan 90 kun ichida bo'lishi kerak." },
          { kr: '비자 만료 전에 연장 신청이 가능한지 미리 확인하세요.',         uz: "Viza muddati tugashidan oldin uzaytirish ariza berish mumkinmi oldindan tekshiring." },
          { kr: '이 서류가 맞는지 출입국 사무소에 확인하러 가야겠어요.',        uz: "Bu hujjatlar to'g'rimi migratsiya idorasiga tekshirishga borish kerak." },
          { kr: '힘들더라도 규정을 지켜야 합니다. 불법 체류는 심각한 결과를 초래해요.', uz: "Qiyin bo'lsa ham qoidalarga amal qilish kerak. Noqonuniy yashash jiddiy oqibatlar keltiradi." },
          { kr: '체류 기간이 남아 있는지 여권으로 확인할 수 있습니다.',         uz: "Yashash muddati qolganmi pasport orqali tekshirish mumkin." },
        ]
      },
      vocabulary: [
        { kr: '외국인',   romanization: 'oegugin',       uz: 'chet ellik' },
        { kr: '등록',     romanization: 'deungrok',      uz: "ro'yxatdan o'tish" },
        { kr: '신청하다', romanization: 'sincheonghada', uz: 'ariza topshirmoq' },
        { kr: '서류',     romanization: 'seoyu',         uz: 'hujjatlar' },
        { kr: '제출하다', romanization: 'jechulhada',    uz: 'topshirmoq' },
        { kr: '발급하다', romanization: 'balgeubhada',   uz: 'berilmoq (rasmiy)' },
        { kr: '등록증',   romanization: 'deungrokjeung', uz: 'ID karta (chet ellik)' },
        { kr: '체류 기간',romanization: 'cheryu gigan',  uz: 'yashash muddati' },
        { kr: '연장하다', romanization: 'yeonjanghada',  uz: 'uzaytirmoq' },
        { kr: '만료되다', romanization: 'mallyodweda',   uz: 'muddati tugamoq' },
        { kr: '허가',     romanization: 'heoga',         uz: 'ruxsat' },
        { kr: '방문하다', romanization: 'bangmunhada',   uz: 'tashrif buyurmoq' },
        { kr: '출입국',   romanization: 'chulipguk',     uz: 'kirish-chiqish (migratsiya)' },
        { kr: '사무소',   romanization: 'samuso',        uz: 'idora, ofis' },
        { kr: '불법 체류',romanization: 'bulbeop cheryu',uz: 'noqonuniy yashash' },
        { kr: '강제 출국',romanization: 'gangje chulguk',uz: "majburiy deportatsiya" },
        { kr: '입국 심사',romanization: 'ipguk simsa',   uz: "chegaradan o'tish tekshiruvi" },
        { kr: '여권',     romanization: 'yeogwon',       uz: 'pasport' },
        { kr: '비자',     romanization: 'bija',          uz: 'viza' },
        { kr: '90일',     romanization: 'gusipil',       uz: '90 kun' },
      ],
      examples: [
        { kr: '입국 후 90일 이내에 외국인 등록을 하지 않으면 벌금이 부과됩니다.', uz: "Kirish muddatidan 90 kun ichida ro'yxatdan o'tmasangiz jarima solinadi." },
        { kr: '체류 기간이 만료되기 전에 연장 신청을 해야 합니다. 늦으면 안 됩니다.', uz: "Yashash muddati tugashidan oldin uzaytirish arizasi topshirilishi kerak. Kechikish mumkin emas." },
        { kr: '힘들더라도 체류 기간을 반드시 확인하고 지켜야 합니다.',           uz: "Qiyin bo'lsa ham yashash muddatini albatta tekshirib unga rioya qilish kerak." },
        { kr: '등록증이 유효한지 출입국 사무소에서 확인하는 것이 좋습니다.',     uz: "ID karta amal qiladimi migratsiya idorasida tekshirish yaxshi." },
        { kr: '비자 종류가 변경 가능한지 담당자에게 문의해야 합니다.',           uz: "Viza turi o'zgartirilishi mumkinmi mas'ul xodimga so'rash kerak." },
      ],
      dialog: [
        { speaker: 'A', kr: '외국인 등록은 어떻게 합니까?',                     uz: "Chet elliklar ro'yxatdan qanday o'tadi?" },
        { speaker: 'B', kr: '서류를 준비해서 신청합니다.',                       uz: "Hujjatlar tayyorlanib, ariza topshiriladi." },
        { speaker: 'A', kr: '체류 기간은 언제까지입니까?',                      uz: "Yashash muddati qachongacha?" },
        { speaker: 'B', kr: '곧 만료될 것 같습니다.',                           uz: "Tez orada tugaydi shekilli." },
        { speaker: 'A', kr: '연장은 어떻게 합니까?',                            uz: "Uzaytirish qanday qilinadi?" },
        { speaker: 'B', kr: '기간이 끝나기 전에 신청해야 합니다. 가능한지 미리 확인해야 해요.', uz: "Muddat tugashidan oldin ariza topshirish kerak. Mumkinligini oldindan tekshirish kerak." },
      ],
      notes: [
        "-더라도: kuchli qaramasdan: 바쁘더라도(band bo'lsa ham), 어렵더라도(qiyin bo'lsa ham).",
        "-는지/(으)ㄴ지: noaniqlik: 가능한지(mumkinmi), 맞는지(to'g'rimi), 끝났는지(tugaganmi).",
        "Chet ellik ro'yxati (외국인 등록): kirish muddatidan 90 kun ichida — majburiy.",
        "불법 체류 (noqonuniy yashash) — juda jiddiy; deportatsiya va keyin Koreyaga kirish taqiqi.",
        "출입국 사무소 — migratsiya idorasi: barcha viza va ro'yxat masalalarini hal qiladi.",
      ],
      games: {
        matchPairs: [
          { kr: '등록증',   uz: 'ID karta' },
          { kr: '체류 기간',uz: 'yashash muddati' },
          { kr: '연장하다', uz: 'uzaytirmoq' },
          { kr: '만료되다', uz: 'muddati tugamoq' },
          { kr: '여권',     uz: 'pasport' },
          { kr: '불법 체류',uz: 'noqonuniy yashash' },
        ],
        fillBlank: [
          { sentence: '시간이 없___ 라도 신청해야 합니다.',              answer: '더',    options: ['더','아','어','이'],             uz: "Vaqt bo'lmasa ham ariza topshirish kerak." },
          { sentence: '신청이 가능한___ 확인하세요.',                    answer: '지',    options: ['지','고','서','면'],             uz: "Ariza topshirish mumkinmi tekshiring." },
          { sentence: '기간이 ___ 되기 전에 연장하세요.',               answer: '만료',  options: ['만료','시작','종료','확인'],     uz: "Muddat tugashidan oldin uzaytiring." },
          { sentence: '힘들더라도 규정을 ___ 야 합니다.',               answer: '지켜',  options: ['지켜','먹어','가','봐'],         uz: "Qiyin bo'lsa ham qoidalarga amal qilish kerak." },
          { sentence: '입국 후 ___ 일 이내에 등록해야 합니다.',          answer: '90',    options: ['90','30','60','180'],             uz: "Kirish muddatidan 90 kun ichida ro'yxatdan o'tish kerak." },
        ],
        scramble: [
          { kr: '등록',   uz: "ro'yxat" },
          { kr: '비자',   uz: 'viza' },
          { kr: '여권',   uz: 'pasport' },
          { kr: '연장',   uz: 'uzaytirish' },
          { kr: '허가',   uz: 'ruxsat' },
        ],
      },
    },
    quiz: [
      { question: "'-더라도' va '-아도/어도' farqi?",             options: ['Farq yo\'q','더라도=kuchliroq ta\'kid; 아도=oddiy','아도=kuchliroq','Ikkalasi bir xil'], correct_index: 1 },
      { question: "'-는지/(으)ㄴ지' nimani anglatadi?",           options: ['buyruq','...mi yo\'qmi (noaniqlik)','taklif','shart'],                 correct_index: 1 },
      { question: "Chet ellik ro'yxati qachon amalga oshirilishi kerak?", options: ['1 yil ichida','6 oy ichida','kirish muddatidan 90 kun ichida','hech qachon'], correct_index: 2 },
      { question: "'만료되다' nimani anglatadi?",                 options: ['uzaytirmoq','ruxsat bermoq','muddati tugamoq','ro\'yxatdan o\'tish'],  correct_index: 2 },
      { question: "'불법 체류' oqibati?",                        options: ['jarima to\'lash','deportatsiya va kirish taqiqi','ogohlantirgish','hech narsa'], correct_index: 1 },
      { question: "'출입국 사무소' nimani anglatadi?",            options: ['kasalxona','bank','migratsiya idorasi','mehnat inspeksiyasi'],          correct_index: 2 },
      { question: "'등록증' nimani anglatadi?",                  options: ['pasport','viza','chet ellik ID kartasi','shartnoma'],                   correct_index: 2 },
    ],
  },

  // ════════════════════════════════════════════
  // DARS 60: 근로자 보험 — Ishchilar sug'urtasi
  // ════════════════════════════════════════════
  {
    track: 'EPS-TOPIK', level: 6, order_in_level: 10,
    title_kr: '근로자 보험 — 사고와 보상',
    title_uz: "Ishchilar sug'urtasi — Hodisa va kompensatsiya",
    is_free: false,
    content: {
      topic: {
        kr: '보험에 가입했습니까? 네, 가입했습니다. 보험금은 어떻게 받습니까? 신청하면 받을 수 있습니다. 사고가 있었습니까? 네, 사고가 나는 바람에 병원에 갔습니다. 보험금을 받으려면 서류가 필요합니다.',
        uz: "Sug'urtaga a'zo bo'ldingizmi? Ha, a'zo bo'ldim. Sug'urta pulini qanday olasiz? Ariza topshirib olish mumkin. Hodisa bo'lganmi? Ha, hodisa sabab kasalxonaga bordim. Sug'urta pulini olish uchun hujjatlar kerak."
      },
      grammar: {
        explanation: `-는 바람에 — "...sababli" (kutilmagan salbiy natija)

Tuzilish: [fe'l] + 는 바람에

• 사고가 나는 바람에 일을 못 했습니다
  → Hodisa bo'lgani uchun ish qila olmadim
• 비가 오는 바람에 늦었습니다
  → Yomg'ir sabab kech qoldim
• 기계가 고장 나는 바람에 작업이 중단됐습니다
  → Mashina nosoz bo'lgani uchun ish to'xtadi

💡 -는 바람에 vs -아서/어서:
아서/어서  = oddiy sabab (ijobiy ham, salbiy ham)
는 바람에 = FAQAT salbiy, kutilmagan sabab

-(으)려면 — "...qilmoqchi bo'lsangiz"

Tuzilish: [fe'l] + (으)려면

• 보험금을 받으려면 신청해야 합니다
  → Sug'urta pulini olish uchun ariza topshirish kerak
• 가입하려면 서류가 필요합니다
  → A'zo bo'lish uchun hujjatlar kerak
• 연장하려면 미리 준비하세요
  → Uzaytirmoqchi bo'lsangiz oldindan tayyorlang`,
        examples: [
          { kr: '갑자기 비가 오는 바람에 현장 작업이 중단됐습니다.',           uz: "To'satdan yomg'ir yog'gani uchun maydon ishi to'xtatildi." },
          { kr: '산업 재해 보험금을 받으려면 사고 경위서를 제출해야 합니다.',   uz: "Ishlab chiqarish hodisasi sug'urta pulini olish uchun hodisa bayonnomasi topshirish kerak." },
          { kr: '장비가 갑자기 멈추는 바람에 제품에 문제가 생겼습니다.',        uz: "Uskunalar to'satdan to'xtalgani uchun mahsulotda muammo yuzaga keldi." },
          { kr: '4대 보험에 가입하려면 고용계약서가 필요합니다.',               uz: "4 ta sug'urtaga a'zo bo'lish uchun ish shartnomasi kerak." },
          { kr: '보험 혜택을 최대한 활용하려면 내용을 잘 알아야 합니다.',       uz: "Sug'urta imtiyozlaridan to'liq foydalanish uchun mazmunini yaxshi bilish kerak." },
        ]
      },
      vocabulary: [
        { kr: '보험',     romanization: 'boheon',        uz: "sug'urta" },
        { kr: '가입하다', romanization: 'gaiphada',      uz: "a'zo bo'lmoq" },
        { kr: '보험금',   romanization: 'boheonggeum',   uz: "sug'urta puli" },
        { kr: '지급하다', romanization: 'jigeubhada',    uz: "to'lamoq" },
        { kr: '청구하다', romanization: 'cheongguhada',  uz: 'talab qilmoq' },
        { kr: '보상하다', romanization: 'bosanghada',    uz: 'kompensatsiya qilmoq' },
        { kr: '산재 보험',romanization: 'sanjae boheon', uz: "ishlab chiqarish sug'urtasi" },
        { kr: '건강 보험',romanization: 'geongang boheon',uz: "sog'liq sug'urtasi" },
        { kr: '고용 보험',romanization: 'goyong boheon', uz: "ishchi sug'urtasi" },
        { kr: '연금 보험',romanization: 'yeonggeum boheon',uz: "pensiya sug\'urtasi" },
        { kr: '출국 만기 보험',romanization: 'chulguk mangi boheon',uz: "ketish muddati sug\'urtasi" },
        { kr: '신고하다', romanization: 'singohada',     uz: 'xabar bermoq' },
        { kr: '서류',     romanization: 'seoyu',         uz: 'hujjatlar' },
        { kr: '보험료',   romanization: 'boheonyo',      uz: "sug'urta to'lovi (premium)" },
        { kr: '적용하다', romanization: 'jeogyonghada',  uz: "qo\'llash, tatbiq etmoq" },
        { kr: '혜택',     romanization: 'hyetaek',       uz: 'imtiyoz, foyda' },
        { kr: '의무 가입',romanization: 'uimu gaip',     uz: "majburiy a\'zolik" },
        { kr: '보험증',   romanization: 'boheonjeung',   uz: "sug'urta guvohnomasi" },
        { kr: '본인 부담',romanization: 'bonin budam',   uz: "o'z hissasi (copayment)" },
        { kr: '병원비',   romanization: 'byeongwonbi',   uz: 'kasalxona xarajatlari' },
      ],
      examples: [
        { kr: '업무 중 사고가 나는 바람에 손목을 다쳤습니다. 산재 보험으로 처리했습니다.', uz: "Ish davomida hodisa bo'lgani uchun bilagimni jarohatladim. Ishlab chiqarish sug'urtasi orqali hal qilindi." },
        { kr: '산재 보험금을 받으려면 병원 진단서와 사고 경위서가 필요합니다.',  uz: "Ishlab chiqarish sug'urta pulini olish uchun shifoxona xulosasi va hodisa bayonnomasi kerak." },
        { kr: '갑자기 아프게 되는 바람에 건강 보험을 이용해서 치료를 받았습니다.', uz: "To'satdan kasallanib qolganim uchun sog'liq sug'urtasidan foydalanib davolandim." },
        { kr: '귀국할 때 출국 만기 보험금을 받으려면 미리 신청해야 합니다.',    uz: "Vataniga qaytganda ketish muddati sug'urta pulini olish uchun oldindan ariza topshirish kerak." },
        { kr: '4대 보험의 의무 가입은 사용자와 근로자 모두에게 해당됩니다.',     uz: "4 ta sug'urtaning majburiy a'zolik ish beruvchi va ishchi ikkalasiga ham taalluqli." },
      ],
      dialog: [
        { speaker: 'A', kr: '보험에 가입했습니까?',                            uz: "Sug'urtaga a'zo bo'ldingizmi?" },
        { speaker: 'B', kr: '네, 가입했습니다.',                               uz: "Ha, a'zo bo'ldim." },
        { speaker: 'A', kr: '보험금은 어떻게 받습니까?',                       uz: "Sug'urta pulini qanday olasiz?" },
        { speaker: 'B', kr: '신청하면 받을 수 있습니다.',                      uz: "Ariza topshirib olish mumkin." },
        { speaker: 'A', kr: '사고가 있었습니까?',                              uz: "Hodisa bo'lganmi?" },
        { speaker: 'B', kr: '네, 사고가 나는 바람에 병원에 갔습니다. 보험금을 받으려면 서류를 준비해야 해요.', uz: "Ha, hodisa sabab kasalxonaga bordim. Sug'urta pulini olish uchun hujjatlar kerak." },
      ],
      notes: [
        "-는 바람에: kutilmagan salbiy sabab: 사고가 나는 바람에(hodisa bo'lgani uchun).",
        "-(으)려면: shart-maqsad: 받으려면(olish uchun), 가입하려면(a'zo bo'lish uchun).",
        "EPS ishchilari uchun majburiy sug'urtalar: 산재(ishlab chiqarish) + 건강(sog'liq) + 고용(ishchi) + 연금(pensiya).",
        "출국 만기 보험 — ketish muddati sug'urtasi: EPS ishchilari uchun alohida; vataniga qaytganda olinadi.",
        "산재 보험 (ishlab chiqarish sug'urtasi) — ish paytida jarohat bo'lsa; 100% ish beruvchi to'laydi.",
      ],
      games: {
        matchPairs: [
          { kr: '산재 보험', uz: "ishlab chiqarish sug\'urtasi" },
          { kr: '건강 보험', uz: "sog'liq sug'urtasi" },
          { kr: '고용 보험', uz: "ishchi sug\'urtasi" },
          { kr: '연금 보험', uz: "pensiya sug\'urtasi" },
          { kr: '보험금',   uz: "sug'urta puli" },
          { kr: '혜택',     uz: 'imtiyoz' },
        ],
        fillBlank: [
          { sentence: '사고가 나는 바람___ 일을 못 했습니다.',             answer: '에',    options: ['에','서','로','이'],             uz: "Hodisa bo'lgani uchun ish qila olmadim." },
          { sentence: '보험금을 받으___ 신청해야 합니다.',                 answer: '려면',  options: ['려면','서','고','면'],           uz: "Sug'urta pulini olish uchun ariza topshirish kerak." },
          { sentence: '비가 오는 바람에 ___ 됐습니다.',                   answer: '늦게',  options: ['늦게','빨리','일찍','많이'],     uz: "Yomg'ir sabab kech qoldim." },
          { sentence: '4대 보험에 가입___ 면 서류가 필요합니다.',          answer: '하려',  options: ['하려','했','하고','하면'],       uz: "4 ta sug'urtaga a'zo bo'lish uchun hujjatlar kerak." },
          { sentence: '귀국할 때 ___ 만기 보험금을 신청하세요.',           answer: '출국',  options: ['출국','입국','연장','체류'],     uz: "Vataniga qaytganda ketish muddati sug'urta pulini so'rang." },
        ],
        scramble: [
          { kr: '보험',   uz: "sug'urta" },
          { kr: '보상',   uz: 'kompensatsiya' },
          { kr: '산재',   uz: 'ishlab chiqarish' },
          { kr: '건강',   uz: "sog'liq" },
          { kr: '혜택',   uz: 'imtiyoz' },
        ],
      },
    },
    quiz: [
      { question: "'-는 바람에' nimani anglatadi?",               options: ['ijobiy sabab','kutilmagan salbiy sabab','maqsad','shart'],              correct_index: 1 },
      { question: "'-(으)려면' nimani anglatadi?",                options: ['...dan keyin','...bo\'lsa ham','...qilmoqchi bo\'lsangiz','...sababli'], correct_index: 2 },
      { question: "'산재 보험' nimani anglatadi?",               options: ["sog'liq sug'urtasi",'pensiya','ishlab chiqarish (ish joyi) sug\'urtasi','ishchi sug\'urtasi'], correct_index: 2 },
      { question: "EPS ishchilari majburiy 4 ta sug'urta?",       options: ['faqat sog\'liq','산재+건강+고용+연금','faqat pensiya','faqat ishchi'],  correct_index: 1 },
      { question: "'출국 만기 보험' qachon olinadi?",             options: ['har oy','har yil','vataniga qaytganda','ish boshlaganda'],               correct_index: 2 },
      { question: "'청구하다' nimani anglatadi?",                 options: ['tekshirmoq','to\'lamoq','talab qilmoq','a\'zo bo\'lmoq'],               correct_index: 2 },
      { question: "'-는 바람에' vs '-아서/어서' farqi?",           options: ['Farq yo\'q','바람에=faqat salbiy kutilmagan; 아서=har qanday sabab','아서=faqat salbiy','Ikkalasi bir xil'], correct_index: 1 },
    ],
  },

];

// ─────────────────────────────────────────
// DB ga saqlash
// ─────────────────────────────────────────
async function seed() {
  console.log('EPS-TOPIK 6-daraja seed boshlandi...\n');
  console.log('Manba: Eps-Topik2_41-60.docx — Darslar 51-60');
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

    const icons = ['🏨','👨‍🍳','⚠️','🛡️','🦺','🚑','📋','📜','🛂','🏥'];
    console.log(`  ✅  ${icons[lessonData.order_in_level-1]} Dars ${lessonData.order_in_level}: ${lessonData.title_kr} (ID: ${saved.id})`);
  }

  console.log('\n════════════════════════════════════════════════════════════');
  console.log('✅ EPS-TOPIK 6-daraja seed muvaffaqiyatli yakunlandi!');
  console.log('════════════════════════════════════════════════════════════');
  console.log(`\n  📚 Darslar:    ${LESSONS.length} ta (51-60)`);
  console.log(`  🎯 Quiz:       ${LESSONS.length * 7} ta`);
  console.log(`  🔊 Audio keys: ${LESSONS.length * 37} ta`);
  console.log('\n  📋 Darslar ro\'yxati:');
  console.log('  1️⃣  숙박 서비스     — Mehmonxona (-았다가, 반말)');
  console.log('  2️⃣  음식 조리       — Ovqat tayyorlash (-았어야 했는데, -(으)ㄴ 지)');
  console.log('  3️⃣  산업 안전 표지  — Belgilar (-았더니, -아/어 있다)');
  console.log('  4️⃣  안전 보건 수칙  — Xavfsizlik (-도록 하다, -기 위해)');
  console.log('  5️⃣  위생 장비       — Jihozlar (-는 대로, -(으)ㄹ 테니까)');
  console.log('  6️⃣  산업 재해       — Baxtsiz hodisa (-(으)ㄹ 뻔하다, -자마자)');
  console.log('  7️⃣  고용허가제      — EPS tizimi (-는 줄 알았다, -게 되다)');
  console.log('  8️⃣  근로기준법      — Mehnat qonuni (뿐만 아니라, -(으)면 좋겠다)');
  console.log('  9️⃣  출입국 관리법   — Migratsiya (-더라도, -는지)');
  console.log('  🔟 근로자 보험      — Sug\'urta (-는 바람에, -(으)려면)');
  console.log('\n🎉 EPS-TOPIK TO\'LIQ YAKUNLANDI!');
  console.log('════════════════════════════════════════════════════════════');
  console.log('   eps_topik_level1.js → D1-10   ✅');
  console.log('   eps_topik_level2.js → D11-20  ✅');
  console.log('   eps_topik_level3.js → D21-30  ✅');
  console.log('   eps_topik_level4.js → D31-40  ✅');
  console.log('   eps_topik_level5.js → D41-50  ✅');
  console.log('   eps_topik_level6.js → D51-60  ✅');
  console.log('   JAMI: 60 ta EPS-TOPIK darsi!  🎊\n');

  await db.end();
}

seed().catch(err => {
  console.error('❌ Xatolik:', err.message);
  process.exit(1);
});
