import { useState, useEffect } from 'react';
import { cursosAPI, inscripcionesAPI } from '../services/api';

function AdminPanel({ user }) {
  const [activeTab, setActiveTab] = useState('cursos');
  const [cursos, setCursos] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCurso, setEditingCurso] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
    precio: '',
    duracionHoras: '',
    nivel: 'BASICO',
    modalidad: 'ONLINE',
    estado: 'ACTIVO',
    imagenPortada: '',
    requisitosPrevios: ''
  });

  useEffect(() => {
    cargarDatos();
  }, [activeTab]);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      if (activeTab === 'cursos') {
        const response = await cursosAPI.obtenerTodos();
        setCursos(response.data);
      } else if (activeTab === 'inscripciones') {
        const response = await inscripcionesAPI.obtenerTodas();
        setInscripciones(response.data);
      }
    } catch (err) {
      console.error('Error al cargar datos:', err);
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
        alert('Curso actualizado exitosamente');
      } else {
        await cursosAPI.crear(formData);
        alert('Curso creado exitosamente');
      }
      setShowForm(false);
      setEditingCurso(null);
      resetForm();
      cargarDatos();
    } catch (err) {
      alert('Error al guardar el curso');
      console.error(err);
    }
  };

  const handleEdit = (curso) => {
    setEditingCurso(curso);
    setFormData({
      titulo: curso.titulo,
      descripcion: curso.descripcion || '',
      categoria: curso.categoria || '',
      precio: curso.precio || '',
      duracionHoras: curso.duracionHoras || '',
      nivel: curso.nivel || 'BASICO',
      modalidad: curso.modalidad || 'ONLINE',
      estado: curso.estado || 'ACTIVO',
      imagenPortada: curso.imagenPortada || '',
      requisitosPrevios: curso.requisitosPrevios || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este curso?')) {
      try {
        await cursosAPI.eliminar(id);
        alert('Curso eliminado exitosamente');
        cargarDatos();
      } catch (err) {
        alert('Error al eliminar el curso');
        console.error(err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      categoria: '',
      precio: '',
      duracionHoras: '',
      nivel: 'BASICO',
      modalidad: 'ONLINE',
      estado: 'ACTIVO',
      imagenPortada: '',
      requisitosPrevios: ''
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Panel de Administración</h1>
        <p style={styles.subtitle}>Bienvenido, {user?.nombreCompleto}</p>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          style={activeTab === 'cursos' ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab('cursos')}
        >
          Gestión de Cursos
        </button>
        <button
          style={activeTab === 'inscripciones' ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab('inscripciones')}
        >
          Inscripciones
        </button>
      </div>

      {/* Contenido según tab activo */}
      {activeTab === 'cursos' && (
        <div style={styles.content}>
          <div style={styles.actionBar}>
            <h2 style={styles.sectionTitle}>Cursos ({cursos.length})</h2>
            <button
              style={styles.addButton}
              onClick={() => {
                setShowForm(true);
                setEditingCurso(null);
                resetForm();
              }}
            >
              + Nuevo Curso
            </button>
          </div>

          {/* Formulario de creación/edición */}
          {showForm && (
            <div style={styles.formContainer}>
              <h3 style={styles.formTitle}>
                {editingCurso ? 'Editar Curso' : 'Nuevo Curso'}
              </h3>
              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Título *</label>
                    <input
                      type="text"
                      name="titulo"
                      value={formData.titulo}
                      onChange={handleChange}
                      required
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Categoría</label>
                    <input
                      type="text"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Precio *</label>
                    <input
                      type="number"
                      name="precio"
                      value={formData.precio}
                      onChange={handleChange}
                      required
                      step="0.01"
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Duración (horas)</label>
                    <input
                      type="number"
                      name="duracionHoras"
                      value={formData.duracionHoras}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Nivel</label>
                    <select
                      name="nivel"
                      value={formData.nivel}
                      onChange={handleChange}
                      style={styles.input}
                    >
                      <option value="BASICO">Básico</option>
                      <option value="INTERMEDIO">Intermedio</option>
                      <option value="AVANZADO">Avanzado</option>
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Modalidad</label>
                    <select
                      name="modalidad"
                      value={formData.modalidad}
                      onChange={handleChange}
                      style={styles.input}
                    >
                      <option value="ONLINE">Online</option>
                      <option value="PRESENCIAL">Presencial</option>
                      <option value="HIBRIDO">Híbrido</option>
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Estado</label>
                    <select
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                      style={styles.input}
                    >
                      <option value="ACTIVO">Activo</option>
                      <option value="INACTIVO">Inactivo</option>
                      <option value="BORRADOR">Borrador</option>
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>URL Imagen</label>
                    <input
                      type="text"
                      name="imagenPortada"
                      value={formData.imagenPortada}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Descripción</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows="4"
                    style={styles.textarea}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Requisitos Previos</label>
                  <textarea
                    name="requisitosPrevios"
                    value={formData.requisitosPrevios}
                    onChange={handleChange}
                    rows="3"
                    style={styles.textarea}
                  />
                </div>

                <div style={styles.formButtons}>
                  <button type="submit" style={styles.submitButton}>
                    {editingCurso ? 'Actualizar' : 'Crear'} Curso
                  </button>
                  <button
                    type="button"
                    style={styles.cancelButton}
                    onClick={() => {
                      setShowForm(false);
                      setEditingCurso(null);
                      resetForm();
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Lista de cursos */}
          {loading ? (
            <p style={styles.loading}>Cargando cursos...</p>
          ) : (
            <div style={styles.table}>
              <table style={styles.tableElement}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Título</th>
                    <th style={styles.th}>Categoría</th>
                    <th style={styles.th}>Precio</th>
                    <th style={styles.th}>Estado</th>
                    <th style={styles.th}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cursos.map((curso) => (
                    <tr key={curso.idCurso} style={styles.tableRow}>
                      <td style={styles.td}>{curso.idCurso}</td>
                      <td style={styles.td}>{curso.titulo}</td>
                      <td style={styles.td}>{curso.categoria}</td>
                      <td style={styles.td}>S/ {Number(curso.precio).toFixed(2)}</td>
                      <td style={styles.td}>
                        <span style={styles.badge}>{curso.estado}</span>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.actions}>
                          <button
                            style={styles.editButton}
                            onClick={() => handleEdit(curso)}
                          >
                            Editar
                          </button>
                          <button
                            style={styles.deleteButton}
                            onClick={() => handleDelete(curso.idCurso)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'inscripciones' && (
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Inscripciones ({inscripciones.length})</h2>
          {loading ? (
            <p style={styles.loading}>Cargando inscripciones...</p>
          ) : (
            <div style={styles.table}>
              <table style={styles.tableElement}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Usuario ID</th>
                    <th style={styles.th}>Curso ID</th>
                    <th style={styles.th}>Progreso</th>
                    <th style={styles.th}>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {inscripciones.map((inscripcion) => (
                    <tr key={inscripcion.idInscripcion} style={styles.tableRow}>
                      <td style={styles.td}>{inscripcion.idInscripcion}</td>
                      <td style={styles.td}>{inscripcion.idUsuario}</td>
                      <td style={styles.td}>{inscripcion.idCurso}</td>
                      <td style={styles.td}>{inscripcion.progreso}%</td>
                      <td style={styles.td}>
                        {new Date(inscripcion.fechaInscripcion).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem 1rem',
    minHeight: 'calc(100vh - 200px)',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#7f8c8d',
  },
  tabs: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    borderBottom: '2px solid #ecf0f1',
  },
  tab: {
    padding: '1rem 2rem',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    color: '#7f8c8d',
    borderBottom: '2px solid transparent',
  },
  tabActive: {
    padding: '1rem 2rem',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    color: '#3498db',
    borderBottom: '2px solid #3498db',
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    color: '#2c3e50',
  },
  addButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '8px',
    marginBottom: '2rem',
  },
  formTitle: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: '#2c3e50',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontWeight: '500',
    color: '#34495e',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  textarea: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  formButtons: {
    display: 'flex',
    gap: '1rem',
  },
  submitButton: {
    padding: '0.75rem 2rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: '0.75rem 2rem',
    backgroundColor: '#95a5a6',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  table: {
    overflowX: 'auto',
  },
  tableElement: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#34495e',
    color: '#fff',
  },
  th: {
    padding: '1rem',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  tableRow: {
    borderBottom: '1px solid #ecf0f1',
  },
  td: {
    padding: '1rem',
  },
  badge: {
    padding: '0.25rem 0.75rem',
    backgroundColor: '#27ae60',
    color: '#fff',
    borderRadius: '12px',
    fontSize: '0.8rem',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  editButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    color: '#7f8c8d',
  },
};

export default AdminPanel;