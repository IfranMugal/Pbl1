import './App.css'
import React from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import { Dashboard } from './pages/Dashboard'
import Home from './pages/Home';
import AlertComponent from './pages/AleartComponent';


function App() {
  return (
      <Myapp />
  )
}
function Myapp(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Signup/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/alert" element={<AlertComponent/>} />

      </Routes>
    </BrowserRouter>
)
}
export default App
