import { CircleMinus, CirclePlus } from "lucide-react";
import { formatCurrency, formatProductText } from "../utils/utils";
import styles from "../styles/BagItem.module.css";

const BagItem = ({ item, onIncrement, onDecrement, onDelete }) => (
  <li className={styles.item}>
    <img src={item.product.image} alt="" className={styles.itemImage} />
    <div className={styles.itemContent}>
      <div className={styles.itemDescription}>
        <div>{formatProductText(item.product.title)}</div>
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
            <div aria-live="polite">{item.quantity}</div>
            <button
              className={styles.quantityToggle}
              onClick={onIncrement}
              aria-label="Increase quantity"
            >
              <CirclePlus className={styles.buttonIcon} size={18} />
            </button>
          </div>
          <div>{formatCurrency(item.quantity * item.product.price)}</div>
        </div>
      </div>
      <button onClick={onDelete} className={styles.removeItemBtn}>
        Remove
      </button>
    </div>
  </li>
);

export default BagItem;
