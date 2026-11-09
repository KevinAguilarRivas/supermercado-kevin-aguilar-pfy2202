import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import CategoriaFilter from '../components/CategoriaFilter';
import ArticulosTable from '../components/ArticulosTable';
import ProductoCard from '../components/ProductoCard';
import Button from '../components/Button';
import { useInventario } from '../context/InventarioContext';
import { CATEGORIAS } from '../data/articulos';

export default function Inventario() {
  const { articulos } = useInventario();
  const location = useLocation();

  // Estados locales del filtro: solo guardan lo que eligió el usuario.
  // La lista filtrada se DERIVA del inventario, por lo que los datos originales nunca se modifican.
  // Si se llega desde una categoría del inicio, el filtro parte con esa categoría.
  const [categoria, setCategoria] = useState(location.state?.categoria ?? 'Todas');
  const [busqueda, setBusqueda] = useState('');
  const [vistaTarjetas, setVistaTarjetas] = useState(false); // booleano: tabla o tarjetas

  const articulosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    return articulos.filter((a) => {
      const coincideCategoria = categoria === 'Todas' || a.categoria === categoria;
      const coincideTexto =
        texto === '' || a.nombre.toLowerCase().includes(texto) || a.marca.toLowerCase().includes(texto);
      return coincideCategoria && coincideTexto;
    });
  }, [articulos, categoria, busqueda]);

  // Cantidad de artículos por categoría (para mostrar en cada filtro)
  const conteo = useMemo(
    () => articulos.reduce((acc, a) => ({ ...acc, [a.categoria]: (acc[a.categoria] ?? 0) + 1 }), { total: articulos.length }),
    [articulos]
  );

  return (
    <section className="section">
      <div className="container-app">
        <PageHeader title="Inventario" subtitle="Selecciona un artículo para ver su detalle y agregarlo al carrito.">
          <Button to="/inventario/nuevo">+ Agregar artículo</Button>
        </PageHeader>

        <CategoriaFilter
          categorias={CATEGORIAS}
          activa={categoria}
          onChange={setCategoria}
          conteo={conteo}
          busqueda={busqueda}
          onBuscar={setBusqueda}
        />

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="font-semibold text-np-muted">
            Mostrando <span className="text-np-white">{articulosFiltrados.length}</span> de {articulos.length} artículos
            {categoria !== 'Todas' && <> en <span className="text-np-white">{categoria}</span></>}
          </p>

          <div className="inline-flex gap-1 rounded-full border border-np-border p-1" role="group" aria-label="Tipo de vista">
            <button type="button" className={`pill border-0 ${!vistaTarjetas ? 'pill-active' : 'pill-idle'}`} aria-pressed={!vistaTarjetas} onClick={() => setVistaTarjetas(false)}>
              Tabla
            </button>
            <button type="button" className={`pill border-0 ${vistaTarjetas ? 'pill-active' : 'pill-idle'}`} aria-pressed={vistaTarjetas} onClick={() => setVistaTarjetas(true)}>
              Tarjetas
            </button>
          </div>
        </div>

        {articulosFiltrados.length === 0 ? (
          <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-np border border-dashed border-np-border p-8 text-center text-np-muted">
            <p>No hay artículos que coincidan con el filtro.</p>
            <Button variant="secondary" onClick={() => { setCategoria('Todas'); setBusqueda(''); }}>
              Quitar filtros
            </Button>
          </div>
        ) : vistaTarjetas ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {articulosFiltrados.map((a) => (
              <ProductoCard key={a.id} articulo={a} />
            ))}
          </div>
        ) : (
          <ArticulosTable articulos={articulosFiltrados} />
        )}
      </div>
    </section>
  );
}
