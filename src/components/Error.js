import { useRouteError } from "react-router";
const Error = () => {
    const error = useRouteError();
    console.log("Error Page", error);
    return (
        <div>
            <h1>Something went wrong!</h1>
            {/* <h2>Page Not Found!</h2> */}
            <h3>{error?.error?.message || error?.message || error?.statusText || "Unknown error occurred"}</h3>
        </div>
    );
}

export default Error;