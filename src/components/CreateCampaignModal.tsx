'use client';

import { useState } from 'react';
import { X, Upload, Coins, MapPin } from 'lucide-react';
import { CreateCampaignParams } from '../types';

interface CreateCampaignModalProps {
    onClose: () => void;
    onSubmit: (params: CreateCampaignParams) => Promise<void>;
    isLoading: boolean;
}

export default function CreateCampaignModal({ onClose, onSubmit, isLoading }: CreateCampaignModalProps) {
    const [formData, setFormData] = useState<CreateCampaignParams>({
        title: '',
        description: '',
        location: '',
        reward: '',
        type: 'public',
        total_spots: 1,
        image: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-eco-card border border-eco-border w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">

                <div className="flex justify-between items-center p-6 border-b border-white/5">
                    <h2 className="text-xl font-bold text-white">Create New Mission</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Mission Title</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Downtown Park Cleanup"
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green transition-all"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Description</label>
                        <textarea
                            required
                            placeholder="Describe what needs to be done..."
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white h-24 resize-none focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green transition-all"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input
                                    type="text"
                                    required
                                    placeholder="City or Address"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-green focus:outline-none"
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Reward (ETH)</label>
                            <div className="relative">
                                <Coins className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input
                                    type="number"
                                    step="0.001"
                                    required
                                    placeholder="0.05"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-brand-green focus:outline-none"
                                    value={formData.reward}
                                    onChange={e => setFormData({ ...formData, reward: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl border border-dashed border-white/20 hover:border-brand-green/50 transition-colors bg-white/5 flex flex-col items-center justify-center text-center cursor-pointer group">
                        <Upload className="text-gray-400 group-hover:text-brand-green mb-2 transition-colors" size={24} />
                        <p className="text-sm text-text-muted">Upload cover image (Optional)</p>
                        <input
                            type="text"
                            placeholder="Or paste Image URL"
                            className="mt-2 w-full bg-transparent text-center text-xs text-brand-green focus:outline-none placeholder:text-gray-600"
                            value={formData.image}
                            onChange={e => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-brand-green text-black font-bold py-4 rounded-xl hover:bg-brand-green/90 transition-transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none mt-2"
                    >
                        {isLoading ? 'Creating Mission...' : 'Launch Mission'}
                    </button>
                </form>
            </div>
        </div>
    );
}
