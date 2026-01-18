import React, { useState, useMemo, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Search,
  School,
  Target,
  Award,
  Hash,
  Calendar,
  History,
  Download,
  TrendingUp,
  Zap,
  Brain,
  CheckCircle2,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const studentsData = {
  "0000": {
    name: "Ism Familiya",
    class: "11-sinf",
    direction: "Aniq yo'nalish",
    rank: "Top 1%",
    percentile: 98.5,
    history: [
      {
        date: "2024-05-15",
        cert: 0,
        totalBall: 189,
        grantChance: 99,
        stats: [
          { name: "Ona tili", score: 10, max: 10, color: "#39B54A" },
          { name: "Matem (M)", score: 10, max: 10, color: "#39B54A" },
          { name: "Tarix", score: 10, max: 10, color: "#39B54A" },
          { name: "Matematika", score: 30, max: 30, color: "#2563eb" },
          { name: "Fizika", score: 30, max: 30, color: "#2563eb" },
        ],
      },
    ],
  },
  5021: {
    name: "Azizov Bekzod",
    class: "11-A",
    direction: "Tabiiy yo'nalish",
    rank: "Top 12%",
    percentile: 88.2,
    history: [
      {
        date: "2024-06-01",
        cert: 1,
        totalBall: 158.5,
        grantChance: 75,
        stats: [
          { name: "Ona tili", score: 8, max: 10, color: "#39B54A" },
          { name: "Matem (M)", score: 9, max: 10, color: "#39B54A" },
          { name: "Tarix", score: 10, max: 10, color: "#39B54A" },
          { name: "Biologiya", score: 24, max: 30, color: "#2563eb" },
          { name: "Kimyo", score: 22, max: 30, color: "#2563eb" },
        ],
      },
      {
        date: "2024-04-10",
        cert: 0,
        totalBall: 120.4,
        grantChance: 45,
        stats: [
          { name: "Ona tili", score: 5, max: 10, color: "#39B54A" },
          { name: "Matem (M)", score: 6, max: 10, color: "#39B54A" },
          { name: "Tarix", score: 7, max: 10, color: "#39B54A" },
          { name: "Biologiya", score: 18, max: 30, color: "#2563eb" },
          { name: "Kimyo", score: 15, max: 30, color: "#2563eb" },
        ],
      },
    ],
  },
};

export default function Dtm() {
  const [searchId, setSearchId] = useState("");
  const [currentId, setCurrentId] = useState("0000");
  const [testIndex, setTestIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const reportRef = useRef(null);

  const student = useMemo(
    () => studentsData[currentId] || studentsData["0000"],
    [currentId],
  );
  const currentTest = student.history[testIndex] || student.history[0];

  const downloadPDF = async () => {
    setIsDownloading(true);
    const element = reportRef.current;
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: null, // Transparent to let PDF background shine
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        210,
        (canvas.height * 210) / canvas.width,
      );
      pdf.save(`DTM_Natija_${student.name}.pdf`);
    } catch (e) {
      console.error(e);
    }
    setIsDownloading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (studentsData[searchId]) {
      setCurrentId(searchId);
      setTestIndex(0);
    } else {
      alert("ID topilmadi!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] dark:bg-[#0a0a0a] pt-24 sm:pt-24 px-3 sm:px-6 max-w-7xl mx-auto pb-20 font-sans text-slate-900 dark:text-white transition-colors duration-300">
      {/* 1. HEADER & SEARCH */}
      <div
        className="flex flex-col lg:flex-row justify-between items-center mb-8 sm:mb-10 gap-6"
        data-html2canvas-ignore="true"
      >
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="bg-black dark:bg-zinc-800 p-2 sm:p-3 rounded-xl shadow-lg">
            <Zap className="text-[#39B54A] w-6 h-6 sm:w-8" fill="#39B54A" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase italic">
              DTM{" "}
              <span className="text-slate-400 dark:text-zinc-500">CORE</span>
            </h1>
            <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">
              Tahlil Tizimi
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSearch}
          className="relative w-full lg:w-96 shadow-xl rounded-2xl overflow-hidden"
        >
          <input
            type="text"
            placeholder="O'quvchi ID raqami..."
            className="w-full py-4 sm:py-5 px-6 sm:px-8 bg-white dark:bg-zinc-900 dark:text-white border-none outline-none font-bold text-sm sm:text-lg"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black dark:bg-[#39B54A] text-white rounded-xl transition-all"
          >
            <Search size={20} />
          </button>
        </form>
      </div>

      <div ref={reportRef} className="space-y-6">
        {/* 2. STAT CARDS */}
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            icon={<TrendingUp className="text-blue-500" />}
            label="Reyting"
            value={student.rank}
            sub="Umumiy bazada"
          />
          <StatCard
            icon={<Zap className="text-yellow-500" />}
            label="Percentile"
            value={`${student.percentile}%`}
            sub="O'quvchilardan yaxshi"
          />
          <StatCard
            icon={<Brain className="text-purple-500" />}
            label="IQ Progress"
            value="+12.4"
            sub="O'tgan oydan beri"
          />
          <StatCard
            icon={<CheckCircle2 className="text-[#39B54A]" />}
            label="Grant Ehtimoli"
            value={`${currentTest.grantChance}%`}
            sub="Hozirgi ball bilan"
          />
        </div>

        {/* 3. MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: CHART */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-zinc-800 transition-colors">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-8 gap-4">
                <h3 className="text-lg sm:text-2xl font-black italic flex items-center gap-2 uppercase">
                  <Calendar className="text-[#39B54A]" /> {currentTest.date}
                </h3>
                <div className="w-full sm:w-auto text-left sm:text-right bg-slate-50 dark:bg-zinc-800/50 p-3 sm:p-0 rounded-xl">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    Jami Ball
                  </p>
                  <p className="text-4xl sm:text-6xl font-black text-black dark:text-[#39B54A] leading-none">
                    {currentTest.totalBall}
                  </p>
                </div>
              </div>

              <div className="h-[250px] sm:h-[380px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentTest.stats}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#64748b"
                      opacity={0.1}
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 10, fontWeight: 700 }}
                    />
                    <YAxis hide domain={[0, 32]} />
                    <Tooltip
                      cursor={{ fill: "rgba(100, 116, 139, 0.1)" }}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        backgroundColor: "#18181b",
                        color: "#fff",
                      }}
                    />
                    <Bar
                      dataKey="score"
                      radius={[8, 8, 0, 0]}
                      barSize={window.innerWidth < 500 ? 22 : 45}
                    >
                      {currentTest.stats.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* SUBJECT GRID */}
              <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mt-8">
                {currentTest.stats.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 sm:p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 bg-[#fbfcfc] dark:bg-zinc-800/30 hover:border-[#39B54A] transition-all"
                  >
                    <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase mb-1">
                      {item.name}
                    </p>
                    <div className="flex items-end gap-1">
                      <span className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">
                        {item.score}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 mb-1">
                        /{item.max}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${(item.score / item.max) * 100}%`,
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: PROFILE & ADVICE */}
          <div className="space-y-6">
            <div className="bg-black dark:bg-zinc-900 text-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] relative overflow-hidden shadow-xl border border-transparent dark:border-zinc-800">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6 sm:mb-10">
                  <div className="p-2 sm:p-3 bg-[#39B54A] rounded-xl">
                    <Hash size={20} color="black" />
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-[#39B54A] uppercase tracking-widest">
                      ID
                    </p>
                    <p className="text-lg sm:text-xl font-black">
                      #{currentId}
                    </p>
                  </div>
                </div>
                <p className="text-2xl sm:text-4xl font-black uppercase italic leading-tight mb-1">
                  {student.name}
                </p>
                <p className="text-[#39B54A] font-bold text-[10px] sm:text-sm tracking-widest uppercase mb-6">
                  {student.direction}
                </p>
                <div className="space-y-3 border-t border-slate-800 pt-6">
                  <InfoRow icon={<School size={16} />} text={student.class} />
                  <InfoRow
                    icon={<Award size={16} />}
                    text={
                      currentTest.cert > 0
                        ? "Sertifikat bor"
                        : "Sertifikat yo'q"
                    }
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 text-7xl sm:text-[10rem] font-black text-white/[0.05] pointer-events-none italic">
                DTM
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-zinc-800 transition-colors">
              <h4 className="text-lg sm:text-xl font-black mb-4 flex items-center gap-2 italic uppercase dark:text-white">
                <Brain className="text-[#39B54A]" /> AI Tavsiyasi
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-medium leading-relaxed mb-6">
                Natijangiz{" "}
                <span className="text-black dark:text-white font-black">
                  {currentTest.totalBall} ball
                </span>
                .
                <span className="text-blue-600 dark:text-blue-400 font-bold ml-1">
                  Matematikada
                </span>{" "}
                o'sish bor, lekin{" "}
                <span className="text-red-500 font-bold">
                  {currentTest.stats[4].name}
                </span>{" "}
                faniga e'tibor bering.
              </p>
              <div className="p-3 sm:p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-dashed border-slate-300 dark:border-zinc-700">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                  Grant Imkoniyati
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 sm:h-3 bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-[#39B54A]"
                      style={{ width: `${currentTest.grantChance}%` }}
                    ></div>
                  </div>
                  <span className="font-black text-sm sm:text-xl dark:text-white">
                    {currentTest.grantChance}%
                  </span>
                </div>
              </div>
              <button
                onClick={downloadPDF}
                disabled={isDownloading}
                className="mt-6 sm:mt-8 w-full py-4 sm:py-5 bg-black dark:bg-[#39B54A] text-white rounded-xl sm:rounded-2xl font-black flex items-center justify-center gap-2 hover:opacity-90 transition-all text-xs sm:text-sm"
              >
                {isDownloading ? (
                  "YUKLANMOQDA..."
                ) : (
                  <>
                    <Download size={18} /> PDF YUKLASH
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. HISTORY SECTION */}
      <div
        className="mt-8 sm:mt-10 p-5 sm:p-8 bg-white dark:bg-zinc-900 rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 transition-colors shadow-sm overflow-hidden"
        data-html2canvas-ignore="true"
      >
        <h4 className="flex items-center gap-2 font-black italic mb-6 uppercase text-slate-400 dark:text-zinc-500 text-xs sm:text-sm">
          <History size={18} /> Tarix
        </h4>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {student.history.map((test, index) => (
            <button
              key={index}
              onClick={() => setTestIndex(index)}
              className={`flex-1 min-w-[120px] sm:flex-none flex flex-col items-start gap-1 px-4 sm:px-8 py-3 sm:py-5 rounded-xl sm:rounded-3xl font-bold border-2 transition-all ${
                testIndex === index
                  ? "border-[#39B54A] bg-[#f0fdf4] dark:bg-zinc-800 text-black dark:text-[#39B54A]"
                  : "border-transparent bg-slate-100 dark:bg-zinc-800/40 text-slate-400"
              }`}
            >
              <span className="text-[8px] uppercase opacity-50">Sana</span>
              <span className="text-xs sm:text-lg leading-none">
                {test.date}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub }) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-sm border border-slate-200 dark:border-zinc-800 flex items-center gap-3 sm:gap-5 transition-colors">
      <div className="p-2 sm:p-4 bg-slate-50 dark:bg-zinc-800 rounded-xl sm:rounded-2xl shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[8px] sm:text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest leading-none mb-1 truncate">
          {label}
        </p>
        <p className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white leading-none mb-1 truncate">
          {value}
        </p>
        <p className="text-[8px] sm:text-[10px] font-bold text-slate-400 dark:text-zinc-500 truncate">
          {sub}
        </p>
      </div>
    </div>
  );
}

function InfoRow({ icon, text }) {
  return (
    <div className="flex items-center gap-3 opacity-90">
      <div className="p-1.5 sm:p-2 bg-slate-800 dark:bg-zinc-700 rounded-lg shrink-0">
        {icon}
      </div>
      <span className="font-bold text-sm sm:text-lg tracking-tight truncate dark:text-zinc-300">
        {text}
      </span>
    </div>
  );
}
