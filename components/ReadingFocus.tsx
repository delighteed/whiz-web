"use client";

import { useEffect, useRef, useState, Children, ReactElement, cloneElement } from "react";

export default function ReadingFocus({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeId, setActiveId] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const paragraphs = containerRef.current.querySelectorAll('.reading-paragraph');
            const viewportCenter = window.innerHeight / 2;

            let closestDistance = Infinity;
            let newActiveId = 0;

            paragraphs.forEach((p, index) => {
                const rect = p.getBoundingClientRect();
                const paragraphCenter = rect.top + (rect.height / 2);
                const distance = Math.abs(paragraphCenter - viewportCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    newActiveId = index;
                }
            });

            setActiveId(newActiveId);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={containerRef} className="reading-focus">
            {Children.map(children, (child, index) => {
                // Only apply to paragraphs or blockquotes
                const isValidTag = (child as ReactElement).type === 'p' || (child as ReactElement).type === 'blockquote';

                if (isValidTag) {
                    const isActive = index === activeId;
                    return cloneElement(child as ReactElement<{ className?: string }>, {
                        className: `reading-paragraph ${isActive ? 'reading-paragraph-active' : 'reading-paragraph-inactive'} transition-all duration-700 ${(child as ReactElement<{ className?: string }>).props.className || ''
                            }`
                    });
                }
                return child;
            })}
        </div>
    );
}
