import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

export function CTA() {
  return (
    <Section id="cta">
      <div className="border overflow-hidden relative text-center py-16 mx-auto">
        <p className="max-w-3xl text-foreground mb-6 text-balance mx-auto font-medium text-3xl">
          Ready to automate your inventory with Storagent?
        </p>

        <div className="flex justify-center">
          <Link className="flex items-center gap-2" href="/app">Get Started</Link>
        </div>
      </div>
    </Section>
  );
}
