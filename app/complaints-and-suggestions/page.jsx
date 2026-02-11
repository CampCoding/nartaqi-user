
"use client"

import React from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import { SendUsMessageForm } from "./../../components/ui/SendUsMessageForm";
import Container from "../../components/ui/Container";
import useSupportInfo from "../../components/shared/Hooks/getSupportInfo";

const ComplaintsAndSuggestions = () => {


  const {
    whatsappHref,
    emailText,
    phoneText,
    whatsappNumber,
    telHref,
  } = useSupportInfo();




  return (
    <div>
      <PagesBanner
        variant="normal"
        title={"الشكاوي والمقترحات"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "الشكاوي والمقترحات",
            link: "#",
          },
        ]}
        image={"/images/complaints-and-suggestions.png"}
      />

      <Container className="my-[48px]" dir="rtl">
        <div className="text-right text-secondary font-bold text-2xl md:text-3xl mb-8 md:mb-[48px]">
          الشكاوى والمقترحات
        </div>

        <div className="flex flex-col gap-6 md:gap-[32px] mb-8 md:mb-[48px] px-4 md:px-0">
          {/* آليه الشكاوي والمقترحات */}
          <section className="self-stretch inline-flex flex-col items-end gap-3 md:gap-4">
            <h2 className="self-stretch text-right text-text text-xl md:text-2xl font-bold">
              آليه الشكاوي والمقترحات
            </h2>
            <p className="self-stretch text-right text-text-alt leading-loose text-base md:text-lg font-semibold">
              انطلاقا من قيم المركز في خدمة والاهتمام بالمستفيدين وانسجاما مع
              رؤية المركز القائمة على الفعالية والشفافية والجودة، تم فتح (إدارة
              الشكاوى و المقترحات ) استجابة لتطلعات مختلف فئات المستفيدين
              والتعامل مع مشكلاتهم ومتطلباتهم والتي نعتبرها فرصة لتحسين جودة
              الخدمات المقدمة.
            </p>
          </section>

          {/* آلية التعامل مع الشكاوي */}
          <section className="self-stretch inline-flex flex-col items-end gap-3 md:gap-4">
            <h2 className="self-stretch text-right text-text text-xl md:text-2xl font-bold">
              آلية التعامل مع الشكاوي:
            </h2>
            <p className="self-stretch text-right text-text-alt leading-loose text-base md:text-lg font-semibold whitespace-pre-line">
              {`1- يتم تقديم الشكوى من خلال القنوات المتاحة مع ضرورة ذكر البيانات المطلوبة وأرقام التواصل.
2- يتم تسجيل الشكوى وإحالتها إلى الادارة المعنية.
3- يقوم فريق مختص ببحث الشكوى من خلال التواصل مع مقدم الشكوى.
4- يتم حل المشكلة واتخاذ الإجراءات اللازمة حال ثبوت صحة الشكوى , والتواصل مع مقدم الشكوى هاتفياً وإبلاغه بما تم لحل الشكوى .
5- يتم إجراء مراجعة منتظمة لكافة الشكاوى وتحليلها ودراستها، وبيان فرص التحسين والتطوير المتصلة بها ومتابعتها مع وحدات العمل المعنية بتلك الفرص من قبل إدارة المركز.`}
            </p>

            {/* المدة المتوقعة */}
            <div className="self-stretch inline-flex flex-col items-end gap-3 md:gap-4">
              <h3 className="self-stretch text-right text-text text-lg md:text-2xl font-bold">
                المدة المتوقعة لإغلاق الشكوى :
              </h3>
              <p className="self-stretch text-right text-text-alt leading-loose text-base md:text-lg font-semibold whitespace-pre-line">
                {`يتم معالجة المشاكل الأساسية (غير التقنية) خلال 24 ساعة من وقت الرد
بينما يتم معالجة المشاكل التقنية خلال أسبوع إلى أسبوعين
وفي حال لم يتم الالتزام بالأوقات المذكورة، يتم رفع المشكلة مباشرة للمدير التقني`}
              </p>
            </div>
          </section>

          {/* آلية التعامل مع المقترحات */}
          <section className="self-stretch inline-flex flex-col items-end gap-3 md:gap-4">
            <h2 className="self-stretch text-right text-text text-xl md:text-2xl font-bold">
              آلية التعامل مع المقترحات:
            </h2>

            <div className="self-stretch text-right">
              <p className="text-text-alt leading-loose text-base md:text-lg font-semibold whitespace-pre-line">
                {`1- يتم تقديم المقترح من خلال القنوات المتاحة مع ضرورة ذكر البيانات المطلوبة وأرقام التواصل.
2- يتم تسجيل المقترح وإحالته إلى الإدارة المعنية.
3- يتم التواصل مع مقدم المقترح إذا تطلب الأمر للحصول على تفاصيل إضافية للمقترح.
4- يتم دراسة إمكانية تطبيق المقترح من قبل ادارة المعنية، ومن ثم تنفيذه في حال كان مناسبا ويحقق أهداف المركز .
5- يتم التواصل مع مقدم المقترح لشكره.
قنوات التواصل بالمركز:`}
              </p>

              <div className="mt-2 space-y-1 text-base md:text-lg">
                <div className="font-semibold text-text-alt">
                  الواتس اب:{" "}
                  <a
                    dir="ltr"
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-bold underline underline-offset-2"
                  >
                    {whatsappNumber}
                  </a>
                </div>

                <div className="font-semibold text-text-alt">
                  البريد الالكتروني:{" "}
                  <a
                    dir="ltr"
                    href={`mailto:${emailText}`}
                    className="text-primary font-bold underline underline-offset-2 break-all"
                  >
                    {emailText}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        <SendUsMessageForm />
      </Container>
    </div>
  );
};

export default ComplaintsAndSuggestions;
