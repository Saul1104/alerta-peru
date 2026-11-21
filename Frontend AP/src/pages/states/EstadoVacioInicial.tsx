import React from 'react';
import { ScreenId } from '../../types';
import { PlantillaEstado } from './PlantillaEstado';

interface Props {
  onNavigate: (s: ScreenId) => void;
}

export const EstadoVacioInicial: React.FC<Props> = ({ onNavigate }) => (
  <PlantillaEstado
    header="Inicio"
    badgeBg="var(--secondarysoft)"
    icon="/assets/state-empty-init.svg"
    title="Aún no hay alertas cerca de ti"
    desc="Cuando alguien reporte un incidente en tu zona, lo verás aquí."
    primaryLabel="Reportar un incidente"
    primaryTarget="denuncia-paso-1"
    onNavigate={onNavigate}
  />
);
