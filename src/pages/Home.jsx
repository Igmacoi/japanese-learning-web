import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { auth } from "../utils/firebase";

function Home() {
  const [usuarioLogeado, setUsuarioLogeado] = useState(null);
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUsuarioLogeado(user);
      setVerificando(false);
    });
    return () => unsubscribe(); // limpia el listener
  }, []);

  if (verificando) {
    return <div className="text-center text-white p-8">Cargando sesión...</div>;
  }

  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#DED1C6] via-[#A77693] via-[#174871] to-[#0F2D4D] flex flex-col items-center justify-center text-white text-center">
      <Header />
      {usuarioLogeado ? (
        <p className="text-lg font-medium">🎉 ¡Bienvenido, {usuarioLogeado.displayName || "usuario"}!</p>
      ) : (
        <p className="text-lg font-medium">🔒 No estás logeado. Inicia sesión para continuar.</p>
      )}
    </div>
  );
}

export default Home;
