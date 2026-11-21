import React from 'react';
import { ScreenId } from '../../types';

interface Props {
  step: 1 | 2 | 3;
  onNavigate: (s: ScreenId) => void;
}

export const IntroPage: React.FC<Props> = ({ step, onNavigate }) => {
  const config = {
    1: {
      icon: '/assets/intro-filepen.svg',
      title: 'Reporta en minutos',
      desc: 'Cuenta qué pasó, dónde y cuándo. Tu reporte llega a las autoridades.',
      items: [
        'Describe lo ocurrido con tus palabras',
        'Adjunta fotos o videos como evidencia',
        'Sigue el estado de cada reporte',
      ],
      next: 'intro-2' as ScreenId,
      cta: 'Siguiente',
    },
    2: {
      icon: '/assets/intro-map.svg',
      title: 'Mira qué ocurre en tu zona',
      desc: 'El mapa muestra incidentes cercanos para que te cuides mejor.',
      items: [
        'Robos y asaltos marcados en el mapa',
        'Filtra por tipo de incidente',
        'Sin datos personales de nadie',
      ],
      next: 'intro-3' as ScreenId,
      cta: 'Siguiente',
    },
    3: {
      icon: '/assets/intro-shield.svg',
      title: 'Pide ayuda al instante',
      desc: 'Llama a emergencias con un toque, siempre con tu confirmación.',
      items: [
        'Policía 105, SAMU 106, Defensa Civil 115, Bomberos 116',
        'Modo oscuro, daltonismo y tamaño de letra',
        'Lector de pantalla para personas ciegas',
      ],
      next: 'inicio' as ScreenId,
      cta: 'Comenzar',
    },
  }[step];

  return (
    <div className="page-container auth-container">
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => onNavigate('inicio')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--primary)',
            fontWeight: 600,
            cursor: 'pointer',
            height: 44,
            padding: '0 12px',
          }}
          className="t-16"
        >
          Omitir
        </button>
      </div>

      <div style={{ height: 220, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            width: 210,
            height: 210,
            borderRadius: '50%',
            background: 'var(--primarysoft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={config.icon} alt="" width={74} height={74} style={{ position: 'relative', zIndex: 2 }} />
        </div>
      </div>

      <h1 className="t-28" style={{ fontWeight: 700, textAlign: 'center' }}>
        {config.title}
      </h1>
      <p className="t-16" style={{ color: 'var(--text2)', textAlign: 'center' }}>
        {config.desc}
      </p>

      <div className="card-surface" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {config.items.map((it, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                background: 'var(--primary)',
                color: 'var(--onprimary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 13,
                flexShrink: 0,
              }}
            >
              ✓
            </div>
            <p className="t-15" style={{ fontWeight: 500 }}>
              {it}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, margin: '8px 0' }}>
        {[1, 2, 3].map((dot) => (
          <button
            key={dot}
            onClick={() => onNavigate(`intro-${dot}` as ScreenId)}
            aria-label={`Paso ${dot}`}
            style={{
              width: step === dot ? 28 : 10,
              height: 10,
              borderRadius: 5,
              background: step === dot ? 'var(--primary)' : 'var(--divider)',
              border: 'none',
              cursor: 'pointer',
              transition: 'width 0.2s ease',
            }}
          />
        ))}
      </div>

      <button className="btn-primary" onClick={() => onNavigate(config.next)}>
        {config.cta}
      </button>
    </div>
  );
};
