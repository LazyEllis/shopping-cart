export const formatProductText = (text) =>
  text.split(" ").slice(0, 2).join(" ");

export const toTitleCase = (string) =>
  string.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
