// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { obtenerRolUsuario } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUsuario(user);
      if (user) {
        const rolActual = await obtenerRolUsuario(user.uid);
        setRol(rolActual);
      } else {
        setRol(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const esAdmin = () => rol === "admin";
  const esJefaso = () => rol === "jefaso";

  return (
    <AuthContext.Provider value={{ usuario, rol, esAdmin, esJefaso }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
