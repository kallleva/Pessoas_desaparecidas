import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details'; // <-- descomente aqui

function App() {
  return (
    <Router>
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<Home />} />

        {/* Página de detalhes */}
        <Route path="/detalhe/:id" element={<Details />} />  {/* <-- descomente aqui */}

        {/* Redirecionamento para Home caso a rota não exista */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
