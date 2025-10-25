import type React from "react"
import "../styles/StatsCards.css"

interface Stats {
  totalOrders: number
  totalDispatched: number
  totalRevenue: number
}

interface StatsCardsProps {
  stats: Stats
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon-wrapper">
          <div className="stat-icon orders">💚</div>
        </div>
        <div className="stat-content">
          <p className="stat-label">Órdenes totales</p>
          <p className="stat-value">{stats.totalOrders.toLocaleString()}</p>
          <p className="stat-change positive">8.56%</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper">
          <div className="stat-icon dispatched">😊</div>
        </div>
        <div className="stat-content">
          <p className="stat-label">Total despachado</p>
          <p className="stat-value">{stats.totalDispatched.toLocaleString()}</p>
          <p className="stat-change positive">3.22%</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper">
          <div className="stat-icon revenue">💎</div>
        </div>
        <div className="stat-content">
          <p className="stat-label">Total recaudado</p>
          <p className="stat-value">$. {(stats.totalRevenue / 1000).toFixed(3).replace(".", ",")}</p>
          <p className="stat-change positive">2.45%</p>
        </div>
      </div>
    </div>
  )
}

export default StatsCards
