import React, { useEffect, useState } from 'react';
import {
  AccessibilityState,
  ModalType,
  ReportDraft,
  ScreenId,
} from './types';
import { AuthViews } from './components/AuthViews';
import { ReportFlowViews } from './components/ReportFlowViews';
import { MainTabsViews } from './components/MainTabsViews';
import { DesignSystemView, MailingView } from './components/DesignSystemView';

const GUIDED_TOUR_STEPS = [
  {
    step: 1,
    title: 'Te damos la bienvenida',
    desc: 'En 5 pasos te mostramos cómo reportar un hecho y pedir ayuda en Alerta Perú.',
    targetScreen: 'inicio' as ScreenId,
  },
  {
    step: 2,
    title: 'Reporta un incidente',
    desc: 'Toca "Nueva denuncia" o la pestaña "Reportar" para registrar un hecho en 6 pasos sencillos.',
    targetScreen: 'inicio' as ScreenId,
  },
  {
    step: 3,
    title: 'Llama a emergencias',
    desc: 'Toca Policía 105, SAMU 106, Defensa Civil 115 o Bomberos 116. Siempre pediremos tu confirmación antes de llamar.',
    targetScreen: 'inicio' as ScreenId,
  },
  {
    step: 4,
    title: 'Explora el mapa de tu zona',
    desc: 'Consulta incidentes cercanos sin exponer datos personales de nadie.',
    targetScreen: 'mapa' as ScreenId,
  },
  {
    step: 5,
    title: 'Ajusta la app a tu medida',
    desc: 'En Perfil > Accesibilidad puedes activar modo para daltonismo, letra grande, alto contraste o lector de pantalla.',
    targetScreen: 'accesibilidad' as ScreenId,
  },
];

const SCREEN_READER_STEPS = [
  {
    step: 1,
    screenLabel: 'Bienvenida',
    targetScreen: 'bienvenida' as ScreenId,
    quote: '«Alerta Perú. Reporta. Protege. Actúa.»',
  },
  {
    step: 2,
    screenLabel: 'Inicio · Encabezado',
    targetScreen: 'inicio' as ScreenId,
    quote: '«Bienvenido a Alerta Perú. Reporta un hecho de forma rápida y segura.»',
  },
  {
    step: 3,
    screenLabel: 'Inicio · Acción principal',
    targetScreen: 'inicio' as ScreenId,
    quote: '«Botón: Nueva denuncia. Toca dos veces para iniciar un reporte paso a paso.»',
  },
  {
    step: 4,
    screenLabel: 'Inicio · Emergencias',
    targetScreen: 'inicio' as ScreenId,
    quote: '«Policía Nacional, 105, Delitos y seguridad. Botón. Toca dos veces para llamar.»',
  },
  {
    step: 5,
    screenLabel: 'Mapa de incidencias',
    targetScreen: 'mapa' as ScreenId,
    quote: '«Pin R, Zona A: Robo de celular, ubicación aproximada en Miraflores.»',
  },
  {
    step: 6,
    screenLabel: 'Revisión de denuncia',
    targetScreen: 'denuncia-paso-6' as ScreenId,
    quote: '«Paso 6 de 6, 100 % completado. Botón: Enviar denuncia.»',
  },
];

const AUTH_SCREENS: ScreenId[] = [
  'bienvenida',
  'intro-1',
  'intro-2',
  'intro-3',
  'login',
  'login-error',
  'recuperar',
  'enlace-enviado',
  'crear-cuenta',
  'verificar-codigo',
  'cuenta-creada',
  'politica-privacidad',
  'cuenta-eliminada',
];

export function App() {
  const [screen, setScreen] = useState<ScreenId>('bienvenida');
  const [modal, setModal] = useState<ModalType>(null);

  const [acc, setAcc] = useState<AccessibilityState>({
    darkMode: false,
    daltonismo: 'desactivado',
    fontSize: 'normal',
    highContrast: false,
    reducedTransparency: false,
    screenReader: false,
    screenReaderStep: 1,
    guidedTourStep: null,
  });

  const [draft, setDraft] = useState<ReportDraft>({
    tipo: 'Robo o asalto',
    descripcion: '',
    fecha: '11/10/2026',
    hora: '18:30',
    distrito: 'Miraflores, Lima',
    direccion: 'Av. José Larco cuadra 4',
    archivos: [],
    identidad: 'anonima',
    telefono: '+51 999 000 000',
    correo: 'maria.valdez@example.com',
    confirmado: true,
  });

  // Sincronizar atributos de tema/accesibilidad en el documento
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', acc.darkMode ? 'oscuro' : 'claro');
    root.setAttribute('data-daltonismo', acc.daltonismo);
    root.setAttribute('data-fontsize', acc.fontSize);
    root.setAttribute('data-contrast', String(acc.highContrast));
    root.setAttribute('data-reduced-transparency', String(acc.reducedTransparency));
  }, [acc]);

  const showNav = !AUTH_SCREENS.includes(screen) && screen !== 'mailing' && screen !== 'sistema-diseno';

  const getActiveTab = (): 'inicio' | 'reportar' | 'mapa' | 'perfil' => {
    if (screen === 'inicio' || screen === 'ap3-vacio-inicial') return 'inicio';
    if (
      screen.startsWith('denuncia-') ||
      screen === 'enviando-denuncia' ||
      screen === 'confirmacion' ||
      screen.startsWith('estado-') ||
      screen === 'ap3-error-validacion' ||
      screen === 'esqueleto-enviando'
    ) {
      return 'reportar';
    }
    if (
      screen === 'mapa' ||
      screen === 'ap3-vacio-busqueda' ||
      screen === 'ap3-error-conexion' ||
      screen === 'esqueleto-mapa'
    ) {
      return 'mapa';
    }
    return 'perfil';
  };

  const activeTab = getActiveTab();

  const renderEmergencyModal = () => {
    if (!modal || !modal.startsWith('llamar-')) return null;
    const info = {
      'llamar-105': {
        name: 'Policía Nacional',
        number: '105',
        desc: 'Se marcará el 105 desde tu teléfono. Delitos y seguridad. La llamada es gratuita y atiende las 24 horas.',
        icon: '/assets/em-shield.svg',
      },
      'llamar-106': {
        name: 'SAMU',
        number: '106',
        desc: 'Se marcará el 106 desde tu teléfono. Emergencias médicas. La llamada es gratuita y atiende las 24 horas.',
        icon: '/assets/em-heart-pulse.svg',
      },
      'llamar-115': {
        name: 'Defensa Civil',
        number: '115',
        desc: 'Se marcará el 115 desde tu teléfono. Desastres y riesgos. La llamada es gratuita y atiende las 24 horas.',
        icon: '/assets/em-alert-tri.svg',
      },
      'llamar-116': {
        name: 'Bomberos',
        number: '116',
        desc: 'Se marcará el 116 desde tu teléfono. Incendios y rescates. La llamada es gratuita y atiende las 24 horas.',
        icon: '/assets/em-flame.svg',
      },
    }[modal as 'llamar-105' | 'llamar-106' | 'llamar-115' | 'llamar-116'];

    return (
      <div className="modal-backdrop" onClick={() => setModal(null)}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <div style={{ width: 64, height: 64, borderRadius: 32, background: 'var(--secondarysoft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={info.icon} alt="" width={30} height={30} />
          </div>
          <h3 className="t-22" style={{ fontWeight: 700, textAlign: 'center' }}>
            ¿Llamar a {info.name}?
          </h3>
          <p className="t-40" style={{ fontWeight: 700, color: 'var(--primary)', textAlign: 'center' }}>
            {info.number}
          </p>
          <p className="t-15" style={{ color: 'var(--text2)', textAlign: 'center' }}>
            {info.desc}
          </p>
          <a
            href={`tel:${info.number}`}
            className="btn-primary"
            onClick={() => setModal(null)}
          >
            Llamar al {info.number}
          </a>
          <button className="btn-secondary" onClick={() => setModal(null)}>
            Cancelar
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="app-shell">
      {/* Barra superior interactiva de navegación rápida del prototipo Figma AP3 */}
      <header className="proto-bar">
        <div className="proto-bar-group">
          <div
            onClick={() => setScreen('bienvenida')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginRight: 6 }}
          >
            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/shield-check-sm.svg" alt="" width={18} height={18} />
            </div>
            <strong className="t-15">Alerta Perú · AP3</strong>
          </div>

          <select
            className="proto-select"
            value={screen}
            onChange={(e) => setScreen(e.target.value as ScreenId)}
            aria-label="Ir a pantalla del prototipo"
          >
            <optgroup label="1. Acceso, registro e inicio">
              <option value="bienvenida">Bienvenida</option>
              <option value="intro-1">Introducción 1 de 3</option>
              <option value="intro-2">Introducción 2 de 3</option>
              <option value="intro-3">Introducción 3 de 3</option>
              <option value="login">Inicio de sesión</option>
              <option value="login-error">Inicio de sesión - error</option>
              <option value="recuperar">Recuperar cuenta</option>
              <option value="enlace-enviado">Enlace enviado</option>
              <option value="crear-cuenta">Crear cuenta</option>
              <option value="verificar-codigo">Verificar código</option>
              <option value="cuenta-creada">Cuenta creada</option>
              <option value="politica-privacidad">Política de privacidad</option>
              <option value="inicio">Inicio (Pantalla principal)</option>
            </optgroup>
            <optgroup label="2. Flujo de denuncia (6 pasos) y Estado">
              <option value="denuncia-paso-1">Paso 1 · Nueva denuncia (Tipo)</option>
              <option value="denuncia-paso-2">Paso 2 · Descripción</option>
              <option value="denuncia-paso-3">Paso 3 · Ubicación</option>
              <option value="denuncia-paso-4">Paso 4 · Evidencia y Galería</option>
              <option value="denuncia-paso-5">Paso 5 · Privacidad</option>
              <option value="denuncia-paso-6">Paso 6 · Revisión</option>
              <option value="enviando-denuncia">Enviando denuncia</option>
              <option value="confirmacion">Confirmación</option>
              <option value="estado-en-revision">Estado · En revisión</option>
              <option value="estado-robo-atendido">Estado · Robo atendido</option>
              <option value="estado-asalto-atendido">Estado · Asalto atendido</option>
            </optgroup>
            <optgroup label="3. Mapa, Perfil, Accesibilidad y Eliminar cuenta">
              <option value="mapa">Mapa de incidencias</option>
              <option value="perfil">Mi perfil</option>
              <option value="datos-personales">Datos personales</option>
              <option value="historial">Historial de reportes</option>
              <option value="privacidad-seguridad">Privacidad y seguridad</option>
              <option value="accesibilidad">Accesibilidad</option>
              <option value="ap3-eliminar-1">AP3 · Eliminar 1 · Advertencia</option>
              <option value="ap3-eliminar-2">AP3 · Eliminar 2 · Alternativa</option>
              <option value="eliminar-cuenta">AP3 · Eliminar 3 · Confirmación</option>
              <option value="ap3-eliminar-4">AP3 · Eliminar 4 · Periodo de gracia</option>
              <option value="cuenta-eliminada">Cuenta eliminada</option>
            </optgroup>
            <optgroup label="4. Estados de interfaz AP3 (Vacío, Carga, Error)">
              <option value="ap3-catalogo-estados">AP3 · Catálogo de estados</option>
              <option value="ap3-vacio-inicial">AP3 · Estado · Vacío inicial</option>
              <option value="ap3-vacio-busqueda">AP3 · Estado · Vacío por búsqueda</option>
              <option value="ap3-vacio-historial">AP3 · Estado · Vacío por historial</option>
              <option value="ap3-carga-historial">AP3 · Estado · Carga (esqueleto)</option>
              <option value="ap3-error-conexion">AP3 · Estado · Error de conexión</option>
              <option value="ap3-error-sistema">AP3 · Estado · Error del sistema</option>
              <option value="ap3-error-validacion">AP3 · Estado · Error de validación</option>
              <option value="ap3-contenido-no-disponible">AP3 · Estado · Contenido no disponible</option>
              <option value="ap3-sin-permisos">AP3 · Estado · Sin permisos</option>
              <option value="esqueleto-datos-personales">Esqueleto · Datos personales</option>
              <option value="esqueleto-privacidad">Esqueleto · Privacidad y seguridad</option>
              <option value="esqueleto-politica">Esqueleto · Política de privacidad</option>
              <option value="esqueleto-enviando">Esqueleto · Enviando denuncia</option>
              <option value="esqueleto-mapa">Esqueleto · Mapa</option>
            </optgroup>
            <optgroup label="5. Mailing y Sistema de Diseño">
              <option value="mailing">Mailing · 4 Correos + Versión en texto</option>
              <option value="sistema-diseno">Sistema de diseño y Paleta de colores</option>
            </optgroup>
          </select>
        </div>

        <div className="proto-bar-group">
          <button
            className={`proto-chip ${acc.darkMode ? 'active' : ''}`}
            onClick={() => setAcc((p) => ({ ...p, darkMode: !p.darkMode }))}
          >
            {acc.darkMode ? '🌙 Oscuro' : '☀️ Claro'}
          </button>

          <select
            className="proto-select"
            value={acc.daltonismo}
            onChange={(e) => setAcc((p) => ({ ...p, daltonismo: e.target.value as any }))}
            aria-label="Modo de daltonismo"
          >
            <option value="desactivado">Visión: Normal</option>
            <option value="protanopia">Protanopia</option>
            <option value="deuteranopia">Deuteranopia</option>
            <option value="tritanopia">Tritanopia</option>
          </select>

          <button
            className={`proto-chip ${acc.highContrast ? 'active' : ''}`}
            onClick={() => setAcc((p) => ({ ...p, highContrast: !p.highContrast }))}
          >
            Alto contraste
          </button>

          <button
            className={`proto-chip ${acc.guidedTourStep !== null ? 'active' : ''}`}
            onClick={() => setAcc((p) => ({ ...p, guidedTourStep: p.guidedTourStep ? null : 1 }))}
          >
            Recorrido guiado
          </button>

          <button
            className={`proto-chip ${acc.screenReader ? 'active' : ''}`}
            onClick={() => setAcc((p) => ({ ...p, screenReader: !p.screenReader, screenReaderStep: 1 }))}
          >
            Lector de pantalla
          </button>
        </div>
      </header>

      {/* Área de trabajo principal adaptable */}
      <div className={`main-workspace ${showNav ? 'with-nav' : ''}`}>
        {showNav && (
          <nav className="app-nav" aria-label="Navegación principal">
            <button
              type="button"
              className={`nav-item ${activeTab === 'inicio' ? 'active' : ''}`}
              onClick={() => setScreen('inicio')}
            >
              <div className="nav-indicator">
                <img
                  src={activeTab === 'inicio' ? '/assets/nav-home-active.svg' : '/assets/nav-home.svg'}
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <span className="nav-label">Inicio</span>
            </button>

            <button
              type="button"
              className={`nav-item ${activeTab === 'reportar' ? 'active' : ''}`}
              onClick={() => setScreen('denuncia-paso-1')}
            >
              <div className="nav-indicator">
                <img
                  src={activeTab === 'reportar' ? '/assets/nav-reportar-active.svg' : '/assets/nav-reportar.svg'}
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <span className="nav-label">Reportar</span>
            </button>

            <button
              type="button"
              className={`nav-item ${activeTab === 'mapa' ? 'active' : ''}`}
              onClick={() => setScreen('mapa')}
            >
              <div className="nav-indicator">
                <img
                  src={activeTab === 'mapa' ? '/assets/nav-mapa-active.svg' : '/assets/nav-mapa.svg'}
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <span className="nav-label">Mapa</span>
            </button>

            <button
              type="button"
              className={`nav-item ${activeTab === 'perfil' ? 'active' : ''}`}
              onClick={() => setScreen('perfil')}
            >
              <div className="nav-indicator">
                <img
                  src={activeTab === 'perfil' ? '/assets/nav-perfil-active.svg' : '/assets/nav-perfil.svg'}
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <span className="nav-label">Perfil</span>
            </button>
          </nav>
        )}

        <main style={{ flex: 1, width: '100%' }}>
          {AUTH_SCREENS.includes(screen) && (
            <AuthViews
              screen={screen}
              onNavigate={setScreen}
              onToggleDark={() => setAcc((p) => ({ ...p, darkMode: !p.darkMode }))}
            />
          )}

          {(screen.startsWith('denuncia-') ||
            screen === 'enviando-denuncia' ||
            screen === 'confirmacion' ||
            screen.startsWith('estado-') ||
            screen === 'ap3-error-validacion') && (
            <ReportFlowViews
              screen={screen}
              draft={draft}
              setDraft={setDraft}
              onNavigate={setScreen}
              onOpenModal={setModal}
            />
          )}

          {(screen === 'inicio' ||
            screen === 'mapa' ||
            screen === 'perfil' ||
            screen === 'datos-personales' ||
            screen === 'historial' ||
            screen === 'privacidad-seguridad' ||
            screen === 'accesibilidad' ||
            screen === 'eliminar-cuenta' ||
            screen.startsWith('ap3-eliminar-') ||
            screen === 'ap3-catalogo-estados' ||
            screen.startsWith('ap3-vacio-') ||
            screen === 'ap3-carga-historial' ||
            screen === 'ap3-error-conexion' ||
            screen === 'ap3-error-sistema' ||
            screen === 'ap3-contenido-no-disponible' ||
            screen === 'ap3-sin-permisos' ||
            screen.startsWith('esqueleto-')) && (
            <MainTabsViews
              screen={screen}
              acc={acc}
              setAcc={setAcc}
              onNavigate={setScreen}
              onOpenModal={setModal}
            />
          )}

          {screen === 'mailing' && <MailingView onNavigate={setScreen} />}
          {screen === 'sistema-diseno' && <DesignSystemView onNavigate={setScreen} />}
        </main>
      </div>

      {/* Modal: Cerrar sesión */}
      {modal === 'cerrar-sesion' && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ width: 64, height: 64, borderRadius: 32, background: 'var(--secondarysoft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/lock.svg" alt="" width={28} height={28} />
            </div>
            <h3 className="t-22" style={{ fontWeight: 700, textAlign: 'center' }}>¿Cerrar sesión?</h3>
            <p className="t-15" style={{ color: 'var(--text2)', textAlign: 'center' }}>
              Tendrás que ingresar de nuevo para ver tus reportes. Tus denuncias no se pierden.
            </p>
            <button
              className="btn-primary"
              onClick={() => {
                setModal(null);
                setScreen('bienvenida');
              }}
            >
              Cerrar sesión
            </button>
            <button className="btn-secondary" onClick={() => setModal(null)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal: Cancelar envío */}
      {modal === 'cancelar-envio' && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ width: 64, height: 64, borderRadius: 32, background: 'var(--warnsoft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/em-alert-tri.svg" alt="" width={30} height={30} />
            </div>
            <h3 className="t-22" style={{ fontWeight: 700, textAlign: 'center' }}>¿Cancelar el envío?</h3>
            <p className="t-15" style={{ color: 'var(--text2)', textAlign: 'center' }}>
              Tu denuncia no se enviará y perderás lo que escribiste hasta ahora.
            </p>
            <button
              className="btn-danger-solid"
              onClick={() => {
                setModal(null);
                setScreen('inicio');
              }}
            >
              Sí, descartar
            </button>
            <button className="btn-secondary" onClick={() => setModal(null)}>
              Seguir editando
            </button>
          </div>
        </div>
      )}

      {/* Modal: Permiso de ubicación */}
      {modal === 'permiso-ubicacion' && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ width: 64, height: 64, borderRadius: 32, background: 'var(--accentsoft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/map-pin.svg" alt="" width={30} height={30} />
            </div>
            <h3 className="t-22" style={{ fontWeight: 700, textAlign: 'center' }}>
              ¿Permitir el acceso a tu ubicación?
            </h3>
            <p className="t-15" style={{ color: 'var(--text2)', textAlign: 'center' }}>
              Usamos tu ubicación solo para indicar dónde ocurrió el incidente. Siempre podrás ajustarla a mano.
            </p>
            <button
              className="btn-primary"
              onClick={() => {
                setDraft((prev) => ({
                  ...prev,
                  distrito: 'Miraflores, Lima',
                  direccion: 'Av. José Larco 450 (ubicación GPS actual)',
                }));
                setModal(null);
              }}
            >
              Permitir al usar la app
            </button>
            <button className="btn-secondary" onClick={() => setModal(null)}>
              No permitir ahora
            </button>
          </div>
        </div>
      )}

      {/* Modales de Llamadas de Emergencia (105, 106, 115, 116) */}
      {renderEmergencyModal()}

      {/* Superposición: Recorrido guiado (5 pasos) */}
      {acc.guidedTourStep !== null && (() => {
        const gt = GUIDED_TOUR_STEPS[acc.guidedTourStep - 1] || GUIDED_TOUR_STEPS[0];
        return (
          <div className="modal-backdrop">
            <div
              className="modal-card"
              style={{ border: '2px solid var(--primary)', alignItems: 'flex-start', textAlign: 'left' }}
            >
              <span className="t-13" style={{ fontWeight: 600, color: 'var(--text2)' }}>
                Paso {gt.step} de 5
              </span>
              <h3 className="t-22" style={{ fontWeight: 700 }}>{gt.title}</h3>
              <p className="t-16">{gt.desc}</p>

              <div style={{ display: 'flex', gap: 6, margin: '4px 0' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    style={{
                      width: s === gt.step ? 24 : 10,
                      height: 10,
                      borderRadius: 5,
                      background: s === gt.step ? 'var(--primary)' : 'var(--divider)',
                    }}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, width: '100%', marginTop: 8 }}>
                <button
                  className="btn-secondary"
                  onClick={() => setAcc((p) => ({ ...p, guidedTourStep: null }))}
                >
                  Omitir
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    if (gt.step < 5) {
                      const nextStep = GUIDED_TOUR_STEPS[gt.step];
                      setScreen(nextStep.targetScreen);
                      setAcc((p) => ({ ...p, guidedTourStep: gt.step + 1 }));
                    } else {
                      setAcc((p) => ({ ...p, guidedTourStep: null }));
                    }
                  }}
                >
                  {gt.step < 5 ? 'Siguiente' : 'Finalizar'}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Superposición: Lector de pantalla (VoiceOver / TalkBack · 6 vistas) */}
      {acc.screenReader && (() => {
        const sr = SCREEN_READER_STEPS[acc.screenReaderStep - 1] || SCREEN_READER_STEPS[0];
        return (
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 180,
              background: 'var(--secondary)',
              color: '#ffffff',
              padding: '20px 24px',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              boxShadow: '0 -12px 32px rgba(0,0,0,0.35)',
            }}
          >
            <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="t-13" style={{ fontWeight: 600, opacity: 0.9 }}>
                  LECTOR DE PANTALLA · Elemento {sr.step} de 6 ({sr.screenLabel})
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <span
                      key={n}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        background: n === sr.step ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
              <p className="t-18" style={{ fontWeight: 700 }}>{sr.quote}</p>
              <p className="t-13" style={{ opacity: 0.85 }}>
                Desliza a la derecha: siguiente · Doble toque: activar
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
                <button
                  className="btn-secondary"
                  onClick={() => setAcc((p) => ({ ...p, screenReader: false }))}
                >
                  Salir
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    const nextIdx = sr.step < 6 ? sr.step + 1 : 1;
                    const nextItem = SCREEN_READER_STEPS[nextIdx - 1];
                    setScreen(nextItem.targetScreen);
                    setAcc((p) => ({ ...p, screenReaderStep: nextIdx }));
                  }}
                >
                  Siguiente elemento
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
export default App;
