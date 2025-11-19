import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import useWindowWidth from './useWindowWidth'; 
const BREAKPOINT = 768; // Define el punto de quiebre

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const { carrito } = useCart();
  const windowWidth = useWindowWidth(); // <-- Obtener el ancho de la ventana
  const isMobile = windowWidth < BREAKPOINT; // <-- Determinar si es móvil

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  // Nuevo estado para el menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const handleLogout = () => {
    onLogout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const getRoleIcon = () => {
    switch(user?.tipoUsuario) {
      case 'ADMIN': return '👨‍💼';
      case 'INSTRUCTOR': return '👨‍🏫';
      case 'ESTUDIANTE': return '👨‍🎓';
      default: return '👤';
    }
  };

  const getRoleLabel = () => {
    switch(user?.tipoUsuario) {
      case 'ADMIN': return 'Administrador';
      case 'INSTRUCTOR': return 'Instructor';
      case 'ESTUDIANTE': return 'Estudiante';
      default: return 'Usuario';
    }
  };

  // Función para cerrar el menú móvil al hacer clic en un enlace
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logo} onClick={handleLinkClick}>
          <span style={styles.logoIcon}>🎓</span>
          <span style={styles.logoText}>RecordsBooks</span>
        </Link>

        {/* Botón de Hamburguesa (visible solo en móvil) */}
        <button 
          style={{
            ...styles.menuToggle,
            ...(isMobile ? { display: 'block' } : { display: 'none' })
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>


        {/* Contenedor de Links: Desktop & Mobile Menu */}
        <div style={{
          ...styles.desktopLinks, 
          // Ocultar por completo si es móvil y el menú no está abierto
          ...(isMobile && !isMenuOpen ? { display: 'none' } : {}),
          // Aplicar estilos de menú móvil si está abierto
          ...(isMenuOpen ? styles.mobileMenuOpen : {}),
        }}>
          {/* Links principales */}
          <Link to="/nosotros" style={styles.link} onClick={handleLinkClick}>
            Nosotros
          </Link>
          <Link to="/cursos" style={styles.link} onClick={handleLinkClick}>
            Cursos
          </Link>
          <Link to="/soporte" style={styles.link} onClick={handleLinkClick}>
            Soporte
          </Link>

          {/* EL CARRITO */}
          <Link 
            to="/carrito" 
            style={{ 
              ...styles.link, 
              position: 'relative', 
              paddingRight: '15px' 
            }}
            onClick={handleLinkClick}
          >
            🛒 
            {carrito && carrito.length > 0 && (
              <span style={styles.cartBadge}>
                {carrito.length}
              </span>
            )}
          </Link>

          {user ? (
            <>
              {/* Dashboard según el rol */}
              {user.tipoUsuario === 'ESTUDIANTE' && (
                <Link to="/dashboard" style={styles.link} onClick={handleLinkClick}>
                  Mis Cursos
                </Link>
              )}
              {user.tipoUsuario === 'ADMIN' && (
                <Link to="/admin" style={styles.link} onClick={handleLinkClick}>
                  ⚙️ Panel Admin
                </Link>
              )}
              {user.tipoUsuario === 'INSTRUCTOR' && (
                <Link to="/instructor" style={styles.link} onClick={handleLinkClick}>
                  ✏️ Mis Cursos
                </Link>
              )}

              {/* User Menu (Mantenemos la lógica de dropdown) */}
              <div style={styles.userMenuContainer}>
                <button 
                  style={styles.userMenuButton}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <span style={styles.userMenuIcon}>{getRoleIcon()}</span>
                  <span style={styles.userMenuName}>
                    {user.nombreCompleto.split(' ')[0]}
                  </span>
                  <span style={styles.userMenuArrow}>▼</span>
                </button>

                {userMenuOpen && (
                  <div style={styles.userDropdown}>
                    <div style={styles.userDropdownHeader}>
                      <div style={styles.userDropdownInfo}>
                        <p style={styles.userDropdownName}>{user.nombreCompleto}</p>
                        <p style={styles.userDropdownRole}>
                          {getRoleIcon()} {getRoleLabel()}
                        </p>
                      </div>
                    </div>
                    <div style={styles.userDropdownDivider}></div>
                    <a href="#perfil" style={styles.userDropdownItem} onClick={handleLinkClick}>👤 Mi Perfil</a>
                    <a href="#configuracion" style={styles.userDropdownItem} onClick={handleLinkClick}>⚙️ Configuración</a>
                    <div style={styles.userDropdownDivider}></div>
                    <button 
                      onClick={() => { handleLogout(); handleLinkClick(); }} // Cierra el menú al cerrar sesión
                      style={styles.logoutButton}
                    >
                      🚪 Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link} onClick={handleLinkClick}>
                🔐 Iniciar Sesión
              </Link>
              <Link to="/registro" style={styles.registerButton} onClick={handleLinkClick}>
                ✨ Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    padding: '1rem 0',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },

  mobileMenuOpen: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: '#1a1a2e', // Un color oscuro para el fondo del menú
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '1rem 0',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    display: 'flex', // Asegurar que se muestre como columna
  },
  menuToggle: {
    // Mostrar solo en móvil, ocultar en desktop
    display: 'none', // Por defecto oculto, pero se forzará en el JSX si es móvil
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: '800',
    background: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    transition: 'all 0.3s ease',
  },
  logoIcon: {
    fontSize: '2rem',
  },
  logoText: {
    display: 'inline',
  },
  desktopLinks: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  link: {
    color: '#e0e0e0',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    padding: '0.5rem 0.75rem',
    borderRadius: '6px',
    position: 'relative',
  },
  userMenuContainer: {
    position: 'relative',
  },
  userMenuButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: 'rgba(102, 126, 234, 0.15)',
    color: '#667eea',
    border: '1px solid rgba(102, 126, 234, 0.3)',
    padding: '0.5rem 1rem',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  userMenuIcon: {
    fontSize: '1.2rem',
  },
  userMenuName: {
    maxWidth: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  userMenuArrow: {
    fontSize: '0.7rem',
  },
  userDropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '0.75rem',
    backgroundColor: '#1a1a2e',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(102, 126, 234, 0.2)',
    minWidth: '250px',
    zIndex: 1001,
    overflow: 'hidden',
  },
  userDropdownHeader: {
    padding: '1rem',
    background: 'rgba(102, 126, 234, 0.1)',
  },
  userDropdownInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  userDropdownName: {
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '600',
    margin: 0,
  },
  userDropdownRole: {
    color: '#888',
    fontSize: '0.85rem',
    margin: '0.25rem 0 0 0',
  },
  userDropdownDivider: {
    height: '1px',
    background: 'rgba(255, 255, 255, 0.1)',
  },
  userDropdownItem: {
    display: 'block',
    width: '100%',
    padding: '0.75rem 1rem',
    color: '#e0e0e0',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    fontSize: '0.9rem',
  },
  logoutButton: {
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    color: '#e74c3c',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    textAlign: 'left',
  },
  registerButton: {
    backgroundColor: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    textDecoration: 'none',
    padding: '0.6rem 1.5rem',
    borderRadius: '50px',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    border: 'none',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  },


  // Este estilo es crucial para la "burbuja"
cartBadge: {
  position: 'absolute',
  // Ajusta 'top' y 'right' para posicionar la burbuja sobre el ícono 🛒
  top: '-2px', 
  right: '0px', 
  backgroundColor: 'red', // Color rojo solicitado
  color: 'white',
  borderRadius: '50%', // Para que sea una burbuja
  padding: '2px 6px',
  fontSize: '0.7rem',
  fontWeight: 'bold',
  lineHeight: '1',
  minWidth: '5px', // Asegura un tamaño mínimo
  textAlign: 'center',
},


}
export default Navbar;