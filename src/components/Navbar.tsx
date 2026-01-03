'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { LayoutDashboard, Compass, Trophy, Store } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

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
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive 
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
            <ConnectButton 
              showBalance={false}
              accountStatus="address"
              chainStatus="icon"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}