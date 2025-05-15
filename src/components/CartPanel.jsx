import { Link } from "react-router-dom";
import LoadingIcon from "./LoadingIcon";
import styles from "../styles/CartPanel.module.css";
import BagPanelItem from "./BagPanelItem";

const CartPanel = ({ cart, products, onRedirect, loading, error }) => {
  if (loading || error) {
    return (
      <div className={styles.container}>
        <LoadingIcon />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.cartTitle}>
          {cart.length > 0 ? "Bag" : "Your Bag is empty."}
        </h2>
        {cart.length > 0 ? (
          <ul className={styles.cartList}>
            {cart.map((item) => (
              <BagPanelItem
                products={products}
                item={item}
                onRedirect={onRedirect}
                key={item.id}
              />
            ))}
          </ul>
        ) : (
          <Link to="store" onClick={onRedirect} className={styles.storeLink}>
            Shop Now
          </Link>
        )}
      </div>
      {cart.length > 0 && (
        <div className={styles.panelRight}>
          <Link to="/shop/bag" onClick={onRedirect} className={styles.btn}>
            Review Bag
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPanel;
