import { useEffect, useState } from "react";
import NavigationBar from "../../components/layout/NavigationBar.jsx";
import { useUser } from "../../hooks/useUser.js";
import { getReservations } from "../../features/reservation.js";
import ReservationBox from "./ReservationBox.jsx";
// import useAuth from "../../hooks/useAuth.js";

function ViewReservation() {
  // const { user } = useAuth();
  const user = useUser();
  const token = localStorage.getItem("token");
  const [reservations, setReservations] = useState();
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
          // console.log(onlyDate);
          return (
            <ReservationBox key={item._id} reservationDate={onlyDate} username={item.user.name} coworkingSpaceName={item.space.name} reservationId={item._id} />
          );
        })}
      </>
    );
  }

  return (
    <>
      <NavigationBar />
      {/* <ConfirmPopup/> */}
      <div className={`flex mt-[60px] mx-[60px] text-[52px] text-black font-[700]`}>Co-working Space Reservation</div>
      <div className={`p-2 flex mt-[60px] mx-[60px] text-[18px] font-[500]`}>
        <div className="flex-1">Reservation date</div>
        <div className="flex-2">Username</div>
        <div className="flex-3">Co-working Space</div>
        <div className="flex-1 flex justify-center">Action</div>
      </div>
      {displayReservations(reservations)}
    </>
  );
}

export default ViewReservation;
