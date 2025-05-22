import { LoaderCircle } from "lucide-react";
import styles from "../styles/LoadingIcon.module.css";

const LoadingIcon = () => (
  <LoaderCircle className={styles.loader} aria-label="Loading" role="status" />
);

export default LoadingIcon;
