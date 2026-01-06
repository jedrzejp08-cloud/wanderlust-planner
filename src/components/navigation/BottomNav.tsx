import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Map, Calendar, Wallet, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
  premium?: boolean;
}

const navItems: NavItem[] = [
  { to: '/dashboard', icon: Home, label: 'Dziś' },
  { to: '/plan', icon: Calendar, label: 'Plan' },
  { to: '/map', icon: Map, label: 'Mapa' },
  { to: '/budget', icon: Wallet, label: 'Budżet' },
  { to: '/profile', icon: User, label: 'Profil' },
];

export function BottomNav() {
  const location = useLocation();
  const { isPremium } = useAuth();

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;
          const isLocked = item.premium && !isPremium;

          return (
            <NavLink
              key={item.to}
              to={isLocked ? '/premium' : item.to}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 min-w-[64px]',
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('w-6 h-6', isActive && 'drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]')} />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
