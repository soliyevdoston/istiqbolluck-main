import React, { useState, useRef, useEffect } from "react"; // 1. useEffect qo'shildi
import { motion, useInView, animate } from "framer-motion"; // 2. useInView va animate qo'shildi
import MarqueeRow from "../components/MarqueeRow";
import {
  Phone,
  ArrowRight,
  Play,
  MapPin,
  CheckCircle2,
  Star,
} from "lucide-react";

const branches = {
  tashkent: {
    name: "Rishton filiali",
    address: "",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.912659295463!2d71.22956197613638!3d40.43293285465283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb01b0ac926783%3A0xa103cff84e3dbd4b!2sIstiqbol%20luck%20xususiy%20maktabi!5e0!3m2!1sru!2s!4v1768546214781!5m2!1sru!2s",
  },
  samarkand: {
    name: "Samarqand filiali",
    address: "Samarqand sh., Spitamen shoh ko'chasi",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3072.123456789012!2d66.9!3d39.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDM2JzAwLjAiTiA2NsKwNTQnMDAuMCJF!5e0!3m2!1suz!2s!4v1234567890",
  },
};

const advantages = [
  {
    id: "01",
    title: "Individual yondashuv",
    desc: "Har bir o'quvchi uchun maxsus rivojlanish rejasi va mentorlik tizimi.",
    color: "#39B54A",
  },
  {
    id: "02",
    title: "Xalqaro metodika",
    desc: "Kembrij va Finlyandiya ta'lim tizimi asosida tuzilgan dastur.",
    color: "#2E3192",
  },
  {
    id: "03",
    title: "Soft Skills",
    desc: "Liderlik, notuqlik va tanqidiy fikrlash darslari muntazam o'tiladi.",
    color: "#E43E1C",
  },
];

const stats = [
  { label: "O'quvchilar soni", value: "1200+" },
  { label: "Bitirganlar soni", value: "850+" },
  { label: "Tajriba yili", value: "15+" },
  { label: "O'qituvchilar", value: "60+" },
  { label: "O'qishga kirish", value: "98%" },
];

const universities = [
  "WIUT",
  "INHA",
  "TTPU",
  "AMITY",
  "MDIST",
  "AKFA",
  "WEBSTER",
  "KIUT",
  "TEAM",
  "NEW UZBEKISTAN",
  "TSUL",
  "TATU",
  "NUU",
  "HARVARD",
  "STANFORD",
  "MIT",
  "OXFORD",
  "CAMBRIDGE",
];

// Raqamlarni sanovchi komponent
const Counter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const numericPart = value.replace(/[^0-9]/g, "");
      const suffix = value.replace(/[0-9]/g, "");
      const numericValue = parseInt(numericPart, 10);

      const controls = animate(0, numericValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest) + suffix);
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
};

const Marquee = ({ items, reverse = false, type = "image" }) => (
  <div className="overflow-hidden flex whitespace-nowrap py-10 relative">
    <div
      className={`flex gap-8 ${
        reverse ? "animate-scroll-reverse" : "animate-scroll"
      }`}
    >
      {[...items, ...items, ...items].map((item, i) => (
        <div key={i} className="flex-shrink-0">
          {type === "image" ? (
            <img
              src={item}
              alt="Gallery"
              className="h-[300px] w-[450px] object-cover rounded-[2rem] shadow-2xl transition-all duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-7xl md:text-8xl font-black uppercase tracking-tighter dark:text-white/20 text-gray-100 italic">
                {item}
              </span>
              <Star className="text-[#39B54A] fill-[#39B54A]" size={30} />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default function Home() {
  const [selectedBranch, setSelectedBranch] = useState("tashkent");
  const consultRef = useRef(null);

  const scrollToConsult = () => {
    consultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white dark:bg-[#050505] transition-colors duration-500 font-sans selection:bg-[#39B54A] selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        {/* Fon rasmi qismi */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.gazeta.uz/media/img/2022/09/HE29hc16640465414375_l.jpg"
            alt="School"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center px-6 text-center text-white">
          {/* Kelajak yetakchilari - kichik sarlavha */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="w-6 h-[2px] bg-[#39B54A]"></span>
            <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-white/90">
              Kelajak yetakchilari akademiyasi
            </span>
            <span className="w-6 h-[2px] bg-[#39B54A]"></span>
          </motion.div>

          {/* ASOSIY NOM - Ixchamroq hajmda */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-6xl md:text-[90px] font-black leading-none tracking-tighter uppercase italic">
              <span className="text-[#E43E1C] drop-shadow-lg">ISTIQBOL</span>{" "}
              <span className="text-white drop-shadow-lg">LUCK</span>
            </h1>

            {/* Siz aytgan yangi matn */}
            <div className="mt-6 text-2xl md:text-5xl font-extrabold tracking-tight italic">
              Kelajak yetakchilari shu yerda <br className="hidden md:block" />
              <span className="text-[#39B54A]">kamol topadi.</span>
            </div>
          </motion.div>

          {/* Tushuntirish matni - biroz xiraroq va nafis */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-base md:text-lg font-medium max-w-2xl text-white/70 leading-relaxed"
          >
            Zamonaviy ta'lim, xalqaro metodika va professional ustozlar. Sizning
            muvaffaqiyatingiz shu yerdan boshlanadi.
          </motion.p>

          {/* Tugma */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <button
              onClick={scrollToConsult}
              className="px-10 py-4 bg-[#39B54A] text-white rounded-full font-black text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-[#2e943c] hover:scale-105 transition-all shadow-xl shadow-green-500/20"
            >
              Bog'lanish
            </button>
          </motion.div>
        </div>

        {/* Dekorativ element - pastki chiziq */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
            Scroll
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* 2. ADVANTAGES */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <h2 className="text-[#39B54A] font-bold tracking-[0.4em] uppercase text-sm mb-4 italic">
              Nega aynan biz?
            </h2>
            <p className="text-5xl font-black dark:text-white leading-none">
              AFZALLIKLARIMIZ
            </p>
          </div>
          <p className="max-w-xs text-gray-500 text-sm border-l-2 border-[#E43E1C] pl-6 italic font-medium">
            Biz har bir bolaning ichidagi yashirin qobiliyatlarni yuzaga
            chiqarish uchun bor kuchimizni safarbar etamiz.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {advantages.map((adv) => (
            <motion.div
              whileHover={{ y: -10 }}
              key={adv.id}
              className="p-12 rounded-[3rem] bg-[#e3dede] dark:bg-[#0c0c0c] border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <CheckCircle2 size={150} color={adv.color} />
              </div>
              <span
                className="text-6xl font-black italic opacity-50"
                style={{ color: adv.color }}
              >
                {adv.id}
              </span>
              <h3 className="text-3xl font-black mt-8 mb-4 dark:text-white leading-tight">
                {adv.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                {adv.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. NATIJALAR */}
      <section className="py-24 bg-zinc-50 dark:bg-[#080808] border-y dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 md:gap-8">
            {stats.map((s, i) => (
              <div key={i} className="group cursor-default">
                <h4 className="text-[10px] font-black uppercase text-zinc-400 mb-3 tracking-[0.2em] leading-tight h-8">
                  {s.label}
                </h4>
                <div className="text-5xl md:text-6xl font-black tracking-tighter text-[#2E3192] dark:text-white transition-all duration-500 group-hover:scale-110 group-hover:translate-x-1 origin-left">
                  <Counter value={s.value} />
                </div>
                <div className="w-8 h-1 bg-[#39B54A] mt-4 transition-all duration-500 group-hover:w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MAKTAB HAYOTI */}
      <section className="py-32 overflow-hidden bg-white dark:bg-[#050505]">
        <h2 className="text-center text-6xl font-black mb-20 dark:text-white tracking-tighter italic">
          MAKTAB <span className="text-[#39B54A]">HAYOTI</span>
        </h2>
        <Marquee
          items={[
            "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800",
            "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
          ]}
        />
        <Marquee
          reverse
          items={[
            "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800",
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
            "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800",
          ]}
        />
      </section>

      {/* 5. UNIVERSITETLAR */}
      <section className="py-24 bg-white dark:bg-[#050505] overflow-hidden border-y border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-10 mb-16">
          <div className="grid md:grid-cols-2 gap-10 items-end">
            <div>
              <h4 className="text-[#39B54A] font-bold tracking-[0.4em] uppercase text-[10px] mb-4 italic">
                Muvaffaqiyatli bitiruvchilar
              </h4>
              <h2 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter text-zinc-900 dark:text-white">
                TALABALARIMIZ <br />
                <span className="text-[#2E3192] italic">ENG NUFUZLI</span>{" "}
                <br />
                OLIGOHLARDA.
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed border-l-2 border-[#E43E1C] pl-6 italic font-medium">
                Har yili bitiruvchilarimizning 98% dan ortig'i O'zbekistondagi
                va xorijdagi eng nufuzli xalqaro universitetlarga grant asosida
                qabul qilinmoqda.
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <MarqueeRow items={universities} type="text" />
          <div className="opacity-40">
            <MarqueeRow items={universities} reverse type="text" />
          </div>
        </div>
      </section>

      {/* 6. KONSULTATSIYA */}
      <section ref={consultRef} className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 bg-[#e3dede] dark:bg-[#0c0c0c] p-16 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-black/10">
            <div>
              <h2 className="text-7xl font-black mb-6 dark:text-white leading-[0.9]">
                QO'SHILISH VAQTI <span className="text-[#E43E1C]">KELDI.</span>
              </h2>
              <p className="text-xl text-gray-500 dark:text-gray-400">
                Mutaxassislarimiz barcha savollaringizga javob berishadi.
              </p>
            </div>

            <div className="grid gap-4">
              <input
                type="text"
                placeholder="To'liq ismingiz"
                className="w-full p-6 bg-zinc-50 dark:bg-[#0c0c0c] border border-zinc-200 dark:border-zinc-800 dark:text-white rounded-[2rem] outline-none focus:border-[#39B54A] transition-all text-lg font-bold"
              />
              <input
                type="text"
                placeholder="+998 (__) ___-__-__"
                className="w-full p-6 bg-zinc-50 dark:bg-[#0c0c0c] border border-zinc-200 dark:border-zinc-800 dark:text-white rounded-[2rem] outline-none focus:border-[#2E3192] transition-all text-lg font-bold"
              />
              <div className="relative">
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full p-6 bg-zinc-50 dark:bg-[#0c0c0c] border border-zinc-200 dark:border-zinc-800 dark:text-white rounded-[2rem] outline-none focus:border-[#39B54A] transition-all text-lg font-bold appearance-none cursor-pointer"
                >
                  <option value="tashkent">Rishton filiali</option>
                  <option value="samarkand">Samarqand filiali</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                  <ArrowRight className="rotate-90" size={20} />
                </div>
              </div>
              <button className="w-full p-8 bg-[#39B54A] text-white font-black rounded-[2rem] hover:bg-[#2E3192] transition-all uppercase tracking-widest text-xl shadow-2xl shadow-green-500/20">
                Ariza topshirish
              </button>
            </div>
          </div>

          <div className="relative h-[710px] group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2E3192] to-[#39B54A] rounded-[4rem] rotate-3 scale-95 opacity-20 group-hover:rotate-0 transition-transform duration-700"></div>
            <div className="relative h-full w-full bg-zinc-50 dark:bg-[#0c0c0c] rounded-[4rem] overflow-hidden shadow-3xl border-4 border-white dark:border-zinc-800">
              <iframe
                title="Branch Map"
                src={branches[selectedBranch].map}
                className="w-full h-full grayscale-0 dark:invert dark:opacity-80"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
              <div className="absolute top-8 left-8 right-8 z-10 bg-white/90 dark:bg-black/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20 flex items-center gap-5">
                <div className="w-14 h-14 bg-[#39B54A] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-green-500/30">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black dark:text-white uppercase leading-none mb-2">
                    {branches[selectedBranch].name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {branches[selectedBranch].address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scroll-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-scroll { animation: scroll 40s linear infinite; }
        .animate-scroll-reverse { animation: scroll-reverse 40s linear infinite; }
      `,
        }}
      />
    </div>
  );
}
