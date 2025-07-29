import { Routes, Route } from 'react-router-dom';
import RutaProtegida from './RutaProtegida';
{/* Usuarios */}
import PaginaUserLog from '../pages/paginaUserLog';
{/* admin */}
import PaginaAdmin from '../pages/PaginaAdmin';
{/* creador */}
import PaginaCreador from '../pages/PaginaCreador';

{/* Páginas */}
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


        <Route path="/paginaUserLog" element={
          <RutaProtegida rolesPermitidos={["usuario", "admin", "creador"]}>
            <PaginaUserLog />
          </RutaProtegida>
        } />

        <Route path="admin" element={
          <RutaProtegida rolesPermitidos={['admin', 'creador']}>
            <PaginaAdmin />
          </RutaProtegida>
        } />

        <Route path="creador" element={
          <RutaProtegida rolesPermitidos={['creador']}>
            <PaginaCreador />
          </RutaProtegida>
        } />




      </Routes>
  );
}
