import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ErrorPage from './Components/ErrorPage';
import GameDetails, { loader as gameDetailLoader } from './Pages/GameDetails';
import Home from './Pages/Home';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // Default route
        element: <Home />,
      },
      {
        path: 'game/:gameId',
        element: <GameDetails />,
        loader: gameDetailLoader,
      },
      {
        path: 'platform/:platformId',
        element: <Home />, // Render Home and let Home handle the conditional rendering
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
