
export const FirstSection = () => {
  return (
    <main className="flex items-start justify-between relative ">
   

      <section className="flex flex-col w-[578px] items-start justify-between relative self-stretch">
        <header className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <h1 className="mt-[-1.00px]  font-bold text-text text-3xl relative flex items-center justify-center self-stretch tracking-[0] leading-[normal] [direction:rtl]">
            نافس، تعلم، وحقق إنجازاتك مع أقوى المسابقات التعليمية
          </h1>

          <p className=" font-medium text-text-alt text-xl relative flex items-center justify-center self-stretch tracking-[0] leading-[normal] [direction:rtl]">
            شارك في التحديات اليومية والأسبوعية، اجمع النقاط واستبدلها بمكافآت
            وخصومات تشجعك تكمل وتوصل لأهدافك التعليمية.
          </p>
        </header>

        <button
          className="flex  items-center justify-center gap-2 px-16 py-4 relative flex-[0_0_auto] bg-primary rounded-[20px] shadow-[0px_6px_24px_#bac6dc33] hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
          type="button"
          aria-label="ابدأ الأن - بدء استخدام المنصة التعليمية"
        >
          <span className="relative [display:-webkit-box] items-center justify-center w-fit  font-bold text-neutral-50 text-xl text-center leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] [direction:rtl]">
            ابدأ الأن
          </span>
        </button>
      </section>


      <section
        className="relative w-[732px] h-[397.6px] rounded-[50px] bg-[url(/images/competitions.png)] bg-cover bg-[50%_50%]"
        role="img"
        aria-label="Educational competition illustration showing people celebrating achievements"
      ></section>
    </main>
  );
};