import React from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import Container from "../../components/ui/Container";

const TechnicalSupport = () => {
  return (
    <div>
      <PagesBanner
        variant="normal"
        objectPosition={"object-[100%_80%]"}
        image="/images/Frame 1000005434.png"
        title={"الدعم الفني"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "الدعم الفني",
            link: "/services",
          },
        ]}
      />

      <Container className="mx-auto mt-6 sm:mt-8 lg:mt-[48px] mb-16 sm:mb-24 lg:mb-[132px] ">
        <div className="flex flex-col items-start gap-4 sm:gap-6 relative mb-8 sm:mb-10 lg:mb-[48px]">
          <h1 className="font-bold text-primary text-xl sm:text-2xl tracking-[0] leading-[normal]">
            ما هي قنوات الدعم الفني؟
          </h1>

          <div className="flex flex-col items-start gap-6 sm:gap-8 self-stretch w-full relative flex-[0_0_auto]">
            {/* WhatsApp Support */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 relative flex-[0_0_auto] w-full ">
              <div className="self-stretch flex items-center  w-full sm:w-[291px] font-semibold text-text text-sm sm:text-base relative mt-[-1.00px] tracking-[0] leading-[normal]">
                المحادثة المباشرة في المنصة
              </div>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-3 bg-[#24ab28] rounded-[12px] sm:rounded-[15px] relative flex-[0_0_auto] w-full sm:w-auto hover:bg-[#1e8f23] transition-colors duration-200"
              >
                <div className="w-6 h-6 sm:w-6 sm:h-6 flex-shrink-0">
                  <WhatsappIcon />
                </div>
                <p className="w-fit font-semibold  text-white text-sm sm:text-base relative mt-[-1.00px] tracking-[0] leading-[normal] text-center">
                  عبر واتساب من هنا
                </p>
              </a>
            </div>

            {/* Email Support */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6  self-stretch w-full relative flex-[0_0_auto]">
              <div className="self-stretch w-full flex items-center  sm:w-[268px] font-semibold text-text text-sm sm:text-base relative mt-[-1.00px] tracking-[0] leading-[normal]">
                البريد الإلكتروني
              </div>
              <div className="inline-flex items-center justify-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-3 relative flex-[0_0_auto] bg-primary rounded-[12px] sm:rounded-[15px] w-full sm:w-auto">
                <div className="w-6 h-6 sm:w-6 sm:h-6 flex-shrink-0">
                  <EmailIcon />
                </div>
                <div className="relative w-fit mt-[-1.00px] font-semibold text-white text-sm sm:text-base text-center sm:text-right tracking-[0] leading-[normal] break-all sm:break-normal">
                  Qudrat@albaraah.sa
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-[48px]">
          {/* Response Times Section */}
          <div className="flex flex-col items-start gap-6 sm:gap-8 relative">
            <h2 className="mt-[-1.00px] font-bold text-primary text-lg sm:text-xl lg:text-[24px] relative self-stretch tracking-[0] leading-[normal]">
              ما هي الأوقات التي سيتم الإجابة فيها على استفساراتي؟
            </h2>

            <p className="font-medium text-text text-sm sm:text-base relative self-stretch tracking-[0] leading-6 sm:leading-7">
              خلال أوقات الدوام الرسمي من الأحد إلى الخميس من الساعة 10 صباحا
              حتى الساعة 4 مساء، يكون الرد خلال ساعة من خلال المحادثة المباشرة
              بينما يكون الرد خلال 24 ساعة في حال التواصل عن طريق البريد
              الإلكتروني الخاص بالدعم. ونقوم بالرد خلال 48 ساعة في أيام عطلة
              نهاية الأسبوع
            </p>
          </div>

          {/* Problem Resolution Section */}
          <div className="flex flex-col items-start gap-6 sm:gap-8 relative">
            <h2 className="mt-[-1.00px] font-bold text-primary text-lg sm:text-xl lg:text-[24px] relative self-stretch tracking-[0] leading-[normal]">
              الوقت المتوقع لمعالجة المشكلة
            </h2>

            <p className="font-medium text-text text-sm sm:text-base relative self-stretch tracking-[0] leading-6 sm:leading-7">
              ستتم معالجة المشاكل الأساسية (غير التقنية) خلال 24 ساعة من وقت
              الرد بينما يتم معالجة المشاكل التقنية خلال أسبوع إلى أسبوعين وفي
              حال لم يتم الالتزام بالأوقات المذكورة، يتم رفع المشكلة مباشرة
              للمدير التقني
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TechnicalSupport;

const WhatsappIcon = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M25.3991 7.04609C24.1765 5.81156 22.7205 4.83271 21.1158 4.16657C19.5111 3.50043 17.7899 3.16033 16.0524 3.16609C8.77242 3.16609 2.83909 9.09942 2.83909 16.3794C2.83909 18.7128 3.45242 20.9794 4.59909 22.9794L2.73242 29.8328L9.73242 27.9928C11.6658 29.0461 13.8391 29.6061 16.0524 29.6061C23.3324 29.6061 29.2658 23.6728 29.2658 16.3928C29.2658 12.8594 27.8924 9.53942 25.3991 7.04609ZM16.0524 27.3661C14.0791 27.3661 12.1458 26.8328 10.4524 25.8328L10.0524 25.5928L5.89242 26.6861L6.99909 22.6328L6.73242 22.2194C5.63582 20.4688 5.05365 18.4451 5.05242 16.3794C5.05242 10.3261 9.98575 5.39275 16.0391 5.39275C18.9724 5.39275 21.7324 6.53942 23.7991 8.61942C24.8226 9.63791 25.6336 10.8495 26.1853 12.1839C26.7369 13.5182 27.018 14.9489 27.0124 16.3928C27.0391 22.4461 22.1058 27.3661 16.0524 27.3661ZM22.0791 19.1528C21.7458 18.9928 20.1191 18.1928 19.8258 18.0728C19.5191 17.9661 19.3058 17.9128 19.0791 18.2328C18.8524 18.5661 18.2258 19.3128 18.0391 19.5261C17.8524 19.7528 17.6524 19.7794 17.3191 19.6061C16.9858 19.4461 15.9191 19.0861 14.6658 17.9661C13.6791 17.0861 13.0258 16.0061 12.8258 15.6728C12.6391 15.3394 12.7991 15.1661 12.9724 14.9928C13.1191 14.8461 13.3058 14.6061 13.4658 14.4194C13.6258 14.2328 13.6924 14.0861 13.7991 13.8728C13.9058 13.6461 13.8524 13.4594 13.7724 13.2994C13.6924 13.1394 13.0258 11.5128 12.7591 10.8461C12.4924 10.2061 12.2124 10.2861 12.0124 10.2728H11.3724C11.1458 10.2728 10.7991 10.3528 10.4924 10.6861C10.1991 11.0194 9.34576 11.8194 9.34576 13.4461C9.34576 15.0728 10.5324 16.6461 10.6924 16.8594C10.8524 17.0861 13.0258 20.4194 16.3324 21.8461C17.1191 22.1928 17.7324 22.3928 18.2124 22.5394C18.9991 22.7928 19.7191 22.7528 20.2924 22.6728C20.9324 22.5794 22.2524 21.8728 22.5191 21.0994C22.7991 20.3261 22.7991 19.6728 22.7058 19.5261C22.6124 19.3794 22.4124 19.3128 22.0791 19.1528Z"
      fill="white"
    />
  </svg>
);

const EmailIcon = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M29.3327 8.50065C29.3327 7.03398 28.1327 5.83398 26.666 5.83398H5.33268C3.86602 5.83398 2.66602 7.03398 2.66602 8.50065V24.5007C2.66602 25.9673 3.86602 27.1673 5.33268 27.1673H26.666C28.1327 27.1673 29.3327 25.9673 29.3327 24.5007V8.50065ZM26.666 8.50065L15.9993 15.1673L5.33268 8.50065H26.666ZM26.666 24.5007H5.33268V11.1673L15.9993 17.834L26.666 11.1673V24.5007Z"
      fill="white"
    />
  </svg>
);
