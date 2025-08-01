import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { auth } from "../utils/firebase";

export default function Perfil() {
  const { usuario, setUsuario } = useAuth();
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nombre, setNombre] = useState(usuario?.displayName || "");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(usuario?.avatarURL || "");
  const [guardando, setGuardando] = useState(false);

  const handleImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setImagen(archivo);
      setPreview(URL.createObjectURL(archivo));
    }
  };

  const guardarCambios = async () => {
    try {
      setGuardando(true);
      const uid = usuario.uid;
      let avatarURL = preview;

      if (imagen) {
        avatarURL = await uploadToCloudinary({
          archivo: imagen,
          folder: `avatars/${uid}`,
          preset: "avatar_upload"
        });
      }

      const datosActualizados = {
        displayName: nombre,
        avatarURL,
        perfilCompleto: true
      };

      await setDoc(doc(db, "usuarios", uid), datosActualizados, { merge: true });

      await updateProfile(auth.currentUser, {
        displayName: nombre,
        photoURL: avatarURL
      });

      setUsuario((prev) => ({
        ...prev,
        displayName: nombre,
        avatarURL
      }));

      setModoEdicion(false);
    } catch (err) {
      console.error("Error al guardar perfil:", err);
      alert("Hubo un problema al guardar tu perfil. Revisá la consola.");
    } finally {
      setGuardando(false);
    }
  };

  if (!usuario) return <p>Cargando perfil...</p>;

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      {modoEdicion ? (
        <>
          <img
            src={preview || "/default-avatar.png"}
            alt="Preview"
            className="mx-auto rounded-full w-32 h-32 object-cover mb-4"
          />
          <input type="file" accept="image/*" onChange={handleImagen} className="mb-4" />
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre o alias"
            className="w-full mb-4 p-2 border rounded"
          />
          <button
            onClick={guardarCambios}
            disabled={guardando}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            {guardando ? "Guardando..." : "Guardar"}
          </button>
          <button
            onClick={() => setModoEdicion(false)}
            className="mt-2 text-sm text-gray-500 hover:underline"
          >
            Cancelar
          </button>
        </>
      ) : (
        <>
          <img
            src={usuario.avatarURL || "/default-avatar.png"}
            alt="Avatar"
            className="mx-auto rounded-full w-32 h-32 object-cover mb-4"
          />
          <h2 className="text-xl font-bold mb-2">{usuario.displayName || "Sin nombre"}</h2>
          <p className="text-sm text-gray-500">Correo: {usuario.email}</p>
          <button
            onClick={() => setModoEdicion(true)}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            ✏️ Editar perfil
          </button>
        </>
      )}
    </div>
  );
}
