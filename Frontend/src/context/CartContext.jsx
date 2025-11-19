import { createContext, useContext, useState, useEffect } from 'react';
import { inscripcionesAPI } from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [procesando, setProcesando] = useState(false);

  // Cargar carrito del localStorage al iniciar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      try {
        setCarrito(JSON.parse(carritoGuardado));
      } catch (err) {
        console.error('Error al cargar carrito:', err);
      }
    }
  }, []);

  // Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // Agregar curso al carrito
  const agregarAlCarrito = (curso) => {
    // Verificar si el curso ya está en el carrito
    const yaExiste = carrito.some(item => item.idCurso === curso.idCurso);
    
    if (yaExiste) {
      alert('Este curso ya está en tu carrito');
      return;
    }

    setCarrito([...carrito, { ...curso, cantidadCarrito: 1 }]);
    alert('✅ Curso agregado al carrito');
  };

  // Eliminar curso del carrito
  const eliminarDelCarrito = (idCurso) => {
    setCarrito(carrito.filter(item => item.idCurso !== idCurso));
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Calcular totales
  const calcularTotales = () => {
    const subtotal = carrito.reduce((total, item) => {
      return total + (Number(item.precio) || 0);
    }, 0);

    const impuesto = subtotal * 0.18; // 18% de impuesto
    const total = subtotal + impuesto;

    return {
      subtotal: subtotal.toFixed(2),
      impuesto: impuesto.toFixed(2),
      total: total.toFixed(2),
      cantidad: carrito.length,
    };
  };

  // Procesar pago (simulado)
  const procesarPago = async (user) => {
    if (!user) {
      alert('Debes estar logueado para comprar');
      return false;
    }

    try {
      setProcesando(true);

      // Simular delay de procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Inscribir usuario en cada curso
      const promesas = carrito.map(curso =>
        inscripcionesAPI.crear({
          idUsuario: user.idUsuario,
          idCurso: curso.idCurso,
          progreso: 0,
        })
      );

      await Promise.all(promesas);

      // Vaciar carrito después del pago exitoso
      vaciarCarrito();
      alert('✅ ¡Pago realizado exitosamente! Ahora puedes acceder a tus cursos');
      return true;
    } catch (err) {
      console.error('Error al procesar pago:', err);
      alert('❌ Error al procesar el pago. Intenta nuevamente');
      return false;
    } finally {
      setProcesando(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        calcularTotales,
        procesarPago,
        procesando,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};