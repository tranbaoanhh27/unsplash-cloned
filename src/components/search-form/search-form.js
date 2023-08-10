import { useRef } from "react";
import styles from "./search-form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const SearchForm = ({ className }) => {
    const keywordRef = useRef();
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        navigate(`/s/photos/${keywordRef.current.value}`);
    };

    return (
        <form className={`${styles.searchForm} ${className}`} onSubmit={submitHandler}>
            <div className={styles.inputContainer}>
                <FontAwesomeIcon
                    icon="fa-solid fa-magnifying-glass"
                    className={styles.searchIcon}
                    title="Search Unsplash"
                />
                <input
                    ref={keywordRef}
                    className="form-control"
                    type="text"
                    placeholder="Search Images"
                    title="Search Unsplash"
                />
            </div>
        </form>
    );
};

export default SearchForm;
