const parsePhone = (phone) => {
  if (!phone) return { code: "", number: "" };

  const str = phone.toString();

  if (str.startsWith("20")) {
    return { code: "2", number: str.slice(1) };
  }

  if (str.startsWith("966")) {
    return { code: "966", number: str.slice(3) };
  }

  return { code: "", number: str };
};

export default parsePhone;
