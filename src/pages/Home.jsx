import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import MarqueeRow from "../components/MarqueeRow";
import {
  Phone,
  ArrowRight,
  Play,
  MapPin,
  CheckCircle2,
  Star,
} from "lucide-react";

// --- 1. DOIMIY MA'LUMOTLAR (DATA) ---

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

const studentFeedbacks = [
  {
    id: 1,
    name: "Lola Abdullayeva",
    role: "11-sinf bitiruvchisi",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
    message:
      "Bu maktab menga nafaqat bilim, balki haqiqiy do'stlar va liderlik qobiliyatini berdi. Hozirda xalqaro universitet talabasiman!",
  },
  {
    id: 2,
    name: "Asadbek Orifov",
    role: "10-sinf o'quvchisi",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800",
    message:
      "Mentorlar bilan ishlash tizimi juda yoqadi. Har bir savolimga istalgan vaqtda javob olaman. Muhit juda kreativ.",
  },
  {
    id: 3,
    name: "Jasur Mirzayev",
    role: "9-sinf o'quvchisi",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800",
    message:
      "Xalqaro olimpiadalarga tayyorgarlik ko'rish uchun bu yerdagidan yaxshiroq joy topa olmasligimga aminman.",
  },
];

const branches = {
  tashkent: {
    name: "Rishton filiali",
    address: "Farg'ona viloyati, Rishton tumani",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.912659295463!2d71.22956197613638!3d40.43293285465283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb01b0ac926783%3A0xa103cff84e3dbd4b!2sIstiqbol%20luck%20xususiy%20maktabi!5e0!3m2!1sru!2s!4v1768546214781!5m2!1sru!2s",
  },
};

const universities = [
  "WIUT",
  "INHA",
  "TTPU",
  "AMITY",
  "MDIST",
  "AKFA",
  "WEBSTER",
  "HARVARD",
  "STANFORD",
  "MIT",
];

// --- 2. YORDAMCHI KOMPONENTLAR ---

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
        onUpdate: (latest) => setDisplayValue(Math.floor(latest) + suffix),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
};

const VideoFeedbackCard = ({ feedback }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col gap-6 group w-full">
      <div
        className="relative h-[400px] md:h-[450px] w-full rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl cursor-pointer bg-black"
        onClick={() => setIsPlaying(true)}
      >
        {!isPlaying ? (
          <>
            <img
              src={feedback.thumbnail}
              alt={feedback.name}
              className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-125 transition-all">
                <Play className="text-white fill-white ml-1" size={32} />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
              <p className="font-black text-xl md:text-2xl italic uppercase tracking-tighter leading-none mb-1">
                {feedback.name}
              </p>
              <p className="text-[#39B54A] font-bold text-[10px] md:text-xs uppercase tracking-widest">
                {feedback.role}
              </p>
            </div>
          </>
        ) : (
          <video
            src={feedback.videoUrl}
            className="w-full h-full object-cover"
            controls
            autoPlay
          />
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-[#e3dede] dark:bg-[#0c0c0c] border border-zinc-200 dark:border-zinc-800 shadow-sm"
      >
        <div className="absolute -top-3 left-10 w-6 h-6 bg-[#e3dede] dark:bg-[#0c0c0c] rotate-45 border-l border-t border-zinc-200 dark:border-zinc-800"></div>
        <p className="text-gray-600 dark:text-gray-400 font-medium italic leading-relaxed text-sm md:text-lg text-left">
          "{feedback.message}"
        </p>
      </motion.div>
    </div>
  );
};

const Marquee = ({ items, reverse = false }) => (
  <div className="overflow-hidden flex whitespace-nowrap py-10 relative w-full">
    <div
      className={`flex gap-4 md:gap-8 ${reverse ? "animate-scroll-reverse" : "animate-scroll"}`}
    >
      {[...items, ...items, ...items, ...items].map((item, i) => (
        <div key={i} className="flex-shrink-0">
          <img
            src={item}
            alt="Gallery"
            className="h-[200px] md:h-[300px] w-[300px] md:w-[450px] object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-2xl transition-all duration-500 hover:scale-105"
          />
        </div>
      ))}
    </div>
  </div>
);

// --- 3. ASOSIY HOME KOMPONENTI ---

export default function Home() {
  const consultRef = useRef(null);
  const scrollToConsult = () =>
    consultRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="w-full bg-white dark:bg-[#050505] transition-colors duration-500 font-sans overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.gazeta.uz/media/img/2022/09/HE29hc16640465414375_l.jpg"
            alt="School"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <span className="w-6 h-[2px] bg-[#39B54A]"></span>
            <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase">
              Kelajak yetakchilari akademiyasi
            </span>
            <span className="w-6 h-[2px] bg-[#39B54A]"></span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-[90px] font-black leading-none tracking-tighter uppercase italic">
              <span className="text-[#E43E1C] drop-shadow-lg text-6xl md:text-[110px]">
                ISTIQBOL
              </span>{" "}
              <br className="md:hidden" />
              <span className="text-white drop-shadow-lg">LUCK</span>
            </h1>
            <div className="mt-6 text-xl md:text-5xl font-extrabold tracking-tight italic">
              Kelajak yetakchilari shu yerda <br className="hidden md:block" />
              <span className="text-[#39B54A]">kamol topadi.</span>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-sm md:text-lg font-medium max-w-2xl mx-auto text-white/70 italic leading-relaxed px-4"
          >
            Zamonaviy ta'lim, xalqaro metodika va professional ustozlar. Sizning
            muvaffaqiyatingiz shu yerdan boshlanadi.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <button
              onClick={scrollToConsult}
              className="px-8 py-4 bg-[#39B54A] text-white rounded-full font-black text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-[#2e943c] hover:scale-105 transition-all shadow-xl shadow-green-500/20"
            >
              Bog'lanish
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. ADVANTAGES */}
      <section className="w-full py-20 md:py-32 bg-white dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6 text-left">
            <div>
              <h2 className="text-[#39B54A] font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm mb-4 italic">
                Nega aynan biz?
              </h2>
              <p className="text-4xl md:text-6xl font-black dark:text-white uppercase leading-none tracking-tighter">
                Afzalliklarimiz
              </p>
            </div>
            <p className="max-w-xs text-gray-500 border-l-2 border-[#E43E1C] pl-6 italic font-medium text-sm md:text-base">
              Har bir bolaning yashirin qobiliyatlarini yuzaga chiqaramiz.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-left">
            {advantages.map((adv) => (
              <motion.div
                whileHover={{ y: -10 }}
                key={adv.id}
                className="p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] bg-[#e3dede] dark:bg-[#0c0c0c] border border-zinc-100 dark:border-zinc-800 transition-all group relative overflow-hidden"
              >
                <span
                  className="text-5xl md:text-6xl font-black italic opacity-30"
                  style={{ color: adv.color }}
                >
                  {adv.id}
                </span>
                <h3 className="text-2xl md:text-3xl font-black mt-6 md:mt-8 mb-4 dark:text-white leading-tight">
                  {adv.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg leading-relaxed">
                  {adv.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NATIJALAR */}
      <section className="w-full py-16 md:py-24 bg-zinc-50 dark:bg-[#080808] border-y dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="group cursor-default text-left">
              <h4 className="text-[9px] md:text-[10px] font-black uppercase text-zinc-400 mb-2 md:mb-3 tracking-[0.2em] h-auto md:h-8 leading-tight">
                {s.label}
              </h4>
              <div className="text-4xl md:text-6xl font-black text-[#2E3192] dark:text-white transition-all group-hover:scale-110 origin-left tracking-tighter">
                <Counter value={s.value} />
              </div>
              <div className="w-6 h-1 bg-[#39B54A] mt-3 md:mt-4 group-hover:w-12 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MAKTAB HAYOTI */}
      <section className="w-full py-20 md:py-32 bg-white dark:bg-[#050505]">
        <div className="w-full text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-12 md:mb-20 dark:text-white italic uppercase tracking-tighter px-4">
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
        </div>
      </section>

      {/* 5. O'QUVCHILAR OVOZI */}
      <section className="w-full py-20 md:py-32 bg-white dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16 md:mb-24">
            <h4 className="text-[#39B54A] font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm mb-4 italic">
              Samimiy fikrlar
            </h4>
            <h2 className="text-4xl md:text-7xl font-black dark:text-white tracking-tighter italic uppercase text-center">
              O'QUVCHILARIMIZ <span className="text-[#E43E1C]">OVOZI</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 md:gap-12 text-left">
            {studentFeedbacks.map((feedback) => (
              <VideoFeedbackCard key={feedback.id} feedback={feedback} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. UNIVERSITETLAR */}
      <section className="w-full py-20 md:py-32 bg-white dark:bg-[#050505] border-y border-zinc-100 dark:border-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center mb-16 md:mb-20">
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#39B54A] font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm mb-4 italic"
          >
            Katta kelajak sari
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black dark:text-white tracking-tighter italic uppercase leading-tight md:leading-[0.9]"
          >
            BITIRUVCHILARIMIZ <br />{" "}
            <span className="text-[#2E3192]">NUFUZLI</span> OLIGOHLARDA
          </motion.h2>
          <p className="mt-6 md:mt-8 text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium italic text-sm md:text-base px-4">
            O'quvchilarimiz dunyoning eng top universitetlariga muddatidan oldin
            grant asosida qabul qilinmoqda.
          </p>
        </div>
        <div className="w-full relative">
          <MarqueeRow items={universities} />
          <div className="opacity-30 mt-4 md:mt-8">
            <MarqueeRow items={universities} reverse />
          </div>
        </div>
      </section>

      {/* 7. KONSULTATSIYA */}
      <section
        ref={consultRef}
        className="w-full py-20 md:py-32 bg-white dark:bg-[#050505]"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="bg-[#e3dede] dark:bg-[#0c0c0c] p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border dark:border-zinc-800 shadow-2xl text-left">
              <h2 className="text-4xl md:text-7xl font-black mb-6 dark:text-white uppercase leading-[0.9] tracking-tighter">
                QO'SHILISH VAQTI <span className="text-[#E43E1C]">KELDI.</span>
              </h2>
              <div className="grid gap-3 md:gap-4 mt-8 md:mt-10">
                <input
                  type="text"
                  placeholder="To'liq ismingiz"
                  className="w-full p-5 md:p-6 bg-white/50 dark:bg-black border dark:border-zinc-800 rounded-[1.5rem] md:rounded-[2rem] font-bold outline-none focus:border-[#39B54A] text-sm md:text-base"
                />
                <input
                  type="text"
                  placeholder="Telefon raqamingiz"
                  className="w-full p-5 md:p-6 bg-white/50 dark:bg-black border dark:border-zinc-800 rounded-[1.5rem] md:rounded-[2rem] font-bold outline-none focus:border-[#39B54A] text-sm md:text-base"
                />
                <button className="w-full p-3 md:p-4 bg-[#39B54A] text-white font-black rounded-[1.5rem] md:rounded-[2rem] uppercase tracking-widest text-base md:text-xl hover:bg-[#2E3192] transition-all">
                  Ariza topshirish
                </button>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[700px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border-4 border-white dark:border-zinc-800 shadow-3xl">
              <iframe
                title="Map"
                src={branches.tashkent.map}
                className="w-full h-full grayscale dark:invert dark:opacity-70"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
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
