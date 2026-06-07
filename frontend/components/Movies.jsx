"use client"
import React from 'react'
import Link from 'next/link'
import { useState,useEffect } from 'react';
const Movies = () => {
    
const API = process.env.NEXT_PUBLIC_API_BACKEND_URL;;
      const [sectionData, setSectionData] = useState({});
    const sections=["Comedy Movies","Popular Movies","Romance Movies","Movies Recomended for you","Biopic Movies","The Great Indian Cinema",
        "Popular Kids Movie","Horror Movies","Disney Kids Movies"]

      useEffect(() => {
    const loadSections = async () => {
      const result = {};

      for (const sec of sections) {
        try {
          const res = await fetch(
            `${API}/section/${encodeURIComponent(sec)}`
          );

          const data = await res.json();
          result[sec] = data;
        } catch (err) {
          console.error(`Section Error (${sec})`, err);
          result[sec] = [];
        }
      }

      setSectionData(result);
    };

    loadSections();
  }, []);
  return (
    <div className='bg-black text-white p-4 '>
         {sections.map((sec) => (
        <div key={sec} className="mt-8">
         <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-bold">{sec}</h2> 
            <Link href="" className="text-xl text-white hover:text-gray-400">View more</Link>
          </div>

          <div className="flex gap-3 overflow-x-auto mt-3">
            {(sectionData[sec] || []).map((item) => (
              <img
                key={item._id}
                src={`${API}/files/${item.image}`}
                alt={item.name || ""}
                className="w-[180px] h-[260px] object-cover rounded-lg shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer"
              />
            ))}
          </div>
        </div>
      ))}
      </div>
  )
}

export default Movies
