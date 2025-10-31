import { apiFetch } from "./apiService";
import type { ApiResponse } from "../core/entity/apiResponse";

export interface Cliente {
  idCliente: number;
  nombre: string;
  email: string;
  telefono: string;
  observaciones: string;
}

// 🟢 GET: obtener cliente por ID
export const getClienteById = async (id: number): Promise<ApiResponse<Cliente[]>> => {
  return await apiFetch(`/clientes/${id}`);
};


// 🟢 GET: obtener todos clientes
export const getClientes = async(): Promise<ApiResponse<Cliente[]>> => {
    return await apiFetch(`/clientes`);
} 