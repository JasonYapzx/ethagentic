import { Section } from "../common/section";
import HeroVideoDialog from "../magicui/hero-video-dialog";

export function HeroVideo() {
    return (
        <Section id="demo_video" className="relative p-4" title="Demo Video">
            {/* light mode thumbnail */}
            <HeroVideoDialog
                className="block dark:hidden"
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                thumbnailAlt="Hero Video"
            />
            {/* dark mode thumbnail */}
            <HeroVideoDialog
                className="hidden dark:block"
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                thumbnailAlt="Hero Video"
            />
        </Section>
    );
}
