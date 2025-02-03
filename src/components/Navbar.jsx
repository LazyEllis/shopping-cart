import { ShoppingBag } from "lucide-react";
import NavItem from "./NavItem";

const links = [
  { to: "/", content: "Home" },
  { to: "shop", content: "Shop" },
  { to: "cart", content: <ShoppingBag />, label: "Cart" },
];

const Navbar = () => (
  <nav>
    <ul>
      {links.map((link) => (
        <NavItem key={link.content} {...link} />
      ))}
    </ul>
  </nav>
);

export default Navbar;
