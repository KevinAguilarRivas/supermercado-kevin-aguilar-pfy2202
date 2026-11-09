const btnCantidad =
  'px-3 py-1.5 text-lg font-bold text-np-white transition hover:bg-np-surface-alt disabled:cursor-not-allowed disabled:opacity-40';

// Control reutilizable de cantidad: [ − ] valor [ + ]
export default function QuantityControl({ value, onDecrease, onIncrease, disableDecrease, disableIncrease, label }) {
  return (
    <div
      className="inline-flex items-center overflow-hidden rounded-md border border-np-border bg-np-bg-alt"
      role="group"
      aria-label={label}
    >
      <button type="button" onClick={onDecrease} disabled={disableDecrease} className={btnCantidad} aria-label="Disminuir cantidad">
        −
      </button>
      <span className="min-w-[2.75rem] text-center font-display font-bold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" onClick={onIncrease} disabled={disableIncrease} className={btnCantidad} aria-label="Aumentar cantidad">
        +
      </button>
    </div>
  );
}
