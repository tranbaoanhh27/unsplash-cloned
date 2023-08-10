import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchForm from "../search-form/search-form";

const Navbar = () => {
    return (
        <nav className={`navbar navbar-expand-sm ${styles.container}`}>
            <div className="container-fluid d-flex flex-row justify-content-start">
                <Link className="navbar-brand" href="/">
                    <img alt="Unsplash Logo" src={Logo} style={{ width: 30, height: 30 }} title="Unsplash Home" />
                </Link>
                <SearchForm className="d-flex my-2 my-lg-0 flex-grow-1 justify-content-start align-items-center" />
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
                    <ul className="navbar-nav mt-2 mt-lg-0 gap-3 d-flex align-items-center">
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? `active ${styles.activeNavLink}` : ""}`
                                }
                                to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? `active ${styles.activeNavLink}` : ""}`
                                }
                                to="/t">
                                Browse Photos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <Link className={`${styles.loginButton} nav-link`} to="/login">
                                Log in to Unsplash
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
