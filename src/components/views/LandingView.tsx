'use client';

import Image from 'next/image';
import { usePrivy } from '@privy-io/react-auth';
import { ArrowRight, Globe, ShieldCheck, Zap } from 'lucide-react';
import globeImage from '../../../.gemini/antigravity/brain/a0000fdb-7608-48e4-895b-0c557763cd89/hero_globe_1767848880965.png'; // We'll move this to public folder

export default function LandingView() {
    const { login } = usePrivy();

    return (
        <main className="min-h-screen bg-eco-base text-white overflow-hidden relative">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-green/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-8 pb-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 min-h-[80vh]">

                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left pt-10 lg:pt-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-green text-sm font-medium mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                            </span>
                            v2.0 is Live on Scroll
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                            Clean the World, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-blue-400">
                                Earn Crypto.
                            </span>
                        </h1>

                        <p className="text-xl text-text-muted mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Join the global decentralized community cleaning up the planet.
                            Complete local missions, verify with AI, and earn ECO tokens instantly.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button
                                onClick={login}
                                className="px-8 py-4 bg-brand-green text-black rounded-xl font-bold text-lg hover:bg-brand-green/90 transition-transform active:scale-95 shadow-[0_0_30px_rgba(0,240,144,0.3)] flex items-center justify-center gap-2"
                            >
                                Start Earning
                                <ArrowRight size={20} />
                            </button>
                            <button
                                onClick={login}
                                className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold text-lg hover:bg-white/10 transition-transform active:scale-95 flex items-center justify-center gap-2"
                            >
                                Connect Wallet
                            </button>
                        </div>

                        <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-text-muted">
                            <div className="flex items-center gap-2">
                                <Globe size={18} className="text-brand-green" />
                                <span>Global Community</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={18} className="text-brand-green" />
                                <span>AI Verified</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap size={18} className="text-brand-green" />
                                <span>Instant Payouts</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
                        <div className="relative aspect-square animate-float">
                            {/* Globe Glow */}
                            <div className="absolute inset-0 bg-brand-green/20 blur-[100px] rounded-full scale-75" />

                            {/* This image path will be updated after we move the file */}
                            <img
                                src="/hero_globe.png"
                                alt="EcoVibe Globe"
                                className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                            />

                            {/* Float Cards */}
                            <div className="absolute top-10 right-0 lg:-right-10 bg-eco-card/80 backdrop-blur-md border border-eco-border p-4 rounded-2xl shadow-xl animate-float-delayed hidden sm:block">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-muted">Just Earned</p>
                                        <p className="text-sm font-bold text-white">+50.00 ECO</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-20 left-0 lg:-left-10 bg-eco-card/80 backdrop-blur-md border border-eco-border p-4 rounded-2xl shadow-xl animate-float-reverse hidden sm:block">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-muted">Mission Verified</p>
                                        <p className="text-sm font-bold text-white">Beach Cleanup #42</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-white/5 mt-10">
                    {[
                        { label: 'Trash Collected', value: '12.5 Tons' },
                        { label: 'Total Missions', value: '8,234' },
                        { label: 'Active Guardians', value: '1,402' },
                        { label: 'Rewards Paid', value: '$450k+' },
                    ].map((stat, i) => (
                        <div key={i} className="text-center md:text-left">
                            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                            <p className="text-sm text-text-muted uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
