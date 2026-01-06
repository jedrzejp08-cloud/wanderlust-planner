import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, Calendar, ChevronRight, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TopBar } from '@/components/navigation/TopBar';
import { useAuth } from '@/contexts/AuthContext';
import { useTrip } from '@/contexts/TripContext';
import moonLogo from '@/assets/moon-logo.png';

export default function DashboardPage() {
  const { user } = useAuth();
  const { trips, currentTrip, setCurrentTrip } = useTrip();
  const navigate = useNavigate();

  const today = new Date();
  const greeting = today.getHours() < 12 ? 'Dzień dobry' : today.getHours() < 18 ? 'Cześć' : 'Dobry wieczór';

  // Find upcoming trip
  const upcomingTrips = trips
    .filter(trip => new Date(trip.startDate) >= today)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const activeTrip = upcomingTrips[0] || currentTrip;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' });
  };

  const getDaysUntil = (dateStr: string) => {
    const date = new Date(dateStr);
    const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="min-h-screen">
      <TopBar />

      <div className="px-4 pt-20 pb-8">
        {/* Greeting */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20">
              <img src={moonLogo} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">{greeting},</p>
              <h1 className="text-xl font-bold">{user?.name || 'Podróżniku'}!</h1>
            </div>
          </div>
        </div>

        {/* Quick Action */}
        <Card variant="interactive" className="mb-6 overflow-hidden" onClick={() => navigate('/plan/create')}>
          <CardContent className="p-0">
            <div className="flex items-center gap-4 p-5">
              <div className="w-14 h-14 rounded-2xl gradient-premium flex items-center justify-center">
                <Plus className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Zaplanuj nową podróż</h3>
                <p className="text-sm text-muted-foreground">AI stworzy plan dopasowany do Ciebie</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Active Trip */}
        {activeTrip && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Nadchodząca podróż
            </h2>
            <Card 
              variant="elevated" 
              className="overflow-hidden cursor-pointer"
              onClick={() => {
                setCurrentTrip(activeTrip);
                navigate('/plan');
              }}
            >
              <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-primary/50" />
              </div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-xl">{activeTrip.destination}</h3>
                  <div className="flex items-center gap-1.5 text-primary bg-primary/10 px-3 py-1 rounded-full text-sm font-semibold">
                    <Clock className="w-4 h-4" />
                    {getDaysUntil(activeTrip.startDate)} dni
                  </div>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formatDate(activeTrip.startDate)} - {formatDate(activeTrip.endDate)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Past Trips */}
        {trips.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Twoje podróże</h2>
            <div className="space-y-3">
              {trips.slice(0, 3).map((trip) => (
                <Card 
                  key={trip.id} 
                  variant="interactive"
                  onClick={() => {
                    setCurrentTrip(trip);
                    navigate('/plan');
                  }}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{trip.destination}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {trips.length === 0 && !currentTrip && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
              <MapPin className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Brak planów podróży</h3>
            <p className="text-muted-foreground mb-6">Stwórz swoją pierwszą podróż i pozwól AI zaplanować szczegóły</p>
            <Button onClick={() => navigate('/plan/create')}>
              <Plus className="w-5 h-5" />
              Zaplanuj podróż
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
