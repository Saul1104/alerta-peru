import React, { useState } from 'react';
import { ScreenId } from '../types';

interface AuthProps {
  screen: ScreenId;
  onNavigate: (s: ScreenId) => void;
  onToggleDark: () => void;
}

export const AuthViews: React.FC<AuthProps> = ({ screen, onNavigate, onToggleDark }) => {
  const [loginEmail, setLoginEmail] = useState('maria.valdez@example.com');
  const [loginPass, setLoginPass] = useState('••••••••••••');
  const [showPass, setShowPass] = useState(false);
  const [recEmail, setRecEmail] = useState('maria.valdez@example.com');
  const [regName, setRegName] = useState('María Valdez');
  const [regDni, setRegDni] = useState('45891234');
  const [regEmail, setRegEmail] = useState('maria.valdez@example.com');
  const [regPass, setRegPass] = useState('Alerta2026');
  const [regPass2, setRegPass2] = useState('Alerta2026');
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegPass2, setShowRegPass2] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState(true);
  const [otpDigits, setOtpDigits] = useState(['4', '8', '2', '9', '1', '3']);

  if (screen === 'bienvenida') {
    return (
      <div className="page-container auth-container" style={{ position: 'relative' }}>
        <button
          onClick={onToggleDark}
          title="Cambiar tema claro/oscuro"
          style={{
            position: 'absolute',
            right: 24,
            top: 12,
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

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: 12 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 28,
              background: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src="/assets/shield-check-lg.svg" alt="Logo Alerta Perú" width={56} height={56} />
          </div>
          <h1 className="t-32" style={{ fontWeight: 700, textAlign: 'center' }}>
            Alerta Perú
          </h1>
          <p className="t-18" style={{ color: 'var(--text2)', textAlign: 'center' }}>
            Reporta. Protege. Actúa.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '12px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
              <img src="/assets/clock.svg" alt="" width={22} height={22} />
            </div>
            <p className="t-16">Reporta en minutos, paso a paso.</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
              <img src="/assets/lock.svg" alt="" width={22} height={22} />
            </div>
            <p className="t-16">Puedes enviar tu reporte de forma anónima.</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
              <img src="/assets/eye.svg" alt="" width={22} height={22} />
            </div>
            <p className="t-16">Sigue el estado de cada reporte.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
          <button className="btn-primary" onClick={() => onNavigate('login')}>
            Iniciar sesión
          </button>
          <button className="btn-secondary" onClick={() => onNavigate('crear-cuenta')}>
            Crear cuenta
          </button>
          <button
            className="btn-secondary"
            style={{ borderStyle: 'dashed', minHeight: 44 }}
            onClick={() => onNavigate('intro-1')}
          >
            Ver introducción (3 pasos)
          </button>
          <p
            className="t-13"
            style={{ color: 'var(--text2)', textAlign: 'center', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => onNavigate('politica-privacidad')}
          >
            Al continuar aceptas la Política de privacidad y el tratamiento de tus datos personales.
          </p>
        </div>
      </div>
    );
  }

  if (screen === 'intro-1' || screen === 'intro-2' || screen === 'intro-3') {
    const step = screen === 'intro-1' ? 1 : screen === 'intro-2' ? 2 : 3;
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
        next: 'bienvenida' as ScreenId,
        cta: 'Comenzar',
      },
    }[step];

    return (
      <div className="page-container auth-container">
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => onNavigate('bienvenida')}
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
          <img src="/assets/intro-ellipse1.svg" alt="" width={210} height={210} style={{ position: 'absolute' }} />
          <img src="/assets/intro-ellipse2.svg" alt="" width={140} height={140} style={{ position: 'absolute' }} />
          <img src={config.icon} alt="" width={74} height={74} style={{ position: 'relative', zIndex: 2 }} />
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
  }

  if (screen === 'login' || screen === 'login-error') {
    const isError = screen === 'login-error';
    return (
      <div className="page-container auth-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => onNavigate('bienvenida')}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src="/assets/shield-check-sm.svg" alt="Alerta Perú" width={28} height={28} />
          </div>
          <span className="t-22" style={{ fontWeight: 700 }}>
            Alerta Perú
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h1 className="t-28" style={{ fontWeight: 700 }}>
            Iniciar sesión
          </h1>
          <p className="t-15" style={{ color: 'var(--text2)' }}>
            Ingresa para hacer seguimiento a tus reportes.
          </p>
        </div>

        {isError && (
          <div className="alert-box alert-error">
            <img src="/assets/alert-error.svg" alt="" width={24} height={24} />
            <p className="t-14">
              El correo o la contraseña no coinciden. Verifica tus datos o recupera tu cuenta.
            </p>
          </div>
        )}

        <div className="field-group">
          <label className="field-label">Correo electrónico</label>
          <div className={`field-box ${isError ? 'error' : ''}`}>
            <input
              type="email"
              className="field-input"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
            />
          </div>
          <span className="field-help">Usa el correo con el que te registraste.</span>
        </div>

        <div className="field-group">
          <label className="field-label">Contraseña</label>
          <div className={`field-box ${isError ? 'error' : ''}`}>
            <input
              type={showPass ? 'text' : 'password'}
              className="field-input"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              placeholder="Escribe tu contraseña"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
              className="t-14"
            >
              {showPass ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => onNavigate(isError ? 'login' : 'login-error')}
            style={{ background: 'transparent', border: 'none', color: 'var(--text2)', textDecoration: 'underline', cursor: 'pointer' }}
            className="t-13"
          >
            {isError ? 'Ocultar estado de error' : 'Simular error de acceso'}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('recuperar')}
            style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
            className="t-15"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button className="btn-primary" onClick={() => onNavigate('inicio')}>
          Iniciar sesión
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, paddingTop: 8 }} className="t-15">
          <span style={{ color: 'var(--text2)' }}>¿No tienes cuenta?</span>
          <button
            onClick={() => onNavigate('crear-cuenta')}
            style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', fontWeight: 700, cursor: 'pointer' }}
            className="t-15"
          >
            Crear cuenta
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'recuperar') {
    return (
      <div className="page-container auth-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => onNavigate('login')}
            style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
          </button>
          <h1 className="t-24" style={{ fontWeight: 700 }}>
            Recuperar cuenta
          </h1>
        </div>

        <p className="t-16" style={{ color: 'var(--text2)' }}>
          Ingresa el correo de tu cuenta y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        <div className="field-group">
          <label className="field-label">Correo electrónico</label>
          <div className="field-box">
            <input
              type="email"
              className="field-input"
              value={recEmail}
              onChange={(e) => setRecEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
            />
          </div>
          <span className="field-help">Ej. maria.valdez@example.com</span>
        </div>

        <button className="btn-primary" onClick={() => onNavigate('enlace-enviado')}>
          Enviar enlace de recuperación
        </button>

        <div className="alert-box alert-info">
          <img src="/assets/alert-info.svg" alt="" width={24} height={24} />
          <p className="t-14">
            Revisa tu bandeja de entrada. Si no encuentras el mensaje, revisa también la carpeta de spam o correo no deseado.
          </p>
        </div>

        <button className="btn-secondary" onClick={() => onNavigate('login')}>
          Volver a iniciar sesión
        </button>
      </div>
    );
  }

  if (screen === 'enlace-enviado') {
    return (
      <div className="page-container auth-container" style={{ alignItems: 'center', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, alignSelf: ' stretch' }}>
          <button
            onClick={() => onNavigate('recuperar')}
            style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
          </button>
          <h1 className="t-24" style={{ fontWeight: 700 }}>
            Recuperar cuenta
          </h1>
        </div>

        <div style={{ width: 96, height: 96, borderRadius: 48, background: 'var(--secondarysoft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
          <img src="/assets/send-lg.svg" alt="" width={44} height={44} />
        </div>

        <h2 className="t-24" style={{ fontWeight: 700 }}>
          Te enviamos un enlace
        </h2>
        <p className="t-16" style={{ color: 'var(--text2)' }}>
          Si el correo está registrado, recibirás las instrucciones para crear una nueva contraseña.
        </p>

        <div className="alert-box alert-info" style={{ textAlign: 'left' }}>
          <img src="/assets/alert-info.svg" alt="" width={24} height={24} />
          <p className="t-14">
            El enlace vence en 30 minutos. Por seguridad, no lo compartas con nadie.
          </p>
        </div>

        <button className="btn-primary" onClick={() => onNavigate('login')}>
          Volver a iniciar sesión
        </button>
        <button className="btn-secondary" onClick={() => onNavigate('mailing')}>
          Ver correo enviado (Mailing)
        </button>
      </div>
    );
  }

  if (screen === 'crear-cuenta') {
    return (
      <div className="page-container auth-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => onNavigate('bienvenida')}
            style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
          </button>
          <h1 className="t-24" style={{ fontWeight: 700 }}>
            Crear cuenta
          </h1>
        </div>

        <div className="field-group">
          <label className="field-label">Nombre completo</label>
          <div className="field-box">
            <input className="field-input" value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Tu nombre y apellidos" />
          </div>
        </div>

        <div className="field-group">
          <label className="field-label">DNI (obligatorio)</label>
          <div className="field-box">
            <input className="field-input" value={regDni} onChange={(e) => setRegDni(e.target.value)} placeholder="8 dígitos" maxLength={8} />
          </div>
          <span className="field-help">Verificamos tu identidad con RENIEC para evitar denuncias falsas.</span>
        </div>

        <div className="field-group">
          <label className="field-label">Correo electrónico</label>
          <div className="field-box">
            <input type="email" className="field-input" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" />
          </div>
        </div>

        <div className="field-group">
          <label className="field-label">Contraseña</label>
          <div className="field-box">
            <input
              type={showRegPass ? 'text' : 'password'}
              className="field-input"
              value={regPass}
              onChange={(e) => setRegPass(e.target.value)}
              placeholder="Escribe tu contraseña"
            />
            <button
              type="button"
              onClick={() => setShowRegPass(!showRegPass)}
              style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
              className="t-14"
            >
              {showRegPass ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          <span className="field-help">Usa letras y números.</span>
        </div>

        <div className="field-group">
          <label className="field-label">Confirmar contraseña</label>
          <div className="field-box">
            <input
              type={showRegPass2 ? 'text' : 'password'}
              className="field-input"
              value={regPass2}
              onChange={(e) => setRegPass2(e.target.value)}
              placeholder="Repite tu contraseña"
            />
            <button
              type="button"
              onClick={() => setShowRegPass2(!showRegPass2)}
              style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
              className="t-14"
            >
              {showRegPass2 ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, paddingTop: 4 }}>
          <button
            type="button"
            onClick={() => setAcceptPolicy(!acceptPolicy)}
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: acceptPolicy ? 'var(--primary)' : 'var(--surface)',
              border: '2px solid var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {acceptPolicy && <img src="/assets/check-white.svg" alt="" width={16} height={16} />}
          </button>
          <p className="t-14">
            Acepto la{' '}
            <span
              onClick={() => onNavigate('politica-privacidad')}
              style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
            >
              Política de privacidad
            </span>{' '}
            y el tratamiento de mis datos personales (Ley 29733).
          </p>
        </div>

        <button className="btn-primary" onClick={() => onNavigate('verificar-codigo')}>
          Crear cuenta
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }} className="t-15">
          <span style={{ color: 'var(--text2)' }}>¿Ya tienes cuenta?</span>
          <button
            onClick={() => onNavigate('login')}
            style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', fontWeight: 700, cursor: 'pointer' }}
            className="t-15"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'verificar-codigo') {
    return (
      <div className="page-container auth-container" style={{ alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
          <button
            onClick={() => onNavigate('crear-cuenta')}
            style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
          </button>
          <h1 className="t-24" style={{ fontWeight: 700 }}>
            Verifica tu cuenta
          </h1>
        </div>

        <div style={{ width: 80, height: 80, borderRadius: 40, background: 'var(--accentsoft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/assets/mail-lg.svg" alt="" width={36} height={36} />
        </div>

        <h2 className="t-24" style={{ fontWeight: 700, textAlign: 'center' }}>
          Revisa tu correo
        </h2>
        <p className="t-16" style={{ color: 'var(--text2)', textAlign: 'center' }}>
          Enviamos un código de 6 dígitos a ma***@example.com. Ingrésalo para confirmar tu identidad.
        </p>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {otpDigits.map((d, i) => (
            <input
              key={i}
              value={d}
              maxLength={1}
              onChange={(e) => {
                const copy = [...otpDigits];
                copy[i] = e.target.value;
                setOtpDigits(copy);
              }}
              style={{
                width: 48,
                height: 56,
                borderRadius: 12,
                border: '1.5px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text)',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 24,
              }}
            />
          ))}
        </div>

        <p className="t-14" style={{ color: 'var(--text2)' }}>
          Reenviar código en 00:42
        </p>

        <div className="alert-box alert-info">
          <img src="/assets/alert-info.svg" alt="" width={24} height={24} />
          <p className="t-14">Si no lo ves, revisa tu carpeta de spam o correo no deseado.</p>
        </div>

        <button className="btn-primary" onClick={() => onNavigate('cuenta-creada')}>
          Verificar y crear cuenta
        </button>
        <button className="btn-secondary" onClick={() => onNavigate('crear-cuenta')}>
          Cambiar correo
        </button>
      </div>
    );
  }

  if (screen === 'cuenta-creada') {
    return (
      <div className="page-container auth-container" style={{ alignItems: 'center', textAlign: 'center' }}>
        <h1 className="t-24" style={{ fontWeight: 700, alignSelf: 'flex-start' }}>
          Cuenta creada
        </h1>

        <div style={{ width: 96, height: 96, borderRadius: 48, background: 'var(--successsoft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
          <img src="/assets/check-success-lg.svg" alt="" width={44} height={44} />
        </div>

        <h2 className="t-26" style={{ fontWeight: 700 }}>
          ¡Tu cuenta está lista!
        </h2>
        <p className="t-16" style={{ color: 'var(--text2)' }}>
          Ya puedes reportar incidentes, seguir el estado de tus denuncias y recibir avisos.
        </p>

        <div className="alert-box alert-success" style={{ textAlign: 'left' }}>
          <img src="/assets/alert-check.svg" alt="" width={24} height={24} />
          <p className="t-14">
            Tu DNI fue verificado con RENIEC. Tus datos están protegidos (Ley 29733).
          </p>
        </div>

        <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => onNavigate('inicio')}>
          Entrar a la app
        </button>
      </div>
    );
  }

  if (screen === 'politica-privacidad') {
    const sections = [
      {
        title: '1. Qué datos recopilamos',
        text: 'Nombre, DNI, correo y los datos de tus denuncias (tipo, fecha, ubicación aproximada y evidencia opcional).',
      },
      {
        title: '2. Para qué los usamos',
        text: 'Solo para registrar y dar seguimiento a tus reportes. Nunca vendemos tus datos ni los usamos para publicidad.',
      },
      {
        title: '3. Tus derechos (Ley 29733)',
        text: 'Puedes acceder, rectificar, cancelar u oponerte al uso de tus datos desde Privacidad y seguridad.',
      },
      {
        title: '4. Reportes anónimos',
        text: 'Puedes enviar una denuncia sin mostrar tu identidad. Las autoridades solo verán lo que tú autorices.',
      },
      {
        title: '5. Eliminar tu cuenta',
        text: 'Al eliminar tu cuenta borramos tus datos personales. Los reportes enviados se conservan sin identificarte.',
      },
    ];

    return (
      <div className="page-container auth-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => onNavigate('bienvenida')}
            style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
          </button>
          <h1 className="t-24" style={{ fontWeight: 700 }}>
            Política de privacidad
          </h1>
        </div>

        <div className="card-surface" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {sections.map((s) => (
            <div key={s.title} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p className="t-16" style={{ fontWeight: 600 }}>
                {s.title}
              </p>
              <p className="t-14" style={{ color: 'var(--text2)' }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>

        <button className="btn-primary" onClick={() => onNavigate('bienvenida')}>
          Entendido
        </button>
      </div>
    );
  }

  if (screen === 'cuenta-eliminada') {
    return (
      <div className="page-container auth-container" style={{ alignItems: 'center', textAlign: 'center' }}>
        <h1 className="t-24" style={{ fontWeight: 700, alignSelf: 'flex-start' }}>
          Cuenta eliminada
        </h1>

        <div style={{ width: 96, height: 96, borderRadius: 48, background: 'var(--secondarysoft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
          <img src="/assets/trash-lg.svg" alt="" width={44} height={44} />
        </div>

        <h2 className="t-24" style={{ fontWeight: 700 }}>
          Tu cuenta fue eliminada
        </h2>
        <p className="t-16" style={{ color: 'var(--text2)' }}>
          Borramos tus datos personales. Los reportes ya enviados se conservan de forma anónima.
        </p>

        <div className="alert-box alert-info" style={{ textAlign: 'left' }}>
          <img src="/assets/alert-info.svg" alt="" width={24} height={24} />
          <p className="t-14">Si quieres volver, puedes crear una cuenta nueva cuando quieras.</p>
        </div>

        <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => onNavigate('bienvenida')}>
          Volver a la bienvenida
        </button>
      </div>
    );
  }

  return null;
};
