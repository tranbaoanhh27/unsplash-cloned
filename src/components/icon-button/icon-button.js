import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./icon-button.module.css";

const IconButton = ({
    fontawesomeClass = "fa-solid fa-thumbs-up",
    onClick = () => {},
    className = "",
    iconClassName = "",
    ...rest
}) => {
    return (
        <div className={`${styles.container} ${className}`} onClick={onClick} {...rest}>
            <FontAwesomeIcon className={`${styles.icon} ${iconClassName}`} icon={fontawesomeClass} />
        </div>
    );
};

export default IconButton;
