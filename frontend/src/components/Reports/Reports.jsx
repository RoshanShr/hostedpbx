import React, { useState, useContext,useEffect  } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useGetReports } from "../../api/reports/getReportsApi";
import Pagination from "../../common/Pagination"; // Import the pagination component

const Reports = () => {
  const loggedData = useContext(UserContext);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15); // Default 10 items per page

  // Fetch paginated data from the backend
  const {
    data: reportsData,
    isLoading,
    isError,
    error,
  } = useGetReports(loggedData, currentPage, itemsPerPage);

  // Extract data and pagination metadata from the backend response
  const reports = reportsData?.data || [];
  const totalItems = reportsData?.totalItems || 0;

  // Handle change in items per page
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage); // Update the number of items per page
    setCurrentPage(1); // Reset to the first page when the number of items per page changes
  };


  return (

      <div className="flex-grow-1 p-4">
        <h2>Reports</h2>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Calldate</th>
              <th>Call type</th>
              <th>Agent</th>
              <th>Destination</th>
              <th>Duration</th>
              <th>Recording</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6">Loading...</td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan="6">Error: {error.message}</td>
              </tr>
            ) : reports.length > 0 ? (
              reports.map((client) => (
                <tr key={client.id}>
                  <td>{client.start_time}</td>
                  <td>{client.call_type}</td>
                  <td>{client.caller_id}</td>
                  <td>{client.destination}</td>
                  <td>{client.duration}</td>
                  <td>
                    {client.recording ? (
                      <a
                        href={client.recording}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Listen
                      </a>
                    ) : (
                      "No Recording"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No reports available</td>
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

export default Reports;
