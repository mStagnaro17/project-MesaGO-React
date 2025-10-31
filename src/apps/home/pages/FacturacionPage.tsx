import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import FacturacionList from "../components/FacturacionList";
import FacturacionDetails from "../components/FacturacionDetails";
import "../styles/Facturacion.css";
import { getPedidos, updatePedido } from "../../../services/pedidoService";
import { getClientes } from "../../../services/clienteService";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// ✅ Tipos del backend
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

interface Order {
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

interface FacturaAdaptada {
  id: string;
  cliente: string;
  total: number;
  estado: "pagada" | "pendiente" | "vencida";
  fechaEmision: string;
  metodoPago: string;
}

interface FacturacionPageProps {
  onOrderUpdate?: (updatedOrderId: string, newStatus: string) => void;
}

const FacturacionPage: React.FC<FacturacionPageProps> = ({ onOrderUpdate }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔄 Cargar pedidos y clientes
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [pedidosResp, clientesResp] = await Promise.all([
        getPedidos(),
        getClientes(),
      ]);

      if (!pedidosResp?.success || !clientesResp?.success) {
        console.error("Error al obtener pedidos o clientes del backend");
        setOrders([]);
        return;
      }

      // Mapear clientes por ID
      const clientesMap = new Map<number, string>();
      clientesResp.data.forEach((c: any) =>
        clientesMap.set(c.idCliente, c.nombre)
      );

      // Formatear pedidos
      const formattedOrders: Order[] = pedidosResp.data.map((p: any) => {
        const nombreCliente = clientesMap.get(p.idCliente) || "Sin cliente";
        return {
          ...p,
          customerName: nombreCliente,
          orderNumber: `#${p.idPedido}`,
        };
      });

      setOrders(formattedOrders);

      if (selectedOrder) {
        setSelectedOrder(
          formattedOrders.find((o) => o.idPedido === selectedOrder.idPedido) ||
            null
        );
      } else if (formattedOrders.length > 0) {
        setSelectedOrder(formattedOrders[0]);
      }
    } catch (error) {
      console.error("Error al cargar pedidos para facturación:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [selectedOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🔍 Filtro de búsqueda
  const filteredOrders = orders.filter((order) =>
    order.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 💰 Adaptar los datos al formato que usa FacturacionList
  const facturasAdaptadas: FacturaAdaptada[] = filteredOrders.map((order) => ({
    id: String(order.idPedido),
    cliente: order.customerName || "Sin cliente",
    total: order.total,
    estado:
      order.estado?.toLowerCase() === "completado"
        ? "pagada"
        : order.estado?.toLowerCase() === "cancelado"
        ? "vencida"
        : "pendiente",
    fechaEmision: new Date(order.fecha).toLocaleDateString(),
    metodoPago: "Pendiente",
  }));

  // 🧾 Seleccionar factura
  const handleSelectFactura = (factura: FacturaAdaptada) => {
    const order = orders.find((o) => String(o.idPedido) === factura.id) || null;
    setSelectedOrder(order);
  };

  // 💳 Manejar pago
  const handlePayment = (orderToPay: Order, method: string): void => {
    Swal.fire({
      title: `¿Confirmar pago con ${method}?`,
      text: `El pedido #${orderToPay.idPedido} se marcará como "Facturado".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, pagar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      background: "#f9fafb",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // ✅ Body exacto que pide el backend
          const updatedOrder = {
            estado: "Facturado",
            fecha: orderToPay.fecha,
            tiempoPreparado: orderToPay.tiempoPreparado || "00:10:00",
            total: orderToPay.total,
            idCliente: orderToPay.idCliente,
            idTrabajador: orderToPay.idTrabajador,
            idMesa: orderToPay.mesa.idMesa,
            detalles: [],
          };

          const resp = await updatePedido(orderToPay.idPedido, updatedOrder);

          if (resp?.success) {
            Swal.fire("¡Pagado!", "El pedido ha sido marcado como Facturado.", "success");

            setOrders((prev) =>
              prev.map((o) =>
                o.idPedido === orderToPay.idPedido
                  ? { ...o, estado: "Facturado" }
                  : o
              )
            );

            setSelectedOrder((prev) =>
              prev ? { ...prev, estado: "Facturado" } : prev
            );

            onOrderUpdate?.(orderToPay.idPedido.toString(), "Facturado");
          } else {
            Swal.fire("Error", "No se pudo actualizar el pedido.", "error");
          }
        } catch (error) {
          console.error("Error al procesar el pago:", error);
          Swal.fire("Error", "Hubo un problema al intentar pagar el pedido.", "error");
        }
      }
    });
  };

  return (
    <>
      <Header onSearch={setSearchTerm} />
      <div className="dashboard-content">
        <div
          className={`dashboard-grid ${
            selectedOrder ? "expanded-view" : "normal-view"
          }`}
        >
          {!selectedOrder && (
            <FacturacionList
              facturas={facturasAdaptadas}
              loading={loading}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSelectFactura={handleSelectFactura}
            />
          )}

          {selectedOrder && (
            <div className="facturacion-details-container">
              <FacturacionDetails
                order={selectedOrder}
                onPayment={handlePayment}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FacturacionPage;
