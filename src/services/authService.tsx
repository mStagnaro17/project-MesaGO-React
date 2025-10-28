import enviroments from "../enviroments";

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

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciales incorrectas o error en el servidor');
    }

    const data = await response.json();

    // ✅ Guardar el token en localStorage
    setToken(data.accessToken);

    console.log("Login exitoso:", data);

    // Retornar con formato estandarizado
    return {
        token: data.accessToken,
        username: data.username,
        role: data.role,
    };
};
