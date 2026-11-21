import React from 'react';
import { ScreenId } from '../../types';
import { PlantillaEstado } from './PlantillaEstado';

interface Props {
  onNavigate: (s: ScreenId) => void;
}

export const EstadoErrorConexion: React.FC<Props> = ({ onNavigate }) => (
  <PlantillaEstado
    header="Mapa de incidencias"
    badgeBg="var(--dangersoft)"
    icon="/assets/state-err-conn.svg"
    title="Sin conexión a internet"
    desc="Revisa tu conexión y vuelve a intentar."
    primaryLabel="Reintentar"
    primaryTarget="mapa"
    secondaryLabel="Ir al inicio"
    secondaryTarget="inicio"
    onNavigate={onNavigate}
  />
);
