import React from 'react';
import { Wallet, TrendingUp, TrendingDown, AlertTriangle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TopBar } from '@/components/navigation/TopBar';
import { useTrip } from '@/contexts/TripContext';

export default function BudgetPage() {
  const { currentTrip } = useTrip();

  // Calculate expenses from trip
  const totalBudget = currentTrip?.budget || 5000;
  const expenses = currentTrip?.days.flatMap(day =>
    day.activities
      .filter(a => a.price)
      .map(a => ({
        name: a.name,
        amount: a.price || 0,
        type: a.type,
        date: day.date,
      }))
  ) || [];

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = totalBudget - totalSpent;
  const percentUsed = (totalSpent / totalBudget) * 100;
  const isOverBudget = remaining < 0;

  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  const categoryLabels: Record<string, string> = {
    flight: 'Loty',
    hotel: 'Noclegi',
    restaurant: 'Jedzenie',
    attraction: 'Atrakcje',
    transport: 'Transport',
    event: 'Eventy',
  };

  return (
    <div className="min-h-screen">
      <TopBar title="Budżet" />

      <div className="px-4 pt-20 pb-8">
        {/* Overview Card */}
        <Card variant="elevated" className="mb-6 overflow-hidden">
          <div className={`h-2 ${isOverBudget ? 'bg-destructive' : 'bg-primary'}`} 
               style={{ width: `${Math.min(percentUsed, 100)}%` }} />
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Całkowity budżet</p>
                <p className="text-3xl font-bold">{totalBudget.toLocaleString()} PLN</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Wallet className="w-7 h-7 text-primary" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isOverBudget ? 'bg-destructive/10' : 'bg-secondary'
                }`}>
                  <TrendingUp className={`w-5 h-5 ${isOverBudget ? 'text-destructive' : 'text-foreground'}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Wydane</p>
                  <p className="font-bold">{totalSpent.toLocaleString()} PLN</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isOverBudget ? 'bg-destructive/10' : 'bg-success/10'
                }`}>
                  <TrendingDown className={`w-5 h-5 ${isOverBudget ? 'text-destructive' : 'text-success'}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pozostało</p>
                  <p className={`font-bold ${isOverBudget ? 'text-destructive' : 'text-success'}`}>
                    {remaining.toLocaleString()} PLN
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alert if over budget */}
        {isOverBudget && (
          <Card className="mb-6 border-destructive/50 bg-destructive/10">
            <CardContent className="p-4 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-destructive">Przekroczono budżet!</p>
                <p className="text-sm text-muted-foreground">
                  Rozważ zmiany w planie lub zwiększ budżet
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Categories */}
        <h2 className="text-lg font-bold mb-4">Podział wydatków</h2>
        <div className="space-y-3 mb-8">
          {Object.entries(categoryTotals).map(([type, amount]) => {
            const percentage = (amount / totalSpent) * 100 || 0;
            return (
              <Card key={type}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{categoryLabels[type] || type}</span>
                    <span className="font-bold">{amount.toLocaleString()} PLN</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{percentage.toFixed(0)}% budżetu</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Add Expense (Premium Feature Placeholder) */}
        <Button variant="secondary" size="lg" className="w-full">
          <Plus className="w-5 h-5" />
          Dodaj wydatek
        </Button>
      </div>
    </div>
  );
}
