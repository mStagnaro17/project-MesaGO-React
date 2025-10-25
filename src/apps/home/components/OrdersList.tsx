"use client"

import type React from "react"
import { ChevronDown } from "lucide-react"
import "../styles/OrdersList.css"

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  status?: "pending" | "ready" | "delivered"
}

interface Order {
  id: string
  orderNumber: string
  customerName: string
  status: "pending" | "completed" | "cancelled"
  items: OrderItem[]
  total: number
  createdAt: string
  address?: string
}

interface OrdersListProps {
  orders: Order[]
  selectedOrder: Order | null
  onSelectOrder: (order: Order) => void
  loading: boolean
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, selectedOrder, onSelectOrder, loading }) => {
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending: { label: "Entrega", className: "status-pending" },
      completed: { label: "Completado", className: "status-completed" },
      cancelled: { label: "Cancelado", className: "status-cancelled" },
    }
    return statusMap[status] || statusMap.pending
  }

  if (loading) {
    return <div className="orders-list-container">Cargando órdenes...</div>
  }

  return (
    <div className="orders-list-container">
      <div className="orders-header">
        <h2 className="orders-title">Órdenes</h2>
        <button className="filter-btn">
          Filtrar
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="orders-list">
        {orders.map((order) => {
          const statusInfo = getStatusBadge(order.status)
          const isSelected = selectedOrder?.id === order.id

          return (
            <div
              key={order.id}
              className={`order-card ${isSelected ? "selected" : ""}`}
              onClick={() => onSelectOrder(order)}
            >
              <div className="order-header">
                <div className="order-number-section">
                  <span className="order-number">ID Orden {order.orderNumber}</span>
                  <span className={`status-badge ${statusInfo.className}`}>{statusInfo.label}</span>
                </div>
              </div>

              <div className="order-customer">
                <h3 className="customer-name">{order.customerName}</h3>
                <p className="order-time">10:37 PM | HOY</p>
              </div>

              <div className="order-items-preview">
                {order.items.slice(0, 1).map((item) => (
                  <div key={item.id} className="item-preview">
                    <span className="item-quantity">{item.quantity}x</span>
                    <span className="item-name">{item.name}</span>
                  </div>
                ))}
                {order.items.length > 1 && <p className="items-more">+{order.items.length - 1} más</p>}
              </div>

              {order.address && (
                <div className="order-address">
                  <span className="address-icon">📍</span>
                  <span className="address-text">{order.address}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OrdersList
