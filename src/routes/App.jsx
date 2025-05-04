import { useOutletContext, Link } from "react-router-dom";
import { formatProductText, toTitleCase } from "../utils/utils";
import styles from "../styles/App.module.css";

const App = () => {
  const { products } = useOutletContext();

  // Gets the highest rated product from each category
  const featuredProducts = Object.values(
    Object.groupBy(
      products.toSorted((a, b) => b.rating.rate - a.rating.rate),
      (product) => product.category
    )
  ).map((products) => products[0]);

  return (
    <section className={styles.container}>
      {featuredProducts.map((product) => (
        <div key={product.id} className={styles.product}>
          <div className={styles.productText}>
            <div className={styles.productInfo}>
              <h2 className={styles.heading}>
                {formatProductText(product.title)}
              </h2>
              <p className={styles.subheading}>
                {toTitleCase(product.category)}
              </p>
            </div>
            <Link to={`store/${product.id}`} className={styles.actionLink}>
              Learn more
            </Link>
          </div>
          <img src={product.image} alt="" className={styles.productImage} />
        </div>
      ))}
    </section>
  );
};

export default App;
