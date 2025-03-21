import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Search, ShoppingBag, Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import styles from "../styles/Layout.module.css";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Store", href: "store" },
  { name: "Electronics", href: "store?categories=electronics" },
  { name: "Jewelry", href: "store?categories=jewelry" },
  { name: "Men's Clothing", href: "store?categories=men-clothing" },
  { name: "Women's Clothing", href: "store?categories=women-clothing" },
];

const Layout = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const handleNavbarOpen = () => setIsNavbarOpen(true);

  const handleNavbarClose = () => setIsNavbarOpen(false);

  return (
    <>
      <nav className={styles.nav}>
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
            <button className={styles.navButton} aria-label="Search">
              <Search />
            </button>
          </li>
          <li className={styles.navItem}>
            <button className={styles.navButton} aria-label="Cart">
              <ShoppingBag />
            </button>
          </li>
          <li className={`${styles.navItem} ${styles.hamburgerMenu}`}>
            <button
              className={styles.navButton}
              aria-label="Menu"
              onClick={handleNavbarOpen}
            >
              <Menu />
            </button>
          </li>
        </ul>
        {isNavbarOpen && (
          <MobileMenu onClose={handleNavbarClose}>
            <ul className={styles.mobileNavList}>
              {navigation.map((item) => (
                <li key={item.name} className={styles.mobileNavItem}>
                  <Link to={item.href} className={styles.mobileNavLink}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </MobileMenu>
        )}
      </nav>
      <main>
        <Outlet context={[cart, setCart]} />
      </main>
    </>
  );
};

export default Layout;
