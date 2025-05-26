import { useOutletContext, useParams } from "react-router-dom";
import { formatProductText, toTitleCase, formatCurrency } from "../utils/utils";
import styles from "../styles/Product.module.css";

const Product = () => {
  const { products, handleAddToBag } = useOutletContext();
  const { productId } = useParams();

  const product = products.find(
    (product) => product.id === parseInt(productId)
  );

  const handleClick = () => {
    handleAddToBag(product.id);
  };

  return (
    <>
      <header className={styles.header}>
        <h1>Buy {formatProductText(product.title)}</h1>
        <div>From {formatCurrency(product.price)}</div>
        <div>{toTitleCase(product.category)}</div>
      </header>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={product.image} alt="" className={styles.productImage} />
        </div>
        <div className={styles.productText}>
          <div className={styles.productInfo}>
            <div className={styles.productTitle}>
              {formatProductText(product.title)}
            </div>
            <div>{formatCurrency(product.price)}</div>
            <div>{toTitleCase(product.category)}</div>
          </div>
          <p>{product.description}</p>
          <button className={styles.addToBagBtn} onClick={handleClick}>
            Add to Bag
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
