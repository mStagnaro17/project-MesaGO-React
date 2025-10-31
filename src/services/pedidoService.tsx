import { apiFetch } from "./apiService";
import type { ApiResponse } from "../core/entity/apiResponse";

export interface Mesa {
  idMesa: number;
  numero: number;
  capacidad: number;
  estado: string;
}

export interface Detalle {

}

export interface Pedido {
  idPedido: number;
  estado: string;
  fecha: string; 
  tiempoPreparado: string;
  total: number;
  idCliente: number;
  idTrabajador: number;
  mesa: Mesa;
  detalles: Detalle[];
}


// 🟢 GET: obtener todos los pedidos
export const getPedidos = async (): Promise<ApiResponse<Pedido[]>> => {
  return await apiFetch("/pedidos");
};

// 🟢 GET: obtener pedido por ID
export const getPedidoById = async (id: number): Promise<ApiResponse<Pedido>> => {
  return await apiFetch(`/pedidos/${id}`);
};

// 🟡 POST: crear un nuevo pedido
export const createPedido = async (pedidoData: Pedido): Promise<ApiResponse<Pedido>> => {
  return await apiFetch("/pedidos", {
    method: "POST",
    body: pedidoData,
  });
};

// 🟠 PUT: actualizar pedido existente
export const updatePedido = async (id: number, pedidoData: Pedido): Promise<ApiResponse<Pedido>> => {
  return await apiFetch(`/pedidos/${id}`, {
    method: "PUT",
    body: pedidoData,
  });
};

// 🔴 DELETE: eliminar pedido por ID
export const deletePedido = async (id: number): Promise<ApiResponse<null>> => {
  return await apiFetch(`/pedidos/${id}`, {
    method: "DELETE",
  });
};