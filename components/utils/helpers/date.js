export function formatDate(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) return ""; // invalid input

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day}  ${year} ${month}   `;
}
