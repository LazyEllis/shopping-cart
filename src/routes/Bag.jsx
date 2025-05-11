import { Link, useOutletContext } from "react-router-dom";
import { formatCurrency } from "../utils/utils";
import BagItem from "../components/BagItem";
import styles from "../styles/Bag.module.css";

const Bag = () => {
  const { products, cart, setCart } = useOutletContext();

  const cartWithProductDetails = cart.map((item) => ({
    ...item,
    product: products.find((product) => product.id === item.id),
  }));

  const totalPrice = cartWithProductDetails.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );

  const handleDelete = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleIncrement = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCart(
      cart.map((item) =>
        item.quantity > 1 && item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>
          {cart.length > 0 ? "Review your bag." : "Your bag is empty."}
        </h1>
        <div>Free delivery and free returns.</div>
      </div>
      {cart.length > 0 ? (
        <>
          <ul className={styles.bagItems}>
            {cartWithProductDetails.map((item) => (
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
