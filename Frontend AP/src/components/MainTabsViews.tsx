import React, { useState } from 'react';
import {
  AccessibilityState,
  DaltonismoMode,
  FontSizeMode,
  ModalType,
  ScreenId,
} from '../types';

interface Props {
  screen: ScreenId;
  acc: AccessibilityState;
  setAcc: React.Dispatch<React.SetStateAction<AccessibilityState>>;
  onNavigate: (s: ScreenId) => void;
  onOpenModal: (m: ModalType) => void;
}

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

export const MainTabsViews: React.FC<Props> = ({
  screen,
  acc,
  setAcc,
  onNavigate,
  onOpenModal,
}) => {
  const [mapFilter, setMapFilter] = useState<'Todos' | 'Robos' | 'Asaltos'>('Todos');
  const [mapZone, setMapZone] = useState<'A' | 'B' | 'C'>('A');
  const [mapSearch, setMapSearch] = useState('Miraflores, Lima');
  const [showMapDetailSheet, setShowMapDetailSheet] = useState(false);

  // Datos personales editables
  const [profName, setProfName] = useState('María Valdez');
  const [profDistrict, setProfDistrict] = useState('Miraflores, Lima');
  const [profEmail, setProfEmail] = useState('maria.valdez@example.com');
  const [profPhone, setProfPhone] = useState('+51 999 000 000');
  const [savedNotice, setSavedNotice] = useState(false);

  // Privacidad toggles
  const [privAnon, setPrivAnon] = useState(true);
  const [privShare, setPrivShare] = useState(false);

  // Eliminar cuenta clásica
  const [delPass, setDelPass] = useState('••••••••');
  const [delShowPass, setDelShowPass] = useState(false);
  const [delConfirmed, setDelConfirmed] = useState(true);

  // 1. INICIO
  if (screen === 'inicio') {
    return (
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
  }

  // 2. MAPA DE INCIDENCIAS (y Detalle de incidente)
  if (screen === 'mapa') {
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
  }

  // 3. MI PERFIL
  if (screen === 'perfil') {
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
            <p className="t-18" style={{ fontWeight: 700 }}>{profName}</p>
            <p className="t-14" style={{ color: 'var(--text2)' }}>{profDistrict}</p>
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
            <span className="t-15" style={{ fontWeight: 600 }}>{profEmail}</span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span className="t-14" style={{ color: 'var(--text2)', width: 80 }}>Teléfono</span>
            <span className="t-15" style={{ fontWeight: 600 }}>{profPhone}</span>
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
  }

  // 4. DATOS PERSONALES
  if (screen === 'datos-personales') {
    return (
      <div className="page-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => onNavigate('perfil')}
            style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
          </button>
          <h1 className="t-24" style={{ fontWeight: 700 }}>Datos personales</h1>
        </div>

        <p className="t-15" style={{ color: 'var(--text2)' }}>Consulta y edita tu información.</p>

        {savedNotice && (
          <div className="alert-box alert-success">
            <img src="/assets/alert-check.svg" alt="" width={24} height={24} />
            <p className="t-14">Tus datos personales se actualizaron correctamente.</p>
          </div>
        )}

        <div className="field-group">
          <label className="field-label">Nombre completo</label>
          <div className="field-box">
            <input className="field-input" value={profName} onChange={(e) => setProfName(e.target.value)} />
          </div>
        </div>

        <div className="field-group">
          <label className="field-label">DNI</label>
          <div className="field-box" style={{ opacity: 0.85 }}>
            <input className="field-input" value="•••• 5678" readOnly />
          </div>
        </div>

        <div className="field-group">
          <label className="field-label">Distrito y ciudad</label>
          <div className="field-box">
            <input className="field-input" value={profDistrict} onChange={(e) => setProfDistrict(e.target.value)} />
          </div>
        </div>

        <div className="field-group">
          <label className="field-label">Correo electrónico</label>
          <div className="field-box">
            <input className="field-input" value={profEmail} onChange={(e) => setProfEmail(e.target.value)} />
          </div>
        </div>

        <div className="field-group">
          <label className="field-label">Teléfono</label>
          <div className="field-box">
            <input className="field-input" value={profPhone} onChange={(e) => setProfPhone(e.target.value)} />
          </div>
        </div>

        <button
          className="btn-primary"
          onClick={() => {
            setSavedNotice(true);
            setTimeout(() => setSavedNotice(false), 3000);
          }}
        >
          Actualizar datos
        </button>
      </div>
    );
  }

  // 5. HISTORIAL DE REPORTES
  if (screen === 'historial') {
    return (
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
  }

  // 6. PRIVACIDAD Y SEGURIDAD
  if (screen === 'privacidad-seguridad') {
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
  }

  // 7. ACCESIBILIDAD
  if (screen === 'accesibilidad') {
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
  }

  // 8. ELIMINAR CUENTA (Flujo AP3 de 4 pasos + vista directa)
  if (screen === 'ap3-eliminar-1') {
    return (
      <div className="page-container auth-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => onNavigate('privacidad-seguridad')}
            style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
          </button>
          <h1 className="t-24" style={{ fontWeight: 700 }}>Eliminar cuenta</h1>
        </div>

        <p className="t-14" style={{ fontWeight: 600, color: 'var(--text2)' }}>
          Paso 1 de 4 · Advertencia
        </p>
        <h2 className="t-22" style={{ fontWeight: 700 }}>
          Esto es lo que pasará con tus datos
        </h2>

        <div className="card-surface" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p className="t-16">
            <strong>Se eliminan:</strong> tu perfil, tus datos de contacto y tu historial de reportes.
          </p>
          <p className="t-16">
            <strong>Se conservan:</strong> los reportes ya enviados, sin tus datos personales y de forma permanente.
          </p>
          <p className="t-16">
            <strong>Plazo:</strong> tienes 30 días para cancelar. Las copias de seguridad se borran a los 90 días.
          </p>
        </div>

        <button className="btn-primary" onClick={() => onNavigate('ap3-eliminar-2')}>
          Ver alternativa
        </button>
        <button className="btn-secondary" onClick={() => onNavigate('perfil')}>
          Cancelar, conservar mi cuenta
        </button>
      </div>
    );
  }

  if (screen === 'ap3-eliminar-2') {
    return (
      <div className="page-container auth-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => onNavigate('ap3-eliminar-1')}
            style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
          </button>
          <h1 className="t-24" style={{ fontWeight: 700 }}>Eliminar cuenta</h1>
        </div>

        <p className="t-14" style={{ fontWeight: 600, color: 'var(--text2)' }}>
          Paso 2 de 4 · Alternativa
        </p>

        <div style={{ width: 96, height: 96, borderRadius: 48, background: 'var(--secondarysoft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/assets/pause-lg.svg" alt="" width={44} height={44} />
        </div>

        <h2 className="t-22" style={{ fontWeight: 700 }}>
          ¿Prefieres tomar una pausa?
        </h2>
        <p className="t-16">
          Puedes desactivar tu cuenta temporalmente. Tu perfil se oculta y no se borra nada. Vuelves cuando quieras iniciando sesión.
        </p>

        <button className="btn-primary" onClick={() => onNavigate('bienvenida')}>
          Desactivar temporalmente
        </button>
        <button className="btn-secondary" onClick={() => onNavigate('eliminar-cuenta')}>
          Continuar con la eliminación
        </button>
      </div>
    );
  }

  if (screen === 'eliminar-cuenta') {
    return (
      <div className="page-container auth-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => onNavigate('ap3-eliminar-2')}
            style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
          </button>
          <h1 className="t-24" style={{ fontWeight: 700 }}>Eliminar cuenta</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 72, height: 72, borderRadius: 36, background: 'var(--dangersoft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/assets/danger-tri-lg.svg" alt="" width={40} height={40} />
          </div>
          <h2 className="t-24" style={{ fontWeight: 700, textAlign: 'center' }}>¿Eliminar tu cuenta?</h2>
          <p className="t-15" style={{ color: 'var(--text2)', textAlign: 'center' }}>
            Paso 3 de 4 · Esta acción inicia el proceso de baja:
          </p>
        </div>

        <div className="card-surface" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <img src="/assets/danger-x.svg" alt="" width={20} height={20} />
            <p className="t-15">Se borrarán tu perfil y tus datos personales.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <img src="/assets/danger-x.svg" alt="" width={20} height={20} />
            <p className="t-15">Perderás el acceso a tu historial de reportes.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <img src="/assets/danger-x.svg" alt="" width={20} height={20} />
            <p className="t-15">Los reportes ya enviados se conservan sin tus datos personales.</p>
          </div>
        </div>

        <div className="field-group">
          <label className="field-label">Confirma tu contraseña</label>
          <div className="field-box">
            <input
              type={delShowPass ? 'text' : 'password'}
              className="field-input"
              value={delPass}
              onChange={(e) => setDelPass(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setDelShowPass(!delShowPass)}
              style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
              className="t-14"
            >
              {delShowPass ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          <span className="field-help">Por seguridad, ingresa tu contraseña para continuar.</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            type="button"
            onClick={() => setDelConfirmed(!delConfirmed)}
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: delConfirmed ? 'var(--primary)' : 'var(--surface)',
              border: '2px solid var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {delConfirmed && <img src="/assets/check-white.svg" alt="" width={16} height={16} />}
          </button>
          <p className="t-14">Entiendo que esta acción eliminará mi cuenta tras el periodo de gracia.</p>
        </div>

        <button className="btn-danger-solid" onClick={() => onNavigate('ap3-eliminar-4')}>
          Sí, eliminar mi cuenta
        </button>
        <button className="btn-secondary" onClick={() => onNavigate('perfil')}>
          Cancelar, conservar mi cuenta
        </button>
      </div>
    );
  }

  if (screen === 'ap3-eliminar-4') {
    return (
      <div className="page-container auth-container" style={{ alignItems: 'center', textAlign: 'center' }}>
        <h1 className="t-24" style={{ fontWeight: 700, alignSelf: 'flex-start' }}>Periodo de gracia</h1>
        <p className="t-14" style={{ fontWeight: 600, color: 'var(--text2)' }}>
          Paso 4 de 4 · Periodo de gracia
        </p>

        <div style={{ width: 96, height: 96, borderRadius: 48, background: 'var(--primarysoft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/assets/calendar-lg.svg" alt="" width={44} height={44} />
        </div>

        <h2 className="t-24" style={{ fontWeight: 700 }}>Solicitud registrada</h2>
        <p className="t-16" style={{ color: 'var(--text2)' }}>
          Tu cuenta se eliminará el 7 de diciembre de 2026. Hasta esa fecha puedes cancelar la eliminación iniciando sesión.
        </p>

        <div className="alert-box alert-info" style={{ textAlign: 'left' }}>
          <img src="/assets/alert-info.svg" alt="" width={24} height={24} />
          <p className="t-14">
            Te enviamos un correo comprobante a maria.valdez@example.com con los pasos para cancelar.
          </p>
        </div>

        <button className="btn-primary" onClick={() => onNavigate('perfil')}>
          Cancelar la eliminación
        </button>
        <button className="btn-destructive" onClick={() => onNavigate('cuenta-eliminada')}>
          Eliminar cuenta ahora
        </button>
      </div>
    );
  }

  // 9. AP3 · CATÁLOGO DE ESTADOS Y PANTALLAS DE ESTADO (VACÍO, CARGA, ERROR)
  if (screen === 'ap3-catalogo-estados') {
    const catalogButtons: { label: string; target: ScreenId }[] = [
      { label: 'Vacío inicial · Inicio', target: 'ap3-vacio-inicial' },
      { label: 'Vacío por búsqueda · Mapa', target: 'ap3-vacio-busqueda' },
      { label: 'Vacío por historial · Historial', target: 'ap3-vacio-historial' },
      { label: 'Carga (esqueleto) · Historial', target: 'ap3-carga-historial' },
      { label: 'Error de conexión · Mapa', target: 'ap3-error-conexion' },
      { label: 'Error del sistema · Historial', target: 'ap3-error-sistema' },
      { label: 'Error de validación · Descripción', target: 'ap3-error-validacion' },
      { label: 'Contenido no disponible · Reporte', target: 'ap3-contenido-no-disponible' },
      { label: 'Sin permisos · Sesión expirada', target: 'ap3-sin-permisos' },
      { label: 'Éxito · Confirmación de denuncia', target: 'confirmacion' },
      { label: 'Esqueleto · Datos personales', target: 'esqueleto-datos-personales' },
      { label: 'Esqueleto · Privacidad y seguridad', target: 'esqueleto-privacidad' },
      { label: 'Esqueleto · Política de privacidad', target: 'esqueleto-politica' },
      { label: 'Esqueleto · Enviando denuncia', target: 'esqueleto-enviando' },
      { label: 'Esqueleto · Mapa · Detalle de incidente', target: 'esqueleto-mapa' },
    ];

    return (
      <div className="page-container">
        <h1 className="t-24" style={{ fontWeight: 700 }}>Catálogo de estados (AP3)</h1>
        <p className="t-15" style={{ color: 'var(--text2)' }}>
          Toca un estado para verlo (pantalla · caso de uso).
        </p>

        <div className="responsive-grid-2">
          {catalogButtons.map((b) => (
            <button
              key={b.target}
              className="btn-secondary"
              onClick={() => onNavigate(b.target)}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Estados individuales de AP3
  if (
    screen === 'ap3-vacio-inicial' ||
    screen === 'ap3-vacio-busqueda' ||
    screen === 'ap3-vacio-historial' ||
    screen === 'ap3-error-conexion' ||
    screen === 'ap3-error-sistema' ||
    screen === 'ap3-contenido-no-disponible' ||
    screen === 'ap3-sin-permisos'
  ) {
    const stateMap = {
      'ap3-vacio-inicial': {
        header: 'Inicio',
        badgeBg: 'var(--secondarysoft)',
        icon: '/assets/state-empty-init.svg',
        title: 'Aún no hay alertas cerca de ti',
        desc: 'Cuando alguien reporte un incidente en tu zona, lo verás aquí.',
        primaryLabel: 'Reportar un incidente',
        primaryTarget: 'denuncia-paso-1' as ScreenId,
      },
      'ap3-vacio-busqueda': {
        header: 'Mapa de incidencias',
        badgeBg: 'var(--secondarysoft)',
        icon: '/assets/state-empty-search.svg',
        title: 'No encontramos incidentes en esa zona',
        desc: 'Revisa el nombre de la zona o quita los filtros.',
        primaryLabel: 'Quitar filtros',
        primaryTarget: 'mapa' as ScreenId,
        secondaryLabel: 'Buscar otra zona',
        secondaryTarget: 'mapa' as ScreenId,
      },
      'ap3-vacio-historial': {
        header: 'Historial de reportes',
        badgeBg: 'var(--secondarysoft)',
        icon: '/assets/state-empty-hist.svg',
        title: 'Aún no tienes reportes',
        desc: 'Cuando envíes tu primera denuncia podrás seguirla aquí.',
        primaryLabel: 'Hacer mi primera denuncia',
        primaryTarget: 'denuncia-paso-1' as ScreenId,
      },
      'ap3-error-conexion': {
        header: 'Mapa de incidencias',
        badgeBg: 'var(--dangersoft)',
        icon: '/assets/state-err-conn.svg',
        title: 'Sin conexión a internet',
        desc: 'Revisa tu conexión y vuelve a intentar.',
        primaryLabel: 'Reintentar',
        primaryTarget: 'mapa' as ScreenId,
        secondaryLabel: 'Ir al inicio',
        secondaryTarget: 'inicio' as ScreenId,
      },
      'ap3-error-sistema': {
        header: 'Historial de reportes',
        badgeBg: 'var(--dangersoft)',
        icon: '/assets/state-err-sys.svg',
        title: 'Algo salió mal de nuestro lado',
        desc: 'Lo sentimos. Intenta de nuevo o escríbenos a ayuda@alertaperu.pe.',
        primaryLabel: 'Reintentar',
        primaryTarget: 'historial' as ScreenId,
        secondaryLabel: 'Contactar a soporte',
        secondaryTarget: 'mailing' as ScreenId,
      },
      'ap3-contenido-no-disponible': {
        header: 'Reporte',
        badgeBg: 'var(--warnsoft)',
        icon: '/assets/state-unavail.svg',
        title: 'Este reporte ya no está disponible',
        desc: 'Fue retirado o ya no existe.',
        primaryLabel: 'Volver al historial',
        primaryTarget: 'historial' as ScreenId,
      },
      'ap3-sin-permisos': {
        header: 'Historial de reportes',
        badgeBg: 'var(--warnsoft)',
        icon: '/assets/state-noperm.svg',
        title: 'Tu sesión terminó',
        desc: 'Por seguridad cerramos tu sesión. Inicia sesión para ver tus reportes.',
        primaryLabel: 'Iniciar sesión',
        primaryTarget: 'login' as ScreenId,
      },
    }[screen];

    return (
      <div className="page-container auth-container" style={{ alignItems: 'center', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <h1 className="t-24" style={{ fontWeight: 700 }}>{stateMap.header}</h1>
          <button className="proto-chip" onClick={() => onNavigate('ap3-catalogo-estados')}>
            Catálogo de estados
          </button>
        </div>

        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            background: stateMap.badgeBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 28,
          }}
        >
          <img src={stateMap.icon} alt="" width={44} height={44} />
        </div>

        <h2 className="t-22" style={{ fontWeight: 700 }}>{stateMap.title}</h2>
        <p className="t-16" style={{ color: 'var(--text2)' }}>{stateMap.desc}</p>

        <button className="btn-primary" style={{ marginTop: 12 }} onClick={() => onNavigate(stateMap.primaryTarget)}>
          {stateMap.primaryLabel}
        </button>
        {'secondaryLabel' in stateMap && stateMap.secondaryLabel && (
          <button className="btn-secondary" onClick={() => onNavigate(stateMap.secondaryTarget!)}>
            {stateMap.secondaryLabel}
          </button>
        )}
      </div>
    );
  }

  // Pantallas de Carga (Esqueleto)
  if (
    screen === 'ap3-carga-historial' ||
    screen === 'esqueleto-datos-personales' ||
    screen === 'esqueleto-privacidad' ||
    screen === 'esqueleto-politica' ||
    screen === 'esqueleto-enviando' ||
    screen === 'esqueleto-mapa'
  ) {
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
  }

  return null;
};
