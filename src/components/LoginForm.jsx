// src/components/LoginForm.jsx
import React, { useState } from "react";
import { iniciarSesionConCorreo, registrarConCorreo } from "../services/authService";
import GoogleButtomn from "./GoogleButton";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await iniciarSesionConCorreo(email, password);
    alert("Inicio de sesión exitoso");
    navigate("/"); // 👈 redirige a la página de inicio
  } catch (error) {
    alert("Error al iniciar sesión: " + error.message);
  }
};

  const handleRegister = async () => {
    try {
      await registrarConCorreo(email, password);
      alert("Registro exitoso");
    } catch (error) {
      alert("Error al registrarse: " + error.message);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleLogin}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
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
        <label htmlFor="password" className="block text-sm font-medium text-gray-900">Contraseña</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 block w-full rounded-md px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600"
        />
      </div>
      <div className="space-y-2">
        <button type="submit" className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500">
          Iniciar sesión
        </button>
        <button type="button" onClick={handleRegister} className="w-full rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold text-white hover:bg-gray-700">
          Registrarse
        </button>
        <GoogleButtomn />
      </div>
    </form>
  );
}
