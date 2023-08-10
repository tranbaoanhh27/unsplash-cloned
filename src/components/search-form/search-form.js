import styles from "./search-form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchForm = ({ className }) => {
    return (
        <form className={`${styles.searchForm} ${className}`}>
            <div className={styles.inputContainer}>
                <FontAwesomeIcon
                    icon="fa-solid fa-magnifying-glass"
                    className={styles.searchIcon}
                    title="Search Unsplash"
                />
                <input className="form-control" type="text" placeholder="Search Images" title="Search Unsplash" />
            </div>
        </form>
    );
};

export default SearchForm;
