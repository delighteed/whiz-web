"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function IntroOverlay() {
    const { language, setLanguage, showIntro, finishIntro } = useLanguage();
    const [step, setStep] = useState<'language' | 'welcome' | 'revealing'>('language');
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setIsReducedMotion(mediaQuery.matches);
    }, []);

    const handleLanguageSelect = (lang: 'en' | 'ru') => {
        setLanguage(lang);
        setStep('welcome');

        setTimeout(() => {
            setStep('revealing');
            if (isReducedMotion) {
                setTimeout(finishIntro, 200);
            } else {
                setTimeout(finishIntro, 1600);
            }
        }, 1200);
    };

    if (!showIntro) return null;

    const t = translations[language].intro;

    // Premium Liquid SVG path morph frames - Center-out organic reveal
    const blobPaths = [
        "M50,50 m-1,0 a1,1 0 1,0 2,0 a1,1 0 1,0 -2,0", // Tiny center point
        "M50,30 C65,30 85,35 85,50 C85,65 65,80 50,80 C35,80 15,65 15,50 C15,35 35,30 50,30 Z", // Organic start
        "M50,15 C75,15 95,25 95,50 C95,75 75,90 50,90 C25,90 5,75 5,50 C5,25 25,15 50,15 Z", // Expanding
        "M50,0 C85,0 100,15 100,50 C100,85 85,100 50,100 C15,100 0,85 0,50 C0,15 15,0 50,0 Z"  // Near full cover
    ];

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-start bg-white overflow-hidden pt-[12vh] md:pt-[15vh]">
            {/* Liquid Paint Reveal Overlay - ORIGINATES FROM CENTER */}
            <AnimatePresence>
                {step === 'revealing' && !isReducedMotion && (
                    <motion.div
                        className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center translate-y-[-12vh] md:translate-y-[-15vh]"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-[150vmax] h-[150vmax] absolute">
                            <motion.path
                                initial={{ d: blobPaths[0], scale: 0.1 }}
                                animate={{
                                    d: [blobPaths[0], blobPaths[1], blobPaths[2], blobPaths[3]],
                                    scale: [0.1, 0.4, 2, 15]
                                }}
                                transition={{
                                    duration: 1.5,
                                    ease: [0.76, 0, 0.24, 1],
                                    times: [0, 0.2, 0.5, 1]
                                }}
                                fill="#060C1F"
                            />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reduced Motion Fade Overlay */}
            {step === 'revealing' && isReducedMotion && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-[#060C1F] z-50"
                />
            )}

            {/* Content Layer - Side-by-Side on Desktop */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-center justify-center gap-8 lg:gap-16 w-full max-w-6xl px-8">
                {/* Asset A: Muscle Bird (Left-aligned on Desktop) - TEMPORARILY REMOVED */}
                {/* 
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[460px] lg:h-[460px] relative shrink-0"
                >
                    <Image
                        src="/intro-bird.png"
                        alt="Intro Mascot"
                        fill
                        className="object-contain"
                        priority
                    />
                </motion.div>
                */}

                {/* Whistle Visual Cue (Hidden on Mobile) - TEMPORARILY REMOVED */}
                {/* 
                {step !== 'revealing' && (
                    <div className="hidden lg:block absolute left-[400px] top-1/2 -translate-y-12 z-20 pointer-events-none">
                        <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
                            <motion.path
                                d="M5 20C15 10 30 10 40 20S65 30 75 20"
                                stroke="#0B1C3D"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M10 25C20 18 35 18 45 25S70 32 80 25"
                                stroke="#0B1C3D"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                            />
                        </svg>
                    </div>
                )}
                */}

                {/* Speech Bubble / Prompt (Right-aligned on Desktop) */}
                <AnimatePresence mode="wait">
                    {step !== 'revealing' && (
                        <motion.div
                            key={step}
                            initial={{ y: 20, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.95 }}
                            className="flex flex-col items-center space-y-10 w-full max-w-lg lg:max-w-xl"
                        >
                            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-[#0B1C3D]/12 shadow-[0_18px_50px_rgba(11,28,61,0.10)] relative w-full">
                                <p className="text-[#0B1C3D] font-bold text-2xl md:text-3xl lg:text-4xl text-center leading-tight">
                                    {step === 'language' ? t.question : t.welcome}
                                </p>

                                {/* Bubble Arrow - HIDDEN WHILE BIRD IS GONE */}
                                {/* <div className="absolute -top-2 lg:top-1/2 left-1/2 lg:-left-2 -translate-x-1/2 lg:translate-x-0 lg:-translate-y-1/2 w-6 h-6 bg-white border-l border-t border-[#0B1C3D]/12 rotate-45 lg:-rotate-45" /> */}
                            </div>

                            {/* Language Selection Buttons */}
                            {step === 'language' && (
                                <div className="flex flex-col sm:flex-row gap-6 w-full">
                                    <button
                                        onClick={() => handleLanguageSelect('en')}
                                        className="flex-1 px-10 py-5 rounded-full bg-[#0B1C3D] text-white font-black text-xs tracking-[0.2em] uppercase shadow-[0_10px_30px_rgba(11,28,61,0.2)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(11,28,61,0.3)] transition-all outline-none focus:ring-2 focus:ring-[#0B1C3D]/20 active:scale-95"
                                    >
                                        English
                                    </button>
                                    <button
                                        onClick={() => handleLanguageSelect('ru')}
                                        className="flex-1 px-10 py-5 rounded-full bg-[#0B1C3D] text-white font-black text-xs tracking-[0.2em] uppercase shadow-[0_10px_30px_rgba(11,28,61,0.2)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(11,28,61,0.3)] transition-all outline-none focus:ring-2 focus:ring-[#0B1C3D]/20 active:scale-95"
                                    >
                                        Русский
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

