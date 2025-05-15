import { useState, useEffect } from "react";
import { useIsDesktop } from "../utils/useIsDesktop";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { matchesSearchTerm } from "../utils/utils";
import SearchForm from "./SearchForm";
import BagPanel from "./BagPanel";
import MobileMenu from "./MobileMenu";
import Flyout from "./Flyout";
import MainContent from "./MainContent";
import styles from "../styles/Layout.module.css";
import flyoutStyles from "../styles/Flyout.module.css";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Store", href: "store" },
  { name: "Men's Clothing", href: "store?category=men's clothing" },
  { name: "Jewelery", href: "store?category=jewelery" },
  { name: "Electronics", href: "store?category=electronics" },
  { name: "Women's Clothing", href: "store?category=women's clothing" },
];

const Layout = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isBagPanelOpen, setIsBagPanelOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [bag, setBag] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isDesktop = useIsDesktop();
  const location = useLocation();

  const mainClassNames = [
    location.pathname !== "/" ? styles.subPageMain : "",
    loading || error ? styles.loadingOrError : "",
  ]
    .join(" ")
    .trim();

  const searchResults = products.filter((product) =>
    matchesSearchTerm(product.title, searchTerm)
  );

  const handleNavbarOpen = () => setIsNavbarOpen(true);

  const handleNavbarClose = () => setIsNavbarOpen(false);

  const handleSearchBarOpen = () => setIsSearchBarOpen(true);

  const handleSearchBarClose = () => {
    setIsSearchBarOpen(false);
    setSearchTerm("");
  };

  const handleBagPanelOpen = () => setIsBagPanelOpen(true);

  const handleBagPanelClose = () => setIsBagPanelOpen(false);

  const handleChange = (e) => setSearchTerm(e.target.value);

  const handleReset = () => setSearchTerm("");

  useEffect(() => {
    if ((!isSearchBarOpen && !isBagPanelOpen) || !isDesktop) return;

    const closeFlyout = (e) => {
      if (e.target.closest(`.${flyoutStyles.flyout}`)) {
        return;
      } else if (
        e.target.closest(`.${styles.navButton}`)?.dataset.role === "Search"
      ) {
        isBagPanelOpen && handleBagPanelClose();
      } else if (
        e.target.closest(`.${styles.navButton}`)?.dataset.role === "Bag"
      ) {
        isSearchBarOpen && handleSearchBarClose();
      } else {
        isSearchBarOpen ? handleSearchBarClose() : handleBagPanelClose();
      }
    };

    document.addEventListener("mousedown", closeFlyout);
    return () => document.removeEventListener("mousedown", closeFlyout);
  }, [isBagPanelOpen, isDesktop, isSearchBarOpen]);

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
                onClick={
                  isSearchBarOpen ? handleSearchBarClose : handleSearchBarOpen
                }
              >
                <Search size={17} />
              </button>
            </li>
            <li className={styles.navItem}>
              <button
                className={styles.navButton}
                aria-label="Bag"
                data-role="Bag"
                onClick={
                  isBagPanelOpen ? handleBagPanelClose : handleBagPanelOpen
                }
              >
                <ShoppingBag size={17} />
              </button>
            </li>
            <li className={`${styles.navItem} ${styles.hamburgerMenu}`}>
              <button
                className={styles.navButton}
                aria-label="Menu"
                onClick={handleNavbarOpen}
              >
                <Menu size={17} />
              </button>
            </li>
          </ul>
        </div>

        {isSearchBarOpen &&
          (isDesktop ? (
            <Flyout>
              <SearchForm
                onChange={handleChange}
                onReset={handleReset}
                onRedirect={handleSearchBarClose}
                value={searchTerm}
                results={searchResults}
              />
            </Flyout>
          ) : (
            <MobileMenu onClose={handleSearchBarClose}>
              <SearchForm
                onChange={handleChange}
                onReset={handleReset}
                onRedirect={handleSearchBarClose}
                value={searchTerm}
                results={searchResults}
              />
            </MobileMenu>
          ))}

        {isBagPanelOpen &&
          (isDesktop ? (
            <Flyout>
              <BagPanel
                bag={bag}
                products={products}
                onRedirect={handleBagPanelClose}
                loading={loading}
                error={error}
              />
            </Flyout>
          ) : (
            <MobileMenu onClose={handleBagPanelClose}>
              <BagPanel
                bag={bag}
                products={products}
                onRedirect={handleBagPanelClose}
                loading={loading}
                error={error}
              />
            </MobileMenu>
          ))}

        {isNavbarOpen && (
          <MobileMenu onClose={handleNavbarClose}>
            <ul className={styles.mobileNavList}>
              {navigation.map((item) => (
                <li key={item.name} className={styles.mobileNavItem}>
                  <Link
                    to={item.href}
                    onClick={handleNavbarClose}
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
        <MainContent
          loading={loading}
          error={error}
          context={{ products, bag, setBag }}
        />
      </main>
    </>
  );
};

export default Layout;
