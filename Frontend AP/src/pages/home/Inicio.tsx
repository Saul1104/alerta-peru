import React from 'react';
import { AccessibilityState, ModalType, ScreenId } from '../../types';

const EMERGENCY_CONTACTS = [
  {
    id: 'llamar-105' as ModalType,
    name: 'Policía Nacional',
    desc: 'Delitos y seguridad',
    number: '105',
    icon: '/assets/em-shield.svg',
  },
  {
    id: 'llamar-106' as ModalType,
    name: 'SAMU',
    desc: 'Emergencias médicas',
    number: '106',
    icon: '/assets/em-heart-pulse.svg',
  },
  {
    id: 'llamar-115' as ModalType,
    name: 'Defensa Civil',
    desc: 'Desastres y riesgos',
    number: '115',
    icon: '/assets/em-alert-tri.svg',
  },
  {
    id: 'llamar-116' as ModalType,
    name: 'Bomberos',
    desc: 'Incendios y rescates',
    number: '116',
    icon: '/assets/em-flame.svg',
  },
];

interface Props {
  setAcc: React.Dispatch<React.SetStateAction<AccessibilityState>>;
  onNavigate: (s: ScreenId) => void;
  onOpenModal: (m: ModalType) => void;
}

export const HomePage: React.FC<Props> = ({ setAcc, onNavigate, onOpenModal }) => (
  <div className="page-container">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 className="t-24" style={{ fontWeight: 700 }}>Inicio</h1>
      <button
        onClick={() => setAcc((p) => ({ ...p, darkMode: !p.darkMode }))}
        title="Cambiar tema claro/oscuro"
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <img src="/assets/moon.svg" alt="Cambiar tema" width={22} height={22} />
      </button>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h2 className="t-22" style={{ fontWeight: 700 }}>Bienvenido a Alerta Perú</h2>
      <p className="t-15" style={{ color: 'var(--text2)' }}>
        Reporta un hecho de forma rápida y segura.
      </p>
    </div>

    <div className="responsive-grid-2">
      <button className="btn-primary" onClick={() => onNavigate('denuncia-paso-1')}>
        Nueva denuncia
      </button>
      <button className="btn-secondary" onClick={() => onNavigate('historial')}>
        Mi historial de reportes
      </button>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div>
        <h3 className="t-18" style={{ fontWeight: 700 }}>Contactos de emergencia</h3>
        <p className="t-14" style={{ color: 'var(--text2)' }}>Toca un contacto para llamar.</p>
      </div>

      <div className="responsive-grid-2">
        {EMERGENCY_CONTACTS.map((c) => (
          <button
            key={c.number}
            type="button"
            onClick={() => onOpenModal(c.id)}
            className="card-bordered"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              minHeight: 68,
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                background: 'var(--secondarysoft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <img src={c.icon} alt="" width={22} height={22} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="t-16" style={{ fontWeight: 600 }}>{c.name}</p>
              <p className="t-13" style={{ color: 'var(--text2)' }}>{c.desc}</p>
            </div>
            <span className="t-24" style={{ fontWeight: 700, color: 'var(--secondary)' }}>
              {c.number}
            </span>
          </button>
        ))}
      </div>
    </div>
  </div>
);
