export const RewardCard = ({ locked = false }) => {
  return (
    <article
      className="flex flex-col overflow-hidden w-[420px] items-center gap-8 pt-0 pb-16 px-0 relative bg-white rounded-[30px] border-[3px] border-solid border-primary-light"
      role="article"
      aria-labelledby="course-title"
    >
      {locked && (
        <div className="absolute z-20 inset-0 flex items-center justify-center bg-[#87878766]">
          <LockIcon />
        </div>
      )}

      <div
        className="relative self-stretch w-full h-[222px] rounded-[30px_30px_0px_0px] bg-[url(/images/books.png)] bg-cover bg-[50%_50%]"
        role="img"
        aria-label="صورة دورة الرياضيات المتقدمة"
      />
      <div className="flex-col h-[194px] items-start justify-between px-4 py-0 flex relative self-stretch w-full">
        <header className="flex-col items-start gap-4 flex-[0_0_auto] flex relative self-stretch w-full">
          <h1
            id="course-title"
            className="relative flex items-center text-bold justify-center w-fit mt-[-1.00px] text-text text-2xl  leading-[normal] [direction:rtl]"
          >
            دورة كاملة في الرياضيات المتقدمة
          </h1>
          <div
            className="self-stretch text-bold text-secondary [-webkit-line-clamp:2] relative [display:-webkit-box] items-center justify-center text-base leading-[normal] overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [direction:rtl]"
            role="text"
            aria-label="سعر الدورة: 500 نقطة"
          >
            500 نقطه
          </div>
        </header>
        <button
          className={`items-center ${
            locked ? "bg-[#71717A]" : "bg-primary"
          } justify-center gap-2 p-4 flex-[0_0_auto]  rounded-[14px] flex relative self-stretch w-full hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200`}
          type="button"
          aria-label="استبدال الدورة بالنقاط"
        >
          <span className="w-fit text-white  font-bold text-center [-webkit-line-clamp:1] relative [display:-webkit-box] items-center justify-center text-base leading-[normal] overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [direction:rtl]">
            استبدال
          </span>
        </button>
      </div>
    </article>
  );
};

const LockIcon = (props) => (
  <svg
    width={72}
    height={72}
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18 66C16.35 66 14.938 65.413 13.764 64.239C12.59 63.065 12.002 61.652 12 60V30C12 28.35 12.588 26.938 13.764 25.764C14.94 24.59 16.352 24.002 18 24H21V18C21 13.85 22.463 10.313 25.389 7.389C28.315 4.465 31.852 3.002 36 3C40.148 2.998 43.686 4.461 46.614 7.389C49.542 10.317 51.004 13.854 51 18V24H54C55.65 24 57.063 24.588 58.239 25.764C59.415 26.94 60.002 28.352 60 30V60C60 61.65 59.413 63.063 58.239 64.239C57.065 65.415 55.652 66.002 54 66H18ZM18 60H54V30H18V60ZM36 51C37.65 51 39.063 50.413 40.239 49.239C41.415 48.065 42.002 46.652 42 45C41.998 43.348 41.411 41.936 40.239 40.764C39.067 39.592 37.654 39.004 36 39C34.346 38.996 32.934 39.584 31.764 40.764C30.594 41.944 30.006 43.356 30 45C29.994 46.644 30.582 48.057 31.764 49.239C32.946 50.421 34.358 51.008 36 51ZM27 24H45V18C45 15.5 44.125 13.375 42.375 11.625C40.625 9.875 38.5 9 36 9C33.5 9 31.375 9.875 29.625 11.625C27.875 13.375 27 15.5 27 18V24Z"
      fill="white"
    />
  </svg>
);
