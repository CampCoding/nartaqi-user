"use client";
import React, { useEffect, useState } from "react";
import { ProfileSideBar } from "../../components/profile/ProfileSideBar";
import MobileMenu from "../../components/profile/_components/MobileMenu";
import Container from "../../components/ui/Container";
import { useSelector } from "react-redux";
import LoadingPage from "../../components/shared/Loading.jsx";
import { useRouter } from "next/navigation.js";
const layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // لو مفيش user → اعرض loading بس
  if (!user) {
    return (
      <Container>
        <LoadingPage />
      </Container>
    );
  }

  return (
    <Container className="mx-auto pt-8 mt-4 sm:mt-8 xl:mt-[32px] mb-8 sm:mb-16 xl:mb-[64px] ">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden mb-6 flex items-center gap-3 bg-primary text-white px-4 py-3 rounded-[20px] font-bold text-base transition-all duration-200 hover:bg-primary/90"
        aria-label="فتح القائمة"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        القائمة
      </button>

      <div className="lg:grid lg:grid-cols-[331px_auto] lg:gap-6">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden lg:block">
          <ProfileSideBar />
        </div>

        {/* Mobile Menu - Hidden on desktop */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content */}
        <div className="w-full">{children}</div>
      </div>
    </Container>
  );
};

export default layout;
