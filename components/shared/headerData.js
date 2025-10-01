const headerData = [
  {
    key: "home",
    title: "الرئيسية",
    link: "/",
  },
  {
    key: "courses",
    className: "text-text text-base leading-6 whitespace-nowrap",
    title: "الدورات",
    items: [
      {
        id: 1,
        count: 25,
        title: "دورات القدرات العامة",
        link: "/courses/achievement",
       
      },
      {
        id: 2,
        count: 50,
        title: "دورات تحصيلي",
        link: "/courses/achievement",
      },
      {
        id: 3,
        count: 15,
        title: "دورات الرخصة المهنية",
        link: "/courses/pro-license",
      },
      {
        id: 4,
        count: 10,
        title: "دورات قدرات جامعية",
        link: "/courses/university-aptitude",
      },
      {
        id: 5,
        count: 0,
        title: "دورات القدرة المعرفية",
        link: "/courses/cognitive",
      },
      {
        id: 6,
        count: 30,
        title: "دورات STEP",
        link: "/courses/step",
      },
      {
        id: 7,
        count: 6,
        title: "دورات اللغات و البرمجة",
        link: "/courses/languages-programming",
      },
      {
        id: 8,
        count: 8,
        title: "حلقات حفظ القرآن الكريم",
        link: "/courses/quran",
      },
      {
        id: 9,
        count: 25,
        title: "دورات التأهيل لاختبار CPC- ARAMCO",
        link: "/courses/cpc-aramco",
      },
    ],
  },
  {
    key: "free",
    className: "text-text text-base leading-6 whitespace-nowrap",
    title: "الشروحات المجانية",
    items: [
      {
        id: 1,
        title: "القدرات العامة",
        count: 25,
        link: "/free-courses?category=general-aptitude",
      },
      {
        id: 2,
        title: "التحصيلي",
        count: 50,
        link: "/free-courses?category=achievement",
      },
      {
        id: 3,
        title: "قدرات الجامعيين",
        count: 10,
        link: "/free-courses?category=university-aptitude",
      },
      {
        id: 4,
        title: "القدرة المعرفية",
        count: 0,
        link: "/free-courses?category=cognitive",
      },
      {
        id: 5,
        title: "الرخصة المهنية",
        count: 9,
        link: "/free-courses?category=pro-license",
      },
      {
        id: 6,
        title: "اختبار اللغة الإنجليزية STEP",
        count: 30,
        link: "/free-courses?category=step",
      },
      {
        id: 7,
        title: "اللغات و البرمجة",
        count: 6,
        link: "/free-courses?category=languages-programming",
      },
      {
        id: 8,
        title: "حفظ القرآن الكريم",
        count: 8,
        link: "/free-courses?category=quran",
      },
    ],
  },
  {
    key: "competitions",
    className: "text-text text-base leading-6 whitespace-nowrap",
    title: "المسابقات",
    items: [
      {
        id: 1,
        title: "متجر المكـــافات",
        link: "/rewards-store",
      },
      {
        id: 1,
        title: "مسابقة القدرات العامة",
        count: 25,
        link: "/competitions/general-aptitude",
      },
      {
        id: 2,
        title: "مسابقة التحصيلي",
        count: 50,
        link: "/competitions/achievement",
      },
      {
        id: 3,
        title: "مسابقة الرخصة المهنية",
        count: 15,
        link: "/competitions/pro-license",
      },
      {
        id: 4,
        title: "مسابقة قدرات الجامعيين",
        count: 10,
        link: "/competitions/university-aptitude",
      },
      {
        id: 5,
        title: "مسابقة القدرة المعرفية",
        count: 0,
        link: "/competitions/cognitive",
      },
      {
        id: 6,
        title: "مسابقة STEP",
        count: 30,
        link: "/competitions/step",
      },
      {
        id: 7,
        title: "مسابقة اللغات و البرمجة",
        count: 0,
        link: "/competitions/languages-programming",
      },
      {
        id: 8,
        title: "مسابقة حفظ القرآن الكريم",
        count: 6,
        link: "/competitions/quran",
      },
      {
        id: 9,
        title: "مسابقة التأهيل لاختبار CPC - ARAMCO",
        count: 25,
        link: "/competitions/cpc-aramco",
      },
    ],
  },
  {
    key: "services",
    className: "text-text text-base leading-6 whitespace-nowrap",
    title: "خدمات مجانية",
    items: [
      {
        id: 1,
        title: "أنشئ جدول للمذاكرة",
        link: "/study-planner",
      },
      {
        id: 2,
        title: "اختبار تحديد المستوى",
        // link: "/services/placement-test",
        subItems: [
          {
            key: "general-aptitude",
            title: "اختبار القدرات العامة",
            link: "/exam-details/general-aptitude",
          },
          {
            key: "achievement",
            title: "اختبار التحصيلي",
            link: "/exam-details/achievement",
          },
          {
            key: "pro-license",
            title: "اختبار الرخصة المهنية",
            link: "/exam-details/pro-license",
          },
          {
            key: "university-aptitude",
            title: "اختبار قدرات الجامعيين",
            link: "/exam-details/university-aptitude",
          },
          {
            key: "cognitive",
            title: "اختبار القدرة المعرفية",
            link: "/exam-details/cognitive",
          },
          {
            key: "step",
            title: "اختبار STEP",
            link: "/exam-details/step",
          },
          {
            key: "languages-programming",
            title: "اختبار اللغات و البرمجة",
            link: "/exam-details/languages-programming",
          },
          {
            key: "quran",
            title: "اختبار حفظ القرآن الكريم",
            link: "/exam-details/quran",
          },
          {
            key: "cpc-aramco",
            title: "اختبار التأهيل لاختبار CPC-ARAMCO",
            link: "/exam-details/cpc-aramco",
          },
        ]
      },
      {
        id: 3,
        title: "احسب نسبتك الموزونة",
        link: "/weighted-percentage-calculator",
        
      },
    ],
  },
  {
    key: "services",
    className: "text-text text-base leading-6 whitespace-nowrap",
    title: "متجر الكتب",
    link: "/store",
  },
  {
    key: "grades",
    className: "text-text text-base leading-6 whitespace-nowrap",
    title: "درجات الطلاب",
    items: [
      {
        id: 1,
        title: "درجات الطلاب بالقدرات",
        link: "/student-results",
      },
      {
        id: 2,
        title: "درجات الطلاب التحصيلي",
        link: "/student-achievement-scores",
      },
     
    ],
  },
  {
    key: "join",
    className: "text-text text-base leading-6 whitespace-nowrap",
    title: "انضم إلينا",
    link:"/marketing-team"
  
  },
];

export default headerData;
