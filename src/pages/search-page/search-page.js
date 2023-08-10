import { json, useParams } from "react-router-dom";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useReducer } from "react";
import styles from "./search-page.module.css";
import API from "../../utils/api";
import PhotosGrid from "../../components/photos-grid/photos-grid";

const SearchPage = () => {
    const params = useParams();
    document.title = `${params.keyword} Pictures | Download Free Images on Unsplash`;

    const validOrientations = ["landscape", "portrait", "squarish"];
    const validSortMode = ["relevant", "latest"];

    const [searchState, searchStateDispatch] = useReducer(reducer, {
        orientation: "landscape",
        sortBy: "relevant",
        page: 1,
        totalPages: 1,
        photos: [],
        totalPhotos: 0,
    });

    useEffect(() => {
        searchStateDispatch({ type: "RESET" });
    }, [params.keyword]);

    useEffect(() => {
        (async () => {
            try {
                const data = await API.searchPhotos(
                    params.keyword,
                    searchState.page,
                    searchState.sortBy,
                    searchState.orientation
                );
                searchStateDispatch({ type: "SET_ALL", data: data });
            } catch (error) {
                throw json({ title: "Server Error!", message: "We currently cannot get data from server..." });
            }
        })();
    }, [params.keyword, searchState.page, searchState.sortBy, searchState.orientation]);

    const loadNextPage = () => {
        searchStateDispatch({ type: "INCREASE_PAGE" });
    };

    const changeSortModeHandler = (event) => {
        searchStateDispatch({ type: "SET_SORT_BY", value: event.target.value });
    };

    const changeOrientationHandler = (event) => {
        searchStateDispatch({ type: "SET_ORIENTATION", value: event.target.value });
    };

    return (
        <>
            <div className={styles.topBar}>
                <div className="d-flex flex-column gap-1 justify-content-start">
                    <h1>
                        <em>{params.keyword}</em>
                    </h1>
                    <b>{`Total ${searchState.totalPhotos} results`}</b>
                </div>
                <form className="d-flex flex-row gap-2">
                    <FormControl>
                        <InputLabel id="orientation-label">Orientation</InputLabel>
                        <Select
                            labelId="orientation-label"
                            id="orientation"
                            value={searchState.orientation}
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
                            value={searchState.sortBy}
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
            <PhotosGrid photos={searchState.photos} />
            {searchState.page < searchState.totalPages && (
                <div className={styles.loadMoreButton} onClick={loadNextPage}>
                    {`Load more (${searchState.photos.length}/${searchState.totalPhotos})`}
                </div>
            )}
        </>
    );
};

export default SearchPage;

const reducer = (state, action) => {
    switch (action.type) {
        case "RESET":
            return {
                ...state,
                page: 1,
                totalPages: 1,
                photos: [],
                totalPhotos: 0,
            };

        case "SET_ALL":
            return {
                ...state,
                orientation: action.data.orientation,
                sortBy: action.data.sortMode,
                page: action.data.page,
                totalPages: action.data.totalPages,
                photos: [...state.photos, ...action.data.photos],
                totalPhotos: action.data.totalPhotos,
            };

        case "INCREASE_PAGE":
            return {
                ...state,
                page: state.page < state.totalPages ? state.page + 1 : state.page,
            };

        case "SET_SORT_BY":
            return {
                ...state,
                sortBy: action.value,
                page: 1,
                totalPages: 1,
                photos: [],
                totalPhotos: 0,
            };

        case "SET_ORIENTATION":
            return {
                ...state,
                orientation: action.value,
                page: 1,
                totalPages: 1,
                photos: [],
                totalPhotos: 0,
            };

        default:
            return { ...state };
    }
};
