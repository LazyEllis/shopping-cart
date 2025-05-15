import { Link } from "react-router-dom";
import { formatProductText } from "../utils/utils";
import styles from "../styles/BagPanelItem.module.css";

const BagPanelItem = ({ products, item, onRedirect }) => {
  const product = products.find((product) => product.id === item.id);

  return (
    <li className={styles.cartListItem}>
      <Link
        to={`/store/${item.id}`}
        onClick={onRedirect}
        className={styles.product}
      >
        <img src={product.image} alt="" className={styles.productImage} />
        <div className={styles.productText}>
          {formatProductText(product.title)}
          {item.quantity > 1 && (
            <div className={styles.productQuantity}>&times;{item.quantity}</div>
          )}
        </div>
      </Link>
    </li>
  );
};

export default BagPanelItem;
