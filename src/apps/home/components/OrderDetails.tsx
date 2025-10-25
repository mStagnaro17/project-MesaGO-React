import type React from "react"
import { ChevronRight, Printer } from "lucide-react"
import "../styles/OrderDetails.css"

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

interface OrderDetailsProps {
  order: Order
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const getItemStatusIcon = (status?: string) => {
    const statusMap: Record<string, string> = {
      pending: "⏳",
      ready: "✅",
      delivered: "✓",
    }
    return statusMap[status || "pending"]
  }

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  return (
    <div className="order-details-container">
      <div className="order-details-header">
        <div className="order-details-title">
          <p className="order-id">ID Orden {order.orderNumber}</p>
          <h3 className="customer-name-detail">{order.customerName}</h3>
          <p className="order-time-detail">10:37 PM | HOY</p>
        </div>
        <div className="order-details-actions">
          <span className="order-progress">1/4</span>
          <button className="nav-btn">
            <ChevronRight size={20} />
          </button>
          <button className="print-btn" aria-label="Print order">
            <Printer size={20} />
          </button>
        </div>
      </div>

      <div className="details-section">
        <h3 className="section-title">Detalle Order</h3>

        <div className="order-items">
          {order.items.map((item) => (
            <div key={item.id} className="detail-item">
              <div className="item-info">
                <span className="item-status-icon">{getItemStatusIcon(item.status)}</span>
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-quantity">{item.quantity}x</p>
                </div>
              </div>
              <div className="item-prices">
                <span className="item-unit-price">${item.price.toLocaleString()}</span>
                <span className="item-total-price">${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="details-section">
        <h3 className="section-title">Facturación Detalles</h3>

        <div className="billing-items">
          {order.items.map((item) => (
            <div key={item.id} className="billing-item">
              <span className="billing-item-name">
                {item.quantity}x {item.name}
              </span>
              <span className="billing-item-price">${(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="billing-summary">
          <div className="summary-row">
            <span className="summary-label">Total</span>
            <span className="summary-value">${subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">IQV</span>
            <span className="summary-value">${tax.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Propina</span>
            <span className="summary-value">$0.0</span>
          </div>
          <div className="summary-row total">
            <span className="summary-label">Total Facturación</span>
            <span className="summary-value">$. {(total / 1000).toFixed(2).replace(".", ",")}</span>
          </div>
        </div>

        <div className="action-buttons">
          <button className="payment-btn">Realizar pago</button>
          <button className="edit-btn">Editar</button>
        </div>
      </div>

      <div className="details-section">
        <h3 className="section-title">Responsable Order</h3>

        <div className="responsible-list">
          <div className="responsible-item">
            <div className="responsible-avatar">👩</div>
            <div className="responsible-info">
              <p className="responsible-name">Brisa Veliz</p>
              <p className="responsible-role">Chef Aguanile</p>
            </div>
          </div>

          <div className="responsible-item">
            <div className="responsible-avatar">👨</div>
            <div className="responsible-info">
              <p className="responsible-name">Miguel Diaz</p>
              <p className="responsible-role">Atención</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
