import { Link, NavLink } from "react-router-dom";
import {
  Instagram,
  Send,
  Youtube,
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import Logo from "/logo.svg";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { to: "/", label: "Biz haqimizda" },
    { to: "/dtm", label: "Dtm" },
    { to: "/life", label: "Maktab hayoti" },
    { to: "/team", label: "Jamoamiz" },
    { to: "/blog", label: "Blog" },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden text-white">
      {/* --- ASOSIY RANG VA GRADYENT FON --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F1A] via-[#1E2235] to-[#0B0F1A] z-0"></div>

      {/* Orqa fondagi dekorativ effektlar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E43E1C] via-[#39B54A] to-[#2E3192]"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#39B54A]/10 blur-[120px] rounded-full"></div>
      <div className="absolute top-1/2 -left-24 w-72 h-72 bg-[#E43E1C]/10 blur-[100px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto py-20 px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* 1. Logo va Ta'rif */}
          <div className="col-span-1 space-y-6">
            <Link
              to="/"
              onClick={scrollToTop}
              className="flex items-center gap-3 p-2  rounded-2xl  w-fit"
            >
              <img
                src={Logo}
                alt="Logo"
                className="w-[50px] h-[50px] object-contain"
              />
              <div className="text-2xl font-black italic flex gap-2 leading-[0.8]">
                <span className="text-[#E43E1C]">ISTIQBOL</span>
                <span className="text-white">LUCK</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Biz faqat ta'lim bermaymiz, biz muvaffaqiyatli kelajak poydevorini
              quramiz. Istiqbolingiz - bizning luckimiz!
            </p>
          </div>

          {/* 2. Navigatsiya */}
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-[3px] text-white/40 mb-8">
              Bo'limlar
            </h4>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={scrollToTop}
                  className="text-sm font-semibold text-slate-300 hover:text-[#39B54A] transition-all flex items-center group"
                >
                  <span className="w-0 group-hover:w-3 h-[2px] bg-[#39B54A] mr-0 group-hover:mr-2 transition-all"></span>
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* 3. Aloqa */}
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-[3px] text-white/40 mb-8">
              Aloqa markazi
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+998901234567"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#39B54A] group-hover:bg-[#39B54A] group-hover:text-white transition-all shadow-lg">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white font-bold tracking-wide">
                    +998 90 123 45 67
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-medium">
                    Qo'ng'iroq qiling
                  </span>
                </div>
              </a>
              <a
                href="mailto:info@istiqbol.uz"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#E43E1C] group-hover:bg-[#E43E1C] group-hover:text-white transition-all shadow-lg">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white font-bold tracking-wide">
                    info@istiqbol.uz
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-medium">
                    Email yuboring
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* 4. Ijtimoiy tarmoqlar */}
          <div className="md:text-right flex flex-col md:items-end">
            <h4 className="font-bold text-[11px] uppercase tracking-[3px] text-white/40 mb-8">
              Ijtimoiy Hayot
            </h4>
            <div className="flex gap-4">
              {[
                {
                  icon: <Instagram size={20} />,
                  color: "hover:bg-[#E4405F]",
                  href: "#",
                },
                {
                  icon: <Send size={20} />,
                  color: "hover:bg-[#24A1DE]",
                  href: "#",
                },
                {
                  icon: <Youtube size={20} />,
                  color: "hover:bg-[#FF0000]",
                  href: "#",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all hover:-translate-y-2 hover:shadow-xl shadow-black/20 ${social.color} text-white`}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="mt-10 group inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[3px] text-white py-3 px-6 rounded-2xl bg-[#39B54A] hover:bg-white hover:text-[#39B54A] transition-all duration-300 shadow-lg shadow-[#39B54A]/20"
            >
              Yuqoriga qaytish
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Footer Pastki qismi */}
        <div className=" pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-slate-400 uppercase tracking-[3px] font-bold">
            © 2026 <span className="text-[#E43E1C]">ISTIQBOL</span>{" "}
            <span className="text-white">LUCK</span>. BARCHA HUQUQLAR
            HIMOYALANGAN.
          </p>

          <a
            href="https://soliyev.uz"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 transition-all hover:bg-white/10 hover:border-white/20 shadow-xl"
          >
            <span className="text-[9px] text-slate-300 uppercase tracking-[2px] font-medium">
              Developed by{" "}
              <span className="font-black text-white">soliyev.uz</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
