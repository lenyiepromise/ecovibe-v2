export interface Campaign {
    id: string;
    title: string;
    description: string;
    location: string;
    reward: string;
    token: string;
    image: string;
    difficulty: number;
    total_spots: number;
    joined: number;
    is_verified: boolean;
    type: 'public' | 'private';
    creator_address: string;
    created_at: string;
    tags: string[];
}

export interface CreateCampaignParams {
    title: string;
    description: string;
    location: string;
    reward: string;
    type: 'public' | 'private';
    total_spots: number;
    image: string; // URL
}
