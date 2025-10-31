import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { Alert, AlertDescription } from './ui/alert';
import { Camera, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface CameraPermissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  error?: string | null;
}

export function CameraPermissionDialog({ open, onOpenChange, onConfirm, error }: CameraPermissionDialogProps) {
  const getErrorMessage = () => {
    switch (error) {
      case 'permission_denied':
        return {
          title: 'Camera Permission Denied',
          description: 'To use this feature, you need to grant camera access.',
          instructions: [
            'Click the camera icon in your browser\'s address bar',
            'Select "Allow" for camera access',
            'Refresh the page and try again',
          ],
          variant: 'destructive' as const
        };
      case 'no_camera':
        return {
          title: 'No Camera Found',
          description: 'No camera device was detected on your system.',
          instructions: [
            'Make sure your camera is properly connected',
            'Check if other applications are using the camera',
            'Try restarting your browser',
          ],
          variant: 'destructive' as const
        };
      case 'camera_in_use':
        return {
          title: 'Camera Already in Use',
          description: 'Your camera is being used by another application.',
          instructions: [
            'Close other applications that might be using the camera',
            'Make sure no other browser tabs are using the camera',
            'Try again after closing those applications',
          ],
          variant: 'destructive' as const
        };
      default:
        return null;
    }
  };

  const errorInfo = getErrorMessage();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center justify-center mb-4">
            {errorInfo ? (
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            ) : (
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
            )}
          </div>
          <AlertDialogTitle className="text-center">
            {errorInfo ? errorInfo.title : 'Camera Access Required'}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {errorInfo ? errorInfo.description : 'This feature needs access to your camera to recognize sign language gestures in real-time.'}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {errorInfo ? (
          <Alert variant={errorInfo.variant}>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <p className="mb-2">To fix this:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                {errorInfo.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-3">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <p className="mb-2">Privacy & Security:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Your camera data is processed locally and never stored or transmitted</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>You can revoke camera access at any time from your browser settings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>We respect your privacy and security</span>
                  </li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
              <p className="text-sm text-blue-900">
                <strong>📌 What to expect:</strong>
              </p>
              <ol className="text-sm text-blue-800 space-y-1 ml-4 list-decimal">
                <li>Click "Grant Access" below</li>
                <li>Your browser will ask for camera permission</li>
                <li>Click "Allow" to start using the camera</li>
              </ol>
              <p className="text-xs text-blue-700 mt-2">
                💡 <strong>Tip:</strong> If you don't see a prompt, check your browser's address bar for a camera icon.
              </p>
            </div>
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>
            {errorInfo ? 'Close' : 'Cancel'}
          </AlertDialogCancel>
          {!errorInfo && (
            <AlertDialogAction onClick={onConfirm} className="bg-teal-600 hover:bg-teal-700">
              Grant Access
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
