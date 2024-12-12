import React from 'react';
import Sidebar from "../components/Sidebar";

const Reports = () => {
    return (
        <div >
            <Sidebar />
            <div className="table-container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Call Date</th>
                            <th>Agent</th>
                            <th>Number</th>
                            <th>Extension</th>
                            <th>Recording</th>
                            <th>Duration</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>
                                <a target="_blank" rel="noopener noreferrer">
                                    Listen
                                </a>
                            </td>
                            <td>5</td>
                            <td>
                                <button className="action-btn">View</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default Reports;