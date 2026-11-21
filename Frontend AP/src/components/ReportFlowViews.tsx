import React from 'react';
import { ModalType, ReportDraft, ScreenId } from '../types';

interface Props {
  screen: ScreenId;
  draft: ReportDraft;
  setDraft: React.Dispatch<React.SetStateAction<ReportDraft>>;
  onNavigate: (s: ScreenId) => void;
  onOpenModal: (m: ModalType) => void;
}

const INCIDENT_TYPES = [
  'Robo o asalto',
  'Accidente de tránsito',
  'Incendio',
  'Emergencia médica',
  'Violencia o agresión',
  'Peligro en la vía pública',
  'Otro',
];

const DISTRICTS = [
  'Miraflores, Lima',
  'San Isidro, Lima',
  'Santiago de Surco, Lima',
  'Barranco, Lima',
  'Lince, Lima',
  'Cercado de Lima',
];

export const ReportFlowViews: React.FC<Props> = ({
  screen,
  draft,
  setDraft,
  onNavigate,
  onOpenModal,
}) => {
  const renderProgress = (step: number, pct: number) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="t-14">
        <span style={{ fontWeight: 600 }}>Paso {step} de 6</span>
        <span style={{ color: 'var(--text2)' }}>{pct} % completado</span>
      </div>
      <div style={{ height: 8, background: 'var(--divider)', borderRadius: 4, overflow: 'hidden', width: '100%' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--secondary)', borderRadius: 4, transition: 'width 0.25s ease' }} />
      </div>
    </div>
  );

  // PASO 1: ¿Qué sucedió?
  if (screen === 'denuncia-paso-1') {
    return (
      <div className="page-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => onNavigate('inicio')}
            style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
          </button>
          <h1 className="t-24" style={{ fontWeight: 700 }}>Nueva denuncia</h1>
        </div>

        {renderProgress(1, 17)}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h2 className="t-22" style={{ fontWeight: 700 }}>¿Qué sucedió?</h2>
          <p className="t-15" style={{ color: 'var(--text2)' }}>
            Selecciona una opción. Si hay peligro inmediato, llama al 105.
          </p>
        </div>

        <div className="responsive-grid-2">
          {INCIDENT_TYPES.map((t) => {
            const selected = draft.tipo === t;
            return (
              <button
                key={t}
                type="button"
                className={`option-card ${selected ? 'selected' : ''}`}
                onClick={() => setDraft((prev) => ({ ...prev, tipo: t }))}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    border: selected ? '2px solid var(--primary)' : '2px solid var(--border)',
                    background: selected ? 'var(--primary)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {selected && <img src="/assets/check-white.svg" alt="" width={14} height={14} />}
                </div>
                <span className="t-16" style={{ fontWeight: 500 }}>{t}</span>
              </button>
            );
          })}
        </div>

        <button className="btn-primary" onClick={() => onNavigate('denuncia-paso-2')}>
          Continuar
        </button>
      </div>
    );
  }

  // PASO 2: Descripción (normal + error de validación AP3)
  if (screen === 'denuncia-paso-2' || screen === 'ap3-error-validacion') {
    const isValidationErr = screen === 'ap3-error-validacion' || (draft.descripcion.length > 0 && draft.descripcion.length < 10);
    return (
      <div className="page-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => onNavigate('denuncia-paso-1')}
            style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
          </button>
          <h1 className="t-24" style={{ fontWeight: 700 }}>Nueva denuncia</h1>
        </div>

        {renderProgress(2, 33)}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h2 className="t-22" style={{ fontWeight: 700 }}>Describe lo ocurrido</h2>
          <p className="t-15" style={{ color: 'var(--text2)' }}>
            Incluye los datos que recuerdes.
          </p>
        </div>

        <div className="field-group">
          <label className="field-label">Descripción (obligatorio)</label>
          <textarea
            className={`field-textarea ${isValidationErr ? 'error' : ''}`}
            value={screen === 'ap3-error-validacion' && draft.descripcion.length >= 10 ? 'Robo' : draft.descripcion}
            onChange={(e) => setDraft((prev) => ({ ...prev, descripcion: e.target.value.slice(0, 500) }))}
            placeholder="Cuenta qué ocurrió con tus palabras…"
          />
          {isValidationErr ? (
            <span className="t-13" style={{ color: 'var(--danger)', fontWeight: 600 }}>
              Error: escribe al menos 10 caracteres para describir lo ocurrido.
            </span>
          ) : (
            <span className="field-help">
              {draft.descripcion.length} de 500 caracteres. Puedes escribir hasta 500.
            </span>
          )}
        </div>

        <div className="responsive-grid-2">
          <div className="field-group">
            <label className="field-label">Fecha (obligatorio)</label>
            <div className="field-box">
              <input
                className="field-input"
                value={draft.fecha}
                onChange={(e) => setDraft((prev) => ({ ...prev, fecha: e.target.value }))}
                placeholder="dd / mm / aaaa"
              />
            </div>
            <span className="field-help">Formato: dd/mm/aaaa</span>
          </div>

          <div className="field-group">
            <label className="field-label">Hora (obligatorio)</label>
            <div className="field-box">
              <input
                className="field-input"
                value={draft.hora}
                onChange={(e) => setDraft((prev) => ({ ...prev, hora: e.target.value }))}
                placeholder="hh:mm"
              />
            </div>
            <span className="field-help">Formato 24 h: hh:mm</span>
          </div>
        </div>

        <button className="btn-primary" onClick={() => onNavigate('denuncia-paso-3')}>
          Continuar
        </button>
      </div>
    );
  }

  // PASO 3: Ubicación
  if (screen === 'denuncia-paso-3') {
    return (
      <div className="page-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => onNavigate('denuncia-paso-2')}
            style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
          </button>
          <h1 className="t-24" style={{ fontWeight: 700 }}>Nueva denuncia</h1>
        </div>

        {renderProgress(3, 50)}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h2 className="t-22" style={{ fontWeight: 700 }}>Ubicación</h2>
          <p className="t-15" style={{ color: 'var(--text2)' }}>
            Indica dónde ocurrió el hecho.
          </p>
        </div>

        <div className="field-group">
          <label className="field-label">Distrito (obligatorio)</label>
          <div className="field-box">
            <select
              className="field-input"
              value={draft.distrito}
              onChange={(e) => setDraft((prev) => ({ ...prev, distrito: e.target.value }))}
              style={{ background: 'transparent', color: draft.distrito ? 'var(--text)' : 'var(--text2)' }}
            >
              <option value="" disabled style={{ background: 'var(--surface)', color: 'var(--text2)' }}>
                Selecciona un distrito
              </option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d} style={{ background: 'var(--surface)', color: 'var(--text)' }}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field-group">
          <label className="field-label">Dirección o referencia (obligatorio)</label>
          <div className="field-box">
            <input
              className="field-input"
              value={draft.direccion}
              onChange={(e) => setDraft((prev) => ({ ...prev, direccion: e.target.value }))}
              placeholder="Calle, número o referencia"
            />
          </div>
          <span className="field-help">Escribe y elige una sugerencia de la lista.</span>
        </div>

        <button
          type="button"
          className="btn-secondary"
          onClick={() => onOpenModal('permiso-ubicacion')}
        >
          Usar mi ubicación actual
        </button>

        {/* Mapa miniatura interactivo de ajuste */}
        <div
          onClick={() =>
            setDraft((prev) => ({
              ...prev,
              distrito: 'Miraflores, Lima',
              direccion: 'Av. José Larco cuadra 4 (frente al Parque Kennedy)',
            }))
          }
          style={{
            background: 'var(--primarysoft)',
            border: '1.5px solid var(--border)',
            height: 112,
            borderRadius: 12,
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <div style={{ position: 'absolute', background: 'var(--surface)', height: 10, left: 0, right: 0, top: 28 }} />
          <div style={{ position: 'absolute', background: 'var(--surface)', height: 8, left: 0, right: 0, top: 68 }} />
          <div style={{ position: 'absolute', background: 'var(--surface)', width: 10, top: 0, bottom: 0, left: '26%' }} />
          <div style={{ position: 'absolute', background: 'var(--surface)', width: 8, top: 0, bottom: 0, left: '68%' }} />
          <img src="/assets/map-pin.svg" alt="" width={32} height={32} style={{ position: 'relative', zIndex: 2 }} />
          <div style={{ position: 'relative', zIndex: 2, background: 'var(--surface)', padding: '4px 12px', borderRadius: 8, border: '1px solid var(--divider)' }}>
            <span className="t-13" style={{ fontWeight: 500 }}>Opcional: toca para ajustar el punto</span>
          </div>
        </div>

        <button className="btn-primary" onClick={() => onNavigate('denuncia-paso-4')}>
          Continuar
        </button>
      </div>
    );
  }

  // PASO 4: Evidencia y Galería
  if (screen === 'denuncia-paso-4') {
    return (
      <div className="page-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => onNavigate('denuncia-paso-3')}
            style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
          </button>
          <h1 className="t-24" style={{ fontWeight: 700 }}>Nueva denuncia</h1>
        </div>

        {renderProgress(4, 67)}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h2 className="t-22" style={{ fontWeight: 700 }}>Adjunta evidencia</h2>
          <p className="t-15" style={{ color: 'var(--text2)' }}>
            Opcional. Hasta 5 archivos de máximo 20 MB.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          <button
            type="button"
            data-action="upload-foto"
            style={{
              background: 'var(--primarysoft)',
              border: '2px dashed var(--secondary)',
              borderRadius: 12,
              height: 92,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              cursor: 'pointer',
            }}
          >
            <img src="/assets/camera.svg" alt="" width={28} height={28} />
            <span className="t-14" style={{ fontWeight: 600, color: 'var(--secondary)' }}>Tomar foto</span>
          </button>

          <button
            type="button"
            data-action="upload-galeria"
            style={{
              background: 'var(--primarysoft)',
              border: '2px dashed var(--secondary)',
              borderRadius: 12,
              height: 92,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              cursor: 'pointer',
            }}
          >
            <img src="/assets/image.svg" alt="" width={28} height={28} />
            <span className="t-14" style={{ fontWeight: 600, color: 'var(--secondary)' }}>Galería</span>
          </button>

          <button
            type="button"
            data-action="upload-archivo"
            style={{
              background: 'var(--primarysoft)',
              border: '2px dashed var(--secondary)',
              borderRadius: 12,
              height: 92,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              cursor: 'pointer',
            }}
          >
            <img src="/assets/file-doc.svg" alt="" width={28} height={28} />
            <span className="t-14" style={{ fontWeight: 600, color: 'var(--secondary)' }}>Archivo</span>
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="t-16" style={{ fontWeight: 700 }}>Archivos adjuntos ({draft.archivos.length}/5)</span>
          <span className="t-13" style={{ color: 'var(--text2)' }}>Hasta 5 · máx. 20 MB</span>
        </div>

        {draft.archivos.length === 0 ? (
          <div className="card-surface" style={{ textAlign: 'center', padding: 28, color: 'var(--text2)' }}>
            <p className="t-14">No hay archivos adjuntos.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {draft.archivos.map((f) => (
              <div key={f.id} className="card-bordered" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accentsoft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={f.tipo === 'archivo' ? '/assets/file-doc.svg' : '/assets/image.svg'} alt="" width={20} height={20} />
                  </div>
                  <div>
                    <p className="t-15" style={{ fontWeight: 600 }}>{f.nombre}</p>
                    <p className="t-12" style={{ color: 'var(--text2)' }}>{f.tamano} · Adjunto verificado</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDraft((prev) => ({ ...prev, archivos: prev.archivos.filter((x) => x.id !== f.id) }))}
                  style={{ background: 'transparent', border: 'none', color: 'var(--danger)', fontWeight: 600, cursor: 'pointer' }}
                  className="t-13"
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        )}

        <button className="btn-primary" onClick={() => onNavigate('denuncia-paso-5')}>
          Continuar
        </button>
        <button
          type="button"
          onClick={() => onNavigate('denuncia-paso-5')}
          style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', fontWeight: 600, height: 44, cursor: 'pointer' }}
          className="t-15"
        >
          Omitir este paso
        </button>
      </div>
    );
  }

  // PASO 5: Privacidad
  if (screen === 'denuncia-paso-5') {
    return (
      <div className="page-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => onNavigate('denuncia-paso-4')}
            style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
          </button>
          <h1 className="t-24" style={{ fontWeight: 700 }}>Nueva denuncia</h1>
        </div>

        {renderProgress(5, 83)}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h2 className="t-22" style={{ fontWeight: 700 }}>Protege tu identidad</h2>
          <p className="t-15" style={{ color: 'var(--text2)' }}>
            Elige cómo quieres enviar el reporte.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            type="button"
            className={`option-card ${draft.identidad === 'anonima' ? 'selected' : ''}`}
            onClick={() => setDraft((prev) => ({ ...prev, identidad: 'anonima' }))}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                border: draft.identidad === 'anonima' ? '2px solid var(--primary)' : '2px solid var(--border)',
                background: draft.identidad === 'anonima' ? 'var(--primary)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {draft.identidad === 'anonima' && <img src="/assets/check-white.svg" alt="" width={14} height={14} />}
            </div>
            <div>
              <p className="t-16" style={{ fontWeight: 500 }}>Enviar de forma anónima</p>
              <p className="t-13" style={{ color: 'var(--text2)' }}>Tu nombre y datos no se mostrarán.</p>
            </div>
          </button>

          <button
            type="button"
            className={`option-card ${draft.identidad === 'compartir' ? 'selected' : ''}`}
            onClick={() => setDraft((prev) => ({ ...prev, identidad: 'compartir' }))}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                border: draft.identidad === 'compartir' ? '2px solid var(--primary)' : '2px solid var(--border)',
                background: draft.identidad === 'compartir' ? 'var(--primary)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {draft.identidad === 'compartir' && <img src="/assets/check-white.svg" alt="" width={14} height={14} />}
            </div>
            <div>
              <p className="t-16" style={{ fontWeight: 500 }}>Compartir mis datos de contacto</p>
              <p className="t-13" style={{ color: 'var(--text2)' }}>La autoridad podrá comunicarse contigo.</p>
            </div>
          </button>
        </div>

        <div className="alert-box alert-info">
          <img src="/assets/alert-info.svg" alt="" width={24} height={24} />
          <p className="t-14">
            Protegida por la Ley 29733. Tu información nunca se muestra en el mapa.
          </p>
        </div>

        {draft.identidad === 'compartir' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p className="t-16" style={{ fontWeight: 700 }}>Datos de contacto (opcional)</p>
            <div className="responsive-grid-2">
              <div className="field-group">
                <label className="field-label">Teléfono</label>
                <div className="field-box">
                  <input
                    className="field-input"
                    value={draft.telefono}
                    onChange={(e) => setDraft((prev) => ({ ...prev, telefono: e.target.value }))}
                    placeholder="+51 999 000 000"
                  />
                </div>
              </div>
              <div className="field-group">
                <label className="field-label">Correo</label>
                <div className="field-box">
                  <input
                    className="field-input"
                    value={draft.correo}
                    onChange={(e) => setDraft((prev) => ({ ...prev, correo: e.target.value }))}
                    placeholder="maria.valdez@example.com"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <button className="btn-primary" onClick={() => onNavigate('denuncia-paso-6')}>
          Continuar
        </button>
      </div>
    );
  }

  // PASO 6: Revisión
  if (screen === 'denuncia-paso-6') {
    const rows = [
      { label: 'Tipo', value: draft.tipo, target: 'denuncia-paso-1' as ScreenId },
      { label: 'Descripción', value: draft.descripcion || 'Sin completar', target: 'denuncia-paso-2' as ScreenId },
      { label: 'Fecha y hora', value: `${draft.fecha} · ${draft.hora}`, target: 'denuncia-paso-2' as ScreenId },
      { label: 'Ubicación', value: `${draft.distrito} · ${draft.direccion}`, target: 'denuncia-paso-3' as ScreenId },
      {
        label: 'Evidencia',
        value: draft.archivos.length > 0 ? `${draft.archivos.length} archivo(s) adjunto(s)` : 'Archivos adjuntos (opcional)',
        target: 'denuncia-paso-4' as ScreenId,
      },
      {
        label: 'Identidad',
        value: draft.identidad === 'anonima' ? 'Anónima' : `Compartida (${draft.correo})`,
        target: 'denuncia-paso-5' as ScreenId,
      },
    ];

    return (
      <div className="page-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => onNavigate('denuncia-paso-5')}
            style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
          </button>
          <h1 className="t-24" style={{ fontWeight: 700 }}>Revisar denuncia</h1>
        </div>

        {renderProgress(6, 100)}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h2 className="t-22" style={{ fontWeight: 700 }}>Confirma la información</h2>
          <p className="t-15" style={{ color: 'var(--text2)' }}>Revisa antes de enviar.</p>
        </div>

        <div className="card-surface" style={{ padding: '4px 16px', display: 'flex', flexDirection: 'column' }}>
          {rows.map((r, i) => (
            <React.Fragment key={r.label}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 0' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="t-13" style={{ color: 'var(--text2)' }}>{r.label}</p>
                  <p className="t-16" style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {r.value}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate(r.target)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', fontWeight: 600, cursor: 'pointer', padding: '8px' }}
                  className="t-15"
                >
                  Editar
                </button>
              </div>
              {i < rows.length - 1 && <div style={{ height: 1, background: 'var(--divider)' }} />}
            </React.Fragment>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <button
            type="button"
            onClick={() => setDraft((prev) => ({ ...prev, confirmado: !prev.confirmado }))}
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: draft.confirmado ? 'var(--primary)' : 'var(--surface)',
              border: '2px solid var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {draft.confirmado && <img src="/assets/check-white.svg" alt="" width={16} height={16} />}
          </button>
          <p className="t-14">
            Confirmo que los datos son correctos. Entiendo que un reporte falso puede tener consecuencias legales.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => {
            onNavigate('enviando-denuncia');
            setTimeout(() => {
              onNavigate('confirmacion');
            }, 1300);
          }}
        >
          Enviar denuncia
        </button>

        <button className="btn-secondary" onClick={() => onOpenModal('cancelar-envio')}>
          Cancelar envío
        </button>
      </div>
    );
  }

  // ENVIANDO DENUNCIA
  if (screen === 'enviando-denuncia') {
    return (
      <div className="page-container auth-container" style={{ alignItems: 'center', textAlign: 'center' }}>
        <h1 className="t-24" style={{ fontWeight: 700, alignSelf: 'flex-start' }}>Enviando</h1>
        <div style={{ margin: '36px 0 12px' }}>
          <img src="/assets/spinner-lg.svg" alt="Cargando" width={88} height={88} className="spin-icon" />
        </div>
        <h2 className="t-24" style={{ fontWeight: 700 }}>Enviando tu denuncia…</h2>
        <p className="t-16" style={{ color: 'var(--text2)' }}>
          Estamos cifrando y registrando tu reporte. No cierres la aplicación.
        </p>
        <div className="alert-box alert-info" style={{ textAlign: 'left', marginTop: 12 }}>
          <img src="/assets/alert-info.svg" alt="" width={24} height={24} />
          <p className="t-14">Tu denuncia se guarda como borrador si se pierde la conexión.</p>
        </div>
        <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => onNavigate('confirmacion')}>
          Continuar a confirmación
        </button>
      </div>
    );
  }

  // CONFIRMACIÓN
  if (screen === 'confirmacion') {
    return (
      <div className="page-container auth-container" style={{ alignItems: 'center', textAlign: 'center' }}>
        <h1 className="t-24" style={{ fontWeight: 700, alignSelf: 'flex-start' }}>Confirmación</h1>

        <div style={{ width: 80, height: 80, borderRadius: 40, background: 'var(--successsoft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
          <img src="/assets/check-success-lg.svg" alt="" width={44} height={44} />
        </div>

        <h2 className="t-24" style={{ fontWeight: 700 }}>Denuncia enviada</h2>
        <p className="t-15" style={{ color: 'var(--text2)' }}>Tu reporte fue registrado correctamente.</p>

        <div className="card-surface" style={{ width: '100%', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span className="t-13" style={{ color: 'var(--text2)' }}>Código de seguimiento</span>
          <span className="t-28" style={{ fontWeight: 700 }}>AP-2026-0412</span>
        </div>

        <div className="alert-box alert-info" style={{ textAlign: 'left' }}>
          <img src="/assets/alert-info.svg" alt="" width={24} height={24} />
          <p className="t-14">
            Guarda este código para consultar el estado de tu reporte en cualquier momento.
          </p>
        </div>

        <button className="btn-primary" onClick={() => onNavigate('estado-en-revision')}>
          Ver estado del reporte
        </button>
        <button className="btn-secondary" onClick={() => onNavigate('inicio')}>
          Volver al inicio
        </button>
        <button
          type="button"
          onClick={() => onNavigate('denuncia-paso-6')}
          style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', fontWeight: 600, height: 44, cursor: 'pointer' }}
          className="t-15"
        >
          ¿Te equivocaste? Corregir reporte
        </button>
      </div>
    );
  }

  // ESTADO DEL REPORTE (En revisión / Robo atendido / Asalto atendido)
  if (
    screen === 'estado-en-revision' ||
    screen === 'estado-robo-atendido' ||
    screen === 'estado-asalto-atendido'
  ) {
    const isAtendido = screen !== 'estado-en-revision';
    const reportData = {
      'estado-en-revision': {
        code: 'AP-2026-0412',
        subtitle: `${draft.tipo} · ${draft.fecha}`,
        badge: 'Estado actual: En revisión',
        step3Status: 'Pendiente',
        step3Desc: 'Te avisaremos si cambia el estado.',
      },
      'estado-robo-atendido': {
        code: 'EJ-ROBO-001',
        subtitle: 'Robo · 08 / 10 / 2026 · Av. Larco cuadra 3, Miraflores',
        badge: 'Estado actual: Reporte atendido',
        step3Status: 'Completado el 09 / 10 / 2026',
        step3Desc: 'Atendido por Policía Nacional · Comisaría de Miraflores.',
      },
      'estado-asalto-atendido': {
        code: 'EJ-ASAL-002',
        subtitle: 'Asalto · 05 / 10 / 2026 · Av. Benavides cuadra 5, Miraflores',
        badge: 'Estado actual: Reporte atendido',
        step3Status: 'Completado el 06 / 10 / 2026',
        step3Desc: 'Atendido por Policía Nacional · Patrullaje integrado.',
      },
    }[screen];

    return (
      <div className="page-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => onNavigate('historial')}
            style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
          </button>
          <h1 className="t-24" style={{ fontWeight: 700 }}>Estado del reporte</h1>
        </div>

        <div>
          <h2 className="t-22" style={{ fontWeight: 700 }}>{reportData.code}</h2>
          <p className="t-15" style={{ color: 'var(--text2)' }}>{reportData.subtitle}</p>
        </div>

        <div
          style={{
            alignSelf: 'flex-start',
            background: isAtendido ? 'var(--successsoft)' : 'var(--warnsoft)',
            border: `1.5px solid ${isAtendido ? 'var(--success)' : 'var(--warn)'}`,
            borderRadius: 24,
            padding: '10px 16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <img
            src={isAtendido ? '/assets/alert-check.svg' : '/assets/clock.svg'}
            alt=""
            width={20}
            height={20}
          />
          <span className="t-15" style={{ fontWeight: 600 }}>{reportData.badge}</span>
        </div>

        <h3 className="t-18" style={{ fontWeight: 700 }}>Seguimiento</h3>

        <div className="card-surface" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {/* Paso 1 */}
          <div style={{ display: 'flex', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 32, height: 32, borderRadius: 16, background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/assets/check-white.svg" alt="" width={18} height={18} />
              </div>
              <div style={{ width: 2, height: 42, background: 'var(--divider)', margin: '4px 0' }} />
            </div>
            <div>
              <p className="t-16" style={{ fontWeight: 600 }}>Reporte enviado</p>
              <p className="t-13" style={{ fontWeight: 700, color: 'var(--success)' }}>Completado</p>
              <p className="t-14" style={{ color: 'var(--text2)' }}>Tu denuncia quedó registrada.</p>
            </div>
          </div>

          {/* Paso 2 */}
          <div style={{ display: 'flex', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  background: isAtendido ? 'var(--success)' : 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src="/assets/check-white.svg" alt="" width={18} height={18} />
              </div>
              <div style={{ width: 2, height: 42, background: 'var(--divider)', margin: '4px 0' }} />
            </div>
            <div>
              <p className="t-16" style={{ fontWeight: 600 }}>En revisión</p>
              <p className="t-13" style={{ fontWeight: 700, color: isAtendido ? 'var(--success)' : 'var(--primary)' }}>
                {isAtendido ? 'Completado' : 'En curso'}
              </p>
              <p className="t-14" style={{ color: 'var(--text2)' }}>Se está revisando la información.</p>
            </div>
          </div>

          {/* Paso 3 */}
          <div style={{ display: 'flex', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  background: isAtendido ? 'var(--success)' : 'var(--surface)',
                  border: isAtendido ? 'none' : '2px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isAtendido && <img src="/assets/check-white.svg" alt="" width={18} height={18} />}
              </div>
            </div>
            <div>
              <p className="t-16" style={{ fontWeight: 600 }}>Reporte atendido</p>
              <p className="t-13" style={{ fontWeight: 700, color: isAtendido ? 'var(--success)' : 'var(--text2)' }}>
                {reportData.step3Status}
              </p>
              <p className="t-14" style={{ color: 'var(--text2)' }}>{reportData.step3Desc}</p>
            </div>
          </div>
        </div>

        <button className="btn-secondary" onClick={() => onNavigate('inicio')}>
          Volver al inicio
        </button>
      </div>
    );
  }

  return null;
};
