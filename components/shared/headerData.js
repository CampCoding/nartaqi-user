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
    
  },
  {
    key: "free",
    className: "text-text text-base leading-6 whitespace-nowrap",
    title: "الشروحات المجانية",
    items: [
     
    ],
  },
 

  {
    key: "competitions",
    className: "text-text text-base leading-6 whitespace-nowrap",
    title: "المسابقات",
    link:"/competitions"
    // items: [
    //   {
    //     id: 1,
    //     title: "متجر المكـــافات",
    //     link: "/rewards-store",
    //   },
    //   {
    //     id: 1,
    //     title: "مسابقة القدرات العامة",
    //     count: 25,
    //     link: "/competitions/general-aptitude",
    //   },
    //   {
    //     id: 2,
    //     title: "مسابقة التحصيلي",
    //     count: 50,
    //     link: "/competitions/achievement",
    //   },
    //   {
    //     id: 3,
    //     title: "مسابقة الرخصة المهنية",
    //     count: 15,
    //     link: "/competitions/pro-license",
    //   },
    //   {
    //     id: 4,
    //     title: "مسابقة قدرات الجامعيين",
    //     count: 10,
    //     link: "/competitions/university-aptitude",
    //   },
    //   {
    //     id: 5,
    //     title: "مسابقة القدرة المعرفية",
    //     count: 0,
    //     link: "/competitions/cognitive",
    //   },
    //   {
    //     id: 6,
    //     title: "مسابقة STEP",
    //     count: 30,
    //     link: "/competitions/step",
    //   },
    //   {
    //     id: 7,
    //     title: "مسابقة اللغات و البرمجة",
    //     count: 0,
    //     link: "/competitions/languages-programming",
    //   },
    //   {
    //     id: 8,
    //     title: "مسابقة حفظ القرآن الكريم",
    //     count: 6,
    //     link: "/competitions/quran",
    //   },
    //   { 
    //     id: 9,
    //     title: "مسابقة التأهيل لاختبار CPC - ARAMCO",
    //     count: 25,
    //     link: "/competitions/cpc-aramco",
    //   },
    // ],
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
        ],
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
    title: "المتجر",
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
    items: [
      {
        id: 1,
        title: "انضم إلينا كمدرب",
        link: "https://wa.me/+201098286080?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D9%86%D8%B6%D9%85%D8%A7%D9%85%20%D9%83%D9%85%D8%AF%D8%B1%D8%A8%20%D9%81%D9%8A%20%D9%85%D9%86%D8%B5%D8%AA%D9%83%D9%85",
        target: "_blank",
      },
      {
        id: 2,
        title: "انضم إلينا كمسوق",
        link: "/marketing-team",
      },
      {
        id: 3,
        title: "انضم إلينا كمشرف",
        link: "https://wa.me/+201098286080?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D9%86%D8%B6%D9%85%D8%A7%D9%85%20%D9%83%D9%85%D8%B4%D8%B1%D9%81%20%D9%81%D9%8A%20%D9%85%D9%86%D8%B5%D8%AA%D9%83%D9%85",
        target: "_blank",
      },
    ],
  },
  {
    key: "my courses",
    className: "text-text text-base leading-6 whitespace-nowrap",
    title: "دوراتي",
    link:"/my-courses",
    ifLoggedIn: true,
  },
];

export default headerData;
