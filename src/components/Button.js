import { Link } from 'react-router-dom';

const VARIANTES = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  light: 'btn-light',
  danger: 'btn-danger',
};

const TAMANOS = { sm: 'btn-sm', lg: 'btn-lg' };

// Botón reutilizable con variantes. Si recibe "to" se comporta como enlace de React Router.
export default function Button({ variant = 'primary', size, to, className = '', children, ...props }) {
  const clases = `btn ${VARIANTES[variant]} ${TAMANOS[size] ?? ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={clases} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={clases} {...props}>
      {children}
    </button>
  );
}
