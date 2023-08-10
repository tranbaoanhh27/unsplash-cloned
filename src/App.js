import { createBrowserRouter, RouterProvider, BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/root-layout";
import TopicsLayout, { loader as topicsLoader } from "./layouts/topics-layout";
import ErrorPage from "./pages/error-page";
import TopicOverviewPage, { loader as topicPhotosLoader } from "./pages/topic-overview-page/topic-overview-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "t",
                element: <TopicsLayout />,
                loader: topicsLoader,
                children: [{ path: ":slug", element: <TopicOverviewPage />, loader: topicPhotosLoader }],
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
