import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import QuantityControl from '../components/QuantityControl';
import { formatoCLP } from '../components/formato';
import { useInventario } from '../context/InventarioContext';
import { ICONOS_CATEGORIA } from '../data/articulos';

export default function Carrito() {
  const { carrito, totalUnidades, totalPagar, aumentarCantidad, disminuirCantidad, quitarDelCarrito, vaciarCarrito } =
    useInventario();

  return (
    <section className="section">
      <div className="container-app">
        <PageHeader title="Carrito de compras" subtitle="Al cambiar las cantidades se actualiza el inventario general.">
          {carrito.length > 0 && <Button variant="danger" onClick={vaciarCarrito}>Vaciar carrito</Button>}
        </PageHeader>

        {carrito.length === 0 ? (
          <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-np border border-dashed border-np-border p-8 text-center text-np-muted">
            <span className="text-5xl" aria-hidden="true">🛒</span>
            <p>Tu carrito está vacío.</p>
            <Button to="/inventario">Ir al inventario</Button>
          </div>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_20rem]">
            <ul className="space-y-3">
              {carrito.map((item) => (
                <li key={item.id} className="panel flex flex-col gap-4 !p-4 sm:flex-row sm:items-center">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-np-surface-alt text-3xl" aria-hidden="true">
                    {ICONOS_CATEGORIA[item.categoria] ?? '🛒'}
                  </span>

                  <div className="flex-1">
                    <p className="text-[0.95rem] font-semibold text-np-cyan">{item.marca}</p>
                    <Link to={`/inventario/${item.id}`} className="font-semibold hover:text-np-accent">
                      {item.nombre}
                    </Link>
                    <p className="text-sm text-np-muted">
                      {formatoCLP(item.precio)} c/u · quedan <strong className="text-np-white">{item.stock}</strong> en inventario
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <QuantityControl
                      label={`Cantidad de ${item.nombre}`}
                      value={item.cantidad}
                      onDecrease={() => disminuirCantidad(item.id)}
                      onIncrease={() => aumentarCantidad(item.id)}
                      disableIncrease={item.stock === 0}
                    />
                    <p className="w-24 text-right font-display font-bold tabular-nums">{formatoCLP(item.precio * item.cantidad)}</p>
                    <Button variant="danger" size="sm" onClick={() => quitarDelCarrito(item.id)} aria-label={`Quitar ${item.nombre}`}>
                      ✕
                    </Button>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="panel lg:sticky lg:top-24">
              <h2 className="text-lg">Resumen</h2>
              <dl className="mt-4 space-y-2">
                <div className="flex justify-between text-np-muted">
                  <dt>Productos distintos</dt>
                  <dd className="text-np-white">{carrito.length}</dd>
                </div>
                <div className="flex justify-between text-np-muted">
                  <dt>Unidades</dt>
                  <dd className="text-np-white">{totalUnidades}</dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-np-border pt-3">
                  <dt className="font-bold">Total</dt>
                  <dd className="font-display text-xl font-bold text-np-accent">{formatoCLP(totalPagar)}</dd>
                </div>
              </dl>
              <Button to="/inventario" variant="secondary" className="mt-6 w-full">Seguir comprando</Button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
