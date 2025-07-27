import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Vocabulario from '../pages/Vocabulario';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Vocabulario" element={<Vocabulario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;