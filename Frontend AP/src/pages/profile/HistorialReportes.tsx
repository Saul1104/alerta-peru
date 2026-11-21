import React from 'react';
import { ScreenId } from '../../types';

interface Props {
  onNavigate: (s: ScreenId) => void;
}

export const ReportHistoryPage: React.FC<Props> = ({ onNavigate }) => (
  <div className="page-container">
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        onClick={() => onNavigate('perfil')}
        style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
      </button>
      <h1 className="t-24" style={{ fontWeight: 700 }}>Historial de reportes</h1>
    </div>

    <p className="t-15" style={{ color: 'var(--text2)' }}>
      Consulta el estado de cada reporte que has creado.
    </p>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span className="t-17" style={{ fontWeight: 700 }}>Tus reportes (3)</span>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Reporte 1 */}
      <div className="card-bordered" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="t-17" style={{ fontWeight: 700 }}>Robo o asalto</span>
          <span
            className="t-12"
            style={{
              background: 'var(--warnsoft)',
              border: '1px solid var(--warn)',
              borderRadius: 14,
              padding: '4px 10px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <img src="/assets/clock.svg" alt="" width={14} height={14} />
            En revisión
          </span>
        </div>
        <p className="t-13" style={{ color: 'var(--text2)' }}>AP-2026-0412 · 11 / 10 / 2026</p>
        <button
          type="button"
          onClick={() => onNavigate('estado-en-revision')}
          style={{
            alignSelf: 'flex-start',
            background: 'transparent',
            border: 'none',
            color: 'var(--secondary)',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '6px 0',
            cursor: 'pointer',
          }}
          className="t-15"
        >
          Ver estado <img src="/assets/chevron-right.svg" alt="" width={18} height={18} />
        </button>
      </div>

      {/* Reporte 2 */}
      <div className="card-bordered" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="t-17" style={{ fontWeight: 700 }}>Robo</span>
          <span
            className="t-12"
            style={{
              background: 'var(--successsoft)',
              border: '1px solid var(--success)',
              color: 'var(--success)',
              borderRadius: 14,
              padding: '4px 10px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <img src="/assets/alert-check.svg" alt="" width={14} height={14} />
            Reporte atendido
          </span>
        </div>
        <p className="t-13" style={{ color: 'var(--text2)' }}>EJ-ROBO-001 · 08 / 10 / 2026</p>
        <p className="t-13" style={{ color: 'var(--text2)' }}>Lugar: Av. Larco cuadra 3, Miraflores</p>
        <p className="t-13" style={{ color: 'var(--success)', fontWeight: 600 }}>
          Atendido el 09 / 10 / 2026 · Policía Nacional
        </p>
        <button
          type="button"
          onClick={() => onNavigate('estado-robo-atendido')}
          style={{
            alignSelf: 'flex-start',
            background: 'transparent',
            border: 'none',
            color: 'var(--secondary)',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '6px 0',
            cursor: 'pointer',
          }}
          className="t-15"
        >
          Ver estado <img src="/assets/chevron-right.svg" alt="" width={18} height={18} />
        </button>
      </div>

      {/* Reporte 3 */}
      <div className="card-bordered" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="t-17" style={{ fontWeight: 700 }}>Asalto</span>
          <span
            className="t-12"
            style={{
              background: 'var(--successsoft)',
              border: '1px solid var(--success)',
              color: 'var(--success)',
              borderRadius: 14,
              padding: '4px 10px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <img src="/assets/alert-check.svg" alt="" width={14} height={14} />
            Reporte atendido
          </span>
        </div>
        <p className="t-13" style={{ color: 'var(--text2)' }}>EJ-ASAL-002 · 05 / 10 / 2026</p>
        <p className="t-13" style={{ color: 'var(--text2)' }}>Lugar: Av. Benavides cuadra 5, Miraflores</p>
        <p className="t-13" style={{ color: 'var(--success)', fontWeight: 600 }}>
          Atendido el 06 / 10 / 2026 · Policía Nacional
        </p>
        <button
          type="button"
          onClick={() => onNavigate('estado-asalto-atendido')}
          style={{
            alignSelf: 'flex-start',
            background: 'transparent',
            border: 'none',
            color: 'var(--secondary)',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '6px 0',
            cursor: 'pointer',
          }}
          className="t-15"
        >
          Ver estado <img src="/assets/chevron-right.svg" alt="" width={18} height={18} />
        </button>
      </div>
    </div>
  </div>
);
