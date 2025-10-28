import enviroments from "../enviroments";

interface ApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

export const apiFetch = async <T = any>(
  endpoint: string,
  { method = "GET", body, headers = {} }: ApiOptions = {}
): Promise<T> => {

  const token = localStorage.getItem("token");
  const { apiPathBase, apiUrl } = enviroments;
  const url = `${apiPathBase}${apiUrl}${endpoint}`;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorMessage = "Error en la solicitud";

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || JSON.stringify(errorData);
      } catch {
        const errorText = await response.text();
        if (errorText) errorMessage = errorText;
      }

      throw new Error(errorMessage);
    }

    if (response.status === 204) return null as T;

    const data = await response.json();
    
    if (import.meta.env.MODE === "development") {
      console.log(`[apiFetch] ${method} ${url}`, data);
    }


    return data;
  } catch (error: any) {
    console.error(`[apiFetch ERROR] ${method} ${url}:`, error.message);
    throw error;
  }
};
