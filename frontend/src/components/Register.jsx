import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerSchema } from "../schemas/registerSchema";
import { useFormik } from 'formik';

const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: ""

}

export default function Register() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: registerSchema,
        onSubmit: (values, action) => {
            submitData(values);
            action.resetForm();
        }
    })

    function submitData(userCreds) {
        fetch(apiUrl + "register", {
            method: "POST",
            body: JSON.stringify(userCreds),
            headers: {
                "Content-Type": "application/json"
            }

        }).then((response) => {
            if (response.status != 201) {
                toast.error("Error while registering");
            } else {
                toast.success("User registered successfully");
            }

            return response.json();

        }).catch((err) => {
            console.log(err)
        })

    }

    function loginPage() {
        navigate("/login")
    }

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card p-4 shadow" style={{ width: "300px" }}>
                <h3 className="text-center">Register</h3>
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
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type="email"
                            id="email" onChange={formik.handleChange} onBlur={formik.handleBlur}
                            className="form-control" name="email" value={formik.values.email}
                        />
                        {formik.errors.email && formik.touched.email ? <p className="form-error">{formik.errors.email}</p> : null}
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
                    <div className="mb-3">
                        <label htmlFor="confirm_password" className="form-label">Password:</label>
                        <input
                            type="confirm_password"
                            id="confirm_password" onChange={formik.handleChange} onBlur={formik.handleBlur}
                            className="form-control" name="confirm_password" value={formik.values.confirm_password}
                        />
                        {formik.errors.confirm_password && formik.touched.confirm_password ? <p className="form-error">{formik.errors.confirm_password}</p> : null}
                    </div>
                    <button type="submit" className="btn btn-primary w-100 btn">Register</button>
                    <button className="btn btn-success w-100" onClick={loginPage}>Login</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );

}