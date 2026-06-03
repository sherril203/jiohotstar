"use client";

import React, { useEffect, useState } from "react";

const Home = () => {

  const [sectionData, setSectionData] = useState({});
  const [popular, setPopular] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  const API = "http://localhost:5000";
  const categories = ["Action","Romance","Crimes","Comedy",
    "Drama","Kids","Reality","Thriller",];
  
  const sections = [
    "New on Jiohotstar","Drama Movies","Non-Stop Sports","Kids Corner","Action Movies",
    "Crime Vault","Love Story","Hotstar Specials",];
 const languages=["Tamil","English","Malayalam","Telugu","Hindi"]
 const Genres=["Romance","Family","Comedy","Reality","Crimes","Actions"]
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

    fetchPopular();
  }, []);

  const fetchCategory = async (cat) => {
    try {
      const res = await fetch(
        `${API}/category/${encodeURIComponent(cat)}`
      );

      const data = await res.json();
      setCategoryData(data);
    } catch (err) {
      console.error("Category Error:", err);
    }
  };

  useEffect(() => {
    setSelectedCategory(categories[0]);
    fetchCategory(categories[0]);
  }, []);


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
    <div className="bg-black text-white p-4">

      

      {/* 🔥 SECTIONS */}
      {sections.map((sec) => (
        <div key={sec} className="mt-8">
          <h2 className="text-xl font-bold">{sec}</h2>

          <div className="flex gap-3 overflow-x-auto mt-3">
            {(sectionData[sec] || []).map((item) => (
              <img
                key={item._id}
                src={`${API}/popular/${item.image}`}
                alt={item.name || ""}
                className="w-[180px] h-[320px] object-cover rounded shrink-0"
              />
            ))}
          </div>
        </div>
      ))}
      <div>
        <h1 className="text-xl font-bold">Popular language</h1>
        <div>

        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold">Popular Genres</h1>
        <div>

        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold">Popular Channels</h1>
      </div>
      {/* 🔵 POPULAR */}
      <h2 className="text-2xl font-bold">Popular</h2>

      <div className="flex flex-wrap gap-3 mt-3">
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              fetchCategory(cat);
            }}
            className={`cursor-pointer px-4 py-2 rounded-full ${
              selectedCategory === cat
                ? "bg-red-600"
                : "bg-zinc-800"
            }`}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* 🎬 CATEGORY RESULT */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">
          {selectedCategory}
        </h2>

        <div className="flex gap-3 overflow-x-auto mt-3">
          {categoryData.map((item) => (
            <img
              key={item._id}
              src={`${API}/popular/${item.image}`}
              alt={item.name || ""}
              className="w-[180px] h-[320px] object-cover rounded shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;