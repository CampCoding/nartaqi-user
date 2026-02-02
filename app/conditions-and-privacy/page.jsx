"use client";

import React, { useMemo, useState } from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import Container from "../../components/ui/Container";
import cx from "../../lib/cx";
import { useTconditions } from "../../components/shared/Hooks/useTconditions"; // ✅ عدّل المسار حسب مشروعك

const ConditionsAndPrivacy = () => {
  const [selectedSection, setSelectedSection] = useState(1);

  // ✅ API
  const { data, term, conditions, loading, error, refetch } = useTconditions();

  // ✅ جهّز المينيو + المحتوى بناءً على الـ API
  // - لو الـ API رجّع فقط term + conditions → هنظهر اتنين بس
  // - لو بعدين زوّدتوا أنواع إضافية → هنظهرها تلقائي
  const menuItems = useMemo(() => {
    // ترتيب مبدئي لو موجودين
    const order = ["term", "conditions"];
    const typeToTitle = {
      term: "شروط الاستخدام",
      conditions: "سياسة الخصوصية",
    };

    const normalized = Array.isArray(data) ? data : [];

    // رتّب اللي معروفين أولاً ثم أي نوع جديد
    const sorted = [...normalized].sort((a, b) => {
      const ai = order.indexOf(a?.type);
      const bi = order.indexOf(b?.type);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });

    // لو فاضي (أو لسه loading) رجّع الافتراضي (اتنين)
    if (!sorted.length) {
      return [
        { id: 1, type: "term", text: "شروط الاستخدام" },
        { id: 2, type: "conditions", text: "سياسة الخصوصية" },
      ];
    }

    return sorted.map((item, idx) => ({
      id: idx + 1,
      type: item?.type || `type_${idx + 1}`,
      text: typeToTitle[item?.type] || item?.type || `قسم ${idx + 1}`,
      content: item?.content || "",
    }));
  }, [data]);

  const selectedItem = useMemo(() => {
    return menuItems.find((x) => x.id === selectedSection) || menuItems[0];
  }, [menuItems, selectedSection]);

  return (
    <div className="">
      <PagesBanner
        variant="normal"
        objectPosition={"object-[50%_80%]"}
        title={"شروط الأستخدام و الخصوصية"}
        image={"/images/Frame 1000005097.png"}
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "شروط الأستخدام و الخصوصية", link: "/" },
        ]}
      />

      <Container className=" mt-[48px]  ">
        <div className="grid grid-cols-1 lg:grid-cols-[379px_auto] gap-6 ">
          <SideNav
            rootClassName="h-fit"
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            menuItems={menuItems} // ✅ من الـ API
          />

          <PoliciesSections
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            selectedItem={selectedItem} // ✅ المحتوى
            loading={loading}
            error={error}
            onRetry={refetch}
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

// ✅ SideNav بقى بياخد menuItems من بره
const SideNav = ({ selectedSection, setSelectedSection, rootClassName, menuItems }) => {
  return (
    <nav
      className={cx(
        "h-fit inline-flex flex-col items-start gap-3 md:gap-6 px-4 md:px-8 py-8 md:py-12 relative bg-primary-light rounded-[30px]",
        rootClassName
      )}
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
            <div className="relative w-6 h-6 aspect-[1]">
              <ChevromLeft />
            </div>
          </div>

          <div
            className={`cursor-pointer ${
              selectedSection === item.id ? "font-bold !text-primary" : "text-text"
            } tracking-[0] relative w-fit texst-lg md:text-xl leading-[normal] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]`}
          >
            {item.text}
          </div>
        </div>
      ))}
    </nav>
  );
};

// ✅ PoliciesSections: عرض قسم واحد فقط بناءً على الـ selectedSection
const PoliciesSections = ({
  selectedSection,
  setSelectedSection,
  selectedItem,
  loading,
  error,
  onRetry,
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
          {loading && (
            <p className="font-medium text-text-alt text-lg md:text-xl">
              جاري التحميل...
            </p>
          )}

          {!loading && error && (
            <div className="w-full space-y-3">
              <p className="font-medium text-red-600 text-lg md:text-xl">
                حصل خطأ: {error}
              </p>
              <button
                type="button"
                onClick={onRetry}
                className="px-4 py-2 rounded-xl bg-primary text-white"
              >
                إعادة المحاولة
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="font-medium text-text-alt text-lg md:text-xl leading-loose whitespace-pre-line">
              {/* ✅ لو رجع HTML من الـ backend وعايز تعرضه كـ HTML قولّي */}
              {selectedItem?.content || "—"}
            </div>
          )}
        </section>
      </main>
    </section>
  );
};
