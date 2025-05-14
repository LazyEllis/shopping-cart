import { Link, useNavigate } from "react-router-dom";
import { Search, CircleX, ArrowRight } from "lucide-react";
import { formatProductText } from "../utils/utils";
import styles from "../styles/SearchForm.module.css";

const SearchPanel = ({ onReset, onChange, onRedirect, value, results }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/store?search=${value}`);
    onRedirect();
  };

  return (
    <div className={styles.searchPanel}>
      <form
        className={styles.searchForm}
        onReset={onReset}
        onSubmit={handleSubmit}
      >
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
      {results.length > 0 && (
        <div className={styles.searchResults}>
          <h2 className={styles.heading}>Suggested Links</h2>
          <ul className={styles.resultList}>
            {results.map((result) => (
              <li key={result.id}>
                <Link
                  to={`store/${result.id}`}
                  onClick={onRedirect}
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
