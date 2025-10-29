import { apiFetch } from "./apiService";

// 🟢 GET: obtener todos los pedidos
export const getPedidos = async () => {
  return await apiFetch("/pedidos");
};

// 🟢 GET: obtener pedido por ID
export const getPedidoById = async (id: number) => {
  return await apiFetch(`/pedidos/${id}`);
};

// 🟡 POST: crear un nuevo pedido
export const createPedido = async (pedidoData: any) => {
  return await apiFetch("/pedidos", {
    method: "POST",
    body: pedidoData,
  });
};

// 🟠 PUT: actualizar pedido existente
export const updatePedido = async (id: number, pedidoData: any) => {
  return await apiFetch(`/pedidos/${id}`, {
    method: "PUT",
    body: pedidoData,
  });
};

// 🔴 DELETE: eliminar pedido por ID
export const deletePedido = async (id: number) => {
  return await apiFetch(`/pedidos/${id}`, {
    method: "DELETE",
  });
};
