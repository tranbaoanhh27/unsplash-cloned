import { useNavigate, useRouteError } from "react-router-dom";
import styles from "./error-page.module.css";
import { useCallback } from "react";

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    let title = error.data.title || "Page not found";
    let message = error.data.message || "Hmm, the page you were looking for doesn't seem to exist anymore.";

    const goBackHome = useCallback(() => {
        navigate("/");
    }, []);

    return (
        <div className={styles.container}>
            <img
                src="https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?auto=format&fit=fill&w=1600&h=1200&q=20"
                alt="Background"
            />
            <div className={styles.overlay}>
                <div className={styles.sign}>{title}</div>
                <p>{message}</p>
                <button onClick={goBackHome}>Back to Unsplash</button>
            </div>
        </div>
    );
};

export default ErrorPage;
