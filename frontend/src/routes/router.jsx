// https://reactrouter.com/6.28.0/start/tutorial

import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/home/Landing.jsx";
import Register from "../pages/auth/Register.jsx";
import Login from "../pages/auth/Login.jsx";
import ViewReservation from "../pages/reservations/ViewReservation.jsx";
import CreateReservation from "../pages/reservations/CreateReservation.jsx";
import EditReservation from "../pages/reservations/EditReservation.jsx";
import Payment from "../pages/payment/Payment.jsx";

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
    path: "/reservations/view",
    element: <ViewReservation />,
  },
  {
    path: "/reservations/create",
    element: <CreateReservation />,
  },
  {
    path: "/reservations/edit/:id",
    element: <EditReservation />,
  },
  {
    path: "/payment",
    element: <Payment />
  }
]);

export default router;
