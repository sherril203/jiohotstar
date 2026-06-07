"use client";
import Link from 'next/link'
import React, { useEffect, useState } from "react";

const Home = () => {
  const [sectionData, setSectionData] = useState({});
  const [popular, setPopular] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);

const genreThemes = {
  Romance: { text: "text-white", gradient: "from-rose-950 to-black" },
  Action: { text: "text-white", gradient: "from-orange-950 to-black" },
  Crimes: { text: "text-white", gradient: "from-purple-950 to-black" },
  Comedy: { text: "text-white", gradient: "from-emerald-950 to-black" },
  Drama: { text: "text-white", gradient: "from-amber-950 to-black" },
  Family: { text: "text-white", gradient: "from-blue-950 to-black" },
  Food: { text: "text-white", gradient: "from-lime-950 to-black" },
  Mythology: { text: "text-white", gradient: "from-yellow-950 to-black" }
};
  
  const API = process.env.NEXT_PUBLIC_API_BACKEND_URL;

  const categories = ["Action", "Romance", "Crimes", "Comedy", "Drama", "Kids", "Reality", "Thriller"];
  
  const sections = [
    "New on Jiohotstar", "Drama Movies", "Non-Stop Sports", "Kids Corner", "Action Movies",
    "Crime Vault", "Love Story", "Hotstar Specials"
  ];

  const languages = ["Tamil", "English", "Malayalam", "Telugu", "Hindi"];
  const genres = ["Mythology", "Crimes", "Food", "Action", "Comedy", "Family", "Drama", "Romance"];

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch(`${API}/all`);
        const data = await res.json();

        const formatted = [
          ...new Map(
            data.map((i) => [i.category, { name: i.category }])
          ).values(),
        ];

        setPopular(formatted);
      } catch (err) {
        console.error("Popular Error:", err);
      }
    };

    if (API) fetchPopular();
  }, [API]);

  const fetchCategory = async (cat) => {
    try {
      const res = await fetch(`${API}/category/${encodeURIComponent(cat)}`);
      const data = await res.json();
      setCategoryData(data);
    } catch (err) {
      console.error("Category Error:", err);
    }
  };

  useEffect(() => {
    const defaultCategory = categories && categories[0] ? categories[0] : "Action";
    setSelectedCategory(defaultCategory);
    if (API) {
      fetchCategory(defaultCategory);
    }
  }, [API]); 

  useEffect(() => {
    const loadSections = async () => {
      const result = {};

      for (const sec of sections) {
        try {
          const res = await fetch(`${API}/section/${encodeURIComponent(sec)}`);
          const data = await res.json();
          result[sec] = data;
        } catch (err) {
          console.error(`Section Error (${sec})`, err);
          result[sec] = [];
        }
      }

      setSectionData(result);
    };

    if (API) loadSections();
  }, [API]);

  return (
    <div className="bg-black text-white p-4 md:p-8 min-h-screen w-full max-w-none overflow-x-hidden space-y-12">

      {/* 🎬 DYNAMIC SECTIONS LOOP */}
      {sections.map((sec) => (
        <div key={sec} className="w-full">
          <div className="flex justify-between items-center px-2 mb-3">
            <h2 className="text-xl font-bold tracking-wide text-zinc-100">{sec}</h2> 
            <Link href="" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors">View more</Link>
          </div>

          <div className="flex gap-4 overflow-x-auto px-2 scrollbar-hide">
            {(sectionData[sec] || []).map((item) => (
              <img
                key={item._id}
                src={`${API}/files/${item.image}`}
                alt={item.name || ""}
                className="w-[170px] h-[250px] object-cover rounded-xl shrink-0 transition-transform duration-300 hover:scale-[1.04] cursor-pointer shadow-lg"
              />
            ))}
          </div>
        </div>
      ))}

      {/* 🌐 POPULAR LANGUAGES */}
      <div className="w-full">
        <h2 className="text-lg font-bold mb-4 px-2 text-zinc-100 tracking-wide">Popular Languages</h2>
        <div className="flex gap-4 overflow-x-auto px-2 scrollbar-hide">
          {languages.map((lang) => (
            <div 
              key={lang} 
              className="min-w-[180px] md:min-w-[210px] h-28 bg-gradient-to-b from-zinc-900 to-zinc-950 flex flex-col justify-end p-4 rounded-xl cursor-pointer font-bold text-base tracking-wide transition-all duration-300 shrink-0"
            >
              <span className="text-white text-lg block">
                {lang === "Hindi" ? "हिन्दी" : lang === "Tamil" ? "தமிழ்" : lang === "Telugu" ? "తెలుగు" : lang === "Malayalam" ? "മലയാളം" : lang}
              </span>
              <span className="text-xs text-zinc-400 font-normal mt-0.5">{lang}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 🎭 POPULAR GENRES (BORDERLESS THEMES APPLIED) */}
      <div className="w-full">
        <h2 className="text-lg font-bold mb-4 px-2 text-zinc-100 tracking-wide">Popular Genres</h2>
        {/* Added missing overflow-x-auto for native edge scrolling here too */}
        <div className="flex gap-4 overflow-x-auto px-2 scrollbar-hide">
          {genres.map((gen) => {
            const theme = genreThemes[gen] || { text: "text-white", gradient: "from-zinc-900 to-zinc-950" };
            return (
              <div 
                key={gen} 
                className={`min-w-[160px] md:min-w-[190px] h-28 bg-gradient-to-br ${theme.gradient} flex items-end p-4 rounded-xl cursor-pointer text-base font-bold tracking-wide whitespace-nowrap transition-all duration-300 hover:scale-105 shrink-0 ${theme.text}`}
              >
                {gen}
              </div>
            );
          })}
        </div>
      </div>

      {/* 📺 POPULAR CHANNELS */}
      <div className="w-full">
        <h1 className="text-lg font-bold px-2 mb-4 text-zinc-100 tracking-wide">Popular Channels</h1>
        <div className="flex gap-4 overflow-x-auto px-2 scrollbar-hide">
          {["Star Vijay", "Asianet", "Star Maa", "Suvarna", "National Geographic"].map((ch) => (
            <div 
              key={ch} 
              className="min-w-[150px] h-20 bg-zinc-900 rounded-xl flex items-center justify-center font-bold cursor-pointer transition-all shrink-0 text-sm tracking-wide text-white"
            >
              {ch}
            </div>
          ))}
        </div>
      </div>

      {/* 🔵 POPULAR CATEGORIES SWITCHER */}
      <div className="w-full pt-4">
        <h2 className="text-xl font-bold px-2 tracking-wide text-zinc-100">Browse More Content</h2>
        <div className="flex flex-wrap gap-3 mt-4 px-2">
          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                fetchCategory(cat);
              }}
              className={`cursor-pointer px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* 🎬 CATEGORY RESULT DISPLAY */}
      <div className="w-full pb-12">
        <div className="flex gap-4 overflow-x-auto px-2 scrollbar-hide">
          {categoryData.map((item) => (
            <img
              key={item._id}
              src={`${API}/files/${item.image}`}
              alt={item.name || ""}
              className="w-[170px] h-[250px] object-cover rounded-xl shrink-0 transition-transform duration-300 hover:scale-[1.04] cursor-pointer shadow-lg"
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;