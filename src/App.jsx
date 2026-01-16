import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Sahifalar va Komponentlar
import Header from "./components/Header";
import Footer from "./components/Footer";
import AIChat from "./components/AIChat";
import Home from "./pages/Home";
import Dtm from "./pages/Dtm";
import Team from "./pages/Team";
import Blog from "./pages/Blog";
import SchoolLife from "./pages/SchoolLife";
import BlogDetail from "./pages/BlogDetail";

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 2 soniya kutish va loadingni o'chirish
    const timer = setTimeout(() => {
      setIsLoading(false);
      // navigate("/") bu yerdan olib tashlandi!
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 1. LOADING EKRANI */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a]"
          >
            <div className="flex flex-col items-center">
              {/* LOGO AYLANISHI (Y o'qi bo'yicha) */}
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-40 h-40 md:w-56 md:h-56 flex items-center justify-center mb-8"
              >
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.opacity = "0.3";
                  }}
                />
              </motion.div>

              {/* TEKST VA PROGRESS BAR */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">
                  <span className="text-[#E43E1C]">ISTIQBOL</span>{" "}
                  <span className="text-black dark:text-white">LUCK</span>
                </h2>
                <div className="w-64 h-[2px] bg-zinc-100 dark:bg-zinc-800 mt-6 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-full bg-[#39B54A]"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. ASOSIY SAYT TARKIBI */}
      {/* Loading tugagandan keyin opacity 1 bo'ladi va turgan sahifangiz ko'rinadi */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        <Header />

        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dtm" element={<Dtm />} />
            <Route path="/team" element={<Team />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/life" element={<SchoolLife />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Routes>
        </main>

        <AIChat />
        <Footer />
      </motion.div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
