"use client"

import type React from "react"

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

interface FacturacionDetailsProps {
  order: Order
}

const FacturacionDetails: React.FC<FacturacionDetailsProps> = ({ order }) => {
  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h4 className="text-sm font-bold text-blue-600 mb-4">Facturación Detalles</h4>

      {/* Items table */}
      <div className="space-y-2 mb-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between items-start text-xs">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                {item.quantity}x {item.name}
              </p>
              <p className="text-gray-400 text-xs uppercase">Clásico</p>
              <p className="text-gray-400 text-xs uppercase">Crema de rocoto</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">${(item.price / 1000).toFixed(2)}</p>
              <p className="text-gray-500">${((item.price * item.quantity) / 1000).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary section */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-2 mb-4">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Total</span>
          <span className="font-semibold text-gray-900">${(subtotal / 1000).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">IGV</span>
          <span className="font-semibold text-gray-900">${(tax / 1000).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Propina</span>
          <span className="font-semibold text-gray-900">$0.00</span>
        </div>
        <div className="flex justify-between text-xs pt-2 border-t border-gray-200 font-bold">
          <span className="text-gray-900">Total Facturación</span>
          <span className="text-green-600">S/. {(total / 1000).toFixed(2)}</span>
        </div>
      </div>

      {/* Payment options */}
      <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded">
        <input type="checkbox" id="payment-method" className="w-4 h-4" />
        <label htmlFor="payment-method" className="text-xs text-gray-600">
          Tarjeta crédito o débito / Qr
        </label>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
          Realizar pago
        </button>
        <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
          Editar
        </button>
      </div>
    </div>
  )
}

export default FacturacionDetails
