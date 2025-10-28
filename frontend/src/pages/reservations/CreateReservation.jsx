import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/layout/NavigationBar";
import { getSpaces } from "../../features/space";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// https://www.npmjs.com/package/react-datepicker
// https://reactdatepicker.com/
import KeyboardButton from "../../components/common/KeyboardButton";
import { addReservation } from "../../features/reservation";
function CreateReservation() {
  const token = localStorage.getItem("token");
  const [coworkingSpaces, setCoworkingSpaces] = useState({});
  const [selectedCoworkingSpace, setSelectedCoworkingSpace] = useState("");
  const [selectedSpaceObject, setSelectedSpaceObject] = useState({});
  // datepicker
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  /*
  selectSpaceObject
{
  _id: "68fa046a5bad8e9bbf1511a6",
  name: "Pattaya WorkSpace",
  address: "111 Beach Rd",
  district: "Bang Lamung",
  province: "Chonburi",
  postalcode: "20150",
  tel: "038-999-888",
  openTime: "08:00",
  closeTime: "22:00",
  hourlyRate: 90,
  balance: 0,
  reservations: []
};
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(selectedCoworkingSpace);
      await addReservation(token, startDate, selectedCoworkingSpace);
      navigate("/reservations/view");
    } catch (err) {
      // alert(err)
      if (err?.response?.data?.message?.includes("has already made 3 reservations")) {
        alert("Cannot create reservation more than 3");
      } else {
        alert("An unexpected error occured")
      }
      // console.log(err)
    }
  };

  const displayCoworkingSpaceOption = () => {
    return coworkingSpaces?.data?.map((space) => {
      return (
        <option key={space._id} value={space._id}>
          {space.name}
        </option>
      );
    });
  };
  useEffect(() => {
    const fetchCoworkingSpaces = async () => {
      const result = await getSpaces();
      setCoworkingSpaces(result);

      console.log(result);
    };
    fetchCoworkingSpaces();
  }, []);
  useEffect(() => {
    //?. (optional chaining)
    const selectedSpaceObject = coworkingSpaces?.data?.find((space) => space._id === selectedCoworkingSpace);
    console.log(selectedSpaceObject);
    setSelectedSpaceObject(selectedSpaceObject);
  }, [selectedCoworkingSpace]);
  return (
    <>
      <NavigationBar />
      <div className={`flex mt-[60px] mx-[60px] text-[52px] text-black font-[700]`}>Co-working Space Reservation</div>
      <div className="flex mt-[60px] mx-[60px]">
        <div className="flex-1">
          <div className={`text-[20px] text-black font-[500]`}>Select the place</div>
          <select
            name="co-working-space"
            id="co-working-space"
            className="w-[500px] h-[50px] p-2 border-3 border-gray-400 focus:border-black rounded-md "
            onChange={(event) => setSelectedCoworkingSpace(event.target.value)}
          >
            <option value=""></option>
            {displayCoworkingSpaceOption()}
          </select>
        </div>
        <div className={`flex-1 bg-white p-6 border-3 rounded-md ${selectedSpaceObject ? "h-full" : "h-30"}`}>
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
      <div className="flex mx-[60px]">
        <DatePicker 
          className="w-[500px] h-[50px] p-2 border-3 border-gray-400 focus:border-black rounded-md "
          selected={startDate} 
          onChange={(date) => setStartDate(date)} 
        />
      </div>
      <div className="flex mt-[60px] mx-[60px]">
        <KeyboardButton width={"200px"} height="50px" label={"Submit"} onClick={handleSubmit}/>
      </div>
    </>
  );
}

export default CreateReservation;
