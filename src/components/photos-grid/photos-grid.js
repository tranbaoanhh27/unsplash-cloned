import PhotoGridItem from "../photo-grid-item/photo-grid-item";
import IconButton from "../icon-button/icon-button";
import styles from "./photos-grid.module.css";

const PhotosGrid = ({ photos = [] }) => {
    const columns = [[], [], []];

    let i = 0;
    while (i < photos.length) {
        columns[0].push(photos[i++]);
        if (i >= photos.length) break;
        columns[1].push(photos[i++]);
        if (i >= photos.length) break;
        columns[2].push(photos[i++]);
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <IconButton
                className={styles.backToTopButton}
                fontawesomeClass="fa-solid fa-angle-up"
                title="Back To Top"
                onClick={scrollToTop}
            />
            <div className="container-fluid row">
                {columns.map((column, index) => (
                    <div key={index} className="col-md-4 col-sm-12 pe-0">
                        {column.map((photo) => (
                            <PhotoGridItem key={photo.id} photo={photo} />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default PhotosGrid;
