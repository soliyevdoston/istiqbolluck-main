import { NavLink, Link } from "react-router-dom";
import { Phone } from "lucide-react";
import Logo from "/logo.svg";

export default function Header() {
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
    <header className="fixed top-0 w-full z-[100] h-20 flex items-center justify-between px-10 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-zinc-900">
      <Link
        to="/"
        onClick={scrollToTop}
        className="font-black text-2xl flex gap-[10px] items-center italic tracking-tighter"
      >
        <img
          className="w-[40px] h-[40px] object-contain"
          src={Logo}
          alt="Logo"
        />
        <div>
          <span className="text-[#E43E1C]">ISTIQBOL</span>{" "}
          <span className="text-[#2E3192] dark:text-[#4b4efc]">LUCK</span>
        </div>
      </Link>

      <nav className="hidden md:flex gap-10 font-bold text-[11px] uppercase tracking-widest">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={scrollToTop}
            className={({ isActive }) => `
              relative pb-2 transition-colors hover:text-[#39B54A]
              ${
                isActive ? "text-[#39B54A]" : "text-gray-600 dark:text-gray-300"
              }
              group
            `}
          >
            {({ isActive }) => (
              <>
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#39B54A] transition-all duration-300 
                  ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-6">
        <a
          href="tel:+998901234567"
          className="font-black text-[#2E3192] dark:text-white hidden sm:block hover:text-[#E43E1C] transition-colors"
        >
          +998 90 123 45 67
        </a>
        <a
          href="tel:+998901234567"
          className="bg-[#39B54A] text-white p-3 rounded-full hover:scale-110 transition-transform flex items-center justify-center shadow-lg shadow-green-500/20"
        >
          <Phone size={18} fill="currentColor" />
        </a>
      </div>
    </header>
  );
}
