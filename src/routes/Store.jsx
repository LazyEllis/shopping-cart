import { useOutletContext, Link } from "react-router-dom";
import { formatProductText, toTitleCase, formatCurrency } from "../utils/utils";
import styles from "../styles/Store.module.css";

const Store = () => {
  const { products } = useOutletContext();

  // Group products according to category
  const groupedProducts = Object.groupBy(
    products,
    (product) => product.category
  );

  return (
    <>
      <div className={styles.header}>
        <h1>Store.</h1>{" "}
        <span className={styles.subtitle}>
          Everything you desire, all in one place.
        </span>
      </div>
      <div className={styles.container}>
        {Object.keys(groupedProducts).map((category) => (
          <section id={category} key={category}>
            <h2 className={styles.categoryHeading}>{toTitleCase(category)}</h2>
            <div className={styles.cardShelf}>
              {groupedProducts[category].map((product) => (
                <Link
                  to={`products/${product.id}`}
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
                    <img src={product.image} alt="" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default Store;
