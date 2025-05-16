import { Link } from "react-router-dom";

import styles from "../styles/Error.module.css";
import { ChevronRight } from "lucide-react";

const Error = () => (
  <div className={styles.container}>
    <h1 className={styles.heading}>
      The page you're looking for can't be found.
    </h1>
    <Link to="/" className={styles.link}>
      <span>Take me home</span> <ChevronRight size={16} />
    </Link>
  </div>
);

export default Error;
