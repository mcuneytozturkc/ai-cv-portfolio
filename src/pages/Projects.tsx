import projects from '../data/projects.json';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Projects() {
    const { i18n, t } = useTranslation();
    const currentLang = i18n.language;

    return (
        <motion.div
            className="w-full"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <section className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
                <div className="px-4 max-w-5xl w-full">
                    <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-10">
                        {t("projects")}
                    </h1>
                    <div className="grid gap-6 md:grid-cols-2">
                        {projects.map(project => {
                            const lang = currentLang as keyof typeof project.title;

                            return (
                                <a
                                    key={project.id}
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block border border-gray-700 rounded-lg p-6 bg-gray-800 hover:shadow-lg transition-shadow"
                                >
                                    <h2 className="text-2xl font-semibold text-white mb-2">
                                        {project.title[lang]}
                                    </h2>
                                    <p className="text-gray-300 mb-4">
                                        {project.description[lang]}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech: string, idx: number) => (
                                            <span
                                                key={idx}
                                                className="bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </a>
                            );
                        })}

                    </div>
                </div>
            </section>
        </motion.div>
    );
}
