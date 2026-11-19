export type ScreenId =
  // 1. Acceso, registro e inicio
  | 'bienvenida'
  | 'intro-1'
  | 'intro-2'
  | 'intro-3'
  | 'login'
  | 'login-error'
  | 'recuperar'
  | 'enlace-enviado'
  | 'crear-cuenta'
  | 'verificar-codigo'
  | 'cuenta-creada'
  | 'politica-privacidad'
  | 'inicio'
  // 2. Flujo de denuncia (6 pasos), confirmación y estado
  | 'denuncia-paso-1'
  | 'denuncia-paso-2'
  | 'denuncia-paso-3'
  | 'denuncia-paso-4'
  | 'denuncia-paso-5'
  | 'denuncia-paso-6'
  | 'enviando-denuncia'
  | 'confirmacion'
  | 'estado-en-revision'
  | 'estado-robo-atendido'
  | 'estado-asalto-atendido'
  // 3. Mapa, perfil y privacidad (incluye Eliminar cuenta AP3)
  | 'mapa'
  | 'perfil'
  | 'datos-personales'
  | 'historial'
  | 'privacidad-seguridad'
  | 'accesibilidad'
  | 'eliminar-cuenta'
  | 'ap3-eliminar-1'
  | 'ap3-eliminar-2'
  | 'ap3-eliminar-4'
  | 'cuenta-eliminada'
  // 4. Mailing y sistema de diseño
  | 'mailing'
  | 'sistema-diseno'
  // 8. AP3 Estados de interfaz: vacío, carga y errores
  | 'ap3-catalogo-estados'
  | 'ap3-vacio-inicial'
  | 'ap3-vacio-busqueda'
  | 'ap3-vacio-historial'
  | 'ap3-carga-historial'
  | 'ap3-error-conexion'
  | 'ap3-error-sistema'
  | 'ap3-error-validacion'
  | 'ap3-contenido-no-disponible'
  | 'ap3-sin-permisos'
  | 'esqueleto-datos-personales'
  | 'esqueleto-privacidad'
  | 'esqueleto-politica'
  | 'esqueleto-enviando'
  | 'esqueleto-mapa';

export type DaltonismoMode = 'desactivado' | 'protanopia' | 'deuteranopia' | 'tritanopia';
export type FontSizeMode = 'normal' | 'grande' | 'muy-grande';

export interface AccessibilityState {
  darkMode: boolean;
  daltonismo: DaltonismoMode;
  fontSize: FontSizeMode;
  highContrast: boolean;
  reducedTransparency: boolean;
  screenReader: boolean;
  screenReaderStep: number; // 1..6
  guidedTourStep: number | null; // 1..5 or null
}

export interface ReportDraft {
  tipo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  distrito: string;
  direccion: string;
  archivos: { id: string; nombre: string; tipo: 'foto' | 'galeria' | 'archivo'; tamano: string }[];
  identidad: 'anonima' | 'compartir';
  telefono: string;
  correo: string;
  confirmado: boolean;
}

export type ModalType =
  | null
  | 'cerrar-sesion'
  | 'cancelar-envio'
  | 'permiso-ubicacion'
  | 'llamar-105'
  | 'llamar-106'
  | 'llamar-115'
  | 'llamar-116';
