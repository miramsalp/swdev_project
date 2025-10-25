import NavigationBar from "../../components/layout/NavigationBar.jsx";
import InputBar from "../../components/common/InputBar.jsx";
import KeyboardButton from "../../components/common/KeyboardButton.jsx";

function Register() {
  return (
    <>
      <NavigationBar />
      <div className={`mt-[60px] ml-[60px] text-[48px] font-[700] text-black`}>Register</div>
      <div className={` ml-[60px] text-[32px] font-[700] text-gray-500`}>Please create an account</div>
      <div className="flex flex-col gap-4 ml-[60px] mb-[40px]">
        <InputBar width={"600px"} label={"Name"} />
        <InputBar width={"600px"} label={"Email"} type="email" />
        <InputBar width={"600px"} label={"Phone number"} type="tel" />
        <InputBar width={"600px"} label={"Password"} type="password" />
        <InputBar width={"600px"} label={"Confirm your password"} type="password"/>
        <KeyboardButton width={"200px"} height="50px" label={"submit"}/>
      </div>
    </>
  );
}

export default Register;
