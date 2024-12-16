import React from 'react';
import Sidebar from "../components/Sidebar";
import { UserContext } from "../contexts/UserContext";
import { useGetReports  } from "../api/reportsApi";
import { useState, useContext } from "react";

const Reports = () => {
        const loggedData = useContext(UserContext);
        const { data: reports, isLoading, isError, error } = useGetReports(loggedData);
    return (
        <div className="d-flex">
            <Sidebar />
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
                                <td colSpan="3">Loading...</td>
                            </tr>
                        ) : isError ? (
                            <tr>
                                <td colSpan="3">Error: {error.message}</td>
                            </tr>
                        ) : reports.length > 0 ? (
                            reports.map((client) => (
                                <tr key={client.id}>
                                    <td>{client.start_time}</td>
                                    <td>{client.call_type}</td>
                                    <td>{client.caller_id}</td>
                                    <td>{client.destination}</td>
                                    <td>{client.duration}</td>
                                    <td>{client.recording}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No reports available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Reports;