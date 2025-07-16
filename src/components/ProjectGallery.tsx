import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ProjectGallery({
    images = [],
    onClose
}: {
    images: string[];
    onClose: () => void;
}) {
    const [index, setIndex] = useState(0);
    if (!images || images.length === 0) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={onClose}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-[95vw] max-h-[90vh] flex flex-col items-center justify-center">
                    <div className="text-gray-600 dark:text-gray-300">No images found.</div>
                    <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded" onClick={onClose}>Kapat</button>
                </div>
            </div>
        );
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-xl relative w-full max-w-3xl flex flex-col items-center"
                style={{ maxHeight: "90vh" }}
                onClick={e => e.stopPropagation()}
            >
                {/* Close */}
                <button className="absolute top-2 right-2 text-gray-400 hover:text-indigo-600" onClick={onClose}><X size={28} /></button>
                {/* Image viewer */}
                <div className="flex items-center w-full justify-center">
                    <button
                        className="p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-gray-800"
                        onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                        aria-label="Önceki"
                    >
                        <ChevronLeft />
                    </button>
                    <img
                        src={images[index]}
                        alt={`Project Image ${index + 1}`}
                        className="max-h-[60vh] max-w-[75vw] rounded-lg object-contain mx-4"
                        style={{ boxShadow: "0 2px 32px 0 rgba(0,0,0,.25)" }}
                    />
                    <button
                        className="p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-gray-800"
                        onClick={() => setIndex((i) => (i + 1) % images.length)}
                        aria-label="Sonraki"
                    >
                        <ChevronRight />
                    </button>
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">{index + 1} / {images.length}</div>
            </div>
        </div>
    );
}
