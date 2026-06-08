"use client";
import React, { useRef } from 'react'
import paramount from '../images/paramount.webp'
import peacock from '../images/peacock.webp'
import disney from '../images/disney_plus.webp'
import hbomax from '../images/hbo_max.webp'
import hotstar from '../images/hs.webp'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";

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

const browseTheme = {
    Sparks: { text: "text-white", gradient: "from-rose-950 to-black" },
    News: { text: "text-white", gradient: "from-blue-950 to-black" },
    TV: { text: "text-white", gradient: "from-purple-950 to-black" },
    Movies: { text: "text-white", gradient: "from-emerald-950 to-black" },
    Sports: { text: "text-white", gradient: "from-orange-950 to-black" }
};

const Categories = () => {
    const languages = ["Hindi", "English", "Tamil", "Telugu", "Malayalam", "Marathi", "Bengali"]
    const genres = ["Mythology", "Crimes", "Food", "Action", "Comedy", "Family", "Romance", "Drama"]
    const sports = ["Cricket", "Football", "Badminton", "Mixed Martial Arts", "Motorsports"]
    const browse = ["Sparks", "News", "TV", "Movies", "Sports"]

    const studios = [hotstar, disney, hbomax, peacock, paramount]

    // 🎯 Dynamic Reference Array mapping slider controls
    const rowRefs = useRef({});

    const scrollRow = (key, direction) => {
        const targetRow = rowRefs.current[key];
        if (targetRow) {
            const offset = direction === "left" ? -450 : 450;
            targetRow.scrollBy({ left: offset, behavior: "smooth" });
        }
    };

    return (
        <div className="bg-black text-white py-6 px-4 md:px-10 space-y-12 min-h-screen w-full max-w-none overflow-x-hidden">

            {/* 🚀 1. BROWSE SECTION */}
            <div className="w-full relative group">
                <h2 className="text-lg font-bold mb-4 text-zinc-100 tracking-wide">Browse</h2>
                
                {/* Clickable Hover Slider Buttons */}
                <button onClick={() => scrollRow('browse', 'left')} className="absolute left-0 top-[65%] -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2.5 rounded-full text-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block shadow-xl">
                    <FaAngleLeft/>
                </button>
                <button onClick={() => scrollRow('browse', 'right')} className="absolute right-0 top-[65%] -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2.5 rounded-full text-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block shadow-xl">
                    <FaAngleRight/>
                </button>

                <div 
                    ref={(el) => (rowRefs.current['browse'] = el)}
                    className="flex gap-4  px-1"
                >
                    {browse.map((item) => {
                        const bTheme = browseTheme[item] || { text: "text-white", gradient: "from-zinc-900 to-zinc-950" };
                        return (
                            <div
                                key={item}
                                className={`min-w-[160px] md:flex-1 h-35 bg-gradient-to-br ${bTheme.gradient} flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 font-semibold text-base tracking-wide shrink-0 ${bTheme.text}`}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 🎬 2. STUDIOS SECTION */}
            <div className="w-full max-w-none">
                <h2 className="text-lg font-bold mb-4 text-white tracking-wide">Studios</h2>
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {studios.map((studioImg, index) => (
                        <div
                            key={index}
                            className="w-full h-43 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 flex items-center justify-center cursor-pointer transition-all 
                            duration-300 transform hover:scale-[1.03] shadow-2xl rounded-xl overflow-hidden"
                        >
                            <img
                                src={studioImg.src || studioImg}
                                alt={`studio-${index}`}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* 🌐 3. POPULAR LANGUAGES */}
            <div className="w-full relative group">
                <h2 className="text-lg font-bold mb-4 text-white tracking-wide">Popular Languages</h2>
                
                <button onClick={() => scrollRow('languages', 'left')} className="absolute left-0 top-[65%] -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2.5 rounded-full text-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block shadow-xl">
                    <FaAngleLeft/>
                </button>
                <button onClick={() => scrollRow('languages', 'right')} className="absolute right-0 top-[65%] -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2.5 rounded-full text-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block shadow-xl">
                    <FaAngleRight/>
                </button>

                <div 
                    ref={(el) => (rowRefs.current['languages'] = el)}
                    className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-1"
                >
                    {languages.map((lang) => (
                        <div
                            key={lang}
                            className="min-w-[180px] md:min-w-[210px] h-35 bg-gradient-to-b from-zinc-900 to-zinc-950 flex flex-col justify-end p-4 rounded-xl cursor-pointer font-bold text-base tracking-wide transition-all shrink-0 duration-300 hover:scale-[1.03]"
                        >
                            <span className="text-white text-lg block">{lang === "Hindi" ? "हिन्दी" : lang === "Tamil" ? "தமிழ்" : lang === "Telugu" ? "తెలుగు" : lang === "Malayalam" ? "മലയാളം" : lang}</span>
                            <span className="text-xs text-zinc-400 font-normal mt-0.5">{lang}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 🎭 4. POPULAR GENRES */}
            <div className="w-full relative group">
                <h2 className="text-lg font-bold mb-4 text-white tracking-wide">Popular Genres</h2>
                
                <button onClick={() => scrollRow('genres', 'left')} className="absolute left-0 top-[65%] -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2.5 rounded-full text-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block shadow-xl">
                    <FaAngleLeft/>
                </button>
                <button onClick={() => scrollRow('genres', 'right')} className="absolute right-0 top-[65%] -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2.5 rounded-full text-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block shadow-xl">
                    <FaAngleRight/>
                </button>

                <div 
                    ref={(el) => (rowRefs.current['genres'] = el)}
                    className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-1"
                >
                    {genres.map((gen) => {
                        const theme = genreThemes[gen] || { text: "text-white", gradient: "from-zinc-900 to-zinc-950" };
                        return (
                            <div
                                key={gen}
                                className={`min-w-[160px] md:min-w-[190px] h-35 bg-gradient-to-br ${theme.gradient} flex items-end p-4 rounded-xl cursor-pointer text-base font-bold tracking-wide whitespace-nowrap transition-all duration-300 hover:scale-105 shrink-0 ${theme.text}`}
                            >
                                {gen}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ⚽ 5. POPULAR SPORTS */}
            <div className="w-full relative group">
                <h2 className="text-lg font-bold mb-4 text-white tracking-wide">Popular Sports</h2>
                
                <button onClick={() => scrollRow('sports', 'left')} className="absolute left-0 top-[65%] -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2.5 rounded-full text-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block shadow-xl">
                    <FaAngleLeft/>
                </button>
                <button onClick={() => scrollRow('sports', 'right')} className="absolute right-0 top-[65%] -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2.5 rounded-full text-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block shadow-xl">
                    <FaAngleRight/>
                </button>

                <div 
                    ref={(el) => (rowRefs.current['sports'] = el)}
                    className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-1"
                >
                    {sports.map((sport) => (
                        <div
                            key={sport}
                            className="min-w-[180px] md:min-w-[210px] h-35 bg-gradient-to-b from-zinc-900 to-zinc-950 flex items-end p-4 
                            rounded-xl cursor-pointer font-bold text-sm tracking-wide transition-all shrink-0 text-white duration-300 hover:scale-[1.03]"
                        >
                            {sport}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Categories