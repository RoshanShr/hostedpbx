import { useState } from 'react'
import './App.css'
import Login from './components/Login/index';
import PageNotFound from './components/404';
import Register from './components/Register';
import Clients from './components/Clients';
import Reports from './components/Reports';
import { BrowserRouter, Routes, Route,Navigate, createBrowserRouter, Outlet  } from 'react-router-dom';
import Private from './components/Private'
import { UserContext } from './contexts/UserContext'
import {isTokenExpired } from './utils/checkToken';
import React, { useEffect } from "react";
import AuthHandler from './common/AuthHandler';




function App() {

//   useEffect(() => {
//     // Get the token from localStorage or sessionStorage
//     if(localStorage.getItem("hostedpbx")!=null){
//       const token = JSON.parse(localStorage.getItem("hostedpbx"));
//       if (isTokenExpired(token.token)) {
//           // Token is expired, log out the user
//           localStorage.removeItem("hostedpbx"); // Remove token
//       }
//     }
   
// }, []);


const [loggedUser, setLoggedUser]
= useState(JSON.parse(localStorage.getItem("hostedpbx")));

// createBrowserRouter([
//   {
//     path:'',
//     Component:<Outlet/>,
//     children:[
//       {
//         path:'',
//         Component: <><Outlet/></>,
//         children:[
//           {
//             path: 'login',
//             Component: <Login/>
//           },{
//             path: 'register',
//             Component: <Register/>
//           }
//         ]
//       }
//     ]
//   }
// ])

  return (
    <>
      <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                 <Login />
              }
            />
            <Route
              path="/login"
              element={
                loggedUser != null  ? <Navigate to="/clients" /> : <Login />
              }
            />
            <Route path='/logout' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/reports'  element={<Private Component={Reports} />}></Route>
            <Route path='/clients' element={<Private Component={Clients} />} />
            <Route path='*' element={<PageNotFound />}></Route>
          </Routes>

        </BrowserRouter>
      </UserContext.Provider>

    </>

  )
}

export default App
