import enviroments from "../enviroments";
/**
 * apiService
 * Servicio base para hacer peticiones HTTP con fetch + token JWT
 */

export const apiFetch = async (
  endpoint: string,
  method: string = "GET",
  body?: any
) => {
  const token = localStorage.getItem("token");
  const { apiPathBase, apiUrl } = enviroments;

  const response = await fetch(`${apiPathBase}${apiUrl}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error en la solicitud");
  }

  return response.json();
};
