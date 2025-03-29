import { Search, CircleX } from "lucide-react";
import styles from "../styles/SearchForm.module.css";

const SearchForm = ({ onReset, onChange, value }) => (
  <form className={styles.searchForm} onReset={onReset}>
    <input
      type="text"
      name="search"
      id="search"
      placeholder="Search"
      value={value}
      onChange={onChange}
      className={styles.searchInput}
    />
    <button
      type="reset"
      aria-label="Clear Search"
      className={styles.searchButton}
      disabled={!value}
    >
      {value && <CircleX size={20} />}
    </button>
    <button
      type="submit"
      aria-label="Submit Search"
      className={styles.searchButton}
      disabled={!value}
    >
      <Search size={20} />
    </button>
  </form>
);

export default SearchForm;
