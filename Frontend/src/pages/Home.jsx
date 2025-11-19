import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { cursosAPI } from '../services/api';
import CourseCard from '../components/CourseCard';

// --- DATOS FICTICIOS PARA CATEGORIAS Y RESEÑAS ---
const CATEGORIAS = [
  { id: 1, nombre: 'Programación', icono: '💻', color: '#3b82f6', bg: '#dbeafe' },
  { id: 2, nombre: 'Negocios', icono: '💼', color: '#10b981', bg: '#d1fae5' },
  { id: 3, nombre: 'Diseño', icono: '🎨', color: '#8b5cf6', bg: '#ede9fe' },
  { id: 4, nombre: 'Marketing', icono: '📈', color: '#f59e0b', bg: '#fef3c7' },
  { id: 5, nombre: 'Finanzas', icono: '💵', color: '#14b8a6', bg: '#ccfbf1' },
  { id: 6, nombre: 'Desarrollo P.', icono: '🌱', color: '#ec4899', bg: '#fce7f3' },
];

const RESENAS = [
  {
    id: 1,
    nombre: "Ana García",
    rol: "Desarrolladora Web",
    texto: "Este curso cambió mi carrera. Pasé de no saber nada de código a conseguir mi primer empleo como Junior en 6 meses.",
    avatar: "👩🏻‍💻",
    rating: 5
  },
  {
    id: 2,
    nombre: "Carlos Méndez",
    rol: "Emprendedor",
    texto: "Las lecciones de negocios son directas y prácticas. Pude aplicar lo aprendido en mi startup desde la primera semana.",
    avatar: "👨🏽‍💼",
    rating: 5
  },
  {
    id: 3,
    nombre: "Lucía Torres",
    rol: "Diseñadora UX",
    texto: "La calidad de producción de los cursos es excelente. Los instructores explican con mucha claridad y los proyectos son retadores.",
    avatar: "👩🏼‍🎨",
    rating: 4.5
  }
];

function Home() {
  const [cursosDestacados, setCursosDestacados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarCursosDestacados();
  }, []);

  const cargarCursosDestacados = async () => {
    try {
      // Si la API falla o está vacía, no romperá la app
      const response = await cursosAPI.obtenerTodos();
      // Tomamos solo los primeros 3 o 4
      const data = response.data || [];
      setCursosDestacados(data.slice(0, 3));
    } catch (err) {
      console.error('Error al cargar cursos:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroBackground}></div>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>
              Aprende sin <span style={styles.highlight}>límites</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Acceso a cursos de calidad dictados por expertos. Aprende a tu ritmo y alcanza tus metas profesionales.
            </p>
            <div style={styles.heroButtons}>
              <Link to="/cursos" style={styles.buttonPrimary}>
                🚀 Explorar Cursos
              </Link>
              <Link to="/registro" style={styles.buttonSecondary}>
                ✨ Registrarse Gratis
              </Link>
            </div>
          </div>
          <div style={styles.heroIllustration}>
             {/* Ilustración abstracta simple */}
            
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>1K+</div>
            <div style={styles.statLabel}>Estudiantes Activos</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>100+</div>
            <div style={styles.statLabel}>Cursos Disponibles</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>90%</div>
            <div style={styles.statLabel}>Satisfacción</div>
          </div>
        </div>
      </section>

      {/* --- NUEVA SECCIÓN: CATEGORÍAS --- */}
      <section style={styles.categoriesSection}>
        <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Explora por Categoría</h2>
            <p style={styles.sectionSubtitle}>Encuentra el curso perfecto para ti</p>
        </div>
        
        <div style={styles.categoriesGrid}>
            {CATEGORIAS.map((cat) => (
                <Link to={`/cursos?categoria=${cat.nombre}`} key={cat.id} style={styles.categoryCard}>
                    <div style={{...styles.categoryIconBox, backgroundColor: cat.bg, color: cat.color}}>
                        {cat.icono}
                    </div>
                    <span style={styles.categoryName}>{cat.nombre}</span>
                </Link>
            ))}
        </div>
      </section>

      {/* Cursos Destacados */}
      <section style={styles.coursesSection}>
        <div style={styles.coursesHeader}>
          <div>
            <h2 style={styles.sectionTitle}>Cursos Destacados</h2>
            <p style={styles.coursesSubtitle}>Los más populares entre nuestros estudiantes</p>
          </div>
          <Link to="/cursos" style={styles.linkViewAll}>Ver todos &rarr;</Link>
        </div>

        {loading ? (
          <p style={styles.loading}>Cargando cursos...</p>
        ) : cursosDestacados.length > 0 ? (
          <div style={styles.coursesGrid}>
            {cursosDestacados.map((curso) => (
              <CourseCard key={curso.idCurso} curso={curso} />
            ))}
          </div>
        ) : (
          <p style={styles.empty}>No hay cursos disponibles en este momento.</p>
        )}
      </section>

      {/* Características */}
      <section style={styles.features}>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>🎓</span>
            <h3 style={styles.featureTitle}>Instructores Expertos</h3>
            <p style={styles.featureText}>Aprende de profesionales que trabajan en la industria.</p>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>⏰</span>
            <h3 style={styles.featureTitle}>A tu propio ritmo</h3>
            <p style={styles.featureText}>Disfruta de acceso de por vida a los cursos que compres.</p>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>📜</span>
            <h3 style={styles.featureTitle}>Certifícate</h3>
            <p style={styles.featureText}>Obtén un certificado oficial al completar cada curso.</p>
          </div>
        </div>
      </section>

      {/* --- NUEVA SECCIÓN: TESTIMONIOS --- */}
      <section style={styles.reviewsSection}>
        <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Lo que dicen nuestros estudiantes</h2>
            <p style={styles.sectionSubtitle}>Más de 10,000 personas ya están aprendiendo con nosotros</p>
        </div>

        <div style={styles.reviewsGrid}>
            {RESENAS.map((resena) => (
                <div key={resena.id} style={styles.reviewCard}>
                    <div style={styles.stars}>
                        {"⭐".repeat(Math.floor(resena.rating))}
                    </div>
                    <p style={styles.reviewText}>"{resena.texto}"</p>
                    
                    <div style={styles.reviewUser}>
                        <div style={styles.avatar}>{resena.avatar}</div>
                        <div>
                            <div style={styles.userName}>{resena.nombre}</div>
                            <div style={styles.userRole}>{resena.rol}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Call to Action Final */}
      <section style={styles.cta}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>¿Listo para transformar tu carrera?</h2>
          <p style={styles.ctaText}>
            Únete hoy mismo y comienza a aprender las habilidades del futuro.
          </p>
          <Link to="/registro" style={styles.ctaButtonPrimary}>
            Comenzar Ahora
          </Link>
        </div>
      </section>

    </div>
  );
}

const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f9fafb',
    overflowX: 'hidden',
  },
  // --- HERO SECTION ---
 hero: {
  position: 'relative',
  backgroundImage: 'url("/fondo3.jpg")', // ← AQUÍ PONES TU IMAGEN
  backgroundSize: 'cover',       // Para que cubra todo el espacio
  backgroundPosition: 'center',  // Centrada
  backgroundRepeat: 'no-repeat', // Evita que se repita
  color: '#fff',
  padding: '2rem 2rem',
  minHeight: '550px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
},
heroContent: {
  maxWidth: '1200px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',      // ← Todo en columna
  alignItems: 'center',         // ← Centra horizontalmente
  justifyContent: 'center',     // ← Centra verticalmente si aplica
  textAlign: 'center',          // ← Centra todo el texto
  gap: '1rem',
  zIndex: 2,
},

heroText: {
  textAlign: 'center',          // ← Ya no es necesario pero no molesta
},

heroTitle: {
  fontSize: '3.5rem',
  fontWeight: '800',
  lineHeight: '1.2',
  marginBottom: '1.5rem',
},

highlight: {
  color: '#4b5cfaff',
},

heroSubtitle: {
  fontSize: '1.2rem',
  color: '#000000ff',
  marginBottom: '2.5rem',
  lineHeight: '1.6',
  maxWidth: '500px',             // ← Aumenté para mejor proporción
  textAlign: 'center',           // ← Asegura centrado
},

heroButtons: {
  display: 'flex',
  justifyContent: 'center',      // ← CENTRA LOS BOTONES
  gap: '1rem',
  flexWrap: 'wrap',
},

  buttonPrimary: {
    backgroundColor: '#4f46e5',
    color: '#fff',
    padding: '1rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    border: '2px solid #4f46e5',
    display: 'inline-block',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    color: '#fff',
    padding: '1rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    border: '2px solid #fff',
    display: 'inline-block',
  },
  heroIllustration: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationCircle: {
    width: '300px',
    height: '300px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 40px rgba(79, 70, 229, 0.3)',
  },

  // --- STATS ---
  statsSection: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #e2e8f0',
    padding: '2rem 0',
  },
  statsContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '2rem',
    padding: '0 1rem',
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#4f46e5',
  },
  statLabel: {
    color: '#64748b',
    fontSize: '0.9rem',
    fontWeight: '500',
  },

  // --- CATEGORÍAS (NUEVO) ---
  categoriesSection: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 1rem',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem',
  },
  sectionSubtitle: {
    color: '#64748b',
    fontSize: '1.1rem',
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '1.5rem',
  },
  categoryCard: {
    backgroundColor: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '2rem 1rem',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    cursor: 'pointer',
  },
  categoryIconBox: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
  },
  categoryName: {
    color: '#1e293b',
    fontWeight: '600',
    fontSize: '1rem',
  },

  // --- CURSOS ---
  coursesSection: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem 4rem 1rem',
  },
  coursesHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '2rem',
  },
  coursesSubtitle: {
    color: '#64748b',
    marginTop: '0.5rem',
  },
  linkViewAll: {
    color: '#4f46e5',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
  },
  coursesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
  },
  empty: {
    textAlign: 'center',
    color: '#64748b',
    padding: '2rem',
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.2rem',
  },

  // --- FEATURES ---
  features: {
    backgroundColor: '#fff',
    padding: '5rem 1rem',
  },
  featuresGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '3rem',
  },
  featureCard: {
    textAlign: 'center',
    padding: '1rem',
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    display: 'block',
  },
  featureTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#1e293b',
  },
  featureText: {
    color: '#64748b',
    lineHeight: '1.6',
  },

  // --- RESEÑAS (NUEVO) ---
  reviewsSection: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 1rem',
  },
  reviewsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    border: '1px solid #f1f5f9',
  },
  stars: {
    marginBottom: '1rem',
    fontSize: '1.2rem',
  },
  reviewText: {
    color: '#334155',
    fontStyle: 'italic',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    minHeight: '80px',
  },
  reviewUser: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  avatar: {
    width: '45px',
    height: '45px',
    backgroundColor: '#e0e7ff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
  },
  userName: {
    fontWeight: '700',
    color: '#1e293b',
    fontSize: '0.95rem',
  },
  userRole: {
    fontSize: '0.85rem',
    color: '#64748b',
  },

  // --- CTA ---
  cta: {
    backgroundColor: '#1e293b',
    padding: '5rem 1rem',
    textAlign: 'center',
    color: '#fff',
    marginTop: '2rem',
  },
  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  ctaText: {
    fontSize: '1.2rem',
    color: '#cbd5e1',
    marginBottom: '2.5rem',
  },
  ctaButtonPrimary: {
    backgroundColor: '#4f46e5',
    color: '#fff',
    padding: '1rem 2.5rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    display: 'inline-block',
    transition: 'background 0.2s',
  },
};

export default Home;