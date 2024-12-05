import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate,Link } from "react-router-dom";

export default function Dashboard() {

    const loggedData = useContext(UserContext);
    const navigate = useNavigate();

    function logout()
    {
        localStorage.removeItem("hostedpbx");
        loggedData.setLoggedUser(null);
        navigate("/login");
    }
    return (
        <div>
            <h1>Dashboard page</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}