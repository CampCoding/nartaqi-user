
import { TopServices } from "../components/Home/TopServices";
import { HeaderHero } from "../components/Home/Hero";
import { AboutUs } from "../components/Home/AboutUs";
import CoursesCategoriesLable from "../components/ui/CoursesCategoriesLable";
import CoursesCategoryCard from "../components/ui/Cards/CoursesCategoryCard";
import HomeSection1 from "../components/Home/HomeSection1";
import HomeSection2 from "../components/Home/HomeSection2";
import HomeSection3 from './../components/Home/HomeSection3';
import CourseCard from "../components/ui/Cards/CourseCard";
import HomeSection4Courses from "../components/Home/HomeSection4Courses";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import WhatOurXSay from "../components/Home/WhatOurStudentsSay";
import HonorRoll from "../components/Home/HonorRoll";
import FirstsCard from "../components/ui/Cards/FirstsCard";
import NewestBlogs from "../components/Home/NewestBlogs";

export default function Home() {
  return (
    <>
      <TopServices />
      <HeaderHero />
      <AboutUs />
      <CoursesCategoriesLable />
      {/* Is for courses categories */}
      <HomeSection1 />
      <HomeSection2 />
      <HomeSection3 />
      <HomeSection4Courses />
      <WhyChooseUs />
      <WhatOurXSay/>
      <HonorRoll />
      <NewestBlogs />


      {/* <CourseCard /> */}
    </>
  );
}


