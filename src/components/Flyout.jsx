import styles from "../styles/Flyout.module.css";

const Flyout = ({ children }) => (
  <>
    <div className={styles.flyout}>{children}</div>
    <div className={styles.blur}></div>
  </>
);

export default Flyout;
