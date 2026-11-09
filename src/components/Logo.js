import { Link } from 'react-router-dom';

// Logo reutilizable: se usa en el menú superior y en el pie de página
export default function Logo({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="inline-flex items-center gap-2" aria-label="NextPixel Market, ir al inicio">
      <span className="inline-grid h-[38px] w-[38px] place-items-center rounded-[10px] bg-np-accent">
        <img src={`${process.env.PUBLIC_URL}/img/helmet.png`} alt="" width="26" height="26" />
      </span>
      <span className="font-display text-lg font-extrabold text-np-white">
        NextPixel <span className="text-np-accent">Market</span>
      </span>
    </Link>
  );
}
