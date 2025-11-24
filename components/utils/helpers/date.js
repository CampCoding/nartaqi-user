export function formatDate(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) return ""; // invalid input

  const day = date.getDate();
  const month = date.toLocaleString("ar-EG", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export function formatDateBackEnd(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) return "";

  const day = date.getDate();
  const month = date.toLocaleString("ar-EG", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
