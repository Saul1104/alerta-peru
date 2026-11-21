import React from 'react';
import { ModalType, ReportDraft, ScreenId } from '../types';
import { Step1TypePage } from '../pages/report/Paso1TipoIncidente';
import { Step2DescriptionPage } from '../pages/report/Paso2Descripcion';
import { Step3LocationPage } from '../pages/report/Paso3Ubicacion';
import { Step4EvidencePage } from '../pages/report/Paso4Evidencia';
import { Step5PrivacyPage } from '../pages/report/Paso5Privacidad';
import { Step6ReviewPage } from '../pages/report/Paso6Revision';
import { ReportSubmissionPage } from '../pages/report/EnvioConfirmacion';
import { ReportStatusPage } from '../pages/report/EstadoReporte';

interface Props {
  screen: ScreenId;
  draft: ReportDraft;
  setDraft: React.Dispatch<React.SetStateAction<ReportDraft>>;
  onNavigate: (s: ScreenId) => void;
  onOpenModal: (m: ModalType) => void;
}

export const ReportFlowViews: React.FC<Props> = ({
  screen,
  draft,
  setDraft,
  onNavigate,
  onOpenModal,
}) => {
  switch (screen) {
    case 'denuncia-paso-1':
      return <Step1TypePage draft={draft} setDraft={setDraft} onNavigate={onNavigate} />;
    case 'denuncia-paso-2':
      return <Step2DescriptionPage isValidationScreen={false} draft={draft} setDraft={setDraft} onNavigate={onNavigate} />;
    case 'ap3-error-validacion':
      return <Step2DescriptionPage isValidationScreen={true} draft={draft} setDraft={setDraft} onNavigate={onNavigate} />;
    case 'denuncia-paso-3':
      return <Step3LocationPage draft={draft} setDraft={setDraft} onNavigate={onNavigate} onOpenModal={onOpenModal} />;
    case 'denuncia-paso-4':
      return <Step4EvidencePage draft={draft} setDraft={setDraft} onNavigate={onNavigate} />;
    case 'denuncia-paso-5':
      return <Step5PrivacyPage draft={draft} setDraft={setDraft} onNavigate={onNavigate} />;
    case 'denuncia-paso-6':
      return <Step6ReviewPage draft={draft} setDraft={setDraft} onNavigate={onNavigate} onOpenModal={onOpenModal} />;
    case 'enviando-denuncia':
    case 'confirmacion':
      return <ReportSubmissionPage screen={screen} onNavigate={onNavigate} />;
    case 'estado-en-revision':
    case 'estado-robo-atendido':
    case 'estado-asalto-atendido':
      return <ReportStatusPage screen={screen} draft={draft} onNavigate={onNavigate} />;
    default:
      return null;
  }
};
