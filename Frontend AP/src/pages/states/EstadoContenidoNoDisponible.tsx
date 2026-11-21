import React from 'react';
import { ScreenId } from '../../types';
import { PlantillaEstado } from './PlantillaEstado';

interface Props {
  onNavigate: (s: ScreenId) => void;
}

export const EstadoContenidoNoDisponible: React.FC<Props> = ({ onNavigate }) => (
  <PlantillaEstado
    header="Reporte"
    badgeBg="var(--warnsoft)"
    icon="/assets/state-unavail.svg"
    title="Este reporte ya no está disponible"
    desc="Fue retirado o ya no existe."
    primaryLabel="Volver al historial"
    primaryTarget="historial"
    onNavigate={onNavigate}
  />
);
