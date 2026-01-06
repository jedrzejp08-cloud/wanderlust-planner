import React from 'react';
import { ArrowLeft, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  showPremium?: boolean;
  transparent?: boolean;
  children?: React.ReactNode;
}

export function TopBar({ title, showBack, showPremium = true, transparent, children }: TopBarProps) {
  const navigate = useNavigate();
  const { isPremium } = useAuth();

  return (
    <header className={cn(
      'top-bar',
      transparent && 'bg-transparent border-transparent'
    )}>
      <div className="flex items-center justify-between px-4 py-3 min-h-[56px]">
        <div className="flex items-center gap-3">
          {showBack && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => navigate(-1)}
              className="text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          {title && (
            <h1 className="text-lg font-bold">{title}</h1>
          )}
        </div>

        <div className="flex items-center gap-2">
          {children}
          {showPremium && !isPremium && (
            <Button
              variant="premium"
              size="sm"
              onClick={() => navigate('/premium')}
              className="gap-1.5"
            >
              <Crown className="w-4 h-4" />
              Premium
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
