"use client"

import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownLink,
    WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
    Address,
    Avatar,
    Name,
    Identity,
    EthBalance,
} from '@coinbase/onchainkit/identity';
import { base } from 'viem/chains';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';

export default function WalletLogin({ text }: { text: string | undefined }) {
    const { address, isConnected } = useAccount();

    useEffect(() => {
        if (isConnected && address) {
            // Force page reload when wallet is connected and address is available
            window.location.reload();
        }
    }, [isConnected, address]);

    return (
        <div className="flex justify-end font-normal">
            <div className="wallet-container flex space-x-2">
                <Wallet>
                    <ConnectWallet text={text} className="text-background font-normal min-h-[48px] min-w-[160px] rounded-none bg-primary hover:bg-[#D9C8F7] transition-all duration-300">
                        <Name address={address} chain={base} className="text-background" />
                    </ConnectWallet>
                    <WalletDropdown className='bg-primary text-primary-foreground hover:bg-[#D9C8F7] transition-all duration-300 rounded-none'>
                        <Identity address={address} chain={base} className="px-4 pt-3 pb-2 bg-primary text-primary-foreground hover:bg-[#D9C8F7] transition-all duration-300" hasCopyAddressOnClick={true}>
                            <Avatar address={address} chain={base} className='text-primary-foreground stroke-primary-foreground' />
                            <Name address={address} chain={base} className='text-primary-foreground' />
                            <Address address={address} className='text-primary-foreground' />
                            <EthBalance className='text-primary-foreground' />
                        </Identity>
                        <WalletDropdownLink
                            icon="wallet"
                            href="https://keys.coinbase.com"
                            target="_blank"
                            className='bg-primary text-primary-foreground hover:bg-[#D9C8F7] transition-all duration-300'
                            rel="noopener noreferrer"
                        >
                            Wallet
                        </WalletDropdownLink>
                        <WalletDropdownDisconnect className='bg-primary text-primary-foreground hover:bg-[#D9C8F7] transition-all duration-300' />
                    </WalletDropdown>
                </Wallet>
            </div>
        </div>
    );
}