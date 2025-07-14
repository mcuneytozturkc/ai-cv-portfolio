import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function About() {
    const { t } = useTranslation();

    return (
        <motion.div
            className="w-full"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <section className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
                <div className="text-center px-4 max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        {t("about_title")}
                    </h1>
                    <p className="text-gray-300 text-lg whitespace-pre-line">
                        {t("about_description")}
                    </p>
                    <img
                        src="src/assets/cuneyt-signature-transparent.png"
                        alt="Cüneyt Öztürk imza"
                        className="mx-auto mt-8 w-48 opacity-80"
                    />
                </div>
            </section>
        </motion.div>
    );
}
