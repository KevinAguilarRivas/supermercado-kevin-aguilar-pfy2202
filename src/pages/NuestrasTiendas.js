import PageHeader from '../components/PageHeader';

const TIENDAS = [
  { nombre: 'NextPixel Market Centro', direccion: 'Av. Libertador Bernardo O’Higgins 1234, Santiago', horario: 'Lun a Dom · 08:00 – 22:00', telefono: '+56 2 2345 6789' },
  { nombre: 'NextPixel Market Providencia', direccion: 'Av. Providencia 1234, Providencia', horario: 'Lun a Dom · 08:30 – 22:00', telefono: '+56 2 2456 7890' },
  { nombre: 'NextPixel Market Maipú', direccion: 'Av. Pajaritos 3456, Maipú', horario: 'Lun a Sáb · 09:00 – 21:00', telefono: '+56 2 2567 8901' },
  { nombre: 'NextPixel Market La Florida', direccion: 'Av. Vicuña Mackenna 7110, La Florida', horario: 'Lun a Dom · 08:00 – 21:30', telefono: '+56 2 2678 9012' },
];

export default function NuestrasTiendas() {
  return (
    <section className="section">
      <div className="container-app">
        <PageHeader title="Nuestras tiendas" subtitle="Encuentra la sucursal más cercana a ti." />

        <div className="grid gap-5 sm:grid-cols-2">
          {TIENDAS.map((t) => (
            <article key={t.nombre} className="panel transition hover:-translate-y-1 hover:border-np-accent/50 hover:shadow-glow">
              <h2 className="mb-4 text-lg">{t.nombre}</h2>
              <dl>
                <dt className="dato-titulo">Dirección</dt>
                <dd className="dato-valor">{t.direccion}</dd>
                <dt className="dato-titulo">Horario</dt>
                <dd className="dato-valor">{t.horario}</dd>
                <dt className="dato-titulo">Teléfono</dt>
                <dd className="dato-valor !mb-0">{t.telefono}</dd>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
