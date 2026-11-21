import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface ProfileData {
  name: string;
  district: string;
  email: string;
  phone: string;
}

interface Props {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  onNavigate: (s: ScreenId) => void;
}

export const PersonalDataPage: React.FC<Props> = ({
  profile,
  setProfile,
  onNavigate,
}) => {
  const [savedNotice, setSavedNotice] = useState(false);

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
          <input
            className="field-input"
            value={profile.name}
            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
          />
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
          <input
            className="field-input"
            value={profile.district}
            onChange={(e) => setProfile((p) => ({ ...p, district: e.target.value }))}
          />
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">Correo electrónico</label>
        <div className="field-box">
          <input
            className="field-input"
            value={profile.email}
            onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
          />
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">Teléfono</label>
        <div className="field-box">
          <input
            className="field-input"
            value={profile.phone}
            onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
          />
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
};
