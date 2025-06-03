import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { NAV_LINKS, PANELS } from "../constants";
import { classNames } from "../utils/utils";
import SearchPanel from "./SearchPanel";
import BagPanel from "./BagPanel";
import MainContent from "./MainContent";
import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => {
  const [activePanel, setActivePanel] = useState(PANELS.NONE);
  const [bag, setBag] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const buttonsRef = useRef([]);
  const panelRef = useRef(null);

  const location = useLocation();

  // Panel Handlers
  const handlePanelToggle = (panel) => {
    setActivePanel(activePanel === panel ? PANELS.NONE : panel);
  };

  const handlePanelClose = () => {
    setActivePanel(PANELS.NONE);
  };

  // Bag Handlers
  const handleAddToBag = (id) => {
    const isInBag = bag.some((product) => product.id === parseInt(id));

    if (isInBag) {
      const updatedBag = bag.map((product) =>
        product.id === parseInt(id)
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      setBag(updatedBag);
    } else {
      setBag([...bag, { id: parseInt(id), quantity: 1 }]);
    }
  };

  const handleDelete = (id) => {
    setBag(bag.filter((item) => item.id !== id));
  };

  const handleIncrement = (id) => {
    setBag(
      bag.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setBag(
      bag.map((item) =>
        item.quantity > 1 && item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Derived State
  const isPanelFlyout = activePanel !== PANELS.MENU;

  const bagWithProductDetails = bag.map((item) => ({
    ...item,
    ...products.find((product) => product.id === item.id),
  }));

  const mainClassName = classNames(
    location.pathname !== "/" && styles.subPageMain,
    (loading || error || children) && styles.loadingOrError
  );

  const panelClassName = classNames(
    styles.panel,
    isPanelFlyout && styles.flyout
  );

  // Effects
  useEffect(() => {
    if (activePanel === PANELS.NONE) return;

    const handleClickOutside = (e) => {
      if (
        buttonsRef.current.some((ref) => ref.contains(e.target)) ||
        panelRef.current.contains(e.target)
      )
        return;

      setActivePanel(PANELS.NONE);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activePanel]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products", {
          mode: "cors",
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      <nav className={styles.navContainer}>
        <div className={styles.nav}>
          <Link to="/" className={styles.navBrand}>
            Shopzilla
          </Link>
          <ul className={`${styles.navList} ${styles.desktopMenu}`}>
            {NAV_LINKS.map((item) => (
              <li key={item.name} className={styles.navItem}>
                <Link to={item.href} className={styles.navLink}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className={styles.navList}>
            <li>
              <button
                className={styles.navButton}
                aria-label="Search Shopzilla"
                onClick={() => handlePanelToggle(PANELS.SEARCH)}
                ref={(ref) => (buttonsRef.current[0] = ref)}
              >
                <Search size={17} />
              </button>
            </li>
            <li>
              <button
                className={styles.navButton}
                aria-label="Shopping Bag"
                onClick={() => handlePanelToggle(PANELS.BAG)}
                ref={(ref) => (buttonsRef.current[1] = ref)}
              >
                <ShoppingBag size={17} />
              </button>
            </li>
            <li className={styles.hamburgerNavItem}>
              <button
                className={styles.navButton}
                aria-label="Menu"
                onClick={() => handlePanelToggle(PANELS.MENU)}
                ref={(ref) => (buttonsRef.current[2] = ref)}
              >
                <Menu size={17} />
              </button>
            </li>
          </ul>
        </div>

        {activePanel !== PANELS.NONE && (
          <>
            <div className={panelClassName} ref={panelRef} data-testid="panel">
              <button
                className={styles.closeButton}
                aria-label="Close"
                onClick={handlePanelClose}
              >
                <X size={18} />
              </button>

              {activePanel === PANELS.SEARCH && (
                <SearchPanel onClose={handlePanelClose} products={products} />
              )}

              {activePanel === PANELS.BAG && (
                <BagPanel
                  bag={bagWithProductDetails}
                  onClose={handlePanelClose}
                  loading={loading}
                  error={error}
                />
              )}

              {activePanel === PANELS.MENU && (
                <ul className={styles.mobileNavList}>
                  {NAV_LINKS.map((item) => (
                    <li key={item.name} className={styles.mobileNavItem}>
                      <Link
                        to={item.href}
                        onClick={handlePanelClose}
                        className={styles.mobileNavLink}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {isPanelFlyout && (
              <div data-testid="blur" className={styles.blur}></div>
            )}
          </>
        )}
      </nav>
      <main className={mainClassName || undefined}>
        {children ?? (
          <MainContent
            loading={loading}
            error={error}
            context={{
              products,
              bag: bagWithProductDetails,
              handleAddToBag,
              handleDelete,
              handleIncrement,
              handleDecrement,
            }}
          />
        )}
      </main>
    </>
  );
};

export default Layout;
