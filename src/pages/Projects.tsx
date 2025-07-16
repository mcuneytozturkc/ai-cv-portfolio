import { useState } from "react";
import ProjectCarousel from "../components/ProjectCarousel";
import ProjectGallery from "../components/ProjectGallery";
import { ChevronLeft, ChevronRight } from "lucide-react";
import projects from "../data/projects.json";

export default function Projects() {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const handleProjectClick = (project: any) => {
        setSelectedImages(project.images || []);
        setModalOpen(true);
    };

    return (
        <section className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-10">
                Projects
            </h1>
            <div className="relative w-full max-w-6xl">
                <button
                    onClick={() => setCarouselIndex((prev) => Math.max(0, prev - visibleCount))}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full z-10"
                    aria-label="Önceki"
                >
                    <ChevronLeft />
                </button>

                <ProjectCarousel
                    index={carouselIndex}
                    setIndex={setCarouselIndex}
                    visibleCount={visibleCount}
                    setVisibleCount={setVisibleCount}
                    onProjectClick={handleProjectClick}
                />

                <button
                    onClick={() => setCarouselIndex((prev) =>
                        Math.min(projects.length - visibleCount, prev + visibleCount)
                    )}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full z-10"
                    aria-label="Sonraki"
                >
                    <ChevronRight />
                </button>
            </div>
            {/* Sonsuz döngülü ProjectGallery */}
            {modalOpen && (
                <ProjectGallery images={selectedImages} onClose={() => setModalOpen(false)} />
            )}
        </section>
    );
}
