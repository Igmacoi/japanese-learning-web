import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, rolRequerido }) {
  const { rol } = useAuth();

  if (rol !== rolRequerido) {
    return <Navigate to="/" />;
  }

  return children;
}
