import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Sube una imagen al Storage y devuelve su URL pública.
 * @param {File|Blob} archivo - La imagen a subir.
 * @param {string} uid - UID del usuario.
 * @param {string} formato - Tipo MIME, por ejemplo 'image/png'.
 * @returns {Promise<string>} URL pública de la imagen subida.
 */
export async function subirAvatar(archivo, uid, formato = "image/png") {
  try {
    const imagenRef = ref(storage, `avatars/${uid}`);
    const metadata = { contentType: formato };
    
    // ✅ Subir el archivo al Storage
    await uploadBytes(imagenRef, archivo, metadata);
    
    // 🌐 Obtener la URL pública
    return await getDownloadURL(imagenRef);
  } catch (err) {
    console.error("Error al subir avatar:", err);
    throw err;
  }
}
