import React from "react";

const OurGoals = () => {
  const goals = [
    {
      title: "توظيف التقنيات الحديثة",
      description:
        "نسعى إلى دمج أحدث الأدوات والتقنيات الرقمية في العملية التعليمية، بما يضمن تجربة تفاعلية أكثر سلاسة وفعالية، ويعزز من قدرة المتعلمين على مواكبة التطورات التكنولوجية العالمية.",
      icon: (
        <svg
          width={32}
          height={32}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-secondary"
        >
          <circle
            cx={16}
            cy="16.0001"
            r="13.3333"
            strokeWidth="2.66667"
            strokeLinejoin="round"
          />
          <circle
            cx={16}
            cy={16}
            r={8}
            strokeWidth="2.66667"
            strokeLinejoin="round"
          />
          <circle
            cx={16}
            cy="15.9999"
            r="2.66667"
            strokeWidth="2.66667"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "تطوير القدرات التعليمية",
      description:
        "نعمل على تصميم وتقديم برامج تدريبية متكاملة تهدف إلى رفع كفاءة الطلاب والمعلمين، من خلال أساليب تعليمية مبتكرة تساعدهم في تنمية مهاراتهم وصقل خبراتهم الأكاديمية والعملية.",
      icon: (
        <svg
          width={32}
          height={32}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-secondary"
        >
          <circle
            cx={16}
            cy="16.0001"
            r="13.3333"
            strokeWidth="2.66667"
            strokeLinejoin="round"
          />
          <circle
            cx={16}
            cy={16}
            r={8}
            strokeWidth="2.66667"
            strokeLinejoin="round"
          />
          <circle
            cx={16}
            cy="15.9999"
            r="2.66667"
            strokeWidth="2.66667"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "تحقيق التأثير المجتمعي",
      description:
        "نطمح إلى إعداد جيل واعٍ ومبدع قادر على مواجهة التحديات وإيجاد حلول مبتكرة، مما يساهم في دفع عجلة التنمية المجتمعية ويعزز مكانة الفرد في سوق العمل المحلي والعالمي.",
      icon: (
        <svg
          width={32}
          height={32}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-secondary"
        >
          <path
            d="M29.3333 13.3334V21.3334M29.3333 13.3334L16 6.66675L2.66663 13.3334L16 20.0001L29.3333 13.3334Z"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 16V22.6667C12 26.6667 20 26.6667 24 22.6667V16"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "دعم الاستمرارية في التعلم",
      description:
        "نؤمن بأن التعلم عملية مستمرة، لذلك نوفر بيئة تعليمية مرنة تدعم المتعلم في جميع مراحله وتساعده على تطوير نفسه باستمرار، بما يتناسب مع احتياجاته وتوجهاته المستقبلية.",
      icon: (
        <svg
          width={32}
          height={32}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-secondary"
        >
          <circle
            cx={16}
            cy="10.6667"
            r={8}
            strokeWidth="2.66667"
            strokeLinejoin="round"
          />
          <path
            d="M20.636 17.1868L22.6667 29.3334L16 25.3334L9.33337 29.3334L11.364 17.1868"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="bg-primary-bg py-[60px] lg:py-[80px]"
      dir="rtl"
      aria-label="أهدافنا"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-[64px]">
        {/* Header */}
        <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl text-center leading-9 lg:leading-[1.2] whitespace-normal lg:whitespace-nowrap">
          أهدافنا
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-8 lg:mt-[48px]">
          {goals.map((goal, index) => (
            <GoalCard key={index} data={goal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurGoals;

const GoalCard = ({ data = {} }) => {
  return (
    <div className="flex flex-col items-start gap-2.5 p-[25px] relative bg-primary-light shadow-sm rounded-[30px] border border-solid">
      <div className="items-start gap-3 flex flex-col relative self-stretch w-full">
        <div className="gap-4 flex flex-col self-stretch w-full">
          <div className="relative w-8 h-8">{data?.icon}</div>
          <div className="text-primary-dark font-bold text-lg sm:text-xl leading-7 self-stretch">
            {data?.title}
          </div>
        </div>
        <p className="text-text-alt leading-normal text-sm sm:text-base overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] self-stretch h-auto lg:h-12">
          {data?.description}
        </p>
      </div>
    </div>
  );
};
