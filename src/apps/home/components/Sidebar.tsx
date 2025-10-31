"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import logo from "../../assets/Logo.png";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const menuItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "gestion", label: "Gestión" },
  { id: "reportes", label: "Reportes" },
  { id: "facturacion", label: "Facturación y pagos" },
  { id: "reservas", label: "Reservas" },
];

const Sidebar: React.FC = () => {
  const [time, setTime] = useState("12:45:00 Pm");
  const [activeItem, setActiveItem] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "Pm" : "Am";
      setTime(`${hours}:${minutes}:${seconds} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 🔹 Función para cerrar sesión
  const handleLogout = () => {
    Swal.fire({
      title: "¿Deseas cerrar sesión?",
      text: "Tu sesión actual se cerrará.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626", // rojo Tailwind
      cancelButtonColor: "#6b7280", // gris
      background: "#f9fafb",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");

        Swal.fire({
          title: "Cerrando sesión...",
          text: "Redirigiendo al login...",
          icon: "success",
          showConfirmButton: false,
          timer: 1800, // ⏱️ Espera 1.8s y redirige
          timerProgressBar: true,
          willClose: () => {
            navigate("/login");
          },
        });
      }
    });
  };

  return (
    <aside className="sidebar">
      {/* 🔸 Header con logo */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src={logo} alt="MesaGO" className="logo-image" />
        </div>
      </div>

      {/* 🔸 Menú de navegación */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`nav-item ${activeItem === item.id ? "active" : ""}`}
          >
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* 🔸 Footer con hora y botón de cierre */}
      <div className="sidebar-footer">
        <div className="time-display">
          <span>{time}</span>
        </div>

        <button
          onClick={handleLogout}
          className="logout-button mt-2 px-11 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
