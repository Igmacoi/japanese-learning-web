// src/services/authService.js
import { auth,db } from '../utils/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import { doc, setDoc,getDoc } from "firebase/firestore";

const providerGoogle = new GoogleAuthProvider();
const providerGitHub = new GithubAuthProvider();


export async function registrarConCorreo(email, password, rol = "usuario") {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    await setDoc(doc(db, "usuarios", uid), {
      email,
      rol,
      creado: new Date().toISOString()
    });

    return cred.user;
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        throw new Error("Este correo ya está registrado");
      case "auth/invalid-email":
        throw new Error("El formato del correo no es válido");
      case "auth/weak-password":
        throw new Error("La contraseña es demasiado débil. Usa al menos 6 caracteres.");
      default:
        throw new Error("No se pudo registrar el usuario. Intenta nuevamente.");
    }
  }
}

export async function iniciarSesionConCorreo(email, contraseña) {
  try {
    await signInWithEmailAndPassword(auth, email, contraseña);
  } catch (error) {
    switch (error.code) {
      case "auth/user-not-found":
        throw new Error("El correo no está registrado");
      case "auth/wrong-password":
        throw new Error("La contraseña es incorrecta");
      case "auth/invalid-email":
        throw new Error("El formato del correo es inválido");
      default:
        throw new Error("No se pudo iniciar sesión. Intenta nuevamente.");
    }
  }
}

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

export const iniciarSesionConGitHub = async () => {
  const resultado = await signInWithPopup(auth, providerGitHub);
  const uid = resultado.user.uid;

  const referencia = doc(db, "usuarios", uid);
  const snapshot = await getDoc(referencia);

  if (!snapshot.exists()) {
    await setDoc(referencia, {
      email: resultado.user.email || "Sin correo disponible",
      rol: "usuario",
      creado: new Date().toISOString(),
    });
  }

  return resultado.user;
};

export async function obtenerRolUsuario(uid) {
  const docSnap = await getDoc(doc(db, "usuarios", uid));
  if (docSnap.exists()) {
    return docSnap.data().rol;
  } else {
    throw new Error("No se encontró el rol para el usuario");
  }
}

export const cerrarSesion = () => signOut(auth);