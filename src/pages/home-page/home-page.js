import styles from "./home-page.module.css";
import SearchForm from "../../components/search-form/search-form";

const HomePage = () => {
    return (
        <div className={styles.container}>
            <img
                src="https://images.unsplash.com/photo-1690055899078-63be27a01cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8fA%3D%3D&dpr=1&auto=format%2Ccompress&fit=crop&w=1399&h=594 1x, https://images.unsplash.com/photo-1690055899078-63be27a01cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8fA%3D%3D&dpr=2&auto=format%2Ccompress&fit=crop&w=1399&h=594 2x"
                alt="Background"
            />
            <div className={styles.overlay}>
                <p className={styles.brandName}>Unsplash</p>
                <p>The internet's source for visuals.</p>
                <p>Powered by creators everywhere.</p>
                <SearchForm className={styles.searchForm} />
            </div>
        </div>
    );
};

export default HomePage;
