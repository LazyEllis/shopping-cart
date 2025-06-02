import { encodeQuery } from "../utils/utils";

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Store", href: "/store" },
  {
    name: "Men's Clothing",
    href: `/store?category=${encodeQuery("men's clothing")}`,
  },
  { name: "Jewelery", href: "/store?category=jewelery" },
  { name: "Electronics", href: "/store?category=electronics" },
  {
    name: "Women's Clothing",
    href: `/store?category=${encodeQuery("women's clothing")}`,
  },
];

export const PANELS = {
  NONE: "none",
  SEARCH: "search",
  BAG: "bag",
  MENU: "menu",
};
