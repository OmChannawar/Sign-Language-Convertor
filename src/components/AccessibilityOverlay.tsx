import React from 'react';
import { Button } from './ui/button';
import { X, User, Type, Contrast, Eye } from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Slider } from './ui/slider';

interface AccessibilityOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessibilityOverlay({ isOpen, onClose }: AccessibilityOverlayProps) {
  const [fontSize, setFontSize] = React.useState([100]);
  const [highContrast, setHighContrast] = React.useState(false);
  const [dyslexiaFont, setDyslexiaFont] = React.useState(false);

  React.useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  React.useEffect(() => {
    if (dyslexiaFont) {
      document.documentElement.classList.add('dyslexia-font');
    } else {
      document.documentElement.classList.remove('dyslexia-font');
    }
  }, [dyslexiaFont]);

  React.useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize[0]}%`;
  }, [fontSize]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Overlay panel */}
      <div
        className="fixed right-4 top-20 bottom-4 w-full max-w-sm z-50"
        role="dialog"
        aria-label="Accessibility settings"
        aria-modal="true"
      >
        <Card className="h-full flex flex-col shadow-2xl">
          <div className="p-6 border-b border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-6 h-6 text-teal-600" />
                <h2 className="text-blue-900">Accessibility Settings</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close accessibility settings"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Font Size */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Type className="w-5 h-5 text-blue-600" />
                <Label>Text Size: {fontSize[0]}%</Label>
              </div>
              <Slider
                value={fontSize}
                onValueChange={setFontSize}
                min={80}
                max={150}
                step={10}
                className="w-full"
                aria-label="Adjust text size"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Smaller</span>
                <span>Larger</span>
              </div>
            </div>

            {/* High Contrast Mode */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Contrast className="w-5 h-5 text-blue-600" />
                  <Label htmlFor="high-contrast">High Contrast Mode</Label>
                </div>
                <Switch
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={setHighContrast}
                  aria-label="Toggle high contrast mode"
                />
              </div>
              <p className="text-sm text-gray-600">
                Increases contrast for better visibility
              </p>
            </div>

            {/* Dyslexia-Friendly Font */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <Label htmlFor="dyslexia-font">Dyslexia-Friendly Font</Label>
                </div>
                <Switch
                  id="dyslexia-font"
                  checked={dyslexiaFont}
                  onCheckedChange={setDyslexiaFont}
                  aria-label="Toggle dyslexia-friendly font"
                />
              </div>
              <p className="text-sm text-gray-600">
                Uses OpenDyslexic font for easier reading
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mt-6">
              <h3 className="text-blue-900 mb-2">Keyboard Navigation</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Tab: Navigate forward</li>
                <li>• Shift + Tab: Navigate backward</li>
                <li>• Enter/Space: Activate buttons</li>
                <li>• Esc: Close dialogs</li>
              </ul>
            </div>
          </div>

          <div className="p-6 border-t border-blue-100">
            <Button
              onClick={onClose}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              Apply Settings
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
