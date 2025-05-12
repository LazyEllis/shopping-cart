import { useState, useEffect } from "react";
import { useIsDesktop } from "../utils/useIsDesktop";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Menu } from "lucide-react";
import SearchForm from "./SearchForm";
import CartPanel from "./CartPanel";
import MobileMenu from "./MobileMenu";
import styles from "../styles/Layout.module.css";

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
  const [isCartPanelOpen, setIsCartPanelOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const isDesktop = useIsDesktop();
  const location = useLocation();

  const handleNavbarOpen = () => setIsNavbarOpen(true);

  const handleNavbarClose = () => setIsNavbarOpen(false);

  const handleSearchBarOpen = () => setIsSearchBarOpen(true);

  const handleSearchBarClose = () => setIsSearchBarOpen(false);

  const handleCartPanelOpen = () => setIsCartPanelOpen(true);

  const handleCartPanelClose = () => setIsCartPanelOpen(false);

  const handleChange = (e) => setSearchTerm(e.target.value);

  const handleReset = () => setSearchTerm("");

  useEffect(() => {
    if ((!isSearchBarOpen && !isCartPanelOpen) || !isDesktop) return;

    const closeFlyout = (e) => {
      if (!e.target.closest(`.${styles.flyout}`)) {
        isSearchBarOpen ? handleSearchBarClose() : handleCartPanelClose();
      }
    };

    document.addEventListener("mousedown", closeFlyout);
    return () => document.removeEventListener("mousedown", closeFlyout);
  }, [isCartPanelOpen, isDesktop, isSearchBarOpen]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products", {
        mode: "cors",
      });
      const data = await response.json();
      setProducts(data);
    };

    getProducts();
  }, []);

  return (
    <>
      <nav>
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
                onClick={handleSearchBarOpen}
              >
                <Search size={17} />
              </button>
            </li>
            <li className={styles.navItem}>
              <button
                className={styles.navButton}
                aria-label="Cart"
                onClick={handleCartPanelOpen}
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
            <div className={styles.flyout}>
              <SearchForm
                onChange={handleChange}
                onReset={handleReset}
                value={searchTerm}
              />
            </div>
          ) : (
            <MobileMenu onClose={handleSearchBarClose}>
              <SearchForm
                onChange={handleChange}
                onReset={handleReset}
                value={searchTerm}
              />
            </MobileMenu>
          ))}

        {isCartPanelOpen &&
          (isDesktop ? (
            <div className={styles.flyout}>
              <CartPanel
                cart={cart}
                products={products}
                onRedirect={handleCartPanelClose}
              />
            </div>
          ) : (
            <MobileMenu onClose={handleCartPanelClose}>
              <CartPanel
                cart={cart}
                products={products}
                onRedirect={handleCartPanelClose}
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
      <main className={location.pathname !== "/" ? styles.main : undefined}>
        <Outlet context={{ products, cart, setCart }} />
      </main>
    </>
  );
};

export default Layout;
