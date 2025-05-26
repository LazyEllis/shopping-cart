import { useState, useEffect } from "react";
import { useIsDesktop } from "../utils/useIsDesktop";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { NAV_LINKS, PANELS } from "../constants";
import SearchPanel from "./SearchPanel";
import BagPanel from "./BagPanel";
import MobileMenu from "./MobileMenu";
import Flyout from "./Flyout";
import MainContent from "./MainContent";
import styles from "../styles/Layout.module.css";
import flyoutStyles from "../styles/Flyout.module.css";

const Layout = ({ children }) => {
  const [activePanel, setActivePanel] = useState(PANELS.NONE);
  const [bag, setBag] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isDesktop = useIsDesktop();
  const location = useLocation();

  const bagWithProductDetails = bag.map((item) => ({
    ...item,
    ...products.find((product) => product.id === item.id),
  }));

  const mainClassNames = [
    location.pathname !== "/" ? styles.subPageMain : "",
    loading || error || children ? styles.loadingOrError : "",
  ]
    .join(" ")
    .trim();

  const handlePanelToggle = (panel) => {
    setActivePanel(activePanel === panel ? PANELS.NONE : panel);
  };

  const handlePanelClose = () => {
    setActivePanel(PANELS.NONE);
  };

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

  useEffect(() => {
    if (
      activePanel === PANELS.NONE ||
      activePanel === PANELS.MENU ||
      !isDesktop
    )
      return;

    const handleClickOutside = (e) => {
      if (
        e.target.closest(`.${flyoutStyles.flyout}`) ||
        e.target.closest(`.${styles.navButton}`)
      )
        return;

      setActivePanel(PANELS.NONE);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activePanel, isDesktop]);

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
            <li className={styles.navItem}>
              <button
                className={styles.navButton}
                aria-label="Search Shopzilla"
                onClick={() => handlePanelToggle(PANELS.SEARCH)}
              >
                <Search size={17} />
              </button>
            </li>
            <li className={styles.navItem}>
              <button
                className={styles.navButton}
                aria-label="Shopping Bag"
                onClick={() => handlePanelToggle(PANELS.BAG)}
              >
                <ShoppingBag size={17} />
              </button>
            </li>
            <li className={`${styles.navItem} ${styles.hamburgerMenu}`}>
              <button
                className={styles.navButton}
                aria-label="Menu"
                onClick={() => handlePanelToggle(PANELS.MENU)}
              >
                <Menu size={17} />
              </button>
            </li>
          </ul>
        </div>

        {activePanel === PANELS.SEARCH &&
          (isDesktop ? (
            <Flyout>
              <SearchPanel onClose={handlePanelClose} products={products} />
            </Flyout>
          ) : (
            <MobileMenu onClose={handlePanelClose}>
              <SearchPanel onClose={handlePanelClose} products={products} />
            </MobileMenu>
          ))}

        {activePanel === PANELS.BAG &&
          (isDesktop ? (
            <Flyout>
              <BagPanel
                bag={bagWithProductDetails}
                onClose={handlePanelClose}
                loading={loading}
                error={error}
              />
            </Flyout>
          ) : (
            <MobileMenu onClose={handlePanelClose}>
              <BagPanel
                bag={bagWithProductDetails}
                onClose={handlePanelClose}
                loading={loading}
                error={error}
              />
            </MobileMenu>
          ))}

        {activePanel === PANELS.MENU && (
          <MobileMenu onClose={handlePanelClose}>
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
          </MobileMenu>
        )}
      </nav>
      <main className={mainClassNames || undefined}>
        {children ? (
          children
        ) : (
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
