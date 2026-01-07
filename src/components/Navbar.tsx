'use client';

import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';
import { LayoutDashboard, Compass, Trophy, Store } from 'lucide-react';
import { usePathname } from 'next/navigation';

function AuthButton() {
  const { login, authenticated, user, logout } = usePrivy();

  if (authenticated && user) {
    return (
      <button
        onClick={logout}
        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all"
      >
        <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
        {user.email ? user.email.address.split('@')[0] : user.wallet?.address.slice(0, 6) + '...'}
      </button>
    );
  }

  return (
    <button
      onClick={login}
      className="bg-brand-green hover:bg-brand-green/90 text-black px-6 py-2.5 rounded-xl text-sm font-bold transition-transform active:scale-95 shadow-[0_0_20px_rgba(0,240,144,0.3)]"
    >
      Login
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  // ... rest of the component

  const navLinks = [
    { name: 'Missions', href: '/', icon: Compass },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { name: 'Marketplace', href: '/marketplace', icon: Store },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-eco-base/80 backdrop-blur-md border-b border-eco-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">EcoVibe</span>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive
                    ? 'bg-white/10 text-white'
                    : 'text-text-muted hover:text-white hover:bg-white/5'
                    }`}
                >
                  <link.icon size={16} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Wallet Button */}
          <div>
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
}