import React from "react";
import { iniciarSesionConGoogle } from "../services/authService";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/icons8-logo-de-google.svg"; // ajusta la ruta si es distinta

export default function GoogleButton() {
  const navigate = useNavigate();
  const handleGoogle = async () => {
    try {
      await iniciarSesionConGoogle();
      navigate("/");
    } catch (error) {
      alert("Error con Google: " + error.message);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogle}
      className="hover:brightness-60 transition duration-200"
    >
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
        <img
          src={GoogleIcon}
          alt="Google logo"
          className="w-5 h-5"
        />
      </div>
    </button>
  );
}
