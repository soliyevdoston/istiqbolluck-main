import React, { useRef } from "react"; // To'g'ri import
import { motion } from "framer-motion";
import { ArrowRight, Target, ShieldCheck, Star, Users } from "lucide-react";

// Ma'lumotlarni import qilish
import {
  missions,
  facilities,
  galleryRow1,
  galleryRow2,
} from "../data/schoolLifeData";

export default function SchoolLife() {
  // 1. Pastdagi bo'limga ishora (Ref) yaratamiz
  const processesRef = useRef(null);

  // 2. Pastga silliq tushish funksiyasi
  const scrollToProcesses = () => {
    processesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Marquee komponenti
  const MarqueeRow = ({ items, reverse = false }) => (
    <div className="flex overflow-hidden whitespace-nowrap py-4">
      <motion.div
        animate={{ x: reverse ? [-1000, 0] : [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-6 pr-6"
      >
        {[...items, ...items].map((img, i) => (
          <div
            key={i}
            className="w-[400px] h-[300px] flex-shrink-0 overflow-hidden rounded-[2rem] bg-gray-100 dark:bg-zinc-900"
          >
            <img
              src={img}
              alt="School life"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-black transition-colors min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="max-w-7xl mx-auto px-10 pb-24 border-t border-zinc-100 dark:border-zinc-900/50">
        <div className="flex items-center gap-3 mb-8 mt-10">
          <div className="w-12 h-[2px] bg-[#39B54A]"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500">
            Bizning atmosfera
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-[130px] font-black tracking-tighter dark:text-white leading-[0.8] italic uppercase"
          >
            ICHKI <br />
            <span
              className="text-[#39B54A]"
              style={{ WebkitTextStroke: "1px currentColor", opacity: 0.6 }}
            >
              MUHIT
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:mt-10"
          >
            <p className="text-2xl md:text-3xl font-medium text-zinc-900 dark:text-zinc-300 leading-tight mb-8">
              Istiqbol Luck maktabida biz shunchaki bilim bermaymiz, biz{" "}
              <span className="text-[#39B54A]">ijodiy va do'stona</span>{" "}
              atmosfera yaratamiz.
            </p>

            <div className="space-y-6 border-l-2 border-zinc-100 dark:border-zinc-800 pl-8">
              <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                Har bir burchak o'quvchining rivojlanishi uchun xizmat qiladi.
                Bizning muhitimiz bolalarni yangi marralar sari ilhomlantiradi.
              </p>

              {/* 3. TUGMAGA FUNKSIYANI ULADIK */}
              <button
                onClick={scrollToProcesses}
                className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#2E3192] dark:text-[#39B54A] hover:gap-5 transition-all outline-none"
              >
                Jarayonlar <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- GALEREYA --- */}
      <section className="mb-32">
        <MarqueeRow items={galleryRow1} />
        <MarqueeRow items={galleryRow2} reverse={true} />
      </section>

      {/* --- VAZIFALAR --- */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <h2 className="text-4xl font-black mb-16 dark:text-white uppercase tracking-tighter">
          Bizning Vazifamiz
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {missions.map((m) => (
            <div
              key={m.id}
              className="p-12 rounded-[3rem] bg-[#e3dede] dark:bg-[#0c0c0c] border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-full mb-6 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 group-hover:scale-110 transition">
                <Target style={{ color: m.color }} size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">
                {m.title}
              </h3>
              <p className="text-gray-500 dark:text-zinc-400">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- SHAROITLAR --- */}
      <section className="bg-zinc-50 dark:bg-zinc-950 py-32 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="md:w-1/2">
              <h2 className="text-5xl font-black mb-10 dark:text-white leading-none">
                O'QUVCHILAR UCHUN <br />{" "}
                <span className="text-[#39B54A]">BARCHA SHAROITLAR</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {facilities.map((f, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1">
                      <ShieldCheck className="text-[#2E3192]" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold dark:text-white">{f.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-zinc-500">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="aspect-square bg-white dark:bg-zinc-900 rounded-[3rem] p-4 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"
                  className="w-full h-full object-cover rounded-[2.5rem]"
                  alt="Process"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-black dark:bg-white text-white dark:text-black p-10 rounded-full w-40 h-40 flex items-center justify-center text-center leading-tight font-black text-sm uppercase tracking-tighter">
                100% Xavfsiz Muhit
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- JARAYONLAR (Nishon bo'limi) --- */}
      <section
        ref={processesRef} // 4. REF NI SHU YERGA BIRIKTIRDIK
        className="max-w-7xl mx-auto px-6 py-32"
      >
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black dark:text-white mb-4 italic uppercase">
            JARAYONLAR
          </h2>
          <p className="text-gray-500 uppercase tracking-[0.3em] text-xs font-bold">
            Dars va darsdan tashqari faoliyat
          </p>
        </div>

        {/* Galereya Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 h-auto lg:h-[650px]">
          {/* 1. Katta rasm */}
          <div className="lg:col-span-2 lg:row-span-1 group relative overflow-hidden rounded-[2rem] shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="P1"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          {/* 2. Tik rasm */}
          <div className="lg:col-span-1 lg:row-span-2 group relative overflow-hidden rounded-[2rem] shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="P3"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          {/* 3. Kartochka */}
          <div className="lg:col-span-1 lg:row-span-1 bg-[#E43E1C] p-8 rounded-[2rem] text-white flex flex-col justify-center relative overflow-hidden group">
            <Star
              size={80}
              className="absolute -right-4 -top-4 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-700"
            />
            <div className="relative z-10">
              <h3 className="text-2xl font-black uppercase leading-tight mb-2">
                Amaliy
                <br />
                Bilimlar
              </h3>
              <p className="text-xs opacity-80 leading-relaxed font-medium">
                Nazariya va amaliyotning uyg'unligi.
              </p>
            </div>
          </div>

          {/* 4. Keng rasm */}
          <div className="lg:col-span-2 lg:row-span-1 group relative overflow-hidden rounded-[2rem] shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="P4"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          {/* 5. Kichik rasm */}
          <div className="lg:col-span-1 lg:row-span-1 group relative overflow-hidden rounded-[2rem] shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="P2"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        </div>
      </section>
    </div>
  );
}
