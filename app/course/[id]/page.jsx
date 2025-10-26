"use client";
import React, { Suspense } from "react";
import CourseTitle from "../../../components/CourseDetailsPage/CourseTitle";
import CourseDetailsCard from "../../../components/CourseDetailsPage/CourseDetailsCard";
import CourseDetailsContent from "../../../components/CourseDetailsPage/CourseDetailsContent";
import NotReg_courseDetails from "./contents/NotReg_courseDetails";
import Reg_courseDetails from "./contents/Reg_courseDetails";
import { useSearchParams } from "next/navigation";
import ShareBottomDrawer from "../../../components/shared/ShareBottomDrawer";


const CourseDetailsPage = () => {
  const searchParams = useSearchParams();
  const reg = searchParams.get("reg");
  const isDone = searchParams.get("done");
  console.log("isDone", isDone);
  return (
    <Suspense fallback="Loading...">

    <div className="">
      <CourseTitle />
      {reg == "true" ? (
        <Reg_courseDetails isDone={isDone} />
      ) : (
        <NotReg_courseDetails />
      )}
    </div>
      </Suspense>
  );
};

export default CourseDetailsPage;
