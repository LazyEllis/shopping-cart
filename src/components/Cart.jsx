import { Link } from "react-router-dom";
import styles from "../styles/Cart.module.css";

const Cart = () => (
  <div className={styles.container}>
    <h2 className={styles.cartTitle}>Your Bag is empty.</h2>
    <Link to="store" className={styles.storeLink}>
      Shop Now
    </Link>
  </div>
);

export default Cart;
