import React from "react";

const OurMessagesSection = () => {
  return (
    <div
      className="
        container mx-auto
        px-4 sm:px-6 lg:px-[64px]
        pt-8 lg:pt-[48px]
        pb-8 lg:pb-[48px]
      "
      dir="rtl"
      aria-label="قسم رسالتنا"
    >
      <div
        className="
          flex flex-col lg:flex-row
          items-stretch lg:items-start
          justify-between
          gap-8 lg:gap-10
        "
      >
        {/* الصورة */}
        <img
          src="/images/Rectangle 2.png"
          alt="صورة توضيحية لرسالة المنصة"
          className="
            w-full h-auto rounded-2xl
            lg:w-[546px] lg:h-[319px] lg:object-cover
            shrink-0
          "
        />

        {/* النص */}
        <div className="flex flex-col justify-between w-full">
          <div
            className="
              w-full lg:w-[656px]
              flex flex-col gap-6 lg:gap-8
              justify-between items-start
              h-full
            "
          >
            <div className="inline-flex items-start justify-end gap-2.5 px-6 lg:px-14 py-3 relative bg-primary-light shadow-lg rounded-[15px]">
              <div className="relative flex items-center justify-center w-fit font-bold text-foundation-bluedarker text-lg lg:text-xl tracking-[0] leading-8 whitespace-nowrap">
                رسالتنا
              </div>
            </div>

            <div className="self-stretch flex flex-col justify-start items-start gap-4 lg:gap-6 mt-auto">
              <h2 className="self-stretch text-right text-text text-2xl lg:text-[32px] font-bold leading-9 lg:leading-[50px]">
                تمكين كل متعلم من تحقيق طموحاته والوصول إلى أهدافه
              </h2>

              <p className="self-stretch text-right text-base lg:text-xl text-neutral-500 font-medium leading-relaxed">
                رسالتنا هي توفير محتوى تدريبي عالي الجودة بتجربة تفاعلية مرنة
                وسهلة الوصول، تدعم المتدربين والمعلمين على حد سواء، وتساعدهم على
                تنمية مهاراتهم وصقل خبراتهم العملية والعلمية بما يتناسب مع
                متطلبات سوق العمل المتجدد.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMessagesSection;
