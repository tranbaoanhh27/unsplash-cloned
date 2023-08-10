import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./icon-button.module.css";
import { Link } from "react-router-dom";

const IconButton = ({
    fontawesomeClass = "fa-solid fa-thumbs-up",
    onClick = () => {},
    className = "",
    linkTo = null,
    ...rest
}) => {
    return (
        <Link to={linkTo}>
            <div className={`${styles.container} ${className}`} onClick={onClick} {...rest}>
                <FontAwesomeIcon className={`${styles.icon}`} icon={fontawesomeClass} />
            </div>
        </Link>
    );
};

export default IconButton;
