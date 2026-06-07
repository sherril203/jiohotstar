"use client";
import React, { useEffect, useState } from 'react';

const Search = () => {
  const [sectionData, setSectionData] = useState({});
  const [popular, setPopular] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_BACKEND_URL;
  const sections = ["Trending in India"];

  // 1. Fetch Popular / Categories Data
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

  // 3. Dynamic Live Search Query Handler (No Borders, Full API integration)
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Dynamic route handler matching backend search controllers
      const res = await fetch(`${API}/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      console.error("Search API Error:", err);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen w-full p-4 md:p-10 space-y-10 overflow-x-hidden">
      
      {/* 🔍 SEARCH BAR STRUCTURE (BORDERLESS & COMPACT) */}
      <div className="w-full max-w-4xl mx-auto flex items-center bg-zinc-900 rounded-xl overflow-hidden px-4 py-1">
        <span className="text-zinc-400 mr-2 text-xl">🔍</span>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Movies, shows and more" 
          className="w-full p-3 bg-transparent text-white placeholder-zinc-500 outline-none font-medium tracking-wide text-base"
        />
        {searchQuery && (
          <button 
            onClick={() => handleSearch("")} 
            className="text-zinc-400 hover:text-white font-bold px-2 text-sm transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* 🎯 MAIN CONTENT RENDER STRATEGY */}
      <div className="w-full">
        {isSearching ? (
          /* 🎬 SEARCH RESULTS CONTAINER */
          <div>
            <h2 className="text-lg font-bold mb-4 px-2 text-zinc-400 tracking-wide">
              Search Results for <span className="text-white">"{searchQuery}"</span>
            </h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-2">
                {searchResults.map((item) => (
                  <img
                    key={item._id}
                    src={`${API}/files/${item.image}`}
                    alt={item.name || ""}
                    className="w-full h-[240px] object-cover rounded-xl transition-transform duration-300 hover:scale-[1.04] cursor-pointer shadow-2xl"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-zinc-500 font-semibold">
                No matching movies or shows found.
              </div>
            )}
          </div>
        ) : (
          /* 🔥 DEFAULT STATE: TRENDING SECTIONS LOOP */
          <div className="space-y-10">
            {sections.map((sec) => (
              <div key={sec} className="w-full">
                <h2 className="text-xl font-bold tracking-wide text-zinc-100 mb-4 px-2">{sec}</h2> 
                
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
          </div>
        )}
      </div>

    </div>
  );
};

export default Search;