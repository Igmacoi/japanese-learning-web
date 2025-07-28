import React, { useEffect, useState, useRef } from 'react';
import {
  obtenerPalabras,
  borrarPalabra,
  editarPalabraConImagen,
  obtenerPalabraPorId,
} from '../services/firestore';
import RecortarImg from './RecortarImg';

const CrudVocabulario = () => {
  const [palabras, setPalabras] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState(null);

  const [imagenOriginal, setImagenOriginal] = useState(null);
  const [imagenRecortada, setImagenRecortada] = useState(null);
  const [sinImagen, setSinImagen] = useState(false);
  const fileInputRef = useRef(null);

  const cargarPalabras = async () => {
    const data = await obtenerPalabras();
    setPalabras(data);
  };

  useEffect(() => {
    cargarPalabras();
  }, []);

  const iniciarEdicion = async (id) => {
    const palabra = await obtenerPalabraPorId(id);
    if (palabra) {
      setEditandoId(id);
      setForm({ ...palabra });
      setImagenOriginal(null);
      setImagenRecortada(null);
      setSinImagen(false);
    }
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm(null);
    setImagenOriginal(null);
    setImagenRecortada(null);
    setSinImagen(false);
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    if (sinImagen) form.imagen = null;
    await editarPalabraConImagen(editandoId, form, sinImagen ? null : imagenRecortada);
    cancelarEdicion();
    cargarPalabras();
  };

  const eliminarPalabra = async (id) => {
    await borrarPalabra(id);
    cargarPalabras();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">📚 Gestor de Vocabulario</h2>

      <div className="grid gap-4">
        {palabras.map((p) => (
          <div key={p.id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{p.kanji}</h3>
              <p className="text-sm text-gray-600">{p.lectura} • {p.significado} • JLPT {p.nivel}</p>
              {p.imagen ? (
                <img src={p.imagen} alt="Imagen" className="mt-2 h-20 rounded" loading="lazy" />
              ) : (
                <p className="text-sm text-gray-400 mt-2 italic">Sin imagen</p>
              )}
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <button
                onClick={() => iniciarEdicion(p.id)}
                className="text-indigo-600 hover:underline"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => eliminarPalabra(p.id)}
                className="text-red-600 hover:underline"
              >
                🗑️ Eliminar
              </button>
              {!p.imagen && (
                <button
                  onClick={() => iniciarEdicion(p.id)}
                  className="text-green-600 hover:underline"
                >
                  📷 Agregar imagen
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {form && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <form
            onSubmit={guardarEdicion}
            className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 shadow-xl"
          >
            <h3 className="text-xl font-bold text-indigo-600">Editar Palabra</h3>

            {['kanji', 'lectura', 'significado', 'nivel'].map((campo) => (
              <div key={campo}>
                <label className="text-sm block">{campo}</label>
                <input
                  type="text"
                  value={form[campo]}
                  onChange={(e) => setForm({ ...form, [campo]: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            ))}

            {!sinImagen && (
              <div>
                <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-1">
                  Imagen <span className="text-red-500">*</span>
                </label>

                <div
                  className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 bg-indigo-50 hover:bg-indigo-100 rounded-lg p-6 text-center text-indigo-700 cursor-pointer transition"
                  onClick={() => fileInputRef.current.click()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const archivo = e.dataTransfer.files[0];
                    if (archivo && archivo.type.startsWith("image/")) {
                      setImagenOriginal(archivo);
                      setImagenRecortada(null);
                    }
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="imagen"
                    name="imagen"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const nuevoArchivo = e.target.files[0];
                      if (!nuevoArchivo) return;
                      setImagenOriginal(nuevoArchivo);
                      setImagenRecortada(null);
                      e.target.value = "";
                    }}
                  />

                  {imagenOriginal ? (
                    <p className="text-sm font-medium">
                      {imagenOriginal.name} <br />
                      <span className="text-xs text-gray-500">(haz clic o suelta otra imagen para reemplazar)</span>
                    </p>
                  ) : (
                    <p className="text-sm">Arrastra una imagen aquí o haz clic para seleccionar</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="sinImagen"
                checked={sinImagen}
                onChange={() => {
                  setSinImagen(!sinImagen);
                  if (!sinImagen) {
                    setImagenOriginal(null);
                    setImagenRecortada(null);
                  }
                }}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="sinImagen" className="text-sm text-gray-700">
                Ingresar palabra sin imagen
              </label>
            </div>

            {imagenOriginal && !sinImagen && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <RecortarImg
                  file={imagenOriginal}
                  onRecorteFinalizado={(recortado) => setImagenRecortada(recortado)}
                />
              </div>
            )}

            {imagenRecortada && (
              <div className="p-3 bg-green-50 text-green-700 rounded-md flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Imagen recortada lista para subir
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={cancelarEdicion}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-indigo-600 text-white rounded"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CrudVocabulario;
