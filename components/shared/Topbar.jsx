import { headerIcons } from "../../public/svgs";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm border-b   py-[35.5px]">
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
          <div className="  text-blue-500 text-lg text-left leading-6 whitespace-nowrap  font-[700] ">
            الرئيسية
          </div>
          <div className=" text-[#2d2d2d] text-base text-left leading-6 whitespace-nowrap ">
            الدورات
          </div>
          <div
            href="#"
            className="text-[#2d2d2d] text-base text-left leading-6 whitespace-nowrap"
          >
            الشروحات المجانية
          </div>
          <div
            href="#"
            className="text-[#2d2d2d] text-base text-left leading-6 whitespace-nowrap"
          >
            المسابقات
          </div>
          <div
            href="#"
            className="text-[#2d2d2d] text-base text-left leading-6 whitespace-nowrap"
          >
            خدمات مجانية
          </div>
          <div
            href="#"
            className="text-[#2d2d2d] text-base text-left leading-6 whitespace-nowrap"
          >
            درجات الطلاب
          </div>
          <div
            href="#"
            className="text-[#2d2d2d] text-base text-left leading-6 whitespace-nowrap"
          >
            انضم إلينا
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-x-[8px] ">
          {/* Cart */}
          <button className="">
            <headerIcons.Search />
          </button>

          <button className="">
            <headerIcons.Cart />
          </button>

          {/* Login / Register */}
          <button className="flex mr-[16px]  items-center text-xs font-[700] pr-[24px] leading-[150%] relative  bg-primary text-white  h-[56px] w-[241px] rounded-[100px]">
            إنشاء حساب / تسجيل الدخول
            <div className="absolute left-[8px] top-1/2 -translate-y-1/2  rounded-full bg-black">
              <headerIcons.ArrowLoginButton />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
