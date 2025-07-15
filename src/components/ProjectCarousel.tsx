import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import projects from "../data/projects.json";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectCarousel() {
    const { i18n } = useTranslation();
    const currentLang = i18n.language as "tr" | "en" | "nl";
    const [index, setIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);

    useEffect(() => {
        const updateVisibleCount = () => {
            const width = window.innerWidth;
            if (width < 640) setVisibleCount(1);
            else if (width < 1024) setVisibleCount(2);
            else setVisibleCount(3);
        };

        updateVisibleCount();
        window.addEventListener("resize", updateVisibleCount);
        return () => window.removeEventListener("resize", updateVisibleCount);
    }, []);

    const handlePrev = () => {
        setIndex((prev) => Math.max(0, prev - visibleCount));
    };

    const handleNext = () => {
        setIndex((prev) =>
            Math.min(projects.length - visibleCount, prev + visibleCount)
        );
    };

    const currentProjects = projects.slice(index, index + visibleCount);

    return (
        <section className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-10">
                Projeler
            </h1>

            <div className="relative w-full max-w-6xl">
                {/* Navigasyon */}
                <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full z-10"
                >
                    <ChevronLeft />
                </button>

                <div className="flex gap-6 justify-center overflow-hidden">
                    {currentProjects.map((project) => (
                        <div
                            key={project.id}
                            className="w-full max-w-sm h-[340px] bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-xl font-semibold text-white mb-2">
                                {project.title[currentLang]}
                            </h2>
                            <p className="text-gray-300 mb-4 line-clamp-5">
                                {project.description[currentLang]}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech: string, i: number) => (
                                    <span
                                        key={i}
                                        className="bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full z-10"
                >
                    <ChevronRight />
                </button>
            </div>
        </section>
    );
}
