import { formatCurrency, groupBy } from "../utils/utils";

export const products = [
  {
    id: 1,
    title: "Slim-Fit Blue Jeans For Women",
    price: 39.99,
    description: "High-waisted design with stretch denim",
    category: "women's clothing",
    image: "jeans.jpg",
    rating: { rate: 4.5, count: 132 },
  },
  {
    id: 2,
    title: "The Blue Bag Deluxe",
    price: 25.5,
    description: "Stylish and spacious with a durable finish",
    category: "women's clothing",
    image: "bag.jpg",
    rating: { rate: 4.1, count: 56 },
  },
  {
    id: 3,
    title: "Men's Casual Premium White T-Shirt",
    price: 29.99,
    description: "Soft cotton fabric with a modern fit",
    category: "men's clothing",
    image: "t-shirt.jpg",
    rating: { rate: 4.2, count: 259 },
  },
  {
    id: 4,
    title: "Men's Classic Leather Belt",
    price: 19.99,
    description: "Durable leather belt with a timeless buckle design",
    category: "men's clothing",
    image: "belt.jpg",
    rating: { rate: 4.4, count: 78 },
  },
  {
    id: 5,
    title: "Wireless Earbuds with Noise Cancellation",
    price: 59.99,
    description: "Crystal clear sound and active noise cancellation",
    category: "electronics",
    image: "earbuds.jpg",
    rating: { rate: 4.6, count: 203 },
  },
  {
    id: 6,
    title: "4K Ultra HD Smart TV 55-Inch",
    price: 449.0,
    description: "Crystal clear picture with smart features built-in",
    category: "electronics",
    image: "tv.jpg",
    rating: { rate: 4.3, count: 342 },
  },
];

export const productsByCategory = groupBy(products, "category");

export const categories = [
  ...new Set(products.map((product) => product.category)),
];

export const featuredProducts = products.filter((product) =>
  [1, 4, 5].includes(product.id)
);

const bagItemsWithQuantities = [
  { id: 1, quantity: 1 },
  { id: 4, quantity: 2 },
  { id: 5, quantity: 4 },
];

export const bag = bagItemsWithQuantities.map(({ id, quantity }) => {
  const product = products.find((product) => product.id === id);
  return { ...product, quantity };
});

const formatBagPrice = (bag) => {
  let total = 0;

  for (let index = 0; index < bag.length; index++) {
    total += bag[index].price * bag[index].quantity;
  }

  return formatCurrency(total);
};

export const bagPrice = formatBagPrice(bag);

export const singleItem = bag[0];
export const bulkItem = bag[1];
