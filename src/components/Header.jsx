// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { usuario, rol } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center shadow">
      <Link to="/" className="text-lg font-semibold">📚 Vocabulario JPN</Link>

      <nav className="flex gap-4 items-center">
        {!usuario ? (
          <Link to="/login" className="hover:underline">Iniciar sesión</Link>
        ) : (
          <>
            {/* Link para todos los roles logeados */}
            <Link to="/paginaUserLog" className="hover:underline text-sm">
              📝 Mis palabras
            </Link>
            <Link to="/ProfileUser" className="text-sm hover:underline">
              👤 Mi perfil
            </Link>

            {/* Link para admin y creador */}
            {(rol === "admin" || rol === "creador") && (
              <Link to="/admin" className="hover:underline text-sm">
                🛠 Panel admin
              </Link>
            )}

            {/* Link exclusivo para creador */}
            {rol === "creador" && (
              <Link to="/creador" className="hover:underline text-sm">
                🎨 Panel creador
              </Link>
            )}

            <div className="text-sm text-right">
              👤 {usuario.email || usuario.displayName}<br />
              🛡️ Rol: <span className="font-bold capitalize">{rol}</span>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
