// Categorías (tipo de producto) disponibles en el supermercado
export const CATEGORIAS = [
  'Abarrotes',
  'Lácteos',
  'Bebidas',
  'Frutas y verduras',
  'Limpieza',
  'Panadería',
];

// Ícono que se muestra en la portada de la tarjeta según la categoría
export const ICONOS_CATEGORIA = {
  Abarrotes: '🍝',
  Lácteos: '🥛',
  Bebidas: '🧃',
  'Frutas y verduras': '🥕',
  Limpieza: '🧴',
  Panadería: '🍞',
};

// Inventario inicial: se usa cuando no hay datos guardados en el navegador
export const ARTICULOS_INICIALES = [
  { id: 1, nombre: 'Arroz grado 1 (1 kg)', marca: 'Tucapel', categoria: 'Abarrotes', precio: 1590, stock: 25 },
  { id: 2, nombre: 'Fideos spaghetti (400 g)', marca: 'Carozzi', categoria: 'Abarrotes', precio: 990, stock: 40 },
  { id: 3, nombre: 'Aceite vegetal (1 L)', marca: 'Belmont', categoria: 'Abarrotes', precio: 2890, stock: 18 },
  { id: 4, nombre: 'Leche entera (1 L)', marca: 'Colun', categoria: 'Lácteos', precio: 1150, stock: 30 },
  { id: 5, nombre: 'Yogur natural (4 un.)', marca: 'Soprole', categoria: 'Lácteos', precio: 1990, stock: 12 },
  { id: 6, nombre: 'Queso gauda laminado (250 g)', marca: 'Colun', categoria: 'Lácteos', precio: 3290, stock: 4 },
  { id: 7, nombre: 'Agua mineral sin gas (1,6 L)', marca: 'Benedictino', categoria: 'Bebidas', precio: 890, stock: 50 },
  { id: 8, nombre: 'Jugo de naranja (1 L)', marca: 'Watts', categoria: 'Bebidas', precio: 1390, stock: 20 },
  { id: 9, nombre: 'Plátanos (1 kg)', marca: 'Granel', categoria: 'Frutas y verduras', precio: 1290, stock: 35 },
  { id: 10, nombre: 'Tomates (1 kg)', marca: 'Granel', categoria: 'Frutas y verduras', precio: 1490, stock: 22 },
  { id: 11, nombre: 'Detergente líquido (3 L)', marca: 'Omo', categoria: 'Limpieza', precio: 8990, stock: 10 },
  { id: 12, nombre: 'Lavalozas (750 ml)', marca: 'Quix', categoria: 'Limpieza', precio: 1890, stock: 15 },
  { id: 13, nombre: 'Pan de molde blanco', marca: 'Ideal', categoria: 'Panadería', precio: 2490, stock: 14 },
];
