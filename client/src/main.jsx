import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import SocketProvider from './context/socketProvider/SocketProvider';
import Lobby from './pages/Lobby/Looby';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Lobby></Lobby>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </React.StrictMode>
);
