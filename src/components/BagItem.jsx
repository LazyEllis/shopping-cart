import { CircleMinus, CirclePlus } from "lucide-react";
import { formatCurrency, formatProductText } from "../utils/utils";
import styles from "../styles/BagItem.module.css";

const BagItem = ({ item, onIncrement, onDecrement, onDelete }) => (
  <li className={styles.item}>
    <img src={item.image} alt="" className={styles.itemImage} />
    <div className={styles.itemContent}>
      <div className={styles.itemDescription}>
        <h2 className={styles.itemTitle}>{formatProductText(item.title)}</h2>
        <div className={styles.priceControls}>
          <div className={styles.quantitySetter}>
            <button
              className={styles.quantityToggle}
              onClick={onDecrement}
              aria-label="Decrease quantity"
              disabled={item.quantity === 1}
            >
              <CircleMinus className={styles.buttonIcon} size={18} />
            </button>
            <div>{item.quantity}</div>
            <button
              className={styles.quantityToggle}
              onClick={onIncrement}
              aria-label="Increase quantity"
            >
              <CirclePlus className={styles.buttonIcon} size={18} />
            </button>
          </div>
          <div>{formatCurrency(item.quantity * item.price)}</div>
        </div>
      </div>
      <button onClick={onDelete} className={styles.removeItemBtn}>
        Remove
      </button>
    </div>
  </li>
);

export default BagItem;
