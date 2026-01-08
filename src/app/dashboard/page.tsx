'use client';

import { usePrivy } from '@privy-io/react-auth';
import { TrendingUp, Clock, Trash2, Leaf, FileText, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useActivityHistory } from '@/hooks/useActivityHistory';
import { useBadges } from '@/hooks/useBadges';

interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
    positive?: boolean;
}

function StatsCard({ title, value, change, icon, positive = true }: StatsCardProps) {
    return (
        <div className="bg-eco-card border border-eco-border rounded-2xl p-6 hover:border-brand-green/30 transition-all">
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                    {icon}
                </div>
                <span className={`text-xs font-bold ${positive ? 'text-brand-green' : 'text-red-500'}`}>
                    {change}
                </span>
            </div>
            <h3 className="text-sm text-text-muted mb-1">{title}</h3>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    );
}

export default function DashboardPage() {
    const { user, authenticated } = usePrivy();
    const { profile, loading: profileLoading } = useUserProfile(user?.wallet?.address);
    const { activityData, loading: activityLoading } = useActivityHistory(user?.wallet?.address);
    const { badges, loading: badgesLoading } = useBadges(user?.wallet?.address);

    if (!authenticated) {
        return (
            <main className="min-h-screen bg-eco-base text-white flex items-center justify-center p-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                    <p className="text-text-muted">Please connect your wallet to view your dashboard.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-eco-base text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                        <p className="text-text-muted">
                            Welcome back, <span className="text-brand-green font-medium">
                                {user?.email ? user.email.address.split('@')[0] : user?.wallet?.address.slice(0, 8) + '...'}
                            </span>
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-text-muted hover:text-white hover:border-brand-green transition-all">
                            <FileText size={16} />
                            Export Report
                        </button>
                        <button className="flex items-center gap-2 bg-brand-green text-black hover:bg-brand-green/90 px-5 py-2.5 rounded-xl text-sm font-bold transition-transform active:scale-95 shadow-[0_0_20px_rgba(0,240,144,0.3)]">
                            <Plus size={18} />
                            Log New Cleanup
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                {profileLoading ? (
                    <div className="text-center py-10 text-text-muted">Loading stats...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatsCard
                            title="TOTAL EARNINGS"
                            value={`${profile?.total_earnings.toFixed(2) || '0.00'} ECO`}
                            change="+12%"
                            icon={<TrendingUp size={24} />}
                        />
                        <StatsCard
                            title="PENDING REWARDS"
                            value={`${profile?.pending_rewards.toFixed(2) || '0.00'} ECO`}
                            change="+5%"
                            icon={<Clock size={24} />}
                        />
                        <StatsCard
                            title="TRASH REMOVED"
                            value={`${profile?.trash_removed_kg.toFixed(1) || '0.0'} kg`}
                            change="+18%"
                            icon={<Trash2 size={24} />}
                        />
                        <StatsCard
                            title="CO₂ OFFSET"
                            value={`${profile?.co2_offset_kg.toFixed(0) || '0'} kg`}
                            change="+8%"
                            icon={<Leaf size={24} />}
                        />
                    </div>
                )}

                {/* Chart and Badges Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Impact Over Time Chart */}
                    <div className="lg:col-span-2 bg-eco-card border border-eco-border rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-white mb-1">Impact Over Time</h2>
                                <p className="text-sm text-text-muted">Your collection activity vs network average</p>
                            </div>
                            <select className="px-3 py-1.5 rounded-lg bg-eco-base border border-eco-border text-sm text-text-muted focus:outline-none focus:border-brand-green">
                                <option>This Month</option>
                                <option>Last Month</option>
                                <option>This Year</option>
                            </select>
                        </div>
                        {activityLoading ? (
                            <div className="h-64 flex items-center justify-center text-text-muted">Loading chart...</div>
                        ) : (
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={activityData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                                    <XAxis dataKey="week" stroke="#6b7280" style={{ fontSize: '12px' }} />
                                    <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#0a0a0a',
                                            border: '1px solid #1a1a1a',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="impact"
                                        stroke="#00F090"
                                        strokeWidth={3}
                                        dot={{ fill: '#00F090', r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    {/* Recent Badges */}
                    <div className="bg-eco-card border border-eco-border rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-white">Recent Badges</h2>
                            <button className="text-sm text-brand-green hover:underline">View All</button>
                        </div>
                        {badgesLoading ? (
                            <div className="text-center py-10 text-text-muted">Loading badges...</div>
                        ) : badges.length === 0 ? (
                            <div className="text-center py-10 text-text-muted">
                                <p>No badges earned yet!</p>
                                <p className="text-xs mt-2">Complete missions to earn badges</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {badges.slice(0, 3).map((badge, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-green/20 to-brand-green/5 flex items-center justify-center text-2xl">
                                            {badge.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-bold text-white">{badge.name}</h3>
                                            <p className="text-xs text-text-muted truncate">{badge.rarity} • {badge.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Active Missions */}
                <div className="bg-eco-card border border-eco-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-white">Active Missions</h2>
                        <button className="text-sm text-brand-green hover:underline">View All</button>
                    </div>
                    <div className="text-center py-12 text-text-muted">
                        <p>No active missions yet. Start cleaning to see your progress here!</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
