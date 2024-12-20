import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { publicPages } from "./const/public-pages.const";

const AuthHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("hostedpbx");
    if (!token && !publicPages.includes(location.pathname)) {
      navigate("/");
    } else if (token && publicPages.includes(location.pathname)) {
      navigate("/clients");
    }
  }, [location.pathname, navigate]);

  return <Outlet />;
};

export default AuthHandler;
