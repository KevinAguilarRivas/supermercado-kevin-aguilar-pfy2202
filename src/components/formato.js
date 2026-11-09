// Formatea un número como pesos chilenos: 1590 -> "$1.590"
export const formatoCLP = (valor) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
