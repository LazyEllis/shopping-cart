import { Link } from "react-router-dom";
import LoadingIcon from "./LoadingIcon";
import styles from "../styles/BagPanel.module.css";
import BagPanelItem from "./BagPanelItem";

const BagPanel = ({ bag, onRedirect, loading, error }) => {
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
        <h2 className={styles.bagTitle}>
          {bag.length > 0 ? "Bag" : "Your Bag is empty."}
        </h2>
        {bag.length > 0 ? (
          <ul className={styles.bagList}>
            {bag.map((item) => (
              <BagPanelItem item={item} onRedirect={onRedirect} key={item.id} />
            ))}
          </ul>
        ) : (
          <Link to="store" onClick={onRedirect} className={styles.storeLink}>
            Shop Now
          </Link>
        )}
      </div>
      {bag.length > 0 && (
        <div className={styles.panelRight}>
          <Link to="/shop/bag" onClick={onRedirect} className={styles.btn}>
            Review Bag
          </Link>
        </div>
      )}
    </div>
  );
};

export default BagPanel;
