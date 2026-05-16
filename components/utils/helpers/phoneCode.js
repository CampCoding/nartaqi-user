export const handlePhoneCode = ({ phone, selectedCountryCode }) => {
  const countryCode = selectedCountryCode?.replace("+", "") || "";
  let cleanPhone = phone?.toString().replace(/\D/g, "") || "";

  // 1. لو الرقم بيبدأ بكود الدوله، شيله
  if (cleanPhone.startsWith(countryCode)) {
    cleanPhone = cleanPhone.slice(countryCode.length);
  }

  // 2. شيل كل الأصفار من الأول (00, 0)
  while (cleanPhone.startsWith("0")) {
    cleanPhone = cleanPhone.slice(1);
  }

  return `${countryCode}${cleanPhone}`;
};
