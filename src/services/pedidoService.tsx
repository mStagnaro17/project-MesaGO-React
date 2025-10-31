
import { apiFetch } from "./apiService";

// 🧾 PEDIDOS
export const getPedidos = async () =>
  apiFetch("/pedidos"); //

export const getPedidoById = async (id: number) =>
  apiFetch(`/pedidos/${id}`); //

export const createPedido = async (pedido: any) =>

  apiFetch("/pedidos", { method: "POST", body: pedido });

  apiFetch("/pedidos", "POST", pedido);

// project-MesAGO-React/src/services/pedidoService.ts
import { apiFetch } from "./apiService";
import type { ApiResponse } from "../core/entity/apiResponse";

export interface Mesa {
  idMesa: number;
  numero: number;
  capacidad: number;
  estado: string; // "Disponible", "Ocupada", etc.
}

export interface Plato {
  idPlato: number;
  nombre: string;
  descripcion: string;
  precio: number;
  urlImagen: string;
  idCategoria: number;
}

export interface DetallePedido {
  idDetallePedido: number; // Añadido
  cantidad: number;
  precioUnitario: number; // Añadido
  subtotal: number; // Añadido
  comentario: string;
  plato: Plato; // Objeto de Plato asociado al detalle
  // Podrías tener idPedido si el backend lo necesita en el detalle
}

export interface Pedido {
  idPedido: number;
  estado: string; // "Pendiente", "Completado", "Cancelado"
  fecha: string; // "YYYY-MM-DDTHH:mm:ss"
  tiempoPreparado: string; // "HH:mm:ss"
  total: number;
  idCliente: number;
  idTrabajador: number;
  mesa: Mesa;
  detalles: DetallePedido[]; // Usamos la nueva interfaz DetallePedido
}


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

  apiFetch(`/detalles/${id}`, "DELETE");

// 🟠 PUT: actualizar pedido existente
export const updatePedido = async (
  id: number,
  pedidoData: Partial<Pedido>
): Promise<ApiResponse<Pedido>> => {

  // ✅ Mapeamos el body como el backend lo requiere
  const payload = {
    estado: pedidoData.estado,
    fecha: pedidoData.fecha,
    tiempoPreparado: pedidoData.tiempoPreparado,
    total: pedidoData.total,
    idCliente: pedidoData.idCliente,
    idTrabajador: pedidoData.idTrabajador,
    idMesa: pedidoData.mesa?.idMesa, // 👈 importante: extraer idMesa
    detalles: pedidoData.detalles ?? [],
  };

  return await apiFetch(`/pedidos/${id}`, {
    method: "PUT",
    body: payload,
  });
};


// 🔴 DELETE: eliminar pedido por ID
export const deletePedido = async (id: number): Promise<ApiResponse<null>> => {
  return await apiFetch(`/pedidos/${id}`, {
    method: "DELETE",
  });
};
