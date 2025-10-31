import './App.css'
import LoginPage from "./apps/login/LoginPage/LoginPage";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import { DashboardPage } from "./apps/home/pages"
import "./App.css"

 
function App() {
  return (
    <LoginPage/>
    //<DashboardPage />
  )
}

export default App
