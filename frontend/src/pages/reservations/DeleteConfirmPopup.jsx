import KeyboardButton from "../../components/common/KeyboardButton";

function DeleteConfirmPopup({ state, setState, topic, content, confirmHandler }) {
  // #ffffffd0

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full z-20 bg-[#ffffffd0] flex items-center justify-center">
        <div className="flex flex-col h-80 w-120 border-5 border-gray-800 rounded-md bg-white justify-center items-center p-8">
          <div className="text-[18px] font-[600]">{topic}</div>
          <div>{content}</div>
          <div className="flex gap-2 justify-center mt-10">
            <KeyboardButton width={"96px"} height={"56px"} label={"cancel"} onClick={() => setState(!state)} />
            <div className="text-red-600">
              <KeyboardButton
                width={"96px"}
                height={"56px"}
                label={"delete"}
                onClick={() => {
                  setState(!state);
                  confirmHandler();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DeleteConfirmPopup;
