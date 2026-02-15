import Link from "next/link";
import { Shield, Lock, ServerOff, EyeOff } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen py-32 px-6 flex flex-col items-center bg-background">
            <div className="max-w-2xl w-full space-y-24">

                {/* Header */}
                <ScrollReveal speed="normal">
                    <header className="space-y-8 text-center pb-16 border-b border-foreground/10">
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                            Your Privacy is <br /> <span className="text-primary italic">Non-Negotiable</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground/80 max-w-xl mx-auto font-medium">
                            Cognexis is designed to observe your fatigue, not you.
                        </p>
                    </header>
                </ScrollReveal>

                {/* Core Principles Grid */}
                <div className="grid gap-12">
                    <ScrollReveal speed="slow" className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex-shrink-0 flex items-center justify-center text-primary">
                            <ServerOff size={28} />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-foreground">Local Processing Only</h3>
                            <p className="text-xl text-foreground/70 leading-relaxed">
                                All computer vision analysis happens directly in your browser. No video frames, images, or audio are ever sent to a server.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal speed="slow" className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex-shrink-0 flex items-center justify-center text-primary">
                            <EyeOff size={28} />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-foreground">No Storage</h3>
                            <p className="text-xl text-foreground/70 leading-relaxed">
                                We do not store your camera feed. The data exists in your device's RAM for milliseconds to calculate blink rate, then it is discarded.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal speed="slow" className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex-shrink-0 flex items-center justify-center text-primary">
                            <Lock size={28} />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-foreground">You Are In Control</h3>
                            <p className="text-xl text-foreground/70 leading-relaxed">
                                You must explicitly grant camera permission each time you use the tool. Revoking permission stops all analysis instantly.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal speed="slow" className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex-shrink-0 flex items-center justify-center text-primary">
                            <Shield size={28} />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-foreground">Zero Analytics</h3>
                            <p className="text-xl text-foreground/70 leading-relaxed">
                                We do not track your behavior. We don't count your keystrokes, measure your "productivity," or build a profile of you for advertisers.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Detailed Explanation */}
                <section className="space-y-12">
                    <ScrollReveal speed="normal">
                        <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
                    </ScrollReveal>

                    <ScrollReveal speed="slow" className="space-y-8 prose prose-xl">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-foreground">Does anyone see my video?</h3>
                            <p className="text-foreground/70">No. Not even us. The code runs entirely on your machine.</p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-foreground">What data is saved?</h3>
                            <p className="text-foreground/70">In the future complete version, you may choose to save your fatigue stats locally to track trends, but this will be optional and encrypted.</p>
                        </div>
                    </ScrollReveal>
                </section>

                <ScrollReveal speed="fast" className="pt-20 border-t border-foreground/10 text-center pb-20">
                    <Link href="/" className="inline-flex items-center text-xl font-bold text-primary hover:text-primary-hover transition-colors">
                        Return to Home
                    </Link>
                </ScrollReveal>

            </div>
        </main>
    );
}
