import { useEffect, useState } from "react";
import NavigationBar from "../../components/layout/NavigationBar.jsx";
import { useUser } from "../../hooks/useUser.js";
import { getReservations } from "../../features/reservation.js";
import ReservationBox from "./ReservationBox.jsx";
import { useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth.js";

function ViewReservation() {
  // const { user } = useAuth();
  const user = useUser();
  const token = localStorage.getItem("token");
  const [reservations, setReservations] = useState();
  const navigate = useNavigate();
  const fetchReservations = async () => {
    const result = await getReservations(token);
    setReservations(result);
  };
  useEffect(() => {
    // console.log(user);
    fetchReservations();
    // console.log(reservations);
  }, [user]);
  
  function displayReservations(reservations) {
    return (
      <>
        {reservations?.data?.map((item) => {
          const isoDate = item.reservationDate;
          const onlyDate = isoDate.split("T")[0];
          console.log(item);
          return (
            <ReservationBox key={item._id} reservationDate={onlyDate} username={item.user.name} coworkingSpaceName={item.space.name} reservationId={item._id}/>
          );
        })}
      </>
    );
  }

  return (
    <div className="mb-50">
      <NavigationBar />
      <div className={`flex mt-[60px] mx-[60px] text-[52px] text-black font-[700]`}>Co-working Space Reservation</div>
      <div className={`p-2 flex mt-[60px] mx-[60px] text-[18px] font-[500]`}>
        <div className="flex-1">Reservation date</div>
        <div className="flex-2">Username</div>
        <div className="flex-3">Co-working Space</div>
        <div className="flex-1 flex justify-center">Action</div>
      </div>
      {displayReservations(reservations)}
      <div
        className="fixed right-[60px] bottom-[60px] flex justify-center items-center h-16 w-32 bg-green-600 hover:bg-green-700 hover:scale-104 text-[18px] font-[500] rounded-full text-white select-none "
        onClick={() => {if(token) navigate("/reservations/create")}}
      >
        Add new
      </div>
    </div>
  );
}

export default ViewReservation;
