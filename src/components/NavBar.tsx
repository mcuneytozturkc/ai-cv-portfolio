import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const { t } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const links = [
        { name: t("home"), to: "/ai-cv-portfolio/" },
        { name: t("projects"), to: "/ai-cv-portfolio/projects" },
        { name: t("about"), to: "/ai-cv-portfolio/about" },
        { name: t("contact"), to: "/ai-cv-portfolio/contact", isButton: true },
    ];

    const menuVariants: Variants = {
        hidden: { opacity: 0, x: "100%" },
        visible: {
            opacity: 1,
            x: "0%",
            transition: { type: "spring" as const, stiffness: 300, damping: 30 },
        },
        exit: {
            opacity: 0,
            x: "100%",
            transition: { ease: "easeInOut" as const },
        },
    };
    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between h-16">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-extrabold text-gray-900 tracking-wide hover:text-indigo-600 transition-colors"
                    onClick={() => setMenuOpen(false)}
                >
                    Cüneyt <span className="text-indigo-600">Öztürk</span>
                </Link>

                {/* Desktop Menü */}
                <nav className="hidden md:flex space-x-6 items-center">
                    {links.map(({ name, to, isButton }) => {
                        const isActive = location.pathname === to;
                        return isButton ? (
                            <Link
                                key={to}
                                to={to}
                                className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                            >
                                {name}
                            </Link>
                        ) : (
                            <Link
                                key={to}
                                to={to}
                                className={`relative px-3 py-2 font-semibold text-gray-700 hover:text-indigo-600 transition-colors ${isActive ? "text-indigo-600" : ""
                                    }`}
                            >
                                {name}
                                <motion.span
                                    layoutId="underline"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded"
                                    style={{ opacity: isActive ? 1 : 0 }}
                                />
                            </Link>
                        );
                    })}
                    {/* 🌍 Dil Seçici */}
                    <div className="relative">
                        <select
                            onChange={(e) => changeLanguage(e.target.value)}
                            value={i18n.language}
                            className="ml-2 pl-2 pr-8 py-1.5 text-sm bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors cursor-pointer appearance-none"
                            aria-label={t("language")}
                        >
                            <option value="tr">TR</option>
                            <option value="en">EN</option>
                            <option value="nl">NL</option>
                        </select>

                        {/* Özel ok simgesi */}
                        <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </nav>

                {/* Hamburger Butonu */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menu Toggle"
                >
                    <span
                        className={`block h-0.5 w-full bg-gray-700 rounded transform transition duration-300 ease-in-out ${menuOpen ? "rotate-45 translate-y-2.5" : ""
                            }`}
                    />
                    <span
                        className={`block h-0.5 w-full bg-gray-700 rounded transition duration-300 ease-in-out ${menuOpen ? "opacity-0" : "opacity-100"
                            }`}
                    />
                    <span
                        className={`block h-0.5 w-full bg-gray-700 rounded transform transition duration-300 ease-in-out ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""
                            }`}
                    />
                </button>
            </div>

            {/* Mobil Menü */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        key="mobile-menu"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        className="fixed top-16 right-0 w-3/4 max-w-xs h-full bg-white shadow-lg p-6 flex flex-col space-y-6 md:hidden"
                    >
                        {links.map(({ name, to, isButton }) => (
                            <Link
                                key={to}
                                to={to}
                                onClick={() => setMenuOpen(false)}
                                className={`${isButton
                                    ? "mt-auto px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 text-center"
                                    : "font-semibold text-gray-700 hover:text-indigo-600"
                                    } transition-colors ${location.pathname === to && !isButton ? "text-indigo-600" : ""}`}
                            >
                                {name}
                            </Link>
                        ))}
                        {/* Mobil Dil Seçici */}
                        <div className="mt-4 relative">
                            <select
                                onChange={(e) => changeLanguage(e.target.value)}
                                value={i18n.language}
                                className="w-full pl-3 pr-10 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors cursor-pointer appearance-none"
                                aria-label={t("language")}
                            >
                                <option value="tr">TR</option>
                                <option value="en">EN</option>
                                <option value="nl">NL</option>
                            </select>

                            {/* Özel ok simgesi */}
                            <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
