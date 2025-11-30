// components/ui/Pagination.jsx

"use client";

import React from "react";
import { Pagination as AntPagination, ConfigProvider } from "antd";

const Pagination = ({
  currentPage,
  totalPages,
  perPage = 12,
  total,
  onPageChange,
}) => {
  // ✅ Custom item render for RTL and Arabic
  const itemRender = (page, type, originalElement) => {
    if (type === "prev") {
      return (
        <button
          className="flex items-center justify-center w-full h-full"
          aria-label="الصفحة السابقة"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      );
    }
    if (type === "next") {
      return (
        <button
          className="flex items-center justify-center w-full h-full"
          aria-label="الصفحة التالية"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      );
    }
    return originalElement;
  };

  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        token: {
          // Primary colors
          colorPrimary: "#3B82F6",
          colorPrimaryHover: "#2563EB",
          colorPrimaryActive: "#1D4ED8",

          // Border radius
          borderRadius: 8,

          // Font
          fontFamily: "Cairo, sans-serif",
        },
        components: {
          Pagination: {
            // Item size
            itemSize: 40,

            // Colors
            itemBg: "#ffffff",
            itemActiveBg: "#3B82F6",
            itemActiveColorDisabled: "#ffffff",

            // Border
            colorBorder: "#E5E7EB",
            colorBorderSecondary: "#E5E7EB",

            // Text
            colorText: "#374151",
            colorTextDisabled: "#D1D5DB",
          },
        },
      }}
    >
      <div className="flex items-center justify-center mt-8 mb-4 pagination-wrapper">
        <AntPagination
          current={currentPage}
          total={total || totalPages * perPage}
          pageSize={perPage}
          onChange={onPageChange}
          showSizeChanger={false}
          showQuickJumper={false}
          itemRender={itemRender}
          className="custom-pagination"
        />
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .pagination-wrapper .ant-pagination {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pagination-wrapper .ant-pagination-item {
          min-width: 40px;
          height: 40px;
          line-height: 38px;
          border-radius: 10px;
          border: 2px solid #e5e7eb;
          background: #ffffff;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .pagination-wrapper .ant-pagination-item:hover {
          border-color: #3b82f6;
          color: #3b82f6;
          background: #eff6ff;
        }

        .pagination-wrapper .ant-pagination-item-active {
          background: #3b82f6 !important;
          border-color: #3b82f6 !important;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .pagination-wrapper .ant-pagination-item-active a {
          color: #ffffff !important;
        }

        .pagination-wrapper .ant-pagination-item-active:hover {
          background: #2563eb !important;
          border-color: #2563eb !important;
        }

        .pagination-wrapper .ant-pagination-prev,
        .pagination-wrapper .ant-pagination-next {
          min-width: 40px;
          height: 40px;
          line-height: 38px;
          border-radius: 10px;
          border: 2px solid #e5e7eb;
          background: #ffffff;
          transition: all 0.3s ease;
        }

        .pagination-wrapper .ant-pagination-prev:hover,
        .pagination-wrapper .ant-pagination-next:hover {
          border-color: #3b82f6;
          color: #3b82f6;
          background: #eff6ff;
        }

        .pagination-wrapper .ant-pagination-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-wrapper .ant-pagination-disabled:hover {
          border-color: #e5e7eb !important;
          background: #ffffff !important;
          color: #d1d5db !important;
        }

        .pagination-wrapper .ant-pagination-jump-prev,
        .pagination-wrapper .ant-pagination-jump-next {
          min-width: 40px;
          height: 40px;
          line-height: 40px;
          border-radius: 10px;
        }

        .pagination-wrapper
          .ant-pagination-jump-prev
          .ant-pagination-item-ellipsis,
        .pagination-wrapper
          .ant-pagination-jump-next
          .ant-pagination-item-ellipsis {
          color: #9ca3af;
          letter-spacing: 2px;
        }

        .pagination-wrapper .ant-pagination-options {
          display: none;
        }
      `}</style>
    </ConfigProvider>
  );
};

export default Pagination;
