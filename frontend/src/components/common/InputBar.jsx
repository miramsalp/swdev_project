// https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
// https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/HTML5_input_types
function InputBar({ width, height = "36px", label, type = "text", onChange }) {
  return (
    <div>
      <div className="text-[14px] font-[500]">{label}</div>
      <input type={type} className="border-1 border-gray-500 rounded-md px-2" style={{ width, height }} onChange={onChange} />
    </div>
  );
}

export default InputBar;
