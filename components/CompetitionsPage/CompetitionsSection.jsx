"use client"


import React from "react";
import { DailyQuizSection } from "../ui/Cards/CompetitionCard";
import Container from "../ui/Container";
import { useGetAllCompetitions } from "../shared/Hooks/useGetCompetitions";

const SkeletonCard = () => (
  <div className="w-full max-w-[419px] rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-5">
    <div className="h-5 w-1/2 rounded bg-white/10" />
    <div className="mt-3 h-4 w-3/4 rounded bg-white/10" />
    <div className="mt-2 h-4 w-2/3 rounded bg-white/10" />
    <div className="mt-6 h-10 w-full rounded-xl bg-white/10" />
  </div>
);

const CompetitionsSection = () => {
  const {
    items,
    loading,
    error,
    refetch,
  } = useGetAllCompetitions({
    initialPage: 1,
    initialPerPage: 3,
    enabled: true,
    // headers: { Authorization: `Bearer ${token}` }, // if needed
  });

  return (
    <div className="w-full flex items-center justify-center mt-[32px] min-h-[770px] relative overflow-hidden bg-[url('/images/competition-banner-section-mobile.png')] md:bg-[url('/images/competition-banner-section.png')] bg-cover bg-top bg-fixed lg:bg-scroll py-4 lg:p-0">
      <Container className="grid py-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 justify-items-center mx-auto max-w-[1312px] w-full">
        {/* Loading: show 3 skeletons */}
        {loading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <div className="md:col-span-2 xl:col-span-1 w-full max-w-[419px] mx-auto">
              <SkeletonCard />
            </div>
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
            {items.slice(0, 3).map((comp, idx) => {
              const card = (
                <DailyQuizSection
                  color="primary"
                  buttonHoverColor="primary-dark"
                  border="primary-light"
                  competition={comp}
                  onJoin={(c) => console.log("join", c)}
                />

              );

              // keep your special layout for the 3rd card
              if (idx === 2) {
                return (
                  <div
                    key={comp?.id ?? idx}
                    className="md:col-span-2 xl:col-span-1 w-full max-w-[419px] mx-auto"
                  >
                    {card}
                  </div>
                );
              }

              return card;
            })}
          </>
        )}
      </Container>
    </div>
  );
};

export default CompetitionsSection;
