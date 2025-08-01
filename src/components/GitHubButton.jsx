import React from "react";
import { iniciarSesionConGitHub } from "../services/authService";
import { useNavigate } from "react-router-dom";
import GitHubIcon from "../assets/icons8-github.svg";

export default function GitHubButton() {
  const navigate = useNavigate();
  const handleGitHub = async () => {
    try {
      await iniciarSesionConGitHub();
      navigate("/");
    } catch (error) {
      alert("Error con Google: " + error.message);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGitHub}
      className="hover:brightness-60 transition duration-200"
    >
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
        <img
          src={GitHubIcon}
          alt="Google logo"
          className="w-5 h-5"
        />
      </div>
    </button>
  );
}
