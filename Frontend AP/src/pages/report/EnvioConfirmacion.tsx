import React from 'react';
import { ScreenId } from '../../types';

interface Props {
  screen: 'enviando-denuncia' | 'confirmacion';
  onNavigate: (s: ScreenId) => void;
}

export const ReportSubmissionPage: React.FC<Props> = ({ screen, onNavigate }) => {
  if (screen === 'enviando-denuncia') {
    return (
      <div className="page-container auth-container" style={{ alignItems: 'center', textAlign: 'center' }}>
        <h1 className="t-24" style={{ fontWeight: 700, alignSelf: 'flex-start' }}>Enviando</h1>
        <div style={{ margin: '36px 0 12px' }}>
          <img src="/assets/spinner-lg.svg" alt="Cargando" width={88} height={88} className="spin-icon" />
        </div>
        <h2 className="t-24" style={{ fontWeight: 700 }}>Enviando tu denuncia…</h2>
        <p className="t-16" style={{ color: 'var(--text2)' }}>
          Estamos cifrando y registrando tu reporte. No cierres la aplicación.
        </p>
        <div className="alert-box alert-info" style={{ textAlign: 'left', marginTop: 12 }}>
          <img src="/assets/alert-info.svg" alt="" width={24} height={24} />
          <p className="t-14">Tu denuncia se guarda como borrador si se pierde la conexión.</p>
        </div>
        <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => onNavigate('confirmacion')}>
          Continuar a confirmación
        </button>
      </div>
    );
  }

  return (
    <div className="page-container auth-container" style={{ alignItems: 'center', textAlign: 'center' }}>
      <h1 className="t-24" style={{ fontWeight: 700, alignSelf: 'flex-start' }}>Confirmación</h1>

      <div style={{ width: 80, height: 80, borderRadius: 40, background: 'var(--successsoft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
        <img src="/assets/check-success-lg.svg" alt="" width={44} height={44} />
      </div>

      <h2 className="t-24" style={{ fontWeight: 700 }}>Denuncia enviada</h2>
      <p className="t-15" style={{ color: 'var(--text2)' }}>Tu reporte fue registrado correctamente.</p>

      <div className="card-surface" style={{ width: '100%', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span className="t-13" style={{ color: 'var(--text2)' }}>Código de seguimiento</span>
        <span className="t-28" style={{ fontWeight: 700 }}>AP-2026-0412</span>
      </div>

      <div className="alert-box alert-info" style={{ textAlign: 'left' }}>
        <img src="/assets/alert-info.svg" alt="" width={24} height={24} />
        <p className="t-14">
          Guarda este código para consultar el estado de tu reporte en cualquier momento.
        </p>
      </div>

      <button className="btn-primary" onClick={() => onNavigate('estado-en-revision')}>
        Ver estado del reporte
      </button>
      <button className="btn-secondary" onClick={() => onNavigate('inicio')}>
        Volver al inicio
      </button>
      <button
        type="button"
        onClick={() => onNavigate('denuncia-paso-6')}
        style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', fontWeight: 600, height: 44, cursor: 'pointer' }}
        className="t-15"
      >
        ¿Te equivocaste? Corregir reporte
      </button>
    </div>
  );
};
