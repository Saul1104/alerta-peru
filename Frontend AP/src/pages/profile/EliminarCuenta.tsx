import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface Props {
  screen: 'ap3-eliminar-1' | 'ap3-eliminar-2' | 'eliminar-cuenta' | 'ap3-eliminar-4';
  onNavigate: (s: ScreenId) => void;
}

export const DeleteAccountFlowPage: React.FC<Props> = ({ screen, onNavigate }) => {
  const [delPass, setDelPass] = useState('••••••••');
  const [delShowPass, setDelShowPass] = useState(false);
  const [delConfirmed, setDelConfirmed] = useState(true);

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
};
