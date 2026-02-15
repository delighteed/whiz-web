import { Video, Eye, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import FlipCard from "@/components/FlipCard";

export default function DemoPage() {
    return (
        <main className="min-h-screen py-32 px-6 flex flex-col items-center bg-background">
            <div className="max-w-4xl w-full space-y-24">
                {/* Header */}
                <ScrollReveal speed="normal">
                    <div className="text-center space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/30 text-primary text-sm font-medium">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Early Access Concept
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                            Experience Whiz
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto font-medium">
                            See how we detect early signs of fatigue before they become burnout.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Demo Container - YouTube Embed */}
                <ScrollReveal speed="normal">
                    <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden bg-navy-light border border-white/5 shadow-2xl">
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src="https://www.youtube.com/embed/qRFdpq-NLb4"
                            title="Whiz Demo"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </ScrollReveal>

                {/* Features / Explanation (Flashcards) */}
                <div className="grid md:grid-cols-3 gap-8 pt-8 text-center items-center">
                    <ScrollReveal speed="normal">
                        <FlipCard
                            title="Blink Rate"
                            icon={<Eye size={32} />}
                            description="We monitor blink frequency and duration to detect 'computer vision syndrome' and ocular strain."
                        />
                    </ScrollReveal>

                    <ScrollReveal speed="normal">
                        <FlipCard
                            title="Focus Duration"
                            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            description="Tracking how long you've held intense focus without a micro-break to prevent cognitive plateau."
                        />
                    </ScrollReveal>

                    <ScrollReveal speed="normal">
                        <FlipCard
                            title="Postural Slump"
                            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            description="Detects when your head drops or leans forward excessively as physiological fatigue sets in."
                        />
                    </ScrollReveal>
                </div>
            </div>
        </main>
    );
}
