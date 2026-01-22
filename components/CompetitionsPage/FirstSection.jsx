export const FirstSection = () => {
  return (
    <main className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 xl:gap-16 relative w-full">
      <section className="flex flex-col w-full lg:w-[578px] items-start justify-between relative order-2 lg:order-1">
        <header className="flex flex-col items-start gap-3 sm:gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <h1 className="font-bold text-text text-xl sm:text-2xl lg:text-3xl relative flex items-start justify-start self-stretch tracking-[0] leading-[normal] [direction:rtl]">
            نافس، تعلم، وحقق إنجازاتك مع أقوى المسابقات التعليمية
          </h1>

          <p className="font-medium text-text-alt text-base sm:text-lg lg:text-xl relative flex items-center justify-center self-stretch tracking-[0] leading-[normal] [direction:rtl]">
            شارك في التحديات اليومية والأسبوعية، اجمع النقاط واستبدلها بمكافآت
            وخصومات تشجعك تكمل وتوصل لأهدافك التعليمية.
          </p>
        </header>

        <a href="#competitions-section"
          className="flex items-center justify-center gap-2 px-8 sm:px-12 lg:px-16 py-3 sm:py-4 relative flex-[0_0_auto] bg-primary rounded-[15px] sm:rounded-[20px] shadow-[0px_6px_24px_#bac6dc33] hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200 w-full sm:w-auto mt-6 lg:mt-8"
          type="button"
          aria-label="ابدأ الأن - بدء استخدام المنصة التعليمية"
        >
          <span className="relative [display:-webkit-box] items-center justify-center w-fit font-bold text-neutral-50 text-lg sm:text-xl text-center leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] [direction:rtl]">
            ابدأ الأن
          </span>
        </a>
      </section>

      <section
        className="relative w-full lg:w-[732px] h-[250px] sm:h-[300px] lg:h-[397.6px] rounded-[25px] sm:rounded-[40px] lg:rounded-[50px] bg-[url(/images/competitions.png)] bg-cover bg-center order-1 lg:order-2 flex-shrink-0"
        role="img"
        aria-label="Educational competition illustration showing people celebrating achievements"
      ></section>
    </main>
  );
};
