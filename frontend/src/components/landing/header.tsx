"use client";

import { Icons } from "@/components/common/icons";
import { MobileDrawer } from "@/components/common/mobile-drawer";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import WalletLogin from "../onchain-kit/wallet";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 h-[var(--header-height)] z-50 p-0 bg-background/60 backdrop-blur">
      <div className="flex justify-between items-center container mx-auto pt-1">
        <Link
          href="/"
          title="brand-logo"
          className="relative mr-6 flex items-center space-x-2"
        >
          <Image src="/images/storagent.png" width={180} height={80} alt={"Logo"} />
          {/* <span className="font-semibold text-lg">{siteConfig.name}</span> */}
        </Link>
        <div className="hidden lg:block">
          <WalletLogin text="Connect Wallet" />
        </div>
        <div className="mt-2 cursor-pointer block lg:hidden">
          <MobileDrawer />
        </div>
      </div>
      <hr className="absolute w-full bottom-0" />
    </header>
  );
}
