import { apiFetch } from "./apiService";

// GET: todos los detalles
export const getDetalles = async () => {
  return await apiFetch("/detalles");
};

// GET: detalle por ID
export const getDetalleById = async (id: number) => {
  return await apiFetch(`/detalles/${id}`);
};
