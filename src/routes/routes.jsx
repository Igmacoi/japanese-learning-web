import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Vocabulario from '../pages/Vocabulario';
import Pruebas from '../pages/pruebas';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Vocabulario" element={<Vocabulario />} />
        <Route path="/Pruebas" element={<Pruebas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;