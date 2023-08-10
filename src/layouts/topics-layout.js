import { Link, Outlet, json, useLoaderData, useNavigate, useParams } from "react-router-dom";
import API from "../utils/api";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";

const TopicsLayout = () => {
    const data = useLoaderData();
    const params = useParams();
    const navigate = useNavigate();

    const [topics, setTopics] = useState(data.topics || []);
    const [page, setPage] = useState(data.page);
    const [topic, setTopic] = useState(params.slug || data.topics[0].slug);

    // If no topic slug is provided, navigate to the first topic
    useEffect(() => {
        if (!params.slug) navigate(`/t/${data.topics[0].slug}`);
        else {
            const topicTitle = topics.find((topic) => topic.slug === params.slug).title;
            document.title = `${topicTitle} | Unsplash`;
        }
    }, [data.topics, navigate, params.slug, topics]);

    const handleChangeTopic = async (event, newTopic) => {
        setTopic(newTopic);
        const newTopicIndex = topics.findIndex((topic) => topic.slug === newTopic);
        document.title = `${topics[newTopicIndex].title} | Unsplash`;
        if (newTopicIndex >= topics.length - 10) {
            try {
                const data = await API.getTopics(page + 1);
                setPage(data.page);
                setTopics((curTopics) => [...curTopics, ...data.topics]);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <Tabs
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                onChange={handleChangeTopic}
                value={topic}
                TabIndicatorProps={{ style: { backgroundColor: "black" } }}
                textColor="inherit"
                sx={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    paddingTop: 1,
                }}>
                {topics.map((topic) => (
                    <Tab
                        key={topic.id}
                        label={topic.title}
                        value={topic.slug}
                        LinkComponent={Link}
                        to={`/t/${topic.slug}`}
                        sx={{ textTransform: "none", fontWeight: 400, fontFamily: "inherit" }}
                    />
                ))}
            </Tabs>
            <Outlet />
        </>
    );
};

export default TopicsLayout;

export const loader = async () => {
    try {
        const data = await API.getTopics();
        return data;
    } catch {
        throw json({ title: "We're sorry!", message: "We currently cannot get data from server..." });
    }
};
