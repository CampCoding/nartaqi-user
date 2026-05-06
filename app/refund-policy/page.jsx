"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import PagesBanner from "./../../components/ui/PagesBanner";
import Container from "../../components/ui/Container";
import cx from "../../lib/cx";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const ReturnPolicyPage = () => {
  const [selectedSection, setSelectedSection] = useState(1);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch refund policy from API
  useEffect(() => {
    const fetchRefundPolicy = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${BASE_URL}/user/settings/getTconditions`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const allItems = response.data?.message || [];
        // ✅ Filter only refund type
        const refundItem = allItems.find((item) => item.type === "refund");

        if (refundItem) {
          setContent(refundItem.content);
        } else {
          setError("لا توجد سياسة استرجاع متاحة حالياً");
        }
      } catch (err) {
        console.error("Failed to fetch refund policy:", err);
        setError("حدث خطأ أثناء تحميل سياسة الاسترجاع");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRefundPolicy();
  }, []);

  const menuItems = useMemo(
    () => [
      {
        id: 1,
        type: "return-policy",
        text: "سياسة الاسترجاع والاستبدال",
        content: content,
      },
    ],
    [content]
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

      <Container className="mt-[48px]">
        <div className="grid grid-cols-1 lg:grid-cols-[379px_auto] gap-6">
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
            isLoading={isLoading}
            error={error}
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

// ✅ SideNav
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
          <div className="inline-flex h-4 items-center pl-0 pr-2 py-0 relative flex-[0_0_auto]">
            <div className="relative w-6 h-6 aspect-[1]">
              <ChevromLeft />
            </div>
          </div>

          <div
            className={`cursor-pointer ${
              selectedSection === item.id
                ? "font-bold !text-primary"
                : "text-text"
            } tracking-[0] relative w-fit text-lg md:text-xl leading-[normal] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]`}
          >
            {item.text}
          </div>
        </div>
      ))}
    </nav>
  );
};

// ✅ PoliciesSections - مع loading & error states
const PoliciesSections = ({
  selectedSection,
  setSelectedSection,
  selectedItem,
  isLoading,
  error,
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
          {isLoading ? (
            <div className="flex items-center justify-center w-full min-h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center w-full min-h-[300px]">
              <div className="text-center">
                <svg
                  className="w-16 h-16 text-red-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="text-red-500 text-lg font-bold">{error}</p>
              </div>
            </div>
          ) : (
            <div
              dir="rtl"
              className="font-medium w-full text-text-alt text-lg md:text-xl leading-loose"
              dangerouslySetInnerHTML={{
                __html: selectedItem?.content || "—",
              }}
            />
          )}
        </section>
      </main>
    </section>
  );
};
