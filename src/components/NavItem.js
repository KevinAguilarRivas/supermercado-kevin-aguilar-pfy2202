import { NavLink } from 'react-router-dom';

// Enlace de navegación que resalta automáticamente la ruta activa
export default function NavItem({ to, end, onClick, className = 'nav-link', activeClassName = 'nav-link-active', children }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) => `${className} ${isActive ? activeClassName : ''}`}
    >
      {children}
    </NavLink>
  );
}
