// src/components/FormWord.jsx
import React, { useState } from 'react';
import { guardarPalabraConImagen } from '../services/firestore';
import RecortarImg from './RecortarImg';
import { useRef } from 'react';

const FormularioPalabra = () => {
  const [kanji, setKanji] = useState('');
  const [lectura, setLectura] = useState('');
  const [significado, setSignificado] = useState('');
  const [nivel, setNivel] = useState('');
  const [imagen, setImagen] = useState(null);
  const [imagenOriginal, setImagenOriginal] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [sinImagen, setSinImagen] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (enviando) return;
    setEnviando(true);

    try {
      if (!imagen && !sinImagen) {
        alert('Por favor recorta la imagen o marca la opción "sin imagen"');
        setEnviando(false);
        return;
      }

      const palabra = {
        kanji,
        lectura,
        significado,
        nivel,
        visto: false,
      };

      await guardarPalabraConImagen(palabra, imagen);

      // Reiniciar formulario
      setKanji('');
      setLectura('');
      setSignificado('');
      setNivel('');
      setImagen(null);
      setImagenOriginal(null);
    } catch (err) {
      console.error('Error al guardar:', err);
    } finally {
      setEnviando(false);
    }
  };

  const fileInputRef = useRef(null);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="px-8 py-6 bg-indigo-600 text-white">
          <h2 className="text-2xl font-bold">Agregar Nueva Palabra</h2>
          <p className="text-indigo-100">Completa los detalles del kanji</p>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="kanji" className="block text-sm font-medium text-gray-700 mb-1">
                Kanji <span className="text-red-500">*</span>
              </label>
              <input
                id="kanji"
                type="text"
                value={kanji}
                onChange={(e) => setKanji(e.target.value)}
                placeholder="例: 水"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>
            
            <div>
              <label htmlFor="lectura" className="block text-sm font-medium text-gray-700 mb-1">
                Lectura <span className="text-red-500">*</span>
              </label>
              <input
                id="lectura"
                type="text"
                value={lectura}
                onChange={(e) => setLectura(e.target.value)}
                placeholder="例: みず、スイ"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="significado" className="block text-sm font-medium text-gray-700 mb-1">
              Significado <span className="text-red-500">*</span>
            </label>
            <input
              id="significado"
              type="text"
              value={significado}
              onChange={(e) => setSignificado(e.target.value)}
              placeholder="例: agua"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nivel" className="block text-sm font-medium text-gray-700 mb-1">
                Nivel JLPT <span className="text-red-500">*</span>
              </label>
              <select
                id="nivel"
                value={nivel}
                onChange={(e) => setNivel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              >
                <option value="">Selecciona un nivel</option>
                <option value="N5">N5 (Básico)</option>
                <option value="N4">N4</option>
                <option value="N3">N3</option>
                <option value="N2">N2</option>
                <option value="N1">N1 (Avanzado)</option>
              </select>
            </div>
            
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
                      setImagen(null);
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
                      setImagen(null);
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
                onChange={() => setSinImagen(!sinImagen)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="sinImagen" className="text-sm text-gray-700">
                Ingresar palabra sin imagen
              </label>
            </div>

          </div>
          
          {imagenOriginal && !sinImagen && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <RecortarImg
                file={imagenOriginal}
                onRecorteFinalizado={(recortado) => setImagen(recortado)}
              />
            </div>
          )}
                    
          {imagen && (
            <div className="p-3 bg-green-50 text-green-700 rounded-md flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Imagen recortada lista para subir
            </div>
          )}
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={enviando}
              className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition ${enviando ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {enviando ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </span>
              ) : 'Guardar palabra'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormularioPalabra;