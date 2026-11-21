import React, { useState } from 'react';
import { ScreenId } from '../../types';

const MAP_ZONES = {
  A: {
    code: 'R',
    type: 'Robo',
    title: 'Robo de celular',
    zoneLabel: 'Zona A · ubicación aproximada (Parque Kennedy / Av. Larco)',
    dateLabel: '04 oct 2026 · 18:30 · Incidencia ficticia',
    status: 'En revisión',
    left: '43%',
    top: '44%',
  },
  B: {
    code: 'R',
    type: 'Robo',
    title: 'Arrebato de cartera en vía pública',
    zoneLabel: 'Zona B · ubicación aproximada (Av. Pardo / Malecón)',
    dateLabel: '03 oct 2026 · 20:15 · Incidencia ficticia',
    status: 'Reporte atendido',
    left: '16%',
    top: '23%',
  },
  C: {
    code: 'A',
    type: 'Asalto',
    title: 'Asalto a transeúnte',
    zoneLabel: 'Zona C · ubicación aproximada (Av. Benavides / Av. Arequipa)',
    dateLabel: '02 oct 2026 · 21:40 · Incidencia ficticia',
    status: 'Reporte atendido',
    left: '68%',
    top: '48%',
  },
};

interface Props {
  onNavigate: (s: ScreenId) => void;
}

export const MapPage: React.FC<Props> = ({ onNavigate }) => {
  const [mapFilter, setMapFilter] = useState<'Todos' | 'Robos' | 'Asaltos'>('Todos');
  const [mapZone, setMapZone] = useState<'A' | 'B' | 'C'>('A');
  const [mapSearch, setMapSearch] = useState('Miraflores, Lima');
  const [showMapDetailSheet, setShowMapDetailSheet] = useState(false);

  const activeIncident = MAP_ZONES[mapZone];

  return (
    <div className="page-container">
      <h1 className="t-24" style={{ fontWeight: 700 }}>Mapa de incidencias</h1>

      <div className="field-box" style={{ minHeight: 48 }}>
        <img src="/assets/search.svg" alt="" width={20} height={20} />
        <input
          className="field-input"
          value={mapSearch}
          onChange={(e) => setMapSearch(e.target.value)}
          placeholder="Buscar distrito o zona…"
        />
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['Todos', 'Robos', 'Asaltos'] as const).map((f) => {
          const active = mapFilter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => {
                setMapFilter(f);
                if (f === 'Asaltos') setMapZone('C');
                if (f === 'Robos' && mapZone === 'C') setMapZone('A');
              }}
              style={{
                height: 44,
                padding: '0 16px',
                borderRadius: 22,
                border: active ? '1.5px solid var(--primary)' : '1.5px solid var(--border)',
                background: active ? 'var(--primary)' : 'var(--surface)',
                color: active ? 'var(--onprimary)' : 'var(--text)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
              }}
              className="t-14"
            >
              {active && <img src="/assets/check-white.svg" alt="" width={16} height={16} />}
              {f}
            </button>
          );
        })}
      </div>

      <div className="alert-box alert-info">
        <img src="/assets/alert-info.svg" alt="" width={24} height={24} />
        <p className="t-14">
          Incidentes y ubicaciones de demostración. No son datos reales ni en tiempo real.
        </p>
      </div>

      {/* Mapa ilustrativo de Miraflores con vectores de Figma */}
      <div
        style={{
          background: 'var(--map-base)',
          border: '1.5px solid var(--border)',
          height: 290,
          borderRadius: 12,
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        {/* Océano Pacífico */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '13%', background: 'var(--map-water)' }}>
          <img src="/assets/map-ocean.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Manzanas urbanas */}
        <div style={{ position: 'absolute', background: 'var(--map-block)', left: '17%', top: '5%', width: '28%', height: '18%', borderRadius: 6 }} />
        <div style={{ position: 'absolute', background: 'var(--map-block)', left: '17%', top: '28%', width: '28%', height: '15%', borderRadius: 6 }} />
        <div style={{ position: 'absolute', background: 'var(--map-block)', left: '17%', top: '49%', width: '28%', height: '18%', borderRadius: 6 }} />
        <div style={{ position: 'absolute', background: 'var(--map-block)', left: '17%', top: '74%', width: '28%', height: '20%', borderRadius: 6 }} />

        <div style={{ position: 'absolute', background: 'var(--map-block)', left: '49%', top: '5%', width: '16%', height: '18%', borderRadius: 6 }} />
        <div style={{ position: 'absolute', background: 'var(--map-park)', left: '49%', top: '27%', width: '16%', height: '17%', borderRadius: 6 }} />
        <div style={{ position: 'absolute', background: 'var(--map-block)', left: '49%', top: '49%', width: '16%', height: '18%', borderRadius: 6 }} />
        <div style={{ position: 'absolute', background: 'var(--map-block)', left: '49%', top: '74%', width: '32%', height: '20%', borderRadius: 6 }} />

        <div style={{ position: 'absolute', background: 'var(--map-block)', left: '68%', top: '5%', width: '14%', height: '18%', borderRadius: 6 }} />
        <div style={{ position: 'absolute', background: 'var(--map-block)', left: '68%', top: '28%', width: '14%', height: '15%', borderRadius: 6 }} />
        <div style={{ position: 'absolute', background: 'var(--map-block)', left: '68%', top: '49%', width: '14%', height: '18%', borderRadius: 6 }} />

        <div style={{ position: 'absolute', background: 'var(--map-block)', left: '86%', top: '5%', width: '11%', height: '18%', borderRadius: 6 }} />
        <div style={{ position: 'absolute', background: 'var(--map-block)', left: '86%', top: '28%', width: '11%', height: '15%', borderRadius: 6 }} />
        <div style={{ position: 'absolute', background: 'var(--map-block)', left: '86%', top: '49%', width: '11%', height: '18%', borderRadius: 6 }} />
        <div style={{ position: 'absolute', background: 'var(--map-block)', left: '86%', top: '74%', width: '11%', height: '20%', borderRadius: 6 }} />

        {/* Parques adicionales */}
        <div style={{ position: 'absolute', background: 'var(--map-park)', left: '13%', top: '54%', width: '7%', height: '13%', borderRadius: 5 }} />
        <div style={{ position: 'absolute', background: 'var(--map-park)', left: '18%', top: '74%', width: '11%', height: '12%', borderRadius: 5 }} />

        {/* Rótulos de calles y lugares */}
        <div style={{ position: 'absolute', left: '32%', top: '5%', background: 'var(--map-label-bg)', padding: '2px 6px', borderRadius: 6, fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>
          Av. José Larco
        </div>
        <div style={{ position: 'absolute', left: '22%', top: '20%', background: 'var(--map-label-bg)', padding: '2px 6px', borderRadius: 6, fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>
          Av. Pardo
        </div>
        <div style={{ position: 'absolute', left: '41%', top: '31%', background: 'var(--map-label-bg)', padding: '2px 6px', borderRadius: 6, fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>
          Parque Kennedy
        </div>
        <div style={{ position: 'absolute', left: '54%', top: '57%', background: 'var(--map-label-bg)', padding: '2px 6px', borderRadius: 6, fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>
          Calle Schell
        </div>
        <div style={{ position: 'absolute', left: '58%', top: '67%', background: 'var(--map-label-bg)', padding: '2px 6px', borderRadius: 6, fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>
          Av. Benavides
        </div>
        <div style={{ position: 'absolute', left: '74%', top: '35%', background: 'var(--map-label-bg)', padding: '2px 6px', borderRadius: 6, fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>
          Av. Arequipa
        </div>

        {/* Brújula Norte */}
        <div style={{ position: 'absolute', right: 12, top: 10, width: 30, height: 30, borderRadius: 15, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: 'var(--text)' }}>
          N
        </div>

        {/* Atribución */}
        <div style={{ position: 'absolute', right: 12, bottom: 10, background: 'var(--map-label-bg)', padding: '2px 8px', borderRadius: 6, fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>
          Plano referencial · Miraflores
        </div>

        {/* Pines interactivos */}
        {(['A', 'B', 'C'] as const).map((zoneKey) => {
          const z = MAP_ZONES[zoneKey];
          if (mapFilter === 'Robos' && z.type !== 'Robo') return null;
          if (mapFilter === 'Asaltos' && z.type !== 'Asalto') return null;
          const isSelected = mapZone === zoneKey;
          return (
            <button
              key={zoneKey}
              type="button"
              onClick={() => {
                setMapZone(zoneKey);
                setShowMapDetailSheet(true);
              }}
              title={`Seleccionar ${z.title} (Zona ${zoneKey})`}
              style={{
                position: 'absolute',
                left: z.left,
                top: z.top,
                width: isSelected ? 42 : 34,
                height: isSelected ? 42 : 34,
                borderRadius: 21,
                background: z.type === 'Robo' ? 'var(--danger)' : 'var(--secondary)',
                color: 'var(--onprimary)',
                border: isSelected ? '4px solid var(--primary)' : '2px solid #ffffff',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.28)',
                transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.15s ease',
              }}
            >
              {z.code}
            </button>
          );
        })}
      </div>

      {/* Leyenda */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 20, height: 20, borderRadius: 10, background: 'var(--danger)', color: 'var(--onprimary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
            R
          </div>
          <span className="t-13" style={{ fontWeight: 500 }}>Robo</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 20, height: 20, borderRadius: 10, background: 'var(--secondary)', color: 'var(--onprimary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
            A
          </div>
          <span className="t-13" style={{ fontWeight: 500 }}>Asalto</span>
        </div>
        <span className="t-13" style={{ color: 'var(--text2)' }}>
          Toca un marcador en el mapa para cambiar de zona (Zona A, B o C).
        </span>
      </div>

      {/* Tarjeta de incidencia seleccionada / Detalle de incidente */}
      <div
        className="card-surface"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          border: showMapDetailSheet ? '2px solid var(--primary)' : '1.5px solid var(--divider)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <p className="t-16" style={{ fontWeight: 700 }}>{activeIncident.title}</p>
          <span
            className="t-12"
            style={{
              background: 'var(--warnsoft)',
              border: '1px solid var(--warn)',
              padding: '2px 10px',
              borderRadius: 12,
              fontWeight: 600,
            }}
          >
            {activeIncident.status}
          </span>
        </div>
        <p className="t-13" style={{ color: 'var(--text2)' }}>{activeIncident.zoneLabel}</p>
        <p className="t-13" style={{ color: 'var(--text2)' }}>{activeIncident.dateLabel}</p>
        <p className="t-13" style={{ color: 'var(--text2)' }}>
          Sin datos personales ni direcciones exactas.
        </p>

        {!showMapDetailSheet && (
          <button
            type="button"
            className="btn-secondary"
            style={{ marginTop: 6, minHeight: 42, padding: '8px 16px' }}
            onClick={() => setShowMapDetailSheet(true)}
          >
            Ver detalle ampliado
          </button>
        )}

        {showMapDetailSheet && (
          <div style={{ marginTop: 8, paddingTop: 10, borderTop: '1px solid var(--divider)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p className="t-14">
              <strong>Resumen del reporte ciudadano:</strong> Reporte registrado de forma anónima. Ubicación redondeada a nivel de manzana para proteger la privacidad conforme a la Ley 29733.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-primary" onClick={() => onNavigate('denuncia-paso-1')}>
                Reportar incidente similar
              </button>
              <button className="btn-secondary" onClick={() => setShowMapDetailSheet(false)}>
                Cerrar detalle
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
