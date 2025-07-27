// src/services/imgbb.js
export const subirImagenAImgBB = async (imagenFile) => {
  const formData = new FormData();
  formData.append('image', imagenFile);

const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
  method: 'POST',
  body: formData,
});

  const data = await response.json();
  if (!data.success) {
    throw new Error('Error al subir imagen a ImgBB');
  }

  return data.data.url; // Devuelve la URL de la imagen subida
};
