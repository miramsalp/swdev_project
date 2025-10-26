// https://reactrouter.com/6.28.0/start/tutorial

import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/home/Landing.jsx";
import Register from "../pages/auth/Register.jsx";
import Login from "../pages/auth/Login.jsx";
import ViewReservation from "../pages/reservations/ViewReservation.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/view",
    element: <ViewReservation />,
  },
]);

export default router;
