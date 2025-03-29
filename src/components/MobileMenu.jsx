import { X } from "lucide-react";
import styles from "../styles/MobileMenu.module.css";
import PropTypes from "prop-types";

const MobileMenu = ({ onClose, children }) => (
  <div className={styles.mobileMenu}>
    <button
      className={styles.closeButton}
      aria-label="Cancel"
      onClick={onClose}
    >
      <X size={18} />
    </button>
    {children}
  </div>
);

MobileMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default MobileMenu;
