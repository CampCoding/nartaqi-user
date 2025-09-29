import React from "react";

const OurVision = () => {
  return (
    <div
      className=" pt-[48px] flex pb-[48px] relative bg-gradient-to-l from-black/80 via-black/40 to-black/0"
      style={{
        backgroundImage: `url('${"/images/scrolig (1).png"}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className=" w-full container px-[65px] mx-auto  inline-flex justify-between items-start">
        <div className="w-[1311px] inline-flex flex-col justify-start items-center gap-6">
          <div className="self-stretch text-center justify-center text-primary text-5xl font-bold">
            رؤيتنا
          </div>
          <div className="self-stretch  text-center justify-center text-white text-[32px] font-medium ">
            رؤيتنا أن نصبح المنصة التعليمية الأولى في العالم العربي، نساهم في
            نشر ثقافة التعلم المستمر، ونوفر تجربة تعليمية متكاملة ترتكز على
            الابتكار والتقنيات الحديثة، بحيث نفتح للمتعلمين والمعلمين آفاقًا
            أوسع من النجاح والتميز.
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurVision;
