import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface Props {
  screen: 'recuperar' | 'enlace-enviado';
  onNavigate: (s: ScreenId) => void;
}

export const RecoverAccountPage: React.FC<Props> = ({ screen, onNavigate }) => {
  const [recEmail, setRecEmail] = useState('maria.valdez@example.com');

  if (screen === 'enlace-enviado') {
    return (
      <div className="page-container auth-container" style={{ alignItems: 'center', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, alignSelf: 'stretch' }}>
          <button
            onClick={() => onNavigate('recuperar')}
            style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
          </button>
          <h1 className="t-24" style={{ fontWeight: 700 }}>
            Recuperar cuenta
          </h1>
        </div>

        <div style={{ width: 96, height: 96, borderRadius: 48, background: 'var(--secondarysoft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
          <img src="/assets/send-lg.svg" alt="" width={44} height={44} />
        </div>

        <h2 className="t-24" style={{ fontWeight: 700 }}>
          Te enviamos un enlace
        </h2>
        <p className="t-16" style={{ color: 'var(--text2)' }}>
          Si el correo está registrado, recibirás las instrucciones para crear una nueva contraseña.
        </p>

        <div className="alert-box alert-info" style={{ textAlign: 'left' }}>
          <img src="/assets/alert-info.svg" alt="" width={24} height={24} />
          <p className="t-14">
            El enlace vence en 30 minutos. Por seguridad, no lo compartas con nadie.
          </p>
        </div>

        <button className="btn-primary" onClick={() => onNavigate('login')}>
          Volver a iniciar sesión
        </button>
        <button className="btn-secondary" onClick={() => onNavigate('mailing')}>
          Ver correo enviado (Mailing)
        </button>
      </div>
    );
  }

  return (
    <div className="page-container auth-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={() => onNavigate('login')}
          style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
        </button>
        <h1 className="t-24" style={{ fontWeight: 700 }}>
          Recuperar cuenta
        </h1>
      </div>

      <p className="t-16" style={{ color: 'var(--text2)' }}>
        Ingresa el correo de tu cuenta y te enviaremos un enlace para restablecer tu contraseña.
      </p>

      <div className="field-group">
        <label className="field-label">Correo electrónico</label>
        <div className="field-box">
          <input
            type="email"
            className="field-input"
            value={recEmail}
            onChange={(e) => setRecEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
          />
        </div>
        <span className="field-help">Ej. maria.valdez@example.com</span>
      </div>

      <button className="btn-primary" onClick={() => onNavigate('enlace-enviado')}>
        Enviar enlace de recuperación
      </button>

      <div className="alert-box alert-info">
        <img src="/assets/alert-info.svg" alt="" width={24} height={24} />
        <p className="t-14">
          Revisa tu bandeja de entrada. Si no encuentras el mensaje, revisa también la carpeta de spam o correo no deseado.
        </p>
      </div>

      <button className="btn-secondary" onClick={() => onNavigate('login')}>
        Volver a iniciar sesión
      </button>
    </div>
  );
};
