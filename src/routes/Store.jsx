import { useOutletContext, useSearchParams } from "react-router-dom";
import { matchesSearchTerm } from "../utils/utils";
import CardShelf from "../components/CardShelf";
import styles from "../styles/Store.module.css";

const Store = () => {
  const { products } = useOutletContext();
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const searchTerm = searchParams.get("search");

  let categorizedProducts;

  if (category) {
    categorizedProducts = products.filter(
      (product) => product.category === category // If the URL contains a category query, filter the products by that category.
    );
  } else if (searchTerm) {
    categorizedProducts = products.filter(
      (product) => matchesSearchTerm(product.title, searchTerm) // If the URL contains a search query, filter products based on the search term.
    );
  } else {
    categorizedProducts = Object.groupBy(
      products,
      (product) => product.category // If neither query is present, group the products by their category.
    );
  }

  return (
    <>
      <header className={styles.header}>
        <h1>Store.</h1>{" "}
        <span className={styles.subtitle}>
          Everything you desire, all in one place.
        </span>
      </header>
      <div className={styles.container}>
        {category || searchTerm ? (
          <CardShelf
            heading={category || searchTerm}
            products={categorizedProducts}
            isSearch={searchTerm}
          />
        ) : (
          Object.keys(categorizedProducts).map((category) => (
            <CardShelf
              heading={category}
              products={categorizedProducts[category]}
              key={category}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Store;
