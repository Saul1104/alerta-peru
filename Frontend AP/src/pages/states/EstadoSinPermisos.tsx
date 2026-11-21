import React from 'react';
import { ScreenId } from '../../types';
import { PlantillaEstado } from './PlantillaEstado';

interface Props {
  onNavigate: (s: ScreenId) => void;
}

export const EstadoSinPermisos: React.FC<Props> = ({ onNavigate }) => (
  <PlantillaEstado
    header="Historial de reportes"
    badgeBg="var(--warnsoft)"
    icon="/assets/state-noperm.svg"
    title="Tu sesión terminó"
    desc="Por seguridad cerramos tu sesión. Inicia sesión para ver tus reportes."
    primaryLabel="Iniciar sesión"
    primaryTarget="login"
    onNavigate={onNavigate}
  />
);
