// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuth } from "../context/AuthContext";
import UserDropdown from "./UserDropdown";
import LogoPag from "../assets/LogoPag.webp";

export default function Header() {
  const { usuario, rol } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between pl-6 pr-6 pt-1 pb-1 shadow-lg">
      <Link to="/" className="text-lg font-semibold">
        <img
          src={LogoPag}
          alt="Logo de la app"
          className="h-20 w-auto object-contain"
        />
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/" className="text-lg font-semibold text-white">OTRO</Link>
        <Link to="/" className="text-lg font-semibold text-white">Agregar</Link>
      </div>

      <nav className="flex gap-4 items-center">
        {!usuario ? (
          <Link to="/login" className="text-white font-semibold hover:underline">Iniciar sesión</Link>
        ) : (
          <UserDropdown />
        )}
      </nav>
    </header>
  );
}
