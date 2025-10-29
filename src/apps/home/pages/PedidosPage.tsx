import { useEffect, useState } from "react";
import { getPedidos } from "../../../services/pedidoService";

const PedidosPage = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const data = await getPedidos();
        setPedidos(data);
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
          <li key={p.id}>{p.nombreCliente}</li>
        ))}
      </ul>
    </div>
  );
};

export default PedidosPage;
