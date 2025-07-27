import React from "react";
import VocabularioCard from "../components/VocabularioCard";

function Vocabulario() {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#DED1C6] via-[#A77693] via-[#174871] to-[#0F2D4D] flex items-center justify-center">
      <h1 className="text-3xl font-bold text-white">Vocabulario Page</h1>
      <VocabularioCard />
    </div>
  );
}

export default Vocabulario;