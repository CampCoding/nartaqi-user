// app/placement-test/[id]/components/ErrorView.jsx

import Container from "@/components/ui/Container";
import { X, AlertCircle } from "lucide-react";

const ErrorView = ({ error, onBack, type = "error" }) => {
  const isWarning = type === "warning";

  return (
    <div className="min-h-[calc(100vh-133px)] bg-gray-50 flex items-center justify-center py-8">
      <Container>
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 text-center shadow-lg">
          <div
            className={`w-20 h-20 ${isWarning ? "bg-amber-100" : "bg-red-100"} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            {isWarning ? (
              <AlertCircle className="w-10 h-10 text-amber-500" />
            ) : (
              <X className="w-10 h-10 text-red-500" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isWarning ? "تنبيه" : "خطأ"}
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={onBack}
            className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            العودة
          </button>
        </div>
      </Container>
    </div>
  );
};

export default ErrorView;
