import { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function AiChat() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Merhaba! Bana Cüneyt ile ilgili soru sormak ister misin?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const res = await fetch("http://localhost:3001/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: input }),
            });
            const data = await res.json();
            const reply =
                data.reply ||
                data.choices?.[0]?.message?.content ||
                "Bot şu anda cevap veremiyor.";
            setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
        } catch {
            setMessages((prev) => [...prev, { sender: "bot", text: "Hata oluştu." }]);
        } finally {
            setIsTyping(false);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // 💡 Anahtar kelime kontrolü
    const getLink = (text: string) => {
        const lower = text.toLowerCase();
        if (lower.includes("projeler") || lower.includes("project")) return "/projects";
        if (lower.includes("hakkımda") || lower.includes("about")) return "/about";
        return null;
    };

    return (
        <>
            {/* Açma Butonu */}
            <button
                className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition z-50"
                onClick={() => setOpen(!open)}
            >
                {open ? <X /> : <MessageCircle />}
            </button>

            {/* Chat Kutusu */}
            {open && (
                <div className="fixed bottom-20 right-4 
    w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] 
    max-w-[420px] h-[450px]
    bg-white/90 backdrop-blur-md border border-gray-300 shadow-2xl rounded-2xl flex flex-col z-50 transition-all duration-300">

                    {/* Header */}
                    <div className="bg-indigo-600 text-white px-5 py-3 font-semibold flex justify-between items-center rounded-t-2xl">
                        <span className="tracking-wide text-base">💬 Sohbet Asistanı</span>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-white hover:text-gray-300 transition-colors text-lg"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Mesajlar */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
                        {messages.map((msg, i) => {
                            const route = msg.sender === "bot" ? getLink(msg.text) : null;
                            return (
                                <div
                                    key={i}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] px-4 py-2 rounded-xl leading-relaxed tracking-normal shadow-md text-sm
                ${msg.sender === "user"
                                                ? "bg-indigo-600 text-white rounded-br-sm"
                                                : "bg-gray-100 text-gray-900 rounded-bl-sm"
                                            }`}
                                    >
                                        {msg.text}
                                        {route && (
                                            <div className="mt-2">
                                                <Link
                                                    to={route}
                                                    className="text-indigo-600 underline text-xs hover:text-indigo-800"
                                                >
                                                    {route === "/projects"
                                                        ? "👉 Projelerimi Gör"
                                                        : "ℹ️ Hakkımda Sayfasına Git"}
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm animate-pulse">
                                    Yazıyor...
                                </div>
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </div>

                    {/* Giriş Alanı */}
                    <div className="p-4 border-t bg-white/80 rounded-b-2xl flex gap-2">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Bir şey yazın..."
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
                            rows={1}
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm"
                        >
                            Gönder
                        </button>
                    </div>
                </div>
            )}

        </>
    );
}
