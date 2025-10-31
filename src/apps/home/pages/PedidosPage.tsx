import { useEffect, useState } from "react";
import { getPedidos } from "../../../services/pedidoService";
import { getClienteById } from "../../../services/clienteService";
import type { ApiResponse } from "../../../core/entity/apiResponse";
import type { Pedido } from "../../../services/pedidoService";
import type { Cliente } from "../../../services/clienteService";

interface PedidoConCliente extends Pedido {
  nombreCliente?: string;
}

const PedidosPage = () => {
  const [pedidos, setPedidos] = useState<PedidoConCliente[]>([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response: ApiResponse<Pedido[]> = await getPedidos();
        const pedidosData = response.data;

        // 🔄 Obtener los nombres de los clientes en paralelo
        const pedidosConClientes = await Promise.all(
          pedidosData.map(async (p) => {
            try {
              const clienteResp: ApiResponse<Cliente[]> = await getClienteById(p.idCliente);
              const cliente = clienteResp.data[0]; // ✅ Extraer el primer cliente del array
              return { ...p, nombreCliente: cliente?.nombre || "Cliente desconocido" };
            } catch {
              return { ...p, nombreCliente: "Cliente desconocido" };
            }
          })
        );

        setPedidos(pedidosConClientes);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <div>
      <h1>Lista de Pedidos</h1>
      <ul>
        {pedidos.map((p) => (
          <li key={p.idPedido}>
            {p.nombreCliente || "Sin cliente"} — Estado: {p.estado}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PedidosPage;