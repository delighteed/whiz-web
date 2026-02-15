"use client";

import { useState, ReactNode } from "react";

interface FlipCardProps {
    title: string;
    icon: ReactNode;
    description: string;
    className?: string;
}

export default function FlipCard({ title, icon, description, className = "" }: FlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className={`flip-card-container aspect-[4/3] w-full cursor-pointer outline-none group ${className}`}
            onClick={() => setIsFlipped(!isFlipped)}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsFlipped(!isFlipped);
                }
            }}
            tabIndex={0}
            role="button"
            aria-pressed={isFlipped}
            aria-label={`Metric: ${title}. Click to ${isFlipped ? "hide" : "show"} details.`}
        >
            <div className={`flip-card-inner ${isFlipped ? "is-flipped" : ""}`}>
                {/* Front Side */}
                <div className="flip-card-front bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 text-center space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary mx-auto">
                        {icon}
                    </div>
                    <h4 className="text-2xl font-bold text-primary">
                        {title}
                    </h4>
                    <span className="text-sm text-mist/30 font-medium uppercase tracking-widest">
                        Tap to reveal details
                    </span>
                </div>

                {/* Back Side */}
                <div className="flip-card-back bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 text-center flex flex-col items-center justify-center">
                    <p className="text-lg md:text-xl text-mist leading-relaxed font-medium">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
