'use client';

import { usePrivy } from '@privy-io/react-auth';
import LandingView from '@/components/views/LandingView';
import MissionsView from '@/components/views/MissionsView';

export default function Home() {
  const { authenticated, ready } = usePrivy();

  // Show nothing while checking auth state to prevent flash
  if (!ready) {
    return (
      <main className="min-h-screen bg-eco-base flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-green border-t-transparent animate-spin"></div>
      </main>
    );
  }

  // If not authenticated, show Landing Page
  if (!authenticated) {
    return <LandingView />;
  }

  // If authenticated, show Missions Dashboard
  return <MissionsView />;
}