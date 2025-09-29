import React from "react";

const OurMessagesSection = () => {
  return (
    <div className="container mx-auto px-[64px] pt-[48px] pb-[48px]">
      <div className="flex justify-between">
        <img
          src="/images/Rectangle 2.png"
          alt=""
          className="w-[546px] h-[319px] rounded-2xl"
        />
        <div className="flex flex-col justify-between !h-full">
          <div className="w-[656px] !h-full flex flex-col gap-8 justify-between items-start">
            <div className="inline-flex items-start justify-end gap-2.5 px-14 py-3 relative bg-primary-light shadow-lg rounded-[15px]">
              <div className="relative flex items-center justify-center w-fit mt-[-1.00px]  font-bold text-foundation-bluedarker text-xl text-left tracking-[0] leading-8 whitespace-nowrap ">
                رسالتنا
              </div>
            </div>
            <div className=" mt-atuo self-stretch flex flex-col justify-start items-start gap-6">
              <div className="self-stretch text-right justify-center text-text text-[32px] font-bold  capitalize leading-[50px]">
                تمكين كل متعلم من تحقيق طموحاته والوصول إلى أهدافه
              </div>
              <div className="self-stretch text-xl text-right justify-center text-neutral-500  font-medium  leading-normal">
                رسالتنا هي توفير محتوى تدريبي عالي الجودة بتجربة تفاعلية مرنة
                وسهلة الوصول، تدعم المتدربين والمعلمين على حد سواء، وتساعدهم على
                تنمية مهاراتهم وصقل خبراتهم العملية والعلمية بما يتناسب مع
                متطلبات سوق العمل المتجدد.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMessagesSection;
