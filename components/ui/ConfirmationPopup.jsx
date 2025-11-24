import React from "react";

export const ConfirmationPopup = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-primary rounded-lg p-6 mx-4 max-w-md w-full shadow-xl">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-4 [direction:rtl]">
            {title || "تأكيد الإجراء"}
          </h3>
          <p className="text-white mb-6 [direction:rtl]">
            {message || "هل أنت متأكد من أنك تريد المتابعة؟"}
          </p>
          <div className="flex gap-4 justify-center [direction:rtl]">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {cancelText || "إلغاء"}
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              {confirmText || "تأكيد"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
