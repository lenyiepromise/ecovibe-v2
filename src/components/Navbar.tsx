'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';
import { LayoutDashboard, Compass, Trophy, Store, Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Missions', href: '/', icon: Compass },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { name: 'Marketplace', href: '/marketplace', icon: Store },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-eco-base/95 backdrop-blur-md border-b border-eco-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex items-center gap-2 z-50">
            <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">EcoVibe</span>
          </div>

          {/* Desktop Links */}
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

          {/* Actions & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <AuthButton />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-eco-base border-b border-eco-border p-4 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-4 rounded-xl text-base font-medium transition-all ${isActive
                  ? 'bg-brand-green/10 text-brand-green border border-brand-green/20'
                  : 'text-text-muted hover:text-white hover:bg-white/5'
                  }`}
              >
                <link.icon size={20} />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-white/5">
            <AuthButton />
          </div>
        </div>
      )}
    </nav>
  );
}