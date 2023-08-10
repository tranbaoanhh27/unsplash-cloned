import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/root-layout";
import TopicsLayout, { loader as topicsLoader } from "./layouts/topics-layout";
import ErrorPage from "./pages/error-page/error-page";
import TopicOverviewPage, { loader as topicPhotosLoader } from "./pages/topic-overview-page/topic-overview-page";
import HomePage from "./pages/home-page/home-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
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
