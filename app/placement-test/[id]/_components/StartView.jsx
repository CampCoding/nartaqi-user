// app/placement-test/[id]/components/StartView.jsx

import Container from "@/components/ui/Container";
import { Play } from "lucide-react";

const StartView = ({
  testInfo,
  totalQuestions,
  sectionsCount,
  onStartTest,
}) => {
  return (
    <div
      className="min-h-[calc(100vh-133px)] bg-gray-50 flex items-center justify-center py-8"
      dir="rtl"
    >
      <Container className={"w-full"}>
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 md:p-12 text-center shadow-lg">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Play className="w-12 h-12 text-primary" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {testInfo?.title || "اختبار تحديد المستوى"}
          </h1>
          <p className="text-gray-500 mb-8">هل أنت مستعد لبدء الاختبار؟</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <span className="text-3xl font-bold text-primary">
                  {totalQuestions}
                </span>
                <span className="text-sm">سؤال</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <span className="text-3xl font-bold text-secondary">
                  {sectionsCount}
                </span>
                <span className="text-sm">قسم</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 text-right">
            <h3 className="font-bold text-amber-800 mb-2">تعليمات</h3>
            <ul className="text-sm text-amber-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>جميع الأسئلة معروضة في صفحة واحدة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>الاختبار مقسم إلى {sectionsCount} أقسام</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>يمكنك تمييز أي سؤال للمراجعة لاحقاً</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>تأكد من الإجابة على جميع الأسئلة</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onStartTest}
            className="w-full py-4 bg-primary text-white rounded-full font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            ابدأ الاختبار
          </button>
        </div>
      </Container>
    </div>
  );
};

export default StartView;
