import { useState } from 'react';
import Logo from './Logo';
import NavItem from './NavItem';
import { useInventario } from '../context/InventarioContext';

// Menú superior: navegación de gestión del inventario
export default function Header() {
  const { totalUnidades } = useInventario();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cerrar = () => setMenuAbierto(false);

  const links = (
    <>
      <NavItem to="/" end onClick={cerrar}>Inicio</NavItem>
      <NavItem to="/inventario" end onClick={cerrar}>Inventario</NavItem>
      <NavItem to="/inventario/nuevo" onClick={cerrar}>Agregar artículo</NavItem>
      <NavItem to="/carrito" onClick={cerrar}>
        Carrito
        <span className="ml-1.5 rounded-full bg-np-accent px-2 py-0.5 text-xs font-bold text-white">{totalUnidades}</span>
      </NavItem>
    </>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-np-border bg-np-bg/90 backdrop-blur-md">
      <nav className="container-app" aria-label="Navegación principal">
        <div className="flex h-16 items-center justify-between">
          <Logo onClick={cerrar} />

          <div className="hidden items-center gap-1 lg:flex">{links}</div>

          <button
            type="button"
            className="btn btn-secondary btn-sm lg:hidden"
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            aria-label="Abrir menú de navegación"
            onClick={() => setMenuAbierto((v) => !v)}
          >
            <span aria-hidden="true" className="text-xl leading-none">☰</span>
          </button>
        </div>

        {menuAbierto && (
          <div id="menu-movil" className="flex flex-col pb-3 lg:hidden">
            {links}
          </div>
        )}
      </nav>
    </header>
  );
}
