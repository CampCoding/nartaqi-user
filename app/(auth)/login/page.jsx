"use client";

import { Radio, Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import RadioButtons from "../../../components/ui/RadioButtons";
import { SaudiIcon, EgyptianIcon } from "../../../public/svgs";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useUser } from "../../../lib/useUser.jsx";
import { useRouter } from "next/navigation";
import Container from "../../../components/ui/Container";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../../components/utils/Schema/LoginSchema.js";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../components/utils/Store/Slices/authntcationSlice.jsx";
import toast from "react-hot-toast";
import LoadingPage from "../../../components/shared/Loading.jsx";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.auth);
  const [value1, setValue1] = useState("Apple");
  const { login, isLoading } = useUser();
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+966",
    name: "Saudi Arabia",
    icon: SaudiIcon,
  });
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const plainOptions = ["Apple", "Pear", "Orange"];
  const onChange1 = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    setValue1(value);
  };
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
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  // ⭐⭐⭐ شرط واحد فقط قبل الريندر
  if (user) {
    return (
      <Container>
        <LoadingPage />
      </Container>
    );
  }
  const onSubmit = async (data) => {
    let countryCode = selectedCountry.code.slice(1);
    if (selectedCountry.code === "+20") {
      data.phone = data.phone.slice(1);
    }
    const payload = { ...data, phone: `${countryCode}${data.phone}` };
    try {
      const res = await dispatch(loginUser(payload)).unwrap();
      setRedirect(true); // ✅ بترجع data مباشرة
      toast.success("اهلاً بعودتك مرة أخرى 🎉");
      router.push("/");
      setTimeout(() => {
        setRedirect(true);
      }, 0);
    } catch (err) {
      toast.error(err || "حدث خطأ أثناء تسجيل الدخول");
      console.log("Error:", err);
    }
  };

  return (
    <Container className="flex flex-col lg:flex-row lg:justify-between overflow-hidden min-h-[calc(100vh-64px)])]">
      {redirect ? (
        <>
          <LoadingPage />
        </>
      ) : (
        <>
          <div className="flex-1 flex justify-center items-center mx-auto flex-col py-8 md:py-16 lg:py-[64px] pl-4 sm:pl-6 md:pl-8 max-w-[719px] w-full">
            <div className="inline-flex flex-col items-center gap-3 md:gap-4 relative mb-8 md:mb-12 lg:mb-[48px]">
              <img
                className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-[100px] md:h-[95.42px] aspect-[1.05]"
                alt="Mask group"
                src={"/images/logo.svg"}
              />

              <p className="relative flex items-center justify-center w-fit font-bold text-text text-lg sm:text-xl md:text-2xl text-center tracking-[0] leading-[normal] px-4">
                مرحبا بعودتك مرة اخرى
              </p>
            </div>
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
                        value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
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
                    className="text-right justify-center text-primary text-sm sm:text-base font-bold block"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>
              </div>

              <div className="space-y-4 ">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 bg-primary rounded-2xl inline-flex justify-center items-center gap-2.5 disabled:opacity-60"
                >
                  <div className="text-right justify-center text-white text-sm sm:text-base font-bold">
                    {loading ? "جارٍ الدخول..." : "تسجيل الدخول"}
                  </div>
                </button>
                <div className="text-center justify-center">
                  <span className="text-text text-xs sm:text-sm font-medium">
                    ليس لديك حساب؟
                  </span>
                  <span className="text-primary text-xs sm:text-sm font-bold">
                    {" "}
                  </span>
                  <Link
                    href={"/sign-up"}
                    className="text-primary text-xs sm:text-sm font-bold underline"
                  >
                    إنشاء حساب جديد{" "}
                  </Link>
                </div>
              </div>
            </form>
          </div>

          <div
            className="w-full max-w-[592px] h-32  sm:h-48 md:h-64 hidden lg:block lg:w-[50%] lg:h-auto relative select-none"
            style={{
              backgroundImage: `url("/images/logo-banner.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
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
