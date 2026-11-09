// Etiqueta de color según la cantidad disponible
export default function StockBadge({ stock }) {
  let estilo = 'border-np-cyan/40 bg-np-cyan/10 text-np-cyan';
  let texto = `${stock} disp.`;

  if (stock === 0) {
    estilo = 'border-red-500/40 bg-red-500/10 text-red-300';
    texto = 'Agotado';
  } else if (stock <= 5) {
    estilo = 'border-amber-400/40 bg-amber-400/10 text-amber-300';
    texto = `¡Quedan ${stock}!`;
  }

  return (
    <span className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-0.5 text-sm font-semibold ${estilo}`}>
      {texto}
    </span>
  );
}
