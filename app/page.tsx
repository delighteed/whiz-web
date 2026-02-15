"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import LayeredCard from "@/components/LayeredCard";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function Home() {
  const [particles, setParticles] = useState<{ left: string; duration: string; delay: string; size: string }[]>([]);

  const { language } = useLanguage();
  const t = translations[language].home;

  useEffect(() => {
    const newParticles = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      duration: `${15 + Math.random() * 20}s`,
      delay: `${-Math.random() * 20}s`,
      size: `${1 + Math.random() * 2}px`
    }));
    setParticles(newParticles);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden bg-background">
      {/* Background Atmosphere */}
      <div className="drift-bg" />
      <div className="glass-glow-bg" />

      {/* Hero Section */}
      <section className="w-full relative flex flex-col items-center pt-32 pb-16 md:pt-48 md:pb-32 px-6">
        {/* Subtle Atmospheric Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((style, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: style.left,
                width: style.size,
                height: style.size,
                animationDuration: style.duration,
                animationDelay: style.delay,
              }}
            />
          ))}
        </div>

        <ScrollReveal className="w-full max-w-5xl flex flex-col items-center text-center space-y-12 relative z-10">
          {/* Logo and Branding */}
          <div className="flex flex-col items-center space-y-8">
            <div className="relative w-44 h-44 md:w-60 md:h-60">
              <Image
                src="/whiz-logo-white.png"
                alt="Whiz Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-accent-sage text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-sage/60" />
              {t.neuralArchitecture}
            </div>
          </div>

          <div className="space-y-8 relative">
            <div className="hero-glow" />
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-primary max-w-4xl leading-[1.1] relative">
              {t.heroTitle}
            </h1>

            <p className="text-xl md:text-2xl text-mist max-w-3xl leading-relaxed mx-auto font-light">
              {t.heroDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 pt-8 items-center">
            <Link href="/demo" className="btn-primary px-12 py-5 rounded-full font-semibold text-xl tracking-tight group relative overflow-hidden">
              <span className="relative z-10">{t.tryIdea}</span>
              <div className="absolute inset-0 bg-accent-blue/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            </Link>
            <button
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-mist hover:text-white transition-colors font-medium text-lg border-b border-white/5 hover:border-accent-blue/40 pb-1"
            >
              {t.joinRevolution}
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* “The Hidden Cost of Focus” */}
      <section className="w-full py-32 relative flex justify-center">
        <ScrollReveal className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          {/* Interactive Image Container */}
          <div className="relative group w-full aspect-[4/3.2] !bg-transparent !p-0 !border-0 !shadow-none !ring-0 overflow-hidden rounded-2xl">
            <Image
              src="/worker-woman.png"
              alt="State of focus"
              fill
              className="rounded-2xl w-full h-full object-cover object-bottom block transition-all duration-1000 scale-[1.3] group-hover:scale-[1.35]"
            />
            <Image
              src="/worker-man-pain.png"
              alt="State of overwork"
              fill
              className="rounded-2xl w-full h-full object-cover object-right-bottom block absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 scale-[1.12] group-hover:scale-[1.18]"
            />
          </div>

          {/* Content */}
          <div className="space-y-12 flex flex-col items-start justify-center">
            <div className="space-y-4">
              <p className="text-mist/30 text-xs font-black tracking-[0.3em] uppercase">
                {t.foundations}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight lowercase first-letter:uppercase">
                {t.hiddenCostTitle}
              </h2>
            </div>

            <div className="space-y-6 text-mist text-lg leading-relaxed font-light">
              <p>
                {t.karoshiDesc}
              </p>
              <p>
                {t.whizSupport}
              </p>
            </div>

            <Link href="/research" className="text-accent-blue font-semibold hover:text-white flex items-center gap-3 transition-all group">
              {t.seeResearch}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* “Different by design” */}
      <section className="w-full py-40 border-y border-white/5 relative flex justify-center bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6 space-y-24">
          <ScrollReveal className="text-center space-y-8">
            <div className="space-y-4">
              <span className="text-accent-sage text-xs font-bold tracking-[0.4em] uppercase">Architecture</span>
              <h2 className="text-4xl md:text-6xl font-bold text-primary">
                Supportive, not aggressive.
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-mist leading-relaxed max-w-3xl mx-auto font-light">
              Traditional tools gamify focus. We prioritize the pauses. <br />
              Whiz is built to be invisible until you need it.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Neuro-aesthetic", desc: "Designed to relax the nervous system." },
              { title: "Privacy-first", desc: "Your cognitive data never leaves your device." },
              { title: "Psychologically safe", desc: "Built with empathy, not performance metrics." }
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <LayeredCard className="h-full">
                  <div className="space-y-4">
                    <div className="w-8 h-px bg-accent-blue/40 group-hover:w-12 transition-all duration-500" />
                    <h4 className="text-lg font-bold text-primary">{feature.title}</h4>
                    <p className="text-mist/50 text-sm font-light leading-relaxed">{feature.desc}</p>
                  </div>
                </LayeredCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist (CTA Section) */}
      <section id="waitlist" className="w-full py-40 flex justify-center">
        <ScrollReveal className="max-w-4xl mx-auto px-6 w-full">
          <LayeredCard layers={4} className="group">
            <div className="text-center space-y-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-sage/20 bg-accent-sage/5 text-accent-sage text-[10px] font-bold tracking-widest uppercase mb-4">
                  Enrollment Open
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                  Join the quiet revolution.
                </h2>
                <p className="text-xl text-mist font-light">
                  We are building slowly and intentionally. Be one of the few to access Whiz during our private beta.
                </p>
              </div>

              <WaitlistForm />
            </div>
          </LayeredCard>
        </ScrollReveal>
      </section>

      <footer className="w-full py-24 px-6 border-t border-white/5 text-center">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
          <div className="relative w-40 h-16 opacity-30 grayscale brightness-200 hover:opacity-50 transition-opacity duration-700">
            <Image src="/whiz-logo-white.png" alt="Whiz" fill className="object-contain" />
          </div>
          <div className="flex gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-mist/20">
            <Link href="/privacy" className="hover:text-accent-blue transition-colors">Privacy Policy</Link>
            <Link href="/research" className="hover:text-accent-blue transition-colors">Research</Link>
          </div>
          <p className="text-mist/10 text-xs font-light">
            &copy; {new Date().getFullYear()} Whiz Neural Systems. All rights centered.
          </p>
        </div>
      </footer>
    </main>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="p-8 bg-accent-blue/5 text-accent-blue rounded-[20px] border border-accent-blue/20 backdrop-blur-xl">
        Thank you. You are on the list for our private beta.
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 p-2 glass-card focus-within:border-accent-blue/20 transition-all duration-500">
        <input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-8 py-5 rounded-full bg-transparent border-none focus:outline-none text-lg placeholder:text-mist/20 text-primary"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-10 py-5 btn-primary rounded-full font-semibold text-lg disabled:opacity-50 whitespace-nowrap min-w-[200px]"
        >
          {status === 'loading' ? 'Joining...' : 'Get early access'}
        </button>
      </form>
      <p className="text-[10px] text-mist/20 font-bold tracking-widest uppercase pt-8">
        Secure Neural Data Encryption Active
      </p>
    </div>
  );
}
