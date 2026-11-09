import { Link } from 'react-router-dom';
import Button from '../components/Button';
import ProductoCard from '../components/ProductoCard';
import { useInventario } from '../context/InventarioContext';
import { CATEGORIAS, ICONOS_CATEGORIA } from '../data/articulos';

export default function Home() {
  const { articulos, totalUnidades } = useInventario();
  const totalStock = articulos.reduce((acc, a) => acc + a.stock, 0);

  const stats = [
    { valor: articulos.length, texto: 'artículos registrados' },
    { valor: totalStock, texto: 'unidades en stock' },
    { valor: CATEGORIAS.length, texto: 'categorías' },
    { valor: totalUnidades, texto: 'unidades en tu carrito' },
  ];

  // Destacados: los 4 artículos con más stock (se calcula sin modificar el inventario)
  const destacados = [...articulos].sort((a, b) => b.stock - a.stock).slice(0, 4);

  return (
    <>
      {/* Hero con CSS Grid: mensaje principal + tarjetas de resumen */}
      <section className="bg-np-hero py-12 sm:py-[4.5rem]" aria-labelledby="hero-titulo">
        <div className="container-app grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <div>
            <p className="mb-3 font-bold uppercase tracking-[0.2em] text-lime-300">Supermercado online</p>
            <h1 id="hero-titulo" className="mb-4 text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.1]">
              Tu despensa completa
              <span className="block bg-np-title bg-clip-text text-transparent">a un clic</span>
            </h1>
            <p className="mb-7 max-w-[52ch] text-xl text-emerald-50/90">
              Administra el inventario de NextPixel Market: revisa el stock, filtra por categoría, agrega nuevos
              productos y arma tu carrito de compras.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button to="/inventario" size="lg">Ver inventario</Button>
              <Button to="/inventario/nuevo" variant="light" size="lg">Agregar artículo</Button>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <li key={s.texto} className="flex flex-col rounded-np border border-white/15 bg-np-bg/45 p-5">
                <strong className="font-display text-2xl text-np-white sm:text-[1.8rem]">{s.valor}</strong>
                <span className="text-emerald-50/90">{s.texto}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Productos destacados con las tarjetas de la marca */}
      <section className="section" aria-labelledby="destacados-titulo">
        <div className="container-app">
          <div className="section-head flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="destacados-titulo">Productos destacados</h2>
              <p>Los artículos con mayor disponibilidad en nuestras góndolas.</p>
            </div>
            <Button to="/inventario" variant="secondary">Ver todo el inventario</Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destacados.map((a) => (
              <ProductoCard key={a.id} articulo={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="section section-alt" aria-labelledby="categorias-titulo">
        <div className="container-app">
          <div className="section-head">
            <h2 id="categorias-titulo">Nuestras categorías</h2>
            <p>Todo lo que necesitas para tu hogar en un solo lugar.</p>
          </div>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORIAS.map((c) => (
              <li key={c}>
                <Link
                  to="/inventario"
                  state={{ categoria: c }}
                  className="panel flex h-full flex-col items-center gap-2 !p-5 text-center transition hover:-translate-y-1 hover:border-np-accent/50 hover:shadow-glow"
                >
                  <span className="text-4xl" aria-hidden="true">{ICONOS_CATEGORIA[c]}</span>
                  <span className="font-semibold">{c}</span>
                  <span className="text-sm text-np-muted">
                    {articulos.filter((a) => a.categoria === c).length} productos
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
