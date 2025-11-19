import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

function CourseCard({ curso }) {
  const { agregarAlCarrito } = useCart();


  const rating = curso.calificacion || 4.8;
  const estudiantes = curso.estudiantes || 120;

  return (
    <div style={styles.card}>
      
      {/* Imagen del curso y Badge Flotante */}
      <div style={styles.imageContainer}>
        {curso.imagenPortada ? (
          <img 
            src={curso.imagenPortada} 
            alt={curso.titulo} 
            style={styles.image}
          />
        ) : (
          <div style={styles.imagePlaceholder}>📚</div>
        )}
        
        {/* Badge flotante sobre la imagen */}
        <div style={styles.floatingBadge}>
          {curso.categoria || 'Programación'}
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div style={styles.content}>
        
        {/* Título */}
        <h3 style={styles.title} title={curso.titulo}>
          {curso.titulo}
        </h3>

        {/* Subtítulo / Descripción corta */}
        <p style={styles.author}>
          {curso.instructor || 'Instructor Certificado'}
        </p>

        {/* Info Adicional (Rating) */}
        <div style={styles.ratingContainer}>
          <span style={styles.ratingNumber}>{rating}</span>
          <span style={styles.stars}>⭐⭐⭐⭐⭐</span>
          <span style={styles.students}>({estudiantes})</span>
        </div>

        {/* Metadatos (Horas y Nivel) */}
        <div style={styles.metaInfo}>
          {curso.duracionHoras && (
            <span style={styles.metaItem}>🕒 {curso.duracionHoras}h total</span>
          )}
          <span style={styles.dot}>•</span>
          <span style={styles.metaItem}>{curso.nivel || 'Todos los niveles'}</span>
        </div>

        {/* Footer: Precio y Botones */}
        <div style={styles.footer}>
          <div style={styles.priceBlock}>
             <span style={styles.priceLabel}>Precio:</span>
             <span style={styles.price}>
               S/ {curso.precio ? Number(curso.precio).toFixed(2) : '0.00'}
             </span>
          </div>

          <div style={styles.actions}>
            {/* Botón Ver Curso (Morado Sólido) */}
            <Link to={`/cursos/${curso.idCurso}`} style={styles.viewButton}>
              Ver Curso
            </Link>
            
            
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #d1d7dc', // Borde sutil como en la referencia
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    transition: 'box-shadow 0.2s ease',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '160px', // Altura controlada
    backgroundColor: '#f7f9fa',
    overflow: 'hidden',
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
    fontSize: '3rem',
    backgroundColor: '#e0e0e0',
    color: '#757575',
  },
  floatingBadge: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: '#5022c3', // El morado vibrante de la referencia
    color: '#ffffff',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  content: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1c1d1f',
    margin: '0 0 0.25rem 0',
    lineHeight: '1.4',
    // Truco para limitar a 2 lineas con estilos en linea (Webkit)
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    height: '2.8rem', // Altura fija para alinear cards
  },
  author: {
    fontSize: '0.8rem',
    color: '#6a6f73',
    margin: '0 0 0.5rem 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    marginBottom: '0.5rem',
  },
  ratingNumber: {
    color: '#b4690e',
    fontWeight: '800',
    fontSize: '0.9rem',
  },
  stars: {
    fontSize: '0.8rem',
    letterSpacing: '-2px', // Juntar las estrellas visualmente
  },
  students: {
    fontSize: '0.75rem',
    color: '#6a6f73',
    marginLeft: '4px',
  },
  metaInfo: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.75rem',
    color: '#6a6f73',
    marginBottom: '1rem',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
  },
  dot: {
    margin: '0 6px',
    color: '#6a6f73',
  },
  footer: {
    marginTop: 'auto', // Empuja el footer al fondo
    display: 'flex',
    alignItems: 'flex-end', // Alinear abajo
    justifyContent: 'space-between',
    borderTop: '1px solid #e3e6e8',
    paddingTop: '1rem',
  },
  priceBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
  priceLabel: {
    fontSize: '0.7rem',
    color: '#6a6f73',
    marginBottom: '2px',
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: '800',
    color: '#1c1d1f', // Precio negro sólido
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  viewButton: {
    backgroundColor: '#5022c3', // Morado exacto
    color: '#ffffff',
    border: 'none',
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    fontWeight: '700',
    textDecoration: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
    display: 'inline-block',
    lineHeight: '1.2',
  },
  cartButton: {
    backgroundColor: '#ffffff',
    border: '1px solid #1c1d1f',
    borderRadius: '4px',
    width: '36px', // Cuadrado
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1.1rem',
    color: '#1c1d1f',
  }
};

export default CourseCard;