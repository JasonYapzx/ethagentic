import type { Metadata, Viewport } from "next";
import { headers } from 'next/headers';
import dynamic from 'next/dynamic';

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import '@coinbase/onchainkit/styles.css';

import { cookieToInitialState } from 'wagmi';
import { ThemeProvider } from "@/components/common/theme-provider";
import { siteConfig } from "@/lib/config";
import { cn, constructMetadata } from "@/lib/utils";
import "./globals.css";
import getConfig from "next/config";

const OnchainProviders = dynamic(
  () => import('@/components/onchain-kit/providers'),
  {
    ssr: false,
  },
);


export const metadata: Metadata = constructMetadata({
  title: `${siteConfig.name} | ${siteConfig.description}`,
});

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get('cookie')
  )

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body
        className={cn(
          "min-h-screen bg-background antialiased w-full mx-auto scroll-smooth font-sans"
        )}
      >
        <OnchainProviders initialState={initialState}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            {children}
          </ThemeProvider>
        </OnchainProviders>
      </body>
    </html>
  );
}
