'use client';

import { Trophy, Medal, Award } from 'lucide-react';
import { useLeaderboard } from '@/hooks/useLeaderboard';

export default function LeaderboardPage() {
    const { leaderboard, loading } = useLeaderboard(10);

    const topThree = leaderboard.slice(0, 3);
    const restOfLeaderboard = leaderboard.slice(3);

    return (
        <main className="min-h-screen bg-eco-base text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
                    <p className="text-text-muted">Top cleaners making the biggest impact</p>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-text-muted">Loading leaderboard...</div>
                ) : leaderboard.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                        <p className="text-text-muted">No rankings yet. Be the first to complete a mission!</p>
                    </div>
                ) : (
                    <>
                        {/* Podium */}
                        {topThree.length >= 3 && (
                            <div className="grid grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
                                {/* 2nd Place */}
                                <div className="flex flex-col items-center pt-12">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center mb-3">
                                        <Medal size={32} className="text-white" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-white mb-1">2nd Place</p>
                                        <p className="text-xs text-text-muted">{topThree[1]?.user}</p>
                                        <p className="text-brand-green font-bold mt-2">{topThree[1]?.earnings}</p>
                                    </div>
                                </div>

                                {/* 1st Place */}
                                <div className="flex flex-col items-center">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mb-3 shadow-lg shadow-yellow-500/50">
                                        <Trophy size={40} className="text-white" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-white mb-1">1st Place</p>
                                        <p className="text-sm text-text-muted">{topThree[0]?.user}</p>
                                        <p className="text-brand-green font-bold text-xl mt-2">{topThree[0]?.earnings}</p>
                                    </div>
                                </div>

                                {/* 3rd Place */}
                                <div className="flex flex-col items-center pt-12">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-3">
                                        <Award size={32} className="text-white" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-white mb-1">3rd Place</p>
                                        <p className="text-xs text-text-muted">{topThree[2]?.user}</p>
                                        <p className="text-brand-green font-bold mt-2">{topThree[2]?.earnings}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Table */}
                        <div className="bg-eco-card border border-eco-border rounded-2xl overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-white/5 border-b border-eco-border">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-text-muted uppercase tracking-wider">Rank</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-text-muted uppercase tracking-wider">User</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-text-muted uppercase tracking-wider">Cleanups</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-text-muted uppercase tracking-wider">Impact</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-text-muted uppercase tracking-wider">Badges</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-text-muted uppercase tracking-wider">Earnings</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-eco-border">
                                    {leaderboard.map((entry) => (
                                        <tr key={entry.rank} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${entry.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                                                        entry.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                                                            entry.rank === 3 ? 'bg-orange-500/20 text-orange-500' :
                                                                'bg-white/5 text-text-muted'
                                                    }`}>
                                                    {entry.rank}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-white font-medium">{entry.user}</td>
                                            <td className="px-6 py-4 text-text-muted">{entry.cleanups}</td>
                                            <td className="px-6 py-4 text-text-muted">{entry.impact}</td>
                                            <td className="px-6 py-4 text-text-muted">{entry.badges}</td>
                                            <td className="px-6 py-4 text-brand-green font-bold">{entry.earnings}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
