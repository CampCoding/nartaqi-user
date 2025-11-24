"use client";

import React, { useState } from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import Container from "../../components/ui/Container";
import cx from "../../lib/cx";

const ConditionsAndPrivacy = () => {
  const [selectedSection, setSelectedSection] = useState(1);

  return (
    <div className="">
      <PagesBanner
        variant="normal"
        objectPosition={"object-[50%_80%]"}
        title={"شروط الأستخدام و الخصوصية"}
        image={"/images/Frame 1000005097.png"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "شروط الأستخدام و الخصوصية",
            link: "/",
          },
        ]}
      />
      <Container className=" mt-[48px]  ">
        <div className="grid  grid-cols-1 lg:grid-cols-[379px_auto] gap-6 ">
          
          <SideNav
            rootClassName="h-fit"
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />

          <PoliciesSections
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
        </div>
      </Container>
    </div>
  );
};

export default ConditionsAndPrivacy;

const ChevromLeft = (props) => (
  <svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 18.5L9 12.5L15 6.5"
      stroke="#2D2D2D"
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SideNav = ({ selectedSection, setSelectedSection , rootClassName }) => {
  const menuItems = [
    {
      id: 1,
      text: "شروط الاستخدام",
      icon: <ChevromLeft />,
      isTitle: true,
    },
    {
      id: 2,
      text: "مسؤوليات المستخدم",
      icon: <ChevromLeft />,
      isTitle: false,
    },
    {
      id: 3,
      text: "ملكية المحتوى",
      icon: <ChevromLeft />,
      isTitle: false,
    },
    {
      id: 4,
      text: "سياسة الخصوصية",
      icon: <ChevromLeft />,
      isTitle: false,
    },
    {
      id: 5,
      text: "جمع البيانات",
      icon: <ChevromLeft />,
      isTitle: false,
    },
    {
      id: 6,
      text: "ملفات تعريف الارتباط والتتبع",
      icon: <ChevromLeft />,
      isTitle: false,
    },
    {
      id: 7,
      text: "حقوق المستخدم",
      icon: <ChevromLeft />,
      isTitle: false,
    },
    {
      id: 8,
      text: "معلومات الاتصال",
      icon: <ChevromLeft />,
      isTitle: false,
    },
  ];

  return (
    <nav
      className={cx(" h-fit inline-flex flex-col items-start  gap-3 md:gap-6 px-4 md:px-8 py-8 md:py-12 relative bg-primary-light rounded-[30px]"  , rootClassName)}
      role="navigation"
      aria-label="قائمة شروط الاستخدام"
    >
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="inline-flex items-center justify-start gap-2 relative flex-[0_0_auto]"
          role="menuitem"
          tabIndex={0}
          onClick={() => setSelectedSection(item.id)}
        >
          <div className="inline-flex h-4 items-center pl-0 pr-2 py-0 relative flex-[0_0_auto] ">
            <div className="relative w-6 h-6  aspect-[1]">{item.icon}</div>
          </div>
          <div
            className={` cursor-pointer ${
              selectedSection === item.id
                ? " font-bold !text-primary"
                : " text-text"
            } tracking-[0] relative w-fit  texst-lg md:text-xl  leading-[normal] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] `}
          >
            {item.text}
          </div>
        </div>
      ))}
    </nav>
  );
};

const privacySections = [
  {
    title: "سياسة الخصوصية",
    introduction:
      "نحن في المنصة نلتزم بحماية خصوصية مستخدمينا. توضح هذه السياسة كيفية جمعنا واستخدامنا وحمايتنا للمعلومات التي نحصل عليها من المستخدمين.",
    image: "/images/privacy-policy.png",
    sections: [
      {
        title: "البيانات التي نجمعها:",
        content: [
          "المعلومات الشخصية: الاسم، البريد الإلكتروني، معلومات الدفع، بيانات تسجيل الحساب.",
          "معلومات الاستخدام: مثل الصفحات التي تزورها، الأنشطة التي تقوم بها داخل المنصة.",
          "معلومات تقنية: مثل نوع المتصفح، عنوان IP، نوع الجهاز ونظام التشغيل.",
        ],
      },
      {
        title: "كيفية استخدام البيانات:",
        content: [
          "تحسين تجربة المستخدم.",
          "تطوير خدماتنا ومنتجاتنا.",
          "التواصل معك بشأن التحديثات أو العروض أو الدعم الفني.",
          "الامتثال للمتطلبات القانونية.",
        ],
      },
      {
        title: "حماية بياناتك:",
        content: [
          "نستخدم تقنيات حديثة لحماية بيانات المستخدمين مثل التشفير وأنظمة الأمان المتقدمة. ومع ذلك، لا يمكن ضمان أمان مطلق لأي نظام إلكتروني.",
        ],
      },
      {
        title: "حقوقك:",
        content: [
          "يمكنك دائما طلب الوصول إلى بياناتك الشخصية وتحديثها أو حذفها من خلال إعدادات الحساب أو التواصل مع الدعم الفني.",
        ],
      },
    ],
  },
  {
    title: "شروط الاستخدام",
    introduction:
      "تحدد شروط الاستخدام القواعد والسياسات التي يجب على المستخدمين الالتزام بها عند استخدام خدمات المنصة.",
    image: "/images/terms-of-use.png",
    sections: [
      {
        title: "الموافقة على الشروط:",
        content: [
          "باستخدامك للمنصة، فإنك توافق على الالتزام بجميع الشروط والأحكام المنصوص عليها.",
        ],
      },
      {
        title: "الاستخدام الشخصي غير التجاري:",
        content: [
          "تسمح لك المنصة باستخدام الخدمات لأغراض شخصية فقط. لا يُسمح باستخدامها لأغراض تجارية أو إعادة بيعها أو استغلالها بشكل غير قانوني.",
        ],
      },
      {
        title: "المحتويات:",
        content: ["يحتفظ فريق المنصة بحق تعديل أو إزالة أي محتوى غير مناسب."],
      },
    ],
  },
  {
    title: "حقوق الملكية الفكرية",
    introduction:
      "توضح هذه السياسة حقوق الملكية الفكرية المتعلقة باستخدام محتوى المنصة والمحتوى الذي ينشئه المستخدمون.",
    image: "/images/intellectual-property.png",
    sections: [
      {
        title: "استخدام المحتوى:",
        content: [
          "يحظر تماماً نسخ أو إعادة إنتاج أو نشر أو بيع أي جزء من المحتوى دون إذن خطي من إدارة المنصة.",
        ],
      },
      {
        title: "المحتوى الذي ينشئه المستخدمون:",
        content: [
          "إذا قمت بنشر محتوى عبر المنصة، فإنك تمنح المنصة حقاً دائماً باستخدامه لأغراض تشغيل وتحسين الخدمات.",
        ],
      },
      {
        title: "سياسة الدفع والاسترداد:",
        content: [
          "توضح هذه السياسة إجراءات الدفع، المحتويات المدفوعة، وسياسات الاسترداد المرتبطة باستخدام المنصة.",
        ],
      },
    ],
  },
  {
    title: "سياسة الدفع والاسترداد",
    introduction:
      "توضح هذه السياسة القواعد المتعلقة بالأسعار وطرق الدفع، بالإضافة إلى شروط استرداد الأموال في حال إلغاء الاشتراكات أو وجود مشاكل بالخدمة.",
    image: "/images/payment-refund.png",
    sections: [
      {
        title: "الأسعار والدفع:",
        content: [
          "جميع الأسعار معروضة بالعملة المحلية.",
          "يجب دفع المبالغ المستحقة بشكل كامل قبل الحصول على الخدمة.",
        ],
      },
      {
        title: "سياسة الاسترداد:",
        content: [
          "يمكن طلب استرداد الأموال خلال 7 أيام من تاريخ الدفع في حالة وجود مشكلة جدية بالخدمة.",
          "لن يتم استرداد الأموال بعد إتمام استخدام المحتوى أو حضور الدورة.",
        ],
      },
      {
        title: "الاشتراكات:",
        content: [
          "يمكن إلغاء الاشتراك في أي وقت، ولكن لن يتم استرداد المبالغ المدفوعة عن الفترة الحالية.",
        ],
      },
      {
        title: "مسؤولية المستخدم:",
        content: [
          "مستخدمي المنصة مسؤولون عن دقة وصحة المعلومات التي يقدمونها وعن حماية بياناتهم الخاصة.",
        ],
      },
    ],
  },
];

export const PoliciesSections = ({ selectedSection, setSelectedSection }) => {
  return (
    <section className="flex flex-col gap-[32px] mb-[100px]">
      {privacySections?.map((privacyData, index) => {
        return (
          <main
            className="flex flex-col items-start gap-4 relative"
            role="main"
            onClick={() => setSelectedSection(index + 1)}
          >
            <header>
              <h1 className=" font-bold text-primary  text-xl md:text-2xl relative self-stretch mt-[-1.00px] tracking-[0] leading-[normal] ">
                {privacyData.title}
              </h1>
            </header>

            <section
              className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]"
              aria-labelledby="privacy-policy"
            >
              <p className=" font-medium text-text-alt text-lg  md:text-xl relative self-stretch mt-[-1.00px] tracking-[0] leading-[normal] ">
                {privacyData.introduction}
              </p>

              {privacyData.sections.map((section, index) => (
                <article
                  key={index}
                  className=" mb-4 relative self-stretch  font-normal text-text-duplicate  text-lg md:text-xl tracking-[0] leading-[normal] "
                >
                  <h2 className="font-bold">
                    {section.title}
                    <br />
                  </h2>

                  <div className=" font-medium leading-loose">
                    {section.content.map((item, itemIndex) => (
                      <React.Fragment key={itemIndex}>
                        {item}
                        {itemIndex < section.content.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                    {index < privacyData.sections.length - 2 && <br />}
                  </div>

                  {index === privacyData.sections.length - 2 && (
                    <>
                      <span className="font-bold">
                        {
                          privacyData.sections[privacyData.sections.length - 1]
                            .title
                        }
                        <br />
                      </span>
                      <span className=" font-medium">
                        {
                          privacyData.sections[privacyData.sections.length - 1]
                            .content[0]
                        }
                      </span>
                    </>
                  )}
                </article>
              ))}
            </section>
          </main>
        );
      })}
    </section>
  );
};
