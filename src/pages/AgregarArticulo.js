import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { useInventario } from '../context/InventarioContext';
import { CATEGORIAS } from '../data/articulos';

const FORM_VACIO = { nombre: '', marca: '', categoria: '', precio: '', stock: '' };

function validar(form) {
  const errores = {};
  if (form.nombre.trim().length < 3) errores.nombre = 'El nombre debe tener al menos 3 caracteres.';
  if (!form.marca.trim()) errores.marca = 'La marca es obligatoria.';
  if (!form.categoria) errores.categoria = 'Selecciona un tipo de producto.';
  if (!(Number(form.precio) > 0)) errores.precio = 'Ingresa un precio mayor a 0.';
  if (form.stock === '' || !Number.isInteger(Number(form.stock)) || Number(form.stock) < 0)
    errores.stock = 'Ingresa una cantidad entera igual o mayor a 0.';
  return errores;
}

// Campo de formulario reutilizable (label + input + mensaje de error)
function Campo({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="form-label">{label}</label>
      {children}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}

export default function AgregarArticulo() {
  const { articulos, agregarArticulo } = useInventario();
  const [form, setForm] = useState(FORM_VACIO);
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: undefined }));
  };

  const limpiar = () => {
    setForm(FORM_VACIO);
    setErrores({});
    setExito('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validar(form);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) {
      setExito('');
      return;
    }

    agregarArticulo({
      nombre: form.nombre.trim(),
      marca: form.marca.trim(),
      categoria: form.categoria,
      precio: Number(form.precio),
      stock: Number(form.stock),
    });
    setExito(`"${form.nombre.trim()}" se agregó al inventario.`);
    setForm(FORM_VACIO);
  };

  const ultimos = articulos.slice(-3).reverse();

  return (
    <section className="section">
      <div className="container-app">
        <PageHeader title="Agregar artículo" subtitle="Ingresa un nuevo producto al inventario del supermercado." />

        {/* CSS Grid: información a la izquierda y formulario a la derecha */}
        <div className="grid items-start gap-6 md:grid-cols-[minmax(240px,1fr)_2fr]">
          <aside className="panel">
            <h2 className="mb-4 text-lg">Inventario actual</h2>
            <dl>
              <dt className="dato-titulo">Artículos registrados</dt>
              <dd className="dato-valor">{articulos.length}</dd>
              <dt className="dato-titulo">Últimos agregados</dt>
              <dd className="dato-valor">
                <ul className="mt-1 space-y-1">
                  {ultimos.map((a) => (
                    <li key={a.id}>• {a.nombre}</li>
                  ))}
                </ul>
              </dd>
              <dt className="dato-titulo">Campos obligatorios</dt>
              <dd className="dato-valor !mb-0">Nombre, marca, tipo de producto, precio y cantidad disponible.</dd>
            </dl>
          </aside>

          <form onSubmit={handleSubmit} noValidate className="panel space-y-4">
            <Campo id="nombre" label="Nombre del producto" error={errores.nombre}>
              <input id="nombre" name="nombre" className="form-input" value={form.nombre} onChange={handleChange} placeholder="Ej: Café molido (250 g)" />
            </Campo>

            <div className="grid gap-4 sm:grid-cols-2">
              <Campo id="marca" label="Marca" error={errores.marca}>
                <input id="marca" name="marca" className="form-input" value={form.marca} onChange={handleChange} placeholder="Ej: Nescafé" />
              </Campo>
              <Campo id="categoria" label="Tipo de producto" error={errores.categoria}>
                <select id="categoria" name="categoria" className="form-input" value={form.categoria} onChange={handleChange}>
                  <option value="">Selecciona…</option>
                  {CATEGORIAS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Campo>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Campo id="precio" label="Precio (CLP)" error={errores.precio}>
                <input id="precio" name="precio" type="number" min="1" className="form-input" value={form.precio} onChange={handleChange} placeholder="Ej: 2990" />
              </Campo>
              <Campo id="stock" label="Cantidad disponible" error={errores.stock}>
                <input id="stock" name="stock" type="number" min="0" step="1" className="form-input" value={form.stock} onChange={handleChange} placeholder="Ej: 20" />
              </Campo>
            </div>

            {exito && (
              <div className="alert-ok" role="status">
                ✔ {exito}
                <Button to="/inventario" variant="secondary" size="sm">Ver inventario</Button>
              </div>
            )}

            <div className="flex flex-wrap justify-end gap-2 pt-2">
              <Button variant="secondary" onClick={limpiar}>Limpiar</Button>
              <Button type="submit">Guardar artículo</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
