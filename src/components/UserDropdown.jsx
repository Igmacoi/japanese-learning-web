import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuth } from "../context/AuthContext";

export default function UserDropdown() {
  const { usuario, rol } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"
      >
        <img
          src={usuario.avatarURL}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </button>

      <div
        className={`absolute right-0 mt-2 bg-white text-black rounded shadow-md w-44 z-50 dark:bg-gray-700 dark:text-white transition-all duration-200 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
          <div className="font-semibold">
            {usuario.displayName || "Usuario"}
          </div>
          <div className="text-sm truncate">{usuario.email}</div>
        </div>

        <ul className="text-sm py-2">
          <li>
            <Link
              to="/paginaUserLog"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              📝 Mis palabras
            </Link>
          </li>
          <li>
            <Link
              to="/ProfileUser"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              👤 Mi perfil
            </Link>
          </li>
          {(rol === "admin" || rol === "creador") && (
            <li>
              <Link
                to="/admin"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                🛠 Panel admin
              </Link>
            </li>
          )}
          {rol === "creador" && (
            <li>
              <Link
                to="/creador"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                🎨 Panel creador
              </Link>
            </li>
          )}
        </ul>

        <div className="py-1 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-600 dark:text-red-400"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
