// Accessibility Control Panel Component
// Provides users with accessibility customization options

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Eye, 
  Type, 
  Volume2, 
  Zap, 
  Accessibility,
  Plus,
  Minus,
  RotateCcw,
  X
} from 'lucide-react';
import { useAccessibility, useKeyboardNavigation, useScreenReader } from '@/hooks/useAccessibility';
import { adjustTextSize } from '@/hooks/useAccessibility';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ isOpen, onClose }) => {
  const {
    isHighContrast,
    isLargeText,
    isMotionReduced,
    toggleHighContrast,
    toggleLargeText,
    toggleMotionReduction
  } = useAccessibility();

  const { isKeyboardUser } = useKeyboardNavigation();
  const { announce } = useScreenReader();

  const [fontSize, setFontSize] = useState(16);

  const handleFontIncrease = () => {
    adjustTextSize(true);
    setFontSize(prev => Math.min(24, prev + 2));
    announce('Tamaño de texto aumentado');
  };

  const handleFontDecrease = () => {
    adjustTextSize(false);
    setFontSize(prev => Math.max(12, prev - 2));
    announce('Tamaño de texto reducido');
  };

  const handleReset = () => {
    document.documentElement.style.fontSize = '16px';
    setFontSize(16);
    localStorage.removeItem('a11y-font-size');
    announce('Configuración de accesibilidad restablecida');
  };

  const handleHighContrastToggle = () => {
    toggleHighContrast();
    announce(isHighContrast ? 'Contraste alto desactivado' : 'Contraste alto activado');
  };

  const handleLargeTextToggle = () => {
    toggleLargeText();
    announce(isLargeText ? 'Texto grande desactivado' : 'Texto grande activado');
  };

  const handleMotionToggle = () => {
    toggleMotionReduction();
    announce(isMotionReduced ? 'Animaciones activadas' : 'Animaciones reducidas');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div 
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
        role="dialog"
        aria-labelledby="accessibility-panel-title"
        aria-describedby="accessibility-panel-description"
      >
        <Card className="h-full rounded-none border-0">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Accessibility className="h-5 w-5 text-action" />
                <CardTitle id="accessibility-panel-title" className="text-lg">
                  Opciones de Accesibilidad
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                aria-label="Cerrar panel de accesibilidad"
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p id="accessibility-panel-description" className="text-sm text-gray-600">
              Personaliza la experiencia del sitio web según tus necesidades
            </p>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            {/* Visual Settings */}
            <div className="space-y-4">
              <h3 className="flex items-center space-x-2 font-semibold text-sm">
                <Eye className="h-4 w-4" />
                <span>Configuración Visual</span>
              </h3>

              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label htmlFor="high-contrast" className="text-sm font-medium">
                    Alto Contraste
                  </label>
                  <p className="text-xs text-gray-600">
                    Aumenta el contraste para mejor visibilidad
                  </p>
                </div>
                <Switch
                  id="high-contrast"
                  checked={isHighContrast}
                  onCheckedChange={handleHighContrastToggle}
                  aria-describedby="high-contrast-desc"
                />
              </div>

              {/* Large Text */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label htmlFor="large-text" className="text-sm font-medium">
                    Texto Grande
                  </label>
                  <p className="text-xs text-gray-600">
                    Aumenta el tamaño del texto
                  </p>
                </div>
                <Switch
                  id="large-text"
                  checked={isLargeText}
                  onCheckedChange={handleLargeTextToggle}
                  aria-describedby="large-text-desc"
                />
              </div>

              {/* Font Size Controls */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center space-x-2">
                  <Type className="h-4 w-4" />
                  <span>Tamaño de Fuente</span>
                </label>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleFontDecrease}
                    disabled={fontSize <= 12}
                    aria-label="Disminuir tamaño de texto"
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-mono min-w-[3rem] text-center">
                    {fontSize}px
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleFontIncrease}
                    disabled={fontSize >= 24}
                    aria-label="Aumentar tamaño de texto"
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Motion Settings */}
            <div className="space-y-4">
              <h3 className="flex items-center space-x-2 font-semibold text-sm">
                <Zap className="h-4 w-4" />
                <span>Movimiento y Animaciones</span>
              </h3>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label htmlFor="reduce-motion" className="text-sm font-medium">
                    Reducir Movimiento
                  </label>
                  <p className="text-xs text-gray-600">
                    Minimiza animaciones y transiciones
                  </p>
                </div>
                <Switch
                  id="reduce-motion"
                  checked={isMotionReduced}
                  onCheckedChange={handleMotionToggle}
                  aria-describedby="motion-desc"
                />
              </div>
            </div>

            <Separator />

            {/* Navigation Status */}
            <div className="space-y-4">
              <h3 className="flex items-center space-x-2 font-semibold text-sm">
                <Settings className="h-4 w-4" />
                <span>Estado de Navegación</span>
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Navegación por teclado:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    isKeyboardUser 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {isKeyboardUser ? 'Activa' : 'Inactiva'}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Keyboard Shortcuts */}
            <div className="space-y-4">
              <h3 className="flex items-center space-x-2 font-semibold text-sm">
                <Volume2 className="h-4 w-4" />
                <span>Atajos de Teclado</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Ir al contenido principal:</span>
                  <kbd className="px-1 py-0.5 bg-gray-100 rounded">Alt + M</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Abrir búsqueda:</span>
                  <kbd className="px-1 py-0.5 bg-gray-100 rounded">Ctrl + K</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Ir al carrito:</span>
                  <kbd className="px-1 py-0.5 bg-gray-100 rounded">Alt + C</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Abrir accesibilidad:</span>
                  <kbd className="px-1 py-0.5 bg-gray-100 rounded">Alt + A</kbd>
                </div>
              </div>
            </div>

            <Separator />

            {/* Reset Button */}
            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full"
                aria-label="Restablecer todas las configuraciones de accesibilidad"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Restablecer Configuración
              </Button>
            </div>

            {/* Help Text */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-sm text-blue-900 mb-2">
                ¿Necesitas más ayuda?
              </h4>
              <p className="text-xs text-blue-800">
                Si experimentas dificultades para usar el sitio web, 
                contáctanos en{' '}
                <a 
                  href="mailto:accesibilidad@choco-artisan.com" 
                  className="underline hover:no-underline"
                >
                  accesibilidad@choco-artisan.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AccessibilityPanel;
