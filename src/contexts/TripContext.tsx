import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TravelStyle = 'economic' | 'balanced' | 'luxury';

export interface TripPlan {
  id: string;
  destination: string;
  origin: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  style: TravelStyle;
  days: TripDay[];
  createdAt: string;
}

export interface TripDay {
  date: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  type: 'flight' | 'hotel' | 'restaurant' | 'attraction' | 'event' | 'transport';
  name: string;
  description?: string;
  time?: string;
  duration?: number;
  price?: number;
  link?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  isPremium?: boolean;
}

interface TripContextType {
  currentTrip: TripPlan | null;
  trips: TripPlan[];
  isGenerating: boolean;
  createTrip: (data: Omit<TripPlan, 'id' | 'days' | 'createdAt'>) => Promise<void>;
  saveTrip: (trip: TripPlan) => void;
  deleteTrip: (id: string) => void;
  setCurrentTrip: (trip: TripPlan | null) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

const generateMockDays = (startDate: string, endDate: string, destination: string, style: TravelStyle): TripDay[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days: TripDay[] = [];
  
  const hotels = {
    economic: { name: 'Hostel Central', price: 80 },
    balanced: { name: 'Hotel Comfort', price: 200 },
    luxury: { name: 'Grand Palace Hotel', price: 500 },
  };

  const restaurants = {
    economic: [
      { name: 'Street Food Market', price: 15 },
      { name: 'Local Cafe', price: 20 },
    ],
    balanced: [
      { name: 'Bistro Moderne', price: 45 },
      { name: 'Trattoria Bella', price: 55 },
    ],
    luxury: [
      { name: 'Michelin Star Restaurant', price: 150 },
      { name: 'Rooftop Fine Dining', price: 200 },
    ],
  };

  const attractions = [
    { name: 'Stare Miasto', description: 'Historyczne centrum miasta' },
    { name: 'Muzeum Narodowe', description: 'Kolekcja sztuki i historii' },
    { name: 'Park Miejski', description: 'Relaks na świeżym powietrzu' },
    { name: 'Wieża widokowa', description: 'Panorama miasta' },
  ];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dayNum = days.length + 1;
    const activities: Activity[] = [];

    // First day - arrival
    if (dayNum === 1) {
      activities.push({
        id: crypto.randomUUID(),
        type: 'flight',
        name: `Lot do ${destination}`,
        time: '08:00',
        price: style === 'economic' ? 150 : style === 'balanced' ? 300 : 600,
        link: 'https://www.skyscanner.pl',
      });
    }

    // Hotel
    activities.push({
      id: crypto.randomUUID(),
      type: 'hotel',
      name: hotels[style].name,
      time: '14:00',
      price: hotels[style].price,
      link: 'https://www.booking.com',
    });

    // Attractions
    const attraction = attractions[dayNum % attractions.length];
    activities.push({
      id: crypto.randomUUID(),
      type: 'attraction',
      name: attraction.name,
      description: attraction.description,
      time: '10:00',
      duration: 120,
    });

    // Restaurant
    const restaurant = restaurants[style][dayNum % restaurants[style].length];
    activities.push({
      id: crypto.randomUUID(),
      type: 'restaurant',
      name: restaurant.name,
      time: '19:00',
      price: restaurant.price,
    });

    days.push({
      date: d.toISOString().split('T')[0],
      activities,
    });
  }

  return days;
};

export function TripProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<TripPlan[]>(() => {
    const stored = localStorage.getItem('voyager_trips');
    return stored ? JSON.parse(stored) : [];
  });
  const [currentTrip, setCurrentTrip] = useState<TripPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const createTrip = async (data: Omit<TripPlan, 'id' | 'days' | 'createdAt'>) => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const days = generateMockDays(data.startDate, data.endDate, data.destination, data.style);
    
    const newTrip: TripPlan = {
      ...data,
      id: crypto.randomUUID(),
      days,
      createdAt: new Date().toISOString(),
    };
    
    setCurrentTrip(newTrip);
    setIsGenerating(false);
  };

  const saveTrip = (trip: TripPlan) => {
    const updatedTrips = [...trips.filter(t => t.id !== trip.id), trip];
    setTrips(updatedTrips);
    localStorage.setItem('voyager_trips', JSON.stringify(updatedTrips));
  };

  const deleteTrip = (id: string) => {
    const updatedTrips = trips.filter(t => t.id !== id);
    setTrips(updatedTrips);
    localStorage.setItem('voyager_trips', JSON.stringify(updatedTrips));
    if (currentTrip?.id === id) {
      setCurrentTrip(null);
    }
  };

  return (
    <TripContext.Provider
      value={{
        currentTrip,
        trips,
        isGenerating,
        createTrip,
        saveTrip,
        deleteTrip,
        setCurrentTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}
