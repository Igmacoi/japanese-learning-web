import React from "react";
import Header from "../components/Header";
import VideoInicio from "../assets/VideoInicio.mp4";

function Home() {
  return (
    <div className="relative">
      {/* Sección de video + contenido */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Video de fondo */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
        >
          <source src={VideoInicio} type="video/mp4" />
        </video>

        <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-[-1]" />

        <div className="absolute top-0 left-0 w-full z-20">
          <Header />
        </div>
      </section>

      {/* Sección de contenido siguiente */}
      <section className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <p className="text-xl">Otro contenido</p>
      </section>
      <section className="flex flex-col items-center justify-center min-h-screen bg-amber-400 text-white">
        <p className="text-xl">Este seria otro contenido</p>
      </section>
    </div>
  );
}

export default Home;
