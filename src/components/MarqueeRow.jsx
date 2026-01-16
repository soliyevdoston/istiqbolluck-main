export default function MarqueeRow({ items, reverse = false }) {
  return (
    <div className="py-10 overflow-hidden flex whitespace-nowrap bg-white dark:bg-black">
      <div
        className={`flex gap-10 items-center ${
          reverse ? "animate-scroll-reverse" : "animate-scroll"
        }`}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="text-4xl md:text-7xl font-black uppercase  dark:text-white text-[#39B54A] transition cursor-default"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
