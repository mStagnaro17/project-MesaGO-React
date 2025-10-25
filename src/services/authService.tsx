import enviroments from "../enviroments";

export interface LoginResponse {
    token: string;
    userId: string;
}

interface LoginCredentials {
    username: string;
    password: string;
}

export const login = async ({ username, password }: LoginCredentials): Promise<LoginResponse> => {

    const { apiPathBase, apiUrl, apiAuth } = enviroments;

    const API_URL = `${apiPathBase}${apiUrl}${apiAuth}/login`;

    const response = await fetch(
        API_URL
        , {
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
    return response.json();

    console.log('Pruebita', API_URL, response);

}