import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// This rule ensures the aria-label prop is required when a React element is passed in.
const stringRequiredIfContentIsElement = (props, propName, componentName) => {
  if (typeof props.content === "object" && props[propName] === undefined) {
    return new Error(
      `The prop \`${propName}\` is marked as required in \`${componentName}\` but its value is \`${props[propName]}\``,
    );
  }
};

const NavItem = ({ to, content, label }) => (
  <li>
    <Link to={to} aria-label={label}>
      {content}
    </Link>
  </li>
);

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: stringRequiredIfContentIsElement,
};

export default NavItem;
