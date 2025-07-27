import React, { useState } from 'react';
import { guardarPalabraConImagen } from '../services/firestore';

const FormularioPalabra = () => {
  const [kanji, setKanji] = useState('');
  const [lectura, setLectura] = useState('');
  const [significado, setSignificado] = useState('');
  const [nivel, setNivel] = useState('');
  const [imagen, setImagen] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (enviando) return; // Evita envío duplicado
    setEnviando(true);

    try {
      if (!imagen) {
        alert('Por favor selecciona una imagen');
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

      setKanji('');
      setLectura('');
      setSignificado('');
      setNivel('');
      setImagen(null);
    } catch (err) {
      console.error('Error al guardar:', err);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-white rounded shadow w-full max-w-md"
    >
      <input
        type="text"
        value={kanji}
        onChange={(e) => setKanji(e.target.value)}
        placeholder="Kanji"
        required
      />
      <input
        type="text"
        value={lectura}
        onChange={(e) => setLectura(e.target.value)}
        placeholder="Lectura"
        required
      />
      <input
        type="text"
        value={significado}
        onChange={(e) => setSignificado(e.target.value)}
        placeholder="Significado"
        required
      />
      <input
        type="text"
        value={nivel}
        onChange={(e) => setNivel(e.target.value)}
        placeholder="Nivel (ej. N5)"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImagen(e.target.files[0])}
        required
      />
      <button type="submit" disabled={enviando}>
        {enviando ? 'Guardando...' : 'Guardar palabra'}
      </button>
    </form>
  );
};

export default FormularioPalabra;
