import React from 'react';
import { ScreenId } from '../../types';
import { PlantillaEstado } from './PlantillaEstado';

interface Props {
  onNavigate: (s: ScreenId) => void;
}

export const EstadoVacioBusqueda: React.FC<Props> = ({ onNavigate }) => (
  <PlantillaEstado
    header="Mapa de incidencias"
    badgeBg="var(--secondarysoft)"
    icon="/assets/state-empty-search.svg"
    title="No encontramos incidentes en esa zona"
    desc="Revisa el nombre de la zona o quita los filtros."
    primaryLabel="Quitar filtros"
    primaryTarget="mapa"
    secondaryLabel="Buscar otra zona"
    secondaryTarget="mapa"
    onNavigate={onNavigate}
  />
);
