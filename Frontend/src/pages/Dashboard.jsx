import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { inscripcionesAPI, cursosAPI } from '../services/api';

function Dashboard({ user }) {
  const [inscripciones, setInscripciones] = useState([]);
  const [cursosInscritos, setCursosInscritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterTab, setFilterTab] = useState('todos');
  const [expandedCourse, setExpandedCourse] = useState(null);

  useEffect(() => {
    if (user) {
      cargarMisCursos();
    }
  }, [user]);

  const cargarMisCursos = async () => {
    try {
      setLoading(true);
      const response = await inscripcionesAPI.obtenerPorUsuario(user.idUsuario);
      setInscripciones(response.data);

      const cursosPromises = response.data.map(inscripcion =>
        cursosAPI.obtenerPorId(inscripcion.idCurso)
      );
      const cursosResponses = await Promise.all(cursosPromises);
      setCursosInscritos(cursosResponses.map(res => res.data));
    } catch (err) {
      setError('Error al cargar tus cursos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const actualizarProgreso = async (idInscripcion, nuevoProgreso) => {
    try {
      await inscripcionesAPI.actualizarProgreso(idInscripcion, nuevoProgreso);
      cargarMisCursos();
      alert('✅ Progreso actualizado exitosamente');
    } catch (err) {
      alert('❌ Error al actualizar el progreso');
      console.error(err);
    }
  };

  const cursosCompletados = inscripciones.filter(i => i.progreso === 100).length;
  const cursosEnProgreso = inscripciones.filter(i => i.progreso > 0 && i.progreso < 100).length;
  const cursosSinEmpezar = inscripciones.filter(i => i.progreso === 0).length;

  const getCursosFiltered = () => {
    switch (filterTab) {
      case 'completados':
        return cursosInscritos.filter((_, idx) => inscripciones[idx].progreso === 100);
      case 'enProgreso':
        return cursosInscritos.filter((_, idx) => inscripciones[idx].progreso > 0 && inscripciones[idx].progreso < 100);
      case 'sinEmpezar':
        return cursosInscritos.filter((_, idx) => inscripciones[idx].progreso === 0);
      default:
        return cursosInscritos;
    }
  };

  const progresoPromedio = inscripciones.length > 0
    ? Math.round(inscripciones.reduce((sum, i) => sum + i.progreso, 0) / inscripciones.length)
    : 0;

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Cargando tu dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div>
            <h1 style={styles.heroTitle}>
              ¡Bienvenido, <span style={styles.nameHighlight}>{user?.nombreCompleto?.split(' ')[0]}</span>! 👋
            </h1>
            <p style={styles.heroSubtitle}>
              Continúa tu viaje de aprendizaje y alcanza tus metas profesionales
            </p>
          </div>
          <div style={styles.heroIcon}>🎓</div>
        </div>
      </section>

      {/* Estadísticas Premium */}
      <section style={styles.statsSection}>
        <div style={styles.statsGrid}>
          {/* Card 1 */}
          <div style={styles.statCard}>
            <div style={styles.statCardTop}>
              <div style={styles.statIcon}>📚</div>
              <span style={styles.statBadge}>{cursosInscritos.length}</span>
            </div>
            <p style={styles.statLabel}>Cursos Inscritos</p>
            <p style={styles.statDescription}>Acceso de por vida</p>
            <div style={styles.statProgress}>
              <div style={{...styles.statProgressBar, backgroundColor: '#3498db'}}></div>
            </div>
          </div>

          {/* Card 2 */}
          <div style={styles.statCard}>
            <div style={styles.statCardTop}>
              <div style={styles.statIcon}>✅</div>
              <span style={styles.statBadge}>{cursosCompletados}</span>
            </div>
            <p style={styles.statLabel}>Completados</p>
            <p style={styles.statDescription}>Con certificado</p>
            <div style={styles.statProgress}>
              <div style={{...styles.statProgressBar, backgroundColor: '#27ae60'}}></div>
            </div>
          </div>

          {/* Card 3 */}
          <div style={styles.statCard}>
            <div style={styles.statCardTop}>
              <div style={styles.statIcon}>⏳</div>
              <span style={styles.statBadge}>{cursosEnProgreso}</span>
            </div>
            <p style={styles.statLabel}>En Progreso</p>
            <p style={styles.statDescription}>Mantén el ritmo</p>
            <div style={styles.statProgress}>
              <div style={{...styles.statProgressBar, backgroundColor: '#f39c12'}}></div>
            </div>
          </div>

          {/* Card 4 */}
          <div style={styles.statCard}>
            <div style={styles.statCardTop}>
              <div style={styles.statIcon}>🎯</div>
              <span style={styles.statBadge}>{progresoPromedio}%</span>
            </div>
            <p style={styles.statLabel}>Progreso Promedio</p>
            <p style={styles.statDescription}>De todos tus cursos</p>
            <div style={styles.statProgress}>
              <div style={{...styles.statProgressBar, width: `${progresoPromedio}%`, backgroundColor: '#667eea'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div style={styles.errorBanner}>
          <span style={styles.errorIcon}>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Mis Cursos Section */}
      <section style={styles.coursesSection}>
        {/* Header */}
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>📚 Mis Cursos</h2>
            <p style={styles.sectionSubtitle}>Gestiona tu aprendizaje</p>
          </div>
          <Link to="/cursos" style={styles.browseButton}>
            + Explorar Más
          </Link>
        </div>

        {/* Tabs de Filtro */}
        {cursosInscritos.length > 0 && (
          <div style={styles.filterTabs}>
            <button
              style={filterTab === 'todos' ? styles.tabActive : styles.tab}
              onClick={() => setFilterTab('todos')}
            >
              Todos ({cursosInscritos.length})
            </button>
            <button
              style={filterTab === 'enProgreso' ? styles.tabActive : styles.tab}
              onClick={() => setFilterTab('enProgreso')}
            >
              En Progreso ({cursosEnProgreso})
            </button>
            <button
              style={filterTab === 'completados' ? styles.tabActive : styles.tab}
              onClick={() => setFilterTab('completados')}
            >
              Completados ({cursosCompletados})
            </button>
            <button
              style={filterTab === 'sinEmpezar' ? styles.tabActive : styles.tab}
              onClick={() => setFilterTab('sinEmpezar')}
            >
              Sin Empezar ({cursosSinEmpezar})
            </button>
          </div>
        )}

        {/* Empty State */}
        {cursosInscritos.length === 0 ? (
          <div style={styles.emptyStateContainer}>
            <div style={styles.emptyStateIcon}>🎓</div>
            <h3 style={styles.emptyStateTitle}>Aún no tienes cursos</h3>
            <p style={styles.emptyStateText}>
              Comienza tu viaje de aprendizaje explorando nuestros cursos disponibles
            </p>
            <Link to="/cursos" style={styles.emptyStateButton}>
              🚀 Explorar Cursos Ahora
            </Link>
          </div>
        ) : getCursosFiltered().length === 0 ? (
          <div style={styles.emptyStateContainer}>
            <p style={styles.emptyStateText}>No hay cursos en esta categoría</p>
          </div>
        ) : (
          <div style={styles.coursesList}>
            {getCursosFiltered().map((curso, displayIndex) => {
              const actualIndex = cursosInscritos.indexOf(curso);
              const inscripcion = inscripciones[actualIndex];
              const statusColor = inscripcion.progreso === 100 ? '#27ae60' : inscripcion.progreso > 0 ? '#f39c12' : '#95a5a6';
              
              return (
                <div
                  key={curso.idCurso}
                  style={{
                    ...styles.courseCard,
                    borderLeftColor: statusColor,
                    animation: `slideIn 0.5s ease-out ${displayIndex * 0.1}s both`
                  }}
                >
                  {/* Imagen y Badge */}
                  <div style={styles.courseImageContainer}>
                    {curso.imagenPortada ? (
                      <img src={curso.imagenPortada} alt={curso.titulo} style={styles.courseImage} />
                    ) : (
                      <div style={styles.imagePlaceholder}>📚</div>
                    )}
                    <div style={{...styles.progressBadge, backgroundColor: statusColor}}>
                      {inscripcion.progreso}%
                    </div>
                  </div>

                  {/* Contenido */}
                  <div style={styles.courseContent}>
                    <div style={styles.courseHeader}>
                      <div>
                        <h3 style={styles.courseTitle}>{curso.titulo}</h3>
                        <p style={styles.courseCategory}>📂 {curso.categoria}</p>
                      </div>
                      <button
                        style={styles.expandButton}
                        onClick={() => setExpandedCourse(expandedCourse === curso.idCurso ? null : curso.idCurso)}
                      >
                        {expandedCourse === curso.idCurso ? '▲' : '▼'}
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div style={styles.progressContainer}>
                      <div style={styles.progressBarBg}>
                        <div
                          style={{
                            ...styles.progressBarFill,
                            width: `${inscripcion.progreso}%`,
                            backgroundColor: statusColor,
                          }}
                        />
                      </div>
                      <span style={styles.progressText}>
                        {inscripcion.progreso === 100 ? '✅ Completado' : `${inscripcion.progreso}% completado`}
                      </span>
                    </div>

                    {/* Detalles Expandibles */}
                    {expandedCourse === curso.idCurso && (
                      <div style={styles.expandedContent}>
                        <p style={styles.courseDescription}>
                          {curso.descripcion || 'Sin descripción disponible'}
                        </p>
                        
                        <div style={styles.courseMetadata}>
                          <div style={styles.metaItem}>
                            <span style={styles.metaLabel}>⏱️ Duración:</span>
                            <span>{curso.duracionHoras || 'N/A'} horas</span>
                          </div>
                          <div style={styles.metaItem}>
                            <span style={styles.metaLabel}>📊 Nivel:</span>
                            <span>{curso.nivel || 'General'}</span>
                          </div>
                          <div style={styles.metaItem}>
                            <span style={styles.metaLabel}>🎯 Modalidad:</span>
                            <span>{curso.modalidad || 'Online'}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Acciones */}
                    <div style={styles.courseActions}>
                      <Link
                        to={`/cursos/${curso.idCurso}`}
                        style={{
                          ...styles.actionButton,
                          backgroundColor: statusColor,
                        }}
                      >
                        {inscripcion.progreso === 100 ? '👁️ Ver Curso' : '▶️ Continuar'}
                      </Link>

                      {inscripcion.progreso < 100 && (
                        <button
                          style={styles.updateButton}
                          onClick={() => {
                            const nuevoProgreso = prompt(
                              'Actualiza tu progreso (0-100):',
                              inscripcion.progreso || 0
                            );
                            if (nuevoProgreso !== null) {
                              const progreso = parseInt(nuevoProgreso);
                              if (progreso >= 0 && progreso <= 100) {
                                actualizarProgreso(inscripcion.idInscripcion, progreso);
                              } else {
                                alert('El progreso debe estar entre 0 y 100');
                              }
                            }
                          }}
                        >
                          📈 Actualizar
                        </button>
                      )}

                      {inscripcion.progreso === 100 && (
                        <button style={styles.certificateButton}>
                          📜 Descargar Certificado
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 200px)',
    gap: '1rem',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(102, 126, 234, 0.2)',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: '1.1rem',
    color: '#7f8c8d',
    fontWeight: '500',
  },
  heroSection: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    padding: '3rem 1rem',
  },
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    margin: 0,
    marginBottom: '0.5rem',
  },
  nameHighlight: {
    background: 'linear-gradient(120deg, #ffd89b 0%, #19547b 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: '1.1rem',
    opacity: 0.95,
    margin: 0,
  },
  heroIcon: {
    fontSize: '3.5rem',
  },
  statsSection: {
    maxWidth: '1200px',
    margin: '-2rem auto 2rem',
    padding: '0 1rem',
    position: 'relative',
    zIndex: 10,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  statCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(102, 126, 234, 0.1)',
  },
  statCardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  statIcon: {
    fontSize: '2.5rem',
  },
  statBadge: {
    fontSize: '1.8rem',
    fontWeight: '700',
    background: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  statLabel: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#2c3e50',
    margin: 0,
  },
  statDescription: {
    fontSize: '0.85rem',
    color: '#7f8c8d',
    margin: '0.25rem 0 1rem 0',
  },
  statProgress: {
    height: '6px',
    backgroundColor: '#ecf0f1',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  statProgressBar: {
    height: '100%',
    width: '100%',
    borderRadius: '3px',
  },
  errorBanner: {
    maxWidth: '1200px',
    margin: '0 auto 2rem',
    padding: '1rem 1.5rem',
    backgroundColor: '#fee',
    border: '1px solid #fcc',
    borderRadius: '8px',
    color: '#c33',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  errorIcon: {
    fontSize: '1.5rem',
  },
  coursesSection: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem 3rem',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: '#2c3e50',
    margin: 0,
  },
  sectionSubtitle: {
    fontSize: '0.95rem',
    color: '#7f8c8d',
    margin: '0.25rem 0 0 0',
  },
  browseButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#003b72ff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '50px',
    fontSize: '0.95rem',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  },
  filterTabs: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  tab: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#fff',
    border: '2px solid #ecf0f1',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#555',
    transition: 'all 0.3s ease',
  },
  tabActive: {
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',
    border: '2px solid #667eea',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#fff',
  },
  coursesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    display: 'grid',
    gridTemplateColumns: '160px 1fr',
    gap: '1.5rem',
    padding: '1.5rem',
    borderLeft: '4px solid #667eea',
    transition: 'all 0.3s ease',
  },
  courseImageContainer: {
    position: 'relative',
    width: '160px',
    height: '140px',
  },
  courseImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    backgroundColor: '#e0e0e0',
    borderRadius: '8px',
  },
  progressBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  courseContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  courseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  courseTitle: {
    margin: 0,
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#2c3e50',
  },
  courseCategory: {
    margin: '0.25rem 0 0 0',
    fontSize: '0.9rem',
    color: '#7f8c8d',
  },
  expandButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: '#667eea',
    padding: 0,
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  progressBarBg: {
    flex: 1,
    height: '8px',
    backgroundColor: '#ecf0f1',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.5s ease',
  },
  progressText: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#555',
    minWidth: '120px',
    textAlign: 'right',
  },
  expandedContent: {
    paddingTop: '1rem',
    borderTop: '1px solid #ecf0f1',
  },
  courseDescription: {
    margin: 0,
    fontSize: '0.95rem',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  courseMetadata: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '1rem',
  },
  metaItem: {
    fontSize: '0.9rem',
    color: '#555',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  metaLabel: {
    fontWeight: '600',
    color: '#667eea',
  },
  courseActions: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  actionButton: {
    padding: '0.75rem 1.5rem',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  updateButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#f39c12',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  certificateButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  emptyStateContainer: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '4rem 2rem',
    textAlign: 'center',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
  },
  emptyStateIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  emptyStateTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2c3e50',
    margin: '0 0 0.5rem 0',
  },
  emptyStateText: {
    fontSize: '1rem',
    color: '#7f8c8d',
    margin: '0 0 2rem 0',
  },
  emptyStateButton: {
    display: 'inline-block',
    padding: '1rem 2rem',
    background: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '50px',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  },
};

export default Dashboard;