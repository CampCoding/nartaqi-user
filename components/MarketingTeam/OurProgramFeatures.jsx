import React from "react";

const OurProgramFeatures = () => {
  const goals = [
    {
      title: "مجتمع نشط",
      description:
        "انضم إلى مجتمع من المسوقين بالعمولة الناجحين وتبادل الخبرات.",
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
            d="M5.33337 26.0013V6.0013C5.33337 5.08083 5.65881 4.29515 6.30968 3.64428C6.96056 2.99341 7.74623 2.66797 8.66671 2.66797H26.6667V29.3346H8.66671C7.74623 29.3346 6.96056 29.0092 6.30968 28.3583C5.65881 27.7074 5.33337 26.9218 5.33337 26.0013ZM5.33337 26.0013C5.33337 25.0808 5.65881 24.2952 6.30968 23.6443C6.96056 22.9934 7.74623 22.668 8.66671 22.668H26.6667"
            strokeWidth={2.66667}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "برنامج ولاء",
      description: "مكافآت حصرية للمسوقين المتميزين والملتزمين.",
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
      title: "تحديثات مستمرة",
      description: "تطوير مستمر للبرنامج لضمان أفضل الفرص.",

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
    {
      title: "تحليلات مفصلة",
      description: "لوحة تحكم متقدمة مع تحليلات دقيقة لتتبع أدائك.",
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
  ];

  return (
    <div className=" bg-gradient-to-b  from-white to-primary-light py-[80px]">
      <div className="container mx-auto px-[64px]">
        {/* Header */}
        <div className=" text-text text-bold text-5xl text-center leading-9 whitespace-nowrap ">
          ميزات برنامجنا{" "}
        </div>
        <div className="grid grid-cols-2 gap-8 mt-[48px]">
          {goals.map((goal, index) => (
            <GoalCard key={index} data={goal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurProgramFeatures;

const GoalCard = ({ data = {} }) => {
  return (
    <div className="flex flex-col  items-start gap-2.5 p-[25px] relative bg-primary-light shadow-sm rounded-[30px] border border-solid ">
      <div className="items-start gap-3 flex flex-col relative self-stretch w-full flex-[0_0_auto]">
        <div className=" gap-4 flex flex-col relative self-stretch w-full flex-[0_0_auto]">
          <div className="relative w-8 h-8">{data?.icon}</div>
          <div className=" text-primary-dark font-bold text-xl leading-7 relative self-stretch ">
            {data?.title}
          </div>
        </div>
        <p className="h-12  text-text-alt leading-normal text-base  overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] relative self-stretch ">
          {data?.description}
        </p>
      </div>
    </div>
  );
};
