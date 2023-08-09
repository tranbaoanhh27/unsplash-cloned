import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/root-layout";
import TopicsLayout, { loader as topicsLoader } from "./layouts/topics-layout";
import ErrorPage from "./pages/error-page";
import TopicOverviewPage from "./pages/topic-overview-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <TopicsLayout />,
                loader: topicsLoader,
            },
            {
                path: "t",
                element: <TopicsLayout />,
                loader: topicsLoader,
                children: [{ path: ":slug", element: <TopicOverviewPage /> }],
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
