// app/placement-test/[id]/components/ConfirmView.jsx

import Container from "@/components/ui/Container";
import { Send, Edit3, AlertTriangle, XCircle, Loader2 } from "lucide-react";

const ConfirmView = ({
  testInfo,
  totalQuestions,
  answeredCount,
  unansweredCount,
  onBackToReview,
  onSubmit,
  isSubmitting,
  submitError,
}) => {
  return (
    <div
      className="min-h-[calc(100vh-133px)] bg-gray-50 flex items-center justify-center py-8"
      dir="rtl"
    >
      <Container>
        <div className="max-w-lg mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="text-center">
            <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-12 h-12 text-secondary" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              تأكيد إرسال الإجابات
            </h2>
            <p className="text-gray-600 mb-6">
              أنت على وشك إرسال إجاباتك. لن تتمكن من التعديل بعد الإرسال.
            </p>

            {/* Summary */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-gray-800 mb-4">ملخص الاختبار</h3>
              <div className="space-y-3">
                <SummaryRow
                  label="اسم الاختبار"
                  value={testInfo?.title || "اختبار تحديد المستوى"}
                />
                <SummaryRow
                  label="إجمالي الأسئلة"
                  value={`${totalQuestions} سؤال`}
                />
                <SummaryRow
                  label="الأسئلة المُجابة"
                  value={`${answeredCount} سؤال`}
                  valueColor="text-green-600"
                />
                {unansweredCount > 0 && (
                  <SummaryRow
                    label="بدون إجابة"
                    value={`${unansweredCount} سؤال`}
                    valueColor="text-red-600"
                  />
                )}
              </div>
            </div>

            {/* Warning */}
            {unansweredCount > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="text-right">
                    <p className="text-amber-800 font-medium">تنبيه</p>
                    <p className="text-amber-700 text-sm">
                      لديك {unansweredCount} سؤال بدون إجابة. هل تريد المتابعة؟
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{submitError}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onBackToReview}
                disabled={isSubmitting}
                className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Edit3 className="w-5 h-5" />
                العودة للمراجعة
              </button>
              <button
                onClick={onSubmit}
                disabled={isSubmitting}
                className="flex-1 py-4 px-6 bg-secondary text-white rounded-full font-bold hover:opacity-90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    تأكيد الإرسال
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const SummaryRow = ({ label, value, valueColor = "text-gray-800" }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-600">{label}:</span>
    <span className={`font-medium ${valueColor}`}>{value}</span>
  </div>
);

export default ConfirmView;
