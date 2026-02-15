export const handlePhoneCode = ({ phone, selectedCountryCode }) => {
  const countryCode = selectedCountryCode?.replace("+", "") || "";
  let cleanPhone = phone?.toString().replace(/\D/g, "") || "";
  if (cleanPhone.startsWith("0")) {
    cleanPhone = cleanPhone.slice(1);
  }

  if (cleanPhone.startsWith(countryCode)) {
    cleanPhone = cleanPhone.slice(countryCode.length);
    if (cleanPhone.startsWith("0")) {
      cleanPhone = cleanPhone.slice(1);
    }
  }

  return `${countryCode}${cleanPhone}`;
};
