import { useOutletContext, Link, useSearchParams } from "react-router-dom";
import { formatProductText, toTitleCase, formatCurrency } from "../utils/utils";
import styles from "../styles/Store.module.css";

const Store = () => {
  const { products } = useOutletContext();
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  const categorizedProducts = category
    ? products.filter((product) => product.category === category) // Filter products by the specified category
    : Object.groupBy(products, (product) => product.category); // Group all products by their category if no category is specified

  return (
    <>
      <div className={styles.header}>
        <h1>Store.</h1>{" "}
        <span className={styles.subtitle}>
          Everything you desire, all in one place.
        </span>
      </div>
      <div className={styles.container}>
        {category ? (
          <section key={category}>
            <h2 className={styles.categoryHeading}>{toTitleCase(category)}</h2>
            <div className={styles.cardShelf}>
              {categorizedProducts.map((product) => (
                <Link
                  to={`/store/${product.id}`}
                  className={styles.card}
                  key={product.id}
                >
                  <div className={styles.cardText}>
                    <div className={styles.cardTitle}>
                      {formatProductText(product.title)}
                    </div>
                    <div>{formatCurrency(product.price)}</div>
                  </div>
                  <div className={styles.imageContainer}>
                    <img
                      src={product.image}
                      alt=""
                      className={styles.productImage}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          Object.keys(categorizedProducts).map((category) => (
            <section key={category}>
              <h2 className={styles.categoryHeading}>
                {toTitleCase(category)}
              </h2>
              <div className={styles.cardShelf}>
                {categorizedProducts[category].map((product) => (
                  <Link
                    to={`/store/${product.id}`}
                    className={styles.card}
                    key={product.id}
                  >
                    <div className={styles.cardText}>
                      <div className={styles.cardTitle}>
                        {formatProductText(product.title)}
                      </div>
                      <div>{formatCurrency(product.price)}</div>
                    </div>
                    <div className={styles.imageContainer}>
                      <img
                        src={product.image}
                        alt=""
                        className={styles.productImage}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </>
  );
};

export default Store;
