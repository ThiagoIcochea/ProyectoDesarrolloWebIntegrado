import { Link } from 'react-router-dom';

function About() {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Sobre <span style={styles.highlight}>RecordsBook</span>
          </h1>

        </div>
        <div style={styles.heroBackground}></div>
      </section>

      {/* Misión, Visión, Valores */}
      <section style={styles.misionSection}>
        <div style={styles.misionGrid}>
          <div style={styles.misionCard}>
            <div style={styles.misionIcon}>🎯</div>
            <h3 style={styles.misionTitle}>Misión</h3>
            <p style={styles.misionText}>
              Democratizar el acceso a educación de calidad, proporcionando cursos en línea diseñados por expertos para empoderar a profesionales en todo el mundo.
            </p>
          </div>

          <div style={styles.misionCard}>
            <div style={styles.misionIcon}>🚀</div>
            <h3 style={styles.misionTitle}>Visión</h3>
            <p style={styles.misionText}>
              Ser la plataforma educativa líder en Latinoamérica, transformando vidas a través del aprendizaje continuo y la innovación tecnológica.
            </p>
          </div>

          <div style={styles.misionCard}>
            <div style={styles.misionIcon}>💎</div>
            <h3 style={styles.misionTitle}>Valores</h3>
            <p style={styles.misionText}>
              Excelencia, Integridad, Innovación y Compromiso con nuestros estudiantes y comunidad educativa global.
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section style={styles.historiaSection}>
        <div style={styles.historiaContent}>
          <h2 style={styles.sectionTitle}>Nuestra Historia</h2>
          <div style={styles.historiaTimeline}>
            <div style={styles.timelineItem}>
              <div style={styles.timelineMarker}>2023</div>
              <div style={styles.timelineContent}>
                <h4 style={styles.timelineTitle}>Fundación de RecordsBook</h4>
                <p style={styles.timelineText}>
                  Un grupo de 4 emprendedores educativos se unen con la misión de revolucionar la educación en línea. Con una visión clara y pasión, lanzan la primera versión de RecordsBook.
                </p>
              </div>
            </div>

            <div style={styles.timelineItem}>
              <div style={styles.timelineMarker}>2024</div>
              <div style={styles.timelineContent}>
                <h4 style={styles.timelineTitle}>Primer Millón de Usuarios</h4>
                <p style={styles.timelineText}>
                  Durante la pandemia, RecordsBook alcanza 1 mil usuarios en toda Latinoamérica, consolidándose como una plataforma confiable.
                </p>
              </div>
            </div>



            <div style={styles.timelineItem}>
              <div style={styles.timelineMarker}>2025</div>
              <div style={styles.timelineContent}>
                <h4 style={styles.timelineTitle}>Presente</h4>
                <p style={styles.timelineText}>
                  Hoy, RecordsBook alberga más de 100 cursos, con más de mil estudiantes activos aprendiendo y creciendo profesionalmente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section style={styles.equipoSection}>
        <h2 style={styles.sectionTitle}>Nuestro Equipo</h2>
        <div style={styles.equipoGrid}>
          <div style={styles.miembroCard}>
            <div style={styles.miembroAvatar}>👨‍💼</div>
            <h4 style={styles.miembroNombre}>Thiago Paolo</h4>
            <p style={styles.miembroPuesto}>CEO & Co-Fundador</p>
            <p style={styles.miembroDescripcion}>
              Experto en tecnología educativa con 15 años de experiencia en startups tech.
            </p>
          </div>

          <div style={styles.miembroCard}>
            <div style={styles.miembroAvatar}>👩‍💼</div>
            <h4 style={styles.miembroNombre}>Haydee Irene</h4>
            <p style={styles.miembroPuesto}>Directora de Contenido</p>
            <p style={styles.miembroDescripcion}>
              Pedagoga con doctorado en Educación Digital de la Universidad de Madrid.
            </p>
          </div>

          <div style={styles.miembroCard}>
            <div style={styles.miembroAvatar}>👨‍💻</div>
            <h4 style={styles.miembroNombre}>Roy Salvador</h4>
            <p style={styles.miembroPuesto}>CTO & Co-Fundador</p>
            <p style={styles.miembroDescripcion}>
              Ingeniero de software con experiencia en plataformas de escala masiva.
            </p>
          </div>

          <div style={styles.miembroCard}>
            <div style={styles.miembroAvatar}>👨‍💼</div>
            <h4 style={styles.miembroNombre}>Carlos Enrique</h4>
            <p style={styles.miembroPuesto}>CEO & Co-Fundador</p>
            <p style={styles.miembroDescripcion}>
              Experto en tecnología educativa con 10 años de experiencia en startups tech.
            </p>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section style={styles.statsSection}>
        <h2 style={styles.sectionTitle}>Por Los Números</h2>
        <div style={styles.statsGrid}>
          <div style={styles.statBox}>
            <div style={styles.statNumber}>1K+</div>
            <div style={styles.statLabel}>Estudiantes Activos</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statNumber}>100+</div>
            <div style={styles.statLabel}>Cursos Disponibles</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statNumber}>90%</div>
            <div style={styles.statLabel}>Satisfacción</div>
          </div>

        </div>
      </section>

      {/* Valores Principales */}
      <section style={styles.valoresSection}>
        <h2 style={styles.sectionTitle}>¿Por Qué Elegir RecordsBook?</h2>
        <div style={styles.valoresGrid}>
          <div style={styles.valorCard}>
            <div style={styles.valorIcon}>🌟</div>
            <h4 style={styles.valorTitle}>Contenido Premium</h4>
            <p style={styles.valorText}>
              Todos nuestros cursos son diseñados por expertos de la industria con experiencia verificada.
            </p>
          </div>

          <div style={styles.valorCard}>
            <div style={styles.valorIcon}>💪</div>
            <h4 style={styles.valorTitle}>Soporte 24/7</h4>
            <p style={styles.valorText}>
              Nuestro equipo está disponible para ayudarte en cualquier momento del día o la noche.
            </p>
          </div>

          <div style={styles.valorCard}>
            <div style={styles.valorIcon}>📜</div>
            <h4 style={styles.valorTitle}>Certificados Reconocidos</h4>
            <p style={styles.valorText}>
              Obtén certificados que son reconocidos por empresas líderes en todo el mundo.
            </p>
          </div>

          <div style={styles.valorCard}>
            <div style={styles.valorIcon}>🔄</div>
            <h4 style={styles.valorTitle}>Acceso de por Vida</h4>
            <p style={styles.valorText}>
              Una vez compres un curso, tendrás acceso ilimitado al contenido para siempre.
            </p>
          </div>

          <div style={styles.valorCard}>
            <div style={styles.valorIcon}>🌍</div>
            <h4 style={styles.valorTitle}>Comunidad Global</h4>
            <p style={styles.valorText}>
              Conecta con millones de estudiantes de todo el mundo en nuestra comunidad.
            </p>
          </div>

          <div style={styles.valorCard}>
            <div style={styles.valorIcon}>⚡</div>
            <h4 style={styles.valorTitle}>Aprendizaje Flexible</h4>
            <p style={styles.valorText}>
              Aprende a tu propio ritmo sin compromisos de horarios fijos.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={styles.ctaFinal}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Únete a Millones de Estudiantes</h2>
          <p style={styles.ctaText}>
            Comienza tu viaje de aprendizaje hoy y transforma tu futuro profesional
          </p>
          <Link to="/registro" style={styles.ctaButton}>
            🚀 Comienza Ahora
          </Link>
        </div>
      </section>

      {/* Contacto */}
      <section style={styles.contactoSection}>
        <h2 style={styles.sectionTitle}>Contáctanos</h2>
        <div style={styles.contactoGrid}>
          <div style={styles.contactoCard}>
            <div style={styles.contactoIcon}>📧</div>
            <h4 style={styles.contactoTitle}>Email</h4>
            <p style={styles.contactoInfo}>info@recordsbook.com</p>
            <p style={styles.contactoInfo}>soporte@recordsbook.com</p>
          </div>

          <div style={styles.contactoCard}>
            <div style={styles.contactoIcon}>📱</div>
            <h4 style={styles.contactoTitle}>Teléfono</h4>
            <p style={styles.contactoInfo}>+51 995766986</p>
            <p style={styles.contactoInfo}>-</p>
          </div>

          <div style={styles.contactoCard}>
            <div style={styles.contactoIcon}>📍</div>
            <h4 style={styles.contactoTitle}>Ubicaciones</h4>
            <p style={styles.contactoInfo}>UTP - CENTRAL</p>
            <p style={styles.contactoInfo}>Lima, Perú</p>
          </div>

          <div style={styles.contactoCard}>
            <div style={styles.contactoIcon}>⏰</div>
            <h4 style={styles.contactoTitle}>Horarios</h4>
            <p style={styles.contactoInfo}>Lunes - Viernes: 09:00 - 18:00</p>
            <p style={styles.contactoInfo}>Soporte 24/7 disponible</p>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
  // Hero Section
  heroSection: {
    backgroundImage: 'url("/fondo5.jpg")', // ← AQUÍ PONES TU IMAGEN
    backgroundSize: 'cover',       // Para que cubra todo el espacio
    ackgroundPosition: 'center',  // Centrada
    backgroundRepeat: 'no-repeat', // Evita que se repita
    color: '#ffffffff',
    minHeight: '120px',
    padding: '5rem 1rem',
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '800',
    marginBottom: '1rem',
    lineHeight: '1.2',
  },
  highlight: {
    background: 'linear-gradient(120deg, #fffdfbff 0%, #756f6fff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: '1.3rem',
    opacity: 0.95,
    fontWeight: '300',
  },
  heroBackground: {
    position: 'absolute',
    top: '-50%',
    right: '-10%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
  },
  // Misión Section
  misionSection: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 1rem',
  },
  misionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  misionCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  misionIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  misionTitle: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    marginBottom: '1rem',
    fontWeight: '700',
  },
  misionText: {
    color: '#7f8c8d',
    lineHeight: '1.8',
  },
  // Historia Section
  historiaSection: {
    backgroundColor: '#fff',
    padding: '4rem 1rem',
  },
  historiaContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  historiaTimeline: {
    marginTop: '3rem',
  },
  timelineItem: {
    display: 'grid',
    gridTemplateColumns: '150px 1fr',
    gap: '2rem',
    marginBottom: '3rem',
    paddingBottom: '2rem',
    borderBottom: '1px solid #ecf0f1',
  },
  timelineMarker: {
    fontSize: '2rem',
    fontWeight: '800',
    background: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  timelineContent: {
    paddingTop: '0.5rem',
  },
  timelineTitle: {
    fontSize: '1.3rem',
    color: '#2c3e50',
    marginBottom: '0.5rem',
    fontWeight: '700',
  },
  timelineText: {
    color: '#7f8c8d',
    lineHeight: '1.7',
  },
  // Equipo Section
  equipoSection: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 1rem',
  },
  equipoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '3rem',
  },
  miembroCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  miembroAvatar: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  miembroNombre: {
    fontSize: '1.3rem',
    color: '#2c3e50',
    fontWeight: '700',
    marginBottom: '0.3rem',
  },
  miembroPuesto: {
    fontSize: '1rem',
    background: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  miembroDescripcion: {
    color: '#7f8c8d',
    fontSize: '0.95rem',
    lineHeight: '1.6',
  },
  // Stats Section
  statsSection: {
    backgroundColor: '#f8f9fa',
    padding: '4rem 1rem',
  },
  statsGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    marginTop: '3rem',
  },
  statBox: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: '800',
    background: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.5rem',
  },
  statLabel: {
    color: '#7f8c8d',
    fontSize: '1rem',
  },
  // Valores Section
  valoresSection: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 1rem',
  },
  valoresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '3rem',
  },
  valorCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
  },
  valorIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  valorTitle: {
    fontSize: '1.3rem',
    color: '#2c3e50',
    fontWeight: '700',
    marginBottom: '0.75rem',
  },
  valorText: {
    color: '#7f8c8d',
    lineHeight: '1.7',
  },
  // CTA Final
  ctaFinal: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    padding: '4rem 1rem',
    textAlign: 'center',
  },
  ctaContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '1rem',
  },
  ctaText: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    opacity: 0.95,
  },
  ctaButton: {
    display: 'inline-block',
    padding: '1rem 2.5rem',
    backgroundColor: '#fff',
    color: '#667eea',
    textDecoration: 'none',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '600',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },
  // Contacto Section
  contactoSection: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 1rem',
  },
  contactoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '3rem',
  },
  contactoCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  contactoIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  contactoTitle: {
    fontSize: '1.2rem',
    color: '#2c3e50',
    fontWeight: '700',
    marginBottom: '1rem',
  },
  contactoInfo: {
    color: '#7f8c8d',
    fontSize: '0.95rem',
    marginBottom: '0.5rem',
  },
  // Common
  sectionTitle: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    textAlign: 'center',
    fontWeight: '800',
    marginBottom: '0.5rem',
  },
};

export default About;