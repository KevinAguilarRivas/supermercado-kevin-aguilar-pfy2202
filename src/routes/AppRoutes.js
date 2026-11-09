import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Loader from '../components/Loader';

// Lazy loading: cada página se descarga solo cuando se visita su ruta
const Home = lazy(() => import('../pages/Home'));
const QuienesSomos = lazy(() => import('../pages/QuienesSomos'));
const NuestrasTiendas = lazy(() => import('../pages/NuestrasTiendas'));
const Inventario = lazy(() => import('../pages/Inventario'));
const ArticuloDetalle = lazy(() => import('../pages/ArticuloDetalle'));
const AgregarArticulo = lazy(() => import('../pages/AgregarArticulo'));
const Carrito = lazy(() => import('../pages/Carrito'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Archivo central de rutas de la aplicación
export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          {/* Páginas informativas (menú inferior - semana 1) */}
          <Route path="quienes-somos" element={<QuienesSomos />} />
          <Route path="nuestras-tiendas" element={<NuestrasTiendas />} />

          {/* Gestión de inventario (menú superior - semanas 2 y 3) */}
          <Route path="inventario">
            <Route index element={<Inventario />} />
            <Route path="nuevo" element={<AgregarArticulo />} />
            <Route path=":articuloId" element={<ArticuloDetalle />} />
          </Route>
          <Route path="carrito" element={<Carrito />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
