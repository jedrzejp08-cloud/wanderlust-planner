import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Crown, Settings, Bell, HelpCircle, LogOut, 
  ChevronRight, Moon, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TopBar } from '@/components/navigation/TopBar';
import { useAuth } from '@/contexts/AuthContext';
import moonLogo from '@/assets/moon-logo.png';

export default function ProfilePage() {
  const { user, isPremium, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: Crown, label: 'Premium', action: () => navigate('/premium'), highlight: !isPremium },
    { icon: Bell, label: 'Powiadomienia', action: () => {} },
    { icon: Settings, label: 'Ustawienia', action: () => {} },
    { icon: Shield, label: 'Prywatność', action: () => {} },
    { icon: HelpCircle, label: 'Pomoc', action: () => {} },
  ];

  return (
    <div className="min-h-screen">
      <TopBar title="Profil" showPremium={false} />

      <div className="px-4 pt-20 pb-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/20 mb-4">
            <img src={moonLogo} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-bold">{user?.name || 'Podróżnik'}</h2>
          <p className="text-muted-foreground">{user?.email}</p>
          
          {isPremium && (
            <div className="mt-3 px-4 py-1.5 gradient-premium rounded-full flex items-center gap-2">
              <Crown className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-bold text-primary-foreground">Premium</span>
            </div>
          )}
        </div>

        {/* Premium Banner (if not premium) */}
        {!isPremium && (
          <Card 
            variant="premium" 
            className="mb-6 cursor-pointer"
            onClick={() => navigate('/premium')}
          >
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-premium flex items-center justify-center">
                <Crown className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Przejdź na Premium</h3>
                <p className="text-sm text-muted-foreground">
                  Odblokuj wszystkie funkcje za 15 zł/mies
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </CardContent>
          </Card>
        )}

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Card 
              key={item.label} 
              variant="interactive"
              onClick={item.action}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  item.highlight ? 'gradient-premium' : 'bg-secondary'
                }`}>
                  <item.icon className={`w-5 h-5 ${item.highlight ? 'text-primary-foreground' : ''}`} />
                </div>
                <span className="flex-1 font-medium">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Logout */}
        <Button 
          variant="ghost" 
          size="lg" 
          className="w-full mt-8 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Wyloguj się
        </Button>

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          Voyager v1.0.0
        </p>
      </div>
    </div>
  );
}
