import styles from "./photo-grid-item.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import IconButton from "../icon-button/icon-button";
import { useCallback } from "react";
import { saveAs } from "file-saver";

import "react-loading-skeleton/dist/skeleton.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useState } from "react";

var count = 0;

const PhotoGridItem = ({ photo }) => {
    const [loaded, setLoaded] = useState(false);

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
        <SkeletonTheme baseColor="#999999">
            {!loaded && <Skeleton width="100%" height="50vh" />}
            <div className={`${styles.container} w-100 my-2`} onClick={openPhoto}>
                <LazyLoadImage
                    src={photo.urls.small}
                    alt={photo.description}
                    width="100%"
                    height="auto"
                    effect="blur"
                    threshold={200}
                    placeholder={<Skeleton width="100%" height="50vh" />}
                    afterLoad={() => {
                        console.log(`Loaded ${++count} images`);
                        setLoaded(true);
                    }}
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
        </SkeletonTheme>
    );
};

export default PhotoGridItem;
