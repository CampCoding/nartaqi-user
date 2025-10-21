"use client";

import { Radio } from "antd";
import React, { useState } from "react";
import RadioButtons from "../../../components/ui/RadioButtons";
import { SaudiIcon } from "../../../public/svgs";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useUser } from "../../../lib/useUser.jsx";
import { useRouter } from "next/navigation";
import Container from "../../../components/ui/Container";

const SignUpPage = () => {
  const [value1, setValue1] = useState("Apple");
  const { register, isLoading } = useUser();
  const router = useRouter();

  const plainOptions = ["Apple", "Pear", "Orange"];
  const onChange1 = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    setValue1(value);
  };

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [selected, setSelected] = useState("unconfirmed");

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    setError("");
    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }
    setSubmitting(true);
    try {
      await register({
        firstName,
        middleName,
        lastName,
        gender: selected,
        phone,
        password,
      });
      router.push("/");
    } catch (err) {
      setError(err?.message || "فشل إنشاء الحساب");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="flex flex-col lg:flex-row lg:justify-between overflow-hidden min-h-[calc(100vh-64px)])]">
      <div className="flex-1 flex justify-center items-center mx-auto flex-col py-8 md:py-16 lg:py-[64px] pl-4 sm:pl-6 md:pl-8 max-w-[719px] w-full">
        <div className="inline-flex flex-col items-center gap-3 md:gap-4 relative mb-8 md:mb-12 lg:mb-[48px]">
          <img
            className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-[100px] md:h-[95.42px] aspect-[1.05]"
            alt="Mask group"
            src={"/images/logo.svg"}
          />

          <p className="relative flex items-center justify-center w-fit font-bold text-text text-lg sm:text-xl md:text-2xl text-center tracking-[0] leading-[normal] px-4">
            مرحبا بك في منصة نرتقي
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full max-w-4xl space-y-6 md:space-y-8 lg:space-y-[32px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input
              subLabel=""
              label="الأسم الأول"
              placeholder="أدخل اسمك الأول"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              subLabel=""
              label="الأسم الأوسط"
              placeholder="أدخل اسمك الأوسط"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <Input
              subLabel=""
              label="اسم العائله"
              placeholder="أدخل اسم عائلتك"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <div className="flex col-span-1 md:col-span-3 items-center gap-4 md:gap-6 flex-wrap">
              <div className="text-sm sm:text-base font-bold">النوع:</div>
              <RadioButtons
                name="status"
                defaultValue={selected}
                options={[
                  { id: "unconfirmed", label: "ذكر", value: "unconfirmed" },
                  { id: "repair", label: "أنثى", value: "repair" },
                ]}
                onChange={(val) => setSelected(val)}
              />
            </div>
            <div className="col-span-1 md:col-span-3">
              <TelephoneButon
                label="رقم الجوال"
                subLabel=""
                placeholder="ادخل رقم جوالك"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col-span-1 md:col-span-3">
              <PasswordInput
                label="كلمة المرور"
                subLabel=""
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-span-1 md:col-span-3">
              <PasswordInput
                label="تأكيد كلمة المرور"
                subLabel=""
                placeholder="أدخل تأكيد كلمة المرور"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            {error ? (
              <div className="text-danger text-sm font-medium">{error}</div>
            ) : null}
            <button
              type="submit"
              disabled={submitting || isLoading}
              className="w-full px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 bg-primary rounded-2xl inline-flex justify-center items-center gap-2.5 disabled:opacity-60"
            >
              <div className="text-right justify-center text-white text-sm sm:text-base font-bold">
                {submitting ? "جارٍ الإنشاء..." : "إنشاء حساب جديد"}
              </div>
            </button>
            <div className="text-center justify-center">
              <span className="text-text text-xs sm:text-sm font-medium">
                لديك حساب بالفعل؟
              </span>
              <span className="text-primary text-xs sm:text-sm font-bold">
                {" "}
              </span>
              <Link
                href={"/login"}
                className="text-primary text-xs sm:text-sm font-bold underline"
              >
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div
        className="w-full h-32 sm:h-48 md:h-64 hidden lg:block lg:w-[50%] lg:h-auto relative select-none"
        style={{
          backgroundImage: `url("/images/logo-banner.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </Container>
  );
};

export default SignUpPage;

export const Input = ({
  label = "الاسم رباعي باللغة العربية",
  subLabel = "(مطابق للهوية الوطنية)",
  placeholder = "أدخل اسمك بالكامل",
  ...props
}) => {
  return (
    <div className="flex lg:col-span-3 xl:col-span-1  flex-col items-start gap-2 relative">
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
        {...props}
      />
    </div>
  );
};

export const TelephoneButon = ({
  label = "رقم الجوال",
  subLabel = "(مثال: ٥٠٠٠٠٠٠٠٠)",
  placeholder = "123456789",
  ...props
}) => {
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
      <div className="h-12 sm:h-14 md:h-[62px] justify-between px-3 sm:px-4 py-0 bg-white rounded-2xl md:rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative w-full">
        <input
          className="justify-center w-full font-normal text-text placeholder-[#c8c9d5] text-sm sm:text-base text-right tracking-[0] leading-[normal] flex items-center relative"
          placeholder={placeholder}
          {...props}
        />
        <div className="inline-flex items-center gap-1 sm:gap-2.5 px-2 sm:px-4 relative flex-[0_0_auto] border-r-2 [border-right-style:solid] border-variable-collection-stroke">
          <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-semibold text-text text-sm sm:text-base text-right tracking-[0] leading-[normal]">
            +966
          </div>
          <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
            <SaudiIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PasswordInput = ({
  label = "الاسم رباعي باللغة العربية",
  subLabel = "(مطابق للهوية الوطنية)",
  placeholder = "أدخل اسمك بالكامل",
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
          className="justify-start h-12 sm:h-14 md:h-[62px] gap-2.5 px-3 sm:px-4 pr-10 sm:pr-12 bg-white rounded-2xl md:rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative self-stretch w-full flex-[0_0_auto] text-sm sm:text-base"
          {...props}
        />
        <div
          onClick={() => setShow(!show)}
          className="cursor-pointer absolute !top-1/2 left-2 sm:left-4 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6"
        >
          <Eye className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};
