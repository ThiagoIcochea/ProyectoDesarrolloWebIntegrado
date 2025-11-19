import { useState } from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer style={styles.footer}>
      {/* Top Section */}
      <div style={styles.container}>
        <div style={styles.topSection}>
          {/* Brand */}
          <div style={styles.brandColumn}>
            <div style={styles.logo}>
              <span style={styles.logoIcon}>🎓</span>
              <h2 style={styles.logoText}>RecordsBooks</h2>
            </div>
            <p style={styles.brandDescription}>
              Transforma tu carrera con cursos de calidad dictados por expertos. Aprende, crece y alcanza tus objetivos profesionales.
            </p>
            <div style={styles.socialLinks}>
              <a href="#" style={styles.socialIcon}>f</a>
              <a href="#" style={styles.socialIcon}>𝕏</a>
              <a href="#" style={styles.socialIcon}>in</a>
              <a href="#" style={styles.socialIcon}>▶</a>
            </div>
          </div>

          {/* Links Grid */}
          <div style={styles.linksGrid}>
            <div style={styles.linkColumn}>
              <h4 style={styles.columnTitle}>Plataforma</h4>
              <ul style={styles.list}>
                <li><a href="/" style={styles.link}>Inicio</a></li>
                <li><a href="/cursos" style={styles.link}>Cursos</a></li>
                <li><a href="/registro" style={styles.link}>Registrarse</a></li>
                <li><a href="#" style={styles.link}>Precios</a></li>
              </ul>
            </div>

            <div style={styles.linkColumn}>
              <h4 style={styles.columnTitle}>Compañía</h4>
              <ul style={styles.list}>
                <li><a href="#" style={styles.link}>Sobre nosotros</a></li>
                <li><a href="#" style={styles.link}>Blog</a></li>
                <li><a href="#" style={styles.link}>Carreras</a></li>
                <li><a href="#" style={styles.link}>Prensa</a></li>
              </ul>
            </div>

            <div style={styles.linkColumn}>
              <h4 style={styles.columnTitle}>Legal</h4>
              <ul style={styles.list}>
                <li><a href="#" style={styles.link}>Privacidad</a></li>
                <li><a href="#" style={styles.link}>Términos</a></li>
                <li><a href="#" style={styles.link}>Cookies</a></li>
                <li><a href="#" style={styles.link}>Contacto</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div style={styles.newsletterColumn}>
            <h4 style={styles.columnTitle}>Newsletter</h4>
            <p style={styles.newsletterText}>
              Recibe tips y cursos exclusivos directamente en tu inbox
            </p>
            <form onSubmit={handleSubscribe} style={styles.newsletterForm}>
              <div style={styles.inputWrapper}>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.emailInput}
                />
                <button type="submit" style={styles.submitButton}>
                  ✈️
                </button>
              </div>
              {subscribed && (
                <p style={styles.successMessage}>
                  ¡Gracias por suscribirte! 🎉
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Divider */}
        <div style={styles.divider}></div>

        {/* Bottom Section */}
        <div style={styles.bottomSection}>
          <div style={styles.copyrightInfo}>
            <p style={styles.copyright}>
              © {currentYear} <strong>CursosOnline</strong>. Todos los derechos reservados.
            </p>
            <p style={styles.tagline}>
              Empoderando educación para el futuro 🚀
            </p>
          </div>

          {/* Stats */}
          <div style={styles.statsFooter}>
            <div style={styles.statFooter}>
              <span style={styles.statValue}>1K+</span>
              <span style={styles.statName}>Estudiantes</span>
            </div>
            <div style={styles.statFooter}>
              <span style={styles.statValue}>100+</span>
              <span style={styles.statName}>Cursos</span>
            </div>
            <div style={styles.statFooter}>
              <span style={styles.statValue}>4.8★</span>
              <span style={styles.statName}>Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div style={styles.bgElement1}></div>
      <div style={styles.bgElement2}></div>
    </footer>
  );
}

const styles = {
  footer: {
    background: 'linear-gradient(135deg, #0f0c29ff 0%, #302b63 50%, #24243e 100%)',
    color: '#e0e0e0',
    marginTop: 'auto',
    padding: '4rem 1rem 2rem',
    position: 'relative',
    overflow: 'hidden',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },
  topSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    marginBottom: '3rem',
  },
  brandColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logoIcon: {
    fontSize: '2.5rem',
  },
  logoText: {
    fontSize: '1.8rem',
    fontWeight: '800',
    margin: 0,
    background: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  brandDescription: {
    fontSize: '0.9rem',
    lineHeight: '1.7',
    color: '#b0b0b0',
    margin: 0,
  },
  socialLinks: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  socialIcon: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: 'rgba(102, 126, 234, 0.15)',
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(102, 126, 234, 0.3)',
  },
  linksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '2rem',
  },
  linkColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  columnTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#fff',
    margin: 0,
    marginBottom: '0.5rem',
    background: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  link: {
    color: '#b0b0b0',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    position: 'relative',
  },
  newsletterColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  newsletterText: {
    fontSize: '0.9rem',
    color: '#b0b0b0',
    margin: 0,
    lineHeight: '1.6',
  },
  newsletterForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  inputWrapper: {
    display: 'flex',
    gap: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '50px',
    padding: '0.5rem',
    border: '1px solid rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
  },
  emailInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '0.9rem',
    padding: '0.75rem 1rem',
    outline: 'none',
  },
  submitButton: {
    backgroundColor: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1.2rem',
    transition: 'all 0.3s ease',
  },
  successMessage: {
    color: '#27ae60',
    fontSize: '0.85rem',
    margin: 0,
    textAlign: 'center',
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    marginBottom: '3rem',
  },
  bottomSection: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    gap: '2rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  copyrightInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  copyright: {
    fontSize: '0.9rem',
    color: '#b0b0b0',
    margin: 0,
  },
  tagline: {
    fontSize: '0.85rem',
    color: '#888',
    margin: 0,
    fontStyle: 'italic',
  },
  statsFooter: {
    display: 'flex',
    gap: '2rem',
  },
  statFooter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
  },
  statValue: {
    fontSize: '1.3rem',
    fontWeight: '700',
    background: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  statName: {
    fontSize: '0.75rem',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  // Background Elements
  bgElement1: {
    position: 'absolute',
    top: '-100px',
    right: '-100px',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    zIndex: 0,
  },
  bgElement2: {
    position: 'absolute',
    bottom: '-150px',
    left: '-150px',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    zIndex: 0,
  },
};

export default Footer;