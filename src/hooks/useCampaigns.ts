import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { Campaign, CreateCampaignParams } from '../types';

export function useCampaigns() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('campaigns')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCampaigns(data || []);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
            // Fallback to empty or mock if needed
        } finally {
            setLoading(false);
        }
    };

    const createCampaign = async (params: CreateCampaignParams, creatorAddress: string) => {
        try {
            const { data, error } = await supabase
                .from('campaigns')
                .insert([
                    {
                        ...params,
                        creator_address: creatorAddress,
                        is_verified: false,
                        joined: 0,
                        token: 'ETH', // Defaulting to ETH/Native for now
                        tags: [], // Default empty
                        difficulty: 1, // Default
                    },
                ])
                .select();

            if (error) throw error;
            await fetchCampaigns(); // Refresh list
            return data;
        } catch (error) {
            console.error('Error creating campaign:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    return { campaigns, loading, createCampaign, refresh: fetchCampaigns };
}
