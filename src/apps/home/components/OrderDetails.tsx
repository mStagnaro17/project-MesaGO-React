"use client"

import type React from "react"
import { ChevronRight, Printer } from "lucide-react"

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
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm max-h-[600px] overflow-y-auto">
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-200 mb-4">
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">ID Orden {order.orderNumber}</p>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{order.customerName}</h3>
          <p className="text-xs text-gray-400">12:37 PM | HOY</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-1 rounded">+8 min</span>
          <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">1/4</span>
          <button className="p-2 bg-gray-100 border border-gray-200 rounded-md hover:bg-gray-200 transition-colors">
            <ChevronRight size={20} className="text-gray-600" />
          </button>
          <button className="p-2 bg-gray-100 border border-gray-200 rounded-md hover:bg-gray-200 transition-colors">
            <Printer size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Detalle Order Section */}
        <div>
          <h4 className="text-sm font-bold text-blue-600 mb-3">Detalle Order</h4>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-start gap-2">
                <span className="text-lg mt-1">{getItemStatusIcon(item.status)}</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.quantity}x</p>
                  <p className="text-xs text-gray-400">+8 min</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Facturación Detalles Section */}
        <div>
          <h4 className="text-sm font-bold text-blue-600 mb-3">Facturación Detalles</h4>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-xs">
                <span className="text-gray-600">
                  {item.quantity}x {item.name}
                </span>
                <span className="font-semibold text-gray-900">${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded p-3 space-y-2 mb-4">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Total</span>
          <span className="font-semibold text-gray-900">${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">IQV</span>
          <span className="font-semibold text-gray-900">${tax.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Propina</span>
          <span className="font-semibold text-gray-900">$0.0</span>
        </div>
        <div className="flex justify-between text-xs pt-2 border-t border-gray-200 font-bold">
          <span className="text-gray-900">Total Facturación</span>
          <span className="text-green-600">$. {(total / 1000).toFixed(2).replace(".", ",")}</span>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          Realizar pago
        </button>
        <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          Editar
        </button>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-bold text-blue-600 mb-3">Responsable Order</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
            <div className="w-9 h-9 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full flex items-center justify-center text-lg font-bold text-white">
              B
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900">Chef Asignado</p>
              <p className="text-xs text-gray-500">Brisa Veliz</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center text-lg font-bold text-white">
              M
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900">Mesero</p>
              <p className="text-xs text-gray-500">Miguel Diaz</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
