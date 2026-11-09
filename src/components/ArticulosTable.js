import { useNavigate } from 'react-router-dom';
import StockBadge from './StockBadge';
import { formatoCLP } from './formato';

// Tabla del inventario. Al hacer clic en una fila se abre el detalle del artículo.
export default function ArticulosTable({ articulos }) {
  const navigate = useNavigate();
  const verDetalle = (id) => navigate(`/inventario/${id}`);

  return (
    <div className="overflow-x-auto rounded-np border border-np-border bg-np-surface">
      <table className="min-w-full text-left">
        <thead className="border-b border-np-border bg-np-bg-alt text-sm uppercase tracking-[0.06em] text-np-cyan">
          <tr>
            <th scope="col" className="hidden px-4 py-3 sm:table-cell">#</th>
            <th scope="col" className="px-4 py-3">Nombre</th>
            <th scope="col" className="hidden px-4 py-3 sm:table-cell">Marca</th>
            <th scope="col" className="hidden px-4 py-3 md:table-cell">Tipo de producto</th>
            <th scope="col" className="px-4 py-3 text-right">Precio</th>
            <th scope="col" className="px-4 py-3 text-center">Stock</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-np-border">
          {articulos.map((a) => (
            <tr
              key={a.id}
              onClick={() => verDetalle(a.id)}
              onKeyDown={(e) => e.key === 'Enter' && verDetalle(a.id)}
              tabIndex={0}
              className="cursor-pointer transition hover:bg-np-surface-alt focus:bg-np-surface-alt focus:outline-none"
              title="Ver detalle"
            >
              <td className="hidden px-4 py-3 text-np-muted sm:table-cell">{a.id}</td>
              <td className="px-4 py-3 font-semibold">
                {a.nombre}
                <span className="block text-sm font-normal text-np-muted sm:hidden">{a.marca}</span>
              </td>
              <td className="hidden px-4 py-3 text-np-muted sm:table-cell">{a.marca}</td>
              <td className="hidden px-4 py-3 text-np-muted md:table-cell">{a.categoria}</td>
              <td className="px-4 py-3 text-right font-display text-sm font-bold tabular-nums">{formatoCLP(a.precio)}</td>
              <td className="px-4 py-3 text-center"><StockBadge stock={a.stock} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
