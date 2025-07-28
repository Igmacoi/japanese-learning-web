// src/services/firestore.js
import { collection, addDoc, updateDoc, getDoc, getDocs ,doc ,deleteDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { subirImagenAImgBB } from './imgbb';

export const guardarPalabraConImagen = async (palabra, imagenFile = null) => {
  try {
    let imagen = null;

    if (imagenFile) {
      imagen = await subirImagenAImgBB(imagenFile);
    }

    await addDoc(collection(db, 'vocabulario'), {
      ...palabra,
      imagen,
    });

    console.log('Palabra guardada con éxito:', palabra);
  } catch (error) {
    console.error('Error al guardar la palabra', error);
  }
};

export const editarPalabraConImagen = async (id, nuevosDatos = {}, nuevaImagenFile = null) => {
  try {
    const nuevosCampos = { ...nuevosDatos };

    if (nuevaImagenFile) {
      const nuevaUrl = await subirImagenAImgBB(nuevaImagenFile);
      nuevosCampos.imagen = nuevaUrl;
    }

    // Si explícitamente se pide eliminar la imagen (sinImagen=true en frontend)
    if (!nuevaImagenFile && nuevosDatos.imagen === null) {
      nuevosCampos.imagen = null;
    }

    await updateDoc(doc(db, 'vocabulario', id), nuevosCampos);
    console.log('Palabra actualizada con éxito:', id);
  } catch (error) {
    console.error('Error al actualizar palabra:', error);
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