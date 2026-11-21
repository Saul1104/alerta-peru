import React from 'react';
import { AccessibilityState, DaltonismoMode, FontSizeMode, ScreenId } from '../../types';

interface Props {
  acc: AccessibilityState;
  setAcc: React.Dispatch<React.SetStateAction<AccessibilityState>>;
  onNavigate: (s: ScreenId) => void;
}

export const AccessibilityPage: React.FC<Props> = ({ acc, setAcc, onNavigate }) => {
  const daltonismoOpts: { id: DaltonismoMode; label: string; desc: string }[] = [
    { id: 'desactivado', label: 'Desactivado', desc: 'Colores originales de Alerta Perú' },
    { id: 'protanopia', label: 'Protanopia', desc: 'Dificultad para percibir el rojo' },
    { id: 'deuteranopia', label: 'Deuteranopia', desc: 'Dificultad para percibir el verde' },
    { id: 'tritanopia', label: 'Tritanopia', desc: 'Dificultad para percibir el azul' },
  ];

  const fontOpts: { id: FontSizeMode; label: string; sizeClass: string }[] = [
    { id: 'normal', label: 'Normal', sizeClass: 't-18' },
    { id: 'grande', label: 'Grande', sizeClass: 't-22' },
    { id: 'muy-grande', label: 'Muy grande', sizeClass: 't-26' },
  ];

  return (
    <div className="page-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={() => onNavigate('perfil')}
          style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
        </button>
        <h1 className="t-24" style={{ fontWeight: 700 }}>Accesibilidad</h1>
      </div>

      {/* COLOR Y VISIÓN */}
      <p className="t-13" style={{ fontWeight: 700, color: 'var(--text2)', letterSpacing: 0.6 }}>
        COLOR Y VISIÓN
      </p>

      <div className="card-surface" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px' }}>
          <p className="t-17" style={{ fontWeight: 700 }}>Modo para daltonismo</p>
          <p className="t-13" style={{ color: 'var(--text2)' }}>
            Elige un filtro para distinguir mejor los colores de la interfaz.
          </p>
        </div>
        {daltonismoOpts.map((opt) => {
          const active = acc.daltonismo === opt.id;
          return (
            <React.Fragment key={opt.id}>
              <div style={{ height: 1, background: 'var(--divider)' }} />
              <button
                type="button"
                onClick={() => setAcc((p) => ({ ...p, daltonismo: opt.id }))}
                style={{
                  width: '100%',
                  background: active ? 'var(--primarysoft)' : 'transparent',
                  border: 'none',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div>
                  <p className="t-16" style={{ fontWeight: 600 }}>{opt.label}</p>
                  <p className="t-13" style={{ color: 'var(--text2)' }}>{opt.desc}</p>
                </div>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    border: active ? '2px solid var(--primary)' : '2px solid var(--border)',
                    background: active ? 'var(--primary)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {active && <img src="/assets/check-white.svg" alt="" width={14} height={14} />}
                </div>
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* TAMAÑO DE LETRA */}
      <p className="t-13" style={{ fontWeight: 700, color: 'var(--text2)', letterSpacing: 0.6 }}>
        TAMAÑO DE LETRA
      </p>

      <div className="card-surface" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px' }}>
          <p className="t-17" style={{ fontWeight: 700 }}>Tamaño de letra</p>
          <p className="t-13" style={{ color: 'var(--text2)' }}>
            Agranda el texto para leerlo con más comodidad.
          </p>
        </div>
        <div style={{ height: 1, background: 'var(--divider)' }} />
        <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {fontOpts.map((f) => {
            const active = acc.fontSize === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setAcc((p) => ({ ...p, fontSize: f.id }))}
                style={{
                  minHeight: 68,
                  borderRadius: 12,
                  border: active ? '3px solid var(--primary)' : '1.5px solid var(--border)',
                  background: active ? 'var(--primarysoft)' : 'var(--surface)',
                  color: 'var(--text)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                {active && (
                  <span style={{ position: 'absolute', right: 8, top: 4, fontWeight: 700, fontSize: 13 }}>
                    ✓
                  </span>
                )}
                <span className={f.sizeClass} style={{ fontWeight: 700 }}>Aa</span>
                <span className="t-13">{f.label}</span>
              </button>
            );
          })}
        </div>
        <div style={{ height: 1, background: 'var(--divider)' }} />
        <div style={{ padding: 16 }}>
          <p className="t-13" style={{ color: 'var(--text2)' }}>
            Vista previa · el texto cambia al elegir un tamaño
          </p>
          <p className="t-16" style={{ fontWeight: 600, marginTop: 4 }}>
            Así se verá el texto en Alerta Perú.
          </p>
        </div>
      </div>

      {/* INTERFAZ Y MOVIMIENTO */}
      <p className="t-13" style={{ fontWeight: 700, color: 'var(--text2)', letterSpacing: 0.6 }}>
        INTERFAZ Y MOVIMIENTO
      </p>

      <div className="card-surface" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Alto contraste */}
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <p className="t-16" style={{ fontWeight: 600 }}>Alto contraste</p>
            <p className="t-13" style={{ color: 'var(--text2)' }}>
              Aumenta la diferencia entre el texto y el fondo.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAcc((p) => ({ ...p, highContrast: !p.highContrast }))}
            className={`proto-chip ${acc.highContrast ? 'active' : ''}`}
            style={{ width: 92, height: 36, flexShrink: 0, textAlign: 'center', padding: 0 }}
          >
            {acc.highContrast ? 'Sí' : 'No'}
          </button>
        </div>

        <div style={{ height: 1, background: 'var(--divider)' }} />

        {/* Reducir transparencia */}
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <p className="t-16" style={{ fontWeight: 600 }}>Reducir transparencia</p>
            <p className="t-13" style={{ color: 'var(--text2)' }}>
              Usa fondos sólidos para mejorar la legibilidad.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAcc((p) => ({ ...p, reducedTransparency: !p.reducedTransparency }))}
            className={`proto-chip ${acc.reducedTransparency ? 'active' : ''}`}
            style={{ width: 92, height: 36, flexShrink: 0, textAlign: 'center', padding: 0 }}
          >
            {acc.reducedTransparency ? 'Sí' : 'No'}
          </button>
        </div>

        <div style={{ height: 1, background: 'var(--divider)' }} />

        {/* Lector de pantalla */}
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <p className="t-16" style={{ fontWeight: 600 }}>Lector de pantalla</p>
            <p className="t-13" style={{ color: 'var(--text2)' }}>
              Lee en voz alta cada elemento (VoiceOver / TalkBack).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAcc((p) => ({ ...p, screenReader: !p.screenReader, screenReaderStep: 1 }))}
            className={`proto-chip ${acc.screenReader ? 'active' : ''}`}
            style={{ width: 92, height: 36, flexShrink: 0, textAlign: 'center', padding: 0 }}
          >
            {acc.screenReader ? 'Activo' : 'Activar'}
          </button>
        </div>

        <div style={{ height: 1, background: 'var(--divider)' }} />

        {/* Recorrido guiado */}
        <button
          type="button"
          onClick={() => setAcc((p) => ({ ...p, guidedTourStep: 1 }))}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div>
            <p className="t-16" style={{ fontWeight: 600 }}>Recorrido guiado</p>
            <p className="t-13" style={{ color: 'var(--text2)' }}>
              Repite la introducción de 5 pasos a la app.
            </p>
          </div>
          <img src="/assets/chevron-right.svg" alt="" width={22} height={22} />
        </button>
      </div>
    </div>
  );
};
