import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface Props {
  onNavigate: (s: ScreenId) => void;
}

export const PrivacySecurityPage: React.FC<Props> = ({ onNavigate }) => {
  const [privAnon, setPrivAnon] = useState(true);
  const [privShare, setPrivShare] = useState(false);

  return (
    <div className="page-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={() => onNavigate('perfil')}
          style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
        </button>
        <h1 className="t-24" style={{ fontWeight: 700 }}>Privacidad y seguridad</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h2 className="t-17" style={{ fontWeight: 700 }}>Privacidad</h2>
        <div className="card-surface" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <span className="t-15" style={{ fontWeight: 600 }}>Enviar reportes de forma anónima</span>
            <button
              type="button"
              onClick={() => setPrivAnon(!privAnon)}
              style={{
                background: privAnon ? 'var(--secondary)' : 'var(--divider)',
                color: privAnon ? '#fff' : 'var(--text2)',
                border: 'none',
                borderRadius: 16,
                padding: '6px 14px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
              className="t-12"
            >
              {privAnon ? 'Activado' : 'Desactivado'}
            </button>
          </div>
          <div style={{ height: 1, background: 'var(--divider)' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <span className="t-15" style={{ fontWeight: 600 }}>Compartir mis datos de contacto</span>
            <button
              type="button"
              onClick={() => setPrivShare(!privShare)}
              style={{
                background: privShare ? 'var(--secondary)' : 'var(--divider)',
                color: privShare ? '#fff' : 'var(--text2)',
                border: 'none',
                borderRadius: 16,
                padding: '6px 14px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
              className="t-12"
            >
              {privShare ? 'Activado' : 'Desactivado'}
            </button>
          </div>
        </div>
        <span className="t-13" style={{ color: 'var(--text2)' }}>
          Tu información personal no se muestra en el mapa.
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h2 className="t-17" style={{ fontWeight: 700 }}>Seguridad</h2>
        <div className="card-surface" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            onClick={() => onNavigate('recuperar')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
          >
            <div>
              <p className="t-15" style={{ fontWeight: 600 }}>Cambiar contraseña</p>
              <p className="t-13" style={{ color: 'var(--text2)' }}>Usa al menos 8 caracteres.</p>
            </div>
            <img src="/assets/chevron-right.svg" alt="" width={22} height={22} />
          </div>
          <div style={{ height: 1, background: 'var(--divider)' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p className="t-15" style={{ fontWeight: 600 }}>Verificación de identidad</p>
              <p className="t-13" style={{ color: 'var(--text2)' }}>Validada con RENIEC.</p>
            </div>
            <span
              className="t-12"
              style={{
                background: 'var(--successsoft)',
                border: '1px solid var(--success)',
                borderRadius: 14,
                padding: '4px 10px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <img src="/assets/alert-check.svg" alt="" width={14} height={14} />
              Verificada
            </span>
          </div>
        </div>
      </div>

      <button className="btn-primary" onClick={() => onNavigate('perfil')}>
        Guardar cambios
      </button>

      {/* Zona de riesgo */}
      <div
        className="card-surface"
        style={{
          border: '1.5px solid var(--danger)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/assets/alert-error.svg" alt="" width={20} height={20} />
          <span className="t-16" style={{ fontWeight: 700, color: 'var(--danger)' }}>Zona de riesgo</span>
        </div>
        <p className="t-14">
          Al eliminar tu cuenta se borran tu perfil y tu historial. Puedes revisar las consecuencias y alternativas antes de confirmar.
        </p>
        <button className="btn-destructive" onClick={() => onNavigate('ap3-eliminar-1')}>
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
};
