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
                            Experience Cognexis
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto font-medium">
                            See how we detect early signs of fatigue before they become burnout.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Demo Container */}
                <ScrollReveal speed="normal">
                    <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center text-center !p-0 !bg-transparent !border-0 !shadow-none">
                        <div className="w-full h-full flex flex-col items-center justify-center p-12 space-y-8 group">
                            <div className="w-20 h-20 bg-navy-light rounded-3xl border border-white/5 flex items-center justify-center shadow-lg text-primary transform transition-transform group-hover:scale-110">
                                <Video size={40} />
                            </div>

                            <div className="space-y-4 max-w-md">
                                <h3 className="text-2xl font-bold text-foreground">Camera Access Required</h3>
                                <p className="text-lg text-foreground/60 leading-relaxed">
                                    Cognexis needs to see your eyes to detect strain.
                                    <br />
                                    <strong className="text-foreground/80">No video is ever recorded or sent to a server.</strong>
                                </p>
                                <p className="text-sm text-foreground/40 italic pt-4 font-medium">
                                    This experiment is about understanding your bio-rhythms, not measuring your performance.
                                </p>
                            </div>

                            <button className="px-10 py-5 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-hover transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50">
                                Start Live Demo
                            </button>

                            <div className="absolute bottom-6 text-sm text-foreground/40 flex items-center gap-2 font-medium">
                                <ShieldCheck size={18} />
                                Computed locally on your device
                            </div>
                        </div>
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
