import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginSchema } from "../schemas/loginSchema";
import { useFormik } from 'formik';

import LoginCSS from './stylesheet/login.module.css'


const initialValues = {
    username: "",
    password: ""

}
export default function Login() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const jwtSecretKey = import.meta.env.VITE_JWT_SECRET_KEY;

    const navigate = useNavigate();
    const notify = () => toast.error("Wrong username or password!");
    const loggedData = useContext(UserContext);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            submitData(values);

        }
    })

    function submitData(userCreds) {
        fetch(apiUrl + "login", {
            method: "POST",
            body: JSON.stringify(userCreds),
            headers: {
                "Content-Type": "application/json"
            }

        }).then((response) => {
            if (response.status != 200) {
                notify();
            }

            return response.json();

        }).then((data) => {
            if (data.token != undefined) {
                localStorage.setItem(jwtSecretKey, JSON.stringify(data));
                loggedData.setLoggedUser(data);
                navigate("/clients")
                notify();
            }

        }).catch((err) => {
            console.log(err)
        })

    }

    function registerPage(){
        navigate("/register")
    }

    return (
        <div className={clsx(LoginCSS.container, "container vh-100 d-flex justify-content-center align-items-center")}>
            <div className="card p-4 shadow" style={{ width: "300px" }}>
                <h3 className="text-center">Login</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input
                            type="username"
                            id="username" onChange={formik.handleChange} onBlur={formik.handleBlur}
                            className="form-control" name="username" value={formik.values.username}
                        />
                        {formik.errors.username && formik.touched.username ? <p className="form-error">{formik.errors.username}</p> : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            id="password" onChange={formik.handleChange} onBlur={formik.handleBlur}
                            className="form-control" name="password" value={formik.values.password}
                        />
                        {formik.errors.password && formik.touched.password ? <p className="form-error">{formik.errors.password}</p> : null}
                    </div>
                    
                    <button type="submit" className="btn btn-success w-100 btn">Login</button>
                    <button className="btn btn-primary w-100" onClick={registerPage}>Register</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );

}