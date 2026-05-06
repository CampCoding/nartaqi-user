"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PagesBanner from "@/components/ui/PagesBanner";
import Container from "@/components/ui/Container";
// import { BookCard } from "../../components/Library/BookCard";
import { getMyLibrary } from "@/components/utils/Store/Slices/librarySlice";
import { ProfileSideBar } from "@/components/Profile/ProfileSideBar";
import BookCard from "../../../components/Store/BookCard";

const MyBooksPage = () => {
  const dispatch = useDispatch();
  const { books, isLoading, error } = useSelector((state) => state.library);

  useEffect(() => {
    dispatch(getMyLibrary());
  }, [dispatch]);

  return (
    <div>
      {/* <PagesBanner
        variant="normal"
        objectPosition={"object-[50%_80%]"}
        title={"كتبي"}
        image={"/images/Frame 1000004928.png"}
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "كتبي", link: "/my-books" },
        ]}
      /> */}

      <Container className="mt-[48px]">
        <div className="grid grid-cols-1 lg:grid-cols-[379px_auto] gap-6 mb-[56px]">
          {/* Sidebar - Desktop only */}
          <div className="hidden lg:block">
            <ProfileSideBar />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-secondary">
                  مكتبتي
                </h2>
                <p className="text-text-alt text-sm mt-1">
                  جميع الكتب التي اشتريتها
                </p>
              </div>
              <div className="bg-primary-light text-primary px-4 py-2 rounded-full font-bold text-sm">
                {books.length} كتاب
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <p className="text-red-500 text-lg mb-4">{error}</p>
                  <button
                    onClick={() => dispatch(getMyLibrary())}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    إعادة المحاولة
                  </button>
                </div>
              </div>
            ) : books.length === 0 ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="w-40 h-40 mx-auto mb-4 bg-primary-light rounded-full flex items-center justify-center">
                    <svg
                      className="w-20 h-20 text-primary opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text mb-2">
                    لا توجد كتب في مكتبتك بعد
                  </h3>
                  <p className="text-text-alt text-base mb-4">
                    ابدأ بتصفح المتجر وشراء كتبك المفضلة
                  </p>
                  <a
                    href="/store"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-all duration-300"
                  >
                    <span>تصفح المتجر</span>
                    <svg
                      className="w-5 h-5 rtl:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ) : (
              <section className="grid px-3 sm:px-0 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 xl:grid-cols-2 gap-x-4 gap-y-6">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </section>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MyBooksPage;
