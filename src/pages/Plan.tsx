import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plane, Hotel, Utensils, Landmark, Calendar, ExternalLink, 
  ChevronRight, MapPin, Clock, Save, Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TopBar } from '@/components/navigation/TopBar';
import { useTrip, Activity, TripDay } from '@/contexts/TripContext';

const activityIcons: Record<string, React.ElementType> = {
  flight: Plane,
  hotel: Hotel,
  restaurant: Utensils,
  attraction: Landmark,
  event: Calendar,
  transport: Plane,
};

const activityColors: Record<string, string> = {
  flight: 'bg-blue-500/10 text-blue-400',
  hotel: 'bg-purple-500/10 text-purple-400',
  restaurant: 'bg-orange-500/10 text-orange-400',
  attraction: 'bg-green-500/10 text-green-400',
  event: 'bg-pink-500/10 text-pink-400',
  transport: 'bg-cyan-500/10 text-cyan-400',
};

function ActivityCard({ activity }: { activity: Activity }) {
  const Icon = activityIcons[activity.type] || Landmark;
  const colorClass = activityColors[activity.type] || 'bg-primary/10 text-primary';

  return (
    <Card variant="interactive" className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {activity.time && (
                <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                  {activity.time}
                </span>
              )}
            </div>
            <h4 className="font-semibold truncate">{activity.name}</h4>
            {activity.description && (
              <p className="text-sm text-muted-foreground mt-0.5">{activity.description}</p>
            )}
            <div className="flex items-center gap-4 mt-2">
              {activity.price && (
                <span className="text-sm text-muted-foreground">
                  ~{activity.price} PLN
                </span>
              )}
              {activity.link && (
                <a
                  href={activity.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary flex items-center gap-1 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Rezerwuj <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DaySection({ day, dayNumber }: { day: TripDay; dayNumber: number }) {
  const date = new Date(day.date);
  const dayName = date.toLocaleDateString('pl-PL', { weekday: 'long' });
  const dateStr = date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' });

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="timeline-dot" />
        <div>
          <h3 className="font-bold text-lg">Dzień {dayNumber}</h3>
          <p className="text-sm text-muted-foreground capitalize">{dayName}, {dateStr}</p>
        </div>
      </div>
      <div className="ml-6 border-l-2 border-border/50 pl-6">
        {day.activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}

export default function PlanPage() {
  const navigate = useNavigate();
  const { currentTrip, saveTrip, trips } = useTrip();

  // If no current trip, show list or empty state
  if (!currentTrip) {
    return (
      <div className="min-h-screen">
        <TopBar title="Plan podróży" />
        
        <div className="px-4 pt-20 pb-8">
          {trips.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-lg font-bold mb-4">Wybierz podróż</h2>
              {trips.map((trip) => (
                <Card
                  key={trip.id}
                  variant="interactive"
                  onClick={() => {
                    // Set current trip and reload
                    navigate('/plan');
                  }}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{trip.destination}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(trip.startDate).toLocaleDateString('pl-PL')}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                <Calendar className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Brak planów</h3>
              <p className="text-muted-foreground mb-6">Stwórz swoją pierwszą podróż</p>
              <Button onClick={() => navigate('/plan/create')}>
                Zaplanuj podróż
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const handleSave = () => {
    saveTrip(currentTrip);
  };

  return (
    <div className="min-h-screen">
      <TopBar 
        title={currentTrip.destination}
        showBack
      >
        <Button variant="ghost" size="icon-sm" onClick={handleSave}>
          <Save className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon-sm">
          <Share2 className="w-5 h-5" />
        </Button>
      </TopBar>

      <div className="px-4 pt-20 pb-8">
        {/* Trip Overview */}
        <Card variant="elevated" className="mb-6">
          <CardContent className="p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{currentTrip.destination}</h2>
                <p className="text-muted-foreground">z {currentTrip.origin}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {new Date(currentTrip.startDate).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })} - {new Date(currentTrip.endDate).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })}
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-4 h-4" />
                {currentTrip.days.length} dni
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <h2 className="text-lg font-bold mb-4">Plan dnia po dniu</h2>
        {currentTrip.days.map((day, index) => (
          <DaySection key={day.date} day={day} dayNumber={index + 1} />
        ))}
      </div>
    </div>
  );
}
