"use client";

import React from "react";
import { Modal } from "antd";

const QuestionInfoPopup = ({ 
  isOpen, 
  onClose, 
  fontSize = "normal" 
}) => {
  // Font size mapping
  const getFontSizeClass = (size) => {
    const sizeMap = {
      small: "text-sm",
      normal: "text-base", 
      large: "text-lg",
      xlarge: "text-xl",
    };
    return sizeMap[size] || sizeMap.normal;
  };

  const textSizeClass = getFontSizeClass(fontSize);

  return (
    <Modal
      title={
        <div className="text-center" dir="rtl">
          <h2 className={`font-bold text-primary ${textSizeClass}`}>
            معلومات السؤال
          </h2>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={500}
      centered
      className="question-info-modal"
      styles={{
        header: {
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #e9ecef",
        },
        body: {
          padding: "24px",
        },
      }}
    >
      <div className="space-y-4" dir="rtl">
        {/* Simple text content */}
        <div className="text-center">
          <p className={`text-gray-700 leading-relaxed ${textSizeClass}`}>
            هذا النص يحتوي على معلومات عامة حول السؤال الحالي.
            يمكنك هنا العثور على تفاصيل إضافية أو تعليمات خاصة بالاختبار.
          </p>
        </div>

        {/* Additional info sections */}
        <div className="space-y-3">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className={`font-semibold text-blue-800 mb-2 ${textSizeClass}`}>
              نصائح مهمة:
            </h3>
            <ul className={`text-blue-700 space-y-1 ${textSizeClass}`}>
              <li>• اقرأ السؤال بعناية قبل الإجابة</li>
              <li>• تأكد من فهم جميع الخيارات المتاحة</li>
              <li>• استخدم الوقت المخصص بفعالية</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className={`font-semibold text-gray-700 mb-2 ${textSizeClass}`}>
              ملاحظات:
            </h3>
            <p className={`text-gray-600 ${textSizeClass}`}>
              يمكنك العودة إلى هذا السؤال لاحقاً إذا قمت بتمييزه للمراجعة.
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 font-medium"
          >
            إغلاق
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default QuestionInfoPopup;
