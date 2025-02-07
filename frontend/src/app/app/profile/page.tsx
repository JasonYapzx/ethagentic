'use client';
import { Section } from '@/components/common/section';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

import { IdentityCard, Avatar, Badge, Identity, Name, Address, Socials } from '@coinbase/onchainkit/identity';
import { base } from 'viem/chains';
import { useAccount } from 'wagmi';

export default function Page() {
    const { address } = useAccount();

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

            </div>
        </Section>
    </div>
    );
}
