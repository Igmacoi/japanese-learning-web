import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';

export default function VocabularioCard() {
  const [palabras, setPalabras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerVocabulario = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'vocabulario'));
        const listado = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPalabras(listado);
      } catch (error) {
        console.error('Error al obtener vocabulario:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerVocabulario();
  }, []);

  if (loading) return <p>Cargando vocabulario...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {palabras.map(palabra => (
        <div key={palabra.id} className="bg-white shadow-md rounded p-4 flex items-center gap-4">
          {palabra.imagen && (
            <img
              src={palabra.imagen}
              alt={palabra.japones}
              className="w-16 h-16 object-cover rounded"
            />
          )}
          <div>
            <h3 className="text-lg font-bold">{palabra.kanji}</h3>
            <p className="text-gray-700">{palabra.significado}</p>
            <p className="text-gray-700">{palabra.lectura}</p>
            <p className="text-gray-700">{palabra.significado}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
