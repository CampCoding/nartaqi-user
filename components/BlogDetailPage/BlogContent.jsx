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
    <main className=" max-w-7xl mx-auto">
      {/* Article Header */}
      <article className="flex flex-col items-start gap-3 sm:gap-4 relative mb-8 sm:mb-10 md:mb-14">
        <header className="flex items-center justify-start relative self-stretch w-full">
          <h1 className="text-bold text-primary text-xl leading-7 sm:text-2xl sm:leading-8 md:text-[28px] md:leading-9 lg:text-[32px] lg:leading-10 xl:text-4xl xl:leading-[44px]">
            {articleData.title}
          </h1>
        </header>

        {/* Metadata Toolbar */}
        <div
          className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6"
          role="toolbar"
          aria-label="Article actions and metadata"
        >
          {/* Date */}
          <time
            className="flex items-center gap-1.5 sm:gap-2"
            dateTime="2024-03-15"
          >
            <div
              className="relative w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6"
              aria-hidden="true"
            >
              <BlogCalender className="stroke-primary w-full h-full" />
            </div>
            <span className="text-text-alt text-sm sm:text-[15px] md:text-base leading-5 whitespace-nowrap">
              {articleData.date}
            </span>
          </time>

          {/* Views */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className="relative w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6"
              aria-hidden="true"
            >
              <BlogEye className="stroke-primary w-full h-full" />
            </div>
            <span className="text-text-alt text-sm sm:text-[15px] md:text-base leading-5 whitespace-nowrap">
              {articleData.views}
            </span>
          </div>

          {/* Comments */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className="relative w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6"
              aria-hidden="true"
            >
              <BlogMessage className="stroke-primary w-full h-full" />
            </div>
            <span className="text-text-alt text-sm sm:text-[15px] md:text-base leading-5 whitespace-nowrap">
              {articleData.comments}
            </span>
          </div>

          {/* Share Button */}
          <button
            className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity"
            aria-label="مشاركة المقال"
          >
            <div
              className="relative w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6"
              aria-hidden="true"
            >
              <BlogShare className="stroke-primary w-full h-full" />
            </div>
            <span className="text-text-alt text-sm sm:text-[15px] md:text-base leading-5 whitespace-nowrap">
              شارك
            </span>
          </button>
        </div>
      </article>

      {/* Featured Image */}
      <figure
        className="relative w-full h-[220px] xs:h-[280px] sm:h-[350px] md:h-[420px] lg:h-[480px] xl:h-[523px] rounded-2xl sm:rounded-[25px] md:rounded-[30px] overflow-hidden shadow-lg"
        style={{
          backgroundImage: `url('/images/FRAME (10).png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        role="img"
        aria-label="Frame background image"
      />

      {/* Article Content */}
      <section className="w-full mt-4 sm:mt-6 md:mt-8 mb-8 sm:mb-10 md:mb-12 lg:mb-[50px]">
        <article
          className="text-text-alt text-sm leading-7 sm:text-[15px] sm:leading-8 md:text-base md:leading-9 lg:text-lg lg:leading-[42px] xl:leading-[50px] text-right"
          lang="ar"
          dir="rtl"
        >
          {arabicText}
          <br />
          <br />
          {breakText}
        </article>
      </section>
    </main>
  );
};
