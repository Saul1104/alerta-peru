import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface Props {
  onNavigate: (s: ScreenId) => void;
}

export const RegisterPage: React.FC<Props> = ({ onNavigate }) => {
  const [regName, setRegName] = useState('María Valdez');
  const [regDni, setRegDni] = useState('45891234');
  const [regEmail, setRegEmail] = useState('maria.valdez@example.com');
  const [regPass, setRegPass] = useState('Alerta2026');
  const [regPass2, setRegPass2] = useState('Alerta2026');
  const [acceptPolicy, setAcceptPolicy] = useState(true);

  return (
    <div className="page-container auth-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={() => onNavigate('bienvenida')}
          style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
        </button>
        <h1 className="t-24" style={{ fontWeight: 700 }}>
          Crear cuenta
        </h1>
      </div>

      <div className="field-group">
        <label className="field-label">Nombre completo</label>
        <div className="field-box">
          <input className="field-input" value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Tu nombre y apellidos" />
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">DNI (obligatorio)</label>
        <div className="field-box">
          <input className="field-input" value={regDni} onChange={(e) => setRegDni(e.target.value)} placeholder="8 dígitos" maxLength={8} />
        </div>
        <span className="field-help">Verificamos tu identidad con RENIEC para evitar denuncias falsas.</span>
      </div>

      <div className="field-group">
        <label className="field-label">Correo electrónico</label>
        <div className="field-box">
          <input type="email" className="field-input" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" />
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">Contraseña</label>
        <div className="field-box">
          <input type="password" className="field-input" value={regPass} onChange={(e) => setRegPass(e.target.value)} placeholder="Escribe tu contraseña" />
        </div>
        <span className="field-help">Usa letras y números.</span>
      </div>

      <div className="field-group">
        <label className="field-label">Confirmar contraseña</label>
        <div className="field-box">
          <input type="password" className="field-input" value={regPass2} onChange={(e) => setRegPass2(e.target.value)} placeholder="Repite tu contraseña" />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, paddingTop: 4 }}>
        <button
          type="button"
          onClick={() => setAcceptPolicy(!acceptPolicy)}
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            background: acceptPolicy ? 'var(--primary)' : 'var(--surface)',
            border: '2px solid var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {acceptPolicy && <img src="/assets/check-white.svg" alt="" width={16} height={16} />}
        </button>
        <p className="t-14">
          Acepto la{' '}
          <span
            onClick={() => onNavigate('politica-privacidad')}
            style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
          >
            Política de privacidad
          </span>{' '}
          y el tratamiento de mis datos personales (Ley 29733).
        </p>
      </div>

      <button className="btn-primary" onClick={() => onNavigate('verificar-codigo')}>
        Crear cuenta
      </button>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }} className="t-15">
        <span style={{ color: 'var(--text2)' }}>¿Ya tienes cuenta?</span>
        <button
          onClick={() => onNavigate('login')}
          style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', fontWeight: 700, cursor: 'pointer' }}
          className="t-15"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};
