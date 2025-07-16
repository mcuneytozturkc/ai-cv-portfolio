import { useTranslation } from "react-i18next";


export default function Hero() {
    const { t, i18n } = useTranslation();

    const cvLinks: Record<string, string> = {
        tr: "/Muhsin-Cuneyt-Ozturk-CV-Turkce.pdf",
        en: "/Muhsin-Cuneyt-Ozturk-Resume.pdf",
        nl: "/Muhsin-Cuneyt-Ozturk-Cv-Dutch.pdf",
    };


    const currentLang = i18n.language;
    const cvLink = cvLinks[currentLang] || cvLinks["tr"];

    return (
        <section className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
            <div className="text-center px-4 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                    {t("hero_greeting_1")} <br></br><span className="text-blue-400">{t("hero_name")}</span>
                </h1>
                <p className="mt-4 text-gray-300 text-lg">{t("hero_description")}</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="/projects"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 hover:text-white transition"
                    >
                        {t("hero_projects_button")}
                    </a>
                    <a
                        href={cvLink}
                        className="border border-blue-600 px-6 py-3 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition"
                        download
                    >
                        {t("hero_cv_button")}
                    </a>
                </div>
            </div>
        </section>
    );
}
