import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const loggedData = useContext(UserContext);

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("hostedpbx");
    loggedData.setLoggedUser(null);
    navigate("/login");
  }

  return (
    <div className="bg-light border-end p-3" style={{ width: "250px" }}>
      <h4>Menu</h4>
      <ul className="list-unstyled">
        <li>
          <Link to="/clients" className="text-decoration-none">Clients</Link>
        </li>
        <li className="mb-2">
          <Link to="/reports" className="text-decoration-none">Reports</Link>
        </li>

      </ul>
      <div>
        <button className="btn btn-danger mb-4" onClick={logout}>Logout</button>
      </div>
    </div>


  );
};

export default Sidebar;