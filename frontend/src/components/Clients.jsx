import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Clients = () => {

    const loggedData = useContext(UserContext);
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [clients, setClients] = useState({});


    const notify = () => toast.success("Client added successfully!");

    function logout() {
        localStorage.removeItem("hostedpbx");
        loggedData.setLoggedUser(null);
        navigate("/login");
    }
    // if (clients.length == undefined) {
       
    // }

    useEffect(()=>{
        getClients();
    },[])


    function getClients() {
        fetch("http://localhost:5000/clients", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + loggedData.loggedUser.token
            }

        }).then((response) => {
            return response.json();

        }).then((data) => {
            if (data != undefined) {
                setClients(data);
            }


        }).catch((err) => {
            console.log(err)
        })

    }
    const [clientData, setClientData] = useState({
        name: "",
        alias: ""
    })
    function handleInput(event) {
        setClientData((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        fetch("http://localhost:5000/addClient", {
            method: "POST",
            body: JSON.stringify(clientData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + loggedData.loggedUser.token
            }

        }).then((response) => {
            if (response.status == 201) {
                notify();
            }
            return response.json();
        }).then((data) => {
            setClients((prevState) => [
                ...prevState, 
                { name: data.data.name, alias: data.data.alias } // Assuming result contains name, alias, id
            ]);
            setShowForm(false);
        }).catch((err) => {
            console.log(err)
        })

    }
    return (
        <div className="d-flex">
            <Sidebar />
            <ToastContainer />

            <div className="flex-grow-1 p-4">
                <div>
                    {/* Button to toggle form */}
                    <button
                        className="btn btn-primary mb-4"
                        onClick={() => setShowForm((prev) => !prev)}
                    >
                        {showForm ? "Close Form" : "Add Client"}
                    </button>
                </div>

                <div>
                    <button className="btn btn-danger mb-4" onClick={logout}>Logout</button>
                </div>

                {/* Add Client Form */}
                {showForm && (
                    <form className="mb-4" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name" onChange={handleInput}
                                name="name" value={clientData.name}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Alias</label>
                            <input
                                type="text"
                                id="text" onChange={handleInput}
                                name="alias" value={clientData.alias}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                )}


                <h2>Clients</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Alias</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(clients) && clients.length > 0 ? (
                            clients.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.alias}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">No clients available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Clients;