import React, { useState } from 'react';
import { ScreenId } from '../types';

interface Props {
  onNavigate: (s: ScreenId) => void;
}

const COLOR_SWATCHES = [
  { name: 'Fondo', code: '#FBF7F5  ·  bg', varName: 'var(--bg)', desc: 'Fondo general de pantallas' },
  { name: 'Superficie', code: '#FFFFFF  ·  surface', varName: 'var(--surface)', desc: 'Tarjetas, campos y barra de navegación' },
  { name: 'Texto', code: '#161E2F  ·  text', varName: 'var(--text)', desc: 'Texto principal' },
  { name: 'Texto secundario', code: '#384358  ·  text2', varName: 'var(--text2)', desc: 'Ayudas, descripciones y etiquetas' },
  { name: 'Borde', code: '#747C90  ·  border', varName: 'var(--border)', desc: 'Bordes de campos y tarjetas (≥ 3:1)' },
  { name: 'Divisor', code: '#EADFDB  ·  divider', varName: 'var(--divider)', desc: 'Separadores y barras de fondo' },
  { name: 'Primario', code: '#541A2E  ·  primary', varName: 'var(--primary)', desc: 'Acciones principales, enlaces y estado activo' },
  { name: 'Primario suave', code: '#F6E7EB  ·  primarySoft', varName: 'var(--primarysoft)', desc: 'Fondos de selección e información' },
  { name: 'Sobre primario', code: '#FFFFFF  ·  onPrimary', varName: 'var(--onprimary)', desc: 'Texto e iconos sobre color primario o de error' },
  { name: 'Secundario', code: '#242F49  ·  secondary', varName: 'var(--secondary)', desc: 'Botones secundarios, números de emergencia, información y progreso' },
  { name: 'Secundario suave', code: '#E8EBF2  ·  secondarySoft', varName: 'var(--secondarysoft)', desc: 'Fondos de información y contactos' },
  { name: 'Acento', code: '#FFA586  ·  accent', varName: 'var(--accent)', desc: 'Detalles destacados: logo y resaltes (no usar para texto sobre blanco)' },
  { name: 'Acento suave', code: '#FFE8DF  ·  accentSoft', varName: 'var(--accentsoft)', desc: 'Fondo de elementos activos, iconos y beneficios' },
  { name: 'Error', code: '#B51A2B  ·  danger', varName: 'var(--danger)', desc: 'Errores y acciones destructivas' },
  { name: 'Error suave', code: '#FBE5E8  ·  dangerSoft', varName: 'var(--dangersoft)', desc: 'Fondo de alertas de error' },
  { name: 'Éxito', code: '#166A43  ·  success', varName: 'var(--success)', desc: 'Confirmaciones y pasos completados' },
  { name: 'Éxito suave', code: '#E3F5EA  ·  successSoft', varName: 'var(--successsoft)', desc: 'Fondo de éxito' },
  { name: 'Aviso', code: '#8A5600  ·  warn', varName: 'var(--warn)', desc: 'Estado "En revisión" y avisos' },
  { name: 'Aviso suave', code: '#FFF1D6  ·  warnSoft', varName: 'var(--warnsoft)', desc: 'Fondo de avisos' },
];

const EMAIL_TEMPLATES = [
  {
    id: 'bienvenida',
    tabLabel: '1. Bienvenida y verificación',
    subject: 'Te damos la bienvenida a Alerta Perú',
    title: 'Hola, María: ya eres parte de Alerta Perú',
    body: [
      'Tu cuenta quedó registrada. Falta un paso: confirma que este correo es tuyo.',
    ],
    ctaLabel: 'Verificar mi correo',
    ctaTarget: 'cuenta-creada' as ScreenId,
    helper: 'El enlace vale 24 horas. Si el botón no funciona, copia este enlace: alertaperu.pe/verificar/7Hk2',
    extraTitle: 'Tus primeros pasos',
    extraList: [
      '1. Haz tu primera denuncia desde "Reportar".',
      '2. Mira los incidentes de tu zona en "Mapa".',
      '3. Ajusta texto, contraste y recorrido guiado en Perfil > Accesibilidad.',
    ],
    plainText: `Asunto: Te damos la bienvenida a Alerta Perú

Hola, María: ya eres parte de Alerta Perú

Tu cuenta quedó registrada. Falta un paso: confirma que este correo es tuyo.

> Verificar mi correo: [enlace en una línea propia]

El enlace vale 24 horas. Si el botón no funciona, copia este enlace: alertaperu.pe/verificar/7Hk2

Tus primeros pasos

1. Haz tu primera denuncia desde "Reportar".

2. Mira los incidentes de tu zona en "Mapa".

3. Ajusta texto, contraste y recorrido guiado en Perfil > Accesibilidad.

---
Ayuda: ayuda@alertaperu.pe · Emergencias: 105
Imágenes: logotipo de Alerta Perú (texto alternativo: "Alerta Perú"). Ningún dato importante depende del color o de las imágenes.`,
  },
  {
    id: 'codigo',
    tabLabel: '2. Código de 6 dígitos',
    subject: 'Tu código para verificar el correo',
    title: 'Verifica tu correo',
    body: [
      'Ingresa este código en la aplicación para confirmar que la dirección es tuya.',
    ],
    codeBadge: '482913',
    ctaLabel: 'Abrir Alerta Perú',
    ctaTarget: 'verificar-codigo' as ScreenId,
    helper: 'El código vale 15 minutos. Si no lo solicitaste, ignora este mensaje: nadie podrá usar tu cuenta sin el código.',
    plainText: `Asunto: Tu código para verificar el correo

Verifica tu correo

Ingresa este código en la aplicación para confirmar que la dirección es tuya.

Código: 482913

El código vale 15 minutos. Si no lo solicitaste, ignora este mensaje: nadie podrá usar tu cuenta sin el código.

> Abrir Alerta Perú: [enlace en una línea propia]

---
Ayuda: ayuda@alertaperu.pe · Emergencias: 105
Imágenes: logotipo de Alerta Perú (texto alternativo: "Alerta Perú"). Ningún dato importante depende del color o de las imágenes.`,
  },
  {
    id: 'recuperar',
    tabLabel: '3. Restablecer contraseña',
    subject: 'Restablece tu contraseña',
    title: 'Restablece tu contraseña',
    body: [
      'Recibimos una solicitud para cambiar la contraseña de maria.valdez@example.com.',
    ],
    ctaLabel: 'Crear nueva contraseña',
    ctaTarget: 'login' as ScreenId,
    helper: 'El enlace vale 30 minutos. Si no lo solicitaste, no hagas nada: tu contraseña actual sigue siendo la misma. Si el botón no funciona, copia este enlace: alertaperu.pe/clave/Qx81',
    plainText: `Asunto: Restablece tu contraseña

Restablece tu contraseña

Recibimos una solicitud para cambiar la contraseña de maria.valdez@example.com.

> Crear nueva contraseña: [enlace en una línea propia]

El enlace vale 30 minutos. Si no lo solicitaste, no hagas nada: tu contraseña actual sigue siendo la misma.

Si el botón no funciona, copia este enlace: alertaperu.pe/clave/Qx81

---
Ayuda: ayuda@alertaperu.pe · Emergencias: 105
Imágenes: logotipo de Alerta Perú (texto alternativo: "Alerta Perú"). Ningún dato importante depende del color o de las imágenes.`,
  },
  {
    id: 'eliminar',
    tabLabel: '4. Solicitud de eliminación',
    subject: 'Recibimos tu solicitud de eliminar la cuenta',
    title: 'Recibimos tu solicitud de eliminación',
    body: [
      'Tu cuenta se eliminará el 7 de diciembre de 2026. Hasta esa fecha puedes cancelarla.',
      'Se eliminan: tu perfil, tus datos de contacto y tu historial.',
      'Se conservan, sin tus datos personales: los reportes ya enviados.',
    ],
    ctaLabel: 'Cancelar la eliminación',
    ctaTarget: 'ap3-eliminar-4' as ScreenId,
    helper: 'También puedes cancelar iniciando sesión antes de esa fecha. Si no fuiste tú, cancélala ahora y cambia tu contraseña.',
    plainText: `Asunto: Recibimos tu solicitud de eliminar la cuenta

Recibimos tu solicitud de eliminación

Tu cuenta se eliminará el 7 de diciembre de 2026. Hasta esa fecha puedes cancelarla.

Qué pasará con tus datos

Se eliminan: tu perfil, tus datos de contacto y tu historial.

Se conservan, sin tus datos personales: los reportes ya enviados.

> Cancelar la eliminación: [enlace en una línea propia]

También puedes cancelar iniciando sesión antes de esa fecha. Si no fuiste tú, cancélala ahora y cambia tu contraseña.

---
Ayuda: ayuda@alertaperu.pe · Emergencias: 105
Imágenes: logotipo de Alerta Perú (texto alternativo: "Alerta Perú"). Ningún dato importante depende del color o de las imágenes.`,
  },
];

export const MailingView: React.FC<Props> = ({ onNavigate }) => {
  const [selectedEmail, setSelectedEmail] = useState(0);
  const [viewMode, setViewMode] = useState<'ambos' | 'html' | 'texto'>('ambos');
  const mail = EMAIL_TEMPLATES[selectedEmail];

  return (
    <div className="page-container wide">
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <h1 className="t-24" style={{ fontWeight: 700 }}>Mailing y correos transaccionales (AP3)</h1>
          <p className="t-15" style={{ color: 'var(--text2)' }}>
            Correos diseñados en contenedor de Gmail + versión equivalente en texto simple accesible.
          </p>
        </div>
        <button className="btn-secondary" style={{ width: 'auto' }} onClick={() => onNavigate('inicio')}>
          Volver al Inicio
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {EMAIL_TEMPLATES.map((t, idx) => (
          <button
            key={t.id}
            className={`proto-chip ${selectedEmail === idx ? 'active' : ''}`}
            onClick={() => setSelectedEmail(idx)}
          >
            {t.tabLabel}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {(['ambos', 'html', 'texto'] as const).map((m) => (
          <button
            key={m}
            className={`proto-chip ${viewMode === m ? 'active' : ''}`}
            onClick={() => setViewMode(m)}
          >
            {m === 'ambos' ? 'Ver HTML + Texto simple' : m === 'html' ? 'Solo Correo diseñado' : 'Solo Versión en texto'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: viewMode === 'ambos' ? 'repeat(auto-fit, minmax(340px, 1fr))' : '1fr', gap: 24, alignItems: 'start' }}>
        {(viewMode === 'ambos' || viewMode === 'html') && (
          <div className="card-bordered" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Cabecera estilo bandeja Gmail */}
            <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--divider)', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span className="t-18" style={{ fontWeight: 700 }}>{mail.subject}</span>
                <span className="t-12" style={{ background: 'var(--secondarysoft)', color: 'var(--secondary)', padding: '2px 8px', borderRadius: 6, fontWeight: 600 }}>Recibidos</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: 'var(--primary)', color: 'var(--onprimary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>
                  AP
                </div>
                <div style={{ flex: 1 }}>
                  <p className="t-14" style={{ fontWeight: 700 }}>Alerta Perú <span style={{ fontWeight: 400, color: 'var(--text2)' }}>&lt;no-responder@alertaperu.pe&gt;</span></p>
                  <p className="t-12" style={{ color: 'var(--text2)' }}>para maria.valdez@example.com · 23:10 (hace 1 min)</p>
                </div>
              </div>
            </div>

            {/* Cuerpo del correo diseñado de Alerta Perú */}
            <div style={{ background: 'var(--bg)', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/assets/shield-check-sm.svg" alt="Alerta Perú" width={28} height={28} />
                </div>
                <span className="t-20" style={{ fontWeight: 700 }}>Alerta Perú</span>
              </div>

              <div className="card-bordered" style={{ borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p className="t-14" style={{ fontWeight: 600, color: 'var(--text2)' }}>
                  Asunto: {mail.subject}
                </p>
                <div style={{ height: 1, background: 'var(--divider)', width: '100%' }} />
                <h2 className="t-24" style={{ fontWeight: 700 }}>{mail.title}</h2>
                {mail.body.map((p, i) => (
                  <p key={i} className="t-16">{p}</p>
                ))}

                {mail.codeBadge && (
                  <div style={{ background: 'var(--bg)', border: '1.5px solid var(--divider)', borderRadius: 12, padding: '14px 20px', textAlign: 'center' }}>
                    <p className="t-13" style={{ color: 'var(--text2)' }}>Código de verificación</p>
                    <p className="t-28" style={{ fontWeight: 700, letterSpacing: 4 }}>{mail.codeBadge}</p>
                  </div>
                )}

                <button className="btn-primary" onClick={() => onNavigate(mail.ctaTarget)}>
                  {mail.ctaLabel}
                </button>

                <p className="t-14" style={{ color: 'var(--text2)' }}>{mail.helper}</p>

                {mail.extraTitle && (
                  <>
                    <p className="t-18" style={{ fontWeight: 700 }}>{mail.extraTitle}</p>
                    {mail.extraList?.map((item, idx) => (
                      <p key={idx} className="t-16">{item}</p>
                    ))}
                  </>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, color: 'var(--text2)' }} className="t-14">
                <p>¿Necesitas ayuda? Escríbenos a ayuda@alertaperu.pe. En una emergencia llama al 105.</p>
                <p>Recibes este correo porque tienes una cuenta en Alerta Perú. Este mensaje incluye una versión en texto simple.</p>
              </div>
            </div>
          </div>
        )}

        {(viewMode === 'ambos' || viewMode === 'texto') && (
          <div className="card-bordered" style={{ borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="t-14" style={{ fontWeight: 700, color: 'var(--secondary)' }}>
                Versión en texto · Full UI / Single / No Draft
              </span>
              <span className="t-12" style={{ color: 'var(--text2)' }}>Accesible para lectores de pantalla</span>
            </div>
            <pre
              className="t-15"
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1.5,
                color: 'var(--text)',
              }}
            >
              {mail.plainText}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export const DesignSystemView: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="page-container wide">
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <h1 className="t-24" style={{ fontWeight: 700 }}>Sistema de diseño y Paleta de colores · Alerta Perú</h1>
          <p className="t-15" style={{ color: 'var(--text2)' }}>
            Tokens de color dinámicos (cambian al activar modo oscuro, daltonismo o alto contraste) y componentes base.
          </p>
        </div>
        <button className="btn-secondary" style={{ width: 'auto' }} onClick={() => onNavigate('inicio')}>
          Volver al Inicio
        </button>
      </div>

      {/* Paleta de colores */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 className="t-20" style={{ fontWeight: 700 }}>Paleta de colores (19 tokens semánticos)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 16 }}>
          {COLOR_SWATCHES.map((s) => (
            <div key={s.name} className="card-surface" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 80, background: s.varName, borderBottom: '1px solid var(--divider)' }} />
              <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <p className="t-14" style={{ fontWeight: 700 }}>{s.name}</p>
                <p className="t-12" style={{ color: 'var(--text2)', fontFamily: 'monospace' }}>{s.code}</p>
                <p className="t-12" style={{ color: 'var(--text2)' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Componentes base */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 className="t-20" style={{ fontWeight: 700 }}>Sistema de diseño · Componentes</h2>
        <div className="responsive-grid-2" style={{ gap: 20 }}>
          <div className="card-surface" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p className="t-14" style={{ fontWeight: 700, color: 'var(--text2)' }}>BOTONES Y LOGOTIPOS</p>
            <button className="btn-primary">Botón/Primario</button>
            <button className="btn-secondary">Botón/Secundario</button>
            <button className="btn-destructive">Botón/Destructivo</button>
            <button className="btn-danger-solid">Botón/Peligro sólido</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 8 }}>
              <div style={{ width: 96, height: 96, borderRadius: 28, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/assets/shield-check-lg.svg" alt="Logo Grande" width={56} height={56} />
              </div>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/assets/shield-check-sm.svg" alt="Logo Pequeño" width={28} height={28} />
              </div>
            </div>
          </div>

          <div className="card-surface" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p className="t-14" style={{ fontWeight: 700, color: 'var(--text2)' }}>CAMPOS, OPCIONES Y ALERTAS</p>
            <div className="field-group">
              <label className="field-label">Etiqueta</label>
              <div className="field-box">
                <input className="field-input" defaultValue="Valor" readOnly />
                <span className="t-14" style={{ fontWeight: 600, color: 'var(--primary)' }}>Mostrar</span>
              </div>
              <span className="field-help">Ayuda</span>
            </div>

            <div className="option-card">
              <img src="/assets/radio-normal.svg" alt="" width={24} height={24} />
              <div>
                <p className="t-16" style={{ fontWeight: 500 }}>Opción/Normal</p>
                <p className="t-13" style={{ color: 'var(--text2)' }}>Detalle</p>
              </div>
            </div>

            <div className="option-card selected">
              <img src="/assets/radio-selected.svg" alt="" width={24} height={24} />
              <div>
                <p className="t-16" style={{ fontWeight: 500 }}>Opción/Seleccionada</p>
                <p className="t-13" style={{ color: 'var(--text2)' }}>Detalle</p>
              </div>
            </div>

            <div className="alert-box alert-error">
              <img src="/assets/alert-error.svg" alt="" width={24} height={24} />
              <p className="t-14">Alerta/Error · Mensaje de alerta crítica</p>
            </div>
            <div className="alert-box alert-info">
              <img src="/assets/alert-info.svg" alt="" width={24} height={24} />
              <p className="t-14">Alerta/Información · Mensaje informativo</p>
            </div>
            <div className="alert-box alert-success">
              <img src="/assets/alert-check.svg" alt="" width={24} height={24} />
              <p className="t-14">Alerta/Éxito · Operación completada</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
