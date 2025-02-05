import { CTA } from "@/components/landing/cta";
import { Examples } from "@/components/landing/examples";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { UseCases } from "@/components/landing/use-cases";

export default function Home() {
  return (
      <main >
        <Header />
        <Hero />
        <Examples />
        <UseCases />
        <Features />
        <CTA />
        <Footer />
      </main>
  );
}
