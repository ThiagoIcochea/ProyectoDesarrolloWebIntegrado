import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext.jsx';
// Componentes
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

// Páginas públicas
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Register from './pages/Register';   
import About from './pages/About';
import Support from './pages/Support';

// Páginas privadas
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import InstructorPanel from './pages/InstructorPanel';

import Cart from './pages/Cart';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // Función para guardar usuario después del login
  const handleLogin = (authResponse) => {
    localStorage.setItem('token', authResponse.token);
    localStorage.setItem('user', JSON.stringify(authResponse.usuario));
    setUser(authResponse.usuario);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Componente para proteger rutas privadas
  const PrivateRoute = ({ children, allowedRoles }) => {
    if (loading) {
      return <div>Cargando...</div>;
    }

    if (!user) {
      return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.tipoUsuario)) {
      return <Navigate to="/" />;
    }

    return children;
  };

  if (loading) {
    return <div>Cargando aplicación...</div>;
  }

  return (
    <CartProvider>
    <Router>
      <div className="app">
        <Navbar user={user} onLogout={handleLogout} />
        
        <main className="main-content">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/cursos" element={<Courses />} />
            <Route path="/cursos/:id" element={<CourseDetail user={user} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/registro" element={<Register onLogin={handleLogin} />} />
            <Route path="/carrito" element={<Cart user={user} />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/soporte" element={<Support user={user} />} />
            {/* Rutas privadas - Estudiante */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute allowedRoles={['ESTUDIANTE']}>
                  <Dashboard user={user} />
                </PrivateRoute>
              }
            />

            {/* Rutas privadas - Admin */}
            <Route
              path="/admin"
              element={
                <PrivateRoute allowedRoles={['ADMIN']}>
                  <AdminPanel user={user} />
                </PrivateRoute>
              }
            />

            {/* Rutas privadas - Instructor */}
            <Route
              path="/instructor"
              element={
                <PrivateRoute allowedRoles={['INSTRUCTOR']}>
                  <InstructorPanel user={user} />
                </PrivateRoute>
              }
            />

            {/* Ruta 404 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;