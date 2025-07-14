import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Contacts() {
    const { t } = useTranslation();

    return (
        <motion.section
            className="pt-16 w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <div className="text-center px-4 max-w-xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    {t("contact_title")}
                </h1>
                <p className="text-gray-300 mb-8 text-lg">
                    {t("contact_description")}
                </p>

                {/* E-posta */}
                <div className="mb-6">
                    <a
                        href="mailto:mcuneytozturk@hotmail.com"
                        className="inline-flex items-center gap-2 text-blue-400 text-lg font-semibold hover:underline"
                    >
                        <FaEnvelope />
                        mcuneytozturk@hotmail.com
                    </a>
                </div>

                {/* Sosyal Linkler */}
                <div className="flex justify-center gap-6 text-white text-2xl">
                    <a
                        href="https://github.com/mcuneytozturkc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition"
                        aria-label={t("contact_github_aria")}
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/muhsin-cuneyt-ozturk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition"
                        aria-label={t("contact_linkedin_aria")}
                    >
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </motion.section>
    );
}
