// src/components/GoogleButton.jsx
import React from "react";
import { iniciarSesionConGoogle } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function GoogleButton() {
  const navigate = useNavigate();
  const handleGoogle = async () => {
    try {
      await iniciarSesionConGoogle();
      alert("Sesión iniciada con Google");
      navigate("/"); // 👈 envía al inicio
    } catch (error) {
      alert("Error con Google: " + error.message);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogle}
      className="w-full bg-[#4285F4] text-white px-5 py-2.5 rounded-md font-medium flex items-center justify-center hover:bg-[#4285F4]/90"
    >
      <svg className="mr-2 w-4 h-4" viewBox="0 0 488 512" fill="currentColor">
        <path d="M533.5 278.4c0-17.7-1.6-35-4.8-51.5H272v97.6h146.9c-6.3 33.6-25.1 62.1-53.6 81.1v67.4h86.6c50.7-46.7 81.6-115.5 81.6-194.6z"/>
      </svg>
      Continuar con Google
    </button>
  );
}
