'use client';

import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { MapIcon, ArrowDownWideNarrow, Plus } from 'lucide-react';
import MissionCard from '@/components/MissionCard';
import MissionFilters from '@/components/MissionFilters';
import CreateCampaignModal from '@/components/CreateCampaignModal';
import VerificationModal from '@/components/VerificationModal';
import { useCampaigns } from '@/hooks/useCampaigns';
import { Campaign, CreateCampaignParams } from '@/types';

export default function MarketplacePage() {
    const { user, authenticated, login } = usePrivy();
    const { campaigns, loading, createCampaign, refresh } = useCampaigns();

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [activeMission, setActiveMission] = useState<Campaign | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleParticipate = (mission: Campaign) => {
        if (!authenticated) {
            login();
            return;
        }
        setActiveMission(mission);
    };

    const handleCreateMission = async (params: CreateCampaignParams) => {
        if (!user?.wallet?.address) return;
        setIsCreating(true);
        try {
            await createCampaign(params, user.wallet.address);
            setShowCreateModal(false);
            refresh();
        } catch (e) {
            console.error(e);
            alert('Failed to create mission');
        } finally {
            setIsCreating(false);
        }
    };

    const handleVerify = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setActiveMission(null);
        alert('Verification Submitted!');
    };

    // Filter only public/marketplace missions
    const marketplaceMissions = campaigns.filter(c => c.type === 'public');

    return (
        <main className="min-h-screen bg-eco-base text-white">
            <div className="flex gap-6 p-6">
                <div className="hidden lg:block flex-shrink-0">
                    <MissionFilters />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
                        <p className="text-text-muted">Browse public cleanup opportunities</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-text-muted hover:text-white hover:border-brand-green transition-all">
                                <MapIcon size={16} />
                                <span className="text-sm font-medium">Map View</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-text-muted hover:text-white hover:border-brand-green transition-all">
                                <ArrowDownWideNarrow size={16} />
                                <span className="text-sm font-medium">Sort: Recommended</span>
                            </button>
                        </div>

                        {authenticated && (
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="flex items-center gap-2 bg-brand-green text-black hover:bg-brand-green/90 px-5 py-2.5 rounded-xl text-sm font-bold transition-transform active:scale-95 shadow-[0_0_20px_rgba(0,240,144,0.3)]"
                            >
                                <Plus size={18} />
                                Create Mission
                            </button>
                        )}
                    </div>

                    {loading ? (
                        <div className="text-center py-20 text-text-muted animate-pulse">Loading marketplace...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {marketplaceMissions.length === 0 ? (
                                <div className="col-span-full text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                    <p className="text-text-muted">No marketplace missions available yet.</p>
                                </div>
                            ) : (
                                marketplaceMissions.map((mission) => (
                                    <div key={mission.id} className="h-full">
                                        <MissionCard mission={mission} onParticipate={handleParticipate} />
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            {showCreateModal && (
                <CreateCampaignModal
                    onClose={() => setShowCreateModal(false)}
                    onSubmit={handleCreateMission}
                    isLoading={isCreating}
                />
            )}

            {activeMission && (
                <VerificationModal
                    missionTitle={activeMission.title}
                    onClose={() => setActiveMission(null)}
                    onVerify={handleVerify}
                />
            )}
        </main>
    );
}
