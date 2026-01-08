'use client';

import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useCampaigns } from '@/hooks/useCampaigns';
import MissionCard from '@/components/MissionCard';
import MissionFilters from '@/components/MissionFilters';
import CreateCampaignModal from '@/components/CreateCampaignModal';
import VerificationModal from '@/components/VerificationModal';
import { Map, List, Plus } from 'lucide-react';
import { Campaign } from '@/types';

export default function MissionsView() {
    const { authenticated } = usePrivy();
    const { campaigns, loading, createCampaign, refreshCampaigns } = useCampaigns();
    const [activeTab, setActiveTab] = useState<'overview' | 'marketplace'>('overview');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedMission, setSelectedMission] = useState<Campaign | null>(null);

    const handleParticipate = (mission: Campaign) => {
        setSelectedMission(mission);
    };

    const activeFilters = ['ECO Tokens', 'Near Me', 'Easy', 'Verified'];

    return (
        <main className="min-h-screen bg-eco-base bg-[url('/grid-pattern.png')] bg-repeat">
            <div className="flex h-[calc(100vh-64px)] overflow-hidden">
                {/* Sidebar Filters - Fixed on left */}
                <div className="w-80 flex-shrink-0 border-r border-eco-border bg-eco-card hidden xl:block overflow-y-auto">
                    <MissionFilters />
                </div>

                {/* Main Content - Scrollable */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="p-6 max-w-7xl mx-auto">
                        {/* Header & Actions */}
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">Explore Missions</h1>
                                <p className="text-text-muted flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
                                    {campaigns.length} active missions near you
                                </p>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <div className="flex bg-eco-card rounded-xl p-1 border border-eco-border">
                                    <button className="p-2 rounded-lg bg-brand-green/10 text-brand-green transition-all">
                                        <List size={20} />
                                    </button>
                                    <button className="p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-all">
                                        <Map size={20} />
                                    </button>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-eco-card border border-eco-border text-sm font-medium hover:border-brand-green transition-all">
                                    Sort: Recommended
                                </button>
                                {authenticated && (
                                    <button
                                        onClick={() => setIsCreateModalOpen(true)}
                                        className="flex items-center gap-2 bg-brand-green text-black hover:bg-brand-green/90 px-5 py-2.5 rounded-xl text-sm font-bold transition-transform active:scale-95 shadow-[0_0_20px_rgba(0,240,144,0.3)] ml-auto md:ml-0"
                                    >
                                        <Plus size={18} />
                                        Create Mission
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Active Filter Chips */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {activeFilters.map((filter) => (
                                <button
                                    key={filter}
                                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium hover:border-brand-green hover:text-brand-green transition-all"
                                >
                                    {filter} ×
                                </button>
                            ))}
                            <button className="px-3 py-1.5 rounded-full text-xs font-medium text-text-muted hover:text-white transition-all">
                                Clear all
                            </button>
                        </div>

                        {/* Mission Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="h-[400px] bg-eco-card rounded-2xl animate-pulse border border-eco-border"></div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                                {campaigns.map((mission) => (
                                    <MissionCard
                                        key={mission.id}
                                        mission={mission}
                                        onParticipate={handleParticipate}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Load More Trigger */}
                        {!loading && campaigns.length > 0 && (
                            <div className="flex justify-center mt-12 mb-8">
                                <button className="px-6 py-3 rounded-xl border border-eco-border bg-eco-card hover:bg-white/5 text-sm font-medium transition-all">
                                    Load More Missions
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <CreateCampaignModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={createCampaign}
            />

            {selectedMission && (
                <VerificationModal
                    isOpen={!!selectedMission}
                    onClose={() => setSelectedMission(null)}
                    missionTitle={selectedMission.title}
                    missionId={selectedMission.id}
                />
            )}
        </main>
    );
}
