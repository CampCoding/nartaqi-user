import React from "react";
import { BlogCard } from "../ui/Cards/BlogCard";
import Link from "next/link";
import Container from "../ui/Container";

const NewestBlogs = () => {
  return (
    <div className="bg-gradient-to-b from-[#D5E9E7] to-white">
    <Container className=" flex flex-col mx-auto  mb-[102px] pt-8">
      <div className="mx-auto inline-flex items-center justify-center gap-2.5 px-10 md:px-14  py-3 md:py-4 relative bg-primary-bg rounded-[25px]">
        <div className="relative flex items-center justify-center w-fit mt-[-1.00px]  font-bold text-primary  text-xl md:text-3xl tracking-[0] leading-[normal] ">
          أحدث المقالات
        </div>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-2  lg:grid-cols-3  gap-[26px] mt-[32px]">
        {[
          "/images/FRAME (1).png",
          "/images/FRAME (2).png",
          "/images/FRAME.png",
        ].map((item, index) => (
          <Link href={"/blogs/blog-details/123"}>
            <BlogCard freeWidth key={index} image={item} />
          </Link>
        ))}
      </div>

      <Link href={"/blogs"}
        className=" !border-2 border-black  focus:ring-primary-dark group  hover:bg-primary-dark  mt-8 md:mt-[48px] w-fit mx-auto box-border inline-flex items-center justify-center gap-2  px-10 py-3 md:px-20 md:py-6 relative bg-foundation-bluedarker rounded-[30px] cursor-pointer transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-foundation-bluedarker focus:ring-offset-2  "
        type="button"
        aria-label="أظهر المزيد"
      >
        <div className="  relative flex text-bold items-center justify-center w-fit [fonts-family:'Cairo-Bssold',Helvetica] text-primary-dark group-hover:text-white  text-base text-center leading-[normal] ">
          أظهر المزيد
        </div>
      </Link>
    </Container>

    </div>
  );
};

export default NewestBlogs;
