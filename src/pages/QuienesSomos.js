import PageHeader from '../components/PageHeader';

const VALORES = [
  { titulo: 'Calidad', texto: 'Seleccionamos proveedores que cumplen altos estándares de frescura y seguridad.' },
  { titulo: 'Precios justos', texto: 'Ofrecemos precios competitivos para que tu familia ahorre todos los meses.' },
  { titulo: 'Cercanía', texto: 'Estamos en tu barrio y conocemos lo que necesitan nuestros clientes.' },
];

export default function QuienesSomos() {
  return (
    <section className="section">
      <div className="container-app">
        <PageHeader title="Quiénes somos" subtitle="Conoce la historia y los valores de NextPixel Market." />

        <div className="grid gap-6 lg:grid-cols-3">
          <article className="panel lg:col-span-2">
            <h2 className="mb-2 text-xl">Nuestra historia</h2>
            <p className="leading-relaxed text-np-muted">
              NextPixel Market nació en 2015 como un pequeño almacén de barrio en Santiago. Gracias a la confianza de
              nuestros vecinos, hoy contamos con cuatro sucursales en la Región Metropolitana y un sistema de
              inventario digital que nos permite mantener siempre disponibles los productos que más necesitas.
            </p>
            <h2 className="mb-2 mt-6 text-xl">Misión</h2>
            <p className="leading-relaxed text-np-muted">
              Entregar productos de calidad a precios accesibles, con una experiencia de compra rápida, moderna y amable.
            </p>
          </article>

          <ul className="grid gap-4">
            {VALORES.map((v) => (
              <li key={v.titulo} className="panel border-l-4 !border-l-np-accent !p-5">
                <h3 className="text-base text-np-accent">{v.titulo}</h3>
                <p className="mt-1 text-np-muted">{v.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
