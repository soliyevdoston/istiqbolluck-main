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
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            // Kenglik va balandlik responsivligi
            className="bg-white dark:bg-zinc-900 shadow-2xl rounded-[2rem] 
                       w-[calc(100vw-2rem)] sm:w-[350px] 
                       h-[450px] sm:h-[500px] max-h-[70vh] sm:max-h-[80vh]
                       flex flex-col border border-zinc-100 dark:border-zinc-800 mb-4 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 bg-zinc-900 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#39B54A] rounded-full flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Luck Assistant</span>
                  <span className="text-[10px] text-green-400 font-medium">
                    Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1.5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl text-[13px] leading-relaxed max-w-[85%] shadow-sm ${
                      m.role === "user"
                        ? "bg-[#2E3192] text-white rounded-br-none"
                        : "bg-zinc-100 dark:bg-zinc-800 dark:text-white rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 italic">
                  <div className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                  Luck AI o'ylamoqda
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 border-t dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex gap-2 shrink-0">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Savolingizni yozing..."
                className="flex-1 text-sm bg-white dark:bg-zinc-800 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 outline-none focus:border-[#39B54A] dark:text-white transition-all shadow-inner"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="bg-[#39B54A] hover:bg-[#2e943c] disabled:opacity-50 text-white p-3 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center shrink-0"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden group border-4 border-white dark:border-zinc-900"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              className="flex items-center justify-center"
            >
              <Bot size={28} />
              {/* Pulsing indicator for online status */}
              <span className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
