import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import useWindowWidth from '../components/useWindowWidth.js'; // Importa el hook de responsividad

const BREAKPOINT = 900; // Punto de quiebre para el layout de 2 columnas

function Cart({ user }) {
  const navigate = useNavigate();
  const { carrito, eliminarDelCarrito, calcularTotales, procesarPago, procesando } = useCart();
  const [mostrarModalPago, setMostrarModalPago] = useState(false);
  const [datosPago, setDatosPago] = useState({
    numeroTarjeta: '',
    nombreTitular: '',
    fechaVencimiento: '',
    cvv: '',
  });

  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= BREAKPOINT;

  const totales = calcularTotales();

  const handleInputPago = (e) => {
    const { name, value } = e.target;
    setDatosPago(prev => ({ ...prev, [name]: value }));
  };

  const handleProcesarPago = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Debes iniciar sesión para comprar');
      navigate('/login');
      return;
    }

    if (!datosPago.numeroTarjeta || !datosPago.nombreTitular || !datosPago.fechaVencimiento || !datosPago.cvv) {
      alert('Por favor completa todos los campos');
      return;
    }

    const success = await procesarPago(user);
    
    if (success) {
      setMostrarModalPago(false);
      setTimeout(() => navigate('/dashboard'), 1500);
    }
  };

  // --- Estilos condicionales ---
  const contentStyle = isDesktop ? { ...styles.content, ...styles.contentDesktop } : styles.content;
  const cursoItemStyle = isDesktop ? styles.cursoItem : styles.cursoItemMobile;
  const cursoImageStyle = isDesktop ? styles.cursoImage : styles.cursoImageMobile;
  const cursoPrecioStyle = isDesktop ? styles.cursoPrecio : styles.cursoPrecioMobile;
  const resumenStyle = isDesktop ? styles.resumen : styles.resumenMobile;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Carrito de Compras</h1>
        <p style={styles.subtitle}>
          {carrito.length === 0 
            ? 'Agrega cursos para comenzar.' 
            : `Tienes ${carrito.length} curso${carrito.length !== 1 ? 's' : ''} en el carrito.`}
        </p>
      </div>

      <div style={contentStyle}>
        {/* Cursos en el carrito */}
        <div style={styles.cursosList}>
          {carrito.length === 0 ? (
            <div style={styles.empty}>
              <div style={styles.emptyIcon}>🛒</div>
              <h3 style={styles.emptyTitle}>Tu carrito está vacío</h3>
              <p style={styles.emptyText}>
                Explora nuestros cursos y agrega los que te interesen
              </p>
              <button
                style={styles.continuarButton}
                onClick={() => navigate('/cursos')}
              >
                📚 Explorar Cursos
              </button>
            </div>
          ) : (
            <>
              {carrito.map((curso) => (
                <div key={curso.idCurso} style={cursoItemStyle}>
                  <div style={cursoImageStyle}>
                    {curso.imagenPortada ? (
                      <img src={curso.imagenPortada} alt={curso.titulo} style={styles.image} />
                    ) : (
                      <div style={styles.imagePlaceholder}>📚</div>
                    )}
                  </div>

                  <div style={styles.cursoInfo}>
                    <h4 style={styles.cursoTitle}>{curso.titulo}</h4>
                    <p style={styles.cursoCategory}>
                      📂 {curso.categoria || 'Sin categoría'}
                    </p>
                    <p style={styles.cursoDescription}>
                      {curso.descripcion 
                        ? curso.descripcion.substring(0, 100) + '...' 
                        : 'Sin descripción'}
                    </p>
                  </div>

                  <div style={cursoPrecioStyle}>
                    <span style={styles.precioLabel}>Precio</span>
                    <span style={styles.precio}>
                      S/ {Number(curso.precio).toFixed(2)}
                    </span>
                  </div>

                  <button
                    style={styles.eliminarButton}
                    onClick={() => eliminarDelCarrito(curso.idCurso)}
                    title="Eliminar del carrito"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Resumen de compra */}
        {carrito.length > 0 && (
          <div style={resumenStyle}>
            <h3 style={styles.resumenTitle}>📊 Resumen</h3>

            <div style={styles.resumenItem}>
              <span>Subtotal ({carrito.length} curso{carrito.length !== 1 ? 's' : ''})</span>
              <span>S/ {totales.subtotal}</span>
            </div>

            <div style={styles.resumenItem}>
              <span>Impuesto (18%)</span>
              <span>S/ {totales.impuesto}</span>
            </div>

            <div style={styles.resumenDivider}></div>

            <div style={styles.resumenTotal}>
              <span>Total</span>
              <span style={styles.totalAmount}>S/ {totales.total}</span>
            </div>

            <button
              style={styles.pagarButton}
              onClick={() => {
                if (!user) {
                  alert('Debes iniciar sesión para comprar');
                  navigate('/login');
                  return;
                }
                setMostrarModalPago(true);
              }}
            >
              💳 Proceder al Pago
            </button>

            <button
              style={styles.continuarShoppingButton}
              onClick={() => navigate('/cursos')}
            >
              Continuar Comprando
            </button>
          </div>
        )}
      </div>

      {/* Modal de Pago */}
      {mostrarModalPago && (
        <div style={styles.modalOverlay} onClick={() => setMostrarModalPago(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>💳 Información de Pago</h2>
              <button
                style={styles.closeButton}
                onClick={() => setMostrarModalPago(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleProcesarPago} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Número de Tarjeta</label>
                <input
                  type="text"
                  name="numeroTarjeta"
                  placeholder="1234 5678 9012 3456"
                  value={datosPago.numeroTarjeta}
                  onChange={handleInputPago}
                  maxLength="19"
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Nombre del Titular</label>
                <input
                  type="text"
                  name="nombreTitular"
                  placeholder="Juan Pérez"
                  value={datosPago.nombreTitular}
                  onChange={handleInputPago}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Fecha de Vencimiento</label>
                  <input
                    type="text"
                    name="fechaVencimiento"
                    placeholder="MM/YY"
                    value={datosPago.fechaVencimiento}
                    onChange={handleInputPago}
                    maxLength="5"
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="123"
                    value={datosPago.cvv}
                    onChange={handleInputPago}
                    maxLength="3"
                    style={styles.input}
                    required
                  />
                </div>
              </div>

              <div style={styles.modalTotal}>
                <span>Total a pagar:</span>
                <span style={styles.modalTotalAmount}>S/ {totales.total}</span>
              </div>

              <button
                type="submit"
                style={procesando ? styles.pagarModalButtonDisabled : styles.pagarModalButton}
                disabled={procesando}
              >
                {procesando ? '⏳ Procesando...' : 'Confirmar Pago'}
              </button>

              <button
                type="button"
                style={styles.cancelarButton}
                onClick={() => setMostrarModalPago(false)}
                disabled={procesando}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  // --- VARIABLES ---
  primary: '#3498db',
  accent: '#27ae60',
  textMain: '#2c3e50',
  textLight: '#7f8c8d',
  bgLight: '#f8f9fa',
  bgWhite: '#fff',

  // --- Layout General ---
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
    minHeight: 'calc(100vh - 200px)',
    backgroundColor: '#f8f9fa',
  },
  header: {
    textAlign: 'center',
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

  // --- Contenido Principal (Responsivo) ---
  content: { // Mobile: 1 columna, los items y el resumen irán apilados
    display: 'grid',
    gridTemplateColumns: '1fr', 
    gap: '2rem',
  },
  contentDesktop: { // Desktop: 2 columnas
    gridTemplateColumns: '1fr 350px',
  },

  // --- Lista de Cursos ---
  cursosList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  
  // Ítem de Curso (Responsivo)
  cursoItem: { // Desktop
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'grid',
    gridTemplateColumns: '120px 1fr 150px 50px',
    gap: '1.5rem',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
  },
  cursoItemMobile: { // Mobile: Apila la info
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1rem',
    display: 'grid',
    gridTemplateColumns: '100px 1fr 40px', // Imagen, Info, Botón
    gridTemplateRows: 'auto auto', // Dos filas para la info de precio
    gap: '1rem',
    alignItems: 'start',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },

  // Imagen (Responsivo)
  cursoImage: { // Desktop
    width: '120px',
    height: '100px',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  cursoImageMobile: { // Mobile (más pequeña)
    width: '100px',
    height: '80px',
    borderRadius: '6px',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    gridColumn: '1 / 2',
    gridRow: '1 / 2',
  },
  image: {
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
    fontSize: '2rem', // Ajustado para mobile
    backgroundColor: '#e0e0e0',
  },

  cursoInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    gridColumn: '2 / 3',
    gridRow: '1 / 2',
  },
  cursoTitle: {
    margin: 0,
    fontSize: '1.1rem',
    color: '#2c3e50',
    fontWeight: '600',
  },
  cursoCategory: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#7f8c8d',
  },
  cursoDescription: {
    margin: '0.5rem 0 0 0',
    fontSize: '0.9rem',
    color: '#888',
    lineHeight: '1.4',
    display: 'none', // Ocultamos la descripción en mobile para ahorrar espacio
  },

  // Precio (Responsivo)
  cursoPrecio: { // Desktop
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    textAlign: 'center',
  },
  cursoPrecioMobile: { // Mobile: Debajo de la info y ocupa el ancho del ítem
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    paddingTop: '0.5rem',
    borderTop: '1px solid #f0f0f0',
    gridColumn: '1 / 4', // Ocupa las 3 columnas
    gridRow: '2 / 3',
  },
  precioLabel: {
    fontSize: '0.8rem',
    color: '#7f8c8d',
  },
  precio: {
    fontSize: '1.2rem', // Ajustado para mobile
    fontWeight: '700',
    color: '#27ae60',
  },
  
  eliminarButton: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    border: '1px solid #e74c3c',
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    cursor: 'pointer',
    fontSize: '1.2rem',
    transition: 'all 0.2s ease',
    gridColumn: '3 / 4', // Columna 3 en Mobile
    gridRow: '1 / 2',
  },

  // --- Resumen ---
  resumen: { // Desktop (Sticky)
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    height: 'fit-content',
    position: 'sticky',
    top: '20px',
  },
  resumenMobile: { // Mobile (Normal)
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    height: 'fit-content',
  },
  resumenTitle: {
    fontSize: '1.3rem',
    color: '#2c3e50',
    marginTop: 0,
    marginBottom: '1.5rem',
    fontWeight: '700',
  },
  resumenItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    fontSize: '0.95rem',
    color: '#555',
  },
  resumenDivider: {
    height: '1px',
    backgroundColor: '#ecf0f1',
    margin: '1rem 0',
  },
  resumenTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#2c3e50',
  },
  totalAmount: {
    color: '#27ae60',
  },
  pagarButton: {
    width: '100%',
    padding: '1rem',
    // Arreglo el gradiente para Inline Styles
    backgroundColor: '#667eea', 
    backgroundImage: 'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '1rem',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  },
  continuarShoppingButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#f0f0f0',
    color: '#555',
    border: '1px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },
  
  // --- Estado Vacío ---
  empty: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '3rem 2rem',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  emptyTitle: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    marginBottom: '0.5rem',
  },
  emptyText: {
    color: '#7f8c8d',
    marginBottom: '1.5rem',
  },
  continuarButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },

  // --- Modal de Pago ---
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.5rem',
    color: '#2c3e50',
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#7f8c8d',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#34495e',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
    outline: 'none',
  },
  modalTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: '#e6ffe0', // Fondo verde claro
    borderRadius: '8px',
    fontWeight: '600',
    border: '1px solid #27ae60',
  },
  modalTotalAmount: {
    color: '#27ae60',
    fontSize: '1.2rem',
  },
  pagarModalButton: {
    padding: '1rem',
    backgroundColor: '#3498db', // Color azul principal
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  pagarModalButtonDisabled: {
    padding: '1rem',
    backgroundColor: '#b3d9ff', // Color más claro para deshabilitado
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'not-allowed',
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  cancelarButton: {
    padding: '0.75rem',
    backgroundColor: '#f0f0f0',
    color: '#555',
    border: '1px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default Cart;