import { TailwindIndicator } from "@/components/common/tailwind-indicator";
import { ThemeProvider } from "@/components/common/theme-provider";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { siteConfig } from "@/lib/config";
import { cn, constructMetadata } from "@/lib/utils";
import type { Metadata } from "next";
import { NavBar } from "@/components/app/navbar";

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
        </NavBar>
    );
}
