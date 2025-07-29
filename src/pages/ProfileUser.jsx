import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

export default function Perfil() {
  const [perfil, setPerfil] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const cargarPerfil = async () => {
      const uid = auth.currentUser.uid;
      const snap = await getDoc(doc(db, "usuarios", uid));
      if (snap.exists()) {
        const datos = snap.data();
        setPerfil(datos);
        setNombre(datos.displayName || "");
        setPreview(datos.avatarURL || "");
      }
    };
    cargarPerfil();
  }, []);

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
      const uid = auth.currentUser.uid;
      let avatarURL = preview;

      if (imagen) {
        avatarURL = await uploadToCloudinary({
          archivo: imagen,
          folder: `avatars/${uid}`,
          preset: "avatar_upload"
        });
      }

      await setDoc(doc(db, "usuarios", uid), {
        displayName: nombre,
        avatarURL,
        perfilCompleto: true
      }, { merge: true });

      await updateProfile(auth.currentUser, {
        displayName: nombre,
        photoURL: avatarURL
      });

      setPerfil({ displayName: nombre, avatarURL });
      setModoEdicion(false);
    } catch (err) {
      console.error("Error al guardar perfil:", err);
      alert("Hubo un problema al guardar tu perfil. Revisá la consola.");
    } finally {
      setGuardando(false);
    }
  };

  if (!perfil) return <p>Cargando perfil...</p>;

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
            src={perfil.avatarURL || "/default-avatar.png"}
            alt="Avatar"
            className="mx-auto rounded-full w-32 h-32 object-cover mb-4"
          />
          <h2 className="text-xl font-bold mb-2">{perfil.displayName || "Sin nombre"}</h2>
          <p className="text-sm text-gray-500">Correo: {auth.currentUser.email}</p>
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
