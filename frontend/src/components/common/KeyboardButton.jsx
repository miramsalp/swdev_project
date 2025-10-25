function KeyboardButton({ width, height="90px", label, fontSize, onClick }) {
  return (
    <>
      <div
        className={`flex justify-center items-center font-[500] border-x-6 border-b-6 border-t-2 active:border-t-4 active:border-x-2 active:border-b-2 rounded-md select-none`}
        onClick={onClick}
        style={{ width, height, fontSize }}
      >
        {label}
      </div>
    </>
  );
}

export default KeyboardButton;
