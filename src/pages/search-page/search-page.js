import { useParams } from "react-router-dom";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import styles from "./search-page.module.css";
import API from "../../utils/api";
import PhotosGrid from "../../components/photos-grid/photos-grid";

const SearchPage = () => {
    const params = useParams();
    document.title = `${params.keyword} Pictures | Download Free Images on Unsplash`;

    const validOrientations = ["landscape", "portrait", "squarish"];
    const [orientation, setOrientation] = useState("landscape");

    const validSortMode = ["relevant", "latest"];
    const [sortBy, setSortBy] = useState("relevant");

    const [photos, setPhotos] = useState([]);
    const [totalPhotos, setTotalPhotos] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [errorMessage, setErrorMessage] = useState(null);

    const changeOrientationHandler = (event) => {
        setOrientation(event.target.value);
    };

    const changeSortModeHandler = (event) => {
        setSortBy(event.target.value);
    };

    const loadNextPage = async () => {
        if (page < totalPages) {
            try {
                const data = await API.searchPhotos(params.keyword, page + 1, sortBy, orientation);
                setPhotos([...photos, ...data.photos]);
                setTotalPhotos(data.totalPhotos);
                setPage(data.page);
                setTotalPages(data.totalPages);
                setErrorMessage(null);
            } catch (error) {
                setErrorMessage("Sorry! Something went wrong while fetching more photos...");
            }
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const data = await API.searchPhotos(params.keyword, 1, sortBy, orientation);
                setPhotos(data.photos);
                setTotalPhotos(data.totalPhotos);
                setPage(1);
                setTotalPages(data.totalPages);
                setErrorMessage(null);
            } catch (error) {
                setErrorMessage("Sorry! Something went wrong while searching photos...");
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.keyword, orientation, sortBy]);

    return (
        <>
            <div
                className={`${styles.topBar} d-flex flex-column flex-xl-row gap-4 justify-content-between align-items-start align-items-xl-center`}>
                <div className="d-flex flex-column gap-1 justify-content-start">
                    <h1>
                        You searched for "<em>{params.keyword}</em>"
                    </h1>
                    <b>{`Total ${totalPhotos} results`}</b>
                </div>
                <form className="d-flex flex-row gap-2">
                    <FormControl>
                        <InputLabel id="orientation-label">Orientation</InputLabel>
                        <Select
                            labelId="orientation-label"
                            id="orientation"
                            value={orientation}
                            label="Orientation"
                            onChange={changeOrientationHandler}
                            sx={{ fontSize: 14 }}>
                            {validOrientations.map((value) => (
                                <MenuItem key={value} value={value} sx={{ fontSize: 14 }}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="sort-label">Sort by</InputLabel>
                        <Select
                            labelId="sort-label"
                            id="sort"
                            value={sortBy}
                            label="Sort by"
                            onChange={changeSortModeHandler}
                            sx={{ fontSize: 14 }}>
                            {validSortMode.map((value) => (
                                <MenuItem key={value} value={value} sx={{ fontSize: 14 }}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </form>
            </div>
            {!errorMessage && (
                <>
                    <PhotosGrid photos={photos} />
                    {page < totalPages && (
                        <div className={styles.loadMoreButton} onClick={loadNextPage}>
                            {`Load more (${photos.length}/${totalPhotos})`}
                        </div>
                    )}
                </>
            )}
            {errorMessage && <div className="alert alert-warning text-center mx-5 my-4">{errorMessage}</div>}
        </>
    );
};

export default SearchPage;
