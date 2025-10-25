import NavigationBar from "../../components/layout/NavigationBar.jsx";
import KeyboardButton from "../../components/common/KeyboardButton.jsx";


function Landing() {
  return (
    <>
      <NavigationBar />

      <div className={`flex mt-[60px] ml-[60px] text-[52px] text-black font-[700]`}>Co-working Space Reservation</div>
      <div className={`flex mt-[60px] ml-[60px] text-[24px] text-gray-500`}>Please choose from option below</div>
      <div className={`flex flex-col mt-[20px] ml-[60px] gap-6`}>
        <KeyboardButton width={"380px"} height={"90px"} label={"Create new reservation"} fontSize={"22px"}/>
        <KeyboardButton width={"380px"} height={"90px"} label={"View my reservation"} fontSize={"22px"}/>
      </div>

    </>
  )
}

export default Landing;