import { Link } from "react-router-dom";
import { formatProductText, toTitleCase, formatCurrency } from "../utils/utils";
import styles from "../styles/CardShelf.module.css";

const CardShelf = ({ heading, products, isSearch = false }) => (
  <section>
    <h2 className={styles.categoryHeading}>{toTitleCase(heading)}</h2>
    {isSearch && products.length > 0 && (
      <div className={styles.resultQuantity}>
        {products.length} results found
      </div>
    )}
    {isSearch && products.length === 0 ? (
      <div className={styles.nullSearch}>
        <span>Sorry, no matches were found.</span>{" "}
        <span>Try a new search or use our suggestions.</span>
      </div>
    ) : (
      <div className={styles.cardShelf}>
        {products.map((product) => (
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
              <img src={product.image} alt="" className={styles.productImage} />
            </div>
          </Link>
        ))}
      </div>
    )}
  </section>
);

export default CardShelf;
