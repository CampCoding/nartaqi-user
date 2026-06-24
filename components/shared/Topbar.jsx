"use client";
import { usePathname, useRouter } from "next/navigation";
import { headerIcons } from "../../public/svgs";
import SearchBanner from "./SearchBanner";
import { useEffect, useMemo, useState } from "react";
import Link from "@/components/ui/NavLink";
import { Dropdown } from "antd";
import { ChevronLeft, Menu, X, ChevronDown } from "lucide-react";
import headerData from "./headerData";
import Container from "../ui/Container";
import { AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart } from "../utils/Store/Slices/cartSlice";
import useHeaderCoursesItems from "./Hooks/useHeaderCategoryParts";
import useHeaderFreeVideosItems from "./Hooks/useHeaderFreeVideosItems";
import useHeaderPlacementTests from "./Hooks/useHeaderPlacementTests";
import toast from "react-hot-toast";
import { logoutUser } from "../utils/Store/Slices/authntcationSlice";

export default function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, token } = useSelector((state) => state.auth);

  const accountItems = useMemo(
    () => [
      { key: "my-courses", label: "دوراتي" },
      { key: "my-books", label: "كتبي" },
      { key: "account", label: "حسابي" },
      { key: "progress", label: "معدل الإنجاز" },
      { type: "divider" },
      { key: "logout", danger: true, label: "تسجيل الخروج" },
    ],
    []
  );

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/");
    toast.success("تم تسجيل الخروج بنجاح", { duration: 3000 });
  };

  const onAccountMenuClick = ({ key }) => {
    if (key === "my-courses") return router.push("/my-courses");
    if (key === "my-books") return router.push("/my-books");
    if (key === "account")
      return router.push(
        user?.type === "marketer" ? "/marketer-profile" : "/profile"
      );
    if (key === "progress") return router.push("/course-rate");
    if (key === "logout") {
      handleLogout();
    }
  };

  const { items: apiCoursesItems, loading: coursesMenuLoading } =
    useHeaderCoursesItems(user?.id);

  const {
    freeitems: apiFreeItems,
    achievementsItem,
    loading: freeMenuLoading,
  } = useHeaderFreeVideosItems();

  const { placementTests, loading: placementTestsLoading } =
    useHeaderPlacementTests();

  const finalHeaderData = useMemo(() => {
    return headerData
      .map((g) => {
        if (g.key === "courses") {
          return {
            ...g,
            items: coursesMenuLoading
              ? [
                {
                  id: "loading-courses",
                  title: "جاري التحميل...",
                  count: null,
                  link: "#",
                },
              ]
              : apiCoursesItems.length
                ? apiCoursesItems
                : [
                  {
                    id: "empty-courses",
                    title: "لا توجد أقسام",
                    count: 0,
                    link: "/courses",
                  },
                ],
          };
        }

        if (g.key === "free") {
          return {
            ...g,
            items: freeMenuLoading
              ? [
                {
                  id: "loading-free",
                  title: "جاري التحميل...",
                  count: null,
                  link: "#",
                },
              ]
              : apiFreeItems.length
                ? [...apiFreeItems]
                : [
                  {
                    id: "empty-free",
                    title: "لا توجد أقسام",
                    count: 0,
                    link: "/free-courses",
                  },
                ],
          };
        }

        if (g.key === "grades") {
          return {
            ...g,
            items: freeMenuLoading
              ? [
                {
                  id: "loading-free",
                  title: "جاري التحميل...",
                  count: null,
                  link: "#",
                },
              ]
              : achievementsItem.length
                ? [...achievementsItem]
                : [
                  {
                    id: "empty-free",
                    title: "لا توجد داتا",
                    count: 0,
                    link: "/free-courses",
                  },
                ],
          };
        }

        if (g.key === "services" && g.title === "خدمات مجانية") {
          return {
            ...g,
            items: g.items.map((item) => {
              if (item.id === 2 && item.title === "اختبار تحديد المستوى") {
                return {
                  ...item,
                  subItems: placementTestsLoading
                    ? [
                      {
                        key: "loading-placement",
                        title: "جاري التحميل...",
                        link: "#",
                      },
                    ]
                    : placementTests.length
                      ? placementTests
                      : [
                        {
                          key: "empty-placement",
                          title: "لا توجد اختبارات",
                          link: "#",
                        },
                      ],
                };
              }
              return item;
            }),
          };
        }

        return g;
      })
      .filter((item) => !item.ifLoggedIn || token);
  }, [
    apiCoursesItems,
    coursesMenuLoading,
    apiFreeItems,
    freeMenuLoading,
    achievementsItem,
    placementTests,
    placementTestsLoading,
    token,
  ]);

  const { totalItems, isLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    if (token) {
      dispatch(getUserCart());
    }
  }, [token, dispatch]);

  if (pathname.includes("mock-test")) {
    return null;
  }

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm py-3 sm:py-4 md:py-5 lg:py-[28px] xl:py-[35.5px]">
      <Container className="flex items-center justify-between gap-2 sm:gap-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
          <img
            loading="lazy"
            src="/images/logo.svg"
            alt="Logo"
            className="w-10 sm:w-12 md:w-14 lg:w-[55px] xl:w-[65.5px] h-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-3 lg:space-x-4 xl:space-x-6 space-x-reverse">
          {finalHeaderData.map((group, index) => {
            if ((!group.items || group.items.length === 0) && group.link) {
              // ✅ تأكد إن الـ link string
              const safeLink =
                typeof group.link === "string" ? group.link : "#";

              return (
                <Link
                  key={index}
                  href={safeLink}
                  target={group.target === "_blank" ? "_blank" : "_self"}
                  className={`${index === 0 ? "ml-3 lg:ml-4 xl:ml-5" : ""
                    } cursor-pointer hover:text-primary text-[12px] lg:text-[13px] xl:text-base flex items-center border-b-[3px] border-transparent hover:border-b-[3px] hover:border-primary whitespace-nowrap`}
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
                <div className="cursor-pointer hover:text-primary text-[12px] lg:text-[13px] xl:text-base whitespace-nowrap border-b-[3px] border-transparent hover:border-b-[3px] hover:border-primary">
                  {group.title}
                </div>
              </Dropdown>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-x-3 xl:gap-x-4 flex-shrink-0">
          <div className="flex items-center gap-x-1.5 lg:gap-x-2 xl:gap-x-[8px]">
            <button onClick={() => setOpenSearch(true)} className="p-1">
              <headerIcons.Search className="text-text stroke-primary w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
            </button>

            <Link href="/cart" className="relative p-1">
              <headerIcons.Cart className="text-text stroke-primary w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
              <CartBadge count={totalItems} isLoading={isLoading} />
            </Link>

            {token && (
              <Link href="/notifications" className="relative p-1">
                <headerIcons.Notification className="text-text stroke-primary w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
              </Link>
            )}

            {!token && (
              <Link
                href="/login"
                className="flex mr-2 lg:mr-3 xl:mr-[16px] items-center text-[10px] lg:text-xs font-bold pr-4 lg:pr-5 xl:pr-[24px] leading-[150%] relative bg-primary text-bg h-10 lg:h-12 xl:h-[56px] w-[170px] lg:w-[200px] xl:w-[241px] rounded-[100px]"
              >
                إنشاء حساب / تسجيل الدخول
                <div className="absolute left-1 lg:left-1.5 xl:left-[8px] top-1/2 -translate-y-1/2 rounded-full bg-text">
                  <headerIcons.ArrowLoginButton className="text-bg w-6 h-6 lg:w-8 lg:h-8 xl:w-auto xl:h-auto" />
                </div>
              </Link>
            )}
          </div>

          {token && (
            <Dropdown
              menu={{ items: accountItems, onClick: onAccountMenuClick }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="px-4 lg:px-6 xl:px-12 py-2 lg:py-3 xl:py-4 bg-white transition-all rounded-[100px] outline outline-1 outline-offset-[-0.50px] outline-primary hover:bg-primary group hover:text-white inline-flex justify-center items-center gap-2 lg:gap-3 xl:gap-4 whitespace-nowrap"
              >
                <ChevronDown className="w-3 h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 text-primary group-hover:text-white" />
              </button>
            </Dropdown>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-x-1 sm:gap-x-1.5 md:gap-x-2 flex-shrink-0">
          <button onClick={() => setOpenSearch(true)} className="p-1 sm:p-1.5">
            <headerIcons.Search className="text-text stroke-primary !w-7 !h-7 sm:!w-8 sm:!h-8 md:!w-10 md:!h-10" />
          </button>

          <Link href="/cart" className="relative p-1 sm:p-1.5">
            <headerIcons.Cart className="text-text stroke-primary !w-7 !h-7 sm:!w-8 sm:!h-8 md:!w-10 md:!h-10" />
            <CartBadge count={totalItems} isLoading={isLoading} size="small" />
          </Link>

          {token && (
            <Link href="/notifications" className="relative p-1 sm:p-1.5">
              <headerIcons.Notification className="text-text stroke-primary !w-7 !h-7 sm:!w-8 sm:!h-8 md:!w-10 md:!h-10" />
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu
          user={user}
          headerData={finalHeaderData}
          token={token}
          totalItems={totalItems}
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

const CartBadge = ({ count, isLoading, size = "normal" }) => {
  if (count === 0 && !isLoading) return null;

  const sizeClasses = {
    normal:
      "w-5 h-5 lg:w-6 lg:h-6 text-xs lg:text-sm xl:text-base top-[-4px] lg:top-[-5px] right-[5px]",
    small: "w-4 h-4 text-[10px] sm:text-xs top-[-4px] sm:top-[-5px] right-[5px]",
  };

  return (
    <div
      className={`absolute bg-red-700 text-white font-bold flex items-center justify-center translate-x-1/2 rounded-full ${sizeClasses[size]}`}
    >
      {isLoading ? (
        <span className="animate-pulse">•</span>
      ) : count > 99 ? (
        "99+"
      ) : (
        count
      )}
    </div>
  );
};

// Mobile Menu Component
const MobileMenu = ({ headerData, token, onClose, user, totalItems }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  return (
    <div className="lg:hidden fixed inset-0 top-[60px] sm:top-[68px] md:top-[80px] bg-white z-40 overflow-y-auto">
      <nav className="flex flex-col p-3 sm:p-4">
        {/* Cart Link in Mobile Menu */}
        <Link
          href="/cart"
          onClick={onClose}
          className="py-3 sm:py-4 px-2 border-b border-gray-200 text-text font-medium flex items-center justify-between text-sm sm:text-base"
        >
          <span>السلة</span>
          {totalItems > 0 && (
            <span className="bg-red-700 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:py-1 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        {headerData.map((group, index) => {
          if ((!group.items || group.items.length === 0) && group.link) {
            const safeLink =
              typeof group.link === "string" ? group.link : "#";

            return (
              <Link
                key={group.key}
                href={safeLink}
                onClick={onClose}
                className="py-3 sm:py-4 px-2 border-b border-gray-200 text-text font-medium text-sm sm:text-base"
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
                className="w-full flex items-center justify-between py-3 sm:py-4 px-2 text-text font-medium text-sm sm:text-base"
              >
                <span>{group.title}</span>
                <ChevronDown
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${expandedItem === index ? "rotate-180" : ""
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
        <div className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
          {!token ? (
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center justify-center text-xs sm:text-sm font-bold relative bg-primary text-white h-11 sm:h-12 md:h-[48px] rounded-[100px]"
            >
              إنشاء حساب / تسجيل الدخول
            </Link>
          ) : (
            <Link
              href={
                user?.type === "marketer" ? "/marketer-profile" : "/profile"
              }
              onClick={onClose}
              className="flex items-center justify-center text-xs sm:text-sm font-bold bg-white h-11 sm:h-12 md:h-[48px] rounded-[100px] border-2 border-primary text-primary"
            >
              {user?.type === "marketer" ? "الملف الشخصي" : "حسابي"}
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
    <div className="bg-gray-50 px-3 sm:px-4 py-2">
      {items?.map((item, index) => {
        const hasSubItems = item.subItems && item.subItems.length > 0;

        return (
          <div
            key={item.key || item.id || index}
            className="border-b border-gray-200 last:border-0"
          >
            {hasSubItems ? (
              <>
                <button
                  onClick={() =>
                    setExpandedSubItem(expandedSubItem === index ? null : index)
                  }
                  className="w-full flex items-center justify-between py-2.5 sm:py-3 text-xs sm:text-sm text-text"
                >
                  <span>{item.title}</span>
                  <div className="flex items-center gap-2">
                    <ChevronDown
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${expandedSubItem === index ? "rotate-180" : ""
                        }`}
                    />
                  </div>
                </button>

                {expandedSubItem === index && (
                  <div className="pr-3 sm:pr-4 pb-2">
                    {item.subItems.map((subItem, subIndex) => {
                      const safeLink =
                        typeof subItem.link === "string" ? subItem.link : "#";
                      return (
                        <Link
                          key={subItem.key || subIndex}
                          href={safeLink}
                          onClick={onClose}
                          className="block py-1.5 sm:py-2 text-xs sm:text-sm text-text hover:text-primary"
                        >
                          {subItem.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              (() => {
                const safeLink =
                  typeof item.link === "string"
                    ? item.link
                    : typeof item.href === "string"
                      ? item.href
                      : "#";
                return (
                  <Link
                    href={safeLink}
                    onClick={onClose}
                    className="flex items-center justify-between py-2.5 sm:py-3 text-xs sm:text-sm text-text"
                  >
                    <span>{item.title}</span>
                  </Link>
                );
              })()
            )}
          </div>
        );
      })}
    </div>
  );
};

// Desktop DropDown Components
export const DropDownItems = ({ items }) => {
  const [openSub, setOpenSub] = useState(null);

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <nav
      className="flex max-h-[500px] overflow-auto custom-scroll rounded-3xl flex-col items-start pt-2 pb-6 px-4 relative bg-white border-2 [border-top-style:solid] border-variable-collection-stroke"
      role="navigation"
      aria-label="Course categories"
      onMouseLeave={() => setOpenSub(null)}
    >
      {items?.map((course, index) => {
        const isLast = index === items.length - 1;
        const isFirst = index === 0;
        // ✅ تأكد إن href string
        const rawHref = course.link || course.href;
        const href = typeof rawHref === "string" ? rawHref : "#";

        const rowId = `${course.title || course.id}-${index}`;
        const target = course.target || "_self";
        const hasSubItems = course.subItems && course.subItems.length > 0;

        const rowContent = (
          <div
            className={`flex w-[260px] xl:w-[271px] cursor-pointer justify-between px-0 py-3 xl:py-4 flex-[0_0_auto] ${isFirst ? "mt-[-1.00px]" : ""
              } ${!isLast
                ? "ml-[-1.00px] mr-[-1.00px] bg-white border-b-2 [border-bottom-style:solid] border-variable-collection-stroke"
                : "w-[258px] xl:w-[269px] bg-white rounded-[0px_0px_30px_30px]"
              } items-center relative cursor-pointer`}
            role="menuitem"
            aria-haspopup={hasSubItems ? "menu" : undefined}
            aria-expanded={openSub === rowId ? "true" : "false"}
          >
            <div
              className={`${isLast
                  ? "flex h-6 items-center relative flex-1 grow"
                  : "inline-flex h-6 items-center relative flex-[0_0_auto]"
                }`}
            >
              {isLast ? (
                <p className="flex-1 font-cairo mt-[-12.00px] mb-[-12.00px] relative flex items-center font-medium text-text text-sm xl:text-base leading-6 [direction:rtl]">
                  {course.title}
                </p>
              ) : (
                <h3 className="self-stretch font-cairo w-fit text-left whitespace-wrap relative flex items-center max-w-[100%] font-medium text-text text-sm xl:text-base leading-6 [direction:rtl]">
                  {`${course.title?.length > 30
                      ? course?.title?.slice(0, 30) + "..."
                      : course.title
                    }`}
                </h3>
              )}
            </div>

            <div className="inline-flex gap-2 flex-[0_0_auto] items-center relative">
              {hasSubItems && (
                <span className="relative w-4 h-4 aspect-[1]" aria-hidden="true">
                  <ChevronLeft className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>
        );

        if (hasSubItems) {
          return (
            <Dropdown
              key={rowId}
              dropdownRender={() => (
                <SubMenu course={course} subItems={course.subItems} />
              )}
              placement="leftTop"
              trigger={["click"]}
              open={openSub === rowId}
              onOpenChange={(v) => setOpenSub(v ? rowId : null)}
              mouseEnterDelay={0.08}
              mouseLeaveDelay={0.12}
              destroyPopupOnHide
              popupClassName="submenu-dropdown"
              zIndex={1000}
            >
              <div onClick={() => setOpenSub(rowId)}>{rowContent}</div>
            </Dropdown>
          );
        }

        return (
          <div key={rowId}>
            {href && href !== "#" ? (
              <Link href={href} target={target} className="block">
                {rowContent}
              </Link>
            ) : (
              rowContent
            )}
          </div>
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
        href: typeof s.link === "string" ? s.link : "#",
        title: s.title,
      }))
      : null;

  if (!links) return null;

  return (
    <div className="bg-white border rounded-2xl shadow-md p-3 sm:p-4 min-w-[200px] xl:min-w-[220px] max-h-[400px] overflow-y-auto">
      <ul className="flex flex-col gap-2 sm:gap-3">
        {links.map((l) => {
          const href = l.href || "#";
          return (
            <li key={l.key}>
              <Link
                href={href}
                className="block py-1.5 sm:py-2 text-xs sm:text-sm text-text hover:text-primary"
              >
                {l.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};