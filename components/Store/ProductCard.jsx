import React, { useState } from "react";

export const ProductCard = ({ data }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  return (
    <article
      className="flex flex-col w-[300px] h-[426px] items-center gap-8 pt-0 pb-8 px-0 relative bg-white rounded-[30px] border-[3px] border-solid border-[#d7e6ff]"
      role="article"
      aria-label="مصنف الكتابة العربية - منتج"
    >
      <div
        className="relative self-stretch w-full h-[222px] rounded-[30px_30px_0px_0px]  bg-cover bg-[50%_50%]"
        role="img"
        aria-label="صورة مصنف الكتابة العربية"
        style={{
          backgroundImage: `url('/images/${data}')`,
        }}
      />
      <div className="flex flex-col items-start justify-between px-4 py-0 relative flex-1 self-stretch w-full grow">
        <header className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <h1 className="relative w-fit text-text mt-[-1.00px]  text-text text-2xl text-left leading-6 whitespace-nowrap ">
            مصنف الكتابة العربية
          </h1>
          <p className="self-stretch  text-text-alt text-base leading-5 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] relative ">
            دليل خطوة بخطوة لإتقان خط اليد العربية
          </p>
        </header>
        <footer className="flex h-10 items-center justify-between relative self-stretch w-full">
          <div
            className="inline-flex h-6 items-center relative flex-[0_0_auto]"
            role="text"
            aria-label="السعر: 24.99 ريال سعودي"
          >
            <span className="self-stretch w-fit text-text  text-text text-base text-left leading-6 whitespace-nowrap relative ">
              24.99 ر .س
            </span>
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 px-4 py-2 relative flex-[0_0_auto] bg-primary rounded-[10px] hover:bg-blue-600 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200 cursor-pointer"
            onClick={handleAddToCart}
            aria-label="إضافة مصنف الكتابة العربية إلى السلة"
            type="button"
          >
            <span className="w-fit  text-neutral-50 text-sm text-center leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] relative ">
              {isAddedToCart ? "تمت الإضافة!" : "اضف الي السلة"}
            </span>
          </button>
        </footer>
      </div>
    </article>
  );
};
