import { AxiosError } from "axios";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (error instanceof AxiosError) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  console.error(error);
  return (
    <div id="error-page" className="p-3 text-center align-text-center">
      <h1 className="text-3xl font-bold p-2">Oops!</h1>
      <p className="text-2xl p-2">Sorry, an unexpected error has occurred.</p>
      <p>
        {error instanceof AxiosError && (
          <i className="font-bold text-4xl p-2">{errorMessage}</i>
        )}
      </p>
    </div>
  );
};

export default ErrorPage;

