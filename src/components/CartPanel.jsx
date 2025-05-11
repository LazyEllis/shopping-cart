import { Link } from "react-router-dom";
import { formatProductText } from "../utils/utils";
import styles from "../styles/CartPanel.module.css";

const CartPanel = ({ cart, products }) => (
  <div className={styles.container}>
    <div>
      <h2 className={styles.cartTitle}>
        {cart.length > 0 ? "Bag" : "Your Bag is empty."}
      </h2>
      {cart.length > 0 ? (
        <ul className={styles.cartList}>
          {cart.map((entry) => {
            const cartProduct = products.find(
              (product) => product.id === entry.id
            );
            return (
              <li className={styles.cartListItem} key={entry.id}>
                <Link to={`/store/${entry.id}`} className={styles.product}>
                  <img
                    src={cartProduct.image}
                    alt=""
                    className={styles.productImage}
                  />
                  <div className={styles.productText}>
                    {formatProductText(cartProduct.title)}
                    {entry.quantity > 1 && (
                      <div className={styles.productQuantity}>
                        &times;{entry.quantity}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <Link to="store" className={styles.storeLink}>
          Shop Now
        </Link>
      )}
    </div>
    {cart.length > 0 && (
      <div className={styles.panelRight}>
        <Link to="/shop/bag" className={styles.btn}>
          Review Bag
        </Link>
      </div>
    )}
  </div>
);

export default CartPanel;
