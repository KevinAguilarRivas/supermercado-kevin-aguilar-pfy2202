// Filtro por categoría y búsqueda por nombre. Es un componente "controlado":
// recibe los valores actuales por props y avisa los cambios al componente padre.
// - Desde 768px: botones tipo píldora.
// - En móvil: un <select> que ocupa menos espacio.
export default function CategoriaFilter({ categorias, activa, onChange, conteo, busqueda, onBuscar }) {
  const opciones = ['Todas', ...categorias];
  const cantidad = (cat) => (cat === 'Todas' ? conteo.total : conteo[cat] ?? 0);

  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="hidden flex-wrap gap-2 md:flex" role="group" aria-label="Filtrar por categoría">
        {opciones.map((cat) => {
          const seleccionada = cat === activa;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onChange(cat)}
              aria-pressed={seleccionada}
              className={`pill ${seleccionada ? 'pill-active' : 'pill-idle'}`}
            >
              {cat}
              <span className="badge-count">{cantidad(cat)}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(260px,420px)]">
        <div className="md:hidden">
          <label htmlFor="filtroCategoria" className="form-label text-sm">Categoría</label>
          <select id="filtroCategoria" className="form-input" value={activa} onChange={(e) => onChange(e.target.value)}>
            {opciones.map((cat) => (
              <option key={cat} value={cat}>{`${cat} (${cantidad(cat)})`}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="buscarArticulo" className="form-label text-sm">Buscar por nombre o marca</label>
          <div className="flex gap-2">
            <input
              id="buscarArticulo"
              type="search"
              className="form-input"
              placeholder="Ej: Leche"
              value={busqueda}
              onChange={(e) => onBuscar(e.target.value)}
            />
            {busqueda && (
              <button type="button" className="btn btn-secondary" onClick={() => onBuscar('')}>
                Limpiar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
