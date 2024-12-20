import { Outlet } from "react-router-dom";

 const AuthFlowWrapper = () => {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ width: "300px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthFlowWrapper;