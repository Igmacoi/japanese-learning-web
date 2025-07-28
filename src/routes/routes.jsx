import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Vocabulario from '../pages/Vocabulario';
import Pruebas from '../pages/pruebas';
import Login from '../pages/Login';

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Vocabulario" element={<Vocabulario />} />
        <Route path="/Pruebas" element={<Pruebas />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
  );
}
