import KeyboardButton from "../../components/common/KeyboardButton";
import { IoTrashBinSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { deleteReservation } from "../../features/reservation";
import DeleteConfirmPopup from "./DeleteConfirmPopup.jsx";
import { useState } from "react";

function ReservationBox({ reservationDate, username, coworkingSpaceName, reservationId }) {
  const [deletePopup, setDeletePopup] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const token = localStorage.getItem("token");
  const deleteButtonHandler = async () => {
    const result = await deleteReservation(token, reservationId);
    setIsDelete(!isDelete);
    console.log(result);
    return;
  };

  return (
    <>
      {deletePopup ? (
        <DeleteConfirmPopup
          state={deletePopup}
          setState={setDeletePopup}
          topic={"Do you want to decline your reserve?"}
          content={`${reservationDate}, ${username}, ${coworkingSpaceName}`}
          confirmHandler={deleteButtonHandler}
        />
      ) : (
        <></>
      )}
      {isDelete ? (
        <></>
      ) : (
        <div className={`p-2 flex mt-[6px] mx-[60px] h-20 items-center border-3 rounded-md hover:bg-gray-50 hover:scale-101`}>
          <div className="flex-1">{reservationDate}</div>
          <div className="flex-2">{username}</div>
          <div className="flex-3">{coworkingSpaceName}</div>
          <div className="flex-1 flex justify-center gap-4">
            <KeyboardButton width={"56px"} height={"56px"} label={<MdEdit size={24} />} />
            <KeyboardButton width={"56px"} height={"56px"} label={<IoTrashBinSharp size={24} color="red" />} onClick={() => setDeletePopup(!deletePopup)} />
          </div>
        </div>
      )}
      <div className="fixed right-[60px] bottom-[60px] flex justify-center items-center h-16 w-32 bg-green-600 hover:bg-green-700 hover:scale-104 text-[18px] font-[500] rounded-full text-white select-none ">
        Add new
      </div>
    </>
  );
}

export default ReservationBox;
