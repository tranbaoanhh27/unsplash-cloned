import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
    return (
        <nav className={`navbar navbar-expand-sm ${styles.container}`}>
            <div className="container-fluid d-flex flex-row justify-content-start">
                <Link className="navbar-brand" href="/">
                    <img alt="Unsplash Logo" src={Logo} style={{ width: 30, height: 30 }} title="Unsplash Home" />
                </Link>
                <form
                    className={`${styles.searchForm} d-flex my-2 my-lg-0 flex-grow-1 justify-content-start align-items-center`}
                    title="Search Unsplash">
                    <div className={styles.inputContainer}>
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className={styles.searchIcon} />
                        <input className="form-control" type="text" placeholder="Search Images" />
                    </div>
                </form>
                <button
                    className={`${styles.toggleButton} navbar-toggler d-lg-none`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar-links"
                    aria-controls="navbar-links"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <FontAwesomeIcon icon="fa-solid fa-bars" />
                </button>
                <div className="collapse navbar-collapse flex-grow-0" id="navbar-links">
                    <ul className="navbar-nav mt-2 mt-lg-0 gap-1 d-flex align-items-center">
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to="/login">
                                Log in
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <button className={`${styles.submitPhotoButton} nav-link`}>Submit a photo</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
