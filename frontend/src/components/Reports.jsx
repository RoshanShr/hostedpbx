import React from 'react';
import Sidebar from "../components/Sidebar";

const Reports = () => {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-4">
                <h2>Reports</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Calldate</th>
                            <th>Agent</th>
                            <th>Duration</th>
                            <th>Recording</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Reports;