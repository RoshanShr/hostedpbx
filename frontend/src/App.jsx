import { useState } from 'react'
import './App.css'
import Login from './components/Login';
import PageNotFound from './components/404';
import Dashboard from './components/Dashboard';
import Clients from './components/Clients';
import { BrowserRouter, Routes, Route,Navigate  } from 'react-router-dom';
import Private from './components/Private'
import { UserContext } from './contexts/UserContext'



function App() {


  const [loggedUser, setLoggedUser]
    = useState(JSON.parse(localStorage.getItem("hostedpbx")));

  return (
    <>
      <UserContext.Provider value={{ loggedUser, setLoggedUser }}>

        <BrowserRouter>

          <Routes>
            /* Conditional route for /login */

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
            <Route path='/clients' element={<Private Component={Clients} />} />
            <Route path='*' element={<PageNotFound />}></Route>
          </Routes>

        </BrowserRouter>

      </UserContext.Provider>

    </>

  )
}

export default App
