import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, CircleX, ArrowRight } from "lucide-react";
import {
  matchesSearchTerm,
  formatProductText,
  encodeQuery,
} from "../utils/utils";
import styles from "../styles/SearchPanel.module.css";

const SearchPanel = ({ onClose, products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const searchResults = products.filter((product) =>
    matchesSearchTerm(formatProductText(product.title), searchTerm)
  );

  const handleChange = (e) => setSearchTerm(e.target.value);

  const handleReset = () => setSearchTerm("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/store?search=${encodeQuery(searchTerm)}`);
    setSearchTerm("");
    onClose();
  };

  return (
    <div className={styles.searchPanel}>
      <form
        className={styles.searchForm}
        onReset={handleReset}
        onSubmit={handleSubmit}
      >
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search"
          aria-label="Search for products"
          value={searchTerm}
          onChange={handleChange}
          className={styles.searchInput}
        />
        <button
          type="reset"
          aria-label="Clear Search"
          className={styles.searchButton}
          disabled={!searchTerm}
        >
          {searchTerm && <CircleX size={20} />}
        </button>
        <button
          type="submit"
          aria-label="Submit Search"
          className={styles.searchButton}
          disabled={!searchTerm}
        >
          <Search size={20} />
        </button>
      </form>
      {searchResults.length > 0 && (
        <div className={styles.searchResults}>
          <h2 className={styles.heading}>Suggested Links</h2>
          <ul className={styles.resultList}>
            {searchResults.map((result) => (
              <li key={result.id}>
                <Link
                  to={`store/${result.id}`}
                  onClick={onClose}
                  className={styles.resultLink}
                >
                  <ArrowRight className={styles.arrow} />
                  <div>{formatProductText(result.title)}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPanel;
