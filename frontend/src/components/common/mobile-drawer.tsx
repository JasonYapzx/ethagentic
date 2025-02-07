import { Icons } from "@/components/common/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { siteConfig } from "@/lib/config";
import { Menu } from "lucide-react";
import Link from "next/link";
import WalletLogin from "../onchain-kit/wallet";

export function MobileDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Menu className="text-2xl" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-6">
          <Link
            href="/"
            title="brand-logo"
            className="relative mr-6 flex items-center space-x-2"
          >
            <Icons.logo className="w-auto h-[40px]" />
            <DrawerTitle>{siteConfig.name}</DrawerTitle>
          </Link>
          <DrawerDescription>{siteConfig.description}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <WalletLogin text="Connect Wallet"/>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
