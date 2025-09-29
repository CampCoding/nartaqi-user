
"use client"

import { usePathname } from "next/navigation";
import { headerIcons } from "../../public/svgs";
import SearchBanner from "./SearchBanner";
import { useState } from "react";

export default function Header() {
  const [openSearch , setOpenSearch] = useState(false);


  
  const pathname = usePathname()

  if(pathname.includes("mock-test")){
    return null
  }


  



  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm  py-[35.5px]">
      <div className="container mx-auto flex items-center justify-between px-[64px]">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/images/logo.svg"
            alt="Logo"
            className="w-[65.5px] h-auto"
          />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
          <div className="text-primary text-lg leading-6 font-bold whitespace-nowrap">
            الرئيسية
          </div>
          <div className="text-text text-base leading-6 whitespace-nowrap">
            الدورات
          </div>
          <div className="text-text text-base leading-6 whitespace-nowrap">
            الشروحات المجانية
          </div>
          <div className="text-text text-base leading-6 whitespace-nowrap">
            المسابقات
          </div>
          <div className="text-text text-base leading-6 whitespace-nowrap">
            خدمات مجانية
          </div>
          <div className="text-text text-base leading-6 whitespace-nowrap">
            درجات الطلاب
          </div>
          <div className="text-text text-base leading-6 whitespace-nowrap">
            انضم إلينا
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-x-[8px]">
          {/* Search */}
          <button onClick={()=> setOpenSearch(true)}>
            <headerIcons.Search className="text-text" />
          </button>

          {/* Cart */}
          <button>
            <headerIcons.Cart className="text-text" />
          </button>

          {/* Login / Register */}
          <button className="flex mr-[16px] items-center text-xs font-bold pr-[24px] leading-[150%] relative bg-primary text-bg h-[56px] w-[241px] rounded-[100px]">
            إنشاء حساب / تسجيل الدخول
            <div className="absolute left-[8px] top-1/2 -translate-y-1/2 rounded-full bg-text">
              <headerIcons.ArrowLoginButton className="text-bg" />
            </div>
          </button>
        </div>
      </div>
     <SearchBanner openSearch={openSearch} setOpenSearch={setOpenSearch} />

    </header>
  );
}
