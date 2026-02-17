"use client";

import React, { useEffect, useState } from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import { SendUsMessageForm } from "./../../components/ui/SendUsMessageForm";
import Container from "../../components/ui/Container";
import useSupportInfo from "../../components/shared/Hooks/getSupportInfo";
import axios from "axios";

const ComplaintsAndSuggestions = () => {
  const { whatsappHref, emailText, phoneText, whatsappNumber, telHref } =
    useSupportInfo();

  const [complaintsData, setComplaintsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/user/complaints/getUserComplaints`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.status === "success") {
        // Filter only complaints type and not hidden
        const complaints = response.data.message.filter(
          (item) => item.type === "complaints" && item.hidden === 0
        );
        setComplaintsData(complaints);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to extract text from HTML
  const extractTextFromHTML = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  // Helper function to check if this is the last item with contact info
  const isContactInfoSection = (question) => {
    return question?.includes("آلية التعامل مع المقترحات");
  };

  // Render complaint content based on whether it has HTML or plain text
  const renderComplaintContent = (complaint) => {
    // Check if the answer contains HTML tags
    const hasHTML = /<[^>]+>/.test(complaint.answer);

    if (hasHTML) {
      // Clean the HTML and display it
      return (
        <div
          className="self-stretch text-right text-text-alt leading-loose text-base md:text-lg font-semibold whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: complaint.answer }}
          style={{ direction: "rtl" }}
        />
      );
    } else {
      // Display as plain text
      return (
        <p className="self-stretch text-right text-text-alt leading-loose text-base md:text-lg font-semibold whitespace-pre-line">
          {complaint.answer}
        </p>
      );
    }
  };

  return (
    <div>
      <PagesBanner
        variant="normal"
        title={"الشكاوي والمقترحات"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "الشكاوي والمقترحات",
            link: "#",
          },
        ]}
        image={"/images/complaints-and-suggestions.png"}
      />

      <Container className="my-[48px]" dir="rtl">
        <div className="text-right text-secondary font-bold text-2xl md:text-3xl mb-8 md:mb-[48px]">
          الشكاوى والمقترحات
        </div>

        <div className="flex flex-col gap-6 md:gap-[32px] mb-8 md:mb-[48px] px-4 md:px-0">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {complaintsData.map((complaint, index) => (
                <section
                  key={complaint.id}
                  className="self-stretch inline-flex flex-col items-end gap-3 md:gap-4"
                >
                  <div
                    className="self-stretch text-right text-text text-xl md:text-2xl font-bold"
                    dangerouslySetInnerHTML={{ __html: complaint.question }}
                  />

                  {/* Check if this is the contact info section */}
                  {isContactInfoSection(complaint.question) ? (
                    <div className="self-stretch text-right">
                      {renderComplaintContent(complaint)}

                      {/* Add contact info after the content */}
                      <div className="mt-4 space-y-2 text-base md:text-lg">
                        <p className="text-text-alt font-semibold">
                          قنوات التواصل بالمركز:
                        </p>
                        <div className="font-semibold text-text-alt">
                          الواتس اب:{" "}
                          <a
                            dir="ltr"
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary font-bold underline underline-offset-2"
                          >
                            {whatsappNumber}
                          </a>
                        </div>
                        <div className="font-semibold text-text-alt">
                          البريد الالكتروني:{" "}
                          <a
                            dir="ltr"
                            href={`mailto:${emailText}`}
                            className="text-primary font-bold underline underline-offset-2 break-all"
                          >
                            {emailText}
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    renderComplaintContent(complaint)
                  )}
                </section>
              ))}

              {/* Fallback if no data */}
              {complaintsData.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-xl text-gray-500">
                    لا توجد بيانات متاحة حالياً
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <SendUsMessageForm />
      </Container>

      {/* Custom styles for HTML content */}
      <style jsx global>{`
        /* Styles for rendered HTML content */
        .self-stretch a {
          color: #3b82f6;
          text-decoration: underline;
          font-weight: bold;
        }

        .self-stretch a:hover {
          color: #2563eb;
        }

        /* Ensure RTL for all content */
        section div[style*="direction"] {
          direction: rtl !important;
          text-align: right !important;
        }

        /* Style paragraphs inside HTML content */
        section p {
          direction: rtl;
          text-align: right;
          margin-bottom: 0.5rem;
        }

        /* Remove excessive inline styles from API HTML */
        section [style*="--tw"] {
          font-family: inherit !important;
          color: inherit !important;
        }
      `}</style>
    </div>
  );
};

export default ComplaintsAndSuggestions;
