"use client";

import { Radio, Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { SaudiIcon, EgyptianIcon } from "../../../public/svgs";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "../../../components/ui/Container";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../../components/utils/Schema/LoginSchema.js";
import { useDispatch, useSelector } from "react-redux";
import {
  loginMarketer,
  loginUser,
} from "../../../components/utils/Store/Slices/authntcationSlice.jsx";
import toast from "react-hot-toast";
import LoadingPage from "../../../components/shared/Loading.jsx";
import SelectType from "./SelectType";

// ⭐⭐⭐ Animation imports
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import parsePhone from "../../../components/utils/helpers/parsePhone";
import { handlePhoneCode } from "../../../components/utils/helpers/phoneCode";

export const typeEnum = {
  student: "student",
  marketer: "marketer",
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const { user, token, error, loading } = useSelector((state) => state.auth);
  const { commentContent, link } = useSelector((state) => state.blog);
  const { content, link: redirectLink } = useSelector(
    (state) => state.redirect
  );
  console.log(loading);

  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+966",
    name: "Saudi Arabia",
    icon: SaudiIcon,
  });
  const [phone, setPhone] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [type, setType] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      password: "",
    },
    resolver: yupResolver(LoginSchema),
  });

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [token, router]);

  if (token) {
    return (
      <Container>
        <LoadingPage />
      </Container>
    );
  }

  const onSubmit = async (data) => {
    try {
      const phone = handlePhoneCode({
        phone: data.phone,
        selectedCountryCode: selectedCountry.code,
      });
      console.log(phone);

      if (!type.id) {
        toast.error("اختر نوع الحساب أولاً");
        return;
      }

      if (type.id === typeEnum.student) {
        const studentPayload = {
          phone: phone,
          password: data.password,
        };
        await dispatch(loginUser(studentPayload)).unwrap();
      }

      if (type.id === typeEnum.marketer) {
        const marketerPayload = {
          whatsapp_number: phone,
          password: data.password,
        };
        await dispatch(loginMarketer(marketerPayload)).unwrap();
      }

      toast.success("مرحباً بعودتك 🎉");
      router.push(redirectLink || "/");
    } catch (err) {
      console.log(err);

      toast.error(err?.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول");
    }
  };

  return (
    <Container className="flex flex-col lg:flex-row lg:justify-between overflow-hidden min-h-[calc(100vh-64px)])">
      {false ? (
        <>
          <LoadingPage />
        </>
      ) : (
        <>
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {showLogin ? (
                <motion.div
                  key="login-form"
                  initial={{ x: 250, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -250, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 22,
                  }}
                  className="w-full"
                >
                  <div
                    className="flex justify-start items-center px-10 "
                    dir="ltr"
                  >
                    <button
                      onClick={() => {
                        setShowLogin(false);
                      }}
                      className="group flex items-center justify-start"
                    >
                      <div
                        className="flex justify-center items-center mt-5 w-[30px] h-[30px] 
       group-hover:bg-white transition-all duration-300 
      rounded-lg cursor-pointer"
                      >
                        <Icon
                          icon="solar:undo-right-outline"
                          width={22}
                          height={22}
                          className="text-black transition-all duration-300 
        group-hover:text-primary group-hover:rotate-[360deg] rotate-[180deg]"
                        />
                      </div>
                    </button>
                  </div>
                  <div
                    className="flex justify-center items-center mx-auto flex-col py-8 md:py-16 lg:py-[64px] 
                    pl-4 sm:pl-6 md:pl-8 max-w-[719px] w-full"
                  >
                    <div className="inline-flex flex-col items-center gap-3 md:gap-4 relative mb-8 md:mb-12 lg:mb-[48px]">
                      <img
                        className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-[100px] md:h-[95.42px]"
                        alt="Mask group"
                        src={"/images/logo.svg"}
                      />

                      <p
                        className="relative flex items-center justify-center w-fit font-bold text-text 
                        text-lg sm:text-xl md:text-2xl text-center"
                      >
                        مرحبا بعودتك مرة اخرى
                      </p>
                      <p
                        className="relative flex items-center justify-center w-fit font-bold text-text 
                        text-lg sm:text-xl md:text-2xl text-center"
                      >
                        <div className=" flex justify-between gap-5 text-gray-100 bg-primary hover:scale-[1.2] transition-all rounded-full px-4 py-2  items-center">
                          {type.label}
                          <Icon icon={type.icon} />
                        </div>
                      </p>
                    </div>

                    {/* FORM */}
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="mx-auto w-full space-y-6 md:space-y-8 lg:space-y-[32px]"
                    >
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="col-span-3">
                          <TelephoneInput
                            label="رقم الجوال"
                            subLabel=""
                            placeholder="ادخل رقم جوالك"
                            selectedCountry={selectedCountry}
                            setSelectedCountry={setSelectedCountry}
                            errors={errors.phone}
                            register={register("phone", {
                              required: "رقم الجوال مطلوب",
                              pattern: {
                                value:
                                  /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
                                message: "رقم الجوال غير صحيح",
                              },
                            })}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>

                        <div className="col-span-3 space-y-2">
                          <PasswordInput
                            label="كلمة المرور"
                            subLabel=""
                            placeholder="أدخل كلمة المرور"
                            errors={errors.password}
                            value={password}
                            {...register("password", {
                              required: "كلمة المرور مطلوبة",
                            })}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <Link
                            href={{
                              pathname: "/reset-password",
                              query: { number: "" },
                            }}
                            className="text-right text-primary text-sm font-bold block"
                          >
                            نسيت كلمة المرور؟
                          </Link>
                        </div>
                      </div>

                      <div className="space-y-4 ">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full px-6 sm:px-8 md:px-12 py-4 
                            bg-primary rounded-2xl inline-flex justify-center items-center 
                            disabled:opacity-60"
                        >
                          <div className="text-white text-sm sm:text-base font-bold">
                            {loading ? "جارٍ الدخول..." : "تسجيل الدخول"}
                          </div>
                        </button>

                        <div className="text-center">
                          <span className="text-text text-sm">
                            ليس لديك حساب؟
                          </span>
                          <Link
                            href={"/sign-up"}
                            className="text-primary text-sm font-bold underline ml-1"
                          >
                            إنشاء حساب جديد
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="select-type"
                  initial={{ x: -250, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 250, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 22,
                  }}
                  className="w-full"
                >
                  <SelectType
                    type={type}
                    setType={setType}
                    setShowLogin={setShowLogin}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div
            className="w-full max-w-[592px] hidden lg:block relative select-none"
            style={{
              backgroundImage: `url("/images/logo-banner.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </>
      )}
    </Container>
  );
};

export default LoginPage;
export const Input = ({
  label = "الاسم رباعي باللغة العربية",
  subLabel = "(مطابق للهوية الوطنية)",
  placeholder = "أدخل اسمك بالكامل",
}) => {
  return (
    <div className="flex flex-col items-start gap-2 relative">
      <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
        <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
          {label}
        </div>
        <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
          {subLabel}
        </div>
      </div>
      <input
        placeholder={placeholder}
        className="justify-start h-12 sm:h-14 md:h-[62px] gap-2.5 px-3 sm:px-4 bg-white rounded-2xl md:rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative self-stretch w-full flex-[0_0_auto] text-sm sm:text-base"
      />
    </div>
  );
};

export const TelephoneInput = ({
  label = "رقم الجوال",
  subLabel = "(مثال: ٥٠٠٠٠٠٠٠٠)",
  placeholder = "123456789",
  register,
  errors,
  selectedCountry,
  setSelectedCountry,
  ...props
}) => {
  const countries = [
    {
      code: "+966",
      name: "Saudi Arabia",
      icon: SaudiIcon,
    },
    {
      code: "+20",
      name: "Egypt",
      icon: EgyptianIcon,
    },
  ];

  const handleCountrySelect = ({ key }) => {
    const country = countries.find((c) => c.code === key);
    console.log(country);

    if (country) {
      setSelectedCountry(country);
    }
  };

  const menu = (
    <Menu onClick={handleCountrySelect} className="min-w-[200px]">
      {countries.map((country) => (
        <Menu.Item key={country.code} className="">
          <div className="!flex gap-3 px-4 py-3">
            <div className="w-5 h-5">
              <country.icon />
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-900">
                {country.name}
              </div>
              <div className="text-xs text-gray-500">{country.code}</div>
            </div>
            {selectedCountry?.code === country?.code && (
              <svg
                className="w-4 h-4 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="flex flex-col items-start gap-2 relative w-full">
      <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
        <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
          {label}
        </div>
        <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
          {subLabel}
        </div>
      </div>
      <div className="h-12 sm:h-14 md:h-[62px] justify-between overflow-hidden py-0 bg-white rounded-2xl md:rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative w-full">
        <input
          className="justify-center w-full px-3 sm:px-4  h-full font-normal text-text placeholder-[#c8c9d5] text-sm sm:text-base text-right tracking-[0] leading-[normal] flex items-center relative"
          placeholder={placeholder}
          {...register}
          {...props}
          onChange={(e) => {
            // خُد الأرقام فقط من الإدخال
            const onlyNums = e.target.value.replace(/\D/g, "");
            e.target.value = onlyNums;
            if (props.onChange) props.onChange(e);
          }}
        />
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <div className="inline-flex items-center gap-1 sm:gap-2.5 px-2 sm:px-4 relative flex-[0_0_auto] border-r-2 [border-right-style:solid] border-variable-collection-stroke cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
            <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-semibold text-text text-sm sm:text-base text-right tracking-[0] leading-[normal]">
              {selectedCountry?.code}
            </div>
            <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
              {selectedCountry?.icon && <selectedCountry.icon />}
            </div>
            <svg
              className="w-3 h-3 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </Dropdown>
      </div>
      {errors && (
        <div className="text-danger text-xs mt-1">{errors.message}</div>
      )}
    </div>
  );
};

export const PasswordInput = ({
  label = "الاسم رباعي باللغة العربية",
  subLabel = "(مطابق للهوية الوطنية)",
  placeholder = "أدخل اسمك بالكامل",
  register,
  errors,
  ...props
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col items-start gap-2 relative">
      <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
        <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
          {label}
        </div>
        <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
          {subLabel}
        </div>
      </div>
      <div className="relative w-full">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          {...register}
          className="justify-start outline-0 ring-0 h-12 sm:h-14 md:h-[62px] gap-2.5  px-3 w-full  sm:px-4 bg-white rounded-2xl md:rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative self-stretch  flex-[0_0_auto] text-sm sm:text-base"
          {...props}
        />
        <div
          onClick={() => setShow(!show)}
          className="cursor-pointer absolute !top-1/2 left-2 sm:left-4 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6"
        >
          <Eye className="w-full h-full" />
        </div>
      </div>
      {errors && (
        <div className="text-danger text-xs mt-1">{errors.message}</div>
      )}
    </div>
  );
};
