import { useOutletContext, useSearchParams } from "react-router-dom";
import { matchesSearchTerm, groupBy } from "../utils/utils";
import CardShelf from "../components/CardShelf";
import styles from "../styles/Store.module.css";

const Store = () => {
  const { products } = useOutletContext();
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const searchTerm = searchParams.get("search");

  const categorizedProducts = (() => {
    if (category) {
      return [
        {
          heading: category,
          products: products.filter((p) => p.category === category),
          isSearch: false,
        },
      ];
    }

    if (searchTerm) {
      return [
        {
          heading: searchTerm,
          products: products.filter((p) =>
            matchesSearchTerm(p.title, searchTerm)
          ),
          isSearch: true,
        },
      ];
    }

    return Object.entries(groupBy(products, "category")).map(
      ([category, prods]) => ({
        heading: category,
        products: prods,
        isSearch: false,
      })
    );
  })();

  return (
    <>
      <header className={styles.header}>
        <h1>Store.</h1>{" "}
        <span className={styles.subtitle}>
          Everything you desire, all in one place.
        </span>
      </header>
      <div className={styles.container}>
        {categorizedProducts.map(({ heading, products, isSearch }) => (
          <CardShelf
            heading={heading}
            products={products}
            isSearch={isSearch}
            key={heading}
          />
        ))}
      </div>
    </>
  );
};

export default Store;
