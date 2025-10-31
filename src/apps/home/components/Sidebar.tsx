"use client"

import type React from "react"
import { useState, useEffect } from "react"
<<<<<<< Updated upstream
import "../styles/Sidebar.css"
import logo from "../../assets/Logo.png";

=======
import { useNavigate } from "react-router-dom"
import "../styles/Sidebar.css"
import logo from "../../assets/Logo.png"
import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.min.css"

// 🔹 Props que vienen desde DashboardPage
interface SidebarProps {
  activeItem: string
  onSelectItem: (itemId: string) => void
}
>>>>>>> Stashed changes

const menuItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "gestion", label: "Gestión" },
  { id: "facturacion", label: "Facturación y pagos" },
  { id: "reservas", label: "Reservas" },
]

<<<<<<< Updated upstream
const Sidebar: React.FC = () => {
  const [time, setTime] = useState("12:45:00 Pm")
  const [activeItem, setActiveItem] = useState("dashboard")
=======
const Sidebar: React.FC<SidebarProps> = ({ activeItem, onSelectItem }) => {
  const [time, setTime] = useState("12:45:00 Pm")
  const navigate = useNavigate()
>>>>>>> Stashed changes

  // 🕒 Actualiza la hora cada segundo
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, "0")
      const minutes = String(now.getMinutes()).padStart(2, "0")
      const seconds = String(now.getSeconds()).padStart(2, "0")
      const ampm = now.getHours() >= 12 ? "Pm" : "Am"
      setTime(`${hours}:${minutes}:${seconds} ${ampm}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])
<<<<<<< Updated upstream

  return (
    <aside className="sidebar">
=======

  // 🔹 Cierre de sesión con confirmación SweetAlert
  const handleLogout = () => {
    Swal.fire({
      title: "¿Deseas cerrar sesión?",
      text: "Tu sesión actual se cerrará.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      background: "#f9fafb",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token")
        Swal.fire({
          title: "Cerrando sesión...",
          text: "Redirigiendo al login...",
          icon: "success",
          showConfirmButton: false,
          timer: 1800,
          timerProgressBar: true,
          willClose: () => {
            navigate("/login")
          },
        })
      }
    })
  }

  return (
    <aside className="sidebar">
      {/* Logo */}
>>>>>>> Stashed changes
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src={logo} alt="MesaGO" className="logo-image" />
        </div>
      </div>

<<<<<<< Updated upstream
=======
      {/* Menú de navegación */}
>>>>>>> Stashed changes
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectItem(item.id)} // 👈 Ahora notifica al padre
            className={`nav-item ${activeItem === item.id ? "active" : ""}`}
          >
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

<<<<<<< Updated upstream
=======
      {/* Footer */}
>>>>>>> Stashed changes
      <div className="sidebar-footer">
        <div className="time-display">
          <span>{time}</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
