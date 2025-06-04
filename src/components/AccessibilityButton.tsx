// Accessibility Toggle Button Component
// Floating button that opens accessibility panel

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Accessibility } from 'lucide-react';
import AccessibilityPanel from './AccessibilityPanel';

const AccessibilityButton: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt + A to toggle accessibility panel
      if (event.altKey && event.key === 'a') {
        event.preventDefault();
        setIsPanelOpen(prev => !prev);
      }

      // Escape to close panel
      if (event.key === 'Escape' && isPanelOpen) {
        setIsPanelOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPanelOpen]);

  return (
    <>
      {/* Floating Accessibility Button */}
      <Button
        onClick={() => setIsPanelOpen(true)}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-action hover:bg-action/90 text-white shadow-lg z-30 focus-visible-ring"
        aria-label="Abrir opciones de accesibilidad (Alt + A)"
        title="Opciones de accesibilidad"
      >
        <Accessibility className="h-5 w-5" />
      </Button>

      {/* Accessibility Panel */}
      <AccessibilityPanel 
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </>
  );
};

export default AccessibilityButton;
