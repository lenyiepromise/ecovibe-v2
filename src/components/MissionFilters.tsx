'use client';

import { Search, SlidersHorizontal } from 'lucide-react';

interface MissionFiltersProps {
    onSearchChange?: (value: string) => void;
    onRewardRangeChange?: (min: number, max: number) => void;
    onCategoriesChange?: (categories: string[]) => void;
    onDifficultyChange?: (difficulty: string[]) => void;
}

export default function MissionFilters({
    onSearchChange,
    onRewardRangeChange,
    onCategoriesChange,
    onDifficultyChange,
}: MissionFiltersProps) {
    const categories = [
        'Beaches & Coastlines',
        'Parks & Forests',
        'Urban Cleanups',
        'Rivers & Lakes',
    ];

    const difficulties = ['Easy', 'Medium', 'Hard', 'Extreme'];

    return (
        <div className="w-full lg:w-64 bg-eco-card border border-eco-border rounded-2xl p-6 space-y-6 h-fit sticky top-4">
            {/* Search */}
            <div>
                <label className="text-sm font-medium text-white mb-2 block">Search</label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search missions..."
                        onChange={(e) => onSearchChange?.(e.target.value)}
                        className="w-full bg-eco-base border border-eco-border rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                    />
                </div>
            </div>

            {/* Reward Range */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-white">Reward Range</label>
                    <span className="text-xs text-brand-green font-bold">ECO TOKENS</span>
                </div>
                <div className="space-y-3">
                    <input
                        type="range"
                        min="0"
                        max="2000"
                        defaultValue="1000"
                        className="w-full h-2 bg-eco-base rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-green [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-green [&::-moz-range-thumb]:border-0"
                    />
                    <div className="flex items-center justify-between text-xs text-text-muted">
                        <span>0</span>
                        <span>2000+</span>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div>
                <label className="text-sm font-medium text-white mb-3 block">Categories</label>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-eco-border bg-eco-base checked:bg-brand-green checked:border-brand-green focus:ring-brand-green focus:ring-offset-0 cursor-pointer"
                            />
                            <span className="text-sm text-text-muted group-hover:text-white transition-colors">
                                {category}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Difficulty */}
            <div>
                <label className="text-sm font-medium text-white mb-3 block">Difficulty</label>
                <div className="grid grid-cols-2 gap-2">
                    {difficulties.map((difficulty) => (
                        <button
                            key={difficulty}
                            className="px-3 py-2 rounded-lg text-xs font-medium bg-eco-base border border-eco-border text-text-muted hover:border-brand-green hover:text-brand-green transition-all"
                        >
                            {difficulty}
                        </button>
                    ))}
                </div>
            </div>

            {/* Clear Filters */}
            <button className="w-full px-4 py-2.5 rounded-xl text-sm font-medium bg-white/5 text-text-muted hover:bg-white/10 hover:text-white transition-all">
                Clear All Filters
            </button>
        </div>
    );
}
