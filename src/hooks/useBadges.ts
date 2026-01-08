import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    rarity: string;
    earned_at?: string;
}

export function useBadges(userAddress?: string) {
    const [badges, setBadges] = useState<Badge[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userAddress) {
            setLoading(false);
            return;
        }

        fetchBadges();
    }, [userAddress]);

    const fetchBadges = async () => {
        if (!userAddress) return;

        try {
            setLoading(true);

            const { data, error } = await supabase
                .from('user_badges')
                .select(`
          earned_at,
          badges (
            id,
            name,
            description,
            icon,
            rarity
          )
        `)
                .eq('user_address', userAddress)
                .order('earned_at', { ascending: false })
                .limit(10);

            if (error) throw error;

            const formattedBadges = (data || []).map((item: any) => ({
                ...item.badges,
                earned_at: item.earned_at,
            }));

            setBadges(formattedBadges);
        } catch (err) {
            console.error('Error fetching badges:', err);
            setBadges([]);
        } finally {
            setLoading(false);
        }
    };

    return {
        badges,
        loading,
        refresh: fetchBadges,
    };
}
