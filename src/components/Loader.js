// Indicador de carga mientras se descargan las páginas (lazy loading)
export default function Loader() {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 text-np-muted" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-np-surface-alt border-t-np-accent" />
      <span>Cargando…</span>
    </div>
  );
}
