import { useState, useEffect } from "react";
import projects from "../data/projects.json";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectGallery from "../components/ProjectGallery";
import ProjectCarousel from "../components/ProjectCarousel";

export default function Projects() {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    // Responsive görünür kart sayısı
    useEffect(() => {
        function updateCount() {
            if (window.innerWidth < 640) setVisibleCount(1);
            else if (window.innerWidth < 1024) setVisibleCount(2);
            else setVisibleCount(3);
        }
        updateCount();
        window.addEventListener("resize", updateCount);
        return () => window.removeEventListener("resize", updateCount);
    }, []);

    // Son index overflow olmasın
    useEffect(() => {
        if (carouselIndex > projects.length - visibleCount)
            setCarouselIndex(Math.max(0, projects.length - visibleCount));
    }, [visibleCount, carouselIndex]);

    const handleProjectClick = (project: any) => {
        setSelectedImages(project.images || []);
        setModalOpen(true);
    };

    // Gösterilecek projeleri slice ile seç
    const currentProjects = projects.slice(carouselIndex, carouselIndex + visibleCount);

    return (
        <section className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center px-2 sm:px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-10">
                Projects
            </h1>
            <div className="relative w-full max-w-6xl">
                <button
                    onClick={() => setCarouselIndex((prev) => Math.max(0, prev - visibleCount))}
                    disabled={carouselIndex === 0}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full z-10 disabled:opacity-40"
                    aria-label="Önceki"
                >
                    <ChevronLeft />
                </button>
                <div className="flex gap-6 justify-center transition-all duration-300">
                    <ProjectCarousel projects={currentProjects} onProjectClick={handleProjectClick} />
                </div>
                <button
                    onClick={() => setCarouselIndex((prev) =>
                        Math.min(projects.length - visibleCount, prev + visibleCount)
                    )}
                    disabled={carouselIndex >= projects.length - visibleCount}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full z-10 disabled:opacity-40"
                    aria-label="Sonraki"
                >
                    <ChevronRight />
                </button>
            </div>
            {modalOpen && (
                <ProjectGallery images={selectedImages} onClose={() => setModalOpen(false)} />
            )}
        </section>
    );
}
