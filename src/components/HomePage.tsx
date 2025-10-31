import React from 'react';
import { Button } from './ui/button';
import { FeatureCard } from './FeatureCard';
import { ArrowRight, Video, Volume2, Hand, MessageSquare, Users, Globe } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(20,184,166,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.3),transparent_50%)]" />
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="mb-6 text-white">
                Communicate Seamlessly. Bridge the Gap.
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Real-time Indian Sign Language to Text and Speech conversion. Breaking
                barriers, building connections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => onNavigate('tool')}
                  className="bg-teal-500 hover:bg-teal-600 text-white group"
                >
                  Start Conversion
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('practice')}
                  className="border-2 border-white text-white hover:bg-white/10"
                >
                  Practice Fingerspelling
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1542839577-6de07fb2cda5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwZW9wbGUlMjBkaXZlcnNpdHl8ZW58MXx8fHwxNzYxOTM2OTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Diverse Indian community communicating together"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-teal-400 rounded-full blur-3xl opacity-50" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-orange-400 rounded-full blur-3xl opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-blue-900">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience seamless communication with our advanced ISL conversion technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Video}
              title="Real-time ISL to Text"
              description="Instantly convert Indian Sign Language gestures to written text with high accuracy"
            />
            <FeatureCard
              icon={Volume2}
              title="Text-to-Speech Output"
              description="Convert text to natural speech in multiple Indian languages including Hindi, English, and Marathi"
            />
            <FeatureCard
              icon={Hand}
              title="ISL Alphabet Practice"
              description="Learn and practice ISL fingerspelling with interactive exercises and real-time feedback"
            />
            <FeatureCard
              icon={MessageSquare}
              title="Two-way Communication"
              description="Seamlessly switch between ISL to text/speech and text/speech to ISL visual representations"
            />
          </div>
        </div>
      </section>

      {/* About the Community Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1572847748080-bac263fae977?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMHN0dWRlbnRzJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzYxOTM2OTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Indian students learning and collaborating together"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-blue-900">About the Deaf and Hard-of-Hearing Community</h2>
              
              <div className="bg-gradient-to-br from-teal-500 to-blue-600 text-white p-8 rounded-2xl mb-6 shadow-lg">
                <div className="flex items-center gap-4 mb-3">
                  <Users className="w-12 h-12" />
                  <div>
                    <div className="text-4xl">430+ Million</div>
                    <div className="text-blue-100">People worldwide</div>
                  </div>
                </div>
                <p className="text-sm text-blue-100">
                  have disabling hearing loss — World Health Organization
                </p>
              </div>

              <div className="space-y-4 text-gray-700">
                <p>
                  Sign languages are <strong>complete, natural languages</strong> with their
                  own grammar and linguistic properties, just like spoken languages. Indian Sign
                  Language (ISL) is the predominant sign language used by the Deaf community in
                  India.
                </p>
                <p>
                  Deaf culture is rich and diverse, emphasizing visual communication,
                  community bonds, and linguistic identity. Recognizing and respecting sign
                  languages as legitimate languages is crucial for the rights and dignity of
                  Deaf individuals.
                </p>
                <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg border-l-4 border-teal-500">
                  <Globe className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-blue-900">Our Commitment:</strong>
                    <p className="text-sm mt-1">
                      We are committed to promoting accessibility, inclusion, and equal
                      communication opportunities for all members of the Deaf and
                      hard-of-hearing community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-white">Ready to Start?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Begin your journey towards inclusive communication today
          </p>
          <Button
            size="lg"
            onClick={() => onNavigate('tool')}
            className="bg-white text-blue-900 hover:bg-blue-50"
          >
            Launch Conversion Tool
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
