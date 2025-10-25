import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/layout/NavigationBar.jsx";
import InputBar from "../../components/common/InputBar.jsx";
import KeyboardButton from "../../components/common/KeyboardButton.jsx";
import { useAuthContext } from "../../contexts/AuthContext.jsx";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { handleRegister, error } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await handleRegister({ name, email, phone: tel, password });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className={`mt-[60px] ml-[60px] text-[48px] font-[700] text-black`}>Register</div>
      <div className={` ml-[60px] text-[32px] font-[700] text-gray-500`}>Please create an account</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ml-[60px] mb-[40px]">
        <InputBar width={"600px"} label={"Name"} onChange={(e) => setName(e.target.value)} />
        <InputBar width={"600px"} label={"Email"} type="email" onChange={(e) => setEmail(e.target.value)} />
        <InputBar width={"600px"} label={"Phone number"} type="tel" onChange={(e) => setTel(e.target.value)} />
        <InputBar width={"600px"} label={"Password"} type="password" onChange={(e) => setPassword(e.target.value)} />
        <InputBar width={"600px"} label={"Confirm your password"} type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
        <KeyboardButton width={"200px"} height="50px" label={"Submit"} onClick={handleSubmit}/>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </>
  );
}

export default Register;
