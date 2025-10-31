import { apiFetch } from "./apiService";
import type { ApiResponse } from "../core/entity/apiResponse";

// Tipos
export interface Factura {
  idFactura: number;
  cliente: string;
  total: number;
  estado: "pagada" | "pendiente" | "vencida";
  fechaEmision: string;
  metodoPago: string;
}

// 🟢 GET: obtener todas las facturas
export const getFacturas = async (): Promise<ApiResponse<Factura[]>> => {
  return await apiFetch("/facturacion");
};

// 🟢 GET: obtener factura por ID
export const getFacturaById = async (id: number): Promise<ApiResponse<Factura>> => {
  return await apiFetch(`/facturacion/${id}`);
};

// 🟡 POST: crear una nueva factura
export const createFactura = async (facturaData: Factura): Promise<ApiResponse<Factura>> => {
  return await apiFetch("/facturacion", {
    method: "POST",
    body: facturaData,
  });
};

// 🟠 PUT: actualizar una factura existente
export const updateFactura = async (id: number, facturaData: Factura): Promise<ApiResponse<Factura>> => {
  return await apiFetch(`/facturacion/${id}`, {
    method: "PUT",
    body: facturaData,
  });
};

// 🔴 DELETE: eliminar una factura
export const deleteFactura = async (id: number): Promise<ApiResponse<null>> => {
  return await apiFetch(`/facturacion/${id}`, {
    method: "DELETE",
  });
};
