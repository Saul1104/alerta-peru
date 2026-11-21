import React from 'react';
import { ScreenId } from '../../types';

interface Props {
  onNavigate: (s: ScreenId) => void;
}

export const WelcomePage: React.FC<Props> = ({ onNavigate }) => (
  <div className="page-container auth-container" style={{ position: 'relative' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: 12 }}>
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 28,
          background: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src="/assets/shield-check-lg.svg" alt="Logo Alerta Perú" width={56} height={56} />
      </div>
      <h1 className="t-32" style={{ fontWeight: 700, textAlign: 'center' }}>
        Alerta Perú
      </h1>
      <p className="t-18" style={{ color: 'var(--text2)', textAlign: 'center' }}>
        Reporta. Protege. Actúa.
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '12px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            background: 'var(--accentsoft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <img src="/assets/clock.svg" alt="" width={22} height={22} />
        </div>
        <p className="t-16">Reporta en minutos, paso a paso.</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            background: 'var(--accentsoft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <img src="/assets/lock.svg" alt="" width={22} height={22} />
        </div>
        <p className="t-16">Puedes enviar tu reporte de forma anónima.</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            background: 'var(--accentsoft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <img src="/assets/eye.svg" alt="" width={22} height={22} />
        </div>
        <p className="t-16">Sigue el estado de cada reporte.</p>
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
      <button className="btn-primary" onClick={() => onNavigate('login')}>
        Iniciar sesión
      </button>
      <button className="btn-secondary" onClick={() => onNavigate('crear-cuenta')}>
        Crear cuenta
      </button>
      <p
        className="t-13"
        style={{ color: 'var(--text2)', textAlign: 'center', cursor: 'pointer', textDecoration: 'underline' }}
        onClick={() => onNavigate('politica-privacidad')}
      >
        Al continuar aceptas la Política de privacidad y el tratamiento de tus datos personales.
      </p>
    </div>
  </div>
);
