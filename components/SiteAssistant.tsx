"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MessageSquare, X, Send, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function SiteAssistant() {
    const { language } = useLanguage();
    const t = translations[language].intro; // Using the 'welcome' text as signature
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: `${translations[language].intro.welcome}` }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        setMessages([{ role: "assistant", content: `${translations[language].intro.welcome}` }]);
    }, [language]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (text?: string) => {
        const messageText = text || input;
        if (!messageText.trim() || isLoading) return;

        const newMessages = [...messages, { role: "user", content: messageText } as Message];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.content || "Failed to fetch response");
            }

            const data = await response.json();
            setMessages([...newMessages, { role: "assistant", content: data.content }]);
        } catch (error: any) {
            setMessages([...newMessages, { role: "assistant", content: error.message || "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const quickNav = (section: string, label: string) => {
        setIsOpen(false);
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        } else {
            // If it's a page navigation
            window.location.href = section;
        }
    };

    return (
        <>
            {/* Floating Assistant Trigger - Clean Premium FAB */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="fixed bottom-8 right-8 z-50"
            >
                <button
                    onClick={() => setIsOpen(true)}
                    className="group relative p-4 rounded-2xl bg-primary text-background shadow-[0_10px_40px_rgba(244,246,250,0.25)] hover:shadow-[0_15px_50px_rgba(244,246,250,0.35)] transition-all duration-300 hover:-translate-y-1 active:scale-95 border border-white/10"
                >
                    <div className="relative z-10">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    {/* Ring Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Active Status Dot */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-sage rounded-full border-2 border-background animate-pulse" />
                </button>
            </motion.div>

            {/* Side Panel Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Side Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-[380px] bg-[#0B1C3D]/95 backdrop-blur-2xl border-l border-white/5 z-[70] shadow-2xl transform transition-transform duration-500 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-8 border-b border-white/5 flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-accent-sage animate-pulse" />
                                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-primary/60">Whiz Assistant</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-mist/40 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-xl font-bold text-primary leading-tight">
                            “{translations[language].intro.welcome}”
                        </p>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-4 rounded-[20px] text-sm leading-relaxed ${m.role === 'user' ? 'bg-accent-blue/10 text-primary border border-accent-blue/20' : 'bg-white/[0.03] text-mist border border-white/5'}`}>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white/[0.03] text-mist/40 p-4 rounded-[20px] border border-white/5">
                                    <div className="flex gap-1">
                                        <div className="w-1 h-1 rounded-full bg-mist/20 animate-bounce" />
                                        <div className="w-1 h-1 rounded-full bg-mist/20 animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1 h-1 rounded-full bg-mist/20 animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions */}
                    <div className="px-6 py-4 flex flex-wrap gap-2">
                        {[
                            { label: "How it works", action: "/" },
                            { label: "Research", action: "/research" },
                            { label: "Privacy", action: "/privacy" },
                            { label: "Demo", action: "/demo" },
                            { label: "Waitlist", action: "waitlist" }
                        ].map((btn) => (
                            <button
                                key={btn.label}
                                onClick={() => {
                                    if (btn.action === "waitlist") {
                                        quickNav("waitlist", "Waitlist");
                                    } else {
                                        window.location.href = btn.action;
                                    }
                                }}
                                className="text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-mist/60 hover:text-accent-blue hover:border-accent-blue/20 transition-all"
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="p-6 border-t border-white/5 relative"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask anything..."
                            className="w-full bg-white/[0.03] border border-white/5 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-accent-blue/20 transition-all placeholder:text-mist/20 pr-12"
                        />
                        <button
                            type="submit"
                            className="absolute right-9 top-1/2 -translate-y-1/2 text-mist/40 hover:text-accent-blue transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
