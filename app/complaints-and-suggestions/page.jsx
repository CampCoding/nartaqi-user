import React from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import { SendUsMessageForm } from './../../components/ui/SendUsMessageForm';

const ComplaintsAndSuggestions = () => {
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

      <div className="container mx-auto px-[64px] my-[48px]">
        <div className="text-right justify-center text-secondary text-3xl mb-[48px] font-bold font-['Cairo']">
          الشكاوى والمقترحات
        </div>
        <div className="flex flex-col gap-[32px] mb-[48px]">
          <div className="self-stretch inline-flex flex-col justify-start items-end gap-4">
            <div className="self-stretch text-right justify-center text-zinc-800 text-2xl font-bold font-['Cairo']">
              آليه الشكاوي والمقترحات
            </div>
            <div className="self-stretch text-right justify-center text-text-alt leading-loose text-base font-semibold font-['Cairo']">
              انطلاقا من قيم المركز في خدمة والاهتمام بالمستفيدين وانسجاما مع
              رؤية المركز القائمة على الفعالية والشفافية والجودة، تم فتح (إدارة
              الشكاوى و المقترحات ) استجابة لتطلعات مختلف فئات المستفيدين
              والتعامل مع مشكلاتهم ومتطلباتهم والتي نعتبرها فرصة لتحسين جودة
              الخدمات المقدمة.
            </div>
          </div>

          <div className="self-stretch inline-flex flex-col justify-start items-end gap-4">
            <div className="self-stretch text-right justify-center text-zinc-800 text-2xl font-bold font-['Cairo']">
              آلية التعامل مع الشكاوي:
            </div>
            <div className="self-stretch text-right justify-center text-text-alt leading-loose text-base font-semibold font-['Cairo']">
              1- يتم تقديم الشكوى من خلال القنوات المتاحة مع ضرورة ذكر البيانات
              المطلوبة وأرقام التواصل. <br /> 2- يتم تسجيل الشكوى وإحالتها إلى
              الادارة المعنية. <br /> 3- يقوم فريق مختص ببحث الشكوى من خلال
              التواصل مع مقدم الشكوى. <br /> 4- يتم حل المشكلة واتخاذ الإجراءات
              اللازمة حال ثبوت صحة الشكوى , والتواصل مع مقدم الشكوى هاتفياً
              وإبلاغه بما تم لحل الشكوى . <br /> 5- يتم إجراء مراجعة منتظمة
              لكافة الشكاوى وتحليلها ودراستها، وبيان فرص التحسين والتطوير
              المتصلة بها ومتابعتها مع وحدات العمل المعنية بتلك الفرص من قبل
              إدارة المركز.
            </div>

            <div className="self-stretch inline-flex flex-col justify-start items-end gap-4">
              <div className="self-stretch text-right justify-center text-zinc-800 text-2xl font-bold font-['Cairo']">
                المدة المتوقعة لإغلاق الشكوى :
              </div>
              <div className="self-stretch text-right justify-center text-text-alt leading-loose text-base font-semibold font-['Cairo']">
                يتم معالجة المشاكل الأساسية (غير التقنية) خلال 24 ساعة من وقت
                الرد <br /> بينما يتم معالجة المشاكل التقنية خلال أسبوع إلى
                أسبوعين <br /> وفي حال لم يتم الالتزام بالأوقات المذكورة، يتم
                رفع المشكلة مباشرة للمدير التقني
              </div>
            </div>

            <div className="self-stretch inline-flex flex-col justify-start items-end gap-4">
              <div className="self-stretch text-right justify-center text-zinc-800 text-2xl font-bold font-['Cairo']">
                آلية التعامل مع المقترحات:
              </div>
              <div className="self-stretch text-right justify-center">
                <span className="text-text-alt leading-loose text-base font-semibold font-['Cairo']">
                  1- يتم تقديم المقترح من خلال القنوات المتاحة مع ضرورة ذكر
                  البيانات المطلوبة وأرقام التواصل. <br /> 2- يتم تسجيل المقترح
                  وإحالته إلى الإدارة المعنية. <br /> 3- يتم التواصل مع مقدم
                  المقترح إذا تطلب الأمر للحصول على تفاصيل إضافية للمقترح.{" "}
                  <br /> 4- يتم دراسة إمكانية تطبيق المقترح من قبل ادارة
                  المعنية، ومن ثم تنفيذه في حال كان مناسبا ويحقق أهداف المركز .{" "}
                  <br /> 5- يتم التواصل مع مقدم المقترح لشكره .<br />
                  قنوات التواصل بالمركز:
                  <br />
                  الواتس اب : 
                </span>
                <span className="text-primary text-base font-bold font-['Cairo']">
                  966559513555
                </span>
                <span className="text-text-alt leading-loose text-base font-semibold font-['Cairo']">
                  <br /> البريد الالكتروني :
                </span>
                <span className="text-primary text-base font-bold font-['Cairo']">
                   qudrat@albaraah.sa
                </span>
              </div>
            </div>
          </div>
        </div>


        <SendUsMessageForm />
      </div>
    </div>
  );
};

export default ComplaintsAndSuggestions;
