import React from 'react';
import { ScreenId } from '../types';
import { WelcomePage } from '../pages/auth/Bienvenida';
import { IntroPage } from '../pages/auth/Introduccion';
import { LoginPage } from '../pages/auth/IniciarSesion';
import { RecoverAccountPage } from '../pages/auth/RecuperarCuenta';
import { RegisterPage } from '../pages/auth/CrearCuenta';
import { VerifyCodePage } from '../pages/auth/VerificarCodigo';
import { AccountCreatedPage } from '../pages/auth/CuentaCreada';
import { PrivacyPolicyPage } from '../pages/auth/PoliticaPrivacidad';
import { AccountDeletedPage } from '../pages/auth/CuentaEliminada';

interface AuthProps {
  screen: ScreenId;
  onNavigate: (s: ScreenId) => void;
  onToggleDark?: () => void;
}

export const AuthViews: React.FC<AuthProps> = ({ screen, onNavigate }) => {
  switch (screen) {
    case 'bienvenida':
      return <WelcomePage onNavigate={onNavigate} />;
    case 'intro-1':
      return <IntroPage step={1} onNavigate={onNavigate} />;
    case 'intro-2':
      return <IntroPage step={2} onNavigate={onNavigate} />;
    case 'intro-3':
      return <IntroPage step={3} onNavigate={onNavigate} />;
    case 'login':
      return <LoginPage isError={false} onNavigate={onNavigate} />;
    case 'login-error':
      return <LoginPage isError={true} onNavigate={onNavigate} />;
    case 'recuperar':
    case 'enlace-enviado':
      return <RecoverAccountPage screen={screen} onNavigate={onNavigate} />;
    case 'crear-cuenta':
      return <RegisterPage onNavigate={onNavigate} />;
    case 'verificar-codigo':
      return <VerifyCodePage onNavigate={onNavigate} />;
    case 'cuenta-creada':
      return <AccountCreatedPage onNavigate={onNavigate} />;
    case 'politica-privacidad':
      return <PrivacyPolicyPage onNavigate={onNavigate} />;
    case 'cuenta-eliminada':
      return <AccountDeletedPage onNavigate={onNavigate} />;
    default:
      return null;
  }
};
