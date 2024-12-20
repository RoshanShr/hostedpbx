import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

 const CommonWrapper = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <Outlet />
      </div>
  );
};

export default CommonWrapper;
