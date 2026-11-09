import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import QuantityControl from '../components/QuantityControl';
import StockBadge from '../components/StockBadge';
import { ProductoPortada } from '../components/ProductoCard';
import { formatoCLP } from '../components/formato';
import { useInventario } from '../context/InventarioContext';

export default function ArticuloDetalle() {
  // Parámetro dinámico de la ruta /inventario/:articuloId
  const { articuloId } = useParams();
  const navigate = useNavigate();
  const { articulos, carrito, agregarAlCarrito } = useInventario();

  const articulo = articulos.find((a) => a.id === Number(articuloId));
  const enCarrito = carrito.find((i) => i.id === Number(articuloId))?.cantidad ?? 0;

  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');

  if (!articulo) {
    return (
      <section className="section">
        <div className="container-app">
          <div className="panel mx-auto max-w-md text-center">
            <h1 className="text-xl">Artículo no encontrado</h1>
            <Button to="/inventario" className="mt-6">Volver al inventario</Button>
          </div>
        </div>
      </section>
    );
  }

  const agotado = articulo.stock === 0;
  const cantidadValida = Math.min(cantidad, Math.max(articulo.stock, 1));

  const handleAgregar = () => {
    agregarAlCarrito(articulo.id, cantidadValida);
    setMensaje(`Se agregaron ${cantidadValida} unidad(es) al carrito.`);
    setCantidad(1);
  };

  return (
    <section className="section">
      <div className="container-app max-w-5xl">
        <button type="button" onClick={() => navigate(-1)} className="nav-link -ml-3 mb-4">
          ← Volver
        </button>

        <article className="grid overflow-hidden rounded-np border border-np-border bg-np-surface md:grid-cols-[1fr_1.2fr]">
          <div className="relative">
            <ProductoPortada articulo={articulo} className="aspect-[4/3] h-full md:aspect-auto md:min-h-[360px]" />
            <span className="badge-accent absolute right-3 top-3">{articulo.categoria}</span>
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <p className="mb-1 font-semibold text-np-cyan">{articulo.marca}</p>
            <h1 className="text-2xl sm:text-3xl">{articulo.nombre}</h1>
            <p className="mt-4 font-display text-3xl font-bold">{formatoCLP(articulo.precio)}</p>

            <dl className="mt-6 grid grid-cols-[auto_1fr] items-center gap-x-6">
              <dt className="dato-titulo">Código</dt>
              <dd className="dato-valor !mb-2">#{articulo.id}</dd>
              <dt className="dato-titulo">Disponible</dt>
              <dd className="mb-2"><StockBadge stock={articulo.stock} /></dd>
              <dt className="dato-titulo">En tu carrito</dt>
              <dd className="dato-valor !mb-0">{enCarrito} unidad(es)</dd>
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-np-border pt-6">
              <QuantityControl
                label="Cantidad a agregar"
                value={agotado ? 0 : cantidadValida}
                onDecrease={() => setCantidad((c) => Math.max(1, c - 1))}
                onIncrease={() => setCantidad((c) => Math.min(articulo.stock, c + 1))}
                disableDecrease={agotado || cantidadValida <= 1}
                disableIncrease={agotado || cantidadValida >= articulo.stock}
              />
              <Button onClick={handleAgregar} disabled={agotado} size="lg">
                {agotado ? 'Sin stock' : 'Agregar al carrito'}
              </Button>
            </div>

            {mensaje && (
              <div className="alert-ok mt-4" role="status">
                ✔ {mensaje}
                <Button to="/carrito" variant="secondary" size="sm">Ir al carrito</Button>
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
