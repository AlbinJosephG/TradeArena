import { useNavigate } from "react-router-dom";
import "./UserHeader.css";

function UserHeader() {
  const navigate = useNavigate();

  const name = localStorage.getItem("name") || "User";
  const role = localStorage.getItem("role") || "USER";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("seasonId");
    localStorage.removeItem("adminLoggedIn");

    navigate("/login");
  };

  return (
    <div className="user-header">
      <div className="user-info">
        <div className="user-avatar">{name.charAt(0).toUpperCase()}</div>

        <div>
          <strong>{name}</strong>
          <span>{role}</span>
        </div>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default UserHeader;