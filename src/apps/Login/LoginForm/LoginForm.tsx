import React, { useState } from "react";
import { login } from "../../../services/authService";
import logo from "./../../assets/Logo.png"

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Enviando Datos:', { username, password });
        alert(`Bienvenido: ${username}`);

        try {
            const data = await login({ username, password });

            console.log('Login exitoso', data);
            alert(`!Bienvenido!`)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocurrió un error inesperado');
            }
            console.error(err);
        } finally {
            setIsLoading(false);
        }


    };

    return (
        <div className="bg-transparent rounded-2xl p-10 sm:p-12 w-full max-w-md relative">
            <div className="flex justify-center mb-8">
                <img src={logo} alt="MesaGo Logo" className="w-48" />
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-5 w-full"
            >
                <div className="w-full">
                    <label
                        htmlFor="username"
                        className="block text-left font-semibold text-gray-700 mb-1"
                    >
                        Usuario:
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="w-full">
                    <label
                        htmlFor="password"
                        className="block text-left font-semibold text-gray-700 mb-1"
                    >
                        Contraseña:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm font-medium text-center">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 mt-4 text-white font-bold text-lg rounded-lg transition-all duration-200
            ${isLoading
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"}
          `}
                >
                    {isLoading ? "INGRESANDO..." : "INGRESAR"}
                </button>
            </form>
        </div>
    );
};


export default LoginForm;