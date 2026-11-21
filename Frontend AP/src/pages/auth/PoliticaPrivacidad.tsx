import React from 'react';
import { ScreenId } from '../../types';

interface Props {
  onNavigate: (s: ScreenId) => void;
}

const PRIVACY_SECTIONS = [
  {
    title: '1. Qué datos recopilamos',
    text: 'Nombre, DNI, correo y los datos de tus denuncias (tipo, fecha, ubicación aproximada y evidencia opcional).',
  },
  {
    title: '2. Para qué los usamos',
    text: 'Solo para registrar y dar seguimiento a tus reportes. Nunca vendemos tus datos ni los usamos para publicidad.',
  },
  {
    title: '3. Tus derechos (Ley 29733)',
    text: 'Puedes acceder, rectificar, cancelar u oponerte al uso de tus datos desde Privacidad y seguridad.',
  },
  {
    title: '4. Reportes anónimos',
    text: 'Puedes enviar una denuncia sin mostrar tu identidad. Las autoridades solo verán lo que tú autorices.',
  },
  {
    title: '5. Eliminar tu cuenta',
    text: 'Al eliminar tu cuenta borramos tus datos personales. Los reportes enviados se conservan sin identificarte.',
  },
];

export const PrivacyPolicyPage: React.FC<Props> = ({ onNavigate }) => (
  <div className="page-container auth-container">
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        onClick={() => onNavigate('bienvenida')}
        style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
      </button>
      <h1 className="t-24" style={{ fontWeight: 700 }}>
        Política de privacidad
      </h1>
    </div>

    <div className="card-surface" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {PRIVACY_SECTIONS.map((s) => (
        <div key={s.title} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p className="t-16" style={{ fontWeight: 600 }}>
            {s.title}
          </p>
          <p className="t-14" style={{ color: 'var(--text2)' }}>
            {s.text}
          </p>
        </div>
      ))}
    </div>

    <button className="btn-primary" onClick={() => onNavigate('bienvenida')}>
      Entendido
    </button>
  </div>
);
