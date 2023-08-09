import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    let title = error.data.title || "We're sorry!";
    let message = error.data.message || "Something went wrong...";

    return (
        <>
            <h1>{title}</h1>
            <p>{message}</p>
        </>
    );
};

export default ErrorPage;
