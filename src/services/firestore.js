// src/services/firestore.js
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { subirImagenAImgBB } from './imgbb';

export const guardarPalabraConImagen = async (palabra, imagenFile) => {
  try {
    const urlImagen = await subirImagenAImgBB(imagenFile);

    await addDoc(collection(db, 'vocabulario'), {
      ...palabra,
      imagen: urlImagen,
    });
    
    console.log('Palabra con imagen guardada correctamente');
  } catch (error) {
    console.error('Error al guardar palabra con imagen:', error);
  }
};
