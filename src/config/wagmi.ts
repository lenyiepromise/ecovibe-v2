import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { scroll, scrollSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'EcoVibe v2',
  projectId: 'YOUR_PROJECT_ID',
  chains: [scroll, scrollSepolia],
  ssr: true,
});