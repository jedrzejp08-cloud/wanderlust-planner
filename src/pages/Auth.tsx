import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import moonLogo from '@/assets/moon-logo.png';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, name);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 safe-area-top safe-area-bottom gradient-night stars-bg">
      {/* Logo */}
      <div className="flex flex-col items-center mb-12 mt-8 animate-fade-in">
        <div className="w-20 h-20 mb-4 glow-moon rounded-full overflow-hidden">
          <img src={moonLogo} alt="Voyager" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Voyager</h1>
        <p className="text-muted-foreground mt-1">Twoje wymarzone podróże</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-secondary rounded-xl mb-8">
        <button
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
            isLogin ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
          }`}
        >
          Logowanie
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
            !isLogin ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
          }`}
        >
          Rejestracja
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {!isLogin && (
          <div className="relative animate-slide-up">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Imię"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-12"
              required
            />
          </div>
        )}

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-12"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-12 pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <Button type="submit" size="lg" disabled={isLoading} className="mt-4">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              {isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm text-muted-foreground">lub kontynuuj przez</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Social Buttons (UI only) */}
      <div className="flex flex-col gap-3">
        <Button variant="social" size="lg" type="button">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Kontynuuj z Google
        </Button>

        <Button variant="social" size="lg" type="button">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
          Kontynuuj z Apple
        </Button>
      </div>

      {/* Terms */}
      <p className="text-center text-xs text-muted-foreground mt-8">
        Kontynuując, akceptujesz{' '}
        <Link to="/terms" className="text-primary underline">
          Regulamin
        </Link>{' '}
        oraz{' '}
        <Link to="/privacy" className="text-primary underline">
          Politykę prywatności
        </Link>
      </p>
    </div>
  );
}
