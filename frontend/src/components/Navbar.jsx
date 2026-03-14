import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📊</span>
          Invoice Manager
        </Link>

        {token && (
          <div className="navbar-menu">
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/invoice" className="nav-link">Add Invoice</Link>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;