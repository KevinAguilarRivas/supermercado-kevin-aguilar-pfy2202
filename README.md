# NextPixel Market – Gestión de inventario

Sitio web en **React** para gestionar el inventario de un supermercado, **NextPixel Market**. Reutiliza la identidad visual de NextPixel (logo, fuentes Orbitron y Rajdhani, estilo neón, tarjetas y distribución) creada en Desarrollo Frontend I, con una paleta verde cyberpunk adaptada al rubro supermercado. Corresponde a la Experiencia 1 de la asignatura **Desarrollo Frontend II (PFY2202)** de Duoc UC e incluye lo pedido en las semanas 1, 2 y 3.

- **Autor:** Kevin Aguilar
- **Sitio publicado (gh-pages):** https://kevinaguilarrivas.github.io/supermercado-kevin-aguilar-pfy2202/
- **Repositorio:** https://github.com/KevinAguilarRivas/supermercado-kevin-aguilar-pfy2202

## Funcionalidades

| Semana | Funcionalidad |
|---|---|
| S1 | Página de inicio con hero, productos destacados y categorías. **Menú inferior** (en el footer) para ir a *Quiénes somos* y *Nuestras tiendas*, con **React Router**. |
| S2 | **Menú superior** de gestión, **estado global** de artículos (nombre, marca, tipo de producto, precio y stock), **formulario** con validaciones para agregar artículos y **tabla** con todo el inventario. |
| S3 | **Filtro por categoría** (píldoras en escritorio, `select` en móvil) y búsqueda por nombre o marca: se calculan a partir del inventario sin modificar los datos originales. Vista en **tabla o tarjetas**. **Detalle del artículo** en `/inventario/:articuloId`, con botón para agregar al carrito que **descuenta el stock**. **Carrito de compras** con botones **+ / −**, eliminar y vaciar, que **actualizan el inventario general**. |
| Extra | Diseño responsive y persistencia en `localStorage`. |

## Tecnologías

- React 19 (Create React App)
- React Router DOM 7: `HashRouter`, rutas anidadas, parámetros dinámicos, `React.lazy` + `Suspense`
- Context API + `useReducer` para el estado global
- Tailwind CSS 3: tema con la paleta de la marca en `tailwind.config.js`, clases reutilizables con `@apply` y arbitrary values
- gh-pages para la publicación

## Estructura del proyecto

```
src/
├── App.js                      # Solo renderiza AppRoutes
├── index.js                    # HashRouter + InventarioProvider
├── index.css                   # Directivas de Tailwind y clases reutilizables (@apply)
├── routes/AppRoutes.js         # Archivo central de rutas (lazy loading + rutas anidadas)
├── layouts/MainLayout.js       # Header + <Outlet/> + Footer (menú inferior)
├── context/
│   ├── InventarioContext.js    # Estado global: reducer, acciones y hook useInventario()
│   └── inventarioReducer.test.js
├── data/articulos.js           # Categorías, íconos e inventario inicial
├── components/                 # Componentes reutilizables
│   ├── Logo.js  Header.js  Footer.js  NavItem.js  Button.js  PageHeader.js
│   ├── ProductoCard.js  ArticulosTable.js  CategoriaFilter.js  QuantityControl.js
│   └── StockBadge.js  Loader.js  formato.js
└── pages/                      # Una página por ruta
    ├── Home.js  QuienesSomos.js  NuestrasTiendas.js
    ├── Inventario.js  ArticuloDetalle.js  AgregarArticulo.js
    └── Carrito.js  NotFound.js
```

## Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/quienes-somos` | Quiénes somos |
| `/nuestras-tiendas` | Nuestras tiendas |
| `/inventario` | Lista del inventario con filtro por categoría |
| `/inventario/nuevo` | Formulario para agregar un artículo |
| `/inventario/:articuloId` | Detalle del artículo |
| `/carrito` | Carrito de compras |

## Cómo se maneja el estado

El estado global vive en `InventarioContext` y lo administra un `useReducer`:

```js
{ articulos: [...], carrito: [{ id, cantidad }] }
```

Acciones del reducer: `AGREGAR_ARTICULO`, `AGREGAR_AL_CARRITO`, `AUMENTAR_CANTIDAD`, `DISMINUIR_CANTIDAD`, `QUITAR_DEL_CARRITO`, `VACIAR_CARRITO`.

- Cada acción devuelve **copias nuevas** de los arreglos (`map`, `filter`, spread) y nunca modifica el estado anterior.
- Al agregar o aumentar en el carrito se **resta** stock. Al disminuir, quitar o vaciar se **devuelve** al inventario.
- El filtro guarda solo la categoría elegida (`useState`). La lista filtrada se calcula con `useMemo`, así que el inventario original queda intacto.

## Instalación y uso

```bash
npm install
npm start       # http://localhost:3000
npm test        # pruebas del reducer
npm run build   # build de producción
```

## Publicación en GitHub Pages

```bash
npm run deploy
```

Este comando compila el proyecto y sube la carpeta `build` a la rama `gh-pages`. Después, en GitHub ve a **Settings → Pages** y elige la rama `gh-pages` como fuente.
