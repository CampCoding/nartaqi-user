"use client";
import React from "react";
import { MyCertificateCard } from "../../../components/ui/Cards/MyCertificateCard";
import useGetCertificates from "../../../components/shared/Hooks/useGetcertificates";
import { useSelector } from "react-redux";
import LoadingPage from "../../../components/shared/Loading";
import NoContent from "../../../components/shared/NoContent";

const MyCertificates = () => {
  const { token } = useSelector((state) => state.auth);
  const { certificates, loading, error } = useGetCertificates(token);
  console.log({ certificates, loading, error });  

  if (loading) return <LoadingPage />;
  if (error) return <NoContent title={"حدث خطأ اثناء تحميل الشهادات"} />;

  return (
    <div className="w-full">
      <div className="leading-normal self-stretch h-12 sm:h-14 text-right justify-center text-text text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
        شهاداتي
      </div>
      {certificates !== "لا توجد شهادات لهذا الطالب" ? (
        certificates?.map((certificate) => (
          <MyCertificateCard key={certificate.id} certificate={certificate} />
        ))
      ) : (
        <>
          <NoContent title={certificates} />
        </>
      )}
    </div>
  );
};

export default MyCertificates;
