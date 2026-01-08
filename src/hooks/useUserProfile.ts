import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

interface UserProfile {
    wallet_address: string;
    email?: string;
    username?: string;
    total_earnings: number;
    pending_rewards: number;
    trash_removed_kg: number;
    co2_offset_kg: number;
    total_cleanups: number;
}

export function useUserProfile(walletAddress?: string) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!walletAddress) {
            setLoading(false);
            return;
        }

        fetchProfile();
    }, [walletAddress]);

    const fetchProfile = async () => {
        if (!walletAddress) return;

        try {
            setLoading(true);

            // Try to fetch existing profile
            let { data, error: fetchError } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('wallet_address', walletAddress)
                .single();

            // If profile doesn't exist, create it
            if (fetchError && fetchError.code === 'PGRST116') {
                const { data: newProfile, error: insertError } = await supabase
                    .from('user_profiles')
                    .insert([{ wallet_address: walletAddress }])
                    .select()
                    .single();

                if (insertError) throw insertError;
                data = newProfile;
            } else if (fetchError) {
                throw fetchError;
            }

            setProfile(data);
            setError(null);
        } catch (err: any) {
            console.error('Error fetching user profile:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (updates: Partial<UserProfile>) => {
        if (!walletAddress) return;

        try {
            const { data, error } = await supabase
                .from('user_profiles')
                .update(updates)
                .eq('wallet_address', walletAddress)
                .select()
                .single();

            if (error) throw error;
            setProfile(data);
        } catch (err: any) {
            console.error('Error updating profile:', err);
            setError(err.message);
        }
    };

    return {
        profile,
        loading,
        error,
        refresh: fetchProfile,
        updateProfile,
    };
}
