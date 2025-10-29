import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/authService";
import { getPedidos } from "../../../services/pedidoService";
import { getMesas } from "../../../services/mesaService";
import { getDetalles } from "../../../services/detalleService";
import logo from "../../assets/Logo.png"

const LoginForm = () => {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<any[]>([]);
  const navigate = useNavigate();

// Manejo del formulario de login
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    console.log("Enviando Datos:", { username, password });

    try {
      const data = await login({ username, password });
      console.log("✅ Login exitoso:", data);

      const { token } = data;
      setToken(token);
      localStorage.setItem("token", token);

      alert(`¡Bienvenido ${username}!`);
      navigate("/dashboard"); // 🚀 Redirige al dashboard después del login
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado");
      }
      console.error("❌ Error en el login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Botón de prueba - "CALLING ALL THE BABIES"
  const handleTestAPIs = async () => {
    const storedToken = token || localStorage.getItem("token");
    if (!storedToken) {
      alert("Primero inicia sesión para obtener el token 🧸");
      return;
    }

    const results: any[] = [];
    const tests = [
      { name: "Pedidos", func: getPedidos },
      { name: "Mesas", func: getMesas },
      { name: "Detalles", func: getDetalles },
    ];

    for (const test of tests) {
      try {
        const data = await test.func();
        console.log(`✅ ${test.name}:`, data);
        results.push({ name: test.name, success: true, count: data.length || 0 });
      } catch (err: any) {
        console.error(`❌ ${test.name}:`, err.message);
        results.push({ name: test.name, success: false, error: err.message });
      }
    }

    setTestResults(results);
  };

  return (
    <div className="bg-transparent rounded-2xl p-10 sm:p-12 w-full max-w-md relative">
      <div className="flex justify-center mb-8">
        <img src={logo} alt="MesaGo Logo" className="w-48" />
      </div>

      {/* FORMULARIO DE LOGIN */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5 w-full">
        <div className="w-full">
          <label htmlFor="username" className="block text-left font-semibold text-gray-700 mb-1">
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
          <label htmlFor="password" className="block text-left font-semibold text-gray-700 mb-1">
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

        {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 mt-4 text-white font-bold text-lg rounded-lg transition-all duration-200 ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          }`}
        >
          {isLoading ? "INGRESANDO..." : "INGRESAR"}
        </button>

        {/* 🔸 BOTÓN DE PRUEBA */}
        <button
          type="button"
          onClick={handleTestAPIs}
          className="w-full py-3 mt-3 text-white font-bold text-lg rounded-lg bg-green-600 hover:bg-green-700 transition-all duration-200"
        >
          CALLING ALL THE BABIES 🍼
        </button>
      </form>

      {/* 🔹 RESULTADOS DE PRUEBA */}
      {testResults.length > 0 && (
        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <h3 className="font-bold text-gray-700 mb-2 text-center">Resultados de Prueba</h3>
          {testResults.map((res, i) => (
            <div
              key={i}
              className={`p-2 rounded mb-2 text-center ${
                res.success ? "bg-green-200" : "bg-red-200"
              }`}
            >
              {res.name}: {res.success ? `(${res.count} items)` : ` ${res.error}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoginForm;