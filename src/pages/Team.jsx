import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { director, teachers, categories } from "../data/teamData.js";
import {
  X,
  Award,
  GraduationCap,
  Briefcase,
  Plus,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export default function Team() {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Tanlangan kategoriya bo'yicha filtrlash
  const filteredTeachers = teachers.filter(
    (t) => t.category === categories[activeTab].id
  );

  // Ekranda ko'rinadigan ustozlar soni (Responsive)
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(4);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Kategoriya o'zgarganda sliderni boshiga qaytarish
  useEffect(() => {
    setCurrentIndex(0);
    setIsAutoPlay(true);
  }, [activeTab]);

  // Avtomatik aylanish (3 soniya)
  useEffect(() => {
    let interval;
    if (isAutoPlay && filteredTeachers.length > itemsPerPage) {
      interval = setInterval(() => {
        handleNext();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, currentIndex, filteredTeachers, itemsPerPage]);

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = filteredTeachers.length - itemsPerPage;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const maxIndex = filteredTeachers.length - itemsPerPage;
      return prev <= 0 ? (maxIndex > 0 ? maxIndex : 0) : prev - 1;
    });
  };

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-[#050505] transition-colors min-h-screen overflow-hidden">
      {/* --- SAHIFA SARLAVHASI --- */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-black dark:text-white tracking-tighter uppercase leading-none">
            <span className="text-[#39B54A] pr-[10px]">YETAKCHI</span>
            <span className="italic font-light">Jamoa</span>
          </h1>
          <p className="text-zinc-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">
            Bizning professional jamoamiz
          </p>
        </motion.div>
      </div>

      {/* --- DIREKTOR BO'LIMI --- */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] overflow-hidden flex flex-col md:flex-row items-center border border-zinc-100 dark:border-zinc-800 shadow-sm"
        >
          <div className="md:w-2/5 h-[300px] md:h-[400px]">
            <img
              src={director.img}
              className="w-full h-full object-cover grayscale-0 transition-all duration-1000"
              alt="Director"
            />
          </div>
          <div className="md:w-3/5 p-8 md:p-14">
            <span className="text-[#E43E1C] text-[10px] font-black uppercase tracking-widest mb-3 block">
              Maktab Rahbari
            </span>
            <h2 className="text-3xl font-black dark:text-white leading-tight mb-6">
              {director.name}
            </h2>
            <p className="text-lg italic text-zinc-500 dark:text-zinc-400 mb-8 font-medium leading-relaxed">
              "{director.quote}"
            </p>
            <button
              onClick={() => setSelected(director)}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest border-b-2 border-[#39B54A] pb-1 hover:gap-4 transition-all dark:text-white"
            >
              Batafsil ma'lumot <ChevronRight size={14} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- O'QITUVCHILAR FILTR VA SLIDER --- */}
      <section className="max-w-7xl mx-auto px-6">
        {/* Kategoriya Tablari */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                activeTab === index
                  ? "bg-[#39B54A] text-white border-[#39B54A] shadow-xl shadow-green-500/20"
                  : "bg-transparent text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-[#39B54A]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Slider Konteyneri */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="flex"
            >
              {filteredTeachers.map((t) => (
                <div
                  key={t.id}
                  style={{ minWidth: `${100 / itemsPerPage}%` }}
                  className="p-3"
                >
                  <motion.div
                    whileHover={{ y: -10 }}
                    onClick={() => setSelected(t)}
                    className="group cursor-pointer bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] p-3 border border-zinc-100 dark:border-zinc-800 hover:border-[#39B54A] transition-all h-full"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                      <img
                        src={t.img}
                        className="w-full h-full object-cover grayscale-0 transition-all duration-700"
                        alt={t.name}
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Plus
                          className="text-white bg-[#39B54A] rounded-full p-3"
                          size={32}
                        />
                      </div>
                    </div>
                    <div className="mt-6 text-center pb-4">
                      <h4 className="text-lg font-black dark:text-white mb-1">
                        {t.name}
                      </h4>
                      <p className="text-[#39B54A] font-bold uppercase text-[9px] tracking-[0.2em]">
                        {t.subject}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigatsiya tugmalari */}
          {filteredTeachers.length > itemsPerPage && (
            <div className="flex justify-center gap-6 mt-12">
              <button
                onClick={() => {
                  handlePrev();
                  setIsAutoPlay(false);
                }}
                className="group p-4 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-[#39B54A] hover:border-[#39B54A] transition-all bg-white dark:bg-zinc-900 shadow-lg"
              >
                <ChevronLeft
                  className="dark:text-white group-hover:text-white"
                  size={24}
                />
              </button>
              <button
                onClick={() => {
                  handleNext();
                  setIsAutoPlay(false);
                }}
                className="group p-4 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-[#39B54A] hover:border-[#39B54A] transition-all bg-white dark:bg-zinc-900 shadow-lg"
              >
                <ChevronRight
                  className="dark:text-white group-hover:text-white"
                  size={24}
                />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-white dark:bg-black overflow-y-auto"
          >
            <button
              onClick={() => setSelected(null)}
              className="fixed top-8 right-8 z-[310] p-4 bg-zinc-100 dark:bg-zinc-800 dark:text-white rounded-full hover:rotate-90 transition-all"
            >
              <X size={24} />
            </button>

            <div className="min-h-screen flex flex-col md:flex-row">
              <div className="md:w-1/2 h-[60vh] md:h-screen sticky top-0">
                <img
                  src={selected.img}
                  className="w-full h-full object-cover"
                  alt={selected.name}
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-24 flex flex-col justify-center bg-white dark:bg-[#050505]">
                <span className="text-[#E43E1C] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
                  {selected.subject || "Mutaxassis"}
                </span>
                <h2 className="text-4xl md:text-7xl font-black dark:text-white mb-10 tracking-tighter leading-none">
                  {selected.name}
                </h2>
                <div className="space-y-8">
                  <InfoBlock
                    icon={<GraduationCap />}
                    label="Ma'lumoti"
                    value={selected.education}
                  />
                  <InfoBlock
                    icon={<Briefcase />}
                    label="Ish tajribasi"
                    value={selected.experience}
                  />
                  <InfoBlock
                    icon={<Award />}
                    label="Yutuqlari"
                    value={selected.achievements}
                  />
                </div>
                <p className="mt-12 text-xl text-zinc-500 dark:text-zinc-400 italic leading-relaxed border-t dark:border-zinc-800 pt-10">
                  {selected.bio}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const InfoBlock = ({ icon, label, value }) => (
  <div className="flex gap-6 items-start">
    <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl text-[#39B54A]">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <h4 className="font-bold text-zinc-400 uppercase text-[10px] tracking-widest mb-1">
        {label}
      </h4>
      <p className="dark:text-white font-bold text-lg leading-snug">{value}</p>
    </div>
  </div>
);
