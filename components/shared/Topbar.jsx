"use client";

import { usePathname } from "next/navigation";
import { headerIcons } from "../../public/svgs";
import SearchBanner from "./SearchBanner";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Dropdown } from "antd";
import { ChevronLeft, Menu, X, ChevronDown } from "lucide-react";
import headerData from "./headerData";
import { useUser } from "../../lib/useUser";
import Container from "../ui/Container";
import { AnimatePresence } from "framer-motion";

export default function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user } = useUser();

  useEffect(() => {
    console.log("logged User", user);
  }, [user]);

  if (pathname.includes("mock-test")) {
    return null;
  }

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm  py-[20px] md:py-[35.5px] lg:py-[35.5px]">
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"} className="flex items-center space-x-2">
          <img
            src="/images/logo.svg"
            alt="Logo"
            className="lg:w-[65.5px] w-[45px] h-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4 md:!space-x-5  xl:space-x-6 space-x-reverse">
          {headerData.map((group, index) => {
            if ((!group.items || group.items.length === 0) && group.link) {
              return (
                <Link
                  key={group.key}
                  href={group.link}
                  target={group.target == "_blank" ? "_blank" : "_self"}
                  className={` ${
                    index == 0 ? "ml-5" : ""
                  } cursor-pointer  hover:text-primary !text-[calc(9px+.3vw)] xl:!text-base flex items-center border-0 hover:border-b-[3px] hover:border-primary`}
                >
                  {group.title}
                </Link>
              );
            }
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
                    " cursor-pointer  hover:text-primary !text-[calc(9px+.3vw)] xl:!text-base  whitespace-nowrap   hover:border-b-[3px] hover:border-primary"
                  }
                >
                  {group.title}
                </div>
              </Dropdown>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-x-4">
          <div className="flex items-center gap-x-[8px]">
            <button onClick={() => setOpenSearch(true)}>
              <headerIcons.Search className="text-text stroke-primary " />
            </button>

            <Link href="/cart" className="relative">
              <headerIcons.Cart className="text-text stroke-primary" />
              <div className="absolute w-6 h-6 bg-red-700 text-white text-base font-bold flex items-center justify-center top-[-5px] right-[5px] translate-x-1/2  rounded-full ">
                8
              </div>
            </Link>
            {isAuthenticated && (
              <Link href="/notifications" className="relative">
                <headerIcons.Notification className="text-text stroke-primary" />
                <div className="absolute w-6 h-6 bg-red-700 text-white text-base font-bold flex items-center justify-center top-[-5px] right-[5px] translate-x-1/2  rounded-full ">
                  5
                </div>
              </Link>
            )}

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
              href={user?.type == "marketer" ? "/marketer-profile" : "/profile"}
              className="px-16  py-4 bg-white transition-all rounded-[100px] outline outline-1 outline-offset-[-0.50px] outline-primary hover:bg-primary group hover:text-white inline-flex justify-center items-center gap-4"
            >
              <div className="justify-center  group-hover:text-white   text-primary  text-base font-bold font-['Cairo'] leading-normal">
                حسابي
              </div>
            </Link>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-x-2 ">
          <button onClick={() => setOpenSearch(true)}>
            <headerIcons.Search className="text-text stroke-primary !w-10 !h-10" />
          </button>

          <Link href="/cart">
            <headerIcons.Cart className="text-text stroke-primary !w-10 !h-10" />
          </Link>

          {isAuthenticated && (
            <Link href="/notifications" className="relative">
              <headerIcons.Notification className="text-text stroke-primary !w-10 !h-10" />
              <div className="absolute w-4 h-4 bg-red-700 text-white text-xs font-bold flex items-center justify-center top-[-5px] right-[5px] translate-x-1/2 rounded-full">
                5
              </div>
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu
          user={user}
          headerData={headerData}
          isAuthenticated={isAuthenticated}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}

      <AnimatePresence>
        {openSearch && (
          <SearchBanner openSearch={openSearch} setOpenSearch={setOpenSearch} />
        )}
      </AnimatePresence>
    </header>
  );
}

// Mobile Menu Component
const MobileMenu = ({ headerData, isAuthenticated, onClose, user }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  return (
    <div className="lg:hidden fixed inset-0 top-[70px] bg-white z-40 overflow-y-auto">
      <nav className="flex flex-col p-4">
        {headerData.map((group, index) => {
          if ((!group.items || group.items.length === 0) && group.link) {
            return (
              <Link
                key={group.key}
                href={group.link}
                onClick={onClose}
                className="py-4 px-2 border-b border-gray-200 text-text font-medium"
              >
                {group.title}
              </Link>
            );
          }

          return (
            <div key={group.key} className="border-b border-gray-200">
              <button
                onClick={() =>
                  setExpandedItem(expandedItem === index ? null : index)
                }
                className="w-full flex items-center justify-between py-4 px-2 text-text font-medium"
              >
                <span>{group.title}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    expandedItem === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedItem === index && (
                <MobileSubMenu items={group.items} onClose={onClose} />
              )}
            </div>
          );
        })}

        {/* Mobile Auth Buttons */}
        <div className="mt-6 space-y-3">
          {!isAuthenticated ? (
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center justify-center text-sm font-bold relative bg-primary text-white h-[48px] rounded-[100px]"
            >
              إنشاء حساب / تسجيل الدخول
            </Link>
          ) : (
            <Link
              href={user?.type == "marketer" ? "/marketer-profile" : "/profile"}
              onClick={onClose}
              className="flex items-center justify-center text-sm font-bold bg-white h-[48px] rounded-[100px] border-2 border-primary text-primary"
            >
              {user?.type == "marketer" ? "الملف الشخصي" : "حسابي"}
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

// Mobile SubMenu Component
const MobileSubMenu = ({ items, onClose }) => {
  const [expandedSubItem, setExpandedSubItem] = useState(null);

  return (
    <div className="bg-gray-50 px-4 py-2">
      {items?.map((item, index) => {
        const hasSubItems = item.subItems && item.subItems.length > 0;

        return (
          <div
            key={item.key || index}
            className="border-b border-gray-200 last:border-0"
          >
            {hasSubItems ? (
              <>
                <button
                  onClick={() =>
                    setExpandedSubItem(expandedSubItem === index ? null : index)
                  }
                  className="w-full flex items-center justify-between py-3 text-sm text-text"
                >
                  <span>{item.title}</span>
                  <div className="flex items-center gap-2">
                    {typeof item.count === "number" && (
                      <span className="px-2 py-1 bg-primary-bg rounded-lg text-xs font-medium">
                        {item.count}
                      </span>
                    )}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedSubItem === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {expandedSubItem === index && (
                  <div className="pr-4 pb-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subItem.key || subIndex}
                        href={subItem.link || "#"}
                        onClick={onClose}
                        className="block py-2 text-sm text-text hover:text-primary"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.link || item.href || "#"}
                onClick={onClose}
                className="flex items-center justify-between py-3 text-sm text-text"
              >
                <span>{item.title}</span>
                {typeof item.count === "number" && (
                  <span className="px-2 py-1 bg-primary-bg rounded-lg text-xs font-medium">
                    {item.count}
                  </span>
                )}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Desktop DropDown Components (unchanged)
export const DropDownItems = ({ items }) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  const [openSub, setOpenSub] = useState(null);

  return (
    <nav
      className="flex rounded-3xl flex-col items-start pt-2 pb-6 px-4 relative bg-white border-2 [border-top-style:solid]  border-variable-collection-stroke"
      role="navigation"
      aria-title="Course categories"
      onMouseLeave={() => setOpenSub(null)}
    >
      {items?.map((course, index) => {
        const isLast = index === items.length - 1;
        const isFirst = index === 0;
        const href = course.link || course.href;
        const rowId = `${course.title || course.id}-${index}`;
        const target = course.target || "_self";

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
                  <span className="relative flex items-center justify-center w-fit mt-[-1.00px] font-medium text-text text-sm tracking-[0] leading-6 whitespace-nowrap">
                    {course.count}
                  </span>
                </div>
              ) : null}

              <span className="relative w-4 h-4  aspect-[1]" aria-hidden="true">
                <ChevronLeft className="w-4 h-4" />
              </span>
            </div>
          </div>
        );

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
            <div onClick={() => setOpenSub(rowId)}>
              {href ? (
                <Link href={href} target={target} className="block">
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
            <div key={l.key} className="hover:!text-primary">
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
