"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";

const Shows = () => {
  const API = process.env.NEXT_PUBLIC_API_BACKEND_URL;
  const [sectionData, setSectionData] = useState({});
  
  const sections = [
    "Kids Shows", "Popular Channels", "Star Vijay Shows", 
    "House of Dramas", "Comedy Shows", "Popular Kids Shows"
  ];

  // 🎯 Dynamic reference manager for horizontal slider items
  const rowRefs = useRef({});

  // 🚀 Slider Scrolling Track Handler
  const scrollRow = (key, direction) => {
    const targetRow = rowRefs.current[key];
    if (targetRow) {
      const scrollOffset = direction === "left" ? -500 : 500;
      targetRow.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

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
    <div className="bg-black text-white p-4 md:p-8 min-h-screen w-full max-w-none overflow-x-hidden space-y-4">
      {sections.map((sec) => (
        /* 🎬 CONTAINER WRAPPER WITH ABSOLUTE BOUNDARIES AND HOVER GROUP */
        <div key={sec} className="w-full relative group mt-6">
          
          {/* Header Title Area */}
          <div className="flex justify-between items-center px-2 mb-3">
            <h2 className="text-xl font-bold tracking-wide text-zinc-100">{sec}</h2> 
            <Link href="" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors">View more</Link>
          </div>

          {/* 🟢 Clickable Absolute Control Arrows (Border-free layout) */}
          <button 
            onClick={() => scrollRow(sec, "left")} 
            className="absolute left-0 top-[62%] -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2.5 rounded-full text-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block shadow-2xl"
          >
            <FaAngleLeft />
          </button>
          
          <button 
            onClick={() => scrollRow(sec, "right")} 
            className="absolute right-0 top-[62%] -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2.5 rounded-full text-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block shadow-2xl"
          >
            <FaAngleRight />
          </button>

          {/* Horizontally Scrollable Element Track */}
          <div 
            ref={(el) => (rowRefs.current[sec] = el)}
            className="flex gap-4  mt-3 px-2 "
          >
            {(sectionData[sec] || []).map((item) => (
              <img
                key={item._id}
                src={`${API}/files/${item.image}`}
                alt={item.name || ""}
                className="w-[170px] h-[250px] md:w-[180px] md:h-[260px] object-cover rounded-xl shrink-0 transition-transform duration-300 hover:scale-[1.04] cursor-pointer shadow-lg"
              />
            ))}
          </div>

        </div>
      ))}
    </div>
  );
};

export default Shows;