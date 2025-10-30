import NavigationBar from "../../components/layout/NavigationBar";
import DatePicker from "react-datepicker";
import KeyboardButton from "../../components/common/KeyboardButton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReservation, updateReservation } from "../../features/reservation";
import { useNavigate } from "react-router-dom";
import SuccessPopup from "../../components/layout/SuccessPopup";

function EditReservation({}) {
  const token = localStorage.getItem("token");
  const [reservation, setReservation] = useState(null);
  const [reservationDate, setReservationDate] = useState(new Date());
  const [reservationDateBefore, setReservationDateBefore] = useState(new Date());
  const [selectedSpaceObject, setSelectedSpaceObject] = useState({});
  const [HandleSuccessPopup, setHandleSuccessPopup] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleEditReservation = async () => {
    if(reservationDateBefore === reservationDate) {
      setHandleSuccessPopup(!HandleSuccessPopup);
      return;
    }
    const data = {reservationDate: reservationDate}
    const result = await updateReservation(token, id, data);
    setHandleSuccessPopup(!HandleSuccessPopup);
    
  }
  console.log(id);
  useEffect(() => {
    const fetchReservation = async () => {
      const result = await getReservation(token, id);
      setReservation(result.data);
      setReservationDate(result?.data?.reservationDate);
      setReservationDateBefore(result?.data?.reservationDate);
      setSelectedSpaceObject(result?.data?.space);
      // console.log(result?.data?.space);
    }
    fetchReservation();
  }, [])
  return (
    <>
      <NavigationBar />
      {HandleSuccessPopup ? <SuccessPopup topic={"Your changes have been saved."} state={HandleSuccessPopup} setState={setHandleSuccessPopup} handler={() => navigate("/reservations/view")}/> : <></>}
      <div className={`flex mt-[60px] mx-[60px] text-[52px] text-black font-[700]`}>Co-working Space Reservation</div>
      <div className="flex mt-[60px] mx-[60px]">
        <div className="flex-1">
          <div className={`text-[20px] text-black font-[500]`}>Select the place</div>
          <div className="w-[500px] h-[50px] p-2 border-3 border-gray-400 focus:border-black rounded-md ">{selectedSpaceObject?.name}</div>
          <div className="flex mt-[20px]">
            <DatePicker
              className="w-[500px] h-[50px] p-2 border-3 border-gray-400 focus:border-black rounded-md "
              selected={reservationDate}
              onChange={(date) => {if(date > new Date()) setReservationDate(date)}}
            />
          </div>
          <div className="flex mt-[20px]">
            <KeyboardButton width={"200px"} height="50px" label={"Submit"} onClick={handleEditReservation} />
          </div>
        </div>
        <div className={`flex-1 bg-white p-6 border-3 rounded-md "h-full"`}>
          {selectedSpaceObject ? (
            <>
              <div>{selectedSpaceObject?.name}</div>
              <div>
                address: {selectedSpaceObject?.address}, {selectedSpaceObject?.province}, {selectedSpaceObject?.district}, {selectedSpaceObject?.postalcode}
              </div>
              <div>Tel: {selectedSpaceObject?.tel}</div>
              <div>
                Open: {selectedSpaceObject?.openTime} - {selectedSpaceObject?.closeTime}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default EditReservation;
