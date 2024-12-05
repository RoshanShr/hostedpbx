import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
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
    </div>
  );
};

export default Sidebar;