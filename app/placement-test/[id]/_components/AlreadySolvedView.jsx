// app/placement-test/[id]/components/AlreadySolvedView.jsx

import Container from "@/components/ui/Container";
import { CheckCircle2, RotateCcw, Home } from "lucide-react";

const AlreadySolvedView = ({ testInfo, onRetake, onGoHome }) => {
  return (
    <div
      className="min-h-[calc(100vh-133px)] bg-gray-50 flex items-center justify-center py-8"
      dir="rtl"
    >
      <Container>
        <div className="max-w-lg mx-auto bg-white rounded-3xl p-8 md:p-12 text-center shadow-lg">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            تم حل هذا الاختبار مسبقاً
          </h1>
          <p className="text-gray-500 mb-8">
            لقد قمت بحل "{testInfo?.title || "اختبار تحديد المستوى"}" من قبل.
          </p>

          {/* Info Card */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <span className="text-green-800 font-medium">
                تم تسجيل نتيجتك بنجاح
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={onGoHome}
              className="w-full py-4 bg-primary text-white rounded-full font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              العودة للرئيسية
            </button>

            {onRetake && (
              <button
                onClick={onRetake}
                className="w-full py-4 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                إعادة الاختبار
              </button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AlreadySolvedView;
