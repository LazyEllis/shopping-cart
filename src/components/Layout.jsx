import { useState, useEffect } from "react";
import { useIsDesktop } from "../utils/useIsDesktop";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Menu } from "lucide-react";
import SearchPanel from "./SearchPanel";
import BagPanel from "./BagPanel";
import MobileMenu from "./MobileMenu";
import Flyout from "./Flyout";
import MainContent from "./MainContent";
import styles from "../styles/Layout.module.css";
import flyoutStyles from "../styles/Flyout.module.css";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Store", href: "store" },
  { name: "Men's Clothing", href: "store?category=men's%20clothing" },
  { name: "Jewelery", href: "store?category=jewelery" },
  { name: "Electronics", href: "store?category=electronics" },
  { name: "Women's Clothing", href: "store?category=women's%20clothing" },
];

const PANELS = {
  NONE: "none",
  SEARCH: "search",
  BAG: "bag",
  MENU: "menu",
};

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
            {navigation.map((item) => (
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
                aria-label="Search"
                data-role="Search"
                onClick={() => handlePanelToggle(PANELS.SEARCH)}
              >
                <Search size={17} />
              </button>
            </li>
            <li className={styles.navItem}>
              <button
                className={styles.navButton}
                aria-label="Bag"
                data-role="Bag"
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
              {navigation.map((item) => (
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
            context={{ products, bag, bagWithProductDetails, setBag }}
          />
        )}
      </main>
    </>
  );
};

export default Layout;
