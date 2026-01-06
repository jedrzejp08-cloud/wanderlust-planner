import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Crown, Check, Calendar, Users, MessageSquare, Map, Bell, 
  Sparkles, ArrowLeft, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const premiumFeatures = [
  { icon: Calendar, label: 'Interaktywny kalendarz z osią czasu' },
  { icon: Map, label: 'Mapa z trybem "Prowadź mnie"' },
  { icon: Users, label: 'Grupowe planowanie podróży' },
  { icon: MessageSquare, label: 'AI Concierge - asystent podróży' },
  { icon: Bell, label: 'Powiadomienia przed wydarzeniami' },
  { icon: Sparkles, label: 'Lokalne eventy dopasowane do Ciebie' },
];

export default function PremiumPage() {
  const navigate = useNavigate();
  const { isPremium, upgradeToPremium } = useAuth();

  const handleUpgrade = () => {
    // In production, this would open Stripe/Google Play Billing
    upgradeToPremium();
    navigate('/dashboard');
  };

  if (isPremium) {
    return (
      <div className="min-h-screen flex flex-col px-6 py-12 safe-area-top safe-area-bottom">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => navigate(-1)}
          className="self-start mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full gradient-premium flex items-center justify-center mb-6">
            <Crown className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Jesteś Premium!</h1>
          <p className="text-muted-foreground mb-8">
            Masz dostęp do wszystkich funkcji Voyager
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            Wróć do aplikacji
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 pt-12 pb-8 safe-area-top">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Hero */}
      <div className="px-6 text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-premium flex items-center justify-center glow-moon">
          <Crown className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Voyager Premium</h1>
        <p className="text-muted-foreground">
          Odblokuj pełny potencjał planowania podróży
        </p>
      </div>

      {/* Price */}
      <Card variant="premium" className="mx-6 mb-8">
        <CardContent className="p-6 text-center">
          <div className="flex items-baseline justify-center gap-1 mb-2">
            <span className="text-4xl font-bold text-gradient-premium">15</span>
            <span className="text-lg text-muted-foreground">zł / miesiąc</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Anuluj w dowolnym momencie
          </p>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="px-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Co dostajesz:</h2>
        <div className="space-y-3">
          {premiumFeatures.map((feature) => (
            <div key={feature.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto px-6 py-6 bg-background border-t border-border safe-area-bottom">
        <Button 
          variant="premium" 
          size="xl" 
          className="w-full mb-3"
          onClick={handleUpgrade}
        >
          <Sparkles className="w-5 h-5" />
          Przejdź na Premium
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Płatność przez Stripe • Google Play Billing
        </p>
      </div>
    </div>
  );
}
