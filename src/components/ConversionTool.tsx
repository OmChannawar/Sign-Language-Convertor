import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Video, 
  VideoOff, 
  Volume2, 
  VolumeX, 
  ArrowLeftRight, 
  Settings,
  Play,
  Pause,
  AlertCircle,
  Hand
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCamera } from './hooks/useCamera';
import { CameraPermissionDialog } from './CameraPermissionDialog';

export function ConversionTool() {
  const camera = useCamera();
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState('english');
  const [mode, setMode] = React.useState<'sign-to-text' | 'text-to-sign'>('sign-to-text');
  const [convertedText, setConvertedText] = React.useState('');
  const [inputText, setInputText] = React.useState('');
  const [showPermissionDialog, setShowPermissionDialog] = React.useState(false);

  // Simulated conversion text for demo purposes
  const demoConversions = [
    'Hello, how are you?',
    'Thank you for your help',
    'I am learning sign language',
    'What is your name?',
    'Nice to meet you'
  ];

  const handleStartSession = async () => {
    console.log('🚀 Start Session clicked');
    // Directly request camera access to trigger browser's native permission popup
    await camera.startCamera();
    console.log('Camera started, isActive:', camera.isActive);
    // Simulate real-time conversion (in a real app, this would connect to ML model)
    if (mode === 'sign-to-text' && camera.isActive) {
      setTimeout(() => {
        if (camera.isActive) {
          setConvertedText(demoConversions[Math.floor(Math.random() * demoConversions.length)]);
        }
      }, 3000);
    }
  };

  const handleCameraStart = async () => {
    setShowPermissionDialog(false);
    await camera.startCamera();
    // Simulate real-time conversion (in a real app, this would connect to ML model)
    if (mode === 'sign-to-text' && camera.isActive) {
      setTimeout(() => {
        if (camera.isActive) {
          setConvertedText(demoConversions[Math.floor(Math.random() * demoConversions.length)]);
        }
      }, 3000);
    }
  };

  const handleStopSession = () => {
    camera.stopCamera();
    setConvertedText('');
  };

  const handleSpeak = () => {
    setIsSpeaking(true);
    // In a real app, this would use Web Speech API
    setTimeout(() => {
      setIsSpeaking(false);
    }, 2000);
  };

  const handleModeSwitch = () => {
    camera.stopCamera();
    setMode(mode === 'sign-to-text' ? 'text-to-sign' : 'sign-to-text');
    setConvertedText('');
    setInputText('');
  };

  // Show error dialog when camera error occurs
  React.useEffect(() => {
    if (camera.error) {
      setShowPermissionDialog(true);
    }
  }, [camera.error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="mb-4 text-blue-900">ISL Conversion Tool</h1>
          <p className="text-lg text-gray-600">
            Real-time conversion between sign language and text/speech
          </p>
        </div>

        {/* Mode Switch */}
        <Card className="mb-8 border-2 border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Label className="text-gray-700">Conversion Mode:</Label>
              <div className="flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-full">
                <span className={mode === 'sign-to-text' ? 'text-blue-900' : 'text-gray-500'}>
                  Sign to Text/Speech
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleModeSwitch}
                  className="rounded-full hover:bg-blue-100"
                  aria-label="Switch conversion mode"
                >
                  <ArrowLeftRight className="w-5 h-5 text-teal-600" />
                </Button>
                <span className={mode === 'text-to-sign' ? 'text-blue-900' : 'text-gray-500'}>
                  Text/Speech to Sign
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Video/Input */}
          <div className="space-y-6">
            {mode === 'sign-to-text' ? (
              <Card className="border-2 border-blue-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-500 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Camera Feed - Sign Here
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gray-900">
                    {camera.isActive ? (
                      <video
                        ref={camera.videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <VideoOff className="w-16 h-16 mx-auto mb-4" />
                          <p>Camera Inactive</p>
                          <p className="text-sm">Click "Start Session" to begin</p>
                        </div>
                      </div>
                    )}
                    {camera.isActive && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        Recording
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-blue-50 border-t border-blue-200">
                    <Button
                      onClick={camera.isActive ? handleStopSession : handleStartSession}
                      className={`w-full ${
                        camera.isActive
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-teal-600 hover:bg-teal-700'
                      }`}
                      size="lg"
                    >
                      {camera.isActive ? (
                        <>
                          <Pause className="mr-2 w-5 h-5" />
                          Stop Session
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 w-5 h-5" />
                          Start Session
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-blue-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-500 text-white">
                  <CardTitle>Text Input</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message here to see the corresponding ISL signs..."
                    className="min-h-[200px] text-lg mb-4"
                  />
                  <p className="text-sm text-gray-600 text-center">
                    Enter text above to see the ISL sign representation
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Settings Card */}
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Settings className="w-5 h-5 text-teal-600" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="language-select" className="mb-2 block">
                    Output Language
                  </Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger id="language-select">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi (हिंदी)</SelectItem>
                      <SelectItem value="marathi">Marathi (मराठी)</SelectItem>
                      <SelectItem value="tamil">Tamil (தமிழ்)</SelectItem>
                      <SelectItem value="bengali">Bengali (বাংলা)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Output */}
          <div className="space-y-6">
            {mode === 'sign-to-text' ? (
              <>
                {/* Converted Text Output */}
                <Card className="border-2 border-blue-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
                    <CardTitle>Converted Text</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 min-h-[200px] text-lg">
                      {convertedText || (
                        <span className="text-gray-400 italic">
                          Converted text will appear here...
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Speech Controls */}
                <Card className="border-2 border-blue-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-900">
                      <Volume2 className="w-5 h-5 text-teal-600" />
                      Speech Output
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Button
                      onClick={handleSpeak}
                      disabled={!convertedText || isSpeaking}
                      className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
                      size="lg"
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="mr-2 w-5 h-5 animate-pulse" />
                          Speaking...
                        </>
                      ) : (
                        <>
                          <Volume2 className="mr-2 w-5 h-5" />
                          Speak Text
                        </>
                      )}
                    </Button>
                    <p className="text-sm text-gray-600 mt-3 text-center">
                      Voice: {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}
                    </p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-blue-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
                  <CardTitle>ISL Sign Animation</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-teal-100">
                    {inputText ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* Placeholder for sign animation */}
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1729587024306-6992a1c1057c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoYW5kcyUyMGdlc3R1cmV8ZW58MXx8fHwxNzYxOTM2OTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          alt="ISL sign animation demonstration"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg">
                          <p className="text-center">Animating: "{inputText}"</p>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <Hand className="w-16 h-16 mx-auto mb-4" />
                          <p>Enter text and click "Generate"</p>
                          <p className="text-sm">to see ISL signs</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Info Card */}
            <Card className="border-2 border-teal-200 bg-teal-50 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-blue-900 mb-3">How It Works</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span>
                      <strong>Camera Access:</strong> Grant camera permissions for sign detection
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span>
                      <strong>Real-time Processing:</strong> AI analyzes hand gestures and movements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span>
                      <strong>Instant Conversion:</strong> Signs are converted to text and speech
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span>
                      <strong>Two-way Communication:</strong> Switch modes for complete interaction
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Camera Permission Dialog */}
      <CameraPermissionDialog
        open={showPermissionDialog}
        onOpenChange={(open) => {
          setShowPermissionDialog(open);
          if (!open) {
            camera.clearError();
          }
        }}
        onConfirm={handleCameraStart}
        error={camera.error}
      />
    </div>
  );
}
