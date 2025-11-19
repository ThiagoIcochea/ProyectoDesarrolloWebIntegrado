import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useWindowWidth from '../components/useWindowWidth.js'; // Asegúrate de que esta ruta sea correcta

const BREAKPOINT = 768; // Punto de quiebre para mobile/desktop

function Support({ user }) {
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < BREAKPOINT;

  const [activeTab, setActiveTab] = useState('faq');
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    asunto: '',
    descripcion: '',
    prioridad: 'MEDIA',
    categoria: 'GENERAL',
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busquedaFAQ, setBusquedaFAQ] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // Cargar tickets del localStorage
  useEffect(() => {
    const ticketsGuardados = localStorage.getItem('tickets');
    if (ticketsGuardados) {
      try {
        setTickets(JSON.parse(ticketsGuardados));
      } catch (err) {
        console.error('Error cargando tickets:', err);
      }
    }
  }, []);

  // Guardar tickets en localStorage
  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const FAQs = [
    {
      id: 1,
      pregunta: '¿Cómo puedo comprar un curso?',
      respuesta: 'Dirígete a nuestra sección de Cursos, elige el que te interese, haz clic en "Agregar al Carrito" y procede al pago. Una vez completado, tendrás acceso inmediato al curso.'
    },
    {
      id: 2,
      pregunta: '¿Cuánto tiempo tengo acceso a los cursos?',
      respuesta: 'Tendrás acceso de por vida a todos los cursos que compres. Puedes volver a ver el contenido en cualquier momento sin límite de tiempo.'
    },
    {
      id: 3,
      pregunta: '¿Es posible obtener un reembolso?',
      respuesta: 'Sí, ofrecemos una garantía de reembolso de 30 días si no estás satisfecho con el curso. Simplemente contacta a nuestro equipo de soporte.'
    },
    {
      id: 4,
      pregunta: '¿Cómo puedo descargar mi certificado?',
      respuesta: 'Una vez completes un curso con el 100% de progreso, podrás descargar tu certificado desde tu dashboard. Haz clic en el curso y busca el botón "Descargar Certificado".'
    },
    {
      id: 5,
      pregunta: '¿Puedo transferir mi curso a otro usuario?',
      respuesta: 'No, los cursos son personales y están ligados a tu cuenta. No pueden ser transferidos a otros usuarios, pero puedes compartir tu contenido dentro de tu familia.'
    },
    {
      id: 6,
      pregunta: '¿Qué métodos de pago aceptan?',
      respuesta: 'Aceptamos todas las tarjetas de crédito (Visa, Mastercard, Amex), transferencias bancarias y billeteras digitales (PayPal, Apple Pay, Google Pay).'
    },
    {
      id: 7,
      pregunta: '¿Cómo contacto con soporte técnico?',
      respuesta: 'Puedes contactarnos mediante soporte@recordsbook.com, crear un ticket en esta página, o llamarnos al +51 (1) 2345-6789. Nuestro equipo responde en menos de 24 horas.'
    },
    {
      id: 8,
      pregunta: '¿Hay cursos gratuitos disponibles?',
      respuesta: 'Sí, tenemos una sección de cursos gratuitos introductorios. Regístrate gratis y accede a cursos de prueba para familiarizarte con la plataforma.'
    },
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCrearTicket = (e) => {
    e.preventDefault();

    if (!user) {
      alert('Debes iniciar sesión para crear un ticket');
      navigate('/login');
      return;
    }

    if (!formData.asunto || !formData.descripcion) {
      alert('Por favor completa todos los campos');
      return;
    }

    const nuevoTicket = {
      idTicket: Math.floor(Math.random() * 100000) + 1000,
      asunto: formData.asunto,
      descripcion: formData.descripcion,
      prioridad: formData.prioridad,
      categoria: formData.categoria,
      estado: 'ABIERTO',
      nombreUsuario: user.nombreCompleto,
      email: user.email,
      fechaCreacion: new Date().toISOString(),
      respuestas: [],
    };

    setTickets([...tickets, nuevoTicket]);
    setFormData({
      asunto: '',
      descripcion: '',
      prioridad: 'MEDIA',
      categoria: 'GENERAL',
    });
    setMostrarFormulario(false);
    alert('✅ Ticket creado exitosamente. Número de referencia: #' + nuevoTicket.idTicket);
  };

  const handleRespuesta = (ticketId, respuesta) => {
    setTickets(tickets.map(ticket => {
      if (ticket.idTicket === ticketId) {
        return {
          ...ticket,
          respuestas: [
            ...ticket.respuestas,
            {
              id: Math.random(),
              autor: 'Soporte RecordsBook',
              contenido: respuesta,
              fecha: new Date().toISOString(),
            }
          ]
        };
      }
      return ticket;
    }));
  };

  const handleCerrarTicket = (ticketId) => {
    setTickets(tickets.map(ticket => {
      if (ticket.idTicket === ticketId) {
        return { ...ticket, estado: 'CERRADO' };
      }
      return ticket;
    }));
  };

  const faqsFiltrados = FAQs.filter(faq =>
    faq.pregunta.toLowerCase().includes(busquedaFAQ.toLowerCase()) ||
    faq.respuesta.toLowerCase().includes(busquedaFAQ.toLowerCase())
  );

  const ticketsUsuario = user ? tickets.filter(t => t.email === user.email).sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)) : [];

  // --- Estilos Condicionales ---
  const heroTitleStyle = isMobile ? styles.heroTitleMobile : styles.heroTitle;
  const ticketsHeaderStyle = isMobile ? styles.ticketsHeaderMobile : styles.ticketsHeader;
  const ticketAccionesStyle = isMobile ? styles.ticketAccionesMobile : styles.ticketAcciones;
  const contactoGridStyle = isMobile ? styles.contactoGridMobile : styles.contactoGrid;
  const horariosGridStyle = isMobile ? styles.horariosGridMobile : styles.horariosGrid;
  const formRowStyle = isMobile ? styles.formRowMobile : styles.formRow;
  const faqQuestionStyle = isMobile ? styles.faqQuestionMobile : styles.faqQuestion;

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={heroTitleStyle}>
            Centro de <span style={styles.highlight}>Soporte</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Estamos aquí para ayudarte. Encuentra respuestas o crea un ticket de soporte
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section style={styles.tabsSection}>
        <div style={styles.tabsContainer}>
          <button
            style={activeTab === 'faq' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('faq')}
          >
            ❓ Preguntas Frecuentes
          </button>
          <button
            style={activeTab === 'tickets' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('tickets')}
          >
            🎫 Mis Tickets ({ticketsUsuario.length})
          </button>
          <button
            style={activeTab === 'contacto' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('contacto')}
          >
            📞 Contacto Directo
          </button>
        </div>
      </section>

      {/* Contenido */}
      <div style={styles.content}>
        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Preguntas Frecuentes</h2>
            
            <div style={styles.searchContainer}>
              <input
                type="text"
                placeholder="🔍 Busca una pregunta..."
                value={busquedaFAQ}
                onChange={(e) => setBusquedaFAQ(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            {faqsFiltrados.length === 0 ? (
              <div style={styles.empty}>
                <p>No encontramos respuestas para tu búsqueda</p>
              </div>
            ) : (
              <div style={styles.faqContainer}>
                {faqsFiltrados.map((faq) => (
                  <div key={faq.id} style={styles.faqItem}>
                    <button
                      style={faqQuestionStyle}
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    >
                      <span style={styles.faqIcon}>
                        {expandedFAQ === faq.id ? '▼' : '▶'}
                      </span>
                      <span style={styles.faqQuestionText}>{faq.pregunta}</span>
                    </button>
                    {expandedFAQ === faq.id && (
                      <div style={styles.faqAnswer}>
                        {faq.respuesta}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <section style={styles.section}>
            <div style={ticketsHeaderStyle}>
              <h2 style={styles.sectionTitle}>Mis Tickets de Soporte</h2>
              {user && (
                <button
                  style={styles.crearTicketButton}
                  onClick={() => setMostrarFormulario(!mostrarFormulario)}
                >
                  {mostrarFormulario ? '✕ Cancelar' : '+ Crear Nuevo Ticket'}
                </button>
              )}
            </div>

            {!user && (
              <div style={styles.loginPrompt}>
                <p>Por favor <button style={styles.loginLink} onClick={() => navigate('/login')}>inicia sesión</button> para crear tickets</p>
              </div>
            )}

            {/* Formulario */}
            {mostrarFormulario && user && (
              <form onSubmit={handleCrearTicket} style={styles.formulario}>
                <div style={formRowStyle}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Categoría</label>
                    <select
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleFormChange}
                      style={styles.input}
                    >
                      <option value="GENERAL">General</option>
                      <option value="TECNICO">Técnico</option>
                      <option value="PAGO">Pago/Facturación</option>
                      <option value="CONTENIDO">Contenido del Curso</option>
                      <option value="CERTIFICADO">Certificado</option>
                      <option value="OTRO">Otro</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Prioridad</label>
                    <select
                      name="prioridad"
                      value={formData.prioridad}
                      onChange={handleFormChange}
                      style={styles.input}
                    >
                      <option value="BAJA">Baja</option>
                      <option value="MEDIA">Media</option>
                      <option value="ALTA">Alta</option>
                      <option value="URGENTE">Urgente</option>
                    </select>
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Asunto *</label>
                  <input
                    type="text"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleFormChange}
                    placeholder="Describe brevemente tu problema"
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Descripción *</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleFormChange}
                    placeholder="Proporciona detalles sobre tu problema..."
                    rows="5"
                    style={styles.textarea}
                    required
                  />
                </div>

                <button type="submit" style={styles.enviarButton}>
                  📤 Enviar Ticket
                </button>
              </form>
            )}

            {/* Lista de Tickets */}
            {ticketsUsuario.length === 0 ? (
              <div style={styles.empty}>
                <p>No tienes tickets creados aún</p>
              </div>
            ) : (
              <div style={styles.ticketsContainer}>
                {ticketsUsuario.map((ticket) => (
                  <div key={ticket.idTicket} style={styles.ticketCard}>
                    <div style={styles.ticketHeader}>
                      <div>
                        <h4 style={styles.ticketAsunto}>#{ticket.idTicket} - {ticket.asunto}</h4>
                        <p style={styles.ticketMeta}>
                          {ticket.categoria} • {new Date(ticket.fechaCreacion).toLocaleDateString()}
                        </p>
                      </div>
                      <div style={{
                        ...styles.ticketBadge,
                        backgroundColor: ticket.estado === 'ABIERTO' ? '#3498db' : '#27ae60'
                      }}>
                        {ticket.estado}
                      </div>
                    </div>

                    <p style={styles.ticketDescripcion}>{ticket.descripcion}</p>

                    {/* Respuestas */}
                    {ticket.respuestas.length > 0 && (
                      <div style={styles.respuestasContainer}>
                        <h5 style={styles.respuestasTitle}>Respuestas ({ticket.respuestas.length})</h5>
                        {ticket.respuestas.map((respuesta) => (
                          <div key={respuesta.id} style={styles.respuestaItem}>
                            <p style={styles.respuestaAutor}>
                              <strong>{respuesta.autor}</strong> • {new Date(respuesta.fecha).toLocaleDateString()}
                            </p>
                            <p style={styles.respuestaContenido}>{respuesta.contenido}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {ticket.estado === 'ABIERTO' && (
                      <div style={ticketAccionesStyle}>
                        <button
                          style={styles.responderButton}
                          onClick={() => {
                            const respuesta = prompt('Escribe tu respuesta (simulación):');
                            if (respuesta) handleRespuesta(ticket.idTicket, respuesta);
                          }}
                        >
                          💬 Responder
                        </button>
                        <button
                          style={styles.cerrarButton}
                          onClick={() => {
                            if (window.confirm('¿Cerrar este ticket?')) {
                              handleCerrarTicket(ticket.idTicket);
                            }
                          }}
                        >
                          ✓ Cerrar Ticket
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Contacto Tab */}
        {activeTab === 'contacto' && (
          <section style={styles.section}>
            
            <div style={contactoGridStyle}>
              <div style={styles.contactoCard}>
                <div style={styles.contactoIcon}>📧</div>
                <h4 style={styles.contactoTitle}>Correo Electrónico</h4>
                <p style={styles.contactoTexto}>soporte@recordsbook.com</p>
                <p style={styles.contactoTexto}>Respuesta en menos de 24 horas</p>
                <button style={styles.contactoButton}>Enviar Email</button>
              </div>

              <div style={styles.contactoCard}>
                <div style={styles.contactoIcon}>📞</div>
                <h4 style={styles.contactoTitle}>Teléfono</h4>
                <p style={styles.contactoTexto}>+51 995766986</p>
                <p style={styles.contactoTexto}>Lunes a Viernes</p>
                <button style={styles.contactoButton}>Llamar Ahora</button>
              </div>

              <div style={styles.contactoCard}>
                <div style={styles.contactoIcon}>📍</div>
                <h4 style={styles.contactoTitle}>Ubicación</h4>
                <p style={styles.contactoTexto}>UTP - LIMA CENTRO</p>
                <p style={styles.contactoTexto}>Lima, Perú</p>
                <button style={styles.contactoButton}>Ver en Mapa</button>
              </div>
            </div>

            {/* Horarios de Atención */}
            <div style={styles.horariosSection}>
              <h3 style={styles.horariosTitle}>Horarios de Atención</h3>
              <div style={horariosGridStyle}>
                <div style={styles.horarioItem}>
                  <p style={styles.horarioDia}>Lunes - Viernes</p>
                  <p style={styles.horarioHora}>09:00 - 18:00 (Hora Perú)</p>
                </div>
                <div style={styles.horarioItem}>
                  <p style={styles.horarioDia}>Sábado - Domingo</p>
                  <p style={styles.horarioHora}>10:00 - 16:00 (Emergencias)</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

const styles = {
  // --- GENERAL ---
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  section: {
    backgroundColor: '#fff', // Cambiado a blanco para mejor contraste
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  sectionTitle: {
    fontSize: '2rem',
    color: '#2c3e50',
    fontWeight: '800',
    marginBottom: '2rem',
  },
  empty: {
    textAlign: 'center',
    padding: '3rem',
    color: '#7f8c8d',
  },

  // --- HERO SECTION (Responsivo) ---
  heroSection: {
    backgroundImage: 'url("/fondo4.jpg")', // Ajusta la ruta a tu imagen
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: '#000000ff',
    minHeight: '330px',
    padding: '4rem 1rem',
    textAlign: 'left',
  },
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heroTitle: { // Desktop
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '1rem',
  },
  heroTitleMobile: { // Mobile
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '1rem',
  },
  highlight: {
    background: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)', // Gradiente consistente
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    opacity: 0.95,
  },

  // --- TABS ---
  tabsSection: {
    backgroundColor: '#fff',
    borderBottom: '2px solid #ecf0f1',
    position: 'sticky',
    top: 0, // Cambiado de 70 a 0 para mejor experiencia en mobile
    zIndex: 100,
  },
  tabsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  tab: {
    padding: '1rem 1.5rem',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    color: '#7f8c8d',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    borderBottom: '3px solid transparent',
  },
  tabActive: {
    padding: '1rem 1.5rem',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    color: '#667eea',
    fontWeight: '600',
    borderBottom: '3px solid #667eea',
  },

  // --- FAQ ---
  searchContainer: {
    marginBottom: '2rem',
  },
  searchInput: {
    width: '100%',
    maxWidth: '500px',
    padding: '1rem',
    fontSize: '1rem',
    border: '2px solid #ecf0f1',
    borderRadius: '8px',
    outline: 'none',
  },
  faqContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  faqItem: {
    borderRadius: '8px',
    overflow: 'hidden',
  },
  faqQuestion: { // Desktop
    width: '100%',
    padding: '1.5rem',
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    textAlign: 'left',
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    transition: 'all 0.3s ease',
  },
  faqQuestionMobile: { // Mobile: menos padding y fuente
    width: '100%',
    padding: '1rem',
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    textAlign: 'left',
    display: 'flex',
    gap: '0.8rem',
    alignItems: 'center',
    transition: 'all 0.3s ease',
  },
  faqQuestionText: {
    flex: 1, // Permite que el texto se ajuste
  },
  faqIcon: {
    fontSize: '0.8rem',
  },
  faqAnswer: {
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    color: '#555',
    lineHeight: '1.8',
    borderRadius: '0 0 8px 8px',
  },

  // --- TICKETS (Responsivo) ---
  ticketsHeader: { // Desktop
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'nowrap',
    gap: '1rem',
  },
  ticketsHeaderMobile: { // Mobile
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '1.5rem',
    gap: '1rem',
  },
  crearTicketButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },
  loginPrompt: {
    padding: '2rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  loginLink: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#667eea',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '1rem',
  },
  formulario: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '8px',
    marginBottom: '2rem',
  },
  formRow: { // Desktop
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  formRowMobile: { // Mobile: Pila los campos
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontWeight: '600',
    color: '#34495e',
    fontSize: '0.95rem',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
    outline: 'none',
  },
  textarea: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    outline: 'none',
    resize: 'vertical',
  },
  enviarButton: {
    padding: '1rem 2rem',
    // Arreglo el gradiente para Inline Styles
    backgroundColor: '#667eea',
    backgroundImage: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  ticketsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  ticketCard: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '8px',
    borderLeft: '4px solid #667eea',
  },
  ticketHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  },
  ticketAsunto: {
    margin: 0,
    fontSize: '1.2rem',
    color: '#2c3e50',
    fontWeight: '700',
  },
  ticketMeta: {
    margin: '0.5rem 0 0 0',
    fontSize: '0.9rem',
    color: '#7f8c8d',
  },
  ticketBadge: {
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    color: '#fff',
    fontSize: '0.85rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  ticketDescripcion: {
    margin: '0 0 1rem 0',
    color: '#555',
    lineHeight: '1.6',
  },
  respuestasContainer: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '6px',
    marginBottom: '1rem',
    border: '1px solid #eee',
  },
  respuestasTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1rem',
    color: '#2c3e50',
    fontWeight: '700',
  },
  respuestaItem: {
    paddingBottom: '1rem',
    borderBottom: '1px solid #ecf0f1',
    marginBottom: '1rem',
  },
  respuestaAutor: {
    margin: 0,
    fontSize: '0.9rem',
    color: '#667eea',
    fontWeight: '600',
  },
  respuestaContenido: {
    margin: '0.5rem 0 0 0',
    color: '#555',
    lineHeight: '1.6',
  },
  ticketAcciones: { // Desktop
    display: 'flex',
    gap: '1rem',
  },
  ticketAccionesMobile: { // Mobile: Pila los botones
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  responderButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
  cerrarButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#95a5a6',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },

  // --- CONTACTO (Responsivo) ---
  contactoGrid: { // Desktop
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3 columnas fijas
    gap: '2rem',
    marginBottom: '3rem',
  },
  contactoGridMobile: { // Mobile: 1 columna
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  contactoCard: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '12px',
    textAlign: 'center',
  },
  contactoIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  contactoTitle: {
    fontSize: '1.3rem',
    color: '#2c3e50',
    fontWeight: '700',
    marginBottom: '1rem',
  },
  contactoTexto: {
    color: '#7f8c8d',
    marginBottom: '0.5rem',
    lineHeight: '1.6',
  },
  contactoButton: {
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
  },
  horariosSection: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '12px',
  },
  horariosTitle: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    fontWeight: '700',
    marginBottom: '1.5rem',
  },
  horariosGrid: { // Desktop
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
  },
  horariosGridMobile: { // Mobile: 1 columna
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  horarioItem: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    textAlign: 'center',
  },
  horarioDia: {
    margin: 0,
    fontSize: '1.1rem',
    color: '#2c3e50',
    fontWeight: '700',
  },
  horarioHora: {
    margin: '0.5rem 0 0 0',
    fontSize: '0.95rem',
    color: '#667eea',
    fontWeight: '600',
  },
};

export default Support;