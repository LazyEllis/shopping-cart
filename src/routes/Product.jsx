import { useOutletContext, useParams } from "react-router-dom";
import { formatProductText, toTitleCase, formatCurrency } from "../utils/utils";
import styles from "../styles/Product.module.css";

const Product = () => {
  const { products, bag, setBag } = useOutletContext();
  const { productId } = useParams();

  const handleAddToBag = () => {
    const isInBag = bag.some((product) => product.id === parseInt(productId));

    if (isInBag) {
      const updatedBag = bag.map((product) =>
        product.id === parseInt(productId)
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      setBag(updatedBag);
    } else {
      setBag([...bag, { id: parseInt(productId), quantity: 1 }]);
    }
  };

  const product = products.find(
    (product) => product.id === parseInt(productId)
  );

  return (
    <>
      <div className={styles.header}>
        <h1>Buy {formatProductText(product.title)}</h1>
        <div>From {formatCurrency(product.price)}</div>
        <div>{toTitleCase(product.category)}</div>
      </div>
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
          <button className={styles.addToBagBtn} onClick={handleAddToBag}>
            Add to Bag
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
