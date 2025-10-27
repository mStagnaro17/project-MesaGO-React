"use client"

import type React from "react"
import { MapPin } from "lucide-react"

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

interface DetailOrderProps {
  order: Order
}

const DetailOrder: React.FC<DetailOrderProps> = ({ order }) => {
  const getItemStatusIcon = (status?: string) => {
    const statusMap: Record<string, { icon: string; color: string }> = {
      pending: { icon: "⏳", color: "text-yellow-500" },
      ready: { icon: "✅", color: "text-green-500" },
      delivered: { icon: "✓", color: "text-green-500" },
    }
    return statusMap[status || "pending"]
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h4 className="text-sm font-bold text-blue-600 mb-4">Detalle Order</h4>

      <div className="space-y-3 mb-6">
        {order.items.map((item) => {
          const statusInfo = getItemStatusIcon(item.status)
          return (
            <div key={item.id} className="flex items-start gap-3">
              <span className={`text-lg ${statusInfo.color}`}>{statusInfo.icon}</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">{item.quantity}x</p>
                <p className="text-xs text-gray-400 uppercase">Clásico</p>
              </div>
              <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">+8 min</span>
            </div>
          )
        })}
      </div>

      {/* Location section */}
      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex items-start gap-2">
          <MapPin size={16} className="text-blue-500 mt-1 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-gray-900">Mesa 4</p>
            <p className="text-xs text-gray-500">Adultos 3 - Niños 1</p>
          </div>
        </div>
      </div>

      {/* Responsable Order section */}
      <div className="border-t border-gray-200 pt-4">
        <h5 className="text-sm font-bold text-blue-600 mb-3">Responsable Order</h5>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full flex items-center justify-center text-sm font-bold text-white">
              B
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900">Chef Asignado</p>
              <p className="text-xs text-gray-600">Brisa Veliz</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center text-sm font-bold text-white">
              M
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900">Mesero</p>
              <p className="text-xs text-gray-600">Miguel Diaz</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 pb-2 border-b-2 border-blue-600">
          Atención
        </button>
        <button className="text-xs font-semibold text-gray-500 hover:text-gray-700 pb-2">Preparación</button>
        <button className="text-xs font-semibold text-gray-500 hover:text-gray-700 pb-2">Entrega</button>
        <button className="text-xs font-semibold text-gray-500 hover:text-gray-700 pb-2">Cobro</button>
      </div>
    </div>
  )
}

export default DetailOrder
