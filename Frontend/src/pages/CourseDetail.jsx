import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cursosAPI } from '../services/api';
import { useCart } from '../context/CartContext.jsx';
import useWindowWidth from '../components/useWindowWidth.js'; // Asegúrate de ajustar la ruta

// Iconos SVG simples
const Icons = {
  Clock: (style = {}) => <svg style={style} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  Calendar: (style = {}) => <svg style={style} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  Book: (style = {}) => <svg style={style} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
  Check: (style = {}) => <svg style={{ ...style, stroke: '#22c55e' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  Alert: (style = {}) => <svg style={style} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
};

const BREAKPOINT = 900; // Punto de quiebre para el layout de 2 columnas

function CourseDetail({ user }) {
  const { agregarAlCarrito } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Hook para detectar el ancho de pantalla
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= BREAKPOINT;


  useEffect(() => {
    cargarCurso();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const cargarCurso = async () => {
    try {
      setLoading(true);
      const response = await cursosAPI.obtenerPorId(id);
      setCurso(response.data);
    } catch (err) {
      setError('No pudimos cargar la información del curso.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER: LOADING ---
  if (loading) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.loadingSkeleton}>
          <div style={styles.skeletonImg}></div>
          <div style={styles.skeletonText}></div>
          <div style={{ ...styles.skeletonText, ...styles.short }}></div>
        </div>
      </div>
    );
  }

  // --- RENDER: ERROR ---
  if (error || !curso) {
    return (
      <div style={{ ...styles.pageWrapper, ...styles.errorContainer }}>
        <div style={styles.errorBox}>
          <Icons.Alert style={{ color: '#ef4444' }} />
          <p>{error || 'Curso no encontrado'}</p>
          <button onClick={() => navigate('/cursos')} style={styles.btnSecondary}>Volver al catálogo</button>
        </div>
      </div>
    );
  }

  const precioFormateado = curso.precio 
    ? `S/ ${Number(curso.precio).toFixed(2)}` 
    : 'Gratis';

  const fechaCreacion = new Date(curso.fechaCreacion).toLocaleDateString('es-ES', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  // Estilo condicional para el layout de 2 columnas
  const mainGridStyle = isDesktop 
    ? { ...styles.mainGrid, ...styles.mainGridDesktop } 
    : styles.mainGrid;
    
  const headerTextStyle = isDesktop 
    ? styles.courseHeaderDesktop 
    : styles.courseHeader;


  // --- RENDER: MAIN ---
  return (
    <div style={styles.pageWrapper}>
      {/* Header Hero Background */}
      <div style={styles.heroBg}></div>

      <div style={mainGridStyle}>
        
        {/* COLUMNA IZQUIERDA: Contenido */}
        <div style={styles.contentColumn}>
          <div style={headerTextStyle}>
            <div style={styles.badgesRow}>
              {curso.categoria && <span style={{...styles.badge, ...styles.badgeBlue}}>{curso.categoria}</span>}
              {curso.nivel && <span style={{...styles.badge, ...styles.badgeGray}}>{curso.nivel}</span>}
            </div>
            <h1 style={styles.courseTitle}>{curso.titulo}</h1>
            <p style={styles.courseSummary}>
              {/* Aquí estaba vacío en tu código original */}
            </p>
            
            <div style={styles.metaInfo}>
              <div style={styles.metaItem}>
                <Icons.Calendar style={isDesktop ? styles.metaItemIconDesktop : styles.metaItemIconMobile} />
                <span>Actualizado: {fechaCreacion}</span>
              </div>
              <div style={styles.metaItem}>
                 <span style={curso.estado === 'ACTIVO' ? styles.statusDotActive : styles.statusDotInactive}></span>
                 <span>{curso.estado}</span>
              </div>
            </div>
          </div>

          {/* Imagen Móvil (Solo visible en pantallas pequeñas) */}
          <div style={isDesktop ? styles.mobileImageDesktop : styles.mobileImageMobile}>
              {curso.imagenPortada ? (
                <img src={curso.imagenPortada} alt={curso.titulo} style={styles.mobileImageImg} />
              ) : (
                <div style={styles.imgPlaceholder}>📚</div>
              )}
          </div>

          <div style={styles.sectionBlock}>
            <h3 style={styles.sectionBlockH3}>Descripción del Curso</h3>
            <p style={styles.descriptionText}>
              {curso.descripcion || 'No hay una descripción detallada disponible para este curso.'}
            </p>
          </div>

          {curso.requisitosPrevios && (
            <div style={styles.sectionBlock}>
              <h3 style={styles.sectionBlockH3}>Requisitos</h3>
              <ul style={styles.requirementsList}>
                <li style={styles.requirementsListItem}><Icons.Check /> {curso.requisitosPrevios}</li>
                <li style={styles.requirementsListItem}><Icons.Check /> Acceso a computadora e internet</li>
              </ul>
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA: Sidebar de Compra (Sticky) */}
        <div style={styles.sidebarColumn}>
          <div style={styles.enrollmentCard}>
            <div style={styles.cardImage}>
              {curso.imagenPortada ? (
                <img src={curso.imagenPortada} alt={curso.titulo} style={styles.cardImageImg} />
              ) : (
                <div style={styles.imgPlaceholder}>📚</div>
              )}
            </div>
            
            <div style={styles.cardBody}>
              <div style={styles.priceTag}>{precioFormateado}</div>
              
              {curso.estado === 'ACTIVO' ? (
                 <button 
                  style={{ ...styles.btnPrimary, ...styles.fullWidth }}
                  onClick={() => agregarAlCarrito(curso)}
                  title="Agregar al carrito"
                >
                  Adquirir Curso
                </button>
              ) : (
                <button style={{ ...styles.btnDisabled, ...styles.fullWidth }} disabled>
                  Inscripciones Cerradas
                </button>
              )}

              <p style={styles.guaranteeText}>Acceso de por vida • Certificado de finalización</p>

              <div style={styles.courseFeatures}>
                <h4 style={styles.courseFeaturesH4}>Este curso incluye:</h4>
                <ul style={styles.courseFeaturesUl}>
                  <li style={styles.courseFeaturesLi}>
                    <div>
                      <Icons.Clock style={styles.courseFeaturesIcon} />
                      <span>{curso.duracionHoras || 0} horas de contenido</span>
                    </div>
                  </li>
                  <li style={styles.courseFeaturesLi}>
                    <div>
                      <Icons.Book style={styles.courseFeaturesIcon} />
                      <span>{curso.modalidad || 'Online'}</span>
                    </div>
                  </li>
                  <li style={{...styles.courseFeaturesLi, borderBottom: 'none'}}>
                    <div>
                      <Icons.Check style={styles.courseFeaturesIcon} />
                      <span>Acceso en móviles y TV</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- ESTILOS DE JAVASCRIPT (INLINE STYLES) ---
const commonVars = {
  primary: '#2563eb',
  primaryDark: '#1d4ed8',
  textMain: '#1f2937',
  textLight: '#6b7280',
  white: '#ffffff',
  radius: '12px',
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

const styles = {
  // Variables comunes (usadas internamente)
  ...commonVars,

  // --- Layout General ---
  pageWrapper: {
    backgroundColor: '#1e293b',
    minHeight: '100vh',
    paddingBottom: '4rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    position: 'relative',
    zIndex: 0,
  },
  heroBg: {
    backgroundColor: '#1e293b',
    height: '200px',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr', // Mobile por defecto
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
    position: 'relative',
    zIndex: 1,
  },
  // Estilo Condicional para Desktop (Simulando Media Query)
  mainGridDesktop: {
    gridTemplateColumns: '2fr 1fr', // 66% contenido, 33% sidebar
    paddingTop: '4rem',
  },

  // --- Columna Izquierda (Content) ---
  contentColumn: {
    color: commonVars.textMain,
  },
  courseHeader: { // Mobile
    marginBottom: '2rem',
  },
  courseHeaderDesktop: { // Desktop (Para el texto blanco sobre el fondo oscuro)
    marginBottom: '2rem',
    color: commonVars.white,
  },
  courseTitle: {
    fontSize: '2rem',
    fontWeight: 800,
    margin: '0.5rem 0',
    lineHeight: 1.2,
    color: commonVars.white, // Asegura que el título sea blanco en desktop
  },
  courseSummary: {
    fontSize: '1.1rem',
    color: commonVars.textLight,
    marginBottom: '1.5rem',
  },
  badgesRow: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  badge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '99px',
    fontSize: '0.85rem',
    fontWeight: 600,
  },
  badgeBlue: { background: '#dbeafe', color: '#1e40af' },
  badgeGray: { background: '#f3f4f6', color: '#374151' },

  metaInfo: {
    display: 'flex',
    gap: '1.5rem',
    fontSize: '0.9rem',
    alignItems: 'center',
    color: '#e2e8f0', // Texto claro sobre el fondo oscuro
  },
  metaItem: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '0.5rem',
  },
  metaItemIconDesktop: {
    color: '#e2e8f0', // Iconos claros en desktop
  },
  metaItemIconMobile: {
    color: commonVars.textLight, // Iconos oscuros en mobile (si la sección es blanca)
  },

  statusDot: { 
    width: '8px', 
    height: '8px', 
    borderRadius: '50%', 
  },
  statusDotActive: {
    backgroundColor: '#22c55e',
    boxShadow: '0 0 8px #22c55e',
  },
  statusDotInactive: {
    backgroundColor: '#ccc',
  },

  sectionBlock: {
    background: commonVars.white,
    padding: '2rem',
    borderRadius: commonVars.radius,
    boxShadow: commonVars.shadow,
    marginBottom: '2rem',
  },
  sectionBlockH3: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#111827',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '0.5rem',
  },
  descriptionText: {
    lineHeight: 1.7,
    color: '#374151',
  },
  requirementsList: {
    listStyle: 'none',
    padding: 0,
  },
  requirementsListItem: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '0.75rem',
    alignItems: 'center',
  },

  // Imagen Móvil (Responsividad)
  mobileImageMobile: { // Mobile: Mostrar
    display: 'block', 
    marginBottom: '1.5rem', 
    borderRadius: commonVars.radius, 
    overflow: 'hidden',
  },
  mobileImageDesktop: { // Desktop: Ocultar
    display: 'none', 
  },
  mobileImageImg: {
    width: '100%', 
    height: 'auto', 
    display: 'block',
  },


  // --- Columna Derecha (Sidebar) ---
  sidebarColumn: {
    position: 'relative',
  },
  enrollmentCard: {
    background: commonVars.white,
    borderRadius: commonVars.radius,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    border: '1px solid #e5e7eb',
    position: 'sticky', 
    top: '2rem', 
    // Para mobile, puedes desactivar el sticky si quieres:
    // @media (max-width: 900px) { position: 'relative', top: '0', }
  },

  cardImage: {
    height: '200px',
    background: '#e5e7eb',
    overflow: 'hidden',
  },
  cardImageImg: { 
    width: '100%', 
    height: '100%', 
    objectFit: 'cover', 
  },
  imgPlaceholder: { 
    width: '100%', 
    height: '100%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontSize: '4rem', 
    background: 'linear-gradient(45deg, #e2e8f0, #cbd5e1)', 
  },
  cardBody: { 
    padding: '1.5rem', 
  },
  priceTag: {
    fontSize: '2.25rem',
    fontWeight: 800,
    color: '#111827',
    marginBottom: '1.5rem',
  },
  fullWidth: { 
    width: '100%', 
    display: 'block', 
  },
  btnPrimary: {
    background: commonVars.primary,
    color: commonVars.white,
    padding: '0.85rem',
    fontSize: '1.1rem',
    fontWeight: 600,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  // Nota: No se puede aplicar :hover o :disabled directamente con inline styles
  // Para el hover, usarías un estado `isHovered` con `onMouseEnter`/`onMouseLeave`.
  // Para el :disabled, el componente ya maneja el estilo btn-disabled.
  btnDisabled: {
    background: '#e5e7eb',
    color: '#6b7280',
    padding: '0.85rem',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    cursor: 'not-allowed',
  },
  guaranteeText: {
    textAlign: 'center',
    fontSize: '0.8rem',
    color: '#6b7280',
    marginTop: '1rem',
    marginBottom: '1.5rem',
  },
  courseFeatures: {},
  courseFeaturesH4: {
    fontSize: '1rem',
    marginBottom: '1rem',
    color: '#111827',
  },
  courseFeaturesUl: {
    listStyle: 'none',
    padding: 0,
  },
  courseFeaturesLi: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.75rem 0',
    borderBottom: '1px solid #f3f4f6',
    color: '#4b5563',
    fontSize: '0.95rem',
  },
  courseFeaturesIcon: {
    color: '#6b7280', 
    marginRight: '0.5rem',
  },

  // --- Loading & Error ---
  loadingSkeleton: {
    maxWidth: '800px', 
    margin: '4rem auto', 
    padding: '2rem',
  },
  skeletonImg: { 
    height: '300px', 
    background: '#e5e7eb', 
    marginBottom: '2rem', 
    borderRadius: '12px', 
    // La animación 'pulse' no es posible con inline styles de React
  },
  skeletonText: { 
    height: '20px', 
    background: '#e5e7eb', 
    marginBottom: '1rem', 
    borderRadius: '4px', 
    // La animación 'pulse' no es posible con inline styles de React
  },
  short: { 
    width: '60%', 
  },
  errorContainer: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '60vh', 
    backgroundColor: '#1e293b', // Mismo fondo que pageWrapper
  },
  errorBox: { 
    textAlign: 'center', 
    color: '#ef4444', 
    background: '#fef2f2', 
    padding: '2rem', 
    borderRadius: '12px', 
    boxShadow: commonVars.shadow,
  },
  btnSecondary: { 
    marginTop: '1rem', 
    padding: '0.5rem 1rem', 
    background: commonVars.white, 
    border: '1px solid #e5e7eb', 
    cursor: 'pointer', 
    borderRadius: '6px', 
    color: commonVars.textMain,
  },
};

export default CourseDetail;