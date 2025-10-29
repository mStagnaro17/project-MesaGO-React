import { apiFetch } from "./apiService";

// GET: todas las mesas
export const getMesas = async () => {
  return await apiFetch("/mesas");
};

// GET: mesa por ID
export const getMesaById = async (id: number) => {
  return await apiFetch(`/mesas/${id}`);
};
