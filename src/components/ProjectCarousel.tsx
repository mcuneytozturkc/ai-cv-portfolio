// ProjectCarousel.tsx
import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa";

export default function ProjectCarousel({ projects, onProjectClick }: any) {
    const { i18n } = useTranslation();
    const currentLang = (i18n.language as "tr" | "en" | "nl") || "en";

    return (
        <>
            {projects.map((project: any) => (
                <div
                    key={project.id}
                    className="w-full max-w-sm h-[360px] bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition-shadow flex flex-col justify-between mx-2"
                    onClick={() => onProjectClick(project)}
                    style={{ cursor: "pointer" }}
                >
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-2">
                            {project.title[currentLang] || project.title["en"]}
                        </h2>
                        <p className="text-gray-300 mb-4 line-clamp-5">
                            {project.description[currentLang] || project.description["en"]}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
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
                    <div className="flex justify-end items-center mt-auto">
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                                title="GitHub"
                                onClick={e => e.stopPropagation()}
                            >
                                <FaGithub className="w-16 h-16 text-gray-400 group-hover:text-indigo-500 transition" />
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
}
