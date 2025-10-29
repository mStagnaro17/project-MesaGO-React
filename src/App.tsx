import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./apps/login/LoginPage/LoginPage";
import { DashboardPage } from "./apps/home/pages"
import "./App.css"

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/*  Siempre inicia en login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/*  Dashboard: solo entra si hay token */}
        <Route
          path="/dashboard"
          element={token ? <DashboardPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;