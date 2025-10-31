import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import OrdersList from "../components/OrdersList";
import DetailOrder from "../components/DetailOrder";
import FacturacionDetails from "../components/FacturacionDetails";
import "../styles/Dashboard.css";
import { getPedidos } from "../../../services/pedidoService";
import { getClientes } from "../../../services/clienteService"; 

// Tipos de datos
interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  status: "pending" | "completed" | "cancelled";
  items: OrderItem[];
  total: number;
  createdAt: string;
  address?: string;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  status?: "pending" | "ready" | "delivered";
}

interface Stats {
  totalOrders: number;
  totalDispatched: number;
  totalRevenue: number;
}

const DashboardPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    totalDispatched: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [pedidosResp, clientesResp] = await Promise.all([getPedidos(), getClientes()]);

        if (!pedidosResp.success || !clientesResp.success) {
          console.error("Error del backend");
          setOrders([]);
          return;
        }

        const clientesMap = new Map<number, string>();
        clientesResp.data.forEach((c: any) => clientesMap.set(c.idCliente, c.nombre));

        const formattedOrders: Order[] = pedidosResp.data.map((p: any) => {
          const nombreCliente = clientesMap.get(p.idCliente) || "Sin cliente";

          return {
            id: p.idPedido?.toString() || "",
            orderNumber: `#${p.idPedido}`,
            customerName: nombreCliente,
            status:
              p.estado?.toLowerCase() === "completado"
                ? "completed"
                : p.estado?.toLowerCase() === "cancelado"
                ? "cancelled"
                : "pending",
            items:
              p.detalles?.map((d: any) => ({
                id: d.id?.toString() || "",
                name: d.plato?.nombre || "Sin nombre",
                quantity: d.cantidad || 1,
                price: d.precio || 0,
                status: "ready" as const,
              })) || [],
            total: p.total || 0,
            createdAt: p.fecha || new Date().toISOString(),
            address: p.mesa?.numero ? `Mesa ${p.mesa.numero}` : "Sin ubicación",
          };
        });

        setOrders(formattedOrders);
        if (formattedOrders.length > 0) setSelectedOrder(formattedOrders[0]);

        setStats({
          totalOrders: formattedOrders.length,
          totalDispatched: formattedOrders.filter((o) => o.status === "completed").length,
          totalRevenue: formattedOrders.reduce((sum, o) => sum + (o.total || 0), 0),
        });
      } catch (error) {
        console.error("Error al obtener datos del dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  );
};

export default DashboardPage;
