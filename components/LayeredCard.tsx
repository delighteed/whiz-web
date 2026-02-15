"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface LayeredCardProps {
    children: ReactNode;
    className?: string;
    layers?: number;
}

export default function LayeredCard({ children, className = "", layers = 3 }: LayeredCardProps) {
    const [scrollOffset, setScrollOffset] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                // Calculate scroll progress relative to viewport (0 = entering bottom, 1 = leaving top)
                const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
                setScrollOffset(scrollProgress - 0.5); // Center around 0
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial position

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div ref={containerRef} className={`relative group ${className}`}>
            {/* Background Layers for Depth/Parallax */}
            {[...Array(layers)].map((_, i) => {
                const depth = i + 1;
                const offset = scrollOffset * (depth * 15); // Layered parallax (max 15px diff)
                const opacity = 0.03 / depth;
                const blur = 10 + depth * 5;
                const scale = 1 + depth * 0.01;

                return (
                    <div
                        key={i}
                        className="absolute inset-0 pointer-events-none rounded-[20px] transition-transform duration-500 ease-out"
                        style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            filter: `blur(${blur}px)`,
                            opacity: opacity,
                            transform: `translateY(${offset}px) scale(${scale}) rotate(${scrollOffset * 0.5}deg)`,
                            zIndex: -depth,
                        }}
                    />
                );
            })}

            {/* Main Content Card */}
            <div
                className="glass-card p-10 relative z-10 h-full w-full"
                style={{
                    transform: `rotate(${scrollOffset * 0.2}deg)`,
                    transition: 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)'
                }}
            >
                {children}
            </div>

            <style jsx>{`
                .group:hover .glass-card {
                    transform: translateY(-6px) scale(1.01) !important;
                    border-color: rgba(255, 255, 255, 0.08);
                    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
                }
            `}</style>
        </div>
    );
}
