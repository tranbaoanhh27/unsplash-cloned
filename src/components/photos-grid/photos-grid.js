import PhotoGridItem from "../photo-grid-item/photo-grid-item";

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

    return (
        <div className="container-fluid row">
            {columns.map((column, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-sm-12 pe-0">
                    {column.map((photo) => (
                        <PhotoGridItem key={photo.id} photo={photo} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PhotosGrid;
