"use client";

import React, { useCallback, useMemo, useRef, useEffect } from "react";
import { DailyQuizSection } from "../ui/Cards/CompetitionCard";
import Container from "../ui/Container";
import { useGetAllCompetitions } from "../shared/Hooks/useGetCompetitions";
import { useSelector } from "react-redux";

const SkeletonCard = () => (
  <div className="w-full max-w-[419px] rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-5">
    <div className="h-5 w-1/2 rounded bg-white/10" />
    <div className="mt-3 h-4 w-3/4 rounded bg-white/10" />
    <div className="mt-2 h-4 w-2/3 rounded bg-white/10" />
    <div className="mt-6 h-10 w-full rounded-xl bg-white/10" />
  </div>
);

const CompetitionsSection = () => {
  const { token, user } = useSelector((state) => state.auth);
  const student_id = user?.id;
  const sectionRef = useRef(null);

  const getToken = useCallback(() => token, [token]);

  const {
    items,
    loading,
    error,
    refetch,
    pagination,
    page,
    setPage,
    hasNext,
    hasPrev,
    next,
    prev,
  } = useGetAllCompetitions({
    initialPage: 1,
    initialPerPage: 6, // ✅ show 3 per page (server-side)
    getToken,
    student_id,
    enabled: true,
  });

  const currentPage = pagination?.current_page ?? page ?? 1;
  const lastPage = pagination?.last_page ?? 1;

  // pages to show (simple window)
  const pages = useMemo(() => {
    const total = Number(lastPage) || 1;
    const cur = Number(currentPage) || 1;

    const start = Math.max(1, cur - 2);
    const end = Math.min(total, start + 4);
    const arr = [];
    for (let p = start; p <= end; p++) arr.push(p);
    return arr;
  }, [currentPage, lastPage]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 200; // 90px offset
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [currentPage]);

  const onPageClick = (callback) => {


    const el = sectionRef.current;
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 200; // 90px offset
    window.scrollTo({ top: y, behavior: "smooth" });
    callback()
  }

  return (
    <div
      id="competitions-section"
      ref={sectionRef}
      className="w-full flex items-center justify-center mt-[32px] min-h-[770px] relative overflow-hidden bg-[url('/images/competition-banner-section-mobile.png')] md:bg-[url('/images/competition-banner-section.png')] bg-cover bg-top bg-fixed lg:bg-scroll py-4 lg:p-0">
      <div className="w-full">
        <Container className="grid py-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 justify-items-center mx-auto max-w-[1312px] w-full">
          {/* Loading */}
          {loading && (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="col-span-full w-full max-w-[720px] mx-auto rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-center">
              <p className="text-sm text-white/90">Something went wrong: {error}</p>
              <button
                onClick={refetch}
                className="mt-3 inline-flex items-center justify-center rounded-xl px-4 py-2 bg-white/10 hover:bg-white/15 transition"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && (!items || items.length === 0) && (
            <div className="col-span-full w-full max-w-[720px] mx-auto rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6 text-center">
              <p className="text-sm text-white/90">No competitions available right now.</p>
            </div>
          )}

          {/* Data */}
          {!loading && !error && items && items.length > 0 && (
            <>
              {items.map((comp, idx) => (
                <div key={comp?.id ?? idx} className="w-full mx-auto">
                  <DailyQuizSection
                    color={comp?.type == "daily" ? "primary" : comp?.type == "weakly" ? "secondary" : "warning"} buttonHoverColor="primary-dark"
                    border="primary-light"
                    competition={comp}
                    onJoin={(c) => console.log("join", c)}
                  />
                </div>
              ))}
            </>
          )}
        </Container>

        {/* ✅ Pagination Bar */}
        {!loading && !error && lastPage > 1 && (
          <div className="w-full flex items-center justify-center pb-8">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-primary backdrop-blur-md px-3 py-2 shadow-lg shadow-black/20">
              {/* Prev */}
              <button
                onClick={prev}
                disabled={currentPage <= 1}
                className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/90 bg-white/20 hover:bg-white/10 transition disabled:opacity-40 disabled:hover:bg-white/5"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10 transition">
                  ‹
                </span>
                <span className="hidden sm:inline">السابق</span>
              </button>

              {/* Numbers (hide on very small screens) */}
              <div className="hidden sm:flex items-center gap-1 px-1">
                {pages[0] > 1 && (
                  <>
                    <button
                      onClick={() => setPage(1)}
                      className="h-9 min-w-9 px-3 rounded-full text-sm text-white/80 bg-white/5 hover:bg-white/10 transition"
                    >
                      1
                    </button>
                    <span className="px-1 text-white/40 select-none">…</span>
                  </>
                )}

                {pages.map((p) => {
                  const active = p === currentPage;
                  return (
                    <button
                      key={p}
                      onClick={() => onPageClick(() => setPage(p))}
                      className={[
                        "h-9 min-w-9 px-3 rounded-full text-sm transition",
                        active
                          ? "bg-white text-secondary font-semibold shadow"
                          : "text-white/80 bg-white/5 hover:bg-white/10",
                      ].join(" ")}
                    >
                      {p}
                    </button>
                  );
                })}

                {pages[pages.length - 1] < lastPage && (
                  <>
                    <span className="px-1 text-white/40 select-none">…</span>
                    <button
                      onClick={() => setPage(lastPage)}
                      className="h-9 min-w-9 px-3 rounded-full text-sm text-white/80 bg-white/5 hover:bg-white/10 transition"
                    >
                      {lastPage}
                    </button>
                  </>
                )}
              </div>

              {/* On mobile: show page indicator */}
              <div className="sm:hidden px-2 text-xs text-white/70">
                Page <span className="text-white/90 font-semibold">{currentPage}</span>
                <span className="text-white/40"> / </span>
                {lastPage}
              </div>

              {/* Next */}
              <button
                onClick={next}
                disabled={currentPage >= lastPage}
                className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/90 bg-white/20 hover:bg-white/10 transition disabled:opacity-40 disabled:hover:bg-white/5"
              >
                <span className="hidden sm:inline">التالي</span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10 transition">
                  ›
                </span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CompetitionsSection;
