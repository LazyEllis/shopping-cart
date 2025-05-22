import { Link } from "react-router-dom";
import { formatProductText } from "../utils/utils";
import styles from "../styles/BagPanelItem.module.css";

const BagPanelItem = ({ item, onRedirect }) => (
  <li className={styles.bagListItem}>
    <Link
      to={`/store/${item.id}`}
      onClick={onRedirect}
      className={styles.product}
    >
      <img src={item.image} alt="" className={styles.productImage} />
      <div className={styles.productText}>
        {formatProductText(item.title)}
        {item.quantity > 1 && (
          <div className={styles.productQuantity}>&times;{item.quantity}</div>
        )}
      </div>
    </Link>
  </li>
);

export default BagPanelItem;
