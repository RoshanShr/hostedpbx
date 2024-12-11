import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    const loggedData = useContext(UserContext);
    const navigate = useNavigate();
    const jwtSecretKey = import.meta.env.VITE_JWT_SECRET_KEY;

    function logout()
    {
        localStorage.removeItem(jwtSecretKey);
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