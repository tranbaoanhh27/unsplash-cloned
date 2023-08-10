import { Link } from "react-router-dom";
import styles from "./photo-grid-item.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Skeleton from "react-loading-skeleton";

var count = 0;

const PhotoGridItem = ({ photo }) => {
    return (
        <div className={`${styles.container} w-100 my-2`}>
            <LazyLoadImage
                src={photo.urls.small}
                alt={photo.description}
                width="100%"
                height="auto"
                placeholder={<Placeholder />}
                effect="blur"
                afterLoad={() => console.log(++count)}
            />
            <div className={styles.overlay} title={photo.description}>
                <div className={styles.footer}>
                    <img src={photo.user.profile_image.small} alt={photo.user.username} />
                    <Link to={photo.user.portfolio_url || null}>{photo.user.name}</Link>
                </div>
            </div>
        </div>
    );
};

const Placeholder = () => {
    return (
        <div style={{ width: "100%", height: "400px" }}>
            <Skeleton width="100%" height="100%" baseColor="#ff0000" />
        </div>
    );
};

export default PhotoGridItem;
