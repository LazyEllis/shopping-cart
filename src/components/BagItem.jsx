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
            <button className={styles.quantityToggle} onClick={onDecrement}>
              <CircleMinus className={styles.buttonIcon} size={18} />
            </button>
            <div>{item.quantity}</div>
            <button className={styles.quantityToggle} onClick={onIncrement}>
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
