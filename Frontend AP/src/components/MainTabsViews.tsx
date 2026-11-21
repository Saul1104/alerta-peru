import React, { useState } from 'react';
import { AccessibilityState, ModalType, ScreenId } from '../types';
import { HomePage } from '../pages/home/Inicio';
import { MapPage } from '../pages/map/MapaIncidencias';
import { ProfilePage } from '../pages/profile/MiPerfil';
import { PersonalDataPage } from '../pages/profile/DatosPersonales';
import { ReportHistoryPage } from '../pages/profile/HistorialReportes';
import { PrivacySecurityPage } from '../pages/profile/PrivacidadSeguridad';
import { AccessibilityPage } from '../pages/profile/Accesibilidad';
import { DeleteAccountFlowPage } from '../pages/profile/EliminarCuenta';
import { SystemStatesPage } from '../pages/states/EstadosSistema';

interface Props {
  screen: ScreenId;
  acc: AccessibilityState;
  setAcc: React.Dispatch<React.SetStateAction<AccessibilityState>>;
  onNavigate: (s: ScreenId) => void;
  onOpenModal: (m: ModalType) => void;
}

export const MainTabsViews: React.FC<Props> = ({
  screen,
  acc,
  setAcc,
  onNavigate,
  onOpenModal,
}) => {
  const [profile, setProfile] = useState({
    name: 'María Valdez',
    district: 'Miraflores, Lima',
    email: 'maria.valdez@example.com',
    phone: '+51 999 000 000',
  });

  switch (screen) {
    case 'inicio':
      return <HomePage setAcc={setAcc} onNavigate={onNavigate} onOpenModal={onOpenModal} />;
    case 'mapa':
      return <MapPage onNavigate={onNavigate} />;
    case 'perfil':
      return <ProfilePage profile={profile} setAcc={setAcc} onNavigate={onNavigate} onOpenModal={onOpenModal} />;
    case 'datos-personales':
      return <PersonalDataPage profile={profile} setProfile={setProfile} onNavigate={onNavigate} />;
    case 'historial':
      return <ReportHistoryPage onNavigate={onNavigate} />;
    case 'privacidad-seguridad':
      return <PrivacySecurityPage onNavigate={onNavigate} />;
    case 'accesibilidad':
      return <AccessibilityPage acc={acc} setAcc={setAcc} onNavigate={onNavigate} />;
    case 'ap3-eliminar-1':
    case 'ap3-eliminar-2':
    case 'eliminar-cuenta':
    case 'ap3-eliminar-4':
      return <DeleteAccountFlowPage screen={screen} onNavigate={onNavigate} />;
    default:
      return <SystemStatesPage screen={screen} onNavigate={onNavigate} />;
  }
};
