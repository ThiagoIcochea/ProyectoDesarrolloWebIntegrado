import { useState, useEffect } from 'react';
import { cursosAPI } from '../services/api';

// Iconos SVG para no depender de librerías
const Icons = {
  Plus: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Edit: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
  Close: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Course: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
  Check: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  Clock: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
};

const CATEGORIAS_OPTIONS = [
  "Programación",
  "Negocios",
  "Diseño",
  "Marketing",
  "Finanzas",
  "Desarrollo personal"
];

function InstructorPanel({ user }) {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Cambiado a Modal
  const [editingCurso, setEditingCurso] = useState(null);
  
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: CATEGORIAS_OPTIONS[0], // Valor por defecto
    precio: '',
    duracionHoras: '',
    nivel: 'BASICO',
    modalidad: 'ONLINE',
    estado: 'BORRADOR',
    imagenPortada: '',
    requisitosPrevios: ''
  });

  useEffect(() => {
    cargarCursos();
  }, []);

  const cargarCursos = async () => {
    try {
      setLoading(true);
      const response = await cursosAPI.obtenerTodos();
      // Opcional: Filtrar aquí si la API devuelve todos los cursos de la plataforma
      // const misCursos = response.data.filter(c => c.idInstructor === user.id);
      setCursos(response.data);
    } catch (err) {
      console.error('Error al cargar cursos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCurso) {
        await cursosAPI.actualizar(editingCurso.idCurso, formData);
        alert('Curso actualizado correctamente');
      } else {
        // Asegurarse de enviar el ID del instructor si el backend lo requiere en el body
        const dataToSend = { ...formData, idInstructor: user?.idUsuario };
        await cursosAPI.crear(dataToSend);
        alert('Curso creado correctamente');
      }
      closeModal();
      cargarCursos();
    } catch (err) {
      alert('Error al guardar el curso. Verifique los datos.');
      console.error(err);
    }
  };

  const handleEdit = (curso) => {
    setEditingCurso(curso);
    setFormData({
      titulo: curso.titulo,
      descripcion: curso.descripcion || '',
      categoria: curso.categoria || CATEGORIAS_OPTIONS[0],
      precio: curso.precio || '',
      duracionHoras: curso.duracionHoras || '',
      nivel: curso.nivel || 'BASICO',
      modalidad: curso.modalidad || 'ONLINE',
      estado: curso.estado || 'BORRADOR',
      imagenPortada: curso.imagenPortada || '',
      requisitosPrevios: curso.requisitosPrevios || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCurso(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      categoria: CATEGORIAS_OPTIONS[0],
      precio: '',
      duracionHoras: '',
      nivel: 'BASICO',
      modalidad: 'ONLINE',
      estado: 'BORRADOR',
      imagenPortada: '',
      requisitosPrevios: ''
    });
  };

  // Cálculos de estadísticas
  const stats = {
    total: cursos.length,
    activos: cursos.filter(c => c.estado === 'ACTIVO').length,
    borradores: cursos.filter(c => c.estado === 'BORRADOR').length
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
        
          <p style={styles.title}>Gestiona y crea contenido increíble, {user?.nombreCompleto || 'Instructor'}.</p>
        </div>
        <button style={styles.createButton} onClick={() => setShowModal(true)}>
          <Icons.Plus /> Crear Nuevo Curso
        </button>
      </div>

      {/* ESTADÍSTICAS */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, background: '#e0e7ff', color: '#4338ca'}}><Icons.Course /></div>
          <div>
            <div style={styles.statValue}>{stats.total}</div>
            <div style={styles.statLabel}>Total Cursos</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, background: '#dcfce7', color: '#15803d'}}><Icons.Check /></div>
          <div>
            <div style={styles.statValue}>{stats.activos}</div>
            <div style={styles.statLabel}>Cursos Activos</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, background: '#fef3c7', color: '#b45309'}}><Icons.Edit /></div>
          <div>
            <div style={styles.statValue}>{stats.borradores}</div>
            <div style={styles.statLabel}>Borradores</div>
          </div>
        </div>
      </div>

      {/* LISTA DE CURSOS */}
      <h2 style={styles.sectionTitle}>Mis Cursos</h2>
      
      {loading ? (
        <div style={styles.loadingState}>Cargando tus cursos...</div>
      ) : cursos.length === 0 ? (
        <div style={styles.emptyState}>
          <p>Aún no tienes cursos creados.</p>
          <button style={styles.btnSecondary} onClick={() => setShowModal(true)}>Crear el primero</button>
        </div>
      ) : (
        <div style={styles.grid}>
          {cursos.map((curso) => (
            <div key={curso.idCurso} style={styles.card}>
              <div style={styles.cardImageContainer}>
                {curso.imagenPortada ? (
                  <img src={curso.imagenPortada} alt={curso.titulo} style={styles.cardImage} />
                ) : (
                  <div style={styles.imagePlaceholder}>📚</div>
                )}
                <span style={curso.estado === 'ACTIVO' ? styles.badgeActive : styles.badgeDraft}>
                  {curso.estado}
                </span>
              </div>
              
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle} title={curso.titulo}>{curso.titulo}</h3>
                <span style={styles.metaItem}>{curso.nivel }</span>
                <p style={styles.cardCategory}>{curso.categoria}</p>
                
                <div style={styles.cardMeta}>
                  <span>S/ {Number(curso.precio).toFixed(2)}</span>
                  <span>•</span>
                  <span>⏱️{curso.duracionHoras}h</span>
                </div>

                <button style={styles.btnEdit} onClick={() => handleEdit(curso)}>
                  <Icons.Edit /> Editar Contenido
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL (POPUP) */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{editingCurso ? 'Editar Curso' : 'Crear Nuevo Curso'}</h2>
              <button style={styles.closeBtn} onClick={closeModal}><Icons.Close /></button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGrid}>
                {/* Título */}
                <div style={styles.fullWidth}>
                  <label style={styles.label}>Título del Curso</label>
                  <input
                    type="text"
                    name="titulo"
                    style={styles.input}
                    value={formData.titulo}
                    onChange={handleChange}
                    placeholder="Ej. Desarrollo Web Completo 2024"
                    required
                  />
                </div>

                {/* Categoría (ComboBox solicitado) */}
                <div>
                  <label style={styles.label}>Categoría</label>
                  <select
                    name="categoria"
                    style={styles.select}
                    value={formData.categoria}
                    onChange={handleChange}
                  >
                    {CATEGORIAS_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Precio */}
                <div>
                  <label style={styles.label}>Precio (S/)</label>
                  <input
                    type="number"
                    name="precio"
                    style={styles.input}
                    value={formData.precio}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>

                {/* Duración */}
                <div>
                  <label style={styles.label}>Duración (Horas)</label>
                  <input
                    type="number"
                    name="duracionHoras"
                    style={styles.input}
                    value={formData.duracionHoras}
                    onChange={handleChange}
                    placeholder="Ej. 10"
                  />
                </div>

                {/* Nivel */}
                <div>
                  <label style={styles.label}>Nivel</label>
                  <select name="nivel" style={styles.select} value={formData.nivel} onChange={handleChange}>
                    <option value="BASICO">Básico</option>
                    <option value="INTERMEDIO">Intermedio</option>
                    <option value="AVANZADO">Avanzado</option>
                  </select>
                </div>

                {/* Estado */}
                <div>
                  <label style={styles.label}>Estado</label>
                  <select name="estado" style={styles.select} value={formData.estado} onChange={handleChange}>
                    <option value="BORRADOR">Borrador</option>
                    <option value="ACTIVO">Publicado (Activo)</option>
                    <option value="INACTIVO">Inactivo</option>
                  </select>
                </div>

                 {/* Modalidad */}
                 <div>
                  <label style={styles.label}>Modalidad</label>
                  <select name="modalidad" style={styles.select} value={formData.modalidad} onChange={handleChange}>
                    <option value="ONLINE">Online</option>
                    <option value="PRESENCIAL">Presencial</option>
                    <option value="HIBRIDO">Híbrido</option>
                  </select>
                </div>

                {/* URL Imagen */}
                <div style={styles.fullWidth}>
                  <label style={styles.label}>URL Imagen de Portada</label>
                  <input
                    type="text"
                    name="imagenPortada"
                    style={styles.input}
                    value={formData.imagenPortada}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>

                {/* Descripción */}
                <div style={styles.fullWidth}>
                  <label style={styles.label}>Descripción</label>
                  <textarea
                    name="descripcion"
                    style={styles.textarea}
                    rows="3"
                    value={formData.descripcion}
                    onChange={handleChange}
                  />
                </div>

                 {/* Requisitos */}
                 <div style={styles.fullWidth}>
                  <label style={styles.label}>Requisitos Previos</label>
                  <textarea
                    name="requisitosPrevios"
                    style={styles.textarea}
                    rows="2"
                    value={formData.requisitosPrevios}
                    onChange={handleChange}
                    placeholder="Ej. PC con acceso a internet"
                  />
                </div>
              </div>

              <div style={styles.modalFooter}>
                <button type="button" style={styles.btnCancel} onClick={closeModal}>Cancelar</button>
                <button type="submit" style={styles.btnSave}>
                  {editingCurso ? 'Guardar Cambios' : 'Crear Curso'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1c1d1f',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    borderBottom: '1px solid #d1d7dc',
    paddingBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    margin: 0,
    color: '#1c1d1f',
  },
  subtitle: {
    color: '#6a6f73',
    margin: '0.5rem 0 0 0',
  },
  createButton: {
    backgroundColor: '#5022c3', // Purple Udemy
    color: '#fff',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'background 0.2s',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  statCard: {
    backgroundColor: '#fff',
    border: '1px solid #d1d7dc',
    borderRadius: '8px',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: '800',
  },
  statLabel: {
    color: '#6a6f73',
    fontSize: '0.9rem',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #d1d7dc',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column',
  },
  cardImageContainer: {
    height: '160px',
    backgroundColor: '#f7f9fa',
    position: 'relative',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    color: '#d1d7dc',
    background: '#f7f9fa',
  },
  badgeActive: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#d1fae5',
    color: '#065f46',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  },
  badgeDraft: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  },
  cardContent: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  cardTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.1rem',
    fontWeight: '700',
    lineHeight: 1.3,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardCategory: {
    fontSize: '0.85rem',
    color: '#6a6f73',
    marginBottom: '1rem',
  },
  cardMeta: {
    display: 'flex',
    gap: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#1c1d1f',
  },
  btnEdit: {
    marginTop: 'auto',
    width: '100%',
    padding: '0.6rem',
    backgroundColor: '#fff',
    border: '1px solid #1c1d1f',
    color: '#1c1d1f',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(2px)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '90%',
    maxWidth: '700px',
    borderRadius: '8px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
  },
  modalHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #d1d7dc',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: '700',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  form: {
    padding: '2rem',
    overflowY: 'auto',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
  },
  fullWidth: {
    gridColumn: '1 / -1',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '700',
    fontSize: '0.9rem',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid #1c1d1f',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid #1c1d1f',
    borderRadius: '4px',
    fontSize: '1rem',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid #1c1d1f',
    borderRadius: '4px',
    fontSize: '1rem',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  modalFooter: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
  },
  btnCancel: {
    padding: '0.8rem 1.5rem',
    border: 'none',
    background: 'transparent',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  btnSave: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#1c1d1f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  loadingState: {
    padding: '2rem',
    textAlign: 'center',
    color: '#6a6f73',
  },
  emptyState: {
    padding: '3rem',
    textAlign: 'center',
    backgroundColor: '#f7f9fa',
    borderRadius: '8px',
    border: '1px dashed #d1d7dc',
  },
};

export default InstructorPanel;