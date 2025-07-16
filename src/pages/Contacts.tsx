import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
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
                {/* Telefon */}
                <div className="mb-6">
                    +90 534 249 07 73
                </div>
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

            </div>
        </motion.section>
    );
}
