import { ACTIONS, inventarioReducer } from './InventarioContext';

const base = {
  articulos: [
    { id: 1, nombre: 'Arroz', marca: 'Tucapel', categoria: 'Abarrotes', precio: 1000, stock: 5 },
    { id: 2, nombre: 'Leche', marca: 'Colun', categoria: 'Lácteos', precio: 1200, stock: 1 },
  ],
  carrito: [],
};

test('agregar al carrito descuenta stock del inventario', () => {
  const s = inventarioReducer(base, { type: ACTIONS.AGREGAR_AL_CARRITO, payload: { id: 1, cantidad: 3 } });
  expect(s.articulos[0].stock).toBe(2);
  expect(s.carrito).toEqual([{ id: 1, cantidad: 3 }]);
  expect(base.articulos[0].stock).toBe(5); // el estado original no se muta
});

test('no permite agregar más que el stock disponible', () => {
  const s = inventarioReducer(base, { type: ACTIONS.AGREGAR_AL_CARRITO, payload: { id: 2, cantidad: 2 } });
  expect(s).toBe(base);
});

test('aumentar y disminuir en el carrito actualiza el inventario', () => {
  let s = inventarioReducer(base, { type: ACTIONS.AGREGAR_AL_CARRITO, payload: { id: 1, cantidad: 1 } });
  s = inventarioReducer(s, { type: ACTIONS.AUMENTAR_CANTIDAD, payload: 1 });
  expect(s.carrito[0].cantidad).toBe(2);
  expect(s.articulos[0].stock).toBe(3);

  s = inventarioReducer(s, { type: ACTIONS.DISMINUIR_CANTIDAD, payload: 1 });
  s = inventarioReducer(s, { type: ACTIONS.DISMINUIR_CANTIDAD, payload: 1 });
  expect(s.carrito).toHaveLength(0); // al llegar a 0 sale del carrito
  expect(s.articulos[0].stock).toBe(5);
});

test('no se puede aumentar si no queda stock', () => {
  let s = inventarioReducer(base, { type: ACTIONS.AGREGAR_AL_CARRITO, payload: { id: 2, cantidad: 1 } });
  const s2 = inventarioReducer(s, { type: ACTIONS.AUMENTAR_CANTIDAD, payload: 2 });
  expect(s2).toBe(s);
});

test('agregar artículo asigna un id nuevo', () => {
  const s = inventarioReducer(base, {
    type: ACTIONS.AGREGAR_ARTICULO,
    payload: { nombre: 'Café', marca: 'X', categoria: 'Abarrotes', precio: 3000, stock: 4 },
  });
  expect(s.articulos).toHaveLength(3);
  expect(s.articulos[2].id).toBe(3);
});
