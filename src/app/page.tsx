'use client';

import Navbar from '@/components/Navbar';
import MissionCard from '../components/MissionCard';
import { Search, Map, SlidersHorizontal, ArrowDownWideNarrow } from 'lucide-react';

export default function Home() {
  
  // 1. Mock Data (Matches your Screenshots)
  const missions = [
    {
      title: "Santa Monica Beach Sweep",
      location: "California, USA",
      distance: "0.5 mi away",
      image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800", // Ocean plastic
      sponsorName: "OceanCleanupDAO",
      impact: "20kg Trash",
      difficulty: 3,
      joined: 4,
      totalSpots: 10,
      reward: "500",
      token: "ECO",
      isVerified: true,
      tags: ['Coastal']
    },
    {
      title: "Redwood Reforestation",
      location: "National Park, CA",
      distance: "12 mi away",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5763?auto=format&fit=crop&w=800", // Forest
      sponsorName: "GreenEarth",
      impact: "50 Trees",
      difficulty: 4,
      joined: 22,
      totalSpots: 30,
      reward: "1,200",
      token: "ECO",
      isVerified: true,
      tags: ['Planting']
    },
    {
      title: "Downtown Alley Clear",
      location: "Metro City Center",
      distance: "2.1 mi away",
      image: "https://images.unsplash.com/photo-1605600659873-d808a13a4d2a?auto=format&fit=crop&w=800", // Urban
      sponsorName: "Local Council",
      impact: "Clean City",
      difficulty: 2,
      joined: 2,
      totalSpots: 5,
      reward: "350",
      token: "ECO",
      isVerified: false,
      tags: ['Community']
    },
    {
      title: "River Thames Plastics",
      location: "London, UK",
      distance: "Global Mission",
      image: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=800", // River
      sponsorName: "CleanWater",
      impact: "100L Waste",
      difficulty: 3,
      joined: 8,
      totalSpots: 15,
      reward: "750",
      token: "ECO",
      isVerified: true,
      tags: ['Water']
    }
  ];

  return (
    <main className="min-h-screen bg-eco-base text-white pb-20">
      {/* We assume Navbar is in layout.tsx, but if not, you can import it here */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* 2. Header & Search Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div className="w-full md:w-auto">
            <h1 className="text-4xl font-bold mb-3 tracking-tight">Available Missions</h1>
            <p className="text-text-muted">Find tasks, clean the planet, earn crypto.</p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-eco-card border border-eco-border hover:border-brand-green/50 px-5 py-3 rounded-xl text-sm font-medium transition-colors">
                <Map size={18} /> Map View
             </button>
             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-eco-card border border-eco-border hover:border-brand-green/50 px-5 py-3 rounded-xl text-sm font-medium transition-colors">
                <ArrowDownWideNarrow size={18} /> Sort
             </button>
          </div>
        </div>

        {/* 3. Filters & Chips */}
        <div className="mb-10 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text" 
                placeholder="Search by location, sponsor, or impact..." 
                className="w-full bg-eco-card border border-eco-border rounded-2xl py-4 pl-14 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all shadow-lg"
              />
            </div>
            
            {/* Tag Cloud */}
            <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-lg bg-brand-green/10 border border-brand-green text-brand-green text-sm font-bold flex items-center gap-2 cursor-pointer">
                    📍 Near Me <span className="text-xs opacity-60">×</span>
                </span>
                {['💰 High Reward', '🌊 Coastlines', '🌲 Reforestation', '🏙️ Urban'].map((tag) => (
                    <span key={tag} className="px-4 py-2 rounded-lg bg-eco-card border border-eco-border hover:border-brand-green/50 text-text-muted hover:text-white cursor-pointer text-sm transition-all font-medium">
                        {tag}
                    </span>
                ))}
            </div>
        </div>

        {/* 4. The Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {missions.map((mission, index) => (
                <div key={index} className="h-full">
                    <MissionCard mission={mission} />
                </div>
            ))}
        </div>
      </div>
    </main>
  );
}