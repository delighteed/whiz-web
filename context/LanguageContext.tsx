"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ru';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    showIntro: boolean;
    finishIntro: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');
    const [showIntro, setShowIntro] = useState<boolean>(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem('whiz_lang') as Language;
        if (savedLang) {
            setLanguageState(savedLang);
            setShowIntro(false);
        } else {
            setShowIntro(true);
        }
        setIsInitialized(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('whiz_lang', lang);
    };

    const finishIntro = () => {
        setShowIntro(false);
    };

    if (!isInitialized) return <div className="bg-white fixed inset-0 z-[10000]" />;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, showIntro, finishIntro }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
