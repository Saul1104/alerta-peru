import React from 'react';
import { ScreenId } from '../../types';
import { PlantillaEstado } from './PlantillaEstado';

interface Props {
  onNavigate: (s: ScreenId) => void;
}

export const EstadoVacioHistorial: React.FC<Props> = ({ onNavigate }) => (
  <PlantillaEstado
    header="Historial de reportes"
    badgeBg="var(--secondarysoft)"
    icon="/assets/state-empty-hist.svg"
    title="Aún no tienes reportes"
    desc="Cuando envíes tu primera denuncia podrás seguirla aquí."
    primaryLabel="Hacer mi primera denuncia"
    primaryTarget="denuncia-paso-1"
    onNavigate={onNavigate}
  />
);
