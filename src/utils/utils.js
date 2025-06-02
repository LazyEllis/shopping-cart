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

export const matchesSearchTerm = (text, searchTerm) => {
  const normalizedText = text.toLowerCase();
  const normalizedSearchTerm = searchTerm.toLowerCase().trim();

  return (
    normalizedSearchTerm !== "" &&
    normalizedText.includes(normalizedSearchTerm) &&
    normalizedText
      .split(" ")
      .some((token) => token.startsWith(normalizedSearchTerm.split(" ")[0]))
  );
};

export const encodeQuery = (query) => query.split(" ").join("+");

export const groupBy = (items, groupingKey) =>
  items.reduce((result, item) => {
    // Extract the value to group by from the current item
    const group = item[groupingKey];

    // Initialize the group array if it doesn't exist
    if (!result[group]) result[group] = [];

    // Add the current item to its corresponding group
    result[group].push(item);

    return result;
  }, {});
