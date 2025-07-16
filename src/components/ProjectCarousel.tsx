import { useTranslation } from "react-i18next";
import projects from "../data/projects.json";

type ProjectCarouselProps = {
    index: number;
    setIndex: (index: number) => void;
    visibleCount: number;
    setVisibleCount: (count: number) => void;
    onProjectClick: (project: any) => void;
};

export default function ProjectCarousel({
    index,
    visibleCount,
    onProjectClick,
}: ProjectCarouselProps) {
    const { i18n } = useTranslation();
    const currentLang = i18n.language as "tr" | "en" | "nl";

    // Ekran boyutuna göre sayısını ayarlamak istiyorsan useEffect ile kontrolü üstte tutabilirsin (ilk kodundaki gibi)
    const currentProjects = projects.slice(index, index + visibleCount);

    return (
        <div className="flex gap-6 justify-center overflow-hidden py-2">
            {currentProjects.map((project) => (
                <button
                    key={project.id}
                    className="w-full max-w-sm h-[340px] bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition-shadow text-left"
                    onClick={() => onProjectClick(project)}
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
                </button>
            ))}
        </div>
    );
}
