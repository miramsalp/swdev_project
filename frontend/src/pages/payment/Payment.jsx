import { useState } from "react";
import NavigationBar from "../../components/layout/NavigationBar.jsx";
import InputBar from "../../components/common/InputBar.jsx";
import KeyboardButton from "../../components/common/KeyboardButton.jsx";
import { createCheckoutSession } from "../../features/payment.js";

function Payment() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
        setError("Please Login First");
    }
    try {
        // https://docs.stripe.com/testing
        // for more information about valid card number
        const res = await createCheckoutSession(token, amount);
        // navigate(res.url);
        window.location.href = res.url;
    } catch (err) {
        setError(err);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className={`mt-[60px] ml-[60px] text-[48px] font-[700] text-black`}>Top Up</div>
      <div className={` ml-[60px] text-[32px] font-[700] text-gray-500`}>Please enter the amount to top up</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ml-[60px] mb-[40px]">
        <InputBar type={"number"} width={"600px"} label={"Amount"} onChange={(e) => setAmount(e.target.value)} />
        <KeyboardButton width={"200px"} height="50px" label={"Submit"} onClick={handleSubmit}/>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </>
  );
}

export default Payment;
