import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Salom! Men Luck AI. Sizga qanday yordam bera olaman?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // BACKEND loyihangizning manzili
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Kechirasiz, server o'chiq ko'rinadi." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-zinc-900 shadow-2xl rounded-3xl w-[350px] h-[480px] flex flex-col border dark:border-zinc-800 mb-4"
          >
            <div className="p-4 bg-black text-white rounded-t-3xl flex justify-between items-center">
              <span className="font-bold flex items-center gap-2">
                <Bot size={18} /> Luck Assistant
              </span>
              <button onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl text-xs max-w-[80%] ${
                      m.role === "user"
                        ? "bg-[#2E3192] text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 dark:text-white"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="text-[10px] text-gray-400">
                  AI javob qaytaryapti...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 border-t dark:border-zinc-800 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Savol yozing..."
                className="flex-1 text-xs bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl outline-none dark:text-white"
              />
              <button
                onClick={sendMessage}
                className="bg-[#39B54A] text-white p-3 rounded-xl"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black dark:bg-white text-white dark:text-black p-4 rounded-full shadow-2xl"
      >
        {isOpen ? <X size={28} /> : <Bot size={28} />}
      </button>
    </div>
  );
}
