import React from 'react';
import { AccessibilityState, ModalType, ScreenId } from '../../types';

interface ProfileData {
  name: string;
  district: string;
  email: string;
  phone: string;
}

interface Props {
  profile: ProfileData;
  setAcc: React.Dispatch<React.SetStateAction<AccessibilityState>>;
  onNavigate: (s: ScreenId) => void;
  onOpenModal: (m: ModalType) => void;
}

export const ProfilePage: React.FC<Props> = ({
  profile,
  setAcc,
  onNavigate,
  onOpenModal,
}) => {
  const profileLinks = [
    {
      title: 'Datos personales',
      desc: 'Consulta y edita tu información',
      icon: '/assets/user-profile.svg',
      target: 'datos-personales' as ScreenId,
    },
    {
      title: 'Historial de reportes',
      desc: 'Consulta el estado de tus reportes',
      icon: '/assets/file-profile.svg',
      target: 'historial' as ScreenId,
    },
    {
      title: 'Privacidad y seguridad',
      desc: 'Contraseña y protección de datos',
      icon: '/assets/lock-profile.svg',
      target: 'privacidad-seguridad' as ScreenId,
    },
    {
      title: 'Accesibilidad',
      desc: 'Daltonismo y contraste',
      icon: '/assets/access-profile.svg',
      target: 'accesibilidad' as ScreenId,
    },
  ];

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="t-24" style={{ fontWeight: 700 }}>Mi perfil</h1>
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

      <div className="card-surface" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            background: 'var(--primary)',
            color: 'var(--onprimary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          MV
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p className="t-18" style={{ fontWeight: 700 }}>{profile.name}</p>
          <p className="t-14" style={{ color: 'var(--text2)' }}>{profile.district}</p>
          <div
            style={{
              alignSelf: 'flex-start',
              background: 'var(--successsoft)',
              border: '1px solid var(--success)',
              borderRadius: 14,
              padding: '3px 10px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <img src="/assets/shield-verified.svg" alt="" width={14} height={14} />
            <span className="t-12" style={{ fontWeight: 600 }}>Cuenta verificada</span>
          </div>
        </div>
      </div>

      <div className="card-surface" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span className="t-14" style={{ color: 'var(--text2)', width: 80 }}>Correo</span>
          <span className="t-15" style={{ fontWeight: 600 }}>{profile.email}</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span className="t-14" style={{ color: 'var(--text2)', width: 80 }}>Teléfono</span>
          <span className="t-15" style={{ fontWeight: 600 }}>{profile.phone}</span>
        </div>
      </div>

      <div className="card-surface" style={{ padding: 0, overflow: 'hidden' }}>
        {profileLinks.map((lnk, idx) => (
          <React.Fragment key={lnk.title}>
            <button
              type="button"
              onClick={() => onNavigate(lnk.target)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
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
                <img src={lnk.icon} alt="" width={22} height={22} />
              </div>
              <div style={{ flex: 1 }}>
                <p className="t-16" style={{ fontWeight: 600 }}>{lnk.title}</p>
                <p className="t-13" style={{ color: 'var(--text2)' }}>{lnk.desc}</p>
              </div>
              <img src="/assets/chevron-right.svg" alt="" width={22} height={22} />
            </button>
            {idx < profileLinks.length - 1 && <div style={{ height: 1, background: 'var(--divider)' }} />}
          </React.Fragment>
        ))}
      </div>

      <button className="btn-secondary" onClick={() => onOpenModal('cerrar-sesion')}>
        Cerrar sesión
      </button>

      <p className="t-13" style={{ color: 'var(--text2)', textAlign: 'center' }}>
        Tu información personal no se muestra en el mapa. Alerta Perú · Reporta. Protege. Actúa.
      </p>
    </div>
  );
};
