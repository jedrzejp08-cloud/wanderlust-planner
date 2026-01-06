import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from '@/components/navigation/BottomNav';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <main className="content-area">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
