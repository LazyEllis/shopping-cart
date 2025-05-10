import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { CircleMinus, CirclePlus } from "lucide-react";
import { formatProductText, toTitleCase, formatCurrency } from "../utils/utils";
import styles from "../styles/Product.module.css";

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const { products, cart, setCart } = useOutletContext();
  const { productId } = useParams();

  const increaseQuantity = () => setQuantity(quantity + 1);

  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const handleAddToCart = () => {
    const isInCart = cart.some((product) => product.id === parseInt(productId));

    if (isInCart) {
      const updatedCart = cart.map((product) =>
        product.id === parseInt(productId)
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { id: parseInt(productId), quantity: 1 }]);
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
            <div>{formatCurrency(quantity * product.price)}</div>
            <div>{toTitleCase(product.category)}</div>
            <div className={styles.quantitySetter}>
              <button
                className={styles.quantityToggle}
                onClick={decreaseQuantity}
              >
                <CircleMinus className={styles.buttonIcon} size={18} />
              </button>
              <div>{quantity}</div>
              <button
                className={styles.quantityToggle}
                onClick={increaseQuantity}
              >
                <CirclePlus className={styles.buttonIcon} size={18} />
              </button>
            </div>
          </div>
          <p>{product.description}</p>
          <button className={styles.addToCartBtn} onClick={handleAddToCart}>
            Add to Bag
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
