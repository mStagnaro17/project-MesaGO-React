import enviroments from "../enviroments";
import type { ApiResponse } from "../core/entity/apiResponse";

export interface LoginResponse {
    token: string;
    username: string;
    role: string;
}

interface LoginCredentials {
    username: string;
    password: string;
}



// ✅ Guardar / obtener / limpiar token
export const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
    return localStorage.getItem("token");
};

export const clearToken = () => {
    localStorage.removeItem("token");
};

// ✅ Método login con guardado automático
export const login = async ({ username, password }: LoginCredentials): Promise<LoginResponse> => {
    const { apiPathBase, apiUrl, apiAuth } = enviroments;
    const API_URL = `${apiPathBase}${apiUrl}${apiAuth}/login`;

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const responseData: ApiResponse<{
        accessToken: string;
        username: string;
        role: string;
    }> = await response.json();

    if (!response.ok || !responseData.success) {
        throw new Error(responseData.message || 'Credenciales incorrectas o error en el servidor');
    }

    // ✅ Guardar el token en localStorage
    setToken(responseData.data.accessToken);

    console.log("Login exitoso:", responseData);

    // Retornar con formato estandarizado
    return {
        token: responseData.data.accessToken,
        username: responseData.data.username,
        role: responseData.data.role,
    };
};