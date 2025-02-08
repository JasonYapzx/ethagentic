'use client';
import { Section } from '@/components/common/section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

import { IdentityCard, Avatar, Badge, Identity, Name, Address, Socials } from '@coinbase/onchainkit/identity';
import { LogOut } from 'lucide-react';
import { useCallback } from 'react';
import { base } from 'viem/chains';
import { useAccount, useDisconnect } from 'wagmi';

export default function Page() {
    const { address } = useAccount();
    const { disconnect, connectors } = useDisconnect();
    const handleDisconnect = useCallback(() => {
      connectors.map((connector: any) => disconnect({ connector }));
    }, [disconnect, connectors]);

    return (<div className="container mx-auto p-4">
        <Section id="profile" title="Profile Dashboard">
            <div className="border-x border-t">
                <Card>
                    <CardHeader>
                        <div className="flex gap-2 items-center">
                            <CardTitle>Wallet Details</CardTitle>
                        </div>{" "}
                    </CardHeader>
                    <CardContent>
                        <Identity
                            address={address}
                            chain={base}
                            className={cn(
                                'items-left flex min-w-[300px] w-full p-4 bg-primary text-foreground rounded-none hover:bg-[#b1a2ca] transition-all duration-300',
                            )}
                        >
                            <Avatar className='text-foreground' />
                            <Name className='text-foreground w-full'>
                                <Badge />
                            </Name>
                            <Address isSliced={false} className='text-foreground w-full' />
                        </Identity>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex gap-2 items-center">
                            <CardTitle>Socials</CardTitle>
                        </div>{" "}
                    </CardHeader>
                    <CardContent>
                        <Identity
                            address={address}
                            chain={base}
                            className={cn(
                                'items-left flex min-w-[300px] p-4 bg-background text-foreground rounded-none transition-all duration-300',
                            )}
                        >
                            <Socials />
                        </Identity>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex gap-2 items-center">
                            <CardTitle>Sign Out</CardTitle>
                        </div>{" "}
                    </CardHeader>
                    <CardContent>
                        <Button>
                            <LogOut className="size-4 ml-1 shrink-0" />
                            <a
                                href="/"
                                className={cn(
                                    "pl-2 text-[12px] transition-opacity text-start duration-300",
                                )}
                            >
                                Sign Out
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </Section >
    </div >
    );
}
