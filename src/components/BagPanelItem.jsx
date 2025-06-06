import { Link } from "react-router-dom";
import { formatProductText } from "../utils/utils";
import styles from "../styles/BagPanelItem.module.css";

const BagPanelItem = ({ item, onClose }) => (
  <li className={styles.bagListItem}>
    <Link to={`/store/${item.id}`} onClick={onClose} className={styles.product}>
      <img src={item.image} alt="" className={styles.productImage} />
      <div className={styles.productText}>
        {formatProductText(item.title)}
        {item.quantity > 1 && (
          <div
            className={styles.productQuantity}
            aria-label={`quantity ${item.quantity}`}
          >
            &times;{item.quantity}
          </div>
        )}
      </div>
    </Link>
  </li>
);

export default BagPanelItem;
