import { Outlet } from "react-router-dom";
import LoadingIcon from "./LoadingIcon";
import styles from "../styles/MainContent.module.css";

const MainContent = ({ loading, error, context }) => {
  if (loading) {
    return <LoadingIcon />;
  } else if (error) {
    return <div className={styles.error}>{error.message}</div>;
  }

  return <Outlet context={context} />;
};

export default MainContent;
