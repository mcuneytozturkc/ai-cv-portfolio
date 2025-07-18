import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.post("/api/chat", async (req, res) => {
  const { prompt, lang = "tr" } = req.body;

  const { tech_stack, about_name, projects_name, projectDescriptions } = getTranslationByLang(lang, __dirname);

  try {
    console.log("🔹 OpenAI'ya istek gönderiliyor...");
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Cuneyt Portfolio Chat"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `
Sen sadece Cüneyt Öztürk'ün kişisel portfolyosu hakkında bilgi veren yardımcı bir botsun.

Cüneyt Öztürk, kullanıcı deneyimini ve temiz kodu ön planda tutan bir yazılım geliştiricisidir. Ağırlıklı olarak şu teknolojileri kullanır: ${tech_stack}

Aşağıda bazı örnek projeleri yer alıyor:
${projectDescriptions}

📌 Kullanıcının sorduğu sorular sadece yukarıdaki projeler, kullandığı teknolojiler veya hakkında sayfasındaki bilgilerle ilgili olmalı. Alakasız bir konu sorulursa nazikçe reddet ve şu sayfalara yönlendir:
${about_name} (hakkında), ${projects_name} (projeleri)

💡 Cevaplarında:
- Kısa ama etkileyici ol (maksimum 50 kelime)
- Cüneyt'i gerçek bilgilerle öv, özgün bir ton kullan
- Gereksiz tekrar ve bağlantı verme, yönlendirmeyi gerektiğinde tek seferde yap

🎯 Amaç: Kullanıcıyı hem bilgilendir hem de portfolyo sayfalarına yönlendir.

`
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await openaiRes.json();
    console.log("🔹 OpenAI yanıtı:", data);
    const reply = data.choices?.[0]?.message?.content || "Bot şu anda cevap veremiyor.";
    res.json({ reply });
  } catch (err) {
    console.error("❌ API hatası:", err);
    res.status(500).json({ error: "OpenAI çağrısı başarısız oldu.", detail: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`✅ OpenAI Chat API hazır: http://localhost:${PORT}`));

function getTranslationByLang(lang, __dirname) {
  const langFile = path.join(__dirname, "..", "src", "locales", lang, "translation.json");

  try {
    const raw = fs.readFileSync(langFile, "utf-8");
    const data = JSON.parse(raw);

    const about_name = data.about || "About";
    const projects_name = data.projects || "Projects";

    const projectsPath = path.join(__dirname, "..", "src", "data", "projects.json");
    let projectDescriptions = "";

    if (fs.existsSync(projectsPath)) {
      const rawProjects = fs.readFileSync(projectsPath, "utf-8");
      const projects = JSON.parse(rawProjects);

      const maxProjects = 5;

      const limitedProjects = projects.slice(0, maxProjects);

      projectDescriptions = limitedProjects.map(p => {
        const title = p.title[lang] || p.title.tr;
        const description = (p.description[lang] || p.description.tr).trim();

        // Açıklamayı max 140 karakterle sınırlayalım
        const shortDesc = description.length > 140 ? description.slice(0, 137) + "..." : description;

        const tech = p.tech.join(", ");
        return `- **${title}**: ${shortDesc} (Kullanılan teknolojiler: ${tech})`;
      }).join("\n");

    } else {
      console.error("❌ Proje dosyası bulunamadı:", projectsPath);
    }

    return {
      tech_stack: data.tech_stack || "",
      about_name: about_name,
      projects_name: projects_name,
      projectDescriptions: projectDescriptions || "Proje açıklamaları bulunamadı."
    };

  } catch (err) {
    console.error(`❌ ${lang} çeviri dosyası okunamadı:`, err);
    return {
      tech_stack: "",
      about: "",
      projects: "",
      projectDescriptions: ""
    };
  }
}

