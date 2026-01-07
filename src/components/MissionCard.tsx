'use client';

import Image from 'next/image';
import { MapPin, Star, ShieldCheck, Users, Camera } from 'lucide-react';
import { Campaign } from '../types';

interface MissionCardProps {
  mission: Campaign;
  onParticipate: (mission: Campaign) => void;
}

export default function MissionCard({ mission, onParticipate }: MissionCardProps) {
  const progress = Math.min((mission.joined / mission.total_spots) * 100, 100);

  return (
    <div className="group relative bg-eco-card border border-eco-border hover:border-brand-green/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,144,0.1)] flex flex-col h-full">

      {/* 1. Image Header */}
      <div className="relative h-56 w-full bg-gray-900">
        <Image
          src={mission.image || "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800"}
          alt={mission.title}
          fill
          className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {mission.is_verified ? (
            <span className="bg-eco-base/90 backdrop-blur-md border border-brand-green/30 text-brand-green text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck size={12} /> VERIFIED
            </span>
          ) : (
            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
              Open
            </span>
          )}
        </div>
      </div>

      {/* 2. Content Body */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-brand-green transition-colors line-clamp-1">
            {mission.title}
          </h3>
          <div className="flex items-center text-text-muted text-xs gap-1.5">
            <MapPin size={12} />
            <span>{mission.location}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-5 p-3 rounded-xl bg-white/5 border border-white/5">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">Impact</p>
            <p className="text-sm font-bold text-brand-green flex items-center gap-1">
              {mission.type === 'public' ? '🌍 Community' : '🏠 Private'}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">Difficulty</p>
            <div className="flex gap-0.5 items-center h-5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  className={i < mission.difficulty ? "fill-yellow-500 text-yellow-500" : "fill-gray-700 text-gray-700"}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-text-muted mb-2">
            <span className="flex items-center gap-1"><Users size={12} /> {mission.joined}/{mission.total_spots} Joined</span>
            <span className="text-brand-green font-mono">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-brand-green h-full rounded-full transition-all duration-500 shadow-[0_0_10px_#00F090]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Footer: Reward + Button */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
          <div>
            <span className="text-[10px] text-text-muted block uppercase tracking-wide">Bounty</span>
            <div className="text-xl font-bold text-white leading-none mt-1">
              {mission.reward} <span className="text-sm text-text-muted font-normal">{mission.token}</span>
            </div>
          </div>
          <button
            onClick={() => onParticipate(mission)}
            className="flex items-center gap-2 bg-white/5 hover:bg-brand-green hover:text-black border border-white/10 hover:border-brand-green text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all group/btn"
          >
            <Camera size={16} className="group-hover/btn:scale-110 transition-transform" />
            Participate
          </button>
        </div>

      </div>
    </div>
  );
}