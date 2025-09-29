import React from "react";
import CourseTitle from "../../../components/CourseDetailsPage/CourseTitle";
import CourseDetailsCard from "../../../components/CourseDetailsPage/CourseDetailsCard";
import CourseDetailsContent from "../../../components/CourseDetailsPage/CourseDetailsContent";
import NotReg_courseDetails from "./contents/NotReg_courseDetails";
import Reg_courseDetails from './contents/Reg_courseDetails';

const CourseDetailsPage = () => {
  return (
    <div className="">
      <CourseTitle />
      <Reg_courseDetails />
      <NotReg_courseDetails />
    </div>
  );
};

export default CourseDetailsPage;
