// components/ProjectGallery.tsx
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectGalleryProps {
    images: string[];
    onClose: () => void;
}

export default function ProjectGallery({ images, onClose }: ProjectGalleryProps) {
    const [current, setCurrent] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Body scroll kilitleme
    // (React 18+ otomatik unmount ile işliyor)
    if (typeof window !== "undefined") {
        document.body.style.overflow = "hidden";
    }

    const closeGallery = () => {
        if (typeof window !== "undefined") {
            document.body.style.overflow = "";
        }
        onClose();
    };

    const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
    const next = () => setCurrent((prev) => (prev + 1) % images.length);

    // Touch swipe (mobil)
    const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStart === null) return;
        const delta = e.changedTouches[0].clientX - touchStart;
        if (delta > 40) prev();
        else if (delta < -40) next();
        setTouchStart(null);
    };

    // Thumbnail click
    const handleThumbClick = (idx: number) => setCurrent(idx);

    if (!images || images.length === 0) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
                // arka plan BLUR efekti
                backdropFilter: "blur(6px)",
                background: "rgba(16,18,27,0.65)",
            }}
            onClick={closeGallery}
        >
            <div
                ref={modalRef}
                className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col items-center select-none"
                style={{ boxShadow: "0 8px 40px 10px rgba(0,0,0,.24)" }}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Kapat tuşu */}
                <button
                    onClick={closeGallery}
                    className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white text-gray-700 dark:text-gray-200 transition-all shadow"
                    title="Kapat"
                >
                    <X size={28} />
                </button>

                {/* Ana görsel alanı ve oklar */}
                <div className="flex items-center w-full h-[55vh] md:h-[64vh] justify-center mt-8">
                    <button
                        onClick={prev}
                        className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition p-2 rounded-full"
                        aria-label="Önceki"
                        style={{ fontSize: 0 }}
                    >
                        <ChevronLeft size={40} />
                    </button>
                    <div className="flex-1 flex items-center justify-center px-2">
                        <img
                            src={images[current]}
                            alt={`Proje görseli ${current + 1}`}
                            className="rounded-2xl shadow-lg max-h-[48vh] max-w-full object-contain border-4 border-indigo-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 transition-all"
                            draggable={false}
                            style={{ userSelect: "none" }}
                        />
                    </div>
                    <button
                        onClick={next}
                        className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition p-2 rounded-full"
                        aria-label="Sonraki"
                        style={{ fontSize: 0 }}
                    >
                        <ChevronRight size={40} />
                    </button>
                </div>

                {/* Alt thumbnail navigation */}
                <div className="flex gap-2 items-center justify-center mt-6 mb-2 px-2 overflow-x-auto">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleThumbClick(idx)}
                            className={`border-2 rounded-lg p-0.5 hover:border-indigo-400 transition ${idx === current ? "border-indigo-500" : "border-gray-300 dark:border-gray-700"}`}
                            style={{ outline: "none" }}
                            aria-label={`Go to image ${idx + 1}`}
                            tabIndex={0}
                        >
                            <img
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                className={`h-14 w-20 object-cover rounded ${idx === current ? "ring-2 ring-indigo-400" : ""}`}
                                draggable={false}
                                style={{ userSelect: "none" }}
                            />
                        </button>
                    ))}
                </div>

                {/* Counter */}
                <div className="mb-4 mt-2 text-sm text-gray-500 dark:text-gray-300">{current + 1} / {images.length}</div>
            </div>
        </div>
    );
}
