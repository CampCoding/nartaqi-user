import React from "react";
import { ListCheck, SupportIcon } from "../../public/svgs";
import Image from "next/image";
import Link from "next/link";

export const AboutUs = ({ showCTA = true }) => {
  return (
    <div className="container mx-auto py-[48px]  px-[64px] relative bg-bg overflow-hidden flex items-center justify-between">
      <div className="w-[656px]">
        <div className="inline-flex items-start justify-end gap-2.5 px-14 py-3 relative bg-primary-light rounded-[15px]">
          <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-bold text-primary-dark text-xl text-left leading-8 whitespace-nowrap ">
            نبذه عنا
          </div>
        </div>
        <div className="self-stretch mt-[32px] text-right justify-center">
          <span className="text-secondary text-4xl font-bold capitalize leading-[50px]">
            منصة نرتقي
          </span>
          <span className="text-text text-3xl font-bold capitalize leading-[50px]">
            {" "}
            – شريكك الدائم في رحلة التعلم، تطوير المهارات، وبناء مستقبل مليء
            بالنجاح
          </span>
        </div>
        <p className="self-stretch mt-[16px] text-right justify-center text-text-light text-base font-medium leading-7">
          نَرْتَقِي هي بيئتكم التعليمية الرقمية المتكاملة، تجمع بين الدورات
          التدريبية، والبث المباشر، والامتحانات، ومكتبة الكتب، مع دعم كامل
          للطلاب والمعلمين. مهمتنا هي تزويدكم بالأدوات والمعرفة اللازمة لتطوير
          مهاراتكم وتحقيق أهدافكم، في أي وقت ومن أي مكان.
        </p>
        <div className="flex items-center justify-between mt-[32px]">
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center gap-[4px]">
              <ListCheck />
              <div className="justify-center text-text text-sm font-normal leading-loose">
                تعلم بلا حدود
              </div>
            </div>
            <div className="flex items-center gap-[4px]">
              <ListCheck />
              <div className="justify-center text-text text-sm font-normal leading-loose">
                محتوى تدريبي متنوع وعالي الجودة
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center gap-[4px]">
              <ListCheck />
              <div className="justify-center text-text text-sm font-normal leading-loose">
                دعم واستشارة على مدار الساعة طوال أيام الأسبوع
              </div>
            </div>
            <div className="flex items-center gap-[4px]">
              <ListCheck />
              <div className="justify-center text-text text-sm font-normal leading-loose">
                تتبع تقدمك في الوقت الحقيقي{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[32px] flex items-center justify-between">
          {showCTA && (
              <Link href={"/about-us"}>
              <div className="inline-flex items-center justify-center gap-2.5 px-12 py-5 relative rounded-[20px] bg-gradient-to-r from-primary to-secondary">
                <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-bold text-bg text-base text-left leading-5 whitespace-nowrap ">
                  اكتشف المزيد
                </div>
              </div>
            </Link>
          )}

          <div className="flex items-center gap-[9px]">
            <SupportIcon />
            <div className="self-stretch inline-flex flex-col justify-center items-end gap-3.5">
              <div className="self-stretch text-right justify-center text-primary-dark text-sm font-bold">
                اتصل الآن
              </div>
              <div
                dir="ltr"
                className="justify-center text-secondary text-base font-medium font-inter"
              >
                +966 011 1234 567
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src="/images/Frame 32.png" alt="About Us" />
      </div>
    </div>
  );
};
