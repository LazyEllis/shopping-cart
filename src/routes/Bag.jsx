import { Link, useOutletContext } from "react-router-dom";
import { formatCurrency } from "../utils/utils";
import BagItem from "../components/BagItem";
import styles from "../styles/Bag.module.css";

const Bag = () => {
  const { bag, handleIncrement, handleDecrement, handleDelete } =
    useOutletContext();

  const totalPrice = bag.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.heading}>
          {bag.length > 0 ? "Review your bag." : "Your bag is empty."}
        </h1>
        <div>Free delivery and free returns.</div>
      </header>
      {bag.length > 0 ? (
        <>
          <ul className={styles.bagItems}>
            {bag.map((item) => (
              <BagItem
                item={item}
                onIncrement={() => handleIncrement(item.id)}
                onDecrement={() => handleDecrement(item.id)}
                onDelete={() => handleDelete(item.id)}
                key={item.id}
              />
            ))}
          </ul>
          <div className={styles.totalPrice}>
            <div>Your Total</div>
            <div>{formatCurrency(totalPrice)}</div>
          </div>
        </>
      ) : (
        <Link to="/store" className={styles.continueShoppingBtn}>
          Continue Shopping
        </Link>
      )}
    </div>
  );
};

export default Bag;
