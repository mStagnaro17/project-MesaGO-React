"use client"

import type React from "react"
import { useState, useEffect } from "react"
import "../styles/Sidebar.css"

const menuItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "gestion", label: "Gestión" },
  { id: "reportes", label: "Reportes" },
  { id: "facturacion", label: "Facturación y pagos" },
  { id: "reservas", label: "Reservas" },
]

const Sidebar: React.FC = () => {
  const [time, setTime] = useState("12:45:00 Pm")
  const [activeItem, setActiveItem] = useState("dashboard")

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

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src="/mesago-logo.jpg" alt="MesaGO" className="logo-image" />
        </div>
      </div>

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

      <div className="sidebar-footer">
        <div className="time-display">
          <span>{time}</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
