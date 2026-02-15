import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function ResearchPage() {
    return (
        <main className="min-h-screen py-32 px-6 flex flex-col items-center bg-background">
            <article className="max-w-2xl w-full space-y-24">
                {/* Header */}
                <ScrollReveal speed="normal">
                    <header className="space-y-8 border-b border-foreground/10 pb-16">
                        <Link href="/" className="inline-flex items-center text-sm text-foreground/60 hover:text-primary transition-colors mb-4">
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                            The Science of <br /> <span className="text-primary italic">Cognitive Sustainability</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-medium">
                            Why our brains aren't built for the 8-hour sprint.
                        </p>
                    </header>
                </ScrollReveal>

                {/* Section 1: Invisible Strain */}
                <section className="space-y-8">
                    <ScrollReveal speed="normal">
                        <h2 className="text-3xl font-bold text-foreground border-l-4 border-primary pl-6">The Invisible Load</h2>
                    </ScrollReveal>
                    <ScrollReveal speed="slow" className="prose prose-lg text-foreground/70 leading-relaxed space-y-6">
                        <p className="text-lg md:text-xl">
                            In the modern knowledge economy, "work" is no longer physical. It is entirely cognitive.
                            Yet, we measure it with industrial-era tools: hours sat at a desk.
                        </p>
                        <p className="text-lg md:text-xl">
                            Cognitive load theory suggests that our working memory is finite. When we push past our natural
                            ultradian rhythms (typically 90 minutes of focus), our efficiency doesn't just plateau - it plummets.
                            We begin to "borrow" energy from our future selves, leading to a state of chronic, low-grade depletion.
                        </p>
                        <blockquote className="border-l-4 border-primary/30 pl-8 italic text-2xl text-foreground font-serif my-12 py-4">
                            "Burnout isn't a failure of will. It's a failure of recovery."
                        </blockquote>
                    </ScrollReveal>
                </section>

                {/* Section 2: Karoshi */}
                <ScrollReveal speed="slow" className="bg-secondary/15 rounded-[2.5rem] p-10 md:p-16 space-y-10 my-24">
                    <h2 className="text-3xl font-bold text-foreground">Lessons from Japan: Karoshi</h2>
                    <p className="text-foreground/70 text-xl leading-relaxed">
                        <em>Karoshi</em> (過労死) is a recognized Japanese term for death caused by overwork.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-8 pt-6">
                        <div className="bg-navy-light p-8 rounded-3xl border border-white/10">
                            <span className="block text-5xl font-bold text-primary mb-4">1,304</span>
                            <span className="text-base text-mist/60 leading-relaxed font-medium">Officially recognized cases of overwork-related deaths and disorders (Fiscal 2024)</span>
                        </div>
                        <div className="bg-navy-light p-8 rounded-3xl border border-white/10">
                            <span className="block text-5xl font-bold text-primary mb-4">&gt; 1,000</span>
                            <span className="text-base text-mist/60 leading-relaxed font-medium">Cases involving mental health issues related to overwork</span>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Section 3: The Solution */}
                <section className="space-y-10">
                    <ScrollReveal speed="normal">
                        <h2 className="text-3xl font-bold text-foreground border-l-4 border-primary pl-6">A Gentler Approach</h2>
                    </ScrollReveal>
                    <ScrollReveal speed="slow" className="space-y-8">
                        <p className="text-foreground/70 text-xl leading-relaxed">
                            Whiz is built on a simple premise: <strong className="text-foreground">Awareness beats willpower.</strong>
                        </p>
                        <p className="text-foreground/70 text-xl leading-relaxed">
                            We use standard, non-invasive metrics to help you tune into your own body.
                            By monitoring subtle physiological signals - blink rate variability, gaze fixation, and posture - we can
                            identify the precise moment your cognitive battery begins to drain.
                        </p>
                    </ScrollReveal>
                </section>

                <ScrollReveal speed="fast" className="pt-20 border-t border-foreground/10 pb-20">
                    <Link href="/demo" className="inline-flex items-center text-2xl font-bold text-primary hover:text-primary-hover transition-colors group">
                        Try the concept <span className="ml-3 transition-transform group-hover:translate-x-2">→</span>
                    </Link>
                </ScrollReveal>
            </article>
        </main>
    );
}
