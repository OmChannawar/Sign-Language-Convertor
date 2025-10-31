import { useEffect, useRef, useState, useCallback } from 'react';

export function useCamera() {
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
  const videoRef = useCallback((node: HTMLVideoElement | null) => {
    console.log('Video ref callback called:', !!node);
    setVideoElement(node);
  }, []);
  
  const streamRef = useRef<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied'>('prompt');

  // Check permission status on mount
  useEffect(() => {
    const checkPermission = async () => {
      try {
        if (navigator.permissions && navigator.permissions.query) {
          const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
          setPermissionState(result.state);
          
          result.addEventListener('change', () => {
            setPermissionState(result.state);
          });
        }
      } catch (err) {
        // Permission API not supported in all browsers
        console.log('Permission API not supported');
      }
    };
    
    checkPermission();
  }, []);

  const startCamera = async () => {
    try {
      console.log('🎥 Requesting camera access...');
      setError(null);
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Camera access is not supported in this browser. Please use a modern browser like Chrome, Firefox, or Safari.');
        return;
      }

      console.log('📹 Calling getUserMedia...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      });
      console.log('✅ Camera access granted! Stream tracks:', stream.getTracks().length);

      streamRef.current = stream;
      setIsActive(true);
      setHasPermission(true);
      setPermissionState('granted');
      
    } catch (err) {
      // Log camera error for debugging (handled gracefully in UI)
      console.log('Camera access error:', err instanceof Error ? err.name : 'Unknown error');
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setError('permission_denied');
          setHasPermission(false);
          setPermissionState('denied');
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          setError('no_camera');
        } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
          setError('camera_in_use');
        } else {
          setError('unknown_error');
        }
      }
      setIsActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoElement) {
      videoElement.srcObject = null;
    }
    setIsActive(false);
  };

  const clearError = () => {
    setError(null);
  };

  // Attach stream to video element when both are available
  useEffect(() => {
    console.log('useEffect triggered:', { 
      hasVideoElement: !!videoElement, 
      hasStream: !!streamRef.current, 
      isActive 
    });
    
    if (videoElement && streamRef.current && isActive) {
      console.log('📺 Attaching stream to video element via useEffect');
      console.log('Video element:', videoElement);
      console.log('Stream:', streamRef.current);
      console.log('Stream active:', streamRef.current.active);
      console.log('Stream tracks:', streamRef.current.getTracks());
      
      videoElement.srcObject = streamRef.current;
      
      // Force play
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('✅ Video playing successfully!');
            console.log('Video dimensions:', videoElement.videoWidth, 'x', videoElement.videoHeight);
          })
          .catch(err => {
            console.log('❌ Video play error:', err);
          });
      }
    }
  }, [videoElement, isActive]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopCamera();
    };
  }, []);

  return {
    videoRef,
    isActive,
    error,
    hasPermission,
    permissionState,
    startCamera,
    stopCamera,
    clearError
  };
}
