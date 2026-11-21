import React from 'react';
import { ScreenId } from '../../types';
import { CatalogoEstados } from './CatalogoEstados';
import { EstadoVacioInicial } from './EstadoVacioInicial';
import { EstadoVacioBusqueda } from './EstadoVacioBusqueda';
import { EstadoVacioHistorial } from './EstadoVacioHistorial';
import { EstadoErrorConexion } from './EstadoErrorConexion';
import { EstadoErrorSistema } from './EstadoErrorSistema';
import { EstadoContenidoNoDisponible } from './EstadoContenidoNoDisponible';
import { EstadoSinPermisos } from './EstadoSinPermisos';
import { EstadoCargaEsqueleto } from './EstadoCargaEsqueleto';

interface Props {
  screen: ScreenId;
  onNavigate: (s: ScreenId) => void;
}

export const SystemStatesPage: React.FC<Props> = ({ screen, onNavigate }) => {
  switch (screen) {
    case 'ap3-catalogo-estados':
      return <CatalogoEstados onNavigate={onNavigate} />;
    case 'ap3-vacio-inicial':
      return <EstadoVacioInicial onNavigate={onNavigate} />;
    case 'ap3-vacio-busqueda':
      return <EstadoVacioBusqueda onNavigate={onNavigate} />;
    case 'ap3-vacio-historial':
      return <EstadoVacioHistorial onNavigate={onNavigate} />;
    case 'ap3-error-conexion':
      return <EstadoErrorConexion onNavigate={onNavigate} />;
    case 'ap3-error-sistema':
      return <EstadoErrorSistema onNavigate={onNavigate} />;
    case 'ap3-contenido-no-disponible':
      return <EstadoContenidoNoDisponible onNavigate={onNavigate} />;
    case 'ap3-sin-permisos':
      return <EstadoSinPermisos onNavigate={onNavigate} />;
    case 'ap3-carga-historial':
    case 'esqueleto-datos-personales':
    case 'esqueleto-privacidad':
    case 'esqueleto-politica':
    case 'esqueleto-enviando':
    case 'esqueleto-mapa':
      return <EstadoCargaEsqueleto screen={screen} onNavigate={onNavigate} />;
    default:
      return null;
  }
};
