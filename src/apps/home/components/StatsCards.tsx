import type React from "react"
import "../styles/StatsCards.css"
import OrdenesTotales from "../../assets/OrdenesTotales.jpg"
import ProfilePicture from "../../assets/ProfilePicture.jpg"
import TotalDespachado from "../../assets/TotalDespachado.jpg"
import Money2 from "../../assets/Money2.jpg"
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
      {/* ÓRDENES TOTALES */}
      <div className="stat-card">
        <div className="stat-icon orders">
          <img src={OrdenesTotales} alt="Órdenes" />
        </div>
        <div className="stat-content">
          <p className="stat-label">Órdenes totales</p>
          <p className="stat-value">{stats.totalOrders.toLocaleString()}</p>
          <p className="stat-change positive">8.56%</p>
        </div>
      </div>

      {/* TOTAL DESPACHADO */}
      <div className="stat-card">
        <div className="stat-icon dispatched">
          <img src={TotalDespachado} alt="Despachado" />
        </div>
        <div className="stat-content">
          <p className="stat-label">Total despachado</p>
          <p className="stat-value">{stats.totalDispatched.toLocaleString()}</p>
          <p className="stat-change positive">3.22%</p>
        </div>
      </div>

      {/* TOTAL RECAUDADO */}
      <div className="stat-card">
        <div className="stat-icon revenue">
          <img src={Money2} alt="Recaudado" />
        </div>
        <div className="stat-content">
          <p className="stat-label">Total recaudado</p>
          <p className="stat-value">
            $. {stats.totalRevenue.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
          </p>
          <p className="stat-change negative">0.23%</p>
        </div>
      </div>
    </div>
  )
}

export default StatsCards
