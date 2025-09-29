import React, { useState } from "react";
// import info1 from "./info-1.svg";
// import onlineLearning1 from "./online-learning-1.svg";
// import vector from "./vector.svg";

export const MockTestFooter = ({
  onPrevious,
  onNext,
  onSubmit,
  canGoPrevious = true,
  canGoNext = true,
  isLastQuestion = false,
  setIsStart,
  isStart,
  isInReview,
  setIsInReview,
}) => {
  if (isInReview) {
    return <ReviewFooter />
  }
  return (
    <header
      className="flex w-full items-center justify-between px-16 py-8 relative bg-primary"
      role="banner"
    >
      <div
        className="flex w-[191px] items-center justify-end gap-2 px-0 py-3 relative"
        role="region"
        aria-label="معلومات السؤال"
      >
        <BookIcon />
        <span className="relative flex items-center justify-center w-fit mt-[-1.00px] font-medium text-white text-base tracking-[0] leading-[50px] whitespace-nowrap [direction:rtl]">
          معلومات السؤال
        </span>
      </div>

      <button
        className="inline-flex justify-center gap-2 px-0 py-3 flex-[0_0_auto] items-center relative hover:opacity-80 transition-opacity"
        role="region"
        aria-label="صفحة المراجعة"
        onClick={() =>
          alert("صفحة المراجعة - يمكنك هنا مراجعة جميع الأسئلة والإجابات")
        }
      >
        <InfoIcon />
        <h1 className="relative flex items-center justify-center w-fit mt-[-1.00px] font-medium text-white text-base tracking-[0] leading-[50px] whitespace-nowrap [direction:rtl]">
          صفحة المراجعة
        </h1>
      </button>

      {isStart ? (
        <nav
          className="inline-flex justify-center gap-[34px] self-stretch flex-[0_0_auto] items-center relative"
          role="navigation"
          aria-label="Primary navigation"
        >
          <button
            className={`inline-flex gap-[5px] flex-[0_0_auto] items-center relative ${
              !canGoPrevious
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-80"
            }`}
            type="button"
            aria-label="السابق"
            onClick={onPrevious}
            disabled={!canGoPrevious}
          >
            <OutlinedTriangleRihgt />
            <div className="flex w-[68px] justify-center gap-2.5 px-4 py-1 rounded-[10px] items-center relative">
              <span className="relative flex items-center justify-center w-fit mt-[-1.00px] font-medium text-white text-base tracking-[0] leading-[normal] [direction:rtl]">
                السابق
              </span>
            </div>
          </button>
          <button
            className="inline-flex gap-[5px] flex-[0_0_auto] items-center relative hover:opacity-80"
            type="button"
            aria-label={isLastQuestion ? "إرسال الاختبار" : "التالي"}
            onClick={isLastQuestion ? onSubmit : onNext}
          >
            <div className="flex w-[68px] justify-center gap-2.5 px-4 py-1 bg-primary-dark rounded-[10px] items-center relative">
              <span className="relative flex items-center justify-center w-fit mt-[-1.00px] font-medium text-white text-base tracking-[0] leading-[normal] [direction:rtl]">
                {isLastQuestion ? "إرسال" : "التالي"}
              </span>
            </div>
            <TriangleLeft />
          </button>
        </nav>
      ) : (
        <nav
          className="inline-flex justify-center gap-[34px] self-stretch flex-[0_0_auto] items-center relative"
          role="navigation"
          aria-label="Primary navigation"
        >
          <button
            className="inline-flex gap-[5px] flex-[0_0_auto] items-center relative hover:opacity-80"
            type="button"
            aria-label={isLastQuestion ? "إرسال الاختبار" : "التالي"}
            onClick={() => setIsStart(true)}
          >
            <div className="flex w-[68px] justify-center gap-2.5 px-4 py-1 bg-primary-dark rounded-[10px] items-center relative">
              <span className="relative flex items-center justify-center w-fit mt-[-1.00px] font-medium text-white text-base tracking-[0] leading-[normal] [direction:rtl]">
                ابدأ
              </span>
            </div>
            <TriangleLeft />
          </button>
        </nav>
      )}
    </header>
  );
};

const BookIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity={0.981}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.5078 1.19606C13.3923 1.11344 15.0876 1.62906 16.5938 2.74293C16.8744 3.24396 16.7729 3.64239 16.2891 3.93824C16.1217 4.0041 15.9498 4.01973 15.7735 3.98512C15.3919 3.75515 15.0013 3.5364 14.6016 3.32887C12.3946 2.39957 10.3009 2.6027 8.32034 3.93824C7.58197 4.11265 7.2148 3.82359 7.21878 3.07106C7.26266 2.89727 7.34858 2.74883 7.47659 2.62574C8.69577 1.78971 10.0395 1.31316 11.5078 1.19606Z"
      fill="white"
    />
    <path
      opacity={0.98}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6015 4.1956C12.6853 4.13638 13.6775 4.402 14.5781 4.99247C14.9235 5.69213 14.7203 6.12961 13.9687 6.30497C13.5904 6.15118 13.2076 6.00277 12.8203 5.85966C12.2578 5.70343 11.6953 5.70343 11.1328 5.85966C10.7455 6.00277 10.3627 6.15118 9.98436 6.30497C9.39102 6.21235 9.14103 5.86857 9.23436 5.27372C9.287 5.14486 9.35731 5.02768 9.4453 4.92216C10.1135 4.51456 10.8322 4.27237 11.6015 4.1956Z"
      fill="white"
    />
    <path
      opacity={0.983}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.13281 7.19531C7.59178 7.31752 9.87305 8.00503 11.9766 9.25781C14.0792 7.99753 16.3605 7.31784 18.8203 7.21875C19.8902 7.41366 20.523 8.04647 20.7188 9.11719C20.75 12.2891 20.75 15.4609 20.7188 18.6328C20.4772 19.7494 19.7975 20.4291 18.6797 20.6719C17.0701 20.8203 15.5233 21.211 14.0391 21.8438C13.5863 22.0701 13.1488 22.32 12.7266 22.5938C12.2265 22.8125 11.7266 22.8125 11.2266 22.5938C9.96206 21.7814 8.58708 21.2345 7.10156 20.9531C6.43083 20.835 5.75897 20.7256 5.08594 20.625C4.06395 20.3374 3.44677 19.6733 3.23438 18.6328C3.20312 15.4609 3.20312 12.2891 3.23438 9.11719C3.43811 8.04628 4.07093 7.40569 5.13281 7.19531ZM5.27344 8.74219C6.91767 8.8837 8.49577 9.28214 10.0078 9.9375C10.4138 10.1404 10.8044 10.367 11.1797 10.6172C11.2422 13.9922 11.2422 17.3672 11.1797 20.7422C9.37669 19.847 7.47042 19.308 5.46094 19.125C5.17702 19.0267 4.96608 18.847 4.82813 18.5859C4.7505 15.4792 4.73489 12.3699 4.78125 9.25781C4.86019 8.99925 5.02425 8.82741 5.27344 8.74219ZM18.3984 8.74219C18.7795 8.73328 19.0373 8.90513 19.1719 9.25781C19.2182 12.3699 19.2026 15.4792 19.125 18.5859C18.987 18.847 18.7761 19.0267 18.4922 19.125C17.051 19.282 15.6447 19.5945 14.2734 20.0625C13.7567 20.2505 13.2567 20.4771 12.7734 20.7422C12.711 17.3672 12.711 13.9922 12.7734 10.6172C13.964 9.84244 15.2609 9.31903 16.6641 9.04688C17.247 8.93414 17.8251 8.83261 18.3984 8.74219Z"
      fill="white"
    />
  </svg>
);

const InfoIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_164_1602)">
      <path
        opacity={0.965}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9453 0.681354C14.8806 0.450653 18.1384 1.81003 20.7188 4.75948C23.191 7.94918 23.8785 11.4961 22.7813 15.4001C21.5078 19.0485 19.0469 21.5095 15.3984 22.7829C11.4944 23.8802 7.94753 23.1927 4.75782 20.7204C1.49564 17.8416 0.19095 14.24 0.843762 9.91573C1.66387 6.04924 3.85918 3.27582 7.4297 1.59542C8.56314 1.1207 9.73501 0.816012 10.9453 0.681354ZM11.9297 2.18135C15.2939 2.2812 17.9735 3.67182 19.9688 6.35323C21.8627 9.20773 22.2377 12.2546 21.0938 15.4939C19.7561 18.6594 17.4202 20.6672 14.0859 21.5173C10.433 22.1902 7.31584 21.198 4.73439 18.5407C2.21342 15.5447 1.58842 12.1853 2.85939 8.4626C4.197 5.29709 6.53293 3.28928 9.8672 2.43917C10.5551 2.29849 11.2426 2.21255 11.9297 2.18135Z"
        fill="white"
      />
      <path
        opacity={0.952}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.7891 5.60277C12.2248 5.55088 12.5295 5.72277 12.7031 6.1184C12.7344 6.41526 12.7344 6.71216 12.7031 7.00902C12.4192 7.51513 12.0208 7.63232 11.5078 7.36059C11.3857 7.26974 11.2997 7.15256 11.25 7.00902C11.2083 6.66149 11.2239 6.31776 11.2969 5.97777C11.4296 5.80532 11.5936 5.68031 11.7891 5.60277Z"
        fill="white"
      />
      <path
        opacity={0.986}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0078 8.88184C10.7268 8.87401 11.4455 8.88184 12.1641 8.90528C12.4177 8.98698 12.5974 9.15105 12.7031 9.39747C12.7344 12.21 12.7344 15.0225 12.7031 17.835C12.4522 18.3302 12.0694 18.463 11.5547 18.2334C11.4688 18.1475 11.3828 18.0615 11.2969 17.9756C11.2272 15.4628 11.2038 12.9471 11.2266 10.4287C10.8044 10.4365 10.3826 10.4287 9.96096 10.4053C9.46409 10.2122 9.30002 9.86069 9.46877 9.35059C9.57162 9.1008 9.75129 8.94456 10.0078 8.88184Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_164_1602">
        <rect width={24} height={24} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const TriangleLeft = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16 16.7962C16 17.6554 14.9881 18.1146 14.3415 17.5488L8.86009 12.7526C8.40476 12.3542 8.40476 11.6458 8.86009 11.2474L14.3415 6.45119C14.9881 5.88543 16 6.34461 16 7.20377V16.7962Z"
      fill="#152E56"
    />
  </svg>
);

const OutlinedTriangleRihgt = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 18L16 12L10 6V18Z"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// import image from "./image.svg";
// import searchData1 from "./search-data-1.svg";
// import vector2 from "./vector-2.svg";
// import vector3 from "./vector-3.svg";
// import vector from "./vector.svg";

export const ReviewFooter = () => {
  const [activeFilter, setActiveFilter] = useState(null);

  const filterButtons = [
    {
      id: "flagged",
      text: "مراجعة المميز بعلامة",
      icon: <OutlinedFlagIcon />,
    },
    {
      id: "incomplete",
      text: "مراجعة الغير مكتمل",
      icon: <RoundedXIcon />,
    },
    {
      id: "all",
      text: "مراجعة الكل",
      icon: <ReviewIcon />,
    },
  ];

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
  };

  const handleFinishReview = () => {
    // Handle finish review action
    console.log("Finishing review...");
  };

  return (
    <header
      className="flex w-[1440px] items-center justify-between px-16 py-8 relative bg-primary"
      role="banner"
    >
      <nav
        className="inline-flex gap-12 flex-[0_0_auto] items-center relative"
        role="navigation"
        aria-label="مرشحات المراجعة"
      >
        {filterButtons.reverse().map((button) => (
          <button
            key={button.id}
            className={`inline-flex justify-center gap-2 px-4 py-3 flex-[0_0_auto] rounded-[15px] border border-solid border-variable-collection-white-moca items-center relative hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500 transition-colors ${
              button.id === "incomplete" ? "w-[200px]" : ""
            } ${button.id === "all" ? "w-[200px]" : ""}`}
            onClick={() => handleFilterClick(button.id)}
            aria-pressed={activeFilter === button.id}
            aria-label={button.text}
          >
            <div aria-hidden="true">{button.icon}</div>
            <span className="relative flex items-center justify-center w-fit mt-[-1.00px]  text-white text-base tracking-[0] leading-[50px] whitespace-nowrap [direction:rtl]">
              {button.text}
            </span>
          </button>
        ))}
      </nav>

      <button
        className="flex w-[200px] items-center justify-center gap-2 px-6 py-3 relative bg-white rounded-[20px] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500 transition-colors"
        onClick={handleFinishReview}
        aria-label="إنهاء المراجعة"
      >
        <ExitIcon />
        <span className="relative flex items-center justify-center w-fit mt-[-1.00px]  font-medium text-[#be1919] text-base tracking-[0] leading-[50px] whitespace-nowrap [direction:rtl]">
          إنهاء المراجة
        </span>
      </button>
    </header>
  );
};

const ReviewIcon = (props) => (
  <svg
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_164_1802)">
      <path
        opacity={0.935}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.17969 0.303711C5.44536 0.295899 9.71099 0.303711 13.9766 0.327148C15.766 1.55779 17.5473 2.79997 19.3203 4.05371C19.3711 4.10833 19.4102 4.17082 19.4375 4.24121C19.4453 4.60059 19.4531 4.95995 19.4609 5.31934C19.4068 7.83512 19.399 10.3508 19.4375 12.8662C19.3693 13.5867 19.1427 14.2508 18.7578 14.8584C19.0625 15.1631 19.3672 15.4678 19.6719 15.7725C19.8245 15.682 19.9886 15.6586 20.1641 15.7021C21.3438 16.8819 22.5234 18.0615 23.7031 19.2412C24.2835 20.3333 24.0413 21.2005 22.9766 21.8428C22.421 22.0731 21.8897 22.0262 21.3828 21.7021C20.7258 21.081 20.0852 20.4481 19.4609 19.8037C19.4219 20.9909 19.3985 22.1784 19.3906 23.3662C19.3672 23.5147 19.2813 23.6006 19.1328 23.624C13.1134 23.6707 7.0978 23.6551 1.08594 23.5771C1.04688 23.5381 1.00781 23.499 0.96875 23.46C0.9375 15.8037 0.9375 8.14744 0.96875 0.491211C1.03423 0.417605 1.10454 0.355105 1.17969 0.303711ZM1.69531 1.10059C5.6172 1.10059 9.53905 1.10059 13.4609 1.10059C13.4531 2.22569 13.4609 3.35069 13.4844 4.47559C13.5212 4.5593 13.5758 4.62962 13.6484 4.68652C15.3046 4.70996 16.9609 4.71779 18.6172 4.70996C18.625 6.28815 18.6172 7.86629 18.5938 9.44434C17.3335 7.72665 15.6382 7.00009 13.5078 7.26465C11.1419 7.77123 9.74342 9.21657 9.3125 11.6006C9.12186 13.6795 9.86403 15.3279 11.5391 16.5459C13.3215 17.5932 15.1262 17.6322 16.9531 16.6631C17.2578 16.9678 17.5625 17.2725 17.8672 17.5771C17.714 17.739 17.6905 17.9187 17.7969 18.1162C18.0625 18.3819 18.3281 18.6474 18.5938 18.9131C18.6172 20.2255 18.625 21.538 18.6172 22.8506C12.9766 22.8506 7.33592 22.8506 1.69531 22.8506C1.69531 15.6006 1.69531 8.3506 1.69531 1.10059ZM14.2578 1.47559C15.4353 2.28559 16.6072 3.1059 17.7734 3.93652C16.6017 3.95996 15.4298 3.96777 14.2578 3.95996C14.2578 3.13183 14.2578 2.30371 14.2578 1.47559ZM13.9297 7.99121C15.9753 7.92198 17.4518 8.79695 18.3594 10.6162C19.0354 12.4758 18.6838 14.1086 17.3047 15.5146C15.8939 16.6841 14.3314 16.9342 12.6172 16.2646C10.5121 15.1244 9.72303 13.3823 10.25 11.0381C10.8912 9.31065 12.1177 8.29501 13.9297 7.99121ZM18.2891 15.585C18.5909 15.8008 18.8565 16.0586 19.0859 16.3584C18.8594 16.5849 18.6328 16.8115 18.4063 17.0381C18.1399 16.7796 17.8821 16.514 17.6328 16.2412C17.8669 16.0384 18.0857 15.8196 18.2891 15.585ZM19.9297 16.6162C21.0364 17.637 22.1067 18.6995 23.1406 19.8037C23.3723 20.5432 23.1066 20.9963 22.3438 21.1631C22.1686 21.1408 22.0045 21.0861 21.8516 20.999C20.8047 19.9522 19.7578 18.9053 18.7109 17.8584C19.1267 17.4505 19.5329 17.0364 19.9297 16.6162Z"
        fill="white"
      />
      <path
        opacity={0.963}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.00782 2.83496C5.7735 2.82715 8.53912 2.83496 11.3047 2.8584C11.4531 2.9259 11.5312 3.04309 11.5391 3.20996C11.5312 3.37684 11.4531 3.49402 11.3047 3.56152C8.53907 3.59278 5.77345 3.59278 3.00782 3.56152C2.75976 3.31941 2.75976 3.07722 3.00782 2.83496Z"
        fill="white"
      />
      <path
        opacity={0.959}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.28892 6.67872C5.96085 6.67089 8.63272 6.67872 11.3045 6.70216C11.5919 6.91783 11.6075 7.1522 11.3514 7.40528C8.63267 7.43655 5.91392 7.43655 3.19517 7.40528C3.0579 7.25261 3.01884 7.07289 3.07799 6.86622C3.13657 6.78686 3.20689 6.72433 3.28892 6.67872Z"
        fill="white"
      />
      <path
        opacity={0.958}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.24205 9.44434C4.71088 9.43651 6.17961 9.44434 7.6483 9.46778C7.86594 9.56491 7.93625 9.72897 7.85924 9.95997C7.83233 10.0533 7.77763 10.1237 7.69517 10.1709C6.19517 10.2022 4.69517 10.2022 3.19517 10.1709C3.0579 10.0182 3.01884 9.83851 3.07799 9.63184C3.12965 9.56392 3.18434 9.50144 3.24205 9.44434Z"
        fill="white"
      />
      <path
        opacity={0.958}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.2423 12.2568C4.72675 12.249 6.21112 12.2568 7.69542 12.2803C7.85287 12.3335 7.91536 12.4428 7.88292 12.6084C7.90725 12.7786 7.84472 12.9035 7.69542 12.9834C6.21103 13.0147 4.72667 13.0147 3.2423 12.9834C3.10092 12.9117 3.03842 12.7945 3.0548 12.6318C3.0446 12.4647 3.10709 12.3397 3.2423 12.2568Z"
        fill="white"
      />
      <path
        opacity={0.958}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.2423 15.0225C4.72675 15.0146 6.21112 15.0225 7.69542 15.0459C7.86942 15.1637 7.92408 15.3278 7.85948 15.5381C7.82269 15.6218 7.76803 15.6921 7.69542 15.749C6.21103 15.7803 4.72667 15.7803 3.2423 15.749C3.10092 15.6774 3.03842 15.5602 3.0548 15.3975C3.0446 15.2303 3.10709 15.1053 3.2423 15.0225Z"
        fill="white"
      />
      <path
        opacity={0.966}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.2423 17.7881C6.85172 17.7803 10.4611 17.7881 14.0704 17.8115C14.2279 17.8647 14.2904 17.9741 14.2579 18.1397C14.2814 18.3116 14.2188 18.4366 14.0704 18.5147C10.461 18.5459 6.85167 18.5459 3.2423 18.5147C3.10092 18.443 3.03842 18.3258 3.0548 18.1631C3.0446 17.9959 3.10709 17.871 3.2423 17.7881Z"
        fill="white"
      />
      <path
        opacity={0.966}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.2423 20.5537C6.85172 20.5459 10.4611 20.5537 14.0704 20.5772C14.2118 20.6488 14.2743 20.766 14.2579 20.9287C14.2743 21.0914 14.2118 21.2086 14.0704 21.2803C10.461 21.3115 6.85167 21.3115 3.2423 21.2803C3.10092 21.2086 3.03842 21.0914 3.0548 20.9287C3.0446 20.7616 3.10709 20.6366 3.2423 20.5537Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_164_1802">
        <rect width={24} height={24} fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

const RoundedXIcon = (props) => (
  <svg
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity={0.975}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.492 1.47464C15.4805 1.25452 18.6758 2.72327 21.078 5.88089C23.2013 9.11611 23.5607 12.538 22.1561 16.1465C20.834 19.0624 18.6544 21.0233 15.617 22.0293C11.3247 23.1657 7.64501 22.1423 4.57798 18.959C2.09963 15.9654 1.38088 12.5904 2.42173 8.83402C3.60142 5.40431 5.90609 3.09964 9.33579 1.91995C10.0505 1.71925 10.7692 1.57082 11.492 1.47464ZM12.4295 2.97464C16.2131 3.14386 18.9552 4.9095 20.6561 8.27152C21.878 11.2153 21.6748 14.059 20.0467 16.8028C18.2412 19.4678 15.7178 20.8584 12.4764 20.9746C9.01615 20.8275 6.39894 19.2806 4.62486 16.334C3.35599 13.9119 3.16849 11.4119 4.06236 8.83402C5.38742 5.63574 7.75461 3.72166 11.1639 3.09183C11.593 3.05263 12.0148 3.01357 12.4295 2.97464Z"
      fill="white"
    />
    <path
      opacity={0.964}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.25787 7.24249C8.50523 7.21582 8.7396 7.25491 8.96099 7.35968C10.1257 8.53221 11.2976 9.69625 12.4766 10.8519C13.6557 9.69625 14.8275 8.53221 15.9922 7.35968C16.3711 7.17672 16.7227 7.21582 17.0469 7.47686C17.2435 7.79547 17.2591 8.1236 17.0938 8.46124C15.9213 9.62594 14.7572 10.7978 13.6016 11.9769C14.7572 13.1559 15.9213 14.3278 17.0938 15.4925C17.2768 15.8714 17.2377 16.2229 16.9766 16.5472C16.658 16.7437 16.3299 16.7593 15.9922 16.5941C14.8275 15.4215 13.6557 14.2575 12.4766 13.1019C11.2976 14.2575 10.1257 15.4215 8.96099 16.5941C8.5821 16.777 8.23054 16.7379 7.90631 16.4769C7.70976 16.1583 7.69415 15.8301 7.85943 15.4925C9.03196 14.3278 10.196 13.1559 11.3516 11.9769C10.196 10.7978 9.03196 9.62594 7.85943 8.46124C7.60621 7.91618 7.73906 7.50991 8.25787 7.24249Z"
      fill="white"
    />
  </svg>
);

const OutlinedFlagIcon = (props) => (
  <svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.84766 1.28125V20.7207"
      stroke="white"
      strokeWidth={1.62}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.84766 2.90234H11.8521L15.8544 4.5223H19.8566C20.1599 4.5223 20.4507 4.63608 20.6652 4.83862C20.8796 5.04115 21.0001 5.31584 21.0001 5.60227V14.782C21.0001 15.0684 20.8796 15.3431 20.6652 15.5457C20.4507 15.7482 20.1599 15.862 19.8566 15.862H15.8544L11.8521 14.242H3.84766V2.90234Z"
      stroke="white"
      strokeWidth={1.62}
      strokeLinejoin="round"
    />
    <path
      d="M1.55859 20.7227H6.13258"
      stroke="white"
      strokeWidth={1.62}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ExitIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 3H11C11.7956 3 12.5587 3.31607 13.1213 3.87868C13.6839 4.44129 14 5.20435 14 6V10H13V6C13 5.46957 12.7893 4.96086 12.4142 4.58579C12.0391 4.21071 11.5304 4 11 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H11C11.5304 21 12.0391 20.7893 12.4142 20.4142C12.7893 20.0391 13 19.5304 13 19V15H14V19C14 19.7956 13.6839 20.5587 13.1213 21.1213C12.5587 21.6839 11.7956 22 11 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V6C2 5.20435 2.31607 4.44129 2.87868 3.87868C3.44129 3.31607 4.20435 3 5 3ZM8 12H19.25L16 8.75L16.66 8L21.16 12.5L16.66 17L16 16.25L19.25 13H8V12Z"
      fill="#BE1A1A"
    />
  </svg>
);
