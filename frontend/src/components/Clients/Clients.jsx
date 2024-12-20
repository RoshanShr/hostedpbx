import { UserContext } from "../../contexts/UserContext";
import { useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { clientSchema } from "../../schemas/clientSchema";
import { useDeleteClient } from "../../api/clients/deleteClientsApi";
import { useGetClients } from "../../api/clients/getClientsApi";
import { useAddClient } from "../../api/clients/addClientsApi";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Pagination from "../../common/Pagination"; // Import the pagination component

const initialValues = {
  name: "",
  alias: "",
};

const Clients = () => {
  const loggedData = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15); // Default 10 items per page

  const {
    data: clientsData,
    isLoading,
    isError,
    error,
  } = useGetClients(loggedData, currentPage, itemsPerPage);
  const addClientMutation = useAddClient(loggedData);
  const deleteClientMutation = useDeleteClient(loggedData);
  // Pagination state

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: clientSchema(clientsData),
    onSubmit: (values, action) => {
      submitData(values);
      action.resetForm();
    },
  });

  // Extract data and pagination metadata from the backend response
  const clients = clientsData?.data || [];
  const totalItems = clientsData?.totalItems || 0;

  // Handle change in items per page
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage); // Update the number of items per page
    setCurrentPage(1); // Reset to the first page when the number of items per page changes
  };

  function submitData(clientData) {
    addClientMutation.mutate(clientData);
  }

  function deleteConfirmation(id) {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  }

  function handleDelete(id) {
    deleteClientMutation.mutate(id);
  }
  return (
      <div className="flex-grow-1 p-4">
      <ToastContainer />
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
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
                value={formik.values.name}
                className="form-control"
              />
              {formik.errors.name && formik.touched.name ? (
                <p className="form-error">{formik.errors.name}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Alias
              </label>
              <input
                type="text"
                id="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="alias"
                value={formik.values.alias}
                className="form-control"
              />
              {formik.errors.alias && formik.touched.alias ? (
                <p className="form-error">{formik.errors.alias}</p>
              ) : null}
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
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

        {/* Pagination Component */}
        {!isLoading && !isError && (
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={handleItemsPerPageChange} // Pass the function to handle per page change
          />
        )}
      </div>
  );
};

export default Clients;
