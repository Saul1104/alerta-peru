import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface Props {
  onNavigate: (s: ScreenId) => void;
}

export const VerifyCodePage: React.FC<Props> = ({ onNavigate }) => {
  const [otpDigits, setOtpDigits] = useState(['4', '8', '2', '9', '1', '3']);

  return (
    <div className="page-container auth-container" style={{ alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
        <button
          onClick={() => onNavigate('crear-cuenta')}
          style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
        </button>
        <h1 className="t-24" style={{ fontWeight: 700 }}>
          Verifica tu cuenta
        </h1>
      </div>

      <div style={{ width: 80, height: 80, borderRadius: 40, background: 'var(--accentsoft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/assets/mail-lg.svg" alt="" width={36} height={36} />
      </div>

      <h2 className="t-24" style={{ fontWeight: 700, textAlign: 'center' }}>
        Revisa tu correo
      </h2>
      <p className="t-16" style={{ color: 'var(--text2)', textAlign: 'center' }}>
        Enviamos un código de 6 dígitos a ma***@example.com. Ingrésalo para confirmar tu identidad.
      </p>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {otpDigits.map((d, i) => (
          <input
            key={i}
            value={d}
            maxLength={1}
            onChange={(e) => {
              const copy = [...otpDigits];
              copy[i] = e.target.value;
              setOtpDigits(copy);
            }}
            style={{
              width: 48,
              height: 56,
              borderRadius: 12,
              border: '1.5px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text)',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 24,
            }}
          />
        ))}
      </div>

      <p className="t-14" style={{ color: 'var(--text2)' }}>
        Reenviar código en 00:42
      </p>

      <div className="alert-box alert-info">
        <img src="/assets/alert-info.svg" alt="" width={24} height={24} />
        <p className="t-14">Si no lo ves, revisa tu carpeta de spam o correo no deseado.</p>
      </div>

      <button className="btn-primary" onClick={() => onNavigate('cuenta-creada')}>
        Verificar y crear cuenta
      </button>
      <button className="btn-secondary" onClick={() => onNavigate('crear-cuenta')}>
        Cambiar correo
      </button>
    </div>
  );
};
