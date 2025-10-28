import {apiFetch} from "./apiService";

/**
 * Servicio: PedidoService
 * operaciones CRUD para pedidos, mesas y detalles de pedido
 * Todos los endpoints están protegidos con Token
 */

// PEDIDOS
export const getPedidos = async () => apiFetch("/pedidos", "GET");

export const getPedidoById = async (id: number) =>
  apiFetch(`/pedidos/${id}`, "GET");

export const createPedido = async (pedido: any) =>
  apiFetch("/pedidos", "POST", pedido);

export const updatePedido = async (id: number, pedido: any) =>
  apiFetch(`/pedidos/${id}`, "PUT", pedido);

export const deletePedido = async (id: number) =>
  apiFetch(`/pedidos/${id}`, "DELETE");

// MESAS
export const getMesas = async () => apiFetch("/mesas", "GET");

export const createMesa = async (mesa: any) =>
  apiFetch("/mesas", "POST", mesa);

export const updateMesa = async (id: number, mesa: any) =>
  apiFetch(`/mesas/${id}`, "PUT", mesa);

export const deleteMesa = async (id: number) =>
  apiFetch(`/mesas/${id}`, "DELETE");

// DETALLES DE PEDIDO
export const getDetalles = async () => apiFetch("/detalles", "GET");

export const getDetalleById = async (id: number) =>
  apiFetch(`/detalles/${id}`, "GET");

export const createDetalle = async (detalle: any) =>
  apiFetch("/detalles", "POST", detalle);

export const updateDetalle = async (id: number, detalle: any) =>
  apiFetch(`/detalles/${id}`, "PUT", detalle);

export const deleteDetalle = async (id: number) =>
  apiFetch(`/detalles/${id}`, "DELETE");
