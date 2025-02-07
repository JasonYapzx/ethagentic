'use client';

import { NEXT_PUBLIC_CDP_API_KEY } from '@/config';
import { useWagmiConfig } from '@/wagmi';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { base } from 'viem/chains';
import { State, WagmiProvider } from 'wagmi';

type Props = { children: ReactNode; initialState: State | undefined };

const queryClient = new QueryClient();

function OnchainProviders({ children, initialState }: Props) {
  const wagmiConfig = useWagmiConfig();

  return (
    <WagmiProvider initialState={initialState} config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider apiKey={NEXT_PUBLIC_CDP_API_KEY} chain={base}
          config={{
            appearance: {
              mode: 'auto',
              theme: 'base',
            },
          }}>
          <RainbowKitProvider modalSize="compact">
            {children}
          </RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;