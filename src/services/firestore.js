// src/services/firestore.js
import { collection, addDoc, updateDoc, getDoc, getDocs ,doc ,deleteDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

export async function guardarPalabraConImagen(palabra, imagenRecortada) {
  let imagenURL = null;

  if (imagenRecortada) {
    imagenURL = await uploadToCloudinary({
      archivo: imagenRecortada,
      folder: "palabras"
    });
  }

  const nuevaPalabra = {
    ...palabra,
    imagenURL: imagenURL || null
  };

  await addDoc(collection(db, "palabras"), nuevaPalabra);
}

export const editarPalabraConImagen = async (id, nuevosDatos = {}, nuevaImagenFile = null) => {
  try {
    const nuevosCampos = { ...nuevosDatos };

    if (nuevaImagenFile) {
      const nuevaUrl = await uploadToCloudinary({
        archivo: nuevaImagenFile,
        folder: "palabras",
        preset: "img_significado"
      });
      nuevosCampos.imagenURL = nuevaUrl;
    }

    // Si se especifica que se quiere eliminar la imagenURL
    if (!nuevaImagenFile && nuevosDatos.imagenURL === null) {
      nuevosCampos.imagenURL = null;
    }

    await updateDoc(doc(db, "vocabulario", id), nuevosCampos);
    console.log("Palabra actualizada con éxito:", id);
  } catch (error) {
    console.error("Error al actualizar palabra:", error);
    throw error;
  }
};

export const borrarPalabra = async (id) => {
  try {
    await deleteDoc(doc(db, 'vocabulario', id));
    console.log('Palabra eliminada:', id);
  } catch (error) {
    console.error('Error al borrar palabra:', error);
  }
};

export const obtenerPalabraPorId = async (id) => {
  try {
    const snap = await getDoc(doc(db, 'vocabulario', id));
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    } else {
      console.warn('La palabra no existe en Firestore');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener palabra por ID:', error);
    return null;
  }
};

export const obtenerPalabras = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'vocabulario'));
    const palabras = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return palabras;
  } catch (error) {
    console.error('Error al obtener las palabras:', error);
    return [];
  }
};