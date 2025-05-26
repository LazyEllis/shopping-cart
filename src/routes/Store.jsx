import { useOutletContext, useSearchParams } from "react-router-dom";
import { matchesSearchTerm, groupBy } from "../utils/utils";
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
      (product) => product.category === category
    );
  } else if (searchTerm) {
    categorizedProducts = products.filter((product) =>
      matchesSearchTerm(product.title, searchTerm)
    );
  } else {
    categorizedProducts = groupBy(products, "category");
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
