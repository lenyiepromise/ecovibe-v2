import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

interface LeaderboardEntry {
    rank: number;
    user: string;
    cleanups: number;
    impact: string;
    badges: number;
    earnings: string;
}

export function useLeaderboard(limit: number = 10) {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaderboard();
    }, [limit]);

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);

            const { data, error } = await supabase
                .from('user_profiles')
                .select('wallet_address, total_cleanups, trash_removed_kg, total_earnings')
                .order('total_earnings', { ascending: false })
                .limit(limit);

            if (error) throw error;

            // Get badge counts for each user
            const leaderboardWithBadges = await Promise.all(
                (data || []).map(async (user, index) => {
                    const { count } = await supabase
                        .from('user_badges')
                        .select('*', { count: 'exact', head: true })
                        .eq('user_address', user.wallet_address);

                    return {
                        rank: index + 1,
                        user: `${user.wallet_address.slice(0, 8)}...${user.wallet_address.slice(-6)}`,
                        cleanups: user.total_cleanups || 0,
                        impact: `${user.trash_removed_kg || 0} kg`,
                        badges: count || 0,
                        earnings: `${user.total_earnings || 0} ECO`,
                    };
                })
            );

            setLeaderboard(leaderboardWithBadges);
        } catch (err) {
            console.error('Error fetching leaderboard:', err);
            setLeaderboard([]);
        } finally {
            setLoading(false);
        }
    };

    return {
        leaderboard,
        loading,
        refresh: fetchLeaderboard,
    };
}
