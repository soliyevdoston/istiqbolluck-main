import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import MarqueeRow from "../components/MarqueeRow";
import {
  Phone,
  ArrowRight,
  Play,
  MapPin,
  CheckCircle2,
  Star,
  Loader2,
  CheckCircle,
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
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white text-left">
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

  // Telegram Form States
  const [formData, setFormData] = useState({ name: "", phone: "+998" });
  const [status, setStatus] = useState("idle"); // idle, loading, success

  const scrollToConsult = () =>
    consultRef.current?.scrollIntoView({ behavior: "smooth" });

  // Telefon maskasi
  const handlePhoneChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith("+998")) val = "+998";
    const digits = val.replace(/\D/g, "").substring(3, 12);
    let formatted = "+998";
    if (digits.length > 0) formatted += " " + digits.substring(0, 2);
    if (digits.length > 2) formatted += " " + digits.substring(2, 5);
    if (digits.length > 5) formatted += " " + digits.substring(5, 7);
    if (digits.length > 7) formatted += " " + digits.substring(7, 9);
    setFormData({ ...formData, phone: formatted });
  };

  // Telegramga yuborish
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length < 17) {
      alert("Iltimos, telefon raqamingizni to'liq kiriting!");
      return;
    }

    setStatus("loading");

    const BOT_TOKEN = "7893849239:AAEalenahp_ar51YDUBYu5Fr6SazLgGu7dI";
    const CHAT_ID = "8389397224"; // <--- SHU YERGA ID YOZING

    const message = `
🚀 *YANGI ARIZA KELDI!*
━━━━━━━━━━━━━━
👤 *Ism:* ${formData.name}
📞 *Telefon:* ${formData.phone}
📅 *Sana:* ${new Date().toLocaleString("uz-UZ")}
━━━━━━━━━━━━━━
    `;

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown",
          }),
        },
      );

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "+998" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error();
      }
    } catch (err) {
      alert("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
      setStatus("idle");
    }
  };

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
            className="mb-6 flex items-center justify-center gap-3 tracking-[0.3em] font-black text-[10px] md:text-xs"
          >
            <span className="w-6 h-[2px] bg-[#39B54A]"></span> KELAJAK
            YETAKCHILARI AKADEMIYASI{" "}
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
              className="px-12 py-5 bg-[#39B54A] text-white rounded-full font-black text-xs md:text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-xl shadow-green-500/20 active:scale-95"
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
              <h2 className="text-[#39B54A] font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm mb-4 italic text-left">
                Nega aynan biz?
              </h2>
              <p className="text-4xl md:text-6xl font-black dark:text-white uppercase leading-none tracking-tighter text-left">
                Afzalliklarimiz
              </p>
            </div>
            <p className="max-w-xs text-gray-500 border-l-2 border-[#E43E1C] pl-6 italic font-medium text-sm md:text-base text-left">
              Har bir bolaning yashirin qobiliyatlarini yuzaga chiqaramiz.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {advantages.map((adv) => (
              <motion.div
                whileHover={{ y: -10 }}
                key={adv.id}
                className="p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] bg-[#e3dede] dark:bg-[#0c0c0c] border border-zinc-100 dark:border-zinc-800 transition-all group relative overflow-hidden text-left"
              >
                <span
                  className="text-5xl md:text-6xl font-black italic opacity-30"
                  style={{ color: adv.color }}
                >
                  {adv.id}
                </span>
                <h3 className="text-2xl md:text-3xl font-black mt-6 md:mt-8 mb-4 dark:text-white leading-tight text-left">
                  {adv.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg leading-relaxed text-left">
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
              <div className="w-6 h-1 bg-[#39B54A] mt-3 md:mt-4 group-hover:w-12 transition-all"></div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MAKTAB HAYOTI */}
      <section className="w-full py-20 md:py-32 bg-white dark:bg-[#050505]">
        <div className="w-full text-center px-4">
          <h2 className="text-4xl md:text-6xl font-black mb-12 md:mb-20 dark:text-white italic uppercase tracking-tighter">
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="mb-16 md:mb-24">
            <h4 className="text-[#39B54A] font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm mb-4 italic">
              Samimiy fikrlar
            </h4>
            <h2 className="text-4xl md:text-7xl font-black dark:text-white tracking-tighter italic uppercase">
              O'QUVCHILARIMIZ <span className="text-[#E43E1C]">OVOZI</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {studentFeedbacks.map((feedback) => (
              <VideoFeedbackCard key={feedback.id} feedback={feedback} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. UNIVERSITETLAR */}
      <section className="py-20 md:py-32 border-y border-zinc-100 dark:border-zinc-900 overflow-hidden bg-white dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16 md:mb-20">
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
          <p className="mt-8 text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium italic text-sm md:text-base">
            O'quvchilarimiz dunyoning eng top universitetlariga muddatidan oldin
            grant asosida qabul qilinmoqda.
          </p>
        </div>
        <div className="w-full relative">
          <MarqueeRow items={universities} />
          <div className="opacity-30 mt-8">
            <MarqueeRow items={universities} reverse />
          </div>
        </div>
      </section>

      {/* 7. KONSULTATSIYA (YANGILANGAN) */}
      <section
        ref={consultRef}
        className="w-full py-20 md:py-32 bg-white dark:bg-[#050505]"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* FORM QISMI */}
            <div className="bg-[#e3dede] dark:bg-[#0c0c0c] p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border dark:border-zinc-800 shadow-2xl text-left relative overflow-hidden">
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-20 bg-[#39B54A] flex flex-col items-center justify-center text-white text-center p-6"
                  >
                    <CheckCircle size={80} className="mb-4 animate-bounce" />
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter">
                      Qabul qilindi!
                    </h3>
                    <p className="font-bold mt-2 opacity-90">
                      Tez orada siz bilan bog'lanamiz.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <h2 className="text-4xl md:text-7xl font-black mb-6 dark:text-white uppercase leading-[0.9] tracking-tighter text-left">
                QO'SHILISH VAQTI <span className="text-[#E43E1C]">KELDI.</span>
              </h2>

              <form
                onSubmit={handleSubmit}
                className="grid gap-3 md:gap-4 mt-8 md:mt-10"
              >
                <input
                  required
                  type="text"
                  placeholder="Ismingizni kiriting"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-5 md:p-6 bg-white/70 dark:bg-black border-2 border-transparent dark:border-zinc-800 rounded-[1.5rem] md:rounded-[2rem] font-bold outline-none focus:border-[#39B54A] dark:text-white transition-all text-sm md:text-base"
                />

                <input
                  required
                  type="text"
                  placeholder="+998 __ ___ __ __"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="w-full p-5 md:p-6 bg-white/70 dark:bg-black border-2 border-transparent dark:border-zinc-800 rounded-[1.5rem] md:rounded-[2rem] font-bold outline-none focus:border-[#39B54A] dark:text-white transition-all text-sm md:text-base tracking-wider"
                />

                <button
                  disabled={status === "loading"}
                  type="submit"
                  className="w-full p-6 md:p-8 bg-[#39B54A] text-white font-black rounded-[1.5rem] md:rounded-[2rem] uppercase tracking-widest text-base md:text-xl hover:bg-black transition-all shadow-xl shadow-green-500/10 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      {" "}
                      <Loader2 className="animate-spin" /> Yuborilmoqda...{" "}
                    </>
                  ) : (
                    "Ariza topshirish"
                  )}
                </button>
              </form>

              <div className="absolute -bottom-10 -right-10 text-[12rem] font-black text-black/[0.03] dark:text-white/[0.03] pointer-events-none select-none italic uppercase">
                LUCK
              </div>
            </div>

            {/* XARITA QISMI */}
            <div className="relative h-[400px] md:h-[700px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border-4 border-white dark:border-zinc-800 shadow-3xl">
              <iframe
                title="Map"
                src={branches.tashkent.map}
                className="w-full h-full grayscale dark:invert dark:opacity-70"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="absolute top-6 left-6 right-6 bg-white/90 dark:bg-black/90 backdrop-blur-md p-4 md:p-6 rounded-3xl flex items-center gap-4 md:gap-5 shadow-2xl border border-white/20">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#39B54A] rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <MapPin size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-black dark:text-white uppercase leading-none mb-1">
                    {branches.tashkent.name}
                  </h3>
                  <p className="text-[10px] md:text-sm text-gray-500 font-bold">
                    {branches.tashkent.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer mantiqini ham o'z ichiga oluvchi style qismi */}
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
