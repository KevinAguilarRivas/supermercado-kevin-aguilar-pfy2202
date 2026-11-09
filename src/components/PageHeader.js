// Encabezado de sección reutilizable (mismo estilo "section-head" de NextPixel)
export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="section-head flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}
