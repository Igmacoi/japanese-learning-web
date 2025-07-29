// src/components/RutaProtegida.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RutaProtegida({ children, rolesPermitidos }) {
  const { usuario, rol } = useAuth();

  // 🚪 Si no hay usuario, redirigir al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // 🛑 Si hay restricción de roles y no coincide
  if (rolesPermitidos && !rolesPermitidos.includes(rol)) {
    return <Navigate to="/" replace />; // Podés redirigir a otra página si querés
  }

  return children;
}
