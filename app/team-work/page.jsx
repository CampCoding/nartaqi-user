import React from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import WorkMemperCard from "./../../components/ui/Cards/WorkMemperCard";
import Item from "antd/es/list/Item";

const teamSections = [
  {
    title: "إداريين",
    color: "#F97316",
    members: [
      {
        name: "سارة عبد الله حسن",
        email: "ahmed.farhan@platform.com",
        role: "مديرة التسجيل",
        image: "/images/Image-124.png",
      },
      {
        name: "أحمد الفرحان",
        email: "ahmed.farhan@platform.com",
        role: "مدير المنصة",
        image: "/images/Image-12422.png",
      },
    ],
  },
  {
    title: "الفنيين",
    color: "#3B82F6",
    members: [
      {
        name: "سارة عبد الله حسن",
        email: "ahmed.farhan@platform.com",
        role: "محور واجهات",
        image: "/images/Image-124.png",
      },
      {
        name: "سارة عبد الله حسن",
        email: "ahmed.farhan@platform.com",
        role: "محور واجهات",
        image: "/images/Image-124.png",
      },
      {
        name: "خالد عبد الرحمن يوسف",
        email: "ahmed.farhan@platform.com",
        role: "محور واجهات",
        image: "/images/Image-12422.png",
      },
      {
        name: "خالد عبد الرحمن يوسف",
        email: "ahmed.farhan@platform.com",
        role: "محور واجهات",
        image: "/images/Image-12422.png",
      },
    ],
  },
  {
    title: "الدعم الفني",
    color: "#572808",
    members: [
      {
        name: "أحمد الفرحان",
        email: "ahmed.farhan@platform.com",
        role: "مسؤول دعم فني",
        image: "/images/Image-12422.png",
      },
      {
        name: "سارة عبد الله حسن",
        email: "ahmed.farhan@platform.com",
        role: "اختصاصية دعم فني",
        image: "/images/Image-124.png",
      },
      {
        name: "أحمد الفرحان",
        email: "ahmed.farhan@platform.com",
        role: "مسؤول دعم فني",
        image: "/images/Image-12422.png",
      },
    ],
  },
  {
    title: "إدخال البيانات",
    color: "#193767",
    members: [
      {
        name: "أحمد الفرحان",
        email: "ahmed.farhan@platform.com",
        role: "مدخل بيانات",
        image: "/images/Image-12422.png",
      },
      {
        name: "سارة عبد الله حسن",
        email: "ahmed.farhan@platform.com",
        role: "مدخل بيانات",
        image: "/images/Image-124.png",
      },
      {
        name: "سارة عبد الله حسن",
        email: "ahmed.farhan@platform.com",
        role: "مدخل بيانات",
        image: "/images/Image-124.png",
      },
      {
        name: "أحمد الفرحان",
        email: "ahmed.farhan@platform.com",
        role: "مدخل بيانات",
        image: "/images/Image-12422.png",
      },
      {
        name: "أحمد الفرحان",
        email: "ahmed.farhan@platform.com",
        role: "مدخل بيانات",
        image: "/images/Image-12422.png",
      },
    ],
  },
];

const TeamWorkPage = () => {
  return (
    <div className="">
      <PagesBanner
        variant="normal"
        image={"/images/team-work.png"}
        title={"فريق العمل"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "فريق العمل ",
            link: "/",
          },
        ]}
      />
      <div className="container mx-auto px-[64px]  mt-[48px] mb-[100px] flex flex-col gap-[48px]">

      {teamSections.map((item, index) => {
        return <Section data={item} key={index} />;
      })}
      </div>
    </div>
  );
};

export default TeamWorkPage;

const Section = ({ data }) => {
  return (
    <div className=" flex items-center justify-center flex-col gap-[32px]     ">
      <div
        className={` px-[80px] py-4  rounded-[25px] flex justify-center items-center gap-2.5`}
        style={{
          background: data.color ?? "#F97316",
        }}
      >
        <div className="justify-center text-white text-[24px] font-bold  leading-[48px]">
          {data.title}
        </div>
      </div>
      <div className="flex justify-center  gap-[40px] flex-wrap">
        {data?.members?.map((item, index) => {
          return <WorkMemperCard data={item} color={data.color} key={index} />;
        })}
      </div>
    </div>
  );
};
