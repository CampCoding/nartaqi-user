"use client";

import React, { useMemo, useState } from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import Container from "../../components/ui/Container";
import cx from "../../lib/cx";

// ✅ Rich Text content - نفس فورمات الـ API بالظبط
const RETURN_POLICY_HTML = `
<p class="MsoNormal" dir="RTL" style="margin: 0px 0px 11px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; font-size: 15px;">
  <strong>
    <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; color: rgb(112, 48, 160); font-size: 25px;">
      سياسة الاسترجاع والاستبدال لمنصة "نرتقي للتدريب وتنمية المهارات"
    </span>
  </strong>
</p>

<p class="MsoNormal" dir="RTL" style="margin: 0px 0px 11px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; font-size: 15px;">
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    نحرص في منصة "نرتقي للتدريب وتنمية المهارات" على تقديم تجربة تعليمية مميزة. قبل إتمام عملية الشراء، يُرجى الاطلاع على سياسة الاسترجاع والاستبدال التالية:
  </span>
</p>

<p class="MsoNormal" dir="RTL" style="margin: 0px 0px 11px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; font-size: 15px;">
  <strong>
    <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
      <span style="background-color: rgb(255, 255, 255); color: rgb(255, 0, 0);">١</span>
      <span style="color: rgb(192, 0, 0);">. أولًا: استرداد المبالغ (Refund Policy) :</span>
    </span>
  </strong>
</p>

<p class="MsoNormal" dir="RTL" style="margin: 0px 0px 11px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; font-size: 15px;">
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    يحق للمستخدم طلب استرداد المبلغ خلال 24 ساعة من تاريخ الشراء، بشرط:
  </span>
</p>

<p class="MsoListParagraphCxSpFirst" dir="RTL" style="margin: 0px 48px 0px 0px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; text-indent: -24px; font-size: 15px;">
  <span style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    <span>-<span style="font: 9px &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>
  </span>
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    عدم مشاهدة أكثر من ٥٪ من محتوى الدورة
  </span>
</p>

<p class="MsoListParagraphCxSpLast" dir="RTL" style="margin: 0px 48px 11px 0px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; text-indent: -24px; font-size: 15px;">
  <span style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    <span>-<span style="font: 9px &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>
  </span>
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    عدم تحميل أي مواد تعليمية من المنصة
  </span>
</p>

<p class="MsoNormal" dir="RTL" style="margin: 0px 0px 11px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; font-size: 15px;">
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    في حال تحقق الشروط، يتم رد المبلغ خلال مدة تتراوح بين 7 إلى 14 يوم عمل عبر نفس وسيلة الدفع.
  </span>
</p>

<p class="MsoNormal" dir="RTL" style="margin: 0px 0px 11px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; font-size: 15px;">
  <strong>
    <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
      <span style="background-color: rgb(255, 255, 255); color: rgb(255, 0, 0);">٢</span>
      <span style="color: rgb(192, 0, 0);">. ثانيًا: حالات لا يُسمح فيها بالاسترجاع :</span>
    </span>
  </strong>
</p>

<p class="MsoNormal" dir="RTL" style="margin: 0px 0px 11px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; font-size: 15px;">
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    لا يمكن استرداد المبلغ في الحالات التالية:
  </span>
</p>

<p class="MsoListParagraphCxSpFirst" dir="RTL" style="margin: 0px 48px 0px 0px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; text-indent: -24px; font-size: 15px;">
  <span style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    <span>-<span style="font: 9px &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>
  </span>
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    بعد مرور 24 ساعة من وقت الشراء
  </span>
</p>

<p class="MsoListParagraphCxSp" dir="RTL" style="margin: 0px 48px 0px 0px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; text-indent: -24px; font-size: 15px;">
  <span style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    <span>-<span style="font: 9px &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>
  </span>
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    عند مشاهدة نسبة تتجاوز ٥٪ من محتوى الدورة
  </span>
</p>

<p class="MsoListParagraphCxSp" dir="RTL" style="margin: 0px 48px 0px 0px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; text-indent: -24px; font-size: 15px;">
  <span style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    <span>-<span style="font: 9px &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>
  </span>
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    في حال تحميل أو نسخ أي جزء من المواد التعليمية
  </span>
</p>

<p class="MsoListParagraphCxSpLast" dir="RTL" style="margin: 0px 48px 11px 0px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; text-indent: -24px; font-size: 15px;">
  <span style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    <span>-<span style="font: 9px &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>
  </span>
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    في الدورات أو الخدمات التي يتم تنفيذها بشكل مخصص بناءً على طلب المستخدم
  </span>
</p>

<p class="MsoNormal" dir="RTL" style="margin: 0px 0px 11px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; font-size: 15px;">
  <strong>
    <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
      <span style="background-color: rgb(255, 255, 255); color: rgb(255, 0, 0);">٣</span>
      <span style="color: rgb(192, 0, 0);">. ثالثًا: الاستبدال (Exchange Policy) :</span>
    </span>
  </strong>
</p>

<p class="MsoNormal" dir="RTL" style="margin: 0px 0px 11px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; font-size: 15px;">
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    يمكن للمستخدم طلب استبدال الدورة بدورة أخرى خلال 48 ساعة من الشراء، بشرط:
  </span>
</p>

<p class="MsoListParagraphCxSpFirst MsoListParagraphCxSpLast" dir="RTL" style="margin: 0px 48px 11px 0px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; text-indent: -24px; font-size: 15px;">
  <span style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    <span>-<span style="font: 9px &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>
  </span>
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    عدم استهلاك أكثر من 10٪ من محتوى الدورة الأصلية
  </span>
</p>

<p class="MsoNormal" dir="RTL" style="margin: 0px 0px 11px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; font-size: 15px;">
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    يتم احتساب فرق السعر (إن وجد) بين الدورتين.
  </span>
</p>

<p class="MsoNormal" dir="RTL" style="margin: 0px 0px 11px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; font-size: 15px;">
  <strong>
    <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
      <span style="background-color: rgb(255, 255, 255); color: rgb(255, 0, 0);">٤</span>
      <span style="color: rgb(192, 0, 0);">. رابعًا: إلغاء الاشتراكات :</span>
    </span>
  </strong>
</p>

<p class="MsoListParagraphCxSpFirst" dir="RTL" style="margin: 0px 48px 0px 0px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; text-indent: -24px; font-size: 15px;">
  <span style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    <span>-<span style="font: 9px &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>
  </span>
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    يمكن إلغاء الاشتراك في أي وقت، ويظل الوصول متاحًا حتى نهاية مدة الاشتراك المدفوعة
  </span>
</p>

<p class="MsoListParagraphCxSpLast" dir="RTL" style="margin: 0px 48px 11px 0px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; text-indent: -24px; font-size: 15px;">
  <span style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    <span>-<span style="font: 9px &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>
  </span>
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    لا يتم رد أي مبالغ عن الفترات المستخدمة
  </span>
</p>

<p class="MsoNormal" dir="RTL" style="margin: 0px 0px 11px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; font-size: 15px;">
  <strong>
    <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
      <span style="background-color: rgb(255, 255, 255); color: rgb(255, 0, 0);">٥</span>
      <span style="color: rgb(192, 0, 0);">. خامسًا: الحالات الاستثنائية :</span>
    </span>
  </strong>
</p>

<p class="MsoNormal" dir="RTL" style="margin: 0px 0px 11px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; font-size: 15px;">
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    تحتفظ منصة "نرتقي للتدريب وتنمية المهارات" بحق النظر في بعض الحالات الخاصة (مثل المشكلات التقنية أو الأخطاء في الدفع) واتخاذ القرار المناسب بما يحقق العدالة للطرفين.
  </span>
</p>

<p class="MsoNormal" dir="RTL" style="margin: 0px 0px 11px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; font-size: 15px;">
  <strong>
    <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
      <span style="background-color: rgb(255, 255, 255); color: rgb(255, 0, 0);">٦</span>
      <span style="color: rgb(192, 0, 0);">. سادسًا: التواصل :</span>
    </span>
  </strong>
</p>

<p class="MsoNormal" dir="RTL" style="margin: 0px 0px 11px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; font-size: 15px;">
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    لطلب الاسترجاع أو الاستبدال، يُرجى التواصل معنا من خلال:
  </span>
</p>

<p class="MsoListParagraphCxSpFirst" dir="RTL" style="margin: 0px 48px 0px 0px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; text-indent: -24px; font-size: 15px;">
  <span style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    <span>-<span style="font: 9px &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>
  </span>
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    رقم التواصل: <span dir="LTR">+20 10 98286080</span>
  </span>
</p>

<p class="MsoListParagraphCxSpLast" dir="RTL" style="margin: 0px 48px 11px 0px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; text-indent: -24px; font-size: 15px;">
  <span style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    <span>-<span style="font: 9px &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span>
  </span>
  <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
    من خلال صفحة الدعم داخل المنصة
  </span>
</p>

<p class="MsoNormal" dir="RTL" style="margin: 0px 0px 11px; text-align: right; line-height: 107%; direction: rtl; unicode-bidi: embed; font-family: Calibri, sans-serif; font-size: 15px;">
  <strong>
    <span lang="AR-SA" style="line-height: 107%; font-family: Arial, sans-serif; font-size: 25px;">
      باستخدامك للمنصة وإتمام عملية الشراء، فإنك توافق على هذه الشروط.
    </span>
  </strong>
</p>
`;

const ReturnPolicyPage = () => {
  const [selectedSection, setSelectedSection] = useState(1);

  const menuItems = useMemo(
    () => [
      {
        id: 1,
        type: "return-policy",
        text: "سياسة الاسترجاع والاستبدال",
        content: RETURN_POLICY_HTML,
      },
    ],
    []
  );

  const selectedItem = useMemo(() => {
    return menuItems.find((x) => x.id === selectedSection) || menuItems[0];
  }, [menuItems, selectedSection]);

  return (
    <div className="">
      <PagesBanner
        variant="normal"
        objectPosition={"object-[50%_80%]"}
        title={"سياسة الاسترجاع والاستبدال"}
        image={"/images/Frame 1000005097.png"}
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "سياسة الاسترجاع والاستبدال", link: "/return-policy" },
        ]}
      />

      <Container className=" mt-[48px]  ">
        <div className="grid grid-cols-1 lg:grid-cols-[379px_auto] gap-6 ">
          <SideNav
            rootClassName="h-fit"
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            menuItems={menuItems}
          />

          <PoliciesSections
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            selectedItem={selectedItem}
          />
        </div>
      </Container>
    </div>
  );
};

export default ReturnPolicyPage;

// ✅ Chevron Icon
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

// ✅ SideNav - نفس الشكل بالظبط
const SideNav = ({
  selectedSection,
  setSelectedSection,
  rootClassName,
  menuItems,
}) => {
  return (
    <nav
      className={cx(
        "h-fit inline-flex flex-col items-start gap-3 md:gap-6 px-4 md:px-8 py-8 md:py-12 relative bg-primary-light rounded-[30px]",
        rootClassName
      )}
      role="navigation"
      aria-label="قائمة سياسة الاسترجاع"
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
            <div className="relative w-6 h-6 aspect-[1]">
              <ChevromLeft />
            </div>
          </div>

          <div
            className={`cursor-pointer ${
              selectedSection === item.id
                ? "font-bold !text-primary"
                : "text-text"
            } tracking-[0] relative w-fit texst-lg md:text-xl leading-[normal] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]`}
          >
            {item.text}
          </div>
        </div>
      ))}
    </nav>
  );
};

// ✅ PoliciesSections - عرض المحتوى بالـ dangerouslySetInnerHTML
const PoliciesSections = ({
  selectedSection,
  setSelectedSection,
  selectedItem,
}) => {
  return (
    <section className="flex flex-col gap-[32px] mb-[100px]">
      <main
        className="flex flex-col items-start gap-4 relative"
        role="main"
        onClick={() => setSelectedSection(selectedSection)}
      >
        <header>
          <h1 className="font-bold text-primary text-xl md:text-2xl relative self-stretch mt-[-1.00px] tracking-[0] leading-[normal]">
            {selectedItem?.text || "—"}
          </h1>
        </header>

        <section className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
          <div
            dir="rtl"
            className="font-medium w-full text-text-alt text-lg md:text-xl leading-loose"
            dangerouslySetInnerHTML={{
              __html: selectedItem?.content || "—",
            }}
          />
        </section>
      </main>
    </section>
  );
};
