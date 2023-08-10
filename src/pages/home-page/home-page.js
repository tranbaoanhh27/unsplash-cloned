import styles from "./home-page.module.css";
import SearchForm from "../../components/search-form/search-form";
import API from "../../utils/api";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const DEFAULT_BACKGROUND_URL =
    "https://images.unsplash.com/photo-1690055899078-63be27a01cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8fA%3D%3D&dpr=1&auto=format%2Ccompress&fit=crop&w=1399&h=594 1x, https://images.unsplash.com/photo-1690055899078-63be27a01cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8fA%3D%3D&dpr=2&auto=format%2Ccompress&fit=crop&w=1399&h=594 2x";

const HomePage = () => {
    document.title = "Home | Unsplash";
    const photos = useLoaderData();

    const [backgroundUrl, setBackgroundUrl] = useState(DEFAULT_BACKGROUND_URL);

    useEffect(() => {
        const timer = setTimeout(() => {
            const randomPhoto = photos[Math.floor(Math.random() * photos.length) % photos.length];
            setBackgroundUrl(randomPhoto.urls.full);
        }, 5000);

        // Clean-up function
        return () => clearTimeout(timer);
    }, [backgroundUrl, photos]);

    return (
        <div className={styles.container}>
            <img src={backgroundUrl} alt="Background" />
            <div className={styles.blackCover}></div>
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

export const loader = async () => {
    try {
        const photos = await API.getRandomPhoto("background", 10);
        return photos;
    } catch (error) {
        return DEFAULT_BACKGROUND_URL;
    }
};
