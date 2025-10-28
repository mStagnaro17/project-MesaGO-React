import { apiFetch } from "./apiService";


// 🧾 PEDIDOS
export const getPedidos = async () =>
  apiFetch("/pedidos"); //

export const getPedidoById = async (id: number) =>
  apiFetch(`/pedidos/${id}`); //

export const createPedido = async (pedido: any) =>
  apiFetch("/pedidos", { method: "POST", body: pedido });

export const updatePedido = async (id: number, pedido: any) =>
  apiFetch(`/pedidos/${id}`, { method: "PUT", body: pedido });

export const deletePedido = async (id: number) =>
  apiFetch(`/pedidos/${id}`, { method: "DELETE" });


// 🍽️ MESAS
export const getMesas = async () =>
  apiFetch("/mesas");

export const createMesa = async (mesa: any) =>
  apiFetch("/mesas", { method: "POST", body: mesa });

export const updateMesa = async (id: number, mesa: any) =>
  apiFetch(`/mesas/${id}`, { method: "PUT", body: mesa });

export const deleteMesa = async (id: number) =>
  apiFetch(`/mesas/${id}`, { method: "DELETE" });


// 📦 DETALLES DE PEDIDO
export const getDetalles = async () =>
  apiFetch("/detalles");

export const getDetalleById = async (id: number) =>
  apiFetch(`/detalles/${id}`);

export const createDetalle = async (detalle: any) =>
  apiFetch("/detalles", { method: "POST", body: detalle });

export const updateDetalle = async (id: number, detalle: any) =>
  apiFetch(`/detalles/${id}`, { method: "PUT", body: detalle });

export const deleteDetalle = async (id: number) =>
  apiFetch(`/detalles/${id}`, { method: "DELETE" });
