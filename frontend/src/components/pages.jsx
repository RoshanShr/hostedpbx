import AuthHandler from "../core/AuthHandler";
import AuthFlowWrapper from "../templates/Authflow";
import CommonWrapper from "../templates/CommonFlow";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Clients from "./Clients/Clients";
import Reports from "./Reports/Reports";
import InvalidPage from "./PageNotFound/InvalidPage";

export const pages = [
  {
    path: "",
    element: <AuthHandler />,
    children: [
      {
        path: "",
        element: <AuthFlowWrapper />,
        children: [
          {
            path: "",
            element: <Login />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
     
        ],
      },
      {
        path: "clients",
        element: <CommonWrapper />, // New wrapper component for Clients
        children: [
          {
            path: "",
            element: <Clients />,
          },
        ],
      },
      {
        path: "reports",
        element: <CommonWrapper />, // New wrapper component for Clients
        children: [
          {
            path: "",
            element: <Reports />,
          },
    
        ],
      },
      {
        path: "*", // Catch-all route for invalid paths
        element: <InvalidPage />, // Directly render InvalidPage
      },
      
    ],
    
  },
];
