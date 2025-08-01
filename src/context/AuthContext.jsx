import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { obtenerRolUsuario } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [rol, setRol] = useState(null);

  useEffect(() => {
    let unsubscribeFirestore = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const rolActual = await obtenerRolUsuario(user.uid);
        setRol(rolActual);

        const ref = doc(db, "usuarios", user.uid);

        unsubscribeFirestore = onSnapshot(ref, (snap) => {
          const datos = snap.exists() ? snap.data() : {};
          setUsuario({
            uid: user.uid,
            email: user.email,
            displayName: datos.displayName || user.displayName || "",
            avatarURL: datos.avatarURL || user.photoURL || "",
          });
        });
      } else {
        setUsuario(null);
        setRol(null);
        if (unsubscribeFirestore) unsubscribeFirestore();
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, []);

  const esAdmin = () => rol === "admin";
  const esJefaso = () => rol === "jefaso";

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, rol, esAdmin, esJefaso }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
