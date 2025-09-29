import React from "react";

const CourseTermsAndConditions = () => {
  return (
    <div>
      <div className="self-stretch inline-flex flex-col justify-start items-start gap-2">
        <div className="self-stretch text-right justify-center text-primary text-3xl font-bold ">
          الشروط والأحكام
        </div>
        <div className="self-stretch h-32 text-right justify-center text-black text-2xl font-medium ">
          مرحبًا بك في منصتنا التعليمية. برجاء قراءة هذه الشروط والأحكام بعناية
          قبل استخدام الموقع أو التسجيل في أي دورة، حيث إن دخولك أو استخدامك
          للمنصة يعني موافقتك الكاملة على جميع البنود التالية
        </div>
      </div>

      {/* القائمة */}
      <ul className="self-stretch flex flex-col justify-start items-start gap-8 list-disc ">
        <li className="flex flex-col justify-start items-start gap-1">
          <h3 className="text-right text-text text-2xl font-bold">
            التسجيل واستخدام الحساب
          </h3>
          <p className="w-[762px] text-right text-stone-600 text-base font-medium ">
            يجب أن تُدخل بيانات صحيحة وكاملة عند إنشاء حساب جديد. <br />
            المستخدم مسؤول عن سرية بيانات دخوله، وأي نشاط يتم من خلال حسابه.{" "}
            <br />
            لا يُسمح بمشاركة الحساب مع أطراف أخرى أو استخدامه لأغراض غير
            قانونية.
          </p>
        </li>

        <li className="flex flex-col justify-start items-start gap-1">
          <h3 className="text-right text-text text-2xl font-bold ">
            الدورات والمحتوى
          </h3>
          <p className="w-[762px] text-right text-stone-600 text-base font-medium ">
            جميع الدورات المتاحة على المنصة مخصصة للاستخدام الشخصي فقط. <br />
            يُمنع إعادة بيع أو مشاركة المحتوى التعليمي خارج المنصة بدون إذن خطي
            مسبق. <br />
            المنصة غير مسؤولة عن أي استخدام غير قانوني للمحتوى من قبل المشتركين.
          </p>
        </li>

        <li className="flex flex-col justify-start items-start gap-1">
          <h3 className="text-right text-text text-2xl font-bold ">
            الدفع والاشتراكات
          </h3>
          <p className="w-[762px] text-right text-stone-600 text-base font-medium ">
            عند الاشتراك في أي دورة، يجب إتمام عملية الدفع عبر الوسائل المتاحة
            على المنصة. <br />
            في حال الدفع الإلكتروني، يتم تفعيل الدورة فورًا. <br />
            في حال التحويل البنكي، يتم التفعيل بعد التأكد من عملية الدفع. <br />
            رسوم الاشتراك غير قابلة للاسترداد إلا في حالات خاصة تحددها الإدارة.
          </p>
        </li>

        <li className="flex flex-col justify-start items-start gap-1">
          <h3 className="text-right text-text text-2xl font-bold ">
            حقوق الملكية الفكرية
          </h3>
          <p className="w-[762px] text-right text-stone-600 text-base font-medium ">
            جميع المواد التعليمية، الفيديوهات، النصوص، الصور، والشعارات مملوكة
            للمنصة و/أو شركائها. <br />
            يمنع نسخ، إعادة إنتاج، أو توزيع أي محتوى دون إذن كتابي مسبق.
          </p>
        </li>

        <li className="flex flex-col justify-start items-start gap-1">
          <h3 className="text-right text-text text-2xl font-bold ">
            التزامات المستخدم
          </h3>
          <p className="w-[762px] text-right text-stone-600 text-base font-medium ">
            الالتزام بالأدب والاحترام عند التفاعل مع المدربين أو الطلاب الآخرين.{" "}
            <br />
            عدم نشر أي محتوى مسيء، غير لائق، أو مخالف للقوانين. <br />
            عدم محاولة اختراق أو تعطيل عمل المنصة.
          </p>
        </li>

        <li className="flex flex-col justify-start items-start gap-1">
          <h3 className="text-right text-text text-2xl font-bold ">
            إخلاء المسؤولية
          </h3>
          <p className="w-[762px] text-right text-stone-600 text-base font-medium ">
            المنصة تسعى لتقديم محتوى تعليمي بجودة عالية، لكنها غير مسؤولة عن أي
            نتائج سلبية أو فشل في تحقيق الأهداف التعليمية بسبب سوء استخدام
            المتدرب. <br />
            قد تتغير بعض المعلومات أو الخدمات دون إشعار مسبق.
          </p>
        </li>

        <li className="flex flex-col justify-start items-start gap-1">
          <h3 className="text-right text-text text-2xl font-bold ">
            التعديلات على الشروط
          </h3>
          <p className="w-[762px] text-right text-stone-600 text-base font-medium ">
            تحتفظ المنصة بحقها في تعديل أو تحديث هذه الشروط والأحكام في أي وقت.{" "}
            <br />
            استمرار استخدامك للمنصة بعد التعديلات يُعتبر موافقة ضمنية على
            التحديثات.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default CourseTermsAndConditions;
