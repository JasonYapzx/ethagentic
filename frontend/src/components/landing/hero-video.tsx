import { Section } from "../common/section";
import HeroVideoDialog from "../magicui/hero-video-dialog";

export function HeroVideo() {
    return (
        <Section id="demo_video" className="relative" title="Tech Explanation for The Graph Video">
            {/* light mode thumbnail */}
            <HeroVideoDialog
                className="block dark:hidden rounded-none"
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/EG-RwFp6aL0"
                thumbnailSrc="/images/Graph.png"
                thumbnailAlt="Hero Video"
            />
            {/* dark mode thumbnail */}
            <HeroVideoDialog
                className="hidden dark:block rounded-none"
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/EG-RwFp6aL0"
                thumbnailSrc="/images/Graph.png"
                thumbnailAlt="Hero Video"
            />
        </Section>
    );
}
