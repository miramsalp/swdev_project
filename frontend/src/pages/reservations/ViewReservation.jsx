import { useEffect, useState } from "react";
import NavigationBar from "../../components/layout/NavigationBar.jsx";
import { useUser } from "../../hooks/useUser.js";
import { getReservation } from "../../features/reservation.js";
// import useAuth from "../../hooks/useAuth.js";

function ViewReservation() {
  // const { user } = useAuth();
  const user = useUser();
  const token = localStorage.getItem("token");
  const [reservations, setReservations] = useState(); 
  const fetchReservations = async () => {
    const result = await getReservation(token, user._id);
    console.log(result);
  }
  useEffect(() => {
    console.log(user);
    fetchReservations();
  },[user])
  
  return (
    <>
      <NavigationBar />
    </>
  );
}

export default ViewReservation;
