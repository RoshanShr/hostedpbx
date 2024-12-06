import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import {useQuery, useMutation, useQueryClient} from "react-query"
import {getClient, addClient, updateClient, deleteClient} from "../api/clientApi";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { addClient, getClients } from "../../../backend/src/controllers/clientController";
// import { deleteClient, updateClient } from "../api/clientApi";

const Clients = () => {

    const notify = (type, msg) => toast[type](msg);
    const loggedData = useContext(UserContext);
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    // const [clients, setClients] = useState({});

    const queryClient = new useQueryClient();

    const{
        isLoading,
        isError,
        error,
        data: clients
    } = useQuery(['clients'], 
        ()=> getClient(loggedData))

    //same for edit/delete
    const addClientMutation = useMutation(addClient, {
        onSuccess : () =>{
            //Invalidates cache and refetch
           queryClient.invalidateQueries("clients");
           notify("success", "Client added successfully")
        }
    })    

    const deleteClientMutation = useMutation(deleteClient, {
        onSuccess : (response) =>{
            //Invalidates cache and refetch
           queryClient.invalidateQueries("clients");
           if(response.name=='AxiosError'){
            notify("error",response.response.data.message)
           }else{
            notify("success","Client deleted successfully")

           }
        }
    })    

    function logout() {
        localStorage.removeItem("hostedpbx");
        loggedData.setLoggedUser(null);
        navigate("/login");
    }
 
    useEffect(()=>{
        //getClients();
    },[])



    const [clientData, setClientData] = useState({
        name: "",
        alias: ""
    })
  
    let content
    if(isLoading){
        content ="Loading data";
        //notify("Fetching data successfully");

    }else if(isError){
        content =error.message;
    }else{                
      //  notify("Data fetched successfully");
        content  = clients;
    }

    function handleInput(event) {
        setClientData((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        addClientMutation.mutate({loggedData, clientData})
    }

    function handleDelete(id) {
        deleteClientMutation.mutate({loggedData, id:id})
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(content) && content.length > 0 ? (
                            content.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.alias}</td>
                                    <td><button className="btn btn-danger" onClick={()=>{
                                        handleDelete(item.id)
                                    }}>Delete</button></td>
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