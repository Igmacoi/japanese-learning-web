// src/services/authService.js
import { auth,db } from '../utils/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, setDoc,getDoc } from "firebase/firestore";


const providerGoogle = new GoogleAuthProvider();

export async function registrarConCorreo(email, password, rol = "usuario") {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;

  await setDoc(doc(db, "usuarios", uid), {
    email,
    rol,
    creado: new Date().toISOString()
  });

  return cred.user;
}

export const iniciarSesionConCorreo = (email, contraseña) =>
  signInWithEmailAndPassword(auth, email, contraseña);

export const iniciarSesionConGoogle = async () => {
  const resultado = await signInWithPopup(auth, providerGoogle);
  const uid = resultado.user.uid;

  // 🔍 Revisar si el documento ya existe
  const referencia = doc(db, "usuarios", uid);
  const snapshot = await getDoc(referencia);

  if (!snapshot.exists()) {
    // ⚙️ Si no existe, se crea con rol por defecto
    await setDoc(referencia, {
      email: resultado.user.email,
      rol: "usuario", // 🛡️ Asignar rol inicial
      creado: new Date().toISOString()
    });
  }

  return resultado.user;
};

export const cerrarSesion = () => signOut(auth);

export async function obtenerRolUsuario(uid) {
  const docSnap = await getDoc(doc(db, "usuarios", uid));
  if (docSnap.exists()) {
    return docSnap.data().rol;
  } else {
    throw new Error("No se encontró el rol para el usuario");
  }
}