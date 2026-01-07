'use client';

import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Search, Map, SlidersHorizontal, ArrowDownWideNarrow, Plus } from 'lucide-react';
import MissionCard from '@/components/MissionCard';
import CreateCampaignModal from '@/components/CreateCampaignModal';
import VerificationModal from '@/components/VerificationModal';
import { useCampaigns } from '@/hooks/useCampaigns';
import { Campaign, CreateCampaignParams } from '@/types';

export default function Home() {
  const { user, authenticated, login } = usePrivy();
  const { campaigns, loading, createCampaign, refresh } = useCampaigns();

  // UI State
  const [activeTab, setActiveTab] = useState<'overview' | 'marketplace'>('marketplace');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeMission, setActiveMission] = useState<Campaign | null>(null); // For verification
  const [isCreating, setIsCreating] = useState(false);

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
    // Mock verification for now
    await new Promise(resolve => setTimeout(resolve, 1000));
    setActiveMission(null);
    alert('Verification Submitted! Funds will be released shortly.');
  };

  return (
    <main className="min-h-screen bg-eco-base text-white pb-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div className="w-full md:w-auto">
            <h1 className="text-4xl font-bold mb-3 tracking-tight">EcoVibe Missions</h1>
            <p className="text-text-muted">Find tasks, clean the planet, earn crypto.</p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            {authenticated && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-brand-green text-black hover:bg-brand-green/90 px-5 py-3 rounded-xl text-sm font-bold transition-transform active:scale-95 shadow-[0_0_20px_rgba(0,240,144,0.3)]"
              >
                <Plus size={18} /> Create Mission
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-white/10 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === 'overview' ? 'text-brand-green' : 'text-text-muted hover:text-white'}`}
          >
            Overview
            {activeTab === 'overview' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-green" />}
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === 'marketplace' ? 'text-brand-green' : 'text-text-muted hover:text-white'}`}
          >
            Marketplace
            {activeTab === 'marketplace' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-green" />}
          </button>
        </div>

        {/* Filters (Marketplace Only) */}
        {activeTab === 'marketplace' && (
          <div className="mb-10 space-y-6">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search by location, sponsor, or impact..."
                className="w-full bg-eco-card border border-eco-border rounded-2xl py-4 pl-14 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all shadow-lg"
              />
            </div>
          </div>
        )}

        {/* The Grid */}
        {loading ? (
          <div className="text-center py-20 text-text-muted animate-pulse">Loading missions...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        )}
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