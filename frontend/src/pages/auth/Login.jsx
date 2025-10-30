import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/layout/NavigationBar.jsx";
import InputBar from "../../components/common/InputBar.jsx";
import KeyboardButton from "../../components/common/KeyboardButton.jsx";
import { useAuthContext } from "../../contexts/AuthContext.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, error } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin({ email, password });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className={`mt-[60px] ml-[60px] text-[48px] font-[700] text-black`}>Login</div>
      <div className={` ml-[60px] text-[32px] font-[700] text-gray-500`}>Please login to create reservation</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ml-[60px]">
        <InputBar width={"600px"} label={"Email"} type="email" onChange={(e) => setEmail(e.target.value)} />
        <InputBar
          width={"600px"}
          label={"Password"}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === "Enter") handleSubmit(e);
          }}
        />
        <KeyboardButton width={"200px"} height="50px" label={"Submit"} onClick={handleSubmit} />
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </>
  );
}

export default Login;
