import './App.css'
import React from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import { Dashboard } from './pages/Dashboard'

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
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
)
}
export default App
