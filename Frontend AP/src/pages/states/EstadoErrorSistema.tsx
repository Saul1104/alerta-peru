import React from 'react';
import { ScreenId } from '../../types';
import { PlantillaEstado } from './PlantillaEstado';

interface Props {
  onNavigate: (s: ScreenId) => void;
}

export const EstadoErrorSistema: React.FC<Props> = ({ onNavigate }) => (
  <PlantillaEstado
    header="Historial de reportes"
    badgeBg="var(--dangersoft)"
    icon="/assets/state-err-sys.svg"
    title="Algo salió mal de nuestro lado"
    desc="Lo sentimos. Intenta de nuevo o escríbenos a ayuda@alertaperu.pe."
    primaryLabel="Reintentar"
    primaryTarget="historial"
    secondaryLabel="Contactar a soporte"
    secondaryTarget="mailing"
    onNavigate={onNavigate}
  />
);
