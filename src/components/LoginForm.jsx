import React, { useState } from "react";
import {
  iniciarSesionConCorreo,
  registrarConCorreo,
} from "../services/authService";
import GoogleButtomn from "./GoogleButton";
import GitHubButtom from "./GitHubButton";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await iniciarSesionConCorreo(email, password);
      setMensaje("");
      navigate("/");
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await registrarConCorreo(email, password);
      setMensaje("Registro exitoso. Puedes iniciar sesión ahora");
      setMostrarRegistro(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto relative w-[350px] h-[600px]">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg transition-opacity duration-300 ease-in-out">
        {mostrarRegistro ? (
          <>
            <h2 className="text-lg font-semibold mb-4 text-white">Registrarse</h2>
            <form className="space-y-6" onSubmit={handleRegisterSubmit}>
              <div>
                <label
                  htmlFor="register-email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  id="register-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 block w-full rounded-md px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600"
                />
              </div>
              <div>
                <label
                  htmlFor="register-password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Contraseña
                </label>
                <input
                  id="register-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 block w-full rounded-md px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-[#17507E] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#17507EE1]"
              >
                Registrarse
              </button>
                <p
                  className={`mt-2 text-sm text-center font-medium ${
                    mensaje.includes("exitoso") ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {mensaje}
                </p>
              <div>
                <p className="text-sm text-gray-100 mt-4 text-center font-semibold">
                  O registrate con
                </p>
                <div className="flex items-center justify-center space-x-4 mt-4">
                  <GoogleButtomn />
                  <GitHubButtom />
                </div>
              </div>
              <p className="mt-6 text-sm text-center text-white font-semibold">
                ¿Ya tienes cuenta?{" "}
                <button
                  onClick={() => setMostrarRegistro(false)}
                  className="text-[#17507E] hover:text-[#012C55] underline"
                >
                  Inicia sesión
                </button>
              </p>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4 text-white">Iniciar sesión</h2>
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 block w-full rounded-md px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 block w-full rounded-md px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-[#17507E] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#17507EE1]"
              >
                Iniciar sesión
              </button>
                <p
                  className={`mt-2 text-sm text-center font-medium ${
                    mensaje.includes("exitoso") ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {mensaje}
                </p>
              <div>
                <p className="text-sm text-gray-100 mt-4 text-center font-semibold">
                  O inicia sesión con
                </p>
                <div className="flex items-center justify-center space-x-4 mt-4">
                  <GoogleButtomn />
                  <GitHubButtom />
                </div>
              </div>
              <p className="mt-6 text-sm text-center text-white font-semibold">
                ¿No tienes cuenta?{" "}
                <button
                  onClick={() => setMostrarRegistro(true)}
                  className="text-[#17507E] hover:text-[#012C55] underline"
                >
                  Regístrate aquí
                </button>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
