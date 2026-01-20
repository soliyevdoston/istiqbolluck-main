import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, Instagram, Send, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Biz haqimizda" },
    { to: "/dtm", label: "Dtm" },
    { to: "/life", label: "Maktab hayoti" },
    { to: "/team", label: "Jamoamiz" },
    { to: "/blog", label: "Blog" },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-[100] h-16 md:h-20 flex items-center justify-between px-3 md:px-10 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-zinc-900 transition-all">
        {/* LOGO (Chiziqsiz, toza holatda) */}
        <Link
          to="/"
          onClick={scrollToTop}
          className="flex gap-1.5 min-[450px]:gap-2 md:gap-[10px] items-center italic tracking-tighter shrink-0 transition-all"
        >
          <img
            className="w-6 h-6 min-[450px]:w-8 min-[450px]:h-8 md:w-10 md:h-10 object-contain transition-all"
            src="/logo.svg"
            alt="Logo"
          />
          <div className="leading-none flex flex-col min-[450px]:flex-row min-[450px]:gap-1">
            <span className="text-[#E43E1C] font-black text-[11px] min-[450px]:text-sm md:text-2xl transition-all">
              ISTIQBOL
            </span>
            <span className="text-[#2E3192] dark:text-white font-black text-[11px] min-[450px]:text-sm md:text-2xl transition-all">
              LUCK
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV (Linklar tagiga chiziq chizish) */}
        <nav className="hidden lg:flex gap-6 xl:gap-10 font-bold text-[11px] uppercase tracking-widest">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={scrollToTop}
              className={({ isActive }) => `
                relative py-1 transition-colors hover:text-[#39B54A] group
                ${isActive ? "text-[#39B54A]" : "text-gray-600 dark:text-gray-300"}
              `}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {/* Silliq chiziq effekti */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#39B54A] transition-all duration-300 
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  ></span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-1.5 md:gap-4">
          <ThemeToggle />

          <a
            href="tel:+998901234567"
            className="font-black text-sm text-[#2E3192] dark:text-white hidden xl:block hover:text-[#E43E1C] transition-all"
          >
            +998 90 123 45 67
          </a>

          <a
            href="tel:+998901234567"
            className="bg-[#39B54A] text-white p-2 md:p-3 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all"
          >
            <Phone size={16} className="md:w-5 md:h-5" fill="currentColor" />
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1.5 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY (Ixcham) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-[75%] max-w-[300px] bg-white dark:bg-[#0a0a0a] z-[120] p-6 flex flex-col shadow-2xl shadow-black/20"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Menu
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full"
                >
                  <X size={18} className="dark:text-white" />
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={scrollToTop}
                    className={({ isActive }) => `
                      text-lg font-black uppercase italic tracking-tighter transition-all py-1
                      ${isActive ? "text-[#39B54A] border-l-4 border-[#39B54A] pl-3" : "text-zinc-800 dark:text-white border-l-0 pl-0"}
                    `}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-auto pt-6 border-t dark:border-zinc-800 space-y-6">
                <div className="space-y-1">
                  <a
                    href="tel:+998901234567"
                    className="text-lg font-black block dark:text-white"
                  >
                    +998 90 123 45 67
                  </a>
                  <p className="text-xs text-zinc-500 font-medium italic underline">
                    info@istiqbol.uz
                  </p>
                </div>
                <div className="flex gap-3">
                  {[Instagram, Send, Youtube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-9 h-9 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center dark:text-white hover:bg-[#39B54A] hover:text-white transition-all"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
