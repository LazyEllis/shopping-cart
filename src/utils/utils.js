export const formatProductText = (text) =>
  text.split(" ").slice(0, 3).join(" ");

export const formatCurrency = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

export const toTitleCase = (string) =>
  string.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
