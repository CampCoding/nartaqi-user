import React from "react";

const CoursesFilters = () => {
  return (
    <div>
      <div className="container mx-auto px-[64px] inline-flex justify-start items-start gap-6">
        <div className="flex justify-start items-center gap-4">
          <div className="w-72 p-6 bg-zinc-800 rounded-[20px] flex justify-start items-center gap-2.5">
            <input
              placeholder="ابحث باسم الدوره"
              className=" placeholder:text-white justify-center text-white text-base whitespace-nowrap font-semibold "
            />
          </div>

          <div className="w-[200px] p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center">
            <div className="justify-center text-white text-base whitespace-nowrap font-semibold ">
              اختر القسم
            </div>
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-2 h-1.5 left-[7.76px]  absolute ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15L7.757 10.758L9.172 9.34399L12 12.172L14.828 9.34399L16.243 10.758L12 15Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-[200px] p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center">
            <div className="justify-center text-white text-base whitespace-nowrap font-semibold ">
              عرض الأحدث
            </div>
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-2 h-1.5 left-[7.76px]  absolute ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15L7.757 10.758L9.172 9.34399L12 12.172L14.828 9.34399L16.243 10.758L12 15Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-[200px] p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center">
            <div className="justify-center text-white text-base whitespace-nowrap font-semibold ">
              تقيمم
            </div>
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-2 h-1.5 left-[7.76px]  absolute ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15L7.757 10.758L9.172 9.34399L12 12.172L14.828 9.34399L16.243 10.758L12 15Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-[200px] p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center">
            <div className="justify-center text-white text-base whitespace-nowrap font-semibold ">
              اختر النوع{" "}
            </div>
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-2 h-1.5 left-[7.76px]  absolute ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15L7.757 10.758L9.172 9.34399L12 12.172L14.828 9.34399L16.243 10.758L12 15Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 self-stretch px-8 py-6 bg-secondary cursor-pointer rounded-[20px] inline-flex flex-col justify-center items-center gap-2.5">
          <div className="justify-center text-white text-base whitespace-nowrap font-semibold ">
            بحث
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesFilters;
