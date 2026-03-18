// app/placement-test/[id]/_components/PDFGenerator.js

"use client";

import { useEffect, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PDFGenerator = ({
  contentRef,
  fileName = "test-result",
  autoDownload = true,
  onDownloadStart,
  onDownloadComplete,
  onDownloadError,
}) => {
  const hasDownloaded = useRef(false);

  const generatePDF = useCallback(async () => {
    if (!contentRef?.current || hasDownloaded.current) return;

    try {
      hasDownloaded.current = true;
      onDownloadStart?.();

      // انتظار تحميل الصور
      await new Promise((resolve) => setTimeout(resolve, 500));

      const element = contentRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#f9fafb",
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10;
      let pageNumber = 1;

      // إضافة Watermark للصفحة الأولى
      addWatermark(pdf, pageWidth, pageHeight);

      // إضافة الصورة
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 20;

      // إضافة صفحات إضافية إذا لزم الأمر
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pageNumber++;

        // إضافة Watermark لكل صفحة
        addWatermark(pdf, pageWidth, pageHeight);

        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - 20;
      }

      // تنزيل الملف
      const date = new Date().toLocaleDateString("ar-EG").replace(/\//g, "-");
      pdf.save(`${fileName}-${date}.pdf`);

      onDownloadComplete?.();
    } catch (error) {
      console.error("Error generating PDF:", error);
      hasDownloaded.current = false;
      onDownloadError?.(error);
    }
  }, [
    contentRef,
    fileName,
    onDownloadStart,
    onDownloadComplete,
    onDownloadError,
  ]);

  // إضافة Watermark
  const addWatermark = (pdf, pageWidth, pageHeight) => {
    // Watermark في الزوايا
    const logoSize = 20;

    // الزاوية العلوية اليمنى
    pdf.setGState(new pdf.GState({ opacity: 0.15 }));

    // نص Watermark متكرر
    pdf.setFontSize(40);
    pdf.setTextColor(200, 200, 200);

    for (let y = 30; y < pageHeight; y += 50) {
      for (let x = 20; x < pageWidth; x += 80) {
        pdf.text("جرافيتي", x, y, { angle: 45 });
      }
    }

    // إعادة الشفافية للمحتوى الرئيسي
    pdf.setGState(new pdf.GState({ opacity: 1 }));
  };

  useEffect(() => {
    if (autoDownload) {
      const timer = setTimeout(() => {
        generatePDF();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [autoDownload, generatePDF]);

  return null;
};

export default PDFGenerator;
