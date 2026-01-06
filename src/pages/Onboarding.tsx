import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Sparkles, ArrowRight, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import nightSkyBg from '@/assets/night-sky-bg.jpg';
import moonLogo from '@/assets/moon-logo.png';

const features = [
  {
    icon: MapPin,
    title: 'Inteligentne planowanie',
    description: 'AI tworzy plan dostosowany do Twojego stylu podróży',
  },
  {
    icon: Calendar,
    title: 'Dzień po dniu',
    description: 'Szczegółowy harmonogram z atrakcjami i rezerwacjami',
  },
  {
    icon: Users,
    title: 'Podróże grupowe',
    description: 'Planuj wspólnie z rodziną i przyjaciółmi',
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${nightSkyBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />

      {/* Content */}
      <div className="relative flex-1 flex flex-col px-6 py-12 safe-area-top safe-area-bottom">
        {/* Logo */}
        <div className="flex flex-col items-center mb-auto animate-fade-in">
          <div className="w-24 h-24 mb-6 animate-float glow-moon rounded-full overflow-hidden">
            <img src={moonLogo} alt="Voyager" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight">Voyager</h1>
          <p className="text-lg text-muted-foreground mt-2 text-center">
            Planuj podróże marzeń
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 my-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="space-y-4 mt-auto">
          <Button size="xl" className="w-full" onClick={() => navigate('/auth')}>
            Rozpocznij
            <Sparkles className="w-5 h-5" />
          </Button>
          
          <p className="text-center text-sm text-muted-foreground">
            Masz konto?{' '}
            <button
              onClick={() => navigate('/auth')}
              className="text-primary font-semibold hover:underline"
            >
              Zaloguj się
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
