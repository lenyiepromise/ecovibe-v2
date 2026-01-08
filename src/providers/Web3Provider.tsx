'use client';

import React from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { scrollSepolia } from 'viem/chains';

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'dark',
          accentColor: '#00F090',
          logo: 'https://your-logo-url.com/logo.png', // Optional
        },
        defaultChain: scrollSepolia,
        supportedChains: [scrollSepolia],
      }}
    >
      {children}
    </PrivyProvider>
  );
}