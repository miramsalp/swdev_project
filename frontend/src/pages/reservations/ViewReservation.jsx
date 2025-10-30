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
  console.log(user);
  const token = localStorage.getItem("token");
  const [reservations, setReservations] = useState();
  const navigate = useNavigate();
  const fetchReservations = async () => {
    const result = await getReservations(token);
    const sortedByDate = result.data.sort((a, b) => new Date(b.reservationDate) - new Date(a.reservationDate));
    setReservations(result);
  };
  const addNewButton = () => {
    return (
      <div
        className="fixed right-[60px] bottom-[60px] flex justify-center items-center h-16 w-32 bg-green-600 hover:bg-green-700 hover:scale-104 text-[18px] font-[500] rounded-full text-white select-none "
        onClick={() => {
          if (token) navigate("/reservations/create");
        }}
      >
        Add new
      </div>
    );
  };
  const displayUser = () => {
    return (
      <div className="flex">
        <div className="flex-1 flex mt-[60px] mx-[60px] border-3 rounded-md p-2">
          <div className="flex-3">
            <div className="font-[600]">
              {user?.email} ({user?.name})
            </div>
            <div className="">
              Wallet: <span className="bg-gray-100 p-1 rounded-md">{user?.balance}</span>
            </div>
          </div>
          <div className="flex-1 flex justify-end items-center">
            <div className="text-white font-[600] bg-pink-600 px-4 py-2 mr-2 rounded-4xl select-none hover:bg-pink-700 hover:scale-104 active:scale-100">
              Top up
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex-2"></div>
      </div>
    );
  };
  useEffect(() => {
    fetchReservations();
  }, [user]);

  function displayReservations(reservations) {
    return (
      <>
        {reservations?.data?.map((item) => {
          const isoDate = item.reservationDate;
          const onlyDate = isoDate.split("T")[0];
          return (
            <ReservationBox
              key={item._id}
              reservationDate={onlyDate}
              username={item.user.name}
              coworkingSpaceName={item.space.name}
              reservationId={item._id}
              isExpired={item.isExpired}
            />
          );
        })}
      </>
    );
  }

  return (
    <div className="mb-50">
      <NavigationBar />
      <div className={`flex mt-[60px] mx-[60px] text-[52px] text-black font-[700]`}>Co-working Space Reservation</div>

      {displayUser()}
      <div className={`p-2 flex mt-[30px] mx-[60px] text-[18px] font-[500]`}>
        <div className="flex-1">Reservation date</div>
        <div className="flex-2">Username</div>
        <div className="flex-4">Co-working Space</div>
        <div className="flex-1 flex justify-center">Action</div>
      </div>
      {displayReservations(reservations)}
      {addNewButton()}
    </div>
  );
}

export default ViewReservation;
