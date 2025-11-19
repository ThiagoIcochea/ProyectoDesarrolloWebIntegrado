import { useState, useEffect } from 'react';
import { cursosAPI } from '../services/api';
import CourseCard from '../components/CourseCard';

function Courses() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    cargarCursos();
  }, []);

  const cargarCursos = async () => {
    try {
      setLoading(true);
      const response = await cursosAPI.obtenerTodos();
      setCursos(response.data);
    } catch (err) {
      setError('Error al cargar los cursos. Intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltroCategoria = async (categoria) => {
    setFiltroCategoria(categoria);
    
    if (!categoria) {
      cargarCursos();
      return;
    }

    try {
      setLoading(true);
      const response = await cursosAPI.obtenerPorCategoria(categoria);
      setCursos(response.data);
    } catch (err) {
      setError('Error al filtrar cursos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar por búsqueda
  const cursosFiltrados = cursos.filter(curso =>
    curso.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    curso.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Obtener categorías únicas
  const categorias = [...new Set(cursos.map(c => c.categoria))].filter(Boolean);

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Explora Nuestros <span style={styles.highlight}>Cursos</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Elige entre {cursos.length} cursos de calidad dictados por expertos en diferentes áreas
          </p>
          
          {/* Search Bar */}
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="🔍 Busca un curso, tema o instructor..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>
        <div style={styles.heroBackground}></div>
      </section>

      <div style={styles.content}>
        {/* Error Message */}
        {error && (
          <div style={styles.error}>
            <span style={styles.errorIcon}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Filtros Section */}
        {categorias.length > 0 && !loading && (
          <section style={styles.filtersSection}>
            <div style={styles.filtersHeader}>
              <h3 style={styles.filtersTitle}>📂 Filtrar por Categoría</h3>
              {filtroCategoria && (
                <button
                  style={styles.clearFilter}
                  onClick={() => {
                    setFiltroCategoria('');
                    cargarCursos();
                  }}
                >
                  ✕ Limpiar filtro
                </button>
              )}
            </div>
            <div style={styles.filters}>
              <button
                style={!filtroCategoria ? styles.filterActive : styles.filter}
                onClick={() => handleFiltroCategoria('')}
              >
                🎯 Todos ({cursos.length})
              </button>
              {categorias.map((cat, index) => {
                const count = cursos.filter(c => c.categoria === cat).length;
                return (
                  <button
                    key={index}
                    style={filtroCategoria === cat ? styles.filterActive : styles.filter}
                    onClick={() => handleFiltroCategoria(cat)}
                  >
                    📌 {cat} ({count})
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Loading State */}
        {loading && (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Cargando cursos increíbles...</p>
          </div>
        )}

        {/* Cursos Grid */}
        {!loading && (
          <>
            {/* Results Info */}
            {cursosFiltrados.length > 0 && (
              <div style={styles.resultsInfo}>
                <p style={styles.resultsText}>
                  📊 Se encontraron <strong>{cursosFiltrados.length}</strong> curso(s)
                  {busqueda && ` que coinciden con "${busqueda}"`}
                </p>
              </div>
            )}

            {/* Grid */}
            {cursosFiltrados.length === 0 ? (
              <div style={styles.empty}>
                <div style={styles.emptyIcon}>🔍</div>
                <h3 style={styles.emptyTitle}>No hay cursos disponibles</h3>
                <p style={styles.emptyText}>
                  {busqueda
                    ? `No encontramos cursos que contengan "${busqueda}"`
                    : 'No hay cursos en esta categoría'}
                </p>
                {(busqueda || filtroCategoria) && (
                  <button
                    style={styles.emptyButton}
                    onClick={() => {
                      setBusqueda('');
                      setFiltroCategoria('');
                      cargarCursos();
                    }}
                  >
                    🔄 Limpiar filtros
                  </button>
                )}
              </div>
            ) : (
              <div style={styles.grid}>
                {cursosFiltrados.map((curso) => (
                  <CourseCard key={curso.idCurso} curso={curso} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: 'calc(100vh - 200px)',
    backgroundColor: '#f8f9fa',
  },
  // Hero Section
  heroSection: {
    backgroundImage: 'url("/fondo2.jpg")', // ← AQUÍ PONES TU IMAGEN
    backgroundSize: 'cover',       // Para que cubra todo el espacio
    ackgroundPosition: 'center',  // Centrada
    backgroundRepeat: 'no-repeat', // Evita que se repita
    color: '#fff',
    minHeight: '330px',
    padding: '4rem 1rem',
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '1rem',
    lineHeight: '1.2',
  },
  highlight: {
    background: 'linear-gradient(120deg, #fcfcfcff 0%, #e7e97cff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    opacity: 0.95,
    lineHeight: '1.6',
    fontWeight: '300',
    fontSize: '2rem',
  },
  searchContainer: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  searchInput: {
    width: '100%',
    padding: '1rem 1.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '50px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: '#333',
    outline: 'none',
    transition: 'all 0.3s ease',
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
  // Content Area
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  // Filters Section
  filtersSection: {
    marginBottom: '3rem',
  },
  filtersHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  filtersTitle: {
    fontSize: '1.3rem',
    color: '#2c3e50',
    fontWeight: '700',
    margin: 0,
  },
  clearFilter: {
    padding: '0.5rem 1.5rem',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  filters: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  filter: {
    padding: '0.75rem 1.5rem',
    border: '2px solid #ecf0f1',
    borderRadius: '50px',
    backgroundColor: '#fff',
    color: '#555',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  },
  filterActive: {
    padding: '0.75rem 1.5rem',
    border: '2px solid #667eea',
    borderRadius: '50px',
    backgroundColor: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  },
  // Results Info
  resultsInfo: {
    padding: '1rem 1.5rem',
    backgroundColor: '#fff',
    borderLeft: '4px solid #667eea',
    borderRadius: '8px',
    marginBottom: '2rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  },
  resultsText: {
    margin: 0,
    color: '#555',
    fontSize: '1rem',
  },
  // Grid
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  // Loading State
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 1rem',
    minHeight: '400px',
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
    marginTop: '1.5rem',
    fontSize: '1.1rem',
    color: '#7f8c8d',
    fontWeight: '500',
  },
  // Empty State
  empty: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  emptyTitle: {
    fontSize: '1.8rem',
    color: '#2c3e50',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
  },
  emptyText: {
    fontSize: '1rem',
    color: '#7f8c8d',
    margin: '0 0 1.5rem 0',
    lineHeight: '1.6',
  },
  emptyButton: {
    padding: '0.75rem 2rem',
    backgroundColor: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  },
  // Error
  error: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    backgroundColor: '#fee',
    color: '#c33',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    fontSize: '1rem',
    border: '1px solid #fcc',
  },
  errorIcon: {
    fontSize: '1.5rem',
  },
};

// Add animation keyframes
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
document.head.appendChild(styleSheet);

export default Courses;