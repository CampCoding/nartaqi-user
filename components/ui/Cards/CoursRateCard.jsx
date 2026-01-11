import { EmptyRatingStar, FullStarIcon } from "../../../public/svgs";

export const CoursRateCard = ({ rating }) => {
  // Generate stars array based on rate
  const renderStars = (rate) => {
    const stars = [];
    const fullStars = Math.floor(rate);

    for (let i = 0; i < 5; i++) {
      stars.push(i < fullStars);
    }

    return stars;
  };

  const stars = renderStars(rating.rate || 0);

  // تحديد نوع المستخدم بناءً على الجنس
  const getUserType = (gender) => {
    if (gender === "male") return "طالب";
    if (gender === "female") return "طالبة";
    return "طالب";
  };

  return (
    <div className="flex flex-col   w-full items-start gap-6 px-6 sm:px-8 md:px-12 py-6 sm:py-8 relative bg-white rounded-[30px] border-[3px] border-solid border-variable-collection-stroke">
      <div className="flex items-start justify-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div
          className="relative w-12 h-12 rounded-3xl bg-cover bg-center bg-no-repeat flex-shrink-0"
          style={{
            backgroundImage: `url(${
              rating.student?.image_url || "/images/default-avatar.png"
            })`,
          }}
        />
        <div className="flex flex-col items-start gap-1 relative flex-1 grow">
          <div className="relative self-stretch font-bold mt-[-1.00px] text-text-duplicate text-base leading-6">
            {rating.student?.name || "غير محدد"}
          </div>
          <div className="text-sm leading-5 relative self-stretch text-text-alt">
            {getUserType(rating.student?.gender)}
          </div>
        </div>
      </div>

      <div
        dir="ltr"
        className="relative self-stretch w-full flex items-center justify-end gap-1"
      >
        {stars.map((isFilled, index) => (
          <div key={index}>
            {isFilled ? <FullStarIcon /> : <EmptyRatingStar />}
          </div>
        ))}
      </div>

      <p className="text-base leading-6 relative self-stretch text-text-alt">
        {rating.comment || "لا يوجد تعليق"}
      </p>
    </div>
  );
};
