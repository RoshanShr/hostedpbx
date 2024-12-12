import Sidebar from "../components/Sidebar";
import { UserContext } from "../contexts/UserContext";
import { useState, useContext } from "react";
import { ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import { clientSchema } from "../schemas/clientSchema";
import { useGetClients, useAddClient, useDeleteClient } from "../api/clientApi";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const initialValues = {
    name: "",
    alias: ""

}

const Clients = () => {

    const loggedData = useContext(UserContext);

    const [showForm, setShowForm] = useState(false);

    const { data: clients, isLoading, isError, error } = useGetClients(loggedData);
    const addClientMutation = useAddClient(loggedData);
    const deleteClientMutation = useDeleteClient(loggedData);


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: clientSchema(clients),
        onSubmit: (values, action) => {
            submitData(values);
            action.resetForm();
        }
    })



    function submitData(clientData) {
        addClientMutation.mutate(clientData)
    }


    function deleteConfirmation(id) {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDelete(id)
                },
                {
                    label: 'No',
                   // onClick: () => alert('Click No')
                }
            ]
        });
    };


    function handleDelete(id) {
        deleteClientMutation.mutate(id)
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


                {/* Add Client Form */}
                {showForm && (
                    <form className="mb-4" onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name" onChange={formik.handleChange} onBlur={formik.handleBlur}
                                name="name" value={formik.values.name}
                                className="form-control"
                            />
                            {formik.errors.name && formik.touched.name ? <p className="form-error">{formik.errors.name}</p> : null}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Alias</label>
                            <input
                                type="text"
                                id="text" onChange={formik.handleChange} onBlur={formik.handleBlur}
                                name="alias" value={formik.values.alias}
                                className="form-control"
                            />
                            {formik.errors.alias && formik.touched.alias ? <p className="form-error">{formik.errors.alias}</p> : null}

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
                        {isLoading ? (
                            <tr>
                                <td colSpan="3">Loading...</td>
                            </tr>
                        ) : isError ? (
                            <tr>
                                <td colSpan="3">Error: {error.message}</td>
                            </tr>
                        ) : clients.length > 0 ? (
                            clients.map((client) => (
                                <tr key={client.id}>
                                    <td>{client.name}</td>
                                    <td>{client.alias}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteConfirmation(client.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No clients available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Clients;