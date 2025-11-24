import React from "react";

export const SuccessPopup = ({ isOpen, onClose, title, message, buttonText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 mx-4 max-w-md w-full shadow-xl">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-4 [direction:rtl]">
            {title || "تم بنجاح!"}
          </h3>
          <p className="text-gray-600 mb-6 [direction:rtl]">
            {message || "تم إرسال الاختبار بنجاح"}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            {buttonText || "موافق"}
          </button>
        </div>
      </div>
    </div>
  );
};
