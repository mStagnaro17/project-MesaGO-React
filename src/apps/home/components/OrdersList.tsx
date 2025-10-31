"use client"

import type React from "react"
import { ChevronDown, MapPin, CheckCircle, AlertCircle } from "lucide-react"

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
  timeEstimate?: string
}

interface OrdersListProps {
  orders: Order[]
  selectedOrder: Order | null
  onSelectOrder: (order: Order) => void
  loading: boolean
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, selectedOrder, onSelectOrder, loading }) => {
  const getStatusBadge = (status: string, timeEstimate?: string) => {
    const statusMap: Record<string, { label: string; bgColor: string; textColor: string }> = {
      pending: { label: timeEstimate || "+8 min", bgColor: "bg-yellow-100", textColor: "text-yellow-700" },
      completed: { label: "Completado", bgColor: "bg-green-100", textColor: "text-green-700" },
      cancelled: { label: "Cancelado", bgColor: "bg-red-100", textColor: "text-red-700" },
    }
    return statusMap[status] || statusMap.pending
  }

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Cargando órdenes...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-blue-600">Órdenes</h2>
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
          <ChevronDown size={16} />
          Filtrar
        </button>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {orders.map((order) => {
          const statusInfo = getStatusBadge(order.status, order.timeEstimate)
          const isSelected = selectedOrder?.id === order.id

          return (
            <div
              key={order.id}
              onClick={() => onSelectOrder(order)}
              className={`p-4 rounded-lg cursor-pointer transition-all relative shadow-sm ${isSelected
                  ? "border-2 border-blue-500 bg-blue-50"
                  : "border border-gray-200 bg-white hover:shadow-md hover:border-gray-300"
                }`}
            >

              <div className="absolute top-3 right-3">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${statusInfo.bgColor} ${statusInfo.textColor}`}
                >
                  {statusInfo.label}
                </span>
              </div>

              {/* Order ID */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-sm text-gray-900">ID Orden {order.orderNumber}</span>
              </div>

              {/* Customer Name */}
              <h3 className="font-bold text-gray-900 mb-1 text-base">{order.customerName}</h3>

              {/* Time */}
              <p className="text-xs text-gray-400 mb-3">
                {new Date(order.createdAt).toLocaleString("es-PE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              {/* Items with dropdown */}
              <div className="mb-3">
                <div className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-gray-900">
                  <span>
                    {order.items.length}x {order.items[0]?.name}
                  </span>
                  <ChevronDown size={14} />
                </div>
                {order.items.length > 1 && <p className="text-xs text-gray-400 mt-1">+{order.items.length - 1} más</p>}
              </div>

              {/* Address with icon and status indicator */}
              {order.address && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin size={14} className="text-blue-500 flex-shrink-0" />
                  <span>{order.address}</span>
                  <div className="ml-auto">
                    {order.status === "completed" && <CheckCircle size={14} className="text-green-500" />}
                    {order.status === "cancelled" && <AlertCircle size={14} className="text-red-500" />}
                  </div>
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
