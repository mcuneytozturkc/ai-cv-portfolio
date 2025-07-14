import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Projects from './pages/Projects';
import About from './pages/About';
import Home from './pages/Home';
import Navbar from './components/NavBar';
import Contacts from './pages/Contacts';

// AnimatePresence için sarmalayıcı bileşen
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contacts />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="w-full min-h-screen">
        <AnimatedRoutes />
      </main>
    </BrowserRouter>
  );
}

export default App;
