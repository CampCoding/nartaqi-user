export const handlePhoneCode = ({ phone, selectedCountryCode }) => {
  let countryCode = selectedCountryCode?.slice(1);
  if (selectedCountryCode === "+20") {
    phone = phone.slice(1);
  }
  return `${countryCode}${phone}`;
};
