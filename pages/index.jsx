import { useState } from "react";
import LanguageSelect from "../components/LanguageSelect";

const LANGUAGES = {
  en: "English",
  az: "Azerbaijani",
  tr: "Turkish",
  fr: "French",
  de: "German",
  es: "Spanish",
  ru: "Russian",
  zh: "Chinese",
  ja: "Japanese",
  it: "Italian",
  pt: "Portuguese",
  ar: "Arabic",
  hi: "Hindi",
  pl: "Polish",
  uk: "Ukrainian",
  ko: "Korean",
};

export default function Home() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [from, setFrom] = useState("auto");
  const [to, setTo] = useState("en");

  async function handleTranslate() {
    if (!text.trim()) return;
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: from,
        target: to,
        format: "text",
      }),
    });
    const data = await res.json();
    setTranslated(data.translatedText);
  }

  function speak(text, lang = "en") {
    if (!window.speechSynthesis) return alert("Speech Synthesis not supported");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">🌍 Translate App</h1>

        <textarea
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4"
          placeholder="Enter text to translate..."
        />

        <div className="flex gap-4 mb-4">
          <LanguageSelect value={from} onChange={setFrom} languages={LANGUAGES} autoOption />
          <LanguageSelect value={to} onChange={setTo} languages={LANGUAGES} />
        </div>

        <button
          onClick={handleTranslate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Translate
        </button>

        <h2 className="text-xl font-semibold mt-6 mb-2">Result:</h2>
        <div className="min-h-[80px] border p-3 rounded bg-gray-50">{translated}</div>

        {translated && (
          <button
            onClick={() => speak(translated, to)}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            🔊 Listen
          </button>
        )}
      </div>
    </div>
  );
}
