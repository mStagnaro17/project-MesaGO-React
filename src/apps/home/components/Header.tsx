"use client"

import type React from "react"
import { Search, Mail, Bell } from "lucide-react"
import "../styles/Header.css"

interface HeaderProps {
  onSearch: (term: string) => void
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <div className="header-logo">
          <span className="logo-icon">🍽️</span>
          <span className="logo-text">MesaGO</span>
        </div>
        <h1 className="header-title">Dashboard</h1>
      </div>

      <div className="header-center">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search ID Order"
            onChange={(e) => onSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        <button className="header-icon-btn" aria-label="Messages">
          <Mail size={20} />
        </button>
        <button className="header-icon-btn" aria-label="Notifications">
          <Bell size={20} />
        </button>
        <button className="header-icon-btn" aria-label="Notifications">
          <span className="notification-icon">📊</span>
        </button>
        <div className="user-avatar">
          <img src="/user-profile.jpg" alt="User" />
        </div>
      </div>
    </header>
  )
}

export default Header
