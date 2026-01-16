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
  PieChart,
  Pie,
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

// MA'LUMOTLAR BAZASI - YANADA BOYITILGAN
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
    [currentId]
  );
  const currentTest = student.history[testIndex] || student.history[0];

  const downloadPDF = async () => {
    setIsDownloading(true);
    const element = reportRef.current;
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        210,
        (canvas.height * 210) / canvas.width
      );
      pdf.save(`Natija_${student.name}.pdf`);
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
    <div className="min-h-screen bg-[#f4f7f6] pt-24 px-4 md:px-6 max-w-7xl mx-auto pb-20 font-sans text-slate-900">
      {/* 1. TOP NAVBAR / SEARCH */}
      <div
        className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6"
        data-html2canvas-ignore="true"
      >
        <div className="flex items-center gap-4">
          <div className="bg-black p-3 rounded-2xl shadow-lg">
            <Zap className="text-[#39B54A]" size={32} fill="#39B54A" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">
              DTM <span className="text-slate-400">CORE</span>
            </h1>
            <p className="text-xs font-bold text-slate-500 tracking-widest uppercase">
              Intellektual Tahlil Tizimi
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSearch}
          className="relative w-full lg:w-96 shadow-2xl rounded-2xl overflow-hidden"
        >
          <input
            type="text"
            placeholder="O'quvchi ID raqami..."
            className="w-full py-5 px-8 bg-white border-none outline-none font-bold text-lg"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-black text-white rounded-xl hover:bg-[#39B54A] transition-colors"
          >
            <Search size={24} />
          </button>
        </form>
      </div>

      {/* 2. MAIN REPORT AREA */}
      <div ref={reportRef} className="space-y-6">
        {/* TOP WIDGETS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<TrendingUp className="text-blue-500" />}
            label="O'quvchi Reytingi"
            value={student.rank}
            sub="Umumiy bazada"
          />
          <StatCard
            icon={<Zap className="text-yellow-500" />}
            label="Percentile"
            value={`${student.percentile}%`}
            sub="O'quvchilardan yaxshiroq"
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT: CHART & SUBJECTS */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <div className="flex justify-between items-end mb-8">
                <h3 className="text-2xl font-black italic flex items-center gap-2 uppercase">
                  <Calendar className="text-[#39B54A]" size={24} />{" "}
                  {currentTest.date}{" "}
                  <span className="text-slate-300 ml-2">Hisoboti</span>
                </h3>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    To'plangan Ball
                  </p>
                  <p className="text-6xl font-black text-black leading-none">
                    {currentTest.totalBall}
                  </p>
                </div>
              </div>

              <div className="h-[350px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentTest.stats}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f1f5f9"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis hide domain={[0, 32]} />
                    <Tooltip
                      cursor={{ fill: "#f8fafc" }}
                      contentStyle={{
                        borderRadius: "16px",
                        border: "none",
                        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Bar dataKey="score" radius={[12, 12, 0, 0]} barSize={50}>
                      {currentTest.stats.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* SUBJECT DETAILS GRID */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-10">
                {currentTest.stats.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-3xl border border-slate-100 bg-[#fbfcfc] hover:border-[#39B54A] transition-all group"
                  >
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-2 group-hover:text-[#39B54A]">
                      {item.name}
                    </p>
                    <div className="flex items-end gap-1">
                      <span className="text-2xl font-black text-slate-800">
                        {item.score}
                      </span>
                      <span className="text-xs font-bold text-slate-400 mb-1">
                        /{item.max}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full mt-3 overflow-hidden">
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

          {/* RIGHT: PROFILE & AI ADVICE */}
          <div className="space-y-6">
            {/* PROFILE CARD */}
            <div className="bg-black text-white p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="p-3 bg-[#39B54A] rounded-2xl">
                    <Hash size={24} color="black" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-[#39B54A] uppercase tracking-[0.2em]">
                      O'quvchi ID
                    </p>
                    <p className="text-xl font-black">#{currentId}</p>
                  </div>
                </div>

                <p className="text-4xl font-black uppercase italic leading-tight mb-2 tracking-tighter">
                  {student.name}
                </p>
                <p className="text-[#39B54A] font-bold text-sm tracking-widest uppercase mb-8">
                  {student.direction}
                </p>

                <div className="space-y-4 border-t border-slate-800 pt-8">
                  <InfoRow icon={<School size={18} />} text={student.class} />
                  <InfoRow
                    icon={<Award size={18} />}
                    text={
                      currentTest.cert > 0
                        ? "Sertifikat mavjud"
                        : "Sertifikat yo'q"
                    }
                  />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 text-[10rem] font-black text-white/[0.05] pointer-events-none italic">
                DTM
              </div>
            </div>

            {/* AI RECOMMENDATION */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <h4 className="text-xl font-black mb-4 flex items-center gap-2 italic uppercase">
                <Brain className="text-[#39B54A]" size={20} /> AI Tavsiyasi
              </h4>
              <p className="text-slate-600 font-medium leading-relaxed mb-6">
                Sizning natijangiz{" "}
                <span className="text-black font-black uppercase">
                  {currentTest.totalBall} ball
                </span>
                . Sizda{" "}
                <span className="text-blue-600 font-bold">Matematika</span>{" "}
                fanidan o'sish bor, lekin
                <span className="text-red-500 font-bold">
                  {" "}
                  {currentTest.stats[4].name}
                </span>{" "}
                faniga ko'proq e'tibor berish tavsiya etiladi.
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">
                  Grant Imkoniyati
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-[#39B54A]"
                      style={{ width: `${currentTest.grantChance}%` }}
                    ></div>
                  </div>
                  <span className="font-black text-xl">
                    {currentTest.grantChance}%
                  </span>
                </div>
              </div>

              <button
                onClick={downloadPDF}
                disabled={isDownloading}
                className="mt-8 w-full py-5 bg-black text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-[#39B54A] transition-all active:scale-95 shadow-lg group"
              >
                {isDownloading ? (
                  "YUKLANMOQDA..."
                ) : (
                  <>
                    <Download
                      size={20}
                      className="group-hover:-translate-y-1 transition-transform"
                    />{" "}
                    NATIJANI YUKLASH (PDF)
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. HISTORY SECTION */}
      <div
        className="mt-10 p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm"
        data-html2canvas-ignore="true"
      >
        <h4 className="flex items-center gap-3 font-black italic mb-6 uppercase text-slate-400">
          <History size={24} /> Imtihonlar Tarixi
        </h4>
        <div className="flex flex-wrap gap-4">
          {student.history.map((test, index) => (
            <button
              key={index}
              onClick={() => setTestIndex(index)}
              className={`flex flex-col items-start gap-1 px-8 py-5 rounded-3xl font-bold border-2 transition-all ${
                testIndex === index
                  ? "border-[#39B54A] bg-[#f0fdf4] text-black"
                  : "border-transparent bg-slate-100 text-slate-400 hover:bg-slate-200"
              }`}
            >
              <span className="text-[10px] uppercase opacity-50">Sana</span>
              <span className="text-lg leading-none">{test.date}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// YORDAMCHI KOMPONENTLAR
function StatCard({ icon, label, value, sub }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 flex items-center gap-5">
      <div className="p-4 bg-slate-50 rounded-2xl">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
          {label}
        </p>
        <p className="text-2xl font-black text-slate-900 leading-none mb-1">
          {value}
        </p>
        <p className="text-[10px] font-bold text-slate-400">{sub}</p>
      </div>
    </div>
  );
}

function InfoRow({ icon, text }) {
  return (
    <div className="flex items-center gap-4 opacity-90">
      <div className="p-2 bg-slate-800 rounded-lg">{icon}</div>
      <span className="font-bold text-lg tracking-tight">{text}</span>
    </div>
  );
}
