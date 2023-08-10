import { json, useLoaderData, useParams } from "react-router-dom";
import API from "../../utils/api";
import PhotosGrid from "../../components/photos-grid/photos-grid";
import { useEffect, useState } from "react";
import usePageBottom from "../../hooks/use-page-bottom";

const TopicOverviewPage = () => {
    const data = useLoaderData();
    const params = useParams();

    const [photos, setPhotos] = useState(data.photos || []);
    const [page, setPage] = useState(data.page || 1);
    const [reachedBottom, resetReachedBottom] = usePageBottom();

    useEffect(() => {
        const fetchMorePhotos = async () => {
            try {
                const data = await API.getPhotos(params.slug, page + 1);
                setPhotos((curPhotos) => [...curPhotos, ...data.photos]);
                setPage(data.page);
                resetReachedBottom();
            } catch (error) {
                throw json({ title: "We're sorry", message: "We currently cannot fetch photos data..." });
            }
        };

        if (reachedBottom) fetchMorePhotos();
    }, [params.slug, reachedBottom, page, resetReachedBottom]);

    useEffect(() => {
        setPhotos(data.photos);
        setPage(data.page);
    }, [data]);

    return <PhotosGrid photos={photos} />;
};

export default TopicOverviewPage;

export const loader = async ({ request, params }) => {
    try {
        const data = await API.getPhotos(params.slug);
        return data;
    } catch (error) {
        throw json({ title: "We're sorry", message: "We currently cannot fetch photos data..." });
    }
};
