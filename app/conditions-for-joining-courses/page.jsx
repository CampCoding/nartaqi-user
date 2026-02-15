"use client";

import React, { useState, useEffect } from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import { QuestionAccordion } from "../faqs/page";
import Container from "../../components/ui/Container";
import axios from "axios";

const JoiningCoursesConditions = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseRequirements();
  }, []);

  const fetchCourseRequirements = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/user/settings/getCourseRequirements`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.status === "success") {
        // Transform the data to match the expected format
        const transformedData = response.data.message.map((item) => ({
          id: item.id,
          question: item.question,
          answer: item.answer || "", // Handle null/empty answers
        }));
        setFaqs(transformedData);
      } else {
        console.error("Failed to fetch course requirements");
        // Optionally set default/fallback data
        setFaqs([]);
      }
    } catch (error) {
      console.error("Error fetching course requirements:", error);
      // Optionally set default/fallback data
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PagesBanner
        variant="normal"
        title={"شروط الالتحاق بالدورات"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "شروط الالتحاق بالدورات",
            link: "#",
          },
        ]}
        image={"/images/coursesJoingingConditions.png"}
      />

      <Container className="mt-[32px] mb-[100px]">
        <div className="mt-8 flex flex-col gap-6">
          {loading ? (
            // Loading state
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            </div>
          ) : faqs.length > 0 ? (
            // Render FAQs
            faqs.map((item) => <QuestionAccordion key={item.id} item={item} />)
          ) : (
            // Empty state
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">لا توجد شروط متاحة حالياً</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default JoiningCoursesConditions;
