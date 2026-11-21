import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface Props {
  isError: boolean;
  onNavigate: (s: ScreenId) => void;
}

export const LoginPage: React.FC<Props> = ({ isError, onNavigate }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="page-container auth-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => onNavigate('bienvenida')}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src="/assets/shield-check-sm.svg" alt="Alerta Perú" width={28} height={28} />
        </div>
        <span className="t-22" style={{ fontWeight: 700 }}>
          Alerta Perú
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h1 className="t-28" style={{ fontWeight: 700 }}>
          Iniciar sesión
        </h1>
        <p className="t-15" style={{ color: 'var(--text2)' }}>
          Ingresa para hacer seguimiento a tus reportes.
        </p>
      </div>

      {isError && (
        <div className="alert-box alert-error">
          <img src="/assets/alert-error.svg" alt="" width={24} height={24} />
          <p className="t-14">
            El correo o la contraseña no coinciden. Verifica tus datos o recupera tu cuenta.
          </p>
        </div>
      )}

      <div className="field-group">
        <label className="field-label">Correo electrónico</label>
        <div className={`field-box ${isError ? 'error' : ''}`}>
          <input
            type="email"
            className="field-input"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
          />
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">Contraseña</label>
        <div className={`field-box ${isError ? 'error' : ''}`}>
          <input
            type={showPass ? 'text' : 'password'}
            className="field-input"
            value={loginPass}
            onChange={(e) => setLoginPass(e.target.value)}
            placeholder="Escribe tu contraseña"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
            className="t-14"
          >
            {showPass ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => onNavigate('recuperar')}
          style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
          className="t-15"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <button className="btn-primary" onClick={() => onNavigate('intro-1')}>
        Iniciar sesión
      </button>

      <p className="t-15" style={{ color: 'var(--text2)', textAlign: 'center' }}>
        o
      </p>

      <button className="btn-secondary" onClick={() => onNavigate('verificar-codigo')}>
        Continuar con teléfono
      </button>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, paddingTop: 4 }} className="t-15">
        <span style={{ color: 'var(--text2)' }}>¿No tienes cuenta?</span>
        <button
          onClick={() => onNavigate('crear-cuenta')}
          style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', fontWeight: 700, cursor: 'pointer' }}
          className="t-15"
        >
          Crear cuenta
        </button>
      </div>
    </div>
  );
};
