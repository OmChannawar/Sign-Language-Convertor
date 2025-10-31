import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  X, 
  Trophy,
  Timer,
  Hand,
  VideoOff,
  Video,
  AlertCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCamera } from './hooks/useCamera';
import { CameraPermissionDialog } from './CameraPermissionDialog';

export function PracticePage() {
  const camera = useCamera();
  const [isActive, setIsActive] = React.useState(false);
  const [currentLetter, setCurrentLetter] = React.useState('A');
  const [timer, setTimer] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [attempts, setAttempts] = React.useState(0);
  const [feedback, setFeedback] = React.useState<'correct' | 'incorrect' | null>(null);
  const [showPermissionDialog, setShowPermissionDialog] = React.useState(false);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const handleStart = async () => {
    // Directly request camera access to trigger browser's native permission popup
    await camera.startCamera();
    if (camera.isActive || !camera.error) {
      setIsActive(true);
      setTimer(10);
      setFeedback(null);
      setCurrentLetter(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }
  };

  const handleCameraStart = async () => {
    setShowPermissionDialog(false);
    await camera.startCamera();
    if (camera.isActive || !camera.error) {
      setIsActive(true);
      setTimer(10);
      setFeedback(null);
      setCurrentLetter(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }
  };

  // Show error dialog when camera error occurs
  React.useEffect(() => {
    if (camera.error) {
      setShowPermissionDialog(true);
    }
  }, [camera.error]);

  const handleStop = () => {
    camera.stopCamera();
    setIsActive(false);
  };

  const handleReset = () => {
    camera.stopCamera();
    setIsActive(false);
    setTimer(0);
    setScore(0);
    setAttempts(0);
    setFeedback(null);
    setCurrentLetter('A');
  };

  const simulateCheck = () => {
    setAttempts((prev) => prev + 1);
    // Simulate random feedback (in real app, this would use ML model)
    const isCorrect = Math.random() > 0.3;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setTimeout(() => {
        setFeedback(null);
        setCurrentLetter(alphabet[Math.floor(Math.random() * alphabet.length)]);
        setTimer(10);
      }, 1500);
    } else {
      setTimeout(() => {
        setFeedback(null);
        setTimer(10);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="mb-4 text-blue-900">ISL Fingerspelling Practice</h1>
          <p className="text-lg text-gray-600">
            Master the ISL alphabet with interactive practice sessions
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl text-teal-600 mb-1">{score}</div>
              <div className="text-sm text-gray-600">Correct Signs</div>
            </CardContent>
          </Card>
          <Card className="border-2 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl text-orange-600 mb-1">{attempts}</div>
              <div className="text-sm text-gray-600">Total Attempts</div>
            </CardContent>
          </Card>
          <Card className="border-2 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl text-blue-600 mb-1">
                {attempts > 0 ? Math.round((score / attempts) * 100) : 0}%
              </div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </CardContent>
          </Card>
          <Card className="border-2 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl text-purple-600 mb-1">{timer}s</div>
              <div className="text-sm text-gray-600">Time Left</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Current Challenge */}
          <div className="space-y-6">
            <Card className="border-2 border-teal-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Hand className="w-5 h-5" />
                    Current Challenge
                  </span>
                  {isActive && (
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      <Timer className="w-4 h-4 mr-1" />
                      {timer}s
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Sign this letter:</p>
                  <div className="w-40 h-40 mx-auto rounded-3xl bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center mb-6 shadow-2xl transform hover:scale-105 transition-transform">
                    <span className="text-8xl text-white">{currentLetter}</span>
                  </div>
                  
                  {timer > 0 && isActive && (
                    <div className="mb-6">
                      <Progress value={(timer / 10) * 100} className="h-2" />
                    </div>
                  )}

                  {feedback && (
                    <div
                      className={`p-4 rounded-lg mb-4 flex items-center justify-center gap-2 ${
                        feedback === 'correct'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {feedback === 'correct' ? (
                        <>
                          <Check className="w-6 h-6" />
                          <span>Correct! Great job!</span>
                        </>
                      ) : (
                        <>
                          <X className="w-6 h-6" />
                          <span>Try again! Check your hand position.</span>
                        </>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3 justify-center">
                    {!isActive ? (
                      <Button
                        onClick={handleStart}
                        size="lg"
                        className="bg-teal-600 hover:bg-teal-700"
                      >
                        <Play className="mr-2 w-5 h-5" />
                        Start Practice
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={simulateCheck}
                          size="lg"
                          className="bg-orange-500 hover:bg-orange-600"
                          disabled={!isActive || feedback !== null}
                        >
                          <Check className="mr-2 w-5 h-5" />
                          Check Sign
                        </Button>
                        <Button
                          onClick={handleStop}
                          size="lg"
                          variant="outline"
                          className="border-2"
                        >
                          <Pause className="mr-2 w-5 h-5" />
                          Pause
                        </Button>
                      </>
                    )}
                    <Button
                      onClick={handleReset}
                      size="lg"
                      variant="outline"
                      className="border-2"
                    >
                      <RotateCcw className="mr-2 w-5 h-5" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievement Card */}
            {score >= 5 && (
              <Card className="border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                  <h3 className="text-yellow-800 mb-2">Achievement Unlocked!</h3>
                  <p className="text-sm text-yellow-700">
                    You've correctly signed {score} letters. Keep going!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Camera Feed and Reference */}
          <div className="space-y-6">
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Your Camera Feed
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
                        <p className="text-sm">Click "Start Practice" to begin</p>
                      </div>
                    </div>
                  )}
                  {camera.isActive && (
                    <div className="absolute top-4 left-4 right-4">
                      <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-center">
                        <p className="text-sm">Sign the letter: <strong className="text-2xl text-teal-400">{currentLetter}</strong></p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Reference Guide */}
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-900">ISL Alphabet Reference</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative rounded-lg overflow-hidden mb-4">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1729587024306-6992a1c1057c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoYW5kcyUyMGdlc3R1cmV8ZW58MXx8fHwxNzYxOTM2OTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="ISL alphabet reference - hand gestures"
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <p className="text-white text-sm">
                      Reference: ISL Fingerspelling Guide
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 border-l-4 border-teal-500 p-4 rounded">
                  <h4 className="text-blue-900 mb-2">Practice Tips:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Ensure good lighting for accurate detection</li>
                    <li>• Keep your hand clearly visible in the frame</li>
                    <li>• Hold each sign steady for 2-3 seconds</li>
                    <li>• Practice finger positioning carefully</li>
                    <li>• Start slow and build speed gradually</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alphabet Grid */}
        <Card className="mt-8 border-2 border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-900">Full ISL Alphabet</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => {
                    setCurrentLetter(letter);
                    setFeedback(null);
                  }}
                  className={`aspect-square rounded-lg border-2 flex items-center justify-center transition-all hover:scale-110 ${
                    currentLetter === letter
                      ? 'bg-teal-500 text-white border-teal-600 shadow-lg'
                      : 'bg-white text-gray-700 border-blue-200 hover:border-teal-400'
                  }`}
                  aria-label={`Practice letter ${letter}`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
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
