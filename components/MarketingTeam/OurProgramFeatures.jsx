import React from "react";
import Container from "../ui/Container";

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
    <div className="bg-gradient-to-b from-white to-primary-light py-12 sm:py-16 lg:py-[80px]">
      <Container className=" mx-auto px-0 sm:px-8 lg:px-[64px]">
        {/* Header */}
        <h2 className="text-text font-bold text-2xl sm:text-3xl lg:text-5xl text-center leading-8 sm:leading-9 lg:leading-9 mb-8 sm:mb-10 lg:mb-[48px]">
          ميزات برنامجنا
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {goals.map((goal, index) => (
            <GoalCard key={index} data={goal} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default OurProgramFeatures;

const GoalCard = ({ data = {} }) => {
  return (
    <div className="flex flex-col items-start gap-2.5 p-4 sm:p-5 lg:p-[25px] relative bg-primary-light shadow-sm rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] border border-solid">
      <div className="items-start gap-3 flex flex-col relative self-stretch w-full flex-[0_0_auto]">
        <div className="gap-3 sm:gap-4 flex flex-col relative self-stretch w-full flex-[0_0_auto]">
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8">
            <div className="scale-75 sm:scale-90 lg:scale-100 origin-top-left">
              {data?.icon}
            </div>
          </div>
          <h3 className="text-primary-dark font-bold text-lg sm:text-xl leading-6 sm:leading-7 relative self-stretch">
            {data?.title}
          </h3>
        </div>
        <p className="min-h-[48px] sm:h-12 text-text-alt leading-normal text-sm sm:text-base overflow-hidden text-ellipsis line-clamp-2 relative self-stretch">
          {data?.description}
        </p>
      </div>
    </div>
  );
};
