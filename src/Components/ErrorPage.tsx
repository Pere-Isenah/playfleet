import React from 'react'
import { useRouteError } from "react-router-dom";


const ErrorPage = () => {
  const error = useRouteError();
  console.error(error)
  return (
    <div id="error-page" className="p-3 text-center align-text-center">
      <h1 className="text-3xl font-bold p-2">Oops!</h1>
      <p className="text-2xl p-2">Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="font-bold text-4xl p-2">{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

export default ErrorPage