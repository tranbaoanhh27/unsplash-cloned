import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/root-layout";
import TopicsLayout, { loader as topicsLoader } from "./layouts/topics-layout";
import ErrorPage from "./pages/error-page/error-page";
import TopicOverviewPage, { loader as topicPhotosLoader } from "./pages/topic-overview-page/topic-overview-page";
import HomePage, { loader as homeLoader } from "./pages/home-page/home-page";
import SearchPage from "./pages/search-page/search-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
                loader: homeLoader,
            },
            {
                path: "t",
                element: <TopicsLayout />,
                loader: topicsLoader,
                children: [{ path: ":slug", element: <TopicOverviewPage />, loader: topicPhotosLoader }],
            },
            {
                path: "s",
                children: [{ path: "photos/:keyword", element: <SearchPage /> }],
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
