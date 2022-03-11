import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { io } from 'socket.io-client'

//import all the pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat'
//import components
import Header from './components/home/Header';

export const socket = io()

function App() {

  // const [socket, setSocket] = useState()

  // useEffect(() => {
  //    const socketConn = io()
  //    setSocket(socketConn)
  // },[])


  return (
    <div className="App">
    <Header/>
    <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/room/:id" element={<Chat/>} />

      </Routes>
      
    </div>
  );
}

export default App;
