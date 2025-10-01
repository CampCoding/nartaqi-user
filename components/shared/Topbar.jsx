"use client";

import { usePathname } from "next/navigation";
import { headerIcons } from "../../public/svgs";
import SearchBanner from "./SearchBanner";
import { useState } from "react";
import Link from "next/link";
import { Dropdown } from "antd";
import { ChevronLeft } from "lucide-react";
import headerData from "./headerData";
import { useUser } from "../../lib/useUser";

export default function Header() {
  const [openSearch, setOpenSearch] = useState(false);

  const pathname = usePathname();

  if (pathname.includes("mock-test")) {
    return null;
  }

  const { isAuthenticated } = useUser();

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm  py-[35.5px]">
      <div className="container mx-auto flex items-center justify-between px-[64px]">
        {/* Logo */}
        <Link href={"/"} className="flex items-center space-x-2">
          <img
            src="/images/logo.svg"
            alt="Logo"
            className="w-[65.5px] h-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
          {headerData.map((group, index) => {
            // If group has no items and has a link, render as a Link
            if ((!group.items || group.items.length === 0) && group.link) {
              return (
                <Link
                  key={group.key}
                  href={group.link}
                  className={
                    " cursor-pointer flex items-center border-0 hover:border-b-[3px] hover:border-primary"
                  }
                >
                  {group.title}
                </Link>
              );
            }
            // Otherwise, render as Dropdown
            return (
              <Dropdown
                key={group.key}
                dropdownRender={() => <DropDownItems items={group?.items} />}
                placement="bottomCenter"
                trigger={["hover"]}
                arrow
              >
                <div
                  className={
                    " cursor-pointer  whitespace-nowrap   hover:border-b-[3px] hover:border-primary"
                  }
                >
                  {group.title}
                </div>
              </Dropdown>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-[8px]">
            {/* Search */}
            <button onClick={() => setOpenSearch(true)}>
              <headerIcons.Search className="text-text stroke-primary " />
            </button>

            {/* Cart */}
            <Link href="/cart">
              <headerIcons.Cart className="text-text stroke-primary" />
            </Link>
            {isAuthenticated && (
              <Link href="/notifications" className="relative">
                <headerIcons.Notification className="text-text stroke-primary" />
                <div className="absolute w-6 h-6 bg-red-700 text-white text-base font-bold flex items-center justify-center top-[-5px] right-[5px] translate-x-1/2  rounded-full ">
                  5
                </div>
              </Link>
            )}

            {/* Login / Register */}
            {!isAuthenticated && (
              <Link
                href={"/login"}
                className="flex mr-[16px] items-center text-xs font-bold pr-[24px] leading-[150%] relative bg-primary text-bg h-[56px] w-[241px] rounded-[100px]"
              >
                إنشاء حساب / تسجيل الدخول
                <div className="absolute left-[8px] top-1/2 -translate-y-1/2 rounded-full bg-text">
                  <headerIcons.ArrowLoginButton className="text-bg" />
                </div>
              </Link>
            )}
          </div>

          {isAuthenticated && (
            <Link
              href={"/profile"}
              className="px-16  py-4 bg-white transition-all rounded-[100px] outline outline-1 outline-offset-[-0.50px] outline-primary hover:bg-primary group hover:text-white inline-flex justify-center items-center gap-4"
            >
              <div className="justify-center  group-hover:text-white   text-primary  text-base font-bold font-['Cairo'] leading-normal">
                حسابي
              </div>
            </Link>
          )}
        </div>
      </div>
      <SearchBanner openSearch={openSearch} setOpenSearch={setOpenSearch} />
    </header>
  );
}

export const DropDownItems = ({ items }) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  // NEW: state to control which row's submenu is open
  const [openSub, setOpenSub] = useState(null);

  return (
    <nav
      className="flex rounded-3xl flex-col items-start pt-2 pb-6 px-4 relative bg-white border-2 [border-top-style:solid]  border-variable-collection-stroke"
      role="navigation"
      aria-title="Course categories"
      // keep parent open while hovering inside
      onMouseLeave={() => setOpenSub(null)}
    >
      {items?.map((course, index) => {
        const isLast = index === items.length - 1;
        const isFirst = index === 0;
        const href = course.link || course.href;
        const rowId = `${course.title || course.id}-${index}`;

        const rowContent = (
          <div
            className={`flex w-[271px] cursor-pointer justify-between px-0 py-4 flex-[0_0_auto] ${
              isFirst ? "mt-[-1.00px]" : ""
            } ${
              !isLast
                ? "ml-[-1.00px] mr-[-1.00px] bg-white border-b-2 [border-bottom-style:solid] border-variable-collection-stroke"
                : "w-[269px] bg-white rounded-[0px_0px_30px_30px]"
            } items-center relative cursor-pointer`}
            role="menuitem"
            aria-haspopup={"menu"}
            aria-expanded={openSub === rowId ? "true" : "false"}
          >
            <div
              className={`${
                isLast
                  ? "flex h-6 items-center relative flex-1 grow"
                  : "inline-flex h-6 items-center relative flex-[0_0_auto]"
              }`}
            >
              {isLast ? (
                <p className="flex-1  font-cairo mt-[-12.00px] mb-[-12.00px] relative flex items-center  font-medium text-text text-base leading-6 [direction:rtl]">
                  {course.title}
                </p>
              ) : (
                <h3 className="self-stretch font-cairo w-fit text-left whitespace-nowrap relative flex items-center  font-medium text-text text-base leading-6 [direction:rtl]">
                  {course.title}
                </h3>
              )}
            </div>

            <div className="inline-flex gap-2 flex-[0_0_auto] items-center relative">
              {typeof course.count === "number" ? (
                <div className="flex flex-col w-6 h-6 justify-center gap-2.5 px-1 py-0 bg-primary-bg rounded-xl items-center relative">
                  <span className="relative flex items-center justify-center w-fit mt-[-1.00px] font-medium text-variable-collection-text text-sm tracking-[0] leading-6 whitespace-nowrap">
                    {course.count}
                  </span>
                </div>
              ) : null}

              {/* chevron indicates submenu */}
              <span className="relative w-4 h-4  aspect-[1]" aria-hidden="true">
                <ChevronLeft className="w-4 h-4" />
              </span>
            </div>
          </div>
        );

        // Always show a submenu (controlled hover)
        return (
          <Dropdown
            key={rowId}
            dropdownRender={() => (
              <SubMenu course={course} subItems={course.subItems} />
            )}
            placement="rightTop"
            trigger={["click"]}
            open={openSub === rowId}
            onOpenChange={(v) => setOpenSub(v ? rowId : null)}
            mouseEnterDelay={0.08}
            mouseLeaveDelay={0.12}
            destroyPopupOnHide
            popupClassName="submenu-dropdown"
            zIndex={1000}
          >
            {/* Note: keep the trigger a single element */}
            <div
              onClick={() => setOpenSub(rowId)}
              // onMouseLeave={() => setOpenSub(null)}
            >
              {href ? (
                <Link href={href} className="block">
                  {rowContent}
                </Link>
              ) : (
                rowContent
              )}
            </div>
          </Dropdown>
        );
      })}
    </nav>
  );
};

const SubMenu = ({ course, subItems }) => {
  const links =
    Array.isArray(subItems) && subItems.length > 0
      ? subItems.map((s, idx) => ({
          key: s.key || `sub-${idx}`,
          href: s.link || "#",
          title: s.title,
        }))
      : null;
  if (!links) return null;

  return (
    <div className="bg-white border rounded-2xl shadow-md p-4 min-w-[220px] h-[400px] overflow-y-auto">
      <ul className="flex flex-col gap-3">
        {links.map((l, index) => {
          const isLast = index === links.length - 1;
          const isFirst = index === 0;
          const href = l.link || l.href;
          console.log("subcourwse", l);

          const rowContent = (
            <div
              className={` group flex cursor-pointer  w-[271px] justify-between px-0 py-4 flex-[0_0_auto] ${
                isFirst ? "mt-[-1.00px]" : ""
              } ${
                !isLast
                  ? "ml-[-1.00px] mr-[-1.00px] bg-white border-b-2 [border-bottom-style:solid] border-variable-collection-stroke"
                  : "w-[269px] bg-white rounded-[0px_0px_30px_30px]"
              } items-center relative cursor-pointer`}
              role="menuitem"
              aria-haspopup={"menu"}
            >
              <div
                className={`  hover:text-primary ${
                  isLast
                    ? "flex h-6 items-center relative flex-1 grow"
                    : "inline-flex h-6 items-center relative flex-[0_0_auto]"
                }`}
              >
                {isLast ? (
                  <p className="flex-1   group-hover:text-primary  font-cairo mt-[-12.00px] mb-[-12.00px] relative flex items-center justify-center font-medium text-text text-base leading-6 [direction:rtl]">
                    {l.title}
                  </p>
                ) : (
                  <h3 className="self-stretch  group-hover:text-primary font-cairo w-fit text-left whitespace-nowrap relative flex items-center justify-center font-medium text-text text-base leading-6 [direction:rtl]">
                    {l.title}
                  </h3>
                )}
              </div>

              <div className="inline-flex gap-2 flex-[0_0_auto] items-center relative">
                {/* chevron indicates submenu */}
                <span
                  className="relative w-4 h-4  aspect-[1]"
                  aria-hidden="true"
                >
                  <ChevronLeft className="w-4 h-4" />
                </span>
              </div>
            </div>
          );

          return (
            <div
              // onMouseLeave={() => setOpenSub(null)}
              className="hover:!text-primary"
            >
              {href ? (
                <Link href={href} className="block ">
                  {rowContent}
                </Link>
              ) : (
                rowContent
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
};
