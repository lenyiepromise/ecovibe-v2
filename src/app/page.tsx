'use client';

import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { MapIcon, ArrowDownWideNarrow, Plus, X } from 'lucide-react';
import MissionCard from '@/components/MissionCard';
import MissionFilters from '@/components/MissionFilters';
import CreateCampaignModal from '@/components/CreateCampaignModal';
import VerificationModal from '@/components/VerificationModal';
import { useCampaigns } from '@/hooks/useCampaigns';
import { Campaign, CreateCampaignParams } from '@/types';

export default function Home() {
  const { user, authenticated, login } = usePrivy();
  const { campaigns, loading, createCampaign, refresh } = useCampaigns();

  // UI State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeMission, setActiveMission] = useState<Campaign | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Handlers
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
    alert('Verification Submitted! Funds will be released shortly.');
  };

  const filterChips = [
    'ECO Tokens',
    'Near Me',
    'High Reward',
    'Top Rated Sponsors',
  ];

  return (
    <main className="min-h-screen bg-eco-base text-white">
      <div className="flex gap-6 p-6">
        {/* Left Sidebar - Filters */}
        <div className="hidden lg:block flex-shrink-0">
          <MissionFilters />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Available Missions</h1>
            <p className="text-text-muted">Find tasks, clean the planet, earn crypto.</p>
          </div>

          {/* Action Bar */}
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
                Log New Cleanup
              </button>
            )}
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {filterChips.map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  if (activeFilters.includes(chip)) {
                    setActiveFilters(activeFilters.filter(f => f !== chip));
                  } else {
                    setActiveFilters([...activeFilters, chip]);
                  }
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeFilters.includes(chip)
                    ? 'bg-brand-green text-black'
                    : 'bg-white/5 border border-white/10 text-text-muted hover:text-white hover:border-brand-green'
                  }`}
              >
                {chip}
                {activeFilters.includes(chip) && <X size={12} />}
              </button>
            ))}
            {activeFilters.length > 0 && (
              <button
                onClick={() => setActiveFilters([])}
                className="text-xs text-text-muted hover:text-brand-green transition-colors ml-2"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Missions Grid */}
          {loading ? (
            <div className="text-center py-20 text-text-muted animate-pulse">Loading missions...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {campaigns.length === 0 ? (
                  <div className="col-span-full text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                    <p className="text-text-muted">No missions found. Be the first to create one!</p>
                  </div>
                ) : (
                  campaigns.map((mission) => (
                    <div key={mission.id} className="h-full">
                      <MissionCard mission={mission} onParticipate={handleParticipate} />
                    </div>
                  ))
                )}
              </div>

              {/* Load More */}
              {campaigns.length > 0 && (
                <div className="flex justify-center mt-10">
                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-text-muted hover:text-white hover:border-brand-green transition-all">
                    <ArrowDownWideNarrow size={16} />
                    Load More Missions
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
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