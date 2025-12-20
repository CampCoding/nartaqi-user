import React from "react";

const CourseTermsAndConditions = ({ courseData }) => {
  const { terms } = courseData;

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {/* Header Section */}
      <div className="self-stretch inline-flex flex-col justify-start items-start gap-2">
        <div className="self-stretch text-right justify-center text-primary text-xl md:text-2xl font-bold">
          الشروط والأحكام
        </div>
        <div className="self-stretch text-right justify-center leading-loose text-black text-base md:text-xl font-medium">
          مرحبًا بك في منصتنا التعليمية. برجاء قراءة هذه الشروط والأحكام بعناية
          قبل استخدام الموقع أو التسجيل في أي دورة، حيث إن دخولك أو استخدامك
          للمنصة يعني موافقتك الكاملة على جميع البنود التالية
        </div>
      </div>

      {/* Terms List */}
      {terms && terms.length > 0 ? (
        <ul className="self-stretch flex flex-col justify-start items-start gap-6 lg:gap-8 list-disc pr-5">
          {terms.map((term) => (
            <li
              key={term.id}
              className="flex flex-col justify-start items-start gap-1 w-full"
            >
              <h3 className="text-right text-text text-lg md:text-xl font-bold">
                {term.title || "غير محدد"}
              </h3>

              {/* عرض النقاط */}
              {term.points && term.points.length > 0 ? (
                <div className="w-full text-right text-stone-600 text-sm md:text-base font-medium">
                  {term.points.map((point, index) => (
                    <React.Fragment key={index}>
                      {point}
                      {index < term.points.length - 1 && (
                        <>
                          <br />
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <p className="w-full text-right text-stone-600 text-sm md:text-base font-medium">
                  لا توجد تفاصيل متاحة
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        // Empty state
        <div className="text-center py-8 text-text-alt">
          لا توجد شروط وأحكام متاحة حالياً
        </div>
      )}
    </div>
  );
};

export default CourseTermsAndConditions;
