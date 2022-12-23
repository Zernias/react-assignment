import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/loginActions/loginActions";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <button
      type="button"
      className="btn btn-light text-dark m-2 rounded-2"
      onClick={handleLogout}
      data-testid="logout-button"
    >
      Log Out
    </button>
  );
};

export default Logout;
