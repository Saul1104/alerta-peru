import React from 'react';
import { ScreenId } from '../../types';

interface Props {
  onNavigate: (s: ScreenId) => void;
}

export const AccountCreatedPage: React.FC<Props> = ({ onNavigate }) => (
  <div className="page-container auth-container" style={{ alignItems: 'center', textAlign: 'center' }}>
    <h1 className="t-24" style={{ fontWeight: 700, alignSelf: 'flex-start' }}>
      Cuenta creada
    </h1>

    <div style={{ width: 96, height: 96, borderRadius: 48, background: 'var(--successsoft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
      <img src="/assets/check-success-lg.svg" alt="" width={44} height={44} />
    </div>

    <h2 className="t-26" style={{ fontWeight: 700 }}>
      ¡Tu cuenta está lista!
    </h2>
    <p className="t-16" style={{ color: 'var(--text2)' }}>
      Ya puedes reportar incidentes, seguir el estado de tus denuncias y recibir avisos.
    </p>

    <div className="alert-box alert-success" style={{ textAlign: 'left' }}>
      <img src="/assets/alert-check.svg" alt="" width={24} height={24} />
      <p className="t-14">
        Tu DNI fue verificado con RENIEC. Tus datos están protegidos (Ley 29733).
      </p>
    </div>

    <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => onNavigate('inicio')}>
      Entrar a la app
    </button>
  </div>
);
