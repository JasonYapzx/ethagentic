import { siteConfig } from "@/lib/config";
import { constructMetadata } from "@/lib/utils";
import type { Metadata } from "next";
import { NavBar } from "@/components/app/navbar";
import { ConnectWallet, Wallet, WalletAdvanced, WalletAdvancedAddressDetails, WalletAdvancedTokenHoldings, WalletAdvancedTransactionActions, WalletAdvancedWalletActions } from "@coinbase/onchainkit/wallet";
import { Avatar, Name } from "@coinbase/onchainkit/identity";

export const metadata: Metadata = constructMetadata({
    title: `${siteConfig.name} | ${siteConfig.description}`,
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <NavBar>
            {children}
            <div className="fixed bottom-4 rounded-none right-4 z-50">
                <Wallet className="bg-primary text-primary-foreground hover:bg-[#D9C8F7] transition-all duration-300 rounded-none">
                    <ConnectWallet className="bg-primary text-primary-foreground hover:bg-[#D9C8F7] transition-all duration-300 rounded-none">
                        <Avatar className="h-6 w-6" />
                        <Name />
                    </ConnectWallet>
                    <WalletAdvanced classNames={{ container: "bg-background text-primary-foreground rounded-none" }}>
                        <WalletAdvancedWalletActions classNames={{
                            container: "bg-background rounded-none",
                            baseScanIcon: "bg-background hover:bg-primary text-foreground hover:text-background transition-all duration-300",
                            qrIcon: "hover:bg-primary transition-all duration-300",
                            disconnectIcon: "bg-background hover:bg-primary text-foreground hover:text-background transition-all duration-300",
                            refreshIcon: "bg-background hover:bg-primary text-foreground hover:text-background transition-all duration-300"
                        }} />
                        <WalletAdvancedAddressDetails />
                        <WalletAdvancedTransactionActions classNames={{
                            leftAction: {
                                container: "rounded-none bg-background group hover:bg-primary text-foreground hover:text-background transition-all duration-300",
                                label: "text-foreground group-hover:text-background transition-all duration-300",
                            },
                            rightAction: {
                                container: "rounded-none bg-background group hover:bg-primary text-foreground hover:text-background transition-all duration-300",
                                label: "text-foreground group-hover:text-background transition-all duration-300",
                            },
                            middleAction: {
                                container: "rounded-none bg-background group hover:bg-primary text-foreground hover:text-background transition-all duration-300",
                                label: "text-foreground group-hover:text-background transition-all duration-300",
                            },
                        }} />
                        <WalletAdvancedTokenHoldings />
                    </WalletAdvanced>
                </Wallet>
            </div>
        </NavBar>
    );
}
