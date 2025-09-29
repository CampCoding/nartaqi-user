import React from "react";
import CourseTitle from "../../../components/CourseDetailsPage/CourseTitle";
import CourseDetailsCard from "../../../components/CourseDetailsPage/CourseDetailsCard";
import CourseDetailsContent from "../../../components/CourseDetailsPage/CourseDetailsContent";

const CoursePreviewPage = () => {
  return (
    <div className="container mx-auto px-[64px]">
      <CourseTitle />
      <div className="flex items-start justify-between gap-8">
        <div className="">
          <div className=" flex-1 h-[455px] relative bg-black/20 rounded-[30px] overflow-hidden">
            <img
              src="/images/Frame 1000004932.png"
              className="w-full h-full object-cover object-top"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent pointer-events-none z-10"></div>
            <div className="absolute z-20 cursor-pointer hover:scale-110 trnasition-all duration-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 p-5 bg-secondary rounded-[100px] outline outline-8 outline-offset-[-8px] outline-white inline-flex justify-center items-center gap-2.5 overflow-hidden">
                <div className="w-12 h-12 relative">
                  <svg
                    width={48}
                    height={48}
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5292 40.657C11.9864 41.595 10 40.4985 10 38.7084L10 10.2915C10 8.50162 11.9864 7.40494 13.5292 8.343L36.8981 22.5514C38.3673 23.4448 38.3673 25.5551 36.8981 26.4486L13.5292 40.657Z"
                      stroke="white"
                      strokeWidth={3}
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className=" my-8 mb-[139px]">
            <CourseDetailsContent />
          </div>
        </div>
        <VideosList />
      </div>
    </div>
  );
};

export default CoursePreviewPage;

const VideosList = () => (
  <div className="min-w-[476px]  flex flex-col gap-[32px] pt-10 pb-5 px-4 relative bg-white rounded-[30px] outline outline-[3px] outline-offset-[-3px] outline-gray-300 overflow-hidden">
    <div className=" inline-flex flex-col justify-start items-start gap-2">
      <div className="self-stretch  text-text text-3xl font-bold ">
        إتقان التدريس الفعال
      </div>
      <div className="inline-flex justify-start items-center gap-2">
        <div className="text-center justify-center text-primary text-base font-bold ">
          1 من 5
        </div>
        <div className="text-center justify-center text-primary text-base font-bold ">
          {" "}
          جون سميث
        </div>
      </div>
    </div>
    <div className="  inline-flex flex-col justify-start items-start gap-4">
      <div className="self-stretch inline-flex justify-between items-center gap-[9px]">
        <div className="text-right justify-center text-secondary text-2xl font-medium ">
          1
        </div>
        <div className=" flex justify-start items-start gap-2">
          <div
            className="w-[174px] h-20 relative rounded-[10px] overflow-hidden"
            style={{
              backgroundImage: `url('/images/Frame 1000004932.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="px-2.5 left-[8px] top-[55px] absolute bg-zinc-800/80 rounded-[10px] inline-flex justify-center items-center gap-2.5">
              <div className="text-right justify-center text-white text-sm font-medium ">
                1:25
              </div>
            </div>
          </div>
          <div className="flex-1 text-right justify-center text-text text-sm font-medium ">
            أساسيات ومبادئ التدريس الفعّال لتحقيق نتائج مميزة داخل الصف
          </div>
        </div>
      </div>
      <div className="self-stretch inline-flex justify-between items-center gap-[9px]">
        <div className="text-right justify-center text-secondary text-2xl font-medium ">
          2
        </div>
        <div className=" flex justify-start items-start gap-2">
          <div
            className="w-[174px] h-20 relative rounded-[10px] overflow-hidden"
            style={{
              backgroundImage: `url('/images/Frame 1000004932.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="px-2.5 left-[8px] top-[55px] absolute bg-zinc-800/80 rounded-[10px] inline-flex justify-center items-center gap-2.5">
              <div className="text-right justify-center text-white text-sm font-medium ">
                1:25
              </div>
            </div>
          </div>
          <div className="flex-1 text-right justify-center text-text text-sm font-medium ">
            أساسيات ومبادئ التدريس الفعّال لتحقيق نتائج مميزة داخل الصف
          </div>
        </div>
      </div>
      <div className="self-stretch inline-flex justify-between items-center gap-[9px]">
        <div className="text-right justify-center text-secondary text-2xl font-medium ">
          3
        </div>
        <div className=" flex justify-start items-start gap-2">
          <div
            className="w-[174px] h-20 relative rounded-[10px] overflow-hidden"
            style={{
              backgroundImage: `url('/images/Frame 1000004932.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="px-2.5 left-[8px] top-[55px] absolute bg-zinc-800/80 rounded-[10px] inline-flex justify-center items-center gap-2.5">
              <div className="text-right justify-center text-white text-sm font-medium ">
                1:25
              </div>
            </div>
          </div>
          <div className="flex-1 text-right justify-center text-text text-sm font-medium ">
            أساسيات ومبادئ التدريس الفعّال لتحقيق نتائج مميزة داخل الصف
          </div>
        </div>
      </div>
      <div className="self-stretch inline-flex justify-between items-center gap-[9px]">
        <div className="text-right justify-center text-secondary text-2xl font-medium ">
          4
        </div>
        <div className=" flex justify-start items-start gap-2">
          <div
            className="w-[174px] h-20 relative rounded-[10px] overflow-hidden"
            style={{
              backgroundImage: `url('/images/Frame 1000004932.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="px-2.5 left-[8px] top-[55px] absolute bg-zinc-800/80 rounded-[10px] inline-flex justify-center items-center gap-2.5">
              <div className="text-right justify-center text-white text-sm font-medium ">
                1:25
              </div>
            </div>
          </div>
          <div className="flex-1 text-right justify-center text-text text-sm font-medium ">
            أساسيات ومبادئ التدريس الفعّال لتحقيق نتائج مميزة داخل الصف
          </div>
        </div>
      </div>
      <div className="self-stretch inline-flex justify-between items-center gap-[9px]">
        <div className="text-right justify-center text-secondary text-2xl font-medium ">
          5
        </div>
        <div className=" flex justify-start items-start gap-2">
          <div
            className="w-[174px] h-20 relative rounded-[10px] overflow-hidden"
            style={{
              backgroundImage: `url('/images/Frame 1000004932.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="px-2.5 left-[8px] top-[55px] absolute bg-zinc-800/80 rounded-[10px] inline-flex justify-center items-center gap-2.5">
              <div className="text-right justify-center text-white text-sm font-medium ">
                1:25
              </div>
            </div>
          </div>
          <div className="flex-1 text-right justify-center text-text text-sm font-medium ">
            أساسيات ومبادئ التدريس الفعّال لتحقيق نتائج مميزة داخل الصف
          </div>
        </div>
      </div>
    </div>
  </div>
);
