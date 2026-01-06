import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Calendar, Users, Wallet, Sparkles, ArrowRight, ArrowLeft,
  Plane, DollarSign, PartyPopper, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { TopBar } from '@/components/navigation/TopBar';
import { useTrip, TravelStyle } from '@/contexts/TripContext';

const travelStyles: { value: TravelStyle; label: string; description: string; icon: React.ElementType }[] = [
  { 
    value: 'economic', 
    label: 'Ekonomiczna', 
    description: 'Budżetowe opcje, lokalne smaki',
    icon: DollarSign,
  },
  { 
    value: 'balanced', 
    label: 'Bez szaleństw', 
    description: 'Komfort w rozsądnej cenie',
    icon: Plane,
  },
  { 
    value: 'luxury', 
    label: 'Totalny odpał', 
    description: 'Najlepsze doświadczenia',
    icon: PartyPopper,
  },
];

export default function CreateTripPage() {
  const navigate = useNavigate();
  const { createTrip, isGenerating } = useTrip();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    destination: '',
    origin: '',
    startDate: '',
    endDate: '',
    travelers: 2,
    budget: 5000,
    style: 'balanced' as TravelStyle,
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCreate = async () => {
    await createTrip(formData);
    navigate('/plan');
  };

  const isStep1Valid = formData.destination && formData.origin;
  const isStep2Valid = formData.startDate && formData.endDate;
  const isStep3Valid = formData.style;

  return (
    <div className="min-h-screen">
      <TopBar 
        title="Nowa podróż" 
        showBack 
        showPremium={false}
      />

      <div className="px-4 pt-20 pb-32">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div 
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                s <= step ? 'bg-primary' : 'bg-secondary'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Destination */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Gdzie jedziesz?</h2>
              <p className="text-muted-foreground mt-1">Podaj cel i punkt startowy</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  Cel podróży
                </label>
                <Input
                  placeholder="np. Lizbona, Portugalia"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  Miejsce startu
                </label>
                <Input
                  placeholder="np. Warszawa"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Dates & Travelers */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Kiedy i z kim?</h2>
              <p className="text-muted-foreground mt-1">Daty i liczba podróżników</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-muted-foreground">
                    Data wyjazdu
                  </label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block text-muted-foreground">
                    Data powrotu
                  </label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  Liczba osób
                </label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setFormData({ ...formData, travelers: Math.max(1, formData.travelers - 1) })}
                  >
                    -
                  </Button>
                  <span className="text-2xl font-bold w-12 text-center">{formData.travelers}</span>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setFormData({ ...formData, travelers: formData.travelers + 1 })}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  Budżet (PLN)
                </label>
                <Input
                  type="number"
                  placeholder="5000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Travel Style */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Jaki styl?</h2>
              <p className="text-muted-foreground mt-1">Wybierz charakter podróży</p>
            </div>

            <div className="space-y-3">
              {travelStyles.map((style) => {
                const Icon = style.icon;
                const isSelected = formData.style === style.value;
                
                return (
                  <Card
                    key={style.value}
                    variant={isSelected ? 'interactive' : 'default'}
                    className={`cursor-pointer ${isSelected ? 'border-primary bg-primary/5' : ''}`}
                    onClick={() => setFormData({ ...formData, style: style.value })}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{style.label}</h3>
                        <p className="text-sm text-muted-foreground">{style.description}</p>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-xl border-t border-border safe-area-bottom">
        <div className="flex gap-3">
          {step > 1 && (
            <Button variant="secondary" size="lg" onClick={handleBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          
          {step < 3 ? (
            <Button 
              size="lg" 
              className="flex-1" 
              onClick={handleNext}
              disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)}
            >
              Dalej
              <ArrowRight className="w-5 h-5" />
            </Button>
          ) : (
            <Button 
              size="lg" 
              className="flex-1" 
              onClick={handleCreate}
              disabled={!isStep3Valid || isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Generuję plan...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generuj plan
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
