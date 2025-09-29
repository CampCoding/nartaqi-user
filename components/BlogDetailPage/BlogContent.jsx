import {
  BlogMessage,
  BlogShare,
  BlogEye,
  BlogCalender,
} from "./../../public/svgs";

export const BlogContent = () => {
  const articleData = {
    title: "مستقبل التعلم عبر الإنترنت: الاتجاهات والتقنيات",
    date: "15 مارس 2024",
    views: "1,2.4 ألف مشاهدة",
    comments: "12 تعليق",
  };
  const arabicText = `تتطور منظومة التعليم بسرعة متزايدة، مع تزايد دور التكنولوجيا بشكل متزايد في كيفية تعلمنا وتدريسنا. لقد تسارع هذا التحول بواسطة الأحداث العالمية الأخيرة، مما دفع المؤسسات التعليمية إلى التكيف والابتكار.أصبحت منصات التعلم الرقمي أكثر تطورا، حيث تدمج الذكاء الاصطناعي وتعلم الآلة لتوفير تجارب تعلم شخصية. تسمح هذه التطورات بمسارات تعلم متكيفة تتكيف مع وتيرة كل طالب وأسلوب تعلمه.تقنيات الواقع الافتراضي والواقع المعزز تخلق بيئات تعليمية غامرة كانت غير ممكنة في السابق. يمكن للطلاب الآن القيام برحلات افتراضية إلى المواقع التاريخية، واستكشاف الهياكل الجزيئية المعقدة ثلاثية الأبعاد، أو ممارسة الإجراءات الجراحية في بيئة خالية من المخاطر.تتطور منظومة التعليم بسرعة متزايدة، مع تزايد دور التكنولوجيا بشكل متزايد في كيفية تعلمنا وتدريسنا. لقد تسارع هذا التحول بواسطة الأحداث العالمية الأخيرة، مما دفع المؤسسات التعليمية إلى التكيف والابتكار.أصبحت منصات التعلم الرقمي أكثر تطورا، حيث تدمج الذكاء الاصطناعي وتعلم الآلة لتوفير تجارب تعلم شخصية. تسمح هذه التطورات بمسارات تعلم متكيفة تتكيف مع وتيرة كل طالب وأسلوب تعلمه.تقنيات الواقع الافتراضي والواقع المعزز تخلق بيئات تعليمية غامرة كانت غير ممكنة في السابق. يمكن للطلاب الآن القيام برحلات افتراضية إلى المواقع التاريخية، واستكشاف الهياكل الجزيئية المعقدة ثلاثية الأبعاد، أو ممارسة الإجراءات الجراحية في بيئة خالية من المخاطر.تتطور منظومة التعليم بسرعة متزايدة، مع تزايد دور التكنولوجيا بشكل متزايد في كيفية تعلمنا وتدريسنا. لقد تسارع هذا التحول بواسطة الأحداث العالمية الأخيرة، مما دفع المؤسسات التعليمية إلى التكيف والابتكار.أصبحت منصات التعلم الرقمي أكثر تطورا، حيث تدمج الذكاء الاصطناعي وتعلم الآلة لتوفير تجارب تعلم شخصية. تسمح هذه التطورات بمسارات تعلم متكيفة تتكيف مع وتيرة كل طالب وأسلوب تعلمه.`;

  const breakText = `تقنيات الواقع الافتراضي والواقع المعزز تخلق بيئات تعليمية غامرة كانت غير ممكنة في السابق. يمكن للطلاب الآن القيام برحلات افتراضية إلى المواقع التاريخية، واستكشاف الهياكل الجزيئية المعقدة ثلاثية الأبعاد، أو ممارسة الإجراءات الجراحية في بيئة خالية من المخاطر.`;

  return (
    <main>
      <article className="flex flex-col  items-start gap-4 relative  mb-[56px]">
        <header className="flex items-center justify-start relative     self-stretch w-full flex-[0_0_auto]">
          <h1 className="self-stretch  text-bold text-primary text-[32px] leading-10 relative ">
            {articleData.title}
          </h1>
        </header>

        <div
          className="justify-end gap-6  flex  items-center relative flex-[0_0_auto]"
          role="toolbar"
          aria-label="Article actions and metadata"
        >
          <time
            className="flex  items-center relative flex-[0_0_auto]"
            dateTime="2024-03-15"
          >
            <div className=" relative w-6 h-6 mx-[8px] " aria-hidden="true">
              <BlogCalender className="stroke-primary" />
            </div>
            <span className="w-[100px]   text-text-alt text-base leading-5 relative ">
              {articleData.date}
            </span>
          </time>
          <div className="h-5 gap-2 pl-0  py-0  flex  items-center relative flex-[0_0_auto]">
            <div
              className="mt-[-2.00px] mb-[-2.00px] relative w-6 h-6 mx-[8px] "
              aria-hidden="true"
            >
              <BlogEye className="stroke-primary" />
            </div>
            <span className="relative self-stretch w-fit  text-text-alt text-base text-left leading-5 whitespace-nowrap ">
              {articleData.views}
            </span>
          </div>
          <div className="h-5 gap-2 pl-0  py-0  flex  items-center relative flex-[0_0_auto]">
            <div
              className="mt-[-2.00px] mb-[-2.00px] relative w-6 h-6 mx-[8px] "
              aria-hidden="true"
            >
              <BlogMessage className="stroke-primary" />
            </div>
            <span className="relative self-stretch w-fit  text-text-alt text-base text-left leading-5 whitespace-nowrap ">
              {articleData.comments}
            </span>
          </div>
          <button
            className="flex  items-center relative flex-[0_0_auto]"
            aria-label="مشاركة المقال"
          >
            <div
              className="relative w-6 h-6 mx-[8px] overflow-hidden  "
              aria-hidden="true"
            >
              <BlogShare className="stroke-primary" />
            </div>
            <span className="w-[38px]   text-text-alt text-base leading-5 relative ">
              شارك
            </span>
          </button>
        </div>
      </article>
      <main
        className="relative w-full h-[523px] rounded-[30px]  "
        style={{
          backgroundImage: `url('/images//FRAME (10).png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        role="img"
        aria-label="Frame background image"
      />
      <main className="w-full h-[1064px] mt-[24px]">
        <article
          className="  text-[#2d2d2d] text-text text-[23px] leading-[56px] "
          lang="ar"
          dir="rtl"
        >
          {arabicText}
          <br />
          {breakText}
        </article>
      </main>
    </main>
  );
};
