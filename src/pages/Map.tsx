import React from 'react';
import { MapPin, Navigation, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TopBar } from '@/components/navigation/TopBar';
import { useTrip } from '@/contexts/TripContext';

export default function MapPage() {
  const { currentTrip } = useTrip();

  // Mock POIs
  const pois = currentTrip?.days.flatMap(day => 
    day.activities
      .filter(a => a.location || a.type === 'attraction' || a.type === 'restaurant')
      .map(a => ({
        id: a.id,
        name: a.name,
        type: a.type,
      }))
  ) || [];

  return (
    <div className="min-h-screen">
      <TopBar title="Mapa" />

      <div className="pt-16">
        {/* Search Bar */}
        <div className="px-4 py-3 bg-background sticky top-16 z-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Szukaj miejsc..."
              className="pl-12"
            />
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="h-[50vh] bg-secondary relative flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />
          <div className="text-center z-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <p className="text-muted-foreground">
              Mapa interaktywna
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              (Integracja Google Maps)
            </p>
          </div>
          
          {/* Navigation Button */}
          <Button
            className="absolute bottom-4 right-4 shadow-lg"
            size="lg"
          >
            <Navigation className="w-5 h-5" />
            Prowadź mnie
          </Button>
        </div>

        {/* POI List */}
        <div className="px-4 py-6">
          <h2 className="text-lg font-bold mb-4">Punkty na trasie</h2>
          
          {pois.length > 0 ? (
            <div className="space-y-3">
              {pois.map((poi, index) => (
                <Card key={poi.id} variant="interactive">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{poi.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{poi.type}</p>
                    </div>
                    <Button variant="ghost" size="icon-sm">
                      <Navigation className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Zaplanuj podróż, aby zobaczyć punkty na mapie
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
