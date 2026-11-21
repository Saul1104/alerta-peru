import React from 'react';
import { ScreenId } from '../../types';

interface Props {
  onNavigate: (s: ScreenId) => void;
}

const CATALOG_BUTTONS: { label: string; target: ScreenId }[] = [
  { label: 'Vacío inicial · Inicio', target: 'ap3-vacio-inicial' },
  { label: 'Vacío por búsqueda · Mapa', target: 'ap3-vacio-busqueda' },
  { label: 'Vacío por historial · Historial', target: 'ap3-vacio-historial' },
  { label: 'Carga (esqueleto) · Historial', target: 'ap3-carga-historial' },
  { label: 'Error de conexión · Mapa', target: 'ap3-error-conexion' },
  { label: 'Error del sistema · Historial', target: 'ap3-error-sistema' },
  { label: 'Error de validación · Descripción', target: 'ap3-error-validacion' },
  { label: 'Contenido no disponible · Reporte', target: 'ap3-contenido-no-disponible' },
  { label: 'Sin permisos · Sesión expirada', target: 'ap3-sin-permisos' },
  { label: 'Éxito · Confirmación de denuncia', target: 'confirmacion' },
  { label: 'Esqueleto · Datos personales', target: 'esqueleto-datos-personales' },
  { label: 'Esqueleto · Privacidad y seguridad', target: 'esqueleto-privacidad' },
  { label: 'Esqueleto · Política de privacidad', target: 'esqueleto-politica' },
  { label: 'Esqueleto · Enviando denuncia', target: 'esqueleto-enviando' },
  { label: 'Esqueleto · Mapa · Detalle de incidente', target: 'esqueleto-mapa' },
];

export const CatalogoEstados: React.FC<Props> = ({ onNavigate }) => (
  <div className="page-container">
    <h1 className="t-24" style={{ fontWeight: 700 }}>Catálogo de estados (AP3)</h1>
    <p className="t-15" style={{ color: 'var(--text2)' }}>
      Toca un estado para verlo (pantalla · caso de uso).
    </p>

    <div className="responsive-grid-2">
      {CATALOG_BUTTONS.map((b) => (
        <button
          key={b.target}
          className="btn-secondary"
          onClick={() => onNavigate(b.target)}
        >
          {b.label}
        </button>
      ))}
    </div>
  </div>
);
