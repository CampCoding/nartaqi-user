import React from "react";
import {
  CourseFeatureSkills,
  CourseFeatureNewTeaching,
  CourseFeatureTimeIcon,
  CourseFeatureExpertTeacherIcon,
  CourseFeaturesGreadManagmentIcon,
  CourseFeaturesCertificateIcon,
} from "../../public/svgs";

const CourseFeatures = () => {
  const features = [
    {
      icon: <CourseFeatureSkills />,
      title: "مهارات التدريس العملية",
      description:
        "اكتساب مهارات عملية قابلة للتطبيق مباشرة داخل الصف الدراسي، مع أمثلة حقيقية وأنشطة تدريبية تفاعلية تساعدك على تحسين قدرتك في توصيل المعلومة للطلاب بطرق مبتكرة وفعّالة.",
    },
    {
      icon: <CourseFeatureNewTeaching />,
      title: "استراتيجيات التدريس الحديثة",
      description:
        "التعرّف على أحدث الاستراتيجيات والأساليب التعليمية المعتمدة عالميًا، مع تعلم كيفية دمج التكنولوجيا والأدوات الرقمية داخل الدروس لتحقيق تجربة تعليمية متطورة وملهمة.",
    },
    {
      icon: <CourseFeatureTimeIcon />,
      title: "دروس مرنة ومركزة",
      description:
        "الوصول إلى دروس قصيرة ومنظمة بعناية مصممة لتناسب جدولك اليومي، وتسهّل عملية المتابعة، مع ضمان الاستفادة القصوى بأقل وقت ممكن وبطريقة سلسة.",
    },
    {
      icon: <CourseFeatureExpertTeacherIcon />,
      title: "مدرب خبير متخصص",
      description:
        "محتوى تدريبي مُقدَّم من مدرب يمتلك خبرة عملية طويلة في مجال التعليم، بمشاركة أفضل الممارسات والأساليب المعتمدة لضمان جودة التعلم.",
    },
    {
      icon: <CourseFeaturesGreadManagmentIcon />,
      title: "تحسين إدارة الصف",
      description:
        "تعلّم استراتيجيات وأدوات متقدمة لإدارة الصف الدراسي، تساعدك على بناء بيئة تعليمية إيجابية، تحفّز الطلاب، التعامل مع التحديات، والحفاظ على تفاعلهم في الأنشطة داخل الدرس.",
    },
    {
      icon: <CourseFeaturesCertificateIcon />,
      title: "شهادة معتمدة عند الإنجاز",
      description:
        "احصل على شهادة إنجاز معتمدة تثبت إتقانك لمهارات التدريس الفعّال، تعزز سيرتك الذاتية وتمنحك فرصًا أكبر للتطوير في مسيرتك المهنية كمعلم.",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="self-stretch inline-flex flex-col justify-start items-start gap-1"
        >
          <div className="inline-flex justify-start items-center gap-4">
            {feature.icon}
            <div className="text-right justify-center text-text text-2xl font-bold ">
              {feature.title}
            </div>
          </div>
          <div className="w-[762px] text-right justify-center text-stone-600 text-base font-medium ">
            {feature.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseFeatures;
