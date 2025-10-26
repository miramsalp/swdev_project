
import KeyboardButton from "../../components/common/KeyboardButton";
import { IoTrashBinSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { deleteReservation } from "../../features/reservation";

function ReservationBox({reservationDate, username, coworkingSpaceName, action, reservationId}) {
  const token = localStorage.getItem("token");
  const deleteButtonHandler = async (reservationId) => {
    // const result = await deleteReservation(token, reservationId);
    // console.log(result);
    console.log(reservationId);
  }

  return (
      <div className={`p-2 flex mt-[6px] mx-[60px] h-20 items-center border-3 rounded-md hover:bg-gray-50 hover:scale-101`}>
        <div className="flex-1">{reservationDate}</div>
        <div className="flex-2">{username}</div>
        <div className="flex-3">{coworkingSpaceName}</div>
        <div className="flex-1 flex justify-center gap-4">
          <KeyboardButton width={"56px"} height={"56px"} label={<MdEdit size={24} />}/>
          <KeyboardButton width={"56px"} height={"56px"} label={<IoTrashBinSharp size={24} color="red"/>} onClick={() => deleteButtonHandler(reservationId)}/>
        </div>
      </div>
  );
}

export default ReservationBox;
