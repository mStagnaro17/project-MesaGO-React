"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import StatsCards from "../components/StatsCards"
import OrdersList from "../components/OrdersList"
import DetailOrder from "../components/DetailOrder"
import FacturacionDetails from "../components/FacturacionDetails"
import "../styles/Dashboard.css"

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

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  status?: "pending" | "ready" | "delivered"
}

interface Stats {
  totalOrders: number
  totalDispatched: number
  totalRevenue: number
}

const DashboardPage: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    totalDispatched: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        // Reemplaza estas URLs con tus endpoints reales del API Gateway
        const [ordersRes, statsRes] = await Promise.all([
          fetch("/api/orders"), // Cambiar por tu endpoint real
          fetch("/api/stats"), // Cambiar por tu endpoint real
        ])

        if (ordersRes.ok) {
          const ordersData = await ordersRes.json()
          setOrders(ordersData)
          if (ordersData.length > 0) {
            setSelectedOrder(ordersData[0])
          }
        }

        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats(statsData)
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        // Datos de ejemplo para desarrollo
        setOrders(mockOrders)
        setStats(mockStats)
        if (mockOrders.length > 0) {
          setSelectedOrder(mockOrders[0])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Header onSearch={setSearchTerm} />
        <div className="dashboard-content">
          <StatsCards stats={stats} />
          <div className="dashboard-grid">
            <OrdersList
              orders={filteredOrders}
              selectedOrder={selectedOrder}
              onSelectOrder={setSelectedOrder}
              loading={loading}
            />
            {selectedOrder && (
              <>
                <DetailOrder order={selectedOrder} />
                <FacturacionDetails order={selectedOrder} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "#01823",
    customerName: "Peter Kukurelo",
    status: "pending",
    items: [
      { id: "1", name: "Arroz con Mariscos", quantity: 2, price: 25000, status: "ready" },
      { id: "2", name: "Leche de Tigre", quantity: 1, price: 15000, status: "pending" },
      { id: "3", name: "Combo marino-Jr", quantity: 1, price: 18000, status: "pending" },
    ],
    total: 58000,
    createdAt: "2024-10-25T10:30:00",
    address: "Avenida 5 - Niños 1",
  },
  {
    id: "2",
    orderNumber: "#01822",
    customerName: "Camila Campos",
    status: "completed",
    items: [{ id: "1", name: "Mar Mil Frita", quantity: 1, price: 22000, status: "delivered" }],
    total: 22000,
    createdAt: "2024-10-25T09:15:00",
  },
  {
    id: "3",
    orderNumber: "#01821",
    customerName: "Valeria Hayatt",
    status: "cancelled",
    items: [{ id: "1", name: "Ceviche Especial", quantity: 1, price: 28000, status: "pending" }],
    total: 28000,
    createdAt: "2024-10-25T08:45:00",
  },
]

const mockStats: Stats = {
  totalOrders: 1750,
  totalDispatched: 560,
  totalRevenue: 23350.25,
}

export default DashboardPage
