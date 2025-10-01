import Link from "next/link";
import React, { useEffect } from "react";

export const FixedResultHero = ({ open, setOpen }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  if (!open) return null;

  return (
    <Link
      href={"/exam-details/123"}
      onClick={() => {
        setOpen(false);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <main className="bg-white w-full overflow-hidden rounded-[50px] max-w-[1000px] min-h-[439px] relative">
        <section className="flex flex-col w-[374px] h-[439px] items-center gap-[54px] px-6 py-8 absolute top-[calc(50.00%_-_220px)] left-[calc(50.00%_+_78px)] bg-white">
          <header className="flex flex-col w-[315px] items-center gap-4 relative flex-[0_0_auto]">
            <h1 className="self-stretch mt-[-1.00px] font-bold text-foundation-orangedarker text-[56px] [direction:rtl] relative flex items-center justify-center tracking-[0] leading-[normal]">
              نتيجة الأختبار
            </h1>

            <div
              className="self-stretch font-bold text-secondary text-[56px] text-center relative flex items-center justify-center tracking-[0] leading-[normal]"
              role="status"
              aria-label="Test score: 85 percent"
            >
              %85
            </div>
          </header>

          <p className="w-fit  font-medium text-variable-collection-text text-2xl [direction:rtl] relative flex items-center justify-center tracking-[0] leading-[normal]">
            تهانينا لقد نجحت في الاختبار
          </p>
        </section>

        <img
          className="absolute top-0 left-0 w-[578px] h-[438px]"
          alt="Congratulations illustration with graduation cap and educational elements"
          src={"/images/good-exam-result.png"}
        />
      </main>
    </Link>
  );
};
