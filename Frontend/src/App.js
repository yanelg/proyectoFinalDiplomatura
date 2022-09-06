import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/layout/Header';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import StaffPage from './pages/StaffPage';
import GaleriaPage from './pages/GaleriaPage';
import ContactoPage from './pages/ContactoPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Novedades from './pages/Novedades';

function App() {
  return (
    <div className="App">
      <Header></Header>

      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="Staff" element={<StaffPage />} />
          <Route path="Galeria" element={<GaleriaPage />} />
          <Route path="Novedades" element={<Novedades />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
