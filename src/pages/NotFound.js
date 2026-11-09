import Button from '../components/Button';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-app">
        <div className="panel mx-auto max-w-md text-center">
          <p className="bg-np-title bg-clip-text font-display text-6xl font-extrabold text-transparent">404</p>
          <p className="mt-2 text-np-muted">La página que buscas no existe.</p>
          <Button to="/" className="mt-6">Volver al inicio</Button>
        </div>
      </div>
    </section>
  );
}
