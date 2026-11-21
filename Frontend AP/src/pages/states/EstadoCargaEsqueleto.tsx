import React from 'react';
import { ScreenId } from '../../types';

type SkeletonScreen =
  | 'ap3-carga-historial'
  | 'esqueleto-datos-personales'
  | 'esqueleto-privacidad'
  | 'esqueleto-politica'
  | 'esqueleto-enviando'
  | 'esqueleto-mapa';

interface Props {
  screen: SkeletonScreen;
  onNavigate: (s: ScreenId) => void;
}

export const EstadoCargaEsqueleto: React.FC<Props> = ({ screen, onNavigate }) => {
  const skelConfig = {
    'ap3-carga-historial': {
      title: 'Historial de reportes',
      subtitle: 'Cargando tus reportes…',
      readyTarget: 'historial' as ScreenId,
    },
    'esqueleto-datos-personales': {
      title: 'Datos personales',
      subtitle: 'Cargando tu información personal…',
      readyTarget: 'datos-personales' as ScreenId,
    },
    'esqueleto-privacidad': {
      title: 'Privacidad y seguridad',
      subtitle: 'Cargando preferencias de seguridad…',
      readyTarget: 'privacidad-seguridad' as ScreenId,
    },
    'esqueleto-politica': {
      title: 'Política de privacidad',
      subtitle: 'Cargando documento legal…',
      readyTarget: 'politica-privacidad' as ScreenId,
    },
    'esqueleto-enviando': {
      title: 'Enviando denuncia',
      subtitle: 'Procesando y cifrando reporte…',
      readyTarget: 'confirmacion' as ScreenId,
    },
    'esqueleto-mapa': {
      title: 'Mapa de incidencias',
      subtitle: 'Cargando mapa y detalle de incidente…',
      readyTarget: 'mapa' as ScreenId,
    },
  }[screen];

  return (
    <div className="page-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => onNavigate('ap3-catalogo-estados')}
            style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
          </button>
          <h1 className="t-24" style={{ fontWeight: 700 }}>{skelConfig.title}</h1>
        </div>
        <button className="proto-chip active" onClick={() => onNavigate(skelConfig.readyTarget)}>
          Ver pantalla cargada
        </button>
      </div>

      <p className="t-17" style={{ fontWeight: 700 }}>{skelConfig.subtitle}</p>

      {[1, 2, 3].map((idx) => (
        <div key={idx} className="card-bordered" style={{ borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="skeleton-bar" style={{ height: 14, width: '45%' }} />
          <div className="skeleton-bar" style={{ height: 14, width: '90%' }} />
          <div className="skeleton-bar" style={{ height: 32, width: 130, borderRadius: 12 }} />
        </div>
      ))}

      <p className="t-14" style={{ color: 'var(--text2)' }}>
        Esto puede tardar unos segundos. Puedes seguir usando el menú.
      </p>
    </div>
  );
};
