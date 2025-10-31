<<<<<<< Updated upstream
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
import { getPedidos } from "../../../services/pedidoService";


// Tipos de datos
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
=======
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import OrdersList from "../components/OrdersList";
import DetailOrder from "../components/DetailOrder";
import FacturacionDetails from "../components/FacturacionDetails";
import FacturacionPage from "./FacturacionPage";
import "../styles/Dashboard.css";
import { getPedidos } from "../../../services/pedidoService";
import { getClientes } from "../../../services/clienteService";
import Swal from "sweetalert2";

// ✅ Tipos backend
interface Mesa {
  idMesa: number;
  numero: number;
  capacidad: number;
  estado: string;
}

interface DetallePedido {
  id?: number;
  plato?: { nombre: string };
  cantidad: number;
  precio: number;
}

interface PedidoBackend {
  idPedido: number;
  estado: string;
  fecha: string;
  tiempoPreparado: string;
  total: number;
  idCliente: number;
  idTrabajador: number;
  mesa: Mesa;
  detalles: DetallePedido[];
  customerName?: string;
  orderNumber?: string;
}

// 🌟 Dashboard principal
const DashboardContent = () => {
  const [orders, setOrders] = useState<PedidoBackend[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<PedidoBackend | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalDispatched: 0,
    totalRevenue: 0,
  });
>>>>>>> Stashed changes

  // 💳 Función de pago
  const handlePayment = (orderToPay: PedidoBackend, method: string) => {
    Swal.fire({
      title: "Pago realizado con éxito 💰",
      text: `El pedido #${orderToPay.idPedido} fue pagado con ${method}.`,
      icon: "success",
      confirmButtonColor: "#22c55e",
    });

    setOrders((prev) =>
      prev.map((o) =>
        o.idPedido === orderToPay.idPedido ? { ...o, estado: "Completado" } : o
      )
    );
  };

  // 🔁 Cargar datos del backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
<<<<<<< Updated upstream
        setLoading(true)
        // Llamada real al backend 
        const pedidosData = await getPedidos()

        // Adaptamos los datos del backend a la estructura visual del dashboard
        const formattedOrders = pedidosData.map((p: any) => ({
          id: p.id?.toString() || "",
          orderNumber: `#${p.id}`,
          customerName: p.cliente?.nombre || "Sin cliente",
          status:
            p.estado?.toLowerCase() === "completado"
              ? "completed"
              : p.estado?.toLowerCase() === "cancelado"
              ? "cancelled"
              : "pending",
          items:
            p.detalles?.map((d: any) => ({
              id: d.id?.toString(),
              name: d.plato?.nombre || "Sin nombre",
              quantity: d.cantidad || 1,
              price: d.precio || 0,
              status: "ready",
            })) || [],
          total: p.total || 0,
          createdAt: p.fechaRegistro || new Date().toISOString(),
          address: p.mesa?.ubicacion || "Sin ubicación",
        }))

        // Guardamos los pedidos formateados
        setOrders(formattedOrders)
        if (formattedOrders.length > 0) {
          setSelectedOrder(formattedOrders[0])
        }

       setStats({
  totalOrders: formattedOrders.length,
  totalDispatched: formattedOrders.filter((o: Order) => o.status === "completed").length,
  totalRevenue: formattedOrders.reduce((sum: number, o: Order) => sum + (o.total || 0), 0)
});

=======
        setLoading(true);
        const [pedidosResp, clientesResp] = await Promise.all([
          getPedidos(),
          getClientes(),
        ]);

        if (!pedidosResp.success || !clientesResp.success) {
          console.error("Error al obtener pedidos o clientes");
          setOrders([]);
          return;
        }

        const clientesMap = new Map<number, string>();
        clientesResp.data.forEach((c: any) =>
          clientesMap.set(c.idCliente, c.nombre)
        );

        const formattedOrders: PedidoBackend[] = pedidosResp.data.map(
          (p: any) => {
            const nombreCliente = clientesMap.get(p.idCliente) || "Sin cliente";
            return {
              ...p,
              customerName: nombreCliente,
              orderNumber: `#${p.idPedido}`,
            };
          }
        );

        setOrders(formattedOrders);
        if (formattedOrders.length > 0) setSelectedOrder(formattedOrders[0]);

        setStats({
          totalOrders: formattedOrders.length,
          totalDispatched: formattedOrders.filter(
            (o) => o.estado.toLowerCase() === "completado"
          ).length,
          totalRevenue: formattedOrders.reduce(
            (sum, o) => sum + (o.total || 0),
            0
          ),
        });
>>>>>>> Stashed changes
      } catch (error) {
        console.error(" Error al obtener datos del dashboard:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  //  Filtro por nombre o número de orden
  const filteredOrders = orders.filter(
    (order) =>
<<<<<<< Updated upstream
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  )
=======
      order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
>>>>>>> Stashed changes

  // 🧩 Adaptar pedidos para OrdersList
  const adaptedOrders = filteredOrders.map((p) => ({
    id: String(p.idPedido),
    orderNumber: `#${p.idPedido}`,
    customerName: p.customerName || "Cliente sin nombre",
    status:
      p.estado?.toLowerCase() === "pendiente"
        ? "pending"
        : p.estado?.toLowerCase() === "completado"
        ? "completed"
        : "cancelled" as "pending" | "completed" | "cancelled", // ✅ corregido aquí
    items:
      p.detalles?.map((d) => ({
        id: String(d.id || Math.random()),
        name: d.plato?.nombre || "Sin nombre",
        quantity: d.cantidad || 1,
        price: d.precio || 0,
        status: "ready" as const,
      })) || [],
    total: p.total || 0,
    createdAt: p.fecha || new Date().toISOString(),
    address: p.mesa ? `Mesa ${p.mesa.numero}` : "Sin ubicación",
    timeEstimate: p.tiempoPreparado || "+8 min",
  }));

  // 🧩 Adaptar la orden seleccionada para DetailOrder
  const adaptedSelectedOrder =
    selectedOrder &&
    ({
      id: String(selectedOrder.idPedido),
      orderNumber: `#${selectedOrder.idPedido}`,
      customerName: selectedOrder.customerName || "Cliente sin nombre",
      status:
        selectedOrder.estado?.toLowerCase() === "pendiente"
          ? "pending"
          : selectedOrder.estado?.toLowerCase() === "completado"
          ? "completed"
          : "cancelled",
      items:
        selectedOrder.detalles?.map((d) => ({
          id: String(d.id || Math.random()),
          name: d.plato?.nombre || "Sin nombre",
          quantity: d.cantidad || 1,
          price: d.precio || 0,
          status: "ready" as const,
        })) || [],
      total: selectedOrder.total || 0,
      createdAt: selectedOrder.fecha || new Date().toISOString(),
      address: selectedOrder.mesa
        ? `Mesa ${selectedOrder.mesa.numero}`
        : "Sin ubicación",
    } as const);

  return (
    <>
      <Header onSearch={setSearchTerm} />
      <div className="dashboard-content">
        <StatsCards stats={stats} />
        <div className="dashboard-grid">
          <OrdersList
            orders={adaptedOrders}
            selectedOrder={adaptedSelectedOrder || null}
            onSelectOrder={(o) => {
              const found = orders.find((x) => String(x.idPedido) === o.id);
              if (found) setSelectedOrder(found);
            }}
            loading={loading}
          />

          {selectedOrder && adaptedSelectedOrder && (
            <>
              <DetailOrder order={adaptedSelectedOrder} />
              <FacturacionDetails
                order={selectedOrder}
                onPayment={handlePayment}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

// 🌍 Página principal con Sidebar dinámico
const DashboardPage = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardContent />;
      case "facturacion":
        return <FacturacionPage />;
      case "gestion":
        return <div>Gestión próximamente</div>;
      case "reservas":
        return <div>Reservas próximamente</div>;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar activeItem={activeView} onSelectItem={setActiveView} />
      <div className="dashboard-main">{renderContent()}</div>
    </div>
  )
}

export default DashboardPage
