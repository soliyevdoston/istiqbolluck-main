{
  /* LOGO */
}
<Link
  to="/"
  onClick={scrollToTop}
  className="flex gap-1.5 min-[450px]:gap-2 md:gap-[10px] items-center italic tracking-tighter shrink-0 transition-all"
>
  <img
    // 450px dan kichik bo'lsa w-6 (24px), 450px dan katta bo'lsa w-8 (32px), md da w-10 (40px)
    className="w-6 h-6 min-[450px]:w-8 min-[450px]:h-8 md:w-10 md:h-10 object-contain transition-all"
    src={Logo}
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
</Link>;
