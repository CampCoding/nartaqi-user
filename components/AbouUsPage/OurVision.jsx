import React from "react";

const OurVision = () => {
  return (
    <div
      className="
        relative bg-gradient-to-l from-black/80 via-black/40 to-black/0
        pt-8 lg:pt-[48px]
        pb-8 lg:pb-[48px]
      "
      style={{
        backgroundImage: `url('/images/scrolig (1).png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      aria-label="قسم رؤيتنا"
    >
      <div
        className="
          container mx-auto w-full
          px-4 sm:px-6 lg:px-[65px]
          flex
        "
      >
        <div
          className="
            w-full lg:w-[1311px]
            inline-flex flex-col justify-start items-center gap-4 lg:gap-6
            mx-auto
          "
        >
          <h2
            className="
              self-stretch text-center text-primary
              text-3xl sm:text-4xl lg:text-5xl
              font-bold
            "
          >
            رؤيتنا
          </h2>

          <p
            className="
              self-stretch text-center text-white
              text-lg sm:text-xl lg:text-[32px]
              font-medium
              leading-relaxed lg:leading-[1.6]
            "
          >
            رؤيتنا أن نصبح المنصة التعليمية الأولى في العالم العربي، نساهم في
            نشر ثقافة التعلم المستمر، ونوفر تجربة تعليمية متكاملة ترتكز على
            الابتكار والتقنيات الحديثة، بحيث نفتح للمتعلمين والمعلمين آفاقًا
            أوسع من النجاح والتميز.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurVision;
