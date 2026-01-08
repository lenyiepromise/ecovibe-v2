'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePrivy } from '@privy-io/react-auth';
import { useWalletBalance } from '../hooks/useWalletBalance';
import { useUserProfile } from '../hooks/useUserProfile';
import {
    LayoutDashboard,
    Compass,
    Store,
    Trophy,
    Award,
    Settings,
    Menu,
    X,
    LogOut
} from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();
    const { user, authenticated, login, logout } = usePrivy();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { ethBalance } = useWalletBalance(user?.wallet?.address);
    const { profile } = useUserProfile(user?.wallet?.address);

    const navLinks = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Missions', href: '/', icon: Compass },
        { name: 'Marketplace', href: '/marketplace', icon: Store },
        { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
        { name: 'My Badges', href: '/badges', icon: Award },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    const SidebarContent = () => (
        <>
            {/* Logo */}
            <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center">
                        <span className="text-black font-bold text-xl">E</span>
                    </div>
                    <div>
                        <span className="text-xl font-bold text-white tracking-tight">EcoVibe</span>
                        <p className="text-xs text-text-muted">v2</p>
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-1">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                ? 'bg-brand-green text-black shadow-lg shadow-brand-green/20'
                                : 'text-text-muted hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <link.icon size={20} />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Section */}
            <div className="p-4 border-t border-white/5">
                {authenticated && user ? (
                    <div className="space-y-3">
                        <div className="bg-white/5 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-brand-green/20 rounded-full flex items-center justify-center">
                                    <span className="text-brand-green font-bold">
                                        {user.email ? user.email.address[0].toUpperCase() : 'U'}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">
                                        {user.email ? user.email.address.split('@')[0] : 'User'}
                                    </p>
                                    <p className="text-xs text-text-muted truncate">
                                        {user.wallet?.address ? `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}` : 'No wallet'}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2 text-xs">
                                <div className="flex items-center justify-between">
                                    <span className="text-text-muted">ETH Balance</span>
                                    <span className="text-white font-mono">{ethBalance} ETH</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-text-muted">ECO Earned</span>
                                    <span className="text-brand-green font-bold">{profile?.total_earnings.toFixed(2) || '0.00'} ECO</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-text-muted hover:text-white hover:bg-white/5 transition-all"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={login}
                        className="w-full bg-brand-green hover:bg-brand-green/90 text-black px-4 py-3 rounded-xl text-sm font-bold transition-transform active:scale-95 shadow-[0_0_20px_rgba(0,240,144,0.3)]"
                    >
                        Connect Wallet
                    </button>
                )}
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-eco-card border border-eco-border rounded-xl text-white"
            >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen w-64 bg-eco-card border-r border-eco-border flex flex-col z-40 transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <SidebarContent />
            </aside>
        </>
    );
}
