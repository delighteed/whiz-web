"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function NavBar() {
    const pathname = usePathname();
    const { language } = useLanguage();
    const t = translations[language].navbar;

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="w-full flex justify-center py-6 px-4 absolute top-0 left-0 z-50">
            <div className="flex gap-6 md:gap-8 items-center glass-nav px-8 py-3 rounded-full shadow-lg max-w-6xl w-full justify-between sm:justify-center transition-all duration-700">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-10 h-10 transition-transform duration-500 group-hover:scale-110">
                        <Image
                            src="/whiz-logo-white.png"
                            alt="Whiz Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>

                <div className="hidden sm:flex items-center gap-8 lg:gap-12 mx-12">
                    <Link href="/" className="font-medium text-primary/70 hover:text-white transition-all text-xs tracking-widest uppercase">
                        {t.howItWorks}
                    </Link>
                    <Link href="/research" className={`text-xs font-bold transition-all tracking-widest uppercase ${isActive('/research') ? 'text-accent-blue' : 'text-mist/50 hover:text-white'}`}>
                        {t.research}
                    </Link>
                    <Link href="/privacy" className={`text-xs font-bold transition-all tracking-widest uppercase ${isActive('/privacy') ? 'text-accent-blue' : 'text-mist/50 hover:text-white'}`}>
                        {t.privacy}
                    </Link>
                    <Link href="/demo" className={`text-xs font-bold transition-all tracking-widest uppercase ${isActive('/demo') ? 'text-accent-blue' : 'text-mist/50 hover:text-white'}`}>
                        {t.demo}
                    </Link>
                </div>

                <Link href="/" className="text-[10px] font-black tracking-[0.2em] uppercase btn-primary px-8 py-3 rounded-full transition-all">
                    {t.waitlist}
                </Link>
            </div>
        </nav>
    );
}
