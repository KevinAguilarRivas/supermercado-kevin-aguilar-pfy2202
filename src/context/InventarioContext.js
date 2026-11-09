import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { ARTICULOS_INICIALES } from "../data/articulos";

const STORAGE_KEY = "supermercado-estado";

// Tipos de acción del reducer (evita errores de tipeo)
export const ACTIONS = {
  AGREGAR_ARTICULO: "AGREGAR_ARTICULO",
  AGREGAR_AL_CARRITO: "AGREGAR_AL_CARRITO",
  AUMENTAR_CANTIDAD: "AUMENTAR_CANTIDAD",
  DISMINUIR_CANTIDAD: "DISMINUIR_CANTIDAD",
  QUITAR_DEL_CARRITO: "QUITAR_DEL_CARRITO",
  VACIAR_CARRITO: "VACIAR_CARRITO",
  REINICIAR: "REINICIAR",
};

const estadoInicial = {
  articulos: ARTICULOS_INICIALES, // inventario general
  carrito: [], // [{ id, cantidad }] -> los datos del artículo se leen desde "articulos"
};

// Suma (delta > 0) o resta (delta < 0) stock de un artículo SIN mutar el arreglo original
const ajustarStock = (articulos, id, delta) =>
  articulos.map((a) => (a.id === id ? { ...a, stock: a.stock + delta } : a));

export function inventarioReducer(state, action) {
  switch (action.type) {
    case ACTIONS.AGREGAR_ARTICULO: {
      const nuevoId = Math.max(0, ...state.articulos.map((a) => a.id)) + 1;
      return {
        ...state,
        articulos: [...state.articulos, { ...action.payload, id: nuevoId }],
      };
    }

    case ACTIONS.AGREGAR_AL_CARRITO: {
      const { id, cantidad } = action.payload;
      const articulo = state.articulos.find((a) => a.id === id);
      if (!articulo || cantidad <= 0 || cantidad > articulo.stock) return state;

      const enCarrito = state.carrito.find((item) => item.id === id);
      const carrito = enCarrito
        ? state.carrito.map((item) =>
            item.id === id
              ? { ...item, cantidad: item.cantidad + cantidad }
              : item,
          )
        : [...state.carrito, { id, cantidad }];

      return {
        articulos: ajustarStock(state.articulos, id, -cantidad),
        carrito,
      };
    }

    case ACTIONS.AUMENTAR_CANTIDAD: {
      const id = action.payload;
      const articulo = state.articulos.find((a) => a.id === id);
      if (!articulo || articulo.stock <= 0) return state; // no queda stock disponible

      return {
        articulos: ajustarStock(state.articulos, id, -1),
        carrito: state.carrito.map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item,
        ),
      };
    }

    case ACTIONS.DISMINUIR_CANTIDAD: {
      const id = action.payload;
      const item = state.carrito.find((i) => i.id === id);
      if (!item) return state;

      // Si la cantidad llega a 0, el artículo sale del carrito
      const carrito =
        item.cantidad === 1
          ? state.carrito.filter((i) => i.id !== id)
          : state.carrito.map((i) =>
              i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i,
            );

      return { articulos: ajustarStock(state.articulos, id, +1), carrito };
    }

    case ACTIONS.QUITAR_DEL_CARRITO: {
      const id = action.payload;
      const item = state.carrito.find((i) => i.id === id);
      if (!item) return state;
      return {
        articulos: ajustarStock(state.articulos, id, item.cantidad),
        carrito: state.carrito.filter((i) => i.id !== id),
      };
    }

    case ACTIONS.VACIAR_CARRITO: {
      // Devuelve al inventario todo lo que estaba en el carrito
      const articulos = state.articulos.map((a) => {
        const item = state.carrito.find((i) => i.id === a.id);
        return item ? { ...a, stock: a.stock + item.cantidad } : a;
      });
      return { articulos, carrito: [] };
    }

    case ACTIONS.REINICIAR:
      return estadoInicial;

    default:
      throw new Error(`Acción desconocida: ${action.type}`);
  }
}

// Lee el estado guardado en el navegador (si existe) para no perder datos al recargar
function cargarEstado() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY);
    return guardado ? JSON.parse(guardado) : estadoInicial;
  } catch {
    return estadoInicial;
  }
}

const InventarioContext = createContext(null);

export function InventarioProvider({ children }) {
  const [state, dispatch] = useReducer(
    inventarioReducer,
    undefined,
    cargarEstado,
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Si el navegador bloquea el almacenamiento, la app sigue funcionando en memoria
    }
  }, [state]);

  // Carrito con los datos de cada artículo (nombre, precio, stock restante)
  const carritoDetallado = useMemo(
    () =>
      state.carrito
        .map((item) => ({
          ...state.articulos.find((a) => a.id === item.id),
          cantidad: item.cantidad,
        }))
        .filter((item) => item.nombre),
    [state.carrito, state.articulos],
  );

  const value = useMemo(
    () => ({
      articulos: state.articulos,
      carrito: carritoDetallado,
      totalUnidades: carritoDetallado.reduce((acc, i) => acc + i.cantidad, 0),
      totalPagar: carritoDetallado.reduce(
        (acc, i) => acc + i.cantidad * i.precio,
        0,
      ),
      agregarArticulo: (articulo) =>
        dispatch({ type: ACTIONS.AGREGAR_ARTICULO, payload: articulo }),
      agregarAlCarrito: (id, cantidad) =>
        dispatch({
          type: ACTIONS.AGREGAR_AL_CARRITO,
          payload: { id, cantidad },
        }),
      aumentarCantidad: (id) =>
        dispatch({ type: ACTIONS.AUMENTAR_CANTIDAD, payload: id }),
      disminuirCantidad: (id) =>
        dispatch({ type: ACTIONS.DISMINUIR_CANTIDAD, payload: id }),
      quitarDelCarrito: (id) =>
        dispatch({ type: ACTIONS.QUITAR_DEL_CARRITO, payload: id }),
      vaciarCarrito: () => dispatch({ type: ACTIONS.VACIAR_CARRITO }),
      reiniciar: () => dispatch({ type: ACTIONS.REINICIAR }),
    }),
    [state.articulos, carritoDetallado],
  );

  return (
    <InventarioContext.Provider value={value}>
      {children}
    </InventarioContext.Provider>
  );
}

// Hook personalizado para consumir el estado global
export function useInventario() {
  const ctx = useContext(InventarioContext);
  if (!ctx)
    throw new Error("useInventario debe usarse dentro de <InventarioProvider>");
  return ctx;
}
