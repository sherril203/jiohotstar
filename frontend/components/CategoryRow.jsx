"use client";

import { useEffect, useState } from "react";

const CategoryRow = ({ category }) => {
  const [movies, setMovies] = useState([]);
const API = process.env.NEXT_PUBLIC_API_BACKEND_URL;;
  useEffect(() => {
    fetch(
      `${API}/category/${category}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, [category]);

  if (movies.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold p-3">
        Popular in {category}
      </h2>

      <div className="flex gap-4 overflow-x-auto px-3">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="min-w-[180px]"
          >
            <img
              src={`${API}/files/${movie.image}`}
              alt={movie.name}
              className="w-full h-[260px] rounded-lg object-cover"
            />

          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;