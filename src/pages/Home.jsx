import React from "react";
import '../App.css';
import FormularioPalabra from '../components/FormWord';


import { Link } from "react-router-dom";


function Home() {
  return (
      <div className="h-screen w-full bg-gradient-to-b from-[#DED1C6] via-[#A77693] via-[#174871] to-[#0F2D4D] flex items-center justify-center">
        <FormularioPalabra />
        <Link to="/Vocabulario" className="text-white mt-4 underline">
          Go to Vocabulario Page
        </Link>

      </div>
  );
}
export default Home;