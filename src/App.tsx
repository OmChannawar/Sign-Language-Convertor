import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ConversionTool } from './components/ConversionTool';
import { PracticePage } from './components/PracticePage';
import { AccessibilityOverlay } from './components/AccessibilityOverlay';
import { Button } from './components/ui/button';
import { User } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState('home');
  const [accessibilityOpen, setAccessibilityOpen] = React.useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'tool':
        return <ConversionTool />;
      case 'practice':
        return <PracticePage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer />

      {/* Accessibility Toggle Button */}
      <Button
        onClick={() => setAccessibilityOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl bg-teal-600 hover:bg-teal-700 z-40"
        size="icon"
        aria-label="Open accessibility settings"
      >
        <User className="w-6 h-6" />
      </Button>

      {/* Accessibility Overlay */}
      <AccessibilityOverlay
        isOpen={accessibilityOpen}
        onClose={() => setAccessibilityOpen(false)}
      />
    </div>
  );
}
