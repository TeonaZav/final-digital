export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

export const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat("ka-GE", {
    style: "currency",
    currency: "GEL",
    minimumFractionDigits: 0,
    currencyDisplay: "symbol",
  }).format(price);
  const formattedPrice =
    formatter.replace("GEL", "").trim().replace(",", " ") + " ₾";
  return formattedPrice;
};

export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return formattedDate;
};
