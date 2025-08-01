import react from "react";
import LoginForm from "../components/LoginForm";
import FondoLogV2 from "../assets/FondoLogV2.webp";

function Login() {
  return (
  <div className="relative h-screen w-full overflow-hidden">
    {/* Imagen de fondo */}
    <img
      src={FondoLogV2}
      alt="Fondo decorativo"
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
    />

    {/* Capa de contenido con LoginForm */}
    <div className="relative z-10 flex items-center justify-center h-screen w-full">
      <LoginForm />
    </div>
  </div>  

  );
}  
export default Login;