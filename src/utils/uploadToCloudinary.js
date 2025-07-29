// src/utils/uploadToCloudinary.js

export async function uploadToCloudinary({ archivo, folder, preset = "avatar_upload" }) {
  if (!archivo) throw new Error("No se proporcionó archivo para subir.");

  const formData = new FormData();
  formData.append("file", archivo);
  formData.append("upload_preset", preset);
  if (folder) formData.append("folder", folder);

  const res = await fetch("https://api.cloudinary.com/v1_1/djbysmll0/image/upload", {
    method: "POST",
    body: formData
  });

  const data = await res.json();

  if (data.error) throw new Error(data.error.message);
  return data.secure_url;
}
