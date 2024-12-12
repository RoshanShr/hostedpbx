import { useState } from 'react'
import './App.css'
import Login from './components/Login';
import PageNotFound from './components/404';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Clients from './components/Clients';
import { BrowserRouter, Routes, Route,Navigate  } from 'react-router-dom';
import Private from './components/Private'
import { UserContext } from './contexts/UserContext'
import {isTokenExpired } from './utils/checkToken';
import React, { useEffect } from "react";





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

  return (
    <>
      <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                loggedUser != null  ? <Navigate to="/clients" /> : <Login />
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
            <Route path='/clients' element={<Private Component={Clients} />} />
            <Route path='*' element={<PageNotFound />}></Route>
          </Routes>

        </BrowserRouter>

      </UserContext.Provider>

    </>

  )
}

export default App
