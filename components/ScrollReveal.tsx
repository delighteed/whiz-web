"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    id?: string;
    delay?: number;
    speed?: "slow" | "normal" | "fast";
}

export default function ScrollReveal({
    children,
    className = "",
    id,
    delay = 0,
    speed = "normal"
}: ScrollRevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const speedMap = {
        slow: 1000,
        normal: 500,
        fast: 300
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.disconnect();
        };
    }, []);

    return (
        <div
            id={id}
            ref={ref}
            className={`reveal-on-scroll ${isVisible ? "reveal-visible" : ""} ${className}`}
            style={{
                transitionDelay: `${delay}ms`,
                transitionDuration: `${speedMap[speed]}ms`
            }}
        >
            {children}
        </div>
    );
}
