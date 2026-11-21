import React from 'react';
import { ScreenId } from '../../types';

interface Props {
  onNavigate: (s: ScreenId) => void;
}

export const AccountDeletedPage: React.FC<Props> = ({ onNavigate }) => (
  <div className="page-container auth-container" style={{ alignItems: 'center', textAlign: 'center' }}>
    <h1 className="t-24" style={{ fontWeight: 700, alignSelf: 'flex-start' }}>
      Cuenta eliminada
    </h1>

    <div style={{ width: 96, height: 96, borderRadius: 48, background: 'var(--secondarysoft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
      <img src="/assets/trash-lg.svg" alt="" width={44} height={44} />
    </div>

    <h2 className="t-24" style={{ fontWeight: 700 }}>
      Tu cuenta fue eliminada
    </h2>
    <p className="t-16" style={{ color: 'var(--text2)' }}>
      Borramos tus datos personales. Los reportes ya enviados se conservan de forma anónima.
    </p>

    <div className="alert-box alert-info" style={{ textAlign: 'left' }}>
      <img src="/assets/alert-info.svg" alt="" width={24} height={24} />
      <p className="t-14">Si quieres volver, puedes crear una cuenta nueva cuando quieras.</p>
    </div>

    <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => onNavigate('bienvenida')}>
      Volver a la bienvenida
    </button>
  </div>
);
