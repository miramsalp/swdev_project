import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

function NavigationBar() {
  const { user, handleLogout } = useAuthContext();
  const buttonStyle = "flex justify-center items-center w-24 h-12 hover:bg-gray-900 active:bg-gray-800 rounded-md select-none";

  return (
    <>
      <div className={`flex h-20 bg-black text-white font-[500]`}>
        <div className="flex-1 self-center ml-10">
          <Link to="/">
            <div className={buttonStyle}>Home</div>
          </Link>
        </div>
        <div className="flex-1 flex justify-end self-center gap-10 mr-10">
          {user ? (
            <div className={buttonStyle} onClick={handleLogout}>Logout</div>
          ) : (
            <>
              <Link to="/register">
                <div className={buttonStyle}>Register</div>
              </Link>
              <Link to="/login">
                <div className={buttonStyle}>Login</div>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default NavigationBar;
