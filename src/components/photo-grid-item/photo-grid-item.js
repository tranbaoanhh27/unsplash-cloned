import styles from "./photo-grid-item.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import IconButton from "../icon-button/icon-button";
import { useCallback } from "react";
import { saveAs } from "file-saver";

import "react-loading-skeleton/dist/skeleton.css";
import "react-lazy-load-image-component/src/effects/blur.css";

const PhotoGridItem = ({ photo }) => {
    const downloadPhoto = useCallback(
        (event) => {
            // Prevent trigger the openPhoto function on parent element
            event.stopPropagation();
            saveAs(photo.urls.raw, `${photo.slug}.png`);
        },
        [photo]
    );

    const openPhoto = useCallback(() => {
        window.open(photo.urls.raw, "_blank");
    }, [photo]);

    return (
        <div className={`${styles.container} w-100 my-2`} onClick={openPhoto}>
            <LazyLoadImage
                src={photo.urls.small}
                alt={photo.description}
                width="100%"
                height="auto"
                placeholder={<Skeleton width="100%" height={photo.height} />}
                effect="blur"
            />
            <div className={styles.overlay} title="Open in new tab">
                <div className={styles.footer}>
                    <div className={styles.authorInfo}>
                        <img src={photo.user.profile_image.small} alt={photo.user.username} />
                        <p>{photo.user.name}</p>
                    </div>
                    <IconButton
                        className={styles.downloadButton}
                        iconClassName={styles.downloadButtonIcon}
                        title="Download photo"
                        fontawesomeClass="fa-solid fa-cloud-arrow-down"
                        onClick={downloadPhoto}
                    />
                </div>
            </div>
        </div>
    );
};

export default PhotoGridItem;
