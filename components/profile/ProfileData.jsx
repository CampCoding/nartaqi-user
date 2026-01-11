"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateProfileSchema } from "../utils/Schema/UpdateProfile.Schema.js";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { getUserDate } from "../utils/Store/Slices/UserSllice.jsx";
import toast from "react-hot-toast";
import parsePhone from "../utils/helpers/parsePhone.js";
import { useGetProfile } from "../shared/Hooks/useGetProfile.jsx";
import LoadingPage from "../shared/Loading.jsx";
import { logoutUser } from "../utils/Store/Slices/authntcationSlice.jsx";
import { saveContent } from "../utils/Store/Slices/redirectSlice.jsx";
import { useRouter } from "next/navigation.js";

const ProfileData = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [phoneMeta, setPhoneMeta] = useState({ code: "", number: "" });
  const { data: user, isLoading, error } = useGetProfile(token);
  const [loadingState, setLoadingState] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
  });
  useEffect(() => {
    if (error) {
      toast.error("يرجي تسجيل الدخول");
      dispatch(logoutUser());
      dispatch(saveContent({ content: null, link: window.location.pathname }));
      router.push("/login");
    }
  }, [error]);

  /** 📌 املا الفورم لما اليوزر يتغير */
  useEffect(() => {
    if (user?.message) {
      let parsed = { code: "", number: "" };

      if (user?.message?.phone) {
        parsed = parsePhone(user.message.phone);
        setPhoneMeta(parsed);
      }

      reset({
        firstName: user?.message?.name?.split(" ")[0] || "",
        middleName: user?.message?.name?.split(" ")[1] || "",
        lastName: user?.message?.name?.split(" ")[2] || "",
        phone: parsed.number, // <-- صح هنا
      });
    }
  }, [user, reset]);
  if (isLoading) {
    return <LoadingPage />;
  }
  const status = error?.response?.status || error?.status;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file); // نخزن الصورة لرفعها
    setPreview(URL.createObjectURL(file)); // نعرضها مباشرة
  };
  const onSubmit = async (data) => {
    setLoadingState(true);
    try {
      const formData = new FormData();

      formData.append(
        "name",
        `${data.firstName} ${data.middleName} ${data.lastName}`
      );

      // لو عايز ترجع تفعيل رقم الجوال
      formData.append("phone", `${phoneMeta.code}${data.phone}`);

      // 🟦 لو المستخدم اختار صورة → ابعتها
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/update_student_info`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("تم تحديث البيانات بنجاح");
      dispatch(getUserDate(token)); // 🟩 اعمل refetch
      setIsEditing(false);
      setSelectedImage(null);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "حدث خطأ ما");
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <main className="flex flex-col items-center flex-1 w-full">
      {/* HEADER */}
      {/* HEADER */}
      <div className="flex flex-col items-center relative w-full">
        <div className="inline-flex flex-col items-center gap-1.5 relative">
          {/* 🟦 صورة البروفايل */}
          <div
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                preview || user?.message?.image_url || "/images/Image-12422.png"
              })`,
            }}
          />

          {/* 🟥 زر تعديل الصورة + رفع ملف */}
          <button
            onClick={() => fileInputRef.current.click()}
            className={`absolute ${
              isEditing ? "block" : "hidden"
            } hover:scale-105 bottom-0 left-0 transition-transform duration-200`}
          >
            <EditIcon />
          </button>

          {/* 🟩 فايل إنبوت مخفي */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <h1 className="font-bold text-text text-lg sm:text-xl md:text-2xl mt-2 sm:mt-4">
          {user?.message?.name}
        </h1>
      </div>

      {/* زر تعديل الملف الشخصي */}
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="inline-flex mt-4 sm:mt-6 items-center justify-center px-6 sm:px-8 md:px-12 py-3 rounded-[20px] border-2 border-variable-collection-sup-title transition-all duration-200 cursor-pointer"
        >
          <span className="font-semibold text-text-alt text-sm sm:text-base">
            تعديل الملف الشخصي
          </span>
        </button>
      )}

      {/* 📌 FORM بشكل صحيح */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 mt-6 sm:mt-[32px]"
      >
        <Input
          label="الأسم الأول"
          disabled={!isEditing}
          register={register("firstName")}
          error={errors.firstName?.message}
        />

        <Input
          label="الأسم الوسط"
          disabled={!isEditing}
          register={register("middleName")}
          error={errors.middleName?.message}
        />

        <Input
          label="اسم العائله"
          disabled={!isEditing}
          register={register("lastName")}
          error={errors.lastName?.message}
        />

        <Input
          label="رقم الجوال"
          disabled={!isEditing}
          register={register("phone")}
          error={errors.phone?.message}
        />

        {/* زر الحفظ يظهر فقط أثناء التعديل */}
        {isEditing && (
          <div className="col-span-2">
            <div className="flex items-center justify-center w-full gap-4 mt-6 sm:mt-8 md:mt-10">
              <button
                type="submit"
                className="inline-flex mt-4 sm:mt-6 bg-primary text-white items-center justify-center group hover:bg-primary-light gap-2.5 px-6 sm:px-8 md:px-12 py-3 sm:py-4 relative rounded-[20px] border-2 border-solid border-variable-collection-sup-title hover:bg-variable-collection-sup-title hover:bg-opacity-5 focus:outline-none focus:ring-2 focus:ring-variable-collection-sup-title focus:ring-opacity-50 transition-all duration-200 cursor-pointer w-full sm:w-auto"
              >
                <span className="relative flex items-center justify-center w-fit font-semibold text-white transition-all group-hover:text-text-alt text-sm sm:text-base tracking-[0] leading-8 whitespace-nowrap">
                  {loadingState ? "جاري الحفظ..." : "حفظ"}
                </span>
              </button>
            </div>
          </div>
        )}
      </form>
    </main>
  );
};

export default ProfileData;

const EditIcon = (props) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="sm:w-6 sm:h-6"
    {...props}
  >
    <rect width={24} height={24} rx={12} fill="#3B82F6" />
    <path
      d="M11.4786 6.82031H7.21746C6.89457 6.82031 6.5849 6.95262 6.35659 7.18812C6.12827 7.42362 6 7.74303 6 8.07608V16.8665C6 17.1995 6.12827 17.5189 6.35659 17.7544C6.5849 17.9899 6.89457 18.1222 7.21746 18.1222H15.7397C16.0626 18.1222 16.3722 17.9899 16.6005 17.7544C16.8289 17.5189 16.9571 17.1995 16.9571 16.8665V12.4713"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.3606 6.58543C15.6028 6.33564 15.9312 6.19531 16.2737 6.19531C16.6162 6.19531 16.9446 6.33564 17.1868 6.58543C17.429 6.83522 17.565 7.174 17.565 7.52726C17.565 7.88051 17.429 8.2193 17.1868 8.46908L11.7003 14.1288C11.5558 14.2778 11.3772 14.3868 11.1811 14.4459L9.43219 14.9733C9.37981 14.9891 9.32428 14.99 9.27143 14.9761C9.21857 14.9621 9.17033 14.9337 9.13175 14.8939C9.09317 14.8541 9.06567 14.8044 9.05213 14.7499C9.03858 14.6953 9.0395 14.6381 9.05478 14.584L9.56611 12.7801C9.62365 12.578 9.72957 12.394 9.87413 12.2452L15.3606 6.58543Z"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Input = ({
  label,
  subLabel,
  placeholder,
  register,
  disabled = false,
  error, // ⬅️ استقبال الـ error هنا
}) => {
  return (
    <div className="flex w-full flex-col items-start gap-2 relative">
      <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
        <div className="font-bold text-text relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
          {label}
        </div>
        {subLabel && (
          <div className="font-medium text-danger relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
            {subLabel}
          </div>
        )}
      </div>

      <input
        {...register}
        disabled={disabled}
        placeholder={placeholder}
        className={`justify-start h-[60px] sm:h-[70px] md:h-[78px] gap-2.5 px-3 sm:px-4 bg-white rounded-[15px] sm:rounded-[20px] border-2 flex items-center relative self-stretch w-full text-sm sm:text-base focus:outline-none transition-all duration-200 
          ${
            error
              ? "border-danger focus:border-danger"
              : "border-[#c8c9d5] focus:ring-2 focus:ring-primary focus:border-primary"
          } 
          disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
        `}
      />

      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
  );
};
