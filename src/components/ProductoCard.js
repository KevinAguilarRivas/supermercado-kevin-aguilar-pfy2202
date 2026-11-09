import { Link } from 'react-router-dom';
import StockBadge from './StockBadge';
import { formatoCLP } from './formato';
import { ICONOS_CATEGORIA } from '../data/articulos';

// Portada del producto: ícono de su categoría sobre el degradado de la marca
export function ProductoPortada({ articulo, className = '' }) {
  return (
    <div
      className={`relative grid place-items-center bg-[radial-gradient(circle_at_30%_20%,#4c1d95_0%,#2a1743_55%,#180e2b_100%)] ${className}`}
      role="img"
      aria-label={`Imagen de ${articulo.nombre}`}
    >
      <span className="text-6xl drop-shadow-[0_8px_24px_rgba(232,121,249,0.45)] sm:text-7xl">
        {ICONOS_CATEGORIA[articulo.categoria] ?? '🛒'}
      </span>
    </div>
  );
}

// Tarjeta de producto (misma estructura que la tarjeta de videojuego de NextPixel)
export default function ProductoCard({ articulo }) {
  return (
    <article className="product-card max-sm:grid max-sm:grid-cols-[110px_1fr] max-sm:hover:translate-y-0">
      <div className="relative">
        <ProductoPortada articulo={articulo} className="aspect-[4/3] max-sm:h-full max-sm:aspect-auto" />
        <span className="badge-accent absolute right-3 top-3 max-sm:right-1.5 max-sm:top-1.5 max-sm:text-[0.65rem]">
          {articulo.categoria}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-[0.95rem] font-semibold text-np-cyan">{articulo.marca}</p>
        <h3 className="mb-3 flex-1 text-base leading-snug">{articulo.nombre}</h3>
        <div className="flex items-center justify-between gap-2">
          <p className="product-price">{formatoCLP(articulo.precio)}</p>
          <StockBadge stock={articulo.stock} />
        </div>
        <Link
          to={`/inventario/${articulo.id}`}
          className="btn btn-secondary btn-sm mt-4 w-full"
          aria-label={`Ver detalle de ${articulo.nombre}`}
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
